// Module 6 formative-pretest source regression (part of audit:science).
// This verifies authored language structure; not a scientific or browser test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const path="content/course-foundation/module-six-pretest.ts";
const src=fs.readFileSync(path,"utf8");
const ast=ts.createSourceFile(path,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Invalid TypeScript syntax");
const copy=ast.statements.find(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>d.name.getText(ast)==="localized"));
assert(copy,"Missing localized question bank");
const init=copy.declarationList.declarations.find(d=>d.name.getText(ast)==="localized").initializer;
assert(ts.isObjectLiteralExpression(init),"Question bank must be a literal");
for(const language of ["RU","EN","KZ"]){
 const entry=init.properties.find(p=>p.name?.getText(ast)===language);
 assert(entry&&ts.isPropertyAssignment(entry),"Missing "+language);
 const questions=entry.initializer.properties.find(p=>p.name?.getText(ast)==="questions");
 assert(questions&&ts.isPropertyAssignment(questions)&&ts.isArrayLiteralExpression(questions.initializer),"Missing questions in "+language);
 assert.equal(questions.initializer.elements.length,2,language+" must have two questions");
 for(const [i,item] of questions.initializer.elements.entries()){
  const fields=item.properties;
  const get=name=>fields.find(p=>p.name?.getText(ast)===name);
  for(const field of ["prompt","explanation","correctAnswer","options"])assert(get(field),language+" question "+i+" missing "+field);
  const options=get("options").initializer;
  assert(ts.isArrayLiteralExpression(options)&&options.elements.length===4,language+" question "+i+" needs four choices");
  const correct=get("correctAnswer").initializer.text;
  assert.equal(correct,i===0?"c":"b",language+" wrong answer key at question "+i);
  for(const x of [get("prompt").initializer,get("explanation").initializer,...options.elements]){
   assert(ts.isStringLiteral(x)&&x.text.trim().length>20,language+" missing localized text");
  }
 }
}
assert(src.includes('target: { section: "theory" as const }'),"Theory return link absent");
console.log("PASS: module 6 pretest authored in RU/EN/KZ (2 questions, 4 choices each).");
const registry=fs.readFileSync("content/index.ts","utf8");
if(!registry.includes('createModuleSixPretest("RU"'))console.warn("NOT WIRED: content/index.ts still uses the generic module 6 pretest.");
