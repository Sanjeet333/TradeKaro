import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axiosInstance from '../utils/axiosInstance';
import { X, Search } from 'lucide-react';

const AddStockModal = ({ onAdd, onClose, existingSymbols = [] }) => {
  const [allStocks, setAllStocks] = useState([]);
  const [query, setQuery] = useState('');
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/stocks/list')
      .then((res) => setAllStocks(res.data))
      .finally(() => setListLoading(false));
  }, []);

  const filtered = query
    ? allStocks
        .filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.symbol.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 15)
    : [];

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 font-body">
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(68,101,146,0.35)] w-full max-w-sm p-5 animate-fade-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-sm font-bold text-brand-dark">
            Add Stock
          </h3>
          <button
            onClick={onClose}
            className="text-ink/40 hover:text-brand-dark transition-colors duration-200"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="relative mb-3">
          <Search
            className="w-4 h-4 text-ink/30 absolute left-3 top-1/2 -translate-y-1/2"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search stocks (e.g. Reliance, TCS)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-brand-light/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200"
            autoFocus
          />
        </div>

        {listLoading && (
          <p className="text-xs text-ink/40 text-center py-4">
            Loading stocks...
          </p>
        )}

        <div className="max-h-64 custom-scrollbar overflow-y-auto divide-y divide-brand-light/40">
          {filtered.map((stock) => {
            const alreadyAdded = existingSymbols.includes(stock.symbol);
            return (
              <div
                key={stock.symbol}
                onClick={() => !alreadyAdded && onAdd(stock.symbol)}
                className={`py-2.5 px-2 flex justify-between items-center rounded-lg transition-colors duration-150 ${
                  alreadyAdded
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-brand-pale/50 cursor-pointer'
                }`}
              >
                <span className="text-sm font-semibold text-brand-dark font-heading">
                  {stock.symbol}
                </span>
                <span className="text-xs text-ink/40 truncate ml-2">
                  {alreadyAdded ? 'Added' : stock.name}
                </span>
              </div>
            );
          })}
          {query && !listLoading && filtered.length === 0 && (
            <p className="text-xs text-ink/40 text-center py-4">
              No matches found
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddStockModal;
