// Module 15: source-level regression for hypothalamus theory and route wiring.
// Scientific claims require independent expert review beyond this test.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-fifteen-theory.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 15 theory TS parse");
const transpiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true
});
assert.equal((transpiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = { exports: {} };
vm.runInNewContext(transpiled.outputText, context);
const create = context.exports.createModuleFifteenTheory;
assert.equal(typeof create, "function");
const ids = [
  "hypothalamus-pituitary-pathways",
  "osmotic-and-volume-thirst",
  "vasopressin-kidney-feedback",
  "temperature-circadian-feeding",
  "hypothalamic-clinical-inference"
];
const markers = {
  RU: ["супраоптическ", "паравентрикулярн", "портальн", "осмоляльност", "барорецептор",
    "ангиотензин", "V2", "аквапорин-2", "преоптическ", "супрахиазматическ", "вегетативн"],
  EN: ["supraoptic", "paraventricular", "portal", "osmolality", "baroreceptor",
    "angiotensin", "V2", "aquaporin-2", "preoptic", "suprachiasmatic", "autonomic"],
  KZ: ["супраоптик", "паравентрикуляр", "қақпалық", "осмолялдық", "барорецептор",
    "ангиотензин", "V2", "аквапорин-2", "преоптик", "супрахиазмат", "вегетатив"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "theory", title: "Existing", sections: [
    { id: "quick-summary", title: "Summary", blocks: [] },
    { id: "mechanism", title: "Mechanism", blocks: [] },
    { id: "interpretation", title: "Interpretation", blocks: [] }
  ] };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory");
  assert.equal(lesson.sections.length, base.sections.length + ids.length);
  for (let i = 0; i < base.sections.length; i++)
    assert.equal(lesson.sections[i], base.sections[i], lang + ": foundation section lost");
  assert.deepEqual(Array.from(lesson.sections.slice(base.sections.length), x => x.id), ids);
  const texts = [];
  for (const section of lesson.sections.slice(base.sections.length)) {
    assert(section.title.length > 15, lang + ": short heading");
    assert.equal(section.blocks.length, 2, lang + ": paragraph count");
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph");
      assert(block.text.length >= 190, lang + ": insufficient explanation");
      texts.push(block.text);
    }
  }
  assert.equal(new Set(texts).size, 10, lang + ": duplicated theory text");
  const body = texts.join(" ").toLocaleLowerCase();
  for (const marker of markers[lang])
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  assert(!/diagnosis confirmed|диагноз установлен|диагноз анықталды/i.test(body));
  if (lang === "RU") assert(!/Тиімді айналымдағы көлем азайса/i.test(body), "RU: Kazakh leakage");
  if (lang === "KZ") assert(!/\b(которые|однако|следовательно|потому что)\b/i.test(body));
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleFifteenTheory } from "./course-foundation/module-fifteen-theory";'));
const start = index.indexOf("  15: {", index.indexOf("const lessons"));
const end = index.indexOf("  14: {", start);
assert(start >= 0 && end > start);
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[15]"));
assert(block.includes("createModuleFifteenObjectives") && block.includes("createModuleFifteenPretest"));
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleFifteenTheory("' + lang + '", foundationLessons[15].theory.' + lang));
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(15, "theory", lang);
  assert.equal(lesson?.kind, "theory");
  for (const id of ids) assert(lesson.sections.some(section => section.id === id), lang + ": " + id);
  assert(getLesson(15, "objectives", lang));
  assert(getLesson(15, "pretest", lang));
}
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fifteen-theory.cjs"));
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 15 theory 5 sections x 2 paragraphs x RU/EN/KZ; routes and preview guard.");
console.log("OPEN: independent clinical/KZ review, full build, browser and voice testing.");
