import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import Clippy from './components/Clippy';
import DesktopPet from './components/DesktopPet';
import BSOD from './components/BSOD';
import EasterEggs from './components/EasterEggs';
import InstallWizard from './components/InstallWizard';
import soundManager from './utils/SoundManager';
import windowsBg from './assets/windows_bg.jpeg';
import './App.css';

const App = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wallpaper, setWallpaper] = useState({ type: 'image', value: windowsBg });

  // Initialize global recycle bin
  useEffect(() => {
    if (!window.__recycleBin) {
      window.__recycleBin = [];
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Listen for Start menu open requests
  useEffect(() => {
    const handler = (e) => {
      if (e && e.detail) {
        openWindow(e.detail);
      }
    };
    window.addEventListener('openWindowFromStart', handler);
    return () => window.removeEventListener('openWindowFromStart', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openWindows]);

  // Listen for wallpaper change from Settings
  useEffect(() => {
    const handler = (e) => {
      const wp = e.detail;
      if (!wp) return;
      if (wp.value === 'none' || wp.value?.startsWith('solid-')) {
        setWallpaper({ type: 'color', value: wp.color || '#008080' });
      } else if (wp.value === 'clouds') {
        setWallpaper({ type: 'gradient', value: 'linear-gradient(180deg, #87CEEB 0%, #E0F0FF 60%, #fff 100%)' });
      } else if (wp.value?.startsWith('/')) {
        setWallpaper({ type: 'image', value: wp.value });
      } else {
        setWallpaper({ type: 'image', value: windowsBg });
      }
    };
    window.addEventListener('changeWallpaper', handler);
    return () => window.removeEventListener('changeWallpaper', handler);
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
    // Save closed window to recycle bin
    const closedWindow = openWindows.find(w => w.id === windowId);
    if (closedWindow && closedWindow.component !== 'RecycleBinWindow') {
      if (!window.__recycleBin) window.__recycleBin = [];
      window.__recycleBin.push({
        id: closedWindow.id,
        title: closedWindow.title,
        component: closedWindow.component,
        width: closedWindow.width,
        height: closedWindow.height,
        closedAt: Date.now(),
      });
      window.dispatchEvent(new Event('recycleBinUpdated'));
    }

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

  const bgStyle = wallpaper.type === 'color'
    ? { backgroundColor: wallpaper.value }
    : wallpaper.type === 'gradient'
      ? { backgroundImage: wallpaper.value }
      : {
          backgroundImage: `url(${wallpaper.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        };

  return (
    <div
      className="app"
      style={bgStyle}
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
        onStartClick={() => {}}
      />
      <Clippy />
      <DesktopPet />
      <BSOD />
      <EasterEggs />
      <InstallWizard />
    </div>
  );
};

export default App;
