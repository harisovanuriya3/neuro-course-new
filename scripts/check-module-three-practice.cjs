// Source-only regression: module 3 practical physiology.
const fs=require('node:fs'),assert=require('node:assert/strict');
const src=fs.readFileSync('content/course-foundation/module-three-practice.ts','utf8');
const reg=fs.readFileSync('content/index.ts','utf8');
for(const lang of ['RU','EN','KZ']){
 assert(src.includes('  '+lang+': {'),'Missing locale '+lang);
 assert(reg.includes('createModuleThreePractice("'+lang+'"'),'Missing practice route '+lang);
}
assert(src.includes('7.2 − 3.2 = 4.0')&&src.includes('7,2 − 3,2 = 4,0'),'Missing latency difference');
assert(src.includes('50 m/s')&&src.includes('50 м/с'),'Missing 20 cm / 4 ms velocity');
for(const term of ['tableRows','mechanismRows','calculationAnswers','interpretationAnswers','criteria']){
 assert(src.includes(term+':'),'Missing authored activity '+term);
}
assert(reg.includes('...foundationLessons[3]'),'Other sections must remain');
console.log('PASS module 3 practice: RU/EN/KZ and segmental motor velocity');
