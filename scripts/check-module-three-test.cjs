// Runtime contract for module 3's 15 branching question nodes × 3 languages.
const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript');
const src=fs.readFileSync('content/course-foundation/module-three-test.ts','utf8');
const reg=fs.readFileSync('content/index.ts','utf8');
const compiled=ts.transpileModule(src,{fileName:'module-three-test.ts',reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
assert(!(compiled.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error),
 'Test module failed TypeScript transpilation');
const module={exports:{}};
new Function('module','exports',compiled.outputText)(module,module.exports);
const build=module.exports.createModuleThreeTest;
assert.equal(typeof build,'function');
const skills=['concept','mechanism','application','transfer','justification'];
const levels=['main','corrective','basic'];
const nodes={};
for(const skill of skills)for(const level of levels){
 const id=skill+':'+level;
 nodes[id]={id,type:'question',level,competency:skill,prompt:'Generic question',
 options:[{id:'a',text:'Generic answer'},{id:'b',text:'Wrong'}],correctAnswer:'a',
 explanation:'Generic feedback',onCorrect:'next',onIncorrect:'review'};
}
const base={kind:'tests',title:'',moduleTitle:'',ui:{},start:'concept:main',
 mainIds:skills.map(s=>s+':main'),competencies:{},nodes};
for(const lang of ['RU','EN','KZ']){
 const out=build(lang,base);
 assert.equal(Object.keys(out.nodes).length,15);
 for(const skill of skills){
  const prompts=[];
  for(const level of levels){
   const key=skill+':'+level,n=out.nodes[key];
   assert.equal(n.type,'question');
   assert.equal(n.options.length,4,lang+' '+key);
   assert.equal(new Set(n.options.map(o=>o.text)).size,4,lang+' '+key+' duplicate distractor');
   assert.equal(new Set(n.options.map(o=>o.id)).size,4,lang+' '+key+' duplicate id');
   assert.equal(n.options.filter(o=>o.id===n.correctAnswer).length,1,lang+' '+key+' invalid key');
   assert.equal(n.onCorrect,'next');
   assert.equal(n.onIncorrect,'review');
   assert.notEqual(n.prompt,'Generic question');
   assert(n.explanation.length>35,lang+' '+key+' insufficient explanation');
   prompts.push(n.prompt);
  }
  assert.equal(new Set(prompts).size,3,lang+' '+skill+' repeats the same stem');
 }
 const basic=out.nodes['application:basic'];
 assert.equal(basic.options.find(o=>o.id===basic.correctAnswer).text,
  lang==='EN'?'60 m/s.':'60 м/с.');
 assert(basic.explanation.includes(lang==='EN'?'0.12 m / 0.002 s':'0,12 м / 0,002 с'));
 assert(reg.includes('createModuleThreeTest("'+lang+'"'),'Unregistered '+lang+' test');
 assert(reg.includes('moduleThreeBaseTest("'+lang+'"'),'Missing foundation '+lang+' test');
}
assert.equal(base.nodes['application:basic'].prompt,'Generic question');
console.log('PASS: module 3 tests: 15 nodes × RU/EN/KZ, unique options and stems, correct 60 m/s basic calculation, route wiring.');
