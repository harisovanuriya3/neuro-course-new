const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(13,"theory",lang),practice=getLesson(13,"practice",lang),cases=getLesson(13,"cases",lang),tests=getLesson(13,"tests",lang),media=getLesson(13,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,lang+": missing module 13 lesson");
 validateTest(tests);
 const ids=theory.sections.map(s=>s.id);
 for(const id of ["cerebellar-macroanatomy","cerebellar-microcircuit","cerebellar-control-learning","cerebellar-clinical-localization"])assert(ids.includes(id),lang+": missing theory "+id);
 assert.equal(new Set(ids).size,ids.length,lang+": duplicate theory IDs");
 const labels=lang==="RU"?["Анатомическая лаборатория","пальце-носовая","сенсомоторная адаптация","мозжечковая"]:lang==="EN"?["Anatomy lab","finger-to-nose","sensorimotor adaptation","cerebellar"]:["Анатомиялық зертхана","саусақ-мұрын","сенсомоторлық бейімделу","мишық"];
 for(const label of labels)assert(practice.sections.some(s=>s.title.toLocaleLowerCase().includes(label.toLocaleLowerCase())),lang+": missing lab "+label);
 assert(cases.cases.length>=20,lang+": fewer than 20 clinical cases");
 assert(cases.cases.filter(c=>c.id.startsWith("m13-curated-")).length>=4,lang+": missing authored cases");
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,lang+": duplicate case IDs");
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,lang+": fewer than 20 exam questions");
 for(const q of questions){assert(q.options?.length>=3&&q.options.some(o=>o.id===q.correctAnswer),lang+": missing answer "+q.id);assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,lang+": duplicate options "+q.id);}
 snapshots[lang]={ids,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].ids,snapshots.RU.ids);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const theoryView=fs.readFileSync("components/SectionContent.tsx","utf8");
const mediaView=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(theoryView.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy missing from theory");
assert(mediaView.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy missing from media");
assert(anatomy.includes("Cerebellum_histology_1.jpg")&&anatomy.includes("Diagram_of_the_Microanatomy_of_Human_Cerebellar_Cortex.svg"),"Cerebellum images absent");
console.log("Module 13 cerebellum trilingual structural QA passed");
