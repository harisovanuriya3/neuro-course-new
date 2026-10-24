// Targeted module 8 one-minute summary content and route regression.
// Structural checks do not replace clinical, translation, browser or build review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-eight-summary.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 summary TypeScript syntax");
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((output.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 8 summary transpilation");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (_section, language) => language };
  throw new Error("Unexpected import: " + name);
}};
vm.runInNewContext(output.outputText, context);
const create = context.exports.createModuleEightSummary;
assert.equal(typeof create, "function");
const tokens = {
  RU: ["VPL", "Лиссауэра", "корково-спинномозгов", "перекрёст"],
  EN: ["VPL", "Lissauer", "corticospinal", "decussation"],
  KZ: ["VPL", "Лиссауэр", "қыртыс-жұлын", "айқасу"],
};
for (const language of ["RU", "EN", "KZ"]) {
  const lesson = create(language);
  assert.equal(lesson.kind, "one-minute", language + ": wrong lesson type");
  assert(lesson.introduction.length > 50, language + ": missing introduction");
  assert.equal(lesson.cards.length, 5, language + ": expected five takeaways");
  assert.equal(new Set(lesson.cards.map(card => card.id)).size, 5, language + ": repeated IDs");
  for (const [index, card] of lesson.cards.entries()) {
    assert.equal(card.id, "module-8-summary-" + (index + 1), language + ": unstable card ID");
    assert(card.title.length >= 15, language + ": missing heading");
    assert.equal(card.paragraphs.length, 1, language + ": expected one explanation");
    assert(card.paragraphs[0].length >= 170, language + ": incomplete physiological explanation");
    assert.deepEqual(Array.from(card.links, link => link.section), ["theory", "practice"],
      language + ": broken summary links");
  }
  const body = lesson.cards.map(card => card.paragraphs[0]).join(" ");
  for (const token of tokens[language])
    assert(body.includes(token), language + ": missing physiological marker " + token);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleEightSummary } from "./course-foundation/module-eight-summary";'),
  "Summary factory not imported");
const start = registry.indexOf("  8: {");
const end = registry.indexOf("  7: {", start);
assert(start >= 0 && end > start, "Module 8 registry block missing");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[8]"), "Other module 8 sections overwritten");
for (const language of ["RU", "EN", "KZ"])
  assert(block.includes(language + ': createModuleEightSummary("' + language + '")'),
    language + ": one-minute summary not registered");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must remain disabled");
console.log("PASS: module 8 one-minute summary 5 physiological takeaways × RU/EN/KZ, links, registry and preview lock.");
