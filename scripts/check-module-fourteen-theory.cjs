// Module 14 thalamus theory: content, language, route and preview regression.
// Scientific review is logged separately; this is not independent medical validation.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-fourteen-theory.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 theory parse errors");
const transpiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true
});
assert.equal((transpiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length,
  0, "Module 14 theory transpile errors");
const context = { exports: {} };
vm.runInNewContext(transpiled.outputText, context);
const create = context.exports.createModuleFourteenTheory;
assert.equal(typeof create, "function");
const ids = [
  "thalamic-nuclear-map",
  "somatosensory-relays-and-somatotopy",
  "geniculate-and-olfactory-exception",
  "relay-feedback-and-inhibition",
  "motor-associative-and-arousal-loops",
  "clinical-testing-and-inference-limits"
];
const markers = {
  RU: ["таламус", "VPL", "VPM", "медиальной петле", "соматотоп", "хиазм", "обонятельн",
    "глутамат", "ГАМК", "ретикулярн", "мозжеч", "внимани", "двухточечн"],
  EN: ["thalamus", "VPL", "VPM", "medial lemniscus", "somatotop", "chiasm", "olfactor",
    "glutamate", "GABA", "reticular", "cerebell", "attention", "two-point"],
  KZ: ["таламус", "VPL", "VPM", "медиалдық ілмек", "соматотоп", "хиазма", "иіс сезу",
    "глутамат", "ГАМҚ", "ретикуляр", "мишық", "зейін", "екі нүктені"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const base = { kind: "theory", title: "Existing", sections: [
    { id: "quick-summary", title: "Foundation summary", blocks: [] },
    { id: "mechanism", title: "Foundation mechanism", blocks: [] },
    { id: "interpretation", title: "Foundation interpretation", blocks: [] }
  ] };
  const lesson = create(lang, base);
  assert.equal(lesson.kind, "theory");
  assert.equal(lesson.sections.length, base.sections.length + ids.length);
  for (let i = 0; i < base.sections.length; i++)
    assert.equal(lesson.sections[i], base.sections[i], lang + ": existing section lost");
  assert.deepEqual(Array.from(lesson.sections.slice(base.sections.length), x => x.id), ids);
  const paragraphs = [];
  for (const section of lesson.sections.slice(base.sections.length)) {
    assert(section.title.length >= 15, lang + ": short heading");
    assert.equal(section.blocks.length, 2, lang + ": expected two paragraphs");
    for (const block of section.blocks) {
      assert.equal(block.type, "paragraph");
      assert(block.text.length >= 190, lang + ": short paragraph");
      paragraphs.push(block.text);
    }
  }
  assert.equal(new Set(paragraphs).size, 12, lang + ": duplicated paragraphs");
  const body = paragraphs.join(" ").toLocaleLowerCase();
  for (const marker of markers[lang])
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  assert(!/diagnosis confirmed|диагноз установлен|диагноз анықталды/i.test(body),
    lang + ": unjustified diagnosis");
  if (lang === "KZ")
    assert(!/\b(которые|следовательно|однако|потому что)\b/i.test(body), "KZ: Russian leakage");
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleFourteenTheory } from "./course-foundation/module-fourteen-theory";'));
const start = index.indexOf("  14: {", index.indexOf("const lessons"));
const end = index.indexOf("  13: {", start);
assert(start >= 0 && end > start, "Module 14 registry missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[14]"), "Module 14 foundation lost");
assert(block.includes("createModuleFourteenObjectives") && block.includes("createModuleFourteenPretest"),
  "Previously reviewed objectives or pretest lost");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes('createModuleFourteenTheory("' + lang + '", foundationLessons[14].theory.' + lang),
    lang + ": theory route missing");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "theory", lang);
  assert.equal(lesson?.kind, "theory", lang + ": wrong route kind");
  for (const id of ids)
    assert(lesson.sections.some(section => section.id === id), lang + ": missing " + id);
  assert(getLesson(14, "objectives", lang), lang + ": objectives lost");
  assert(getLesson(14, "pretest", lang), lang + ": pretest lost");
}
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fourteen-theory.cjs"),
  "Regression missing from audit:science");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch Vercel preview must remain disabled");
console.log("PASS: Module 14 theory, six blocks x two paragraphs x RU/EN/KZ; routes and preview guard.");
console.log("OPEN: independent KZ and medical review, full CI, browser/voice/mobile/E2E.");
