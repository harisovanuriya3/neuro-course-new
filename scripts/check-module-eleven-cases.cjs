// Module 11: authored motor-control case coverage and route contract.
// Run from repo root: node scripts/check-module-eleven-cases.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-eleven-cases.ts";
const source = read(file);
const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 11 cases TS parse");
const compiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 11 cases TS transpilation");
const moduleExports = {};
new Function("exports", compiled.outputText)(moduleExports);
assert.equal(typeof moduleExports.createModuleElevenCases, "function");
const markers = {
  RU: ["зрительн", "проприоцепц", "пирамидн", "гиперрефлекс", "ретикулоспинал", "вестибулоспинал", "давления"],
  EN: ["visual", "proprioception", "pyramidal", "hyperreflexia", "reticulospinal", "vestibulospinal", "pressure"],
  KZ: ["көру", "проприоцепц", "пирамидалық", "гиперрефлексия", "ретикулоспинал", "вестибулоспинал", "қысым"]
};
const expectedIds = [
  "m11-motor-case-visual-target-shift",
  "m11-motor-case-acute-versus-late-upper-motor-neuron",
  "m11-motor-case-postural-adjustment-and-reach"
];
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = moduleExports.createModuleElevenCases(lang, "Motor control", {});
  assert.equal(lesson.kind, "cases");
  assert(lesson.introduction.length >= 140, lang + ": missing meaningful introduction");
  assert.deepEqual(lesson.cases.map(c => c.id), expectedIds, lang + ": case IDs/ordering");
  for (const item of lesson.cases) {
    assert(item.title.length >= 15, lang + ": short title");
    assert(item.situation.length >= 280, lang + ": short situation in " + item.id);
    assert.equal(item.stages.length, 3, lang + ": need 3 reasoning stages");
    assert(item.stages.every(stage => stage.title.length >= 12 &&
      stage.questions.length === 1 && stage.questions[0].length >= 90),
      lang + ": missing question in " + item.id);
    assert.equal(item.explanation.length, 2, lang + ": need two explanation parts");
    assert(item.explanation.every(text => text.length >= 270),
      lang + ": insufficient mechanism/limits in " + item.id);
  }
  const body = JSON.stringify(lesson).toLowerCase();
  for (const marker of markers[lang]) assert(body.includes(marker.toLowerCase()),
    lang + ": missing subject marker " + marker);
  assert(!body.includes("changes differently from the prediction"), "Generic case leaked");
  assert(!body.includes("изменяется не так, как ожидалось"), "Generic case leaked");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleElevenCases } from "./module-eleven-cases";'),
  "Authored module 11 case import missing");
assert(assessment.includes('if (topic.id === 11) return createModuleElevenCases(l, moduleTitle, ui(l));'),
  "Module 11 cases still use generic factory");
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("return createFoundationCase("), "Foundation cases must use dispatch");
const registry = read("content/index.ts");
assert(registry.includes("...foundationLessons[11]"), "Module 11 registry missing");
const routes = read("content/sections.ts");
assert(routes.includes('slug: "cases"'), "Case route missing");
const renderer = read("components/SectionContent.tsx");
assert(renderer.includes('case "cases"'), "Case renderer missing");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch preview must remain disabled");
console.log("PASS: module 11 cases: 3 independent clinical scenarios × RU/EN/KZ, 27 stage questions, 18 explanatory paragraphs, route and preview lock.");
console.log("NOTE: browser behavior, TypeScript project typecheck, full build and independent KZ editing still required.");
