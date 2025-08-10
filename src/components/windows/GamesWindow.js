import React, { useState } from 'react';
import ClickSpeedGame from './games/ClickSpeedGame';
import NumberGuessGame from './games/NumberGuessGame';
import MemoryPatternGame from './games/MemoryPatternGame';

const GAMES = [
  { id: 'click', name: 'Click Speed', description: 'How many clicks in 10s?', component: 'ClickSpeedGame' },
  { id: 'guess', name: 'Number Guess', description: 'Guess a number 1–100', component: 'NumberGuessGame' },
  { id: 'memory', name: 'Memory Pattern', description: 'Repeat the sequence', component: 'MemoryPatternGame' },
];

const renderGame = (component) => {
  switch (component) {
    case 'ClickSpeedGame':
      return <ClickSpeedGame />;
    case 'NumberGuessGame':
      return <NumberGuessGame />;
    case 'MemoryPatternGame':
      return <MemoryPatternGame />;
    default:
      return <div style={{ color: '#666', fontSize: 12, padding: 12 }}>Select a game on the left.</div>;
  }
};

const GamesWindow = () => {
  const [selected, setSelected] = useState(null);
  const [opened, setOpened] = useState(null);

  const handleOpen = () => {
    if (selected) setOpened(selected);
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

      {/* Right pane: details / preview */}
      <div style={{ overflow: 'hidden' }}>
        {opened ? (
          <div style={{ height: '100%' }}>{renderGame(opened.component)}</div>
        ) : (
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Select a game to preview. Double‑click to open.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesWindow;