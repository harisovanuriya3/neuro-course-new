// Module 14 / interactive: model, educational scoring and UI contract.
// Run: node scripts/check-module-fourteen-interactive.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");

const modelPath = "lib/thalamusModel.ts";
const labPath = "components/ThalamusLab.tsx";
const model = fs.readFileSync(modelPath, "utf8");
const lab = fs.readFileSync(labPath, "utf8");
for (const [path, source, kind] of [
  [modelPath, model, ts.ScriptKind.TS],
  [labPath, lab, ts.ScriptKind.TSX],
]) {
  const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
  assert.equal(parsed.parseDiagnostics.length, 0, path + ": TypeScript syntax error");
  const result = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
  });
  assert.equal((result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
    0, path + ": TypeScript transpilation error");
}
const js = ts.transpileModule(model, {
  fileName: modelPath,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
}).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(js, sandbox);
const { simulateThalamus, compareThalamus } = sandbox.exports;
assert.equal(typeof simulateThalamus, "function");
assert.equal(typeof compareThalamus, "function");
let scenarios = 0;
for (const input of [0, 1, 25, 60, 70, 100]) {
  let previous = -1;
  for (const gate of [0, 10, 25, 50, 60, 75, 100]) {
    const result = simulateThalamus(input, gate);
    assert(result.relayIndex >= 0 && result.relayIndex <= input);
    assert(result.corticalIndex >= 0 && result.corticalIndex <= result.relayIndex);
    assert(result.corticalIndex >= previous, "Illustrative output must be monotonic in gating index");
    previous = result.corticalIndex;
    const compared = compareThalamus(input, gate);
    assert.equal(compared.baseline.gatingIndex, 50);
    assert.equal(compared.observed.corticalIndex, result.corticalIndex);
    const trend = result.corticalIndex < compared.baseline.corticalIndex ? "lower" :
      result.corticalIndex > compared.baseline.corticalIndex ? "higher" : "same";
    assert.equal(compared.trend, trend);
    scenarios++;
  }
}
assert.equal(simulateThalamus(0, 100).corticalIndex, 0,
  "Zero input must not produce a fabricated evoked cortical output");
assert.equal(compareThalamus(70, 50).trend, "same");
assert.equal(compareThalamus(70, 0).trend, "lower");
assert.equal(compareThalamus(70, 100).trend, "higher");
for (const value of [-100, 150, NaN, Infinity]) {
  const result = simulateThalamus(value, value);
  assert(result.sensoryInput >= 0 && result.sensoryInput <= 100);
  assert(result.gatingIndex >= 0 && result.gatingIndex <= 100);
  scenarios++;
}
for (const lang of ["RU", "EN", "KZ"])
  assert(new RegExp("\\b" + lang + ":\\s*\\{").test(lab), lang + ": localized UI missing");
assert(lab.includes('disabled={!prediction || revealed}') &&
  lab.includes('if (!prediction || revealed) return;'),
  "Prediction must precede result and prevent repeated scoring");
assert(lab.includes('prediction === comparison.trend') &&
  lab.includes('recordOutcome(14, "interactive", Number(isCorrect), 1)') &&
  lab.includes('recordOutcome(14, "criterion:application:lab", Number(isCorrect), 1)'),
  "Incorrect predictions must not earn full credit");
assert(!lab.includes('recordOutcome(14, "criterion:mechanism:prediction"') &&
  !lab.includes('recordOutcome(14, "criterion:justification:lab"'),
  "Text presence must not certify physiological reasoning");
assert(lab.includes('setPrediction("")') && lab.includes('setRevealed(false)'),
  "Input changes must invalidate previous prediction and result");
assert(lab.includes('previous.length + 1') && !lab.includes("Date.now()"),
  "Trial history IDs must remain unique for rapid trials");
assert(lab.includes('scope="col"') && lab.includes('aria-live="polite"') &&
  lab.includes('role="img"'), "Accessible feedback, table and diagram required");
assert(lab.includes("не оценивается автоматически") &&
  lab.includes("not automatically graded") && lab.includes("автоматты түрде бағаланбайды"),
  "Written explanation must not be presented as automatically graded");
assert(lab.includes("VPL") && lab.includes("VPM") &&
  lab.includes("T-type") && lab.includes("ГАМҚ"),
  "Relay anatomy and circuit limitations required");
assert(model.includes("not a fitted") && model.includes("Number.isFinite"),
  "Illustrative assumption and invalid-input guard required");
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
assert(route.includes('moduleNumber === 14 && section === "interactive"') &&
  route.includes('<GuidedLabFrame moduleId={14} language={lang}><ThalamusLab language={lang} /></GuidedLabFrame>'),
  "Module 14 interactive route missing");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 14 thalamic lab, " + scenarios +
  " model scenarios, RU/EN/KZ, prediction-only scoring, history, accessibility, route, preview lock.");
console.log("NOTE: indices are illustrative, not neural or clinical measurements; browser testing remains separate.");
