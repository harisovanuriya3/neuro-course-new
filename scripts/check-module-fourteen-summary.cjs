// Module 14 one-minute: authored thalamic summary, RU/EN/KZ.
// Scientific review and independent clinical/language review remain separate from this regression.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-fourteen-summary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 summary TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 14 summary transpilation");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (_section, lang) => lang };
  throw new Error("Unexpected import " + name);
}};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleFourteenSummary;
assert.equal(typeof create, "function", "Missing thalamic summary factory");
const markers = {
  RU: ["VPL", "VPM", "медиальной петле", "спинном мозге", "обонятельн", "коленчат", "ГАМК", "ретикулярное", "VA/VL", "двухточечн"],
  EN: ["VPL", "VPM", "medial lemniscus", "spinal cord", "olfactor", "geniculate", "GABA", "reticular", "VA/VL", "two-point"],
  KZ: ["VPL", "VPM", "медиалдық ілмек", "жұлын", "иіс сезу", "тізелі", "ГАМҚ", "ретикуляр", "VA/VL", "екі нүктені"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = create(lang);
  assert.equal(lesson.kind, "one-minute", lang + ": wrong kind");
  assert(lesson.introduction.length >= 80, lang + ": short introduction");
  assert.equal(lesson.cards.length, 5, lang + ": expected five takeaways");
  assert.equal(new Set(lesson.cards.map(card => card.id)).size, 5, lang + ": duplicate ids");
  const paragraphs = [];
  for (let i = 0; i < 5; i++) {
    const card = lesson.cards[i];
    assert.equal(card.id, "module-14-summary-" + (i + 1), lang + ": unexpected id");
    assert(card.title.length >= 20, lang + ": incomplete heading");
    assert.equal(card.paragraphs.length, 1, lang + ": expected one explanation");
    assert(card.paragraphs[0].length >= 180, lang + ": incomplete physiology");
    assert.deepEqual(Array.from(card.links, link => link.section), ["theory", "clinical"],
      lang + ": wrong learning links");
    paragraphs.push(card.paragraphs[0]);
  }
  assert.equal(new Set(paragraphs).size, 5, lang + ": repeated content");
  const body = paragraphs.join(" ").toLocaleLowerCase();
  for (const marker of markers[lang])
    assert(body.includes(marker.toLocaleLowerCase()), lang + ": missing " + marker);
  assert(!/диагноз установлен|diagnosis confirmed|диагноз анықталды/i.test(body),
    lang + ": unsupported diagnostic certainty");
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleFourteenSummary } from "./course-foundation/module-fourteen-summary";'),
  "Summary import missing");
const start = index.indexOf("  14: {", index.indexOf("const lessons"));
const end = index.indexOf("  13: {", start);
assert(start >= 0 && end > start, "Module 14 registry missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[14]"), "Other sections overwritten");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleFourteenSummary("' + lang + '")'),
    lang + ": summary route missing");
for (const section of ["objectives", "pretest", "theory"])
  assert(block.includes(section + ":"), "Previously audited " + section + " missing");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "one-minute", lang);
  assert.equal(lesson?.kind, "one-minute", lang + ": wrong route");
  assert.equal(lesson.cards.length, 5, lang + ": wrong card count");
  for (const section of ["objectives", "pretest", "theory"])
    assert(getLesson(14, section, lang), lang + ": previous section lost " + section);
}
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fourteen-summary.cjs"),
  "Module 14 summary regression missing from audit:science");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch preview must remain disabled");
console.log("PASS: module 14 one-minute summary, five cards × RU/EN/KZ, routes and preview guard.");
console.log("OPEN: full typecheck/build, browser, voice/accessibility and independent KZ review.");
