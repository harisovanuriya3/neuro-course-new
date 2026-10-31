const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const summaries={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(4,"theory",lang),practice=getLesson(4,"practice",lang),cases=getLesson(4,"cases",lang),tests=getLesson(4,"tests",lang),media=getLesson(4,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,`${lang}: module 4 missing content`);
 validateTest(tests);
 const ids=theory.sections.map(s=>s.id);
 for(const id of ["ion-gradient-thermodynamics","goldman-resting-potential","voltage-gated-channel-dynamics"])assert(ids.includes(id),`${lang}: missing chapter ${id}`);
 assert.equal(new Set(ids).size,ids.length,`${lang}: duplicate theory anchors`);
 assert(practice.sections.length>=8,`${lang}: fewer than eight practice sections`);
 assert(practice.sections.some(s=>s.title.includes(lang==="RU"?"Нернст":lang==="EN"?"Nernst":"Нернст")),`${lang}: missing Nernst laboratory`);
 assert(practice.sections.some(s=>s.title.includes(lang==="RU"?"гиперкалиемии":lang==="EN"?"hyperkalemia":"Гиперкалиемия")),`${lang}: missing clinical laboratory`);
 assert(cases.cases.length>=20,`${lang}: fewer than twenty clinical cases`);
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,`${lang}: duplicate cases`);
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,`${lang}: fewer than twenty test questions`);
 for(const q of questions){assert(q.options.length>=3,`${lang}: malformed question ${q.id}`);assert(q.options.some(o=>o.id===q.correctAnswer),`${lang}: missing answer ${q.id}`);}
 summaries[lang]={ids,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(summaries[lang].ids,summaries.RU.ids);assert.deepEqual(summaries[lang].caseIds,summaries.RU.caseIds);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy missing in theory");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy missing in media");
assert(anatomy.includes("Action_potential_propagation_animation.gif"),"Module 4 action potential visual absent");
console.log("Module 4 technical, educational and trilingual structure audit passed");
