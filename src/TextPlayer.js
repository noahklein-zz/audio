import React, { PureComponent } from 'react';
import { withState, withHandlers, compose } from 'recompose';
import styled from 'styled-components';
import { playSong } from './audio';
import pc from './pitch-class';

const DEFAULT_TEXT = `C#
C#m
C#dim
C#aug
C#sus2
C#sus4
C#7
C#min7
C#maj7
C#minmaj7`;

const NOTES = [
	'C', 'C#', 'D', 'D#', 'E', 'F',
	'F#', 'G', 'G#', 'A', 'A#', 'B',
];

const CHORDS = new Map([
	['m', pc.minor],
	['dim', pc.dim],
	['aug', pc.aug],
	['sus2', pc.sus2],
	['sus4', pc.sus4],
	['7', pc.dom7],
	['min7', pc.min7],
	['maj7', pc.maj7],
	['minmaj7', pc.minMaj7],
]);

function chordifyInputLine(line) {
	const [letter, modifer] = splitLine(line);
	const chordFunc = CHORDS.get(modifer) || pc.major;
	const noteNum = NOTES.findIndex(n => n === letter.toUpperCase());
	return chordFunc(noteNum);
}

const inputToChords = input =>
	input
		.split('\n')
		.filter(x => !!x)
		.map(chordifyInputLine);

const Wrapper = styled.div`
	background-color: #C1DEE8;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const Textarea = styled.textarea`
	width: 125px;
	margin: 45px auto;
	display: block;
	outline: none;
	resize: none;
	border: 3px solid #5D4D4F;
	background-color: transparent;
	font-size: 12px;
	color: #322B26;
`;

const Button = styled.button`
	margin: 0 auto;
	display: block;
	width: 90px;
	font-size: 16px;
	cursor: pointer;
	border-radius: 0;
	outline: none;
	background: white;
	color: #5D4D4F;
	border: none;
	transition: background-color 0.3s, color 0.3s;

	&:hover {
		background-color: #5D4D4F;
		color: white;
	}
`;

const play = compose(playSong, inputToChords);

function splitLine(line) {
	const isSharp = line.charAt(1) === '#';
	const note = line.charAt(0) + (isSharp ? '#' : '');
	const rest = line.slice(isSharp ? 2 : 1);
	return [note, rest];
}

const enhance = compose(
	withState('text', 'setText', DEFAULT_TEXT),
	withHandlers({
		onChange: props => e => props.setText(e.target.value),
		onSubmit: props => () => play(props.text),
	}),
);

export default enhance(({ text, onChange, onSubmit }) => (
	<Wrapper>
		<Textarea value={text} onChange={onChange} rows={8} />
		<Button onClick={onSubmit}>Play</Button>
	</Wrapper>
));
