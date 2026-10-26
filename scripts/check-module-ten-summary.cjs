// Module 10 brainstem one-minute: localized scientific content, wiring and preview guard.
// Run from repo root: node scripts/check-module-ten-summary.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-ten-summary.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 10 summary TypeScript syntax");
const compiled=ts.transpileModule(source,{fileName:path,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},
 reportDiagnostics:true});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,
 0,"Module 10 summary transpile diagnostics");
const context={exports:{},require:name=>{
 if(name==="../sections")return {getSectionTitle:(_section,language)=>language};
 throw new Error("Unexpected import "+name);
}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleTenSummary;
assert.equal(typeof create,"function","Summary factory missing");
const markers={
 RU:["Продолговатый мозг","претектальную","Эдингера—Вестфаля","II","III","V1","VII","таламическими","барорецепторные","хеморецепторы"],
 EN:["medulla","pretectal","Edinger–Westphal","II","III","V1","VII","thalamic","baroreceptor","chemoreceptors"],
 KZ:["Сопақша ми","претекталдық","Эдингер—Вестфаль","II","III","V1","VII","таламус","барорецепторлық","хеморецепторлар"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang);
 assert.equal(lesson.kind,"one-minute",lang+": wrong kind");
 assert(lesson.introduction.length>=60,lang+": introduction incomplete");
 assert.equal(lesson.cards.length,5,lang+": five physiological takeaways required");
 assert.equal(new Set(lesson.cards.map(c=>c.id)).size,5,lang+": duplicate IDs");
 const explanations=[];
 for(let i=0;i<5;i++){
  const card=lesson.cards[i];
  assert.equal(card.id,"module-10-summary-"+(i+1),lang+": wrong ID");
  assert(card.title.length>=20,lang+": title too short");
  assert.equal(card.paragraphs.length,1,lang+": expected one paragraph");
  assert(card.paragraphs[0].length>=160,lang+": explanation too short");
  assert.deepEqual(Array.from(card.links,l=>l.section),["theory","clinical"],lang+": invalid links");
  explanations.push(card.paragraphs[0]);
 }
 assert.equal(new Set(explanations).size,5,lang+": duplicate physiology");
 const body=explanations.join(" ").toLocaleLowerCase();
 for(const token of markers[lang])
  assert(body.includes(token.toLocaleLowerCase()),lang+": missing "+token);
}
assert(!source.includes("содружестволық"),"Kazakh summary contains Russian calque");
const index=read("content/index.ts");
assert(index.includes('import { createModuleTenSummary } from "./course-foundation/module-ten-summary";'),
 "Missing summary import");
const start=index.indexOf("  10: {"),end=index.indexOf("  9: {",start);
assert(start>=0&&end>start,"Module 10 registry block missing");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[10]"),"Other module 10 lessons lost");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes(lang+': createModuleTenSummary("'+lang+'")'),lang+": summary route missing");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(10,"one-minute",lang);
 assert.equal(lesson?.kind,"one-minute",lang+": actual route wrong kind");
 assert.equal(lesson.cards.length,5,lang+": actual route cards");
}
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Preview lock must remain disabled");
console.log("PASS: module 10 one-minute: 5 physiological takeaways x RU/EN/KZ, routing, preview lock.");
console.log("OPEN: full typecheck/build, browser and independent Kazakh editorial review.");
