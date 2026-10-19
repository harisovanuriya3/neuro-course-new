// Module 5 theory: structural and pedagogical regression, not a browser or scientific certification.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-five-theory.ts";
const source=fs.readFileSync(file,"utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
const questions=fs.readFileSync("content/course-foundation/module-five-questions.ts","utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 5 theory must parse");
const ids=["chemical-electrical-comparison","postsynaptic-integration-and-shunting",
 "neuromuscular-junction","synaptic-model-limits"];
for(const id of ids)assert(source.includes('id: "'+id+'"'),"Missing section "+id);
const localCalls=[];
function visit(node){
 if(ts.isCallExpression(node) && node.expression.getText(ast)==="local")localCalls.push(node);
 ts.forEachChild(node,visit);
}
visit(ast);
assert(localCalls.length>=12,"Module 5 theory has too few localized explanations");
for(const call of localCalls){
 assert.equal(call.arguments.length,3,"Every local() requires RU, EN, KZ");
 for(const [i,arg] of call.arguments.entries()){
  assert(ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg),
   "Localized explanation must be literal "+i);
  assert(arg.text.trim().length>15,"Missing meaningful localized text "+i);
 }
}
for(const phrase of ["E(Cl)","Vm","Cl⁻","шунт","shunting","шунттаудың",
 "входное сопротивление","input resistance","кіріс кедергісін",
 "не обязан вызывать","need not produce","міндетті түрде"]){
 assert(source.includes(phrase),"Shunting theory missing "+phrase);
}
assert(questions.includes('id:"shunting",target:"theory"'),
 "Shunting review question must link to theory");
for(const lang of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleFiveTheory("'+lang+'", moduleFiveBaseTheory("'+lang+'"))',
  "Module 5 theory not registered for "+lang);
}
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Audit branch previews must remain disabled");
console.log("PASS: module 5 theory sections, shunting mechanism, RU/EN/KZ, question target and preview guard.");
console.log("NOTE: structural source test only; no physiology certification or browser E2E.");
