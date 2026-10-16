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
console.log("PASS: module 4 GHK calculation and independent, trilingual illustrative AP trace.");
