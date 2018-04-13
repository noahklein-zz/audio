import pc from "./pitch-class";
import { findAll } from "./utils";

const MODS = ["#"];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const CHORDS = new Map([
  ["m", pc.minor],
  ["dim", pc.dim],
  ["aug", pc.aug],
  ["sus2", pc.sus2],
  ["sus4", pc.sus4],
  ["7", pc.dom7],
  ["min7", pc.min7],
  ["maj7", pc.maj7],
  ["minmaj7", pc.minMaj7]
]);

const CHORDS_IN_SIZE_ORDER = [...CHORDS.keys()]
  .sort((a, b) => a.length - b.length)
  .reverse();
console.log(CHORDS_IN_SIZE_ORDER);

const oneOfRegex = arr => "(" + arr.join("|") + ")";
const CHORD_REGEX = new RegExp(
  oneOfRegex([...NOTES].reverse()) + oneOfRegex(CHORDS_IN_SIZE_ORDER) + "?",
  "g"
);

export function* parseText(text) {
  for (const chord of findAll(CHORD_REGEX, text)) {
    const [_, root, flavor] = chord;
    const chordFunc = CHORDS.get(flavor) || pc.major;
    const noteNum = NOTES.findIndex(note => note === root);
    yield chordFunc(noteNum);
  }
}
