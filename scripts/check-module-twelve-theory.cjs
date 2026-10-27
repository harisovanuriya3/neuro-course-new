// Module 12 basal ganglia theory: authored RU/EN/KZ, scientific terminology and route contract.
// Run from repository root: node scripts/check-module-twelve-theory.cjs
// Source/runtime-structure checks are not medical peer review or browser QA.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-twelve-theory.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 12 theory TypeScript parse errors");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 12 theory transpilation errors");
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleTwelveTheory;
assert.equal(typeof create, "function", "Module 12 theory factory missing");

const ids = [
  "basal-ganglia-nodes-and-loops",
  "direct-indirect-and-hyperdirect",
  "dopamine-modulates-selection",
  "action-selection-and-measurable-predictions",
  "hypokinetic-hyperkinetic-and-differential",
  "evidence-model-and-source-limits"
];
const markers = {
  RU: ["стриатум", "путамен", "GPe", "GPi", "STN", "SNc", "SNr", "ГАМК",
    "талам", "глутамат", "гиперпрям", "D1", "D2", "дофамин", "брадикинез",
    "дисметри", "хорея", "ригидност", "спастичност", "мотонейрон"],
  EN: ["striatum", "putamen", "GPe", "GPi", "STN", "SNc", "SNr", "GABA",
    "thalam", "glutamat", "hyperdirect", "D1", "D2", "dopamine", "bradykinesia",
    "dysmetria", "chorea", "rigidity", "spasticity", "motor neuron"],
  KZ: ["стриатум", "путамен", "GPe", "GPi", "STN", "SNc", "SNr", "ГАМҚ",
    "талам", "глутамат", "гипертікелей", "D1", "D2", "дофамин", "брадикинез",
    "дисметрия", "хорея", "ригидтілік", "спастикалық", "мотонейрон"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "theory", title: "Foundation",
    sections: [{ id: "quick-summary", title: "Original", blocks: [] }] };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory");
  assert.equal(lesson.sections.length, 7, lang + ": original + six authored sections");
  assert.equal(lesson.sections[0].id, "quick-summary", lang + ": foundation overwritten");
  assert.deepEqual(Array.from(lesson.sections.slice(1), section => section.id), ids);
  const paragraphs = [];
  for (const section of lesson.sections.slice(1)) {
    assert(section.title.length >= 15, lang + ": short heading");
    assert.equal(section.blocks.length, 2, lang + ": two paragraphs per section");
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph");
      assert(block.text.length >= 250, lang + ": incomplete paragraph");
      paragraphs.push(block.text);
    }
  }
  assert.equal(new Set(paragraphs).size, 12, lang + ": repeated paragraphs");
  const body = paragraphs.join(" ").toLocaleLowerCase();
  for (const marker of markers[lang])
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing physiological concept " + marker);
  assert(!/диагноз установлен|diagnosis confirmed|диагноз анықталды/i.test(body),
    lang + ": unjustified clinical certainty");
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleTwelveTheory } from "./course-foundation/module-twelve-theory";'),
  "Module 12 theory import missing");
const start = index.indexOf("  12: {", index.indexOf("const lessons"));
const end = index.indexOf("  11: {", start);
assert(start >= 0 && end > start, "Module 12 registry block missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[12]"), "Foundation lessons lost");
assert(block.includes("createModuleTwelveObjectives") && block.includes("createModuleTwelvePretest"),
  "Previously reviewed sections must remain registered");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleTwelveTheory("' + lang + '", foundationLessons[12].theory.' + lang),
    lang + ": theory not registered");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(12, "theory", lang);
  assert.equal(lesson?.kind, "theory", lang + ": wrong route kind");
  for (const id of ids)
    assert(lesson.sections.some(section => section.id === id), lang + ": missing " + id);
  assert(getLesson(12, "objectives", lang), lang + ": objectives lost");
  assert(getLesson(12, "pretest", lang), lang + ": pretest lost");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not deploy");
console.log("PASS: module 12 theory, 6 sections × 2 paragraphs × RU/EN/KZ, routes and preview guard.");
console.log("OPEN: full typecheck, build, browser/voice/accessibility and independent KZ review.");
