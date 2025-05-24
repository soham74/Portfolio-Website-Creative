import React from 'react';
import { List, ListItem, Separator } from './Win95Components';
import './StartMenu.css';

const StartMenu = ({ onClose, onItemClick }) => {
  const handleItemClick = (action) => {
    onItemClick();
    if (action) {
      action();
    }
  };

  const menuItems = [
    {
      label: 'About Me',
      icon: '👤',
      action: () => console.log('About Me clicked')
    },
    {
      label: 'My Projects',
      icon: '📁',
      action: () => console.log('Projects clicked')
    },
    {
      label: 'Resume',
      icon: '📄',
      action: () => console.log('Resume clicked')
    },
    { type: 'separator' },
    {
      label: 'Contact',
      icon: '📧',
      action: () => console.log('Contact clicked')
    },
    {
      label: 'GitHub',
      icon: '🔗',
      action: () => window.open('https://github.com', '_blank')
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      action: () => window.open('https://linkedin.com', '_blank')
    },
    { type: 'separator' },
    {
      label: 'Settings',
      icon: '⚙️',
      action: () => console.log('Settings clicked')
    },
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