// Module 16 structural checks; run: node scripts/check-module16-content.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const theory=read("content/course-foundation/module-sixteen-theory.ts");
const pretest=read("content/course-foundation/module-sixteen-pretest.ts");
const activities=read("content/course-foundation/module-sixteen-activities.ts");
const foundation=read("content/course-foundation/index.ts");
const modulePage=read("app/modules/[id]/page.tsx");
const resources=read("app/resources/page.tsx");
const visual=read("components/ModuleSixteenVisual.tsx");
const lab=read("app/module-16-lab/page.tsx");
const finalTest=read("content/course-foundation/module-sixteen-final-test.ts");
const expanded=read("content/course-foundation/module-sixteen-expanded-questions.ts");
for(const language of ["RU","EN","KZ"]){
 for(const [name,text] of Object.entries({theory,pretest,activities,visual,lab})){
  assert(text.includes(language),name+" missing "+language);
 }
}
for(const id of ["functional-networks","amygdala","hippocampus","motivation","emotion-body","regulation"]){
 assert(theory.includes(id),"missing theory section "+id);
}
for(const fn of ["createModuleSixteenTheory","createModuleSixteenPretest","extendModuleSixteenCases","extendModuleSixteenPractice"]){
 assert(foundation.includes(fn),"not registered: "+fn);
}
assert(modulePage.includes("<ModuleSixteenVisual language={lang} />"),"visual not embedded");
assert(modulePage.includes("/module-16-lab"),"lab not linked from module");
assert(resources.includes("/module-16-lab"),"lab not linked from resources");
assert(visual.includes("AdvancedAnatomyReference"),"attributed anatomical reference missing");
assert(activities.includes("module-16-clinical-"),"clinical cases missing");
assert(activities.includes('type:"answer"'),"practice feedback missing");
assert(lab.includes("Math.random()"),"reward simulation missing");
assert(foundation.includes("extendModuleSixteenFinalTest"),"final exam not registered");
assert(finalTest.includes("mainIds:[...base.mainIds,...ids]"),"final exam main sequence not expanded");
assert(finalTest.includes("previous.onCorrect=ids[0]"),"final exam flow not linked");
assert(expanded.includes("module-16-expanded-"),"expanded question bank missing");
console.log("Module 16 structural QA passed: RU/EN/KZ, six topics, cases, practice, tests, lab and anatomical reference.");
