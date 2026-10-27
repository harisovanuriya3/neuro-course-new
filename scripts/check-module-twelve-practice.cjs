// Module 12 practice: scientific content, structure, language, route and preview guard.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-twelve-practice.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Practice TypeScript syntax");
const transpiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((transpiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", transpiled.outputText)(exported);
assert.equal(typeof exported.createModuleTwelvePractice, "function");
const base = {
  kind: "practice", title: "Practice", moduleTitle: "Basal ganglia",
  ui: { showAnswer: "Show", check: "", reset: "", undo: "",
    correct: "", incorrect: "", incomplete: "", available: "", selected: "",
    empty: "", input: "Answer", theory: "Theory", localNote: "Note" },
  sections: [{ title: "Original", blocks: [] }]
};
const markers = {
  RU: ["GPi/SNr", "таламус", "GPe", "STN", "D1/D2", "гиперпрям", "брадикинез", "дисметри"],
  EN: ["GPi/SNr", "thalam", "GPe", "STN", "D1/D2", "hyperdirect", "bradykinesia", "dysmetria"],
  KZ: ["GPi/SNr", "таламус", "GPe", "STN", "D1/D2", "гипертікелей", "брадикинезия", "дисметрия"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const lesson = exported.createModuleTwelvePractice(language, base);
  assert.equal(lesson.kind, "practice");
  assert.equal(lesson.sections.length, 5, language + ": four exercises plus checklist");
  assert.equal(new Set(lesson.sections.map(s => s.title)).size, 5);
  assert.equal(lesson.sections.some(s => s.title === "Original"), false, "Generic tasks must be replaced");
  for (const section of lesson.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(b => b.type), ["paragraph", "response", "answer"]);
    assert(section.blocks[0].text.length >= 170, language + ": task too short");
    assert(section.blocks[1].label.length >= 30);
    assert.equal(section.blocks[2].items.length, 2);
    assert(section.blocks[2].items.every(item => item.length >= 110), language + ": insufficient explanation");
  }
  assert.equal(lesson.sections[4].blocks[0].type, "checklist");
  assert.equal(lesson.sections[4].blocks[0].items.length, 5);
  const all = JSON.stringify(lesson.sections);
  for (const marker of markers[language]) assert(all.includes(marker), language + ": missing " + marker);
  if (language === "RU") assert(all.includes("ГАМК-ергические"), "RU direct pathway explanation");
  if (language === "KZ") assert(all.includes("ГАМҚ"), "KZ direct pathway explanation");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleTwelvePractice } from "./course-foundation/module-twelve-practice";'));
const start = registry.indexOf("  12: {");
const end = registry.indexOf("  11: {", start);
assert(start >= 0 && end > start);
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[12]"));
for (const language of ["RU", "EN", "KZ"]) {
  assert(block.includes('createModuleTwelvePractice("'+language+'", foundationLessons[12].practice.'+language),
    "Missing practice route for " + language);
}
for (const section of ["clinical", "objectives", "pretest", '"one-minute"', "theory"]) {
  assert(block.includes(section + ":"), "Previously reviewed section lost: " + section);
}
const sections = read("content/sections.ts");
assert(sections.includes('slug: "practice"'));
const renderer = read("components/SectionContent.tsx");
assert(renderer.includes('case "practice"') && renderer.includes("<PracticeContent"));
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS module12 practice: four authored tasks and five self-checks RU/EN/KZ; route and preview lock");
console.log("NOTE: this does not prove browser behavior, scientific completeness or independent KZ review");
