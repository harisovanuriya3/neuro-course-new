// Module 8 progress: ungraded pathway reflection, no false mastery claims.
// Source/AST checks only; not a browser or full Next.js build.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="components/ModuleProgress.tsx";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"ModuleProgress TSX parse error");
const declaration=ast.statements.filter(ts.isVariableStatement)
 .flatMap(s=>[...s.declarationList.declarations])
 .find(d=>ts.isIdentifier(d.name)&&d.name.text==="moduleEightReview");
assert(declaration?.initializer,"Missing module 8 progress reflection");
const js=ts.transpileModule("const review="+declaration.initializer.getText(ast)+";globalThis.review=review;",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const ctx={};vm.runInNewContext(js,ctx);
const review=ctx.review;
assert.deepEqual(Object.keys(review).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const c=review[lang];
 assert(c.title.length>20&&c.note.length>80,lang+" missing note");
 assert.equal(c.items.length,3,lang+" expected 3 prompts");
 assert.deepEqual(Array.from(c.items,x=>x.section),["theory","interactive","cases"]);
 for(const item of c.items)assert(item.question.length>170&&item.link.length>12,lang+" underspecified prompt");
 const full=c.items.map(x=>x.question).join(" ");
 for(const token of ["T10"])assert(full.includes(token),lang+" missing "+token);
}
for(const [lang,markers] of Object.entries({
 RU:["не оцениваются автоматически","медиальной петли","переднюю белую спайку","позвонку"],
 EN:["not automatically graded","medial lemniscus","anterior white commissure","vertebra"],
 KZ:["автоматты түрде бағаланбайды","медиалдық ілмек","алдыңғы ақ комиссура","омыртқасына"]
})){
 const all=[review[lang].note,...review[lang].items.map(x=>x.question)].join(" ").toLowerCase();
 for(const marker of markers)assert(all.includes(marker.toLowerCase()),lang+" missing "+marker);
}
assert(source.includes("moduleId===8 && <section"),"Module 8 panel must be rendered");
assert(source.includes("moduleEightReview[language].items.map"),"Module 8 questions not shown");
assert(source.includes("item.section}?lang=${language}"),"Localized links missing");
assert(source.includes("moduleId===6 && <section")&&source.includes("moduleId===7 && <section"),
 "Previous reflection panels must remain available");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('<ModuleProgress language={lang} moduleId={moduleNumber} />'),"Progress route missing");
const progress=read("lib/courseProgress.ts");
assert(progress.includes("Number(result.total) > 0"),"Invalid stored denominator must be rejected");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 8 progress RU/EN/KZ, 9 ungraded prompts, routing, storage guard, preview disabled.");
console.log("OPEN: browser, full Node audit, TypeScript build, native Kazakh review.");
