import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/product', label: 'Products' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/support', label: 'Support' },
  ];

  return (
    <nav
      className={`w-full bg-brand-pale/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-[0_4px_20px_-8px_rgba(68,101,146,0.25)] border-b border-transparent'
          : 'border-b border-brand-light'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <svg
              className="w-6 h-6 text-brand-dark transition-transform duration-500 ease-out group-hover:rotate-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4A89AC] ring-2 ring-brand-pale animate-pulse"></span>
          </div>
          <span className="font-heading font-bold text-lg text-brand-dark">
            TradeKaro
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-brand-dark font-medium">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative group py-1 transition-colors duration-500 ease-out hover:text-brand-mid focus-visible:outline-none focus-visible:text-brand-mid ${
                  isActive ? 'text-brand-dark' : 'text-brand-dark/80'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-mid origin-left transition-transform duration-500 ease-out ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                  }`}
                ></span>
              </Link>
            );
          })}
          <Link
            to="/signup"
            className="bg-brand-dark hover:bg-brand-mid text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          >
            Sign up
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="text-brand-dark focus:outline-none transition-transform duration-300 ease-out active:scale-90 p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-brand-pale border-t border-brand-light shadow-sm ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="px-6 py-5 flex flex-col text-sm text-brand-dark gap-4">
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                style={{ transitionDelay: isOpen ? `${idx * 40}ms` : '0ms' }}
                className={`transition-all duration-300 ease-out pl-3 border-l-2 ${
                  isActive
                    ? 'text-brand-dark font-semibold border-brand-mid'
                    : 'text-brand-dark/80 border-transparent hover:text-brand-mid hover:border-brand-light'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-brand-dark hover:bg-brand-mid text-white text-center font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ease-out mt-1"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
