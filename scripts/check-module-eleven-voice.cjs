// Module 11 voice: motor command, sensory feedback, safe self-assessment.
// This is a source/TypeScript-transpile test, NOT a microphone, clinical or native-speaker test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/VoiceContent.tsx";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"VoiceContent TSX syntax");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "VoiceContent TSX transpile");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleElevenCopy");
assert(declaration?.initializer,"Module 11 voice content missing");
const isolated="const moduleElevenCopy="+declaration.initializer.getText(ast)+";globalThis.localized=moduleElevenCopy;";
const js=ts.transpileModule(isolated,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const localized=context.localized;
assert.deepEqual(Object.keys(localized).sort(),["EN","KZ","RU"]);
const markers={
 RU:["базальных ганглиев","мозжечка","кортикоспинальные","α-мотонейроны","проприоцептивной","запаздывающую","не определяет","самооценки"],
 EN:["basal ganglia","cerebellum","corticospinal","alpha motor neurons","proprioceptive","delayed correction","cannot localize","self-check"],
 KZ:["базальды ганглийлермен","мишықпен","кортикоспиналдық","α-мотонейрондарға","проприоцептивтік","кешігетін","анықтамайтынын","өзіндік"]
};
for(const lang of ["RU","EN","KZ"]){
 const c=localized[lang];
 for(const field of ["intro","prompt","cause","path","result","ready","good"])
  assert(typeof c[field]==="string"&&c[field].trim().length>=20,lang+" missing "+field);
 assert(c.intro.length>250&&c.path.length>130&&c.result.length>170,
  lang+": insufficient physiological reasoning");
 const all=Object.values(c).join(" ").toLowerCase();
 for(const marker of markers[lang])
  assert(all.includes(marker.toLowerCase()),lang+" missing marker "+marker);
 assert(c.intro.toLowerCase().includes(lang==="RU"?"не автоматическая":lang==="EN"?"not automated":"автоматты"),
  lang+": self-assessment limitation absent");
}
assert(source.includes("moduleId===11 ? {...copy[language],...moduleElevenCopy[language]}"),
 "Module 11 must use authored self-check");
assert(source.includes('moduleId===11 ? `neuro-course:mechanism:v2:${moduleId}:${language}`'),
 "Module 11 must not load saved generic explanation");
assert(source.includes("localStorage.getItem(storageKey)")&&source.includes("localStorage.setItem(storageKey,v)"),
 "Read/write keys differ");
assert(source.includes("<VoiceTextarea language={language}")&&source.includes("disabled={answer.trim().length<12}"),
 "Voice/text input or answer threshold missing");
const voice=read("components/VoiceTextarea.tsx");
assert(voice.includes('KZ: "kk-KZ"')&&voice.includes("supported === false ? c.unsupported"),
 "Kazakh recognition locale and manual text fallback must remain");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<VoiceContent language={lang} moduleId={moduleNumber} />'),"Voice route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch previews must remain disabled");
console.log("PASS: module 11 voice motor control, RU/EN/KZ, v2 persistence, self-check, fallback and route.");
console.log("OPEN: full audit, typecheck, build, real browser/microphone and independent KZ medical review.");
