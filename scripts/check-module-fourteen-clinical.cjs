// Module 14 thalamic clinical bridge: source, route and safety regression.
// Not a substitute for independent medical/KZ or browser acceptance.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-fourteen-clinical.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 clinical TypeScript parse error");
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
const create = context.exports.createModuleFourteenClinical;
assert.equal(typeof create, "function");
const markers = {
  RU: ["VPL", "VPM", "медиальн", "переднебоков", "коленчат", "хиазм", "срочн"],
  EN: ["VPL", "VPM", "medial lemniscus", "anterolateral", "geniculate", "chiasm", "Urgent"],
  KZ: ["VPL", "VPM", "медиалдық", "алдыңғы-бүйірлік", "тізелі", "хиазма", "Шұғыл"],
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length >= 150, lang + ": short introduction");
  assert.equal(lesson.cards.length, 5, lang + ": five cases expected");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5);
  const combined = lesson.cards.map(c => c.paragraphs.join(" ")).join(" ").toLocaleLowerCase();
  for (const marker of markers[lang]) {
    assert(combined.includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  }
  lesson.cards.forEach((card, i) => {
    assert.equal(card.id, "module-14-clinical-" + (i + 1));
    assert(card.title.length >= 18, lang + ": short title");
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 450, lang + ": short reasoning");
    assert.equal(card.links.length, 2);
    card.links.forEach(link => assert(["cases", "theory", "interactive", "practice", "references"].includes(link.section)));
  });
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleFourteenClinical } from "./course-foundation/module-fourteen-clinical";'));
const start = registry.indexOf("  14: {", registry.indexOf("const lessons"));
const end = registry.indexOf("  13: {", start);
assert(start >= 0 && end > start, "Module 14 registry block missing");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[14]"), "Unreviewed sections must remain intact");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes(lang + ': createModuleFourteenClinical("' + lang + '")'), lang + ": clinical route missing");
}
for (const section of ["objectives:", "pretest:", "theory:", '"one-minute":']) {
  assert(block.includes(section), "Earlier reviewed override missing: " + section);
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "clinical", lang);
  assert.equal(lesson?.kind, "clinical", lang + ": incorrect route kind");
  assert.equal(lesson.cards.length, 5, lang + ": incorrect route card count");
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: Module 14 clinical five cards x RU/EN/KZ, routes and preview guard.");
console.log("OPEN: independent Kazakh medical editing and browser/mobile/keyboard/voice/E2E.");
