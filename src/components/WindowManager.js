import React from 'react';
import Window from './Window';

const WindowManager = ({ windows, activeWindow, onClose, onMinimize, onFocus }) => {
  return (
    <>
      {windows.map(window => (
        <Window
          key={window.id}
          window={window}
          isActive={activeWindow === window.id}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onFocus={() => onFocus(window.id)}
        />
      ))}
    </>
  );
};

export default WindowManager; 