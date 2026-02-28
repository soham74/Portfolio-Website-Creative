import React from 'react';
import './DesktopContextMenu.css';

const DesktopContextMenu = ({ x, y, onClose }) => {
  const handleArrangeIcons = () => {
    onClose();
    // Visual feedback only
  };

  const handleRefresh = () => {
    onClose();
    window.location.reload();
  };

  const handleProperties = () => {
    onClose();
    const event = new CustomEvent('openWindowFromStart', {
      detail: {
        title: 'Display Properties',
        component: 'SettingsWindow',
        width: 420,
        height: 460,
      }
    });
    window.dispatchEvent(event);
  };

  const handleNewFolder = () => {
    onClose();
    // Just a fun visual
    const event = new CustomEvent('openWindowFromStart', {
      detail: {
        title: 'My Computer',
        component: 'ExplorerWindow',
        width: 700,
        height: 480,
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="context-menu-overlay" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div
        className="desktop-context-menu"
        style={{ left: x, top: y }}
      >
        <div className="context-menu-item" onClick={handleArrangeIcons}>
          Arrange Icons
        </div>
        <div className="context-menu-item" onClick={() => { onClose(); }}>
          Line up Icons
        </div>
        <div className="context-menu-separator" />
        <div className="context-menu-item" onClick={handleRefresh}>
          Refresh
        </div>
        <div className="context-menu-separator" />
        <div className="context-menu-item" onClick={handleNewFolder}>
          Open Explorer
        </div>
        <div className="context-menu-separator" />
        <div className="context-menu-item" onClick={handleProperties}>
          Properties
        </div>
      </div>
    </>
  );
};

export default DesktopContextMenu;
