// const context = new AudioContext();

// function oscillator(freq = 440) {
//   const osc = context.createOscillator();
//   osc.frequency.value = freq;
//   osc.connect(context.destination);
//   return osc;
// }

// export function playFreq(freq = 440, duration = 1) {
//   const osc = oscillator(freq);
//   osc.start(context.currentTime);
//   osc.stop(context.currentTime + duration);
// }

// export function noteToFreq(num = 0) {
//   const factor = 2 ** (num / 12);
//   return 440 * factor;
// }
