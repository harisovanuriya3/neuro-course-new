const fs=require('node:fs');
const assert=require('node:assert/strict');
const src=fs.readFileSync('content/course-foundation/module-three-practice.ts','utf8');
for(const lang of ['RU','EN','KZ'])assert(src.includes('  '+lang+': {'),'Missing '+lang);
for(const key of ['tableRows','mechanismRows','calculationAnswers','interpretationAnswers','criteria'])assert(src.includes(key+':'),'Missing '+key);
assert(src.includes('7.2 − 3.2 = 4.0')&&src.includes('7,2 − 3,2 = 4,0'));
assert(src.includes('50 m/s')&&src.includes('50 м/с'));
console.log('PASS module 3 authored practice source; route and browser not checked');
