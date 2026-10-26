// Module 11: original RU/EN/KZ open-ended motor-control review questions.
// Run from repository root: node scripts/check-module-eleven-questions.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-eleven-questions.ts";
const source = read(file);
const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 11 questions TS parse");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 11 questions TS transpilation");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (slug, lang) => slug + " " + lang };
  throw Error("Unexpected runtime import " + name);
}};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleElevenQuestions;
assert.equal(typeof create, "function");
const markers = {
  RU: ["мотонейрон", "перекр", "ретикулоспинал", "проприоцепц", "веретён"],
  EN: ["motor neuron", "decussat", "reticulospinal", "propriocept", "spindles"],
  KZ: ["мотонейрон", "айқас", "ретикулоспинал", "проприоцепц", "ұршық"]
};
const targetSections = ["theory", "clinical", "interactive", "cases", "practice"];
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "questions");
  assert(lesson.introduction.length >= 120, lang + ": short introduction");
  assert.equal(lesson.questions.length, 5);
  assert.equal(new Set(lesson.questions.map(q => q.id)).size, 5);
  assert.equal(new Set(lesson.questions.map(q => q.prompt)).size, 5);
  assert.deepEqual(Array.from(lesson.questions.map(q => q.target.section)), targetSections);
  for (const [index, q] of lesson.questions.entries()) {
    assert.equal(q.id, "module-11-question-" + (index + 1));
    assert(q.prompt.length >= 125, lang + ": short prompt " + index);
    assert(q.explanation.length >= 300, lang + ": short feedback " + index);
    assert.notEqual(q.prompt, q.explanation);
  }
  const body = lesson.questions.map(q => q.prompt + " " + q.explanation).join(" ").toLowerCase();
  for (const marker of markers[lang]) assert(body.includes(marker.toLowerCase()),
    lang + ": missing physiology marker " + marker);
  assert(!body.includes("describe the causal mechanism step by step"));
  assert(!body.includes("себептік тетікті қадамдап сипаттаңыз"));
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleElevenQuestions } from "./course-foundation/module-eleven-questions";'));
const start = registry.indexOf("  11: {");
const end = registry.indexOf("  3: {", start);
assert(start >= 0 && end > start, "Module 11 registry boundaries");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[11]"), "Preserve other module 11 sections");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleElevenQuestions("' + lang + '")'),
    lang + ": questions not registered");
const sections = read("content/sections.ts");
assert(sections.includes('slug: "questions"'));
const renderer = read("components/SectionContent.tsx");
assert(renderer.includes('case "questions"'));
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-eleven-questions.cjs"));
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 11 questions: 5 original mechanisms × RU/EN/KZ, route and preview lock.");
console.log("OPEN: full typecheck/build, browser/mobile/keyboard and independent KZ editorial review.");
