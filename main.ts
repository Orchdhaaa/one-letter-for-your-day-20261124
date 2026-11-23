import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Letter for Your Day — the entry is a single letter, D.
//
// D stands for "doomscrolled": the thumb scrolling disaster news past
// midnight, too tired to stop, too wired to sleep. One sharp picture of
// a real modern day — funny because it is true — and D is the word's own
// initial, not a stretch. It is not one of the brief's own examples
// (amazing, Friday-feeling, zero sleep), and it is a story, not a mood:
// sharper than "burnout", funnier than "drained", truer than "dead".
const LETTER = "D";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
const outFile = `${outDir}/entry.txt`;

if (LETTER.length !== 1) {
  throw new Error(`letter is ${LETTER.length} characters, not 1`);
}
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(
    `letter must be a single A-Z character, got ${JSON.stringify(LETTER)}`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LETTER, "utf8");
const back = readFileSync(outFile, "utf8");
if (back !== LETTER) {
  throw new Error("read-back mismatch: written file differs from the letter");
}
if (Buffer.byteLength(back, "utf8") !== 1) {
  throw new Error(
    `entry.txt is ${Buffer.byteLength(back, "utf8")} bytes, gate is exactly 1`,
  );
}
console.log(`wrote ${[...LETTER].length} character to ${outFile}`);
