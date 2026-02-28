import React, { useEffect, useRef, useState } from 'react';

const COLS = 10;
const ROWS = 20;
const CELL = 24;
const TICK_INITIAL = 800;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  ghost: 'rgba(255,255,255,0.08)',
};

const PIECE_COLORS = ['#06b6d4', '#eab308', '#a855f7', '#22c55e', '#ef4444', '#3b82f6', '#f97316'];

const PIECES = [
  { shape: [[1,1,1,1]], color: 0 },           // I
  { shape: [[1,1],[1,1]], color: 1 },           // O
  { shape: [[0,1,0],[1,1,1]], color: 2 },       // T
  { shape: [[1,0],[1,0],[1,1]], color: 3 },     // L
  { shape: [[0,1],[0,1],[1,1]], color: 4 },     // J
  { shape: [[0,1,1],[1,1,0]], color: 5 },       // S
  { shape: [[1,1,0],[0,1,1]], color: 6 },       // Z
];

function rotate(shape) {
  const rows = shape.length, cols = shape[0].length;
  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => shape[rows - 1 - r][c])
  );
}

function createGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(-1));
}

function collides(grid, shape, offR, offC) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[0].length; c++) {
      if (!shape[r][c]) continue;
      const gr = offR + r, gc = offC + c;
      if (gr < 0 || gr >= ROWS || gc < 0 || gc >= COLS) return true;
      if (grid[gr][gc] !== -1) return true;
    }
  }
  return false;
}

function useInterval(callback, delay) {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

const TetrisGame = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [grid, setGrid] = useState(createGrid);
  const [piece, setPiece] = useState(null);
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [high, setHigh] = useState(() => Number(localStorage.getItem('tetris_high') || 0));

  const stateRef = useRef({ grid, piece, pos, score, lines, level, gameOver, paused });
  useEffect(() => {
    stateRef.current = { grid, piece, pos, score, lines, level, gameOver, paused };
  });

  useEffect(() => {
    const c = canvasRef.current;
    if (c) {
      c.width = COLS * CELL;
      c.height = ROWS * CELL;
      ctxRef.current = c.getContext('2d');
    }
  }, []);

  function spawnPiece(g) {
    const p = PIECES[Math.floor(Math.random() * PIECES.length)];
    const startC = Math.floor((COLS - p.shape[0].length) / 2);
    if (collides(g, p.shape, 0, startC)) {
      setGameOver(true);
      const s = stateRef.current.score;
      if (s > high) { localStorage.setItem('tetris_high', String(s)); setHigh(s); }
      return;
    }
    setPiece(p);
    setPos({ r: 0, c: startC });
  }

  useEffect(() => {
    spawnPiece(grid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function lockAndClear() {
    const s = stateRef.current;
    const g = s.grid.map(row => [...row]);
    const p = s.piece;
    const { r: offR, c: offC } = s.pos;
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[0].length; c++) {
        if (p.shape[r][c]) g[offR + r][offC + c] = p.color;
      }
    }
    // clear lines
    let cleared = 0;
    const newGrid = g.filter(row => {
      if (row.every(c => c !== -1)) { cleared++; return false; }
      return true;
    });
    while (newGrid.length < ROWS) newGrid.unshift(Array(COLS).fill(-1));
    const pts = [0, 100, 300, 500, 800][cleared] || 0;
    const newScore = s.score + pts;
    const newLines = s.lines + cleared;
    const newLevel = Math.floor(newLines / 10) + 1;
    setGrid(newGrid);
    setScore(newScore);
    setLines(newLines);
    setLevel(newLevel);
    spawnPiece(newGrid);
  }

  function move(dr, dc) {
    const s = stateRef.current;
    if (!s.piece || s.gameOver || s.paused) return;
    const newR = s.pos.r + dr, newC = s.pos.c + dc;
    if (!collides(s.grid, s.piece.shape, newR, newC)) {
      setPos({ r: newR, c: newC });
    } else if (dr > 0) {
      lockAndClear();
    }
  }

  function rotatePiece() {
    const s = stateRef.current;
    if (!s.piece || s.gameOver || s.paused) return;
    const rotated = rotate(s.piece.shape);
    if (!collides(s.grid, rotated, s.pos.r, s.pos.c)) {
      setPiece({ ...s.piece, shape: rotated });
    } else if (!collides(s.grid, rotated, s.pos.r, s.pos.c - 1)) {
      setPiece({ ...s.piece, shape: rotated });
      setPos(p => ({ ...p, c: p.c - 1 }));
    } else if (!collides(s.grid, rotated, s.pos.r, s.pos.c + 1)) {
      setPiece({ ...s.piece, shape: rotated });
      setPos(p => ({ ...p, c: p.c + 1 }));
    }
  }

  function hardDrop() {
    const s = stateRef.current;
    if (!s.piece || s.gameOver || s.paused) return;
    let r = s.pos.r;
    while (!collides(s.grid, s.piece.shape, r + 1, s.pos.c)) r++;
    setPos({ r, c: s.pos.c });
    setTimeout(lockAndClear, 0);
  }

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'p') { setPaused(p => !p); return; }
      if (key === 'r') { reset(); return; }
      if (key === 'arrowleft' || key === 'a') { e.preventDefault(); move(0, -1); }
      else if (key === 'arrowright' || key === 'd') { e.preventDefault(); move(0, 1); }
      else if (key === 'arrowdown' || key === 's') { e.preventDefault(); move(1, 0); }
      else if (key === 'arrowup' || key === 'w') { e.preventDefault(); rotatePiece(); }
      else if (key === ' ') { e.preventDefault(); hardDrop(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (paused || gameOver || !piece) return;
    move(1, 0);
  }, Math.max(100, TICK_INITIAL - (level - 1) * 80));

  // Render
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    // grid lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS * CELL; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ROWS * CELL); ctx.stroke(); }
    for (let y = 0; y <= ROWS * CELL; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(COLS * CELL, y); ctx.stroke(); }
    // locked cells
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] !== -1) {
          ctx.fillStyle = PIECE_COLORS[grid[r][c]];
          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
          ctx.strokeStyle = 'rgba(0,0,0,0.3)';
          ctx.lineWidth = 1;
          ctx.strokeRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
        }
      }
    }
    // current piece
    if (piece) {
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[0].length; c++) {
          if (piece.shape[r][c]) {
            const pr = pos.r + r, pc = pos.c + c;
            ctx.fillStyle = PIECE_COLORS[piece.color];
            ctx.fillRect(pc * CELL + 1, pr * CELL + 1, CELL - 2, CELL - 2);
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(pc * CELL + 1, pr * CELL + 1, CELL - 2, CELL - 2);
          }
        }
      }
    }
  }, [grid, piece, pos]);

  function reset() {
    const g = createGrid();
    setGrid(g);
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setPaused(false);
    spawnPiece(g);
  }

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>← → ↓: Move · ↑: Rotate · Space: Drop · P: Pause · R: Restart</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span>Score: {score}</span>
          <span>Lines: {lines}</span>
          <span>Level: {level}</span>
          <span>High: {Math.max(high, score)}</span>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <canvas ref={canvasRef} style={{ imageRendering: 'pixelated', background: COLORS.bg }} />
      </div>
      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
          <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>Game Over</div>
            <div style={{ fontSize: 12, marginBottom: 10 }}>Score: {score} · Lines: {lines} · High: {Math.max(high, score)}</div>
            <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
