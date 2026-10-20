// Structural regression for module 5 formative tests; scientific judgment is separate.
// Run: node scripts/check-module-five-test.cjs
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-five-test.ts";
const source=read(path);
const parsed=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length,0,"Module 5 test TypeScript syntax invalid");
const skills=["concept","mechanism","application","transfer","justification"];
const authored=parsed.statements.find(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(parsed)==="authored"));
assert(authored,"Authored module 5 items absent");
const declaration=authored.declarationList.declarations.find(d=>d.name.getText(parsed)==="authored");
const object=declaration.initializer;
assert(ts.isObjectLiteralExpression(object),"Authored item map must be an object");
assert.equal(object.properties.length,5,"Expected exactly five skills");
for(const skill of skills){
 const entry=object.properties.find(p=>p.name?.getText(parsed)===skill);
 assert(entry&&ts.isPropertyAssignment(entry),"Missing skill "+skill);
 const fields=entry.initializer;
 assert(ts.isObjectLiteralExpression(fields),"Invalid skill "+skill);
 for(const [name,count] of [["prompts",3],["choices",4],["hints",2]]){
  const field=fields.properties.find(p=>p.name?.getText(parsed)===name);
  assert(field&&ts.isArrayLiteralExpression(field.initializer),skill+" missing "+name);
  assert.equal(field.initializer.elements.length,count,skill+" "+name+" count");
  for(const el of field.initializer.elements){
   assert(ts.isCallExpression(el)&&el.expression.getText(parsed)==="t",skill+" "+name+" needs localized t()");
   assert.equal(el.arguments.length,3,skill+" "+name+" must have RU/EN/KZ");
   for(const arg of el.arguments)assert(ts.isStringLiteral(arg)&&arg.text.trim().length>12,skill+" "+name+" has empty locale");
  }
 }
 const explanation=fields.properties.find(p=>p.name?.getText(parsed)==="explanation");
 assert(explanation&&ts.isCallExpression(explanation.initializer)&&explanation.initializer.arguments.length===3,skill+" explanation localization");
}
const registry=read("content/index.ts");
for(const lang of ["RU","EN","KZ"])assert(registry.includes('createModuleFiveTest("'+lang+'",'),"Module 5 "+lang+" test not registered");
assert(source.includes('correctAnswer:"a"'),"Stable correct answer ID missing");
assert(source.includes("options.slice(shift)"),"Answer rotation missing");
assert(source.includes('skill+":review-"+depth'),"Remediation not localized by skill");
const route=read("app/modules/[id]/[section]/page.tsx");
const renderer=read("components/SectionContent.tsx");
assert(route.includes("getLesson(moduleNumber, section, lang)"),"Section route must resolve registered lesson");
assert(route.includes("<SectionContent"),"Section route must render resolved lesson");
assert(renderer.includes('case "tests":'),"Shared section renderer must support tests");
assert(renderer.includes("<BranchingTestContent test={lesson}"),"Tests must use the branching test renderer");
assert(registry.includes("function moduleFiveBaseTest(language: Language)"),"Module 5 typed base test guard absent");
assert(registry.includes('lesson.kind !== "tests"'),"Module 5 test guard must narrow lesson kind");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleFiveTest("'+lang+'", moduleFiveBaseTest("'+lang+'"))'),
   "Module 5 "+lang+" tests must use typed base guard");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Preview branch must remain disabled");
console.log("PASS: module 5 tests: 5 skills × 3 prompts × 3 languages, choices, feedback and registry.");
console.log("NOTE: AST checks are not equivalent to TypeScript build or browser verification.");

// The module 5 media check is part of the existing science-audit chain.
require("./check-module-five-media.cjs");
