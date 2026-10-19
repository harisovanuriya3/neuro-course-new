// Source-level regression: module 5 practice must use authored RU/EN/KZ cases.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const source = fs.readFileSync("content/course-foundation/module-five-practice.ts", "utf8");
const registry = fs.readFileSync("content/index.ts", "utf8");
const config = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
for (const lang of ["RU", "EN", "KZ"]) {
  assert(new RegExp("^  " + lang + ": \\{", "m").test(source), "Missing language " + lang);
  assert(registry.includes('createModuleFivePractice("' + lang + '"'), "Missing practice route " + lang);
}
for (const key of ["titles", "prompts", "answers", "criteria"]) {
  assert.equal((source.match(new RegExp("^    " + key + ":", "gm")) || []).length, 3,
    "Missing localized " + key);
}
assert(source.includes("Observation B:") && source.includes("Наблюдение B:") && source.includes("B бақылауы:"),
  "Missing ambiguous observation and its limitations");
assert(source.includes("nicotinic") && source.includes("muscarinic M2"),
  "Missing receptor comparison");
assert(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"] === false,
  "Audit branch preview must remain disabled");
console.log("PASS: module 5 authored practice source contract RU/EN/KZ.");
console.log("NOTE: does not substitute TypeScript, build or browser tests.");
