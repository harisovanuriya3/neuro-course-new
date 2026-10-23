// Module 6 progress: subject-specific self-check and mathematically honest aggregation.
// Structural/functional unit checks; not a substitute for browser or teacher review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/ModuleProgress.tsx";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX syntax error");
function findInitializer(name){
 let initializer;
 function walk(node){
  if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text===name) initializer=node.initializer;
  ts.forEachChild(node,walk);
 }
 walk(ast);assert(initializer,"Missing "+name);return initializer.getText(ast);
}
const copyExpr=findInitializer("moduleSixReview");
const ctx={};
const compiled=ts.transpileModule("const moduleSixReview="+copyExpr+";globalThis.review=moduleSixReview;",{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
vm.runInNewContext(compiled,ctx);
const review=ctx.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const entry=review[lang];
 assert(entry.title.length>15&&entry.note.length>60,lang+": missing title/note");
 assert.equal(entry.items.length,3,lang+": expected three self-check tasks");
 assert.deepEqual(entry.items.map(item=>item.section),["theory","interactive","cases"]);
 for(const item of entry.items) assert(item.question.length>110&&item.link.length>8,lang+": underspecified self-check");
 for(const token of ["Vm","E(Cl)","Cl⁻","−65"]) assert(entry.items[1].question.includes(token),lang+": missing shunting condition "+token);
}
for(const [lang,word] of Object.entries({RU:"не оцениваются автоматически",EN:"not automatically graded",KZ:"автоматты түрде бағаланбайды"}))
 assert(review[lang].note.includes(word),lang+": self-check must not claim a grade");
assert(source.includes("moduleId===6 && <section"),"Module 6 panel is not rendered");
assert(source.includes("moduleSixReview[language].items.map"),"Module 6 questions not displayed");
assert(source.includes("item.section}?lang=${language}"),"Localized study links not wired");
const expr=findInitializer("courseMastery");
function score(assessed){const context={assessed};vm.runInNewContext("globalThis.result="+expr+";",context);return context.result;}
assert.equal(score([]),0,"Empty course assessment must be zero");
assert.equal(score([{correct:1,total:1,mastery:100},{correct:20,total:100,mastery:20}]),21,"Aggregate must weight correct/total, not mean of module percentages");
assert.equal(score([{correct:3,total:4,mastery:75},{correct:2,total:6,mastery:33}]),50);
assert(source.includes("total correct answers / total checked items"),"EN weighting explanation absent");
assert(source.includes("суммарное число верных ответов / суммарное число проверенных заданий"),"RU weighting explanation absent");
assert(source.includes("барлық дұрыс жауаптар саны / барлық тексерілген тапсырмалар саны"),"KZ weighting explanation absent");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "progress"')&&route.includes("<ModuleProgress language={lang} moduleId={moduleNumber} />"),"Module progress route not wired");
const progress=read("lib/courseProgress.ts");
assert(progress.includes("Number(result.total) > 0"),"Stored outcomes must reject zero denominators");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,"Audit branch must not deploy previews");
console.log("PASS: module 6 progress RU/EN/KZ, ungraded physiology, weighted scoring, route and no-preview.");
console.log("NOTE: browser storage, screen-reader, mobile, full build and native KZ review remain unverified.");
