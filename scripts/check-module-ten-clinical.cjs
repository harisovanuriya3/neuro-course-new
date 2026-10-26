// Module 10 brainstem clinical bridge: bilateral corneal reflex and pupillary comparison.
// Run from repo root: node scripts/check-module-ten-clinical.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-ten-clinical.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 10 clinical TS syntax");
const compiled = ts.transpileModule(source, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const sandbox = {
  exports: {},
  require: name => {
    if (name === "../sections") return { getSectionTitle: (_section, lang) => "clinical-" + lang };
    throw new Error("Unexpected import: " + name);
  }
};
vm.runInNewContext(compiled.outputText, sandbox);
const create = sandbox.exports.createModuleTenClinical;
assert.equal(typeof create, "function");
const markers = {
  RU: ["V1", "VII", "II", "III", "Эдингера—Вестфаля", "афферент", "эфферент", "подготовленный специалист"],
  EN: ["V1", "VII", "II", "III", "Edinger–Westphal", "afferent", "efferent", "trained clinician"],
  KZ: ["V1", "VII", "II", "III", "Эдингер—Вестфаль", "афферент", "эфферент", "арнайы даярланған"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length >= 80, lang + ": introduction");
  assert.equal(lesson.cards.length, 5, lang + ": expected five clinical reasoning cards");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5);
  const body = lesson.cards.map(c => c.paragraphs.join(" ")).join(" ");
  for (const token of markers[lang]) assert(body.includes(token), lang + ": missing " + token);
  for (let i = 0; i < 5; i++) {
    const card = lesson.cards[i];
    assert.equal(card.id, "module-10-clinical-" + (i + 1));
    assert(card.title.length >= 8);
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 230, lang + ": card " + (i + 1) + " too short");
    assert.equal(card.links.length, 2);
    for (const link of card.links)
      assert(["cases", "theory", "practice", "one-minute", "tests", "questions"].includes(link.section),
        lang + ": invalid link " + link.section);
  }
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleTenClinical } from "./course-foundation/module-ten-clinical";'));
const start = registry.indexOf("  10: {");
const end = registry.indexOf("  9: {", start);
assert(start >= 0 && end > start, "Module 10 registry block");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[10]"), "Other module 10 sections must remain");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleTenClinical("' + lang + '")'), lang + ": clinical not wired");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(10, "clinical", lang);
  assert.equal(lesson?.kind, "clinical", lang + ": route kind");
  assert.equal(lesson.cards.length, 5, lang + ": routed card count");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Preview deployment lock must remain disabled");
console.log("PASS: module 10 clinical 5 evidence-based cards × RU/EN/KZ, route, safety, preview lock.");
console.log("OPEN: full TypeScript/build, browser testing, independent Kazakh editorial review.");
