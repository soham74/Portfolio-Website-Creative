import React, { useState, useRef } from 'react';
import './DesktopIcon.css';

const DesktopIcon = ({ icon, onClick, onPositionChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(icon.position);
  const [hasMoved, setHasMoved] = useState(false);
  const iconRef = useRef(null);

  const handleDoubleClick = (e) => {
    if (!isDragging && !hasMoved) {
      setIsSelected(true);
      setTimeout(() => setIsSelected(false), 200);
      onClick();
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    setIsDragging(false);
    setHasMoved(false);
    
    // Add mouse move and up listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dragStart.x !== 0 && dragStart.y !== 0) {
      const deltaX = Math.abs(e.clientX - (dragStart.x + position.x));
      const deltaY = Math.abs(e.clientY - (dragStart.y + position.y));
      
      // Only start dragging if moved more than 5 pixels
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
        setHasMoved(true);
        
        const newPosition = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        };
        
        // Constrain to viewport
        const iconElement = iconRef.current;
        if (iconElement) {
          const rect = iconElement.getBoundingClientRect();
          const maxX = window.innerWidth - 80; // Icon width
          const maxY = window.innerHeight - 140; // Icon height + taskbar
          
          newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
          newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));
        }
        
        setPosition(newPosition);
        if (onPositionChange) {
          onPositionChange(icon.id, newPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
    
    // Remove listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // Reset hasMoved after a short delay
    setTimeout(() => setHasMoved(false), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDoubleClick(e);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback emojis for each icon type
  const fallbackEmojis = {
    '/images/icons/folder.png': '📁',
    '/images/icons/filled_folder.png': '📂',
    '/images/icons/windows_icon.png': '📄',
    '/images/icons/github.gif': '🐙',
    '/images/icons/linkedin.png': '💼',
  };

  const renderIcon = () => {
    if (icon.iconType === 'image' && !imageError) {
      return (
        <img 
          src={icon.icon} 
          alt={icon.name}
          className="icon-image-custom"
          draggable={false}
          onError={handleImageError}
        />
      );
    } else {
      const emojiToShow = icon.iconType === 'image' && imageError 
        ? fallbackEmojis[icon.icon] || '📁'
        : icon.icon;
      
      return (
        <div className="icon-image">
          {emojiToShow}
        </div>
      );
    }
  };

  return (
    <div
      ref={iconRef}
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'pointer'
      }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${icon.name}`}
    >
      {renderIcon()}
      <div className="icon-label">
        {icon.name}
      </div>
    </div>
  );
};

export default DesktopIcon; 