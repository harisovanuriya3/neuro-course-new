// Runtime contract for module 3's two authored cases (no browser required).
const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript');
const src=fs.readFileSync('content/course-foundation/module-three-cases.ts','utf8');
const reg=fs.readFileSync('content/index.ts','utf8');
const compiled=ts.transpileModule(src,{fileName:'module-three-cases.ts',reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert(!(compiled.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error),
 'Case module failed TypeScript transpilation');
const sandboxModule={exports:{}};
new Function('module','exports',compiled.outputText)(sandboxModule,sandboxModule.exports);
const build=sandboxModule.exports.createModuleThreeCases;
assert.equal(typeof build,'function');
const base={kind:'cases',title:'Cases',moduleTitle:'Module 3',introduction:'',ui:{},
 cases:[
  {id:'m3-localization',title:'',situation:'myelin',explanation:['explanation'],stages:[
   {title:'Evidence',questions:['Two findings','Generic neuron/myelin question']},
   {title:'Mechanism',questions:['Retained follow-up']}]},
  {id:'m3-discrimination',title:'',situation:'glutamate',explanation:['explanation'],stages:[
   {title:'Prediction',questions:['Generic neuron/myelin prediction']},
   {title:'Alternative',questions:['Retained follow-up']}]},
 ]};
for(const lang of ['RU','EN','KZ']){
 const out=build(lang,base);
 assert.equal(out.cases.length,2);
 assert.notEqual(out.cases[0].stages[0].questions[1],base.cases[0].stages[0].questions[1]);
 assert.notEqual(out.cases[1].stages[0].questions[0],base.cases[1].stages[0].questions[0]);
 assert.equal(out.cases[0].stages[0].questions[0],'Two findings');
 assert.equal(out.cases[1].stages[1].questions[0],'Retained follow-up');
 assert.equal(base.cases[1].stages[0].questions[0],'Generic neuron/myelin prediction');
 assert(reg.includes('createModuleThreeCases("'+lang+'"'),'Unregistered '+lang+' cases');
 assert(reg.includes('moduleThreeBaseCases("'+lang+'"'),'Missing '+lang+' foundation cases');
 const malformed={...base,cases:base.cases.slice(0,1)};
 assert.throws(()=>build(lang,malformed),/case structure changed/);
}
console.log('PASS: module 3 cases: 2 mechanism-specific scenarios × 3 languages, runtime overrides, route wiring, malformed-shape guard.');
