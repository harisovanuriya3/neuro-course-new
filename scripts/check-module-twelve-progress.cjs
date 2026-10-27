// Module 12 progress: three ungraded basal-ganglia reflections in RU/EN/KZ.
// This source contract does not replace TypeScript typecheck, build, E2E or native-language review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/ModuleProgress.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,
 "ModuleProgress TSX parse error: "+ast.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,"\n")).join("; "));
const output=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((output.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "ModuleProgress TSX transpilation errors");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleTwelveReview");
assert(declaration?.initializer,"Module 12 reflection missing");
const js=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
const context={};vm.runInNewContext(js,context);
const review=context.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
const markers={
 RU:["GPi/SNr","GPe","STN","D1","D2","брадикинез","парез","дисметр","автоматически"],
 EN:["GPi/SNr","GPe","STN","D1","D2","bradykinesia","paresis","dysmetria","automatically"],
 KZ:["GPi/SNr","GPe","STN","D1","D2","брадикинезия","парез","дисметрия","автоматты"]
};
for(const lang of ["RU","EN","KZ"]){
 const copy=review[lang];
 assert(copy.title.length>20&&copy.note.length>160,lang+" missing scope disclaimer");
 assert.equal(copy.items.length,3,lang+" expected three prompts");
 assert.deepEqual(Array.from(copy.items,item=>item.section),["theory","interactive","cases"],lang+" sections mismatch");
 assert.equal(new Set(copy.items.map(item=>item.question)).size,3,lang+" duplicate prompts");
 for(const item of copy.items){
  assert(item.question.length>230,lang+" insufficient mechanism prompt");
  assert(item.link.length>12,lang+" missing link label");
 }
 const all=[copy.note,...copy.items.map(item=>item.question)].join(" ").toLowerCase();
 for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
}
assert(src.includes("moduleId===12 && <section"),"Module 12 panel not rendered");
assert(src.includes("moduleTwelveReview[language].items.map"),"Module 12 questions not rendered");
assert(src.includes("moduleId===11 && <section"),"Module 11 reflection lost");
assert(src.includes("moduleId===12?c.mid:c.strong"),"Module 12 must not claim readiness based on sparse selections");
assert(src.includes("const testEvidence=combined([test])"),"Test evidence should remain distinct from case completion");
assert(!src.includes("combined([test,cases])"),"Case completion must not count as correct answers");
assert(!src.includes("recordOutcome("),"Open reflection must not be automatically scored");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<ModuleProgress language={lang} moduleId={moduleNumber} />'),"Progress route missing");
const sections=read("content/sections.ts");
for(const section of ["theory","interactive","cases"])
 assert(sections.includes('slug: "'+section+'"'),"Missing linked section "+section);
const storage=read("lib/courseProgress.ts");
assert(storage.includes("Number(result.total) > 0"),"Progress denominator guard missing");
const patient=read("components/UnifiedVirtualPatient.tsx");
assert(patient.includes('recordOutcome(moduleId, "virtual-patient", correct, scenario.stages.length)'),"Virtual-patient choice-only outcome changed");
assert(patient.includes("Written reasoning is not automatically checked"),"Module 12 virtual-patient limitation missing");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch must not publish previews");
console.log("PASS: module 12 progress: RU/EN/KZ ungraded reflection, 3 routes, score limits, Vercel guard.");
console.log("OPEN: full course audit, typecheck, build, E2E, independent Kazakh and clinical review.");
