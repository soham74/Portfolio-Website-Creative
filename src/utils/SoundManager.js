class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = true;
    this.preloadSounds();
  }

  preloadSounds() {
    // Preload click sounds
    this.sounds.mouseDown = new Audio('/audio/static_audio_mouse_mouse_down.mp3');
    this.sounds.mouseUp = new Audio('/audio/static_audio_mouse_mouse_up.mp3');
    
    // Configure audio settings
    Object.values(this.sounds).forEach(audio => {
      audio.preload = 'auto';
      audio.volume = 0.8;
    });
  }

  playSound(soundName) {
    if (!this.isEnabled || !this.sounds[soundName]) return;
    
    try {
      // Reset the audio to the beginning and play
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play().catch(() => {
        // Silently handle play failures (e.g., browser autoplay policies)
      });
    } catch (error) {
      // Silently handle errors
    }
  }

  playMouseDown() {
    this.playSound('mouseDown');
  }

  playMouseUp() {
    this.playSound('mouseUp');
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  setVolume(volume) {
    Object.values(this.sounds).forEach(audio => {
      audio.volume = Math.max(0, Math.min(1, volume));
    });
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager; 