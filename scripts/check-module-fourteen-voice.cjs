// Module 14 voice: thalamic sensory pathways; RU/EN/KZ; isolated saved answers.
// This is a source/TSX contract check, not clinical validation, speech recognition
// quality assurance, native-speaker review, or browser/E2E testing.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX parse");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"VoiceContent TSX transpilation");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleFourteenCopy");
assert(declaration?.initializer,"Missing module 14 localized voice text");
const isolated="const moduleFourteenCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleFourteenCopy;";
const js=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const localized=context.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
const markers={
 RU:["вибрац","проприоцеп","задним канатик","продолговатом мозге","медиальн","VPL","VPM","спинном мозге","ГАМК","ретикулярн","диагноз","самооценки"],
 EN:["vibration","propriocept","dorsal column","medulla","medial lemniscus","VPL","VPM","spinal cord","GABA","reticular","diagnosis","checkmarks"],
 KZ:["діріл","проприоцеп","артқы баған","сопақша мида","медиалдық ілмек","VPL","VPM","жұлында","ГАМҚ","ретикуляр","диагноз","өзіндік"]
};
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const field of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[field]==="string"&&c[field].trim().length>=25,lang+" missing "+field);
 assert(c.intro.length>550&&c.path.length>260&&c.result.length>240,lang+": inadequate mechanism");
 const all=Object.values(c).join(" ").toLowerCase();
 for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
 assert(c.ready.toLowerCase().includes(lang==="RU"?"не подтверждают":lang==="EN"?"do not verify":"дәлелдемейді"),
  lang+" self-check is not an objective grade");
}
assert(source.includes("moduleId===14 ? {...copy[language],...moduleFourteenCopy[language]}"),"14/voice must use localized module-specific prompt");
assert(source.includes('moduleId===14 ? `neuro-course:mechanism:v2:${moduleId}:${language}`'),
 "New module 14 answers must not be loaded under generic old keys");
assert(source.includes("localStorage.getItem(storageKey)")&&source.includes("localStorage.setItem(storageKey,v)"),"Storage read/write mismatch");
assert(source.includes("<VoiceTextarea language={language}")&&source.includes("disabled={answer.trim().length<12}"),"Voice input / minimum answer gate missing");
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"'),"Kazakh locale missing");
assert(voice.includes("supported === false ? c.unsupported"),"Manual fallback missing");
assert(voice.includes("may send audio to its service"),"Speech privacy notice missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),"Voice route missing");
const v=JSON.parse(read("vercel.json"));
assert.equal(v.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Review branch Vercel previews must stay disabled");
console.log("PASS: 14/voice RU/EN/KZ thalamic mechanisms, isolated storage, UI and Vercel guard");
console.log("OPEN: full audit, TypeScript, build, browser/microphone tests and independent KZ medical review");
