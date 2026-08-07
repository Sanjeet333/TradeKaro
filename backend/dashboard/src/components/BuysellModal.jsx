import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { X, Check } from 'lucide-react';

const BuysellModal = ({ stock, mode, onClose, onOrderPlaced }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock.price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productType, setProductType] = useState('CNC');

  const isBuy = mode === 'BUY';

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (qty <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    if (price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post('/newOrder', {
        name: stock.name,
        qty: Number(qty),
        price: Number(price),
        mode: mode,
        productType: productType,
      });

      onOrderPlaced();
      onClose();
    } catch (err) {
      console.error('Error Placing order:', err);
      setError(err.response?.data?.error || 'Failed to Place Order');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 font-body">
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(68,101,146,0.35)] w-full max-w-sm p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <h2
            className={`font-heading text-lg font-bold ${isBuy ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
          >
            {isBuy ? 'Buy' : 'Sell'} {stock.name}
          </h2>
          <button
            onClick={onClose}
            className="text-ink/40 hover:text-brand-dark transition-colors duration-200"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-ink/50 uppercase tracking-wide mb-1.5 block">
              Product type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setProductType('CNC')}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border-2 flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  productType === 'CNC'
                    ? 'bg-brand-dark border-brand-dark text-white shadow-sm scale-[1.02]'
                    : 'border-brand-light/70 text-ink/50 hover:border-brand-mid hover:text-brand-dark'
                }`}
              >
                {productType === 'CNC' && (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                )}
                Delivery (CNC)
              </button>
              <button
                type="button"
                onClick={() => setProductType('MIS')}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border-2 flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  productType === 'MIS'
                    ? 'bg-brand-dark border-brand-dark text-white shadow-sm scale-[1.02]'
                    : 'border-brand-light/70 text-ink/50 hover:border-brand-mid hover:text-brand-dark'
                }`}
              >
                {productType === 'MIS' && (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                )}
                Intraday (MIS)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink/50 uppercase tracking-wide">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full mt-1.5 px-3.5 py-2.5 border border-brand-light/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink/50 uppercase tracking-wide">
              Price
            </label>

            <input
              type="number"
              step="0.01"
              min="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-1.5 px-3.5 py-2.5 border border-brand-light/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200 text-sm"
            />
          </div>

          <div className="text-xs font-medium text-ink/60 border-t border-brand-light/60 pt-3 flex justify-between">
            <span>Total</span>
            <span className="font-heading font-bold text-brand-dark text-sm">
              ₹{(qty * price).toFixed(2)}
            </span>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-brand-light/70 text-ink/60 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-pale/40 transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md ${isBuy ? 'bg-[#1D9E75] hover:bg-[#178562]' : 'bg-[#D85A30] hover:bg-[#c04a24]'} disabled:opacity-50 disabled:hover:scale-100`}
            >
              {loading ? 'Placing...' : isBuy ? 'Buy' : 'Sell'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BuysellModal;
