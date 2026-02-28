import React, { useState, useEffect, useRef } from 'react';

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  cardBack: '#1e3a5f',
  cardBorder: '#2a5080',
  matched: '#065f46',
};

const EMOJIS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎵', '🎸', '🎻', '🏆', '🌟', '🔥', '💎', '🚀', '⚡', '🎭', '🎬', '🌈', '🍕'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createCards(pairs) {
  const selected = shuffle(EMOJIS).slice(0, pairs);
  const cards = shuffle([...selected, ...selected]).map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
  }));
  return cards;
}

const MemoryGame = () => {
  const [pairs] = useState(8);
  const cols = 4;
  const [cards, setCards] = useState(() => createCards(pairs));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [best, setBest] = useState(() => Number(localStorage.getItem('memory_best') || 0));
  const timerRef = useRef(null);
  const lockRef = useRef(false);

  useEffect(() => {
    if (started && !timerRef.current) {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started]);

  function handleClick(id) {
    if (lockRef.current) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (flipped.length >= 2) return;

    if (!started) setStarted(true);

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => newCards.find(c => c.id === fid));
      if (a.emoji === b.emoji) {
        const matched = newCards.map(c =>
          c.id === a.id || c.id === b.id ? { ...c, matched: true } : c
        );
        setCards(matched);
        setFlipped([]);
        const newMatches = matches + 1;
        setMatches(newMatches);
        if (newMatches === pairs) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          const finalMoves = moves + 1;
          if (best === 0 || finalMoves < best) {
            setBest(finalMoves);
            localStorage.setItem('memory_best', String(finalMoves));
          }
        }
      } else {
        lockRef.current = true;
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          lockRef.current = false;
        }, 800);
      }
    }
  }

  function reset() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setCards(createCards(pairs));
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setStarted(false);
    lockRef.current = false;
  }

  const won = matches === pairs;
  const cardSize = 72;
  const gap = 8;

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>Click cards to flip · Match all pairs!</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span>Moves: {moves}</span>
          <span>Matched: {matches}/{pairs}</span>
          <span>⏱ {time}s</span>
          {best > 0 && <span>Best: {best} moves</span>}
          <button onClick={reset} style={{ padding: '2px 8px', fontSize: 11, cursor: 'pointer', background: '#1e3a5f', color: COLORS.text, border: '1px solid #2a5080' }}>Reset</button>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cardSize}px)`, gap, padding: gap }}>
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              style={{
                width: cardSize,
                height: cardSize,
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
                cursor: card.matched ? 'default' : 'pointer',
                background: card.matched ? COLORS.matched : (card.flipped ? '#1a2d44' : COLORS.cardBack),
                border: `2px solid ${card.matched ? '#10b981' : COLORS.cardBorder}`,
                borderRadius: 8,
                transition: 'all 0.2s',
                userSelect: 'none',
                opacity: card.matched ? 0.7 : 1,
              }}
            >
              {(card.flipped || card.matched) ? card.emoji : '?'}
            </div>
          ))}
        </div>
        {won && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
            <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>🎉 You Win!</div>
              <div style={{ fontSize: 12, marginBottom: 10 }}>Moves: {moves} · Time: {time}s</div>
              <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
