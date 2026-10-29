// Static guard for module 15 authored cases and three-language routing.
const fs=require("node:fs");const assert=require("node:assert/strict");
const source=fs.readFileSync("content/course-foundation/module-fifteen-cases.ts","utf8");
const route=fs.readFileSync("content/course-foundation/assessment.ts","utf8");
const count=(pattern)=>(source.match(pattern)||[]).length;
assert.equal(count(/"id": "(osmotic-vs-volume|humidity-heat|fever-vs-heat|pituitary-routes|circadian-light)"/g),5,"Five distinct cases required");
assert.equal(count(/"situation": \{/g),5,"Each case must contain localized situation");
assert.equal(count(/"explanation": \{/g),5,"Each case must contain localized feedback");
for(const lang of ["RU","EN","KZ"]){assert.ok(count(new RegExp('"'+lang+'":','g'))>=15,lang+" case localization incomplete");}
assert.match(route,/if \(topic\.id === 15\) return createModuleFifteenCases\(l, moduleTitle, ui\(l\)\)/);
assert.match(source,/вазопрессин|vasopressin|осмоляльд|осмоляльност/i);
assert.match(source,/35%/);assert.match(source,/85%/);
assert.match(source,/простагландин E2|prostaglandin E2/i);
console.log("Module 15 case static contract passed (5 cases x RU/EN/KZ).");
