// Module 4 bibliography contract; validates generated lessons, not live external URLs.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const path = "content/course-foundation/module-four-references.ts";
const src = fs.readFileSync(path, "utf8");
const ast = ts.createSourceFile(path, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 4 bibliography TypeScript syntax");
const registry = fs.readFileSync("content/index.ts", "utf8");
for (const lang of ["RU", "EN", "KZ"]) {
  assert(registry.includes('createModuleFourReferences("' + lang + '"'), lang + " bibliography not registered");
}
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(4, "references", lang);
  assert.equal(lesson?.kind, "references", lang + " references kind");
  assert.equal(lesson.sources?.length, 3, lang + " three verified books");
  assert(lesson.introduction.length > 120, lang + " introduction");
  for (const source of lesson.sources) {
    assert(source.description.length > 90, lang + " source needs substantive page guidance");
    assert(source.href.startsWith("https://"), lang + " HTTPS catalog link");
    assert.equal(source.links.length, 1, lang + " one related section link");
  }
  assert(lesson.sources[0].title.startsWith("Guyton & Hall"), lang + " Guyton");
  assert(lesson.sources[1].title.startsWith("Ganong"), lang + " Ganong");
  assert(lesson.sources[2].title.startsWith("C. L. Ghai"), lang + " Ghai");
  assert(lesson.sources[0].description.includes("62–64"), lang + " Guyton printed pages");
  assert(lesson.sources[1].description.includes("84–86"), lang + " Ganong printed pages");
  assert(lesson.sources[2].description.includes("357–359"), lang + " Ghai printed pages");
}
console.log("PASS: module 4 references, three editions and exact pages in RU/EN/KZ.");
console.log("NOTE: external catalog links and browser rendering not tested.");
