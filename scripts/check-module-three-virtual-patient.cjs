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
    assert(strings.every(x => x.length > 28), name + " " + lang + ": overly generic stage");
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
const reviewed = fs.readFileSync("content/reviewed-virtual-patients.ts","utf8");
assert(reviewed.includes("newData:stage.newData.replace"),"Lab data must omit clinical examination prefix");
assert(reviewed.includes("mentorPrompt:labMentor[language][index]"),"Lab requires physiological mentor comments");
assert(reviewed.includes("mechanism:labMentor[language][index]"),"Stage-specific explanations missing");
const visual = fs.readFileSync("components/VirtualPatientVisual.tsx","utf8");
assert(visual.includes("Астроцитарное буферирование K⁺") &&
 visual.includes("Astrocytic K⁺ buffering") &&
 visual.includes("Астроциттердің K⁺ буферлеуі"),
 "Module 3 model graphic must be labeled for K+ buffering in all three languages");
assert(visual.includes("active=(safeStage-1+(moduleId===3?0:(selected??0)))%6"),
 "Selecting a choice must not change module 3 model stage visualization");
assert(visual.includes("selected={moduleId===3?null:selected}"),
 "Model graphic must not depict predefined data as a response to a selected action");
assert(visual.includes("modelNote:") && visual.includes("c.modelNote"),
 "The predefined-data disclaimer must be visible");
assert(visual.includes("aria-label={config.title[language]}"),
 "Diagram accessibility label must use the selected language");
console.log("PASS: Module 3 virtual teaching case — 6 distinct stages × 3 languages, model labeling and route wiring.");
console.log("NOTE: dynamic branching, audio, scoring and browser accessibility still require runtime tests.");

// Also validate the module 3 mechanism explanation self-check.
require('./check-module-three-voice.cjs');
