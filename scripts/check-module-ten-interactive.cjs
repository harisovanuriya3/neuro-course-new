// Module 10 / interactive: TS source, deterministic model and route contracts.
// Run from repository root: node scripts/check-module-ten-interactive.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const modelPath="lib/brainstemArousalModel.ts";
const uiPath="components/BrainstemLab.tsx";
const model=read(modelPath),lab=read(uiPath);
for(const [path,source,kind] of [[modelPath,model,ts.ScriptKind.TS],[uiPath,lab,ts.ScriptKind.TSX]]){
 const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,kind);
 assert.equal(ast.parseDiagnostics.length,0,path+": TS/TSX syntax errors");
 const compiled=ts.transpileModule(source,{fileName:path,compilerOptions:{
   target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX
 },reportDiagnostics:true});
 assert.equal((compiled.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,
   0,path+": transpilation errors");
}
const compiled=ts.transpileModule(model,{fileName:modelPath,compilerOptions:{
 target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS
}});
const sandbox={exports:{}};
vm.runInNewContext(compiled.outputText,sandbox);
const {modelAscendingDrive,compareAscendingDrive}=sandbox.exports;
assert.equal(typeof modelAscendingDrive,"function");
assert.equal(typeof compareAscendingDrive,"function");
assert.equal(modelAscendingDrive(50,"usual"),40);
assert.equal(modelAscendingDrive(100,"usual"),70);
assert.equal(modelAscendingDrive(100,"attenuated"),31);
assert.equal(modelAscendingDrive(-100,"usual"),10);
assert.equal(modelAscendingDrive(150,"usual"),70);
assert.equal(modelAscendingDrive(NaN,"usual"),10);
let checks=0;
for(const relay of ["usual","attenuated"]){
 const base=modelAscendingDrive(50,relay);
 for(const input of [0,20,50,80,100]){
  const result=compareAscendingDrive(input,relay);
  assert.equal(result.baseline,base);
  assert.equal(result.observed,modelAscendingDrive(input,relay));
  assert.equal(result.trend,input<50?"lower":input>50?"higher":"same");
  checks++;
 }
}
for(const lang of ["RU","EN","KZ"]){
 assert(new RegExp("\\b"+lang+":\\s*\\{").test(lab),lang+": missing authored lab text");
}
assert(lab.includes("compareAscendingDrive(input,relay)"),"Live model not connected");
assert(lab.includes("disabled={!prediction}"),"Trial must require prediction");
assert(lab.includes("prediction===comparison.trend"),"Prediction not compared to model");
assert(lab.includes('recordOutcome(10,"interactive",Number(correct),1)'),
 "Incorrect prediction must not receive full score");
assert(!lab.includes('"criterion:mechanism:prediction"'),
 "Directional prediction cannot certify physiological mechanism");
assert(!lab.includes('"criterion:justification:lab"'),
 "Text length cannot certify a scientifically correct justification");
assert(lab.includes("setResult(null)")&&lab.includes("invalidate()"),
 "Changing model inputs must hide stale results");
assert(lab.includes("<thead>")&&lab.includes('role="status"')&&
 lab.includes('aria-label={c.caption}'),"Accessible result, chart and table required");
assert(lab.includes("previous.length+1"),"Trial keys must be stable and unique");
assert(!lab.includes("Date.now()"),"Timestamp keys can collide");
assert(lab.includes("not automatically graded"),"Explanations must not be claimed graded");
const frame=read("components/GuidedLabFrame.tsx");
assert(frame.includes("Why is this index not a measure of consciousness?"),
 "Guided prediction must not equate modeled drive with consciousness");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<GuidedLabFrame moduleId={10} language={lang}><BrainstemLab language={lang} /></GuidedLabFrame>'),
 "Module 10 interactive route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 10 interactive TS/TSX syntax, "+checks+
 " model comparisons, RU/EN/KZ, scoring, accessibility contracts, route and preview lock.");
console.log("NOTE: model index is illustrative, not a physiological measurement; full tsc/build/browser tests separate.");
