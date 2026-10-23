// Module 6 glossary: structural, physiological and route regression.
// Source validation does not replace independent translation or browser testing.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-six-glossary.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 glossary TS syntax");
const variables=ast.statements.filter(ts.isVariableStatement).flatMap(s=>[...s.declarationList.declarations]);
const base=variables.find(d=>d.name.getText(ast)==="correctedBase");
assert(base&&ts.isObjectLiteralExpression(base.initializer),"Corrected base definitions missing");
const langs=["RU","EN","KZ"];
assert.deepEqual(base.initializer.properties.map(p=>p.name.getText(ast)).sort(),[...langs].sort());
for(const prop of base.initializer.properties){
 assert(ts.isPropertyAssignment(prop)&&ts.isArrayLiteralExpression(prop.initializer),"Base locale array missing");
 assert.equal(prop.initializer.elements.length,2,"Each locale needs summation and shunting definitions");
 for(const e of prop.initializer.elements)assert(ts.isStringLiteral(e)&&e.text.length>95,"Short base definition");
}
const extra=variables.find(d=>d.name.getText(ast)==="extra");
assert(extra&&ts.isArrayLiteralExpression(extra.initializer),"Additional terminology missing");
assert.equal(extra.initializer.elements.length,6,"Expected six additional terms");
const ids=[];
for(const item of extra.initializer.elements){
 assert(ts.isObjectLiteralExpression(item),"Glossary entry must be an object");
 const props=new Map(item.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(ast),p.initializer]));
 const id=props.get("id");
 assert(id&&ts.isStringLiteral(id),"Entry ID missing");
 ids.push(id.text);
 for(const key of ["term","definition"]){
  const value=props.get(key);
  assert(value&&ts.isCallExpression(value)&&value.expression.getText(ast)==="t","Missing trilingual "+key);
  assert.equal(value.arguments.length,3,"RU/EN/KZ required for "+id.text+" "+key);
  for(const a of value.arguments)assert(ts.isStringLiteral(a)&&a.text.trim().length>(key==="definition"?75:8),"Short translation "+id.text+" "+key);
 }
}
assert.deepEqual(ids,["epsp","ipsp","temporal","spatial","reversal","presynaptic"]);
assert(source.includes("base.terms.slice(0,2)"),"Original mismatched definitions must be replaced");
assert(source.includes("correctedBase[language][index]"),"Missing base correction");
assert(source.includes("...extra.map("),"Six new terms must be rendered");
assert(source.includes('section: "theory"'),"Glossary theory links missing");
for(const phrase of ["входное сопротивление","input resistance","кіріс кедергісін",
 "не всегда требует гиперполяризации","need not require hyperpolarization","гиперполяризация әрқашан қажет емес",
 "электрохимической движущей силой","electrochemical driving force","электрохимиялық қозғаушы күшке"]){
 assert(source.includes(phrase),"Missing physiological qualifier "+phrase);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleSixGlossary } from "./course-foundation/module-six-glossary"'),"Import missing");
assert(registry.includes('function moduleSixBaseGlossary(language: Language)'),"Typed base missing");
assert(registry.includes('lesson.kind !== "glossary"'),"Wrong base kind guard");
const i=registry.indexOf("\n  6: {");
const j=registry.indexOf("\n  1: {",i);
assert(i>=0&&j>i,"Module 6 registry missing");
const entry=registry.slice(i,j);
for(const lang of langs)
 assert(entry.includes('createModuleSixGlossary("'+lang+'", moduleSixBaseGlossary("'+lang+'"))'),"Missing "+lang+" registration");
const sections=read("content/sections.ts");
assert(sections.includes('slug: "glossary"'),"Glossary section not navigable");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Preview deployment must remain disabled");
console.log("PASS: module 6 glossary 8 terms × 3 locales, corrected definitions, route and preview guard.");
