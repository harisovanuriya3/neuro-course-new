const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const summary={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(2,"theory",lang);
 const cases=getLesson(2,"cases",lang);
 const tests=getLesson(2,"tests",lang);
 const practice=getLesson(2,"practice",lang);
 const media=getLesson(2,"media",lang);
 assert(theory&&cases&&tests&&practice&&media,`${lang}: missing module 2 lesson`);
 validateTest(tests);
 assert(theory.sections.length>=5,`${lang}: theory sections too sparse`);
 const theoryIds=theory.sections.map(s=>s.id);
 assert(theoryIds.includes("eeg-biophysics")&&theoryIds.includes("evoked-potentials")&&theoryIds.includes("method-comparison-clinical"),`${lang}: missing dedicated method chapters`);
 assert.equal(new Set(theoryIds).size,theoryIds.length,`${lang}: duplicate theory sections`);
 assert(practice.sections.length>=6,`${lang}: fewer than 6 practice sections`);
 assert(practice.sections.some(st=>st.title.includes(lang==="RU"?"Монтаж ЭЭГ":lang==="EN"?"EEG montage":"ЭЭГ монтажы")),`${lang}: missing EEG montage station`);
 assert(practice.sections.some(st=>st.title.includes(lang==="RU"?"Усреднение":lang==="EN"?"averaging":"орташалау")),`${lang}: missing evoked averaging station`);
 assert(cases.cases.length>=11,`${lang}: fewer than 11 clinical/situational cases`);
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,`${lang}: duplicate clinical case IDs`);
 assert(cases.cases.some(c=>c.id==="m2-evoked-averaging"),`${lang}: missing artifact discrimination case`);
 for(const c of cases.cases){
  assert(c.situation?.length>=70,`${lang}: case ${c.id} too brief`);
  assert(c.explanation?.length>=2,`${lang}: case ${c.id} lacks worked rationale`);
 }
 summary[lang]={theoryIds,caseIds:cases.cases.map(c=>c.id),testNodes:Object.keys(tests.nodes).length};
}
for(const lang of ["EN","KZ"]){
 assert.deepEqual(summary[lang].theoryIds,summary.RU.theoryIds,`${lang}: theory differs from RU`);
 assert.deepEqual(summary[lang].caseIds,summary.RU.caseIds,`${lang}: clinical case IDs differ from RU`);
}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
const visuals=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Theory missing anatomy");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Library missing anatomy");
assert(visuals.includes("International_10-20_system_for_EEG-MCN.png"),"Missing EEG electrode reference");
assert(section.includes("evoked-averaging-"),"Missing module 2 evoked potential figure");
console.log("Module 2 structural, trilingual, clinical, exam and visual-link checks passed.",JSON.stringify(summary));
