// Structural and pedagogical regression checks for the module 4 membrane lab.
// This does not replace numerical validation, scientific review or browser testing.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const src=fs.readFileSync("components/MembraneElectrophysiologyLab.tsx","utf8");
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
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
const theory=fs.readFileSync("content/course-foundation/module-four-theory.ts","utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleFourTheory("'+lang+'"'),"Module 4 theory not registered: "+lang);
 assert(theory.includes("\n "+lang+": ["),"Missing theory language "+lang);
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
console.log("PASS: module 4 GHK calculation and independent, trilingual illustrative AP trace.");
