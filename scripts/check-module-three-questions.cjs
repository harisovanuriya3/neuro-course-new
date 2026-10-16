// Module 3 review questions: language, mechanism, route and repetition contract.
// This source-level check intentionally does not depend on the TypeScript AST API.
// It cannot replace TypeScript compilation, browser tests or translation review.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const src=fs.readFileSync('content/course-foundation/module-three-questions.ts','utf8');
const registry=fs.readFileSync('content/index.ts','utf8');
const practice=fs.readFileSync('content/course-foundation/module-three-practice.ts','utf8');
const languageHeads=['RU','EN','KZ'];
const extracted={};
for(let i=0;i<languageHeads.length;i++){
 const lang=languageHeads[i];
 const begin=src.indexOf('\n '+lang+': [');
 const next=i<2?src.indexOf('\n '+languageHeads[i+1]+': [',begin):src.indexOf('\n};',begin);
 assert(begin>=0 && next>begin,lang+': missing language block');
 const segment=src.slice(begin,next);
 const itemPattern=/\{\s*prompt:'((?:\\.|[^'\\])*)',\s*explanation:'((?:\\.|[^'\\])*)',\s*target:'([^']+)'\s*\}/g;
 const items=[...segment.matchAll(itemPattern)].map(m=>({prompt:m[1],explanation:m[2],target:m[3]}));
 assert.equal(items.length,4,lang+': four parseable review items required; check quote escaping');
 assert.equal((segment.match(/\{\s*prompt:/g)||[]).length,4,lang+': malformed question entry');
 assert.equal(new Set(items.map(x=>x.prompt)).size,4,lang+': duplicate review question');
 for(const item of items){
  assert(item.prompt.length>40,lang+': too-short question');
  assert(item.explanation.length>120,lang+': missing causal feedback');
  assert(['theory','practice','cases','interactive'].includes(item.target),lang+': invalid link');
 }
 assert.equal(items[3].target,'theory',lang+': axonal transport should link to theory');
 assert(registry.includes('createModuleThreeQuestions("'+lang+'")'),lang+': questions not registered');
 extracted[lang]=items;
}
assert(extracted.RU[3].prompt.includes('дистальн') && extracted.RU[3].explanation.includes('валлеровск'),
 'RU: distal axon degeneration and Wallerian mechanism missing');
assert(extracted.EN[3].prompt.includes('distal') && extracted.EN[3].explanation.includes('Wallerian'),
 'EN: distal axon degeneration and Wallerian mechanism missing');
assert(extracted.KZ[3].prompt.includes('дисталдық') && extracted.KZ[3].explanation.includes('валлерлік'),
 'KZ: distal axon degeneration and Wallerian mechanism missing');
for(const lang of languageHeads){
 assert(!extracted[lang][3].prompt.toLowerCase().includes('latenc'),
  lang+': repeated motor-latency question returned');
}
assert(practice.includes('calculationPrompt') && practice.includes('latency'),
 'Original two-site motor conduction calculation must remain in practice');
const ui=fs.readFileSync('components/StudyContent.tsx','utf8');
const review=ui.slice(ui.indexOf('function ReviewQuestion('),ui.indexOf('function ReviewQuestions('));
assert(review.includes('ui.reviewSubmit') && review.includes('ui.reviewGate') && review.includes('ui.reviewAttempt'),
 'Open questions must use the ungraded, unsaved response UI');
assert(!review.includes('ui.check') && !review.includes('ui.attempt'),
 'Open questions must not imply an automatic answer check or saved text');
for(const key of ['reviewSubmit','reviewGate','reviewAttempt']){
 assert.equal((ui.match(new RegExp(key+':','g'))||[]).length,3,
  'Expected RU/EN/KZ copies of '+key);
}
assert(review.includes('onComplete(true)'), 'Completion is recorded separately from correctness');
console.log('PASS: Module 3 questions — 4 distinct authored items × RU/EN/KZ, Wallerian transport mechanism, targets and registration.');
