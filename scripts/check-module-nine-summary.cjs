// Module 9 one-minute physiology summary: content, routing and preview lock.
// Run from repository root: node scripts/check-module-nine-summary.cjs
// Structural assertions do not replace scientific, language or browser review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const path = "content/course-foundation/module-nine-summary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 9 summary TypeScript parse errors");
const output = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((output.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 9 summary TypeScript transpilation errors");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (_section, language) => language };
  throw new Error("Unexpected import: " + name);
}};
vm.runInNewContext(output.outputText, context);
const create = context.exports.createModuleNineSummary;
assert.equal(typeof create, "function", "Summary factory missing");
const markers = {
  RU: ["задние корешки", "передние корешки", "Ia", "Ib", "γ-мотонейроны",
    "полисинаптическая", "Спинальный шок", "нейрогенного шока", "L2–L4", "S1–S2"],
  EN: ["dorsal roots", "ventral roots", "Ia", "Ib", "γ-motor neurons",
    "polysynaptic", "Spinal shock", "neurogenic shock", "L2–L4", "S1–S2"],
  KZ: ["артқы түбіршектер", "алдыңғы түбіршектер", "Ia", "Ib", "γ-мотонейрондар",
    "полисинапстық", "Жұлындық шок", "нейрогендік шок", "L2–L4", "S1–S2"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const lesson = create(language);
  assert.equal(lesson.kind, "one-minute", language + ": incorrect kind");
  assert(lesson.introduction.length > 60, language + ": missing introduction");
  assert.equal(lesson.cards.length, 5, language + ": expected five takeaways");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5, language + ": duplicate IDs");
  const explanations = [];
  for (const [i, card] of lesson.cards.entries()) {
    assert.equal(card.id, "module-9-summary-" + (i + 1), language + ": card ID");
    assert(card.title.length > 20, language + ": incomplete title");
    assert.equal(card.paragraphs.length, 1, language + ": one paragraph per card");
    assert(card.paragraphs[0].length > 160, language + ": incomplete explanation");
    assert.deepEqual(Array.from(card.links, l => l.section), ["theory", "practice"],
      language + ": summary links");
    explanations.push(card.paragraphs[0]);
  }
  assert.equal(new Set(explanations).size, 5, language + ": repeated explanations");
  const body = explanations.join(" ");
  for (const token of markers[language])
    assert(body.includes(token), language + ": missing physiological marker " + token);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleNineSummary } from "./course-foundation/module-nine-summary";'),
  "Missing module 9 summary import");
const start = registry.indexOf("  9: {");
const end = registry.indexOf("  8: {", start);
assert(start >= 0 && end > start, "Missing module 9 registry block");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[9]"), "Other module 9 lessons overwritten");
for (const language of ["RU", "EN", "KZ"])
  assert(block.includes(language + ': createModuleNineSummary("' + language + '")'),
    language + ": module 9 summary route not registered");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must remain disabled");
console.log("PASS: module 9 one-minute summary, five physiological cards x RU/EN/KZ, links and preview lock.");
console.log("OPEN: full TypeScript/build, actual route/browser and independent Kazakh editorial review.");
