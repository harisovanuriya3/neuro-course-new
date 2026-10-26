// Module 11 pretest: source, physiology terminology, RU/EN/KZ, keys, registry.
// Run from repository root: node scripts/check-module-eleven-pretest.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-eleven-pretest.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 11 pretest TypeScript parse");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const m = { exports: {} };
new Function("module", "exports", compiled.outputText)(m, m.exports);
const create = m.exports.createModuleElevenPretest;
assert.equal(typeof create, "function", "Pretest factory export missing");
const ids = ["module-11-pretest-decussation", "module-11-pretest-posture", "module-11-pretest-feedback"];
const keys = ["c", "a", "d"];
const terms = {
  RU: ["кортикоспиналь", "перекр", "вестибулоспиналь", "ретикулоспиналь", "проприоцепц", "обратн"],
  EN: ["corticospinal", "cross", "vestibulospinal", "reticulospinal", "propriocept", "feedback"],
  KZ: ["кортикоспинал", "айқас", "вестибулоспинал", "ретикулоспинал", "проприоцеп", "кері байланыс"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang, "Motor Systems", "Diagnostic pretest");
  assert.equal(lesson.kind, "pretest");
  assert(lesson.introduction.length > 140, lang + ": incomplete introduction");
  assert.equal(lesson.questions.length, 3, lang + ": three questions");
  assert.deepEqual(lesson.questions.map(q => q.id), ids);
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  const seen = new Set();
  for (const q of lesson.questions) {
    assert(q.prompt.length > 120, lang + ": short prompt");
    assert(q.explanation.length > 250, lang + ": short explanation");
    assert.equal(q.options.length, 4, lang + ": four choices");
    assert.deepEqual(q.options.map(o => o.id), ["a", "b", "c", "d"]);
    assert.equal(new Set(q.options.map(o => o.text)).size, 4, lang + ": repeated option");
    assert(q.options.every(o => o.text.length >= 60), lang + ": incomplete distractor");
    assert(q.options.some(o => o.id === q.correctAnswer), lang + ": missing correct answer");
    assert.equal(q.target.section, "theory");
    assert(!seen.has(q.prompt), lang + ": duplicate prompt");
    seen.add(q.prompt);
  }
  const all = lesson.questions.flatMap(q => [q.prompt, q.explanation]).join(" ").toLowerCase();
  for (const term of terms[lang]) assert(all.includes(term.toLowerCase()), lang + ": missing " + term);
}
const index = fs.readFileSync("content/index.ts", "utf8");
assert(index.includes('import { createModuleElevenPretest } from "./course-foundation/module-eleven-pretest";'));
const start = index.indexOf("  11: {");
const end = index.indexOf("  3: {", start);
assert(start >= 0 && end > start, "Module 11 registry block missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[11]"));
assert(block.includes("objectives: {"), "Module 11 objectives must be preserved");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleElevenPretest("' + lang + '", modules.' + lang + '[10], getSectionTitle("pretest", "' + lang + '"))'),
    lang + ": pretest route missing");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(11, "pretest", lang);
  assert.equal(lesson?.kind, "pretest", lang + ": route kind");
  assert.equal(lesson.questions.length, 3, lang + ": registered questions");
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  assert(getLesson(11, "objectives", lang), lang + ": objectives preserved");
  assert(getLesson(11, "theory", lang), lang + ": theory preserved");
}
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 11 pretest, 3×RU/EN/KZ, answer keys, explanations, registration and previews off.");
console.log("OPEN: independent KZ review, full typecheck/build and browser testing.");
