// Module 6 media: authored scientific sequence, numeric consistency and RU/EN/KZ.
// Source cross-check: Ganong 23e PDF 132–133, Guyton & Hall 13e PDF 564–565.
// Ghai 8e PDF 353–354 is peripheral nerve–muscle work, not central summation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=path=>fs.readFileSync(path,"utf8");
const file="content/course-foundation/module-six-media.ts";
const src=read(file);
const ast=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 media TypeScript syntax errors");
const compiled=ts.transpileModule(src,{compilerOptions:{
 module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020
}});
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const make=context.exports.createModuleSixMedia;
assert.equal(typeof make,"function","Module 6 media factory missing");
const base={
 kind:"media",title:"Media",language:"RU",introduction:"base",
 ui:{},blocks:[{
  id:"base",title:"base",preview:"base",transcript:[],
  theoryAnchor:"mechanism",animation:"foundation",
  question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}
 }]
};
const seen=[];
for(const language of ["RU","EN","KZ"]){
 const lesson=make(language,{...base,language});
 assert.equal(lesson.kind,"media");
 assert.equal(lesson.blocks.length,1);
 assert.equal(lesson.blocks[0].animation,"foundation");
 assert.equal(lesson.blocks[0].theoryAnchor,"summation-mechanisms");
 assert.equal(lesson.blocks[0].transcript.length,4);
 const q=lesson.blocks[0].question;
 assert.equal(q.correctAnswer,"b");
 assert.equal(q.options.length,4);
 assert.deepEqual(Array.from(q.options,x=>x.id),["a","b","c","d"]);
 assert.equal(new Set(q.options.map(x=>x.text.trim())).size,4);
 for(const s of [lesson.introduction,lesson.blocks[0].preview,q.prompt,q.explanation,
  ...lesson.blocks[0].transcript,...q.options.flatMap(x=>[x.text,x.feedback])])
  assert(s.length>=15,"Empty/short module 6 media copy in "+language);
 assert(q.explanation.includes(language==="EN"?"−56.5":"−56,5"),
  "Correct numeric explanation missing in "+language);
 assert(lesson.blocks[0].transcript[3].includes(language==="EN"?"−56.5":"−56,5"),
  "Final model voltage missing in "+language);
 assert(lesson.blocks[0].transcript.join(" ").includes(language==="EN"?"shunting":language==="RU"?"шунтирования":"шунттауды"),
  "Shunting limitation missing in "+language);
 seen.push(language);
}
const visual=read("components/ModuleSixMediaAnimation.tsx");
const visualAst=ts.createSourceFile("components/ModuleSixMediaAnimation.tsx",visual,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Module 6 media visual TSX syntax errors");
for(const s of ["vm:-70","vm:-58","vm:-52","vm:-56.5","exc:3,inh:1",
 "aria-live=\"polite\"","disabled={step===0}","disabled={step===3}","onClick={()=>setStep(0)}"])
 assert(visual.includes(s),"Module 6 media visual missing "+s);
// Cross-check displayed states against the actual module 6 laboratory formula.
const labPath="components/IntegrationExperimentLab.tsx";
const labSource=read(labPath);
const labAst=ts.createSourceFile(labPath,labSource,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(labAst.parseDiagnostics.length,0,"Integration laboratory TSX syntax errors");
const estimator=labAst.statements.find(node=>ts.isFunctionDeclaration(node)&&
 node.name?.text==="estimateIntegrationVoltage");
assert(estimator?.body,"Numerical integration estimator missing");
const estimateCode=ts.transpileModule("("+estimator.getText(labAst).replace(/^export\\s+/,"")+")",{
 compilerOptions:{target:ts.ScriptTarget.ES2020}
});
const estimate=vm.runInNewContext(estimateCode.outputText);
assert.equal(estimate("spatial",0,0,8),-70);
assert.equal(estimate("spatial",2,0,8),-58);
assert.equal(estimate("spatial",3,0,8),-52);
assert.equal(estimate("spatial",3,1,8),-56.5);
const registration=read("content/index.ts");
assert(registration.includes('import { createModuleSixMedia } from "./course-foundation/module-six-media";'));
for(const lang of ["RU","EN","KZ"])
 assert(registration.includes('createModuleSixMedia("'+lang+'", moduleSixBaseMedia("'+lang+'"))'),
  "Module 6 media not registered for "+lang);
const render=read("components/MediaContent.tsx");
assert(render.includes('moduleId === "6" && block.animation === "foundation"'));
assert(render.includes("<ModuleSixMediaAnimation key={language} language={language} />"));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 6 media, 3 languages, 12 transcript stages, 12 answer choices, 4 visual states, routing and preview policy.");
console.log("NOTE: AST/source checks do not replace TypeScript typecheck, build, native-speaker review or browser test.");
