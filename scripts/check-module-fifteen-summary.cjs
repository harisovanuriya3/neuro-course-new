// Module 15 one-minute summary: structural regression, not independent medical review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = file => fs.readFileSync(file, "utf8");
const path = "content/course-foundation/module-fifteen-summary.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 15 summary TypeScript syntax");
const compiled = ts.transpileModule(source, {
  fileName: path,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, "Summary transpilation");
const context = { exports: {}, require: name => {
  if (name === "../sections") return { getSectionTitle: (_section, language) => language };
  throw new Error("Unexpected import " + name);
}};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleFifteenSummary;
assert.equal(typeof create, "function", "Missing module 15 summary factory");
const markers = {
  RU: ["супраоптическое", "портальным", "осмоляльности", "барорецепторы", "V2", "аквапорина-2", "преоптическая", "влажность", "супрахиазматическое", "не измеряют"],
  EN: ["supraoptic", "portal", "osmolality", "baroreceptor", "V2", "aquaporin-2", "preoptic", "humidity", "suprachiasmatic", "not direct"],
  KZ: ["супраоптикалық", "қақпалық", "осмоляльдылық", "барорецептор", "V2", "аквапорин-2", "преоптикалық", "ылғалдылық", "супрахиазматикалық", "тікелей"]
};
const languages = ["RU", "EN", "KZ"];
for (const language of languages) {
  const lesson = create(language);
  assert.equal(lesson.kind, "one-minute");
  assert(lesson.introduction.length >= 90, language + ": incomplete introduction");
  assert.equal(lesson.cards.length, 5, language + ": expected five takeaways");
  assert.equal(new Set(lesson.cards.map(x => x.id)).size, 5);
  const paragraphs = [];
  for (let i = 0; i < 5; i++) {
    const card = lesson.cards[i];
    assert.equal(card.id, "module-15-summary-" + (i + 1));
    assert(card.title.length >= 15);
    assert.equal(card.paragraphs.length, 1);
    assert(card.paragraphs[0].length >= 180, language + ": incomplete physiology in card " + i);
    assert.deepEqual(Array.from(card.links, link => link.section), ["theory", "clinical"]);
    paragraphs.push(card.paragraphs[0]);
  }
  assert.equal(new Set(paragraphs).size, 5, language + ": repeated explanations");
  const body = paragraphs.join(" ").toLocaleLowerCase();
  for (const marker of markers[language]) assert(body.includes(marker.toLocaleLowerCase()), language + ": missing " + marker);
  assert(!/diagnosis confirmed|диагноз установлен|диагноз анықталды/i.test(body));
}
const index = read("content/index.ts");
assert(index.includes('import { createModuleFifteenSummary } from "./course-foundation/module-fifteen-summary";'));
const start = index.indexOf("  15: {", index.indexOf("const lessons"));
const end = index.indexOf("  14: {", start);
assert(start >= 0 && end > start, "Module 15 registry missing");
const block = index.slice(start, end);
assert(block.includes("...foundationLessons[15]"), "Other module 15 sections overwritten");
for (const language of languages)
  assert(block.includes(language + ': createModuleFifteenSummary("' + language + '")'), language + ": summary route missing");
for (const section of ["objectives", "pretest", "theory"])
  assert(block.includes(section + ":"), "Previously reviewed section missing: " + section);
assert(index.includes("  14: {") && index.includes("  13: {"), "Earlier module routes missing");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const language of languages) {
  const lesson = getLesson(15, "one-minute", language);
  assert.equal(lesson?.kind, "one-minute", language + ": wrong route");
  assert.equal(lesson.cards.length, 5);
  for (const section of ["objectives", "pretest", "theory"])
    assert(getLesson(15, section, language), language + ": previous route missing " + section);
}
const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fifteen-summary.cjs"));
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false);
console.log("PASS: Module 15 five-point summary × RU/EN/KZ, route and preview guard.");
console.log("OPEN: full build/CI, browser/voice tests and independent medical/KZ review.");
