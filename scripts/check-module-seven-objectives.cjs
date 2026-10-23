// Module 7 objectives: evidence-aligned physiology, language coverage and route wiring.
// This structural test does not replace a browser check or an independent KZ review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const file = "content/course-foundation/module-seven-objectives.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 objectives TypeScript syntax");

let initializer;
function walk(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, walk);
}
walk(ast);
assert(initializer, "Missing authored goals");
const js = ts.transpileModule(
  "const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }
).outputText;
const ctx = {};
vm.runInNewContext(js, ctx);
const goals = ctx.goals;
assert.deepEqual(Object.keys(goals).sort(), ["EN", "KZ", "RU"]);
for (const lang of ["RU", "EN", "KZ"]) {
  assert.equal(goals[lang].length, 5, lang + ": expected five objectives");
  const titles = new Set();
  for (const pair of goals[lang]) {
    assert.equal(pair.length, 2, lang + ": title and description required");
    const [title, description] = pair;
    assert(title.length >= 12 && description.length >= 115, lang + ": insufficient detail");
    assert(!titles.has(title), lang + ": duplicate objective");
    titles.add(title);
  }
}
for (const [lang, required] of Object.entries({
  RU: ["Ia", "Ib", "II", "интернейрон", "гамма", "Ендрассик"],
  EN: ["Ia", "Ib", "II", "interneuron", "gamma", "Jendrassik"],
  KZ: ["Ia", "Ib", "II", "интернейрон", "гамма", "Ендрассик"],
})) {
  const all = goals[lang].flat().join(" ");
  for (const term of required)
    assert(all.includes(term), lang + ": missing physiology term " + term);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleSevenObjectives } from "./course-foundation/module-seven-objectives";'));
const start = index.indexOf("  7: {");
const end = index.indexOf("  6: {", start);
assert(start > 0 && end > start, "Missing module 7 registration");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[7]"), "Module 7 other lessons must remain intact");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleSevenObjectives("' + lang + '")'),
    "Missing module 7 objectives route " + lang);
for (const section of ["theory", "pretest", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing learning pathway " + section);
// An authored diagnostic pretest existed but was not reachable from getLesson(7, "pretest", lang).
// Verify the real registration and the two scientifically keyed questions.
const pretestFile = "content/course-foundation/module-seven-pretest.ts";
const pretestSource = read(pretestFile);
const pretestAst = ts.createSourceFile(pretestFile, pretestSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(pretestAst.parseDiagnostics.length, 0, "Module 7 pretest TypeScript syntax");
let pretestInit;
function walkPretest(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "localized")
    pretestInit = node.initializer;
  ts.forEachChild(node, walkPretest);
}
walkPretest(pretestAst);
assert(pretestInit, "Missing module 7 pretest locales");
const pretestJs = ts.transpileModule(
  "const localized=" + pretestInit.getText(pretestAst) + ";globalThis.data=localized;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }
).outputText;
const pretestCtx = {};
vm.runInNewContext(pretestJs, pretestCtx);
for (const lang of ["RU", "EN", "KZ"]) {
  const locale = pretestCtx.data[lang];
  assert(locale.intro.length > 45, lang + ": missing diagnostic instruction");
  assert.equal(locale.q.length, 2, lang + ": two questions expected");
  assert.deepEqual(Array.from(locale.q, q => q.answer), ["c", "b"],
    lang + ": spindle and reciprocal-inhibition answer keys changed");
  for (const q of locale.q) {
    assert.equal(q.options.length, 4, lang + ": exactly four answers required");
    assert.equal(new Set(q.options).size, 4, lang + ": duplicate distractor");
    assert(q.explanation.length > 100, lang + ": explanation missing");
  }
  assert(locale.q[0].options[2].includes("Ia"), lang + ": spindle Ia answer mismatch");
}
assert(index.includes('import { createModuleSevenPretest } from "./course-foundation/module-seven-pretest";'));
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleSevenPretest("' + lang + '"'),
    lang + ": authored diagnostic pretest not registered");

const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must stay disabled");
console.log("PASS: module 7 objectives (5 x 3) and diagnostic pretest (2 x 3), keys, routes and preview lock.");
