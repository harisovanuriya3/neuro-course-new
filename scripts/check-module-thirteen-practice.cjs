// Cerebellar practice: content, route, terminology and deployment isolation.
// This checks authored contracts; it does not automatically grade free text.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-thirteen-practice.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 13 practice TypeScript syntax");
const output = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((output.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", output.outputText)(exported);
assert.equal(typeof exported.createModuleThirteenPractice, "function");
const base = {
  kind: "practice", title: "Practice", moduleTitle: "Cerebellum",
  ui: { showAnswer: "Show", check: "", reset: "", undo: "",
    correct: "", incorrect: "", incomplete: "", available: "", selected: "",
    empty: "", input: "Answer", theory: "Theory", localNote: "Note" },
  sections: [{ title: "Generic", blocks: [] }]
};
const markers = {
  RU: ["мозжеч", "проприоцепц", "Пуркинье", "ГАМК", "дисметри", "Ромберг", "адаптац"],
  EN: ["cerebell", "proprioception", "Purkinje", "GABA", "dysmetria", "Romberg", "adaptation"],
  KZ: ["мишық", "проприоцепц", "Пуркинье", "ГАМҚ", "дисметрия", "Ромберг", "бейімдел"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const lesson = exported.createModuleThirteenPractice(language, base);
  assert.equal(lesson.kind, "practice");
  assert.equal(lesson.sections.length, 5, language + ": four exercises plus checklist");
  assert.equal(new Set(lesson.sections.map(s => s.title)).size, 5);
  assert(!lesson.sections.some(s => s.title === "Generic"));
  for (const section of lesson.sections.slice(0, 4)) {
    assert.deepEqual(section.blocks.map(b => b.type), ["paragraph", "response", "answer"]);
    assert(section.blocks[0].text.length >= 160, language + ": question too short");
    assert(section.blocks[1].label.length >= 25, language + ": response label too short");
    assert.equal(section.blocks[2].items.length, 2);
    assert(section.blocks[2].items.every(item => item.length >= 115), language + ": explanation too short");
  }
  assert.equal(lesson.sections[4].blocks[0].type, "checklist");
  assert.equal(lesson.sections[4].blocks[0].items.length, 5);
  const all = JSON.stringify(lesson.sections);
  for (const marker of markers[language]) {
    assert(all.toLowerCase().includes(marker.toLowerCase()), language + ": missing " + marker);
  }
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleThirteenPractice } from "./course-foundation/module-thirteen-practice";'));
const start = registry.indexOf("  13: {");
const end = registry.indexOf("  12: {", start);
assert(start >= 0 && end > start);
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[13]"));
for (const language of ["RU", "EN", "KZ"]) {
  assert(block.includes('createModuleThirteenPractice("' + language + '", foundationLessons[13].practice.' + language),
    "Missing 13/practice " + language);
}
for (const section of ["objectives", "pretest", "theory", '"one-minute"', "clinical"]) {
  assert(block.includes(section + ":"), "Previously reviewed route lost: " + section);
}
assert(read("content/sections.ts").includes('slug: "practice"'));
assert(read("components/SectionContent.tsx").includes('case "practice"'));
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS module13 practice: four original exercises and five self-check criteria in RU/EN/KZ; routes and preview lock");
console.log("NOTE: free-text explanations require human evaluation; no browser or independent KZ review is claimed");
