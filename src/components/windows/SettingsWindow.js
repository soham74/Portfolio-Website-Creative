import React, { useState, useRef, useEffect, useCallback } from 'react';
import soundManager from '../../utils/SoundManager';
import './SettingsWindow.css';

/* ------------------------------------------------------------------ */
/*  Tiny CRT monitor preview                                          */
/* ------------------------------------------------------------------ */
const Monitor = ({ children, style }) => (
  <div className="settings-monitor" style={style}>
    <div className="settings-monitor-body">
      <div className="settings-monitor-screen">
        {children}
      </div>
    </div>
    <div className="settings-monitor-stand" />
    <div className="settings-monitor-base" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Wallpaper thumbnails for the preview                              */
/* ------------------------------------------------------------------ */
const WALLPAPERS = [
  { name: '(None)', value: 'none', color: '#008080' },
  { name: 'Default', value: '/assets/windows_bg.jpeg', color: null },
  { name: 'Clouds', value: 'clouds', color: null },
  { name: 'Teal', value: 'solid-teal', color: '#008080' },
  { name: 'Navy', value: 'solid-navy', color: '#000080' },
  { name: 'Forest', value: 'solid-forest', color: '#2d5016' },
  { name: 'Plum', value: 'solid-plum', color: '#3b0764' },
  { name: 'Slate', value: 'solid-slate', color: '#334155' },
  { name: 'Storm', value: 'solid-storm', color: '#1e293b' },
  { name: 'Pumpkin', value: 'solid-pumpkin', color: '#7c2d12' },
];

const DISPLAY_OPTIONS = ['Center', 'Tile', 'Stretch'];

/* ------------------------------------------------------------------ */
/*  Screen savers                                                     */
/* ------------------------------------------------------------------ */
const SCREENSAVERS = [
  '(None)',
  '3D FlowerBox',
  '3D Flying Objects',
  '3D Maze',
  '3D Text',
  'Beziers',
  'Blank Screen',
  'Flying Through Space',
  'Flying Windows',
  'Marquee',
  'Mystify Your Mind',
  'Starfield Simulation',
];

/* ------------------------------------------------------------------ */
/*  Appearance schemes                                                */
/* ------------------------------------------------------------------ */
const SCHEMES = [
  'Windows Standard',
  'Windows Standard (large)',
  'Windows Standard (extra large)',
  'Desert',
  'Eggplant',
  'High Contrast Black',
  'High Contrast White',
  'Lilac',
  'Maple',
  'Marine',
  'Plum (theme)',
  'Rainy Day',
  'Red White and Blue',
  'Rose',
  'Slate (theme)',
  'Spruce',
  'Storm (theme)',
  'Teal (theme)',
  'Wheat',
];

const SCHEME_COLORS = {
  'Windows Standard': { active: '#000080', inactive: '#808080', desktop: '#008080' },
  'Desert': { active: '#a18362', inactive: '#a1987a', desktop: '#c2b280' },
  'Eggplant': { active: '#5b3272', inactive: '#808080', desktop: '#40515c' },
  'High Contrast Black': { active: '#0000ff', inactive: '#00ff00', desktop: '#000000' },
  'High Contrast White': { active: '#800080', inactive: '#000000', desktop: '#ffffff' },
  'Lilac': { active: '#7f7fc0', inactive: '#808080', desktop: '#c8aec8' },
  'Maple': { active: '#a23030', inactive: '#808080', desktop: '#a87860' },
  'Marine': { active: '#000080', inactive: '#808080', desktop: '#6080a0' },
  'Rose': { active: '#804060', inactive: '#808080', desktop: '#c08080' },
  'Spruce': { active: '#487860', inactive: '#808080', desktop: '#586850' },
  'Wheat': { active: '#808040', inactive: '#808080', desktop: '#d8c890' },
};

/* ------------------------------------------------------------------ */
/*  Starfield canvas for the Screen Saver preview                     */
/* ------------------------------------------------------------------ */
const StarfieldPreview = ({ active }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) { if (rafRef.current) cancelAnimationFrame(rafRef.current); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * W - W / 2,
        y: Math.random() * H - H / 2,
        z: Math.random() * W,
      }));
    }
    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      starsRef.current.forEach(s => {
        s.z -= 1.5;
        if (s.z <= 0) { s.z = W; s.x = Math.random() * W - W / 2; s.y = Math.random() * H - H / 2; }
        const sx = (s.x / s.z) * W / 2 + W / 2;
        const sy = (s.y / s.z) * H / 2 + H / 2;
        const r = Math.max(0.5, (1 - s.z / W) * 2);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active]);

  return <canvas ref={canvasRef} width={160} height={100} style={{ width: '100%', height: '100%' }} />;
};

/* ------------------------------------------------------------------ */
/*  Main Settings Window                                              */
/* ------------------------------------------------------------------ */
const SettingsWindow = () => {
  const [tab, setTab] = useState(0);

  /* Background state */
  const [selectedWp, setSelectedWp] = useState(1); // Default
  const [displayMode, setDisplayMode] = useState('Stretch');

  /* Screen Saver state */
  const [selectedSs, setSelectedSs] = useState(0);
  const [ssWait, setSsWait] = useState(15);
  const [ssPassword, setSsPassword] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(80);

  /* Appearance state */
  const [scheme, setScheme] = useState('Windows Standard');

  /* Settings state */
  const [colorDepth, setColorDepth] = useState('True Color (32 bit)');
  const [resolution, setResolution] = useState(3); // index into res options
  const resOptions = ['640 by 480 pixels', '800 by 600 pixels', '1024 by 768 pixels', '1280 by 1024 pixels', '1600 by 1200 pixels'];

  const [applied, setApplied] = useState(false);

  /* ---- handlers ---- */
  const handleApply = useCallback(() => {
    // Apply wallpaper
    const wp = WALLPAPERS[selectedWp];
    const event = new CustomEvent('changeWallpaper', { detail: wp });
    window.dispatchEvent(event);

    // Apply sound
    soundManager.setEnabled(soundEnabled);
    soundManager.setVolume(volume / 100);

    setApplied(true);
    setTimeout(() => setApplied(false), 1500);
  }, [selectedWp, soundEnabled, volume]);

  const tabNames = ['Background', 'Screen Saver', 'Appearance', 'Settings'];

  const previewColor = WALLPAPERS[selectedWp]?.color || '#008080';
  const schemeColors = SCHEME_COLORS[scheme] || SCHEME_COLORS['Windows Standard'];

  return (
    <div className="settings-window">
      {/* Tabs */}
      <div className="settings-tabs">
        {tabNames.map((t, i) => (
          <button
            key={t}
            className={`settings-tab ${tab === i ? 'active' : ''}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab body */}
      <div className="settings-tab-body">
        {/* ===================== BACKGROUND ===================== */}
        {tab === 0 && (
          <div className="settings-tab-content">
            <Monitor>
              <div style={{
                width: '100%', height: '100%',
                background: WALLPAPERS[selectedWp]?.value?.startsWith('/') || WALLPAPERS[selectedWp]?.value === 'clouds'
                  ? undefined : previewColor,
                backgroundImage: WALLPAPERS[selectedWp]?.value === 'clouds'
                  ? 'linear-gradient(180deg, #87CEEB 0%, #E0F0FF 60%, #fff 100%)'
                  : WALLPAPERS[selectedWp]?.value?.startsWith('/')
                    ? `url(${WALLPAPERS[selectedWp].value})`
                    : undefined,
                backgroundSize: 'cover',
              }} />
            </Monitor>

            <div className="settings-row" style={{ marginTop: 10 }}>
              <div className="settings-field-group" style={{ flex: 1 }}>
                <label className="settings-label">Wallpaper:</label>
                <div className="settings-listbox">
                  {WALLPAPERS.map((wp, i) => (
                    <div
                      key={wp.name}
                      className={`settings-listbox-item ${selectedWp === i ? 'selected' : ''}`}
                      onClick={() => setSelectedWp(i)}
                    >
                      {wp.color && (
                        <span className="settings-color-swatch" style={{ background: wp.color }} />
                      )}
                      {wp.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-field-group" style={{ minWidth: 100, marginLeft: 10 }}>
                <label className="settings-label">Display:</label>
                <select
                  className="settings-select"
                  value={displayMode}
                  onChange={e => setDisplayMode(e.target.value)}
                >
                  {DISPLAY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <button className="settings-btn" style={{ marginTop: 8 }} disabled>Browse...</button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== SCREEN SAVER ===================== */}
        {tab === 1 && (
          <div className="settings-tab-content">
            <Monitor>
              {selectedSs === 0
                ? <div style={{ width: '100%', height: '100%', background: '#008080' }} />
                : <StarfieldPreview active={true} />
              }
            </Monitor>

            <fieldset className="settings-fieldset" style={{ marginTop: 10 }}>
              <legend>Screen Saver</legend>
              <div className="settings-row">
                <select
                  className="settings-select"
                  style={{ flex: 1 }}
                  value={SCREENSAVERS[selectedSs]}
                  onChange={e => setSelectedSs(SCREENSAVERS.indexOf(e.target.value))}
                >
                  {SCREENSAVERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="settings-btn" style={{ marginLeft: 6 }} disabled>Settings...</button>
                <button className="settings-btn" style={{ marginLeft: 6 }} disabled>Preview</button>
              </div>

              <div className="settings-row" style={{ marginTop: 8 }}>
                <label className="settings-label" style={{ marginRight: 6 }}>Wait:</label>
                <input
                  type="number"
                  className="settings-input-num"
                  value={ssWait}
                  min={1}
                  max={99}
                  onChange={e => setSsWait(Number(e.target.value))}
                />
                <span className="settings-label" style={{ marginLeft: 4 }}>minutes</span>
                <span style={{ flex: 1 }} />
                <label className="settings-checkbox">
                  <input type="checkbox" checked={ssPassword} onChange={e => setSsPassword(e.target.checked)} />
                  Password protected
                </label>
              </div>
            </fieldset>

            <fieldset className="settings-fieldset" style={{ marginTop: 8 }}>
              <legend>Sound</legend>
              <div className="settings-row">
                <label className="settings-checkbox">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={e => setSoundEnabled(e.target.checked)}
                  />
                  Enable click sounds
                </label>
              </div>
              <div className="settings-row" style={{ marginTop: 6 }}>
                <label className="settings-label" style={{ marginRight: 6 }}>Volume:</label>
                <span className="settings-label">Low</span>
                <input
                  type="range"
                  min={0} max={100}
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="settings-slider"
                />
                <span className="settings-label">High</span>
              </div>
            </fieldset>
          </div>
        )}

        {/* ===================== APPEARANCE ===================== */}
        {tab === 2 && (
          <div className="settings-tab-content">
            {/* Mock window preview */}
            <div className="appearance-preview" style={{ background: schemeColors.desktop }}>
              <div className="appearance-win inactive" style={{ background: '#c0c0c0', borderColor: '#c0c0c0' }}>
                <div className="appearance-titlebar" style={{ background: schemeColors.inactive }}>Inactive Window</div>
              </div>
              <div className="appearance-win active-win" style={{ background: '#c0c0c0', borderColor: '#c0c0c0' }}>
                <div className="appearance-titlebar" style={{ background: schemeColors.active }}>Active Window</div>
                <div className="appearance-menubar">
                  <span>Normal</span>
                  <span style={{ color: '#808080' }}>Disabled</span>
                  <span className="appearance-menu-selected">Selected</span>
                </div>
                <div className="appearance-body">
                  <span>Window Text</span>
                  <div className="appearance-msgbox">
                    <div className="appearance-titlebar" style={{ background: schemeColors.active, fontSize: 9, padding: '1px 3px' }}>Message Box</div>
                    <div className="appearance-msgbox-body">
                      <button className="settings-btn" style={{ fontSize: 9, padding: '1px 8px' }}>OK</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-row" style={{ marginTop: 10 }}>
              <label className="settings-label" style={{ marginRight: 6 }}>Scheme:</label>
              <select
                className="settings-select"
                style={{ flex: 1 }}
                value={scheme}
                onChange={e => setScheme(e.target.value)}
              >
                {SCHEMES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="settings-btn" style={{ marginLeft: 6 }} disabled>Save As...</button>
              <button className="settings-btn" style={{ marginLeft: 6 }} disabled>Delete</button>
            </div>

            <div className="settings-row" style={{ marginTop: 8 }}>
              <label className="settings-label" style={{ marginRight: 6 }}>Item:</label>
              <select className="settings-select" style={{ flex: 1 }} defaultValue="Desktop">
                <option>3D Objects</option>
                <option>Active Title Bar</option>
                <option>Active Window Border</option>
                <option>Application Background</option>
                <option>Caption Buttons</option>
                <option>Desktop</option>
                <option>Icon</option>
                <option>Inactive Title Bar</option>
                <option>Inactive Window Border</option>
                <option>Menu</option>
                <option>Message Box</option>
                <option>Scrollbar</option>
                <option>Selected Items</option>
                <option>ToolTip</option>
                <option>Window</option>
              </select>
              <label className="settings-label" style={{ marginLeft: 8, marginRight: 4 }}>Size:</label>
              <input type="number" className="settings-input-num" defaultValue={0} disabled />
              <button className="settings-btn settings-color-btn" style={{ marginLeft: 6, background: schemeColors.desktop }} disabled>
                Color
              </button>
            </div>

            <div className="settings-row" style={{ marginTop: 8 }}>
              <label className="settings-label" style={{ marginRight: 6 }}>Font:</label>
              <select className="settings-select" style={{ flex: 1 }} defaultValue="MS Sans Serif" disabled>
                <option>MS Sans Serif</option>
                <option>Arial</option>
                <option>Tahoma</option>
                <option>Courier New</option>
              </select>
              <label className="settings-label" style={{ marginLeft: 8, marginRight: 4 }}>Size:</label>
              <input type="number" className="settings-input-num" defaultValue={8} disabled />
              <button className="settings-btn" style={{ marginLeft: 6, fontWeight: 'bold', minWidth: 24 }} disabled>B</button>
              <button className="settings-btn" style={{ marginLeft: 4, fontStyle: 'italic', minWidth: 24 }} disabled>I</button>
            </div>
          </div>
        )}

        {/* ===================== SETTINGS ===================== */}
        {tab === 3 && (
          <div className="settings-tab-content">
            <Monitor>
              <div style={{ width: '100%', height: '100%', background: '#008080', display: 'grid', placeItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>1</span>
              </div>
            </Monitor>

            <div style={{ marginTop: 8, fontSize: 10, color: '#000', textAlign: 'center' }}>
              Display: Default Monitor on Soham's Portfolio<br/>
              Adapter: React 19 + Tailwind CSS
            </div>

            <fieldset className="settings-fieldset" style={{ marginTop: 10 }}>
              <legend>Color palette</legend>
              <select
                className="settings-select"
                style={{ width: '100%' }}
                value={colorDepth}
                onChange={e => setColorDepth(e.target.value)}
              >
                <option>16 Color</option>
                <option>256 Color</option>
                <option>High Color (16 bit)</option>
                <option>True Color (24 bit)</option>
                <option>True Color (32 bit)</option>
              </select>
            </fieldset>

            <fieldset className="settings-fieldset" style={{ marginTop: 8 }}>
              <legend>Desktop area</legend>
              <div className="settings-row" style={{ alignItems: 'center' }}>
                <span className="settings-label">Less</span>
                <input
                  type="range"
                  min={0} max={4}
                  value={resolution}
                  onChange={e => setResolution(Number(e.target.value))}
                  className="settings-slider"
                  style={{ flex: 1, margin: '0 6px' }}
                />
                <span className="settings-label">More</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: 10, marginTop: 4 }}>
                {resOptions[resolution]}
              </div>
            </fieldset>

            <div className="settings-row" style={{ marginTop: 8 }}>
              <label className="settings-label" style={{ marginRight: 6 }}>Font size:</label>
              <select className="settings-select" defaultValue="Small Fonts" disabled>
                <option>Small Fonts</option>
                <option>Large Fonts</option>
                <option>Other...</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="settings-bottom-buttons">
        {applied && <span style={{ fontSize: 10, color: '#008000', marginRight: 'auto' }}>Settings applied!</span>}
        <span style={{ flex: 1 }} />
        <button className="settings-btn" onClick={handleApply}>OK</button>
        <button className="settings-btn">Cancel</button>
        <button className="settings-btn" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default SettingsWindow;
