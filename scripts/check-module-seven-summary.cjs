// Targeted module 7 one-minute scientific-content and wiring regression.
// Structural/semantic markers only: not a substitute for independent scientific,
// translation, accessibility or browser validation.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-seven-summary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 summary TypeScript syntax");
const result = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 7 summary transpilation");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (_section, language) => language };
  throw new Error("Unexpected import: " + name);
}};
vm.runInNewContext(result.outputText, context);
const create = context.exports.createModuleSevenSummary;
assert.equal(typeof create, "function");
const languages = ["RU", "EN", "KZ"];
for (const language of languages) {
  const lesson = create(language);
  assert.equal(lesson.kind, "one-minute", language + ": wrong lesson kind");
  assert.equal(lesson.cards.length, 5, language + ": expected five scientific conclusions");
  assert.equal(new Set(lesson.cards.map(card => card.id)).size, 5, language + ": repeated ID");
  assert.equal(lesson.introduction.length > 30, true, language + ": missing introduction");
  for (const [index, card] of lesson.cards.entries()) {
    assert.equal(card.id, "module-7-summary-" + (index + 1), language + ": unstable card ID");
    assert(card.title.length > 10, language + ": empty takeaway title");
    assert.equal(card.paragraphs.length, 1, language + ": one explanation per takeaway");
    assert(card.paragraphs[0].length > 100, language + ": explanation too short");
    assert.deepEqual(Array.from(card.links, link => link.section), ["theory", "practice"],
      language + ": links must point to related lessons");
  }
  const body = lesson.cards.map(card => card.paragraphs[0]).join(" ");
  for (const token of ["Ia", "Ib", "II"])assert(body.includes(token), language + ": missing " + token);
  assert(/Jendrassik|Ендрассик/.test(body), language + ": examination limitations omitted");
  assert(/Golgi|Гольджи/.test(body), language + ": tendon organ omitted");
  assert(/interneuron|интернейрон/.test(body), language + ": reciprocal inhibition omitted");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenSummary } from "./course-foundation/module-seven-summary";'),
  "Summary factory not imported");
const start = registry.indexOf("  7: {");
const end = registry.indexOf("  6: {", start);
assert(start >= 0 && end > start, "Module 7 registration not isolated");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[7]"), "Other module 7 lessons lost");
for (const language of languages)
  assert(block.includes(language + ': createModuleSevenSummary("' + language + '")'),
    language + ": one-minute lesson not wired");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Vercel previews must remain disabled");
console.log("PASS: module 7 one-minute 5 scientific takeaways × RU/EN/KZ, registry, links and preview lock.");
