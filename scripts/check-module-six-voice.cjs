// Module 6 voice: physiological content and RU/EN/KZ self-assessment contract.
// This is a source/AST check, not speech recognition or browser interaction.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX syntax diagnostics");
const declaration=ast.statements
 .filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleSixCopy");
assert(declaration?.initializer,"Module 6 voice localized data missing");
const isolated="const moduleSixCopy = "+declaration.initializer.getText(ast)+"; globalThis.localized = moduleSixCopy;";
const compiled=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}});
const ctx={};vm.runInNewContext(compiled.outputText,ctx);
const copy=ctx.localized;
assert.deepEqual(Object.keys(copy).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const c=copy[lang];
 for(const key of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[key]==="string"&&c[key].trim().length>=20,lang+": missing "+key);
 assert(c.intro.includes("−65"),lang+": example must specify Vm/ECl");
 assert(c.intro.includes("Ca²⁺"),lang+": presynaptic calcium example missing");
 assert(c.path.includes("Ca²⁺"),lang+": explanation omits calcium-release relation");
}
for(const [lang,phrases] of Object.entries({
 RU:["без заметной гиперполяризации","отсутствие гиперполяризации","самооценка"],
 EN:["without clear hyperpolarization","no visible hyperpolarization","self-assessment"],
 KZ:["айқын гиперполяризациясыз","гиперполяризацияның болмауы","өзіндік бағалау"]
}))for(const phrase of phrases){
 const all=Object.values(copy[lang]).join(" ").toLowerCase();
 assert(all.includes(phrase.toLowerCase()),lang+": missing "+phrase);
}
assert(src.includes("moduleId===6 ? {...copy[language],...moduleSixCopy[language]}"),
 "Module 6 voice is not selected in actual component");
assert(src.includes("disabled={answer.trim().length<12}"),"Very short/empty answer must not be submitted");
// The storage selector now has versioned keys for several reviewed modules.
 // Check actual read/write use and the module+language namespace, not one old ternary.
for (const marker of [
  "neuro-course:mechanism:v2:${moduleId}:${language}",
  "neuro-course:mechanism:${moduleId}:${language}",
  "localStorage.getItem(storageKey)",
  "localStorage.setItem(storageKey,v)"
]) assert(src.includes(marker),"Local answer storage missing "+marker);
assert(src.includes("<VoiceTextarea language={language}"),"Speech/text input missing");
assert(src.includes("This is a structure self-check, not an automatic knowledge grade."),
 "Do not claim to automatically assess scientific correctness");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),
 "Voice route must forward actual module and language");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 6 voice: 3 localized physiology scenarios, source wiring, self-check scope and preview policy.");
console.log("NOTE: not a native-speaker translation review, speech test, browser test or Next.js build.");
