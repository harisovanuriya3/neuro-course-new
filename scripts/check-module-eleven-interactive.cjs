// Module 11 interactive: source, model, prediction and accessibility contracts.
// Run from repository root: node scripts/check-module-eleven-interactive.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const modelPath = "lib/motorControlModel.ts";
const labPath = "components/MotorControlLab.tsx";
const model = read(modelPath);
const lab = read(labPath);

for (const [path, source, kind] of [
  [modelPath, model, ts.ScriptKind.TS],
  [labPath, lab, ts.ScriptKind.TSX]
]) {
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
  assert.equal(ast.parseDiagnostics.length, 0, path + ": TS/TSX parse errors");
  const compiled = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX
    }, reportDiagnostics: true
  });
  assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length,
    0, path + ": transpilation errors");
}
const js = ts.transpileModule(model, {
  fileName: modelPath,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
}).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(js, sandbox);
const { simulateMotorControl, compareMotorFeedback } = sandbox.exports;
assert.equal(typeof simulateMotorControl, "function");
assert.equal(typeof compareMotorFeedback, "function");
let cases = 0;
for (const drive of [0, 1, 10, 35, 65, 100, -5, 150, NaN]) {
  const baseline = simulateMotorControl(drive, 0);
  for (const sensory of [0, 1, 25, 50, 75, 100, -5, 150, NaN]) {
    const actual = simulateMotorControl(drive, sensory);
    const comparison = compareMotorFeedback(drive, sensory);
    assert(actual.target >= 0 && actual.target <= 100);
    assert(actual.output >= 0 && actual.output <= actual.target);
    assert.equal(actual.error, Math.abs(actual.target - actual.output),
      "Reported error must equal the discrepancy between target and output");
    assert(actual.error <= baseline.error,
      "Feedback cannot increase error in this fixed-disturbance teaching model");
    assert.equal(comparison.observed.error, actual.error);
    assert.equal(comparison.baseline.error, baseline.error);
    assert.equal(comparison.trend, actual.error < baseline.error ? "lower" : "same");
    cases++;
  }
}
assert.equal(simulateMotorControl(0, 0).error, 0);
assert.equal(simulateMotorControl(65, 0).error, 20);
assert.equal(simulateMotorControl(65, 50).error, 12);
assert.equal(simulateMotorControl(65, 100).error, 4);
assert.equal(simulateMotorControl(100, 100).output, 94);
for (const lang of ["RU", "EN", "KZ"])
  assert(new RegExp("\\b" + lang + ": \\{").test(lab), "Missing lab text for " + lang);
assert(lab.includes('prediction === comparison.trend'), "Prediction not graded against model");
assert(lab.includes('disabled={!prediction}'), "Trial must require a prediction");
assert(lab.includes('recordOutcome(11, "interactive", Number(correct), 1)'),
  "Incorrect prediction must not earn full credit");
assert(lab.includes('if (correct) recordOutcome(11, "criterion:application:lab", 1, 1)'),
  "Application score must require a correct prediction");
assert(!lab.includes('"criterion:justification:lab"'),
  "Text length must not certify physiological reasoning");
assert(lab.includes('setResult(null)') && lab.includes('invalidate()'),
  "Changing parameters or prediction must hide stale results");
assert(lab.includes('role="status"') && lab.includes('aria-live="polite"'),
  "Feedback must be accessible to screen readers");
assert(lab.includes('<thead>') && lab.includes('scope="col"'),
  "Trial table needs explicit column headers");
assert(lab.includes('previous.length + 1'), "Stable sequential row keys required");
assert(!lab.includes("Date.now()"), "Timestamp-based row keys can collide");
assert(lab.includes("not automatically graded") &&
       lab.includes("автоматически не оценивается") &&
       lab.includes("автоматты түрде бағаланбайды"),
       "Explain that written reasoning is not automatically graded in all languages");
const route = read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('moduleNumber === 11 && section === "interactive"') &&
       route.includes('<MotorControlLab language={lang} />'), "Module 11 lab route missing");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 11 motor feedback model (" + cases +
  " bounded scenarios), RU/EN/KZ, grading, accessibility, route and preview lock.");
console.log("NOTE: illustrative coefficients; full tsc/build/browser checks remain separate.");
