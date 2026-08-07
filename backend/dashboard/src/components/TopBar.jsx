import React from 'react';
import Menu from './Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const TopBar = ({ refreshTrigger }) => {
  const { logout, user } = useAuth();

  return (
    <nav className="w-full bg-white border-b border-brand-light/60 h-16 sticky top-0 z-50">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 min-w-0">
          {/* Logo */}
          <div className="cursor-pointer shrink-0 relative">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-brand-dark"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4A89AC] ring-2 ring-white animate-pulse"></span>
          </div>

          {/* Indices */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-[11px] text-ink/50 border-l border-brand-light/60 pl-3 lg:pl-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:gap-2 whitespace-nowrap">
              <span className="font-semibold text-ink/70 font-heading">
                Nifty 50
              </span>
              <span className="text-[#1D9E75] font-medium">24,120.40</span>
            </div>
            <div className="hidden lg:flex flex-col sm:flex-row sm:gap-2 whitespace-nowrap">
              <span className="font-semibold text-ink/70 font-heading">
                SENSEX
              </span>
              <span className="text-[#1D9E75] font-medium">79,250.68</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Menu refreshTrigger={refreshTrigger} username={user?.username} />
          <button
            onClick={logout}
            className="flex items-center gap-1 text-xs sm:text-sm text-ink/50 hover:text-[#D85A30] transition-colors duration-200 px-2.5 py-1.5 rounded-lg hover:bg-[#D85A30]/10"
          >
            <LogoutIcon style={{ fontSize: 16 }} />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
