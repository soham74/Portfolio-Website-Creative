import React from 'react';

const AboutWindow = () => {
  return (
    <div className="about-window h-full overflow-auto pr-2 text-left bg-white">
      {/* Header */}
      <div className="mb-4 border-b border-neutral-200 pb-3">
        <h3 className="m-0 text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <span className="text-blue-600">👤</span> About Me
        </h3>
      </div>

      {/* Identity */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 grid place-items-center text-3xl mb-3 ring-2 ring-blue-200">
          👨‍💻
        </div>
        <h2 className="m-0 text-2xl font-semibold text-neutral-900">Soham Kolhe</h2>
        <p className="m-1 text-sm italic text-neutral-600">Full‑Stack • Algorithms • Computer Vision • LLMs</p>
        <div className="mt-1 text-xs text-neutral-600">
          Madison, WI · 425‑444‑6321 ·
          <a className="text-blue-700 hover:underline ml-1" href="mailto:sohamkolhe26@gmail.com">sohamkolhe26@gmail.com</a>
          <span className="mx-1">·</span>
          <a className="text-blue-700 hover:underline" href="https://soham-kolhe-portfolio.vercel.app/" target="_blank" rel="noreferrer">Personal Site</a>
        </div>
      </div>

      {/* Overview (keep concise; resume has details) */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Overview</h4>
        <p className="text-sm leading-relaxed text-neutral-800">
          I build clean, reliable software across the stack—React frontends, APIs, databases, and
          cloud—plus small, practical ML features when they help users. I focus on performance,
          clarity, and shipping work that measurably improves the product.
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 text-neutral-800">
          <li>Reduced page load time by 45% and increased form success by 35% through focused refactors.</li>
          <li>Designed teaching kits and workflows that boosted robotics completion by ~30%.</li>
          <li>Enjoy building well‑crafted, minimal systems that feel fast and intentional.</li>
        </ul>
        <p className="text-xs text-neutral-600 mt-3">
          Full resume: <a className="text-blue-700 hover:underline" href="https://soham-kolhe-portfolio.vercel.app/" target="_blank" rel="noreferrer">soham‑kolhe‑portfolio.vercel.app</a>
        </p>
      </section>

      {/* Footer note */}
      <div className="mt-5 p-3 bg-neutral-50 border border-neutral-200 text-center">
        <p className="m-0 text-[10px] text-neutral-600">🚀 Always open to building ambitious, well‑crafted systems.</p>
      </div>
    </div>
  );
};

export default AboutWindow;