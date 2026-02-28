import React, { useState, useCallback } from 'react';
import FS from '../../data/fileSystem';
import './ExplorerWindow.css';

const ExplorerWindow = () => {
  const [currentPath, setCurrentPath] = useState('C:\\');
  const [history, setHistory] = useState(['C:\\']);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const currentNode = FS[currentPath];

  const navigateTo = useCallback((path) => {
    if (!FS[path] || FS[path].type !== 'dir') return;
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    setCurrentPath(path);
    setSelectedItem(null);
  }, [history, historyIdx]);

  const goBack = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setCurrentPath(history[historyIdx - 1]);
      setSelectedItem(null);
    }
  };

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setCurrentPath(history[historyIdx + 1]);
      setSelectedItem(null);
    }
  };

  const goUp = () => {
    const parts = currentPath.split('\\');
    if (parts.length <= 1) return;
    parts.pop();
    const parent = parts.join('\\') || 'C:\\';
    if (FS[parent]) navigateTo(parent);
  };

  const handleItemDoubleClick = (childName) => {
    const childPath = currentPath + (currentPath.endsWith('\\') ? '' : '\\') + childName.toUpperCase();
    const node = FS[childPath];

    if (!node) return;

    if (node.type === 'dir') {
      navigateTo(childPath);
    } else {
      // Open file in Notepad via custom event
      const event = new CustomEvent('openWindowFromStart', {
        detail: {
          title: childName + ' - Notepad',
          component: 'NotepadWindow',
          width: 600,
          height: 450,
        }
      });
      window.dispatchEvent(event);
      // Also send file content to notepad
      setTimeout(() => {
        const notepadEvent = new CustomEvent('openInNotepad', {
          detail: { filename: childName.toLowerCase(), content: node.content.join('\n') }
        });
        window.dispatchEvent(notepadEvent);
      }, 100);
    }
  };

  const getItemIcon = (childName) => {
    const childPath = currentPath + (currentPath.endsWith('\\') ? '' : '\\') + childName.toUpperCase();
    const node = FS[childPath];
    if (!node) return '📄';
    if (node.type === 'dir') return '📁';
    if (childName.endsWith('.exe')) return '⚙️';
    if (childName.endsWith('.sys')) return '🔧';
    return '📄';
  };

  // Build sidebar tree
  const renderTree = (path, depth = 0) => {
    const node = FS[path];
    if (!node || node.type !== 'dir') return null;

    const dirName = path === 'C:\\' ? 'C:\\' : path.split('\\').pop();
    const items = [];

    items.push(
      <div
        key={path}
        className={`explorer-tree-item ${currentPath === path ? 'active' : ''}`}
        onClick={() => navigateTo(path)}
        style={{ paddingLeft: depth * 16 + 4 }}
      >
        <span className="explorer-tree-icon">{currentPath === path ? '📂' : '📁'}</span>
        <span className="explorer-tree-label">{dirName}</span>
      </div>
    );

    if (node.children) {
      node.children.forEach(child => {
        const childPath = path + (path.endsWith('\\') ? '' : '\\') + child.toUpperCase();
        if (FS[childPath] && FS[childPath].type === 'dir') {
          items.push(...(renderTree(childPath, depth + 1) || []));
        }
      });
    }

    return items;
  };

  return (
    <div className="explorer-window">
      <div className="explorer-toolbar">
        <button className="explorer-toolbar-btn" onClick={goBack} disabled={historyIdx <= 0}>
          ←
        </button>
        <button className="explorer-toolbar-btn" onClick={goForward} disabled={historyIdx >= history.length - 1}>
          →
        </button>
        <button className="explorer-toolbar-btn" onClick={goUp} disabled={currentPath === 'C:\\'}>
          ↑
        </button>
      </div>

      <div className="explorer-address-bar">
        <span className="explorer-address-label">Address:</span>
        <input
          className="explorer-address-input"
          value={currentPath}
          readOnly
        />
      </div>

      <div className="explorer-body">
        <div className="explorer-sidebar">
          {renderTree('C:\\')}
        </div>

        <div className="explorer-main">
          <div className="explorer-grid">
            {currentNode && currentNode.children && currentNode.children.map((child) => (
              <div
                key={child}
                className={`explorer-item ${selectedItem === child ? 'selected' : ''}`}
                onClick={() => setSelectedItem(child)}
                onDoubleClick={() => handleItemDoubleClick(child)}
              >
                <span className="explorer-item-icon">{getItemIcon(child)}</span>
                <span className="explorer-item-name">{child}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="explorer-statusbar">
        <span className="explorer-status-section">
          {currentNode?.children?.length || 0} object(s)
        </span>
        <span className="explorer-status-section">
          {currentPath}
        </span>
      </div>
    </div>
  );
};

export default ExplorerWindow;
