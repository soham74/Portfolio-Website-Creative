import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Window as Win95Window, WindowHeader, WindowContent, Button } from './Win95Components';
import WindowContentRenderer from './WindowContentRenderer';
import './Window.css';

const Window = ({ window, isActive, onClose, onMinimize, onFocus }) => {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 100 + Math.random() * 150 });
  const [size, setSize] = useState({ width: window.width || 400, height: window.height || 300 });
  const resizeStateRef = useRef({ isResizing: false, startX: 0, startY: 0, startWidth: 0, startHeight: 0 });
  const nodeRef = useRef(null);

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleMouseDown = () => {
    onFocus();
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    const state = resizeStateRef.current;
    state.isResizing = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.startWidth = size.width;
    state.startHeight = size.height;
    document.addEventListener('mousemove', handleResizing);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  const handleResizing = (e) => {
    const state = resizeStateRef.current;
    if (!state.isResizing) return;
    const deltaX = e.clientX - state.startX;
    const deltaY = e.clientY - state.startY;

    let newWidth = state.startWidth + deltaX;
    let newHeight = state.startHeight + deltaY;

    const MIN_WIDTH = 320;
    const MIN_HEIGHT = 240;
    newWidth = Math.max(MIN_WIDTH, newWidth);
    newHeight = Math.max(MIN_HEIGHT, newHeight);

    // Constrain to parent bounds
    const container = nodeRef.current;
    if (container && container.parentElement) {
      const parentRect = container.parentElement.getBoundingClientRect();
      const maxWidth = parentRect.width - position.x - 8;
      const maxHeight = parentRect.height - position.y - 8;
      newWidth = Math.min(newWidth, maxWidth);
      newHeight = Math.min(newHeight, maxHeight);
    }

    setSize({ width: newWidth, height: newHeight });
  };

  const handleResizeMouseUp = () => {
    const state = resizeStateRef.current;
    state.isResizing = false;
    document.removeEventListener('mousemove', handleResizing);
    document.removeEventListener('mouseup', handleResizeMouseUp);
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
          width: size.width,
          height: size.height,
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
        <div className="window-resizer" onMouseDown={handleResizeMouseDown} />
      </div>
    </Draggable>
  );
};

export default Window; 