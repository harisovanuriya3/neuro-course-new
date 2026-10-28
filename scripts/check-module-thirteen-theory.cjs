// Module 13 cerebellar theory: authored content and three-locale route regression.
// Scientific cross-check is documented in docs/scientific-review-progress-2026-10-13.md.
// This checks content structure and contracts, not clinical validity or browser accessibility.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const sourcePath = "content/course-foundation/module-thirteen-theory.ts";
const source = read(sourcePath);
const ast = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 13 theory parse errors");
const compiled = ts.transpileModule(source, {
  fileName: sourcePath,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 13 theory transpile errors");
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleThirteenTheory;
assert.equal(typeof create, "function");
const ids = [
  "cerebellar-functional-divisions",
  "cerebellar-afferents-and-efference-copy",
  "purkinje-deep-nuclei-microcircuit",
  "deep-nuclei-and-motor-output",
  "timing-adaptation-and-experiment",
  "clinical-signs-and-evidence-limits"
];
const markers = {
  RU: ["мозжеч", "Пуркинье", "ГАМК", "спиноцеребеллярн", "олива", "копия",
    "зубчатое", "вставочные", "дисметрия", "интенционн", "проприоцепц", "атаксия"],
  EN: ["cerebell", "Purkinje", "GABA", "spinocerebellar", "olive", "efference",
    "dentate", "interposed", "dysmetria", "intention", "propriocept", "ataxia"],
  KZ: ["мишық", "Пуркинье", "ГАМҚ", "жұлын-мишық", "олива", "көшірме",
    "тісті", "аралық ядролар", "Дисметрия", "интенциялық", "проприоцепц", "атаксия"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "theory", title: "Original", sections: [
    { id: "quick-summary", title: "Prior foundation", blocks: [] },
    { id: "mechanism", title: "Original mechanism", blocks: [] }
  ] };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory");
  assert.equal(lesson.sections.length, base.sections.length + ids.length);
  assert.equal(lesson.sections[0], base.sections[0], lang + ": lost original summary");
  assert.equal(lesson.sections[1], base.sections[1], lang + ": lost original mechanism");
  assert.deepEqual(Array.from(lesson.sections.slice(2), x => x.id), ids);
  const paragraphs = [];
  for (const section of lesson.sections.slice(2)) {
    assert(section.title.length >= 15, lang + ": incomplete heading");
    assert.equal(section.blocks.length, 2, lang + ": incomplete section " + section.id);
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph");
      assert(block.text.length >= 210, lang + ": incomplete paragraph in " + section.id);
      paragraphs.push(block.text);
    }
  }
  assert.equal(new Set(paragraphs).size, 12, lang + ": repeated paragraphs");
  const body = paragraphs.join(" ").toLocaleLowerCase();
  for (const marker of markers[lang])
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  assert(!/диагноз установлен|diagnosis confirmed|диагноз анықталды/i.test(body),
    lang + ": unjustified clinical certainty");
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleThirteenTheory } from "./course-foundation/module-thirteen-theory";'));
const start = index.indexOf("  13: {", index.indexOf("const lessons"));
const end = index.indexOf("  12: {", start);
assert(start >= 0 && end > start, "Module 13 registry block missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[13]"), "Foundation sections lost");
assert(block.includes("createModuleThirteenObjectives") && block.includes("createModuleThirteenPretest"),
  "Previously reviewed sections lost");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleThirteenTheory("' + lang + '", foundationLessons[13].theory.' + lang),
    lang + ": theory route missing");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(13, "theory", lang);
  assert.equal(lesson?.kind, "theory", lang + ": wrong lesson kind");
  for (const id of ids)
    assert(lesson.sections.some(section => section.id === id), lang + ": missing " + id);
  assert(getLesson(13, "objectives", lang), lang + ": objectives lost");
  assert(getLesson(13, "pretest", lang), lang + ": pretest lost");
}
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-thirteen-theory.cjs"),
  "New regression not wired into audit:science");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch deployment must remain disabled");
console.log("PASS: module 13 theory, 6 authored sections × 2 paragraphs × RU/EN/KZ; routes and preview guard.");
console.log("OPEN: independent KZ/clinical review, browser, voice, accessibility and E2E.");
