import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { formatIndianShort } from '../utils/formatNumber';

const Dashboard = () => {
  const { refreshTrigger } = useOutletContext();
  const [funds, setFunds] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const lastKnownHoldingPrices = useRef({});
  const lastKnownPositionPrices = useRef({});

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [userRes, fundsRes, holdingsRes, positionsRes] =
          await Promise.all([
            axiosInstance.get('/verify'),
            axiosInstance.get('/funds'),
            axiosInstance.get('/allHoldings'),
            axiosInstance.get('/allPositions'),
          ]);

        setUsername(userRes.data.user?.username ?? '');
        setFunds(fundsRes.data);

        const holdingsData = holdingsRes.data;

        if (holdingsData.length > 0) {
          const holdingSymbols = holdingsData.map((h) => h.name);
          const holdingQuotesRes = await axiosInstance.post('/stocks/quotes', {
            symbols: holdingSymbols,
          });

          const mergedHoldings = holdingsData.map((h) => {
            const liveQuote = holdingQuotesRes.data.find(
              (q) => q.symbol === h.name
            );
            if (liveQuote)
              lastKnownHoldingPrices.current[h.name] = liveQuote.price;
            const resolvedPrice = liveQuote
              ? liveQuote.price
              : (lastKnownHoldingPrices.current[h.name] ?? h.price);
            return { ...h, price: resolvedPrice };
          });
          setHoldings(mergedHoldings);
        } else {
          setHoldings([]);
        }

        const positionsData = positionsRes.data;

        if (positionsData.length > 0) {
          const positionSymbols = positionsData.map((p) => p.name);
          const positionQuotesRes = await axiosInstance.post('/stocks/quotes', {
            symbols: positionSymbols,
          });

          const mergedPositions = positionsData.map((p) => {
            const liveQuote = positionQuotesRes.data.find(
              (q) => q.symbol === p.name
            );
            if (liveQuote)
              lastKnownPositionPrices.current[p.name] = liveQuote.price;
            const resolvedPrice = liveQuote
              ? liveQuote.price
              : (lastKnownPositionPrices.current[p.name] ?? p.price);
            return { ...p, price: resolvedPrice };
          });
          setPositions(mergedPositions);
        } else {
          setPositions([]);
        }
      } catch (err) {
        console.error('Dashboard load failed:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
    const interval = setInterval(loadDashboardData, 15000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  let totalInvestment = 0;
  let totalCurrentValue = 0;

  holdings.forEach((stock) => {
    totalInvestment += (stock.avg ?? 0) * (stock.qty ?? 0);
    totalCurrentValue += (stock.price ?? 0) * (stock.qty ?? 0);
  });

  const holdingsPnL = totalCurrentValue - totalInvestment;
  const holdingsPnLPercent =
    totalInvestment > 0 ? (holdingsPnL / totalInvestment) * 100 : 0;
  const isHoldingsProfit = holdingsPnL >= 0;

  let positionsPnL = 0;
  positions.forEach((pos) => {
    positionsPnL += ((pos.price ?? 0) - (pos.avg ?? 0)) * (pos.qty ?? 0);
  });
  const isPositionsProfit = positionsPnL >= 0;

  if (loading) {
    return (
      <div className="w-full bg-white p-4 md:p-6 font-body">
        <p className="text-center text-ink/40 text-sm mt-8 font-medium">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 md:p-6 font-body">
      <h1 className="font-heading text-xl md:text-2xl text-brand-dark font-bold mb-10 border-b border-brand-light/60 pb-10">
        Hi, {username || 'User'}!
      </h1>

      {/* ---------- Equity / Funds Section ---------- */}
      <div className="mb-10 border-b border-brand-light/60 pb-10">
        <p className="text-brand-mid text-xs md:text-sm font-semibold uppercase tracking-wide mb-6 flex items-center gap-1">
          Equity
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark">
              {formatIndianShort(funds?.availableBalance ?? 0)}
            </h2>
            <p className="text-xs text-ink/40 mt-1">Margin available</p>
          </div>

          <div className="text-xs md:text-sm space-y-3 min-w-[200px]">
            <div className="flex justify-between gap-8">
              <span className="text-ink/40">Margins Used</span>
              <span className="text-ink/80 font-semibold">
                {formatIndianShort(funds?.usedMargin ?? 0)}
              </span>
            </div>

            <div className="flex justify-between gap-8">
              <span className="text-ink/40">Opening balance</span>
              <span className="text-ink/80 font-semibold">
                {formatIndianShort(funds?.availableBalance ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Holdings Section ---------- */}
      <div className="mb-10 border-b border-brand-light/60 pb-10">
        <p className="text-brand-mid text-xs md:text-sm font-semibold uppercase tracking-wide mb-6 flex items-center gap-1">
          Holdings ({holdings.length})
        </p>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-baseline gap-2">
            <h2
              className={`font-heading text-3xl md:text-4xl font-bold ${isHoldingsProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
            >
              {isHoldingsProfit ? '+' : ''}
              {formatIndianShort(holdingsPnL)}
            </h2>
            <span
              className={`text-xs md:text-sm font-semibold ${isHoldingsProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
            >
              {isHoldingsProfit ? '+' : ''}
              {holdingsPnLPercent.toFixed(2)}%
            </span>
            <span className="text-xs text-ink/40 ml-1">P&L</span>
          </div>

          <div className="text-xs md:text-sm space-y-3 min-w-[200px]">
            <div className="flex justify-between gap-8">
              <span className="text-ink/40">Current Value</span>
              <span className="text-ink/80 font-semibold">
                {formatIndianShort(totalCurrentValue)}
              </span>
            </div>

            <div className="flex justify-between gap-8">
              <span className="text-ink/40">Investment</span>
              <span className="text-ink/80 font-semibold">
                {formatIndianShort(totalInvestment)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Positions Section ---------- */}
      <div className="mb-6">
        <p className="text-brand-mid text-xs md:text-sm font-semibold uppercase tracking-wide mb-6 flex items-center gap-1">
          Positions ({positions.length})
        </p>

        {positions.length === 0 ? (
          <p className="text-sm text-ink/40">No open intraday positions</p>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-baseline gap-2">
              <h2
                className={`font-heading text-3xl md:text-4xl font-bold ${isPositionsProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
              >
                {isPositionsProfit ? '+' : ''}
                {formatIndianShort(positionsPnL)}
              </h2>
              <span className="text-xs text-ink/40 ml-1">P&L (intraday)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
