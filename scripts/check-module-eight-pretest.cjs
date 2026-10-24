// Module 8 pretest: real TS transpilation, authored question keys and registry integration.
// Run from repository root: node scripts/check-module-eight-pretest.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-eight-pretest.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 pretest TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: file,
  reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const moduleObject = { exports: {} };
new Function("module", "exports", compiled.outputText)(moduleObject, moduleObject.exports);
const create = moduleObject.exports.createModuleEightPretest;
assert.equal(typeof create, "function");
const keys = ["b", "d", "c"];
const ids = ["module-8-pretest-dorsal-column", "module-8-pretest-anterolateral", "module-8-pretest-corticospinal"];
const terms = {
 RU: ["задн", "антеролатерал", "корково-спинномозгов", "перекр"],
 EN: ["dorsal", "anterolateral", "corticospinal", "cross"],
 KZ: ["артқы", "антеролатерал", "қыртыс-жұлын", "айқас"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang, "Module 8", "Diagnostic pretest");
  assert.equal(lesson.kind, "pretest");
  assert(lesson.introduction.length >= 100);
  assert.equal(lesson.questions.length, 3, lang + " requires three questions");
  assert.deepEqual(lesson.questions.map(q => q.id), ids);
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
  const prompts = new Set();
  for (const question of lesson.questions) {
    assert(question.prompt.length > 100, lang + " short prompt");
    assert(question.explanation.length > 200, lang + " short physiological feedback");
    assert.equal(question.options.length, 4);
    assert.deepEqual(question.options.map(o => o.id), ["a", "b", "c", "d"]);
    assert.equal(new Set(question.options.map(o => o.text)).size, 4, lang + " duplicate distractors");
    assert(question.options.every(o => o.text.length > 40));
    assert(question.options.some(o => o.id === question.correctAnswer));
    assert.equal(question.target.section, "theory");
    assert(!prompts.has(question.prompt));
    prompts.add(question.prompt);
  }
  const all = lesson.questions.flatMap(q => [q.prompt, q.explanation]).join(" ").toLowerCase();
  for (const term of terms[lang]) assert(all.includes(term), lang + " missing physiological term " + term);
}
const registry = fs.readFileSync("content/index.ts", "utf8");
assert(registry.includes('import { createModuleEightPretest } from "./course-foundation/module-eight-pretest";'));
const blockStart = registry.indexOf("  8: {");
const blockEnd = registry.indexOf("  7: {", blockStart);
assert(blockStart > 0 && blockEnd > blockStart, "Module 8 registry block");
const block = registry.slice(blockStart, blockEnd);
assert(block.includes("...foundationLessons[8]"));
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleEightPretest("' + lang + '",'), lang + " missing pretest route");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(8, "pretest", lang);
  assert.equal(lesson?.kind, "pretest", lang + " route");
  assert.equal(lesson.questions.length, 3, lang + " integrated questions");
  assert.deepEqual(lesson.questions.map(q => q.correctAnswer), keys);
}
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 8 pretest (3 authored questions × RU/EN/KZ, 4 options, keys, explanations, routes).");
console.log("OPEN: full npm audit, tsc, build, browser, independent KZ review.");
