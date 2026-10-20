// Module 5 glossary contract: validates RU/EN/KZ definitions and registry wiring.
// Run from repository root: node scripts/check-module-five-glossary.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-five-glossary.ts";
const source = fs.readFileSync(path, "utf8");
const registry = fs.readFileSync("content/index.ts", "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Glossary TypeScript syntax error");
const declarations = ast.statements.filter(ts.isVariableStatement)
  .flatMap(statement => [...statement.declarationList.declarations]);
const entry = declarations.find(node => node.name.getText(ast) === "entries");
assert(entry && ts.isArrayLiteralExpression(entry.initializer), "Missing glossary entries");
const entries = entry.initializer.elements;
assert.equal(entries.length, 12, "Expected 12 distinct synapse glossary terms");
const ids = [];
function getProp(node, key) {
  assert(ts.isObjectLiteralExpression(node), "Expected glossary object");
  const found = node.properties.find(prop => ts.isPropertyAssignment(prop) &&
    prop.name.getText(ast).replace(/['"]/g, "") === key);
  assert(found, "Missing glossary property: " + key);
  return found.initializer;
}
function localTriple(node, context) {
  assert(ts.isCallExpression(node) && node.expression.getText(ast) === "t", context + " must use t()");
  assert.equal(node.arguments.length, 3, context + " needs RU/EN/KZ");
  return node.arguments.map((arg, i) => {
    assert(ts.isStringLiteral(arg), context + " language " + i + " not string");
    assert(arg.text.trim().length >= 12, context + " language " + i + " too short");
    return arg.text;
  });
}
const terms = [];
for (const node of entries) {
  const id = getProp(node, "id");
  assert(ts.isStringLiteral(id), "Non-literal term ID");
  ids.push(id.text);
  terms.push(localTriple(getProp(node, "term"), id.text + " term"));
  localTriple(getProp(node, "definition"), id.text + " definition");
}
assert.equal(new Set(ids).size, ids.length, "Duplicate glossary term IDs");
assert.deepEqual(ids.slice(0, 2), ["ionotropic", "neuromodulation"]);
assert.deepEqual(terms[0], ["Ионотропный рецептор", "Ionotropic receptor", "Ионотроптық рецептор"]);
assert.deepEqual(terms[1], ["Нейромодуляция", "Neuromodulation", "Нейромодуляция"]);
assert(source.includes("fast postsynaptic current") && source.includes("network activity"),
  "Correct ionotropic and neuromodulation definitions must be present");
assert(!source.includes("A specialized junction through which a neuron signals another cell."),
  "Do not attach synapse definition to ionotropic receptor");
assert(!source.includes("A chemical messenger released by a neuron that acts on receptors of a target cell."),
  "Do not attach neurotransmitter definition to neuromodulation");
assert(registry.includes('import { createModuleFiveGlossary } from "./course-foundation/module-five-glossary"'),
  "Glossary not imported in registry");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(registry.includes(lang + ': createModuleFiveGlossary("' + lang + '")'),
    "Glossary override missing for " + lang);
}
assert(registry.includes("...foundationLessons[5]"), "Module 5 foundation missing");
assert(source.includes('target: { section: "theory" as const }'), "Glossary must link to theory");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS module 5 glossary: 12 terms × RU/EN/KZ; aligned definitions, lesson registry, previews disabled.");
console.log("NOTE: source checks do not replace native-language review or browser/TypeScript build.");
