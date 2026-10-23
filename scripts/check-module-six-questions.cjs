// Module 6 independent physiology questions: AST structure, locale parity, routing.
// Source-level checks are not a substitute for scientific or browser validation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-six-questions.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 questions TypeScript parse errors");
const decl=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>d.name.getText(ast)==="questions");
assert(decl&&ts.isObjectLiteralExpression(decl.initializer),"Missing localized question map");
const langs=["RU","EN","KZ"];
const map=decl.initializer;
assert.deepEqual(map.properties.map(p=>p.name.getText(ast)).sort(),[...langs].sort(),"Unexpected locale keys");
const targets=["theory","theory","practice","cases","clinical"];
for(const lang of langs){
 const locale=map.properties.find(p=>p.name.getText(ast)===lang);
 assert(locale&&ts.isPropertyAssignment(locale)&&ts.isArrayLiteralExpression(locale.initializer),lang+" question array missing");
 assert.equal(locale.initializer.elements.length,5,lang+" expected five questions");
 const prompts=new Set();
 locale.initializer.elements.forEach((item,i)=>{
  assert(ts.isObjectLiteralExpression(item),lang+" question "+i+" must be an object");
  const fields=new Map(item.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(ast),p.initializer]));
  assert.deepEqual([...fields.keys()].sort(),["explanation","prompt","section"],lang+" question "+i+" fields");
  for(const field of ["prompt","explanation"]){
   const v=fields.get(field);
   assert(ts.isStringLiteral(v)&&v.text.trim().length>95,lang+" question "+i+" missing/short "+field);
  }
  assert(ts.isStringLiteral(fields.get("section")),lang+" question "+i+" missing navigation");
  assert.equal(fields.get("section").text,targets[i],lang+" question "+i+" wrong navigation");
  const prompt=fields.get("prompt").text.trim().toLowerCase();
  assert(!prompts.has(prompt),lang+" duplicate question "+i);
  prompts.add(prompt);
 });
}
for(const [lang,marker] of [["RU","В одном нейроне возникают два ВПСП"],
 ["EN","Two EPSPs arise in a neuron"],
 ["KZ","Нейронда екі қоздырушы постсинапстық потенциал"]]){
 assert(source.includes(marker),lang+" EPSP generation guardrail missing");
}
for(const phrase of ["В упрощённой схеме спинального рефлекса",
 "In a simplified spinal stretch-reflex circuit",
 "Жұлынның созылу рефлексінің қарапайым үлгісінде"]){
 assert(source.includes(phrase),"Reciprocal inhibition must be a specified teaching circuit: "+phrase);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleSixQuestions } from "./course-foundation/module-six-questions"'),"Module 6 questions import missing");
const start=registry.indexOf("\n  6: {");
const stop=registry.indexOf("\n  1: {",start);
assert(start>=0&&stop>start,"Module 6 registry not found");
const moduleSix=registry.slice(start,stop);
for(const lang of langs)
 assert(moduleSix.includes('createModuleSixQuestions("'+lang+'")'),lang+" module 6 questions not registered");
assert(source.includes('kind: "questions"'),"Wrong question lesson kind");
assert(source.includes('target: {section}'),"Question explanations must link to lesson sections");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("getLesson(moduleNumber, section, lang)"),"Questions route must use localized lesson");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Review branch previews must remain disabled");
console.log("PASS: module 6 questions: 5 physiological prompts and explanations × RU/EN/KZ; registered, routed, previews disabled.");
