// Module 11: authored motor-control branching questions, feedback and route.
// Run from repository root: node scripts/check-module-eleven-tests.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-eleven-tests.ts";
const source = read(path);
const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length, 0, "Module 11 test TS syntax");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 11 test TS transpilation");
const exports = {};
new Function("exports", compiled.outputText)(exports);
assert.equal(typeof exports.adaptModuleElevenTest, "function");
const names = ["concept", "mechanism", "application", "transfer", "justification"];
const markers = {
  RU: ["мотонейрон", "перекр", "постураль", "проприоцепц", "рефлекс"],
  EN: ["motor neuron", "cross", "postural", "propriocept", "reflex"],
  KZ: ["мотонейрон", "айқас", "постураль", "проприоцепц", "рефлекс"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const nodes = {};
  for (const competency of names) {
    for (const level of ["main", "corrective", "basic"]) {
      const id = competency + ":" + level;
      nodes[id] = { id, type: "question", level, competency,
        prompt: "generic", options: [], correctAnswer: "a", explanation: "",
        onCorrect: "end", onIncorrect: "end" };
    }
    for (const suffix of ["review-1", "review-2"]) {
      const id = competency + ":" + suffix;
      nodes[id] = { id, type: "remediation", competency,
        depth: suffix === "review-1" ? 1 : 2, text: "generic",
        theoryTarget: { moduleId: 11, anchor: "mechanism" }, next: "end" };
    }
  }
  const base = { kind: "tests", title: "Motor control", moduleTitle: "Motor control",
    ui: {}, start: "concept:main", mainIds: names.map(n => n + ":main"),
    competencies: {}, nodes };
  const test = exports.adaptModuleElevenTest(base, lang);
  assert.equal(test.kind, "tests");
  assert.equal(test.start, base.start, "Do not change branching start");
  assert.deepEqual(test.mainIds, base.mainIds, "Do not change main path");
  assert.equal(Object.keys(test.nodes).length, 25);
  const allPrompts = [];
  for (const competency of names) {
    const main = test.nodes[competency + ":main"];
    const corrective = test.nodes[competency + ":corrective"];
    assert.notEqual(main.prompt, corrective.prompt, lang + ": repeated corrective prompt");
    for (const level of ["main", "corrective", "basic"]) {
      const item = test.nodes[competency + ":" + level];
      const old = base.nodes[item.id];
      assert.equal(item.type, "question");
      assert.equal(item.onCorrect, old.onCorrect, "Correct edge changed");
      assert.equal(item.onIncorrect, old.onIncorrect, "Remediation edge changed");
      assert(item.prompt.length >= 85, lang + " short prompt " + item.id);
      assert(item.explanation.length >= 120, lang + " short explanation " + item.id);
      assert.equal(item.options.length, 4);
      assert.equal(new Set(item.options.map(o => o.id)).size, 4);
      assert.equal(new Set(item.options.map(o => o.text)).size, 4);
      assert(item.options.every(o => o.text.length >= 40));
      assert.equal(item.options.filter(o => o.id === item.correctAnswer).length, 1);
    }
    allPrompts.push(main.prompt, corrective.prompt);
    for (const suffix of ["review-1", "review-2"]) {
      const item = test.nodes[competency + ":" + suffix];
      assert.equal(item.type, "remediation");
      assert(item.text.length >= 140, "Remediation must explain mechanism");
      assert.equal(item.theoryTarget.moduleId, 11);
      assert(["mechanism", "interpretation"].includes(item.theoryTarget.anchor));
      assert.equal(item.next, base.nodes[item.id].next, "Review edge changed");
    }
  }
  assert.equal(new Set(allPrompts).size, 10, lang + ": duplicated main/corrective questions");
  const full = JSON.stringify(test).toLowerCase();
  for (const marker of markers[lang]) assert(full.includes(marker.toLowerCase()),
    lang + ": missing physiology marker " + marker);
  assert(!full.includes("selectively weakened"), lang + ": generic assessment remains");
  assert(!full.includes("избирательно ослабили"), lang + ": generic assessment remains");
  assert(!full.includes("таңдамалы әлсіретілді"), lang + ": generic assessment remains");
  assert.equal(new Set(names.map(n => test.nodes[n + ":main"].options.findIndex(
    o => o.id === "a"))).size, 4, "Correct answer position not rotated");
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { adaptModuleElevenTest } from "./module-eleven-tests";'));
assert(assessment.includes("topic.id===11 ? adaptModuleElevenTest(result,l) : result;"));
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("return createFoundationTest("));
const registry = read("content/index.ts");
assert(registry.includes("...foundationLessons[11]"));
const routes = read("content/sections.ts");
assert(routes.includes('slug: "tests"'));
const renderer = read("components/SectionContent.tsx");
assert(renderer.includes('case "tests"'));
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("check-module-eleven-tests.cjs"));
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 11: 10 authored questions × 3 languages, 15 question nodes and 10 remediations per language, branching, route and preview lock.");
console.log("NOTE: Node execution does not replace full project typecheck, build, browser QA or independent Kazakh-language review.");
