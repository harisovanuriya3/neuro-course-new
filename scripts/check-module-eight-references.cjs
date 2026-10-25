// Module 8 references: verify actual localized lesson registration and source specificity.
// This does not validate external link reachability or replace a browser / full build.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-eight-references.ts";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 8 bibliography syntax");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const registry=fs.readFileSync("content/index.ts","utf8");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleEightReferences("'+lang+'"'),
  "Module 8 references not registered in "+lang);
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const expected=[
 ["Guyton & Hall",["609–610","584–585","709–710","677–678"],"theory"],
 ["Ganong",["173–174","185–186","242–243","254–255","VPL"],"theory"],
 ["C. L. Ghai",["302–305","324–327","304","326","Aγ","696","664"],"clinical"],
 ["OpenStax · Sensory Perception",["§14.1"],"interactive"],
 ["OpenStax · Motor Responses",["§14.3"],"cases"]
];
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(8,"references",lang);
 assert.equal(lesson?.kind,"references",lang+" reference lesson kind");
 assert(lesson.introduction.includes("PDF"),lang+" PDF-vs-print caveat");
 assert(lesson.introduction.length>180,lang+" guidance too short");
 assert.equal(lesson.sources?.length,5,lang+" expected 5 targeted sources");
 for(let i=0;i<expected.length;i++){
  const [prefix,markers,section]=expected[i];
  const item=lesson.sources[i];
  assert(item.title.startsWith(prefix),lang+" source "+i+" title");
  assert(item.href.startsWith("https://"),lang+" source "+i+" HTTPS");
  assert(item.description.length>140,lang+" source "+i+" needs targeted explanation");
  for(const marker of markers)
   assert(item.description.includes(marker),lang+" source "+i+" missing "+marker);
  assert.deepEqual(item.links,[{section}],lang+" source "+i+" internal destination");
 }
 const ghai=lesson.sources[2].description;
 assert(/Aγ/.test(ghai),lang+" must flag inaccurate A-gamma sensory classification");
 const efferent={RU:"двигательные",EN:"motor efferents",KZ:"қозғалтқыш эфференттер"}[lang];
 assert(ghai.includes(efferent),lang+" Aγ motor classification correction missing");
}
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "No review-branch previews");
console.log("PASS: module 8 references 5 source cards × 3 languages; book pages, Aγ caution and internal routes.");
console.log("OPEN: full npm audit/tsc/build, live URL tests, browser and independent Kazakh review.");
