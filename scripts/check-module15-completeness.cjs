const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(15,"theory",lang),practice=getLesson(15,"practice",lang),cases=getLesson(15,"cases",lang),tests=getLesson(15,"tests",lang),media=getLesson(15,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,lang+": missing module 15 lesson");
 validateTest(tests);
 assert(theory.sections.length>=5,lang+": too little theory");
 assert.equal(new Set(theory.sections.map(s=>s.id)).size,theory.sections.length,lang+": duplicate theory IDs");
 const labs=lang==="RU"?["гипоталамо-гипофизарная","осморегуляция","циркадный","терморегуляция"]:lang==="EN"?["hypothalamic-pituitary","osmoregulation","circadian","thermoregulation"]:["гипоталамус-гипофиз","осморегуляция","тәуліктік","жылу"];
 for(const lab of labs)assert(practice.sections.some(s=>s.title.toLocaleLowerCase().includes(lab.toLocaleLowerCase())),lang+": missing lab "+lab);
 assert(cases.cases.length>=20,lang+": insufficient clinical cases");
 assert(cases.cases.filter(c=>c.id.startsWith("m15-curated-")).length>=3,lang+": missing authored clinical cases");
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,lang+": duplicate case IDs");
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,lang+": insufficient exam questions");
 for(const q of questions){assert(q.options?.some(o=>o.id===q.correctAnswer),lang+": invalid answer key "+q.id);assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,lang+": repeated choices "+q.id);}
 snapshots[lang]={ids:theory.sections.map(s=>s.id),caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].ids,snapshots.RU.ids);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const theoryView=fs.readFileSync("components/SectionContent.tsx","utf8");
const mediaView=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(theoryView.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy missing from theory");
assert(mediaView.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy missing from media");
assert(anatomy.includes("15:[")&&anatomy.includes("Hypothalamus"),"Hypothalamic anatomy reference missing");
console.log("Module 15 trilingual content structure and media audit passed");
