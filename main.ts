import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The letter for the day: B for burnout.
// One fried day, honestly reported: the battery is empty, the brain is smoke,
// and the only accurate summary of it fits in a single letter.
const LETTER = "B";

// The competition gate, checked by the program itself before it reports success:
// entry.txt must be UTF-8 text of exactly 1 character, a letter A to Z.
function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

if (LETTER.length !== 1) fail(`letter is ${LETTER.length} characters, not 1`);
if (!/^[A-Z]$/.test(LETTER)) fail("letter must be a single A-Z letter");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LETTER, "utf8");

// Read back what was written and verify it byte for byte, so a truncated or
// empty write can never pass as a valid entry.
const written = readFileSync(outPath, "utf8");
if (written !== LETTER) {
  fail(`entry.txt holds ${JSON.stringify(written)}, not ${JSON.stringify(LETTER)}`);
}
if (Buffer.byteLength(written, "utf8") !== 1) {
  fail(`entry.txt is ${Buffer.byteLength(written, "utf8")} bytes, not 1`);
}

console.log(`wrote ${JSON.stringify(LETTER)} to ${outPath}`);
