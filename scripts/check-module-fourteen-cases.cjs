// Module 14 thalamus cases: localized reasoning, routes, and no unsupported clinical claims.
// Static/Node contract only: independent medical KZ, browser and E2E remain open.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-fourteen-cases.ts";
const source = read(path);
const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 14 cases TypeScript parse error");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, "Module 14 cases transpile error");
const exportsObject = {};
new Function("exports", compiled.outputText)(exportsObject);
assert.equal(typeof exportsObject.createModuleFourteenCases, "function");
const ids = ["crossed-spinal-modalities", "face-body-relays", "reticular-inhibition", "sensory-exceptions"].map(id => "m14-thalamus-case-" + id);
const markers = {
  RU: ["таламус", "vpl", "vpm", "глутамат", "гамк", "коленчат", "обонятель", "перекр"],
  EN: ["thalam", "vpl", "vpm", "glutamate", "gaba", "geniculate", "olfact", "cross"],
  KZ: ["таламус", "vpl", "vpm", "глутамат", "гамқ", "тізелі", "иіс сезу", "айқас"],
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = exportsObject.createModuleFourteenCases(lang, "Thalamus", {});
  assert.equal(lesson.kind, "cases");
  assert(lesson.introduction.length > 175, lang + ": short introduction");
  assert.deepEqual(lesson.cases.map(c => c.id), ids, lang + ": case IDs");
  for (const item of lesson.cases) {
    assert(item.situation.length > 190, lang + ": short situation " + item.id);
    assert.equal(item.stages.length, 3, lang + ": stage count " + item.id);
    assert(item.stages.every(s => s.title.length >= 5 && s.questions.length === 1 && s.questions[0].length >= 65), lang + ": missing staged question " + item.id);
    assert.equal(item.explanation.length, 2, lang + ": explanation count " + item.id);
    assert(item.explanation.every(p => p.length >= 175), lang + ": explanation length " + item.id);
  }
  const body = JSON.stringify(lesson).toLowerCase();
  for (const marker of markers[lang]) assert(body.includes(marker), lang + ": missing marker " + marker);
  assert(!body.includes("changes differently from the prediction"), "Generic template leaked");
  if (lang === "RU") assert(!/[әіңғүұқөһ]/i.test(body), "Kazakh-only letters in RU");
  assert(body.includes(lang === "RU" ? "не означает автоматическую" : lang === "EN" ? "does not constitute automatic" : "автоматты бағаламайды"), lang + ": grading limitation missing");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleFourteenCases } from "./module-fourteen-cases";'));
assert(assessment.includes('if (topic.id === 14) return createModuleFourteenCases(l, moduleTitle, ui(l));'));
const registry = read("content/index.ts");
assert(registry.includes("...foundationLessons[14]"), "Module 14 foundation not preserved");
for (const section of ["practice:", "clinical:", '"one-minute":', "theory:", "pretest:", "objectives:"]) assert(registry.includes(section), "Reviewed route missing: " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "cases", lang);
  assert.equal(lesson?.kind, "cases", lang + ": route kind");
  assert.equal(lesson.cases.length, 4, lang + ": case route count");
}
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-fourteen-cases.cjs"), "Audit registration missing");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false, "Preview guard");
console.log("PASS: Module 14 cases: four thalamic scenarios x three languages x three reasoning stages; route and preview guard.");
console.log("OPEN: independent KZ medical review; full CI, browser, mobile, voice, keyboard and E2E.");
