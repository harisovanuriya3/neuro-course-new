// Structural source checks; run: node scripts/check-reviewed-exam-items.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=(p)=>fs.readFileSync(p,"utf8");
const bank=read("content/exam-bank.ts");
const first=read("content/reviewed-module-one-exam.ts");
assert(bank.includes("firstModuleReviewed(lang).map"),"Module 1 authored bank is not wired");
for(const lang of ["RU","EN","KZ"])assert(first.includes(lang+":["),"Module 1 missing "+lang);
const thirdSystems=read("content/third-systems-exam-items.ts");
for(let id=11;id<=25;id++){const start=thirdSystems.indexOf("\n"+id+":{");assert(start>=0,"Missing third systems item for module "+id);const end=id<25?thirdSystems.indexOf("\n"+(id+1)+":{",start):thirdSystems.indexOf("\n};",start);const item=thirdSystems.slice(start,end);for(const lang of ["RU","EN","KZ"])assert(new RegExp("\\b"+lang+":\\s*\\{").test(item),"Missing third systems "+lang+" module "+id);}
assert(bank.includes("thirdSystemsItem(topic.id,lang)"),"Third systems cases are not wired");
const third=read("content/third-reviewed-exam-items.ts");
for(let id=1;id<=10;id++){const start=third.indexOf("\n"+id+":{");assert(start>=0,"Missing third item for module "+id);const end=id<10?third.indexOf("\n"+(id+1)+":{",start):third.indexOf("\n};",start);const item=third.slice(start,end);for(const lang of ["RU","EN","KZ"])assert(new RegExp("\\b"+lang+":\\s*\\{").test(item),"Missing third "+lang+" item for module "+id);}
assert(bank.includes("thirdReviewedItem(topic.id,lang)"),"Third case is not wired");
const supplements=[{file:"content/supplementary-reviewed-exam-items.ts",start:1,end:7},{file:"content/supplementary-systems-exam-items.ts",start:8,end:25}];
for(const {file,start,end} of supplements){const src=read(file);for(let id=start;id<=end;id++){const pos=src.indexOf("\n"+id+":{");assert(pos>=0,"Missing supplementary module "+id);const stop=id<end?src.indexOf("\n"+(id+1)+":{",pos):src.indexOf("\n};",pos);const item=src.slice(pos,stop);for(const lang of ["RU","EN","KZ"])assert(new RegExp("\\b"+lang+":\\s*\\{").test(item),"Missing supplementary "+lang+" module "+id);}}
assert(bank.includes("supplementarySystemsItem(topic.id,lang)"),"Supplementary systems not wired");
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
assert(!bank.includes("for(let n=0;n<40;n++)"),"Generic template generator must be absent");
assert(bank.includes("Missing authored exam item"),"Missing module should fail visibly");
assert(!bank.includes('correctOrder:["stimulus","a","b","response"]'),"Invalid generic sequence keys remain");
console.log("Source wiring checks passed for modules 1-25 in RU, EN and KZ.");
