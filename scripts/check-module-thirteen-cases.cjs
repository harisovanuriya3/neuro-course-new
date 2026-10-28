// Module 13 cerebellar case audit: 4 original cases × RU/EN/KZ × 3 stages.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-thirteen-cases.ts";
const source = read(path);
const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 13 cases TS parse");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, "Module 13 cases transpilation");
const exportsObject = {};
new Function("exports", compiled.outputText)(exportsObject);
assert.equal(typeof exportsObject.createModuleThirteenCases, "function");
const expected = ["target-dysmetria", "romberg-vision", "gaze-balance", "adaptation-aftereffect"].map(id => "m13-cerebellum-case-" + id);
const markers = {
  RU: ["дисметри", "сил", "ромберг", "проприоцеп", "нистагм", "адаптац", "диагноз"],
  EN: ["dysmetria", "strength", "romberg", "propriocept", "nystagmus", "adaptation", "diagnos"],
  KZ: ["дисметри", "күш", "ромберг", "проприоцеп", "нистагм", "бейімдел", "диагноз"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = exportsObject.createModuleThirteenCases(lang, "Cerebellum", {});
  assert.equal(lesson.kind, "cases");
  assert(lesson.introduction.length >= 170, lang + ": insufficient introduction");
  assert.deepEqual(lesson.cases.map(c => c.id), expected, lang + ": case IDs");
  for (const item of lesson.cases) {
    assert(item.situation.length >= 190, lang + ": short situation " + item.id);
    assert.equal(item.stages.length, 3, lang + ": three stages " + item.id);
    assert(item.stages.every(s => s.title.length >= 9 && s.questions.length === 1 && s.questions[0].length >= 65), lang + ": stage content " + item.id);
    assert.equal(item.explanation.length, 2, lang + ": two explanation paragraphs");
    assert(item.explanation.every(p => p.length >= 175), lang + ": short mechanism " + item.id);
  }
  const body = JSON.stringify(lesson).toLowerCase();
  for (const marker of markers[lang]) assert(body.includes(marker), lang + ": missing physiology marker " + marker);
  if (lang === "RU") assert(!/[әіңғүұқөһ]/i.test(body), "RU contains Kazakh-only characters");
  assert(!body.includes("changes differently from the prediction"), "generic case leaked");
  assert(!body.includes("изменяется не так, как ожидалось"), "generic case leaked");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { createModuleThirteenCases } from "./module-thirteen-cases";'), "module 13 case import missing");
assert(assessment.includes('if (topic.id === 13) return createModuleThirteenCases(l, moduleTitle, ui(l));'), "module 13 case dispatch missing");
const registry = read("content/index.ts");
assert(registry.includes("...foundationLessons[13]"), "module 13 registry missing");
const route = read("content/sections.ts");
assert(route.includes('slug: "cases"'), "cases route missing");
const renderer = read("components/SectionContent.tsx");
assert(renderer.includes('case "cases"'), "cases renderer missing");
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-thirteen-cases.cjs"), "test not registered");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false, "preview guard");
console.log("PASS: Module 13 cases: 4 × 3 languages × 3 reasoning stages; source, route, grading limits, preview guard.");
console.log("NOTE: independent Kazakh review, browser/voice/accessibility/E2E and 425-section acceptance still pending.");
