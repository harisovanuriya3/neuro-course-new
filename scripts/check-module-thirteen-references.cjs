// Module 13 cerebellar references: evidence, localisation, route and privacy regression.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-thirteen-references.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 13 references TS parse");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 13 references transpile");
const registry = fs.readFileSync("content/index.ts", "utf8");
assert(registry.includes('import { createModuleThirteenReferences }'), "Module 13 references import");
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleThirteenReferences("'+lang+'"'), lang + ": references registration");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
const specs = [
  { title: "Guyton & Hall", pages: ["723–725", "690–692"], sections: ["theory", "interactive"] },
  { title: "Ganong", pages: ["256–258", "268–270"], sections: ["theory", "glossary"] },
  { title: "C. L. Ghai", pages: ["287–290", "309–312"], sections: ["clinical", "practice"] },
  { title: "OpenStax · Motor Responses", pages: ["§14.3"], sections: ["media"] }
];
const markers = {
  RU: ["мозжеч", "Пуркинье", "мшист", "лазающ", "ГАМК", "дисметри", "Ромберг", "диагноз"],
  EN: ["cerebell", "Purkinje", "mossy", "climbing", "GABA", "dysmetria", "Romberg", "diagnos"],
  KZ: ["мишық", "Пуркинье", "мүкті", "өрмелеуші", "ГАМҚ", "дисметрия", "Ромберг", "диагноз"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(13, "references", lang);
  assert.equal(lesson?.kind, "references", lang + ": references lesson missing");
  assert(lesson.introduction.length > 350, lang + ": introduction insufficient");
  assert(lesson.introduction.includes("PDF"), lang + ": distinguish printed from PDF pages");
  assert.equal(lesson.sources?.length, 4, lang + ": four curated sources expected");
  const allText = [lesson.introduction, ...lesson.sources.map(x => x.description)].join(" ");
  for (const marker of markers[lang])
    assert(allText.toLowerCase().includes(marker.toLowerCase()), lang + ": missing marker " + marker);
  const hrefs = new Set();
  for (let i = 0; i < specs.length; i++) {
    const item = lesson.sources[i], spec = specs[i];
    assert(item.title.startsWith(spec.title), lang + ": wrong source " + i);
    assert(item.href.startsWith("https://"), lang + ": source must be HTTPS");
    assert(!item.href.endsWith(".pdf"), lang + ": uploaded PDF must not be exposed");
    assert(!hrefs.has(item.href), lang + ": duplicate URL");
    hrefs.add(item.href);
    assert(item.description.length > 300, lang + ": guidance too short " + i);
    for (const page of spec.pages)
      assert(item.description.includes(page), lang + ": page mapping missing " + page);
    assert.deepEqual(item.links.map(x => x.section), spec.sections, lang + ": wrong links " + i);
  }
  assert(lesson.sources[0].href.includes("v9780323389303"), lang + ": Guyton edition record");
  assert(lesson.sources[2].href.includes("biblionumber=10003"), lang + ": Ghai catalogue");
  assert(lesson.sources[3].href.includes("/14-3-motor-responses"), lang + ": OpenStax resource");
}
const ui = fs.readFileSync("components/StudyContent.tsx", "utf8");
assert(ui.includes("href={source.href}"), "External links not rendered");
const sections = fs.readFileSync("content/sections.ts", "utf8");
for (const section of ["references", "theory", "interactive", "glossary", "clinical", "practice", "media"])
  assert(sections.includes('slug: "'+section+'"'), "Internal route missing: " + section);
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
assert(route.includes("getLesson(moduleNumber, section, lang)"), "Route not connected to course lessons");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Audit branch Vercel previews must stay disabled");
console.log("PASS: Module 13 references, 4 sources x 3 languages, page mapping and routes.");
console.log("OPEN: independent KZ medical review, browser/E2E and full 425-section acceptance.");
