// Module 9 voice: physiological reasoning about the patellar stretch reflex.
// Source-level/AST regression, not a microphone, native translation or browser test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX parse error");
const compiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "VoiceContent TSX transpilation error");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleNineCopy");
assert(declaration?.initializer,"Missing module 9 voice copy");
const isolated="const moduleNineCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleNineCopy;";
const js=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const localized=context.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
const markers={
 RU:["веретено","Гольджи","Ia","моносинаптическое","интернейрон","разгибание","самооценка","полисинаптические","необязательность"],
 EN:["muscle spindle","Golgi","Ia","monosynaptic","interneuron","knee extension","structure","polysynaptic","not obligatory"],
 KZ:["ұршығы","Гольджи","Ia","моносинапстық","интернейрон","жазылу","өзіндік","полисинапстық","міндетті емес"]
};
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const field of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[field]==="string"&&c[field].trim().length>25,lang+" missing "+field);
 const all=Object.values(c).join(" ").toLowerCase();
 for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
 assert(c.path.length>100&&c.result.length>100,lang+" insufficient causal chain");
}
assert(src.includes("moduleId===9 ? {...copy[language],...moduleNineCopy[language]}"),
 "Module 9 must select authored copy");
assert(src.includes("moduleId===9 ?")&&src.includes("neuro-course:mechanism:v2:"),
 "Module 9 must not reuse old generic saved answers");
assert(src.includes("const storageKey=moduleId===8 ?"),
 "Keep existing module 8 storage contract");
assert(src.includes("localStorage.getItem(storageKey)")&&src.includes("localStorage.setItem(storageKey,v)"),
 "Voice answers must read/write the same versioned key");
assert(src.includes('<VoiceTextarea language={language}')&&src.includes("disabled={answer.trim().length<12}"),
 "Voice/text input and minimum length must remain");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),"Voice route missing");
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"')&&voice.includes("supported === false ? c.unsupported"),
 "Kazakh speech locale and keyboard fallback must remain");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Do not enable review previews");
console.log("PASS: module 9 voice RU/EN/KZ spindle, Ia, reciprocal inhibition, diagnostic limits and v2 storage.");
console.log("OPEN: full Node audit, typecheck, build, browser speech/keyboard/mobile, native Kazakh review.");
