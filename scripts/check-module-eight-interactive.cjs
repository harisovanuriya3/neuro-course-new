// Module 8 interactive: transpile check and executable tract-model contract.
// Run from repository root: node scripts/check-module-eight-interactive.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=path=>fs.readFileSync(path,"utf8");
const labPath="components/PathwayLab.tsx";
const lab=read(labPath);
const ast=ts.createSourceFile(labPath,lab,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"PathwayLab TSX syntax");
const jsx=ts.transpileModule(lab,{fileName:labPath,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX},reportDiagnostics:true});
assert.equal((jsx.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"PathwayLab transpile");

const modelPath="lib/pathwayLocalization.ts";
const modelSource=read(modelPath);
const modelAst=ts.createSourceFile(modelPath,modelSource,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(modelAst.parseDiagnostics.length,0,"Pure pathway model syntax");
const modelJS=ts.transpileModule(modelSource,{fileName:modelPath,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},reportDiagnostics:true});
assert.equal((modelJS.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"Pure model transpile");
const sandbox={exports:{}};
vm.runInNewContext(modelJS.outputText,sandbox);
const predict=sandbox.exports.predictSpinalTractDeficit;
assert.equal(typeof predict,"function","Pure pathway model export");
let checked=0;
for(const path of ["dorsal","spinothalamic","corticospinal"]){
 for(const side of ["left","right"]){
  const result=predict(path,side);
  const opposite=side==="left"?"right":"left";
  assert.equal(result.expectedSide,path==="spinothalamic"?opposite:side,path+"/"+side+" laterality");
  assert.equal(result.crossingSite,path==="spinothalamic"?"spinal":"medulla",path+"/"+side+" crossing");
  assert.equal(result.direction,path==="corticospinal"?"descending":"ascending",path+"/"+side+" direction");
  checked++;
 }
}
for(const language of ["RU","EN","KZ"])
 assert(lab.includes(language+":{segment:"),language+": no localized segment/feedback block");
assert(lab.includes("predictSpinalTractDeficit(path,side)"),"UI must use tested pure model");
assert(lab.includes('const motor=model.direction==="descending"'),"Motor direction must be descending");
assert(lab.includes('const crossing=model.crossingSite==="spinal"'),"Crossing must be tract-specific");
assert(lab.includes("resetPrediction()"),"Changing the lesion/path/level must invalidate prediction");
assert(lab.includes('setRevealed(false)'),"Edited prediction must hide stale feedback");
assert(lab.includes("predictedSide===expectedSide"),"Student prediction must be compared with expected side");
assert(lab.includes('recordOutcome(8,"interactive",Number(correct),1)'),"Wrong predictions must not earn full score");
assert(!lab.includes('recordOutcome(8,"criterion:mechanism:prediction"'),"Cannot grade mechanism from side alone");
assert(!lab.includes('recordOutcome(8,"criterion:justification:lab"'),"Cannot grade justification by character count");
assert(lab.includes('role="status"')&&lab.includes("<thead>"),"Feedback and data table need semantic structure");
assert(lab.includes('x.segment')&&lab.includes('value="L2"'),"Level must be labeled as cord segment");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<PathwayLab language={lang} />"),"Module 8 route must mount this lab");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Review branch previews disabled");
console.log("PASS: module 8 interactive TSX parse/transpile, "+checked+" laterality/crossing/direction cases, RU/EN/KZ and preview lock.");
console.log("NOTE: no browser, screen-reader, TypeScript project or Next.js build verification here.");
