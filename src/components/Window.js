import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Window as Win95Window, WindowHeader, WindowContent, Button } from './Win95Components';
import WindowContentRenderer from './WindowContentRenderer';
import './Window.css';

const Window = ({ window, isActive, onClose, onMinimize, onFocus }) => {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 100 + Math.random() * 150 });
  const nodeRef = useRef(null);

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleMouseDown = () => {
    onFocus();
  };

  if (window.isMinimized) {
    return null;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      position={position}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`draggable-window ${isActive ? 'active' : ''}`}
        style={{
          width: window.width || 400,
          height: window.height || 300,
          zIndex: window.zIndex || 100,
        }}
        onMouseDown={handleMouseDown}
      >
        <Win95Window>
          <WindowHeader className="window-header">
            <span className="window-title">{window.title}</span>
            <div className="window-controls">
              <Button
                className="window-control-button"
                onClick={onMinimize}
                size="sm"
              >
                _
              </Button>
              <Button
                className="window-control-button close-button"
                onClick={onClose}
                size="sm"
              >
                ×
              </Button>
            </div>
          </WindowHeader>
          <WindowContent className="window-content">
            <WindowContentRenderer component={window.component} />
          </WindowContent>
        </Win95Window>
      </div>
    </Draggable>
  );
};

export default Window; 