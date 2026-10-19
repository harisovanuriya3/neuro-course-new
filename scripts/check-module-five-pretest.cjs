// Module 5 pretest: source-level, not browser/clinical certification.
// Run from repository root: node scripts/check-module-five-pretest.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");

const path = "content/course-foundation/module-five-pretest.ts";
const source = fs.readFileSync(path, "utf8");
const registry = fs.readFileSync("content/index.ts", "utf8");
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 5 pretest TS syntax error");
const registryAst = ts.createSourceFile("content/index.ts", registry, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(registryAst.parseDiagnostics.length, 0, "Registry TS syntax error");

const declarations = ast.statements.filter(ts.isVariableStatement)
  .flatMap(node => [...node.declarationList.declarations]);
const localized = declarations.find(node => node.name.getText(ast) === "localized");
assert(localized && ts.isObjectLiteralExpression(localized.initializer), "Missing localized pretest object");

function property(object, key) {
  assert(ts.isObjectLiteralExpression(object), "Expected object literal: " + key);
  const item = object.properties.find(node => ts.isPropertyAssignment(node) &&
    node.name.getText(ast).replace(/['"]/g, "") === key);
  assert(item, "Missing property " + key);
  return item.initializer;
}
function nonemptyString(node, context) {
  assert(ts.isStringLiteral(node), "Expected string: " + context);
  assert(node.text.trim().length > 0, "Empty string: " + context);
  return node.text;
}
for (const lang of ["RU", "EN", "KZ"]) {
  const locale = property(localized.initializer, lang);
  assert(nonemptyString(property(locale, "introduction"), lang + " intro").length > 45);
  const questions = property(locale, "questions");
  assert(ts.isArrayLiteralExpression(questions), lang + " questions not array");
  assert.equal(questions.elements.length, 2, lang + " should have two diagnostic questions");
  questions.elements.forEach((question, index) => {
    const prompt = nonemptyString(property(question, "prompt"), lang + " question");
    assert(prompt.length > 90, lang + " question too short");
    assert(/[?？]$/.test(prompt), lang + " question needs interrogative ending");
    const options = property(question, "options");
    assert(ts.isArrayLiteralExpression(options), lang + " options not array");
    assert.equal(options.elements.length, 4, lang + " needs four alternatives");
    const texts = options.elements.map((node, i) => nonemptyString(node, lang + " option " + i));
    assert.equal(new Set(texts).size, 4, lang + " repeated options");
    assert(texts.every(text => text.length > 45), lang + " uninformative alternative");
    const answer = nonemptyString(property(question, "correctAnswer"), lang + " key");
    assert.equal(answer, index === 0 ? "c" : "b", lang + " unexpected key");
    const feedback = nonemptyString(property(question, "explanation"), lang + " feedback");
    assert(feedback.length > 180, lang + " insufficient mechanism explanation");
  });
  assert(registry.includes('createModuleFivePretest("' + lang + '"'),
    lang + " pretest is not connected to module 5");
  assert(registry.includes('getSectionTitle("pretest", "' + lang + '")'),
    lang + " pretest title not localized");
}
assert(registry.includes('import { createModuleFivePretest } from "./course-foundation/module-five-pretest"'),
  "Module 5 pretest import missing");
// Ensure all three languages use physiological distractors rather than
// impossible chemical-identity changes or an answer given away by wording.
for (const fragment of [
  "только количеством выделенного медиатора",
  "все метаботропные — торможение",
  "solely by how much transmitter is released",
  "all metabotropic receptors inhibitory",
  "тек бөлінген медиатор мөлшерімен",
  "барлық метаботроптық рецепторлар"
]) assert(source.includes(fragment), "Missing mechanistic RU/EN/KZ distractor: " + fragment);
for (const stale of [
  "Каждая молекула медиатора меняет свой химический состав",
  "Each transmitter molecule changes its chemical identity",
  "Медиатордың әр молекуласы нысана жасушасына қарай химиялық құрамын өзгертеді"
]) assert(!source.includes(stale), "Implausible distractor returned: " + stale);
assert(route.includes("getLesson("), "Dynamic lesson route not connected");
assert(source.includes('target: { section: "theory" as const }'), "Pretest must link to theory");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Vercel preview must stay disabled");
console.log("PASS module 5 synapse pretest: 2 questions × RU/EN/KZ, keyed options, feedback and route wiring.");
console.log("NOTE: source checks do not replace physiology/translation/browser tests.");
