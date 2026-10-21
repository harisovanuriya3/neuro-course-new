// Structural reference audit for module 5. Run from repo root with Node.
// Confirms locale coverage and internal/external link contracts, not website uptime.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const file = "content/course-foundation/module-five-references.ts";
const source = read(file);
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 5 references TS syntax");
const decl = ast.statements.filter(ts.isVariableStatement)
  .flatMap(s => [...s.declarationList.declarations])
  .find(d => d.name.getText(ast) === "copy");
assert(decl && ts.isObjectLiteralExpression(decl.initializer), "Localized reference copy missing");
const obj = decl.initializer;
assert.equal(obj.properties.length, 3, "Expected three language records");
for (const lang of ["RU", "EN", "KZ"]) {
  const entry = obj.properties.find(p => p.name?.getText(ast) === lang);
  assert(entry && ts.isPropertyAssignment(entry) &&
    ts.isObjectLiteralExpression(entry.initializer), "Missing " + lang + " reference copy");
  const fields = entry.initializer.properties;
  const intro = fields.find(p => p.name?.getText(ast) === "intro");
  const desc = fields.find(p => p.name?.getText(ast) === "descriptions");
  assert(intro && ts.isStringLiteral(intro.initializer) &&
    intro.initializer.text.length > 220, lang + " reference introduction");
  assert(desc && ts.isArrayLiteralExpression(desc.initializer) &&
    desc.initializer.elements.length === 3, lang + " expected three source descriptions");
  for (const item of desc.initializer.elements)
    assert(ts.isStringLiteral(item) && item.text.length > 170,
      lang + " reference entry missing substantive guidance");
}
for (const term of ["PDF 556–559", "PDF 127–130", "PDF 353–354"]) {
  assert(source.includes(term), "Source/page locator missing: " + term);
}
assert(source.includes('source.title.startsWith("Guyton & Hall")'), "Guyton record not selected");
assert(source.includes('source.title.startsWith("Ganong")'), "Ganong record not selected");
assert(source.includes("opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003"),
  "Ghai 8th-edition catalogue record missing");
assert(source.includes('links: [{ section: "theory" }]') &&
  source.includes('links: [{ section: "cases" }]'), "Internal destinations missing");
const foundation = read("content/course-foundation/index.ts");
assert(foundation.includes("shop.elsevier.com/books/guyton-and-hall-textbook"),
  "Guyton publisher link missing");
assert(foundation.includes("search.worldcat.org/title/ganongs-review-of-medical-physiology"),
  "Ganong catalogue link missing");
const registry = read("content/index.ts");
for (const lang of ["RU", "EN", "KZ"])
  assert(registry.includes('createModuleFiveReferences("' + lang + '", moduleFiveBaseReferences("' + lang + '"))'),
    lang + " references not registered");
const sections = read("content/sections.ts");
for (const slug of ["theory", "cases", "references"])
  assert(sections.includes('slug: "' + slug + '"'), "Broken internal section " + slug);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false,
  "Review branch must not deploy preview");
console.log("PASS: module 5 references, 3 languages, 3 verified sources, printed/PDF locators, link contracts.");
console.log("NOTE: structural checks do not establish browser behavior, external uptime, or KZ-native review.");
