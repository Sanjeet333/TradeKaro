import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, FlaskConical, Calculator } from 'lucide-react';

const notes = [
  {
    icon: ShieldCheck,
    text: "Pricing shown here reflects the fee structure the platform is built around — no hidden charges beyond what's listed.",
  },
  {
    icon: Zap,
    text: 'Order execution runs on live market prices streamed via WebSocket, with every trade logged to your positions and holdings.',
  },
  {
    icon: FlaskConical,
    text: "This is a personal/learning project — trades are processed within the app's own system and not routed to a live exchange.",
  },
  {
    icon: Calculator,
    text: 'Charges are calculated per executed order, not per unit or lot, keeping the math simple and predictable.',
  },
];

const Brokerage = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-16 md:py-20 font-body border-t border-brand-light/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start animate-fade-up">
        <div className="md:col-span-2">
          <h3 className="text-brand-dark text-[17px] md:text-lg lg:text-xl font-semibold tracking-wide mb-6 font-heading">
            Good to know
          </h3>

          <div className="space-y-5">
            {notes.map((note) => (
              <div key={note.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-pale flex items-center justify-center shrink-0 mt-0.5">
                  <note.icon
                    className="w-4 h-4 text-brand-mid"
                    strokeWidth={2}
                  />
                </div>
                <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-ink/60 leading-relaxed pt-1">
                  {note.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center md:text-right lg:text-left md:pl-8 pt-2 md:pt-0">
          <Link
            to="/dashboard"
            className="text-brand-mid hover:text-brand-dark text-[17px] md:text-lg lg:text-xl font-semibold tracking-wide inline-block font-heading transition-colors duration-200"
          >
            View order history
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Brokerage;
