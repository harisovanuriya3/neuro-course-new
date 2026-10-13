// Run with: node scripts/check-reviewed-exam-items.cjs
// Structural checks only; expert scientific review remains necessary.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const reviewed=fs.readFileSync("content/reviewed-exam-items.ts","utf8");
const bank=fs.readFileSync("content/exam-bank.ts","utf8");
const additional=fs.readFileSync("content/additional-reviewed-exam-items.ts","utf8");
for(const id of [2,3,4,5]){
 assert(new RegExp("^"+id+":\\{","m").test(reviewed),`Missing reviewed module ${id}`);
}
for(const lang of ["RU","EN","KZ"]){
 const count=(reviewed.match(new RegExp("^"+lang+":\\{prompt:","gm"))||[]).length;
 assert.equal(count,4,`Expected 4 reviewed ${lang} items; got ${count}`);
}
for(const id of [6,7])assert(new RegExp("^"+id+":\\\\{","m").test(additional),`Missing reviewed module ${id}`);
for(const lang of ["RU","EN","KZ"])assert.equal((additional.match(new RegExp("^"+lang+":\\\\{prompt:","gm"))||[]).length,2,`Expected 2 additional ${lang} items`);
assert(bank.includes("additionalReviewedItem(topic.id,lang)"),"Additional reviewed questions not wired");
assert(bank.includes("if(reviewedForTopic){"),"Reviewed items must be used without template padding");
assert(bank.includes("continue;\n  }\n  for(let n=0;n<40;n++)"),"Template loop must skip reviewed modules");
assert(!bank.includes('correctOrder:["stimulus","a","b","response"]'),"Unverified glossary sequence keys must be absent");
console.log("Reviewed item source and exam-bank wiring checks passed (6 modules × 3 languages). Scientific and runtime validation are still required.");
