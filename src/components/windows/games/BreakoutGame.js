import React, { useEffect, useRef, useState } from 'react';

const W = 560;
const H = 420;
const PADDLE_W = 80;
const PADDLE_H = 10;
const BALL_R = 5;
const BRICK_ROWS = 6;
const BRICK_COLS = 10;
const BRICK_W = 50;
const BRICK_H = 16;
const BRICK_GAP = 4;
const BRICK_TOP = 40;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  paddle: '#34d399',
  ball: '#f43f5e',
};

const ROW_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];

function createBricks() {
  const bricks = [];
  const totalW = BRICK_COLS * (BRICK_W + BRICK_GAP) - BRICK_GAP;
  const offsetX = (W - totalW) / 2;
  for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      bricks.push({
        x: offsetX + c * (BRICK_W + BRICK_GAP),
        y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
        w: BRICK_W,
        h: BRICK_H,
        color: ROW_COLORS[r],
        alive: true,
      });
    }
  }
  return bricks;
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

const BreakoutGame = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [paused, setPaused] = useState(false);
  const [high, setHigh] = useState(() => Number(localStorage.getItem('breakout_high') || 0));

  const stateRef = useRef({
    paddleX: W / 2 - PADDLE_W / 2,
    ballX: W / 2,
    ballY: H - 40,
    ballVX: 3,
    ballVY: -3,
    bricks: createBricks(),
    score: 0,
    lives: 3,
  });
  const keysRef = useRef({});

  useEffect(() => {
    const c = canvasRef.current;
    if (c) { c.width = W; c.height = H; ctxRef.current = c.getContext('2d'); }
  }, []);

  useEffect(() => {
    const down = (e) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === 'p') setPaused(p => !p);
      if (e.key.toLowerCase() === 'r') reset();
    };
    const up = (e) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    const s = stateRef.current;
    s.paddleX = W / 2 - PADDLE_W / 2;
    s.ballX = W / 2;
    s.ballY = H - 40;
    s.ballVX = 3 * (Math.random() > 0.5 ? 1 : -1);
    s.ballVY = -3;
    s.bricks = createBricks();
    s.score = 0;
    s.lives = 3;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWon(false);
    setPaused(false);
  }

  function resetBall() {
    const s = stateRef.current;
    s.ballX = s.paddleX + PADDLE_W / 2;
    s.ballY = H - 40;
    s.ballVX = 3 * (Math.random() > 0.5 ? 1 : -1);
    s.ballVY = -3;
  }

  useInterval(() => {
    if (paused || gameOver || won) return;
    const s = stateRef.current;
    const keys = keysRef.current;

    // Paddle
    if (keys['arrowleft'] || keys['a']) s.paddleX = Math.max(0, s.paddleX - 6);
    if (keys['arrowright'] || keys['d']) s.paddleX = Math.min(W - PADDLE_W, s.paddleX + 6);

    // Ball
    s.ballX += s.ballVX;
    s.ballY += s.ballVY;

    // Wall bounces
    if (s.ballX - BALL_R <= 0 || s.ballX + BALL_R >= W) s.ballVX *= -1;
    if (s.ballY - BALL_R <= 0) s.ballVY *= -1;

    // Paddle bounce
    if (s.ballY + BALL_R >= H - PADDLE_H - 10 && s.ballY + BALL_R <= H - 10 &&
        s.ballX >= s.paddleX && s.ballX <= s.paddleX + PADDLE_W && s.ballVY > 0) {
      s.ballVY = -Math.abs(s.ballVY);
      const hit = (s.ballX - s.paddleX) / PADDLE_W - 0.5;
      s.ballVX = hit * 6;
    }

    // Brick collision
    for (const brick of s.bricks) {
      if (!brick.alive) continue;
      if (s.ballX + BALL_R >= brick.x && s.ballX - BALL_R <= brick.x + brick.w &&
          s.ballY + BALL_R >= brick.y && s.ballY - BALL_R <= brick.y + brick.h) {
        brick.alive = false;
        s.ballVY *= -1;
        s.score += 10;
        setScore(s.score);
        break;
      }
    }

    // Check win
    if (s.bricks.every(b => !b.alive)) {
      setWon(true);
      if (s.score > high) { localStorage.setItem('breakout_high', String(s.score)); setHigh(s.score); }
      return;
    }

    // Ball out of bounds
    if (s.ballY > H + BALL_R) {
      s.lives--;
      setLives(s.lives);
      if (s.lives <= 0) {
        setGameOver(true);
        if (s.score > high) { localStorage.setItem('breakout_high', String(s.score)); setHigh(s.score); }
        return;
      }
      resetBall();
    }

    // Render
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    // Bricks
    for (const brick of s.bricks) {
      if (!brick.alive) continue;
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(brick.x, brick.y, brick.w, brick.h);
    }

    // Paddle
    ctx.fillStyle = COLORS.paddle;
    ctx.fillRect(s.paddleX, H - PADDLE_H - 10, PADDLE_W, PADDLE_H);

    // Ball
    ctx.fillStyle = COLORS.ball;
    ctx.beginPath();
    ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2);
    ctx.fill();
  }, 1000 / 60);

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>← → or A / D: Move paddle · Break all bricks! · P: Pause · R: Restart</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span>Score: {score}</span>
          <span>Lives: {'❤️'.repeat(lives)}</span>
          <span>High: {Math.max(high, score)}</span>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <canvas ref={canvasRef} style={{ background: COLORS.bg }} />
      </div>
      {(gameOver || won) && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
          <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>{won ? '🎉 You Win!' : 'Game Over'}</div>
            <div style={{ fontSize: 12, marginBottom: 10 }}>Score: {score} · High: {Math.max(high, score)}</div>
            <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakoutGame;
