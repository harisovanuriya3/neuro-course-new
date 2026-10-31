const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(10,"theory",lang),practice=getLesson(10,"practice",lang),cases=getLesson(10,"cases",lang),tests=getLesson(10,"tests",lang),media=getLesson(10,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,lang+": missing module 10 lesson");
 validateTest(tests);
 const ids=theory.sections.map(s=>s.id);
 for(const id of ["brainstem-organization","cranial-nerve-localization","brainstem-vital-circuits"])assert(ids.includes(id),lang+": missing "+id);
 assert.equal(new Set(ids).size,ids.length,lang+": duplicate theory IDs");
 const labs=lang==="RU"?["Анатомическая карта","Перекрёстные","Барорефлекс","Дыхательные"]:lang==="EN"?["anatomical map","Crossed","Baroreflex","Respiratory"]:["анатомиялық картасы","Айқасқан","Барорефлекс","Тыныс"];
 for(const lab of labs)assert(practice.sections.some(s=>s.title.toLocaleLowerCase().includes(lab.toLocaleLowerCase())),lang+": missing lab "+lab);
 assert(cases.cases.length>=20,lang+": fewer than 20 cases");
 assert(cases.cases.filter(c=>c.id.startsWith("m10-curated-")).length>=4,lang+": missing authored clinical cases");
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,lang+": duplicate case IDs");
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,lang+": fewer than 20 exam questions");
 for(const q of questions){assert(q.options?.some(o=>o.id===q.correctAnswer),lang+": missing answer "+q.id);assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,lang+": duplicate options "+q.id);}
 snapshots[lang]={ids,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].ids,snapshots.RU.ids);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy missing in theory");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy missing in media");
console.log("Module 10 trilingual theory practical clinical and exam structural review passed");
