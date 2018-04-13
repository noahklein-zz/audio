import React from "react";
import { withState, withHandlers, compose } from "recompact";
import styled from "styled-components";
// import { playSong } from "../sound/audio";
import pc from "../sound/pitch-class";
import { parseText } from "../sound/notes";
import { organ, instrument } from "../sound/instruments";

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

const Wrapper = styled.div`
  background-color: #c1dee8;
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
  border: 3px solid #5d4d4f;
  background-color: transparent;
  font-size: 12px;
  color: #322b26;
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
  color: #5d4d4f;
  border: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #5d4d4f;
    color: white;
  }
`;

// let _instrument = instrument;
let _instrument = organ;
const play = compose(song => _instrument.playSong(song, 4), parseText);

const enhance = compose(
  withState("text", "setText", DEFAULT_TEXT),
  withHandlers({
    onChange: props => e => props.setText(e.target.value),
    onSubmit: props => () => play(props.text)
  })
);

export default enhance(({ text, onChange, onSubmit }) => (
  <Wrapper>
    <Textarea value={text} onChange={onChange} rows={8} />
    <Button onClick={onSubmit}>Play</Button>
  </Wrapper>
));
