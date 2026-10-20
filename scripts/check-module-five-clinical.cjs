// Module 5 clinical source contract; scientific review and browser testing remain separate.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
const file=fs.readFileSync('content/course-foundation/module-five-clinical.ts','utf8');
const route=fs.readFileSync('app/modules/[id]/[section]/page.tsx','utf8');
for(const [name,source] of [['module-five-clinical.ts',file],['page.tsx',route]]){
 const ast=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true,name.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 assert.equal(ast.parseDiagnostics.length,0,name+' syntax error');
}
assert(file.includes('kind: "clinical"'),'Wrong lesson kind');
for(const lang of ['RU','EN','KZ']){
 assert(file.includes('  '+lang+': {'),'Missing clinical language '+lang);
}
for(const phrase of ['Lambert–Eaton','Ламберта—Итона','Ламберт—Итон',
 'myasthenia gravis','миастении','Миастенияда',
 'presynaptic','постсинаптических','пресинапстық',
 'repetitive','қайталама','повторной']){
 assert(file.includes(phrase),'Missing mechanism or evidence: '+phrase);
}
assert(route.includes('import { createModuleFiveClinical }'),'Missing clinical route import');
assert(route.includes('moduleNumber === 5 && section === "clinical"'),'Module 5 clinical override not selected');
assert(route.includes('createModuleFiveClinical(lang)'),'Clinical bridge not rendered by route');
assert(route.includes('getLesson(moduleNumber, section, lang)'),'Other modules must retain normal lesson routing');
// Ensure authored module 5 sections are actually served rather than generic foundation fallbacks.
const registry=fs.readFileSync('content/index.ts','utf8');
for(const [name,section,base] of [
 ['Objectives','objectives',false],['Clinical','clinical',false],
 ['Practice','practice',true],['Cases','cases',true]
]){
 const fn='createModuleFive'+name;
 assert(registry.includes('import { '+fn+' }'),'Missing import '+fn);
 for(const lang of ['RU','EN','KZ']){
  const expected=fn+'("'+lang+'"'+(base?', moduleFiveBase'+name+'("'+lang+'")':'')+')';
  assert(registry.includes(expected),'Missing module 5 '+section+' '+lang+' registration');
 }
}
for(const [name,filename] of [
 ['practice','module-five-practice.ts'],['cases','module-five-cases.ts'],
 ['objectives','module-five-learning.ts']
]){
 const src=fs.readFileSync('content/course-foundation/'+filename,'utf8');
 const parsed=ts.createSourceFile(filename,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 assert.equal(parsed.parseDiagnostics.length,0,'Module 5 '+name+' syntax error');
}
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'],false);
console.log('PASS: module 5 clinical RU/EN/KZ source, registry and Vercel preview disabled.');
