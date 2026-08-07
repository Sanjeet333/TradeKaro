import React from 'react';
import { Link } from 'react-router-dom';

const socials = [
  {
    label: 'Twitter',
    href: '#',
    path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
  {
    label: 'GitHub',
    href: '#',
    path: 'M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-brand-pale text-[#5B7B95] text-[13px] font-body border-t border-brand-light py-16 md:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap justify-between gap-y-10 mb-12">
        <div className="w-full sm:w-[45%] lg:w-[23%] flex flex-col gap-4 min-w-[200px]">
          <span className="font-heading font-bold text-lg text-brand-dark">
            TradeKaro
          </span>
          <p className="text-[#7C99AE] mt-1 leading-relaxed">
            © 2024 - 2026 TradeKaro.
            <br />
            Built as a personal full-stack project.
          </p>
          <div className="flex gap-4 mt-1 text-[#5B7B95]">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="hover:text-brand-dark hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px]"
                  fill="currentColor"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="w-[45%] sm:w-[22%] lg:w-[18%] min-w-[130px]">
          <h4 className="font-heading text-brand-dark font-semibold text-[15px] mb-4">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link
                to="/about"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-[45%] sm:w-[22%] lg:w-[18%] min-w-[130px]">
          <h4 className="font-heading text-brand-dark font-semibold text-[15px] mb-4">
            Support
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link
                to="/support"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                List of charges
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-[45%] sm:w-[22%] lg:w-[18%] min-w-[130px]">
          <h4 className="font-heading text-brand-dark font-semibold text-[15px] mb-4">
            Account
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link
                to="/signup"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                Open an account
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-brand-dark transition-colors duration-200 block whitespace-nowrap"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-[#8FA9BE] text-[11px] leading-[1.8] flex flex-col gap-4 mt-8 pt-6 border-t border-brand-light">
        <p>
          TradeKaro is a demo trading simulator built for educational purposes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
