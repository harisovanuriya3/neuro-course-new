// Cerebellar pretest, module 13: scientific structure and route regression.
// This is not an independent clinical, translation, browser or accessibility review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-thirteen-pretest.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "module 13 pretest syntax");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const m = { exports: {} };
new Function("module", "exports", compiled.outputText)(m, m.exports);
const create = m.exports.createModuleThirteenPretest;
assert.equal(typeof create, "function", "module 13 pretest factory");
const ids = ["module-13-pretest-purkinje", "module-13-pretest-feedback", "module-13-pretest-dysmetria"];
const keys = ["c", "a", "d"];
const markers = {
  RU: ["Пуркинье", "ГАМК", "мшист", "лазающ", "проприоцеп", "дисметри", "интенцион", "сил"],
  EN: ["Purkinje", "GABA", "mossy", "climbing", "propriocept", "dysmetria", "intention", "strength"],
  KZ: ["Пуркинье", "ГАМҚ", "мүкті", "өрмелеуші", "проприоцеп", "дисметрия", "интенциялық", "күш"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang, "Cerebellum", "Pretest");
  assert.equal(lesson.kind, "pretest");
  assert(lesson.introduction.length >= 150, lang + ": introduction");
  assert.equal(lesson.questions.length, 3, lang + ": count");
  assert.deepEqual(lesson.questions.map(q => q.id), ids);
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  assert.equal(new Set(lesson.questions.map(q => q.prompt)).size, 3, lang + ": duplicate prompt");
  for (const q of lesson.questions) {
    assert(q.prompt.length >= 110, lang + ": prompt");
    assert(q.explanation.length >= 240, lang + ": explanation");
    assert.equal(q.options.length, 4, lang + ": options");
    assert.deepEqual(q.options.map(o => o.id), ["a", "b", "c", "d"]);
    assert.equal(new Set(q.options.map(o => o.text)).size, 4, lang + ": repeated option");
    assert(q.options.every(o => o.text.length >= 65), lang + ": short distractor");
    assert(q.options.some(o => o.id === q.correctAnswer), lang + ": missing key");
    assert.equal(q.target.section, "theory");
  }
  const all = lesson.questions.flatMap(q => [q.prompt, q.explanation]).join(" ").toLowerCase();
  for (const marker of markers[lang]) assert(all.includes(marker.toLowerCase()), lang + ": missing " + marker);
  assert(!/diagnosis is confirmed|диагноз установлен|диагноз расталды/i.test(all), lang + ": diagnostic overclaim");
}
const index = fs.readFileSync("content/index.ts", "utf8");
assert(index.includes('import { createModuleThirteenPretest } from "./course-foundation/module-thirteen-pretest";'));
const start = index.indexOf("  13: {");
const end = index.indexOf("  12: {", start);
assert(start >= 0 && end > start, "module 13 registry");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[13]"), "preserve other sections");
assert(block.includes("createModuleThirteenObjectives"), "preserve reviewed objectives");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes('createModuleThirteenPretest("' + lang + '", modules.' + lang + '[12], getSectionTitle("pretest", "' + lang + '"))'), lang + ": registry");
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(13, "pretest", lang);
  assert.equal(lesson?.kind, "pretest", lang + ": route");
  assert.equal(lesson.questions.length, 3, lang + ": route count");
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  assert(getLesson(13, "objectives", lang), lang + ": objectives preserved");
  assert(getLesson(13, "theory", lang), lang + ": theory preserved");
}
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-thirteen-pretest.cjs"), "science audit registration");
assert.equal(JSON.parse(fs.readFileSync("vercel.json", "utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 13 pretest, three four-choice items in RU/EN/KZ, routes, preview disabled.");
console.log("OPEN: complete CI, TypeScript, build, browser, independent KZ medical editing.");
