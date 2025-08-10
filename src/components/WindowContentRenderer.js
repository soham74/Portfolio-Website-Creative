import React from 'react';
import ProjectsWindow from './windows/ProjectsWindow';
import ResumeWindow from './windows/ResumeWindow';
import AboutWindow from './windows/AboutWindow';
import ContactWindow from './windows/ContactWindow';
import SkillsWindow from './windows/SkillsWindow';
import GamesWindow from './windows/GamesWindow';
import SnakeGame from './windows/games/SnakeGame';

const WindowContentRenderer = ({ component }) => {
  switch (component) {
    case 'ProjectsWindow':
      return <ProjectsWindow />;
    case 'ResumeWindow':
      return <ResumeWindow />;
    case 'AboutWindow':
      return <AboutWindow />;
    case 'ContactWindow':
      return <ContactWindow />;
    case 'SkillsWindow':
      return <SkillsWindow />;
    case 'GamesWindow':
      return <GamesWindow />;
    case 'SnakeGame':
      return <SnakeGame />;
    default:
      return (
        <div>
          <h3>Unknown Window Type</h3>
          <p>The requested window content could not be found.</p>
        </div>
      );
  }
};

export default WindowContentRenderer; 