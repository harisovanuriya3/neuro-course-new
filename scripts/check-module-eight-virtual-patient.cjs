// Module 8: run the reviewed six-stage sensory-pathway case in isolation.
// Structural assertions complement, but cannot replace, clinical/translation/browser review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-eight-virtual-patient-review.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 8 virtual patient TS must parse");
const transpiled=ts.transpileModule(source,{
 fileName:path,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const mod={exports:{}};
new Function("module","exports",transpiled.outputText)(mod,mod.exports);
const review=mod.exports.reviewModuleEightVirtualPatient;
assert.equal(typeof review,"function");
const positions=[1,2,0,2,1,0];
const keyTerms={
 RU:["камертоном","заднего столба","переднюю белую спайку","пирамид","Броун–Секара","позвонок"],
 EN:["tuning-fork","dorsal-column","anterior white commissure","pyramidal","Brown–Séquard","vertebral"],
 KZ:["камертонмен","артқы баған","алдыңғы ақ комиссура","пирамид","Броун–Секар","омыртқа"]
};
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:8,title:"Base",patient:"Patient",opening:"generic",mechanismSummary:"generic",
  stages:Array.from({length:6},(_,i)=>({
   id:"vp-8-stage-"+(i+1),task:"generic",newData:"generic",mentorPrompt:"generic",
   mechanism:"generic",options:[0,1,2].map(n=>({id:"old-"+n,text:"generic",response:"generic",feedback:"generic"})),
   correctOption:0
  }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(s=>s.correctOption),positions);
 assert.equal(base.stages[0].task,"generic","Base scenario mutated");
 assert(result.opening.length>90 && result.mechanismSummary.length>150);
 const uniqueTasks=new Set();
 for(let i=0;i<6;i++){
  const stage=result.stages[i];
  assert(stage.task.length>50,language+" stage "+i+" short task");
  assert(stage.newData.length>85,language+" stage "+i+" vague observations");
  assert(stage.mechanism.length>120,language+" stage "+i+" weak explanation");
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3);
  assert(stage.options.every(o=>o.text.length>70));
  assert(stage.options.every(o=>o.feedback===stage.mechanism));
  assert(stage.options[stage.correctOption].response!==stage.options[(stage.correctOption+1)%3].response);
  assert(stage.options[stage.correctOption].text!==stage.options[(stage.correctOption+1)%3].text);
  const detail=stage.task+" "+stage.newData+" "+stage.mechanism+" "+stage.options.map(o=>o.text).join(" ");
  assert(detail.includes(keyTerms[language][i]),language+" stage "+i+" missing pathway anchor");
  uniqueTasks.add(stage.task);
 }
 assert.equal(uniqueTasks.size,6);
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleEightVirtualPatient } from "./course-foundation/module-eight-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===8 && base) return reviewModuleEightVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId === 6 || moduleId === 7 || moduleId === 8 ? "v2" : "v1"'));
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 8 virtual patient: six localized stages, physiology feedback, distinct decisions, versioned storage, route and disabled preview.");
console.log("OPEN: project-wide TS/build/browser and independent clinical/Kazakh review.");
