import React from 'react';

const Stats = () => {
  const points = [
    {
      title: 'Built with care',
      body: "Every screen — from login to order placement — is backed by a real API and database. It's a working system, not a static mockup.",
    },
    {
      title: 'No clutter, no gimmicks',
      body: "No fake notifications or dark patterns. Clean flows that respect the user, the way I'd want a trading app to work.",
    },
    {
      title: 'One connected system',
      body: 'Signup and the trading dashboard are all part of one integrated app, not disconnected demo pages.',
    },
    {
      title: 'Room to grow',
      body: 'This is an evolving project — features like alerts and portfolio insights are on the roadmap as I keep building.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 md:py-24 md:px-12 bg-brand-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      ></div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-center mx-auto relative">
        <div className="flex flex-col space-y-10 text-left animate-fade-up">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-light font-heading">
              Why this platform
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
              Built with intent
            </h1>
          </div>

          <div className="space-y-8">
            {points.map((point) => (
              <div
                key={point.title}
                className="border-l-2 border-white/15 pl-5"
              >
                <h2 className="text-lg md:text-xl font-semibold text-white mb-2 font-heading">
                  {point.title}
                </h2>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-10 pt-2">
            <a
              href="#"
              className="text-brand-light hover:text-white font-semibold text-sm md:text-base transition-colors"
            >
              Explore the dashboard →
            </a>
            <a
              href="#"
              className="text-brand-light hover:text-white font-semibold text-sm md:text-base transition-colors"
            >
              Try a demo login →
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center w-full animate-float">
          <svg viewBox="0 0 340 320" className="w-full max-w-md">
            <rect
              x="10"
              y="10"
              width="320"
              height="300"
              rx="24"
              fill="#33507A"
            />

            <rect x="30" y="30" width="120" height="14" rx="7" fill="#ACE5F6" />
            <circle cx="300" cy="37" r="7" fill="#4A89AC" />

            <rect
              x="30"
              y="65"
              width="280"
              height="70"
              rx="14"
              fill="#3E5D89"
            />
            <rect x="48" y="82" width="90" height="10" rx="5" fill="#ACE5F6" />
            <rect x="48" y="100" width="140" height="8" rx="4" fill="#7FA5C4" />
            <text
              x="250"
              y="108"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#8FE3C0"
            >
              +2.4%
            </text>

            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(0, ${150 + i * 44})`}>
                <rect
                  x="30"
                  y="0"
                  width="280"
                  height="34"
                  rx="10"
                  fill="#3E5D89"
                />
                <rect
                  x="48"
                  y="12"
                  width="70"
                  height="9"
                  rx="4"
                  fill="#ACE5F6"
                />
                <rect
                  x="230"
                  y="12"
                  width="42"
                  height="9"
                  rx="4"
                  fill={i % 2 === 0 ? '#8FE3C0' : '#7FA5C4'}
                />
              </g>
            ))}

            <circle cx="292" cy="285" r="5" fill="#8FE3C0">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="210" y="290" fontSize="11" fill="#ACE5F6" fontWeight="600">
              Live
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Stats;
