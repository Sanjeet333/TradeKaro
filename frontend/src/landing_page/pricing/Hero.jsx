import React from 'react';

const Hero = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20 font-body text-center">
      <div className="mb-10 md:mb-16 animate-fade-up">
        <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading mb-3">
          Transparent pricing
        </span>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-3 tracking-tight">
          Charges
        </h1>
        <p className="text-base md:text-xl text-ink/50">
          A clear breakdown of every fee — no fine print
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[400px] md:max-w-2xl mx-auto mb-16 md:mb-20">
        <div className="p-4 flex flex-col items-center group transition-all duration-200 hover:bg-brand-pale/50 rounded-2xl animate-fade-up">
          <svg
            viewBox="0 0 200 160"
            className="w-full max-w-[180px] md:max-w-[220px] h-auto mb-6 transition-transform duration-300 group-hover:scale-105"
          >
            <rect
              x="20"
              y="20"
              width="160"
              height="120"
              rx="20"
              fill="#E3FCF9"
            />
            <text
              x="100"
              y="75"
              textAnchor="middle"
              fontSize="34"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
              fill="#446592"
            >
              ₹0
            </text>
            <line
              x1="60"
              y1="100"
              x2="140"
              y2="100"
              stroke="#ACE5F6"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="font-heading text-xl md:text-[22px] font-semibold text-brand-dark mb-3">
            Equity delivery
          </h2>
          <p className="text-sm md:text-[15px] text-ink/60 leading-relaxed max-w-[320px]">
            Equity delivery orders placed through the platform carry ₹0
            brokerage.
          </p>
        </div>

        <div
          className="p-4 flex flex-col items-center group transition-all duration-200 hover:bg-brand-pale/50 rounded-2xl animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <svg
            viewBox="0 0 200 160"
            className="w-full max-w-[180px] md:max-w-[220px] h-auto mb-6 transition-transform duration-300 group-hover:scale-105"
          >
            <rect
              x="20"
              y="20"
              width="160"
              height="120"
              rx="20"
              fill="#E3FCF9"
            />
            <text
              x="100"
              y="75"
              textAnchor="middle"
              fontSize="34"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
              fill="#446592"
            >
              ₹0
            </text>
            <line
              x1="60"
              y1="100"
              x2="140"
              y2="100"
              stroke="#4A89AC"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="font-heading text-xl md:text-[22px] font-semibold text-brand-dark mb-3">
            Intraday trades
          </h2>
          <p className="text-sm md:text-[15px] text-ink/60 leading-relaxed max-w-[320px]">
            Intraday orders placed and squared off the same day also carry ₹0
            brokerage, tracked live in your positions dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-brand-dark rounded-3xl p-6 md:p-8 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-light mb-4 font-heading">
          Worked example
        </p>
        <p className="text-sm md:text-base text-white/70 mb-5">
          Buying 10 shares intraday and selling the same day:
        </p>
        <div className="space-y-2.5 text-sm md:text-base">
          <div className="flex justify-between text-white/70">
            <span>Buy order (10 qty)</span>
            <span className="font-heading font-semibold text-white">₹0</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Sell order (10 qty)</span>
            <span className="font-heading font-semibold text-white">₹0</span>
          </div>
          <div className="h-px bg-white/15 my-3"></div>
          <div className="flex justify-between">
            <span className="font-heading font-semibold text-brand-light">
              Total charges
            </span>
            <span className="font-heading font-bold text-brand-light text-lg">
              ₹0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
