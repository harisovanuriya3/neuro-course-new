// Module 10 practice: authored brainstem mechanisms, three languages and route.
// Run from repository root: node scripts/check-module-ten-practice.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const file = "content/course-foundation/module-ten-practice.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Practice TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Practice transpilation");
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.createModuleTenPractice, "function");
const base = { kind: "practice", title: "Practice", moduleTitle: "Brainstem",
  ui: { showAnswer: "Show", check: "", reset: "", undo: "", correct: "",
    incorrect: "", incomplete: "", available: "", selected: "", empty: "",
    input: "Response", theory: "Theory", localNote: "Note" }, sections: [] };
const markers = {
  RU: ["II", "III", "V1", "VII", "претект", "PaCO₂", "ретикулоспинал"],
  EN: ["II", "III", "V1", "VII", "pretect", "PaCO₂", "reticulospinal"],
  KZ: ["II", "III", "V1", "VII", "претект", "PaCO₂", "ретикулоспинал"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const result = exported.createModuleTenPractice(lang, base);
  assert.equal(result.kind, "practice");
  assert.equal(result.sections.length, 5, lang + ": four exercises and self-check");
  assert.equal(new Set(result.sections.map(s => s.title)).size, 5, lang + ": unique sections");
  for (const section of result.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(b => b.type), ["paragraph", "response", "answer"]);
    assert(section.blocks[0].text.length >= 180, lang + ": insufficient case detail");
    assert(section.blocks[1].label.length >= 35, lang + ": response instruction");
    assert.equal(section.blocks[2].items.length, 2);
    assert(section.blocks[2].items.every(s => s.length >= 160), lang + ": insufficient mechanism");
  }
  assert.equal(result.sections[4].blocks[0].type, "checklist");
  assert.equal(result.sections[4].blocks[0].items.length, 5);
  const body = JSON.stringify(result.sections);
  for (const marker of markers[lang]) assert(body.includes(marker), lang + ": missing " + marker);
  assert(!body.includes("changing the first could affect the second"),
    lang + ": generic glossary exercise not replaced");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleTenPractice } from "./course-foundation/module-ten-practice";'),
  "Missing practice import");
const start = registry.indexOf("  10: {");
const stop = registry.indexOf("  9: {", start);
assert(start >= 0 && stop > start, "Module 10 registry boundaries");
const block = registry.slice(start, stop);
assert(block.includes("...foundationLessons[10]"), "Other module sections must remain intact");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleTenPractice("'+lang+'", foundationLessons[10].practice.'+lang),
    "Missing "+lang+" registration");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must remain disabled");
console.log("PASS: module 10 practice, 4 cases + 5 self-check items in RU/EN/KZ, registry and preview guard.");
console.log("NOTE: structural checks do not establish independent clinical or Kazakh translation review.");
