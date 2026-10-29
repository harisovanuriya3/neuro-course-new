// Module 14 thalamus media regression: content, routes, safety limits and accessibility.
// This is a source-level check, not a browser, E2E or independent medical-language review.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "content/course-foundation/module-fourteen-media.ts";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length, 0, "Module 14 media TypeScript syntax");
const compiled = ts.transpileModule(source, { fileName:path, reportDiagnostics:true,
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};
vm.runInNewContext(compiled.outputText,context);
const create=context.exports.createModuleFourteenMedia;
assert.equal(typeof create,"function");
const base={kind:"media",title:"Media",language:"RU",introduction:"base",ui:{},
  blocks:[{id:"base",title:"base",preview:"base",transcript:[],
    theoryAnchor:"mechanism",animation:"foundation",
    question:{prompt:"base",correctAnswer:"a",explanation:"base",options:[]}}]};
const markers={
  RU:["VPL","VPM","латеральном коленчатом","медиальном коленчатом","ГАМК","обоняние"],
  EN:["VPL","VPM","lateral geniculate","medial geniculate","GABA","Olfaction"],
  KZ:["VPL","VPM","латералдық тізелі","медиалдық тізелі","ГАМҚ","Иіс сезу"]
};
const positions=[];
for(const language of ["RU","EN","KZ"]){
  const lesson=create(language,{...base,language});
  assert.equal(lesson.kind,"media");
  assert.equal(lesson.blocks.length,1);
  assert(lesson.introduction.length>130);
  const block=lesson.blocks[0];
  assert.equal(block.id,"module-14-thalamic-relays");
  assert.equal(block.theoryAnchor,"thalamic-nuclear-map");
  assert.equal(block.animation,"foundation");
  assert.equal(block.transcript.length,5);
  assert.equal(block.question.correctAnswer,"b");
  assert.equal(block.question.options.length,4);
  assert.equal(new Set(Array.from(block.question.options,o=>o.id)).size,4);
  assert.equal(new Set(Array.from(block.question.options,o=>o.text)).size,4);
  positions.push(block.question.options.findIndex(o=>o.id==="b"));
  for(const part of [lesson.introduction,block.preview,block.question.prompt,
    block.question.explanation,...block.transcript,
    ...block.question.options.flatMap(o=>[o.text,o.feedback])])
    assert(part.trim().length>35,language+": missing or too-short media content");
  const joined=block.transcript.join(" ");
  for(const marker of markers[language])
    assert(joined.toLocaleLowerCase().includes(marker.toLocaleLowerCase()),
      language+": missing "+marker);
}
assert.equal(new Set(positions).size,3,"Correct answer position must vary by locale");
assert.throws(()=>create("RU",{...base,blocks:[]}),/structure changed/);
const registry=read("content/index.ts");
assert(registry.includes('import { createModuleFourteenMedia } from "./course-foundation/module-fourteen-media";'));
for(const lang of ["RU","EN","KZ"])
  assert(registry.includes('createModuleFourteenMedia("'+lang+'", foundationLessons[14].media.'+lang));
assert(registry.includes('createModuleThirteenMedia("RU"'));
const theory=read("content/course-foundation/module-fourteen-theory.ts");
assert(theory.includes('"id": "thalamic-nuclear-map"'));
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes('moduleId === "14" && block.animation === "foundation"'));
assert(renderer.includes('<ModuleFourteenMediaAnimation key={language} language={language} />'));
const visualPath="components/ModuleFourteenMediaAnimation.tsx";
const visual=read(visualPath);
const visualAst=ts.createSourceFile(visualPath,visual,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(visualAst.parseDiagnostics.length,0,"Module 14 visual TSX syntax");
for(const marker of ['data-testid="module-fourteen-media-animation"','aria-pressed',
  'aria-live="polite"','disabled={olfaction}','role="status"',
  'routeIndex === 5','setShowInhibition(false)','VPL','VPM','LGN','MGN',
  '—|','disabled={routeIndex===0}','disabled={routeIndex===c.routes.length-1}'])
  assert(visual.includes(marker),"Visual missing "+marker);
assert(!visual.includes("setInterval("),"Do not imply measured neural timing");
const pkg=JSON.parse(read("package.json"));
assert(pkg.scripts["audit:science"].includes("node scripts/check-module-fourteen-media.cjs"));
const config=JSON.parse(read("vercel.json"));
assert.equal(config.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 14 media RU/EN/KZ, 6 pathways, inhibitory overlay, quiz, routes and guard.");
console.log("OPEN: full CI, browser/mobile/voice, E2E and independent native-Kazakh medical review.");
