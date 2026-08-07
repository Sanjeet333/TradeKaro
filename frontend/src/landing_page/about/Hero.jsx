import React from 'react';

const tickers = [
  { sym: 'RELI', chg: '+1.24%', up: true },
  { sym: 'TCS', chg: '-0.42%', up: false },
  { sym: 'HDFC', chg: '+0.87%', up: true },
  { sym: 'INFY', chg: '+2.10%', up: true },
  { sym: 'ITC', chg: '-0.15%', up: false },
  { sym: 'WIPRO', chg: '+0.56%', up: true },
  { sym: 'SBIN', chg: '-1.03%', up: false },
  { sym: 'AXIS', chg: '+0.31%', up: true },
];

const TickerStrip = () => {
  const row = [...tickers, ...tickers];
  return (
    <div className="w-full overflow-hidden bg-brand-dark py-2.5 select-none">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/80 font-heading"
          >
            {t.sym}
            <span className={t.up ? 'text-[#8FE3C0]' : 'text-[#F0A0A0]'}>
              {t.chg}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="w-full">
      <TickerStrip />

      <div className="w-full max-w-7xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest uppercase text-white bg-brand-dark px-3 py-1.5 rounded-full font-heading mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FE3C0] animate-pulse"></span>
              A Full-Stack Fintech Platform
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] text-brand-dark tracking-tight">
              Investing shouldn't feel complicated.
            </h1>
            <p className="text-ink/60 font-medium text-lg sm:text-xl md:text-2xl mt-4 max-w-lg">
              So I built a platform that makes it simple — and actually
              understood how it works underneath.
            </p>
          </div>

          <div className="relative flex items-center justify-center animate-float">
            <svg viewBox="0 0 340 200" className="w-full max-w-xs md:max-w-sm">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ACE5F6" />
                  <stop offset="100%" stopColor="#446592" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="340"
                height="200"
                rx="20"
                fill="#E3FCF9"
              />
              <polyline
                points="20,160 70,140 110,150 150,90 190,110 230,60 270,75 320,30"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="340"
                className="animate-draw-line"
              />
              <circle cx="320" cy="30" r="6" fill="#446592">
                <animate
                  attributeName="r"
                  values="6;9;6"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-3 md:gap-5 mt-14 md:mt-20 animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          {[
            { value: 'MERN', label: 'Built end-to-end' },
            { value: '100%', label: 'Responsive design' },
            { value: 'Live', label: 'Real-time market data' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-brand-pale border border-brand-light/70 px-3 py-5 md:px-6 md:py-7 text-center hover:border-brand-mid hover:-translate-y-1 transition-all duration-300"
            >
              <p className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-brand-dark">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm text-ink/60 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pt-14 md:pt-20 text-[15px] md:text-[16px] leading-7 text-ink/75">
          <div className="space-y-5">
            <p>
              This platform started as a way to understand how modern brokerages
              actually work — order flow, portfolio tracking, authentication,
              support systems — and to rebuild that experience from the ground
              up.
            </p>
            <p>
              Every screen you see here, from login to order placement, is
              backed by a custom API and a real database. No mock data, no
              shortcuts.
            </p>
          </div>
          <div className="space-y-5 border-l-2 border-brand-light pl-6 md:pl-8">
            <p>
              The goal wasn't to copy an existing product, but to learn from it
              — figuring out the small UX decisions that make a trading
              interface feel trustworthy, and implementing them myself.
            </p>
            <p>
              Curious how it's built? Check out the{' '}
              <a
                href="#github"
                className="text-brand-mid hover:text-brand-dark font-semibold transition-colors duration-200 underline decoration-brand-light decoration-2 underline-offset-4"
              >
                source code
              </a>{' '}
              or read the{' '}
              <a
                href="#blog"
                className="text-brand-mid hover:text-brand-dark font-semibold transition-colors duration-200 underline decoration-brand-light decoration-2 underline-offset-4"
              >
                build notes
              </a>{' '}
              on how each feature came together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
