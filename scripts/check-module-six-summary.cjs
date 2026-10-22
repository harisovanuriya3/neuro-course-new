const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-six-summary.ts";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 recap syntax");
const decl=ast.statements.filter(ts.isVariableStatement).flatMap(s=>[...s.declarationList.declarations]).find(d=>d.name.getText(ast)==="takeaways");
assert(decl&&ts.isObjectLiteralExpression(decl.initializer),"Missing language map");
for(const lang of ["RU","EN","KZ"]){
 const p=decl.initializer.properties.find(x=>x.name?.getText(ast)===lang);
 assert(p&&ts.isArrayLiteralExpression(p.initializer),"Missing "+lang);
 assert.equal(p.initializer.elements.length,5,lang+" requires 5 takeaways");
 for(const item of p.initializer.elements){
  assert(ts.isObjectLiteralExpression(item),lang+" item");
  for(const key of ["title","explanation"]){
   const field=item.properties.find(x=>x.name?.getText(ast)===key);
   assert(field&&ts.isStringLiteral(field.initializer),lang+" missing "+key);
   assert(field.initializer.text.trim().length>(key==="title"?7:100),lang+" short "+key);
  }
 }
}
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleSixSummary("'+lang+'")'),"Missing "+lang+" registration");
assert.equal(JSON.parse(fs.readFileSync("vercel.json","utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 6 recap RU/EN/KZ and route");

// Run the authored learning-outcomes contract within audit:science.
require('./check-module-six-objectives.cjs');
