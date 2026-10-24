// Module 7 case-level regression: run from repo root with Node and installed TypeScript.
// This checks executable authored data, not the clinical accuracy of every answer or browser UX.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-seven-cases.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 cases TS parse diagnostics");
const compiled = ts.transpileModule(source, {
  fileName: path,
  reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 7 cases TS transpile diagnostics");
const mod = { exports: {} };
new Function("module", "exports", compiled.outputText)(mod, mod.exports);
const create = mod.exports.createModuleSevenCases;
assert.equal(typeof create, "function", "Authored cases factory missing");
const caseIDs = [];
for (const lang of ["RU", "EN", "KZ"]) {
  const base = {
    kind: "cases", title: "base", moduleTitle: "Module 7",
    introduction: "base", ui: { progress: "Progress" }, cases: [],
    sources: [{ title: "Source", href: "https://example.org" }]
  };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "cases");
  assert.equal(lesson.title, base.title);
  assert.deepEqual(lesson.sources, base.sources, "Existing references must be preserved");
  assert.equal(lesson.cases.length, 3, lang + " needs three distinct cases");
  assert(lesson.introduction.length > 50, lang + " intro too short");
  for (let i = 0; i < 3; i++) {
    const c = lesson.cases[i];
    assert.equal(c.id, "m7-authored-case-" + (i + 1));
    assert(c.title.trim().length > 8 && c.situation.trim().length > 80,
      lang + " case " + i + " lacks title or concrete data");
    assert.equal(c.stages.length, 3, lang + " case " + i + " needs three reasoning stages");
    for (const stage of c.stages) {
      assert(stage.title.trim() && stage.questions.length === 1 && stage.questions[0].length > 45,
        lang + " case " + i + " stage invalid");
    }
    assert.equal(c.explanation.length, 2, lang + " case " + i + " needs two explanations");
    for (const paragraph of c.explanation)
      assert(paragraph.trim().length > 100, lang + " case " + i + " feedback too short");
    if (lang === "RU") caseIDs.push(c.id);
  }
}
assert.equal(new Set(caseIDs).size, 3, "Case IDs must be unique");
for (const marker of ["Ia", "Ib", "L2–L4", "L3–L4", "моносинап", "polysynaptic", "полисинап",
                      "автоматты түрде бағаланбайды", "not automatically graded", "автоматически не оцениваются"]) {
  assert(source.includes(marker), "Missing physiology or honest-feedback marker: " + marker);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenCases } from "./course-foundation/module-seven-cases";'),
  "Module 7 cases factory not imported");
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleSevenCases("' + lang + '", foundationLessons[7].cases.' + lang + ' as CasesLesson)'),
    "Module 7 cases not registered for " + lang);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not deploy preview");
console.log("PASS: module 7 cases 3 cases × 3 stages × RU/EN/KZ; explanations, routing, preview lock.");
