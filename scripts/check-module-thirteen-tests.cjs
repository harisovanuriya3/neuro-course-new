// Module 13 cerebellar branching test regression (RU/EN/KZ).
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-thirteen-tests.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "TS syntax");
const compiled = ts.transpileModule(source, { fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS }, reportDiagnostics: true });
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const exported = {};
new Function("exports", compiled.outputText)(exported);
assert.equal(typeof exported.adaptModuleThirteenTest, "function");
const names = ["concept", "mechanism", "application", "transfer", "justification"];
const markers = {
  RU: ["Пуркинье", "проприоцепц", "дисметри", "адаптац", "Ромберг"],
  EN: ["Purkinje", "propriocept", "dysmetria", "adaptation", "Romberg"],
  KZ: ["Пуркинье", "проприоцепц", "дисметри", "бейімдел", "Ромберг"]
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
      nodes[id] = { id, type: "remediation", competency: name,
        depth: suffix === "review-1" ? 1 : 2, text: "generic",
        theoryTarget: { moduleId: 13, anchor: "mechanism" }, next: "end" };
    }
  }
  const base = { kind: "tests", title: "Cerebellum", moduleTitle: "Cerebellum",
    ui: {}, start: "concept:main", mainIds: names.map(n => n + ":main"), competencies: {}, nodes };
  const test = exported.adaptModuleThirteenTest(base, lang);
  assert.equal(test.start, base.start);
  assert.deepEqual(test.mainIds, base.mainIds);
  assert.equal(Object.keys(test.nodes).length, 25);
  const prompts = [];
  const correctPositions = [];
  for (const name of names) {
    for (const level of ["main", "corrective", "basic"]) {
      const key = name + ":" + level;
      const node = test.nodes[key], original = nodes[key];
      assert.equal(node.type, "question");
      assert.equal(node.onCorrect, original.onCorrect);
      assert.equal(node.onIncorrect, original.onIncorrect);
      assert(node.prompt.length >= 35, lang + ": short prompt " + key);
      assert(node.explanation.length >= 110, lang + ": short explanation " + key);
      assert.equal(node.options.length, 4);
      assert.equal(new Set(node.options.map(x => x.id)).size, 4);
      assert.equal(new Set(node.options.map(x => x.text)).size, 4);
      assert(node.options.every(x => x.text.length >= 45), lang + ": short choice " + key);
      assert.equal(node.options.filter(x => x.id === node.correctAnswer).length, 1);
      prompts.push(node.prompt);
      if (level === "main") correctPositions.push(node.options.findIndex(x => x.id === node.correctAnswer));
      if (lang === "RU") assert(!/[әғқңөұүһі]/i.test(node.prompt + node.explanation + node.options.map(x => x.text).join(" ")), "Kazakh-only glyphs in Russian " + key);
    }
    for (const suffix of ["review-1", "review-2"]) {
      const key = name + ":" + suffix, node = test.nodes[key];
      assert.equal(node.type, "remediation");
      assert.equal(node.next, nodes[key].next);
      assert(node.text.length >= 110);
      assert.equal(node.theoryTarget.moduleId, 13);
      assert(["mechanism", "interpretation"].includes(node.theoryTarget.anchor));
    }
  }
  assert.equal(new Set(prompts).size, 15, lang + ": repeated prompts");
  assert.equal(new Set(correctPositions).size, 4, lang + ": correct answer position not rotated");
  const all = JSON.stringify(test).toLowerCase();
  for (const marker of markers[lang]) assert(all.includes(marker.toLowerCase()), lang + ": missing " + marker);
}
const assessment = read("content/course-foundation/assessment.ts");
assert(assessment.includes('import { adaptModuleThirteenTest } from "./module-thirteen-tests";'));
assert(assessment.includes("topic.id===13 ? adaptModuleThirteenTest(result,l) : result;"));
assert(read("content/course-foundation/index.ts").includes("return createFoundationTest("));
assert(read("content/index.ts").includes("...foundationLessons[13]"));
assert(read("content/sections.ts").includes('slug: "tests"'));
assert(read("components/SectionContent.tsx").includes('case "tests"'));
assert(JSON.parse(read("package.json")).scripts["audit:science"].includes("check-module-thirteen-tests.cjs"));
assert.equal(JSON.parse(read("vercel.json")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 13 tests, 15 question nodes and 10 remediations per language, RU/EN/KZ, branch transitions and Vercel preview guard.");
console.log("NOTE: independent medical KZ review and browser/audio/E2E tests remain required.");
