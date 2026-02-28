import React, { useState, useCallback } from 'react';

const SIZE = 5;
const CELL_SIZE = 64;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  on: '#eab308',
  onBorder: '#ca8a04',
  off: '#1a2d44',
  offBorder: '#2a5080',
};

function createBoard() {
  // Start with solved board and make random moves to ensure solvability
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  const numMoves = 8 + Math.floor(Math.random() * 8);
  for (let i = 0; i < numMoves; i++) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    toggle(board, r, c);
  }
  // Ensure at least some lights are on
  if (board.every(row => row.every(cell => !cell))) {
    toggle(board, 2, 2);
    toggle(board, 1, 1);
    toggle(board, 3, 3);
  }
  return board;
}

function toggle(board, r, c) {
  const flip = (rr, cc) => {
    if (rr >= 0 && rr < SIZE && cc >= 0 && cc < SIZE) board[rr][cc] = !board[rr][cc];
  };
  flip(r, c);
  flip(r - 1, c);
  flip(r + 1, c);
  flip(r, c - 1);
  flip(r, c + 1);
}

const LightsOutGame = () => {
  const [board, setBoard] = useState(createBoard);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [best, setBest] = useState(() => Number(localStorage.getItem('lightsout_best') || 0));

  const lightsOn = board.flat().filter(Boolean).length;

  const handleClick = useCallback((r, c) => {
    if (won) return;
    const b = board.map(row => [...row]);
    toggle(b, r, c);
    const newMoves = moves + 1;
    setBoard(b);
    setMoves(newMoves);

    if (b.every(row => row.every(cell => !cell))) {
      setWon(true);
      if (best === 0 || newMoves < best) {
        setBest(newMoves);
        localStorage.setItem('lightsout_best', String(newMoves));
      }
    }
  }, [board, moves, won, best]);

  function reset() {
    setBoard(createBoard());
    setMoves(0);
    setWon(false);
  }

  const gap = 4;

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>Click a light to toggle it and its neighbors · Turn all lights off!</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span>Moves: {moves}</span>
          <span>Lights: {lightsOn}</span>
          {best > 0 && <span>Best: {best}</span>}
          <button onClick={reset} style={{ padding: '2px 8px', fontSize: 11, cursor: 'pointer', background: '#1e3a5f', color: COLORS.text, border: '1px solid #2a5080' }}>New Puzzle</button>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZE}, ${CELL_SIZE}px)`, gap, padding: gap, background: COLORS.grid, borderRadius: 8 }}>
            {board.map((row, r) => row.map((on, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: 8,
                  cursor: won ? 'default' : 'pointer',
                  background: on ? COLORS.on : COLORS.off,
                  border: `2px solid ${on ? COLORS.onBorder : COLORS.offBorder}`,
                  transition: 'all 0.15s',
                  boxShadow: on ? '0 0 12px rgba(234,179,8,0.4)' : 'none',
                }}
              />
            )))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, color: '#6b7280', fontSize: 11 }}>
            Clicking a cell toggles it and its 4 neighbors (up, down, left, right)
          </div>
        </div>
        {won && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
            <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>🎉 All Lights Out!</div>
              <div style={{ fontSize: 12, marginBottom: 10 }}>Solved in {moves} moves{best > 0 ? ` · Best: ${best}` : ''}</div>
              <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>New Puzzle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightsOutGame;
