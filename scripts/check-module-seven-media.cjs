// Module 7 media: physiology-specific content, routing and accessible diagram.
// Sources: Guyton & Hall 13e PDF 666–668; Ganong 23e PDF 169–171;
// Ghai 8e PDF 317–319. Source checks are not browser or clinical validation.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const file = "content/course-foundation/module-seven-media.ts";
const src = read(file);
const ast = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 media TypeScript syntax errors");
const compiled = ts.transpileModule(src, {
  fileName: file, reportDiagnostics: true,
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const context = {exports:{}};
vm.runInNewContext(compiled.outputText, context);
const create = context.exports.createModuleSevenMedia;
assert.equal(typeof create, "function");
const base = {kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
  blocks:[{id:"base",title:"base",preview:"base",transcript:[],
    theoryAnchor:"mechanism",animation:"foundation",
    question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
for (const language of ["RU","EN","KZ"]) {
  const lesson = create(language, {...base,language});
  assert.equal(lesson.kind,"media");
  assert.equal(lesson.blocks.length,1);
  const block = lesson.blocks[0];
  assert.equal(block.id,"module-7-patellar-reflex-sequence");
  assert.equal(block.animation,"foundation");
  assert.equal(block.theoryAnchor,"reflex-arc-path");
  assert.equal(block.transcript.length,5);
  const q = block.question;
  assert.equal(q.correctAnswer,"b");
  assert.equal(q.options.length,4);
  assert.deepEqual(Array.from(q.options,x=>x.id),["a","b","c","d"]);
  assert.equal(new Set(q.options.map(x=>x.text)).size,4);
  for (const s of [lesson.introduction,block.preview,q.prompt,q.explanation,
    ...block.transcript,...q.options.flatMap(x=>[x.text,x.feedback])])
    assert(s.trim().length>25,language+": missing or overly short explanation");
  const all = block.transcript.join(" ");
  for (const token of ["Ia","L2","L3","L4","α"]) assert(all.includes(token),language+": missing "+token);
  assert(all.includes(language==="RU"?"интернейрон":language==="EN"?"interneuron":"интернейрон"),
    language+": reciprocal inhibition branch not explained");
  assert(all.includes(language==="RU"?"ацетилхолин":language==="EN"?"Acetylcholine":"ацетилхолин"),
    language+": neuromuscular transmitter not explained");
}
const registry = read("content/index.ts");
assert(registry.includes('import { createModuleSevenMedia } from "./course-foundation/module-seven-media";'));
for (const language of ["RU","EN","KZ"])
  assert(registry.includes('createModuleSevenMedia("'+language+'", foundationLessons[7].media.'+language),
    "Missing media registration "+language);
const theory = read("content/course-foundation/module-seven-theory.ts");
assert(theory.includes('section("reflex-arc-path"'),"Broken theory anchor");
const render = read("components/MediaContent.tsx");
assert(render.includes('moduleId === "7" && block.animation === "foundation"'));
assert(render.includes("<ModuleSevenMediaAnimation key={language} language={language} />"));
const visual = read("components/ModuleSevenMediaAnimation.tsx");
const visualAst = ts.createSourceFile("components/ModuleSevenMediaAnimation.tsx",visual,
  ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Module 7 visual TSX syntax errors");
for (const fragment of ['data-testid="module-seven-media-animation"','aria-live="polite"',
  "disabled={step===0}","disabled={step===4}","onClick={()=>setStep(0)}",
  "interneuron","интернейрон"])
  assert(visual.includes(fragment),"Module 7 visual missing "+fragment);
const config = JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 7 media: 3 languages, 15 transcript steps, 12 choices, correct anchor and dedicated 5-stage visual.");
console.log("OPEN: full TS typecheck, build, keyboard/mobile/browser checks and independent KZ review.");
