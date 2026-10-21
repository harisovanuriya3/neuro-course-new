// Module 5 explanatory questions: structural and localization regression.
// This does not certify scientific correctness, native-language translation or UI.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-five-questions.ts";
const source=fs.readFileSync(file,"utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 5 questions TypeScript syntax");
assert(registry.includes('import { createModuleFiveQuestions } from "./course-foundation/module-five-questions"'),"Module 5 questions import missing");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleFiveQuestions("'+lang+'")'),"Module 5 "+lang+" registration missing");

const statement=ast.statements.find(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(ast)==="data"));
assert(statement,"Authored questions data declaration missing");
const declaration=statement.declarationList.declarations.find(d=>d.name.getText(ast)==="data");
const array=ts.isAsExpression(declaration.initializer)?declaration.initializer.expression:declaration.initializer;
assert(ts.isArrayLiteralExpression(array),"Questions must be an array");
const expected=["calcium","shunting","nerve-muscle","electrical-rectification","metabotropic"];
assert.equal(array.elements.length,expected.length,"Expected five independently authored question topics");
const ids=[];
for(const item of array.elements){
 assert(ts.isObjectLiteralExpression(item),"Question entry must be object");
 const get=(name)=>item.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast)===name);
 const id=get("id"),target=get("target"),prompt=get("prompt"),explanation=get("explanation");
 assert(id&&ts.isStringLiteral(id.initializer),"Missing question ID");
 ids.push(id.initializer.text);
 assert(target&&ts.isAsExpression(target.initializer)&&ts.isStringLiteral(target.initializer.expression),"Missing navigation target");
 assert(["theory","interactive","cases"].includes(target.initializer.expression.text),"Unexpected target");
 for(const [name,property] of [["prompt",prompt],["explanation",explanation]]){
  assert(property&&ts.isCallExpression(property.initializer)&&property.initializer.expression.getText(ast)==="t",id.initializer.text+" "+name+" must use localized t()");
  assert.equal(property.initializer.arguments.length,3,id.initializer.text+" "+name+" must include RU/EN/KZ");
  for(const text of property.initializer.arguments){
   assert(ts.isStringLiteral(text)&&text.text.trim().length>=50,id.initializer.text+" "+name+" has empty or too short locale");
  }
 }
}
assert.deepEqual(ids,expected,"Missing/duplicate/reordered module 5 question topic");
for(const phrase of ["Ca²⁺","Cl⁻","E(Cl)","acetylcholine","shunt","axonal","gap junctions","metabotropic"]){
 assert(source.includes(phrase),"Missing mechanism "+phrase);
}
// Guard the actual experimental preparation and distinct physiological alternatives.
for(const phrase of [
 "В изолированном нервно-мышечном препарате",
 "In an isolated nerve–muscle preparation",
 "Жүйке-бұлшықет препаратында",
 "снижение чувствительности постсинаптических рецепторов",
 "reduced postsynaptic receptor sensitivity",
 "постсинапстық рецепторлар сезімталдығының төмендеуін"
])assert(source.includes(phrase),"Missing corrected experimental distinction: "+phrase);
assert(!source.includes("junctional dysfunction."),"Overlapping pre-/postsynaptic alternative returned");
assert(source.includes('target:{section:item.target}'),"Explanatory navigation target missing");
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Preview branch must remain disabled");
console.log("PASS: module 5 questions: 5 authored mechanisms, 10 localized triples, valid routes and registry.");
console.log("NOTE: source-level AST checks do not replace TypeScript build, browser tests or independent translation review.");
