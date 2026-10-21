// Module 5 synthetic virtual-patient regression. Run: node scripts/check-module-five-virtual-patient.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const path="content/course-foundation/module-five-virtual-patient-review.ts";
const source=fs.readFileSync(path,"utf8");
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"TypeScript parse error");
const compiled=ts.transpileModule(source,{fileName:path,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
const m={exports:{}};
new Function("module","exports",compiled.outputText)(m,m.exports);
const makeBase=()=>({moduleId:5,title:"Synapses",patient:"Synthetic",profile:"Model",opening:"Base",
 syntheticNote:"Synthetic",mechanismSummary:"Summary",
 stages:Array.from({length:6},(_,i)=>({id:"vp-5-stage-"+(i+1),title:"Stage",situation:"old",newData:"old",
 task:"old",mentorPrompt:"old",mechanism:"old",correctOption:1,
 options:[2,1,3].map(n=>({id:"vp-5-stage-"+(i+1)+"-decision-"+n,text:"old",response:"old",feedback:"old"}))}))});
for(const lang of ["RU","EN","KZ"]){
 const result=m.exports.reviewModuleFiveVirtualPatient(makeBase(),lang);
 assert.equal(result.stages.length,6);
 assert(result.patient.toLowerCase().includes(lang==="EN"?"model":lang==="RU"?"модель":"модель"));
 for(const [i,stage] of result.stages.entries()){
  assert(stage.mentorPrompt.length>12,lang+" missing pre-decision guidance "+i);
  assert.notEqual(stage.mentorPrompt,stage.mechanism,lang+" leaked full answer "+i);
  assert.notEqual(stage.mentorPrompt,stage.options[stage.correctOption].feedback,lang+" leaked feedback "+i);
  assert(stage.options[stage.correctOption].id.endsWith("-decision-1"),lang+" wrong key "+i);
  assert.equal(new Set(stage.options.map(o=>o.text)).size,3,lang+" duplicate options "+i);
  assert(stage.options.every(o=>o.feedback.length>40),lang+" missing explanation "+i);
 }
}

for(const lang of ["RU","EN","KZ"]){
 const final=m.exports.reviewModuleFiveVirtualPatient(makeBase(),lang).stages[5];
 const expected={RU:"высокий запас надёжности",EN:"high safety factor",KZ:"жоғары сенімділік қоры"};
 assert(final.mechanism.includes(expected[lang]),lang+" missing physiology qualification");
}
const layer=fs.readFileSync("content/reviewed-virtual-patients.ts","utf8");
const view=fs.readFileSync("components/UnifiedVirtualPatient.tsx","utf8");
assert(layer.includes("reviewModuleFiveVirtualPatient(base,language)"),"Reviewed model not registered");
assert(view.includes("moduleId !== 5"),"Model must not display a real-patient portrait");
assert(view.includes("moduleId === 5 ? synapseModelDecisionCopy[language]"),"Model feedback missing");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS module 5 virtual model: six stages, RU/EN/KZ, correct keys, no answer leakage, no portrait.");
console.log("NOTE: not a browser, accessibility or full TypeScript-build test.");
