// Module 14: scientific/structural contract for a SCRIPTED thalamic virtual patient.
// Node + TypeScript source test; not a browser, diagnostic or medical-language certification.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-fourteen-virtual-patient-review.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 14 TypeScript parse errors");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const exportsObject={};
new Function("exports",compiled.outputText)(exportsObject);
const review=exportsObject.reviewModuleFourteenVirtualPatient;
assert.equal(typeof review,"function");
const positions=[2,0,1,2,0,1];
const markers={
 RU:["внезапн","вибрац","продолговат","VPL","стереогноз","локализац"],
 EN:["sudden","vibration","medulla","VPL","stereognosis","localiz"],
 KZ:["кенет","діріл","сопақша","VPL","стереогноз","ошақ"]
};
for(const language of ["RU","EN","KZ"]){
 const base={moduleId:14,opening:"old",mechanismSummary:"old",stages:Array.from({length:6},(_,i)=>({
  id:"vp-14-stage-"+(i+1),title:"generic",situation:"generic",task:"generic",
  newData:"generic",mentorPrompt:"generic",mechanism:"generic",correctOption:0,
  options:[0,1,2].map(j=>({id:"old-"+j,text:"generic",response:"generic",feedback:"generic"}))
 }))};
 const result=review(base,language);
 assert.notEqual(result,base);
 assert.equal(base.stages[0].task,"generic","Do not mutate original");
 assert.equal(result.stages.length,6);
 assert.deepEqual(result.stages.map(s=>s.correctOption),positions);
 assert(result.opening.length>120 && result.mechanismSummary.length>200);
 const tasks=new Set(), observations=new Set(), titles=new Set();
 for(const [i,stage] of result.stages.entries()){
  assert.equal(stage.id,"vp-14-stage-"+(i+1));
  assert(stage.title.length>7 && stage.task.length>65);
  assert(stage.newData.length>110 && stage.mechanism.length>140);
  assert(stage.mentorPrompt.length>60 && stage.mentorPrompt!==stage.mechanism);
  assert.equal(stage.options.length,3);
  assert.equal(new Set(stage.options.map(o=>o.id)).size,3);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3);
  assert.equal(new Set(stage.options.map(o=>o.feedback)).size,3);
  assert(stage.options.every(o=>o.text.length>40 && o.feedback.length>35));
  assert(stage.options.every(o=>/заранее|predefined|алдын ала/.test(o.response)),
   "Do not imply choices alter patient physiology");
  assert(stage.options[stage.correctOption].feedback===stage.mechanism);
  const joined=(stage.task+" "+stage.newData+" "+stage.mechanism).toLowerCase();
  assert(joined.includes(markers[language][i].toLowerCase()),language+" stage "+i+" missing "+markers[language][i]);
  tasks.add(stage.task);observations.add(stage.newData);titles.add(stage.title);
  if(language==="RU"){
   const all=[stage.title,stage.task,stage.newData,stage.mechanism,...stage.options.map(o=>o.text)].join(" ");
   assert(!/[әғқңөұүһі]/i.test(all),"Kazakh-only letters in Russian");
  }
 }
 assert.equal(tasks.size,6);assert.equal(observations.size,6);assert.equal(titles.size,6);
 if(language==="KZ"){
  assert(result.stages[4].newData.includes("Оң қолда"),"Stereognosis laterality must match right-hand deficit");
  assert(!result.stages[4].newData.includes("Сол қолда"),"Wrong-side wording");
 }
}
const wrapper=read("content/reviewed-virtual-patients.ts");
assert(wrapper.includes('import { reviewModuleFourteenVirtualPatient } from "./course-foundation/module-fourteen-virtual-patient-review";'));
assert(wrapper.includes('if(moduleId===14 && base) return reviewModuleFourteenVirtualPatient(base,language);'));
assert(wrapper.includes('if(moduleId===12 && base) return reviewModuleTwelveVirtualPatient(base,language);'));
const ui=read("components/UnifiedVirtualPatient.tsx");
assert(ui.includes('moduleId === 11 || moduleId === 12 || moduleId === 14 ? "v2"'));
assert(ui.includes('moduleId === 14 ? moduleFourteenDecisionCopy[language]'));
assert(ui.includes('moduleId === 14) && "scope" in d'));
assert(ui.includes('getReviewedVirtualPatientScenario as getVirtualPatientScenario'));
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />"));
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fourteen-virtual-patient.cjs"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 14 virtual patient — 6 stages × RU/EN/KZ, keyed choices, laterality, routing, score scope and preview guard");
console.log("OPEN: complete CI, browser/voice/mobile/E2E and independent medical Kazakh editing.");
