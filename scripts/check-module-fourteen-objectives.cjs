// Module 14 thalamus objectives: source-level, runtime route and safety regression.
// Does not replace independent Kazakh editing, browser testing or medical review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-fourteen-objectives.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 objectives TS syntax");
let initializer;
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    initializer = node.initializer;
  ts.forEachChild(node, visit);
}
visit(ast);
assert(initializer, "Missing thalamus goals");
const js = ts.transpileModule("const goals=" + initializer.getText(ast) + ";globalThis.goals=goals;", {
  compilerOptions: { target: ts.ScriptTarget.ES2020 }
}).outputText;
const context = {};
vm.runInNewContext(js, context);
assert.equal(Object.keys(context.goals).sort().join(","), "EN,KZ,RU");
const markers = {
  RU: ["VPL", "VPM", "латеральное коленчатое", "медиальное коленчатое", "VA/VL", "интраламинар", "ГАМК", "ретикулярного ядра", "обоняние", "обратные", "двухточечной", "срочная"],
  EN: ["VPL", "VPM", "lateral geniculate", "medial geniculate", "VA/VL", "intralaminar", "GABA", "reticular nucleus", "olfaction", "corticothalamic", "two-point", "urgent"],
  KZ: ["VPL", "VPM", "латералды тізелі", "медиалды тізелі", "VA/VL", "интраламинар", "ГАМҚ", "ретикулярлық ядро", "Иіс сезу", "кері байланыс", "екі нүктені", "шұғыл"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const items = context.goals[lang];
  assert.equal(items.length, 5, lang + ": exactly five objectives");
  assert.equal(new Set(items.map(x => x[0])).size, 5, lang + ": unique titles");
  for (const [title, description] of items) {
    assert(title.length >= 25 && description.length >= 170, lang + ": complete outcome");
    assert(!/https?:\/\//.test(description), lang + ": no remote content in objective");
  }
  const all = items.flat().join(" ").toLowerCase();
  for (const marker of markers[lang])
    assert(all.includes(marker.toLowerCase()), lang + ": missing " + marker);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleFourteenObjectives } from "./course-foundation/module-fourteen-objectives";'));
const start = index.indexOf("  14: {");
const end = index.indexOf("  13: {", start);
assert(start >= 0 && end > start, "Module 14 registration");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[14]"), "Other module 14 sections preserved");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleFourteenObjectives("' + lang + '")'), lang + ": route registration");
for (const section of ["pretest", "theory", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Missing pathway " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "objectives", lang);
  assert.equal(lesson?.kind, "objectives", lang + ": route");
  assert.equal(lesson.outcomes.length, 5, lang + ": outcome count");
  assert.equal(lesson.navigation.links.length, 5, lang + ": navigation");
  assert.equal(new Set(lesson.outcomes.map(x => x.id)).size, 5, lang + ": IDs");
  assert(getLesson(14, "theory", lang), lang + ": theory preserved");
  assert(getLesson(14, "cases", lang), lang + ": cases preserved");
}
assert.equal(JSON.parse(read("vercel.json")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 14 thalamus objectives, 5 x RU/EN/KZ, routing, safety and preview guard.");
console.log("OPEN: independent KZ review, full CI, browser, mobile, voice and E2E acceptance.");
