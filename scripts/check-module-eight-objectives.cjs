// Module 8 objectives: source structure, authored content and actual course registry.
// Run: node scripts/check-module-eight-objectives.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const file = "content/course-foundation/module-eight-objectives.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 8 objectives syntax");
let initializer;
function walk(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, walk);
}
walk(ast);
assert(initializer, "Module 8 goals object absent");
const code = ts.transpileModule(
  "const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }
).outputText;
const ctx = {};
vm.runInNewContext(code, ctx);
assert.deepEqual(Object.keys(ctx.goals).sort(), ["EN", "KZ", "RU"]);
for (const lang of ["RU", "EN", "KZ"]) {
  assert.equal(ctx.goals[lang].length, 5, lang + ": five objectives");
  const titles = new Set();
  for (const [title, description] of ctx.goals[lang]) {
    assert(title.length >= 20 && description.length >= 130, lang + ": incomplete objective");
    assert(!titles.has(title), lang + ": duplicate title");
    titles.add(title);
  }
}
for (const [lang, terms] of Object.entries({
  RU: ["медиальной петли", "антеролатеральной", "продолговатом мозге", "корково-спинномозговой", "вибрации"],
  EN: ["medial-lemniscal", "anterolateral", "medullary", "corticospinal", "vibration"],
  KZ: ["медиалдық ілмек", "антеролатералдық", "сопақша", "қыртыс-жұлын", "діріл"],
})) {
  const all = ctx.goals[lang].flat().join(" ").toLowerCase();
  for (const term of terms) assert(all.includes(term.toLowerCase()), lang + ": missing " + term);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleEightObjectives } from "./course-foundation/module-eight-objectives";'));
const start = index.indexOf("  8: {");
const end = index.indexOf("  7: {", start);
assert(start > 0 && end > start, "Module 8 registry block missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[8]"), "Other module 8 lessons must be retained");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleEightObjectives("' + lang + '")'), lang + ": missing objectives");
for (const section of ["theory", "pretest", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing navigation " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(8, "objectives", lang);
  assert.equal(lesson?.kind, "objectives", lang + ": route kind");
  assert.equal(lesson.outcomes.length, 5, lang + ": route outcomes");
  assert.equal(lesson.navigation.links.length, 5, lang + ": route navigation");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must stay disabled");
console.log("PASS: module 8 objectives, 5 x 3 languages, registered route and no previews.");
console.log("OPEN: npm audit, tsc, build, browser, independent Kazakh-language review.");
