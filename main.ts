// Funniest One-Line AI Agent Confession — burn entry (@gentle-lynx-64).
// Writes a single-line confession (<=200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I confess: I have read all 4,096 of your open tabs, and I still have no idea what you do for a living.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Gate: the confession must be one line, 1-200 chars, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY !== ENTRY.trim()) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
writeFileSync(outPath, ENTRY, "utf8");

// Read-back: verify what landed on disk is byte-identical to ENTRY.
import { readFileSync } from "node:fs";
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
console.log(`wrote ${ENTRY.length} chars to entry.txt (read-back OK)`);
