import React, { useState, useCallback } from 'react';

const ROWS = 16;
const COLS = 16;
const MINES = 40;
const CELL_SIZE = 28;

const COLORS = {
  bg: '#0b1523',
  grid: '#162a40',
  text: '#e5e7eb',
  hidden: '#1e3a5f',
  hiddenBorder: '#2a5080',
  revealed: '#0f2035',
  mine: '#f43f5e',
  flag: '#fbbf24',
  numbers: ['', '#3b82f6', '#22c55e', '#ef4444', '#8b5cf6', '#f59e0b', '#06b6d4', '#f43f5e', '#9ca3af'],
};

function createBoard() {
  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++;
        }
      }
      board[r][c].adjacent = count;
    }
  }
  return board;
}

function cloneBoard(board) {
  return board.map(row => row.map(cell => ({ ...cell })));
}

const MinesweeperGame = () => {
  const [board, setBoard] = useState(() => createBoard());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRef] = useState({ current: null });
  const [started, setStarted] = useState(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
  }, [timerRef]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, [timerRef]);

  const flagCount = board.flat().filter(c => c.flagged).length;

  function reveal(b, r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (b[r][c].revealed || b[r][c].flagged) return;
    b[r][c].revealed = true;
    if (b[r][c].adjacent === 0 && !b[r][c].mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          reveal(b, r + dr, c + dc);
        }
      }
    }
  }

  function checkWin(b) {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!b[r][c].mine && !b[r][c].revealed) return false;
      }
    }
    return true;
  }

  function handleClick(r, c) {
    if (gameOver || won) return;
    if (board[r][c].flagged || board[r][c].revealed) return;
    if (!started) { setStarted(true); startTimer(); }
    const b = cloneBoard(board);
    if (b[r][c].mine) {
      // reveal all mines
      b.forEach(row => row.forEach(cell => { if (cell.mine) cell.revealed = true; }));
      setBoard(b);
      setGameOver(true);
      stopTimer();
      return;
    }
    reveal(b, r, c);
    if (checkWin(b)) { setWon(true); stopTimer(); }
    setBoard(b);
  }

  function handleRightClick(e, r, c) {
    e.preventDefault();
    if (gameOver || won) return;
    if (board[r][c].revealed) return;
    const b = cloneBoard(board);
    b[r][c].flagged = !b[r][c].flagged;
    setBoard(b);
  }

  function reset() {
    stopTimer();
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setTime(0);
    setStarted(false);
  }

  function getCellContent(cell) {
    if (cell.flagged && !cell.revealed) return '🚩';
    if (!cell.revealed) return '';
    if (cell.mine) return '💣';
    if (cell.adjacent === 0) return '';
    return cell.adjacent;
  }

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', background: COLORS.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', color: COLORS.text, fontSize: 12, background: COLORS.bg, borderBottom: `1px solid ${COLORS.grid}` }}>
        <div>Left click: Reveal · Right click: Flag · Find all mines!</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span>💣 {MINES - flagCount}</span>
          <span>⏱ {time}s</span>
          <button onClick={reset} style={{ padding: '2px 8px', fontSize: 11, cursor: 'pointer', background: '#1e3a5f', color: COLORS.text, border: '1px solid #2a5080' }}>Reset</button>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', overflow: 'auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`, gap: 1, background: COLORS.grid, padding: 1 }}
          onContextMenu={e => e.preventDefault()}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: cell.mine && cell.revealed ? 14 : 13,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  cursor: (gameOver || won) ? 'default' : 'pointer',
                  background: cell.revealed
                    ? (cell.mine ? 'rgba(244,63,94,0.25)' : COLORS.revealed)
                    : COLORS.hidden,
                  color: cell.adjacent > 0 ? COLORS.numbers[cell.adjacent] : COLORS.text,
                  userSelect: 'none',
                  border: cell.revealed ? 'none' : `1px solid ${COLORS.hiddenBorder}`,
                  borderRadius: 2,
                }}
              >
                {getCellContent(cell)}
              </div>
            ))
          )}
        </div>
        {(gameOver || won) && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.35)' }}>
            <div style={{ padding: 16, background: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.grid}`, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>{won ? '🎉 You Win!' : '💥 Game Over'}</div>
              <div style={{ fontSize: 12, marginBottom: 10 }}>Time: {time}s</div>
              <button onClick={reset} style={{ padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinesweeperGame;
