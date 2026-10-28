// Module 13 glossary: TS parse/transpile, physiological terms, RU/EN/KZ,
// valid theory anchors, route registration, and disabled Vercel previews.
// Does not replace independent medical KZ review or browser/E2E checks.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-thirteen-glossary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "glossary TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleThirteenGlossary;
assert.equal(typeof create, "function");
const theory = read("content/course-foundation/module-thirteen-theory.ts");
const anchors = new Set([
  "cerebellar-functional-divisions",
  "cerebellar-afferents-and-efference-copy",
  "purkinje-deep-nuclei-microcircuit",
  "deep-nuclei-and-motor-output",
  "timing-adaptation-and-experiment",
  "clinical-signs-and-evidence-limits"
]);
for (const anchor of anchors)
  assert(theory.includes('"id": "' + anchor + '"'), "missing theory anchor " + anchor);
const expected = ["vestibulocerebellum", "spinocerebellum", "cerebrocerebellum",
  "purkinje", "mossy", "climbing", "deep-nuclei", "efference-copy", "intention-tremor", "romberg"];
const baseTerms = {
  RU: ["Дисметрия", "Двигательное обучение"],
  EN: ["Dysmetria", "Motor learning"],
  KZ: ["Дисметрия", "Қимылға үйрену"]
};
const markers = {
  RU: ["ГАМК", "тормож", "возбужд", "Ромберг", "Пуркинье", "дисметри"],
  EN: ["GABA", "inhibit", "excite", "Romberg", "Purkinje", "dysmetria"],
  KZ: ["ГАМҚ", "теж", "қоздыр", "Ромберг", "Пуркинье", "дисметрия"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const base = {kind: "glossary", title: "Glossary", introduction: "generic",
    terms: baseTerms[language].map((term, i) => ({
      id: "module-13-term-" + (i + 1), term,
      definition: "generic placeholder", target: { section: "theory" }
    }))};
  const lesson = create(language, base);
  assert.equal(lesson.kind, "glossary");
  assert.equal(lesson.terms.length, 12, language + ": count");
  assert.equal(base.terms[0].definition, "generic placeholder", "base mutated");
  assert(lesson.introduction.length >= 100, language + ": short introduction");
  const ids = lesson.terms.map(x => x.id);
  assert.equal(new Set(ids).size, 12, language + ": duplicate ids");
  assert.equal(new Set(lesson.terms.map(x => x.term.toLowerCase())).size, 12, language + ": duplicate names");
  for (const id of expected)
    assert(ids.includes("module-13-glossary-" + id), language + ": missing " + id);
  for (const item of lesson.terms) {
    assert(item.term.trim().length >= 3, language + ": short term");
    assert(item.definition.trim().length >= 120, language + ": short definition " + item.id);
    assert.equal(item.target.section, "theory");
    assert(anchors.has(item.target.anchor), language + ": broken theory anchor " + item.id);
    assert(!item.definition.includes("generic placeholder"), language + ": generic definition");
  }
  const combined = lesson.terms.map(x => x.definition).join(" ").toLowerCase();
  for (const marker of markers[language])
    assert(combined.includes(marker.toLowerCase()), language + ": missing marker " + marker);
  assert(lesson.terms[0].definition.toLowerCase().includes(language === "EN" ? "overshoot" : language === "RU" ? "цели" : "нысана"), "dysmetria mismatch");
  assert(lesson.terms[1].definition.toLowerCase().includes(language === "EN" ? "experience" : language === "RU" ? "опыт" : "тәжіриб"), "learning mismatch");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleThirteenGlossary } from "./course-foundation/module-thirteen-glossary";'));
for (const language of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleThirteenGlossary("' + language + '", foundationLessons[13].glossary.' + language),
    "module 13 glossary not registered: " + language);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 13 glossary, 12 terms x RU/EN/KZ, source anchors and routing.");
console.log("OPEN: independent KZ review, full CI, browser/mobile/voice/E2E.");
