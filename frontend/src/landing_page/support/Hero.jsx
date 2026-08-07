import React from 'react';

const Hero = ({ query, setQuery }) => {
  return (
    <div className="w-full text-white py-16 md:py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-brand-dark to-brand-mid">
      <div className="max-w-3xl mx-auto text-center animate-fade-up">
        <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-light font-heading mb-3">
          Help Center
        </span>
        <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
          Answers to common questions
        </h1>
        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto mb-8">
          Browse the FAQs below, or send a message if you can't find what you're
          looking for
        </p>

        <div className="max-w-lg mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search for a question, e.g. "how do I place an order"'
            className="w-full bg-white text-ink text-sm md:text-base px-4 py-3.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-light placeholder:text-gray-400 transition-shadow duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
