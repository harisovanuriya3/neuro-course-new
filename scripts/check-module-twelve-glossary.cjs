// Module 12 glossary: TS syntax, compiled factory, 13 terms × RU/EN/KZ,
// physiology markers, theory anchors, registry, and disabled Vercel preview.
// Not a substitute for full build, browser QA or independent KZ review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-twelve-glossary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "glossary TypeScript parse");
const compiled = ts.transpileModule(source, {
  fileName: path,
  reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleTwelveGlossary;
assert.equal(typeof create, "function");
const theory = read("content/course-foundation/module-twelve-theory.ts");
const anchors = new Set([
  "basal-ganglia-nodes-and-loops",
  "direct-indirect-and-hyperdirect",
  "dopamine-modulates-selection",
  "hypokinetic-hyperkinetic-and-differential"
]);
for (const anchor of anchors)
  assert(theory.includes('"id": "' + anchor + '"'), "missing theory anchor " + anchor);
const expected = [
  "caudate", "putamen", "gpe", "output", "stn", "snc",
  "direct", "indirect", "hyperdirect", "d1d2", "bradykinesia"
];
const baseTerms = {
  RU: ["Полосатое тело", "Бледный шар"],
  EN: ["Striatum", "Globus pallidus"],
  KZ: ["Стриатум", "Бозғылт шар"]
};
const markers = {
  RU: ["таламус", "тормож", "дофамин", "мышц", "D1", "D2"],
  EN: ["thalam", "inhib", "dopamine", "muscle", "D1", "D2"],
  KZ: ["таламус", "теж", "дофамин", "бұлшықет", "D1", "D2"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const base = {
    kind: "glossary", title: "Glossary", introduction: "generic",
    terms: baseTerms[language].map((term, i) => ({
      id: "module-12-term-" + (i + 1), term,
      definition: "generic placeholder", target: { section: "theory" }
    }))
  };
  const lesson = create(language, base);
  assert.equal(lesson.kind, "glossary");
  assert.equal(lesson.terms.length, 13, language + ": count");
  assert.equal(base.terms[0].definition, "generic placeholder", "must not mutate base");
  assert.equal(base.terms[1].definition, "generic placeholder", "must not mutate base");
  assert(lesson.introduction.length >= 100, language + ": short introduction");
  const ids = lesson.terms.map(x => x.id);
  assert.equal(new Set(ids).size, 13, language + ": duplicate IDs");
  assert.equal(new Set(lesson.terms.map(x => x.term.toLowerCase())).size, 13, language + ": duplicate names");
  for (const id of expected)
    assert(ids.includes("module-12-glossary-" + id), language + ": missing " + id);
  for (const item of lesson.terms) {
    assert(item.term.trim().length >= 3, language + ": short term");
    assert(item.definition.trim().length >= 130, language + ": short definition " + item.id);
    assert.equal(item.target.section, "theory", language + ": wrong section");
    assert(anchors.has(item.target.anchor), language + ": broken theory anchor " + item.id);
    assert(!item.definition.includes("generic placeholder"), language + ": unreviewed definition");
  }
  const combined = lesson.terms.map(x => x.definition).join(" ").toLowerCase();
  for (const marker of markers[language])
    assert(combined.includes(marker.toLowerCase()), language + ": missing physiology marker " + marker);
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleTwelveGlossary } from "./course-foundation/module-twelve-glossary";'));
for (const language of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleTwelveGlossary("' + language + '", foundationLessons[12].glossary.' + language),
    "module 12 glossary not registered for " + language);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 12 glossary, 13 terms × RU/EN/KZ, theory anchors and routing.");
console.log("OPEN: full npm audit, typecheck/build, browser and independent KZ review.");
