// Targeted structural regression for the LIVE module-4 objectives/one-minute source.
// Run: node scripts/check-module-four-summary.cjs
// Does not replace an expert translation or browser accessibility audit.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = 'content/course-foundation/module-four-summary.ts';
const source = fs.readFileSync(path, 'utf8');
const registry = fs.readFileSync('content/index.ts', 'utf8');
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, 'Module 4 live summary must parse');
function variable(name) {
  const declarations = ast.statements.filter(ts.isVariableStatement)
    .flatMap(stmt => [...stmt.declarationList.declarations]);
  const item = declarations.find(d => d.name.getText(ast) === name);
  assert(item && ts.isObjectLiteralExpression(item.initializer), 'Missing '+name);
  return item.initializer;
}
function prop(object, name) {
  assert(ts.isObjectLiteralExpression(object), 'Expected object '+name);
  const p = object.properties.find(p => ts.isPropertyAssignment(p) &&
    p.name.getText(ast).replace(/['"]/g,'') === name);
  assert(p, 'Missing property '+name);
  return p.initializer;
}
const points = variable('points'), outcomes = variable('objectiveItems');
for(const lang of ['RU','EN','KZ']){
  const cards = prop(points, lang);
  const objectives = prop(outcomes, lang);
  assert(ts.isArrayLiteralExpression(cards) && cards.elements.length === 5,
    lang+': one-minute must have five points');
  assert(ts.isArrayLiteralExpression(objectives) && objectives.elements.length === 5,
    lang+': objectives must have five measurable outcomes');
  for(const card of cards.elements){
    assert(ts.isObjectLiteralExpression(card), lang+': malformed card');
    for(const key of ['title','explanation']){
      const v = prop(card,key);
      assert(ts.isStringLiteral(v) && v.text.length > 25,
        lang+': missing card '+key);
    }
  }
  for(const objective of objectives.elements){
    assert(ts.isArrayLiteralExpression(objective) && objective.elements.length === 2,
      lang+': malformed objective');
    assert(objective.elements.every(v => ts.isStringLiteral(v) && v.text.length > 10),
      lang+': empty objective');
  }
  for(const section of ['Objectives','Summary'])
    assert(registry.includes('createModuleFour'+section+'("'+lang+'")'),
      lang+': live '+section+' not registered');
}
assert(registry.includes('from "./course-foundation/module-four-summary"'),
  'Registry must use the reviewed live summary, not a duplicate file');
for(const term of [
  'K⁺ 4/140','Na⁺ 145/12','E(K) ≈ −95,0','E(Na) ≈ +66,6','Vm ≈ −71,2',
  'K⁺ 4/140','E(K) ≈ −95.0','E(Na) ≈ +66.6','Vm ≈ −71.2',
  'Cl⁻','37 °C','P(K):P(Na)=1:0,04','P(K):P(Na)=1:0.04',
  'табандырықтан жоғары стимулды күшейту',
  'stronger suprathreshold stimulus','силой надпорогового стимула'
]) assert(source.includes(term),'Missing model input/limit or all-or-none caveat: '+term);
const rt = 8.314462618*310.15/96485.33212*1000;
const nernst=(outside,inside)=>rt*Math.log(outside/inside);
const goldman=k=>rt*Math.log((k+0.04*145)/(140+0.04*12));
for(const [actual,expected] of [
 [nernst(4,140),-95.0],[nernst(145,12),66.6],
 [nernst(8,140),-76.5],[goldman(4),-71.2],[goldman(8),-62.0]
]) assert(Math.abs(actual-expected)<0.15,
  'Module 4 teaching model does not match reference arithmetic');
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'],false,
  'Audit branch must never enable Vercel previews');
console.log('PASS: Module 4 objectives and one-minute: 5 × RU/EN/KZ, numerical assumptions and route registration.');
