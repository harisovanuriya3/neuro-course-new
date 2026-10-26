// Module 10 media contract: authored RU/EN/KZ physiology, two visual tracks and UI wiring.
// Structural checks are NOT a substitute for build, clinical translation or browser QA.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-ten-media.ts";
const source=read(file);
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Media TypeScript parse");
const compiled=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleTenMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
 blocks:[{id:"base",title:"base",preview:"base",transcript:[],
 theoryAnchor:"mechanism",animation:"foundation",
 question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
const anchors={
 RU:["бодрствования","таламуса","КСВП","сознания"],
 EN:["arousal","thalamic","BAEP","consciousness"],
 KZ:["Сергектік","таламус","есту","сананың"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang,{...base,language:lang});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 const block=lesson.blocks[0];
 assert.equal(block.id,"module-10-arousal-auditory-inference");
 assert.equal(block.theoryAnchor,"ascending-arousal-and-descending-posture");
 assert.equal(block.animation,"foundation");
 assert.equal(block.transcript.length,5);
 assert.equal(block.question.correctAnswer,"c");
 assert.equal(block.question.options.length,4);
 assert.deepEqual(Array.from(block.question.options,o=>o.id),["a","b","c","d"]);
 assert.equal(new Set(block.question.options.map(o=>o.text)).size,4);
 for(const part of [lesson.introduction,block.preview,block.question.prompt,
  block.question.explanation,...block.transcript,
  ...block.question.options.flatMap(o=>[o.text,o.feedback])])
  assert(part.trim().length>25,lang+": empty/short media copy");
 const joined=block.transcript.join(" ");
 for(const marker of anchors[lang])assert(joined.includes(marker),lang+": missing "+marker);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleTenMedia } from "./course-foundation/module-ten-media";'));
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleTenMedia("'+lang+'", foundationLessons[10].media.'+lang));
const theory=read("content/course-foundation/module-ten-theory.ts");
assert(theory.includes('id:"ascending-arousal-and-descending-posture"'));
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes('moduleId === "10" && block.animation === "foundation"'));
assert(renderer.includes("<ModuleTenMediaAnimation key={language} language={language} />"));
const visual=read("components/ModuleTenMediaAnimation.tsx");
const visualAst=ts.createSourceFile("components/ModuleTenMediaAnimation.tsx",visual,
 ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Visual TSX parse");
for(const marker of ['data-testid="module-ten-media-animation"','aria-pressed',
 'aria-live="polite"','disabled={step===0}','disabled={step===3}',
 'mode==="arousal"','mode==="auditory"'])
 assert(visual.includes(marker),"Visual missing "+marker);
assert(!visual.includes("[24,46,72,88]"),"No fabricated arousal score or BAEP amplitudes");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 10 media, RU/EN/KZ, 2×4 qualitative stages, four-choice self-check and route.");
console.log("OPEN: full build, browser/mobile, clinical and native Kazakh review.");
