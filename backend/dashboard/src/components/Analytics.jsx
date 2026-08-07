import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useOutletContext } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  const { refreshTrigger } = useOutletContext();

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [summaryRes, monthlyRes] = await Promise.all([
          axiosInstance.get('/analytics/summary'),
          axiosInstance.get('/analytics/monthly'),
        ]);
        setSummary(summaryRes.data);
        setMonthly(monthlyRes.data);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [refreshTrigger]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-ink/40 text-sm font-medium">Loading analytics...</p>
      </div>
    );

  return (
    <div className="w-full p-4 md:p-8 bg-white min-h-screen text-ink font-body">
      <div className="border-b border-brand-light/60 pb-4 mb-8">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-dark">
          Trading Analytics
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-brand-pale/60 border border-brand-light/60 rounded-2xl p-4 hover:border-brand-mid transition-colors duration-300">
          <p className="font-heading text-2xl font-bold text-brand-dark">
            {summary?.totalTrades ?? 0}
          </p>
          <p className="text-xs text-ink/50 font-medium mt-1 uppercase tracking-wide">
            Total Trades
          </p>
        </div>
        <div className="bg-brand-pale/60 border border-brand-light/60 rounded-2xl p-4 hover:border-brand-mid transition-colors duration-300">
          <p className="font-heading text-2xl font-bold text-brand-dark truncate">
            {summary?.mostTradedStock ?? 'N/A'}
          </p>
          <p className="text-xs text-ink/50 font-medium mt-1 uppercase tracking-wide">
            Most Traded
          </p>
        </div>
        <div className="bg-brand-pale/60 border border-brand-light/60 rounded-2xl p-4 hover:border-brand-mid transition-colors duration-300">
          <p className="font-heading text-2xl font-bold text-[#1D9E75]">
            {summary?.buyCount ?? 0}
          </p>
          <p className="text-xs text-ink/50 font-medium mt-1 uppercase tracking-wide">
            Buy Orders
          </p>
        </div>
        <div className="bg-brand-pale/60 border border-brand-light/60 rounded-2xl p-4 hover:border-brand-mid transition-colors duration-300">
          <p className="font-heading text-2xl font-bold text-[#D85A30]">
            {summary?.sellCount ?? 0}
          </p>
          <p className="text-xs text-ink/50 font-medium mt-1 uppercase tracking-wide">
            Sell Orders
          </p>
        </div>
      </div>

      {monthly.length > 0 && (
        <div className="bg-white border border-brand-light/60 rounded-2xl p-5 md:p-6">
          <h4 className="font-heading text-sm md:text-base font-semibold text-brand-dark mb-4">
            Monthly Trade Volume
          </h4>
          <div className="h-[300px]">
            <Line
              data={{
                labels: monthly.map((m) => m._id),
                datasets: [
                  {
                    label: 'Trade Value (₹)',
                    data: monthly.map((m) => m.totalValue),
                    borderColor: 'rgb(59, 130, 246 ,0.1)',
                    tension: 0.3,
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Analytics;
