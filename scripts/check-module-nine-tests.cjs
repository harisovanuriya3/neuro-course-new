// Module 9 authored spinal reflex tests: execute all RU/EN/KZ branches.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-nine-tests.ts";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 tests TS parse errors");
const compiled=ts.transpileModule(src,{fileName:file,compilerOptions:{
 target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS},reportDiagnostics:true});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Module 9 tests TS transpilation errors");
const adaptedExports={};
new Function("exports", compiled.outputText)(adaptedExports);
assert.equal(typeof adaptedExports.adaptModuleNineTest,"function");
const names=["concept","mechanism","application","transfer","justification"];
for(const lang of ["RU","EN","KZ"]){
 const nodes={};
 for(const competency of names){
  for(const level of ["main","corrective","basic"]){
   const id=competency+":"+level;
   nodes[id]={id,type:"question",level,competency,prompt:"placeholder",
    options:[],correctAnswer:"a",explanation:"",onCorrect:"end",onIncorrect:"end"};
  }
  for(const suffix of ["review-1","review-2"]){
   const id=competency+":"+suffix;
   nodes[id]={id,type:"remediation",competency,depth:suffix==="review-1"?1:2,
    text:"placeholder",theoryTarget:{moduleId:9,anchor:"mechanism"},next:"end"};
  }
 }
 const base={kind:"tests",title:"Test",moduleTitle:"Spinal cord",ui:{},start:"concept:main",
  mainIds:names.map(n=>n+":main"),competencies:{},nodes};
 const result=adaptedExports.adaptModuleNineTest(base,lang);
 assert.equal(result.kind,"tests");
 assert.equal(result.mainIds.length,5);
 const mainPrompts=new Set();
 for(const competency of names){
  const main=result.nodes[competency+":main"];
  const corrective=result.nodes[competency+":corrective"];
  const basic=result.nodes[competency+":basic"];
  for(const item of [main,corrective,basic]){
   assert.equal(item.type,"question");
   assert(item.prompt.length>45,lang+" "+item.id+" prompt too short");
   assert(item.explanation.length>75,lang+" "+item.id+" explanation too short");
   assert.equal(item.options.length,4);
   assert.equal(new Set(item.options.map(o=>o.id)).size,4);
   assert.equal(new Set(item.options.map(o=>o.text)).size,4);
   assert(item.options.some(o=>o.id===item.correctAnswer));
   assert(item.options.every(o=>o.text.length>15));
  }
  assert.notEqual(main.prompt,corrective.prompt,lang+" "+competency+" repeats its question");
  mainPrompts.add(main.prompt);
  for(const suffix of ["review-1","review-2"]){
   const node=result.nodes[competency+":"+suffix];
   assert.equal(node.type,"remediation");
   assert(node.text.length>100);
   assert.equal(node.theoryTarget.moduleId,9);
  }
 }
 assert.equal(mainPrompts.size,5,lang+" duplicate main prompts");
 assert.equal(new Set(result.nodes["concept:main"].options.map(o=>o.text)).size,4);
 assert(!JSON.stringify(result).includes("selectively weakened"),lang+" generic template remains");
}
const assessment=read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { adaptModuleNineTest } from "./module-nine-tests";'));
assert(assessment.includes("topic.id===9 ? adaptModuleNineTest(result,l)"));
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-nine-tests.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 9 authored branching tests: 5 main + 5 distinct corrective × RU/EN/KZ; 15 nodes per language, remediation, routing and preview guard.");
console.log("NOTE: TS transpilation and node-contract tests are not a full typecheck or browser QA.");
