// Focused module 6 virtual-model regression; run from repository root.
// This tests authored choices and score mapping, not browser interactions.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-six-virtual-patient-review.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 virtual-model TS parse errors");
const compiled=ts.transpileModule(source,{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},
 reportDiagnostics:true
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Transpilation diagnostics");
const sandboxExports={};
vm.runInNewContext(compiled.outputText,{exports:sandboxExports},{timeout:1000});
const review=sandboxExports.reviewModuleSixVirtualPatient;
assert.equal(typeof review,"function","Module 6 review function not exported");

for(const language of ["RU","EN","KZ"]){
 const base={
  moduleId:6,patient:"Patient",profile:"Old",opening:"Old",syntheticNote:"Old",
  mechanismSummary:"Old",
  stages:Array.from({length:6},(_,index)=>({
   id:"vp-6-stage-"+(index+1),title:"Old",task:"Old",situation:"Old",
   newData:"Old",mentorPrompt:"Old",mechanism:"Old",correctOption:index%3,
   options:[0,1,2].map(i=>({id:"vp-6-stage-"+(index+1)+"-decision-"+(i+1),
    text:"Old",response:"Old",feedback:"Old"}))
  }))
 };
 const before=JSON.stringify(base);
 const result=review(base,language);
 assert.equal(JSON.stringify(base),before,language+" review must not mutate base");
 assert.equal(result.stages.length,6,language+" must retain six stages");
 assert.notEqual(result.patient,base.patient,language+" must be labeled model");
 assert(!result.patient.toLowerCase().includes("clinical"),language+" must not claim clinical patient");
 assert(result.syntheticNote.length>35,language+" missing model disclaimer");
 const texts=[];
 result.stages.forEach((stage,index)=>{
  assert.equal(stage.id,base.stages[index].id,language+" stable stage ID");
  assert.equal(stage.correctOption,index%3,language+" correct option mapping changed");
  assert.equal(stage.options.length,3,language+" must keep three choices");
  assert.equal(new Set(stage.options.map(x=>x.text)).size,3,language+" choices duplicate");
  assert(stage.options.every((o,i)=>o.id===base.stages[index].options[i].id),language+" choice IDs changed");
  for(const field of ["title","task","situation","newData","mechanism","mentorPrompt"]){
   assert(stage[field].length>(field==="title"?10:20),language+" stage "+(index+1)+" short "+field);
  }
  assert(stage.options.every(o=>o.feedback.length>75),language+" missing scientific explanation");
  assert(stage.options[stage.correctOption].text.length>45,language+" missing correct option");
  assert(stage.options.filter((_,i)=>i!==stage.correctOption).every(o=>o.response!==stage.options[stage.correctOption].response),
   language+" correct/incorrect response should differ");
  texts.push(stage.options[stage.correctOption].text);
 });
 assert.equal(new Set(texts).size,6,language+" correct choices repeated");
 const joined=result.stages.map(x=>x.newData+" "+x.mechanism).join(" ");
 for(const term of ["−58","−52","−56","−55","18","Ca²⁺"]){
  assert(joined.includes(term),language+" missing numeric/physiological guardrail "+term);
 }
}
const estimate=(mode,exc,inh,interval)=>Math.round((-70+Array.from({length:exc},(_,i)=>6*(mode==="temporal"?Math.exp(-i*interval/18):1)).reduce((a,b)=>a+b,0)-inh*4.5)*10)/10;
assert.equal(estimate("spatial",2,0,8),-58);
assert.equal(estimate("spatial",3,0,8),-52);
assert.equal(estimate("spatial",3,1,8),-56.5);
assert.equal(estimate("temporal",3,0,8),-57.7);
assert.equal(estimate("temporal",3,0,1),-53.0);
const lab=read("components/IntegrationExperimentLab.tsx");
for(const term of ["const epspMv=Array.from","Math.exp(-i*interval/18)","-inh*4.5","-70+epspMv","vm>=-55"]){
 assert(lab.includes(term),"Integration lab formula changed: "+term);
}
const registry=read("content/reviewed-virtual-patients.ts");
assert(registry.includes("reviewModuleSixVirtualPatient(base,language)"),"Module 6 review not wired");
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes("moduleId === 6 ? integrationModelDecisionCopy[language]"),"Module 6 rubric must be a teaching model");
assert(ui.includes("moduleId === 3 || moduleId === 4 || moduleId === 5 || moduleId === 6"),"Module 6 model labels/criterion missing");
assert(ui.includes("criterion:mechanism:virtual-model"),"Mechanism score missing");
assert(ui.includes('moduleId >= 6 && moduleId <= 10 ? "v2" : "v1"'),"Module 6 revised choices must use versioned localStorage");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review previews must remain disabled");
console.log("PASS: module 6 model 18 localized stages, 54 choices, numeric guardrails, registry, rubric, preview off.");
console.log("NOTE: browser, native-speaker review, full TypeScript build remain outstanding.");
