// Execute module 7 reviewed patellar-reflex case in isolation after TypeScript transpilation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-seven-virtual-patient-review.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 7 virtual-patient TS must parse");
const transpiled=ts.transpileModule(source,{
 fileName:path,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const mod={exports:{}};
new Function("module","exports",transpiled.outputText)(mod,mod.exports);
const review=mod.exports.reviewModuleSevenVirtualPatient;
assert.equal(typeof review,"function");
const positions=[1,2,0,2,0,1];
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:7,title:"Base",patient:"Volunteer",stages:Array.from({length:6},(_,i)=>({
  id:"vp-7-stage-"+(i+1),task:"generic",newData:"generic",
  mentorPrompt:"generic",mechanism:"generic",
  options:[0,1,2].map(n=>({id:"old-"+n,text:"generic",response:"generic",feedback:"generic"})),
  correctOption:0
 }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(s=>s.correctOption),positions);
 assert.equal(base.stages[0].task,"generic","Must not mutate base scenario");
 const uniqueTasks=new Set();
 for(let i=0;i<6;i++){
  const stage=result.stages[i];
  assert(stage.task.length>35,language+" stage "+i+" generic task");
  assert(stage.newData.length>45,language+" stage "+i+" missing clinical observation");
  assert(stage.mechanism.length>85,language+" stage "+i+" missing physiological feedback");
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3,"Duplicate decisions");
  assert(stage.options.every(o=>o.text.length>45));
  assert(stage.options.every(o=>o.feedback===stage.mechanism));
  assert(stage.options[stage.correctOption].response!==stage.options[(stage.correctOption+1)%3].response,
   "Correct and wrong choices must have distinct consequences");
  uniqueTasks.add(stage.task);
 }
 assert.equal(uniqueTasks.size,6);
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleSevenVirtualPatient } from "./course-foundation/module-seven-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===7 && base) return reviewModuleSevenVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId === 6 || moduleId === 7 ? "v2" : "v1"'),
 "Module 7 must not reinterpret previously stored choice indices");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 7 / virtual-patient: six authored stages × RU/EN/KZ, 3 distinct decisions, stable keys, route, storage migration and preview off.");
console.log("OPEN: full Node/TS/build/browser runs, manual clinical review and independent Kazakh review.");
