// Module 8 media regression: trilingual anatomy, rendering and safe preview policy.
// Guyton & Hall 13e ch. 48; Ganong 23e ch. 11; Ghai 8e sensory examination.
// Static/runtime factory checks are NOT a Next.js build or browser test.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path,"utf8");
const file = "content/course-foundation/module-eight-media.ts";
const src = read(file);
const ast = ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 8 media TypeScript syntax errors");
const compiled = ts.transpileModule(src,{
  fileName:file,reportDiagnostics:true,
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleEightMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
  blocks:[{id:"base",title:"base",preview:"base",transcript:[],
    theoryAnchor:"mechanism",animation:"foundation",
    question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
for(const language of ["RU","EN","KZ"]){
 const lesson=create(language,{...base,language});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 const block=lesson.blocks[0];
 assert.equal(block.id,"module-8-sensory-crossings");
 assert.equal(block.animation,"foundation");
 assert.equal(block.theoryAnchor,"dorsal-column-medial-lemniscus");
 assert.equal(block.transcript.length,5);
 const q=block.question;
 assert.equal(q.correctAnswer,"c");
 assert.equal(q.options.length,4);
 assert.deepEqual(Array.from(q.options,x=>x.id),["a","b","c","d"]);
 assert.equal(new Set(q.options.map(x=>x.text)).size,4);
 for(const part of [lesson.introduction,block.preview,q.prompt,q.explanation,
   ...block.transcript,...q.options.flatMap(x=>[x.text,x.feedback])])
   assert(part.trim().length>25,language+": empty/short item");
 const all=block.transcript.join(" ");
 for(const marker of ["VPL", "Лиссауэр", "сопақша", "medulla", "Lissauer",
   "артқы", "задн", "dorsal"].filter(x=>language==="RU"?["VPL","Лиссауэр","задн"].includes(x):
      language==="EN"?["VPL","medulla","Lissauer","dorsal"].includes(x):
      ["VPL","сопақша","артқы","Лиссауэр"].includes(x)))
   assert(all.includes(marker),language+": missing "+marker);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleEightMedia } from "./course-foundation/module-eight-media";'));
for(const language of ["RU","EN","KZ"])
 assert(registry.includes('createModuleEightMedia("'+language+'", foundationLessons[8].media.'+language),
  "Module 8 media not registered in "+language);
const theory=read("content/course-foundation/module-eight-theory.ts");
assert(theory.includes('id: "dorsal-column-medial-lemniscus"'),"Theory anchor missing");
const render=read("components/MediaContent.tsx");
assert(render.includes('moduleId === "8" && block.animation === "foundation"'));
assert(render.includes("<ModuleEightMediaAnimation key={language} language={language} />"));
const visual=read("components/ModuleEightMediaAnimation.tsx");
const visualAst=ts.createSourceFile("components/ModuleEightMediaAnimation.tsx",visual,
 ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Module 8 media visual TSX syntax errors");
for(const marker of ['data-testid="module-eight-media-animation"','aria-live="polite"',
  "disabled={step===0}","disabled={step===3}","onClick={()=>setStep(0)}",
  "dorsalSteps","painSteps","Lissauer"])
 assert(visual.includes(marker),"Module 8 visual missing "+marker);
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 8 media RU/EN/KZ, 15 pathway transcript steps, 12 options, anchors, accessible stage navigation.");
console.log("OPEN: Node full audit, TypeScript typecheck, build, keyboard/mobile/browser checks, native KZ editorial review.");
