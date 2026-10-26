// Module 10: ungraded brainstem reflection, RU/EN/KZ.
// Source/AST contract; not a full typecheck, browser or native-speaker review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const component="components/ModuleProgress.tsx";
const src=read(component);
const ast=ts.createSourceFile(component,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX parse error");
const compiled=ts.transpileModule(src,{fileName:component,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "ModuleProgress TSX transpile");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleTenReview");
assert(declaration?.initializer,"Module 10 reflection missing");
const js=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const review=context.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
const markers={
 RU:["II","III","V1","VII","претекталь","сознани","ЭЭГ","КСВП","не проверяются автоматически","роговиц"],
 EN:["II","III","V1","VII","pretectal","awareness","EEG","BAEP","not automatically graded","corneal"],
 KZ:["II","III","V1","VII","претектал","саналы","ЭЭГ","есту","автоматты түрде бағаланбайды","қасаң"]
};
for(const lang of ["RU","EN","KZ"]){
 const copy=review[lang];
 assert(copy.title.length>25&&copy.note.length>170,lang+" missing ungraded disclaimer");
 assert.equal(copy.items.length,3,lang+" expected 3 prompts");
 assert.deepEqual(Array.from(copy.items,item=>item.section),["theory","interactive","media"],
  lang+" unexpected sections");
 for(const item of copy.items){
  assert(item.question.length>240,lang+" insufficient mechanism prompt");
  assert(item.link.length>12,lang+" missing navigation label");
 }
 const all=[copy.note,...copy.items.map(item=>item.question)].join(" ").toLowerCase();
 for(const term of markers[lang])assert(all.includes(term.toLowerCase()),lang+" missing "+term);
}
assert(src.includes("moduleId===10 && <section"),"Module 10 progress panel not rendered");
assert(src.includes("moduleTenReview[language].items.map"),"Module 10 reflection questions not shown");
assert(src.includes("item.section}?lang="),"Localized links missing");
assert(src.includes("moduleId===9 && <section"),"Previous module panel lost");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<ModuleProgress language={lang} moduleId={moduleNumber} />'),"Progress route missing");
const sections=read("content/sections.ts");
for(const section of ["theory","interactive","media"])assert(sections.includes('slug: "'+section+'"'),"Missing linked section "+section);
const storage=read("lib/courseProgress.ts");
assert(storage.includes("Number(result.total) > 0"),"Invalid stored denominator not guarded");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch must not publish previews");
console.log("PASS: module 10 progress: RU/EN/KZ, three ungraded mechanisms, localized routes, storage guard and previews off.");
console.log("OPEN: complete science audit, typecheck, build, browser/mobile and native Kazakh review.");
