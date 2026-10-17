// Source-only acceptance check for authored module 4 review questions.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const file="content/course-foundation/module-four-questions.ts";
const src=fs.readFileSync(file,"utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 4 review questions must parse");
const decl=ast.statements.filter(ts.isVariableStatement)
 .flatMap(x=>[...x.declarationList.declarations]).find(x=>x.name.getText(ast)==="data");
assert(decl&&ts.isObjectLiteralExpression(decl.initializer),"Missing authored data");
const get=(obj,key)=>{
 assert(ts.isObjectLiteralExpression(obj),"Expected object "+key);
 const p=obj.properties.find(x=>ts.isPropertyAssignment(x)&&x.name.getText(ast).replace(/['"]/g,"")===key);
 assert(p,"Missing "+key);return p.initializer;
};
const str=x=>{assert(ts.isStringLiteral(x),"Expected string");return x.text;};
for(const lang of ["RU","EN","KZ"]){
 const list=get(decl.initializer,lang);
 assert(ts.isArrayLiteralExpression(list),"Expected "+lang+" question array");
 assert.equal(list.elements.length,4,lang+": expected four questions");
 const prompts=new Set();
 for(const item of list.elements){
  const q=str(get(item,"prompt")),feedback=str(get(item,"explanation"));
  assert(q.length>60&&q.endsWith("?"),lang+": question unclear");
  assert(feedback.length>130,lang+": feedback too brief");
  assert(["theory","clinical","interactive"].includes(str(get(item,"target"))),"Invalid target");
  assert(!prompts.has(q),"Duplicate prompt");prompts.add(q);
 }
 assert(registry.includes('createModuleFourQuestions("'+lang+'")'),lang+": not wired");
}
assert(registry.includes('from "./course-foundation/module-four-questions"'),"Missing import");
const rt=8.314462618*310.15/96485.33212*1000;
const ek=k=>rt*Math.log(k/140),vm=k=>rt*Math.log((k+.04*145)/(140+.04*12));
for(const [actual,expected] of [[ek(4),-95],[ek(8),-76.5],[vm(4),-71.2],[vm(8),-62]])
 assert(Math.abs(actual-expected)<.15,"Incorrect model arithmetic");
assert.equal(JSON.parse(fs.readFileSync("vercel.json","utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);

// Module 4's branching test must use authored, physiology-specific prompts,
// not generic glossary-driven reasoning.
const testSrc=fs.readFileSync("content/course-foundation/module-four-test.ts","utf8");
const testAst=ts.createSourceFile("module-four-test.ts",testSrc,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(testAst.parseDiagnostics.length,0,"Module 4 authored tests must parse");
for(const lang of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleFourTest("'+lang+'"'),"Missing module 4 "+lang+" tests");
 assert(registry.includes('moduleFourBaseTest("'+lang+'"'),"Missing module 4 "+lang+" test base");
}
for(const skill of ["concept","mechanism","application","transfer","justification"]){
 const count=(testSrc.match(new RegExp("^  "+skill+": \\{","gm"))||[]).length;
 assert.equal(count,3,"Module 4 "+skill+" must exist in three languages");
}
assert(testSrc.includes("prompt: data.prompts[j]"),"Authored question stems not used");
assert(testSrc.includes("text: data.hints[j]"),"Authored remediation not used");

console.log("PASS: Module 4 review questions 4×RU/EN/KZ and two-ion model arithmetic.");

const caseSrc=fs.readFileSync("content/course-foundation/module-four-cases.ts","utf8");
for(const phrase of ["при серии одинаковых пробных стимулов","с достаточными интервалами","repeated identical test stimuli","sufficient recovery intervals","қайталанған бірдей сынақ стимулдарына","жеткілікті аралықтармен"]){
 assert(caseSrc.includes(phrase),"Module 4 repeated-trial control missing: "+phrase);
}
for(const lang of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleFourCases("'+lang+'", moduleFourBaseCases("'+lang+'"))'),"Module 4 cases missing "+lang);
}
console.log("PASS: Module 4 repeated-trial clinical case controls in RU/EN/KZ.");
