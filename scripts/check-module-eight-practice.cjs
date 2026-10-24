// Module 8 authored practice: executable trilingual content and route regression.
// Run from repository root: node scripts/check-module-eight-practice.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = file => fs.readFileSync(file, "utf8");
const file = "content/course-foundation/module-eight-practice.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 practice TS parse");
const transpiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((transpiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", transpiled.outputText)(exported);
assert.equal(typeof exported.createModuleEightPractice, "function");
const base = { kind: "practice", title: "Practice", moduleTitle: "Pathways",
  ui: { showAnswer: "Show", check: "", reset: "", undo: "", correct: "",
    incorrect: "", incomplete: "", available: "", selected: "", empty: "",
    input: "Response", theory: "Theory", localNote: "Note" }, sections: [] };
const markers = {
  RU: ["Лиссауэр", "медиальная петля", "пирамид", "камертон"],
  EN: ["Lissauer", "medial lemniscus", "pyramidal", "tuning fork"],
  KZ: ["Лиссауэр", "медиалдық ілмек", "пирамид", "камертон"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const result = exported.createModuleEightPractice(lang, base);
  assert.equal(result.kind, "practice");
  assert.equal(result.sections.length, 5, lang + ": four tasks and checklist");
  assert.equal(new Set(result.sections.map(s => s.title)).size, 5, lang + ": distinct titles");
  for (const section of result.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(b => b.type), ["paragraph", "response", "answer"]);
    assert(section.blocks[0].text.length > 220, lang + ": short task");
    assert(section.blocks[1].label.length > 15, lang + ": missing response prompt");
    assert.equal(section.blocks[2].items.length, 2);
    assert(section.blocks[2].items.every(s => s.length > 150), lang + ": short answer");
  }
  assert.equal(result.sections[4].blocks[0].type, "checklist");
  assert.equal(result.sections[4].blocks[0].items.length, 5);
  const body = JSON.stringify(result.sections);
  for (const marker of markers[lang])
    assert(body.includes(marker), lang + ": missing " + marker);
  assert(!body.includes("changing the first could affect the second"),
    "Generic causal-glossary prompt must be replaced");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleEightPractice } from "./course-foundation/module-eight-practice";'));
const start = registry.indexOf("  8: {");
const stop = registry.indexOf("  7: {", start);
assert(start >= 0 && stop > start, "Module 8 registry boundaries");
const block = registry.slice(start, stop);
assert(block.includes("...foundationLessons[8]"), "Preserve other sections");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleEightPractice("'+lang+'", foundationLessons[8].practice.'+lang),
    "Missing practice registration " + lang);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "No Vercel preview on review branch");
console.log("PASS: Module 8 practice 4 authored tasks × RU/EN/KZ, 5 criteria per language, route and preview guard.");
console.log("NOTE: transpilation/runtime checks do not replace typecheck, browser or independent translation review.");
