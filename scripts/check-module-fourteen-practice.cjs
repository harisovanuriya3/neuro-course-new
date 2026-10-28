// Module 14 practice: route, localization, scientific and safety regression.
// This is a code contract, NOT independent KZ medical or browser acceptance.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-fourteen-practice.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 practice TypeScript parse error");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = { exports: {}, require: name => { throw new Error("Unexpected runtime import: " + name); } };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleFourteenPractice;
assert.equal(typeof create, "function");
const markers = {
  RU: ["VPL", "VPM", "медиальн", "переднебоков", "ложн", "ГАМК", "коленчат", "обонятель"],
  EN: ["VPL", "VPM", "medial", "anterolateral", "false-alarm", "GABA", "geniculate", "Olfactory"],
  KZ: ["VPL", "VPM", "медиалдық", "алдыңғы-бүйірлік", "жалған", "ГАМҚ", "тізелі", "иіс сезу"],
};
const ids = ["vpl-vpm-relay", "crossing-pathways", "attention-detection", "reticular-gating", "geniculate-and-olfaction"];
for (const id of ids) assert(source.includes('id: "' + id + '"'), "Missing task: " + id);
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "practice", title: "Practice " + lang, moduleTitle: "Module 14", ui: { showAnswer: "Show" }, sections: [] };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "practice");
  assert.equal(lesson.title, base.title);
  assert.equal(lesson.sections.length, 6, lang + ": five tasks and self-check expected");
  assert.equal(lesson.sections[5].blocks[0].type, "checklist");
  assert.equal(lesson.sections[5].blocks[0].items.length, 5);
  const combined = lesson.sections.map(s => s.blocks.map(b => b.text || b.items?.join(" ") || "").join(" ")).join(" ").toLowerCase();
  for (const marker of markers[lang]) {
    assert(combined.includes(marker.toLowerCase()), lang + ": missing scientific marker " + marker);
  }
  lesson.sections.slice(0, 5).forEach((section, i) => {
    assert(section.title.length > 12, lang + ": short task title " + i);
    assert.equal(section.blocks.length, 3);
    assert.equal(section.blocks[0].type, "paragraph");
    assert(section.blocks[0].text.length > 220, lang + ": insufficient reasoning prompt " + i);
    assert.equal(section.blocks[1].type, "response");
    assert.equal(section.blocks[2].type, "answer");
    assert.equal(section.blocks[2].items.length, 2);
    assert(section.blocks[2].items.every(s => s.length > 100), lang + ": incomplete feedback " + i);
  });
  assert(combined.includes(lang === "RU" ? "не проверяется автоматически" : lang === "EN" ? "does not automatically" : "автоматты бағаламайды"));
}
assert(!source.includes("ошақтан төмен діріл мен қалып сезімі сол жақта"), "KZ must describe ipsilateral, not left-sided loss");
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleFourteenPractice } from "./course-foundation/module-fourteen-practice";'));
const start = registry.indexOf("  14: {", registry.indexOf("const lessons"));
const end = registry.indexOf("  13: {", start);
assert(start >= 0 && end > start);
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[14]"));
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes(lang + ': createModuleFourteenPractice("' + lang + '"'), lang + ": practice route missing");
}
for (const section of ["objectives:", "pretest:", "theory:", '"one-minute":', "clinical:"]) {
  assert(block.includes(section), "Earlier reviewed route lost: " + section);
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "practice", lang);
  assert.equal(lesson?.kind, "practice", lang + ": incorrect route");
  assert.equal(lesson.sections.length, 6, lang + ": incorrect task count");
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 14 practice five tasks and self-check x RU/EN/KZ, route and preview guard.");
console.log("OPEN: independent medical KZ, full CI, browser/mobile/keyboard/voice/E2E.");
