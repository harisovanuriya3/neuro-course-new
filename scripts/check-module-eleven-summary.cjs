// Module 11 one-minute: authored motor-control physiology, RU/EN/KZ, routes and preview lock.
// Run from repository root: node scripts/check-module-eleven-summary.cjs
// Source/route regression only: does not replace independent scientific or browser review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-eleven-summary.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 11 summary TypeScript syntax");
const compiled=ts.transpileModule(source,{
 fileName:path,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},
 reportDiagnostics:true
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,
 0,"Module 11 summary transpilation");
const context={exports:{},require:name=>{
 if(name==="../sections")return {getSectionTitle:(_section,language)=>language};
 throw new Error("Unexpected runtime import "+name);
}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleElevenSummary;
assert.equal(typeof create,"function","Summary factory missing");
const markers={
 RU:["базальными ганглиями","мозжечком","α-мотонейрон","кортикоспиналь","кортикобульбар","перекрещ","вестибулоспиналь","ретикулоспиналь","feedforward","проприоцеп","Ia-афферент","веретёна"],
 EN:["basal ganglia","cerebellum","alpha motor neurons","corticospinal","corticobulbar","cross","vestibulospinal","reticulospinal","feedforward","proprioceptive","Ia afferents","muscle spindles"],
 KZ:["базальды ганглийлер","мишық","α-мотонейрон","кортикоспинал","кортикобульбар","айқас","вестибулоспинал","ретикулоспинал","feedforward","проприоцеп","Ia-афферент","ұршық"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang);
 assert.equal(lesson.kind,"one-minute",lang+": wrong kind");
 assert(lesson.introduction.length>=75,lang+": introduction incomplete");
 assert.equal(lesson.cards.length,5,lang+": five takeaways required");
 assert.equal(new Set(lesson.cards.map(c=>c.id)).size,5,lang+": duplicate card IDs");
 const paragraphs=[];
 for(let i=0;i<5;i++){
  const card=lesson.cards[i];
  assert.equal(card.id,"module-11-summary-"+(i+1),lang+": wrong card ID");
  assert(card.title.length>=18,lang+": title incomplete");
  assert.equal(card.paragraphs.length,1,lang+": one explanation per card");
  assert(card.paragraphs[0].length>=180,lang+": explanation too short");
  assert.deepEqual(Array.from(card.links,l=>l.section),["theory","clinical"],lang+": invalid links");
  paragraphs.push(card.paragraphs[0]);
 }
 assert.equal(new Set(paragraphs).size,5,lang+": repeated physiology");
 const body=paragraphs.join(" ").toLocaleLowerCase();
 for(const marker of markers[lang])
  assert(body.includes(marker.toLocaleLowerCase()),lang+": missing concept "+marker);
}
const index=read("content/index.ts");
assert(index.includes('import { createModuleElevenSummary } from "./course-foundation/module-eleven-summary";'),
 "Missing module 11 summary import");
const start=index.indexOf("  11: {",index.indexOf("const lessons"));
const end=index.indexOf("  3: {",start);
assert(start>=0&&end>start,"Module 11 registry block missing");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[11]"),"Other module 11 sections lost");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes(lang+': createModuleElevenSummary("'+lang+'")'),
  lang+": summary route not registered");
for(const section of ["objectives","pretest","theory"])
 assert(block.includes(section+":"), "Previously reviewed "+section+" section missing");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(11,"one-minute",lang);
 assert.equal(lesson?.kind,"one-minute",lang+": wrong route kind");
 assert.equal(lesson.cards.length,5,lang+": wrong number of rendered cards");
 for(const card of lesson.cards)assert(card.links.every(l=>["theory","clinical"].includes(l.section)));
 assert(getLesson(11,"objectives",lang),lang+": objectives lost");
 assert(getLesson(11,"pretest",lang),lang+": pretest lost");
 assert(getLesson(11,"theory",lang),lang+": theory lost");
}
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Vercel preview must remain disabled");
console.log("PASS: module 11 one-minute, 5 scientific takeaways x RU/EN/KZ; routes and preview guard.");
console.log("OPEN: full typecheck/build, browser and independent KZ review.");
