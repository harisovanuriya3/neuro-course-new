// Module 10 glossary contract: authored brainstem definitions and meaningful links.
// Requires installed TypeScript. This is not a browser, clinical or native-language audit.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const file = "content/course-foundation/module-ten-glossary.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 10 glossary TypeScript parse");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleTenGlossary;
assert.equal(typeof create, "function");

const theory = read("content/course-foundation/module-ten-theory.ts");
const anchors = new Set([
  "brainstem-levels-and-tracts",
  "pupillary-and-corneal-reflexes",
  "ascending-arousal-and-descending-posture",
  "distributed-autonomic-brainstem-networks"
]);
for (const anchor of anchors) {
  assert(theory.includes('id:"' + anchor + '"'), "Missing theory anchor " + anchor);
}
const expectedIds = [
  "medulla", "pons", "midbrain", "pupillary-light", "corneal",
  "ascending-arousal", "reticulospinal", "baep", "baroreflex", "respiratory-network"
];
const names = {
  RU: ["Ретикулярная формация", "Бодрствование"],
  EN: ["Reticular formation", "Wakefulness"],
  KZ: ["Ретикулярлық формация", "Сергектік"]
};
const markers = {
  RU: ["сознания", "полисинаптический", "вызванные потенциалы", "барорецепторный"],
  EN: ["consciousness", "polysynaptic", "evoked potentials", "baroreflex"],
  KZ: ["сананың", "полисинапстық", "шақырылған потенциалдары", "барорефлекс"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const base = {
    kind: "glossary", title: "Glossary", introduction: "old",
    terms: names[language].map((term, i) => ({
      id: "module-10-term-" + (i + 1), term, definition: "old",
      target: { section: "theory" }
    }))
  };
  const lesson = create(language, base);
  assert.equal(lesson.kind, "glossary");
  assert.equal(lesson.terms.length, 12, language + ": 2 foundation + 10 terms");
  assert.equal(base.terms[0].definition, "old", "Foundation terms must not be mutated");
  assert.equal(base.terms[1].definition, "old", "Foundation terms must not be mutated");
  assert.equal(lesson.terms[0].term, names[language][0]);
  assert.equal(lesson.terms[1].term, names[language][1]);
  assert.equal(lesson.terms[0].target.anchor, "ascending-arousal-and-descending-posture");
  assert.equal(lesson.terms[1].target.anchor, "ascending-arousal-and-descending-posture");
  assert(lesson.introduction.length >= 120, language + ": insufficient introduction");
  const ids = lesson.terms.map(t => t.id);
  assert.equal(new Set(ids).size, 12, language + ": duplicate IDs");
  assert.equal(new Set(lesson.terms.map(t => t.term.toLowerCase())).size, 12, language + ": duplicate terms");
  for (const slug of expectedIds)
    assert(ids.includes("module-10-glossary-" + slug), language + ": missing " + slug);
  for (const term of lesson.terms) {
    assert(term.term.trim().length >= 5, language + ": empty term " + term.id);
    assert(term.definition.trim().length >= 120, language + ": weak definition " + term.id);
    if (term.id === "module-10-glossary-baep") {
      assert.equal(term.target.section, "media", language + ": BAEP must lead to authored media");
      assert.equal(term.target.anchor, undefined);
    } else {
      assert.equal(term.target.section, "theory", language + ": bad section " + term.id);
      assert(anchors.has(term.target.anchor), language + ": missing theory anchor " + term.id);
    }
  }
  const combined = lesson.terms.map(t => t.term + " " + t.definition).join(" ").toLowerCase();
  for (const marker of markers[language])
    assert(combined.includes(marker.toLowerCase()), language + ": missing physiology marker " + marker);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleTenGlossary } from "./course-foundation/module-ten-glossary";'));
for (const language of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleTenGlossary("' + language + '", foundationLessons[10].glossary.' + language),
    "Module 10 glossary not wired for " + language);
assert(read("content/course-foundation/module-ten-media.ts").includes("createModuleTenMedia"));
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not enable previews");
console.log("PASS: module 10 glossary 12 terms × 3 languages; 4 theory anchors, BAEP media and registry.");
console.log("OPEN: npm audit:course, full TypeScript/build, real browser and independent Kazakh review.");
