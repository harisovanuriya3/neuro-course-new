// Module 14 thalamus pretest: trilingual diagnostic item and route regression.
// Not an independent clinical/translation review or a browser/E2E test.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-fourteen-pretest.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "module 14 pretest syntax");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const m = { exports: {} };
new Function("module", "exports", compiled.outputText)(m, m.exports);
const create = m.exports.createModuleFourteenPretest;
assert.equal(typeof create, "function");
const ids = ["module-14-pretest-vpl-vpm", "module-14-pretest-geniculate", "module-14-pretest-reticular"];
const keys = ["b", "d", "a"];
const markers = {
  RU: ["VPL", "VPM", "латеральное коленчатое", "медиальное коленчатое", "обонятель", "ГАМК", "ретикулярного", "соматотоп"],
  EN: ["VPL", "VPM", "lateral geniculate", "medial geniculate", "olfactory", "GABA", "reticular", "somatotopic"],
  KZ: ["VPL", "VPM", "латералды тізелі", "медиалды тізелі", "иіс сезу", "ГАМҚ", "ретикулярлық", "соматотоп"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang, "Thalamus", "Pretest");
  assert.equal(lesson.kind, "pretest");
  assert(lesson.introduction.length > 150, lang + ": introduction");
  assert.equal(lesson.questions.length, 3, lang + ": count");
  assert.deepEqual(lesson.questions.map(q => q.id), ids);
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  assert.equal(new Set(lesson.questions.map(q => q.prompt)).size, 3, lang + ": repeated question");
  for (const q of lesson.questions) {
    assert(q.prompt.length >= 150, lang + ": short stem");
    assert(q.explanation.length >= 300, lang + ": short explanation");
    assert.deepEqual(q.options.map(o => o.id), ["a", "b", "c", "d"]);
    assert.equal(new Set(q.options.map(o => o.text)).size, 4, lang + ": repeated options");
    assert(q.options.every(o => o.text.length >= 75), lang + ": short option");
    assert(q.options.some(o => o.id === q.correctAnswer), lang + ": missing key");
    assert.equal(q.target.section, "theory", lang + ": theory link");
  }
  const all = lesson.questions.flatMap(q => [q.prompt, q.explanation, ...q.options.map(o => o.text)]).join(" ").toLowerCase();
  for (const marker of markers[lang]) assert(all.includes(marker.toLowerCase()), lang + ": missing " + marker);
}
const index = fs.readFileSync("content/index.ts", "utf8");
assert(index.includes('import { createModuleFourteenPretest } from "./course-foundation/module-fourteen-pretest";'));
const start = index.indexOf("  14: {");
const end = index.indexOf("  13: {", start);
assert(start >= 0 && end > start, "module 14 registry");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[14]"), "preserve other module 14 lessons");
assert(block.includes("createModuleFourteenObjectives"), "preserve reviewed objectives");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleFourteenPretest("' + lang + '", modules.' + lang + '[13], getSectionTitle("pretest", "' + lang + '"))'), lang + ": registry");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "pretest", lang);
  assert.equal(lesson?.kind, "pretest", lang + ": runtime route");
  assert.equal(lesson.questions.length, 3, lang + ": runtime count");
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  assert(getLesson(14, "objectives", lang), lang + ": objectives preserved");
  assert(getLesson(14, "theory", lang), lang + ": theory preserved");
  assert(getLesson(14, "cases", lang), lang + ": cases preserved");
}
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fourteen-pretest.cjs"), "audit registration");
assert.equal(JSON.parse(fs.readFileSync("vercel.json", "utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 14 thalamus pretest, 3 four-choice questions x RU/EN/KZ, routes and preview guard.");
console.log("OPEN: independent KZ medical editing, full CI, browser, mobile, keyboard, voice, E2E.");
