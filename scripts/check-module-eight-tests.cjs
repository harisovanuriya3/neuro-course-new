// Module 8: executable RU/EN/KZ authored branching-test contract.
// Run: node scripts/check-module-eight-tests.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const path="content/course-foundation/module-eight-tests.ts";
const source=fs.readFileSync(path,"utf8");
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 8 test TS syntax");
const compiled=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const adaptedExports={};
new Function("exports",compiled.outputText)(adaptedExports);
assert.equal(typeof adaptedExports.adaptModuleEightTest,"function");
const skills=["concept","mechanism","application","transfer","justification"];
const levels=["main","corrective","basic"];
const baseNodes={};
for(const skill of skills){
 for(const level of levels){
  const id=skill+":"+level;
  baseNodes[id]={id,type:"question",level,competency:skill,prompt:"GENERIC",
   options:[{id:"a",text:"GENERIC"},{id:"b",text:"GENERIC"},{id:"c",text:"GENERIC"},{id:"d",text:"GENERIC"}],
   correctAnswer:"a",explanation:"GENERIC",onCorrect:"end",onIncorrect:"end"};
 }
 for(const depth of [1,2]){
  const id=skill+":review-"+depth;
  baseNodes[id]={id,type:"remediation",competency:skill,depth,text:"GENERIC",
   theoryTarget:{moduleId:8,anchor:"mechanism"},next:skill+":"+(depth===1?"corrective":"basic")};
 }
}
const base={kind:"tests",title:"",moduleTitle:"Pathways",ui:{},
 start:"concept:main",mainIds:skills.map(x=>x+":main"),competencies:{},nodes:baseNodes};
for(const lang of ["RU","EN","KZ"]){
 const out=adaptedExports.adaptModuleEightTest(base,lang);
 assert.equal(Object.keys(out.nodes).length,25);
 assert.equal(out.mainIds.length,5);
 let distinct=new Set();
 for(const skill of skills){
  const prompts=[];
  for(const level of levels){
   const node=out.nodes[skill+":"+level];
   assert.equal(node.type,"question");
   assert(node.prompt.length>25,lang+" "+skill+":"+level+" short prompt");
   assert.equal(node.options.length,4);
   assert.equal(new Set(node.options.map(x=>x.id)).size,4);
   assert.equal(new Set(node.options.map(x=>x.text)).size,4);
   assert.equal(node.options.filter(x=>x.id===node.correctAnswer).length,1);
   assert(node.explanation.length>40);
   assert.equal(node.onCorrect,"end","Preserve existing branching transitions");
   assert.equal(node.onIncorrect,"end","Preserve existing branching transitions");
   prompts.push(node.prompt);
   distinct.add(node.prompt);
  }
  assert.notEqual(prompts[0],prompts[1],lang+" "+skill+" corrective must be a new problem");
  for(const depth of [1,2]){
   const rem=out.nodes[skill+":review-"+depth];
   assert.equal(rem.type,"remediation");
   assert(rem.text.length>100,lang+" "+skill+" missing physiological feedback");
   assert.equal(rem.theoryTarget.moduleId,8);
  }
 }
 assert.equal(distinct.size,10,lang+": 5 main + 5 corrective questions expected; basic is scaffolded repeat");
 assert.equal(base.nodes["concept:main"].prompt,"GENERIC","Adapter must not mutate generic test");
}
const assessment=fs.readFileSync("content/course-foundation/assessment.ts","utf8");
assert(assessment.includes('import { adaptModuleEightTest } from "./module-eight-tests";'));
assert(assessment.includes("return topic.id===8 ? adaptModuleEightTest(result,l) : result;"));
const foundation=fs.readFileSync("content/course-foundation/index.ts","utf8");
assert(foundation.includes("return createFoundationTest("));
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 8 tests 5 main + 5 corrective physiological items × RU/EN/KZ, 25-node branch, answer keys, route and preview guard.");
console.log("NOTE: basic questions repeat corrective items; full TS typecheck, browser and translation review still required.");
