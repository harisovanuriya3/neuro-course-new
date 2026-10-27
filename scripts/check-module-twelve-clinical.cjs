// Module 12 clinical: source/route contract for the basal-ganglia clinical bridge.
// Not a substitute for full scientific, language, accessibility or browser acceptance.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-twelve-clinical.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 12 clinical TS parse error");
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
const create = context.exports.createModuleTwelveClinical;
assert.equal(typeof create, "function");
const markers = {
  RU: ["брадикинез", "дисметри", "стриатум", "GPi", "SNr", "SNc", "D1", "D2", "талам", "хоре", "баллизм", "срочн"],
  EN: ["bradykinesia", "dysmetria", "striatum", "GPi", "SNr", "SNc", "D1", "D2", "thalam", "chorea", "ballism", "urgent"],
  KZ: ["брадикинез", "дисметрия", "Стриатум", "GPi", "SNr", "SNc", "D1", "D2", "талам", "хорея", "баллизм", "шұғыл"],
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length >= 100, lang + ": introduction too short");
  assert.equal(lesson.cards.length, 5, lang + ": expected five clinical cards");
  assert.equal(new Set(lesson.cards.map(card => card.id)).size, 5, lang + ": duplicate card IDs");
  const text = lesson.cards.map(card => card.paragraphs.join(" ")).join(" ");
  for (const marker of markers[lang]) {
    assert(text.toLocaleLowerCase().includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  }
  for (let i = 0; i < 5; i++) {
    const card = lesson.cards[i];
    assert.equal(card.id, "module-12-clinical-" + (i + 1));
    assert(card.title.length >= 14, lang + ": short card title " + i);
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 300, lang + ": short explanation " + i);
    assert.equal(card.links.length, 2);
    for (const link of card.links) {
      assert(["cases", "theory", "interactive", "practice", "questions", "references"].includes(link.section),
        lang + ": unknown link " + link.section);
    }
  }
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleTwelveClinical } from "./course-foundation/module-twelve-clinical";'));
const start = registry.indexOf("  12: {", registry.indexOf("const lessons"));
const end = registry.indexOf("  11: {", start);
assert(start >= 0 && end > start, "Module 12 registry block not found");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[12]"), "Unreviewed module 12 sections must remain");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes(lang + ': createModuleTwelveClinical("' + lang + '")'), lang + ": route missing");
}
for (const section of ["objectives", "pretest", "theory", '"one-minute"']) {
  assert(block.includes(section + ":"), "Previous review override missing: " + section);
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(12, "clinical", lang);
  assert.equal(lesson?.kind, "clinical", lang + ": incorrect routed kind");
  assert.equal(lesson.cards.length, 5, lang + ": incorrect routed card count");
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 12 clinical source, 5 cards × 3 languages, route, and preview guard.");
console.log("OPEN: full TS typecheck, build, browser/mobile/keyboard/audio tests and independent Kazakh editing.");
