import React from 'react';
import { Link } from 'react-router-dom';

const RightSection = ({
  visual,
  productName,
  productDescription,
  learnMore,
  badge,
}) => {
  return (
    <div className="w-full block clear-both overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-16">
          <div className="w-full md:w-[48%] lg:w-[42%] flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 min-w-0 animate-fade-up">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-semibold text-brand-dark tracking-tight mb-4 leading-tight">
              {productName}
            </h2>
            <p className="text-ink/60 text-sm sm:text-base leading-relaxed mb-5 max-w-xl font-normal">
              {productDescription}
            </p>

            {learnMore && (
              <div className="flex items-center justify-center md:justify-start font-semibold text-brand-mid text-sm sm:text-base mb-6">
                <a
                  href="#"
                  className="hover:text-brand-dark transition-colors flex items-center gap-1 group/link"
                >
                  {learnMore}
                  <span className="transform group-hover/link:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </a>
              </div>
            )}
          </div>

          <div className="w-full md:w-[48%] lg:w-[52%] flex justify-center md:justify-end order-1 md:order-2 min-w-0 shrink-0 group relative">
            <div className="w-full max-w-sm aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-pale via-white to-brand-light/30 border border-brand-light/60 flex items-center justify-center p-6 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-brand-light/40">
              {visual}
            </div>
            {badge && (
              <div className="absolute top-3 right-3 bg-white rounded-full shadow-sm border border-brand-light/70 px-3 py-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A89AC] animate-pulse"></span>
                <span className="text-[10px] font-semibold text-brand-dark font-heading">
                  {badge}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
