// Module 11 media: subject-specific RU/EN/KZ content, dedicated visual and routing.
// Structural checks cannot replace TypeScript typecheck, browser or clinical review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-eleven-media.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Media TypeScript syntax");
const compiled=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleElevenMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
 blocks:[{id:"base",title:"base",preview:"base",transcript:[],
 theoryAnchor:"mechanism",animation:"foundation",
 question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
const anchors={
 RU:["кортикоспинальные","перекрещивается","мотонейрон","веретёна"],
 EN:["corticospinal","cross","motor neurons","spindles"],
 KZ:["кортикоспиналдық","айқасады","мотонейрон","ұршықтарын"]
};
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang,{...base,language:lang});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 assert(lesson.introduction.length>120);
 const block=lesson.blocks[0];
 assert.equal(block.id,"module-11-command-feedback");
 assert.equal(block.theoryAnchor,"motor-command-and-final-common-path");
 assert.equal(block.animation,"foundation");
 assert.equal(block.transcript.length,6);
 assert.equal(block.question.correctAnswer,"b");
 assert.equal(block.question.options.length,4);
 assert.deepEqual(Array.from(block.question.options,o=>o.id),["a","b","c","d"]);
 assert.equal(new Set(block.question.options.map(o=>o.text)).size,4);
 for(const part of [lesson.introduction,block.preview,block.question.prompt,
  block.question.explanation,...block.transcript,
  ...block.question.options.flatMap(o=>[o.text,o.feedback])])
  assert(part.trim().length>35,lang+": short or missing media text");
 const joined=block.transcript.join(" ");
 for(const marker of anchors[lang])assert(joined.toLocaleLowerCase().includes(marker.toLocaleLowerCase()),lang+": missing "+marker);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleElevenMedia } from "./course-foundation/module-eleven-media";'));
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleElevenMedia("'+lang+'", foundationLessons[11].media.'+lang));
const theory=read("content/course-foundation/module-eleven-theory.ts");
assert(theory.includes('id: "motor-command-and-final-common-path"'));
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes('moduleId === "11" && block.animation === "foundation"'));
assert(renderer.includes("<ModuleElevenMediaAnimation key={language} language={language} />"));
const visualPath="components/ModuleElevenMediaAnimation.tsx";
const visual=read(visualPath);
const visualAst=ts.createSourceFile(visualPath,visual,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Media visual TSX syntax");
for(const marker of ['data-testid="module-eleven-media-animation"','aria-pressed',
 'aria-live="polite"','disabled={step===0}','disabled={step===3}',
 'mode==="command"','mode==="feedback"','role="status"'])
 assert(visual.includes(marker),"Visual missing "+marker);
assert(!visual.includes("setInterval("),"Do not fabricate time-resolved neural activity");
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-eleven-media.cjs"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 11 media RU/EN/KZ, four-choice self-check, two qualitative visual tracks and route.");
console.log("OPEN: typecheck/build, browser/mobile, expert clinical and native Kazakh review.");
