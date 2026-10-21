// Structural regression for module 5 authored synapse review (not a browser test).
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-five-questions.ts";
const source=fs.readFileSync(file,"utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 5 questions TypeScript syntax");
assert(registry.includes('import { createModuleFiveQuestions } from "./course-foundation/module-five-questions"'),"Missing module 5 questions import");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleFiveQuestions("'+lang+'")'),"Missing "+lang+" registration");
const ids=["calcium","shunting","nerve-muscle","electrical-rectification","metabotropic"];
for(const id of ids)assert(source.includes('id:"'+id+'"'),"Missing synapse mechanism "+id);
const strings=[...source.matchAll(/t\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s*\)/g)];
assert(strings.length>=7,"Missing localized prompts and explanations");
for(const match of strings)for(const str of match.slice(1))
 assert(str.trim().length>30,"Uninformative translated text");
for(const phrase of ["Ca²⁺","Cl⁻","E(Cl)","ацетилхолин","acetylcholine","шунт","shunt","аксон","axonal"]){
 assert(source.includes(phrase),"Missing key mechanism "+phrase);
}
assert(source.includes('target:{section:item.target}'),"Missing explanatory navigation target");
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Previews must stay disabled");
console.log("PASS module 5 questions: 5 topics × RU/EN/KZ, registration, AST, mechanism and preview guard.");
console.log("NOTE: clinical accuracy, translation and browser behavior need separate review.");
