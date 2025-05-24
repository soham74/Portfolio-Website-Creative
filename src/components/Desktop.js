import React, { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import './Desktop.css';

// Import your custom images
// import projectsIcon from '../assets/images/icons/projects.png';
// import resumeIcon from '../assets/images/icons/resume.png';
// import aboutIcon from '../assets/images/icons/about.png';
// import contactIcon from '../assets/images/icons/contact.png';
// import skillsIcon from '../assets/images/icons/skills.png';
// import sonicIcon from '../assets/images/icons/sonic.png';
// import gamesIcon from '../assets/images/icons/games.png';

const Desktop = ({ onIconClick }) => {
  const [iconPositions, setIconPositions] = useState({});

  const handlePositionChange = (iconId, newPosition) => {
    setIconPositions(prev => ({
      ...prev,
      [iconId]: newPosition
    }));
  };

  const desktopIcons = [
    {
      id: 'projects',
      name: 'Projects',
      icon: '/images/icons/filled_folder.png', // Changed to filled folder
      iconType: 'image',
      position: iconPositions['projects'] || { x: 50, y: 50 },
      windowContent: {
        title: 'Projects',
        component: 'ProjectsWindow',
        width: 600,
        height: 400,
      }
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      icon: '/images/icons/windows_icon.png', // Using Windows icon for document
      iconType: 'image',
      position: iconPositions['resume'] || { x: 50, y: 170 },
      windowContent: {
        title: 'Resume',
        component: 'ResumeWindow',
        width: 500,
        height: 600,
      }
    },
    {
      id: 'about',
      name: 'About Me',
      icon: '/images/icons/filled_folder.png', // Using filled folder for About Me
      iconType: 'image',
      position: iconPositions['about'] || { x: 50, y: 290 },
      windowContent: {
        title: 'About Me',
        component: 'AboutWindow',
        width: 500,
        height: 400,
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '/images/icons/windows_icon.png', // Using Windows icon for Contact
      iconType: 'image',
      position: iconPositions['contact'] || { x: 50, y: 410 },
      windowContent: {
        title: 'Contact Information',
        component: 'ContactWindow',
        width: 400,
        height: 300,
      }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: '/images/icons/filled_folder.png', // Changed to filled folder
      iconType: 'image',
      position: iconPositions['skills'] || { x: 150, y: 50 },
      windowContent: {
        title: 'Technical Skills',
        component: 'SkillsWindow',
        width: 500,
        height: 400,
      }
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '/images/icons/github.gif', // Using the GitHub gif you provided
      iconType: 'image',
      position: iconPositions['github'] || { x: 150, y: 170 },
      windowContent: {
        title: 'GitHub Profile',
        component: 'GitHubWindow',
        width: 400,
        height: 300,
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '/images/icons/linkedin.png', // Using the LinkedIn PNG you provided
      iconType: 'image',
      position: iconPositions['linkedin'] || { x: 150, y: 290 },
      windowContent: {
        title: 'LinkedIn Profile',
        component: 'LinkedInWindow',
        width: 400,
        height: 300,
      }
    },
    {
      id: 'games',
      name: 'Games',
      icon: '/images/icons/filled_folder.png', // Using filled folder for Games
      iconType: 'image',
      position: iconPositions['games'] || { x: 150, y: 410 },
      windowContent: {
        title: 'Mini Games',
        component: 'GamesWindow',
        width: 500,
        height: 400,
      }
    }
  ];

  return (
    <div className="desktop">
      <div className="desktop-content">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onClick={() => onIconClick(icon.windowContent)}
            onPositionChange={handlePositionChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Desktop; 