// Run from repo root: node scripts/check-module-five-summary.cjs
// Intended to be enabled in audit:science AFTER the summary is wired to content/index.ts.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
const file='content/course-foundation/module-five-summary.ts';
const source=fs.readFileSync(file,'utf8');
const registry=fs.readFileSync('content/index.ts','utf8');
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,'Module 5 recap has a TypeScript syntax error');
const statement=ast.statements.find(s=>ts.isVariableStatement(s) &&
  s.declarationList.declarations.some(d=>d.name.getText(ast)==='recap'));
assert(statement,'Module 5 recap not found');
const declaration=statement.declarationList.declarations.find(d=>d.name.getText(ast)==='recap');
const root=declaration.initializer;
assert(ts.isObjectLiteralExpression(root),'Recap must be a language map');
for(const lang of ['RU','EN','KZ']){
 const entry=root.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast)===lang);
 assert(entry && ts.isArrayLiteralExpression(entry.initializer),lang+' recap missing');
 assert.equal(entry.initializer.elements.length,5,lang+' requires five scientific takeaways');
 for(const item of entry.initializer.elements)
  assert(ts.isStringLiteral(item)&&item.text.length>100,lang+' recap point is empty');
 assert(registry.includes('createModuleFiveSummary("'+lang+'")'),
  'Module 5 '+lang+' recap exists but is NOT wired to the live registry');
}
assert(registry.includes('from "./course-foundation/module-five-summary"'),
 'Module 5 summary import is missing');
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'],false,
 'Audit branch must not publish previews');
console.log('PASS: Module 5 one-minute recap, five points in RU/EN/KZ and live registry');
