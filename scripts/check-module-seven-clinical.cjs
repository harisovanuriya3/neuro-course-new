// Module 7 clinical bridge: runtime data contract and route wiring.
// Requires the local typescript devDependency; no network or deployment.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-seven-clinical.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "clinical source must parse");
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((output.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const ctx = {
  exports: {},
  require: name => {
    if (name === "../sections") return { getSectionTitle: (_slug, language) => "clinical-" + language };
    throw new Error("Unexpected runtime import " + name);
  }
};
vm.runInNewContext(output.outputText, ctx);
const factory = ctx.exports.createModuleSevenClinical;
assert.equal(typeof factory, "function");
const all = {};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = factory(lang);
  all[lang] = lesson;
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length > 35, lang + ": intro too short");
  assert.equal(lesson.cards.length, 5, lang + ": five reasoning stages required");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5);
  for (let i = 0; i < 5; i++) {
    const c = lesson.cards[i];
    assert.equal(c.id, "module-7-clinical-" + (i + 1));
    assert(c.title.length > 7, lang + ": empty stage heading");
    assert.equal(c.paragraphs.length, 1);
    assert(c.paragraphs[0].length > 140, lang + ": incomplete physiological explanation");
    assert.equal(c.links.length, 2, lang + ": two follow-up destinations");
    for (const link of c.links)
      assert(["theory", "interactive", "practice", "cases", "tests", "questions"].includes(link.section));
  }
  const body = lesson.cards.map(c => c.paragraphs[0]).join(" ");
  for (const token of ["Ia", "L2", "L4"])
    assert(body.includes(token), lang + ": missing neurophysiology token " + token);
  assert(/Jendrassik|Ендрассик/.test(body), lang + ": reinforcement missing");
  assert(/Golgi|Гольджи/.test(body), lang + ": spindle/tendon distinction missing");
  assert(/interneuron|интернейрон/.test(body), lang + ": inhibitory branch missing");
}
assert.notEqual(all.RU.cards[0].paragraphs[0], all.EN.cards[0].paragraphs[0]);
assert.notEqual(all.EN.cards[0].paragraphs[0], all.KZ.cards[0].paragraphs[0]);
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenClinical } from "./course-foundation/module-seven-clinical";'));
const start = registry.indexOf("  7: {");
const end = registry.indexOf("  6: {", start);
assert(start >= 0 && end > start, "Module 7 registry boundary");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[7]"), "Other sections must be preserved");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleSevenClinical("' + lang + '")'), lang + " clinical route not registered");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 7 clinical bridge, 5 cards × RU/EN/KZ, routes and preview lock.");
console.log("NOTE: this is not a browser, translation or clinical validation.");
