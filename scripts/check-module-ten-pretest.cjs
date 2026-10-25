// Module 10 diagnostic pretest: source, three languages, keys and registry.
// Run from repository root: node scripts/check-module-ten-pretest.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-ten-pretest.ts";
const source = fs.readFileSync(file,"utf8");
const ast = ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 10 pretest TypeScript syntax");
const compiled = ts.transpileModule(source,{
  fileName:file, reportDiagnostics:true,
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const m = {exports:{}};
new Function("module","exports",compiled.outputText)(m,m.exports);
const create = m.exports.createModuleTenPretest;
assert.equal(typeof create,"function","Factory must export");
const ids = ["module-10-pretest-pupillary","module-10-pretest-corneal","module-10-pretest-arousal"];
const keys = ["b","d","c"];
const terms = {
 RU:["претектальн","Эдингера","II","III","V1","VII","таламус","ретикуляр"],
 EN:["pretectal","Edinger","II","III","V1","VII","thalamus","reticular"],
 KZ:["претектал","Эдингер","II","III","V1","VII","таламус","ретикуляр"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson = create(lang,"Brainstem","Diagnostic pretest");
 assert.equal(lesson.kind,"pretest");
 assert(lesson.introduction.length>120,lang+": incomplete introduction");
 assert.equal(lesson.questions.length,3,lang+": 3 questions");
 assert.deepEqual(lesson.questions.map(q=>q.id),ids);
 assert.deepEqual(lesson.questions.map(q=>q.correctAnswer),keys);
 const prompts = new Set();
 for(const q of lesson.questions){
  assert(q.prompt.length>100,lang+": prompt too short");
  assert(q.explanation.length>200,lang+": explanation too short");
  assert.equal(q.options.length,4,lang+": 4 choices");
  assert.deepEqual(q.options.map(o=>o.id),["a","b","c","d"]);
  assert.equal(new Set(q.options.map(o=>o.text)).size,4,lang+": duplicate choices");
  assert(q.options.every(o=>o.text.length>=55),lang+": short distractor");
  assert(q.options.some(o=>o.id===q.correctAnswer));
  assert.equal(q.target.section,"theory");
  assert(!prompts.has(q.prompt),lang+": repeated prompt");
  prompts.add(q.prompt);
 }
 const all=lesson.questions.flatMap(q=>[q.prompt,q.explanation]).join(" ").toLowerCase();
 for(const term of terms[lang])assert(all.includes(term.toLowerCase()),lang+": missing "+term);
}
const index=fs.readFileSync("content/index.ts","utf8");
assert(index.includes('import { createModuleTenPretest } from "./course-foundation/module-ten-pretest";'));
const start=index.indexOf("  10: {");
const end=index.indexOf("  9: {",start);
assert(start>=0&&end>start,"Module 10 registry missing");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[10]"));
assert(block.includes("objectives: {"),"Module 10 objectives must remain");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes('createModuleTenPretest("'+lang+'", modules.'+lang+'[9], getSectionTitle("pretest", "'+lang+'"))'),lang+": route not registered");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(10,"pretest",lang);
 assert.equal(lesson?.kind,"pretest",lang+": real route kind");
 assert.equal(lesson.questions.length,3,lang+": real question count");
 assert.deepEqual(lesson.questions.map(q=>q.correctAnswer),keys);
}
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 10 pretest, 3 questions × RU/EN/KZ, keys, explanations, registry, previews off.");
console.log("OPEN: full build, browser, independent Kazakh language review and all other module sections.");
