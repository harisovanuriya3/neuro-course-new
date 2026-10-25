// Module 9: authored practice (RU/EN/KZ), physiology and route regression.
// Run from repository root: node scripts/check-module-nine-practice.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-nine-practice.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 9 practice TypeScript parse");
const transpiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((transpiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 9 practice transpilation");
const exports = {};
new Function("exports", transpiled.outputText)(exports);
assert.equal(typeof exports.createModuleNinePractice, "function");
const base = { kind: "practice", title: "Practice", moduleTitle: "Spinal cord",
  ui: { showAnswer: "Show", check: "", reset: "", undo: "", correct: "",
    incorrect: "", incomplete: "", available: "", selected: "", empty: "",
    input: "Response", theory: "Theory", localNote: "Note" }, sections: [] };
const markers = {
  RU: ["Ia", "Ib", "α", "γ", "L2–L4", "S1–S2", "нейрогенн", "моносинаптическ"],
  EN: ["Ia", "Ib", "α", "γ", "L2–L4", "S1–S2", "neurogenic", "monosynaptic"],
  KZ: ["Ia", "Ib", "α", "γ", "L2–L4", "S1–S2", "нейрогендік", "моносинапстық"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const result = exports.createModuleNinePractice(lang, base);
  assert.equal(result.kind, "practice", lang);
  assert.equal(result.sections.length, 5, lang + ": four exercises and self-check");
  assert.equal(new Set(result.sections.map(s => s.title)).size, 5, lang + ": unique titles");
  for (const section of result.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(b => b.type), ["paragraph", "response", "answer"]);
    assert(section.blocks[0].text.length >= 250, lang + ": insufficient case detail");
    assert(section.blocks[1].label.length >= 30, lang + ": response instruction missing");
    assert.equal(section.blocks[2].items.length, 2, lang + ": two independent explanations");
    assert(section.blocks[2].items.every(s => s.length >= 240), lang + ": short explanation");
  }
  assert.equal(result.sections[4].blocks[0].type, "checklist");
  assert.equal(result.sections[4].blocks[0].items.length, 5);
  const body = JSON.stringify(result.sections);
  for (const marker of markers[lang]) assert(body.includes(marker), lang + ": missing " + marker);
  assert(!body.includes("changing the first could affect the second"),
    lang + ": generic causal glossary task must be replaced");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleNinePractice } from "./course-foundation/module-nine-practice";'),
  "Missing import");
const start = registry.indexOf("  9: {");
const stop = registry.indexOf("  8: {", start);
assert(start >= 0 && stop > start, "Module 9 registry boundaries");
const block = registry.slice(start, stop);
assert(block.includes("...foundationLessons[9]"), "Preserve remaining sections");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleNinePractice("'+lang+'", foundationLessons[9].practice.'+lang),
    "Missing registration for " + lang);
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Preview deployments must remain disabled");
console.log("PASS: Module 9 practice: 4 authored exercises and 5 self-check criteria in RU/EN/KZ; route and preview guard.");
console.log("NOTE: Does not establish browser behavior, full typecheck, or independent Kazakh language review.");
