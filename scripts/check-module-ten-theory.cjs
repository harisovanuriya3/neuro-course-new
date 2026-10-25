// Module 10 brainstem theory: localized structure, physiology, route and preview guard.
// Run: node scripts/check-module-ten-theory.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-ten-theory.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"TypeScript parse error in module 10 theory");
const output=ts.transpileModule(source,{fileName:path,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},reportDiagnostics:true});
assert.equal((output.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,
 0,"Module 10 theory transpile errors");
const context={exports:{}};
vm.runInNewContext(output.outputText,context);
const create=context.exports.createModuleTenTheory;
assert.equal(typeof create,"function","Module 10 theory factory missing");
const ids=["brainstem-levels-and-tracts","pupillary-and-corneal-reflexes",
 "ascending-arousal-and-descending-posture","distributed-autonomic-brainstem-networks"];
const markers={
 RU:["продолговатый мозг","мост","средний мозг","претектальной","Эдингера—Вестфаля","V1",
 "VII","полисинаптический","таламус","ретикулоспинальные","хеморецепторов","барорецепторов"],
 EN:["medulla","pons","midbrain","pretectal","Edinger–Westphal","V1",
 "VII","polysynaptic","thalamus","reticulospinal","chemoreceptors","baroreceptor"],
 KZ:["сопақша ми","көпір","ортаңғы ми","претекталдық","Эдингер—Вестфаль","V1",
 "VII","полисинапстық","таламус","ретикулоспиналдық","хеморецептор","барорецептор"]
};
for(const lang of ["RU","EN","KZ"]){
 const base={kind:"theory",title:"Base",sections:[{id:"quick-summary",title:"Base",blocks:[]}]};
 const lesson=create(lang,base);
 assert.equal(lesson.kind,"theory",lang+": kind");
 assert.equal(lesson.sections.length,5,lang+": original + four new sections");
 assert.equal(lesson.sections[0].id,"quick-summary",lang+": base removed");
 assert.deepEqual(Array.from(lesson.sections.slice(1),s=>s.id),ids,lang+": section IDs");
 const paragraphs=[];
 for(const section of lesson.sections.slice(1)){
  assert(section.title.length>=10,lang+": heading too short");
  assert.equal(section.blocks.length,2,lang+": paragraph count");
  for(const block of section.blocks){
   assert.equal(block.type,"paragraph",lang+": wrong block type");
   assert(block.text.length>=200,lang+": paragraph too short");
   paragraphs.push(block.text);
  }
 }
 assert.equal(new Set(paragraphs).size,8,lang+": duplicate paragraphs");
 const body=paragraphs.join(" ");
 for(const marker of markers[lang])assert(body.toLocaleLowerCase().includes(marker.toLocaleLowerCase()),lang+": missing "+marker);
}
const index=read("content/index.ts");
assert(index.includes('import { createModuleTenTheory } from "./course-foundation/module-ten-theory";'),
 "Module 10 theory import missing");
const start=index.indexOf("  10: {"),end=index.indexOf("  9: {",start);
assert(start>=0&&end>start,"Module 10 registration missing");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[10]"),"Other lessons overwritten");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes(lang+': createModuleTenTheory("'+lang+'"'),lang+": theory not wired");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(10,"theory",lang);
 assert.equal(lesson?.kind,"theory",lang+": real route not theory");
 for(const id of ids)assert(lesson.sections.some(s=>s.id===id),lang+": missing "+id);
}
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Preview deployment must remain disabled");
console.log("PASS: module 10 theory 4 sections x 2 paragraphs x RU/EN/KZ; registration and preview lock.");
console.log("OPEN: full typecheck, build, browser interaction, independent KZ review.");
