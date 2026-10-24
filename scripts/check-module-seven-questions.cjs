// Module 7 questions: compile and execute the authored lesson factory in isolation.
// Invoked from check-module-seven-tests.cjs (which is part of audit:science).
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-seven-questions.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 question source must parse");
const compiled = ts.transpileModule(source, {
  fileName: path,
  reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const mod = { exports: {} };
new Function("module", "exports", "require", compiled.outputText)(
  mod, mod.exports, id => {
    if (id === "../sections") return { getSectionTitle: (section, lang) => section + " " + lang };
    throw new Error("Unexpected runtime import: " + id);
  }
);
const create = mod.exports.createModuleSevenQuestions;
assert.equal(typeof create, "function");
const ids = ["module-7-question-1", "module-7-question-2", "module-7-question-3", "module-7-question-4", "module-7-question-5"];
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "questions");
  assert.equal(lesson.questions.length, 5);
  assert.deepEqual(lesson.questions.map(q => q.id), ids);
  assert.equal(new Set(lesson.questions.map(q => q.prompt)).size, 5);
  assert(lesson.introduction.length > 60);
  for (const q of lesson.questions) {
    assert(q.prompt.length > 85, lang + " " + q.id + " prompt too short");
    assert(q.explanation.length > 140, lang + " " + q.id + " feedback too short");
    assert(["theory", "practice", "clinical", "cases"].includes(q.target.section));
    assert(!/^(Describe the causal mechanism|Объясните по шагам|Себептік тетікті қадамдап)/.test(q.prompt),
      "Generic non-physiological prompt: " + q.id);
  }
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenQuestions } from "./course-foundation/module-seven-questions";'));
for (const lang of ["RU", "EN", "KZ"]) {
  assert(registry.includes('createModuleSevenQuestions("' + lang + '")'), "Missing module 7 question registration: " + lang);
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 7 / questions: 5 independent questions × RU/EN/KZ, model explanations, section targets and registration.");
console.log("OPEN: full project build, DOM interactions, browser/mobile checks and independent Kazakh review.");
