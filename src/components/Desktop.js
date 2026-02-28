import React, { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import DesktopContextMenu from './DesktopContextMenu';
import './Desktop.css';

const Desktop = ({ onIconClick }) => {
  const [iconPositions, setIconPositions] = useState({});
  const [contextMenu, setContextMenu] = useState(null);

  const handlePositionChange = (iconId, newPosition) => {
    setIconPositions(prev => ({
      ...prev,
      [iconId]: newPosition
    }));
  };

  const handleContextMenu = (e) => {
    // Only show on desktop background, not on icons
    if (e.target.closest('.desktop-icon')) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const desktopIcons = [
    {
      id: 'mycomputer',
      name: 'My Computer',
      icon: '/images/icons/filled_folder.png',
      iconType: 'image',
      position: iconPositions['mycomputer'] || { x: 50, y: 50 },
      windowContent: {
        title: 'My Computer',
        component: 'ExplorerWindow',
        width: 700,
        height: 480,
      }
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: '/images/icons/filled_folder.png',
      iconType: 'image',
      position: iconPositions['projects'] || { x: 50, y: 170 },
      windowContent: {
        title: 'Projects',
        component: 'ProjectsWindow',
        width: 760,
        height: 520,
      }
    },
    {
      id: 'resume',
      name: 'Terminal',
      icon: '/images/icons/windows_icon.png',
      iconType: 'image',
      position: iconPositions['resume'] || { x: 50, y: 290 },
      windowContent: {
        title: 'Terminal',
        component: 'ResumeWindow',
        width: 720,
        height: 620,
      }
    },
    {
      id: 'about',
      name: 'About Me',
      icon: '/images/icons/filled_folder.png',
      iconType: 'image',
      position: iconPositions['about'] || { x: 50, y: 410 },
      windowContent: {
        title: 'About Me',
        component: 'AboutWindow',
        width: 700,
        height: 520,
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '/images/icons/windows_icon.png',
      iconType: 'image',
      position: iconPositions['contact'] || { x: 150, y: 50 },
      windowContent: {
        title: 'Contact Information',
        component: 'ContactWindow',
        width: 520,
        height: 360,
      }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: '/images/icons/filled_folder.png',
      iconType: 'image',
      position: iconPositions['skills'] || { x: 150, y: 170 },
      windowContent: {
        title: 'Technical Skills',
        component: 'SkillsWindow',
        width: 760,
        height: 520,
      }
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '/images/icons/github.gif',
      iconType: 'image',
      position: iconPositions['github'] || { x: 150, y: 290 },
      windowContent: null
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '/images/icons/linkedin.png',
      iconType: 'image',
      position: iconPositions['linkedin'] || { x: 150, y: 410 },
      windowContent: null
    },
    {
      id: 'games',
      name: 'Games',
      icon: '🎮',
      iconType: 'emoji',
      position: iconPositions['games'] || { x: 250, y: 50 },
      windowContent: {
        title: 'Mini Games',
        component: 'GamesWindow',
        width: 720,
        height: 520,
      }
    },
    {
      id: 'recyclebin',
      name: 'Recycle Bin',
      icon: '🗑️',
      iconType: 'emoji',
      position: iconPositions['recyclebin'] || { x: 250, y: 170 },
      windowContent: {
        title: 'Recycle Bin',
        component: 'RecycleBinWindow',
        width: 500,
        height: 380,
      }
    },
  ];

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      <div className="desktop-content">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onClick={() => {
              if (icon.id === 'github') {
                window.open('https://github.com/soham74', '_blank');
                return;
              }
              if (icon.id === 'linkedin') {
                window.open('https://www.linkedin.com/in/soham-kolhe-88826b228/', '_blank');
                return;
              }
              onIconClick(icon.windowContent);
            }}
            onPositionChange={handlePositionChange}
          />
        ))}
      </div>
      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default Desktop;
