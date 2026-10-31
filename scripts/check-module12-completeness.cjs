const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(12,"theory",lang),practice=getLesson(12,"practice",lang),cases=getLesson(12,"cases",lang),tests=getLesson(12,"tests",lang),media=getLesson(12,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,lang+": missing module 12 lesson");
 validateTest(tests);
 const ids=theory.sections.map(s=>s.id);
 for(const id of ["basal-ganglia-circuits","dopamine-basal-ganglia","movement-disorder-localization"])assert(ids.includes(id),lang+": missing "+id);
 assert.equal(new Set(ids).size,ids.length,lang+": duplicate theory IDs");
 const labels=lang==="RU"?["Прямой","Дофамин","Брадикинезия","Количественный"]:lang==="EN"?["Direct","Dopamine","Bradykinesia","Quantifying"]:["Тікелей","Дофамин","Брадикинезия","сандық"];
 for(const label of labels)assert(practice.sections.some(s=>s.title.includes(label)),lang+": missing lab "+label);
 assert(cases.cases.length>=20,lang+": fewer than 20 cases");
 assert(cases.cases.filter(c=>c.id.startsWith("m12-curated-")).length>=3,lang+": missing clinical cases");
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,lang+": duplicate case IDs");
 const questions=Object.values(tests.nodes).filter(n=>n.type==="question");
 assert(questions.length>=20,lang+": fewer than 20 exam questions");
 for(const q of questions){assert(q.options?.some(o=>o.id===q.correctAnswer),lang+": missing answer "+q.id);assert.equal(new Set(q.options.map(o=>o.text.trim().toLocaleLowerCase())).size,q.options.length,lang+": duplicate options "+q.id);}
 const caseSituations=cases.cases.map(c=>c.situation.trim().toLocaleLowerCase());
 assert.equal(new Set(caseSituations).size,caseSituations.length,lang+": duplicate clinical situations");
 for(const c of cases.cases){
  assert(c.stages?.length>0 && c.stages.every(stage=>stage.questions?.length>0),lang+": missing reasoning prompts "+c.id);
  assert(c.explanation?.length>0 && c.explanation.every(t=>typeof t==="string"&&t.trim().length>=25),lang+": missing substantive case explanation "+c.id);
 }
 for(const q of questions){
  assert(q.options?.length>=3,lang+": too few options "+q.id);
  assert(q.options.every(o=>typeof o.text==="string"&&o.text.trim().length>0),lang+": blank answer option "+q.id);
 }
 snapshots[lang]={ids,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].ids,snapshots.RU.ids);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const theoryView=fs.readFileSync("components/SectionContent.tsx","utf8");
const mediaView=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(theoryView.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Theory anatomy missing");
assert(mediaView.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Media anatomy missing");
assert(anatomy.includes("Basal_ganglia_circuits.svg"),"Basal ganglia anatomy reference missing");
console.log("Module 12 trilingual scientific structure and anatomy check passed");
