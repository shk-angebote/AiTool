// Web Audio API Synthesizer for a 128 BPM "Baustella – Silikon und Bauschaum" Party-Beat Preview
class BaustellaBeatEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private step = 0;

  public start(onStop?: () => void) {
    if (this.isPlaying) {
      this.stop();
      if (onStop) onStop();
      return false;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.step = 0;

    // 128 BPM -> 16th note is ~117ms
    const stepMs = (60 / 128 / 4) * 1000;

    this.playStep(this.step);
    this.intervalId = window.setInterval(() => {
      this.step = (this.step + 1) % 16;
      this.playStep(this.step);
    }, stepMs);

    return true;
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
    this.step = 0;
  }

  private playStep(step: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Four-on-the-floor Baustellen-Kick (steps 0, 4, 8, 12)
    if (step % 4 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(135, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.11);

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    }

    // Offbeat Synth Bass ("Bauschaum-Bass" on steps 2, 6, 10, 14)
    if (step % 4 === 2) {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      const bassNotes = [110, 110, 130.81, 98]; // A2, A2, C3, G2
      const note = bassNotes[Math.floor(step / 4) % bassNotes.length];
      osc.frequency.setValueAtTime(note, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.frequency.exponentialRampToValueAtTime(180, now + 0.15);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    }

    // Pneumatic Nailer / Clap on steps 4 and 12
    if (step === 4 || step === 12) {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    }

    // Catchy Brass-Synth Hook Riff ("Bau-stel-la!")
    const melodyMap: Record<number, number> = {
      0: 440,    // A4
      2: 523.25, // C5
      3: 587.33, // D5
      4: 659.25, // E5
      6: 587.33, // D5
      8: 523.25, // C5
      10: 493.88,// B4
      12: 440,   // A4
    };

    if (melodyMap[step]) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(melodyMap[step], now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  }
}

export const baustellaBeat = new BaustellaBeatEngine();
