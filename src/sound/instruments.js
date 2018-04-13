import { enumerate, range, sleep, take } from "./utils";
import { playFreq, noteToFreq } from "./audio";

class BaseInstrument {
  constructor() {
    this.context = new AudioContext();
  }

  oscillator(freq = 440) {
    const osc = this.context.createOscillator();
    osc.frequency.value = freq;
    const gain = this.context.createGain();
    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.setValueAtTime(1, this.context.currentTime);
    osc.connect(gain).connect(this.context.destination);
    console.log("gain", osc.gain);
    return osc;
  }

  static noteToFreq(num = 0) {
    const factor = 2 ** (num / 12);
    return 440 * factor;
  }

  _playFreq(freq = 440, duration = 1) {
    const osc = this.oscillator(freq);
    console.log("no pain", Object.keys(osc));
    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + duration);
    // osc.setTargetAtTime(0, this.context.currentTime, 1);
  }

  play(n = 0, duration = 1) {
    const freq = BaseInstrument.noteToFreq(n);
    this.playFreq(freq, duration);
  }

  playFreq(freq, duration = 1) {
    this._playFreq(freq, duration);
  }

  playChord(notes, duration) {
    for (const note of notes) {
      this.play(note, duration);
    }
  }

  playSong(chords = [], chordDuration = 1) {
    for (const [i, chord] of enumerate(chords)) {
      setTimeout(
        () => this.playChord(chord, chordDuration),
        i * 1000 * chordDuration
      );
    }
  }
}

class Instrument extends BaseInstrument {}
export const instrument = new Instrument();

class Organ extends BaseInstrument {
  playFreq(freq, duration) {
    const pf = freq => this._playFreq(freq, duration);
    pf(freq);
    pf(freq * 0.5);
    pf(freq * 1.5);
  }
}
export const organ = new Organ();
