// Module 9: six-stage synthetic spinal-reflex case (RU/EN/KZ).
// Structural checks cannot replace browser, independent clinical or translation review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-nine-virtual-patient-review.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 virtual-patient TS must parse");
const transpiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const mod={exports:{}};
new Function("module","exports",transpiled.outputText)(mod,mod.exports);
const review=mod.exports.reviewModuleNineVirtualPatient;
assert.equal(typeof review,"function");
const positions=[1,2,0,2,1,0];
const anchors={
 RU:["спинальный шок","поясничных","гиперрефлексия","интернейрон","Гольджи","полисинаптические"],
 EN:["spinal shock","lumbar","hyperreflexia","interneuron","Golgi","polysynaptic"],
 KZ:["жұлындық шок","белдік","гиперрефлексия","интернейрон","Гольджи","полисинапстық"]
};
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:9,title:"Base",opening:"generic",mechanismSummary:"generic",
  stages:Array.from({length:6},(_,i)=>({
   id:"vp-9-stage-"+(i+1),task:"generic",situation:"generic",newData:"generic",
   mentorPrompt:"generic",mechanism:"generic",
   options:[0,1,2].map(n=>({id:"old-"+n,text:"generic",response:"generic",feedback:"generic"})),
   correctOption:0
  }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(base.stages[0].task,"generic","Base scenario mutated");
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(x=>x.correctOption),positions);
 assert(result.opening.length>80 && result.mechanismSummary.length>100);
 const unique=new Set();
 for(let i=0;i<6;i++){
  const stage=result.stages[i];
  assert(stage.task.length>59,language+" stage "+i+" task too short");
  assert(stage.newData.length>89,language+" stage "+i+" observation too short");
  assert(stage.mechanism.length>149,language+" stage "+i+" mechanism too short");
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3);
  assert(stage.options.every(o=>o.text.length>44));
  assert(stage.options.every(o=>o.feedback===stage.mechanism));
  assert.notEqual(stage.options[stage.correctOption].response,
   stage.options[(stage.correctOption+1)%3].response);
  assert((stage.task+" "+stage.newData+" "+stage.mechanism).includes(anchors[language][i]),
   language+" stage "+i+" missing physiology anchor");
  unique.add(stage.task);
 }
 assert.equal(unique.size,6);
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleNineVirtualPatient } from "./course-foundation/module-nine-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===9 && base) return reviewModuleNineVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId === 8 || moduleId === 9 ? "v2" : "v1"'),
 "New answer keys require a new storage namespace");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 9 virtual patient 6 stages × 3 languages; answer keys, feedback, storage and route.");
console.log("OPEN: full TypeScript/build/browser, clinical and independent Kazakh review.");
