// Module 12: scientific and structural contract for the scripted virtual patient.
// This is a Node/TypeScript source test, NOT a browser or clinical validation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-twelve-virtual-patient-review.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 12 virtual patient TS parse errors");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "Module 12 virtual patient TS transpilation errors");
const adaptedExports={};
new Function("exports",compiled.outputText)(adaptedExports);
const review=adaptedExports.reviewModuleTwelveVirtualPatient;
assert.equal(typeof review,"function");
const positions=[2,0,1,2,0,1];
const anchors={
 RU:["брадикинезия","амплитуд","GPi/SNr","дофамин","зрительн","диагноз"],
 EN:["bradykinesia","amplitude","GPi/SNr","dopamine","visual","diagnosis"],
 KZ:["брадикинезия","амплитуда","GPi/SNr","дофамин","көрнекі","диагноз"]
};
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:12,opening:"generic",mechanismSummary:"generic",stages:Array.from({length:6},(_,i)=>({
  id:"vp-12-stage-"+(i+1),situation:"generic",task:"generic",newData:"generic",
  mentorPrompt:"generic",mechanism:"generic",correctOption:0,
  options:[0,1,2].map(n=>({id:"old-"+n,text:"generic",response:"generic",feedback:"generic"}))
 }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(base.stages[0].task,"generic","Base scenario mutated");
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(x=>x.correctOption),positions);
 assert(result.opening.length>140 && result.mechanismSummary.length>140);
 const prompts=new Set(),observations=new Set();
 for(let i=0;i<6;i++){
  const stage=result.stages[i];
  assert(stage.task.length>60,language+" stage "+i+" task");
  assert(stage.newData.length>100,language+" stage "+i+" observation");
  assert(stage.mechanism.length>115,language+" stage "+i+" mechanism");
  assert(stage.mentorPrompt.length>70,language+" stage "+i+" mentor");
  assert.notEqual(stage.mentorPrompt,stage.mechanism,"No answer reveal before reasoning");
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.id)).size,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3);
  assert(stage.options.every(o=>o.text.length>35));
  assert(stage.options.every(o=>o.feedback===stage.mechanism));
  assert(stage.options.every(o=>/predefined|заранее|алдын ала/.test(o.response)),
   "Do not imply a button changed patient physiology");
  assert((stage.task+" "+stage.newData+" "+stage.mechanism+" "+stage.options.map(o=>o.text).join(" ")).toLowerCase().includes(anchors[language][i].toLowerCase()),
   language+" stage "+i+" missing anchor "+anchors[language][i]);
  prompts.add(stage.task);observations.add(stage.newData);
 }
 assert.equal(prompts.size,6);
 assert.equal(observations.size,6);
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleTwelveVirtualPatient } from "./course-foundation/module-twelve-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===12 && base) return reviewModuleTwelveVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId === 11 || moduleId === 12 ? "v2"'));
assert(ui.includes("moduleTwelveDecisionCopy[language]"));
assert(ui.includes("moduleId === 6 || moduleId === 12) && \"scope\" in d"));
assert(ui.includes("Written reasoning is not automatically checked"));
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-twelve-virtual-patient.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 12 virtual patient: six stages × three languages, choice keys, source route, score scope, saved-answer isolation, preview guard.");
console.log("OPEN: full typecheck/build/browser/mobile/audio, independent clinical and Kazakh review.");
