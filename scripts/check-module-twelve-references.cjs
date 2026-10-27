// Module 12 basal-ganglia bibliography regression. Run from repository root.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-twelve-references.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 12 references TypeScript parse");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 12 references transpile");
const registry = fs.readFileSync("content/index.ts", "utf8");
assert(registry.includes('import { createModuleTwelveReferences }'), "Module 12 references import");
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleTwelveReferences("'+lang+'"'), lang + ": references registration");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
const specs = [
  { title: "Guyton & Hall", pages: ["730–733", "697–700"], sections: ["theory", "interactive"] },
  { title: "Ganong", pages: ["250–253", "262–265"], sections: ["interactive", "glossary"] },
  { title: "C. L. Ghai", pages: ["285–287", "307–309"], sections: ["clinical", "cases"] },
  { title: "OpenStax · Motor Responses", pages: ["§14.3"], sections: ["media"] }
];
const markers = {
  RU: ["стриатум", "GPi", "таламус", "брадикинез", "дисметри", "мотонейрон", "гиперпрям", "D1/D2"],
  EN: ["striatum", "GPi", "thalam", "bradykinesia", "dysmetria", "motor neuron", "hyperdirect", "D1/D2"],
  KZ: ["стриатум", "GPi", "таламус", "брадикинез", "дисметрия", "мотонейрон", "гипертікелей", "D1/D2"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(12, "references", lang);
  assert.equal(lesson?.kind, "references", lang + ": missing references");
  assert(lesson.introduction.length > 350, lang + ": introduction too short");
  assert(lesson.introduction.includes("PDF"), lang + ": distinguish printed and PDF pages");
  assert.equal(lesson.sources?.length, 4, lang + ": expected four curated sources");
  const allText = [lesson.introduction, ...lesson.sources.map(x => x.description)].join(" ");
  for (const marker of markers[lang])
    assert(allText.toLowerCase().includes(marker.toLowerCase()), lang + ": missing " + marker);
  for (let i = 0; i < specs.length; i++) {
    const item = lesson.sources[i], spec = specs[i];
    assert(item.title.startsWith(spec.title), lang + ": incorrect source " + i);
    assert(item.href.startsWith("https://"), lang + ": HTTPS source required");
    assert(!item.href.endsWith(".pdf"), lang + ": do not expose uploaded PDFs");
    assert(item.description.length > 300, lang + ": insufficient guidance " + i);
    for (const page of spec.pages)
      assert(item.description.includes(page), lang + ": missing page " + page);
    assert.deepEqual(item.links.map(x => x.section), spec.sections, lang + ": wrong related sections " + i);
  }
  assert(lesson.sources[0].href.includes("v9780323389303"), lang + ": exact Guyton 13e link");
  assert(lesson.sources[2].href.includes("biblionumber=10003"), lang + ": exact Ghai 8e catalogue");
  assert(lesson.sources[3].href.includes("/14-3-motor-responses"), lang + ": open resource");
}
const ui = fs.readFileSync("components/StudyContent.tsx", "utf8");
assert(ui.includes("href={source.href}"), "External source links not rendered");
const sections = fs.readFileSync("content/sections.ts", "utf8");
for (const section of ["references", "theory", "interactive", "glossary", "clinical", "cases", "media"])
  assert(sections.includes('slug: "'+section+'"'), "Missing internal route: " + section);
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Audit branch previews must remain disabled");
console.log("PASS: module 12 references, four sources x RU/EN/KZ, page mappings and navigation.");
console.log("OPEN: full course audit, TypeScript build, browser tests and independent KZ review.");
