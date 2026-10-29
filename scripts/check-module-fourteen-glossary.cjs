// Focused module 14 glossary contract: TS parse, 12 terms x RU/EN/KZ,
// validated theory anchors, anatomical distinctions, route and Vercel guard.
// Does not replace independent clinical/KZ review or full CI/browser testing.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p, "utf8");
const path = "content/course-foundation/module-fourteen-glossary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "glossary TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
const ctx = { exports: {} };
vm.runInNewContext(compiled.outputText, ctx);
const create = ctx.exports.createModuleFourteenGlossary;
assert.equal(typeof create, "function");
const theory = read("content/course-foundation/module-fourteen-theory.ts");
const anchors = new Set([
  "thalamic-nuclear-map", "somatosensory-relays-and-somatotopy",
  "geniculate-and-olfactory-exception", "relay-feedback-and-inhibition",
  "motor-associative-and-arousal-loops", "clinical-testing-and-inference-limits"
]);
for (const anchor of anchors)
  assert(theory.includes('"id": "' + anchor + '"'), "missing theory anchor " + anchor);
const ids = ["vpl", "vpm", "dcml", "anterolateral", "lgn", "mgn",
  "trn", "somatotopy", "olfaction", "motor-va-vl"];
const names = {
  RU: ["Таламическое ядро", "Таламокортикальная петля"],
  EN: ["Thalamic nucleus", "Thalamocortical loop"],
  KZ: ["Таламус ядросы", "Таламо-қыртыстық контур"]
};
const markers = {
  RU: ["VPL", "VPM", "зрительн", "слухов", "ГАМК", "обонятельн", "перекр", "мозжеч"],
  EN: ["VPL", "VPM", "visual", "auditory", "GABA", "olfactory", "cross", "cerebell"],
  KZ: ["VPL", "VPM", "көру", "есту", "ГАМҚ", "иіс", "айқас", "мишық"]
};
for (const language of ["RU", "EN", "KZ"]) {
  const base = { kind: "glossary", title: "Glossary", introduction: "generic",
    terms: names[language].map((term, index) => ({
      id: "module-14-term-" + (index + 1), term,
      definition: "generic placeholder", target: { section: "theory" }
    })) };
  const lesson = create(language, base);
  assert.equal(lesson.kind, "glossary");
  assert.equal(lesson.terms.length, 12, language + ": term count");
  assert.equal(base.terms[0].definition, "generic placeholder", "base mutated");
  assert(lesson.introduction.length >= 120, language + ": short introduction");
  assert.equal(new Set(lesson.terms.map(x => x.id)).size, 12, language + ": duplicate IDs");
  assert.equal(new Set(lesson.terms.map(x => x.term.toLowerCase())).size, 12, language + ": duplicate names");
  for (const id of ids)
    assert(lesson.terms.some(x => x.id === "module-14-glossary-" + id), language + ": missing " + id);
  for (const item of lesson.terms) {
    assert(item.term.length >= 3, language + ": short term");
    assert(item.definition.length >= 120, language + ": short definition " + item.id);
    assert(!item.definition.includes("generic placeholder"), language + ": generic definition");
    assert.equal(item.target.section, "theory", language + ": wrong section");
    assert(anchors.has(item.target.anchor), language + ": broken theory anchor " + item.id);
  }
  const combined = lesson.terms.map(x => x.term + " " + x.definition).join(" ").toLowerCase();
  for (const marker of markers[language])
    assert(combined.includes(marker.toLowerCase()), language + ": missing " + marker);
  const byId = id => lesson.terms.find(x => x.id === "module-14-glossary-" + id);
  assert(byId("vpl").definition.includes("VPL"));
  assert(byId("vpm").definition.includes("VPM"));
  assert(byId("lgn").definition.includes("LGN"));
  assert(byId("mgn").definition.includes("MGN"));
  assert(byId("trn").definition.includes("TRN"));
  assert(byId("olfaction").target.anchor === "geniculate-and-olfactory-exception");
  assert(byId("dcml").target.anchor === "somatosensory-relays-and-somatotopy");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleFourteenGlossary } from "./course-foundation/module-fourteen-glossary";'));
for (const language of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleFourteenGlossary("' + language + '", foundationLessons[14].glossary.' + language),
    "module 14 glossary not registered: " + language);
assert(registry.includes("createModuleThirteenGlossary"), "module 13 route lost");
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: module 14 glossary, 12 terms x RU/EN/KZ, anchors and routing.");
console.log("OPEN: independent KZ medical edit, full CI, browser/mobile/voice/E2E.");
