// Route-level structural contract for all 25 × 17 course pages.
// Run from repo root: node scripts/check-course-route-contracts.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
const sections=fs.readFileSync("content/sections.ts","utf8");
const foundation=fs.readFileSync("content/course-foundation/index.ts","utf8");
const patients=fs.readFileSync("content/virtual-patients.ts","utf8");
const moduleTwo=fs.readFileSync("components/Module2Content.tsx","utf8");

const sectionSlugs=[...sections.matchAll(/slug:\s*"([^"]+)"/g)].map(m=>m[1]);
assert.equal(sectionSlugs.length,17,"Expected 17 unique section slugs");
assert.equal(new Set(sectionSlugs).size,17,"Duplicate section slug");

assert(route.includes('moduleNumber === 1 && section === "virtual-patient"'),
  "Module 1 virtual-patient route must retain its original patient trainer");
assert(!route.includes('moduleNumber === 2 && section === "virtual-patient"'),
  "Module 2 must not use the single-item recording-quality card as a virtual patient");
assert(route.includes('<UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />'),
  "Virtual patient for modules 2–25 must use unified six-step scenario");
assert(moduleTwo.includes('items={[...cases,labSituation]}'),
  "Preserve module 2 diagnostic EEG situation in its clinical cases");
for(let id=2;id<=25;id++){
  assert(new RegExp("^\\s*"+id+": decisions\\(","m").test(patients),
    "Missing explicitly authored virtual-patient decision stages for module "+id);
}
assert(patients.includes("authoredDecisions.length !== 6"),
  "Virtual patients must enforce six decision stages");
assert(patients.includes("decisions: [string, string, string]"),
  "Virtual patients must provide three decisions per stage");
for(let id=2;id<=25;id++){
  assert(route.includes('moduleNumber === '+id+' && section === "interactive"'),
    "Module "+id+" lacks an explicit interactive laboratory route");
}
assert(route.includes('section === "progress"') &&
  route.includes('section === "voice"') &&
  route.includes('section === "notes"'),
  "Student progress, voice and notes service routes must remain reachable");
const foundationSections=[...foundation.matchAll(/^\s*'(objectives|pretest|theory|one-minute|clinical|practice|cases|tests|questions|media|glossary|references)',?$/gm)].map(m=>m[1]);
assert.equal(new Set(foundationSections).size,12,
  "Modules 3–25 need 12 authored foundation lesson section kinds");
console.log("PASS: 25 module routes, 17 section slugs, 24 explicit labs, 24 unified virtual patients, service routes.");
console.log("NOTE: route source checks do not replace a browser interaction test.");
