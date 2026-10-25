// Module 9: ungraded spinal-reflex reflection in RU/EN/KZ.
// Source/AST and runtime factory checks; not a browser or Next.js build.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const component="components/ModuleProgress.tsx";
const source=read(component);
const ast=ts.createSourceFile(component,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX parse error");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(statement=>[...statement.declarationList.declarations])
 .find(declaration=>ts.isIdentifier(declaration.name)&&declaration.name.text==="moduleNineReview");
assert(declaration?.initializer,"Missing module 9 reflection");
const js=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(js,context);
const review=context.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const copy=review[lang];
 assert(copy.title.length>30&&copy.note.length>100,lang+" missing explanation");
 assert.equal(copy.items.length,3,lang+" expected 3 reflection prompts");
 assert.deepEqual(Array.from(copy.items,item=>item.section),["theory","interactive","cases"]);
 for(const item of copy.items){
  assert(item.question.length>200,lang+" underspecified mechanism question");
  assert(item.link.length>12,lang+" missing navigation label");
 }
}
for(const [lang,terms] of Object.entries({
 RU:["Ia","моносинап","интернейрон","ЭМГ","спинальный шок","нейрогенного","не проверяются автоматически"],
 EN:["Ia","monosynaptic","interneuron","EMG","spinal shock","neurogenic shock","not automatically graded"],
 KZ:["Ia","моносинап","интернейрон","ЭМГ","Жұлындық шок","нейрогендік шок","автоматты түрде бағаланбайды"]
})){
 const combined=[review[lang].note,...review[lang].items.map(item=>item.question)].join(" ").toLowerCase();
 for(const term of terms)assert(combined.includes(term.toLowerCase()),lang+" missing "+term);
}
assert(source.includes("moduleId===9 && <section"),"Module 9 panel is not rendered");
assert(source.includes("moduleNineReview[language].items.map"),"Module 9 questions are not shown");
assert(source.includes("item.section}?lang="),"Localized reflection links missing");
assert(source.includes("moduleId===8 && <section"),"Module 8 reflection must remain");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<ModuleProgress language={lang} moduleId={moduleNumber} />'),"Progress route missing");
const progress=read("lib/courseProgress.ts");
assert(progress.includes("Number(result.total) > 0"),"Invalid denominators must be rejected");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 9 progress: RU/EN/KZ, three ungraded mechanisms, route, storage guard and previews disabled.");
console.log("OPEN: complete audit, TypeScript build, browser/keyboard/mobile and native Kazakh review.");
