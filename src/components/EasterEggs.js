import React, { useState, useEffect, useCallback } from 'react';
import './EasterEggs.css';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

const CONFETTI_COLORS = [
  '#ff0', '#f0f', '#0ff', '#f00', '#0f0',
  '#00f', '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
];

const PARTICLE_COUNT = 50;
const CONFETTI_DURATION = 3000;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 4;
    const animationVariant = Math.floor(Math.random() * 4) + 1;
    const delay = Math.random() * 0.8;
    const duration = 2 + Math.random() * 1.5;
    const initialRotation = Math.floor(Math.random() * 360);

    return {
      id: i,
      style: {
        backgroundColor: color,
        left: `${left}%`,
        top: '-12px',
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${initialRotation}deg)`,
        animationName: `confetti-fall-${animationVariant}`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animationFillMode: 'forwards',
      },
    };
  });
}

const EasterEggs = () => {
  const [, setInputBuffer] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);

  const triggerConfetti = useCallback(() => {
    setParticles(generateParticles());
    setShowConfetti(true);

    const timer = setTimeout(() => {
      setShowConfetti(false);
      setParticles([]);
    }, CONFETTI_DURATION);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.code;

      setInputBuffer((prev) => {
        const updated = [...prev, key].slice(-KONAMI_CODE.length);

        if (
          updated.length === KONAMI_CODE.length &&
          updated.every((k, i) => k === KONAMI_CODE[i])
        ) {
          setTimeout(() => triggerConfetti(), 0);
          return [];
        }

        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfetti]);

  if (!showConfetti) {
    return null;
  }

  return (
    <div className="easter-egg-confetti-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="easter-egg-confetti-particle"
          style={particle.style}
        />
      ))}
    </div>
  );
};

export default EasterEggs;
