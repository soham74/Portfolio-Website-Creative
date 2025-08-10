import React from 'react';

const AboutWindow = () => {
  return (
    <div className="h-full overflow-auto pr-1 text-left bg-white">
      <div className="mb-4 border-b border-neutral-200 pb-3">
        <h3 className="m-0 text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <span className="text-blue-600">👤</span> About Me
        </h3>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 grid place-items-center text-3xl mb-3 ring-2 ring-blue-200">
          👨‍💻
        </div>
        <h2 className="m-0 text-2xl font-semibold text-neutral-900">Soham Kolhe</h2>
        <p className="m-1 text-sm italic text-neutral-600">Undergraduate • Computer Science & Mathematics</p>
      </div>

      <section className="mb-4">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Details</h4>
        <div className="space-y-1 text-sm text-neutral-800">
          <p><span className="font-semibold">📍 Location:</span> Madison, Wisconsin</p>
          <p>
            <span className="font-semibold">🎓 Education:</span> University of Wisconsin–Madison, BS in Computer Science and Mathematics (Aug 2025 – May 2028) • GPA 4.0/4.0
          </p>
          <p><span className="font-semibold">🔗 Portfolio:</span> soham-kolhe-portfolio.vercel.app</p>
          <p><span className="font-semibold">✉️ Contact:</span> sohamkolhe@outlook.com • 425-444-6321</p>
        </div>
      </section>

      <section className="mb-4">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Summary</h4>
        <p className="text-sm leading-relaxed text-neutral-800">
          I am an undergraduate focused on software systems, artificial intelligence, and applied algorithms. I enjoy building tools that are both intentional and practical—balancing performance, clarity, and reliability. My experience spans teaching, product prototyping, and independent research-style projects.
        </p>
      </section>

      <section>
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Highlights</h4>
        <ul className="list-disc pl-5 text-sm space-y-1 text-neutral-800">
          <li>Instructor experience teaching Python, Java, Swift, and robotics</li>
          <li>Full‑stack development with React, Next.js, and Firebase</li>
          <li>Applied ML: sentiment analysis, search, and user modeling</li>
          <li>Competitive security background (USCC 2nd, picoCTF Top 25)</li>
        </ul>
      </section>

      <div className="mt-5 p-3 bg-neutral-50 border border-neutral-200 text-center">
        <p className="m-0 text-[10px] text-neutral-600">🚀 Always open to building ambitious, well-crafted systems.</p>
      </div>
    </div>
  );
};

export default AboutWindow;