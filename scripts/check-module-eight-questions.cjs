// Module 8: execute the authored RU/EN/KZ question factory in isolation.
// Run: node scripts/check-module-eight-questions.cjs
// Structural checks do not replace independent medical/translation or browser review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const file = "content/course-foundation/module-eight-questions.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 question TS syntax");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = {
  exports: {},
  require: name => {
    if (name === "../sections") return { getSectionTitle: (section, lang) => section + " " + lang };
    throw new Error("Unexpected runtime import: " + name);
  }
};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleEightQuestions;
assert.equal(typeof create, "function");
const markers = {
  RU: ["заднего столба", "антеролатеральной", "Броун-Секара", "корково-спинномозговых", "камертоном"],
  EN: ["dorsal-column", "anterolateral", "Brown-Séquard", "corticospinal", "tuning-fork"],
  KZ: ["артқы баған", "антеролатералдық", "Броун-Секар", "Қыртыс-жұлын", "камертонмен"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "questions");
  assert(lesson.introduction.length > 70, lang + ": missing instructions");
  assert.equal(lesson.questions.length, 5, lang + ": five questions required");
  assert.equal(new Set(lesson.questions.map(q => q.id)).size, 5);
  assert.equal(new Set(lesson.questions.map(q => q.prompt)).size, 5);
  for (const [index, q] of lesson.questions.entries()) {
    assert.equal(q.id, "module-8-question-" + (index + 1));
    assert(q.prompt.length > 90, lang + ": short question " + index);
    assert(q.explanation.length > 180, lang + ": incomplete explanation " + index);
    assert(["theory", "practice", "clinical", "cases"].includes(q.target.section));
    assert(q.prompt !== q.explanation);
  }
  const all = lesson.questions.map(q => q.explanation).join(" ");
  for (const token of markers[lang]) assert(all.includes(token), lang + ": missing " + token);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleEightQuestions } from "./course-foundation/module-eight-questions";'));
const start = registry.indexOf("  8: {");
const end = registry.indexOf("  7: {", start);
assert(start >= 0 && end > start, "Module 8 registry block missing");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[8]"), "Other module 8 sections overwritten");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes(lang + ': createModuleEightQuestions("' + lang + '")'),
    lang + ": authored questions not wired");
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 8 questions 5 authored items × RU/EN/KZ, feedback, links, route and preview guard.");
console.log("OPEN: full TS typecheck, project build, UI/mobile/voice and independent Kazakh language review.");
