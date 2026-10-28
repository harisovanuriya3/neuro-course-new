const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/module-thirteen-virtual-patient.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 13 TypeScript must parse");
const result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true
});
assert.equal(result.diagnostics.filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const moduleExports = {};
new Function("exports", result.outputText)(moduleExports);
assert.equal(typeof moduleExports.createModuleThirteenPatientStages, "function");
for (const language of ["RU", "EN", "KZ"]) {
  const stages = moduleExports.createModuleThirteenPatientStages(language);
  assert.equal(stages.length, 6, language + " stages");
  assert.equal(new Set(stages.map(s => s.id)).size, 6);
  for (const [index, stage] of stages.entries()) {
    assert.equal(stage.options.length, 3, language + " options");
    assert.equal(stage.correctOption, index % 3, "rotation");
    assert.equal(new Set(stage.options.map(o => o.text)).size, 3, "distinct decisions");
    assert.equal(new Set(stage.options.map(o => o.feedback)).size, 3, "specific feedback");
    assert(stage.options.every(o => o.response === stage.newData), "evidence cannot depend on guessed answer");
    assert(stage.options.every(o => o.feedback.length > 30 && o.text.length > 30), "meaningful feedback");
    assert(stage.situation.length > 55 && stage.newData.length > 85 && stage.mechanism.length > 65, "meaningful case stage");
    assert(stage.options[stage.correctOption].feedback.length > 30, "key feedback");
    if (language === "RU") {
      const combined = [stage.title, stage.situation, stage.task, stage.newData, stage.mechanism, ...stage.options.flatMap(o => [o.text, o.feedback])].join(" ");
      assert(!/[әғқңөұүһі]/i.test(combined), "KZ-specific letters in RU");
    }
  }
  const combined = stages.map(s => [s.situation, s.newData, s.mechanism].join(" ")).join(" ").toLowerCase();
  const markers = {
    RU: ["сила", "дисметри", "ромберг", "нистагм", "внезапн"],
    EN: ["strength", "dysmetria", "romberg", "nystagmus", "sudden"],
    KZ: ["күш", "дисметрия", "ромберг", "нистагм", "кенет"]
  };
  for (const marker of markers[language]) assert(combined.includes(marker), language + " missing " + marker);
}
const base = fs.readFileSync("content/virtual-patients.ts", "utf8");
assert(base.includes('import { createModuleThirteenPatientStages } from "./module-thirteen-virtual-patient";'));
assert(base.includes("moduleId === 13 ? createModuleThirteenPatientStages(language) : c.stages.map("));
const review = fs.readFileSync("content/reviewed-virtual-patients.ts", "utf8");
assert(review.includes("if(moduleId!==3 || !base) return base;"), "module 13 should pass through unchanged");
const route = fs.readFileSync("components/UnifiedVirtualPatient.tsx", "utf8");
assert(route.includes('getReviewedVirtualPatientScenario as getVirtualPatientScenario'), "UI must use reviewed scenario");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-thirteen-virtual-patient.cjs"));
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 13 virtual patient — 6 clinical stages × RU/EN/KZ, 3 distinct options, answer keys, evidence, routing and Vercel guard");
console.log("NOTE: browser, voice, medical KZ editing and clinical diagnosis remain unverified.");
