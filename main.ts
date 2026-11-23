import * as fs from "node:fs";

// One letter for the day: B, the initial of burnout.
// The day was a flat battery and a fried brain, and this single letter is
// the honest summary of it. The judge reads the letter and hears the word
// behind it.
const DAY_LETTER = "B";

function abort(reason: string): never {
  console.error("entry rejected: " + reason);
  process.exit(1);
}

function isSingleCapitalLetter(text: string): boolean {
  if (text.length !== 1) return false;
  const code = text.charCodeAt(0);
  return code >= 65 && code <= 90;
}

if (!isSingleCapitalLetter(DAY_LETTER)) {
  abort("the entry must be exactly one capital letter from A to Z");
}

const outDir = process.env["MAKEFUN_OUTPUT_DIR"] ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = outDir + "/entry.txt";
fs.writeFileSync(outPath, DAY_LETTER, "utf8");

// Confirm the file on disk is exactly what was intended, so a short or
// empty write can never be mistaken for a valid entry.
const stored = fs.readFileSync(outPath, "utf8");
if (stored !== DAY_LETTER) {
  abort("entry.txt does not hold the chosen letter");
}
const storedBytes = Buffer.byteLength(stored, "utf8");
if (storedBytes !== 1) {
  abort("entry.txt is " + storedBytes + " bytes, expected 1");
}

console.log("entry written: " + JSON.stringify(DAY_LETTER) + " -> " + outPath);
