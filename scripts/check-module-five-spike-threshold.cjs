// Module 5 recap: keep firing threshold distinct from synaptic summation.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const source=fs.readFileSync("content/course-foundation/module-five-summary.ts","utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
for(const term of ["RU: [","EN: [","KZ: [","потенциал-зависимых Na⁺-каналов","voltage-gated Na⁺ channels","кернеуге тәуелді Na⁺ арналарының"]){
 assert(source.includes(term),"Missing localized recap term: "+term);
}
for(const lang of ["RU","EN","KZ"]){
 assert(registry.includes('createModuleFiveSummary("'+lang+'")'),"Summary not registered for "+lang);
}
assert(!source.includes("Spike threshold depends on the combined voltage and conductance changes"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 5 recap wording, three languages, registration and disabled previews.");
console.log("NOTE: source checks do not replace TypeScript or browser tests.");
