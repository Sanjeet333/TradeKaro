import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Positions = () => {
  const { refreshTrigger } = useOutletContext();
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastKnownPrices = useRef({});

  useEffect(() => {
    const loadPositionsWithLivePrices = async () => {
      try {
        const res = await axiosInstance.get('/allPositions');
        const positions = res.data;

        if (positions.length === 0) {
          setAllPositions([]);
          setLoading(false);
          return;
        }

        const symbols = positions.map((p) => p.name);
        const quotesRes = await axiosInstance.post('/stocks/quotes', {
          symbols,
        });

        const merged = positions.map((p) => {
          const liveQuote = quotesRes.data.find((q) => q.symbol === p.name);
          if (liveQuote) {
            lastKnownPrices.current[p.name] = liveQuote.price;
          }
          const resolvedPrice = liveQuote
            ? liveQuote.price
            : (lastKnownPrices.current[p.name] ?? p.price);

          return { ...p, price: resolvedPrice };
        });

        setAllPositions(merged);
      } catch (err) {
        console.error('Failed to load positions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPositionsWithLivePrices();
    const interval = setInterval(loadPositionsWithLivePrices, 15000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  let totalInvestment = 0;
  let totalCurrentValue = 0;

  allPositions.forEach((pos) => {
    totalInvestment += (pos.avg ?? 0) * (pos.qty ?? 0);
    totalCurrentValue += (pos.price ?? 0) * (pos.qty ?? 0);
  });

  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <div className="w-full p-4 md:p-6 bg-white min-h-screen text-ink font-body">
      <div className="border-b border-brand-light/60 pb-3 mb-4">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-dark">
          Positions ({allPositions.length})
        </h3>
      </div>

      {loading ? (
        <div className="text-center text-ink/40 text-sm mt-8 font-medium">
          Loading positions...
        </div>
      ) : allPositions.length === 0 ? (
        <div className="text-center text-ink/40 text-sm mt-8 font-medium">
          No open positions
        </div>
      ) : (
        <>
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

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
              <thead>
                <tr className="text-xs font-semibold text-brand-mid border-b border-brand-light/60 uppercase tracking-wider">
                  <th className="py-3 px-4 w-[12%]">Product</th>
                  <th className="py-3 px-4 w-[22%]">Instrument</th>
                  <th className="py-3 px-4 w-[11%] text-right">Qty.</th>
                  <th className="py-3 px-4 w-[16%] text-right">Avg. cost</th>
                  <th className="py-3 px-4 w-[13%] text-right">LTP</th>
                  <th className="py-3 px-4 w-[13%] text-right">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/40 text-sm">
                {allPositions.map((pos, index) => {
                  const avg = pos.avg ?? 0;
                  const price = pos.price ?? 0;
                  const qty = pos.qty ?? 0;
                  const pnl = (price - avg) * qty;
                  const isProfit = pnl >= 0;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-brand-pale/40 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 text-brand-mid font-semibold text-xs">
                        <span className="bg-brand-pale px-2 py-0.5 rounded-full">
                          {pos.product}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-brand-dark">
                        {pos.name}
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
                      <td
                        className={`py-3 px-4 text-right font-semibold ${isProfit ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                      >
                        {isProfit ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Positions;
