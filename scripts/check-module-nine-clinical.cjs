// Module 9 clinical bridge: authored RU/EN/KZ and route regression.
// Run: node scripts/check-module-nine-clinical.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const file = "content/course-foundation/module-nine-clinical.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 9 clinical TypeScript syntax");
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const sandbox = {
  exports: {},
  require: name => {
    if (name === "../sections") return { getSectionTitle: (_section, lang) => "clinical-" + lang };
    throw new Error("Unexpected runtime import " + name);
  }
};
vm.runInNewContext(compiled.outputText, sandbox);
const create = sandbox.exports.createModuleNineClinical;
assert.equal(typeof create, "function");
const marker = {
  RU: ["спинальным шоком", "нисходящего", "гиперрефлексия", "нейрогенн", "срочной"],
  EN: ["spinal shock", "descending", "hyperreflexia", "neurogenic shock", "urgent"],
  KZ: ["жұлындық шок", "төмендеуші", "гиперрефлексия", "нейрогендік шок", "шұғыл"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length > 50, lang + ": introduction");
  assert.equal(lesson.cards.length, 5, lang + ": stages");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5);
  const body = lesson.cards.map(c => c.paragraphs.join(" ")).join(" ");
  for (const token of marker[lang]) assert(body.includes(token), lang + ": missing " + token);
  for (let i = 0; i < 5; i++) {
    const card = lesson.cards[i];
    assert.equal(card.id, "module-9-clinical-" + (i + 1));
    assert(card.title.length >= 8);
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 250, lang + ": stage " + (i + 1) + " too short");
    assert.equal(card.links.length, 2);
    for (const link of card.links)
      assert(["cases", "theory", "one-minute", "practice", "tests", "questions"].includes(link.section));
  }
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleNineClinical } from "./course-foundation/module-nine-clinical";'));
const start = registry.indexOf("  9: {");
const end = registry.indexOf("  8: {", start);
assert(start >= 0 && end > start, "Module 9 registry boundaries");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[9]"), "Other module 9 sections must remain");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleNineClinical("' + lang + '")'),
    lang + ": module 9 clinical not registered");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: Module 9 clinical 5 stages × RU/EN/KZ, navigation, source wiring, preview disabled.");
console.log("NOTE: content checks do not replace clinical translation review or a browser/build test.");
