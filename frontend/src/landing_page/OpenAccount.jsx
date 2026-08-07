import React from 'react';
import { Link } from 'react-router-dom';

const OpenAccount = ({
  heading = 'Open a TradeKaro account',
  subtext = 'Modern platforms, ₹0 investments, and simulated trading — risk-free.',
  ctaLabel = 'Sign up for free',
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-16 md:py-20 px-4 bg-gradient-to-b from-white via-brand-pale/30 to-white relative overflow-hidden">
      <svg
        viewBox="0 0 200 60"
        className="absolute top-6 right-6 md:right-16 w-24 md:w-32 h-auto opacity-60 animate-float"
      >
        <polyline
          points="10,50 40,35 65,42 90,20 120,28 150,10"
          fill="none"
          stroke="#4A89AC"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="150" cy="10" r="4" fill="#446592" />
      </svg>

      <div className="inline-flex items-center gap-1.5 bg-white rounded-full shadow-sm border border-brand-light/70 px-3 py-1.5 mb-6 animate-fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4A89AC] animate-pulse"></span>
        <span className="text-[10px] md:text-xs font-semibold text-brand-dark font-heading">
          Free forever
        </span>
      </div>

      <h1
        className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] text-brand-dark tracking-tight mb-4 font-bold animate-fade-up"
        style={{ animationDelay: '0.05s' }}
      >
        {heading}
      </h1>
      <p
        className="text-sm sm:text-base md:text-lg text-brand-mid text-center max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mb-8 leading-relaxed animate-fade-up"
        style={{ animationDelay: '0.1s' }}
      >
        {subtext}
      </p>
      <Link
        to="/signup"
        className="text-white text-[16px] font-semibold bg-brand-dark px-8 py-3 rounded-full hover:bg-brand-mid hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md animate-fade-up"
        style={{ animationDelay: '0.15s' }}
      >
        {ctaLabel}
      </Link>
    </div>
  );
};

export default OpenAccount;
