// Hypothalamus learning objectives, module 15: RU/EN/KZ, route and safety contract.
// A passing test does not certify independent translation, physiology or browser behavior.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-fifteen-objectives.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 15 objectives TypeScript syntax");
let goalsExpression;
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "goals")
    goalsExpression = node.initializer;
  ts.forEachChild(node, visit);
}
visit(ast);
assert(goalsExpression, "Module 15 goals declaration");
const code = ts.transpileModule("const goals=" + goalsExpression.getText(ast) + ";globalThis.goals=goals;", {
  compilerOptions: { target: ts.ScriptTarget.ES2020 }
}).outputText;
const context = {};
vm.runInNewContext(code, context);
assert.equal(Object.keys(context.goals).sort().join(","), "EN,KZ,RU");
const markers = {
  RU: ["супраоптическ", "паравентрикулярн", "нейрогипофиз", "аденогипофиз", "осмоляльност", "барорецептор", "ангиотензин", "V2-рецептор", "супрахиазматическ", "преоптическ", "обратную связь"],
  EN: ["supraoptic", "paraventricular", "neurohypophysis", "anterior pituitary", "osmolality", "baroreceptor", "angiotensin", "V2 receptors", "suprachiasmatic", "preoptic", "negative feedback"],
  KZ: ["супраоптикалық", "паравентрикулярлық", "нейрогипофиз", "аденогипофиз", "осмоляльдылық", "барорецептор", "ангиотензин", "V2-рецептор", "супрахиазматикалық", "преоптикалық", "кері байланыс"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const goals = context.goals[language];
  assert.equal(goals.length, 5, language + ": five measurable outcomes");
  assert.equal(new Set(goals.map(g => g[0])).size, 5, language + ": unique outcome titles");
  for (const [title, description] of goals) {
    assert(title.length >= 28, language + ": meaningful title");
    assert(description.length >= 220, language + ": explanatory physiological outcome");
  }
  const full = goals.flat().join(" ").toLowerCase();
  for (const marker of markers[language])
    assert(full.includes(marker.toLowerCase()), language + ": missing " + marker);
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleFifteenObjectives } from "./course-foundation/module-fifteen-objectives";'));
const start = index.indexOf("  15: {");
const end = index.indexOf("  14: {", start);
assert(start >= 0 && end > start, "Module 15 override registration");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[15]"), "Preserve all other module 15 sections");
for (const language of ["RU", "EN", "KZ"])
  assert(block.includes(language + ': createModuleFifteenObjectives("' + language + '")'));
for (const section of ["pretest", "theory", "interactive", "practice", "cases"])
  assert(source.includes('{ section: "' + section + '" }'), "Recommended route " + section);
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const language of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(15, "objectives", language);
  assert.equal(lesson?.kind, "objectives", language + ": route");
  assert.equal(lesson.outcomes.length, 5, language + ": outcome count");
  assert.equal(lesson.navigation.links.length, 5, language + ": recommended pathway");
  assert.equal(new Set(lesson.outcomes.map(x => x.id)).size, 5, language + ": unique IDs");
  assert(getLesson(15, "theory", language), language + ": theory preserved");
  assert(getLesson(15, "cases", language), language + ": cases preserved");
}
assert.equal(JSON.parse(read("vercel.json")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 15 hypothalamus objectives, RU/EN/KZ, route, physiological and safety markers, preview guard.");
console.log("OPEN: independent KZ review, full CI, medical review of all sections, browser/mobile/voice/E2E.");
