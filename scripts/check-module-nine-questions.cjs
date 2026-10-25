// Module 9: authored spinal reflex reflection questions (RU/EN/KZ).
// Run: node scripts/check-module-nine-questions.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-nine-questions.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 questions TS parse errors");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Module 9 questions transpilation errors");
const context={exports:{},require:name=>{
 if(name==="../sections")return {getSectionTitle:(slug,lang)=>slug+" "+lang};
 throw Error("Unexpected runtime import: "+name);
}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleNineQuestions;
assert.equal(typeof create,"function");
const markers={
 RU:["Ia","γ-мотонейрон","интернейрон","спинальный шок","перекрёст"],
 EN:["Ia","γ-motor","interneuron","spinal shock","crossed extension"],
 KZ:["Ia","γ-мотонейрон","интернейрон","жұлындық шок","айқаспалы"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang);
 assert.equal(lesson.kind,"questions");
 assert(lesson.introduction.length>90,lang+": short introduction");
 assert.equal(lesson.questions.length,5,lang+": five questions required");
 assert.equal(new Set(lesson.questions.map(q=>q.id)).size,5);
 assert.equal(new Set(lesson.questions.map(q=>q.prompt)).size,5);
 for(const [index,q] of lesson.questions.entries()){
  assert.equal(q.id,"module-9-question-"+(index+1));
  assert(q.prompt.length>=85,lang+": short prompt "+index);
  assert(q.explanation.length>=250,lang+": short explanation "+index);
  assert(["theory","clinical","cases","interactive"].includes(q.target.section));
  assert.notEqual(q.prompt,q.explanation);
 }
 const body=lesson.questions.map(q=>q.prompt+" "+q.explanation).join(" ");
 for(const marker of markers[lang])assert(body.includes(marker),lang+": missing "+marker);
 assert(!body.includes("Describe the causal mechanism step by step"),lang+": generic question remains");
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleNineQuestions } from "./course-foundation/module-nine-questions";'));
const start=registry.indexOf("  9: {");
const end=registry.indexOf("  8: {",start);
assert(start>=0&&end>start,"Module 9 registry block missing");
const block=registry.slice(start,end);
assert(block.includes("...foundationLessons[9]"),"Other module 9 sections overwritten");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes(lang+': createModuleNineQuestions("'+lang+'")'),
  lang+": module 9 questions not registered");
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-nine-questions.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 9 questions: 5 authored reflection prompts × RU/EN/KZ, feedback, targets, routing and preview guard.");
console.log("OPEN: full project typecheck, build, browser/keyboard/mobile QA and independent KZ language review.");
