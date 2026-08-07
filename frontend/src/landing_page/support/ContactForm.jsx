import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full bg-brand-pale/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-brand-dark font-semibold mb-3 tracking-tight animate-fade-up">
          Still need help?
        </h2>
        <p
          className="text-sm md:text-base text-ink/60 mb-8 animate-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          Send a message and I'll get back to you.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center gap-3 bg-white border border-brand-light rounded-2xl p-10 animate-fade-up">
            <CheckCircle2 className="w-10 h-10 text-brand-mid" />
            <p className="font-heading text-lg font-semibold text-brand-dark">
              Message sent
            </p>
            <p className="text-sm text-ink/60">
              Thanks for reaching out — I'll reply to your email soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm font-semibold text-brand-mid hover:text-brand-dark transition-colors duration-200"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-brand-light/60 rounded-2xl p-6 md:p-8 space-y-5 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-light/70 focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200 text-sm md:text-base"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-light/70 focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200 text-sm md:text-base"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-light/70 focus:outline-none focus:ring-2 focus:ring-brand-mid transition-shadow duration-200 text-sm md:text-base resize-none"
                placeholder="What do you need help with?"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-mid disabled:opacity-60 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              {status === 'loading' ? (
                'Sending...'
              ) : (
                <>
                  Send message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
