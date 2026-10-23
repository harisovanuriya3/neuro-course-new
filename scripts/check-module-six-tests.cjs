// Module 6 formative test: inspect the real authored questions in a sandbox.
// Scientific correctness still requires independent review; no browser test here.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-six-tests.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 tests: TypeScript syntax error");
const js=ts.transpileModule(source,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},reportDiagnostics:true});
assert.equal(js.diagnostics?.filter(d=>d.category===ts.DiagnosticCategory.Error).length||0,0,"Module 6 tests: transpilation error");
const sandboxExports={};
vm.runInNewContext(js.outputText,{exports:sandboxExports,require:()=>{throw new Error("Unexpected runtime import");}}, {timeout:3000});
assert.equal(typeof sandboxExports.createModuleSixTests,"function","Module 6 test factory not exported");
const ids=["concept:main","mechanism:main","application:main","transfer:main","justification:main"];
const shuffled=[{id:"c",text:"old c"},{id:"a",text:"old a"},{id:"d",text:"old d"},{id:"b",text:"old b"}];
const base={
 kind:"tests",moduleTitle:"old",start:"concept:main",mainIds:ids,
 nodes:Object.fromEntries([...ids.map(id=>[id,{id,type:"question",level:"main",competency:id.split(":")[0],
  prompt:"generic",options:shuffled.map(o=>({...o})),correctAnswer:"a",explanation:"generic",
  onCorrect:"end",onIncorrect:"end"}]),...ids.map(id=>[id.replace(":main",":corrective"),{
   id:id.replace(":main",":corrective"),type:"question",level:"corrective",competency:id.split(":")[0],
   prompt:"generic corrective",options:shuffled.map(o=>({...o})),correctAnswer:"a",explanation:"generic",
   onCorrect:"end",onIncorrect:"end"}]),["concept:basic",{id:"concept:basic",type:"question",level:"basic",prompt:"keep basic",options:shuffled,correctAnswer:"a"}]])
};
for(const language of ["RU","EN","KZ"]){
 const result=sandboxExports.createModuleSixTests(language,"Module 6",base);
 assert.equal(result.kind,"tests");
 assert.equal(result.moduleTitle,"Module 6");
 assert.equal(result.nodes["concept:basic"].prompt,"keep basic","Unreviewed basic nodes must remain unchanged");
 for(const id of ids){
  const main=result.nodes[id],corrective=result.nodes[id.replace(":main",":corrective")];
  assert.notEqual(main.prompt,corrective.prompt,language+" "+id+" must not repeat main question");
  assert.equal(corrective.level,"corrective",language+" "+id+" must preserve level");
  assert.equal(corrective.correctAnswer,"a",language+" "+id+" corrective key");
  assert.equal(corrective.options.length,4,language+" "+id+" corrective option count");
  assert.deepEqual(Array.from(corrective.options,o=>o.id),["c","a","d","b"],"Corrective option order changed");
  assert.equal(new Set(Array.from(corrective.options,o=>o.text)).size,4,language+" "+id+" corrective distractors");
  assert(corrective.prompt.length>75,language+" "+id+" corrective stem too short");
  assert(corrective.explanation.length>75,language+" "+id+" corrective explanation too short");
  for(const option of corrective.options)assert(option.text.length>30,language+" "+id+" corrective option too short");
  const q=result.nodes[id];
  assert(q.prompt.length>75,language+" "+id+" prompt too short");
  assert(q.explanation.length>75,language+" "+id+" explanation too short");
  assert.equal(q.correctAnswer,"a",language+" "+id+" answer key changed");
  assert.deepEqual(Array.from(q.options,o=>o.id),["c","a","d","b"],"Original stable option order changed");
  assert.equal(new Set(Array.from(q.options,o=>o.text)).size,4,language+" "+id+" repeated distractor");
  for(const option of q.options)assert(option.text.length>30,language+" "+id+" short answer");
 }
}
assert.equal(base.nodes["concept:main"].prompt,"generic","Base lesson was mutated");
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleSixTests } from "./course-foundation/module-six-tests"'),"Missing import");
for(const language of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleSixTests("'+language+'", modules.'+language+'[5], moduleSixBaseTest("'+language+'"))'),"Missing "+language+" registration");
}
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("getLesson(moduleNumber, section, lang)"),"Lesson route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Preview deployment must stay disabled");
console.log("PASS: module 6 tests, 5 main + 5 distinct corrective questions × 3 languages; keys, distractors, registry and preview policy.");
console.log("LIMITATION: 5 generic basic questions and browser behavior still require review.");
