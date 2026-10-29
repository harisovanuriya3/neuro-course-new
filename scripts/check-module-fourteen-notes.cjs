// Module 14 notes: thalamic pathway, side of crossing, feedback and safe inference.
// Structural regression only: does not replace CI, browser testing or medical KZ review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/NotesContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX must parse");
const out=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,compilerOptions:{
 target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX
}});
assert.equal((out.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "NotesContent must transpile");
let declaration;
function visit(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleFourteenPrompt")
  declaration=node.initializer;
 ts.forEachChild(node,visit);
}
visit(ast);
assert(declaration,"Module 14 notes prompt missing");
const js=ts.transpileModule("globalThis.prompts="+declaration.getText(ast)+";",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
}).outputText;
const ctx={};vm.runInNewContext(js,ctx);
const prompts=ctx.prompts;
assert.deepEqual(Object.keys(prompts).sort(),["EN","KZ","RU"]);
const markers={
 RU:["правой кисти","клиновидный","продолговатого","перекрёст","медиальная петля","VPL","VPM","спинальным","белую спайку","глутамат","ГАМК","ретикулярного ядра","не провер"],
 EN:["right hand","cuneate nucleus","medulla","decussation","medial lemniscus","VPL","VPM","spinal crossing","anterior white commissure","glutamatergic","GABAergic","reticular nucleus","ungraded"],
 KZ:["Оң қолдағы","сына тәрізді ядро","сопақша мида","айқасуы","медиалдық ілмек","VPL","VPM","алдыңғы ақ комиссура","глутамат","ГАМҚ","ретикулярлық ядросының","бағаланбайтын"]
};
for(const lang of ["RU","EN","KZ"]){
 const p=prompts[lang];
 assert(typeof p==="string"&&p.length>1000,lang+" needs substantive notes");
 for(const n of ["(1)","(2)","(3)"])assert(p.includes(n),lang+" missing "+n);
 for(const marker of markers[lang])assert(p.toLowerCase().includes(marker.toLowerCase()),lang+" missing "+marker);
 assert(p.includes("→"),lang+" missing reasoning chain");
}
assert(src.includes("moduleId === 14 && <p>{moduleFourteenPrompt[language]}</p>"),"Module 14 prompt not rendered");
assert(src.includes("moduleId === 13 && <p>{moduleThirteenPrompt[language]}</p>"),"Module 13 notes regressed");
assert(src.includes("saveModuleNotes(moduleId, next)"),"Persistence missing");
assert(src.includes("key={selected}"),"Section-specific editor key missing");
assert(src.includes("disabled={!ready}"),"Hydration guard missing");
assert(src.includes('aria-live="polite"'),"Accessible status missing");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Browser-only persistence missing");
assert(storage.includes("value.slice(0, 5000)"),"Note size bound missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"'),"Notes route missing");
assert(route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"),"Notes component route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Audit branch previews must remain disabled");
console.log("PASS: Module 14 notes RU/EN/KZ, thalamic pathway, laterality, privacy, storage, route, preview guard.");
console.log("OPEN: full CI, typecheck, build, browser/voice/mobile/E2E and independent KZ review.");
