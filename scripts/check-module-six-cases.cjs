// Module 6 authored cases and RU/EN/KZ route regression.
// Source-level test; does not replace physiology or browser validation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-six-cases.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 cases TypeScript syntax");
const decl=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>d.name.getText(ast)==="copy");
assert(decl&&ts.isObjectLiteralExpression(decl.initializer),"Missing locale copy");
const props=node=>{
 assert(ts.isObjectLiteralExpression(node),"Expected locale object");
 return new Map(node.properties.map(p=>[p.name.getText(ast),p.initializer]));
};
const map=props(decl.initializer);
assert.deepEqual([...map.keys()].sort(),["EN","KZ","RU"]);
const arr=(node,count,label)=>{
 assert(ts.isArrayLiteralExpression(node),label+" must be an array");
 assert.equal(node.elements.length,count,label+" length");
 return node.elements;
};
const str=(node,label)=>{
 assert(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node),label+" must be a string");
 assert(node.text.trim(),label+" empty");
};
for(const lang of ["RU","EN","KZ"]){
 const data=props(map.get(lang));
 str(data.get("introduction"),lang+" intro");
 for(const field of ["titles","situations","stageTitles"])
  arr(data.get(field),3,lang+" "+field).forEach((v,i)=>str(v,lang+" "+field+" "+i));
 for(const field of ["questions","explanations"])
  arr(data.get(field),3,lang+" "+field).forEach((group,i)=>
   arr(group,field==="questions"?3:2,lang+" "+field+" case "+i)
    .forEach((v,j)=>str(v,lang+" "+field+" "+i+"/"+j)));
}
// Case 2 must preserve the matched-background condition in all translations.
for(const phrase of ["Фоновая активность меняется между пробами",
 "background activity varies between trials",
 "Фондық белсенділік сынақтан сынаққа өзгеріп отырады"])
 assert(source.toLowerCase().includes(phrase.toLowerCase()),"Case 2 missing control: "+phrase);
for(const phrase of ["written responses are not automatically graded",
 "жазбаша жауаптың дұрыстығы автоматты түрде бағаланбайды"])
 assert(source.includes(phrase),"Misleading written-response grading text: "+phrase);
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleSixCases } from "./course-foundation/module-six-cases"'));
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleSixCases("'+lang+'", moduleSixBaseCases("'+lang+'"))'),
  "Missing module 6 cases registration for "+lang);
assert.equal(JSON.parse(read("vercel.json")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 6 cases 3×3 stages × RU/EN/KZ, feedback and matched-background controls.");
