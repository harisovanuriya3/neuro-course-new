// Structural coverage gate for the trilingual neurophysiology course.
// Run from repository root: node scripts/check-topic-science-coverage.cjs
// This is NOT a validation of clinical or physiological accuracy.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const course=read("content/course.ts");
const sectionSource=read("content/sections.ts");
const topics=read("content/course-foundation/topics.ts");
const bank=read("content/exam-bank.ts");

for(const lang of ["RU","KZ","EN"]){
  const section=course.match(new RegExp("\\b"+lang+": \\[([\\s\\S]*?)\\n  \\]"));
  assert(section,"Missing "+lang+" module titles");
  const titles=[...section[1].matchAll(/^\s*"([^"]+)"[,]?$/gm)].map(x=>x[1]);
  assert.equal(titles.length,25,lang+" must have 25 module titles");
  assert.equal(new Set(titles).size,25,lang+" contains repeated titles");
}
const sectionSlugs=[...sectionSource.matchAll(/slug:\s*"([^"]+)"/g)].map(x=>x[1]);
assert.equal(sectionSlugs.length,17,"Expected 17 sections per module");
assert.equal(new Set(sectionSlugs).size,17,"Duplicate section slugs");

const topicStarts=[...topics.matchAll(/\{\s*id:\s*(\d+)\s*,\s*sources:/g)];
const ids=topicStarts.map(x=>Number(x[1]));
assert.equal(ids.length,24,"Expected 24 foundation topics (modules 2–25)");
assert.deepEqual([...ids].sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i+2),
  "Foundation topic IDs must be complete and unique; declaration order is irrelevant");
for(let i=0;i<topicStarts.length;i++){
  const segment=topics.slice(topicStarts[i].index,topicStarts[i+1]?.index??topics.length);
  for(const field of ["mechanism","interpretation","question","task","terms"]){
    assert(new RegExp("\\b"+field+"\\s*:").test(segment),
      "Missing "+field+" in topic "+topicStarts[i][1]);
  }
}
assert(bank.includes("firstModuleReviewed(lang).map"),"Module 1 authored assessment not wired");
for(const path of [
  "content/reviewed-exam-items.ts",
  "content/additional-reviewed-exam-items.ts",
  "content/reviewed-pathway-exam-items.ts",
  "content/reviewed-advanced-exam-items.ts",
  "content/supplementary-reviewed-exam-items.ts",
  "content/supplementary-systems-exam-items.ts",
  "content/third-reviewed-exam-items.ts",
  "content/third-systems-exam-items.ts"
]) assert(fs.existsSync(path),"Missing authored assessment file "+path);
console.log("PASS: 25 distinct module titles in RU/KZ/EN; 17 section routes; 24 foundation topics with required fields.");
console.log("NOTE: This checks coverage only, not translation equivalence, physiology, content depth or runtime.");

// Audit the entire 25-module scope rather than accepting a single-module check.
const assessment=read("content/course-foundation/assessment.ts");
const vignetteBlock=assessment.split("export const clinicalVignettes:Record<number,Vignette>={")[1]?.split("\n};")[0];
assert(vignetteBlock,"Missing authored vignette dictionary");
const vignetteIds=[...vignetteBlock.matchAll(/^\s*(\d+):v\(/gm)].map(m=>Number(m[1]));
assert.deepEqual([...vignetteIds].sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i+2),"Each foundation module 2–25 must have an authored clinical vignette");
assert(!assessment.includes("const task=clinicalVignettes[topic.id]?.[l] ?? ("),"Generic clinical case fallback must not conceal missing content");
const specialCaseModules=[...assessment.matchAll(/if \(topic\.id === (\d+)\) return createModule\w+Cases\(/g)].map(m=>Number(m[1]));
assert.equal(new Set(specialCaseModules).size,specialCaseModules.length,"Duplicate authored-case routing");
for(const id of specialCaseModules){
 assert(id>=2 && id<=25,"Authored case route outside the 25-module course: "+id);
}
const missingCaseModules=Array.from({length:24},(_,i)=>i+2).filter(id=>!specialCaseModules.includes(id));
console.log("Authored case routes:",specialCaseModules.join(", "));
console.log("Modules using shared foundation case generation:",missingCaseModules.join(", "));
console.log("These routing counts are structural only; they do not certify scientific accuracy or 20 cases per module.");
for(let id=1;id<=25;id++) console.log("Module "+id+": independent science, RU/EN/KZ, 20 cases, 20 tests, lab/media and build sign-off PENDING");
