// Module 15 clinical bridge: compile and exercise all three language factories.
// This verifies structure, basic coverage and route wiring, not medical acceptance.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const path = "content/course-foundation/module-fifteen-clinical.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Clinical TS parse errors");
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
    throw Error("Unexpected runtime dependency: " + name);
  },
};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleFifteenClinical;
assert.equal(typeof create, "function");
const markers = {
  RU: ["AQP2", "осмоляль", "ангиотензин", "испарени", "простагландин", "супрахиазмат"],
  EN: ["AQP2", "osmol", "angiotensin", "evaporat", "prostaglandin", "suprachiasmat"],
  KZ: ["AQP2", "осмоляль", "ангиотензин", "булан", "простагландин", "супрахиазмат"],
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "clinical");
  assert.equal(lesson.title, "clinical-" + lang);
  assert(lesson.introduction.length >= 100, lang + ": introduction too short");
  assert.equal(lesson.cards.length, 5, lang + ": expected five distinct clinical cards");
  assert.equal(new Set(lesson.cards.map(c => c.id)).size, 5, lang + ": repeated IDs");
  assert.equal(new Set(lesson.cards.map(c => c.title)).size, 5, lang + ": repeated titles");
  const body = lesson.cards.map(c => c.paragraphs.join(" ")).join(" ").toLocaleLowerCase();
  for (const marker of markers[lang]) {
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing physiology marker " + marker);
  }
  lesson.cards.forEach((card, index) => {
    assert.equal(card.id, "module-15-clinical-" + (index + 1));
    assert(card.title.length >= 12);
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 400, lang + ": short clinical reasoning");
    assert.equal(card.links.length, 2);
    assert(card.links.some(link => link.section === "theory"));
    assert(card.links.every(link => ["theory", "cases", "references"].includes(link.section)));
  });
  assert(lesson.cards[0].paragraphs[0].includes("AQP2"));
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleFifteenClinical } from "./course-foundation/module-fifteen-clinical";'));
const start = registry.indexOf("  15: {", registry.indexOf("const lessons"));
const end = registry.indexOf("  14: {", start);
assert(start >= 0 && end > start, "Module 15 route block not found");
const block = registry.slice(start, end);
assert(block.includes("...foundationLessons[15]"), "Do not drop other sections");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(block.includes(lang + ': createModuleFifteenClinical("' + lang + '")'), lang + ": clinical route missing");
}
for (const section of ["objectives:", "pretest:", "theory:", '"one-minute":']) {
  assert(block.includes(section), "Previously reviewed section lost: " + section);
}
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: Module 15 clinical 5 original scenarios x RU/EN/KZ, safe route and Vercel guard.");
console.log("OPEN: independent physician/Kazakh editing, TypeScript full build and browser acceptance.");
