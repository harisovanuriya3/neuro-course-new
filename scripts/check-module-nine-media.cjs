// Module 9 media: trilingual reflex circuits, authored self-check and UI route.
// Guyton & Hall 13e ch. 55; Ganong 23e ch. 9; Ghai 8e reflex examination.
// Passing this script does not establish scientific/translation/browser acceptance.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const file="content/course-foundation/module-nine-media.ts";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 9 media TS syntax");
const compiled=ts.transpileModule(src,{
 fileName:file,reportDiagnostics:true,
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
});
assert.equal((compiled.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleNineMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
 blocks:[{id:"base",title:"base",preview:"base",transcript:[],
 theoryAnchor:"mechanism",animation:"foundation",
 question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
const anchors={
 RU:["Ia","моносинап","интернейрон","ноцицептив","нисходящ"],
 EN:["Ia","monosynaptic","interneuron","nociceptive","Descending"],
 KZ:["Ia","моносинап","интернейрон","ноцицептив","Төмендеуші"]
};
for(const language of ["RU","EN","KZ"]){
 const lesson=create(language,{...base,language});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 const block=lesson.blocks[0];
 assert.equal(block.id,"module-9-spinal-reflex-comparison");
 assert.equal(block.theoryAnchor,"spinal-stretch-withdrawal-and-reciprocal-circuits");
 assert.equal(block.animation,"foundation");
 assert.equal(block.transcript.length,5);
 const q=block.question;
 assert.equal(q.correctAnswer,"b");
 assert.equal(q.options.length,4);
 assert.deepEqual(Array.from(q.options,x=>x.id),["a","b","c","d"]);
 assert.equal(new Set(q.options.map(x=>x.text)).size,4);
 for(const part of [lesson.introduction,block.preview,q.prompt,q.explanation,
  ...block.transcript,...q.options.flatMap(x=>[x.text,x.feedback])])
  assert(part.trim().length>25,language+": missing or too short");
 const joined=block.transcript.join(" ");
 for(const term of anchors[language])assert(joined.includes(term),language+": missing "+term);
 assert(q.options[1].text!==q.options[0].text);
}
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleNineMedia } from "./course-foundation/module-nine-media";'));
for(const language of ["RU","EN","KZ"])
 assert(registry.includes('createModuleNineMedia("'+language+'", foundationLessons[9].media.'+language));
const theory=read("content/course-foundation/module-nine-theory.ts");
assert(theory.includes('id: "spinal-stretch-withdrawal-and-reciprocal-circuits"'));
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes('moduleId === "9" && block.animation === "foundation"'));
assert(renderer.includes("<ModuleNineMediaAnimation key={language} language={language} />"));
const visual=read("components/ModuleNineMediaAnimation.tsx");
const visualAst=ts.createSourceFile("components/ModuleNineMediaAnimation.tsx",visual,
 ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Module 9 media TSX syntax");
for(const marker of ['data-testid="module-nine-media-animation"','aria-pressed',
 'aria-live="polite"','disabled={step===0}','disabled={step===3}',
 'mode==="stretch"','mode==="withdrawal"','Ia→α','ноцицептив'])
 assert(visual.includes(marker),"Visual missing "+marker);
assert(!visual.includes("[24,46,72,88]"),"Do not use arbitrary physiological amplitudes");
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 9 media trilingual factory, 2 circuits × 4 steps, self-check and UI wiring.");
console.log("OPEN: full Node/TypeScript/build/browser checks, clinical and native Kazakh review.");
