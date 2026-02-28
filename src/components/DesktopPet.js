import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DesktopPet.css';

const SPEECHES = [
  'Meow!',
  'Purr...',
  '*rubs against cursor*',
  '*knocks things off desk*',
  'Mrow?',
  '*chases a bug*',
  'Feed me code!',
  'Zzz...',
];

const DesktopPet = () => {
  const [posX, setPosX] = useState(() => Math.random() * (window.innerWidth - 40));
  const [state, setState] = useState('idle'); // idle | walk | sleep | react-to-click
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [speech, setSpeech] = useState(null);

  const animFrameRef = useRef(null);
  const stateTimerRef = useRef(null);
  const speechTimerRef = useRef(null);
  const posXRef = useRef(posX);
  const directionRef = useRef(direction);
  const stateRef = useRef(state);

  // Keep refs in sync
  useEffect(() => { posXRef.current = posX; }, [posX]);
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { stateRef.current = state; }, [state]);

  const pickRandomDirection = useCallback(() => {
    const dir = Math.random() > 0.5 ? 1 : -1;
    setDirection(dir);
    return dir;
  }, []);

  const scheduleNextState = useCallback(() => {
    clearTimeout(stateTimerRef.current);

    const duration = 2000 + Math.random() * 5000;
    stateTimerRef.current = setTimeout(() => {
      if (stateRef.current === 'react-to-click') return;

      const roll = Math.random();
      if (roll < 0.45) {
        setState('walk');
        pickRandomDirection();
      } else if (roll < 0.8) {
        setState('idle');
      } else {
        setState('sleep');
      }
      scheduleNextState();
    }, duration);
  }, [pickRandomDirection]);

  // Walk animation loop
  useEffect(() => {
    if (state !== 'walk') {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = () => {
      const speed = 1 + Math.random();
      const nextX = posXRef.current + speed * directionRef.current;
      const maxX = window.innerWidth - 40;

      if (nextX <= 0 || nextX >= maxX) {
        const newDir = directionRef.current * -1;
        setDirection(newDir);
        setPosX(Math.max(0, Math.min(nextX, maxX)));
      } else {
        setPosX(nextX);
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [state]);

  // Start the state machine on mount
  useEffect(() => {
    scheduleNextState();
    return () => {
      clearTimeout(stateTimerRef.current);
      clearTimeout(speechTimerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [scheduleNextState]);

  const handleClick = useCallback(() => {
    // Cancel pending state transition while reacting
    clearTimeout(stateTimerRef.current);
    cancelAnimationFrame(animFrameRef.current);

    setState('react-to-click');

    const msg = SPEECHES[Math.floor(Math.random() * SPEECHES.length)];
    setSpeech(msg);

    clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => {
      setSpeech(null);
      setState('idle');
      scheduleNextState();
    }, 2000);
  }, [scheduleNextState]);

  const petClassName = [
    'desktop-pet',
    `desktop-pet--${state}`,
  ].join(' ');

  const facingStyle = {
    transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
  };

  return (
    <div
      className={petClassName}
      style={{ left: posX }}
      onClick={handleClick}
      title="Click me!"
    >
      {speech && (
        <div className="desktop-pet__speech">
          {speech}
        </div>
      )}

      {state === 'sleep' && (
        <span className="desktop-pet__zzz">💤</span>
      )}

      <span className="desktop-pet__cat" style={facingStyle}>
        🐱
      </span>
    </div>
  );
};

export default DesktopPet;
