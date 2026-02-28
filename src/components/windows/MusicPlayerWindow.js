import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayerWindow.css';

const PLAYLIST = [
  { title: 'lo-fi_beats_to_code_to.mp3', duration: 197 },
  { title: 'debugging_blues.mp3', duration: 243 },
  { title: 'segfault_serenade.mp3', duration: 178 },
  { title: '404_not_found.wav', duration: 212 },
  { title: 'merge_conflict_melody.mp3', duration: 265 },
  { title: 'stack_overflow_symphony.mp3', duration: 294 },
  { title: 'git_push_anthem.mp3', duration: 153 },
  { title: 'caffeine_dreams.mp3', duration: 230 },
];

const NUM_BARS = 12;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const MusicPlayerWindow = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(75);
  const [barHeights, setBarHeights] = useState(() => Array(NUM_BARS).fill(0));
  const [marqueeOffset, setMarqueeOffset] = useState(0);

  const elapsedRef = useRef(elapsed);
  const playIntervalRef = useRef(null);
  const vizIntervalRef = useRef(null);
  const marqueeIntervalRef = useRef(null);

  const track = PLAYLIST[currentTrack];

  // Keep ref in sync
  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= PLAYLIST[currentTrack].duration) {
            // Auto-advance to next track
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(playIntervalRef.current);
    }
    return () => clearInterval(playIntervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrack]);

  // Visualizer animation
  useEffect(() => {
    if (isPlaying) {
      vizIntervalRef.current = setInterval(() => {
        setBarHeights(
          Array.from({ length: NUM_BARS }, () => Math.random() * 100)
        );
      }, 120);
    } else {
      clearInterval(vizIntervalRef.current);
      // Flatten bars when stopped
      setBarHeights(Array(NUM_BARS).fill(0));
    }
    return () => clearInterval(vizIntervalRef.current);
  }, [isPlaying]);

  // Marquee scroll
  useEffect(() => {
    if (isPlaying) {
      marqueeIntervalRef.current = setInterval(() => {
        setMarqueeOffset((prev) => prev + 1);
      }, 150);
    } else {
      clearInterval(marqueeIntervalRef.current);
    }
    return () => clearInterval(marqueeIntervalRef.current);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setElapsed(0);
    setMarqueeOffset(0);
  };

  const handlePrev = () => {
    const prevIndex = currentTrack === 0 ? PLAYLIST.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setElapsed(0);
    setMarqueeOffset(0);
  };

  const handleNext = () => {
    const nextIndex = (currentTrack + 1) % PLAYLIST.length;
    setCurrentTrack(nextIndex);
    setElapsed(0);
    setMarqueeOffset(0);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrack(index);
    setElapsed(0);
    setMarqueeOffset(0);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setElapsed(Math.floor(ratio * track.duration));
  };

  const seekPercent = track.duration > 0 ? (elapsed / track.duration) * 100 : 0;

  // Build scrolling marquee text
  const marqueeText = `  ${track.title}  ***  `;
  const displayTitle = (() => {
    const repeated = marqueeText.repeat(3);
    const offset = marqueeOffset % marqueeText.length;
    return repeated.substring(offset, offset + 30);
  })();

  return (
    <div className="music-player">
      {/* Title bar branding */}
      <div className="mp-header">
        <span className="mp-brand">SohamAMP</span>
        <span className="mp-version">v1.337</span>
      </div>

      {/* LCD Display */}
      <div className="mp-lcd">
        <div className="mp-lcd-top">
          {/* Visualizer */}
          <div className="mp-visualizer">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="mp-viz-bar"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Track info */}
          <div className="mp-lcd-info">
            <div className="mp-lcd-title">{displayTitle}</div>
            <div className="mp-lcd-time">
              <span className="mp-time-elapsed">{formatTime(elapsed)}</span>
              <span className="mp-time-separator">/</span>
              <span className="mp-time-total">{formatTime(track.duration)}</span>
            </div>
            <div className="mp-lcd-meta">
              <span className="mp-bitrate">192kbps</span>
              <span className="mp-samplerate">44kHz</span>
              <span className="mp-channels">stereo</span>
            </div>
          </div>
        </div>

        {/* Seek bar */}
        <div className="mp-seek" onClick={handleSeek}>
          <div className="mp-seek-track">
            <div
              className="mp-seek-fill"
              style={{ width: `${seekPercent}%` }}
            />
            <div
              className="mp-seek-thumb"
              style={{ left: `${seekPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mp-controls">
        <div className="mp-transport">
          <button
            className="mp-btn mp-btn-prev"
            onClick={handlePrev}
            title="Previous"
          >
            |&#9664;
          </button>
          <button
            className={`mp-btn mp-btn-play ${isPlaying ? 'active' : ''}`}
            onClick={handlePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '| |' : '\u25B6'}
          </button>
          <button
            className="mp-btn mp-btn-stop"
            onClick={handleStop}
            title="Stop"
          >
            &#9632;
          </button>
          <button
            className="mp-btn mp-btn-next"
            onClick={handleNext}
            title="Next"
          >
            &#9654;|
          </button>
        </div>

        <div className="mp-volume">
          <span className="mp-volume-icon">&#128264;</span>
          <input
            type="range"
            className="mp-volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            title={`Volume: ${volume}%`}
          />
        </div>
      </div>

      {/* Playlist */}
      <div className="mp-playlist">
        <div className="mp-playlist-header">
          <span>PLAYLIST</span>
          <span className="mp-playlist-count">{PLAYLIST.length} tracks</span>
        </div>
        <div className="mp-playlist-list">
          {PLAYLIST.map((t, i) => (
            <div
              key={i}
              className={`mp-playlist-item ${i === currentTrack ? 'active' : ''}`}
              onClick={() => handleTrackSelect(i)}
            >
              <span className="mp-playlist-num">{i + 1}.</span>
              <span className="mp-playlist-title">{t.title}</span>
              <span className="mp-playlist-duration">{formatTime(t.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerWindow;
