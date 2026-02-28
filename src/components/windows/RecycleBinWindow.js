import React, { useState, useEffect, useCallback } from 'react';

const RecycleBinWindow = () => {
  const [items, setItems] = useState([]);

  const loadItems = useCallback(() => {
    const bin = window.__recycleBin || [];
    setItems([...bin]);
  }, []);

  useEffect(() => {
    loadItems();
    const handler = () => loadItems();
    window.addEventListener('recycleBinUpdated', handler);
    return () => window.removeEventListener('recycleBinUpdated', handler);
  }, [loadItems]);

  const restoreItem = (item) => {
    // Remove from recycle bin
    window.__recycleBin = (window.__recycleBin || []).filter(i => i.id !== item.id);
    // Re-open the window
    const event = new CustomEvent('openWindowFromStart', {
      detail: {
        title: item.title,
        component: item.component,
        width: item.width || 600,
        height: item.height || 400,
      }
    });
    window.dispatchEvent(event);
    window.dispatchEvent(new Event('recycleBinUpdated'));
    loadItems();
  };

  const emptyBin = () => {
    window.__recycleBin = [];
    window.dispatchEvent(new Event('recycleBinUpdated'));
    loadItems();
  };

  return (
    <div style={{
      height: '100%',
      background: '#fff',
      fontFamily: "'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif",
      fontSize: 12,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Toolbar */}
      <div style={{
        background: '#c0c0c0',
        borderBottom: '1px solid #808080',
        padding: '4px 8px',
        display: 'flex',
        gap: 8,
        flexShrink: 0,
      }}>
        <button
          onClick={emptyBin}
          disabled={items.length === 0}
          style={{
            background: '#c0c0c0',
            border: '2px outset #dfdfdf',
            padding: '2px 12px',
            fontSize: 11,
            cursor: items.length === 0 ? 'default' : 'pointer',
            color: items.length === 0 ? '#808080' : '#000',
            fontFamily: 'inherit',
          }}
        >
          Empty Recycle Bin
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        border: '2px inset #c0c0c0',
        margin: 2,
        background: '#fff',
      }}>
        {items.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#808080',
            gap: 8,
          }}>
            <span style={{ fontSize: 48 }}>🗑️</span>
            <span>Recycle Bin is empty</span>
          </div>
        ) : (
          <div style={{ padding: 8 }}>
            {/* Header row */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #c0c0c0',
              padding: '2px 4px',
              fontWeight: 'bold',
              marginBottom: 4,
            }}>
              <span style={{ width: 32 }}></span>
              <span style={{ flex: 1 }}>Name</span>
              <span style={{ width: 120 }}>Type</span>
              <span style={{ width: 80, textAlign: 'right' }}>Actions</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px 4px',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'default',
                }}
              >
                <span style={{ width: 32, fontSize: 16 }}>🗑️</span>
                <span style={{ flex: 1 }}>{item.title}</span>
                <span style={{ width: 120, color: '#808080' }}>{item.component}</span>
                <span style={{ width: 80, textAlign: 'right' }}>
                  <button
                    onClick={() => restoreItem(item)}
                    style={{
                      background: '#c0c0c0',
                      border: '2px outset #dfdfdf',
                      padding: '1px 8px',
                      fontSize: 10,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Restore
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{
        background: '#c0c0c0',
        borderTop: '1px solid #808080',
        padding: '2px 8px',
        fontSize: 11,
        flexShrink: 0,
      }}>
        <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>
          {items.length} item(s)
        </span>
      </div>
    </div>
  );
};

export default RecycleBinWindow;
