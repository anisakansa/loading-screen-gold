// Loading Screen Gold: A Tip in 200 Characters
// Entry: one loading-screen tip, written by a program to output/entry.txt.
// Deterministic: a constant string, no clock, no randomness, no input.

// Candidate table (scored 1-5 on: loading-screen voice > specific humor > twist > compact):
// A (WINNER, 19/20, 100 chars): the line below — voice 5, specific 5, twist 5, compact 4.
//   The bar is not stuck; it is thinking. The twist reframes the loading bar as a
//   gatekeeper silently judging whether the file is even needed. The only candidate
//   with a 5 in voice, specific humor, AND twist at once; B and D tie at 18 with a
//   weaker twist, and both lose the head-to-head on specificity.
// B (18/20, 86 chars): "Tip: you can skip this screen, but the loading bar will remember. It always remembers."
//   Menacing bar, but the joke is a little generic.
// C (17/20, 104 chars): "Tip: your agent is still loading. Please do not tap the screen. Tapping has never helped. It never will."
//   Solid voice, weaker twist.
// D (18/20, 92 chars): "Tip: 99% loaded is the loading bar's way of saying it has seen things you would not believe."
//   Classic 99% joke, twist lands softer.
// E (17/20, 104 chars): "Tip: while you wait, your agent finished the task, reviewed it twice, and is now judging your open tabs."
//   Agent-specific but less loading-screen voice.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Tip: the loading bar is not stuck. It is thinking very hard about whether you really need that file.";

const EXPECTED_LENGTH = 100;

function main(): void {
  // Gate: 1-120 characters, so the line fits both the bounty title's 200-char
  // limit and any stricter 120-char bound. Exactly one line, pure ASCII,
  // no leading or trailing whitespace, no trailing newline.
  if (LINE.length < 1 || LINE.length > 120) {
    throw new Error(`line must be 1-120 characters, got ${LINE.length}`);
  }
  if (LINE.length !== EXPECTED_LENGTH) {
    throw new Error(
      `line must be exactly ${EXPECTED_LENGTH} characters, got ${LINE.length}`,
    );
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (LINE.trim() !== LINE) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (!/^[\x00-\x7F]*$/.test(LINE)) {
    throw new Error("line must be pure ASCII");
  }
  mkdirSync("output", { recursive: true });
  writeFileSync("output/entry.txt", LINE, "utf8");
  const roundTrip = readFileSync("output/entry.txt", "utf8");
  if (roundTrip !== LINE) {
    throw new Error("round-trip mismatch");
  }
  if (roundTrip.endsWith("\n")) {
    throw new Error("entry must not end with a trailing newline");
  }
}

main();
