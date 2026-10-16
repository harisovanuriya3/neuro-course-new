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
for (const required of ['nodes of Ranvier','Ранвье','Ранвье түйіндері','Oligodendrocytes','Олигодендроциты','Олигодендроциттер','CMAP','М-ответ','М-жауап']) {
  assert(src.includes(required), 'Missing mechanism or translation marker: '+required);
}
// Module 3 now uses a separate, qualitative myelin comparison.
for (const phrase of [
  'Схематическое сравнение проведения',
  'qualitative comparison of intact myelin',
  'миелині сақталған және жергілікті демиелинденген',
]) assert(src.includes(phrase), 'Module 3 media must disclose schematic limits: '+phrase);
const component=fs.readFileSync('components/ModuleThreeMediaAnimation.tsx','utf8');
const renderer=fs.readFileSync('components/MediaContent.tsx','utf8');
const diagramAst=ts.createSourceFile('components/ModuleThreeMediaAnimation.tsx',component,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(diagramAst.parseDiagnostics.length,0,'Module 3 diagram TSX must parse');
assert(renderer.includes('moduleId === "3" && block.animation === "foundation"'),'Module 3 diagram not connected to media route');
assert(renderer.includes('import ModuleThreeMediaAnimation'),'Module 3 diagram import missing');
for(const term of ['RU:', 'EN:', 'KZ:', 'Conduction block is possible','Блок проведения возможен','Өткізудің бөгелуі мүмкін']) assert(component.includes(term),'Missing diagram language/caveat: '+term);
assert(src.includes("correctAnswer: 'b'"), 'Correct answer key changed');
assert(src.includes("(['a','b','c','d'] as const)"), 'Four distractor choices missing');
assert(registry.includes('createModuleThreeMedia'), 'Module 3 reviewed media is not yet registered in content/index.ts');
for (const lang of ['RU','EN','KZ']) {
  assert(registry.includes('createModuleThreeMedia("'+lang+'"'), 'Missing '+lang+' media registration');
}
console.log('PASS: Module 3 media source, languages, mechanism, four options and registration');
require('./check-module-three-references.cjs');
