// Module 9 interactive: pure model, authored trilingual UI and route contract.
// Run from repository root: node scripts/check-module-nine-interactive.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const modelPath = "lib/spinalReflexModel.ts";
const uiPath = "components/SpinalRegulationLab.tsx";
const model = read(modelPath);
const lab = read(uiPath);
for (const [path, source, kind] of [
  [modelPath, model, ts.ScriptKind.TS],
  [uiPath, lab, ts.ScriptKind.TSX]
]) {
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
  assert.equal(ast.parseDiagnostics.length, 0, path + ": parse errors");
  const result = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX
    },
    reportDiagnostics: true
  });
  assert.equal((result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
    0, path + ": transpilation errors");
}
const compiled = ts.transpileModule(model, {
  fileName: modelPath,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
});
const sandbox = { exports: {} };
vm.runInNewContext(compiled.outputText, sandbox);
const { simulateSpinalReflex, expectedAntagonistChange } = sandbox.exports;
assert.equal(typeof simulateSpinalReflex, "function");
assert.equal(typeof expectedAntagonistChange, "function");
let checks = 0;
for (const stretch of [0, 10, 25, 50, 75, 100, 150, -5, NaN]) {
  const off = simulateSpinalReflex({ stretch, reciprocalInhibition: false });
  const on = simulateSpinalReflex({ stretch, reciprocalInhibition: true });
  assert.equal(on.agonist, off.agonist, "Ia→agonist must not depend on reciprocal inhibition");
  assert.equal(off.antagonist, off.antagonistWithoutInhibition);
  assert.equal(on.antagonist, on.antagonistWithInhibition);
  assert(on.antagonist <= off.antagonist, "Inhibition cannot increase antagonist response");
  assert(on.agonist >= 0 && on.agonist <= 100);
  assert(on.antagonist >= 0 && on.antagonist <= 100);
  assert.equal(expectedAntagonistChange(stretch),
    on.antagonist < off.antagonist ? "decrease" : "unchanged");
  checks++;
}
for (const lang of ["RU", "EN", "KZ"])
  assert(new RegExp("\\b" + lang + ": \\{").test(lab), lang + ": no authored UI copy");
assert(lab.includes("simulateSpinalReflex({ stretch, reciprocalInhibition: inhibition })"));
assert(lab.includes("prediction === expectedAntagonistChange(stretch)"),
  "Prediction must be compared with modeled result");
assert(lab.includes("disabled={!prediction}"), "Trial must require a prediction");
assert(lab.includes("setRevealed(false)"), "Changing input must invalidate visible feedback");
assert(lab.includes("Number(correct), 1"), "Wrong predictions must not get full credit");
assert(!lab.includes('recordOutcome(9, "criterion:mechanism:prediction"'),
  "Direction-only prediction must not claim mechanism mastery");
assert(!lab.includes('recordOutcome(9, "criterion:justification:lab"'),
  "Text length must not grade scientific justification");
assert(lab.includes("<thead>") && lab.includes('role="status"') &&
  lab.includes('aria-label={c.intro}'), "Accessible table, feedback and schematic");
assert(lab.includes("previous.length + 1"), "Trials must have stable unique keys");
const route = read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<SpinalRegulationLab language={lang} />"), "Module 9 route");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not auto-deploy");
console.log("PASS: module 9 interactive TS/TSX syntax, " + checks +
  " pure-model scenarios, prediction grading, RU/EN/KZ, route and preview lock.");
console.log("NOTE: model coefficients are illustrative; full tsc/build/browser tests are separate.");
