// Module 4 virtual-model source contract; does not replace browser testing.
const assert=require("node:assert/strict"),fs=require("node:fs"),ts=require("typescript");
const file="content/course-foundation/module-four-virtual-patient-review.ts";
const src=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 4 review must parse");
const decls=ast.statements.filter(ts.isVariableStatement).flatMap(x=>[...x.declarationList.declarations]);
const data=decls.find(x=>x.name.getText(ast)==="stages");
assert(data&&ts.isArrayLiteralExpression(data.initializer),"Missing authored stages");
assert.equal(data.initializer.elements.length,6,"Six stages required");
function prop(node,key){
 assert(ts.isObjectLiteralExpression(node),"Expected stage object");
 const p=node.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast).replace(/['"]/g,"")===key);
 assert(p,"Missing "+key);return p.initializer;
}
function localized(node,key){
 assert(ts.isCallExpression(node)&&node.expression.getText(ast)==="l",key+" must be localized");
 assert.equal(node.arguments.length,3,key+" needs RU/EN/KZ");
 for(const [i,lang] of ["RU","EN","KZ"].entries()){
  const x=node.arguments[i];assert(ts.isStringLiteral(x)&&x.text.trim().length>12,key+" empty "+lang);
 }
}
data.initializer.elements.forEach((stage,i)=>{
 for(const key of ["situation","data","task","correct","explanation"])localized(prop(stage,key),i+":"+key);
 const wrong=prop(stage,"wrong");
 assert(ts.isArrayLiteralExpression(wrong)&&wrong.elements.length===2,"Two distractors required");
 wrong.elements.forEach((x,j)=>localized(x,i+":wrong"+j));
});
const layer=fs.readFileSync("content/reviewed-virtual-patients.ts","utf8");
const view=fs.readFileSync("components/UnifiedVirtualPatient.tsx","utf8");
assert(layer.includes("return reviewModuleFourVirtualPatient(base,language)"),"Review not wired");
assert(view.includes("moduleId !== 3 && moduleId !== 4 && moduleId !== 5 && <div"),"Human portrait must be hidden");
assert(view.includes("(moduleId === 3 || moduleId === 4 || moduleId === 5)"),"Teaching-model label missing");
assert(src.includes('options[stage.correctOption].id.endsWith("-decision-1")'),"Answer-key guard missing");
console.log("PASS: module 4 six stages, three localized decisions, model-only UI and answer-key guard.");

assert(view.includes("moduleId === 4 ? membraneModelDecisionCopy[language]"),"Module 4 must use model-specific feedback");
assert(view.includes('(moduleId === 3 || moduleId === 4 || moduleId === 5) && "scope" in d && <p'),"Model scoring disclosure missing");
