// Module 8 voice: RU/EN/KZ pathway localization and clinical inference limits.
// Source/AST contract only; NOT a browser, microphone, native-speaker or full build test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent must parse as TSX");
const transpiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "VoiceContent TSX transpilation errors");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleEightCopy");
assert(declaration?.initializer,"Missing module 8 voice content");
const isolated="const moduleEightCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleEightCopy;";
const js=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const localized=context.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const field of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[field]==="string"&&c[field].trim().length>25,lang+" missing "+field);
 const all=Object.values(c).join(" ");
 assert(all.includes("T10"),lang+": cord level must be explicit");
 assert(c.path.length>130,lang+": missing mechanism");
 assert(c.result.length>100,lang+": missing limits of inference");
}
const required={
 RU:["задние столбы","продолговатого мозга","переднюю белую спайку","самооценка","позвонку T10","не доказывает причину"],
 EN:["dorsal-column","medullary nuclei","anterior white commissure","Checkmarks","vertebra T10","does not establish etiology"],
 KZ:["артқы баған","сопақша ми","алдыңғы ақ комиссура","өзіндік бағасы","T10 омыртқасымен","себебін дәлелдемейді"]
};
for(const [lang,markers] of Object.entries(required)){
 const all=Object.values(localized[lang]).join(" ").toLowerCase();
 for(const marker of markers)assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
}
assert(src.includes("moduleId===8 ? {...copy[language],...moduleEightCopy[language]}"),
 "Module 8 route must use authored physiological prompt");
assert(src.includes("moduleId===8 ? `neuro-course:mechanism:v2:${moduleId}:${language}` : key"),
 "Old generic module 8 saved answers must not be reused for the new question");
assert(src.includes("localStorage.getItem(storageKey)")&&src.includes("localStorage.setItem(storageKey,v)"),
 "Versioned storage must be used for reads and writes");
assert(src.includes("<VoiceTextarea language={language}")&&src.includes("disabled={answer.trim().length<12}"),
 "Input and minimum length checks must remain available");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),"Voice route not wired");
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"'),"Kazakh recognition locale missing");
assert(voice.includes("supported === false ? c.unsupported"),"Text fallback missing");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 8 voice, RU/EN/KZ mechanism and clinical limits, v2 storage, route, fallback, previews disabled.");
console.log("OPEN: native Kazakh review, Node full audit, typecheck, build, microphone, keyboard and mobile browser.");
