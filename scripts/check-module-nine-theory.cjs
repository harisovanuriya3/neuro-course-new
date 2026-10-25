// Targeted module 9 / theory regression. Not a browser, clinical or translation audit.
// Run from repository root: node scripts/check-module-nine-theory.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=path=>fs.readFileSync(path,"utf8");
const path="content/course-foundation/module-nine-theory.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 theory TypeScript parse errors");
const output=ts.transpileModule(source,{fileName:path,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},reportDiagnostics:true});
assert.equal((output.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,
 0,"Module 9 theory transpilation errors");
const context={exports:{}};
vm.runInNewContext(output.outputText,context);
const create=context.exports.createModuleNineTheory;
assert.equal(typeof create,"function","Missing module 9 theory factory");
const ids=["spinal-roots-horns-and-segments",
 "spinal-stretch-withdrawal-and-reciprocal-circuits",
 "descending-control-and-spinal-patterns",
 "spinal-shock-time-course",
 "clinical-reflex-localization-limits"];
const markers={
 RU:["задние корешки","передние корешки","Ia","Ib","γ-мотонейроны","реципрокное",
 "спинальный шок","нейрогенного шока","L2–L4","S1–S2"],
 EN:["dorsal roots","ventral roots","Ia","Ib","γ-motor neurons","reciprocal",
 "spinal shock","neurogenic shock","L2–L4","S1–S2"],
 KZ:["артқы түбіршектер","алдыңғы түбіршектер","Ia","Ib","γ-мотонейрондар","реципроктық",
 "жұлындық шок","нейрогендік шоктан","L2–L4","S1–S2"]
};
for(const lang of ["RU","EN","KZ"]){
 const base={kind:"theory",title:"Base",sections:[{id:"quick-summary",title:"Base",blocks:[]}],
  outcomes:{title:"",introduction:"",items:[]},terms:{title:"",items:[]}};
 const lesson=create(lang,base);
 assert.equal(lesson.kind,"theory",lang+": discriminator");
 assert.equal(lesson.sections.length,6,lang+": base + 5 sections");
 assert.equal(lesson.sections[0].id,"quick-summary",lang+": original theory lost");
 assert.deepEqual(Array.from(lesson.sections.slice(1),s=>s.id),ids,lang+": section IDs");
 const paragraphs=[];
 for(const section of lesson.sections.slice(1)){
  assert(section.title.length>=15,lang+": heading too short "+section.id);
  assert.equal(section.blocks.length,2,lang+": two paragraphs "+section.id);
  for(const block of section.blocks){
   assert.equal(block.type,"paragraph",lang+": block type");
   assert(block.text.length>=230,lang+": paragraph too short "+section.id);
   paragraphs.push(block.text);
  }
 }
 assert.equal(new Set(paragraphs).size,10,lang+": duplicated paragraphs");
 const text=paragraphs.join(" ");
 for(const marker of markers[lang])
  assert(text.includes(marker),lang+": missing physiological marker "+marker);
 assert(lesson.sections.every(s=>s.id!=="glia-extracellular-homeostasis"),
  lang+": neuron/glia content incorrectly inserted");
}
const index=read("content/index.ts");
assert(index.includes('import { createModuleNineTheory } from "./course-foundation/module-nine-theory";'),
 "Module 9 theory not imported");
const start=index.indexOf("  9: {"),end=index.indexOf("  8: {",start);
assert(start>=0&&end>start,"Module 9 registration missing");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[9]"),"Other lessons overwritten");
for(const lang of ["RU","EN","KZ"])
 assert(block.includes(lang+': createModuleNineTheory("'+lang+'"'),
  lang+": theory not registered");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(9,"theory",lang);
 assert.equal(lesson?.kind,"theory",lang+": real route missing");
 for(const id of ids)assert(lesson.sections.some(s=>s.id===id),
  lang+": integrated theory missing "+id);
}
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch must not deploy previews");
console.log("PASS: module 9 theory 5 sections x 2 paragraphs x RU/EN/KZ, route and preview lock.");
console.log("OPEN: full build, browser, clinical and independent Kazakh-language review.");
