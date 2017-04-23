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

const majorThird = root => root + 4;
// const minorThird = root => root + 3;
const fifth = root => root + 7;
const fourth = root => root + 5;

const triad = alts => root => [
	root + alts[0],
	majorThird(root) + alts[1],
	fifth(root) + alts[2]
];

export const majorChord = triad([0, 0, 0]);
export const minorChord = triad([0, -1, 0]);
export const diminished = triad([0, -1, -1]);
export const augmented = triad([0, 0, 1]);
export const sus4 = root => [root, fourth(root), fifth(root)]
