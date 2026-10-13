// Source-level regression check for module 3 pretest; run from repository root.
// Validates item structure, answer keys, translations and actual route registration.
// It does not substitute for physiological expert review or browser testing.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const source = fs.readFileSync("content/course-foundation/module-three-pretest.ts", "utf8");
const registry = fs.readFileSync("content/index.ts", "utf8");
const ast = ts.createSourceFile("module-three-pretest.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 3 pretest must parse as TypeScript");

const variable = ast.statements
  .filter(ts.isVariableStatement)
  .flatMap(statement => [...statement.declarationList.declarations])
  .find(declaration => declaration.name.getText(ast) === "localized");
assert(variable && ts.isObjectLiteralExpression(variable.initializer), "Missing localized pretest data");
const get = (object, name) => {
  assert(ts.isObjectLiteralExpression(object), "Expected object literal: " + name);
  const entry = object.properties.find(property =>
    ts.isPropertyAssignment(property) && property.name.getText(ast).replace(/['"]/g, "") === name);
  assert(entry, "Missing " + name);
  return entry.initializer;
};
const readString = (node) => {
  assert(ts.isStringLiteral(node), "Expected string literal");
  assert(node.text.trim().length > 0, "Empty localized string");
  return node.text;
};
for (const language of ["RU", "EN", "KZ"]) {
  const locale = get(variable.initializer, language);
  readString(get(locale, "introduction"));
  const questions = get(locale, "questions");
  assert(ts.isArrayLiteralExpression(questions), "Missing questions in " + language);
  assert.equal(questions.elements.length, 2, language + ": expected two diagnostic questions");
  questions.elements.forEach((question, index) => {
    const prompt = readString(get(question, "prompt"));
    assert(prompt.includes("?") || prompt.includes("؟"), language + ": question must be explicit");
    const explanation = readString(get(question, "explanation"));
    assert(explanation.length > 50, language + ": insufficient mechanism explanation");
    const options = get(question, "options");
    assert(ts.isArrayLiteralExpression(options), "Options must be a literal array");
    assert.equal(options.elements.length, 4, language + ": expected four options");
    const texts = options.elements.map(readString);
    assert.equal(new Set(texts).size, 4, language + ": duplicate options");
    const key = readString(get(question, "correctAnswer"));
    assert.equal(key, index === 0 ? "c" : "b", language + ": incorrect physiology answer key");
  });
  assert(registry.includes('createModuleThreePretest("' + language + '"'),
    language + ": authored pretest not registered");
}
assert(registry.includes("...foundationLessons[3]"), "Module 3 other lessons must be preserved");
assert(registry.indexOf("  3: {") > registry.indexOf("  ...foundationLessons,"),
  "Module 3 pretest override must follow generic foundation spread");
assert(!source.includes("Наблюдаемое изменение всегда имеет только одну возможную"),
  "Generic non-diagnostic distractor must not return");
console.log("PASS: Module 3 pretest — 2 mechanism questions × 3 languages, four unique options, correct keys, feedback and route wiring.");
