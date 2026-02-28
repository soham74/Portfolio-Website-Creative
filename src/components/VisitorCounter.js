import React, { useState, useEffect } from 'react';
import './VisitorCounter.css';

const API_URL = 'https://api.counterapi.dev/v1/sohamkolhe-portfolio/visits';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      const alreadyCounted = sessionStorage.getItem('visitor_counted');

      if (alreadyCounted) {
        // Already counted this session — just read without incrementing
        try {
          const res = await fetch(API_URL);
          if (res.ok) {
            const data = await res.json();
            setCount(data.count);
            return;
          }
        } catch {
          // ignore
        }
        const stored = parseInt(localStorage.getItem('visitor_count') || '0', 10);
        setCount(stored);
        return;
      }

      // New session: increment
      try {
        const res = await fetch(API_URL + '/up');
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        } else {
          throw new Error('API failed');
        }
      } catch {
        const stored = parseInt(localStorage.getItem('visitor_count') || '0', 10);
        const newCount = stored + 1;
        localStorage.setItem('visitor_count', String(newCount));
        setCount(newCount);
      }

      sessionStorage.setItem('visitor_counted', 'true');
    };

    fetchCount();
  }, []);

  const padded = count !== null
    ? String(count).padStart(6, '0')
    : '------';

  const digits = padded.split('');

  return (
    <div className="visitor-counter">
      {digits.map((digit, i) => (
        <span key={i} className="visitor-counter-digit">
          {digit}
        </span>
      ))}
      <div className="visitor-counter-tooltip">
        Total visits to this site
      </div>
    </div>
  );
};

export default VisitorCounter;
