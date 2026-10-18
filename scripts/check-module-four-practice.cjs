// Module 4 practice: localized source/physics consistency contract.
// Run from repository root: node scripts/check-module-four-practice.cjs
// Not a substitute for a browser experiment or a clinician's review.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const path="content/course-foundation/module-four-practice.ts";
const src=fs.readFileSync(path,"utf8");
const lab=fs.readFileSync("components/MembraneElectrophysiologyLab.tsx","utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
const ast=ts.createSourceFile(path,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Practice source must parse");
const decl=ast.statements.filter(ts.isVariableStatement)
 .flatMap(x=>[...x.declarationList.declarations])
 .find(x=>x.name.getText(ast)==="copy");
assert(decl&&ts.isObjectLiteralExpression(decl.initializer),"Missing localized practice");
function prop(node,key){
 assert(ts.isObjectLiteralExpression(node),"Expected object: "+key);
 const p=node.properties.find(x=>ts.isPropertyAssignment(x)&&x.name.getText(ast).replace(/['"]/g,"")===key);
 assert(p,"Missing "+key);return p.initializer;
}
function str(node){
 assert(ts.isStringLiteral(node),"Expected literal");
 assert(node.text.trim(),"Empty text");
 return node.text;
}
const keys=["gradientTitle","gradientPrompt","gradientAnswer","refractoryTitle",
 "refractoryPrompt","refractoryAnswer","interpretationTitle","interpretationPrompt",
 "interpretationAnswer","response","criteriaTitle","criteria"];
const phrases={
 RU:["[K⁺] снаружи 4 и 8","5 и 3 мс","не является независимой"],
 EN:["[K⁺] of 4 and 8","5 and 3 ms","not an independent"],
 KZ:["4 және 8 мМ","5 және 3 мс","тәуелсіз"]
};
for(const lang of ["RU","EN","KZ"]){
 const c=prop(decl.initializer,lang);
 for(const key of keys){
  const node=prop(c,key);
  if(key.endsWith("Answer")||key==="criteria"){
   assert(ts.isArrayLiteralExpression(node),"Expected answer/checklist: "+key);
   assert.equal(node.elements.length,key==="criteria"?4:2,lang+" "+key+" count");
   for(const item of node.elements)assert(str(item).length>35,lang+" "+key+" too short");
  }else assert(str(node).length>5,lang+" "+key+" too short");
 }
 for(const [key,phrase] of [["gradientPrompt",phrases[lang][0]],
   ["refractoryPrompt",phrases[lang][1]],
   ["interpretationPrompt",phrases[lang][2]]])
  assert(str(prop(c,key)).includes(phrase),lang+" missing pedagogical condition "+phrase);
 assert(registry.includes('createModuleFourPractice("'+lang+'"'),
  lang+" practice is not registered");
}
assert(src.includes("return { ...base, sections:"),"Practice must override generic tasks");
assert(lab.includes("const R=8.314,F=96485"),"Simulator physical constants changed");
assert(lab.includes("Math.log((pk*ko+pna*nao)/(pk*ki+pna*nai))"),
 "Simulator no longer uses the declared two-ion GHK equation");
assert(lab.includes('interval<2?"absolute":interval<5?"relative":"ready"'),
 "Refractory rule changed; recheck the practice answers");
assert(lab.includes('refractory==="relative"?.55:1'),
 "Relative refractory stimulus multiplier changed");
assert(lab.includes("spike=effective>=10"),
 "Model threshold changed; recheck practice answers");
const coeff=1000*8.314*(37+273.15)/96485;
const ek=ko=>coeff*Math.log(ko/140);
const vm=ko=>coeff*Math.log((ko+.04*145)/(140+.04*12));
for(const [ko,ekExpected,vmExpected] of [[4,-95.0,-71.2],[8,-76.5,-62.0]]){
 assert(Math.abs(ek(ko)-ekExpected)<.15,"E(K) calculation mismatch at "+ko);
 assert(Math.abs(vm(ko)-vmExpected)<.15,"Vm calculation mismatch at "+ko);
}
assert(12>=10&&12*.55<10,"Refractory practice prediction no longer holds");
console.log("PASS: Module 4 practice RU/EN/KZ, three tasks, four self-check criteria, simulator rules and Nernst/GHK numerical values.");
