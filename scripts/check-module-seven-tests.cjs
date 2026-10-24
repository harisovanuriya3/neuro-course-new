// Module 7 / tests: execute the authored main and corrective questions after TypeScript transpilation.
// Five basic-route questions remain under scientific review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-seven-tests.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 test source must parse");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const mod = { exports: {} };
new Function("module", "exports", compiled.outputText)(mod, mod.exports);
const create = mod.exports.createModuleSevenTests;
assert.equal(typeof create, "function");
const ids = ["concept:main", "mechanism:main", "application:main", "transfer:main", "justification:main"];
const correctiveIds = ids.map(id => id.replace(":main", ":corrective"));
const labels = ["RU", "EN", "KZ"];
const firstCorrectPositions = [];
for (const language of labels) {
  const nodes = {};
  for (const id of ids) {
    // Preserve a different display order than answer ID order to detect accidental positional keys.
    const order = ["c", "a", "d", "b"];
    nodes[id] = {
      id, type: "question", level: "main", competency: id.split(":")[0],
      prompt: "unreviewed", options: order.map(x => ({ id: x, text: "old-" + x })),
      correctAnswer: "a", explanation: "unreviewed",
      onCorrect: "end", onIncorrect: "concept:review-1"
    };
  }
  for (const id of correctiveIds) {
    const order = ["d", "b", "a", "c"];
    nodes[id] = {
      id, type: "question", level: "corrective", competency: id.split(":")[0],
      prompt: "unreviewed", options: order.map(x => ({ id: x, text: "old-" + x })),
      correctAnswer: "a", explanation: "unreviewed",
      onCorrect: "next:main", onIncorrect: id.replace(":corrective", ":review-2")
    };
  }
  nodes["concept:basic"] = {
    id: "concept:basic", type: "question", level: "basic", competency: "concept",
    prompt: "unreviewed basic", options: [], correctAnswer: "a",
    explanation: "unreviewed basic", onCorrect: "end", onIncorrect: "end"
  };
  const base = { kind: "tests", title: "Formative test", moduleTitle: "Old", ui: {}, start: ids[0],
    mainIds: ids, competencies: {}, nodes };
  const result = create(language, "Module 7", base);
  assert.equal(result.kind, "tests");
  assert.equal(result.moduleTitle, "Module 7");
  assert.equal(result.start, base.start);
  assert.deepEqual(result.mainIds, base.mainIds);
  assert.equal(result.nodes["concept:basic"], base.nodes["concept:basic"],
    "Unreviewed basic branches must remain untouched");
  assert.equal(result.nodes !== base.nodes, true, "Do not mutate the base node dictionary");
  for (const id of [...ids, ...correctiveIds]) {
    const q = result.nodes[id];
    assert.equal(q.level, id.endsWith(":main") ? "main" : "corrective");
    assert.equal(q.onCorrect, base.nodes[id].onCorrect);
    assert.equal(q.onIncorrect, base.nodes[id].onIncorrect);
    assert.equal(q.type, "question");
    assert.equal(q.correctAnswer, "a");
    assert(q.prompt.trim().length > 70, language + " " + id + " lacks concrete prompt");
    assert(q.explanation.trim().length > 110, language + " " + id + " lacks feedback");
    assert.equal(q.options.length, 4);
    assert.deepEqual(q.options.map(o => o.id),
      id.endsWith(":main") ? ["c", "a", "d", "b"] : ["d", "b", "a", "c"],
      "Original deterministic shuffle must be preserved");
    assert.equal(new Set(q.options.map(o => o.text)).size, 4,
      language + " " + id + " has duplicate options");
    assert(q.options.every(o => o.text.trim().length > 30), language + " " + id + " short option");
    assert(q.options.find(o => o.id === "a").text.length > 40);
    assert(!q.prompt.includes("unreviewed"));
  }
  firstCorrectPositions.push(result.nodes["concept:main"].options.findIndex(o => o.id === "a"));
}
assert.deepEqual(firstCorrectPositions, [1, 1, 1]);
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenTests } from "./course-foundation/module-seven-tests";'));
for (const lang of labels) assert(registry.includes('createModuleSevenTests("' + lang + '", modules.' + lang + '[6]'),
  "Module 7 tests not wired for " + lang);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must never auto-deploy previews");
console.log("PASS: module 7 / tests: 10 authored main/corrective questions × RU/EN/KZ, 4 options, stable answer IDs, explanations, routing.");
console.log("OPEN: 5 basic questions, full browser and scientific review.");
