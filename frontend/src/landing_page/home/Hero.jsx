import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-6 md:px-12 md:py-20 bg-gradient-to-b from-brand-pale to-white">
      <div className="w-full max-w-3xl mx-auto flex justify-center mb-10 relative animate-float">
        <svg viewBox="0 0 420 280" className="w-full h-auto max-h-[400px]">
          <rect
            x="10"
            y="10"
            width="400"
            height="260"
            rx="28"
            fill="white"
            stroke="#ACE5F6"
            strokeWidth="2"
          />

          <rect x="36" y="34" width="100" height="12" rx="6" fill="#446592" />
          <circle cx="372" cy="40" r="9" fill="#4A89AC" />
          <circle cx="344" cy="40" r="9" fill="#ACE5F6" />

          {[
            { name: 90, change: '#4A89AC' },
            { name: 70, change: '#446592' },
            { name: 110, change: '#ACE5F6' },
          ].map((row, i) => (
            <g key={i} transform={`translate(0, ${70 + i * 40})`}>
              <rect
                x="36"
                y="0"
                width="348"
                height="30"
                rx="10"
                fill="#E3FCF9"
              />
              <rect
                x="52"
                y="11"
                width={row.name}
                height="9"
                rx="4"
                fill="#446592"
              />
              <rect
                x="330"
                y="11"
                width="40"
                height="9"
                rx="4"
                fill={row.change}
              />
            </g>
          ))}

          <polyline
            points="36,240 90,220 140,232 190,200 240,212 290,180 340,190 384,160"
            fill="none"
            stroke="#4A89AC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="384" cy="160" r="5" fill="#446592">
            <animate
              attributeName="r"
              values="5;8;5"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <div
          className="absolute -bottom-4 -left-2 sm:left-4 md:-left-6 bg-white rounded-2xl shadow-[0_10px_30px_-8px_rgba(68,101,146,0.3)] border border-brand-light/70 px-4 py-3 flex items-center gap-3 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="w-2 h-2 rounded-full bg-[#4A89AC] animate-pulse"></div>
          <div>
            <p className="text-[11px] text-ink/50 font-medium leading-none">
              Order filled
            </p>
            <p className="text-xs font-bold text-brand-dark mt-1">
              INFY · 12 qty @ ₹1,842
            </p>
          </div>
        </div>
      </div>

      <div className="animate-fade-up text-center">
        <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading mb-3">
          A Learning Project
        </span>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-[64px] text-brand-dark tracking-tight mb-4 font-bold leading-[1.05]">
          Invest in everything
        </h1>
        <p className="text-base md:text-lg text-ink/60 max-w-2xl mb-7 mx-auto">
          A self-built platform to explore stocks and derivatives — designed and
          coded end-to-end as a full-stack project.
        </p>
        <Link
          to="/signup"
          className="text-white text-[15px] md:text-[16px] font-semibold bg-brand-dark px-8 py-4 rounded-full cursor-pointer hover:bg-brand-mid hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Signup now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
