// Module 9 notes: scientific reasoning, model limits, safety, and localized prompts.
// Source checks are not a substitute for full TS typecheck, build, or browser testing.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="components/NotesContent.tsx";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX parse errors");
const result=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,compilerOptions:{
 target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX
}});
assert.equal((result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "NotesContent TSX transpile errors");
let initializer;
function walk(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleNinePrompt")
  initializer=node.initializer;
 ts.forEachChild(node,walk);
}
walk(ast);
assert(initializer,"Module 9 notes prompt not found");
const isolated=ts.transpileModule("globalThis.data="+initializer.getText(ast)+";",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
}).outputText;
const context={};
vm.runInNewContext(isolated,context);
assert.deepEqual(Object.keys(context.data).sort(),["EN","KZ","RU"]);
const expected={
 RU:["мышечное веретено","Ia-афферент","задний корешок","α-мотонейрон","реципрокное торможение",
 "полисинаптической","не обязательно","одинаковый условный вход Ia","проценты","не измерения ЭМГ",
 "спинальный шок","нейрогенного шока","не проверяются автоматически","реальных пациентов"],
 EN:["muscle spindle","Ia afferent","dorsal root","α-motor neuron","reciprocal inhibition",
 "polysynaptic","not obligatory","Ia input constant","model indices","not EMG",
 "spinal shock","neurogenic shock","not graded automatically","patient information"],
 KZ:["бұлшықет ұршығын","Ia-афферентті","артқы түбіршек","α-мотонейронмен",
 "реципроктық","полисинапстық","міндетті емес","Ia кірісін бірдей","шартты индекстері",
 "ЭМГ","жұлындық шокты","нейрогендік шоктан","автоматты түрде бағаланбайды",
 "пациенттердің жеке деректерін"]
};
for(const lang of ["RU","EN","KZ"]){
 const prompt=context.data[lang];
 assert(typeof prompt==="string"&&prompt.length>900,lang+": incomplete learning scaffold");
 for(const term of expected[lang])assert(prompt.includes(term),lang+": missing "+term);
}
assert(source.includes("moduleId === 9 && <p>{moduleNinePrompt[language]}</p>"),
 "Module 9 notes not rendered");
for(const [id,name] of [[3,"moduleThreePrompt"],[4,"moduleFourPrompt"],
 [6,"moduleSixPrompt"],[7,"moduleSevenPrompt"],[8,"moduleEightPrompt"]]){
 assert(source.includes("moduleId === "+id+" && <p>{"+name+"[language]}</p>"),
  "Existing module "+id+" prompt missing");
}
assert(source.includes("saveModuleNotes(moduleId, next)"),"Persistence wiring missing");
assert(source.includes("key={selected}"),"Switching sections must remount note input");
assert(source.includes("disabled={!ready}"),"Notes edit before hydration");
assert(source.includes("aria-live=\"polite\""),"Save status must be announced");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Local storage missing");
assert(storage.includes("value.slice(0, 5000)"),"Note cap missing");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"')&&
 route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"),"Notes route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch previews must remain disabled");
console.log("PASS: module 9 notes localized scientific prompts, model limits, safety, storage and route.");
console.log("OPEN: npm audit, tsc, build, browser/voice/mobile, independent Kazakh review.");
