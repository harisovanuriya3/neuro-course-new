// Module 6 practice route and locale regression (not a browser test).
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-six-practice.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Practice TypeScript syntax");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>d.name.getText(ast)==="copy");
assert(declaration&&ts.isObjectLiteralExpression(declaration.initializer),"Practice locales absent");
const map=declaration.initializer;
assert.deepEqual(map.properties.map(p=>p.name.getText(ast)).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const locale=map.properties.find(p=>p.name.getText(ast)===lang).initializer;
 assert(ts.isObjectLiteralExpression(locale),lang+" invalid");
 for(const [field,count] of [["titles",5],["prompts",4],["answers",4],["criteria",5]]){
  const item=locale.properties.find(p=>p.name.getText(ast)===field);
  assert(item&&ts.isArrayLiteralExpression(item.initializer),lang+" missing "+field);
  assert.equal(item.initializer.elements.length,count,lang+" "+field+" count");
  if(field==="answers")for(const a of item.initializer.elements)
   assert(ts.isArrayLiteralExpression(a)&&a.elements.length===2,lang+" answer feedback");
 }
}
for(const phrase of ["Без пробного тока","Without the test current","Сынақ тогы берілмегенде",
 "0,1 нА × 100 МОм = 10 мВ","0.1 nA × 100 MΩ = 10 mV","GABA_B","Ca²⁺","K⁺"])
 assert(source.includes(phrase),"Missing model qualification: "+phrase);
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleSixPractice } from "./course-foundation/module-six-practice"'));
assert(registry.includes("function moduleSixBasePractice(language: Language)"));
const six=registry.slice(registry.indexOf("\n  6: {"),registry.indexOf("\n  1: {",registry.indexOf("\n  6: {")));
for(const lang of ["RU","EN","KZ"])
 assert(six.includes('createModuleSixPractice("'+lang+'", moduleSixBasePractice("'+lang+'"))'),"Missing "+lang+" route");
const v=JSON.parse(read("vercel.json"));
assert.equal(v.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 6 authored practice wired RU/EN/KZ with 4 exercises and 5 criteria.");
