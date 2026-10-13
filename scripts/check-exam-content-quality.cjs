// Static quality gate for the authored examination bank.
// Run from repository root: node scripts/check-exam-content-quality.cjs
// This checks structure and answer-option consistency, NOT medical correctness.
const fs = require("node:fs");
const assert = require("node:assert/strict");

const files = [
  ["content/reviewed-module-one-exam.ts", 6],
  ["content/reviewed-exam-items.ts", 12],
  ["content/additional-reviewed-exam-items.ts", 6],
  ["content/reviewed-pathway-exam-items.ts", 12],
  ["content/reviewed-advanced-exam-items.ts", 42],
  ["content/supplementary-reviewed-exam-items.ts", 21],
  ["content/supplementary-systems-exam-items.ts", 54],
  ["content/third-reviewed-exam-items.ts", 30],
  ["content/third-systems-exam-items.ts", 45],
];
const itemPattern = /\{\s*"?prompt"?\s*:\s*("(?:\\.|[^"\\])*")\s*,\s*"?correct"?\s*:\s*("(?:\\.|[^"\\])*")\s*,\s*"?wrong"?\s*:\s*\[\s*("(?:\\.|[^"\\])*")\s*,\s*("(?:\\.|[^"\\])*")\s*,\s*("(?:\\.|[^"\\])*")\s*\]\s*,\s*"?explanation"?\s*:\s*("(?:\\.|[^"\\])*")\s*\}/g;
const normalize = value => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const seen = new Map();
const defects = [];
let total = 0;

for (const [path, expected] of files) {
  const source = fs.readFileSync(path, "utf8");
  const parsed = [...source.matchAll(itemPattern)];
  const apparent = [...source.matchAll(/(?:prompt:|"prompt":)\s*"/g)].length;
  assert.equal(parsed.length, apparent, path + ": some items could not be parsed");
  assert.equal(parsed.length, expected, path + ": unexpected number of authored RU/EN/KZ cases");
  for (const match of parsed) {
    const [prompt, correct, wrong1, wrong2, wrong3, explanation] =
      match.slice(1).map(JSON.parse);
    total++;
    const choices = [correct, wrong1, wrong2, wrong3];
    const normalized = choices.map(normalize);
    if (prompt.trim().length < 35)
      defects.push(path + ": question too short: " + prompt);
    if (explanation.trim().length < 25)
      defects.push(path + ": explanation too short: " + prompt);
    if (choices.some(choice => choice.trim().length < 12))
      defects.push(path + ": incomplete option: " + prompt);
    if (new Set(normalized).size !== 4)
      defects.push(path + ": identical answer choices: " + prompt);
    if (seen.has(normalize(prompt)))
      defects.push(path + ": duplicate prompt, previously in " + seen.get(normalize(prompt)));
    seen.set(normalize(prompt), path);
  }
}
assert.equal(total, 228, "Expected 76 authored questions across RU/EN/KZ");
if (defects.length) {
  console.error(defects.join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS: 228 authored question variants; parsed all four distinct options and explanations.");
  console.log("NOTE: scientific accuracy, semantic overlap and translation quality require expert review.");
}
