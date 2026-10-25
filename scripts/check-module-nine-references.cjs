// Module 9 source-specific bibliography: AST, runtime wiring and localized evidence.
// Requires repository dependencies (TypeScript) and runs from the repo root.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-nine-references.ts";
const src=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 references TypeScript syntax");
const transpiled=ts.transpileModule(src,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}});
assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleNineReferences("'+lang+'"'),"Module 9 missing "+lang+" references registration");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const sources=[
 ["Guyton & Hall",["670–671","673","702–703","705"],"theory"],
 ["Ganong",["169–170","261","157–158","249"],"clinical"],
 ["C. L. Ghai",["317–319","295–297"],"practice"],
 ["OpenStax · The Central Nervous System",["§13.2"],"theory"],
 ["OpenStax · Motor Responses",["§14.3"],"interactive"]
];
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(9,"references",lang);
 assert.equal(lesson?.kind,"references",lang+" lesson kind");
 assert(lesson.introduction.includes("PDF"),lang+" PDF vs printed pages");
 assert(lesson.introduction.length>180,lang+" guidance is too short");
 assert.equal(lesson.sources?.length,5,lang+" targeted sources");
 for(let i=0;i<sources.length;i++){
  const [prefix,markers,destination]=sources[i];
  const item=lesson.sources[i];
  assert(item.title.startsWith(prefix),lang+" bibliography title "+i);
  assert(item.href.startsWith("https://"),lang+" HTTPS "+i);
  assert(item.description.length>120,lang+" source-specific guidance "+i);
  for(const marker of markers)
   assert(item.description.includes(marker),lang+" missing page or section "+marker);
  assert.deepEqual(item.links,[{section:destination}],lang+" internal route "+i);
 }
 const combined=lesson.sources.slice(0,3).map(x=>x.description).join(" ");
 const terms={
  RU:["моносинаптичес","интернейрон","Гольджи","спинальн","нейрогенн","не обязательно"],
  EN:["monosynaptic","interneuron","Golgi","spinal shock","neurogenic shock","not obligatory"],
  KZ:["моносинапстық","интернейрон","Гольджи","жұлындық шок","нейрогендік шок","міндетті емес"]
 }[lang];
 for(const term of terms)
  assert(combined.includes(term),lang+" missing clinical distinction "+term);
}
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Preview deployment must remain disabled");
console.log("PASS: module 9 references: five source cards × RU/EN/KZ, printed/PDF pages, science cautions and routes.");
console.log("OPEN: external URL reachability, browser, full build and independent KZ proofreading.");
