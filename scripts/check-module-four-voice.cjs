// Module 4 voice exercise: source contract, not speech recognition or clinical grading.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "components/VoiceContent.tsx";
const src = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length, 0, "VoiceContent TSX syntax");
const decl = ast.statements.filter(ts.isVariableStatement)
 .flatMap(statement => [...statement.declarationList.declarations])
 .find(node => node.name.getText(ast) === "moduleFourCopy");
assert(decl && decl.initializer && ts.isAsExpression(decl.initializer),
 "Module 4 voice translations not declared");
const obj = decl.initializer.expression;
assert(ts.isObjectLiteralExpression(obj), "Module 4 locale object expected");
function property(node, name) {
 assert(ts.isObjectLiteralExpression(node), "Expected locale object");
 const found = node.properties.find(p => ts.isPropertyAssignment(p) &&
   p.name.getText(ast).replace(/['"]/g, "") === name);
 assert(found, "Missing property " + name);
 return found.initializer;
}
const languages = ["RU", "EN", "KZ"];
for (const lang of languages) {
 const locale = property(obj, lang);
 for (const key of ["intro", "prompt", "cause", "path", "result", "ready", "good"]) {
  const val = property(locale, key);
  assert(ts.isStringLiteral(val) && val.text.length >= 25,
    lang + " missing meaningful " + key);
 }
}
assert.equal(obj.properties.length, 3, "Unexpected voice locales");
for (const marker of [
 "moduleId===4 ? {...copy[language],...moduleFourCopy[language]}",
 "−71,2", "−62,0", "−71.2", "−62.0",
 "инактивировать Na⁺-каналы", "inactivate Na⁺ channels",
 "инактивациялауы мүмкін",
 "не проверка знаний", "not correctness", "өзіндік бағасы"
]) assert(src.includes(marker), "Missing physiology/self-check marker: " + marker);
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
assert(route.includes("<VoiceContent language={lang} moduleId={moduleNumber} />"),
 "Voice route must pass language and module ID");
assert(src.includes("disabled={answer.trim().length<12}"),
 "Empty answer must not be checked");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Audit branch previews must remain disabled");
console.log("PASS: module 4 voice, three localizations, physiological markers, route and no preview.");
console.log("NOTE: not a scientific, speech-recognition or browser end-to-end test.");
