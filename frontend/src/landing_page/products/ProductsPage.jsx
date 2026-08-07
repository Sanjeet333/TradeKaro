import React from 'react';
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

const DashboardIcon = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <rect x="10" y="20" width="180" height="120" rx="16" fill="white" />
    <rect x="26" y="36" width="60" height="10" rx="5" fill="#446592" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(0, ${58 + i * 24})`}>
        <rect x="26" y="0" width="148" height="16" rx="6" fill="#E3FCF9" />
        <rect x="36" y="4" width="50" height="8" rx="4" fill="#4A89AC" />
        <rect
          x="150"
          y="4"
          width="16"
          height="8"
          rx="4"
          fill={i % 2 === 0 ? '#446592' : '#ACE5F6'}
        />
      </g>
    ))}
    <circle cx="168" cy="36" r="5" fill="#4A89AC">
      <animate
        attributeName="opacity"
        values="1;0.3;1"
        dur="1.6s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const ReportsIcon = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <rect x="10" y="20" width="180" height="120" rx="16" fill="white" />
    <polyline
      points="30,110 60,90 90,100 120,60 150,75 170,40"
      fill="none"
      stroke="#4A89AC"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="170" cy="40" r="5" fill="#446592" />
    <rect x="30" y="120" width="140" height="6" rx="3" fill="#ACE5F6" />
  </svg>
);

const HelpIcon = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <rect x="20" y="30" width="160" height="100" rx="16" fill="white" />
    <circle cx="70" cy="60" r="16" fill="#E3FCF9" />
    <text
      x="70"
      y="66"
      textAnchor="middle"
      fontSize="16"
      fontWeight="700"
      fill="#446592"
    >
      ?
    </text>
    <rect x="100" y="52" width="60" height="8" rx="4" fill="#ACE5F6" />
    <rect x="100" y="66" width="40" height="8" rx="4" fill="#4A89AC" />
    <rect x="40" y="100" width="120" height="8" rx="4" fill="#E3FCF9" />
  </svg>
);

const ApiIcon = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <rect x="20" y="25" width="70" height="110" rx="12" fill="white" />
    <rect x="110" y="25" width="70" height="110" rx="12" fill="white" />
    <line
      x1="90"
      y1="80"
      x2="110"
      y2="80"
      stroke="#4A89AC"
      strokeWidth="4"
      strokeDasharray="6 4"
    />
    <circle cx="90" cy="80" r="5" fill="#446592" />
    <circle cx="110" cy="80" r="5" fill="#4A89AC" />
    <rect x="34" y="45" width="40" height="7" rx="3.5" fill="#ACE5F6" />
    <rect x="124" y="45" width="40" height="7" rx="3.5" fill="#ACE5F6" />
  </svg>
);

const AuthIcon = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <rect x="55" y="20" width="90" height="120" rx="16" fill="white" />
    <circle cx="100" cy="58" r="16" fill="#E3FCF9" />
    <path
      d="M100 46 v24 M90 58 h20"
      stroke="#446592"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <rect x="72" y="90" width="56" height="10" rx="5" fill="#ACE5F6" />
    <rect x="72" y="108" width="56" height="10" rx="5" fill="#4A89AC" />
  </svg>
);

const ProductsPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-brand-pale/20 to-white font-body antialiased text-ink flex flex-col justify-start items-stretch overflow-hidden">
      <Hero />

      <LeftSection
        visual={<DashboardIcon />}
        badge="Live"
        productName="Trading Dashboard"
        productDescription="The core of the platform — live prices streamed over WebSocket for 500+ stocks, an interactive watchlist, and instant order placement with real-time position tracking."
        tryDemo="Try demo"
      />

      <RightSection
        visual={<ReportsIcon />}
        badge="Live"
        productName="Portfolio & Reports"
        productDescription="A dedicated dashboard for holdings and intraday positions, with real-time P&L calculations and visual breakdowns of how your portfolio is performing."
        learnMore="Learn more"
      />

      <LeftSection
        visual={<HelpIcon />}
        productName="Help Center"
        productDescription="A set of FAQs covering orders, accounts, and live data, plus a contact form for anything not answered there — no bloated ticketing system, just quick answers."
        tryDemo="Browse FAQs"
      />

      <RightSection
        visual={<ApiIcon />}
        productName="Built on a REST API"
        productDescription="Every feature — auth, orders, positions, contact — runs on a custom Node.js and Express backend with MongoDB, following a clean, RESTful structure end to end."
        learnMore="View API structure"
      />

      <LeftSection
        visual={<AuthIcon />}
        productName="Secure Sign-up & Login"
        productDescription="A complete authentication flow with account creation and login, built to handle real user sessions — the same gateway every trader uses to reach their dashboard."
        tryDemo="Create account"
      />

      <Universe />
    </div>
  );
};

export default ProductsPage;
