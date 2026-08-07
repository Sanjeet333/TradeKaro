import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import BuysellModal from './BuysellModal';
import WatchlistChart from './WatchlistChart';
import axiosInstance from '../utils/axiosInstance';
import AddStockModal from './AddStockModal';
import socket from '../utils/socket';

const WatchList = ({ onOrderPlaced }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [watchedSymbols, setWatchedSymbols] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStock, setSelectedStock] = useState(null);
  const [orderMode, setOrederMode] = useState(null);

  const [showChart, setShowChart] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const res = await axiosInstance.get('/watchlist');
        setWatchedSymbols(res.data);
      } catch (err) {
        console.error('Failed to load watchlist:', err);
        setLoading(false);
      }
    };
    loadWatchlist();
  }, []);

  useEffect(() => {
    if (watchedSymbols.length === 0) {
      setWatchList([]);
      setLoading(false);
      return;
    }

    socket.connect();
    socket.emit('subscribe', watchedSymbols);

    const handlePriceUpdate = (quotes) => {
      const relevantQuotes = quotes.filter((q) =>
        watchedSymbols.includes(q.symbol)
      );
      const mapped = relevantQuotes.map((stock) => ({
        name: stock.symbol,
        price: stock.price,
        percent: `${stock.changePercent.toFixed(2)}%`,
        isDown: stock.change < 0,
      }));
      setWatchList(mapped);
      setLoading(false);
      setError('');
    };

    socket.on('priceUpdate', handlePriceUpdate);

    return () => {
      socket.off('priceUpdate', handlePriceUpdate);
    };
  }, [watchedSymbols]);

  const filteredData = watchList
    .filter((stock) => watchedSymbols.includes(stock.name))
    .filter((stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const openModal = (stock, mode) => {
    setSelectedStock(stock);
    setOrederMode(mode);
  };

  const closeModal = () => {
    setSelectedStock(null);
    setOrederMode(null);
  };

  const handleAddStock = async (symbol) => {
    try {
      const res = await axiosInstance.post('/watchlist/add', { symbol });
      setWatchedSymbols(res.data);
      setShowAddModal(false);

      const quoteRes = await axiosInstance.post('/stocks/quotes', {
        symbols: [symbol],
      });
      if (quoteRes.data.length > 0) {
        const newStock = quoteRes.data[0];
        const mappedStock = {
          name: newStock.symbol,
          price: newStock.price,
          percent: `${newStock.changePercent.toFixed(2)}%`,
          isDown: newStock.change < 0,
        };
        setWatchList((prev) => {
          const exists = prev.find((s) => s.name === newStock.symbol);
          if (exists) return prev;
          return [...prev, mappedStock];
        });
      }
    } catch (err) {
      console.error('Failed to add stock:', err);
    }
  };

  const handleRemoveStock = async (symbol) => {
    try {
      const res = await axiosInstance.post('/watchlist/remove', { symbol });
      setWatchedSymbols(res.data);
    } catch (err) {
      console.error('Failed to remove stock:', err);
    }
  };

  const handleOrderPlaced = () => {
    console.log('Order placed successfully!');
    if (onOrderPlaced) {
      onOrderPlaced();
    }
  };

  return (
    <div className="w-full h-full border-r border-brand-light/60 bg-white flex flex-col font-body select-none">
      <div className="relative flex items-center p-3 border-b border-brand-light/50 group shrink-0">
        <SearchIcon
          className="absolute left-6 text-ink/30 group-focus-within:text-brand-mid transition-colors duration-200"
          style={{ fontSize: 18 }}
        />
        <input
          type="text"
          placeholder="Search eg: infy bse, nifty fut, gold mcx"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-brand-pale/40 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-mid text-ink/80 transition-all duration-200 placeholder-ink/30"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-2 text-xs sm:text-sm cursor-pointer text-brand-mid hover:text-brand-dark font-semibold px-2 shrink-0 transition-colors duration-200"
        >
          {' '}
          + Add{' '}
        </button>
      </div>

      <div className="px-3 py-2.5 border-b border-brand-light/50 shrink-0">
        <button
          onClick={() => setShowChart(!showChart)}
          className="flex items-center gap-1.5 text-xs text-ink/50 hover:text-brand-dark transition-colors duration-200 font-medium"
        >
          <BarChartIcon style={{ fontSize: 16 }} />
          {showChart ? 'Hide chart' : 'Show chart'}
        </button>
      </div>

      {showChart && (
        <div className="p-3 border-b border-brand-light/50 shrink-0">
          <WatchlistChart watchList={filteredData} />
        </div>
      )}

      {error && (
        <p className="text-xs text-[#D85A30] text-center py-2 font-medium">
          {error}
        </p>
      )}

      <div className="flex-1 overflow-y-auto divide-y divide-brand-light/40 custom-scrollbar min-h-0">
        {loading ? (
          <div className="text-center text-ink/40 text-sm mt-8 font-medium">
            Loading live prices...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center text-ink/40 text-sm mt-8 font-medium">
            No stocks found
          </div>
        ) : (
          filteredData.map((stock) => (
            <div
              key={stock.name}
              className="relative px-3 sm:px-4 py-2.5 hover:bg-brand-pale/40 cursor-pointer group transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-brand-dark truncate font-heading">
                    {stock.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 md:group-hover:opacity-0 transition-opacity duration-100 shrink-0">
                  <span
                    className="text-[10px] sm:text-xs flex items-center font-semibold"
                    style={{ color: stock.isDown ? '#D85A30' : '#1D9E75' }}
                  >
                    {stock.isDown ? (
                      <KeyboardArrowDownIcon style={{ fontSize: 14 }} />
                    ) : (
                      <KeyboardArrowUpIcon style={{ fontSize: 14 }} />
                    )}
                    {stock.percent}
                  </span>
                  <span
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: stock.isDown ? '#D85A30' : '#1D9E75' }}
                  >
                    {stock.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-brand-light/40 md:mt-0 md:pt-0 md:border-t-0 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:hidden md:group-hover:flex md:bg-brand-pale/60 md:pl-2 md:rounded-lg">
                <button
                  onClick={() => openModal(stock, 'BUY')}
                  className="border border-brand-light/70 hover:bg-[#1D9E75]/10 hover:border-[#1D9E75] text-ink/60 hover:text-[#1D9E75] text-xs font-bold px-2.5 py-1 rounded-lg transition-colors duration-200"
                >
                  B
                </button>
                <button
                  onClick={() => openModal(stock, 'SELL')}
                  className="border border-brand-light/70 hover:bg-[#D85A30]/10 hover:border-[#D85A30] text-ink/60 hover:text-[#D85A30] text-xs font-bold px-2.5 py-1 rounded-lg transition-colors duration-200"
                >
                  S
                </button>
                <button className="p-1 text-ink/40 hover:text-brand-dark hover:bg-brand-pale rounded-lg transition-colors duration-200">
                  <BarChartIcon style={{ fontSize: 16 }} />
                </button>
                <button
                  onClick={() => handleRemoveStock(stock.name)}
                  className="p-1 text-ink/40 hover:text-[#D85A30] hover:bg-[#D85A30]/10 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <DeleteOutlineIcon style={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedStock && (
        <BuysellModal
          stock={selectedStock}
          mode={orderMode}
          onClose={closeModal}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {showAddModal && (
        <AddStockModal
          onAdd={handleAddStock}
          onClose={() => setShowAddModal(false)}
          existingSymbols={watchedSymbols}
        />
      )}
    </div>
  );
};

export default WatchList;
