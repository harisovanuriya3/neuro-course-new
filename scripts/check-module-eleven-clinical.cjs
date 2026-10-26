// Module 11 clinical: upper/lower motor patterns, time course and RU/EN/KZ parity.
// Source/route contract; NOT a substitute for independent scientific or browser review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-eleven-clinical.ts";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 11 clinical TS parse errors");
const compiled=ts.transpileModule(src,{
 fileName:file,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},
 reportDiagnostics:true
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{},require:name=>{
 if(name==="../sections")return {getSectionTitle:(_section,lang)=>"clinical-"+lang};
 throw new Error("Unexpected module 11 clinical import "+name);
}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleElevenClinical;
assert.equal(typeof create,"function");
const markers={
 RU:["внутренней капсулы","перекрёст","кортикоспиналь","ретикулоспиналь","Ia-афферент","мышечные веретёна","спинальный шок","спастичность","подошвенный","студенты"],
 EN:["internal capsule","decussation","corticospinal","reticulospinal","Ia afferents","muscle spindles","spinal shock","spasticity","plantar","students"],
 KZ:["ішкі капсуланың","айқас","кортикоспинал","ретикулоспинал","Ia-афферент","бұлшықет ұршықтары","жұлындық шок","спастикалық","табан рефлексінің","студенттер"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang);
 assert.equal(lesson.kind,"clinical");
 assert.equal(lesson.title,"clinical-"+lang);
 assert(lesson.introduction.length>=90,lang+": introduction");
 assert.equal(lesson.cards.length,5,lang+": cards");
 assert.equal(new Set(lesson.cards.map(x=>x.id)).size,5,lang+": duplicate IDs");
 const textBody=lesson.cards.map(c=>c.paragraphs.join(" ")).join(" ");
 for(const marker of markers[lang])assert(textBody.toLocaleLowerCase().includes(marker.toLocaleLowerCase()),lang+": missing "+marker);
 for(let i=0;i<5;i++){
  const card=lesson.cards[i];
  assert.equal(card.id,"module-11-clinical-"+(i+1));
  assert(card.title.length>=14,lang+": title "+i);
  assert.equal(card.paragraphs.length,1,lang+": paragraph count "+i);
  assert(card.paragraphs[0].length>=270,lang+": incomplete explanation "+i);
  assert.equal(card.links.length,2,lang+": links "+i);
  for(const link of card.links)assert(["cases","theory","practice","one-minute","pretest","tests","questions"].includes(link.section),lang+": link "+link.section);
 }
}
const index=read("content/index.ts");
assert(index.includes('import { createModuleElevenClinical } from "./course-foundation/module-eleven-clinical";'),"Import missing");
const start=index.indexOf("  11: {",index.indexOf("const lessons"));
const end=index.indexOf("  3: {",start);
assert(start>=0&&end>start,"Module 11 registry block");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[11]"),"Existing module sections must remain");
for(const lang of ["RU","EN","KZ"]){
 assert(block.includes(lang+': createModuleElevenClinical("'+lang+'")'),lang+": route not registered");
}
for(const section of ["objectives","pretest","theory",'"one-minute"'])assert(block.includes(section+":"),"Earlier reviewed "+section+" missing");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(11,"clinical",lang);
 assert.equal(lesson?.kind,"clinical",lang+": wrong routed kind");
 assert.equal(lesson.cards.length,5,lang+": wrong routed card count");
 assert(lesson.cards.every(c=>c.links.every(l=>["cases","theory","practice","one-minute","pretest","tests","questions"].includes(l.section))),lang+": broken internal link");
}
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Preview must remain disabled");
console.log("PASS: module 11 clinical, 5 cards × 3 languages, route and preview guard.");
console.log("OPEN: full typecheck/build, browser/keyboard/mobile/audio tests and independent KZ editing.");
