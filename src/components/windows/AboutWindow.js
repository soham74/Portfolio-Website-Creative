import React from 'react';

const AboutWindow = () => {
  return (
    <div className="about-window h-full overflow-auto pr-2 text-left bg-white">
      {/* Title */}
      <div className="mb-4 border-b border-neutral-200 pb-2">
        <h3 className="m-0 text-base font-semibold text-neutral-900 flex items-center gap-2">
          About Me
        </h3>
      </div>

      {/* Header / Identity */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src="/images/profile.jpeg"
          alt="Soham Kolhe"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-200"
        />
        <div className="flex-1">
          <h2 className="m-0 text-xl font-semibold text-neutral-900 leading-tight">Soham Kolhe</h2>
          <p className="m-0 mt-1 text-[12px] text-neutral-600">University of Wisconsin–Madison • Madison, WI • 2028</p>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left: Quick info */}
        <div className="space-y-3 lg:col-span-1">
          <div className="border border-neutral-200 bg-neutral-50 p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">At a glance</h4>
            <ul className="m-0 p-0 list-none text-[13px] text-neutral-800 space-y-1">
              <li>BS in CS & Math, UW-Madison ('28)</li>
              <li>Madison, WI</li>
              <li><a className="text-blue-700 hover:underline" href="mailto:sohamkolhe26@gmail.com">sohamkolhe26@gmail.com</a></li>
            </ul>
          </div>

          <div className="border border-neutral-200 bg-neutral-50 p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Interests & Hobbies</h4>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {['Robotics','Hackathons','Codeforces','Tutoring','Chess','Retro UI','Cloud','CV','LLMs'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded border border-neutral-200 bg-white text-neutral-700">{tag}</span>
              ))}
            </div>
          </div>

          <div className="border border-neutral-200 bg-neutral-50 p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Toolbox</h4>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {['React','TypeScript','Node.js','Python','Firebase','Postgres','Docker','AWS'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded border border-neutral-200 bg-white text-neutral-700">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Overview */}
        <div className="lg:col-span-2 space-y-3">
          <div className="border border-neutral-200 bg-white p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Overview</h4>
            <p className="m-0 text-[13px] leading-relaxed text-neutral-800">
              I'm a software engineer and CS student who enjoys building things that work well and look good doing it.
              Whether it's a web app, a machine learning pipeline, or a retro-styled portfolio site, I care about
              the details and like seeing projects through from idea to deployment. I'm curious by nature, always
              picking up new tools and techniques, and I work best when collaborating with others on challenging problems.
            </p>
            <p className="m-0 mt-2 text-[13px] leading-relaxed text-neutral-800">
              Outside of coding, you'll find me playing chess, competing in hackathons, or diving into whatever
              rabbit hole has caught my attention that week.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              {k:'Performance', v:'45% faster'},
              {k:'Forms', v:'+35% success'},
              {k:'Completion', v:'+30% robotics'},
            ].map(s => (
              <div key={s.k} className="border border-neutral-200 bg-neutral-50 p-2 text-center">
                <div className="text-[12px] text-neutral-500">{s.k}</div>
                <div className="text-sm font-semibold text-neutral-900">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="border border-neutral-200 bg-white p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Focus areas</h4>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {['Full‑Stack','API & DB Design','Cloud','Computer Vision','LLMs','Performance'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded border border-neutral-200 bg-neutral-50 text-neutral-700">{tag}</span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 text-center">
            <p className="m-0 text-[11px] text-neutral-600">Always open to building ambitious, well‑crafted systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;