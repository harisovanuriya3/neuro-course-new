// Module 7 practice regression: executable TypeScript-transpiled factory, not a browser test.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-seven-practice.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 practice TypeScript syntax");
const transpiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal((transpiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const exports = {};
new Function("exports", transpiled.outputText)(exports);
assert.equal(typeof exports.createModuleSevenPractice, "function");
const base = { kind: "practice", title: "Practice", moduleTitle: "Reflexes",
  ui: { showAnswer: "Show", check: "", reset: "", undo: "", correct: "",
    incorrect: "", incomplete: "", available: "", selected: "", empty: "",
    input: "Response", theory: "Theory", localNote: "Note" }, sections: [] };
const markers = {
  RU: ["Ia", "Ib", "Ендрассика", "интернейрон"],
  EN: ["Ia", "Ib", "Jendrassik", "interneuron"],
  KZ: ["Ia", "Ib", "Ендрассик", "интернейрон"],
};
for (const language of ["RU", "EN", "KZ"]) {
  const result = exports.createModuleSevenPractice(language, base);
  assert.equal(result.kind, "practice");
  assert.equal(result.sections.length, 5, language + " section count");
  assert.equal(new Set(result.sections.map(s => s.title)).size, 5, language + " duplicate titles");
  for (const section of result.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(b => b.type), ["paragraph", "response", "answer"]);
    assert(section.blocks[0].text.length > 200, language + " prompt too short");
    assert(section.blocks[1].label.trim(), language + " missing response label");
    assert.equal(section.blocks[2].items.length, 2, language + " explanation count");
    assert(section.blocks[2].items.every(s => s.length > 80), language + " incomplete explanation");
  }
  const checklist = result.sections[4].blocks[0];
  assert.equal(checklist.type, "checklist");
  assert.equal(checklist.items.length, 5);
  const all = JSON.stringify(result.sections);
  for (const marker of markers[language])
    assert(all.includes(marker), language + " missing mechanism " + marker);
  assert(all.includes("L2–L4"), language + " missing segmental innervation");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenPractice } from "./course-foundation/module-seven-practice";'));
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleSevenPractice("'+lang+'", foundationLessons[7].practice.'+lang),
    "Missing actual module 7 practice registration " + lang);
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 7 practice, 4 authored tasks × 3 languages + 3 checklists; route and preview guard.");
console.log("NOTE: no full Next.js build, browser test or independent KZ language review.");
