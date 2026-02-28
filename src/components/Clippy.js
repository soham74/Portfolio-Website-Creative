import React, { useState, useEffect } from 'react';
import './Clippy.css';

const tips = [
  "It looks like you're browsing a portfolio. Would you like help hiring this person?",
  "I see you haven't clicked 'Contact' yet. Bold strategy.",
  "Did you know? This portfolio was built without any AI. Just kidding.",
  "Fun fact: The developer is available for hire. Just saying.",
  "You've been here a while. Time to send that email!",
  "Pro tip: Ctrl+P won't print a job offer, but emailing Soham might.",
  "I see you're reading this. Interesting. Very interesting.",
  "Have you tried turning this website off and on again?",
  "This portfolio has more features than most production apps I've seen.",
  "Warning: Extended exposure to this portfolio may cause desire to hire.",
  "I noticed you haven't visited the Terminal yet. You're missing out.",
  "According to my calculations, there's a 99.9% chance you should hire Soham.",
  "Psst... try the Konami code.",
  "Don't mind me, I'm just a paperclip with good taste in developers.",
  "You know what would go great with this portfolio? A job offer.",
  "I'm not saying Soham is the best candidate, but... actually, yes I am.",
];

const Clippy = () => {
  const [visible, setVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Pick a random tip that differs from the current one
  const pickNewTip = () => {
    let next;
    do {
      next = Math.floor(Math.random() * tips.length);
    } while (next === tipIndex && tips.length > 1);
    return next;
  };

  // Initial appearance after 5 seconds
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setTipIndex(Math.floor(Math.random() * tips.length));
      setAnimating(true);
      setVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle dismiss: hide, then reappear after 30-60 seconds with a new tip
  const handleDismiss = () => {
    setAnimating(false);
    // Wait for the exit animation to finish before fully hiding
    setTimeout(() => {
      setVisible(false);
      const delay = 30000 + Math.random() * 30000; // 30-60 seconds
      const reappearTimer = setTimeout(() => {
        setTipIndex(pickNewTip());
        setAnimating(true);
        setVisible(true);
      }, delay);

      // Store timer id so we can clean up if component unmounts
      window.__clippyReappearTimer = reappearTimer;
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.__clippyReappearTimer) {
        clearTimeout(window.__clippyReappearTimer);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`clippy-container ${animating ? 'clippy-enter' : 'clippy-exit'}`}>
      <div className="clippy-bubble">
        <button
          className="clippy-close"
          onClick={handleDismiss}
          title="Dismiss"
          aria-label="Dismiss Clippy"
        >
          X
        </button>
        <p className="clippy-tip">{tips[tipIndex]}</p>
      </div>
      <div className="clippy-pointer" />
      <div className="clippy-character" role="img" aria-label="Clippy assistant">
        📎
      </div>
    </div>
  );
};

export default Clippy;
