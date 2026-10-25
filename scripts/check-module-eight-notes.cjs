// Module 8: formative notes must distinguish ascending pathway crossings and diagnostic limits.
// Structural + localized-content regression; browser, speech and full TypeScript build are separate.
const fs=require("node:fs"),assert=require("node:assert/strict");
const ts=require("typescript"),vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/NotesContent.tsx",source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX parse errors");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((compiled.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0,
 "NotesContent transpile diagnostics");
let init;
function visit(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleEightPrompt")
  init=node.initializer;
 ts.forEachChild(node,visit);
}
visit(ast);
assert(init,"Module 8 notes prompt missing");
const isolated=ts.transpileModule("const p="+init.getText(ast)+";globalThis.prompts=p;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const ctx={};vm.runInNewContext(isolated,ctx);
assert.deepEqual(Object.keys(ctx.prompts).sort(),["EN","KZ","RU"]);
const tokens={
 RU:["задние столбы","продолговатом мозге","переднюю белую спайку","T10","VPL",
 "несколькими сегментами ниже","уровень позвонка","не проверяются автоматически","реальных пациентов"],
 EN:["dorsal columns","medullary decussation","anterior white commissure","T10","VPL",
 "a few segments below","vertebral level","not graded automatically","patient data"],
 KZ:["артқы бағандар","сопақша мидағы айқасу","алдыңғы ақ комиссура","T10","VPL",
 "бірнеше сегмент төмен","омыртқа деңгейін","автоматты түрде бағаланбайды","пациенттердің жеке деректерін"]
};
for(const lang of ["RU","EN","KZ"]){
 const prompt=ctx.prompts[lang];
 assert(typeof prompt==="string"&&prompt.length>650,lang+": prompt too short");
 for(const token of tokens[lang])assert(prompt.includes(token),lang+": missing "+token);
}
assert(source.includes("moduleId === 8 && <p>{moduleEightPrompt[language]}</p>"),
 "Module 8 notes prompt not displayed");
for(const [id,name] of [[3,"moduleThreePrompt"],[4,"moduleFourPrompt"],
 [6,"moduleSixPrompt"],[7,"moduleSevenPrompt"]])
 assert(source.includes("moduleId === "+id+" && <p>{"+name+"[language]}</p>"),
 "Existing notes prompt for module "+id+" changed");
assert(source.includes("saveModuleNotes(moduleId, next)"),"Persistence wiring missing");
assert(source.includes("key={selected}"),"Notes must update when section changes");
assert(source.includes("disabled={!ready}"),"Notes editing must wait for storage hydration");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Notes persistence missing");
assert(storage.includes("value.slice(0, 5000)"),"Stored note length cap missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"')&&
 route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"),
 "Notes route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 8 notes RU/EN/KZ pathway crossing, sensory laterality, diagnostic limits, storage and route.");
console.log("OPEN: complete Node/TS/build suite, browser keyboard/mobile, microphone, independent KZ review.");
