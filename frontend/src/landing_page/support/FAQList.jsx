import React, { useState, useMemo } from 'react';
import { ChevronDown, SearchX } from 'lucide-react';

const faqs = [
  {
    category: 'Account',
    items: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign up" on the homepage, enter your email and a password, and you\'re ready to log in and start using the platform.',
      },
      {
        q: 'How do I secure or reset my account session?',
        a: 'You can log out from the top-right navbar and log in again to refresh your active session and auth tokens.',
      },
    ],
  },
  {
    category: 'Orders & Trading',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Search for a stock on the dashboard, choose buy or sell, enter the quantity, and confirm. Your order is processed instantly.',
      },
      {
        q: "What's the difference between intraday and delivery?",
        a: 'Intraday positions must be closed the same day. Delivery orders move the shares into your holdings, to be held for as long as you like.',
      },
      {
        q: 'Why is my order stuck at "pending"?',
        a: "This usually means the market price hasn't matched your order price yet. Check your order details on the positions page.",
      },
    ],
  },
  {
    category: 'Live Data',
    items: [
      {
        q: 'How often do prices update?',
        a: 'Prices are streamed live over a WebSocket connection, so your dashboard updates in real time without needing a refresh.',
      },
      {
        q: 'A stock price looks frozen. What should I check?',
        a: 'Try refreshing the page. If it persists, it may be a temporary connection drop — send us a message using the form below.',
      },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-light/50 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-4 group"
      >
        <span className="font-medium text-ink group-hover:text-brand-dark transition-colors duration-200 text-sm md:text-base">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-mid shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-sm md:text-[15px] text-ink/60 leading-relaxed pr-8">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQList = ({ query }) => {
  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-brand-dark font-semibold mb-10 md:mb-14 tracking-tight animate-fade-up">
        Frequently asked questions
      </h2>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-16 animate-fade-up">
          <SearchX className="w-10 h-10 text-brand-light" />
          <p className="font-heading text-lg font-semibold text-brand-dark">
            No matching questions
          </p>
          <p className="text-sm text-ink/60 max-w-sm">
            Try a different search term, or send a message below and I'll help
            directly.
          </p>
        </div>
      ) : (
        <div className="space-y-10 md:space-y-12">
          {filtered.map((section, idx) => (
            <div
              key={section.category}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <h3 className="font-heading text-sm md:text-base font-semibold text-brand-mid uppercase tracking-widest mb-2">
                {section.category}
              </h3>
              <div>
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQList;
