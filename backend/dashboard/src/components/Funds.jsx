import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useOutletContext } from 'react-router-dom';

const Funds = () => {
  const { refreshTrigger } = useOutletContext();
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/funds')
      .then((res) => setFunds(res.data))
      .catch((err) => console.error('Failed to fetch funds:', err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="text-center text-ink/40 text-sm mt-8 font-medium">
        Loading funds...
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 bg-white min-h-screen text-ink font-body">
      <div className="border-b border-brand-light/60 pb-3 mb-4">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-dark">
          Funds
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
        <div className="bg-brand-pale/60 border border-brand-light/60 rounded-2xl p-4 hover:border-brand-mid transition-colors duration-300">
          <p className="font-heading text-2xl font-bold text-brand-dark">
            ₹
            {funds.availableBalance.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-ink/50 font-medium mt-1 uppercase tracking-wide">
            Available Balance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Funds;
