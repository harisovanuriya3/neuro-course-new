// Module 8 cases: executable trilingual clinical reasoning contract.
// Run from repository root: node scripts/check-module-eight-cases.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-eight-cases.ts";
const source = read(path);
const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 8 cases TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.createModuleEightCases, "function");
const markers = {
  RU: ["Лиссауэр", "медиальная петля", "пирамид", "камертон"],
  EN: ["Lissauer", "medial lemniscus", "pyramidal", "tuning fork"],
  KZ: ["Лиссауэр", "медиалдық ілмек", "пирамид", "камертон"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const result = exported.createModuleEightCases(lang, "Pathways", {});
  assert.equal(result.kind, "cases");
  assert.equal(result.cases.length, 3, lang + ": case count");
  assert.equal(new Set(result.cases.map(c => c.id)).size, 3, lang + ": duplicate ids");
  assert(result.introduction.length > 60, lang + ": missing introduction");
  for (const c of result.cases) {
    assert(c.situation.length > 200, lang + ": situation too short");
    assert.equal(c.stages.length, 3, lang + ": stage count");
    for (const stage of c.stages) {
      assert(stage.title.length > 8);
      assert.equal(stage.questions.length, 1);
      assert(stage.questions[0].length > 40, lang + ": question too short");
    }
    assert.equal(c.explanation.length, 2);
    assert(c.explanation.every(x => x.length > 170), lang + ": explanation too short");
  }
  const body = JSON.stringify(result.cases);
  for (const marker of markers[lang])
    assert(body.includes(marker), lang + ": missing " + marker);
  assert(!body.includes("changes differently from the prediction"),
    lang + ": generic follow-up still present");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleEightCases } from "./module-eight-cases";'));
assert(assessment.includes('if (topic.id === 8) return createModuleEightCases(l, moduleTitle, ui(l));'));
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("return createFoundationCase("), "Foundation cases route missing");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must stay disabled");
console.log("PASS: module 8 cases: 3 authored vignettes, 9 stages, 6 explanations × RU/EN/KZ; route and preview guard.");
console.log("NOTE: transpilation is not a complete typecheck, browser test or independent language review.");
