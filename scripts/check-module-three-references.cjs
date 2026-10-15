// Source contract for Module 3 references; does not test live external links.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const src=fs.readFileSync("content/index.ts","utf8");
const foundation=fs.readFileSync("content/course-foundation/index.ts","utf8");
assert(src.includes('function moduleThreeReferences(language: Language)'),'Missing Module 3 references factory');
for(const lang of ["RU","EN","KZ"]) {
 assert(src.includes('moduleThreeReferences("'+lang+'")'),lang+' references not registered');
 assert(new RegExp('\\b'+lang+': "[^"]{50,}"').test(src),lang+' reading guide missing');
}
for(const marker of ["Ganong","Guyton & Hall","Ghai","226–229","80–82","71–72"]) {
 assert(src.includes(marker),'Missing verified chapter pointer: '+marker);
}
assert(foundation.includes("if (section === 'references')"),"Foundation references missing");
console.log("PASS: Module 3 references RU/EN/KZ reading guidance and route registration");
console.log("NOTE: external link resolution and browser rendering untested");
