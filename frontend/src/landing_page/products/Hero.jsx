import React from 'react';

const Hero = () => {
  return (
    <div className="text-center pt-20 md:pt-28 pb-16 md:pb-20 px-6 select-none bg-gradient-to-b from-brand-pale/40 to-transparent">
      <div className="border-b border-brand-light/50 pb-16 md:pb-20 max-w-6xl mx-auto animate-fade-up">
        <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading mb-3">
          What I've built
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-brand-dark mb-4 tracking-tight leading-[1.05]">
          Product Suite
        </h1>
        <h2 className="text-base md:text-lg text-ink/60 mb-6 font-normal max-w-xl mx-auto leading-relaxed">
          A set of connected modules that make up the full trading platform
        </h2>
        <p className="mt-4 text-sm md:text-base font-medium text-ink/50">
          See what's under the hood in the{' '}
          <a
            href="#universe"
            className="text-brand-mid hover:text-brand-dark transition-colors duration-200 inline-flex items-center gap-1 hover:gap-1.5"
          >
            tech stack <span>&rarr;</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Hero;
