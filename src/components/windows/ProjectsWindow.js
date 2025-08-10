import React from 'react';
import './ProjectsWindow.css';

const ProjectsWindow = () => {
  return (
    <div className="text-editor-container">
      <div className="text-body-container">
        <div className="text-editor-inner">
          <div className="text-container">
            <h1 className="project-title">AI Chess Bot</h1>
            <p className="project-body">
              Built a chess engine using Minimax with Alpha–Beta pruning to evaluate move trees and
              simulate strategic depth. Implemented a real‑time GUI with annotated move logic and
              visual feedback.
              <br/><br/>
              <em>Tools:</em> Python, Flask, Pygame, Git
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">Stock Sentiment Analyzer</h1>
            <p className="project-body">
              Created a pipeline to parse tweets and predict stock direction using logistic
              regression with weighted keyword features. Achieved 72% accuracy on labeled test data
              across multiple equity classes.
              <br/><br/>
              <em>Tools:</em> Python, NLTK, Twitter API, Pandas, Matplotlib
            </p>

            <hr className="text-editor-hr"/>

            <h1 className="project-title">Retro Windows Personal Portfolio</h1>
            <p className="project-body">
              Developed a personal site emulating a Windows 98 desktop with draggable windows and a
              boot‑style experience. State handled with Zustand and render performance optimized via
              memoization and dynamic routing.
              <br/><br/>
              <em>Tools:</em> TypeScript, React.js, Tailwind CSS, Zustand, Next.js, Vercel
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