const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(5,"theory",lang),practice=getLesson(5,"practice",lang),cases=getLesson(5,"cases",lang),tests=getLesson(5,"tests",lang),media=getLesson(5,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,`${lang}: missing module 5 content`);
 validateTest(tests);
 const theoryIds=theory.sections.map(s=>s.id);
 assert(theoryIds.includes("quantal-calcium-plasticity"),`${lang}: missing synaptic mechanism chapter`);
 assert.equal(new Set(theoryIds).size,theoryIds.length,`${lang}: duplicate theory anchors`);
 assert(practice.sections.length>=7,`${lang}: insufficient practice sections`);
 assert(practice.sections.some(s=>s.title.includes(lang==="RU"?"Квантовое":lang==="EN"?"Quantal":"Кванттық")),`${lang}: missing quantal lab`);
 assert(cases.cases.length>=20,`${lang}: fewer than twenty cases`);
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,`${lang}: duplicate case IDs`);
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,`${lang}: fewer than twenty exam questions`);
 for(const q of questions){assert(q.options.length>=3 && q.options.some(o=>o.id===q.correctAnswer),`${lang}: malformed exam item ${q.id}`);}
 const normalizedSituations=cases.cases.map(c=>c.situation.trim().toLocaleLowerCase());
 assert.equal(new Set(normalizedSituations).size,normalizedSituations.length,`${lang}: duplicated case situations`);
 for(const c of cases.cases){
  assert(c.stages?.length>0 && c.stages.every(st=>st.questions?.length>0),`${lang}/${c.id}: missing clinical reasoning prompts`);
  assert(c.explanation?.length>0 && c.explanation.every(t=>typeof t==="string"&&t.trim().length>=35),`${lang}/${c.id}: explanation too brief`);
 }
 for(const q of questions){
  assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,`${lang}/${q.id}: duplicate choices`);
  assert(typeof q.explanation==="string"&&q.explanation.trim().length>=40,`${lang}/${q.id}: inadequate answer explanation`);
 }
 snapshots[lang]={theoryIds,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].theoryIds,snapshots.RU.theoryIds);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const theoryComponent=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(theoryComponent.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Missing anatomy in theory");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Missing anatomy in library");
assert(anatomy.includes("Neuron_synapse.svg"),"Module 5 synapse anatomical reference missing");
console.log("Module 5 content structure and trilingual check passed");
