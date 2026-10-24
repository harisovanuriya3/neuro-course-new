// Module 7: verify the actual course registry and bibliography in RU/EN/KZ.
// Execute from repo root: node scripts/check-module-seven-references.cjs
// Structural/content checks do not replace a build, live URL audit or peer review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-seven-references.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 references syntax");
const compiled = ts.transpileModule(source, { fileName: file, reportDiagnostics: true,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } });
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const registry = fs.readFileSync("content/index.ts", "utf8");
for (const lang of ["RU", "EN", "KZ"])
 assert(registry.includes('createModuleSevenReferences("' + lang + '"'), lang + " bibliography not wired");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
const expected = [
 ["Guyton & Hall", "698–699", "666–667", "theory"],
 ["Ganong", "157–159", "169–171", "theory"],
 ["C. L. Ghai", "295–297", "317–319", "clinical"],
 ["OpenStax · Motor Responses", "§14.3", null, "interactive"],
 ["OpenStax · The Sensory and Motor Exams", "§16.4", null, "cases"]
];
for (const lang of ["RU", "EN", "KZ"]) {
 const lesson = getLesson(7, "references", lang);
 assert.equal(lesson?.kind, "references", lang + " route");
 assert(lesson.introduction.length > 170, lang + " needs explanatory reading guidance");
 assert.equal(lesson.sources?.length, 5, lang + " expected five targeted sources");
 for (let i=0; i<expected.length; i++) {
  const [name, printed, pdf, section] = expected[i];
  const entry = lesson.sources[i];
  assert(entry.title.startsWith(name), lang + " source " + i + " title");
  assert(entry.href.startsWith("https://"), lang + " source " + i + " URL");
  assert(entry.description.includes(printed), lang + " source " + i + " printed page/section");
  if (pdf) assert(entry.description.includes(pdf), lang + " source " + i + " PDF page");
  assert(entry.description.length > 125, lang + " source " + i + " description too short");
  assert.deepEqual(entry.links, [{ section }], lang + " source " + i + " internal route");
 }
 assert(lesson.introduction.includes("PDF"), lang + " PDF-vs-print explanation missing");
}
const config = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
 "Review branch previews must stay disabled");
console.log("PASS: module 7 references: 5 relevant sources × RU/EN/KZ, page ranges, routes and no previews.");
console.log("OPEN: complete npm audit/build, live links, browser/keyboard/mobile, independent Kazakh review.");
