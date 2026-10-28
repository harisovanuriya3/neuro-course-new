// Cerebellar media audit: source-level and runtime contract; no browser or patient validation.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = p => fs.readFileSync(p,"utf8");
const path = "content/course-foundation/module-thirteen-media.ts";
const source = read(path);
const ast = ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 13 media TS syntax");
const compiled = ts.transpileModule(source,{fileName:path,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleThirteenMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
 blocks:[{id:"base",title:"base",preview:"base",transcript:[],
 theoryAnchor:"mechanism",animation:"foundation",
 question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
const markers={
 RU:["Пуркинье","мшист","лазающ","ГАМК","глубок"],
 EN:["Purkinje","mossy","climbing","GABA","deep"],
 KZ:["Пуркинье","Мүкті","Өрмелеуші","ГАМҚ","Терең"]
};
const positions=[];
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang,{...base,language:lang});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 assert(lesson.introduction.length>110);
 const block=lesson.blocks[0];
 assert.equal(block.id,"module-13-cerebellar-microcircuit");
 assert.equal(block.theoryAnchor,"purkinje-deep-nuclei-microcircuit");
 assert.equal(block.animation,"foundation");
 assert.equal(block.transcript.length,5);
 assert.equal(block.question.correctAnswer,"a");
 assert.equal(block.question.options.length,4);
 assert.equal(new Set(Array.from(block.question.options,o=>o.id)).size,4);
 assert.equal(new Set(Array.from(block.question.options,o=>o.text)).size,4);
 positions.push(block.question.options.findIndex(o=>o.id==="a"));
 for(const part of [lesson.introduction,block.preview,block.question.prompt,
  block.question.explanation,...block.transcript,
  ...block.question.options.flatMap(o=>[o.text,o.feedback])])
  assert(part.trim().length>25,lang+": short or missing text");
 const joined=block.transcript.join(" ");
 for(const marker of markers[lang])assert(joined.includes(marker),lang+": missing "+marker);
}
assert.equal(new Set(positions).size,3,"Correct answer position must vary by language");
assert.throws(()=>create("RU",{...base,blocks:[]}),/structure changed/);
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleThirteenMedia } from "./course-foundation/module-thirteen-media";'));
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleThirteenMedia("'+lang+'", foundationLessons[13].media.'+lang));
const theory=read("content/course-foundation/module-thirteen-theory.ts");
assert(theory.includes('"id": "purkinje-deep-nuclei-microcircuit"'));
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes('moduleId === "13" && block.animation === "foundation"'));
assert(renderer.includes("<ModuleThirteenMediaAnimation key={language} language={language} />"));
const visualPath="components/ModuleThirteenMediaAnimation.tsx";
const visual=read(visualPath);
const visualAst=ts.createSourceFile(visualPath,visual,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Module 13 visual TSX syntax");
for(const marker of ['data-testid="module-thirteen-media-animation"','aria-pressed',
 'aria-live="polite"','disabled={stage===0}','role="status"',
 'from:3,to:4,sign:"−"','from:0,to:4,sign:"+"','from:2,to:4,sign:"+"'])
 assert(visual.includes(marker),"Visual missing "+marker);
assert(!visual.includes("setInterval("),"Do not imply measured neural timing");
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-thirteen-media.cjs"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 13 media, 3 locales, circuit signs, quiz, visual and route.");
console.log("OPEN: browser/mobile/voice and independent native-Kazakh medical review.");
