// Structural and pedagogical regression checks for the module 4 membrane lab.
// This does not replace numerical validation, scientific review or browser testing.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const src=fs.readFileSync("components/MembraneElectrophysiologyLab.tsx","utf8");
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
assert(src.includes("disabled={hasRun}"),"Prediction lock is required");
assert(route.includes('<MembraneElectrophysiologyLab language={lang} />'),"Module 4 lab route missing");
assert(src.includes("const nernst="),"Nernst potential calculation missing");
assert(src.includes("const ghk="),"Two-ion GHK calculation missing");
assert(src.includes("traceRest=-70,tracePeak=30"),"AP reference trace must have a fixed baseline and peak");
assert(src.includes("aria-label={c.trace}"),"Trace must have an explanatory accessible label");
assert(src.includes("<p>{c.trace}</p>"),"Trace approximation must be disclosed visually");
assert.equal((src.match(/trace:"/g)||[]).length,3,"RU/EN/KZ need separate model notices");
const wave=src.slice(src.indexOf(" const waveform="),src.indexOf("\n const phase="));
assert(wave.includes("traceRest")&&wave.includes("tracePeak"),"Trace must use fixed reference values");
assert(!wave.includes("values.vm"),"GHK Vm must not be reused as a fixed-shape AP baseline");
assert(!wave.includes("35-"),"Fixed overshoot must not be forced onto varying ion gradients");
assert(src.includes("Ion concentrations affect only the Vm estimate"),"Model limitation must be explained");
assert(src.includes("Interval after an assumed previous AP"),"Prior spike assumption must be clear");
const theory=fs.readFileSync("content/course-foundation/module-four-theory.ts","utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleFourTheory("'+lang+'"'),"Module 4 theory not registered: "+lang);
 assert(theory.includes("\n "+lang+": ["),"Missing theory language "+lang);
}
const foundationTopic=fs.readFileSync("content/course-foundation/topics.ts","utf8");
for(const fragment of ["рекрутированием волокон","recruit additional fibers","қосымша талшықтардың іске қосылуымен"]){
 assert(foundationTopic.includes(fragment),"Module 4 foundational interpretation lacks nuance: "+fragment);
}
assert(!foundationTopic.includes("Suprathreshold stimulus strength is encoded mainly by firing frequency"),
 "Overgeneralized single-axon rate-coding statement must not return");
// Prevent conflating a single axon's all-or-none spike with frequency coding
// under sustained stimulation or population recruitment in a nerve trunk.
for(const marker of ["рекрутирование волокон","recruit more fibers","қосымша талшықтар"]){
 assert(theory.includes(marker),"Module 4 theory lacks coding caveat: "+marker);
}
assert(theory.includes("module-four-nernst-goldman")&&theory.includes("module-four-model-limits"),
 "Missing explanatory sections for ionic equilibrium and simulation limits");
for(const marker of ["−95,0","−71,2","−95.0","−71.2","−70 → +30","Na⁺","K⁺","Cl⁻"]){
 assert(theory.includes(marker),"Missing reviewed physiology marker: "+marker);
}
const R=8.314,F=96485,T=310.15;
const ek=1000*R*T/F*Math.log(4/140);
const ena=1000*R*T/F*Math.log(145/12);
const vm=1000*R*T/F*Math.log((4+.04*145)/(140+.04*12));
assert(Math.abs(ek+95.0)<.1&&Math.abs(ena-66.6)<.1&&Math.abs(vm+71.2)<.1,
 "Default Nernst/Goldman example does not match the implemented lab formula");

// Authored practice must replace the generic module 4 template in every language.
const practice=fs.readFileSync("content/course-foundation/module-four-practice.ts","utf8");
for(const lang of ["RU","EN","KZ"]){
 assert(practice.includes("\n  "+lang+": {"),"Module 4 practice missing "+lang);
 assert(registry.includes('createModuleFourPractice("'+lang+'", moduleFourBasePractice("'+lang+'"))'),
   "Module 4 practice not registered: "+lang);
}
assert(practice.includes("type: 'response'")&&practice.includes("type: 'answer'"),
 "Module 4 practice must support prediction before explanation");
assert(practice.includes("12 × 0,55 = 6,6")&&practice.includes("12 × 0.55 = 6.6"),
 "RU/EN model threshold examples missing");
assert(practice.includes("−76,5")&&practice.includes("−62,0")&&practice.includes("−76.5")&&practice.includes("−62.0"),
 "Trilingual 8 mM predictions missing");
const ek8=1000*R*T/F*Math.log(8/140);
const vm8=1000*R*T/F*Math.log((8+.04*145)/(140+.04*12));
assert(Math.abs(ek8+76.5)<.1&&Math.abs(vm8+62.0)<.1,
 "8 mM predictions do not agree with simulator's equations");
const lab=src;
assert(lab.includes('refractory=interval<2?"absolute":interval<5?"relative":"ready"'),
 "Refractory rule has changed; re-review practice model answers");
assert(lab.includes('refractory==="relative"?.55:1')&&lab.includes("spike=effective>=10"),
 "Threshold rule has changed; re-review practice model answers");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git?.deploymentEnabled?.["refactor/evidence-based-assessment-audit"],false,
 "Do not enable preview deploys on review branch");
console.log("PASS: module 4 authored practice, 3 locales, numerical examples, lab-rule consistency, preview guard.");

console.log("PASS: module 4 GHK calculation and independent, trilingual illustrative AP trace.");



// Module 4 learning objectives: five authored physiological outcomes per locale.
const summarySource=fs.readFileSync("content/course-foundation/module-four-summary.ts","utf8");
const objectiveSource=summarySource.slice(summarySource.indexOf("const objectiveItems:"));
assert(summarySource.includes("export function createModuleFourObjectives(language: Language): ObjectivesLesson"),
 "Module 4 objectives factory missing");
for(const lang of ["RU","EN","KZ"]){
 const block=objectiveSource.match(new RegExp("  "+lang+": \\[([\\s\\S]*?)\\n  \\],"));
 assert(block,"Module 4 objectives missing "+lang);
 const items=(block[1].match(/^\s*\['/gm)||[]);
 assert.equal(items.length,5,"Module 4 objectives must have five items in "+lang);
 assert(registry.includes('createModuleFourObjectives("'+lang+'")'),
  "Module 4 objectives route missing "+lang);
}
assert(summarySource.includes("Na⁺/K⁺-АТФаза")&&summarySource.includes("Na⁺/K⁺-ATPase"),
 "Objective must distinguish gradient maintenance from rapid repolarization");
assert(summarySource.includes("4 и 8 мМ")&&summarySource.includes("4 and 8 mM"),
 "Objective must specify a controlled potassium comparison");
console.log("PASS: module 4 measurable objectives × RU/EN/KZ and route registration.");
