const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(11,"theory",lang),practice=getLesson(11,"practice",lang),cases=getLesson(11,"cases",lang),tests=getLesson(11,"tests",lang),media=getLesson(11,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,lang+": missing module 11 lesson");
 validateTest(tests);
 const ids=theory.sections.map(s=>s.id);
 for(const id of ["motor-cortex-organization","motor-unit-recruitment","motor-system-localization"])assert(ids.includes(id),lang+": missing theory "+id);
 assert.equal(new Set(ids).size,ids.length,lang+": duplicate theory");
 assert(practice.sections.some(s=>s.title.includes(lang==="RU"?"двигательная единица":lang==="EN"?"motor units":"қозғалтқыш бірлік")),lang+": motor unit lab missing");
 assert(cases.cases.length>=20,lang+": insufficient cases");
 assert(cases.cases.filter(c=>c.id.startsWith("m11-curated-")).length>=3,lang+": missing authored cases");
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,lang+": duplicate cases");
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,lang+": insufficient exam questions");
 for(const q of questions){assert(q.options?.some(o=>o.id===q.correctAnswer),lang+": missing answer "+q.id);assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,lang+": duplicate options "+q.id);}
 snapshots[lang]={ids,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].ids,snapshots.RU.ids);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy missing in theory");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy missing in media");
console.log("Module 11 trilingual scientific structure review passed");
