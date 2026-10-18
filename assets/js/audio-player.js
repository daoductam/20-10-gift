/**
 * AUDIO PLAYER MODULE
 * ------------------------------------------------------------
 * Tự động tạo giai điệu Piano/Chime lãng mạn nhẹ nhàng qua Web Audio API
 * Hoặc phát file nhạc ngoại vi nếu người dùng cung cấp link.
 */

import { CONFIG } from './config.js';

class RomanticAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentStep = 0;
    this.audioElement = null;

    // Tiến trình hợp âm lãng mạn (Romantic Chords): Cmaj9 -> Am9 -> Fmaj7 -> Gadd9
    this.chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // C4, E4, G4, B4, D5 (Cmaj9)
      [220.00, 261.63, 329.63, 392.00, 493.88], // A3, C4, E4, G4, B4 (Am9)
      [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4 (Fmaj7)
      [196.00, 246.94, 293.66, 392.00, 440.00]  // G3, B3, D4, G4, A4 (Gadd9)
    ];

    this.melodyNotes = [
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88
    ];
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
  }

  playProceduralNote(freq, time, duration = 2.5, gainLevel = 0.08) {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    // Dùng sóng tam giác và sin pha trộn để tạo âm sắc ấm áp như phím đàn Rhodes/Celesta
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Subtle detune for shimmer
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, time);

    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.exponentialRampToValueAtTime(gainLevel, time + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(gainLevel * 0.4, time + 0.6);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, time + duration);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  playArpeggio() {
    if (!this.isPlaying || !this.audioCtx) return;

    const chordIndex = Math.floor(this.currentStep / 4) % this.chords.length;
    const chord = this.chords[chordIndex];
    const now = this.audioCtx.currentTime;

    // Rải nốt hợp âm lấp lánh
    const noteFreq = chord[this.currentStep % chord.length];
    this.playProceduralNote(noteFreq, now, 2.2, 0.06);

    // Đôi lúc điểm thêm một nốt giai điệu cao vút lãng mạn
    if (this.currentStep % 2 === 0) {
      const highFreq = this.melodyNotes[(this.currentStep + chordIndex) % this.melodyNotes.length];
      this.playProceduralNote(highFreq, now + 0.18, 2.8, 0.04);
    }

    this.currentStep++;
    this.timerId = setTimeout(() => {
      this.playArpeggio();
    }, 420);
  }

  async start() {
    this.initContext();

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch (err) {
        console.warn("Audio waiting for first gesture");
      }
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    if (CONFIG.EXTERNAL_MUSIC_URL && !CONFIG.USE_PROCEDURAL_PIANO) {
      if (!this.audioElement) {
        this.audioElement = new Audio(CONFIG.EXTERNAL_MUSIC_URL);
        this.audioElement.loop = true;
      }
      this.audioElement.play().catch(e => console.warn("Audio autoplay blocked:", e));
    } else {
      this.playArpeggio();
    }

    this.updateUI(true);
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  updateUI(playing) {
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      if (playing) {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('title', 'Tắt nhạc nền');
      } else {
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('title', 'Bật nhạc nền');
      }
    }
  }
}

export const musicPlayer = new RomanticAudioPlayer();
