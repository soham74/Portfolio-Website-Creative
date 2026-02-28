import React, { useEffect, useRef, useState } from 'react';

const W = 600;
const H = 400;
const PADDLE_W = 10;
const PADDLE_H = 70;
const BALL_R = 6;
const PADDLE_SPEED = 5;
const BALL_SPEED_INITIAL = 4;
const WIN_SCORE = 7;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  paddle: '#34d399',
  ball: '#f43f5e',
  net: '#1e3a5f',
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

const PongGame = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const keysRef = useRef({});
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const stateRef = useRef({
    playerY: H / 2 - PADDLE_H / 2,
    aiY: H / 2 - PADDLE_H / 2,
    ballX: W / 2,
    ballY: H / 2,
    ballVX: BALL_SPEED_INITIAL,
    ballVY: BALL_SPEED_INITIAL * (Math.random() > 0.5 ? 1 : -1),
    pScore: 0,
    aScore: 0,
  });

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
    s.playerY = H / 2 - PADDLE_H / 2;
    s.aiY = H / 2 - PADDLE_H / 2;
    s.ballX = W / 2;
    s.ballY = H / 2;
    s.ballVX = BALL_SPEED_INITIAL * (Math.random() > 0.5 ? 1 : -1);
    s.ballVY = BALL_SPEED_INITIAL * (Math.random() > 0.5 ? 1 : -1);
    s.pScore = 0;
    s.aScore = 0;
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setPaused(false);
  }

  function resetBall(dir) {
    const s = stateRef.current;
    s.ballX = W / 2;
    s.ballY = H / 2;
    s.ballVX = BALL_SPEED_INITIAL * dir;
    s.ballVY = BALL_SPEED_INITIAL * (Math.random() > 0.5 ? 1 : -1);
  }

  useInterval(() => {
    if (paused || gameOver) return;
    const s = stateRef.current;
    const keys = keysRef.current;

    // Player movement
    if (keys['arrowup'] || keys['w']) s.playerY = Math.max(0, s.playerY - PADDLE_SPEED);
    if (keys['arrowdown'] || keys['s']) s.playerY = Math.min(H - PADDLE_H, s.playerY + PADDLE_SPEED);

    // AI movement
    const aiCenter = s.aiY + PADDLE_H / 2;
    const aiSpeed = 3.2;
    if (s.ballY < aiCenter - 10) s.aiY = Math.max(0, s.aiY - aiSpeed);
    if (s.ballY > aiCenter + 10) s.aiY = Math.min(H - PADDLE_H, s.aiY + aiSpeed);

    // Ball movement
    s.ballX += s.ballVX;
    s.ballY += s.ballVY;

    // Top/bottom bounce
    if (s.ballY - BALL_R <= 0 || s.ballY + BALL_R >= H) s.ballVY *= -1;

    // Paddle collision - player (left)
    if (s.ballX - BALL_R <= PADDLE_W + 10 && s.ballY >= s.playerY && s.ballY <= s.playerY + PADDLE_H && s.ballVX < 0) {
      s.ballVX = Math.abs(s.ballVX) * 1.05;
      const hit = (s.ballY - s.playerY) / PADDLE_H - 0.5;
      s.ballVY = hit * 6;
    }

    // Paddle collision - AI (right)
    if (s.ballX + BALL_R >= W - PADDLE_W - 10 && s.ballY >= s.aiY && s.ballY <= s.aiY + PADDLE_H && s.ballVX > 0) {
      s.ballVX = -Math.abs(s.ballVX) * 1.05;
      const hit = (s.ballY - s.aiY) / PADDLE_H - 0.5;
      s.ballVY = hit * 6;
    }

    // Scoring
    if (s.ballX < 0) {
      s.aScore++;
      setAiScore(s.aScore);
      if (s.aScore >= WIN_SCORE) { setGameOver(true); return; }
      resetBall(1);
    }
    if (s.ballX > W) {
      s.pScore++;
      setPlayerScore(s.pScore);
      if (s.pScore >= WIN_SCORE) { setGameOver(true); return; }
      resetBall(-1);
    }

    // Render
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    // Net
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = COLORS.net;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Paddles
    ctx.fillStyle = COLORS.paddle;
    ctx.fillRect(10, s.playerY, PADDLE_W, PADDLE_H);
    ctx.fillRect(W - PADDLE_W - 10, s.aiY, PADDLE_W, PADDLE_H);

    // Ball
    ctx.fillStyle = COLORS.ball;
    ctx.beginPath();
    ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2);
    ctx.fill();

    // Scores
    ctx.fillStyle = COLORS.text;
    ctx.font = '28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(s.pScore), W / 2 - 50, 40);
    ctx.fillText(String(s.aScore), W / 2 + 50, 40);
  }, 1000 / 60);

  const winner = playerScore >= WIN_SCORE ? 'You' : 'AI';

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>↑ / ↓ or W / S: Move paddle · First to {WIN_SCORE} wins · P: Pause · R: Restart</div>
        <div>You: {playerScore}  AI: {aiScore}</div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <canvas ref={canvasRef} style={{ background: COLORS.bg }} />
      </div>
      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
          <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>{winner} Win{winner === 'You' ? '' : 's'}!</div>
            <div style={{ fontSize: 12, marginBottom: 10 }}>Final: {playerScore} - {aiScore}</div>
            <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PongGame;
