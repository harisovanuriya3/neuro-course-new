// Module 6 clinical bridge: authored locale structure, route and mechanism guardrails.
// Does not replace scientific/translation review or browser testing.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-six-clinical.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 clinical syntax error");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(x=>[...x.declarationList.declarations])
 .find(x=>x.name.getText(ast)==="copy");
assert(declaration&&ts.isObjectLiteralExpression(declaration.initializer),"Missing clinical locale map");
const map=declaration.initializer;
const langs=["RU","EN","KZ"];
assert.deepEqual(map.properties.map(x=>x.name.getText(ast)).sort(),[...langs].sort(),"Expected exactly three locales");
const expectedLinks=["theory","theory","practice","cases","questions"];
for(const lang of langs){
 const prop=map.properties.find(x=>x.name.getText(ast)===lang);
 assert(prop&&ts.isPropertyAssignment(prop)&&ts.isObjectLiteralExpression(prop.initializer),lang+" locale missing");
 const fields=prop.initializer.properties;
 const intro=fields.find(x=>x.name.getText(ast)==="introduction");
 assert(intro&&ts.isStringLiteral(intro.initializer)&&intro.initializer.text.length>70,lang+" clinical introduction");
 const cards=fields.find(x=>x.name.getText(ast)==="cards");
 assert(cards&&ts.isArrayLiteralExpression(cards.initializer),lang+" cards missing");
 assert.equal(cards.initializer.elements.length,5,lang+" expected five clinical stages");
 cards.initializer.elements.forEach((card,i)=>{
  assert(ts.isObjectLiteralExpression(card),lang+" card "+(i+1)+" not object");
  for(const field of ["title","text","link"]){
   const p=card.properties.find(x=>x.name.getText(ast)===field);
   assert(p&&ts.isStringLiteral(p.initializer),lang+" card "+(i+1)+" missing "+field);
   assert(p.initializer.text.length>(field==="text"?130:field==="title"?5:2),lang+" card "+(i+1)+" short "+field);
   if(field==="link")assert.equal(p.initializer.text,expectedLinks[i],lang+" card "+(i+1)+" wrong destination");
  }
 });
}
const terms={
 RU:["Ia-афферент","Тормоз","ГАМК","контрактур","H-рефлекс"],
 EN:["Ia afferent","inhibitory","GABA","contracture","H-reflex"],
 KZ:["Ia-афферент","Тежеуші","ГАМҚ","контрактура","H-рефлекс"]
};
for(const [lang,words] of Object.entries(terms)){
 const p=map.properties.find(x=>x.name.getText(ast)===lang);
 const locale=p.initializer.getText(ast).toLowerCase();
 for(const word of words)assert(locale.includes(word.toLowerCase()),lang+" missing clinical guardrail "+word);
}
assert(source.includes('kind: "clinical"'),"Wrong lesson kind");
assert(source.includes('getSectionTitle("clinical", language)'),"Missing localized title");
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleSixClinical } from "./course-foundation/module-six-clinical"'),"Missing clinical import");
const moduleSix=registry.slice(registry.indexOf("\n  6: {"),registry.indexOf("\n  7: {"));
assert(moduleSix.startsWith("\n  6: {"),"Module 6 registry not found");
for(const lang of langs)assert(moduleSix.includes('createModuleSixClinical("'+lang+'")'),"Module 6 "+lang+" not registered");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("getLesson(moduleNumber, section, lang)"),"Generic clinical lesson routing missing");
assert(route.includes("<SectionContent"),"Reading lessons not rendered");
const sections=read("content/sections.ts");
assert(sections.includes('slug: "clinical"'),"Clinical route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Review previews must stay disabled");
console.log("PASS: module 6 clinical 5 cards × RU/EN/KZ, physiological guardrails, registry, route, previews disabled.");
