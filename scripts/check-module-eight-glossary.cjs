// Module 8 pathway glossary: trilingual terms, scientific anchors, integration.
// Source cross-check: Guyton & Hall 13e PDF 584–586, Ganong 23e PDF 185–187,
// C. L. Ghai Practical Physiology 8e PDF 324–326.
// This does not replace a full project build or independent Kazakh proofreading.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-eight-glossary.ts";
const src=read(path);
const ast=ts.createSourceFile(path,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Glossary TypeScript parse error");
const compiled=ts.transpileModule(src,{
  fileName:path,reportDiagnostics:true,
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleEightGlossary;
assert.equal(typeof create,"function");
const anchors=new Set(["dorsal-column-medial-lemniscus","anterolateral-system",
  "corticospinal-tract","localization-comparison"]);
const theory=read("content/course-foundation/module-eight-theory.ts");
for(const anchor of anchors)assert(theory.includes('id: "'+anchor+'"'),"Missing theory anchor "+anchor);
const expectedMarkers={
  RU:["продолговат","спинном","таламус","корково-спинномозгов"],
  EN:["medulla","spinal cord","thalam","corticospinal"],
  KZ:["сопақша","жұлын","таламус","қыртыс-жұлын"]
};
for(const language of ["RU","EN","KZ"]){
 const base={kind:"glossary",title:"Glossary",introduction:"old",
  terms:[
   {id:"module-8-term-1",term:language==="RU"?"Афферентный путь":language==="EN"?"Afferent pathway":"Афференттік жол",
    definition:"old generic",target:{section:"theory"}},
   {id:"module-8-term-2",term:language==="RU"?"Перекрёст":language==="EN"?"Decussation":"Айқасу",
    definition:"old generic",target:{section:"theory"}}
  ]};
 const lesson=create(language,base);
 assert.equal(lesson.kind,"glossary");
 assert.equal(lesson.terms.length,13,language+": two corrected + eleven new terms");
 assert.equal(base.terms[0].definition,"old generic","Foundation must not mutate");
 assert.equal(lesson.terms[0].id,"module-8-term-1");
 assert.equal(lesson.terms[1].id,"module-8-term-2");
 assert.equal(new Set(lesson.terms.map(t=>t.id)).size,13,language+": duplicate IDs");
 assert.equal(new Set(lesson.terms.map(t=>t.term)).size,13,language+": duplicate terms");
 for(const term of lesson.terms){
  assert(term.term.trim().length>=5,language+": missing term "+term.id);
  assert(term.definition.trim().length>=110,language+": short definition "+term.id);
  assert.equal(term.target.section,"theory",language+": wrong target "+term.id);
  assert(anchors.has(term.target.anchor),language+": broken anchor "+term.id);
 }
 const joined=lesson.terms.map(x=>x.definition).join(" ").toLowerCase();
 for(const marker of expectedMarkers[language])
  assert(joined.includes(marker.toLowerCase()),language+": missing pathway marker "+marker);
 assert(lesson.introduction.length>=90);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleEightGlossary } from "./course-foundation/module-eight-glossary";'));
for(const language of ["RU","EN","KZ"])
 assert(registry.includes('createModuleEightGlossary("'+language+'", foundationLessons[8].glossary.'+language),
  "Module 8 glossary not registered in "+language);
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
  "Review branch must not deploy");
console.log("PASS: module 8 glossary: 13 terms × RU/EN/KZ, 4 theory anchors, source and registry checks.");
console.log("OPEN: complete TypeScript/build/browser QA and independent Kazakh-language review.");
