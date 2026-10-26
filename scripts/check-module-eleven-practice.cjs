// Module 11 practice: structural, language, route and preview-lock regression.
// Run: node scripts/check-module-eleven-practice.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-eleven-practice.ts";
const source = read(path);
const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 11 practice TS syntax");
const transpiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((transpiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 11 practice TS transpilation");
const exported = {};
new Function("exports", transpiled.outputText)(exported);
assert.equal(typeof exported.createModuleElevenPractice, "function");
const base = {
  kind: "practice", title: "Practice", moduleTitle: "Motor control",
  ui: { showAnswer: "Show", check: "Check", reset: "Reset", undo: "Undo",
    correct: "Correct", incorrect: "Incorrect", incomplete: "Incomplete",
    available: "Available", selected: "Selected", empty: "Empty", input: "Input",
    theory: "Theory", localNote: "Note" }, sections: []
};
const markers = {
  RU: ["пирамид", "кортикоспинал", "проприоцеп", "ретикулоспинал", "вестибулоспинал", "Ia", "α", "спастич", "веретён"],
  EN: ["decussation", "corticospinal", "propriocept", "reticulospinal", "vestibulospinal", "Ia", "alpha", "spastic", "spindle"],
  KZ: ["айқасу", "кортикоспинал", "проприоцеп", "ретикулоспинал", "вестибулоспинал", "Ia", "α", "спастик", "ұршық"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = exported.createModuleElevenPractice(lang, base);
  assert.equal(lesson.kind, "practice", lang);
  assert.equal(lesson.sections.length, 5, lang + ": 4 tasks + self-check");
  assert.equal(new Set(lesson.sections.map(section => section.title)).size, 5,
    lang + ": distinct exercise titles");
  for (const section of lesson.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(block => block.type),
      ["paragraph", "response", "answer"], lang + ": attempt before answer");
    assert(section.blocks[0].text.length >= 190, lang + ": task needs sufficient detail");
    assert(section.blocks[1].label.length >= 45, lang + ": response prompt missing");
    assert.equal(section.blocks[2].items.length, 2, lang + ": two explanatory components");
    assert(section.blocks[2].items.every(s => s.length >= 180), lang + ": short explanation");
  }
  assert.equal(lesson.sections[4].blocks.length, 1);
  assert.equal(lesson.sections[4].blocks[0].type, "checklist");
  assert.equal(lesson.sections[4].blocks[0].items.length, 5);
  const text = JSON.stringify(lesson.sections);
  for (const marker of markers[lang]) assert(text.includes(marker), lang + ": missing " + marker);
  assert(!text.includes("changing the first could affect the second"),
    lang + ": generic practice template should not leak");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleElevenPractice } from "./course-foundation/module-eleven-practice";'),
  "Module 11 practice import");
const start = registry.indexOf("  11: {");
const stop = registry.indexOf("  3: {", start);
assert(start >= 0 && stop > start, "Module 11 registry boundaries");
const block = registry.slice(start, stop);
assert(block.includes("...foundationLessons[11]"), "Other module 11 lessons must remain intact");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes('createModuleElevenPractice("'+lang+'", foundationLessons[11].practice.'+lang),
    "Missing "+lang+" registration");
}
const sections = read("content/sections.ts");
assert(sections.includes('slug: "practice"'), "Practice route slug");
const route = read("components/SectionContent.tsx");
assert(route.includes('case "practice"') && route.includes("<PracticeContent"),
  "Practice route must render the answer workflow");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not deploy previews");
console.log("PASS: module 11 practice: 4 authored thought experiments and 5 self-checks × RU/EN/KZ, registration and preview guard.");
console.log("NOTE: this does not prove browser behavior, clinical validity or independent Kazakh review.");
