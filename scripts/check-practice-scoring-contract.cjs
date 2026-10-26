// Guard against false-positive completion for interactive practice answers.
// Run: node scripts/check-practice-scoring-contract.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const file = "components/PracticeContent.tsx";
const src = read(file);
const ast = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length, 0, "PracticeContent TSX syntax");
const compiled = ts.transpileModule(src, {
  fileName: file,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "PracticeContent TSX transpilation");
const between = (a,b) => {
  const start = src.indexOf(a);
  const end = src.indexOf(b,start+1);
  assert(start>=0 && end>start, "Cannot isolate "+a);
  return src.slice(start,end);
};
const sequence = between("function Sequence(", "function Classification(");
const classification = between("function Classification(", "function Worksheet(");
assert(sequence.includes("const isCorrect = selected.every((value, index) => value === index);"),
  "Sequence correctness must compare every position");
assert(sequence.includes("onComplete?.(isCorrect)"), "Wrong sequence must not be completed");
assert(!sequence.includes("onComplete?.(true)"), "Sequence cannot always complete on submit");
assert(sequence.includes("onComplete?.(false)"), "Sequence edits must invalidate completion");
assert(classification.includes("const allCorrect = block.items.every((item, index) => choices[index] === item.group);"),
  "Classification must check the actual answer key");
assert(classification.includes("onComplete?.(allCorrect)"),
  "Wrong classification must not be marked complete");
assert(!classification.includes("onComplete?.(true)"), "Classification cannot always complete on submit");
for (const [selected,expected] of [
  [[0,1,2],true], [[1,0,2],false], [[2,1,0],false], [[0,2,1],false]
]) assert.equal(selected.every((value,index)=>value===index),expected,"Sequence truth table");
for (const [choices,expected] of [
  [[0,1,0],[0,1,0]], [[1,1,0],[0,1,0]], [[0,1,1],[0,1,0]]
]) assert.equal(choices.every((value,index)=>value===expected[index]),choices[0]===0&&choices[2]===0,
  "Classification truth table");
const preview = JSON.parse(read("vercel.json"));
assert.equal(preview.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
  "Review branch previews must remain disabled");
console.log("PASS: practice sequence and classification completion requires correct answers; TSX source and preview guard.");
console.log("NOTE: source-level contract, not a browser or full TypeScript typecheck.");
