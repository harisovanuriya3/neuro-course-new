// Structural source checks; run: node scripts/check-reviewed-exam-items.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=(p)=>fs.readFileSync(p,"utf8");
const bank=read("content/exam-bank.ts");
const groups=[
 {file:"content/reviewed-exam-items.ts",start:2,end:5},
 {file:"content/additional-reviewed-exam-items.ts",start:6,end:7},
 {file:"content/reviewed-pathway-exam-items.ts",start:8,end:11},
 {file:"content/reviewed-advanced-exam-items.ts",start:12,end:25}
];
for(const {file,start,end} of groups){
 const src=read(file);
 for(let id=start;id<=end;id++){
  assert(src.includes("\n"+id+":{"),"Missing module "+id+" in "+file);
  const next=src.indexOf("\n"+id+":{");
  const stop=id<end?src.indexOf("\n"+(id+1)+":{",next):src.indexOf("\n};",next);
  const segment=src.slice(next,stop);
  for(const lang of ["RU","EN","KZ"]){
   assert(new RegExp("\\b"+lang+":\\s*\\{").test(segment),"Missing "+lang+" in module "+id);
  }
 }
}
for(const name of ["reviewedExamItem","additionalReviewedItem","reviewedPathwayItem","reviewedAdvancedItem"]){
 assert(bank.includes(name+"(topic.id,lang)"),"Exam bank missing "+name);
}
assert(bank.includes("if(reviewedForTopic){"),"Reviewed questions must bypass template generation");
assert(!bank.includes('correctOrder:["stimulus","a","b","response"]'),"Invalid generic sequence keys remain");
console.log("Source wiring checks passed for modules 2-25 in RU, EN and KZ.");
