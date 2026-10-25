// Module 9 glossary regression: original spinal-shock definition, 10 added terms,
// RU/EN/KZ, anchors and registry. Requires npm-installed TypeScript.
// Structural checks do not replace a build, native translation review or browser QA.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p,"utf8");
const file = "content/course-foundation/module-nine-glossary.ts";
const src = read(file);
const ast = ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 glossary TS parse error");
const compiled = ts.transpileModule(src,{
  fileName:file,reportDiagnostics:true,
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleNineGlossary;
assert.equal(typeof create,"function");
const theory=read("content/course-foundation/module-nine-theory.ts");
const anchors=new Set([
  "spinal-roots-horns-and-segments",
  "spinal-stretch-withdrawal-and-reciprocal-circuits",
  "descending-control-and-spinal-patterns",
  "spinal-shock-time-course"
]);
for(const anchor of anchors)
 assert(theory.includes('id: "'+anchor+'"'),"Missing theory anchor "+anchor);
const baseTerms={
 RU:["Сегментарная сеть","Спинальный шок"],
 EN:["Segmental circuit","Spinal shock"],
 KZ:["Сегменттік желі","Жұлындық шок"]
};
const shockMarkers={
 RU:["угнетение","нисходящих","нейрогенным шоком"],
 EN:["depression","descending","neurogenic shock"],
 KZ:["бәсеңдеуі","төмендеуші","нейрогендік шокпен"]
};
for(const language of ["RU","EN","KZ"]){
 const base={kind:"glossary",title:"Glossary",introduction:"old",terms:baseTerms[language].map((term,i)=>({
   id:"module-9-term-"+(i+1),term,definition:"old",target:{section:"theory"}
 }))};
 const lesson=create(language,base);
 assert.equal(lesson.kind,"glossary");
 assert.equal(lesson.terms.length,12,language+": 2 corrected and 10 new terms");
 assert.equal(base.terms[1].definition,"old","Foundation lesson was mutated");
 assert.deepEqual(Array.from(lesson.terms.slice(0,2),x=>x.id),["module-9-term-1","module-9-term-2"]);
 assert.equal(new Set(lesson.terms.map(x=>x.id)).size,12,language+": duplicate IDs");
 assert.equal(new Set(lesson.terms.map(x=>x.term)).size,12,language+": duplicate terms");
 assert.equal(lesson.terms[1].target.anchor,"spinal-shock-time-course");
 for(const marker of shockMarkers[language])
   assert(lesson.terms[1].definition.toLowerCase().includes(marker.toLowerCase()),
     language+": wrong spinal shock definition: missing "+marker);
 for(const term of lesson.terms){
  assert(term.term.trim().length>=5,language+": missing term");
  assert(term.definition.trim().length>=100,language+": insufficient explanation for "+term.id);
  assert.equal(term.target.section,"theory");
  assert(anchors.has(term.target.anchor),language+": broken anchor "+term.id);
 }
 assert(lesson.introduction.length>=100,language+": introduction missing");
 const terms=lesson.terms.map(x=>x.term).join(" ").toLowerCase();
 for(const marker of ({RU:["веретено","Ia","Гольджи","отдёргивания"],
   EN:["spindle","Ia","Golgi","withdrawal"],
   KZ:["ұршығы","Ia","Гольджи","тартып алу"]})[language])
  assert(terms.includes(marker.toLowerCase()),language+": missing key term "+marker);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleNineGlossary } from "./course-foundation/module-nine-glossary";'));
for(const language of ["RU","EN","KZ"])
 assert(registry.includes('createModuleNineGlossary("'+language+'", foundationLessons[9].glossary.'+language),
  "Module 9 glossary not wired: "+language);
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch must not enable previews");
console.log("PASS: module 9 glossary 12 terms × RU/EN/KZ; spinal shock correction, 4 anchors and registry.");
console.log("OPEN: full TypeScript/build/browser tests and independent Kazakh language review.");
