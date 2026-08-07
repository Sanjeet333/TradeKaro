import React from 'react';

const Education = () => {
  return (
    <div className="w-full flex items-center justify-center py-16 px-6 md:py-20 md:px-12 bg-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="flex items-center justify-center w-full animate-float">
          <svg viewBox="0 0 300 240" className="w-full max-w-md">
            <rect
              x="10"
              y="40"
              width="280"
              height="170"
              rx="20"
              fill="#E3FCF9"
            />
            <rect x="40" y="70" width="90" height="110" rx="8" fill="#ACE5F6" />
            <rect
              x="150"
              y="90"
              width="110"
              height="90"
              rx="8"
              fill="#4A89AC"
            />
            <circle cx="150" cy="40" r="26" fill="#446592" />
            <path
              d="M138 40 l8 8 l16 -16"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="flex flex-col justify-center space-y-6 text-left animate-fade-up">
          <div>
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading">
              Learn as you go
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2 mb-4">
              Built-in learning resources
            </h1>
            <p className="text-sm md:text-base text-ink/60 leading-relaxed">
              A growing set of guides covering market basics to order types —
              written to help first-time users understand what they're doing
              before they click "buy".
            </p>
            <a
              href="#"
              className="inline-flex items-center text-brand-mid hover:text-brand-dark font-semibold text-sm md:text-base mt-2 group"
            >
              Browse guides{' '}
              <span className="text-lg ml-1 transform group-hover:translate-x-1 transition-transform duration-200">
                &rarr;
              </span>
            </a>
          </div>

          <div className="mt-2">
            <p className="text-sm md:text-base text-ink/60 leading-relaxed">
              A community Q&A space where users can ask market-related questions
              and get answers — modeled after the kind of support forum every
              trading platform needs.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-brand-mid hover:text-brand-dark font-semibold text-sm md:text-base mt-2 group"
            >
              Visit Q&A{' '}
              <span className="text-lg ml-1 transform group-hover:translate-x-1 transition-transform duration-200">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
