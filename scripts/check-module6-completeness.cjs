const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const snapshots={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(6,"theory",lang),practice=getLesson(6,"practice",lang),cases=getLesson(6,"cases",lang),tests=getLesson(6,"tests",lang),media=getLesson(6,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,`${lang}: missing module 6 content`);
 validateTest(tests);
 const theoryIds=theory.sections.map(s=>s.id);
 assert(theoryIds.includes("dendritic-integration-network-inhibition"),`${lang}: missing expanded theory`);
 assert.equal(new Set(theoryIds).size,theoryIds.length,`${lang}: duplicate theory IDs`);
 assert(practice.sections.length>=7,`${lang}: fewer than seven practice sections`);
 assert(practice.sections.some(s=>s.title.includes(lang==="RU"?"шунтирующее":lang==="EN"?"shunting":"шунттаушы")),`${lang}: missing inhibition laboratory`);
 assert(cases.cases.length>=20,`${lang}: insufficient cases`);
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,`${lang}: duplicate case IDs`);
 assert(Object.values(tests.nodes).filter(n=>n.type==="question").length>=20,`${lang}: insufficient test questions`);
 snapshots[lang]={theoryIds,caseIds:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(snapshots[lang].theoryIds,snapshots.RU.theoryIds);assert.deepEqual(snapshots[lang].caseIds,snapshots.RU.caseIds);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const library=fs.readFileSync("app/resources/page.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy absent in theory");
assert(library.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy absent in media");
console.log("Module 6 structural trilingual content acceptance passed");
