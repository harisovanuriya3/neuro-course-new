const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");

const path = "content/course-foundation/module-thirteen-questions.ts";
const source = fs.readFileSync(path, "utf8");
const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(file.parseDiagnostics.length, 0, "TypeScript syntax errors");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true
});
assert.equal(compiled.diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.moduleThirteenReviewQuestions, "function");

const prompts = {};
for (const language of ["RU", "EN", "KZ"]) {
  const questions = exported.moduleThirteenReviewQuestions(language);
  assert.equal(questions.length, 6, language + " count");
  assert.equal(new Set(questions.map(q => q.id)).size, 6, language + " IDs");
  assert.equal(new Set(questions.map(q => q.prompt)).size, 6, language + " prompts");
  assert(questions.every(q => q.prompt.length >= 90 && q.explanation.length >= 140), language + " depth");
  assert(questions.every(q => ["theory", "practice", "cases"].includes(q.target.section)), language + " route");
  prompts[language] = questions;
}
for (let i = 0; i < 6; i++) {
  assert.equal(prompts.RU[i].id, prompts.EN[i].id);
  assert.equal(prompts.EN[i].id, prompts.KZ[i].id);
  assert.equal(prompts.RU[i].target.section, prompts.KZ[i].target.section);
  assert(!/[әғқңөұүһі]/i.test(prompts.RU[i].prompt + prompts.RU[i].explanation), "KZ letters in RU");
}
const en = prompts.EN.map(q => q.prompt + " " + q.explanation).join(" ").toLowerCase();
for (const marker of ["purkinje", "climbing", "mossy", "proprioception", "dysmetria", "romberg", "aftereffect"]) {
  assert(en.includes(marker), "missing scientific marker " + marker);
}
const foundation = fs.readFileSync("content/course-foundation/index.ts", "utf8");
assert(foundation.includes("import { moduleThirteenReviewQuestions } from './module-thirteen-questions';"));
assert(foundation.includes("if (topic.id === 13) return {kind:'questions',title,introduction:c.questionsIntro,questions:moduleThirteenReviewQuestions(language)};"));
assert(foundation.includes("topic.id === 12"), "preserve module 12");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-thirteen-questions.cjs"));
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: 6 original module 13 review questions × RU/EN/KZ, routing and Vercel guard");
