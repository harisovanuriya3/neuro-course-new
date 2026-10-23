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
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must stay disabled");
console.log("PASS: module 7 objectives 5 x RU/EN/KZ; reflex physiology terms, navigation, registration and preview lock.");
