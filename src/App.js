import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import soundManager from './utils/SoundManager';
import windowsBg from './assets/windows_bg.jpeg';
import './App.css';

const App = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    soundManager.playMouseDown();
  };

  const handleMouseUp = (e) => {
    soundManager.playMouseUp();
  };

  const openWindow = (windowData) => {
    const windowId = Date.now().toString();
    const newWindow = {
      ...windowData,
      id: windowId,
      isMinimized: false,
      zIndex: openWindows.length + 100,
    };
    setOpenWindows([...openWindows, newWindow]);
    setActiveWindow(windowId);
  };

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(window => window.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(window => window.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const minimizeWindow = (windowId) => {
    setOpenWindows(openWindows.map(window => 
      window.id === windowId 
        ? { ...window, isMinimized: !window.isMinimized }
        : window
    ));
  };

  const focusWindow = (windowId) => {
    setActiveWindow(windowId);
    setOpenWindows(openWindows.map(window => 
      window.id === windowId 
        ? { ...window, isMinimized: false, zIndex: Math.max(...openWindows.map(w => w.zIndex || 0)) + 1 }
        : window
    ));
  };

  return (
    <div 
      className="app"
      style={{
        backgroundImage: `url(${windowsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Desktop onIconClick={openWindow} />
      <WindowManager 
        windows={openWindows}
        activeWindow={activeWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onFocus={focusWindow}
      />
      <Taskbar 
        openWindows={openWindows}
        currentTime={currentTime}
        onWindowClick={focusWindow}
        onStartClick={() => console.log('Start menu clicked')}
      />
    </div>
  );
};

export default App;
