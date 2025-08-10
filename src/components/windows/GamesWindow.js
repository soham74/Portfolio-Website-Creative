import React, { useState } from 'react';
import SnakeGame from './games/SnakeGame';

const GAMES = [
  { id: 'snake', name: 'Snake', description: 'Classic snake with smooth controls', component: 'SnakeGame' },
];

const renderGame = () => null;

const GamesWindow = () => {
  const [selected, setSelected] = useState(null);

  const handleOpen = () => {
    if (!selected) return;
    const event = new CustomEvent('openWindowFromStart', {
      detail: { component: 'SnakeGame', title: 'Snake', width: 720, height: 560 },
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
              onDoubleClick={handleOpen}
              style={{
                padding: '8px 10px',
                cursor: 'pointer',
                background: selected?.id === g.id ? '#eef2ff' : 'transparent',
                border: '1px solid #e5e7eb',
                margin: '0 8px 8px',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>{g.name}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{g.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right pane: details */}
      <div style={{ overflow: 'auto', padding: 12 }}>
        {selected ? (
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>{selected.description}</div>
            <button onClick={handleOpen} style={{ padding: '8px 12px', fontSize: 12, cursor: 'pointer' }}>Open</button>
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