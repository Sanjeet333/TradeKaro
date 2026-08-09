import React from 'react';
import { Link } from 'react-router-dom';

const stack = [
  {
    name: 'React + Vite',
    desc: 'Frontend built with React and Vite for a fast, modern development experience.',
    color: '#4A89AC',
  },
  {
    name: 'Tailwind CSS',
    desc: 'Utility-first styling with a custom design token system for consistent branding.',
    color: '#446592',
  },
  {
    name: 'Node.js + Express',
    desc: 'A RESTful backend handling auth, orders, positions, and support tickets.',
    color: '#4A89AC',
  },
  {
    name: 'MongoDB',
    desc: 'Document database storing users, holdings, orders, and ticket data.',
    color: '#446592',
  },
  {
    name: 'WebSocket',
    desc: 'Live price streaming for 500+ stocks, pushed to the dashboard in real time.',
    color: '#4A89AC',
  },
  {
    name: 'Finnhub API',
    desc: 'External market data source powering live prices and charts.',
    color: '#446592',
  },
];

const Universe = () => {
  return (
    <div
      id="universe"
      className="w-full bg-gradient-to-b from-transparent via-brand-pale/30 to-white font-body text-ink antialiased selection:bg-brand-light/40"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 animate-fade-up">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading mb-3">
            Under the hood
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark tracking-tight">
            The tech stack
          </h1>
          <p className="text-base md:text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed mt-4">
            Every tool and technology that powers this platform, end to end
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 w-full mb-14 md:mb-16">
          {stack.map((item, idx) => (
            <div
              key={item.name}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/60 border border-transparent hover:border-brand-light hover:bg-white hover:shadow-lg hover:shadow-brand-light/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 cursor-default group animate-fade-up"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: `${item.color}1A` }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
              </div>
              <h3 className="font-heading text-base md:text-lg font-semibold text-brand-dark mb-2">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-ink/50 leading-relaxed max-w-[260px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full text-center animate-fade-up">
          <Link
            to="/signup"
            className="inline-block bg-brand-dark hover:bg-brand-mid active:scale-95 text-white font-semibold text-base md:text-lg px-8 py-3 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Universe;
