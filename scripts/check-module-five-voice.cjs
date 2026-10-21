// Module 5 voice exercise: AST/source contract; not speech-recognition or grading validation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="components/VoiceContent.tsx";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX syntax");
const decl=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>d.name.getText(ast)==="moduleFiveCopy");
assert(decl&&ts.isAsExpression(decl.initializer),"Module 5 localized voice task missing");
const root=decl.initializer.expression;
assert(ts.isObjectLiteralExpression(root),"Expected locale object");
function field(obj,name){
 assert(ts.isObjectLiteralExpression(obj),"Expected object at "+name);
 const prop=obj.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast).replace(/['"]/g,"")===name);
 assert(prop,"Missing "+name);
 return prop.initializer;
}
assert.equal(root.properties.length,3,"Expected exactly three locales");
for(const lang of ["RU","EN","KZ"]){
 const locale=field(root,lang);
 for(const key of ["intro","prompt","cause","path","result","ready","good"]){
  const val=field(locale,key);
  assert(ts.isStringLiteral(val)&&val.text.trim().length>24,lang+" missing "+key);
 }
}
assert(source.includes("moduleId===5 ? {...copy[language],...moduleFiveCopy[language]}"),
 "Module 5 voice task not selected");
for(const fragment of [
 "пресинаптическом окончании","presynaptic terminal","пресинапстық ұшта",
 "спонтанные миниатюрные","spontaneous miniature","миниатюралық жауаптар",
 "щелевые контакты","gap junctions","саңылаулы түйіспелер",
 "не доказывает блок проведения","proves neither axonal conduction block","өткізудің бөгелуін",
 "самооценка","self-assessment","өзіндік бағалау"
])assert(source.includes(fragment),"Missing module 5 physiology/localization: "+fragment);
assert(source.includes("persisted?c.saved:c.unsaved"),"Must not claim unsuccessful storage was saved");
assert(source.includes("disabled={answer.trim().length<12}"),"Blank answer guard missing");
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
assert(route.includes("<VoiceContent language={lang} moduleId={moduleNumber} />"),"Voice route missing");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Preview must remain disabled");
console.log("PASS: module 5 voice source, seven fields × RU/EN/KZ, physiology and route.");
console.log("NOTE: requires npm execution, TypeScript build, speech/browser and native KZ review.");
