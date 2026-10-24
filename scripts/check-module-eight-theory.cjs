// Module 8 theory source and localized data regression.
// This does not replace full scientific, translation, browser or build verification.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");

const file = "content/course-foundation/module-eight-theory.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 theory TypeScript parse errors");
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((output.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 8 theory transpile errors");
const context = { exports: {} };
vm.runInNewContext(output.outputText, context);
const create = context.exports.createModuleEightTheory;
assert.equal(typeof create, "function", "Theory factory is missing");

const ids = ["dorsal-column-medial-lemniscus", "anterolateral-system",
  "corticospinal-tract", "localization-comparison", "clinical-examination-and-limits"];
const keys = {
  RU: ["VPL", "Лиссауэра", "корково-спинномозгов", "перекрёст"],
  EN: ["VPL", "Lissauer", "corticospinal", "decussation"],
  KZ: ["VPL", "Лиссауэр", "қыртыс-жұлын", "айқасу"],
};
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "theory", title: "Base", sections: [
    { id: "quick-summary", title: "Base", blocks: [] }],
    outcomes: { title: "", introduction: "", items: [] },
    terms: { title: "", items: [] } };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory", lang + ": theory discriminator changed");
  assert.equal(lesson.sections.length, 6, lang + ": expected base plus 5 sections");
  assert.equal(lesson.sections[0].id, "quick-summary", lang + ": base theory lost");
  assert.deepEqual(Array.from(lesson.sections.slice(1), s => s.id), ids,
    lang + ": missing or reordered section");
  const texts = [];
  for (const section of lesson.sections.slice(1)) {
    assert(section.title.length >= 20, lang + ": missing heading " + section.id);
    assert.equal(section.blocks.length, 2, lang + ": expected 2 paragraphs " + section.id);
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph", lang + ": expected paragraph");
      assert(block.text.length >= 180, lang + ": explanation too short " + section.id);
      texts.push(block.text);
    }
  }
  for (const key of keys[lang])
    assert(texts.join(" ").includes(key), lang + ": missing concept " + key);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleEightTheory } from "./course-foundation/module-eight-theory";'),
  "Module 8 theory not imported");
const start = index.indexOf("  8: {");
const end = index.indexOf("  7: {", start);
assert(start >= 0 && end > start, "Module 8 registration missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[8]"), "Module 8 other lessons overwritten");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleEightTheory("' + lang + '"'),
    lang + ": theory not wired");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Vercel previews must remain disabled");
console.log("PASS: module 8 theory 5 sections x 2 paragraphs x RU/EN/KZ, routing and preview lock.");
