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
// The existing generic four-frame SVG must not be described as a physiological myelin experiment.
for (const phrase of [
  'Условная четырёхэтапная визуализация',
  'generic four-step process illustration',
  'төрт кезеңдік шартты сызбасы',
]) assert(src.includes(phrase), 'Module 3 media must disclose the generic diagram: '+phrase);
const animation=fs.readFileSync('components/FoundationMediaAnimation.tsx','utf8');
assert(animation.includes('moduleId===3?"cells"'), 'Generic module 3 visual changed: reassess scientific claims');
assert(src.includes("correctAnswer: 'b'"), 'Correct answer key changed');
assert(src.includes("(['a','b','c','d'] as const)"), 'Four distractor choices missing');
assert(registry.includes('createModuleThreeMedia'), 'Module 3 reviewed media is not yet registered in content/index.ts');
for (const lang of ['RU','EN','KZ']) {
  assert(registry.includes('createModuleThreeMedia("'+lang+'"'), 'Missing '+lang+' media registration');
}
console.log('PASS: Module 3 media source, languages, mechanism, four options and registration');
