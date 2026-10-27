// Module 13 cerebellum objectives: scientific structure and route regression.
// Run from repository root. This does not replace clinical, KZ or browser review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-thirteen-objectives.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 13 objectives TypeScript syntax");
let initializer;
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, visit);
}
visit(ast);
assert(initializer, "Missing module 13 goals");
const js = ts.transpileModule("const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
const context = {};
vm.runInNewContext(js, context);
assert.deepEqual(Object.keys(context.goals).sort(), ["EN", "KZ", "RU"]);
const markers = {
  RU: ["мозжеч", "вестибуляр", "Пуркинье", "ГАМК", "глубокие ядра", "обратной связ", "дисметри", "атакси", "ипсилатерал", "мышечн"],
  EN: ["cerebell", "vestibular", "Purkinje", "GABA", "deep cerebellar nuclei", "feedback", "dysmetria", "ataxia", "ipsilateral", "strength"],
  KZ: ["мишық", "вестибуляр", "Пуркинье", "ГАМҚ", "терең ядро", "кері байланыс", "дисметрия", "атаксия", "ипсилатерал", "бұлшықет күш"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const items = context.goals[lang];
  assert.equal(items.length, 5, lang + ": five objectives");
  assert.equal(new Set(items.map(x => x[0])).size, 5, lang + ": unique titles");
  for (const [title, description] of items) {
    assert(title.length >= 20 && description.length >= 150, lang + ": incomplete outcome");
    assert(!/https?:\/\//.test(description), lang + ": no external source in learning text");
  }
  const all = items.flat().join(" ").toLowerCase();
  for (const marker of markers[lang])
    assert(all.includes(marker.toLowerCase()), lang + ": missing " + marker);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleThirteenObjectives } from "./course-foundation/module-thirteen-objectives";'));
const start = index.indexOf("  13: {");
const end = index.indexOf("  12: {", start);
assert(start >= 0 && end > start, "Module 13 registry");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[13]"), "Preserve other module 13 sections");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleThirteenObjectives("' + lang + '")'), lang + ": missing registration");
for (const section of ["pretest", "theory", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing pathway " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(13, "objectives", lang);
  assert.equal(lesson?.kind, "objectives", lang + ": route");
  assert.equal(lesson.outcomes.length, 5, lang + ": outcomes");
  assert.equal(lesson.navigation.links.length, 5, lang + ": pathway");
  assert.equal(new Set(lesson.outcomes.map(x => x.id)).size, 5, lang + ": unique IDs");
  assert(getLesson(13, "theory", lang), lang + ": theory preserved");
  assert(getLesson(13, "cases", lang), lang + ": cases preserved");
}
assert.equal(JSON.parse(read("vercel.json")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 13 objectives 5 x RU/EN/KZ, physiology, route and preview guard.");
console.log("OPEN: full TS, Node audits, build, browser, independent Kazakh clinical review.");
