import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Menu as MenuIcon, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import NotificationBell from './NotificationBell';

const navLinkClass = ({ isActive }) =>
  `cursor-pointer transition-colors duration-200 ${isActive ? 'text-brand-dark font-semibold' : 'text-ink/50 hover:text-brand-mid'}`;

const Menu = ({ refreshTrigger, username }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 md:gap-8 relative font-body">
      <ul className="hidden lg:flex items-center gap-7 text-[14px] font-medium">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/orders" className={navLinkClass}>
          Orders
        </NavLink>
        <NavLink to="/holdings" className={navLinkClass}>
          Holdings
        </NavLink>
        <NavLink to="/positions" className={navLinkClass}>
          Positions
        </NavLink>
        <NavLink to="/funds" className={navLinkClass}>
          Funds
        </NavLink>
        <NavLink to="/analytics" className={navLinkClass}>
          Analytics
        </NavLink>
      </ul>

      {/* Hamburger Icon*/}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-1.5 text-ink/50 hover:text-brand-dark hover:bg-brand-pale/60 rounded-lg transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </button>

      {/* Mobile/Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-brand-light/70 rounded-2xl shadow-[0_10px_30px_-10px_rgba(68,101,146,0.25)] py-2 lg:hidden z-50 animate-fade-up">
          <ul className="flex flex-col text-sm text-ink/70 font-medium">
            <NavLink
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 hover:bg-brand-pale/50 transition-colors duration-200 ${isActive ? 'text-brand-dark font-semibold bg-brand-pale/60' : ''}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 hover:bg-brand-pale/50 transition-colors duration-200 ${isActive ? 'text-brand-dark font-semibold bg-brand-pale/60' : ''}`
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/holdings"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 hover:bg-brand-pale/50 transition-colors duration-200 ${isActive ? 'text-brand-dark font-semibold bg-brand-pale/60' : ''}`
              }
            >
              Holdings
            </NavLink>
            <NavLink
              to="/positions"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 hover:bg-brand-pale/50 transition-colors duration-200 ${isActive ? 'text-brand-dark font-semibold bg-brand-pale/60' : ''}`
              }
            >
              Positions
            </NavLink>
            <NavLink
              to="/funds"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 hover:bg-brand-pale/50 transition-colors duration-200 ${isActive ? 'text-brand-dark font-semibold bg-brand-pale/60' : ''}`
              }
            >
              Funds
            </NavLink>
          </ul>
        </div>
      )}

      {/* Right Icons */}
      <div className="flex items-center gap-3 sm:gap-5 border-l border-brand-light/60 pl-3 sm:pl-6">
        <NotificationBell refreshTrigger={refreshTrigger} />
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-brand-pale flex items-center justify-center border border-brand-light/70 group-hover:border-brand-mid transition-colors duration-200">
            <User className="w-3.5 h-3.5 text-brand-mid" />
          </div>
          <span className="text-xs uppercase text-ink/50 font-semibold hidden sm:block">
            {username || 'User'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
