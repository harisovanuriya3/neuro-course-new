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
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 5 media syntax, localization, route, animation and preview lock.");
