// Module 11 progress: ungraded, evidence-based motor control reflection (RU/EN/KZ).
// This contract does not replace typecheck, build, browser, or native-speaker review.
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
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleElevenReview");
assert(declaration?.initializer,"Module 11 reflection missing");
const js=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const review=context.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
const markers={
 RU:["кортикоспиналь","пирамид","α-мотонейрон","базальн","проприоцеп","веретен","Гольджи","не проверяются автоматически"],
 EN:["corticospinal","pyramids","alpha motor","basal ganglia","proprioceptive","spindle","Golgi","not automatically graded"],
 KZ:["кортикоспинал","пирамид","α-мотонейрон","базальды","проприоцеп","ұршығы","Гольджи","автоматты түрде бағаланбайды"]
};
for(const lang of ["RU","EN","KZ"]){
 const copy=review[lang];
 assert(copy.title.length>20&&copy.note.length>150,lang+" missing ungraded disclaimer");
 assert.equal(copy.items.length,3,lang+" expected 3 distinct prompts");
 assert.deepEqual(Array.from(copy.items,item=>item.section),["theory","interactive","cases"],
  lang+" unexpected sections");
 assert.equal(new Set(copy.items.map(item=>item.question)).size,3,lang+" repeated prompts");
 for(const item of copy.items){
  assert(item.question.length>230,lang+" insufficient mechanism prompt");
  assert(item.link.length>12,lang+" missing navigation label");
 }
 const all=[copy.note,...copy.items.map(item=>item.question)].join(" ").toLowerCase();
 for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
}
assert(src.includes("moduleId===11 && <section"),"Module 11 progress panel not rendered");
assert(src.includes("moduleElevenReview[language].items.map"),"Module 11 reflection questions not shown");
assert(src.includes("moduleId===10 && <section"),"Module 10 reflection panel lost");
assert(!src.includes(String.fromCharCode(92,96)),"Invalid escaped template literal in TSX");
assert(!src.includes(String.fromCharCode(92,36)),"Invalid escaped interpolation in TSX");
assert(src.includes("const testEvidence=combined([test])"),"Checked tests must be separate from case completion");
assert(!src.includes("combined([test,cases])"),"Case completion must not count as mastery evidence");
const caseSource=read("components/CasesContent.tsx");
assert(caseSource.includes('recordOutcome(moduleId, "cases", next.length, lesson.cases.length)'),
 "Cases completion contract changed: reassess scoring semantics");
assert(caseSource.includes('recordOutcome(moduleId, "criterion:clinical:cases"'),
 "Checked case decisions must be stored separately from completion");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<ModuleProgress language={lang} moduleId={moduleNumber} />'),"Progress route missing");
const sections=read("content/sections.ts");
for(const section of ["theory","interactive","cases"])
 assert(sections.includes('slug: "'+section+'"'),"Missing linked section "+section);
const storage=read("lib/courseProgress.ts");
assert(storage.includes("Number(result.total) > 0"),"Invalid denominator not guarded");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch must not publish previews");
console.log("PASS: module 11 progress: RU/EN/KZ, 3 ungraded mechanisms, routes, storage and previews off.");
console.log("OPEN: full science audit, typecheck, build, browser/mobile and independent Kazakh review.");
