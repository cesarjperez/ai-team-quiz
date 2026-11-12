// Sintetizador de efectos de sonido futuristas mediante Web Audio API (sin archivos externos)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setEnabled(val) {
    this.enabled = Boolean(val);
  }

  playTone(freq, type = 'sine', duration = 0.12, startTime = 0, volume = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + startTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch {
      // Silenciar errores si el navegador bloquea autoplay
    }
  }

  click() {
    this.playTone(620, 'triangle', 0.055, 0, 0.06);
  }

  correct(streak = 1) {
    const boost = Math.min(streak - 1, 6) * 28;
    this.playTone(523.25 + boost, 'sine', 0.12, 0, 0.11);
    this.playTone(659.25 + boost, 'sine', 0.14, 0.07, 0.11);
    this.playTone(783.99 + boost, 'triangle', 0.22, 0.14, 0.12);
  }

  wrong() {
    this.playTone(240, 'sawtooth', 0.14, 0, 0.07);
    this.playTone(185, 'sawtooth', 0.22, 0.09, 0.07);
  }

  timeout() {
    this.playTone(320, 'square', 0.1, 0, 0.06);
    this.playTone(240, 'square', 0.12, 0.09, 0.06);
    this.playTone(170, 'sawtooth', 0.22, 0.18, 0.07);
  }

  warning() {
    this.playTone(440, 'sawtooth', 0.11, 0, 0.09);
    this.playTone(310, 'sawtooth', 0.16, 0.12, 0.09);
  }

  tick() {
    this.playTone(880, 'sine', 0.04, 0, 0.04);
  }

  achievement() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 'triangle', 0.2, idx * 0.08, 0.11);
    });
  }

  levelComplete(passed = true) {
    if (passed) {
      const melody = [440, 554.37, 659.25, 880, 1108.73];
      melody.forEach((n, idx) => {
        this.playTone(n, 'sine', 0.22, idx * 0.085, 0.12);
      });
    } else {
      this.playTone(330, 'triangle', 0.18, 0, 0.08);
      this.playTone(277.18, 'triangle', 0.26, 0.14, 0.08);
    }
  }
}

export const sound = new SoundEngine();
