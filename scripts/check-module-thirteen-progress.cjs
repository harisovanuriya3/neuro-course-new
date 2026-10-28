// Module 13 progress: ungraded cerebellar reflection in RU/EN/KZ.
// Structural and physiological marker regression; NOT a browser or native-speaker assessment.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/ModuleProgress.tsx";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX parse error");
const transpiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,
 "ModuleProgress TSX transpilation errors");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleThirteenReview");
assert(declaration?.initializer,"Module 13 reflection missing");
const js=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
const ctx={};vm.runInNewContext(js,ctx);
const review=ctx.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
const markers={
 RU:["мшистые","лазающие","Пуркинье","ГАМК","глубокие ядра","дисметрия","Ромберга","автоматически"],
 EN:["mossy","climbing","Purkinje","GABA","deep","dysmetria","Romberg","automatically"],
 KZ:["мүкті","өрмелеуші","Пуркинье","ГАМҚ","терең ядролары","дисметрия","Ромберг","автоматты"]
};
for(const lang of ["RU","EN","KZ"]){
 const copy=review[lang];
 assert(copy.title.length>20&&copy.note.length>180,lang+" missing ungraded scope note");
 assert.equal(copy.items.length,3,lang+" expected three prompts");
 assert.deepEqual(Array.from(copy.items,item=>item.section),["theory","interactive","cases"],lang+" sections mismatch");
 assert.equal(new Set(copy.items.map(item=>item.question)).size,3,lang+" duplicate prompts");
 for(const item of copy.items){
  assert(item.question.length>250,lang+" insufficient physiological reasoning prompt");
  assert(item.link.length>12,lang+" missing linked section label");
 }
 const all=[copy.note,...copy.items.map(item=>item.question)].join(" ").toLowerCase();
 for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
}
assert(src.includes("moduleId===13 && <section"),"Module 13 panel not rendered");
assert(src.includes("moduleThirteenReview[language].items.map"),"Module 13 items not rendered");
assert(src.includes("(moduleId===12||moduleId===13)?c.mid:c.strong"),
 "Module 13 must not claim readiness from sparse checked outcomes");
assert(src.includes("const testEvidence=combined([test])"),"Test evidence must remain separate");
assert(!src.includes("combined([test,cases])"),"Case completion must not count as correct answers");
assert(!src.includes("recordOutcome("),"Open reflection must remain ungraded");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<ModuleProgress language={lang} moduleId={moduleNumber} />'),"Progress route missing");
const sections=read("content/sections.ts");
for(const section of ["theory","interactive","cases"])
 assert(sections.includes('slug: "'+section+'"'),"Missing linked section "+section);
const storage=read("lib/courseProgress.ts");
assert(storage.includes("Number(result.total) > 0"),"Progress denominator guard missing");
const patient=read("components/UnifiedVirtualPatient.tsx");
assert(patient.includes('recordOutcome(moduleId, "virtual-patient", correct, scenario.stages.length)'),
 "Virtual-patient choice-only outcome changed");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch Vercel previews must remain disabled");
console.log("PASS: Module 13 progress RU/EN/KZ, ungraded reflection, links, evidence limits and Vercel guard.");
console.log("OPEN: full course audit, typecheck, build, browser/mobile/E2E and independent KZ medical review.");
