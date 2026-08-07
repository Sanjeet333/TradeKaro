import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WatchlistChart = ({ watchList }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!watchList || watchList.length === 0) {
    return (
      <div className="text-center text-ink/40 text-sm py-8 font-medium">
        No stocks to display chart
      </div>
    );
  }

  const labels = watchList.map((stock) => stock.name);

  const dataValues = watchList.map((stock) => {
    const numericPercent =
      parseFloat(String(stock.percent).replace('%', '')) || 0;
    return stock.isDown ? -Math.abs(numericPercent) : Math.abs(numericPercent);
  });

  const backgroundColors = watchList.map((stock) =>
    stock.isDown ? 'rgba(216, 90, 48, 0.75)' : 'rgba(29, 158, 117, 0.75)'
  );
  const borderColors = watchList.map((stock) =>
    stock.isDown ? 'rgb(216, 90, 48)' : 'rgb(29, 158, 117)'
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: '% Change',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const barThickness = 22;
  const dynamicHeight = Math.max(280, labels.length * (barThickness + 8));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}%`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => `${value}%`,
          font: { size: 10, family: 'Inter, sans-serif' },
        },
        grid: { color: 'rgba(68,101,146,0.06)' },
      },
      y: {
        ticks: {
          autoSkip: false,
          font: { size: 10, family: 'Inter, sans-serif' },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto font-body">
      <h4 className="font-heading text-sm font-semibold text-brand-dark mb-4 text-center">
        Watchlist % Change ({labels.length} stocks)
      </h4>
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        <div style={{ height: `${dynamicHeight}px` }} className="relative">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default WatchlistChart;
