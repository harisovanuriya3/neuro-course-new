// Module 10: source-level and runtime contract for brainstem reflection questions.
// Run from repository root: node scripts/check-module-ten-questions.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-ten-questions.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 10 questions: TypeScript parse errors");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Module 10 questions: transpilation errors");
const context={exports:{},require:name=>{
 if(name==="../sections")return {getSectionTitle:(slug,lang)=>slug+" "+lang};
 throw Error("Unexpected runtime import: "+name);
}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleTenQuestions;
assert.equal(typeof create,"function","Module 10 question factory missing");
const markers={
 RU:["претект","барорецептор","NTS","слуховой","продолговат","V1"],
 EN:["optic nerve","baroreceptor","NTS","auditory","medull","V1"],
 KZ:["торқабық","барорецептор","NTS","есту","сопақша","V1"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang);
 assert.equal(lesson.kind,"questions");
 assert(lesson.introduction.length>100,lang+": short introduction");
 assert.equal(lesson.questions.length,5,lang+": five distinct cases required");
 assert.equal(new Set(lesson.questions.map(q=>q.id)).size,5);
 assert.equal(new Set(lesson.questions.map(q=>q.prompt)).size,5);
 const targetSections=new Set(lesson.questions.map(q=>q.target.section));
 for(const section of ["theory","clinical","cases","interactive"])
  assert(targetSections.has(section),lang+": missing target "+section);
 for(const [index,q] of lesson.questions.entries()){
  assert.equal(q.id,"module-10-question-"+(index+1));
  assert(q.prompt.length>=120,lang+": short prompt "+index);
  assert(q.explanation.length>=350,lang+": short feedback "+index);
  assert.notEqual(q.prompt,q.explanation);
  assert(["theory","clinical","cases","interactive"].includes(q.target.section));
 }
 const body=lesson.questions.map(q=>q.prompt+" "+q.explanation).join(" ");
 for(const marker of markers[lang])assert(body.includes(marker),lang+": missing "+marker);
 assert(!body.includes("Describe the causal mechanism step by step"),lang+": generic placeholder");
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleTenQuestions } from "./course-foundation/module-ten-questions";'));
const start=registry.indexOf("  10: {");
const end=registry.indexOf("  9: {",start);
assert(start>=0&&end>start,"Module 10 registry block missing");
const block=registry.slice(start,end);
assert(block.includes("...foundationLessons[10]"),"Other module 10 sections overwritten");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes(lang+': createModuleTenQuestions("'+lang+'")'),
  lang+": authored questions not registered");
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-ten-questions.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 10 questions, five original mechanisms x RU/EN/KZ, routes and preview guard.");
console.log("OPEN: full typecheck/build, browser/mobile/keyboard and independent KZ editorial review.");
