// Module 12 notes: grounded basal ganglia physiology, RU/EN/KZ, route and storage.
// Run: node scripts/check-module-twelve-notes.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "components/NotesContent.tsx";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length, 0, "NotesContent must parse as TSX");
const compiled = ts.transpileModule(source, {fileName:path, reportDiagnostics:true, compilerOptions:{
 target:ts.ScriptTarget.ES2020, module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.ReactJSX
}});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, "NotesContent must transpile");
let initializer;
function visit(node) {
 if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "moduleTwelvePrompt") initializer = node.initializer;
 ts.forEachChild(node, visit);
}
visit(ast);
assert(initializer, "Module 12 notes prompt missing");
const js = ts.transpileModule("globalThis.prompts = " + initializer.getText(ast) + ";", {compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context = {};
vm.runInNewContext(js, context);
const prompts = context.prompts;
assert.deepEqual(Object.keys(prompts).sort(), ["EN","KZ","RU"]);
const markers = {
 RU: ["глутамат", "стриатум", "ГАМК", "GPi/SNr", "таламус", "GPe", "STN", "гиперпрям", "SNc", "D1", "D2", "брадикинез", "слабость", "дисметри", "не проверяются автоматически", "персональные данные"],
 EN: ["glutamate", "striatum", "GABA", "GPi/SNr", "thalamus", "GPe", "STN", "hyperdirect", "SNc", "D1", "D2", "bradykinesia", "weakness", "dysmetria", "not graded automatically", "real patients"],
 KZ: ["глутамат", "стриатум", "ГАМҚ", "GPi/SNr", "таламус", "GPe", "STN", "гипертікелей", "SNc", "D1", "D2", "Брадикинезия", "әлсіздігін", "дисметрия", "автоматты түрде бағаланбайды", "жеке деректерін"]
};
for (const lang of ["RU","EN","KZ"]) {
 const prompt = prompts[lang];
 assert(typeof prompt === "string" && prompt.length > 950, lang + ": insufficient specificity");
 for (const marker of markers[lang]) assert(prompt.includes(marker), lang + ": missing " + marker);
 for (const number of ["(1)", "(2)", "(3)"]) assert(prompt.includes(number), lang + ": missing " + number);
}
assert(source.includes("moduleId === 12 && <p>{moduleTwelvePrompt[language]}</p>"), "Module 12 notes not rendered");
assert(source.includes("moduleId === 11 && <p>{moduleElevenPrompt[language]}</p>"), "Module 11 notes regressed");
assert(source.includes("saveModuleNotes(moduleId, next)"), "Module notes persistence missing");
assert(source.includes("key={selected}"), "Section-specific editor remount missing");
assert(source.includes("disabled={!ready}"), "Hydration guard missing");
assert(source.includes('aria-live="polite"'), "Accessible save status missing");
const storage = read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"), "Browser-only storage missing");
assert(storage.includes("value.slice(0, 5000)"), "Stored note length must be bounded");
const route = read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"'), "Notes route missing");
assert(route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"), "Notes renderer missing");
const vercel = JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"], false, "Audit branch previews must remain disabled");
console.log("PASS: module 12 notes RU/EN/KZ, pathways, clinical caveats, route, storage and preview guard.");
console.log("OPEN: full CI, TypeScript typecheck, production build, browser/voice/mobile and native KZ review.");
