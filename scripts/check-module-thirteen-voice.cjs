// Module 13 voice self-check: cerebellum, RU/EN/KZ, isolated storage.
// Source/TypeScript transpilation test only; not a microphone, native-speaker or clinical test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX parse diagnostics");
const transpiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}
});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"VoiceContent transpile");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleThirteenCopy");
assert(declaration?.initializer,"Module 13 localized voice copy missing");
const isolated="const moduleThirteenCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleThirteenCopy;";
const js=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const localized=context.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
const markers={
 RU:["мозжечок","Пуркинье","мшистые","лазающие","оливы","ГАМК","глубокие ядра","дисметри","проприоцеп","диагноз","самооценки"],
 EN:["cerebell","Purkinje","mossy","climbing","olive","GABA","deep","dysmetria","propriocept","diagnosis","self-check"],
 KZ:["мишық","Пуркинье","мүкті","өрмелеуші","олива","ГАМҚ","терең ядролар","дисметрия","проприоцеп","диагноз","өзіндік"]
};
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const field of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[field]==="string"&&c[field].trim().length>=25,lang+" missing "+field);
 assert(c.intro.length>330&&c.path.length>220&&c.result.length>200,
  lang+": too little physiological reasoning");
 const all=Object.values(c).join(" ");
 for(const marker of markers[lang])assert(all.toLowerCase().includes(marker.toLowerCase()),
  lang+" missing marker "+marker);
 assert(c.ready.toLowerCase().includes(lang==="RU"?"не подтверждают":lang==="EN"?"do not verify":"дәлелдемейді"),
  lang+": unchecked self-assessment disclaimer");
}
assert(source.includes("moduleId===13 ? {...copy[language],...moduleThirteenCopy[language]}"),
 "Module 13 must use subject-specific self-check");
assert(source.includes('moduleId===13 ? `neuro-course:mechanism:v2:${moduleId}:${language}`'),
 "Module 13 must not load generic saved answers");
assert(source.includes("localStorage.getItem(storageKey)")&&source.includes("localStorage.setItem(storageKey,v)"),
 "Voice answer persistence must use the same key");
assert(source.includes("<VoiceTextarea language={language}")&&source.includes("disabled={answer.trim().length<12}"),
 "Voice/text input or minimum-answer gate missing");
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"')&&voice.includes("supported === false ? c.unsupported"),
 "Kazakh speech locale or manual input fallback missing");
assert(voice.includes("may send audio to its service"),"Speech service privacy note missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),"Voice route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch Vercel deployment must remain disabled");
console.log("PASS: module 13 voice RU/EN/KZ, physiological self-check, isolated storage, route and fallback.");
console.log("OPEN: full audit, typecheck, build, browser/microphone testing and independent KZ medical edit.");
