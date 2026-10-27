// Module 12 / interactive: canonical pathways, model bounds and assessment contract.
// Run from repository root: node scripts/check-module-twelve-interactive.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const modelPath = "lib/basalGangliaModel.ts";
const labPath = "components/BasalGangliaLab.tsx";
const model = read(modelPath);
const lab = read(labPath);
for (const [path, source, kind] of [
  [modelPath, model, ts.ScriptKind.TS],
  [labPath, lab, ts.ScriptKind.TSX]
]) {
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
  assert.equal(ast.parseDiagnostics.length, 0, path + ": syntax error");
  const compiled = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX
    }, reportDiagnostics: true
  });
  assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
    0, path + ": transpile error");
}
const js = ts.transpileModule(model, {
  fileName: modelPath,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
}).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(js, sandbox);
const { simulateBasalGanglia, compareBasalGanglia } = sandbox.exports;
assert.equal(typeof simulateBasalGanglia, "function");
assert.equal(typeof compareBasalGanglia, "function");
let scenarios = 0;
let previous = -1;
for (const dopamine of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
  const observed = simulateBasalGanglia(dopamine);
  const comparison = compareBasalGanglia(dopamine);
  for (const field of ["directIndex", "indirectIndex", "thalamicFacilitationIndex"])
    assert(observed[field] >= 0 && observed[field] <= 100);
  assert(observed.thalamicFacilitationIndex >= previous, "Monotonic teaching model");
  assert.equal(comparison.baseline.thalamicFacilitationIndex, 50);
  assert.equal(comparison.trend, dopamine < 50 ? "lower" : dopamine > 50 ? "higher" : "same");
  assert.equal(comparison.observed.thalamicFacilitationIndex, observed.thalamicFacilitationIndex);
  previous = observed.thalamicFacilitationIndex;
  scenarios++;
}
assert.equal(simulateBasalGanglia(0).thalamicFacilitationIndex, 23);
assert.equal(simulateBasalGanglia(50).thalamicFacilitationIndex, 50);
assert.equal(simulateBasalGanglia(100).thalamicFacilitationIndex, 78);
for (const input of [-50, 150, NaN, Infinity]) {
  const result = simulateBasalGanglia(input);
  assert(result.dopamine >= 0 && result.dopamine <= 100);
  assert(result.thalamicFacilitationIndex >= 0 && result.thalamicFacilitationIndex <= 100);
  scenarios++;
}
for (const lang of ["RU", "EN", "KZ"])
  assert(new RegExp("\\b" + lang + ":\\s*\\{").test(lab), lang + ": missing localized UI");
assert(lab.includes("compareBasalGanglia(dopamine)"), "UI must run shared model");
assert(lab.includes("disabled={!prediction}"), "Prediction required before trial");
assert(lab.includes("prediction === comparison.trend"), "Prediction must be checked");
assert(lab.includes('recordOutcome(12, "interactive", Number(correct), 1)'),
  "Incorrect predictions must not earn full credit");
assert(lab.includes('recordOutcome(12, "criterion:application:lab", Number(correct), 1)'),
  "Application score must reflect correctness");
assert(!lab.includes('recordOutcome(12, "criterion:mechanism:prediction"'),
  "Directional prediction cannot certify physiological mechanism");
assert(!lab.includes('recordOutcome(12, "criterion:justification:lab"'),
  "Text length cannot certify justification");
assert(lab.includes("setResult(null)") && lab.includes("setPrediction(\"\")"),
  "Changing input must invalidate previous result and prediction");
assert(lab.includes("previous.length + 1") && !lab.includes("Date.now()"),
  "Trial ids must not rely on colliding timestamps");
assert(lab.includes("<thead>") && lab.includes('scope="col"') &&
  lab.includes('aria-live="polite"'), "Accessible table and result required");
assert(lab.includes("stri") && lab.includes("GPe") && lab.includes("STN") &&
  lab.includes("GPi/SNr"), "Canonical nodes missing");
assert(lab.includes("not automatically graded") && lab.includes("автоматически не оценивается") &&
  lab.includes("автоматты түрде бағаланбайды"), "Written explanation disclaimer in three languages");
const route = read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('moduleNumber === 12 && section === "interactive"') &&
  route.includes('<GuidedLabFrame moduleId={12} language={lang}><BasalGangliaLab language={lang} /></GuidedLabFrame>'),
  "Module 12 interactive route missing");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 12 basal ganglia model (" + scenarios +
  " scenarios), RU/EN/KZ, pathway signs, assessment, accessibility, route, preview lock.");
console.log("NOTE: numerical indices are illustrative, not physiological measurements; full tsc/build/browser checks remain separate.");
