// Module 4 pretest acceptance check; run from repo root:
// node scripts/check-module-four-pretest.cjs
// Expected to FAIL until content/index.ts registers createModuleFourPretest.
// This is a structural test, not a browser or expert translation certification.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-four-pretest.ts";
const source = fs.readFileSync(path, "utf8");
const registry = fs.readFileSync("content/index.ts", "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 4 pretest must parse");
const declarations = ast.statements.filter(ts.isVariableStatement)
  .flatMap(node => [...node.declarationList.declarations]);
const localized = declarations.find(node => node.name.getText(ast) === "localized");
assert(localized && ts.isObjectLiteralExpression(localized.initializer), "Missing localized object");
function prop(node, key) {
  assert(ts.isObjectLiteralExpression(node), "Expected object literal: " + key);
  const p = node.properties.find(p => ts.isPropertyAssignment(p) &&
    p.name.getText(ast).replace(/['"]/g, "") === key);
  assert(p, "Missing " + key);
  return p.initializer;
}
function str(node) {
  assert(ts.isStringLiteral(node), "Expected string literal");
  assert(node.text.trim().length > 0, "Empty string");
  return node.text;
}
for (const lang of ["RU","EN","KZ"]) {
  const data = prop(localized.initializer, lang);
  assert(str(prop(data, "introduction")).length > 40, lang + ": missing intro");
  const questions = prop(data, "questions");
  assert(ts.isArrayLiteralExpression(questions) && questions.elements.length === 2,
    lang + ": expected exactly two diagnostic questions");
  questions.elements.forEach((q, i) => {
    assert(str(prop(q,"prompt")).endsWith("?"), lang + ": prompt not a question");
    assert(str(prop(q,"explanation")).length > 120, lang + ": weak feedback");
    const opts = prop(q, "options");
    assert(ts.isArrayLiteralExpression(opts) && opts.elements.length === 4,
      lang + ": expected four options");
    const texts = opts.elements.map(str);
    assert.equal(new Set(texts).size,4,lang + ": duplicate distractor");
    assert.equal(str(prop(q,"correctAnswer")),i===0?"b":"d",
      lang + ": unexpected answer key");
  });
  assert(registry.includes('createModuleFourPretest("'+lang+'"'),
    lang + ": module 4 pretest is NOT registered in content/index.ts");
}
assert(registry.includes('from "./course-foundation/module-four-pretest"'),
  "Missing module 4 pretest import");
console.log("PASS: Module 4 pretest RU/EN/KZ source and route registration.");
