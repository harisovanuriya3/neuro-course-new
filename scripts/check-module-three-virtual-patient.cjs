// Regression check for the Module 3 non-human virtual teaching case.
// Structural/linguistic presence checks; not a browser or physiological validation.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const source = fs.readFileSync("content/virtual-patients.ts", "utf8");
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
const ast = ts.createSourceFile("virtual-patients.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Virtual-patient TypeScript must parse");
const decls = ast.statements.filter(ts.isVariableStatement).flatMap(x => [...x.declarationList.declarations]);
const lookup = name => {
  const item = decls.find(x => x.name.getText(ast) === name);
  assert(item && ts.isObjectLiteralExpression(item.initializer), "Missing object: " + name);
  return item.initializer;
};
for (const name of ["moduleThreeObservations", "moduleThreeStageText"]) {
  const obj = lookup(name);
  for (const lang of ["RU", "EN", "KZ"]) {
    const prop = obj.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(ast).replace(/['"]/g, "") === lang);
    assert(prop && ts.isArrayLiteralExpression(prop.initializer), name + " missing " + lang);
    const items = prop.initializer.elements;
    assert.equal(items.length, 6, name + " " + lang + ": expected 6 unique stages");
    const strings = items.map(x => { assert(ts.isStringLiteral(x), "Stage must be text"); return x.text; });
    assert(strings.every(x => x.length > 45), name + " " + lang + ": overly generic stage");
    assert.equal(new Set(strings).size, 6, name + " " + lang + ": duplicate stages");
  }
}
assert(source.includes("moduleId === 3 ? moduleThreeObservations[language] :"),
  "Module 3 must use distinct model evidence instead of alternating generic observations");
assert(source.includes("situation: moduleId === 3 ? moduleThreeStageText[language][index] :"),
  "Module 3 must use a laboratory narrative, not patient examination");
assert(source.includes("patient: moduleId === 3 ?"), "Model must be identified as non-patient");
assert(source.includes("not a human experiment") || source.includes("not a patient"),
  "Module 3 must not imply experiments on a human");
assert(route.includes('<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />'),
  "Unified virtual case must be reachable from the route");
console.log("PASS: Module 3 virtual teaching case — 6 distinct stages × 3 languages, model labeling and route wiring.");
console.log("NOTE: dynamic branching, audio, scoring and browser accessibility still require runtime tests.");
