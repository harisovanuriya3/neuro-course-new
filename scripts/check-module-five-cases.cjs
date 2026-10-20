// Module 5 cases: source + runtime contract, not an end-to-end or clinical validation.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
const file='content/course-foundation/module-five-cases.ts';
const src=fs.readFileSync(file,'utf8');
const reg=fs.readFileSync('content/index.ts','utf8');
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,'Case source syntax');
const js=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert(!(js.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error));
const m={exports:{}};
new Function('module','exports',js.outputText)(m,m.exports);
const build=m.exports.createModuleFiveCases;
assert.equal(typeof build,'function');
const base={kind:'cases',title:'Cases',moduleTitle:'Synapses',
 introduction:'old',ui:{},cases:[]};
const fragments={
 RU:['непосредственно в пресинаптическом окончании','5 до 1 мВ'],
 EN:['direct recording from the presynaptic terminal','5 to 1 mV'],
 KZ:['пресинапстық ұштан тікелей жазба','5-тен 1 мВ-қа']
};
for(const lang of ['RU','EN','KZ']){
 const lesson=build(lang,base);
 assert.equal(lesson.kind,'cases');
 assert.equal(lesson.cases.length,3);
 assert.notEqual(lesson.introduction,'old');
 for(const [i,c] of lesson.cases.entries()){
  assert.equal(c.id,'m5-authored-case-'+(i+1));
  assert.equal(c.stages.length,3);
  assert(c.stages.every(s=>s.questions.length===1 && s.questions[0].length>40));
  assert.equal(c.explanation.length,2);
  assert(c.explanation.every(x=>x.length>80));
 }
 for(const phrase of fragments[lang])assert(lesson.cases[0].situation.includes(phrase),
  lang+' terminal evidence missing: '+phrase);
 assert(reg.includes('createModuleFiveCases("'+lang+'", moduleFiveBaseCases("'+lang+'"))'),
  lang+' cases not registered');
}
assert(reg.includes('import { createModuleFiveCases }'));
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'],false);
console.log('PASS module 5 cases: 3 cases x 3 languages, 3 stages, terminal evidence and registration.');
console.log('NOTE: does not replace physiology, KZ-native, TypeScript build or browser checks.');
