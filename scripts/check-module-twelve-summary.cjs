// Module 12 one-minute: five authored basal-ganglia takeaways in RU/EN/KZ.
// Scientific/source review is separate from this route and structure regression.
// Run: node scripts/check-module-twelve-summary.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-twelve-summary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 12 summary TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
  0, "Module 12 summary transpilation");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (_section, lang) => lang };
  throw new Error("Unexpected import " + name);
}};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleTwelveSummary;
assert.equal(typeof create, "function", "Missing summary factory");
const markers = {
  RU: ["стриатум", "GPi", "SNr", "STN", "ГАМК", "талам", "гиперпрям", "D1", "D2",
    "дофамин", "брадикинез", "хорея", "дисметрия", "мотонейрон"],
  EN: ["striatum", "GPi", "SNr", "STN", "GABA", "thalam", "hyperdirect", "D1", "D2",
    "dopamine", "bradykinesia", "chorea", "dysmetria", "motor neurons"],
  KZ: ["стриатум", "GPi", "SNr", "STN", "ГАМҚ", "талам", "гипертікелей", "D1", "D2",
    "дофамин", "брадикинез", "хорея", "дисметрия", "мотонейрон"]
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
    assert.equal(card.id, "module-12-summary-" + (i + 1), lang + ": unexpected id");
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
assert(index.includes('import { createModuleTwelveSummary } from "./course-foundation/module-twelve-summary";'),
  "Summary import missing");
const start = index.indexOf("  12: {", index.indexOf("const lessons"));
const end = index.indexOf("  11: {", start);
assert(start >= 0 && end > start, "Module 12 registry missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[12]"), "Other sections overwritten");
for (const lang of ["RU", "EN", "KZ"])
  assert(block.includes(lang + ': createModuleTwelveSummary("' + lang + '")'),
    lang + ": summary route missing");
for (const section of ["objectives", "pretest", "theory"])
  assert(block.includes(section + ":"), "Previously audited " + section + " missing");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(12, "one-minute", lang);
  assert.equal(lesson?.kind, "one-minute", lang + ": wrong route");
  assert.equal(lesson.cards.length, 5, lang + ": wrong card count");
  for (const section of ["objectives", "pretest", "theory"])
    assert(getLesson(12, section, lang), lang + ": previous section lost " + section);
}
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch preview must remain disabled");
console.log("PASS: module 12 one-minute summary, five cards × RU/EN/KZ, routes and preview guard.");
console.log("OPEN: full typecheck/build, browser, voice/accessibility and independent KZ review.");
