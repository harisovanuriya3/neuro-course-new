// Targeted source and data regression for module 7 / theory.
// Does not establish clinical validity or replace browser/translation review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");

const path = "content/course-foundation/module-seven-theory.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 theory TypeScript syntax");
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((output.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 7 theory transpilation");
const context = { exports: {} };
vm.runInNewContext(output.outputText, context);
const create = context.exports.createModuleSevenTheory;
assert.equal(typeof create, "function", "Theory factory missing");

const ids = ["reflex-arc-path", "spindle-and-gamma", "inhibition-and-tendon", "reflex-examination-limits"];
const languages = ["RU", "EN", "KZ"];
for (const lang of languages) {
  const base = { kind: "theory", title: "Base", sections: [{ id: "quick-summary", title: "Base", blocks: [] }],
    outcomes: { title: "", introduction: "", items: [] }, terms: { title: "", items: [] } };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory", lang + ": discriminator changed");
  assert.equal(lesson.sections.length, 5, lang + ": expected original plus four new sections");
  assert.equal(lesson.sections[0].id, "quick-summary", lang + ": original theory removed");
  assert.deepEqual(Array.from(lesson.sections.slice(1), section => section.id), ids,
    lang + ": theory section identifiers");
  for (const section of lesson.sections.slice(1)) {
    assert(section.title.length > 12, lang + ": missing heading " + section.id);
    assert.equal(section.blocks.length, 2, lang + ": expected two explanations in " + section.id);
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph", lang + ": expected paragraph");
      assert(block.text.length > 150, lang + ": explanation too short in " + section.id);
    }
  }
  const text = lesson.sections.flatMap(section => section.blocks.map(block => block.text || "")).join(" ");
  for (const term of ["Ia", "Ib", "II"])assert(text.includes(term), lang + ": missing " + term);
  assert(text.includes("Гольджи") || text.includes("Golgi"), lang + ": tendon receptor omitted");
  assert(text.includes("Ендрассик") || text.includes("Jendrassik"), lang + ": examination omitted");
}

const index = read("content/index.ts");
assert(index.includes('import { createModuleSevenTheory } from "./course-foundation/module-seven-theory";'),
  "Theory factory not imported");
const start = index.indexOf("  7: {");
const end = index.indexOf("  6: {", start);
assert(start > 0 && end > start, "Module 7 registration not found");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[7]"), "Other module 7 lessons lost");
for (const lang of languages)
  assert(block.includes(lang + ': createModuleSevenTheory("' + lang + '"'),
    lang + ": theory not wired");

const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Preview must stay disabled");
console.log("PASS: module 7 theory 4 sections × 2 paragraphs × RU/EN/KZ, registration and preview lock.");
