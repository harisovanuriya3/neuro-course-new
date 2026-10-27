// Module 11: execute reviewed six-stage motor planning case for RU, EN, KZ.
// Source, key, route and storage checks; not a browser or full typecheck.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-eleven-virtual-patient-review.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 11 virtual patient TS parse errors");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Module 11 virtual patient TS transpilation errors");
const exports={};
new Function("exports",compiled.outputText)(exports);
const review=exports.reviewModuleElevenVirtualPatient;
assert.equal(typeof review,"function");
const positions=[1,2,0,1,2,0];
const anchors={
 RU:["сила","подражанию","брадикинезии","зрительным","α-мотонейроны","диагноза"],
 EN:["strength","imitation","bradykinesia","visual","alpha motor neurons","diagnosis"],
 KZ:["күш","еліктеу","брадикинезия","көрнекі","α-мотонейрондар","диагноз"]
};
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:11,opening:"generic",mechanismSummary:"generic",stages:Array.from({length:6},(_,i)=>({
  id:"vp-11-stage-"+(i+1),situation:"generic",task:"generic",newData:"generic",
  mentorPrompt:"generic",mechanism:"generic",correctOption:0,
  options:[0,1,2].map(n=>({id:"old-"+n,text:"generic",response:"generic",feedback:"generic"}))
 }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(base.stages[0].task,"generic","Base scenario mutated");
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(x=>x.correctOption),positions);
 assert(result.opening.length>110 && result.mechanismSummary.length>135);
 const prompts=new Set(),observations=new Set();
 for(let i=0;i<6;i++){
  const stage=result.stages[i];
  assert(stage.task.length>55,language+" stage "+i+" task too short");
  assert(stage.newData.length>95,language+" stage "+i+" observation too short");
  assert(stage.mechanism.length>115,language+" stage "+i+" explanation too short");
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.id)).size,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3);
  assert(stage.options.every(o=>o.text.length>35));
  assert(stage.options.every(o=>o.feedback===stage.mechanism));
  assert(stage.options[stage.correctOption].response!==stage.options[(stage.correctOption+1)%3].response);
  assert(stage.options.every(o=>/predefined|заданы|алдын ала/.test(o.response)),
   "No option may claim to cause the next clinical observation");
  assert((stage.task+" "+stage.newData+" "+stage.mechanism+" "+stage.options.map(o=>o.text).join(" ")).toLowerCase().includes(anchors[language][i].toLowerCase()),
   language+" stage "+i+" missing physiology anchor "+anchors[language][i]);
  prompts.add(stage.task);observations.add(stage.newData);
 }
 assert.equal(prompts.size,6);
 assert.equal(observations.size,6);
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleElevenVirtualPatient } from "./course-foundation/module-eleven-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===11 && base) return reviewModuleElevenVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId === 11 ? "v2"'),"New answer meanings require fresh localStorage namespace");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-eleven-virtual-patient.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 11 virtual patient 6 stages × 3 languages, keys, distinct choices, source registration, route, storage and preview lock.");
console.log("OPEN: full TS/build/browser/mobile/audio, independent medical and Kazakh review.");
