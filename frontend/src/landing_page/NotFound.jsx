import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-20 md:py-28 px-4 bg-gradient-to-b from-brand-pale/40 to-white animate-fade-up">
      <svg
        viewBox="0 0 200 140"
        className="w-full max-w-[220px] h-auto mb-8 animate-float"
      >
        <rect x="20" y="20" width="160" height="100" rx="18" fill="#E3FCF9" />
        <polyline
          points="40,90 70,70 95,80 120,50 150,60"
          fill="none"
          stroke="#4A89AC"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 8"
        />
        <circle cx="150" cy="60" r="6" fill="#446592" />
      </svg>

      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] text-brand-dark tracking-tight mb-4 font-bold">
        404 — Page not found
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-ink/60 text-center max-w-xs sm:max-w-md md:max-w-xl mb-8 leading-relaxed">
        The page you're looking for doesn't exist, or the route has moved.
      </p>

      <Link
        to="/"
        className="text-white text-[15px] font-semibold bg-brand-dark px-8 py-3 rounded-full hover:bg-brand-mid hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Notfound;
