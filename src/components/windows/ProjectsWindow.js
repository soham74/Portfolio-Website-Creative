import React from 'react';
import './ProjectsWindow.css';

const ProjectsWindow = () => {
  return (
    <div className="text-editor-container">
      <div className="text-body-container">
        <div className="text-editor-inner">
          <div className="text-container">
            <h1 className="project-title">arcflow</h1>
            <p className="project-subtitle">1st Place, MadData Hackathon (Qualcomm Track)</p>
            <p className="project-body">
              A no-code AI pipeline builder for on-device ML workflows. Users drag, drop, and deploy
              multi-modal pipelines running entirely on Qualcomm's Snapdragon NPU -- no cloud needed.
              Runs three models simultaneously (YOLOv8, YamNet, OmniNeural-4B) with sub-50ms latency,
              and includes a natural language engine that converts plain English into wired node graphs.
              <br/><br/>
              <em>Built with:</em> Next.js, React Flow, FastAPI, ONNX Runtime
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">ScopeAI</h1>
            <p className="project-subtitle">Best AI/ML Hack, CalHacks (3,000+ participants)</p>
            <p className="project-body">
              An AI contract analysis platform that scans government contracts for risk factors, vague
              language, and missing deliverables. Hit 91% accuracy across 200+ test documents. During
              the demo, ran live analysis on a $4.2M federal contract and flagged 23 risk areas with
              actionable alternatives.
              <br/><br/>
              <em>Built with:</em> Claude API, spaCy, Python
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">USDA Crop Detection AI</h1>
            <p className="project-subtitle">Wisconsin Institute of Discovery -- Mura Lab</p>
            <p className="project-body">
              A satellite imagery system that predicts optimal planting windows for the USDA, now serving
              500+ farmers across 12 Midwest states. Benchmarked four deep learning architectures on 5TB
              of imagery to reach 93% accuracy across 9 growth stages. The inference API returns
              classifications in under 200ms and handles 50k+ daily requests. Also built a React + Mapbox
              dashboard so farmers can visualize field health recommendations.
              <br/><br/>
              <em>Built with:</em> Python, PyTorch, FastAPI, Docker, React, Mapbox, AWS
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">AI Grant-Writing Tool</h1>
            <p className="project-subtitle">UW Dept of Surgery -- N+1 Institute</p>
            <p className="project-body">
              An AI-powered drafting tool that helps physician-researchers write NIH grant proposals,
              cutting time-to-first-draft from 8+ hours to under 1. Uses a RAG pipeline over the 200+
              page IRB Investigator Manual to auto-populate compliance documents with 95%+ accuracy,
              plus entity extraction to map grant data to federal reporting templates.
              <br/><br/>
              <em>Built with:</em> Python, LLMs, RAG, spaCy, FastAPI
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">Workflow Automation Engine</h1>
            <p className="project-subtitle">UW Tech Exploration Lab</p>
            <p className="project-body">
              A system that routes multi-step approval chains across 10+ UW departments, handling 500+
              requests per month. Uses BERT and Sentence Transformers to auto-classify incoming requests
              and validate uploads, cutting manual triage by ~70%. Includes a bottleneck prediction model
              (XGBoost) that flags at-risk requests before they stall, surfaced via a real-time Kanban board.
              <br/><br/>
              <em>Built with:</em> Python, BERT, XGBoost, React, FastAPI
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">Retro Windows Portfolio</h1>
            <p className="project-body">
              This site! A personal portfolio emulating a Windows 98 desktop with draggable, resizable
              windows, a start menu, sound effects, and a built-in Snake game.
              <br/><br/>
              <em>Built with:</em> React, Tailwind CSS, Vercel
              <br/>
              Link: {` `}
              <a
                href="https://soham-kolhe-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                soham-kolhe-portfolio.vercel.app
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
