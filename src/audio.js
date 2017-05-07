const context = new AudioContext();

function oscillator(freq = 440) {
	const oscillator = context.createOscillator();
	oscillator.frequency.value = freq;
	oscillator.connect(context.destination);
	return oscillator;
}

function playFreq(freq = 440, delay = 0, duration = 1) {
	const osc = oscillator(freq);
	setTimeout(() => {
		osc.start(context.currentTime);
		osc.stop(context.currentTime + duration);
	}, delay * 1000);
}

function noteToFreq(num = 0) {
	const factor = 2 ** (num / 12);
	return 440 * factor;
}

export function play(n = 0, delay = 0) {
	playFreq(noteToFreq(n + 4), delay);
}

export function playChord(notes = [], delay = 0, duration = 1) {
	notes.forEach(note => play(note, delay))
}

export function playSong(chords = [], chordDuration = 1) {
	chords.forEach((chord, index) =>
		playChord(chord, chordDuration * index, chordDuration)
	);
}
