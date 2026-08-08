import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(
        'https://tradekaro-backend.onrender.com/login',
        formData
      );
      window.location.href = `https://trade-karo-dashboard.vercel.app?token=${res.data.token}`;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex">
      <div className="hidden lg:flex lg:w-[45%] bg-brand-dark relative overflow-hidden flex-col justify-center px-12 py-16">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        ></div>

        <div className="relative animate-fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-light font-heading mb-4">
            Welcome back
          </span>
          <h1 className="font-heading text-3xl xl:text-4xl font-bold text-white leading-tight mb-6">
            Your dashboard is waiting.
          </h1>

          <svg viewBox="0 0 320 180" className="w-full max-w-sm animate-float">
            <rect
              x="10"
              y="10"
              width="300"
              height="160"
              rx="20"
              fill="#33507A"
            />
            <polyline
              points="30,130 70,110 100,120 140,80 180,95 220,55 260,68 296,35"
              fill="none"
              stroke="#8FE3C0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="296" cy="35" r="5" fill="#ACE5F6">
              <animate
                attributeName="r"
                values="5;8;5"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      <div className="w-full lg:w-[55%] flex justify-center items-center px-4 py-16 bg-gradient-to-b from-brand-pale/40 to-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white lg:bg-transparent lg:shadow-none border lg:border-none border-brand-light/70 rounded-2xl p-7 lg:p-0 shadow-[0_10px_40px_-15px_rgba(68,101,146,0.2)] animate-fade-up"
        >
          <h2 className="font-heading text-2xl font-bold text-brand-dark mb-1">
            Login
          </h2>
          <p className="text-sm text-ink/50 mb-6">
            Enter your details to continue
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="mb-4">
            <label className="text-xs font-medium text-ink/60 mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 border border-brand-light/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200"
            />
          </div>

          <div className="mb-6">
            <label className="text-xs font-medium text-ink/60 mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 border border-brand-light/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark hover:bg-brand-mid disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-xs text-ink/50 text-center mt-5">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-brand-mid hover:text-brand-dark font-semibold transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
