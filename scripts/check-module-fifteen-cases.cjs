// Static guard for module 15 authored cases and three-language routing.
const fs=require("node:fs");const assert=require("node:assert/strict");
const source=fs.readFileSync("content/course-foundation/module-fifteen-cases.ts","utf8");
const route=fs.readFileSync("content/course-foundation/assessment.ts","utf8");
const count=(pattern)=>(source.match(pattern)||[]).length;
assert.equal(count(/"id": "(osmotic-vs-volume|humidity-heat|fever-vs-heat)"/g),3,"Three distinct cases required");
assert.equal(count(/"situation": \{/g),3,"Each case must contain localized situation");
assert.equal(count(/"explanation": \{/g),3,"Each case must contain localized feedback");
for(const lang of ["RU","EN","KZ"]){assert.ok(count(new RegExp('"'+lang+'":','g'))>=9,lang+" case localization incomplete");}
assert.match(route,/if \(topic\.id === 15\) return createModuleFifteenCases\(l, moduleTitle, ui\(l\)\)/);
assert.match(source,/вазопрессин|vasopressin|осмоляльд|осмоляльност/i);
assert.match(source,/35%/);assert.match(source,/85%/);
assert.match(source,/простагландин E2|prostaglandin E2/i);
console.log("Module 15 case static contract passed (3 cases x RU/EN/KZ).");
