import React, { useState, useEffect, useCallback } from 'react';
import './BSOD.css';

const ERROR_MESSAGES = [
  'TALENT_OVERFLOW_ERROR in PORTFOLIO.SYS',
  'HIRE_ME.SYS: Unhandled exception -- candidate too qualified',
  'FATAL ERROR: Unable to contain awesomeness at 0x00HIRE00',
  'KERNEL_SKILL_OVERFLOW: Too many skills loaded in memory',
  'CRITICAL_RESUME_FAILURE: Expected 1 page, found infinite potential',
  'PAGE_FAULT_IN_HIRING_AREA: Contact HR immediately',
];

const BSOD = () => {
  const [isActive, setIsActive] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const triggerBSOD = useCallback(() => {
    if (sessionStorage.getItem('bsod_shown')) return;
    sessionStorage.setItem('bsod_shown', 'true');

    const randomIndex = Math.floor(Math.random() * ERROR_MESSAGES.length);
    setErrorMessage(ERROR_MESSAGES[randomIndex]);
    setIsActive(true);
  }, []);

  const dismiss = useCallback(() => {
    if (isRebooting) return;
    setIsRebooting(true);

    // After 1.5s of "Rebooting...", fade to black then disappear
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsActive(false);
        setIsRebooting(false);
        setIsFadingOut(false);
      }, 800);
    }, 1500);
  }, [isRebooting]);

  // Random timer trigger (3-8 minutes)
  useEffect(() => {
    if (sessionStorage.getItem('bsod_shown')) return;

    const minDelay = 3 * 60 * 1000; // 3 minutes
    const maxDelay = 8 * 60 * 1000; // 8 minutes
    const delay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

    const timer = setTimeout(() => {
      triggerBSOD();
    }, delay);

    return () => clearTimeout(timer);
  }, [triggerBSOD]);

  // Listen for custom 'triggerBSOD' event (e.g. from terminal command)
  useEffect(() => {
    const handler = () => {
      // Force-allow when triggered manually via event
      setErrorMessage(ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]);
      setIsActive(true);
      sessionStorage.setItem('bsod_shown', 'true');
    };

    window.addEventListener('triggerBSOD', handler);
    return () => window.removeEventListener('triggerBSOD', handler);
  }, []);

  // Dismiss on any keypress or click
  useEffect(() => {
    if (!isActive || isRebooting) return;

    const handleInteraction = () => dismiss();

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [isActive, isRebooting, dismiss]);

  if (!isActive) return null;

  return (
    <div className={`bsod-overlay ${isFadingOut ? 'bsod-fade-out' : ''}`}>
      {!isRebooting ? (
        <div className="bsod-content">
          <div className="bsod-title-bar">
            <span className="bsod-title-text">Windows</span>
          </div>

          <p className="bsod-error-intro">
            A fatal exception has occurred at 0x0028:C0011E36 in VXD VMM(01) +
          </p>
          <p className="bsod-error-intro">00010E36. The current application will be terminated.</p>

          <p className="bsod-error-message">* {errorMessage}</p>

          <p className="bsod-technical">
            An operation on this machine has resulted in an unrecoverable
          </p>
          <p className="bsod-technical">
            error. The system has been halted to prevent further damage.
          </p>

          <p className="bsod-prompt">
            Press any key to continue <span className="bsod-cursor">_</span>
          </p>
        </div>
      ) : (
        <div className="bsod-reboot">
          <p className="bsod-reboot-text">
            Rebooting<span className="bsod-dots" />
          </p>
        </div>
      )}
    </div>
  );
};

export default BSOD;
