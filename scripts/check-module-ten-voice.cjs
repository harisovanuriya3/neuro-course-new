// Module 10 voice: three-language scientific explanation and safe self-assessment.
// Source/AST contract only; NOT a clinical, browser, microphone or native-speaker test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX parse");
const compiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "VoiceContent TSX transpile");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleTenCopy");
assert(declaration?.initializer,"Missing moduleTenCopy");
const isolated="const moduleTenCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleTenCopy;";
const js=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const localized=context.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
const markers={
 RU:["сетчатку","II","претектальную","III","ресничный","бодрствования","КСВП","не доказывает сознание","самооценку","роговицу"],
 EN:["retinal","II","pretectal","III","ciliary ganglion","arousal","BAEP","cannot establish awareness","self-check","cornea"],
 KZ:["торқабық","II","претекталдық","III","кірпікшелі","сергектіктің","КСВП","сананың сақталғанын дәлелдемейтінін","өзіндік","қасаң"]
};
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const field of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[field]==="string"&&c[field].trim().length>=20,lang+" missing "+field);
 assert(c.intro.length>=230&&c.path.length>=140&&c.result.length>=140,
  lang+": insufficient mechanism or interpretation");
 const all=Object.values(c).join(" ").toLowerCase();
 for(const marker of markers[lang])
  assert(all.includes(marker.toLowerCase()),lang+" missing physiology/safety marker: "+marker);
}
assert(src.includes("moduleId===10 ? {...copy[language],...moduleTenCopy[language]}"),
 "Module 10 must use authored voice copy");
assert(src.includes("moduleId===10 ? `neuro-course:mechanism:v2:${moduleId}:${language}`"),
 "Module 10 must not reuse old generic saved answers");
assert(src.includes("const storageKey=moduleId===8 ?"),
 "Preserve existing module 8 storage key");
assert(src.includes("localStorage.getItem(storageKey)")&&src.includes("localStorage.setItem(storageKey,v)"),
 "Voice must read/write same key");
assert(src.includes('<VoiceTextarea language={language}')&&src.includes("disabled={answer.trim().length<12}"),
 "Text/voice input and minimum answer length must remain");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),
 "Voice route missing");
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"')&&voice.includes("supported === false ? c.unsupported"),
 "Kazakh locale and text fallback must remain");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch must not enable previews");
console.log("PASS: module 10 voice RU/EN/KZ pupillary pathway, distributed arousal, BAEP limits, safety and v2 storage.");
console.log("OPEN: full Node audit, typecheck, build, real browser/voice/mobile, independent Kazakh review.");
