// Module 15 hypothalamus: ungraded pretest, three independent questions per language.
// Passing this regression does not replace independent clinical or KZ language review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const file = "content/course-foundation/module-fifteen-pretest.ts";
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "TypeScript syntax");
const compiled = ts.transpileModule(source, {fileName:file,reportDiagnostics:true,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
assert.equal((compiled.diagnostics || []).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,"transpile diagnostics");
const m = {exports:{}};
new Function("module","exports",compiled.outputText)(m,m.exports);
const create = m.exports.createModuleFifteenPretest;
assert.equal(typeof create,"function");
const ids=["module-15-pretest-pituitary","module-15-pretest-osmolality-volume","module-15-pretest-autonomic-limits"];
const answers=["c","b","d"];
const markers={
  RU:["супраоптическ","паравентрикулярн","нейрогипофиз","аденогипофиз","осмоляльност","ангиотензин","барорецептор","вегетативн"],
  EN:["supraoptic","paraventricular","neurohypophysis","anterior pituitary","osmolality","angiotensin","baroreceptor","autonomic"],
  KZ:["супраоптикалық","паравентрикулярлық","нейрогипофиз","аденогипофиз","осмоляльдылық","ангиотензин","барорецептор","вегетативтік"]
};
for(const lang of ["RU","EN","KZ"]){
  const lesson=create(lang,"Hypothalamus","Pretest");
  assert.equal(lesson.kind,"pretest");
  assert(lesson.introduction.length>=150,lang+": introduction");
  assert.equal(lesson.questions.length,3,lang+": count");
  assert.deepEqual(lesson.questions.map(q=>q.id),ids);
  assert.deepEqual(lesson.questions.map(q=>q.correctAnswer),answers);
  assert.equal(new Set(lesson.questions.map(q=>q.prompt)).size,3,lang+": distinct stems");
  for(const q of lesson.questions){
    assert(q.prompt.length>=150,lang+": meaningful stem");
    assert(q.explanation.length>=200,lang+": meaningful explanation");
    assert.deepEqual(q.options.map(o=>o.id),["a","b","c","d"]);
    assert.equal(new Set(q.options.map(o=>o.text)).size,4,lang+": unique choices");
    assert(q.options.every(o=>o.text.length>=65),lang+": nontrivial choices");
    assert(q.options.some(o=>o.id===q.correctAnswer));
    assert.equal(q.target.section,"theory");
  }
  const all=lesson.questions.flatMap(q=>[q.prompt,q.explanation,...q.options.map(o=>o.text)]).join(" ").toLowerCase();
  for(const marker of markers[lang])assert(all.includes(marker.toLowerCase()),lang+": missing "+marker);
}
const index=fs.readFileSync("content/index.ts","utf8");
assert(index.includes('import { createModuleFifteenPretest } from "./course-foundation/module-fifteen-pretest";'));
const start=index.indexOf("  15: {");
const end=index.indexOf("  14: {",start);
assert(start>=0&&end>start,"module 15 override");
const block=index.slice(start,end);
assert(block.includes("...foundationLessons[15]"),"preserve other lessons");
assert(block.includes("createModuleFifteenObjectives"),"preserve reviewed objectives");
for(const lang of ["RU","EN","KZ"])
  assert(block.includes('createModuleFifteenPretest("'+lang+'", modules.'+lang+'[14], getSectionTitle("pretest", "'+lang+'"))'),lang+": route registration");
const {load}=require("./check-tests.cjs");
const {getLesson}=load("content/index.ts");
for(const lang of ["RU","EN","KZ"]){
  const lesson=getLesson(15,"pretest",lang);
  assert.equal(lesson?.kind,"pretest",lang+": runtime route");
  assert.equal(lesson.questions.length,3,lang+": runtime count");
  assert.deepEqual(lesson.questions.map(q=>q.correctAnswer),answers);
  assert(getLesson(15,"objectives",lang),lang+": objectives preserved");
  assert(getLesson(15,"theory",lang),lang+": theory preserved");
  assert(getLesson(15,"cases",lang),lang+": cases preserved");
}
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fifteen-pretest.cjs"),"audit registration");
assert.equal(JSON.parse(fs.readFileSync("vercel.json","utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 15 hypothalamus pretest, 3 x RU/EN/KZ, four choices, explanations and routes.");
console.log("OPEN: full CI, independent medical/KZ editing, browser/mobile/voice/E2E.");
