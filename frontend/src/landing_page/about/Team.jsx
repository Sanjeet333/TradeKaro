import React from 'react';

const Team = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-8 pb-16 md:pb-24 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 animate-fade-up">
        <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-brand-mid font-heading mb-3">
          Behind the code
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
          Who built this
        </h1>
      </div>

      <div
        className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-brand-light/70 shadow-[0_10px_40px_-15px_rgba(68,101,146,0.25)] animate-fade-up"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[38%] bg-brand-dark flex flex-col items-center justify-center text-center p-8 md:p-10 relative">
            <div className="absolute top-5 left-5 flex items-center gap-1.5 text-[11px] font-medium text-white/70 font-heading uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FE3C0] animate-pulse"></span>
              Currently building
            </div>

            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white/10 bg-white mt-6">
              <img
                src="/images/Sanjeet.jpg"
                alt="Sanjeet Singh"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h2 className="font-heading text-lg md:text-xl font-bold text-white mt-4">
              Sanjeet Singh
            </h2>
            <p className="text-xs md:text-sm text-brand-light font-medium mt-1">
              Full-Stack Developer
            </p>

            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="#github"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white text-brand-dark hover:bg-brand-light transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="#linkedin"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="#leetcode"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200"
              >
                LeetCode
              </a>
            </div>
          </div>

          <div className="md:w-[62%] bg-white p-6 sm:p-8 md:p-10 space-y-4 text-[14px] md:text-[15px] leading-7 text-ink/75 text-left">
            <p>
              I'm a full-stack developer who enjoys taking apart complex
              products and rebuilding them to understand how they actually work
              — this trading platform is one of those builds.
            </p>
            <p>
              Built with the MERN stack (MongoDB, Express, React, Node) and
              Tailwind CSS on the frontend, with a focus on writing clean,
              maintainable code and solving real UX problems, not just styling
              screens.
            </p>
            <p>
              Alongside this, I actively practice Data Structures and Algorithms
              in Java — breaking down complex problems into clear, step-by-step
              logic.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['MERN Stack', 'Tailwind CSS', 'Vite', 'DSA', 'Java'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="text-[11px] md:text-xs font-medium px-3 py-1 rounded-full bg-brand-pale text-brand-dark border border-brand-light"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
