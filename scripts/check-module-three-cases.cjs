// Source-only contract for the authored module 3 case correction.
// Run from repo root: node scripts/check-module-three-cases.cjs
// Does not replace scientific review, TypeScript compilation or browser testing.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
const file='content/course-foundation/module-three-cases.ts';
const source=fs.readFileSync(file,'utf8');
const registry=fs.readFileSync('content/index.ts','utf8');
const generic=fs.readFileSync('content/course-foundation/assessment.ts','utf8');
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,'Case override TypeScript syntax');
assert(generic.includes('topic.id===3'),'Original module 3 cases must be preserved');
assert(source.includes('base.cases.map'),'Case override must retain existing staged cases');
for(const language of ['RU','EN','KZ']){
 assert(new RegExp('\\b'+language+':\\s*\\{').test(source),'Missing '+language+' case copy');
 assert(registry.includes('createModuleThreeCases("'+language+'"'),'Unregistered '+language+' case override');
}
assert(source.includes('index === 0 && stageIndex === 0 && questionIndex === 1'));
assert(source.includes('index === 1 && stageIndex === 0 && questionIndex === 0'));
assert(!source.includes('myelin: \'\'') && !source.includes('uptake: \'\''));
console.log('PASS: module 3 two staged case prompts, RU/EN/KZ, registration.');
