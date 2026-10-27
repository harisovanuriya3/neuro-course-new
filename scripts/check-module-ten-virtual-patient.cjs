// Module 10: execute reviewed six-stage brainstem case in RU, EN and KZ.
// Does not substitute for full TypeScript, clinical translation or browser QA.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-ten-virtual-patient-review.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 10 virtual patient TS parse errors");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Module 10 virtual patient transpilation errors");
const adaptedExports={};
new Function("exports",compiled.outputText)(adaptedExports);
const review=adaptedExports.reviewModuleTenVirtualPatient;
assert.equal(typeof review,"function");
const positions=[2,0,1,2,0,1];
const anchors={
 RU:["Бодрствование","Эдингера","V1","слуховые","CVLM","таламуса"],
 EN:["Arousal","Edinger","V1","auditory","CVLM","thalamus"],
 KZ:["Сергектік","Эдингер","V1","есту","CVLM","таламус"]
};
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:10,opening:"generic",mechanismSummary:"generic",stages:Array.from({length:6},(_,i)=>({
  id:"vp-10-stage-"+(i+1),situation:"generic",task:"generic",newData:"generic",
  mentorPrompt:"generic",mechanism:"generic",correctOption:0,
  options:[0,1,2].map(n=>({id:"old-"+n,text:"generic",response:"generic",feedback:"generic"}))
 }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(base.stages[0].task,"generic","Original base scenario mutated");
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(x=>x.correctOption),positions);
 assert(result.opening.length>70 && result.mechanismSummary.length>130);
 const prompts=new Set();
 for(let i=0;i<6;i++){
  const stage=result.stages[i];
  assert(stage.task.length>45,language+" stage "+i+" task too short");
  assert(stage.newData.length>65,language+" stage "+i+" observation too short");
  assert(stage.mechanism.length>90,language+" stage "+i+" explanation too short");
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.id)).size,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3);
  assert(stage.options.every(o=>o.text.length>24));
  assert(stage.options.every(o=>o.feedback===stage.mechanism));
  assert.notEqual(stage.options[stage.correctOption].response,
   stage.options[(stage.correctOption+1)%3].response);
  assert((stage.task+" "+stage.newData+" "+stage.mechanism+" "+stage.options.map(o=>o.text).join(" ")).includes(anchors[language][i]),
   language+" stage "+i+" missing physiology marker "+anchors[language][i]);
  prompts.add(stage.task);
 }
 assert.equal(prompts.size,6);
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleTenVirtualPatient } from "./course-foundation/module-ten-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===10 && base) return reviewModuleTenVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId >= 6 && moduleId <= 10 ? "v2" : "v1"'),
 "Changed answer meanings require a new localStorage namespace");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-ten-virtual-patient.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 10 brainstem virtual patient 6 stages x 3 languages, 3 options, keyed feedback, route, storage migration and preview guard.");
console.log("OPEN: full TS/build/browser, independent clinical and Kazakh-language review.");
