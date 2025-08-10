import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Window as Win95Window, WindowHeader, WindowContent, Button } from './Win95Components';
import WindowContentRenderer from './WindowContentRenderer';
import './Window.css';

const Window = ({ window, isActive, onClose, onMinimize, onFocus }) => {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 100 + Math.random() * 150 });
  const [size, setSize] = useState({ width: window.width || 400, height: window.height || 300 });
  const resizeStateRef = useRef({
    isResizing: false,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startPosX: 0,
    startPosY: 0,
    direction: 'br',
  });
  const nodeRef = useRef(null);

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleMouseDown = () => {
    onFocus();
  };

  const handleResizeMouseDown = (direction) => (e) => {
    e.stopPropagation();
    const state = resizeStateRef.current;
    state.isResizing = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.startWidth = size.width;
    state.startHeight = size.height;
    state.startPosX = position.x;
    state.startPosY = position.y;
    state.direction = direction;
    document.addEventListener('mousemove', handleResizing);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  const handleResizing = (e) => {
    const state = resizeStateRef.current;
    if (!state.isResizing) return;
    const deltaX = e.clientX - state.startX;
    const deltaY = e.clientY - state.startY;

    let newWidth = state.startWidth;
    let newHeight = state.startHeight;
    let newX = state.startPosX;
    let newY = state.startPosY;

    const dir = state.direction;
    if (dir.includes('r')) newWidth = state.startWidth + deltaX;
    if (dir.includes('l')) {
      newWidth = state.startWidth - deltaX;
      newX = state.startPosX + deltaX;
    }
    if (dir.includes('b')) newHeight = state.startHeight + deltaY;
    if (dir.includes('t')) {
      newHeight = state.startHeight - deltaY;
      newY = state.startPosY + deltaY;
    }

    const MIN_WIDTH = 320;
    const MIN_HEIGHT = 240;
    if (newWidth < MIN_WIDTH) {
      if (dir.includes('l')) newX += newWidth - MIN_WIDTH;
      newWidth = MIN_WIDTH;
    }
    if (newHeight < MIN_HEIGHT) {
      if (dir.includes('t')) newY += newHeight - MIN_HEIGHT;
      newHeight = MIN_HEIGHT;
    }

    // Constrain to parent bounds
    const container = nodeRef.current;
    if (container && container.parentElement) {
      const parentRect = container.parentElement.getBoundingClientRect();
      const maxWidth = parentRect.width - newX - 8;
      const maxHeight = parentRect.height - newY - 8;
      if (newWidth > maxWidth) newWidth = maxWidth;
      if (newHeight > maxHeight) newHeight = maxHeight;
      if (newX < 0) {
        if (dir.includes('l')) {
          newWidth += newX; // shrink width by the amount past the left edge
        }
        newX = 0;
      }
      if (newY < 0) {
        if (dir.includes('t')) {
          newHeight += newY;
        }
        newY = 0;
      }
    }

    setSize({ width: newWidth, height: newHeight });
    if (dir.includes('l') || dir.includes('t')) {
      setPosition({ x: newX, y: newY });
    }
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
        {/* Corner and edge resize handles */}
        <div className="window-resizer br" onMouseDown={handleResizeMouseDown('br')} />
        <div className="window-resizer tr" onMouseDown={handleResizeMouseDown('tr')} />
        <div className="window-resizer bl" onMouseDown={handleResizeMouseDown('bl')} />
        <div className="window-resizer tl" onMouseDown={handleResizeMouseDown('tl')} />
        <div className="window-resizer r" onMouseDown={handleResizeMouseDown('r')} />
        <div className="window-resizer l" onMouseDown={handleResizeMouseDown('l')} />
        <div className="window-resizer b" onMouseDown={handleResizeMouseDown('b')} />
        <div className="window-resizer t" onMouseDown={handleResizeMouseDown('t')} />
      </div>
    </Draggable>
  );
};

export default Window; 