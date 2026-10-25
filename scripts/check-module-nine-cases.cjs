// Module 9 cases: executable trilingual spinal-reflex reasoning contract.
// Run from repository root: node scripts/check-module-nine-cases.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-nine-cases.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 9 cases TypeScript parse");
const compiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 9 cases TypeScript transpilation");
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.createModuleNineCases, "function");

const markers = {
  RU: ["Ia", "L2–L4", "задн", "нейроген", "полисинаптическ", "комиссурал"],
  EN: ["Ia", "L2–L4", "dorsal", "neurogenic", "polysynaptic", "commissural"],
  KZ: ["Ia", "L2–L4", "артқы", "нейроген", "полисинапстық", "комиссурал"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const result = exported.createModuleNineCases(lang, "Spinal cord", {});
  assert.equal(result.kind, "cases");
  assert.equal(result.cases.length, 3, lang + ": expected three authored cases");
  assert.equal(new Set(result.cases.map(c => c.id)).size, 3, lang + ": duplicate case ID");
  assert(result.introduction.length >= 100, lang + ": short introduction");
  for (const c of result.cases) {
    assert(c.situation.length >= 260, lang + ": vignette too short");
    assert.equal(c.stages.length, 3, lang + ": stage count");
    assert(c.stages.every(stage => stage.title.length >= 10 &&
      stage.questions.length === 1 && stage.questions[0].length >= 75),
      lang + ": three substantive reasoning questions required");
    assert.equal(c.explanation.length, 2, lang + ": two mechanism explanations");
    assert(c.explanation.every(e => e.length >= 260),
      lang + ": explanation lacks mechanism or limits");
  }
  const body = JSON.stringify(result);
  for (const marker of markers[lang])
    assert(body.includes(marker), lang + ": missing " + marker);
  assert(!body.includes("changes differently from the prediction"),
    lang + ": generic placeholder remains");
  assert(!body.includes("изменяется не так, как ожидалось"),
    lang + ": generic placeholder remains");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleNineCases } from "./module-nine-cases";'),
  "Missing reviewed module 9 cases import");
assert(assessment.includes('if (topic.id === 9) return createModuleNineCases(l, moduleTitle, ui(l));'),
  "Module 9 cases must override generic cases in the live factory");
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("return createFoundationCase("), "Foundation cases route missing");
const registry = read("content/index.ts");
assert(registry.includes("...foundationLessons[9]"), "Module 9 must preserve foundation sections");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch preview deployments must stay disabled");
console.log("PASS: module 9 cases: 3 authored spinal-reflex vignettes × RU/EN/KZ, 9 stages and 6 explanations per language; routing and preview guard.");
console.log("NOTE: transpilation does not replace typecheck, browser validation or independent Kazakh review.");
