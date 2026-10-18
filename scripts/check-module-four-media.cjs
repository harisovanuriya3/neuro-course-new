// Source-level regression for module 4 action-potential media.
// Requires TypeScript; does not replace Next build or browser verification.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const files=[
 "content/course-foundation/module-four-media.ts",
 "components/ModuleFourMediaAnimation.tsx",
 "components/MediaContent.tsx",
 "content/index.ts"
];
const sources={};
for(const file of files){
 const src=fs.readFileSync(file,"utf8");
 const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 assert.equal(ast.parseDiagnostics.length,0,file+": TypeScript syntax error");
 sources[file]=src;
}
const authored=sources[files[0]],visual=sources[files[1]],renderer=sources[files[2]],registry=sources[files[3]];
for(const lang of ["RU","EN","KZ"]){
 assert(authored.includes("  "+lang+": {"),"Missing authored media language "+lang);
 assert(visual.includes(" "+lang+": {"),"Missing diagram language "+lang);
 assert(registry.includes('createModuleFourMedia("'+lang+'", moduleFourBaseMedia("'+lang+'"))'),"Missing media registry "+lang);
}
for(const phrase of ["Na⁺","K⁺","Na⁺/K⁺","after-hyperpolarization","инактивац","инактивация"]){
 assert((authored+visual).toLowerCase().includes(phrase.toLowerCase()),"Missing mechanism "+phrase);
}
assert(authored.includes("correctAnswer:'b'"),"Expected mechanistic answer key b");
assert(authored.includes("animation:'foundation'"),"Diagram route not enabled");
assert(authored.includes("theoryAnchor:'mechanism'"),"Theory link missing");
assert(renderer.includes('moduleId === "4" && block.animation === "foundation"'),"Module 4 renderer override missing");
assert(renderer.includes('<ModuleFourMediaAnimation key={language} language={language} />'),"Module 4 animation not rendered");
assert(visual.includes("disabled={step===0}")&&visual.includes("disabled={step===3}"),"Phase navigation bounds missing");
assert(visual.includes('role="img"')&&visual.includes('aria-label='),"Accessible diagram description missing");
assert(visual.includes("const [step,setStep]=useState(0)"),"Interactive phase state missing");
assert(visual.includes("not a recording")&&visual.includes("нақты жазба емес"),"Schematic limitation missing");
assert.equal((visual.match(/\["(?:Покой|Восходящая фаза|Реполяризация|Следовая гиперполяризация)"/g)||[]).length,4,"Expected four RU phases");
assert.equal((visual.match(/\["(?:Rest|Upstroke|Repolarization|After-hyperpolarization)"/g)||[]).length,4,"Expected four EN phases");
assert.equal((visual.match(/\["(?:Тыныштық|Көтерілу фазасы|Реполяризация|Кейінгі гиперполяризация)"/g)||[]).length,4,"Expected four KZ phases");
assert.equal(JSON.parse(fs.readFileSync("vercel.json","utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 4 media, four phases × RU/EN/KZ, mechanism, navigation, accessibility and isolated deployment.");
