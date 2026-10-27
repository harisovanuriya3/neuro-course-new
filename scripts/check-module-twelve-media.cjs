// Module 12 media: real trilingual lesson adapter, pathway signs and accessible visual.
// Run with Node + TypeScript in full checkout. This is not a browser or clinical test.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-twelve-media.ts";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Media TS syntax");
const compiled=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleTwelveMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
 blocks:[{id:"base",title:"base",preview:"base",transcript:[],
 theoryAnchor:"mechanism",animation:"foundation",
 question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
const anchors={
 RU:["GPi/SNr","GPe","STN","дофамин","мотонейроны"],
 EN:["GPi/SNr","GPe","STN","Dopamine","motor neurons"],
 KZ:["GPi/SNr","GPe","STN","дофамин","мотонейрондар"]
};
const answerPositions=[];
for(const lang of ["RU","EN","KZ"]){
 const lesson=create(lang,{...base,language:lang});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 assert(lesson.introduction.length>130);
 const block=lesson.blocks[0];
 assert.equal(block.id,"module-12-basal-ganglia-pathways");
 assert.equal(block.theoryAnchor,"direct-indirect-and-hyperdirect");
 assert.equal(block.animation,"foundation");
 assert.equal(block.transcript.length,6);
 assert.equal(block.question.correctAnswer,"a");
 assert.equal(block.question.options.length,4);
 assert.equal(new Set(Array.from(block.question.options,o=>o.id)).size,4);
 assert.equal(new Set(Array.from(block.question.options,o=>o.text)).size,4);
 answerPositions.push(block.question.options.findIndex(o=>o.id==="a"));
 for(const part of [lesson.introduction,block.preview,block.question.prompt,
  block.question.explanation,...block.transcript,
  ...block.question.options.flatMap(o=>[o.text,o.feedback])])
  assert(part.trim().length>30,lang+": short or missing media text");
 const joined=block.transcript.join(" ");
 for(const marker of anchors[lang])assert(joined.includes(marker),lang+": missing "+marker);
}
assert.equal(new Set(answerPositions).size,3,"Correct answer position should vary by language");
assert.throws(()=>create("RU",{...base,blocks:[]}),/structure changed/);
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleTwelveMedia } from "./course-foundation/module-twelve-media";'));
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleTwelveMedia("'+lang+'", foundationLessons[12].media.'+lang));
const theory=read("content/course-foundation/module-twelve-theory.ts");
assert(theory.includes('"id": "direct-indirect-and-hyperdirect"'));
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes('moduleId === "12" && block.animation === "foundation"'));
assert(renderer.includes("<ModuleTwelveMediaAnimation key={language} language={language} />"));
const visualPath="components/ModuleTwelveMediaAnimation.tsx";
const visual=read(visualPath);
const visualAst=ts.createSourceFile(visualPath,visual,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Media visual TSX syntax");
for(const marker of ['data-testid="module-twelve-media-animation"','aria-pressed',
 'aria-live="polite"','disabled={step===0}','role="status"',
 'hyperdirect','indirect','direct','GPe','STN','GPi/SNr'])
 assert(visual.includes(marker),"Visual missing "+marker);
for(const chain of ['signs:["+","−","−","+"]','signs:["+","−","−","+","−"]','signs:["+","+","−"]'])
 assert(visual.includes(chain),"Pathway sign chain missing "+chain);
assert(!visual.includes("setInterval("),"Do not imply measured neural timing");
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-twelve-media.cjs"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 12 media RU/EN/KZ, pathways, explanatory quiz, visual and routes.");
console.log("OPEN: full TypeScript/build, browser/mobile, scientific and native Kazakh review.");
