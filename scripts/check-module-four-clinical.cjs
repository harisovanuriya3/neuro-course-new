// Source contract for module 4 clinical bridge (not a browser or clinical certification).
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const file='content/course-foundation/module-four-clinical.ts';
const src=fs.readFileSync(file,'utf8');
const registry=fs.readFileSync('content/index.ts','utf8');
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,'Module 4 clinical source must parse');
const decl=ast.statements.filter(ts.isVariableStatement)
  .flatMap(s=>[...s.declarationList.declarations])
  .find(d=>d.name.getText(ast)==='copy');
assert(decl && ts.isObjectLiteralExpression(decl.initializer),'Missing localized clinical data');
const prop=(obj,key)=>{
  assert(ts.isObjectLiteralExpression(obj),'Expected object literal: '+key);
  const p=obj.properties.find(p=>ts.isPropertyAssignment(p) &&
    p.name.getText(ast).replace(/['"]/g,'')===key);
  assert(p,'Missing '+key);
  return p.initializer;
};
const str=n=>{assert(ts.isStringLiteral(n),'Expected text literal');assert(n.text.length>35,'Too little clinical detail');return n.text;};
for(const lang of ['RU','EN','KZ']){
  const data=prop(decl.initializer,lang);
  str(prop(data,'introduction'));
  const cards=prop(data,'cards');
  assert(ts.isArrayLiteralExpression(cards),'Cards must be array');
  assert.equal(cards.elements.length,5,lang+' expected five clinical steps');
  const titles=new Set();
  for(const card of cards.elements){
    const title=prop(card,'title');
    assert(ts.isStringLiteral(title)&&title.text.length>8,'Missing card title');
    titles.add(title.text);
    str(prop(card,'paragraph'));
    const link=prop(card,'link');
    assert(ts.isStringLiteral(link)&&['theory','interactive','cases','practice'].includes(link.text),
      lang+' invalid navigation target');
  }
  assert.equal(titles.size,5,lang+' duplicate card title');
  assert(registry.includes('createModuleFourClinical("'+lang+'")'),lang+' clinical not registered');
}
assert(registry.indexOf('  4: {')>registry.indexOf('  ...foundationLessons,'),
 'Module 4 override must follow foundation registration');
assert(src.includes('not a') || src.includes('not the'),'Model limitations must be documented');
console.log('PASS: module 4 clinical bridge: five cards × RU/EN/KZ and live lesson registration.');
