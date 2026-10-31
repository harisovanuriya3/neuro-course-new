const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(7,"theory",lang),practice=getLesson(7,"practice",lang),cases=getLesson(7,"cases",lang),tests=getLesson(7,"tests",lang),media=getLesson(7,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,`${lang}: missing module 7 content`);
 validateTest(tests);
 const theoryIds=theory.sections.map(s=>s.id);
 for(const id of ["reflex-arc-physiology","stretch-and-golgi","conditioned-learning"])assert(theoryIds.includes(id),`${lang}: missing theory chapter ${id}`);
 assert.equal(new Set(theoryIds).size,theoryIds.length,`${lang}: duplicate theory anchors`);
 const labs=lang==="RU"?["Коленный рефлекс","Веретено","Латентность","Условный рефлекс","Гипорефлексия"]:lang==="EN"?["Patellar reflex","Spindle","Latency","Conditioning","Hypo-"]:["Тізе рефлексінің","Ұршық","Латенттілік","Шартты рефлекс","Гипо-"];
 for(const lab of labs)assert(practice.sections.some(s=>s.title.includes(lab)),`${lang}: missing laboratory ${lab}`);
 assert(cases.cases.length>=20,`${lang}: insufficient cases`);
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,`${lang}: duplicate cases`);
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,`${lang}: insufficient exam questions`);
 const situations=cases.cases.map(c=>c.situation.trim().toLocaleLowerCase());
 assert.equal(new Set(situations).size,situations.length,`${lang}: repeated case situations`);
 for(const c of cases.cases){
  assert(c.stages?.length>0 && c.stages.every(st=>st.questions?.length>0),`${lang}/${c.id}: no clinical reasoning question`);
  assert(c.explanation?.length>0 && c.explanation.every(t=>typeof t==="string"&&t.trim().length>=25),`${lang}/${c.id}: inadequate explanation`);
 }
 for(const q of questions){
  assert(q.options?.length>=3 && q.options.some(o=>o.id===q.correctAnswer),`${lang}/${q.id}: invalid answer key`);
  assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,`${lang}/${q.id}: repeated options`);
 }
 snapshots[lang]={theoryIds,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].theoryIds,snapshots.RU.theoryIds);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy absent from theory");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy absent from media library");
assert(anatomy.includes("General_Reflex_Diagram.png"),"Module 7 reflex image reference absent");
console.log("Module 7 structural and trilingual content review passed");
