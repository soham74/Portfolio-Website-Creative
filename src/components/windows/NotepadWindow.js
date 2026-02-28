import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../../data/fileSystem';
import './NotepadWindow.css';

const NotepadWindow = () => {
  const postKeys = Object.keys(BLOG_POSTS);
  const [currentPost, setCurrentPost] = useState(postKeys[0]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const post = BLOG_POSTS[currentPost];
    if (post) {
      setContent(post.content.join('\n'));
    }
  }, [currentPost]);

  // Listen for external file open requests (from Explorer)
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.filename) {
        const key = e.detail.filename.toLowerCase();
        if (BLOG_POSTS[key]) {
          setCurrentPost(key);
        } else if (e.detail.content) {
          setContent(e.detail.content);
        }
      }
    };
    window.addEventListener('openInNotepad', handler);
    return () => window.removeEventListener('openInNotepad', handler);
  }, []);

  const lines = content.split('\n').length;
  const words = content.split(/\s+/).filter(w => w.length > 0).length;
  const chars = content.length;

  const handleMenuClick = (menu) => {
    setMenuOpen(menuOpen === menu ? null : menu);
  };

  const handlePostSelect = (key) => {
    setCurrentPost(key);
    setMenuOpen(null);
  };

  return (
    <div className="notepad-window" onClick={() => setMenuOpen(null)}>
      <div className="notepad-menubar">
        <div
          className="notepad-menu-item"
          onClick={(e) => { e.stopPropagation(); handleMenuClick('file'); }}
        >
          File
          {menuOpen === 'file' && (
            <div className="notepad-dropdown">
              {postKeys.map((key) => (
                <div
                  key={key}
                  className="notepad-dropdown-item"
                  onClick={(e) => { e.stopPropagation(); handlePostSelect(key); }}
                >
                  {BLOG_POSTS[key].title}
                </div>
              ))}
              <div className="notepad-dropdown-separator" />
              <div
                className="notepad-dropdown-item"
                style={{ color: '#808080' }}
              >
                Exit
              </div>
            </div>
          )}
        </div>
        <div
          className="notepad-menu-item"
          onClick={(e) => { e.stopPropagation(); handleMenuClick('edit'); }}
        >
          Edit
          {menuOpen === 'edit' && (
            <div className="notepad-dropdown">
              <div className="notepad-dropdown-item" style={{ color: '#808080' }}>Undo</div>
              <div className="notepad-dropdown-separator" />
              <div className="notepad-dropdown-item" style={{ color: '#808080' }}>Cut</div>
              <div className="notepad-dropdown-item" style={{ color: '#808080' }}>Copy</div>
              <div className="notepad-dropdown-item" style={{ color: '#808080' }}>Paste</div>
            </div>
          )}
        </div>
        <div
          className="notepad-menu-item"
          onClick={(e) => { e.stopPropagation(); handleMenuClick('help'); }}
        >
          Help
          {menuOpen === 'help' && (
            <div className="notepad-dropdown">
              <div className="notepad-dropdown-item" style={{ color: '#808080' }}>
                About Notepad
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="notepad-content">
        {content}
      </div>

      <div className="notepad-statusbar">
        <span className="notepad-statusbar-section">
          {BLOG_POSTS[currentPost]?.title || 'Untitled'}
        </span>
        <span className="notepad-statusbar-section">
          Ln {lines} | Words {words} | {chars} chars
        </span>
      </div>
    </div>
  );
};

export default NotepadWindow;
