// Module 10 brainstem bibliography: language, scientific evidence and route regression.
// Run from repository root: node scripts/check-module-ten-references.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-ten-references.ts";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 10 references TS parse");
const compiled=ts.transpileModule(source,{
  fileName:file,reportDiagnostics:true,
  compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}
});
assert.equal((compiled.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0,
 "Module 10 references TS transpilation");
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"]){
  assert(registry.includes('createModuleTenReferences("'+lang+'"'),
   "Module 10 "+lang+" references not registered");
}
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const sources=[
  {prefix:"Guyton & Hall",markers:["718–719","751–752"],links:["interactive"]},
  {prefix:"Ganong",markers:["249–250","237–238"],links:["theory"]},
  {prefix:"C. L. Ghai",markers:["301–303","279–281","256–257","234–235"],links:["clinical","media"]},
  {prefix:"OpenStax · The Central Nervous System",markers:["§13.2"],links:["theory"]}
];
const science={
 RU:["ретикуляр","таламус","гипоталамус","V1","VII","Эдингера—Вестфаля","КСВП","не доказывает сознание"],
 EN:["reticular","thalamic","hypothalamus","V1","CN VII","Edinger–Westphal","BAEP","does not prove awareness"],
 KZ:["ретикуляр","таламус","гипоталамус","V1","VII","Эдингер—Вестфаль","латенттілік","дәлелдемейді"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(10,"references",lang);
 assert.equal(lesson?.kind,"references",lang+": missing references lesson");
 assert(lesson.introduction.length>190,lang+": incomplete reading order");
 assert(lesson.introduction.includes("PDF"),lang+": distinguish printed/PDF pages");
 assert.equal(lesson.sources?.length,4,lang+": expected four curated sources");
 for(let i=0;i<sources.length;i++){
  const expected=sources[i],actual=lesson.sources[i];
  assert(actual.title.startsWith(expected.prefix),lang+": wrong source "+i);
  assert(actual.href.startsWith("https://"),lang+": HTTPS expected");
  assert(actual.description.length>160,lang+": inadequate reading guidance "+i);
  for(const marker of expected.markers)
   assert(actual.description.includes(marker),lang+": missing page/section "+marker);
  assert.deepEqual(actual.links.map(x=>x.section),expected.links,lang+": wrong internal destinations "+i);
 }
 const ghai=lesson.sources[2];
 assert(ghai.href.includes("biblionumber=10003"),lang+": use exact edition catalogue");
 const combined=lesson.sources.map(x=>x.description).join(" ");
 for(const term of science[lang])assert(combined.includes(term),lang+": missing "+term);
 assert(lesson.introduction.includes("OpenStax"),lang+": distinguish open text");
}
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
assert(route.includes('section === "references"')||route.includes("getLesson(moduleNumber, section, lang)"),
 "References route must be reachable");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch previews must remain disabled");
console.log("PASS: module 10 references, 4 curated sources × 3 languages, PDF/printed pages and links.");
console.log("OPEN: full npm audit, TypeScript build, browser and independent KZ review.");
