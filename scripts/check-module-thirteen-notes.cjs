// Module 13 notes: cerebellar mechanism, differential inference and privacy.
// Structural regression only: not a browser test or independent KZ medical review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/NotesContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX must parse");
const output=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,compilerOptions:{
 target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX
}});
assert.equal((output.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "NotesContent must transpile");
let declaration;
function visit(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleThirteenPrompt")
  declaration=node.initializer;
 ts.forEachChild(node,visit);
}
visit(ast);
assert(declaration,"Module 13 notes prompt missing");
const js=ts.transpileModule("globalThis.prompts="+declaration.getText(ast)+";",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
}).outputText;
const ctx={};vm.runInNewContext(js,ctx);
const prompts=ctx.prompts;
assert.deepEqual(Object.keys(prompts).sort(),["EN","KZ","RU"]);
const markers={
 RU:["дисметри","интенцион","слабост","проприоцепц","мшистые","лазающие","Пуркинье","ГАМК","глубокие ядра","Ромберга","внезапная","не проверяются автоматически","персональные данные"],
 EN:["dysmetria","intention tremor","weakness","proprioceptive","mossy","climbing","Purkinje","GABA","deep cerebellar nuclei","Romberg","sudden","not graded automatically","real patients"],
 KZ:["дисметрия","интенциялық","әлсіздігін","проприоцептивтік","мүкті","өрмелеуші","Пуркинье","ГАМҚ","терең ядроларын","Ромберг","Кенеттен","автоматты түрде бағаланбайды","жеке деректерін"]
};
for(const lang of ["RU","EN","KZ"]){
 const p=prompts[lang];
 assert(typeof p==="string"&&p.length>1000,lang+" needs substantive notes");
 for(const n of ["(1)","(2)","(3)"])assert(p.includes(n),lang+" missing "+n);
 for(const marker of markers[lang])assert(p.toLowerCase().includes(marker.toLowerCase()),lang+" missing "+marker);
 assert(p.includes("→"),lang+" missing reasoning chain");
}
assert(src.includes("moduleId === 13 && <p>{moduleThirteenPrompt[language]}</p>"),
 "Module 13 prompt not rendered");
assert(src.includes("moduleId === 12 && <p>{moduleTwelvePrompt[language]}</p>"),
 "Module 12 notes regressed");
assert(src.includes("saveModuleNotes(moduleId, next)"),"Persistence missing");
assert(src.includes("key={selected}"),"Section-specific editor key missing");
assert(src.includes("disabled={!ready}"),"Hydration guard missing");
assert(src.includes('aria-live="polite"'),"Accessible status missing");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Browser-only persistence missing");
assert(storage.includes("value.slice(0, 5000)"),"Note size bound missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"'),"Notes route missing");
assert(route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"),
 "Notes component route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Audit branch previews must remain disabled");
console.log("PASS: Module 13 notes RU/EN/KZ, differential reasoning, storage, route, preview guard.");
console.log("OPEN: full CI, typecheck, build, browser/voice/mobile/E2E and independent KZ review.");
