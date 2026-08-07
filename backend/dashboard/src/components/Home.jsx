import React, { useState } from 'react';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';
import WatchList from './WatchList';

const Home = () => {
  const [mobileView, setMobileView] = useState('dashboard');

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerrefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-brand-pale/30 flex flex-col font-body">
      <TopBar refreshTrigger={refreshTrigger} />

      {/* Mobile/Tablet Tab Switcher */}
      <div className="flex md:hidden border-b border-brand-light/60 bg-white sticky top-16 z-30">
        <button
          onClick={() => setMobileView('watchlist')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
            mobileView === 'watchlist'
              ? 'text-brand-dark border-b-2 border-brand-mid'
              : 'text-ink/40 border-b-2 border-transparent'
          }`}
        >
          Watchlist
        </button>
        <button
          onClick={() => setMobileView('dashboard')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
            mobileView === 'dashboard'
              ? 'text-brand-dark border-b-2 border-brand-mid'
              : 'text-ink/40 border-b-2 border-transparent'
          }`}
        >
          Portfolio
        </button>
      </div>

      <div className="w-full flex flex-1">
        {/* WatchList Panel */}
        <div
          className={`
            w-full md:w-[420px] shrink-0 border-r border-brand-light/60 
            h-[calc(100vh-64px-49px)] md:h-[calc(100vh-64px)] 
            overflow-y-auto sticky top-[113px] md:top-16
            ${mobileView === 'watchlist' ? 'block' : 'hidden'} md:block
          `}
        >
          <WatchList onOrderPlaced={triggerrefresh} />
        </div>

        {/* Dashboard/Outlet Panel */}
        <div
          className={`
            flex-1 px-4 md:px-8 py-6 min-h-0 bg-white overflow-y-auto
            ${mobileView === 'dashboard' ? 'block' : 'hidden'} md:block
          `}
        >
          <Outlet context={{ refreshTrigger }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
