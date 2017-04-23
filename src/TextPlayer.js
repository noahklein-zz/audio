import React, { PureComponent } from 'react';
import { withState, withHandlers, compose } from 'recompose';
import { majorChord, minorChord, augmented, diminished, sus4, playSong } from './audio';

const NOTES = [
	'C', 'C#', 'D', 'D#', 'E', 'F',
	'F#', 'G', 'G#', 'A', 'A#', 'B',
];

const CHORDS = new Map([
	['m', minorChord],
	['dim', diminished],
	['aug', augmented],
	['sus4', sus4],
])

const enhance = compose(
	withState('text', 'setText', ''),
	withHandlers({
		onChange: props => e =>
			props.setText(e.target.value),
		onSubmit: props => () => {
			play(props.text);
		}
	}),
);

export default enhance(({ text, onChange, onSubmit }) => (
	<div>
		<textarea value={text} onChange={onChange} rows={8} />
		<button onClick={onSubmit} >Play</button>
	</div>
));

function play(input) {
	const chords = inputToChords(input);
	// console.log(
	// 	chords.map(chord => chord.map(note => NOTES[note % 12]))
	// );
	playSong(chords);
}

function inputToChords(input) {
	const lines = input
		.split('\n')
		.filter(x => !!x);
	return lines
		.map(splitLine)
		.map(([note, rest]) => {
			const chordFunc = CHORDS.get(rest) || majorChord;
			const noteNum = NOTES.findIndex(n => n === note.toUpperCase());
			return chordFunc(noteNum);
		});
}

function splitLine(line) {
	const isSharp = line.charAt(1) === '#';
	const note = line.charAt(0) + (isSharp ? '#' : '');
	const rest = line.slice(isSharp ? 2 : 1);
	return [note, rest];
}


