// Module 9 pretest: authored physiology, answer keys and route wiring.
// Run from repository root: node scripts/check-module-nine-pretest.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-nine-pretest.ts";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 pretest TS syntax");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const m={exports:{}};
new Function("module","exports",compiled.outputText)(m,m.exports);
const create=m.exports.createModuleNinePretest;
assert.equal(typeof create,"function");
const keys=["b","d","c"];
const ids=["module-9-pretest-dorsal-root","module-9-pretest-spinal-shock","module-9-pretest-withdrawal"];
const terms={
 RU:["задний корешок","передний","спинальный шок","полисинаптическ","афферент"],
 EN:["dorsal root","ventral","spinal shock","polysynaptic","afferent"],
 KZ:["артқы түбіршек","алдыңғы","жұлындық шок","полисинапстық","афферент"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang,"Module 9","Diagnostic pretest");
 assert.equal(lesson.kind,"pretest");
 assert(lesson.introduction.length>=100,lang+": incomplete introduction");
 assert.equal(lesson.questions.length,3);
 assert.deepEqual(lesson.questions.map(q=>q.id),ids);
 assert.deepEqual(lesson.questions.map(q=>q.correctAnswer),keys);
 const seen=new Set();
 for(const q of lesson.questions){
  assert(q.prompt.length>100,lang+": short prompt");
  assert(q.explanation.length>200,lang+": short explanation");
  assert.equal(q.options.length,4);
  assert.deepEqual(q.options.map(o=>o.id),["a","b","c","d"]);
  assert.equal(new Set(q.options.map(o=>o.text)).size,4,lang+": repeated options");
  assert(q.options.every(o=>o.text.length>=40),lang+": incomplete option");
  assert(q.options.some(o=>o.id===q.correctAnswer));
  assert.equal(q.target.section,"theory");
  assert(!seen.has(q.prompt),lang+": repeated question");
  seen.add(q.prompt);
 }
 const all=lesson.questions.flatMap(q=>[q.prompt,q.explanation]).join(" ").toLowerCase();
 for(const term of terms[lang])assert(all.includes(term),lang+": missing term "+term);
}
const registry=fs.readFileSync("content/index.ts","utf8");
assert(registry.includes('import { createModuleNinePretest } from "./course-foundation/module-nine-pretest";'));
const start=registry.indexOf("  9: {");
const end=registry.indexOf("  8: {",start);
assert(start>=0&&end>start,"Module 9 registry missing");
const block=registry.slice(start,end);
assert(block.includes("...foundationLessons[9]"));
for(const lang of ["RU","EN","KZ"])
 assert(block.includes('createModuleNinePretest("'+lang+'",'),lang+": route not registered");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(9,"pretest",lang);
 assert.equal(lesson?.kind,"pretest",lang+": actual route kind");
 assert.equal(lesson.questions.length,3,lang+": integrated questions");
 assert.deepEqual(lesson.questions.map(q=>q.correctAnswer),keys);
}
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 9 pretest (3 questions × 3 languages, 4 options, keys, explanations, routes).");
console.log("OPEN: complete audit, TypeScript/build, browser and independent KZ review.");
