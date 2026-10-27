// Module 12: authored basal-ganglia cases, multilingual physiological contract.
// Run from repository root: node scripts/check-module-twelve-cases.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-twelve-cases.ts";
const source = read(file);
const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 12 cases TS parse");
const compiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 12 cases TS transpilation");
const exportsObject = {};
new Function("exports", compiled.outputText)(exportsObject);
assert.equal(typeof exportsObject.createModuleTwelveCases, "function");
const ids = [
  "m12-basal-case-direct-indirect-model",
  "m12-basal-case-hyperdirect-conflict",
  "m12-basal-case-cue-and-sequence"
];
const markers = {
  RU: ["стриатум", "таламус", "гиперпрям", "брадикинез", "сил", "диагноз"],
  EN: ["striatum", "thalamus", "hyperdirect", "bradykinesia", "strength", "diagnos"],
  KZ: ["стриатум", "таламус", "гипертікелей", "брадикинезия", "күш", "диагноз"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = exportsObject.createModuleTwelveCases(lang, "Basal ganglia", {});
  assert.equal(lesson.kind, "cases");
  assert(lesson.introduction.length >= 170, lang + ": insufficient introduction");
  assert.deepEqual(lesson.cases.map(c => c.id), ids, lang + ": case IDs");
  for (const item of lesson.cases) {
    assert(item.situation.length >= 200, lang + ": short situation " + item.id);
    assert.equal(item.stages.length, 3, lang + ": three reasoning stages");
    assert(item.stages.every(stage => stage.title.length >= 10 &&
      stage.questions.length === 1 && stage.questions[0].length >= 65),
      lang + ": incomplete stage in " + item.id);
    assert.equal(item.explanation.length, 2, lang + ": two explanatory paragraphs");
    assert(item.explanation.every(paragraph => paragraph.length >= 180),
      lang + ": insufficient physiological explanation");
  }
  const body = JSON.stringify(lesson).toLowerCase();
  for (const marker of markers[lang]) assert(body.includes(marker.toLowerCase()),
    lang + ": missing mechanism/limit " + marker);
  assert(!body.includes("changes differently from the prediction"), "Generic template leaked");
  assert(!body.includes("изменяется не так, как ожидалось"), "Generic template leaked");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleTwelveCases } from "./module-twelve-cases";'),
  "Authored cases import missing");
assert(assessment.includes('if (topic.id === 12) return createModuleTwelveCases(l, moduleTitle, ui(l));'),
  "Module 12 cases still use generic factory");
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("return createFoundationCase("), "Foundation dispatch absent");
const registry = read("content/index.ts");
assert(registry.includes("...foundationLessons[12]"), "Module 12 registry missing");
const routes = read("content/sections.ts");
assert(routes.includes('slug: "cases"'), "Case route missing");
const renderer = read("components/SectionContent.tsx");
assert(renderer.includes('case "cases"'), "Case renderer missing");
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-twelve-cases.cjs"),
  "Module 12 cases test missing from audit");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch preview must remain disabled");
console.log("PASS: module 12 cases: 3 scenarios × 3 languages × 3 stages, mechanisms, route and preview guard.");
console.log("NOTE: full project typecheck/build, browser, mobile, keyboard, audio and independent KZ review remain necessary.");
