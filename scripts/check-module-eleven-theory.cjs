// Module 11 motor systems theory: authored structure, RU/EN/KZ and route regression.
// Run from repository root: node scripts/check-module-eleven-theory.cjs
// This checks source integrity; it is NOT a substitute for medical peer review or browser QA.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-eleven-theory.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 11 theory TypeScript parse errors");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 11 theory transpilation errors");
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleElevenTheory;
assert.equal(typeof create, "function", "Module 11 theory factory export missing");

const ids = [
  "motor-command-and-final-common-path",
  "corticospinal-and-corticobulbar-projections",
  "descending-postural-and-skilled-pathways",
  "feedforward-feedback-and-learning",
  "motor-signs-and-limits-of-localization"
];
const markers = {
  RU: ["мотонейрон", "базальн", "мозжеч", "кортикоспиналь", "кортикобульбар",
       "перекрещ", "ретикулоспиналь", "вестибулоспиналь", "обратная связь",
       "проприоцеп", "мышечных веретён", "Ia-афферент"],
  EN: ["motor neuron", "basal ganglia", "cerebellum", "corticospinal", "corticobulbar",
       "cross", "reticulospinal", "vestibulospinal", "feedback",
       "propriocept", "muscle spindles", "Ia afferents"],
  KZ: ["мотонейрон", "базальды ганглийлер", "мишық", "кортикоспинал", "кортикобульбар",
       "айқас", "ретикулоспинал", "вестибулоспинал", "кері байланыс",
       "проприоцеп", "бұлшықет ұршық", "Ia-афферент"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "theory", title: "Existing lesson",
    sections: [{ id: "quick-summary", title: "Original", blocks: [] }] };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory", lang + ": wrong lesson kind");
  assert.equal(lesson.sections.length, 6, lang + ": original + five new sections");
  assert.equal(lesson.sections[0].id, "quick-summary", lang + ": original content lost");
  assert.deepEqual(Array.from(lesson.sections.slice(1), section => section.id), ids);
  const paragraphs = [];
  for (const section of lesson.sections.slice(1)) {
    assert(section.title.length >= 12, lang + ": heading too short");
    assert.equal(section.blocks.length, 2, lang + ": expected two paragraphs per section");
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph", lang + ": wrong block type");
      assert(block.text.length >= 180, lang + ": incomplete paragraph");
      paragraphs.push(block.text);
    }
  }
  assert.equal(new Set(paragraphs).size, 10, lang + ": duplicate paragraph");
  const body = paragraphs.join(" ").toLocaleLowerCase();
  for (const marker of markers[lang])
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing physiological concept " + marker);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleElevenTheory } from "./course-foundation/module-eleven-theory";'),
  "Module 11 theory import missing");
const start = index.indexOf("  11: {", index.indexOf("const lessons"));
const end = index.indexOf("  3: {", start);
assert(start >= 0 && end > start, "Module 11 registration block missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[11]"), "Other module 11 lessons lost");
assert(block.includes("objectives: {") && block.includes("pretest: {"),
  "Previously reviewed module 11 sections must remain registered");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleElevenTheory("' + lang + '", foundationLessons[11].theory.' + lang),
    lang + ": theory not registered");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(11, "theory", lang);
  assert.equal(lesson?.kind, "theory", lang + ": route is not theory");
  for (const id of ids)
    assert(lesson.sections.some(section => section.id === id), lang + ": missing " + id);
  assert(getLesson(11, "objectives", lang), lang + ": objectives lost");
  assert(getLesson(11, "pretest", lang), lang + ": pretest lost");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Vercel preview must remain disabled");
console.log("PASS: module 11 theory, 5 sections × 2 paragraphs × RU/EN/KZ; routes and preview guard.");
console.log("OPEN: full typecheck, build, browser/voice/accessibility and independent KZ review.");
