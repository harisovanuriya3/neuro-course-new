// Module 6 bibliography regression. Run: node scripts/check-module-six-references.cjs
// Checks generated course data, not the live availability of external catalogues.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const path = "content/course-foundation/module-six-references.ts";
const source = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 6 references TypeScript syntax");
const registry = fs.readFileSync("content/index.ts", "utf8");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(registry.includes('createModuleSixReferences("' + lang + '"'), lang + " references not registered");
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
const expected = [
  ["Guyton & Hall", ["583–584", "559–560"]],
  ["Ganong", ["120–122", "132–134"]],
  ["C. L. Ghai", ["331–332", "353–354"]]
];
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(6, "references", lang);
  assert.equal(lesson?.kind, "references", lang + " references route");
  assert(lesson.introduction.length > 180, lang + " needs explanatory introduction");
  assert.equal(lesson.sources?.length, 3, lang + " exactly three books");
  for (let i = 0; i < expected.length; i++) {
    const record = lesson.sources[i];
    assert(record.title.startsWith(expected[i][0]), lang + " source order " + i);
    assert(record.href.startsWith("https://"), lang + " source HTTPS " + i);
    assert(record.description.length > 180, lang + " source description " + i);
    for (const pages of expected[i][1]) {
      assert(record.description.includes(pages), lang + " source " + i + " missing pages " + pages);
    }
    assert.deepEqual(record.links, [{ section: "theory" }], lang + " valid internal theory destination");
  }
  assert(/Ghai|Ghai/.test(lesson.sources[2].title), lang + " Ghai reference");
  assert(/PDF/.test(lesson.sources[2].description), lang + " methodological limitation with pages");
  assert(lesson.sources[0].description.includes("Cl⁻"), lang + " chloride mechanism");
}
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false, "Preview must stay disabled");
console.log("PASS: module 6 references, 3 languages × 3 checked source records, exact printed/PDF pages and valid theory links.");
console.log("NOTE: this does not check live URLs, translation by a native speaker or browser rendering.");
