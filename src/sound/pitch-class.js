export default Object.entries({
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus4: [0, 5, 7],
  sus2: [0, 2, 7],
  dom7: [0, 4, 7, 10],
  min7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  minMaj7: [0, 3, 7, 11]
}).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [k]: chord(v)
  }),
  {}
);

function chord(pc) {
  return root => pc.map(n => root + n);
}
