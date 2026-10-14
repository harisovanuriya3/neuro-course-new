// Module 3 media: static source contract, run from repo root with Node.
// Does not establish browser playback or scientific accuracy.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const file = 'content/course-foundation/module-three-media.ts';
const src = fs.readFileSync(file, 'utf8');
const registry = fs.readFileSync('content/index.ts', 'utf8');
const ast = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, 'Module 3 media TypeScript must parse');
for (const lang of ['RU','EN','KZ']) {
  assert(new RegExp('\\b'+lang+':\\s*\\{').test(src), 'Missing '+lang+' media text');
}
for (const required of ['Node of Ranvier','Ранвье','Ранвье түйіндері','Oligodendrocytes','Олигодендроциты','Олигодендроциттер','CMAP','М-ответ','М-жауап']) {
  assert(src.includes(required), 'Missing mechanism or translation marker: '+required);
}
assert(src.includes("correctAnswer: 'b'"), 'Correct answer key changed');
assert(src.includes("(['a','b','c','d'] as const)"), 'Four distractor choices missing');
assert(registry.includes('createModuleThreeMedia'), 'Module 3 reviewed media is not yet registered in content/index.ts');
for (const lang of ['RU','EN','KZ']) {
  assert(registry.includes('createModuleThreeMedia("'+lang+'"'), 'Missing '+lang+' media registration');
}
console.log('PASS: Module 3 media source, languages, mechanism, four options and registration');
