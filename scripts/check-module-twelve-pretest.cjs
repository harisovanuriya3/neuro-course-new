// Module 12 basal ganglia pretest: science/translation/route regression.
// Run from repository root: node scripts/check-module-twelve-pretest.cjs
// This is source and runtime-structure validation, not independent medical review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-twelve-pretest.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 12 pretest TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const m = { exports: {} };
new Function("module", "exports", compiled.outputText)(m, m.exports);
const create = m.exports.createModuleTwelvePretest;
assert.equal(typeof create, "function", "Pretest factory missing");
const ids = ["module-12-pretest-direct", "module-12-pretest-dopamine", "module-12-pretest-signs"];
const keys = ["b", "d", "a"];
const terms = {
  RU: ["стриатум", "GPi/SNr", "ГАМК", "талам", "D1", "D2", "дофамин", "брадикинез", "дисметри", "мозжеч"],
  EN: ["striatal", "GPi/SNr", "GABA", "thalam", "D1", "D2", "dopamine", "bradykinesia", "dysmetria", "cerebell"],
  KZ: ["стриатум", "GPi/SNr", "ГАМҚ", "таламус", "D1", "D2", "дофамин", "брадикинез", "дисметрия", "мишық"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang, "Basal ganglia", "Diagnostic pretest");
  assert.equal(lesson.kind, "pretest");
  assert(lesson.introduction.length > 140, lang + ": introduction incomplete");
  assert.equal(lesson.questions.length, 3, lang + ": question count");
  assert.deepEqual(lesson.questions.map(q => q.id), ids);
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  const prompts = new Set();
  for (const q of lesson.questions) {
    assert(q.prompt.length >= 120, lang + ": short prompt");
    assert(q.explanation.length >= 230, lang + ": short explanation");
    assert.equal(q.options.length, 4, lang + ": four choices");
    assert.deepEqual(q.options.map(o => o.id), ["a", "b", "c", "d"]);
    assert.equal(new Set(q.options.map(o => o.text)).size, 4, lang + ": repeated option");
    assert(q.options.every(o => o.text.length >= 55), lang + ": incomplete distractor");
    assert(q.options.some(o => o.id === q.correctAnswer), lang + ": answer not present");
    assert.equal(q.target.section, "theory");
    assert(!prompts.has(q.prompt), lang + ": repeated question");
    prompts.add(q.prompt);
  }
  const all = lesson.questions.flatMap(q => [q.prompt, q.explanation]).join(" ").toLowerCase();
  for (const term of terms[lang]) assert(all.includes(term.toLowerCase()), lang + ": missing physiological marker " + term);
  assert(!/diagnos.{0,8}confirmed|диагноз установлен|диагноз анықталды/i.test(all), lang + ": overclaim");
}
const index = fs.readFileSync("content/index.ts", "utf8");
assert(index.includes('import { createModuleTwelvePretest } from "./course-foundation/module-twelve-pretest";'));
const start = index.indexOf("  12: {");
const end = index.indexOf("  11: {", start);
assert(start >= 0 && end > start, "Module 12 registry block missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[12]"), "Original sections must be preserved");
assert(block.includes("createModuleTwelveObjectives"), "Reviewed objectives must be preserved");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes('createModuleTwelvePretest("' + lang + '", modules.' + lang + '[11], getSectionTitle("pretest", "' + lang + '"))'),
    lang + ": pretest not registered");
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(12, "pretest", lang);
  assert.equal(lesson?.kind, "pretest", lang + ": route kind");
  assert.equal(lesson.questions.length, 3, lang + ": route count");
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  assert(getLesson(12, "objectives", lang), lang + ": objectives preserved");
  assert(getLesson(12, "theory", lang), lang + ": theory preserved");
}
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 12 pretest RU/EN/KZ, three 4-option questions, keys, routes, preview disabled.");
console.log("OPEN: complete audit, TS type-check, build, browser, independent Kazakh-language review.");
