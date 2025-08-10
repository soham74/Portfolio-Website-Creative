import React, { useEffect, useRef, useState } from 'react';

// High-verbosity, polished Snake game using canvas with pixel-art styling
// Controls: Arrow keys / WASD. P to pause. R to restart.

const CELL = 18; // pixel size per grid cell
const COLS = 28; // board width in cells
const ROWS = 20; // board height in cells
const TICK_MS_INITIAL = 130; // starting speed

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  snakeBody: '#34d399',
  snakeHead: '#10b981',
  snakeBorder: '#065f46',
  food: '#f43f5e',
  foodBorder: '#7f1d1d',
  text: '#e5e7eb',
};

function useInterval(callback, delay) {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [tickMs, setTickMs] = useState(TICK_MS_INITIAL);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(() => Number(localStorage.getItem('snake_high') || 0));
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [snake, setSnake] = useState(() => {
    const start = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
    return [start, { x: start.x - 1, y: start.y - 0 }, { x: start.x - 2, y: start.y - 0 }];
  });
  const dirRef = useRef({ x: 1, y: 0 });
  const pendingDir = useRef(dirRef.current);
  const [food, setFood] = useState(() => spawnFood([]));

  useEffect(() => {
    const c = canvasRef.current;
    if (c) {
      c.width = COLS * CELL;
      c.height = ROWS * CELL;
      setCtx(c.getContext('2d'));
    }
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      const map = {
        arrowup: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      if (key === 'p') { setPaused(p => !p); return; }
      if (key === 'r') { reset(); return; }
      const nd = map[key];
      if (!nd) return;
      // prevent reversing into itself
      if (nd.x === -dirRef.current.x && nd.y === -dirRef.current.y) return;
      pendingDir.current = nd;
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useInterval(() => {
    if (paused || gameOver || !ctx) return;
    step();
  }, tickMs);

  function spawnFood(blocked) {
    while (true) {
      const f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      if (!blocked.some(b => b.x === f.x && b.y === f.y)) return f;
    }
  }

  function step() {
    dirRef.current = pendingDir.current;
    const head = snake[0];
    const next = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

    // wall or self collision
    const hitWall = next.x < 0 || next.y < 0 || next.x >= COLS || next.y >= ROWS;
    const hitSelf = snake.some(s => s.x === next.x && s.y === next.y);
    if (hitWall || hitSelf) {
      setGameOver(true);
      if (score > high) { localStorage.setItem('snake_high', String(score)); setHigh(score); }
      render(true, next);
      return;
    }

    const ate = next.x === food.x && next.y === food.y;
    const newSnake = [next, ...snake];
    if (!ate) {
      newSnake.pop();
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setFood(spawnFood(newSnake));
      // speed up slightly every few points
      if (newScore % 4 === 0) setTickMs(ms => Math.max(65, ms - 10));
    }
    setSnake(newSnake);
    render(false);
  }

  function reset() {
    setScore(0);
    setTickMs(TICK_MS_INITIAL);
    setGameOver(false);
    const start = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
    setSnake([start, { x: start.x - 1, y: start.y }, { x: start.x - 2, y: start.y }]);
    dirRef.current = { x: 1, y: 0 };
    pendingDir.current = dirRef.current;
    setFood(spawnFood([]));
    render(false);
  }

  function render(showCrash = false, crashCell = null) {
    if (!ctx) return;
    // background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    // subtle grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0.5; x < COLS * CELL; x += CELL) { ctx.moveTo(x, 0); ctx.lineTo(x, ROWS * CELL); }
    for (let y = 0.5; y < ROWS * CELL; y += CELL) { ctx.moveTo(0, y); ctx.lineTo(COLS * CELL, y); }
    ctx.stroke();

    // food
    drawCell(food.x, food.y, COLORS.food, COLORS.foodBorder);

    // snake
    snake.forEach((s, i) => {
      const isHead = i === 0;
      const color = isHead ? COLORS.snakeHead : COLORS.snakeBody;
      drawCell(s.x, s.y, color, COLORS.snakeBorder);
      if (isHead) drawEyes(s.x, s.y, dirRef.current);
    });

    // crash overlay
    if (showCrash && crashCell) {
      ctx.fillStyle = 'rgba(244,63,94,0.45)';
      ctx.fillRect(crashCell.x * CELL, crashCell.y * CELL, CELL, CELL);
    }

    // HUD
    ctx.fillStyle = COLORS.text;
    ctx.font = '12px monospace';
    ctx.fillText(`Score ${score}   High ${Math.max(high, score)}   ${paused ? 'Paused' : ''}`, 8, 14);
  }

  function drawCell(x, y, fill, border) {
    ctx.fillStyle = fill;
    ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.strokeRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
  }

  function drawEyes(x, y, dir) {
    const cx = x * CELL;
    const cy = y * CELL;
    ctx.fillStyle = '#0f172a';
    const offset = 5;
    const ex = dir.x === 1 ? CELL - offset : dir.x === -1 ? offset : CELL / 2 - 3;
    const ey = dir.y === 1 ? CELL - offset : dir.y === -1 ? offset : CELL / 2 - 3;
    ctx.beginPath(); ctx.arc(cx + ex - 4, cy + ey - 4, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + ex + 4, cy + ey + 4, 2.5, 0, Math.PI * 2); ctx.fill();
  }

  useEffect(() => { if (ctx) render(false); }, [ctx]);

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: '#0b1523' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: '#0b1523', borderBottom: '1px solid #162a40' }}>
        <div>Use Arrow keys / WASD · P: Pause · R: Restart</div>
        <div>Speed: {(1000 / tickMs).toFixed(1)} t/s</div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <canvas ref={canvasRef} style={{ imageRendering: 'pixelated', background: COLORS.bg }} />
      </div>
      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
          <div style={{ padding: 16, background: '#0b1523', color: COLORS.text, border: '1px solid #162a40' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Game Over</div>
            <div style={{ fontSize: 12, marginBottom: 10 }}>Score {score} · High {Math.max(high, score)}</div>
            <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;


