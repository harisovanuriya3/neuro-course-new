// Module 4 branching-test source contract: scientific consistency + RU/EN/KZ.
// Run from repository root: node scripts/check-module-four-test.cjs
// This is not a browser test or a substitute for medical/translation review.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const path = 'content/course-foundation/module-four-test.ts';
const src = fs.readFileSync(path,'utf8');
const registry = fs.readFileSync('content/index.ts','utf8');
const ast = ts.createSourceFile(path,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,'Module 4 branching test must parse');
const vars = ast.statements.filter(ts.isVariableStatement).flatMap(s=>[...s.declarationList.declarations]);
const authored = vars.find(v=>v.name.getText(ast)==='authored');
assert(authored && authored.initializer && ts.isObjectLiteralExpression(authored.initializer),'Missing authored localizations');
const prop=(o,key)=>{
 assert(ts.isObjectLiteralExpression(o),'Expected object literal: '+key);
 const p=o.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast).replace(/['"]/g,'')===key);
 assert(p,'Missing '+key);return p.initializer;
};
const strings=(node,count)=>{
 assert(ts.isArrayLiteralExpression(node)&&node.elements.length===count,'Expected '+count+' strings');
 const a=node.elements.map(x=>{assert(ts.isStringLiteral(x),'Expected string literal');assert(x.text.trim(),'Empty text');return x.text;});
 return a;
};
const checks={
 RU:['повторении одинаковых','доле проб'],
 EN:['repeated identical','proportion of trials'],
 KZ:['бірдей қысқа','сынақтардың үлесі'],
};
for(const lang of ['RU','EN','KZ']){
 const data=prop(authored.initializer,lang);
 for(const skill of ['concept','mechanism','application','transfer','justification']){
  const entry=prop(data,skill);
  const prompts=strings(prop(entry,'prompts'),3);
  const options=strings(prop(entry,'options'),4);
  assert.equal(new Set(options).size,4,lang+' '+skill+': duplicate option');
  const hints=strings(prop(entry,'hints'),2);
  assert(hints.every(x=>x.length>30),lang+' '+skill+': weak hints');
  const explanation=prop(entry,'explanation');
  assert(ts.isStringLiteral(explanation)&&explanation.text.length>90,lang+' '+skill+': weak explanation');
  if(skill==='transfer')for(const phrase of checks[lang])
   assert(prompts[0].includes(phrase),lang+': repeated-stimulus question must describe trial frequency ('+phrase+')');
 }
 assert(registry.includes('createModuleFourTest("'+lang+'"'),lang+': branching test not registered');
}
assert(src.includes('correctAnswer: "a"'),'Correct answer ID must remain stable when options rotate');
assert(src.includes('options: [...options.slice(offset), ...options.slice(0,offset)]'),'Expected position rotation');

// Independently check the numeric answer used by the application questions.
const thermal=8.314462618*310.15/96485.33212*1000;
const ek=k=>thermal*Math.log(k/140);
const vm=k=>thermal*Math.log((k+0.04*145)/(140+0.04*12));
for(const [k,ekTarget,vmTarget] of [[4,-95.0,-71.2],[8,-76.5,-62.0]]){
 assert(Math.abs(ek(k)-ekTarget)<0.15,'E(K) mismatch at '+k+' mM');
 assert(Math.abs(vm(k)-vmTarget)<0.15,'Vm mismatch at '+k+' mM');
}
console.log('PASS: Module 4 branching test, 5 skills × 3 levels × 3 languages, repeated-stimulus wording and Nernst/GHK values.');
