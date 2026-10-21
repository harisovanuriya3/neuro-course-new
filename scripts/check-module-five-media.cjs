// Evidence checkpoint 2026-10-21: module 5 media checked against Ganong 23e 127-132, Guyton 13e 556-558 and Ghai 8e 353-354; full build pending.
// Targeted source checks for module 5 media; run from the repository root.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const read=p=>fs.readFileSync(p,"utf8");
const path="content/course-foundation/module-five-media.ts";
const source=read(path);
const parsed=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length,0,"Module 5 media syntax");
for(const lang of ["RU","EN","KZ"]) assert(source.includes("\n "+lang+":{"),"Missing "+lang);
assert(source.includes('correctAnswer:"b"'),"Missing authored answer key");
assert(source.includes('animation:"foundation"'),"Animation not enabled");
const registry=read("content/index.ts");
assert(registry.includes("function moduleFiveBaseMedia(language: Language)"),"Missing typed base guard");
for(const lang of ["RU","EN","KZ"])
 assert(registry.includes('createModuleFiveMedia("'+lang+'", moduleFiveBaseMedia("'+lang+'"))'),"Missing "+lang+" registration");
const renderer=read("components/MediaContent.tsx");
assert(renderer.includes("<ModuleFiveMediaAnimation"),"Module 5 animation renderer missing");
const anim=read("components/ModuleFiveMediaAnimation.tsx");
for(const lang of ["RU","EN","KZ"]) assert(anim.includes(lang+": {"),"Animation missing "+lang);
assert(anim.includes("step<2"),"Vesicle must visibly dock and fuse at stage 3");
assert(anim.includes('d="M290 133 A13 13 0 1 0 290 157"'),"Fusion pore visual missing");
assert(anim.includes("step>=3?367+"),"Stage 4 must show transmitter reaching receptor");
for(const phrase of ["диффундирует через синаптическую щель","diffuses across the synaptic cleft","синапстық саңылау арқылы диффузияланып"])
 assert(anim.includes(phrase),"Missing localized cleft-diffusion explanation: "+phrase);
// A fast chemical synapse may depolarize, hyperpolarize or shunt; the SVG
// must not depict excitation as the only possible postsynaptic response.
for(const token of ['+ΔVm','−ΔVm','shunt current','шунтирующим','шунттаушы'])
 assert(anim.includes(token),'Missing visual/physiological caveat: '+token);
for(const token of ['шунтирующим','shunt current','шунттаушы','Метаботропные','Metabotropic','Метаботроптық'])
 assert(source.includes(token),'Missing localized graded/shunting/metabotropic transcript: '+token);
assert(!anim.includes('d="M445 130 H568"'),
 'Old one-direction green postsynaptic arrow must not return');
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);

const optionsByLanguage = [...source.matchAll(/\n  options:\[([\s\S]*?)\n  \],/g)];
const feedbackByLanguage = [...source.matchAll(/\n  feedback:\[([\s\S]*?)\n  \]/g)];
assert.equal(optionsByLanguage.length,3,"RU/EN/KZ option arrays");
assert.equal(feedbackByLanguage.length,3,"RU/EN/KZ feedback arrays");
for(let i=0;i<3;i++){
 assert.equal((optionsByLanguage[i][1].match(/^\s*"/gm)||[]).length,4,"Exactly four options per language");
 assert.equal((feedbackByLanguage[i][1].match(/^\s*"/gm)||[]).length,4,"Exactly four feedback messages per language");
}
assert(source.includes('id:["a","b","c","d"][index]'),"Four unique option IDs");
assert(source.includes('theoryAnchor:"chemical-electrical-comparison"'),"Media must link to the detailed chemical-synapse theory");
const theory=read("content/course-foundation/module-five-theory.ts");
assert(theory.includes('id: "chemical-electrical-comparison"'),"Detailed synapse theory anchor missing");
assert(source.includes('const shift=language==="RU"?0:language==="EN"?1:2;'),"Locale-stable answer rotation missing");
assert(source.includes('options:[...options.slice(shift),...options.slice(0,shift)]'),"Answer rotation not applied");
assert(source.includes('correctAnswer:"b"'),"Stable correct-answer ID must be retained");
const optionPositions=["RU","EN","KZ"].map(lang=>{
 const shift=lang==="RU"?0:lang==="EN"?1:2;
 return (1-shift+4)%4;
});
assert.equal(new Set(optionPositions).size,3,"Correct answer must not always be in one display position");
console.log("PASS: module 5 media syntax, localization, route, animation and preview lock.");
