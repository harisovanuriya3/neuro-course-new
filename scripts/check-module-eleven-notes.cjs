// Module 11 notes: science, localization, pedagogy and browser storage contracts.
// Run: node scripts/check-module-eleven-notes.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="components/NotesContent.tsx";
const src=read(path);
const ast=ts.createSourceFile(path,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"Notes TSX must parse");
const compiled=ts.transpileModule(src,{fileName:path,reportDiagnostics:true,compilerOptions:{
 target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX
}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"Notes TSX must transpile");
let initializer;
function visit(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleElevenPrompt")
  initializer=node.initializer;
 ts.forEachChild(node,visit);
}
visit(ast);
assert(initializer,"Missing module 11 prompts");
const js=ts.transpileModule("globalThis.prompts="+initializer.getText(ast)+";",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
}).outputText;
const context={};
vm.runInNewContext(js,context);
const prompts=context.prompts;
assert.deepEqual(Object.keys(prompts).sort(),["EN","KZ","RU"]);
const required={
 RU:["кортикоспинал","внутреннюю капсулу","перекрёст большинства","α-мотонейроны","базальные ганглии","мозжечок","feedforward","feedback","проприоцептив","ретикулоспиналь","вестибулоспиналь","дисметрию","брадикинезию","мышечное веретено","не проверяются автоматически","не вводите данные реальных пациентов"],
 EN:["corticospinal","internal capsule","most fibers","α-motor neurons","basal ganglia","cerebellum","feedforward","feedback","proprioceptive","reticulospinal","vestibulospinal","dysmetria","bradykinesia","muscle spindle","not graded automatically","patient data"],
 KZ:["кортикоспинал","ішкі капсула","талшықтардың көбінің","α-мотонейрондар","базальды ганглийлер","мишық","feedforward","feedback","проприоцептив","ретикулоспинал","вестибулоспинал","Дисметрияны","брадикинезияны","бұлшықеттің ұршығы","автоматты түрде бағаланбайды","жеке деректерін"]
};
for(const lang of ["RU","EN","KZ"]){
 const prompt=prompts[lang];
 assert(typeof prompt==="string"&&prompt.length>1100,lang+": insufficient content");
 for(const marker of required[lang])assert(prompt.includes(marker),lang+": missing "+marker);
 assert(prompt.includes("(1)")&&prompt.includes("(2)")&&prompt.includes("(3)"),lang+": expected three prompts");
}
assert(src.includes("moduleId === 11 && <p>{moduleElevenPrompt[language]}</p>"),"Module 11 notes not rendered");
assert(src.includes("moduleId === 10 && <p>{moduleTenPrompt[language]}</p>"),"Module 10 notes regression");
assert(src.includes("moduleId === 9 && <p>{moduleNinePrompt[language]}</p>"),"Module 9 notes regression");
assert(src.includes("saveModuleNotes(moduleId, next)"),"Module notes persistence lost");
assert(src.includes('key={selected}'),"Notes editor should remount on section switch");
assert(src.includes("disabled={!ready}"),"Prevent premature edit before hydration");
assert(src.includes('aria-live="polite"'),"Save status must be accessible");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Storage must persist in browser");
assert(storage.includes("value.slice(0, 5000)"),"Stored note length must be bounded");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"'),"Notes route missing");
assert(route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"),"Notes component not routed");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch Vercel previews must remain disabled");
console.log("PASS: module 11 notes three languages, 3 prompts, scientific markers, route, storage, preview lock.");
console.log("OPEN: full course audit, tsc, build, browser, voice/mobile and native KZ review.");
