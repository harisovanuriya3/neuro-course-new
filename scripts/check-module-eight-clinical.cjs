// Module 8 clinical bridge: static + transpiled runtime contract.
// Run: node scripts/check-module-eight-clinical.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const file = "content/course-foundation/module-eight-clinical.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 clinical TypeScript syntax");
const result = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const sandbox = {
  exports: {},
  require: name => {
    if (name === "../sections") return { getSectionTitle: (_slug, lang) => "clinical-" + lang };
    throw new Error("Unexpected runtime import " + name);
  }
};
vm.runInNewContext(result.outputText, sandbox);
const create = sandbox.exports.createModuleEightClinical;
assert.equal(typeof create, "function");
const lessons = {};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  lessons[lang] = lesson;
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length >= 60, lang + ": introduction too short");
  assert.equal(lesson.cards.length, 5, lang + ": five stages required");
  assert.equal(new Set(lesson.cards.map(card => card.id)).size, 5);
  for (let i = 0; i < 5; i++) {
    const card = lesson.cards[i];
    assert.equal(card.id, "module-8-clinical-" + (i + 1));
    assert(card.title.length >= 8, lang + ": missing stage title");
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 250, lang + ": incomplete explanation in stage " + (i + 1));
    assert.equal(card.links.length, 2);
    for (const link of card.links)
      assert(["cases", "theory", "one-minute", "practice", "tests", "questions"].includes(link.section));
  }
  const body = lesson.cards.map(card => card.paragraphs[0]).join(" ");
  const key = {
    RU: ["спинного мозга", "задних столбах", "пирамид", "Лиссауэра", "МРТ"],
    EN: ["spinal cord", "dorsal columns", "pyramidal", "Lissauer", "imaging"],
    KZ: ["жұлын", "артқы баған", "пирамид", "Лиссауэр", "МРТ"]
  };
  for (const word of key[lang]) assert(body.includes(word), lang + ": missing " + word);
}
assert.notEqual(lessons.RU.cards[0].paragraphs[0], lessons.EN.cards[0].paragraphs[0]);
assert.notEqual(lessons.EN.cards[0].paragraphs[0], lessons.KZ.cards[0].paragraphs[0]);
const index = read("content/index.ts");
assert(index.includes('import { createModuleEightClinical } from "./course-foundation/module-eight-clinical";'));
const start = index.indexOf("  8: {");
const end = index.indexOf("  7: {", start);
assert(start >= 0 && end > start, "Module 8 registry boundaries");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[8]"), "Module 8 other sections must remain");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleEightClinical("' + lang + '")'),
    lang + ": module 8 clinical not registered");
const base = read("content/course-foundation/assessment.ts");
assert(base.includes("зақым ошағымен бір жақта ерікті қозғалыс әлсірейді"),
  "Kazakh vignette must say ipsilateral rather than left");
assert(!base.includes("зақым деңгейінен төмен сол жақта ерікті қозғалыс әлсірейді"),
  "Incorrect left-side assertion still present");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not trigger Vercel preview");
console.log("PASS: Module 8 clinical RU/EN/KZ, five stages, correct laterality, navigation and preview disabled.");
console.log("NOTE: static/runtime content checks are not a browser or scientific translation certification.");
