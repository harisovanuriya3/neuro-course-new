// Targeted structural/linguistic regression for the LIVE module 4 glossary.
// Run: node scripts/check-module-four-glossary.cjs
// This does not substitute for an expert Kazakh translation or browser audit.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const file = 'content/course-foundation/module-four-glossary.ts';
const source = fs.readFileSync(file, 'utf8');
const registry = fs.readFileSync('content/index.ts', 'utf8');
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, 'Glossary TypeScript parse errors');
const decl = ast.statements.filter(ts.isVariableStatement)
  .flatMap(statement => [...statement.declarationList.declarations])
  .find(node => node.name.getText(ast) === 'entries');
assert(decl && ts.isArrayLiteralExpression(decl.initializer), 'Missing glossary entries');
const entries = decl.initializer.elements;
assert.equal(entries.length, 9, 'Expected nine independently authored glossary terms');
function get(object, name) {
  assert(ts.isObjectLiteralExpression(object), 'Expected glossary entry object');
  const prop = object.properties.find(p => ts.isPropertyAssignment(p) &&
    p.name.getText(ast).replace(/['"]/g, '') === name);
  assert(prop, 'Missing glossary property ' + name);
  return prop.initializer;
}
const keys = new Set();
const labels = { RU: new Set(), EN: new Set(), KZ: new Set() };
for (const entry of entries) {
  const key = get(entry, 'key');
  assert(ts.isStringLiteral(key) && key.text.length > 2, 'Missing entry key');
  assert(!keys.has(key.text), 'Duplicate glossary key ' + key.text);
  keys.add(key.text);
  for (const lang of ['RU', 'EN', 'KZ']) {
    const pair = get(entry, lang);
    assert(ts.isArrayLiteralExpression(pair) && pair.elements.length === 2,
      lang + ': term and definition required');
    const [term, definition] = pair.elements;
    assert(ts.isStringLiteral(term) && term.text.length > 3, lang + ': empty term');
    assert(ts.isStringLiteral(definition) && definition.text.length > 65,
      lang + ': missing physiological definition for ' + key.text);
    const normalized = term.text.toLocaleLowerCase(lang === 'KZ' ? 'kk' : lang === 'RU' ? 'ru' : 'en');
    assert(!labels[lang].has(normalized), lang + ': duplicate term ' + term.text);
    labels[lang].add(normalized);
  }
}
const rest=entries.find(entry=>get(entry,'key').text==='resting-vm');
assert(rest,'Resting-potential term missing');
for(const [lang,phrase] of Object.entries({
 RU:'в состоянии покоя',
 EN:'under resting conditions',
 KZ:'тыныштық күйінде'
})){
 const pair=get(rest,lang);
 const definition=pair.elements[1].text;
 assert(definition.includes(phrase),lang+': resting Vm must describe the resting condition');
}
assert(source.includes('new Set(terms.map'), 'Runtime duplicate-term guard missing');
assert(source.includes('...base.terms'), 'Foundation terms must remain');
assert(registry.includes('from "./course-foundation/module-four-glossary"'),
  'Reviewed glossary is not imported into lesson registry');
for (const lang of ['RU', 'EN', 'KZ'])
  assert(registry.includes('createModuleFourGlossary("'+lang+'", moduleFourBaseGlossary("'+lang+'"))'),
    'Reviewed glossary not mounted for ' + lang);
assert(registry.includes('lesson.kind !== "glossary"'),
  'Foundation glossary contract guard missing');
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'], false,
  'Do not enable Vercel previews for this audit branch');
console.log('PASS: module 4 glossary 9 terms × RU/EN/KZ, 27 unique labels, 27 definitions and live route wiring.');
console.log('NOTE: structural checks are not scientific/translation/browser certification.');
