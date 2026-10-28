// Source and route contract for Module 13 clinical bridge.
// This is not a substitute for independent medical, KZ or browser acceptance.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-thirteen-clinical.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 13 clinical parse error");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = {
  exports: {},
  require: name => {
    if (name === "../sections") return { getSectionTitle: (_section, lang) => "clinical-" + lang };
    throw new Error("Unexpected import: " + name);
  },
};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleThirteenClinical;
assert.equal(typeof create, "function");
const markers = {
  RU: ["дисметри", "Ромберг", "проприоцеп", "черв", "вестибул", "нистагм", "саккад", "атакси", "инсульт", "срочн"],
  EN: ["dysmetria", "Romberg", "propriocep", "vermis", "vestibul", "nystagmus", "saccades", "ataxia", "stroke", "urgent"],
  KZ: ["дисметрия", "Ромберг", "проприоцеп", "құртша", "вестибуляр", "Нистагм", "саккад", "атаксия", "инсульт", "шұғыл"],
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length >= 120, lang + ": introduction too short");
  assert.equal(lesson.cards.length, 5, lang + ": expected five cards");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5, lang + ": duplicate IDs");
  const combined = lesson.cards.map(c => c.paragraphs.join(" ")).join(" ").toLocaleLowerCase();
  for (const marker of markers[lang]) {
    assert(combined.includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  }
  lesson.cards.forEach((card, i) => {
    assert.equal(card.id, "module-13-clinical-" + (i + 1));
    assert(card.title.length >= 14, lang + ": short title");
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 280, lang + ": short clinical reasoning");
    assert.equal(card.links.length, 2);
    card.links.forEach(link => assert(["cases", "theory", "interactive", "practice", "references"].includes(link.section)));
  });
  assert(/Ромберг|Romberg/.test(lesson.cards[1].paragraphs[0]), lang + ": Romberg case missing");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleThirteenClinical } from "./course-foundation/module-thirteen-clinical";'));
const start = registry.indexOf("  13: {", registry.indexOf("const lessons"));
const end = registry.indexOf("  12: {", start);
assert(start >= 0 && end > start, "Module 13 registry block missing");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[13]"), "Unreviewed sections must be retained");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes(lang + ': createModuleThirteenClinical("' + lang + '")'), lang + ": clinical route missing");
}
for (const section of ["objectives:", "pretest:", "theory:", '"one-minute":']) {
  assert(block.includes(section), "Previous review override missing: " + section);
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(13, "clinical", lang);
  assert.equal(lesson?.kind, "clinical", lang + ": incorrect routed kind");
  assert.equal(lesson.cards.length, 5, lang + ": incorrect routed card count");
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: Module 13 clinical source, five cards × RU/EN/KZ, routes and preview guard.");
console.log("OPEN: independent Kazakh medical review and manual browser/mobile/keyboard/audio checks.");
