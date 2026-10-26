// Evidence-based module 11 objectives: RU/EN/KZ, source structure and runtime registry.
// Run from repository root: node scripts/check-module-eleven-objectives.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-eleven-objectives.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 11 objectives TypeScript parse");
let initializer;
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, visit);
}
visit(ast);
assert(initializer, "Module 11 goals declaration missing");
const js = ts.transpileModule("const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
const context = {};
vm.runInNewContext(js, context);
assert.deepEqual(Object.keys(context.goals).sort(), ["EN", "KZ", "RU"]);
for (const lang of ["RU", "EN", "KZ"]) {
  const items = context.goals[lang];
  assert.equal(items.length, 5, lang + ": five distinct learning outcomes");
  const titles = new Set();
  for (const [title, description] of items) {
    assert(title.length >= 20 && description.length >= 145, lang + ": incomplete objective");
    assert(!titles.has(title), lang + ": duplicate title");
    titles.add(title);
  }
}
for (const [lang, words] of Object.entries({
  RU: ["кортикоспиналь", "кортико-бульбар", "ретикулоспиналь", "вестибулоспиналь", "проприоцептив", "спастич"],
  EN: ["corticospinal", "corticobulbar", "reticulospinal", "vestibulospinal", "proprioceptive", "spasticity"],
  KZ: ["кортикоспинал", "кортикобульбар", "ретикулоспинал", "вестибулоспинал", "проприоцептив", "спастикалық"],
})) {
  const all = context.goals[lang].flat().join(" ").toLowerCase();
  for (const word of words) assert(all.includes(word.toLowerCase()), lang + ": missing " + word);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleElevenObjectives } from "./course-foundation/module-eleven-objectives";'));
const blockStart = index.indexOf("  11: {");
const blockEnd = index.indexOf("  3: {", blockStart);
assert(blockStart >= 0 && blockEnd > blockStart, "Module 11 registry block missing");
const block = index.slice(blockStart, blockEnd);
assert(block.includes("...foundationLessons[11]"), "Other module 11 sections must be preserved");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleElevenObjectives("' + lang + '")'), lang + ": registration missing");
for (const section of ["theory", "pretest", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing navigation to " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(11, "objectives", lang);
  assert.equal(lesson?.kind, "objectives", lang + ": route kind");
  assert.equal(lesson.outcomes.length, 5, lang + ": outcome count");
  assert.equal(lesson.navigation.links.length, 5, lang + ": navigation count");
  assert(getLesson(11, "theory", lang), lang + ": original theory preserved");
  assert(getLesson(11, "cases", lang), lang + ": original cases preserved");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 11 objectives 5×3, registry, preserved sections, preview disabled.");
console.log("OPEN: independent translation, tsc, build, browser and interaction checks.");
