// Module 7 notes: actual TSX source, localized reflex prompts and storage contract.
// This is a structural/data check, not a full browser, scientific peer or language review.
const fs=require("node:fs"),assert=require("node:assert/strict"),ts=require("typescript"),vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/NotesContent.tsx",source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX parse");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"NotesContent transpile");
let init;
function walk(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleSevenPrompt")init=node.initializer;
 ts.forEachChild(node,walk);
}
walk(ast);assert(init,"Module 7 prompt missing");
const isolated=ts.transpileModule("const data="+init.getText(ast)+";globalThis.data=data;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const ctx={};vm.runInNewContext(isolated,ctx);
assert.deepEqual(Object.keys(ctx.data).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const prompt=ctx.data[lang];
 assert(typeof prompt==="string"&&prompt.length>750,lang+": prompt lacks substantive guidance");
 for(const token of ["Ia","Ib","Ia/II","L2–L4","L3–L4","Гольджи","глутамат","ацетилхолин"]){
  if(lang!=="EN")assert(prompt.includes(token),lang+": missing "+token);
 }
 for(const token of ["Ia","Ib","Ia/II","L2–L4","L3–L4","Golgi","glutamate","acetylcholine"]){
  if(lang==="EN")assert(prompt.includes(token),lang+": missing "+token);
 }
}
for(const [lang,terms] of Object.entries({
 RU:["веретено","моносинаптическая","реципрокное торможение","Ендрассика","не доказывает диагноз","не проверяются автоматически","не вводите данные реальных пациентов"],
 EN:["muscle spindle","monosynaptic","reciprocal inhibition","Jendrassik","does not prove a diagnosis","not graded automatically","do not enter real patient information"],
 KZ:["ұршығы","моносинапстық","реципроктық тежелуі","Ендрассик","диагнозды немесе зақым орнын дәлелдемейді","автоматты түрде бағаланбайды","нақты пациенттердің деректерін енгізбеңіз"]
}))for(const term of terms)assert(ctx.data[lang].includes(term),lang+": missing "+term);
assert(source.includes("moduleId === 7 && <p>{moduleSevenPrompt[language]}</p>"),"Prompt not rendered");
for(const preserved of ["moduleId === 3 && <p>{moduleThreePrompt[language]}</p>","moduleId === 4 && <p>{moduleFourPrompt[language]}</p>","moduleId === 6 && <p>{moduleSixPrompt[language]}</p>"])
 assert(source.includes(preserved),"Prior module prompt must remain: "+preserved);
assert(source.includes("saveModuleNotes(moduleId, next)"),"Notes persistence missing");
assert(source.includes("key={selected}"),"Section change must remount note input");
assert(source.includes("disabled={!ready}"),"Editing must wait for browser storage read");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Storage write missing");
assert(storage.includes("value.slice(0, 5000)"),"Saved note length cap missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"')&&route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 7 notes RU/EN/KZ reflex reasoning, mechanism and diagnostic limits, route, persistence, no preview.");
console.log("OPEN: full TypeScript/build, browser storage/dictation, accessibility, independent KZ review.");
