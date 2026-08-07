import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioChart = ({ holdings }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!holdings || holdings.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm py-8">
        No holdings to display chart
      </div>
    );
  }

  const labels = holdings.map((stock) => stock.name);
  const dataValues = holdings.map(
    (stock) => (stock.price ?? 0) * (stock.qty ?? 0)
  );

  const total = dataValues.reduce((sum, val) => sum + val, 0);

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 55%)`);
    }
    return colors;
  };

  const backgroundColors = generateColors(labels.length);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Current Value (₹)',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          boxWidth: 12,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h4 className="text-sm font-medium text-gray-600 mb-4 text-center">
        Portfolio Allocation
      </h4>
      <div className="relative h-64 sm:h-72 md:h-80">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PortfolioChart;
