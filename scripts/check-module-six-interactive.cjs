// Module 6 interactive: numerical endpoint, lifecycle and localization guardrails.
// Source review: Ganong 23e PDF 132–134, Guyton & Hall 13e PDF 563–565,
// Ghai 8e PDF 353–354 (peripheral nerve–muscle experiment, not central integration).
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="components/IntegrationExperimentLab.tsx";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"Integration lab TSX syntax errors");
const fn=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==="estimateIntegrationVoltage");
assert(fn&&fn.body,"Missing numerical model");
const compiled=ts.transpileModule("("+fn.getText(ast).replace(/^export\s+/,"")+")",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
});
const estimate=vm.runInNewContext(compiled.outputText);
assert.equal(typeof estimate,"function","Numerical function did not compile");
const close=(a,b)=>assert(Math.abs(a-b)<0.051,"Expected "+b+" mV, received "+a+" mV");
close(estimate("spatial",3,0,8),-52);
close(estimate("spatial",3,1,8),-56.5);
close(estimate("temporal",0,0,8),-70);
close(estimate("temporal",0,5,8),-92.5);
close(estimate("temporal",3,1,8),-62.2);
assert(estimate("temporal",3,0,1)>=-55,"Short temporal interval should reach teaching threshold");
assert(estimate("temporal",3,0,50)<-55,"Long temporal interval should remain subthreshold");

for(const key of ["RU:","KZ:","EN:","resume:","curve:","threshold:"])
 assert(source.includes(key),"Missing locale/label: "+key);
for(const key of ["18 мс","18-ms","6 мВ","6-mV","−70 мВ","−70 mV","−55 мВ","−55 mV"])
 assert(source.includes(key),"Missing parameter/limit label: "+key);
assert(source.includes('начальный сегмент аксона'),"RU initial segment wording missing");
assert(source.includes('аксонның бастапқы сегменті'),"KZ initial segment wording missing");
assert(source.includes('axon initial segment'),"EN initial segment wording missing");
assert(source.includes('disabled={running}'),"Controls must freeze during playback");
assert(source.includes('if(trial && progress>0 && progress<1)'),"Paused trial must resume");
assert(source.includes('setPrediction(null);'),"Changing conditions must invalidate prediction");
assert(source.includes('progress<1 || lastRecordedId.current===trial.id'),"Do not record unfinished or repeated trials");
assert(source.includes('recordOutcome(6,"interactive",1,1)'),"Completion must save progress");
assert(source.includes('setRows(history=>[trial,...history]'),"History must use frozen trial");
assert(source.includes('const displayedVm=trial?.vm ?? vm;'),"Display must use frozen model output");
assert(source.includes('aria-live="polite"'),"Completion must be announced accessibly");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('moduleNumber === 6 && section === "interactive"'),"Module 6 interactive route missing");
assert(route.includes('<IntegrationExperimentLab language={lang} />'),"Module 6 lab not rendered");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Review preview must remain disabled");
console.log("PASS: module 6 integration lab numerical examples, frozen trial lifecycle, three locales, route and preview policy.");
console.log("NOTE: this does not substitute for browser interaction or physiological model validation.");
