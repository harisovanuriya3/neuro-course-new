// Module 11 motor-control bibliography: verified edition/page mapping, language and links.
// Run from repository root: node scripts/check-module-eleven-references.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const file="content/course-foundation/module-eleven-references.ts";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 11 references TS parse");
const compiled=ts.transpileModule(source,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}
});
assert.equal((compiled.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0,
 "Module 11 references TS transpilation");
const registry=fs.readFileSync("content/index.ts","utf8");
assert(registry.includes('import { createModuleElevenReferences }'),"Module 11 references import missing");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleElevenReferences("'+lang+'"'),
  "Module 11 "+lang+" references not registered");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
const specs=[
 {title:"Guyton & Hall",pages:["709–711","677–679"],sections:["interactive"]},
 {title:"Ganong",pages:["241–244","253–256"],sections:["theory"]},
 {title:"C. L. Ghai",pages:["295–297","317–319"],sections:["clinical","practice"]},
 {title:"OpenStax · Motor Responses",pages:["§14.3"],sections:["media"]}
];
const markers={
 RU:["кортикоспин","интернейрон","базальн","мозжеч","мышечн","верет","Гольджи","руброспин"],
 EN:["corticospinal","interneuron","basal ganglia","cerebellum","muscle spindles","Golgi","rubrospinal"],
 KZ:["қыртыс-жұлын","интернейрон","базальды","мишық","бұлшықет ұршық","Гольджи","руброспин"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=getLesson(11,"references",lang);
 assert.equal(lesson?.kind,"references",lang+": references missing");
 assert(lesson.introduction.length>200,lang+": reading sequence incomplete");
 assert(lesson.introduction.includes("PDF"),lang+": printed/PDF pages not distinguished");
 assert.equal(lesson.sources?.length,4,lang+": four curated sources expected");
 const text=lesson.sources.map(x=>x.description).join(" ");
 for(const marker of markers[lang])
  assert(text.toLowerCase().includes(marker.toLowerCase()),lang+": missing "+marker);
 for(let i=0;i<specs.length;i++){
  const spec=specs[i],item=lesson.sources[i];
  assert(item.title.startsWith(spec.title),lang+": wrong source "+i);
  assert(item.href.startsWith("https://"),lang+": HTTPS expected "+i);
  assert(!item.href.endsWith(".pdf"),lang+": licensed PDF must not be linked "+i);
  assert(item.description.length>160,lang+": reading advice too short "+i);
  for(const page of spec.pages)
   assert(item.description.includes(page),lang+": missing page "+page);
  assert.deepEqual(item.links.map(x=>x.section),spec.sections,
   lang+": incorrect related section "+i);
 }
 assert(lesson.sources[0].href.includes("v9780323389303"),
  lang+": Guyton link must identify exact edition, not legacy 404");
 assert(lesson.sources[2].href.includes("biblionumber=10003"),
  lang+": Ghai catalogue must identify 8th edition");
 assert(lesson.sources[3].href.includes("/14-3-motor-responses"),
  lang+": open motor-response chapter expected");
}
const ui=fs.readFileSync("components/StudyContent.tsx","utf8");
assert(ui.includes("href={source.href}"),"Source titles must be clickable");
const sections=fs.readFileSync("content/sections.ts","utf8");
for(const section of ["theory","interactive","clinical","practice","media","references"])
 assert(sections.includes('slug: "'+section+'"'),"Missing internal section "+section);
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Review branch Vercel preview must remain disabled");
console.log("PASS: module 11 references, 4 sources × RU/EN/KZ, edition pages, links and route.");
console.log("OPEN: full course audit, TypeScript build, browser and independent KZ review.");
