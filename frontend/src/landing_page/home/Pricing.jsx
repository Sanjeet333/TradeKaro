import React from 'react';

const Pricing = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6 md:px-12 md:py-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="flex flex-col space-y-4 text-center md:text-left max-w-xl mx-auto md:mx-0 animate-fade-up">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading">
            Pricing model
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight leading-tight">
            Simple, flat pricing
          </h2>
          <p className="text-ink/60 leading-relaxed text-sm sm:text-base">
            Designed around a flat-fee model — no hidden charges, no
            percentage-based brokerage. Just a clear cost per order type.
          </p>
          <div className="pt-1">
            <a
              href="#"
              className="text-brand-mid hover:text-brand-dark font-semibold text-base inline-flex items-center gap-1 transition-colors"
            >
              See full breakdown <span className="text-xl">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 border border-brand-light rounded-2xl overflow-hidden text-center w-full">
          <div className="border-b sm:border-b-0 sm:border-r border-brand-light py-8 px-6 flex flex-col justify-center items-center space-y-3 bg-brand-pale/40 hover:bg-brand-pale transition-colors duration-300 relative">
            <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wide bg-brand-mid text-white px-2.5 py-0.5 rounded-full">
              Most used
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark flex items-start mt-3">
              <span className="text-2xl mt-1 font-medium">₹</span>0
            </h1>
            <p className="text-ink/50 font-medium text-xs md:text-sm leading-snug max-w-[160px]">
              Free equity delivery and direct mutual funds
            </p>
          </div>

          <div className="py-10 px-6 flex flex-col justify-center items-center space-y-3 hover:bg-brand-pale/40 transition-colors duration-300">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark flex items-start gap-0.5">
              <span className="text-xl md:text-2xl mt-1 font-medium">₹</span>0
            </h1>
            <p className="text-ink/50 font-medium text-xs md:text-sm leading-snug max-w-[180px]">
              Intraday per executed order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
