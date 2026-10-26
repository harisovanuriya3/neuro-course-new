// Module 10 notes: source-level scientific, language, safety and persistence checks.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/NotesContent.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX parse errors");
const compiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,compilerOptions:{
 target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX
}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "NotesContent TSX transpile errors");
let init;
function visit(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleTenPrompt")
  init=node.initializer;
 ts.forEachChild(node,visit);
}
visit(ast);
assert(init,"Module 10 notes scaffold missing");
const isolated=ts.transpileModule("globalThis.prompts="+init.getText(ast)+";",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
}).outputText;
const context={};
vm.runInNewContext(isolated,context);
assert.deepEqual(Object.keys(context.prompts).sort(),["EN","KZ","RU"]);
const terms={
 RU:["II нерв","Эдингера—Вестфаля","III нерв","V1","VII нерв","какое звено","бодрствования","таламус","гипоталамус","КСВП","усредняют","латентность","не подтверждает сознание","не проводите","персональные данные","не проверяются автоматически"],
 EN:["CN II","Edinger–Westphal","CN III","V1","CN VII","right-sided limb","arousal","thalamus","hypothalamus","BAEP","averaged","latency","not establish awareness","Do not perform","patient data","not graded automatically"],
 KZ:["II жүйке","Эдингер—Вестфаль","III жүйке","V1","VII жүйке","қай буын","Сергектіктің","таламус","гипоталамус","КСВП/BAEP","орташа мәнге","латенттілік","дәлелдемейді","жүргізбеңіз","пациенттің жеке деректерін","бағаланбайды"]
};
for(const lang of ["RU","EN","KZ"]){
 const prompt=context.prompts[lang];
 assert(typeof prompt==="string"&&prompt.length>900,lang+": incomplete prompts");
 for(const term of terms[lang])assert(prompt.includes(term),lang+": missing "+term);
}
assert(src.includes("moduleId === 10 && <p>{moduleTenPrompt[language]}</p>"),
 "Module 10 notes must render localized scaffold");
assert(src.includes("moduleId === 9 && <p>{moduleNinePrompt[language]}</p>"),
 "Do not remove module 9 notes");
assert(src.includes("saveModuleNotes(moduleId, next)"),"Notes persistence missing");
assert(src.includes('key={selected}'),"Changing sections must remount note editor");
assert(src.includes("disabled={!ready}"),"Avoid editing before hydration");
assert(src.includes('aria-live="polite"'),"Announce save failures");
const storage=read("lib/moduleNotes.ts");
assert(storage.includes("localStorage.setItem"),"Notes must persist locally");
assert(storage.includes("value.slice(0, 5000)"),"Note length must be bounded");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"')&&
 route.includes("<NotesContent language={lang} moduleId={moduleNumber} />"),"Notes route missing");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch Vercel preview must stay disabled");
console.log("PASS: module 10 notes RU/EN/KZ, physiology, limits, safety, storage and route.");
console.log("OPEN: full npm audit, tsc, build, browser, voice/mobile, native-language review.");
