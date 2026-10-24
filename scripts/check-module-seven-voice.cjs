// Module 7 voice: authored physiological reasoning across RU/EN/KZ.
// Source/AST checks only; not a microphone, browser, native-language or build test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent must parse as TSX");
const compiledComponent=ts.transpileModule(src,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}
});
assert.equal((compiledComponent.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0,
 "VoiceContent transpilation must have no TS syntax errors");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleSevenCopy");
assert(declaration?.initializer,"Module 7 voice content missing");
const isolated="const moduleSevenCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleSevenCopy;";
const compiled=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}});
const ctx={};vm.runInNewContext(compiled.outputText,ctx);
const localized=ctx.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const key of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[key]==="string"&&c[key].trim().length>=28,lang+" missing "+key);
 const full=Object.values(c).join(" ");
 for(const term of ["Ia","L2–L4","L3–L4"])
  assert(full.includes(term),lang+" lacks "+term);
 assert(!/automatic grading of physiological accuracy/.test(c.ready),"Do not imply automatic grading");
}
for(const [lang,required] of Object.entries({
 RU:["веретёна","Гольджи","глутамат","ацетилхолин","реципрокное","Ендрассика","самооценка"],
 EN:["spindles","Golgi","glutamate","acetylcholine","reciprocal inhibition","Jendrassik","self-assessment"],
 KZ:["ұршықтарын","Гольджи","глутамат","ацетилхолин","реципроктық","Ендрассик","өзіндік бағалау"]
}))for(const term of required)
 assert(Object.values(localized[lang]).join(" ").toLowerCase().includes(term.toLowerCase()),
 lang+" lacks "+term);
assert(src.includes("moduleId===7 ? {...copy[language],...moduleSevenCopy[language]}"),
 "Module 7 must select its own physiological voice copy");
assert(src.includes('moduleId===7 ? `neuro-course:mechanism:v2:${moduleId}:${language}`'),
 "Old generic module 7 answers must not be interpreted as responses to a new task");
assert(src.includes('<VoiceTextarea language={language}'),"Voice/text input missing");
assert(src.includes('disabled={answer.trim().length<12}'),"Empty answers must be disabled");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'));
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"'),"Kazakh speech-recognition locale missing");
assert(voice.includes("supported === false ? c.unsupported"),"Keyboard fallback must be visible");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 7 voice: RU/EN/KZ reflex reasoning, Ia, segments, synapses, reciprocal inhibition, clinical limits, routing, v2 saved answers, preview disabled.");
console.log("OPEN: full Node/TS build, browser microphone, accessibility and native Kazakh-language review.");
