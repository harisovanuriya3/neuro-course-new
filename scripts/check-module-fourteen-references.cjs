// Module 14 thalamus references: physiological, localisation and route regression.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-fourteen-references.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 references TS parse");
const compiled = ts.transpileModule(source, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
});
assert.equal((compiled.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0,
  "Module 14 references transpile");
const registry = fs.readFileSync("content/index.ts", "utf8");
assert(registry.includes('import { createModuleFourteenReferences }'), "Module 14 references import");
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleFourteenReferences("'+lang+'"'), lang + ": references registration");
const { load } = require("./check-tests.cjs");
const { getLesson } = load("content/index.ts");
const specs = [
  { title: "Guyton & Hall", pages: ["609–611", "584–586"], sections: ["theory", "interactive"] },
  { title: "Ganong", pages: ["229–231", "241–243"], sections: ["theory", "glossary"] },
  { title: "C. L. Ghai", pages: ["301–303", "323–325"], sections: ["clinical", "practice"] },
  { title: "OpenStax · The Central Nervous System", pages: ["§13.2"], sections: ["media"] }
];
const markers = {
  RU: ["VPL", "VPM", "медиальн", "ретикуляр", "ГАМК", "перекр", "диагноз"],
  EN: ["VPL", "VPM", "medial", "reticular", "GABA", "cross", "diagnos"],
  KZ: ["VPL", "VPM", "медиал", "ретикуляр", "ГАМҚ", "айқас", "диагноз"]
};
for (const lang of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(14, "references", lang);
  assert.equal(lesson?.kind, "references", lang + ": references lesson missing");
  assert(lesson.introduction.length > 300, lang + ": introduction insufficient");
  assert(lesson.introduction.includes("PDF"), lang + ": distinguish printed and PDF pages");
  assert.equal(lesson.sources?.length, 4, lang + ": four curated sources expected");
  const allText = [lesson.introduction, ...lesson.sources.map(x => x.description)].join(" ");
  for (const marker of markers[lang])
    assert(allText.toLowerCase().includes(marker.toLowerCase()), lang + ": missing marker " + marker);
  const hrefs = new Set();
  for (let i = 0; i < specs.length; i++) {
    const item = lesson.sources[i], spec = specs[i];
    assert(item.title.startsWith(spec.title), lang + ": wrong source " + i);
    assert(item.href.startsWith("https://"), lang + ": source must be HTTPS");
    assert(!item.href.endsWith(".pdf"), lang + ": do not expose uploaded PDFs");
    assert(!hrefs.has(item.href), lang + ": duplicate URL");
    hrefs.add(item.href);
    assert(item.description.length > 260, lang + ": guidance too short " + i);
    for (const page of spec.pages)
      assert(item.description.includes(page), lang + ": missing page mapping " + page);
    assert.deepEqual(item.links.map(x => x.section), spec.sections, lang + ": wrong links " + i);
  }
  assert(lesson.sources[2].href.includes("biblionumber=10003"), lang + ": Ghai catalogue record");
  assert(lesson.sources[3].href.includes("/13-2-the-central-nervous-system"), lang + ": OpenStax CNS resource");
}
const ui = fs.readFileSync("components/StudyContent.tsx", "utf8");
assert(ui.includes("href={source.href}"), "External bibliography links not rendered");
const sections = fs.readFileSync("content/sections.ts", "utf8");
for (const section of ["references", "theory", "interactive", "glossary", "clinical", "practice", "media"])
  assert(sections.includes('slug: "'+section+'"'), "Internal route missing: " + section);
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
assert(route.includes("getLesson(moduleNumber, section, lang)"), "Route not connected");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Audit branch Vercel previews must remain disabled");
console.log("PASS: Module 14 references, four sources in RU/EN/KZ, page mapping, routes and preview guard.");
console.log("OPEN: browser/E2E, independent KZ medical review, full 425-section acceptance.");
