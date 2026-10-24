// Module 7 progress: localized, ungraded, physiologically anchored self-check.
const fs=require("node:fs"),assert=require("node:assert/strict"),ts=require("typescript"),vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="components/ModuleProgress.tsx",source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX syntax");
const result=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});
assert.equal((result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"TSX transpilation");
let init;
function walk(node){if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleSevenReview")init=node.initializer;ts.forEachChild(node,walk);}
walk(ast);assert(init,"Module 7 self-check missing");
const isolated=ts.transpileModule("const review="+init.getText(ast)+";globalThis.review=review;",{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const context={};vm.runInNewContext(isolated,context);const review=context.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const entry=review[lang];assert(entry.title.length>25&&entry.note.length>90);
 assert.equal(entry.items.length,3);assert.deepEqual(Array.from(entry.items,x=>x.section),["theory","interactive","cases"]);
 for(const item of entry.items)assert(item.question.length>200&&item.link.length>12);
 const joined=entry.items.map(x=>x.question).join(" ").toLowerCase();
 for(const term of ["ia","ib","глутамат".slice(0,0)])if(term)assert(joined.includes(term),lang+" missing "+term);
}
for(const [lang,terms] of Object.entries({
 RU:["веретена","моносинаптический","глутамат","ацетилхолин","Гольджи","Ендрассика"],
 EN:["monosynaptic","glutamate","acetylcholine","Golgi","Jendrassik"],
 KZ:["моносинапстық","глутамат","ацетилхолин","Гольджи","Ендрассик"]
}))for(const term of terms)assert(review[lang].items.map(x=>x.question).join(" ").toLowerCase().includes(term.toLowerCase()),lang+" missing "+term);
assert(review.RU.note.includes("не проверяются автоматически"));
assert(review.EN.note.includes("not automatically graded"));
assert(review.KZ.note.includes("автоматты түрде бағаланбайды"));
assert(source.includes("moduleId===7 && <section aria-label={moduleSevenReview[language].title}"));
assert(source.includes("moduleSevenReview[language].items.map"));
assert(source.includes("item.section}?lang="));
assert(source.includes("moduleId===6 && <section"),"Module 6 must remain");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "progress"')&&route.includes("<ModuleProgress language={lang} moduleId={moduleNumber} />"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 7 progress: 3 ungraded reflex self-checks × RU/EN/KZ, route, no preview.");
console.log("OPEN: build, browser, accessibility, independent KZ review.");
