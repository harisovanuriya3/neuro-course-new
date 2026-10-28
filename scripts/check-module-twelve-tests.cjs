// Regression: module 12 basal-ganglia branching test (RU/EN/KZ).
// Run: node scripts/check-module-twelve-tests.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-twelve-tests.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "TypeScript syntax");
const compiled = ts.transpileModule(source, { fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true });
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.adaptModuleTwelveTest, "function");
const names = ["concept", "mechanism", "application", "transfer", "justification"];
const markers = {
  RU: ["таламус", "GPi", "GPe", "STN", "D1", "D2", "брадикинез"],
  EN: ["thalamus", "GPi", "GPe", "STN", "D1", "D2", "bradykines"],
  KZ: ["таламус", "GPi", "GPe", "STN", "D1", "D2", "брадикинез"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const nodes = {};
  for (const name of names) {
    for (const level of ["main", "corrective", "basic"]) {
      const id = name + ":" + level;
      nodes[id] = { id, type: "question", competency: name, level,
        prompt: "generic", options: [], correctAnswer: "a", explanation: "",
        onCorrect: "end", onIncorrect: "end" };
    }
    for (const suffix of ["review-1", "review-2"]) {
      const id = name + ":" + suffix;
      nodes[id] = { id, type: "remediation", competency: name, depth: suffix === "review-1" ? 1 : 2,
        text: "generic", theoryTarget: { moduleId: 12, anchor: "mechanism" }, next: "end" };
    }
  }
  const base = { kind: "tests", title: "Basal ganglia", moduleTitle: "Basal ganglia",
    ui: {}, start: "concept:main", mainIds: names.map(n => n + ":main"), competencies: {}, nodes };
  const test = exported.adaptModuleTwelveTest(base, lang);
  assert.equal(test.start, base.start);
  assert.deepEqual(test.mainIds, base.mainIds);
  assert.equal(Object.keys(test.nodes).length, 25);
  const prompts = [];
  const positions = [];
  for (const name of names) {
    for (const level of ["main", "corrective", "basic"]) {
      const key = name + ":" + level;
      const item = test.nodes[key], old = nodes[key];
      assert.equal(item.type, "question");
      assert.equal(item.onCorrect, old.onCorrect);
      assert.equal(item.onIncorrect, old.onIncorrect);
      assert(item.prompt.length >= 55, lang + ": short prompt " + key);
      assert(item.explanation.length >= 110, lang + ": short explanation " + key);
      assert.equal(item.options.length, 4);
      assert.equal(new Set(item.options.map(x => x.id)).size, 4);
      assert.equal(new Set(item.options.map(x => x.text)).size, 4);
      assert(item.options.every(x => x.text.length >= 45), lang + ": short option " + key);
      assert.equal(item.options.filter(x => x.id === item.correctAnswer).length, 1);
      prompts.push(item.prompt);
      if (level === "main") positions.push(item.options.findIndex(x => x.id === "a"));
    }
    for (const suffix of ["review-1", "review-2"]) {
      const key = name + ":" + suffix, item = test.nodes[key];
      assert.equal(item.type, "remediation");
      assert.equal(item.next, nodes[key].next);
      assert(item.text.length >= 110);
      assert.equal(item.theoryTarget.moduleId, 12);
      assert(["mechanism", "interpretation"].includes(item.theoryTarget.anchor));
    }
  }
  assert.equal(new Set(prompts).size, 15, lang + ": repeated prompts");
  assert.equal(new Set(positions).size, 4, lang + ": correct answers insufficiently rotated");
  const all = JSON.stringify(test).toLowerCase();
  for (const marker of markers[lang]) assert(all.includes(marker.toLowerCase()), lang + ": missing " + marker);
  assert(!all.includes("selectively weakened"));
  assert(!all.includes("избирательно ослабили"));
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { adaptModuleTwelveTest } from "./module-twelve-tests";'));
assert(/topic\.id===12 \? adaptModuleTwelveTest\(result,l\) :/.test(assessment), "module 12 adapter dispatch must remain registered");
assert(read("content/course-foundation/index.ts").includes("return createFoundationTest("));
assert(read("content/index.ts").includes("...foundationLessons[12]"));
assert(read("content/sections.ts").includes('slug: "tests"'));
assert(read("components/SectionContent.tsx").includes('case "tests"'));
assert(JSON.parse(read("package.json")).scripts["audit:science"].includes("check-module-twelve-tests.cjs"));
assert.equal(JSON.parse(read("vercel.json")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 12 basal ganglia: 15 question nodes and 10 remediations per language, branching preserved, RU/EN/KZ, route and preview lock.");
console.log("NOTE: independent KZ review, full typecheck, build, browser and audio checks remain required.");
