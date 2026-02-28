import React, { useState } from 'react';
import { Button } from './Win95Components';
import StartMenu from './StartMenu';
import VisitorCounter from './VisitorCounter';
import './Taskbar.css';

const Taskbar = ({ openWindows, currentTime, onWindowClick, onStartClick }) => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
    onStartClick();
  };

  const handleWindowClick = (windowId) => {
    onWindowClick(windowId);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
        {showStartMenu && (
          <StartMenu
            onClose={() => setShowStartMenu(false)}
            onItemClick={() => setShowStartMenu(false)}
            onOpenWindow={(windowData) => {
              setShowStartMenu(false);
              const event = new CustomEvent('openWindowFromStart', { detail: windowData });
              window.dispatchEvent(event);
            }}
          />
        )}
      <div className="taskbar">
        <div className="taskbar-left">
          <Button
            className="start-button"
            onClick={handleStartClick}
            active={showStartMenu}
          >
            <img
              src="/images/icons/windows_icon.png"
              alt="Windows"
              className="start-icon-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span className="start-icon-fallback" style={{ display: 'none' }}>🪟</span>
            <span className="start-text">Start</span>
          </Button>

          <div className="taskbar-separator" />
          <div className="taskbar-links">
            <button
              className="taskbar-link-button"
              onClick={() => handleExternalLink('https://www.linkedin.com/in/soham-kolhe-88826b228/')}
              title="LinkedIn Profile"
            >
              <img
                src="/images/icons/linkedin.png"
                alt="LinkedIn"
                className="taskbar-link-icon"
              />
            </button>
            <button
              className="taskbar-link-button"
              onClick={() => handleExternalLink('https://github.com/soham74')}
              title="GitHub Profile"
            >
              <img
                src="/images/icons/github.gif"
                alt="GitHub"
                className="taskbar-link-icon"
              />
            </button>
          </div>

          <div className="taskbar-separator" />

          <div className="taskbar-windows">
            {openWindows.map(window => (
              <Button
                key={window.id}
                className="taskbar-window-button"
                onClick={() => handleWindowClick(window.id)}
                active={false}
              >
                {window.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="taskbar-right">
          <div className="system-tray">
            <VisitorCounter />
            <div className="clock">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
