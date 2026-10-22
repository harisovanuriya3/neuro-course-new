// Regression contract: module 6 objectives are authored, localized and routed.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-six-objectives.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 6 objectives TypeScript syntax");
const goals = ast.statements
  .filter(ts.isVariableStatement)
  .flatMap(s => [...s.declarationList.declarations])
  .find(d => d.name.getText(ast) === "goals");
assert(goals && ts.isObjectLiteralExpression(goals.initializer), "Missing objectives map");
for (const lang of ["RU", "EN", "KZ"]) {
  const property = goals.initializer.properties.find(p => p.name?.getText(ast) === lang);
  assert(property && ts.isArrayLiteralExpression(property.initializer), "Missing "+lang);
  assert.equal(property.initializer.elements.length, 5, lang+" requires five outcomes");
  for (const pair of property.initializer.elements) {
    assert(ts.isArrayLiteralExpression(pair) && pair.elements.length === 2, lang+" goal pair");
    for (const element of pair.elements)
      assert(ts.isStringLiteral(element) && element.text.trim().length >= 12, lang+" empty outcome");
  }
}
const registry = fs.readFileSync("content/index.ts", "utf8");
assert(registry.includes('import { createModuleSixObjectives }'), "Missing import");
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleSixObjectives("'+lang+'")'), "Missing "+lang+" objectives route");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch previews must remain disabled");
console.log("PASS: module 6 objectives 5 × RU/EN/KZ, registration and no previews");
