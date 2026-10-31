const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(8,"theory",lang),practice=getLesson(8,"practice",lang),cases=getLesson(8,"cases",lang),tests=getLesson(8,"tests",lang),media=getLesson(8,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,lang+": missing module 8 lesson");
 validateTest(tests);
 const ids=theory.sections.map(s=>s.id);
 for(const id of ["dorsal-column-pathway","anterolateral-pathway","corticospinal-pathway"])assert(ids.includes(id),lang+": missing "+id);
 assert.equal(new Set(ids).size,ids.length,lang+": duplicate theory IDs");
 const labs=lang==="RU"?["задние столбы","кортикоспинальный","карта проводящих"]:lang==="EN"?["dorsal columns","corticospinal","tract mapping"]:["артқы бағандар","кортикоспиналдық","өткізгіш жолдарды"];
 for(const lab of labs)assert(practice.sections.some(s=>s.title.toLocaleLowerCase().includes(lab)),lang+": missing laboratory "+lab);
 assert(cases.cases.length>=20,lang+": insufficient clinical cases");
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,lang+": duplicate case IDs");
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,lang+": insufficient exam questions");
 for(const q of questions)assert(q.options?.some(o=>o.id===q.correctAnswer),lang+": invalid answer key "+q.id);
 snapshots[lang]={ids,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].ids,snapshots.RU.ids);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const media=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Theory missing anatomy");
assert(media.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Media library missing anatomy");
assert(anatomy.includes("Somatic_Nervous_System_Image.svg"),"Module 8 anatomy reference missing");
console.log("Module 8 structural trilingual and media-link audit passed");
