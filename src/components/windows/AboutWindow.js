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
          <p className="m-0 mt-1 text-[12px] text-neutral-600">University of Wisconsin--Madison | BS Computer Science | May 2028</p>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left: Quick info */}
        <div className="space-y-3 lg:col-span-1">
          <div className="border border-neutral-200 bg-neutral-50 p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">At a glance</h4>
            <ul className="m-0 p-0 list-none text-[13px] text-neutral-800 space-y-1">
              <li>BS in Computer Science, UW-Madison ('28)</li>
              <li>Madison, WI</li>
              <li><a className="text-blue-700 hover:underline" href="mailto:sohamkolhe26@gmail.com">sohamkolhe26@gmail.com</a></li>
            </ul>
          </div>

          <div className="border border-neutral-200 bg-neutral-50 p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Awards</h4>
            <ul className="m-0 p-0 list-none text-[13px] text-neutral-800 space-y-1">
              <li>1st -- US Cyber Challenge</li>
              <li>1st -- CMU picoCTF</li>
              <li>1st -- MadData Hackathon</li>
              <li>Best AI/ML -- CalHacks</li>
              <li>Top 3% -- USAAO</li>
            </ul>
          </div>

          <div className="border border-neutral-200 bg-neutral-50 p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Toolbox</h4>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {['Python','TypeScript','React','Next.js','FastAPI','PyTorch','Docker','AWS'].map(tag => (
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
              I'm a CS student at UW-Madison who builds things at the intersection of AI and real-world
              systems. From deploying a crop detection AI serving 500+ farmers for the USDA, to winning
              hackathons with on-device ML pipelines and contract analysis platforms, I care about shipping
              software that actually works in production.
            </p>
            <p className="m-0 mt-2 text-[13px] leading-relaxed text-neutral-800">
              Currently doing research across four labs -- building AI-powered grant writing tools at the
              UW Dept of Surgery, architecting workflow automation with document classifiers at the
              UW Tech Exploration Lab, developing crop detection AI at the Wisconsin Institute of Discovery,
              and researching multi-agent LLM systems at SimLab for adaptive, competency-based simulation
              training in healthcare and education.
            </p>
            <p className="m-0 mt-2 text-[13px] leading-relaxed text-neutral-800">
              Summer 2026: AI Intern at Northwestern Mutual in Milwaukee, applying ML to
              financial-services problems.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Focus areas</h4>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {['AI/ML','Full-Stack','RAG & LLMs','Computer Vision','DevOps','Remote Sensing'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded border border-neutral-200 bg-neutral-50 text-neutral-700">{tag}</span>
              ))}
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-3">
            <h4 className="m-0 mb-2 text-sm font-semibold text-neutral-800">Experience</h4>
            <ul className="m-0 p-0 list-none text-[13px] text-neutral-800 space-y-1">
              <li>AI Intern -- Northwestern Mutual, Milwaukee (May -- Aug 2026)</li>
              <li>Research Intern -- SimLab (Multi-Agent LLM Systems)</li>
              <li>Research Assistant -- UW Dept of Surgery, N+1 Institute</li>
              <li>Applied AI Researcher -- UW Tech Exploration Lab</li>
              <li>Undergraduate Researcher -- WID, Mura Lab</li>
              <li>SWE Intern -- Cledge</li>
              <li>Treasurer -- Cursor @ UW-Madison</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
