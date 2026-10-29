const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");

const path = "content/course-foundation/module-fourteen-questions.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "TypeScript syntax");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal(compiled.diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const exports = {};
new Function("exports", compiled.outputText)(exports);
assert.equal(typeof exports.moduleFourteenReviewQuestions, "function");

const byLanguage = {};
for (const lang of ["RU", "EN", "KZ"]) {
  const questions = exports.moduleFourteenReviewQuestions(lang);
  assert.equal(questions.length, 6, lang + " count");
  assert.equal(new Set(questions.map(q => q.id)).size, 6, lang + " IDs");
  assert.equal(new Set(questions.map(q => q.prompt)).size, 6, lang + " distinct prompts");
  assert(questions.every(q => q.prompt.length >= 100 && q.explanation.length >= 150), lang + " substantive content");
  assert(questions.every(q => ["theory", "practice", "cases"].includes(q.target.section)), lang + " valid targets");
  byLanguage[lang] = questions;
}
for (let i = 0; i < 6; i++) {
  assert.equal(byLanguage.RU[i].id, byLanguage.EN[i].id);
  assert.equal(byLanguage.EN[i].id, byLanguage.KZ[i].id);
  assert.equal(byLanguage.RU[i].target.section, byLanguage.KZ[i].target.section);
  assert(!/[әғқңөұүһі]/i.test(byLanguage.RU[i].prompt + byLanguage.RU[i].explanation), "KZ letters in RU");
}
const en = byLanguage.EN.map(q => q.prompt + " " + q.explanation).join(" ").toLowerCase();
for (const marker of ["vpl", "vpm", "medulla", "gaba", "glutamatergic", "geniculate", "olfactory", "false-alarm", "internal capsule"]) {
  assert(en.includes(marker), "missing scientific marker: " + marker);
}
const foundation = fs.readFileSync("content/course-foundation/index.ts", "utf8");
assert(foundation.includes("import { moduleFourteenReviewQuestions } from './module-fourteen-questions';"));
assert(foundation.includes("if (topic.id === 14) return {kind:'questions',title,introduction:c.questionsIntro,questions:moduleFourteenReviewQuestions(language)};"));
assert(foundation.includes("if (topic.id === 13) return {kind:'questions',title,introduction:c.questionsIntro,questions:moduleThirteenReviewQuestions(language)};"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fourteen-questions.cjs"));
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 14 thalamus questions, 6 x RU/EN/KZ, routes and Vercel guard");
