import React, { useState, useEffect, useCallback } from 'react';

const SIZE = 4;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  empty: '#1a2d44',
};

const TILE_COLORS = {
  2: { bg: '#1e3a5f', text: '#e5e7eb' },
  4: { bg: '#1e4d7a', text: '#e5e7eb' },
  8: { bg: '#f97316', text: '#fff' },
  16: { bg: '#f59e0b', text: '#fff' },
  32: { bg: '#ef4444', text: '#fff' },
  64: { bg: '#dc2626', text: '#fff' },
  128: { bg: '#eab308', text: '#fff' },
  256: { bg: '#ca8a04', text: '#fff' },
  512: { bg: '#a855f7', text: '#fff' },
  1024: { bg: '#7c3aed', text: '#fff' },
  2048: { bg: '#22c55e', text: '#fff' },
};

function createEmpty() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandom(grid) {
  const empty = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c] === 0) empty.push([r, c]);
  if (empty.length === 0) return grid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const g = grid.map(row => [...row]);
  g[r][c] = Math.random() < 0.9 ? 2 : 4;
  return g;
}

function slideRow(row) {
  const filtered = row.filter(v => v !== 0);
  const result = [];
  let pts = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      pts += filtered[i] * 2;
      i++;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < SIZE) result.push(0);
  return { row: result, pts };
}

function moveLeft(grid) {
  let pts = 0;
  const g = grid.map(row => {
    const { row: newRow, pts: p } = slideRow(row);
    pts += p;
    return newRow;
  });
  return { grid: g, pts };
}

function moveRight(grid) {
  let pts = 0;
  const g = grid.map(row => {
    const { row: newRow, pts: p } = slideRow([...row].reverse());
    pts += p;
    return newRow.reverse();
  });
  return { grid: g, pts };
}

function transpose(grid) {
  return grid[0].map((_, c) => grid.map(row => row[c]));
}

function moveUp(grid) {
  const { grid: g, pts } = moveLeft(transpose(grid));
  return { grid: transpose(g), pts };
}

function moveDown(grid) {
  const { grid: g, pts } = moveRight(transpose(grid));
  return { grid: transpose(g), pts };
}

function gridsEqual(a, b) {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (a[r][c] !== b[r][c]) return false;
  return true;
}

function canMove(grid) {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) return true;
      if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
      if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
    }
  return false;
}

function hasWon(grid) {
  return grid.some(row => row.some(v => v >= 2048));
}

const Game2048 = () => {
  const [grid, setGrid] = useState(() => addRandom(addRandom(createEmpty())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('2048_best') || 0));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  const doMove = useCallback((moveFn) => {
    if (gameOver) return;
    setGrid(prev => {
      const { grid: newGrid, pts } = moveFn(prev);
      if (gridsEqual(prev, newGrid)) return prev;
      const withNew = addRandom(newGrid);
      setScore(s => {
        const newScore = s + pts;
        if (newScore > best) {
          setBest(newScore);
          localStorage.setItem('2048_best', String(newScore));
        }
        return newScore;
      });
      if (!keepPlaying && hasWon(withNew)) setWon(true);
      if (!canMove(withNew)) setGameOver(true);
      return withNew;
    });
  }, [gameOver, best, keepPlaying]);

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'r') { reset(); return; }
      const moves = {
        arrowleft: moveLeft, a: moveLeft,
        arrowright: moveRight, d: moveRight,
        arrowup: moveUp, w: moveUp,
        arrowdown: moveDown, s: moveDown,
      };
      if (moves[key]) { e.preventDefault(); doMove(moves[key]); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [doMove]);

  function reset() {
    setGrid(addRandom(addRandom(createEmpty())));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKeepPlaying(false);
  }

  function handleKeepPlaying() {
    setWon(false);
    setKeepPlaying(true);
  }

  const tileSize = 80;
  const gap = 8;

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>Arrow keys / WASD: Slide tiles · R: Restart · Merge to 2048!</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span>Score: {score}</span>
          <span>Best: {Math.max(best, score)}</span>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZE}, ${tileSize}px)`, gap, padding: gap, background: COLORS.grid, borderRadius: 8 }}>
          {grid.flat().map((val, i) => {
            const colors = TILE_COLORS[val] || { bg: '#6d28d9', text: '#fff' };
            return (
              <div
                key={i}
                style={{
                  width: tileSize,
                  height: tileSize,
                  display: 'grid',
                  placeItems: 'center',
                  background: val === 0 ? COLORS.empty : colors.bg,
                  color: val === 0 ? 'transparent' : colors.text,
                  fontSize: val >= 1024 ? 20 : val >= 128 ? 24 : 28,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  borderRadius: 4,
                  transition: 'background 0.1s',
                }}
              >
                {val || ''}
              </div>
            );
          })}
        </div>
        {(gameOver || won) && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
            <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>{won ? '🎉 You reached 2048!' : 'Game Over'}</div>
              <div style={{ fontSize: 12, marginBottom: 10 }}>Score: {score}</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {won && <button onClick={handleKeepPlaying} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Keep Playing</button>}
                <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>New Game</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game2048;
