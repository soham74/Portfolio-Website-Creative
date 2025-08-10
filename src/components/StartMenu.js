import React from 'react';
import { List, ListItem, Separator } from './Win95Components';
import './StartMenu.css';

const StartMenu = ({ onClose, onItemClick, onOpenWindow }) => {
  const handleItemClick = (action) => {
    onItemClick();
    if (action) {
      action();
    }
  };

  const openWin = (component, title, width, height) => () =>
    onOpenWindow &&
    onOpenWindow({ component, title, width, height });

  const menuItems = [
    { label: 'About Me', icon: '👤', action: openWin('AboutWindow', 'About Me', 500, 400) },
    { label: 'My Projects', icon: '📁', action: openWin('ProjectsWindow', 'Projects', 600, 400) },
    { label: 'Resume', icon: '📄', action: openWin('ResumeWindow', 'Resume', 500, 600) },
    { type: 'separator' },
    { label: 'Contact', icon: '📧', action: openWin('ContactWindow', 'Contact Information', 400, 300) },
    {
      label: 'GitHub',
      icon: '🔗',
      action: () => window.open('https://github.com/soham74', '_blank')
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      action: () => window.open('https://www.linkedin.com/in/soham-kolhe-88826b228/', '_blank')
    },
    { type: 'separator' },
    { label: 'Settings', icon: '⚙️', action: openWin('SkillsWindow', 'Technical Skills', 500, 400) },
    {
      label: 'Shutdown',
      icon: '⏻',
      action: () => {
        if (window.confirm('Are you sure you want to shutdown?')) {
          window.close();
        }
      }
    }
  ];

  return (
    <>
      <div className="start-menu-overlay" onClick={onClose} />
      <div className="start-menu">
        <div className="start-menu-header">
          <div className="start-menu-user">
            <span className="user-icon">👨‍💻</span>
            <span className="user-name">Portfolio</span>
          </div>
        </div>
        
        <div className="start-menu-content">
          <List>
            {menuItems.map((item, index) => (
              item.type === 'separator' ? (
                <Separator key={index} />
              ) : (
                <ListItem
                  key={index}
                  onClick={() => handleItemClick(item.action)}
                  className="start-menu-item"
                >
                  <span className="menu-item-icon">{item.icon}</span>
                  <span className="menu-item-label">{item.label}</span>
                </ListItem>
              )
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default StartMenu; 