import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import PortfolioChart from './PortfolioChart';
import axiosInstance from '../utils/axiosInstance';

const Holdings = () => {
  const { refreshTrigger } = useOutletContext();

  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastKnownPrices = useRef({});

  useEffect(() => {
    const loadHoldingsWithLivePrices = async () => {
      try {
        const res = await axiosInstance.get('/allHoldings');
        const holdings = res.data;

        if (holdings.length === 0) {
          setAllHoldings([]);
          setLoading(false);
          return;
        }

        const symbols = holdings.map((h) => h.name);
        const quotesRes = await axiosInstance.post('/stocks/quotes', {
          symbols,
        });

        const merged = holdings.map((h) => {
          const liveQuote = quotesRes.data.find((q) => q.symbol === h.name);

          if (liveQuote) {
            lastKnownPrices.current[h.name] = liveQuote.price;
          }

          const resolvedPrice = liveQuote
            ? liveQuote.price
            : (lastKnownPrices.current[h.name] ?? h.price);

          return {
            ...h,
            price: resolvedPrice,
          };
        });

        setAllHoldings(merged);
      } catch (err) {
        console.error('Failed to load holdings:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHoldingsWithLivePrices();
    const interval = setInterval(loadHoldingsWithLivePrices, 15000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  let totalInvestment = 0;
  let totalCurrentValue = 0;

  allHoldings.forEach((stock) => {
    totalInvestment += (stock.avg ?? 0) * (stock.qty ?? 0);
    totalCurrentValue += (stock.price ?? 0) * (stock.qty ?? 0);
  });

  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <div className="w-full p-4 md:p-6 bg-white min-h-screen text-ink font-body">
      <div className="border-b border-brand-light/60 pb-3 mb-4">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-dark">
          Holdings ({allHoldings.length})
        </h3>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 border-b border-brand-light/60 pb-6">
        <div className="min-w-0">
          <p className="font-heading text-xl sm:text-xl lg:text-3xl font-bold text-brand-dark tracking-tight truncate">
            {totalInvestment.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-ink/40 font-medium mt-1 uppercase tracking-wider">
            Total investment
          </p>
        </div>

        <div className="min-w-0">
          <p className="font-heading text-xl sm:text-xl lg:text-3xl font-bold text-brand-dark tracking-tight truncate">
            {totalCurrentValue.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-ink/40 font-medium mt-1 uppercase tracking-wider">
            Current value
          </p>
        </div>

        <div className="min-w-0 col-span-2 lg:col-span-1">
          <p
            className={`font-heading text-xl sm:text-xl lg:text-3xl font-bold tracking-tight truncate ${totalPnL >= 0 ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
          >
            {totalPnL >= 0
              ? `+${totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : totalPnL.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            <span className="text-xs md:text-sm font-semibold ml-2">
              (
              {totalPnL >= 0
                ? `+${totalPnLPercentage.toFixed(2)}%`
                : `${totalPnLPercentage.toFixed(2)}%`}
              )
            </span>
          </p>
          <p className="text-xs text-ink/40 font-medium mt-1 uppercase tracking-wider">
            P&L
          </p>
        </div>
      </div>

      {/* ---------- Desktop Table (large screens only) ---------- */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
          <thead>
            <tr className="text-xs font-semibold text-brand-mid border-b border-brand-light/60 uppercase tracking-wider">
              <th className="py-3 px-4 w-[22%]">Instrument</th>
              <th className="py-3 px-4 w-[12%] text-right">QTY.</th>
              <th className="py-3 px-4 w-[15%] text-right">AVG.cost</th>
              <th className="py-3 px-4 w-[15%] text-right">LTP</th>
              <th className="py-3 px-4 w-[18%] text-right">Curr. val</th>
              <th className="py-3 px-4 w-[18%] text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-light/40 text-sm">
            {allHoldings.map((stock, index) => {
              const avg = stock.avg ?? 0;
              const price = stock.price ?? 0;
              const qty = stock.qty ?? 0;
              const currentValue = price * qty;
              const pnl = currentValue - avg * qty;
              const isProfit = pnl >= 0;
              const netPercent = avg > 0 ? ((price - avg) / avg) * 100 : 0;

              return (
                <tr
                  key={index}
                  className="hover:bg-brand-pale/40 transition-colors duration-150"
                >
                  <td className="py-3 px-4 text-brand-dark font-semibold truncate">
                    {stock.name}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-ink/80">
                    {qty}
                  </td>
                  <td className="py-3 px-4 text-right text-ink/60">
                    {avg.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-ink/60">
                    {price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-ink/80 font-medium">
                    {currentValue.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-semibold ${isProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                  >
                    {isProfit ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                    <span className="text-xs font-normal ml-1.5 text-ink/40">
                      ({isProfit ? '+' : ''}
                      {netPercent.toFixed(2)}%)
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ---------- Tablet Table (md to lg) ---------- */}
      <div className="hidden md:block lg:hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="text-[11px] font-semibold text-brand-mid border-b border-brand-light/60 uppercase tracking-wider">
              <th className="py-2.5 px-3">Instrument</th>
              <th className="py-2.5 px-3 text-right">Qty.</th>
              <th className="py-2.5 px-3 text-right">Avg.</th>
              <th className="py-2.5 px-3 text-right">LTP</th>
              <th className="py-2.5 px-3 text-right">Cur. val</th>
              <th className="py-2.5 px-3 text-right">P&L</th>
              <th className="py-2.5 px-3 text-right">Net chg.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-light/40 text-xs">
            {allHoldings.map((stock, index) => {
              const avg = stock.avg ?? 0;
              const price = stock.price ?? 0;
              const qty = stock.qty ?? 0;
              const currentValue = price * qty;
              const pnl = currentValue - avg * qty;
              const isProfit = pnl >= 0;
              const netPercent = avg > 0 ? ((price - avg) / avg) * 100 : 0;

              return (
                <tr
                  key={index}
                  className="hover:bg-brand-pale/40 transition-colors duration-150"
                >
                  <td className="py-2.5 px-3 text-brand-dark font-semibold whitespace-nowrap">
                    {stock.name}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-ink/80">
                    {qty}
                  </td>
                  <td className="py-2.5 px-3 text-right text-ink/60">
                    {avg.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-ink/60">
                    {price.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-ink/80 font-medium">
                    {currentValue.toFixed(2)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-semibold ${isProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                  >
                    {isProfit ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-medium ${isProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                  >
                    {isProfit ? '+' : ''}
                    {netPercent.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Card View ---------- */}
      <div className="block md:hidden space-y-2">
        {allHoldings.map((stock, index) => {
          const avg = stock.avg ?? 0;
          const price = stock.price ?? 0;
          const qty = stock.qty ?? 0;
          const currentValue = price * qty;
          const pnl = currentValue - avg * qty;
          const isProfit = pnl >= 0;
          const netPercent = avg > 0 ? ((price - avg) / avg) * 100 : 0;

          return (
            <div
              key={index}
              className="w-full border border-brand-light/60 rounded-xl p-3 bg-white shadow-sm hover:border-brand-mid transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-brand-dark text-sm truncate font-heading">
                    {stock.name}
                  </p>
                  <p className="text-[11px] text-ink/40 mt-0.5">Qty: {qty}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-bold ${isProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                  >
                    {isProfit ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                  </p>
                  <p
                    className={`text-[11px] font-medium ${isProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                  >
                    {isProfit ? '+' : ''}
                    {netPercent.toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs border-t border-brand-light/50 pt-2">
                <div className="min-w-0">
                  <p className="text-ink/40 text-[10px] uppercase">Avg. cost</p>
                  <p className="font-medium text-ink/80 mt-0.5 truncate">
                    {avg.toFixed(2)}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-ink/40 text-[10px] uppercase">LTP</p>
                  <p className="font-medium text-ink/80 mt-0.5 truncate">
                    {price.toFixed(2)}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-ink/40 text-[10px] uppercase">Curr. val</p>
                  <p className="font-medium text-ink/80 mt-0.5 truncate">
                    {currentValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-brand-light/60">
        <PortfolioChart holdings={allHoldings} />
      </div>
    </div>
  );
};

export default Holdings;
