// Strict module-by-module structural checks for authored examination sources.
// Run from the repository root: node scripts/check-reviewed-exam-items.cjs
// Coverage tests do NOT establish scientific accuracy.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const bank=read("content/exam-bank.ts");
const first=read("content/reviewed-module-one-exam.ts");
assert(bank.includes("firstModuleReviewed(lang).map"),"Module 1 reviewed cases not wired");
for(const lang of ["RU","EN","KZ"])
 assert(first.includes(lang+":["),"Module 1 base cases missing "+lang);

const groups=[
 ["content/reviewed-exam-items.ts",2,5],
 ["content/additional-reviewed-exam-items.ts",6,7],
 ["content/reviewed-pathway-exam-items.ts",8,11],
 ["content/reviewed-advanced-exam-items.ts",12,25],
 ["content/supplementary-reviewed-exam-items.ts",1,7],
 ["content/supplementary-systems-exam-items.ts",8,25],
 ["content/third-reviewed-exam-items.ts",1,10],
 ["content/third-systems-exam-items.ts",11,25],
];
for(const [file,min,max] of groups){
 const source=read(file);
 const starts=[...source.matchAll(/(?:^|\n)\s*(\d+):\{\s*\n/g)];
 const ids=starts.map(x=>Number(x[1]));
 assert.equal(ids.length,max-min+1,file+": unexpected number of module entries");
 assert.deepEqual([...ids].sort((a,b)=>a-b),
    Array.from({length:max-min+1},(_,i)=>min+i),
    file+": missing/duplicate module IDs");
 for(let i=0;i<starts.length;i++){
  const start=starts[i].index;
  const stop=i+1<starts.length?starts[i+1].index:source.lastIndexOf("\n};");
  assert(stop>start,file+": module "+ids[i]+" could not be isolated");
  const segment=source.slice(start,stop);
  const labels=[...segment.matchAll(/\b(RU|EN|KZ):\s*\{/g)].map(m=>m[1]);
  assert.equal(labels.length,3,file+": module "+ids[i]+" must have exactly RU, EN, KZ entries");
  assert.equal(new Set(labels).size,3,file+": module "+ids[i]+" duplicates language");
  for(const lang of ["RU","EN","KZ"])assert(labels.includes(lang),file+": missing "+lang+" in module "+ids[i]);
 }
}
for(const name of ["reviewedExamItem","additionalReviewedItem","reviewedPathwayItem",
 "reviewedAdvancedItem","supplementarySystemsItem","thirdReviewedItem","thirdSystemsItem"]){
 assert(bank.includes(name+"(topic.id,lang)"),"Exam bank missing "+name);
}
assert(bank.includes("if(reviewedForTopic){"),"Authored cases must bypass generated templates");
assert(!bank.includes("for(let n=0;n<40;n++)"),"Generic 40-item generator must remain absent");
assert(bank.includes("Missing authored exam item"),"Missing module must fail visibly");
assert(!bank.includes('correctOrder:["stimulus","a","b","response"]'),"Invalid generic causal sequence remains");

const clinical=read("content/exam-bank.ts");
const expected={
 "syringomyelia":9,
 "level-localization":9,
 "wallenberg":10,
 "vor":21,
 "red-nucleus":10,
 "colliculi":10,
 "reticular":10,
 "respiratory-control":10
};
for(const [slug,moduleId] of Object.entries(expected)){
 assert(clinical.includes('q('+moduleId+',"'+slug+'",'),
  "Clinical neuroanatomy case "+slug+" must be in module "+moduleId);
}
console.log("PASS: 25 modules × RU/EN/KZ reviewed items, distinct source entries and 8 clinical case locations.");
console.log("NOTE: requires further scientific, translation and runtime review.");
