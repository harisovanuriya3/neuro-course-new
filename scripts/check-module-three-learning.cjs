// Module 3 authored learning-outcome and one-minute-summary source contract.
// Run from repo root. This is NOT a scientific/translation/browser validation.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const file = "content/course-foundation/module-three-learning.ts";
const source = fs.readFileSync(file, "utf8");
const registry = fs.readFileSync("content/index.ts", "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 3 authored learning content must parse");
const declarations = ast.statements.filter(ts.isVariableStatement)
  .flatMap(statement => [...statement.declarationList.declarations]);
const getDeclaration = name => {
  const declaration = declarations.find(item => item.name.getText(ast) === name);
  assert(declaration && ts.isObjectLiteralExpression(declaration.initializer), "Missing " + name);
  return declaration.initializer;
};
const getProperty = (object, key) => {
  const property = object.properties.find(item =>
    ts.isPropertyAssignment(item) && item.name.getText(ast).replace(/['"]/g, "") === key);
  assert(property, "Missing property " + key);
  return property.initializer;
};
for (const variableName of ["moduleThreeObjectives", "moduleThreeSummary"]) {
  const data = getDeclaration(variableName);
  for (const language of ["RU", "EN", "KZ"]) {
    const entries = getProperty(data, language);
    assert(ts.isArrayLiteralExpression(entries), variableName + " " + language + ": expected array");
    assert.equal(entries.elements.length, 5, variableName + " " + language + ": exactly five items");
    for (const item of entries.elements) {
      assert(ts.isObjectLiteralExpression(item), "Each item must be an object");
      for (const key of variableName === "moduleThreeObjectives" ? ["title", "description"] : ["title", "text"]) {
        const value = getProperty(item, key);
        assert(ts.isStringLiteral(value) && value.text.trim().length >= 20,
          variableName + " " + language + ": missing meaningful " + key);
      }
    }
  }
}
for (const [section, factory] of [
  ["objectives", "createModuleThreeObjectives"],
  ['"one-minute"', "createModuleThreeSummary"],
]) {
  assert(registry.includes(section + ": {"), "Missing override: " + section);
  for (const language of ["RU", "EN", "KZ"]) {
    assert(registry.includes(language + ': ' + factory + '("' + language + '")'),
      "Missing " + language + " registration for " + section);
  }
}
assert(registry.includes("...foundationLessons[3]"), "Preserve other module 3 lessons");
assert(source.includes("kind: 'objectives'") && source.includes("kind: 'one-minute'"),
  "Lesson factories must return the expected renderer types");
console.log("PASS: module 3 objectives and one-minute summary — five authored items × RU/EN/KZ; registered lesson types.");
