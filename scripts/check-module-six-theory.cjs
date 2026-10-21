// Module 6 theory registration and three-language content smoke test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const src=fs.readFileSync("content/course-foundation/module-six-theory.ts","utf8");
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"]){
  assert(src.includes("\n "+lang+":["),"Missing "+lang+" theory");
  assert(registry.includes('createModuleSixTheory("'+lang+'"') || registry.includes('moduleSixReviewedTheory("'+lang+'"'),"Missing "+lang+" registration");
}
for(const id of ["summation-mechanisms","shunting-and-threshold"])
  assert(src.includes(id),"Missing theory section "+id);
assert(src.includes("Presynaptic versus postsynaptic inhibition"),"Presynaptic comparison missing");
console.log("PASS: module 6 theory localized and registered (source-level checks).");
