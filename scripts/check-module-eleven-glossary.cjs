// Module 11 glossary: source, compiled factory, RU/EN/KZ, and anchored links.
// Requires installed TypeScript. This is not a browser or native-language review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const file = "content/course-foundation/module-eleven-glossary.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 11 glossary TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleElevenGlossary;
assert.equal(typeof create, "function");

const theory = read("content/course-foundation/module-eleven-theory.ts");
const anchors = new Set([
  "motor-command-and-final-common-path",
  "corticospinal-and-corticobulbar-projections",
  "descending-postural-and-skilled-pathways",
  "feedforward-feedback-and-learning",
  "motor-signs-and-limits-of-localization"
]);
for (const anchor of anchors) {
  assert(theory.includes('id: "' + anchor + '"'), "Missing theory anchor " + anchor);
}
const expectedIds = [
  "upper-motor-neuron", "lower-motor-neuron", "corticospinal", "corticobulbar",
  "pyramidal-decussation", "spinal-interneuron", "gamma-motor-neuron",
  "reticulospinal", "vestibulospinal", "muscle-spindle", "apraxia"
];
const baseNames = {
  RU: ["Предварительное управление", "Двигательная обратная связь"],
  EN: ["Feedforward control", "Motor feedback"],
  KZ: ["Алдын ала басқару", "Қимылдық кері байланыс"]
};
const markers = {
  RU: ["до", "сухожильный орган Гольджи", "большинство", "клинический"],
  EN: ["before", "Golgi tendon organ", "Most", "clinical"],
  KZ: ["тұрып", "Гольджи сіңір мүшесі", "Көпшілігі", "клиникалық"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const base = {
    kind: "glossary", title: "Glossary", introduction: "generic",
    terms: baseNames[language].map((term, i) => ({
      id: "module-11-term-" + (i + 1), term,
      definition: "incorrect generic definition",
      target: { section: "theory" }
    }))
  };
  const lesson = create(language, base);
  assert.equal(lesson.kind, "glossary");
  assert.equal(lesson.terms.length, 13, language + ": 2 foundation + 11 authored terms");
  assert.equal(base.terms[0].definition, "incorrect generic definition", "Must not mutate base");
  assert.equal(base.terms[1].definition, "incorrect generic definition", "Must not mutate base");
  assert(lesson.introduction.length >= 120, language + ": weak introduction");
  const ids = lesson.terms.map(x => x.id);
  assert.equal(new Set(ids).size, 13, language + ": duplicate IDs");
  assert.equal(new Set(lesson.terms.map(x => x.term.toLowerCase())).size, 13, language + ": duplicate terms");
  for (const id of expectedIds)
    assert(ids.includes("module-11-glossary-" + id), language + ": missing " + id);
  for (const term of lesson.terms) {
    assert(term.term.trim().length >= 5, language + ": empty term " + term.id);
    assert(term.definition.trim().length >= 110, language + ": weak definition " + term.id);
    assert.equal(term.target.section, "theory", language + ": wrong destination " + term.id);
    assert(anchors.has(term.target.anchor), language + ": missing anchor " + term.id);
  }
  assert(!lesson.terms[0].definition.includes("Neural organization that transforms movement intention"),
    "Feedforward must not use generic motor-control definition");
  const combined = lesson.terms.map(x => x.term + " " + x.definition).join(" ");
  for (const marker of markers[language])
    assert(combined.toLowerCase().includes(marker.toLowerCase()),
      language + ": missing physiology marker " + marker);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleElevenGlossary } from "./course-foundation/module-eleven-glossary";'));
for (const language of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleElevenGlossary("' + language + '", foundationLessons[11].glossary.' + language),
    "Module 11 glossary missing " + language + " registry");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 11 glossary, 13 terms × RU/EN/KZ, 5 theory anchors and registry.");
console.log("OPEN: full typecheck/build/browser and independent KZ medical review.");
