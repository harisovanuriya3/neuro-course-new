// Module 13 / interactive: check an illustrative model, scoring and UI contract.
// Run from repository root: node scripts/check-module-thirteen-interactive.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");

const modelPath = "lib/cerebellumModel.ts";
const labPath = "components/CerebellumLab.tsx";
const model = fs.readFileSync(modelPath, "utf8");
const lab = fs.readFileSync(labPath, "utf8");
for (const [path, source, kind] of [
  [modelPath, model, ts.ScriptKind.TS],
  [labPath, lab, ts.ScriptKind.TSX],
]) {
  const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
  assert.equal(parsed.parseDiagnostics.length, 0, path + ": TS syntax error");
  const compiled = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
    reportDiagnostics: true,
  });
  assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
    0, path + ": transpile diagnostics");
}
const js = ts.transpileModule(model, {
  fileName: modelPath,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
}).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(js, sandbox);
const { simulateCerebellum, compareCerebellum } = sandbox.exports;
assert.equal(typeof simulateCerebellum, "function");
assert.equal(typeof compareCerebellum, "function");
let scenarios = 0;
for (const error of [0, 1, 25, 60, 100]) {
  let lastResidual = Infinity;
  for (const feedback of [0, 10, 30, 50, 70, 90, 100]) {
    const result = simulateCerebellum(error, feedback);
    assert(result.correctionIndex >= 0 && result.correctionIndex <= error);
    assert(result.residualErrorIndex >= 0 && result.residualErrorIndex <= error);
    assert.equal(result.correctionIndex + result.residualErrorIndex, error);
    assert(result.residualErrorIndex <= lastResidual, "Monotonic illustrative assumption");
    lastResidual = result.residualErrorIndex;
    const comparison = compareCerebellum(error, feedback);
    assert.equal(comparison.baseline.feedbackQuality, 50);
    assert.equal(comparison.observed.residualErrorIndex, result.residualErrorIndex);
    const expected = result.residualErrorIndex < comparison.baseline.residualErrorIndex ? "lower" :
      result.residualErrorIndex > comparison.baseline.residualErrorIndex ? "higher" : "same";
    assert.equal(comparison.trend, expected);
    scenarios++;
  }
}
assert.equal(compareCerebellum(0, 100).trend, "same");
assert.equal(compareCerebellum(60, 0).trend, "higher");
assert.equal(compareCerebellum(60, 100).trend, "lower");
for (const value of [-100, 150, NaN, Infinity]) {
  const result = simulateCerebellum(value, value);
  assert(result.initialError >= 0 && result.initialError <= 100);
  assert(result.feedbackQuality >= 0 && result.feedbackQuality <= 100);
  scenarios++;
}
assert(model.includes("Math.exp("), "Illustrative saturating assumption must be explicit");
for (const lang of ["RU", "EN", "KZ"])
  assert(new RegExp("\\b" + lang + ":\\s*\\{").test(lab), lang + ": localized UI missing");
assert(lab.includes('value={prediction}') && lab.includes('disabled={!prediction || revealed}'),
  "Prediction must precede reveal and a repeated click must not rescore");
assert(lab.includes('prediction === comparison.trend'), "Prediction must be checked against model");
assert(lab.includes('recordOutcome(13, "interactive", Number(isCorrect), 1)') &&
  lab.includes('recordOutcome(13, "criterion:application:lab", Number(isCorrect), 1)'),
  "Incorrect prediction must not receive full credit");
assert(!lab.includes('recordOutcome(13, "criterion:mechanism:prediction"') &&
  !lab.includes('recordOutcome(13, "criterion:justification:lab"'),
  "Text presence cannot certify mechanism or justification");
assert(lab.includes('setPrediction("")') && lab.includes('setRevealed(false)'),
  "Changing inputs must invalidate stale result");
assert(lab.includes("previous.length + 1") && !lab.includes("Date.now()"),
  "History IDs must be stable across rapid trials");
assert(lab.includes("<thead>") && lab.includes('scope="col"') &&
  lab.includes('aria-live="polite"'), "Table and feedback need accessible structure");
assert(lab.includes("not automatically graded") && lab.includes("не оценивается автоматически") &&
  lab.includes("автоматты түрде бағаланбайды"), "Written answers must not be presented as graded");
assert(lab.includes("not an experimentally fitted law") &&
  lab.includes("клиникалық") && lab.includes("клинической"),
  "Model limitations must be clear across languages");
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
assert(route.includes('moduleNumber === 13 && section === "interactive"') &&
  route.includes('<GuidedLabFrame moduleId={13} language={lang}><CerebellumLab language={lang} /></GuidedLabFrame>'),
  "Module 13 interactive route missing");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 13 cerebellum lab (" + scenarios +
  " model scenarios), RU/EN/KZ, prediction scoring, history, accessible output, route, preview lock.");
console.log("NOTE: numerical indices are illustrative, not neural or clinical measurements; browser testing remains separate.");
