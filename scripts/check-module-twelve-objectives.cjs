// Scientific and structural checks for module 12 objectives; run from repo root.
// This is not a substitute for expert translation, full build or browser QA.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-twelve-objectives.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 12 objectives TypeScript syntax");
let initializer;
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, visit);
}
visit(ast);
assert(initializer, "Missing goals declaration");
const js = ts.transpileModule("const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
const context = {};
vm.runInNewContext(js, context);
assert.deepEqual(Object.keys(context.goals).sort(), ["EN", "KZ", "RU"]);
const scientificMarkers = {
  RU: ["стриатум", "GPe", "GPi", "субталам", "SNc", "SNr", "таламус", "ГАМК", "прямой путь", "непрямой", "D1", "D2", "брадикинез", "хоре", "дисметри", "слабост"],
  EN: ["striatum", "GPe", "GPi", "subthalam", "SNc", "SNr", "thalamus", "GABA", "direct pathway", "indirect pathway", "D1", "D2", "bradykinesia", "chore", "dysmetria", "weakness"],
  KZ: ["стриатум", "GPe", "GPi", "субталам", "SNc", "SNr", "таламус", "ГАМҚ", "тікелей жол", "жанама жол", "D1", "D2", "брадикинез", "хоре", "дисметрия", "әлсіздігі"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const items = context.goals[lang];
  assert.equal(items.length, 5, lang + ": five objectives");
  assert.equal(new Set(items.map(item => item[0])).size, 5, lang + ": unique titles");
  for (const [title, description] of items) {
    assert(title.length >= 20 && description.length >= 145, lang + ": incomplete learning objective");
    assert(!/https?:\/\//.test(description), lang + ": no remote content in learning outcomes");
  }
  const all = items.flat().join(" ").toLowerCase();
  for (const marker of scientificMarkers[lang])
    assert(all.includes(marker.toLowerCase()), lang + ": missing physiological marker " + marker);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleTwelveObjectives } from "./course-foundation/module-twelve-objectives";'));
const blockStart = index.indexOf("  12: {");
const blockEnd = index.indexOf("  11: {", blockStart);
assert(blockStart >= 0 && blockEnd > blockStart, "Module 12 registry block missing");
const block = index.slice(blockStart, blockEnd);
assert(block.includes("...foundationLessons[12]"), "Module 12 other sections must be preserved");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleTwelveObjectives("' + lang + '")'), lang + ": module 12 not registered");
for (const section of ["pretest", "theory", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing pathway " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(12, "objectives", lang);
  assert.equal(lesson?.kind, "objectives", lang + ": route");
  assert.equal(lesson.outcomes.length, 5, lang + ": outcome count");
  assert.equal(lesson.navigation.links.length, 5, lang + ": navigation");
  assert.equal(new Set(lesson.outcomes.map(x => x.id)).size, 5, lang + ": unique IDs");
  assert(getLesson(12, "theory", lang), lang + ": original theory preserved");
  assert(getLesson(12, "cases", lang), lang + ": original cases preserved");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 12 objectives 5×3, scientific markers, routes, preview disabled.");
console.log("OPEN: complete course tests, TS type-check, build, browser and native KZ review.");
