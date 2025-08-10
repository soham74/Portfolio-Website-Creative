import React from 'react';

const AboutWindow = () => {
  return (
    <div className="h-full overflow-auto pr-2 text-left bg-white">
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

      {/* Overview */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Overview</h4>
        <p className="text-sm leading-relaxed text-neutral-800">
          Software engineer focused on building reliable web platforms and practical AI applications.
          I work across the stack—from React frontends and API design to databases, cloud, and
          lightweight ML systems. I care about performance, clarity, and shipping features that make
          a measurable difference.
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 text-neutral-800">
          <li>Reduced page load time by 45% and increased form success rate by 35% via refactors and Firebase tuning.</li>
          <li>Improved robotics project completion by ~30% through structured templates and targeted coaching.</li>
          <li>Shipped an AI Chess Bot with Minimax + Alpha‑Beta pruning and a real‑time GUI.</li>
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Experience</h4>
        <div className="space-y-3 text-sm text-neutral-800">
          <div>
            <div className="flex items-baseline justify-between">
              <p className="m-0 font-semibold">iCode — Software Instructor</p>
              <span className="text-neutral-500">2024 – 2025</span>
            </div>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Led instruction in Python, Java, Swift, and robotics; authored reusable templates and kits.</li>
              <li>Introduced Git/GitHub practices and mentored students on workflows.</li>
              <li>Boosted robotics project completion rates by ~30% in a short timeframe.</li>
            </ul>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <p className="m-0 font-semibold">Mustang Math — Web Development Lead</p>
              <span className="text-neutral-500">2021 – 2025</span>
            </div>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Built a full‑stack tournament platform with React + Firebase + Tailwind.</li>
              <li>Led a team of four; drove a mobile‑first UI that reduced support emails by ~40%.</li>
              <li>Cut page load time by 45% and increased form success by 35%; documented lessons in an internal handbook.</li>
            </ul>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <p className="m-0 font-semibold">Cledge — UI/UX Intern</p>
              <span className="text-neutral-500">2022 – 2023</span>
            </div>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Ran user interviews and session‑log reviews to prioritize changes.</li>
              <li>Shipped navigation improvements that reduced time‑on‑task by ~20%.</li>
              <li>Prototyped a dynamic onboarding flow; projected to cut drop‑off by ~34%.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Selected Projects</h4>
        <ul className="list-disc pl-5 text-sm space-y-1 text-neutral-800">
          <li>
            <span className="font-semibold">AI Chess Bot:</span> Minimax with Alpha‑Beta pruning and search heuristics; Pygame GUI for realtime annotated play.
          </li>
          <li>
            <span className="font-semibold">Stock Sentiment Analyzer:</span> Logistic regression with weighted features to predict direction on labeled tweet data; exceeded target accuracy by ~18%.
          </li>
          <li>
            <span className="font-semibold">Retro Windows Portfolio:</span> Draggable windows, boot‑style UX, and render optimizations with memoization.
          </li>
        </ul>
      </section>

      {/* Education & Awards */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Education & Awards</h4>
        <p className="text-sm text-neutral-800 m-0">
          University of Wisconsin–Madison — B.S. (Candidate, 2028), Computer Science & Mathematics
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 text-neutral-800 mt-1">
          <li>Relevant coursework: Data Structures & Algorithms, Computer Architecture, Distributed Systems, Numerical Methods, Linear Algebra.</li>
          <li>Awards: 2nd — US Cyber Challenge; Top 25 — CMU picoCTF; Top 10% — USA Astronomy & Astrophysics Olympiad.</li>
        </ul>
      </section>

      {/* Skills Snapshot */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Skills & Tools</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          {['Python','JavaScript','TypeScript','React','Next.js','Node.js','SQL','Firebase','TensorFlow','PyTorch','OpenCV','NumPy','Pandas','C++','Swift','Git','Linux','Docker','GitHub Actions','AWS','Vercel'].map((s) => (
            <span key={s} className="px-2 py-1 rounded border border-neutral-200 bg-neutral-50 text-neutral-700">{s}</span>
          ))}
        </div>
      </section>

      {/* Now / Interests */}
      <section className="mb-5">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Now</h4>
        <p className="text-sm leading-relaxed text-neutral-800 m-0">
          Exploring small ML‑powered product ideas and improving low‑level problem‑solving (Codeforces, systems puzzles).
          Open to impactful SWE/ML internships for Summer 2026 where I can own features end‑to‑end and ship measurable results.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">Interests</h4>
        <p className="text-sm text-neutral-800 m-0">Robotics, hackathons, tutoring, algorithmic problem‑solving, and building polished tools for real people.</p>
      </section>

      {/* Footer note */}
      <div className="mt-5 p-3 bg-neutral-50 border border-neutral-200 text-center">
        <p className="m-0 text-[10px] text-neutral-600">🚀 Always open to building ambitious, well‑crafted systems.</p>
      </div>
    </div>
  );
};

export default AboutWindow;