import React from 'react';

const Awards = () => {
  return (
    <div className="w-full flex items-center justify-center py-16 md:py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center justify-center relative p-4 animate-float order-2 md:order-1">
          <svg viewBox="0 0 320 260" className="w-full max-w-md">
            <rect
              x="20"
              y="20"
              width="280"
              height="220"
              rx="24"
              fill="#E3FCF9"
            />
            <line
              x1="45"
              y1="60"
              x2="45"
              y2="100"
              stroke="#ACE5F6"
              strokeWidth="2"
            />
            <rect x="38" y="68" width="14" height="24" rx="2" fill="#4A89AC" />
            <line
              x1="85"
              y1="50"
              x2="85"
              y2="110"
              stroke="#ACE5F6"
              strokeWidth="2"
            />
            <rect x="78" y="60" width="14" height="38" rx="2" fill="#446592" />
            <line
              x1="125"
              y1="70"
              x2="125"
              y2="120"
              stroke="#ACE5F6"
              strokeWidth="2"
            />
            <rect x="118" y="78" width="14" height="30" rx="2" fill="#4A89AC" />
            <line
              x1="165"
              y1="40"
              x2="165"
              y2="95"
              stroke="#ACE5F6"
              strokeWidth="2"
            />
            <rect x="158" y="48" width="14" height="34" rx="2" fill="#446592" />
            <line
              x1="205"
              y1="55"
              x2="205"
              y2="115"
              stroke="#ACE5F6"
              strokeWidth="2"
            />
            <rect x="198" y="65" width="14" height="36" rx="2" fill="#4A89AC" />
            <line
              x1="245"
              y1="35"
              x2="245"
              y2="90"
              stroke="#ACE5F6"
              strokeWidth="2"
            />
            <rect x="238" y="42" width="14" height="34" rx="2" fill="#446592" />
            <circle cx="270" cy="45" r="5" fill="#4A89AC">
              <animate
                attributeName="r"
                values="5;9;5"
                dur="1.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          <div className="absolute top-1 right-1 md:right-4 bg-white rounded-full shadow-sm border border-brand-light/70 px-3 py-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A89AC] animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-semibold text-brand-dark font-heading">
              Market open
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-ink order-1 md:order-2">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading">
            Live Trading Engine
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
            Real-time market data, built from scratch
          </h1>
          <p className="text-base md:text-lg text-ink/60 leading-relaxed">
            A WebSocket connection streams live prices for 500+ stocks straight
            into the dashboard, powering everything from watchlists to open
            positions:
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2 text-sm md:text-base font-medium text-ink/80">
            {[
              'Live price via WebSocket',
              'Intraday positions',
              'Holdings dashboard',
              'Real-time P&L tracking',
              '500+ stocks tracked',
              'Order placement & history',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 min-h-[24px]"
              >
                <span className="w-1.5 h-1.5 bg-brand-mid rounded-full block shrink-0"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-brand-light/60">
            <p className="text-xs md:text-sm text-ink/50">
              Prices update live over a WebSocket connection — no page refresh
              needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
