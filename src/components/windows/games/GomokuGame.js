import React, { useState, useCallback } from 'react';

const SIZE = 15;
const CELL = 32;
const WIN_COUNT = 5;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  board: '#1a2d44',
  boardBorder: '#2a5080',
  lineColor: '#2a5080',
  black: '#1f2937',
  white: '#e5e7eb',
  lastMove: '#f43f5e',
  winHighlight: 'rgba(34,197,94,0.4)',
};

function createBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function checkWin(board, r, c, player) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of dirs) {
    let count = 1;
    const cells = [[r, c]];
    for (let d = 1; d < WIN_COUNT; d++) {
      const nr = r + dr * d, nc = c + dc * d;
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] === player) {
        count++;
        cells.push([nr, nc]);
      } else break;
    }
    for (let d = 1; d < WIN_COUNT; d++) {
      const nr = r - dr * d, nc = c - dc * d;
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] === player) {
        count++;
        cells.push([nr, nc]);
      } else break;
    }
    if (count >= WIN_COUNT) return cells;
  }
  return null;
}

// Simple AI: prioritize winning, blocking, then center-biased scoring
function aiMove(board) {
  const empty = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (board[r][c] === 0) empty.push([r, c]);
  if (empty.length === 0) return null;

  // Try to win
  for (const [r, c] of empty) {
    board[r][c] = 2;
    if (checkWin(board, r, c, 2)) { board[r][c] = 0; return [r, c]; }
    board[r][c] = 0;
  }
  // Block opponent
  for (const [r, c] of empty) {
    board[r][c] = 1;
    if (checkWin(board, r, c, 1)) { board[r][c] = 0; return [r, c]; }
    board[r][c] = 0;
  }

  // Score-based
  let bestScore = -1;
  let bestMove = empty[0];
  const center = Math.floor(SIZE / 2);
  for (const [r, c] of empty) {
    let score = 0;
    // Prefer center
    score += (SIZE - Math.abs(r - center) - Math.abs(c - center)) * 2;
    // Count adjacent friendly
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
          if (board[nr][nc] === 2) score += 5;
          if (board[nr][nc] === 1) score += 3;
        }
      }
    }
    if (score > bestScore) { bestScore = score; bestMove = [r, c]; }
  }
  return bestMove;
}

const GomokuGame = () => {
  const [board, setBoard] = useState(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winCells, setWinCells] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [moveCount, setMoveCount] = useState(0);

  const handleClick = useCallback((r, c) => {
    if (gameOver || board[r][c] !== 0) return;
    const b = board.map(row => [...row]);
    b[r][c] = 1; // player = black
    setLastMove([r, c]);

    const win = checkWin(b, r, c, 1);
    if (win) {
      setBoard(b);
      setWinner('Black');
      setWinCells(win);
      setGameOver(true);
      return;
    }

    // AI turn
    const ai = aiMove(b);
    if (ai) {
      b[ai[0]][ai[1]] = 2;
      const aiWin = checkWin(b, ai[0], ai[1], 2);
      if (aiWin) {
        setBoard(b);
        setWinner('White');
        setWinCells(aiWin);
        setGameOver(true);
        setLastMove(ai);
        return;
      }
      setLastMove(ai);
    }

    setBoard(b);
    setMoveCount(m => m + 1);

    // Check draw
    if (b.every(row => row.every(c => c !== 0))) {
      setGameOver(true);
      setWinner('Draw');
    }
  }, [board, gameOver]);

  function reset() {
    setBoard(createBoard());
    setGameOver(false);
    setWinner(null);
    setWinCells([]);
    setLastMove(null);
    setMoveCount(0);
  }

  const isWinCell = (r, c) => winCells.some(([wr, wc]) => wr === r && wc === c);
  const boardPx = SIZE * CELL;

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>Click to place · You are Black · First to 5 in a row wins!</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span>Moves: {moveCount}</span>
          <button onClick={reset} style={{ padding: '2px 8px', fontSize: 11, cursor: 'pointer', background: '#1e3a5f', color: COLORS.text, border: '1px solid #2a5080' }}>Reset</button>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', overflow: 'auto' }}>
        <div style={{ position: 'relative', width: boardPx, height: boardPx, background: COLORS.board, border: `1px solid ${COLORS.boardBorder}` }}>
          {/* Grid lines */}
          <svg width={boardPx} height={boardPx} style={{ position: 'absolute', top: 0, left: 0 }}>
            {Array.from({ length: SIZE }, (_, i) => (
              <React.Fragment key={i}>
                <line x1={CELL / 2} y1={i * CELL + CELL / 2} x2={boardPx - CELL / 2} y2={i * CELL + CELL / 2} stroke={COLORS.lineColor} strokeWidth={0.5} />
                <line x1={i * CELL + CELL / 2} y1={CELL / 2} x2={i * CELL + CELL / 2} y2={boardPx - CELL / 2} stroke={COLORS.lineColor} strokeWidth={0.5} />
              </React.Fragment>
            ))}
            {/* Star points */}
            {[[3,3],[3,11],[7,7],[11,3],[11,11]].map(([r,c]) => (
              <circle key={`${r}-${c}`} cx={c * CELL + CELL / 2} cy={r * CELL + CELL / 2} r={3} fill={COLORS.lineColor} />
            ))}
          </svg>
          {/* Stones */}
          {board.map((row, r) => row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                position: 'absolute',
                left: c * CELL,
                top: r * CELL,
                width: CELL,
                height: CELL,
                display: 'grid',
                placeItems: 'center',
                cursor: cell === 0 && !gameOver ? 'pointer' : 'default',
                background: isWinCell(r, c) ? COLORS.winHighlight : 'transparent',
              }}
            >
              {cell !== 0 && (
                <div style={{
                  width: CELL - 6,
                  height: CELL - 6,
                  borderRadius: '50%',
                  background: cell === 1 ? COLORS.black : COLORS.white,
                  border: lastMove && lastMove[0] === r && lastMove[1] === c ? `2px solid ${COLORS.lastMove}` : `1px solid rgba(0,0,0,0.3)`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                }} />
              )}
            </div>
          )))}
        </div>
        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
            <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>
                {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
              </div>
              <div style={{ fontSize: 12, marginBottom: 10 }}>
                {winner === 'Black' ? 'You win!' : winner === 'White' ? 'AI wins!' : 'Board is full'}
              </div>
              <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GomokuGame;
