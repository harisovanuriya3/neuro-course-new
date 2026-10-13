// Static pedagogical/scientific-content coverage gate. Run from repository root:
// node scripts/check-topic-science-coverage.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const course=read("content/course.ts");
const topics=read("content/course-foundation/topics.ts");
const bank=read("content/exam-bank.ts");
const labels=["RU","KZ","EN"];
for(const lang of labels){
 const section=course.match(new RegExp("\\b"+lang+": \\[([\\s\\S]*?)\\n  \\]"));
 assert(section,"Missing "+lang+" module titles");
 const titles=[...section[1].matchAll(/^\\s*"([^"]+)"[,]?$/gm)].map(x=>x[1]);
 assert.equal(titles.length,25,lang+" must have 25 module titles");
 assert.equal(new Set(titles).size,25,lang+" has repeated module titles");
}
const found=[...topics.matchAll(/^\\{ id: (\\d+), sources:/gm)].map(x=>Number(x[1]));
assert.deepEqual(found,Array.from({length:24},(_,i)=>i+2),"Topic foundation must cover modules 2–25 exactly");
for(const field of ["mechanism","interpretation","question","task","terms"]){
 const matches=[...topics.matchAll(new RegExp("^"+field+":", "gm"))].length;
 assert.equal(matches,24,"Topic field "+field+" missing in some module");
}
assert(bank.includes("firstModuleReviewed(lang).map"),"Module 1 exam missing");
for(const file of ["content/reviewed-exam-items.ts","content/additional-reviewed-exam-items.ts","content/reviewed-pathway-exam-items.ts","content/reviewed-advanced-exam-items.ts","content/supplementary-reviewed-exam-items.ts","content/supplementary-systems-exam-items.ts","content/third-reviewed-exam-items.ts","content/third-systems-exam-items.ts"]){
 assert(fs.existsSync(file),"Missing reviewed item source "+file);
}
console.log("Structural coverage verified: 25 module titles per language, topic mechanisms and interpretations for modules 2–25, and authored exam source files.");
console.log("NOTE: This is not a scientific fact check, translation review, or browser/build test.");
