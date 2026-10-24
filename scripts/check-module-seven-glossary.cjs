// Module 7 glossary: terminology, localization, physiology and link contracts.
// Library cross-check: Guyton & Hall 13e PDF 666–668; Ganong 23e 169–171;
// C. L. Ghai Practical Physiology 8e 317–319.
// This source-level test does not replace medical language or browser review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-seven-glossary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 glossary TS syntax");
const compiled = ts.transpileModule(source, {
  fileName: path, reportDiagnostics: true,
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = {exports: {}};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleSevenGlossary;
assert.equal(typeof create, "function");

const validAnchors = new Set(["reflex-arc-path", "spindle-and-gamma",
  "inhibition-and-tendon", "reflex-examination-limits"]);
const theory = read("content/course-foundation/module-seven-theory.ts");
for (const anchor of validAnchors)
  assert(theory.includes('section("' + anchor + '"'), "Broken theory anchor " + anchor);
for (const language of ["RU", "EN", "KZ"]) {
  const base = {kind: "glossary", title: "Glossary", introduction: "Old",
    terms: [
      {id:"module-7-term-1", term: language === "RU" ? "Рефлекторная дуга" : language === "EN" ? "Reflex arc" : "Рефлекторлық доға",
        definition:"Incorrect generic reflex response", target:{section:"theory"}},
      {id:"module-7-term-2", term: language === "RU" ? "Реципрокное торможение" : language === "EN" ? "Reciprocal inhibition" : "Реципроктық тежелу",
        definition:"Incorrect generic neural network", target:{section:"theory"}},
      ...["unconditioned","conditioned","extinction"].map(id => ({
        id:"module-7-extra-"+id, term:id, definition:"Unrelated learning term", target:{section:"theory"}
      }))
    ]
  };
  const lesson = create(language, base);
  assert.equal(lesson.kind, "glossary");
  assert.equal(lesson.terms.length, 10, language + ": 2 corrected + 8 relevant terms");
  assert.equal(base.terms[0].definition, "Incorrect generic reflex response",
    "Must not mutate the shared foundation");
  assert.equal(lesson.terms[0].id, "module-7-term-1");
  assert.equal(lesson.terms[1].id, "module-7-term-2");
  assert.notEqual(lesson.terms[0].definition, base.terms[0].definition);
  assert.notEqual(lesson.terms[1].definition, base.terms[1].definition);
  assert.equal(new Set(lesson.terms.map(x => x.id)).size, 10);
  assert.equal(new Set(lesson.terms.map(x => x.term)).size, 10);
  assert(!lesson.terms.some(x => /conditioned|extinction|шартты рефлекс|угасание/i.test(x.term)),
    language + ": conditioning terms must not leak from foundation");
  for (const entry of lesson.terms) {
    assert(entry.term.trim().length >= 5, language + ": missing term");
    assert(entry.definition.trim().length >= 95, language + ": inadequate definition: " + entry.id);
    assert.equal(entry.target.section, "theory");
    assert(validAnchors.has(entry.target.anchor), language + ": bad anchor " + entry.target.anchor);
  }
  assert(lesson.terms[0].definition.includes(language === "RU" ? "афферент" : "afferent") ||
    language === "KZ" && lesson.terms[0].definition.includes("афферент"),
    language + ": reflex arc missing afferent pathway");
  assert(lesson.terms[1].definition.includes(language === "EN" ? "interneuron" : "интернейрон"),
    language + ": reciprocal inhibition missing interneuron");
  const joined = lesson.terms.map(x => x.definition).join(" ");
  for (const marker of ["Ia","Ib"]) assert(joined.includes(marker), language + ": missing " + marker);
  assert(joined.includes(language === "EN" ? "acetylcholine" : "ацетилхолин"),
    language + ": NMJ transmitter missing");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenGlossary } from "./course-foundation/module-seven-glossary";'));
for (const language of ["RU","EN","KZ"])
  assert(registry.includes('createModuleSevenGlossary("' + language + '", foundationLessons[7].glossary.' + language),
    "Module 7 glossary not wired: " + language);
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Audit branch must not auto-deploy");
console.log("PASS: module 7 glossary, 10 terms × 3 languages, 8 new concepts, corrected definitions and anchors.");
console.log("OPEN: independent Kazakh review, TypeScript project build and interactive browser checks.");
