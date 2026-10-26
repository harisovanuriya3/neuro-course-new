// Module 10 case contract: 3 independently authored scenarios in RU/EN/KZ.
// Run from repository root: node scripts/check-module-ten-cases.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-ten-cases.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 10 cases TS parse");
const compiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 10 cases transpilation");
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.createModuleTenCases, "function");
const markers = {
  RU: ["Эдингера", "NTS", "CVLM", "RVLM", "ретикуляр", "альтернатив"],
  EN: ["Edinger", "NTS", "CVLM", "RVLM", "reticular", "alternatives"],
  KZ: ["Эдингер", "NTS", "CVLM", "RVLM", "Ретикуляр", "балама"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = exported.createModuleTenCases(lang, "Brainstem", {});
  assert.equal(lesson.kind, "cases");
  assert.equal(lesson.cases.length, 3, lang + ": exactly 3 independent cases");
  assert.equal(new Set(lesson.cases.map(c => c.id)).size, 3, lang + ": duplicate IDs");
  assert(lesson.introduction.length >= 120, lang + ": short introduction");
  for (const c of lesson.cases) {
    assert(c.situation.length >= 250, lang + ": short situation in " + c.id);
    assert.equal(c.stages.length, 3, lang + ": missing reasoning stage");
    assert(c.stages.every(stage => stage.title.length >= 12 &&
      stage.questions.length === 1 && stage.questions[0].length >= 65),
      lang + ": short stage question in " + c.id);
    assert.equal(c.explanation.length, 2, lang + ": two explanatory paragraphs required");
    assert(c.explanation.every(p => p.length >= 240),
      lang + ": short mechanistic explanation in " + c.id);
  }
  const body = JSON.stringify(lesson);
  for (const marker of markers[lang])
    assert(body.includes(marker), lang + ": missing key physiology marker " + marker);
  assert(!body.includes("changes differently from the prediction"),
    lang + ": generic second case survived");
  assert(!body.includes("изменяется не так, как ожидалось"),
    lang + ": generic second case survived");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleTenCases } from "./module-ten-cases";'),
  "Module 10 authored cases import missing");
assert(assessment.includes('if (topic.id === 10) return createModuleTenCases(l, moduleTitle, ui(l));'),
  "Module 10 must override generic case factory");
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("return createFoundationCase("), "Foundation case route missing");
const registry = read("content/index.ts");
assert(registry.includes("foundationLessons[10]"), "Module 10 lesson registration missing");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must stay disabled");
console.log("PASS: module 10 cases: 3 authored brainstem cases × RU/EN/KZ, 9 stages and 6 explanatory paragraphs per language.");
console.log("NOTE: typecheck, runtime browser checks and independent Kazakh editing remain necessary.");
