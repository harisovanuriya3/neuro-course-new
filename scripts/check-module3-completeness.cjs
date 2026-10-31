const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const {validateTest}=load("lib/tests/engine.ts");
const ids={};
for(const lang of ["RU","EN","KZ"]){
 const theory=getLesson(3,"theory",lang),practice=getLesson(3,"practice",lang),cases=getLesson(3,"cases",lang),tests=getLesson(3,"tests",lang),media=getLesson(3,"media",lang);
 assert(theory&&practice&&cases&&tests&&media,`${lang}: missing module 3 section`);
 validateTest(tests);
 const names=theory.sections.map(s=>s.id);
 for(const name of ["neuron-compartments","glial-physiology","myelin-clinical","membrane-transport","synaptic-physiology","blood-brain-barrier","glia-clinical","axon-cable","neuronal-metabolism","axon-transport","microglia-development"])assert(names.includes(name),`${lang}: missing ${name}`);
 assert.equal(new Set(names).size,names.length,`${lang}: duplicate theory IDs`);
 assert(cases.cases.length>=20,`${lang}: insufficient clinical cases`);
 assert.equal(new Set(cases.cases.map(c=>c.id)).size,cases.cases.length,`${lang}: duplicate cases`);
 assert(cases.cases.filter(c=>c.id.startsWith("m3-curated-")).length>=5,`${lang}: missing five authored clinical cases`);
 assert(practice.sections.some(s=>s.title.includes(lang==="RU"?"Нернста":lang==="EN"?"Nernst":"Нернст")),`${lang}: missing quantitative membrane laboratory`);
 assert(Object.values(tests.nodes).filter(n=>n.type==="question").length>=20,`${lang}: insufficient exam items`);
 ids[lang]={theory:names,cases:cases.cases.map(c=>c.id)};
}
for(const lang of ["EN","KZ"]){assert.deepEqual(ids[lang].theory,ids.RU.theory);assert.deepEqual(ids[lang].cases,ids.RU.cases);}
const section=fs.readFileSync("components/SectionContent.tsx","utf8");
const resources=fs.readFileSync("app/resources/page.tsx","utf8");
const anatomy=fs.readFileSync("components/AdvancedAnatomyReference.tsx","utf8");
assert(section.includes("<AdvancedAnatomyReference moduleId={Number(moduleId)} language={language} />"),"Anatomy absent in theory");
assert(resources.includes("<AdvancedAnatomyReference moduleId={moduleId} language={lang} />"),"Anatomy absent in media");
assert(anatomy.includes("Anatomy_of_neuron.png"),"Neuron anatomy reference missing");
console.log("Module 3 structural trilingual and visual placement audit passed");
