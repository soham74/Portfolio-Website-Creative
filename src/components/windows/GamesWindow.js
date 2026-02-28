import React, { useState } from 'react';

const GAMES = [
  {
    id: 'snake',
    name: 'Snake',
    icon: '🐍',
    component: 'SnakeGame',
    description: 'Classic snake game with smooth controls and pixel-art styling.',
    howToPlay: 'Use Arrow keys or WASD to move. Eat food to grow. Don\'t hit the walls or yourself! P to pause, R to restart.',
    width: 720,
    height: 560,
  },
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    icon: '💣',
    component: 'MinesweeperGame',
    description: 'THE Windows 95 classic. Reveal tiles, flag mines, clear the board.',
    howToPlay: 'Left click to reveal a tile. Right click to flag/unflag a mine. Numbers show how many adjacent mines. Reveal all non-mine tiles to win!',
    width: 580,
    height: 620,
  },
  {
    id: 'tetris',
    name: 'Tetris',
    icon: '🧱',
    component: 'TetrisGame',
    description: 'The legendary falling-block puzzle from Russia (Alexey Pajitnov, 1985).',
    howToPlay: '← → to move, ↑ to rotate, ↓ for soft drop, Space for hard drop. Clear lines to score! P to pause, R to restart.',
    width: 340,
    height: 580,
  },
  {
    id: 'pong',
    name: 'Pong',
    icon: '🏓',
    component: 'PongGame',
    description: 'The original arcade game (Atari, 1972). Player vs AI.',
    howToPlay: 'Use ↑/↓ or W/S to move your paddle. First to 7 points wins. P to pause, R to restart.',
    width: 660,
    height: 500,
  },
  {
    id: '2048',
    name: '2048',
    icon: '🔢',
    component: 'Game2048',
    description: 'Slide-and-merge number puzzle. Combine tiles to reach 2048!',
    howToPlay: 'Use Arrow keys or WASD to slide all tiles. When two tiles with the same number collide, they merge. R to restart.',
    width: 460,
    height: 520,
  },
  {
    id: 'breakout',
    name: 'Breakout',
    icon: '🧱',
    component: 'BreakoutGame',
    description: 'Atari brick-breaker classic (1976). Smash all the bricks!',
    howToPlay: 'Use ← → or A/D to move the paddle. Bounce the ball to break all bricks. You have 3 lives. P to pause, R to restart.',
    width: 620,
    height: 520,
  },
  {
    id: 'memory',
    name: 'Memory Match',
    icon: '🃏',
    component: 'MemoryGame',
    description: 'Classic card-flipping memory game. Find all matching pairs!',
    howToPlay: 'Click cards to flip them. Match two identical cards to keep them revealed. Find all pairs in the fewest moves!',
    width: 440,
    height: 520,
  },
  {
    id: 'gomoku',
    name: 'Gomoku',
    icon: '⚫',
    component: 'GomokuGame',
    description: 'Traditional East Asian board game (Japan/China/Korea). Five in a row!',
    howToPlay: 'Click to place a black stone. You play against the AI (white). First to get 5 stones in a row (horizontal, vertical, or diagonal) wins!',
    width: 560,
    height: 580,
  },
  {
    id: 'lightsout',
    name: 'Lights Out',
    icon: '💡',
    component: 'LightsOutGame',
    description: 'Electronic puzzle game (Tiger Electronics, 1995). Toggle lights to turn them all off!',
    howToPlay: 'Click a light to toggle it and its 4 neighbors (up, down, left, right). Goal: turn ALL lights off. Solve it in the fewest moves!',
    width: 460,
    height: 520,
  },
];

const GamesWindow = () => {
  const [selected, setSelected] = useState(null);

  const handleOpen = (game) => {
    const g = game || selected;
    if (!g) return;
    const event = new CustomEvent('openWindowFromStart', {
      detail: { component: g.component, title: g.name, width: g.width, height: g.height },
    });
    window.dispatchEvent(event);
  };

  return (
    <div style={{ height: '100%', width: '100%', background: '#fff', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 8 }}>
      {/* Left pane: game list */}
      <div style={{ borderRight: '1px solid #e5e7eb', overflowY: 'auto' }}>
        <div style={{ padding: 8, fontSize: 12, color: '#111827', fontWeight: 600 }}>Games</div>
        <div>
          {GAMES.map((g) => (
            <div
              key={g.id}
              role="button"
              onClick={() => setSelected(g)}
              onDoubleClick={() => handleOpen(g)}
              style={{
                padding: '8px 10px',
                cursor: 'pointer',
                background: selected?.id === g.id ? '#eef2ff' : 'transparent',
                border: '1px solid #e5e7eb',
                margin: '0 8px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 20 }}>{g.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{g.name}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{g.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right pane: details */}
      <div style={{ overflow: 'auto', padding: 12 }}>
        {selected ? (
          <div>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{selected.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>{selected.description}</div>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 12, padding: '8px 10px', background: '#f3f4f6', borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>How to Play</div>
              {selected.howToPlay}
            </div>
            <button onClick={() => handleOpen()} style={{ padding: '8px 12px', fontSize: 12, cursor: 'pointer' }}>Open</button>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>Double‑click the game in the list to open in a new window.</div>
          </div>
        ) : (
          <div style={{ fontSize: 12, color: '#6b7280' }}>Select a game on the left.</div>
        )}
      </div>
    </div>
  );
};

export default GamesWindow;
