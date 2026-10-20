// Module 5 clinical source contract; scientific review and browser testing remain separate.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
const file=fs.readFileSync('content/course-foundation/module-five-clinical.ts','utf8');
const registry=fs.readFileSync('content/index.ts','utf8');
for(const [name,source] of [['module-five-clinical.ts',file],['index.ts',registry]]){
 const ast=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 assert.equal(ast.parseDiagnostics.length,0,name+' syntax error');
}
assert(file.includes('kind: "clinical"'),'Wrong lesson kind');
for(const lang of ['RU','EN','KZ']){
 assert(file.includes('  '+lang+': {'),'Missing clinical language '+lang);
 assert(registry.includes('createModuleFiveClinical("'+lang+'")'),'Clinical bridge not registered for '+lang);
}
for(const phrase of ['Lambert–Eaton','Ламберта—Итона','Ламберт—Итон',
 'myasthenia gravis','миастении','Миастенияда',
 'presynaptic','постсинаптических','пресинапстық',
 'repetitive','қайталама','повторной']){
 assert(file.includes(phrase),'Missing mechanism or evidence: '+phrase);
}
assert(registry.includes('import { createModuleFiveClinical }'),'Missing clinical import');
assert(registry.includes('...foundationLessons[5]'),'Module 5 base lessons lost');
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'],false);
console.log('PASS: module 5 clinical RU/EN/KZ source, registry and Vercel preview disabled.');
