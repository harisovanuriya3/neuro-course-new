// Module 10 objectives: physiology, RU/EN/KZ coverage and actual registry.
// Run from repo root: node scripts/check-module-ten-objectives.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-ten-objectives.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 10 objectives TS syntax");
let initializer;
function walk(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, walk);
}
walk(ast);
assert(initializer, "Module 10 goals missing");
const js = ts.transpileModule("const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
const ctx = {};
vm.runInNewContext(js, ctx);
assert.deepEqual(Object.keys(ctx.goals).sort(), ["EN", "KZ", "RU"]);
for (const lang of ["RU", "EN", "KZ"]) {
  assert.equal(ctx.goals[lang].length, 5, lang + ": five objectives");
  const titles = new Set();
  for (const [title, description] of ctx.goals[lang]) {
    assert(title.length >= 20 && description.length >= 135, lang + ": incomplete objective");
    assert(!titles.has(title), lang + ": duplicate objective");
    titles.add(title);
  }
}
for (const [lang, terms] of Object.entries({
  RU: ["продолговатый", "претектальную", "Эдингера", "корнеального", "ретикулоспинальных", "сердечно-сосудистых", "метаболические"],
  EN: ["medulla", "pretectal", "Edinger", "corneal", "reticulospinal", "cardiovascular", "metabolic"],
  KZ: ["сопақша", "претекталдық", "Эдингер", "қасаң қабық", "ретикулоспиналдық", "жүрек-қантамыр", "зат алмасу"],
})) {
  const all = ctx.goals[lang].flat().join(" ").toLowerCase();
  for (const term of terms) assert(all.includes(term.toLowerCase()), lang + ": missing " + term);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleTenObjectives } from "./course-foundation/module-ten-objectives";'));
const start = index.indexOf("  10: {");
const end = index.indexOf("  9: {", start);
assert(start >= 0 && end > start, "Module 10 registry block absent");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[10]"), "Module 10 other sections must remain intact");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleTenObjectives("' + lang + '")'), lang + ": registration missing");
for (const section of ["theory", "pretest", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing navigation to " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(10, "objectives", lang);
  assert.equal(lesson?.kind, "objectives", lang + ": route kind");
  assert.equal(lesson.outcomes.length, 5, lang + ": five goals");
  assert.equal(lesson.navigation.links.length, 5, lang + ": five routes");
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must remain disabled");
console.log("PASS: module 10 objectives 5×3, real lesson registration and preview off.");
console.log("OPEN: tsc, build, browser and independent KZ review.");
