// Focused 14/progress contract: RU/EN/KZ, evidence-limited ungraded reflection.
// Direct textbook reading: Guyton & Hall 13e PDF 584–586;
// Ganong 23e PDF 241–243; Ghai Practical Physiology 8e PDF 323–325.
// This does not replace clinical, native-speaker or browser/E2E review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/ModuleProgress.tsx",src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX syntax");
const compiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"TSX transpilation");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleFourteenReview");
assert(declaration?.initializer,"module 14 progress reflection missing");
const code=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const ctx={};vm.runInNewContext(code,ctx);const review=ctx.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
const markers={
 RU:["вибрац","продолговат","медиальн","VPL","VPM","ГАМК","ретикуляр","диагноз","автоматически"],
 EN:["vibration","medulla","medial lemniscus","VPL","VPM","GABA","reticular","diagnosis","automatically"],
 KZ:["діріл","сопақша","медиалдық","VPL","VPM","ГАМҚ","ретикуляр","диагноз","автоматты"]
};
for(const lang of ["RU","EN","KZ"]){
 const copy=review[lang];
 assert(copy.title.length>20&&copy.note.length>170,lang+" missing limitation");
 assert.equal(copy.items.length,3,lang+" reflection count");
 assert.deepEqual(Array.from(copy.items,x=>x.section),["theory","interactive","cases"]);
 assert.equal(new Set(copy.items.map(x=>x.question)).size,3,lang+" duplicate prompts");
 for(const item of copy.items){
  assert(item.question.length>=250,lang+" insufficient reasoning prompt");
  assert(item.link.length>=12,lang+" link missing");
 }
 const all=[copy.note,...copy.items.map(x=>x.question)].join(" ").toLowerCase();
 for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
}
assert(src.includes("moduleId===14 && <section"),"14/progress panel not rendered");
assert(src.includes("moduleFourteenReview[language].items.map"),"14/progress links not rendered");
assert(src.includes("(moduleId===12||moduleId===13||moduleId===14)?c.mid:c.strong"),
 "Sparse or choice-only evidence must not imply readiness for module 14");
assert(src.includes("const testEvidence=combined([test])"),"test evidence separation lost");
assert(!src.includes("combined([test,cases])"),"case completion counted as checked answers");
assert(!src.includes("recordOutcome("),"open reflection must remain ungraded");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes("<ModuleProgress language={lang} moduleId={moduleNumber} />"),"progress route missing");
const sections=read("content/sections.ts");
for(const slug of ["theory","interactive","cases"])
 assert(sections.includes('slug: "'+slug+'"'),"missing linked section "+slug);
const storage=read("lib/courseProgress.ts");
assert(storage.includes("Number(result.total) > 0"),"invalid progress denominator guard");
const vp=read("components/UnifiedVirtualPatient.tsx");
assert(vp.includes('recordOutcome(moduleId, "virtual-patient", correct, scenario.stages.length)'),
 "virtual-patient choice-only outcome changed");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 14 progress, three ungraded thalamic reflections x RU/EN/KZ; links, evidence limits, Vercel guard");
console.log("OPEN: full CI, TypeScript build, browser/mobile/E2E and independent medical KZ edit");
