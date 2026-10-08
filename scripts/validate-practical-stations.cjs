const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {load}=require("./check-tests.cjs");
const {baroreflexModes,baroreflexTimes,baroreflexMechanism}=load("content/baroreflex-lab.ts");
const languages=["RU","EN","KZ"];
assert.deepEqual(baroreflexModes.map(mode=>mode.id),["normal","weak-reflex","low-sympathetic","hypovolemia"]);
assert.equal(new Set(baroreflexModes.map(mode=>mode.id)).size,baroreflexModes.length,"baroreflex mode IDs must be unique");
for(const mode of baroreflexModes){
 for(const language of languages)assert(mode.label[language]?.trim(),`${mode.id}: missing ${language} label`);
 assert.deepEqual(mode.series.map(point=>point.time),baroreflexTimes,`${mode.id}: inconsistent time points`);
 assert.deepEqual(mode.series[0],mode.baseline,`${mode.id}: first point must equal baseline`);
 for(const key of ["hr","sbp","dbp"]){assert(Number.isFinite(mode.baseline[key]),`${mode.id}: missing ${key} baseline`);assert(mode.series.some(point=>point[key]!==mode.baseline[key]),`${mode.id}: ${key} never changes`);assert(["up","down","same"].includes(mode.expected[key]),`${mode.id}: missing ${key} prediction target`)}
}
assert.equal(baroreflexMechanism.length,6,"baroreflex mechanism must expose six timed stages");
for(const stage of baroreflexMechanism)for(const language of languages)assert(stage[language]?.trim(),`mechanism stage missing ${language}`);
const stationSource=fs.readFileSync(path.resolve(__dirname,"../components/NeuroPracticalStation.tsx"),"utf8");
const genericModules=[...stationSource.matchAll(/^\s*(\d+):\{title:/gm)].map(match=>Number(match[1]));
assert.deepEqual(genericModules,[3,11,19,20,21,22],"generic practical-station inventory changed; review each station deliberately");
const routeSource=fs.readFileSync(path.resolve(__dirname,"../app/modules/[id]/[section]/page.tsx"),"utf8");
assert(!routeSource.includes("<NeuroPracticalStation moduleId={22}"),"Module 22 still renders the generic practical station");
assert(!routeSource.includes("<NeuroPracticalStation moduleId={"),"A specialized lab is still followed by the generic practical station");
for(const moduleId of [3,11,19,20,21])assert(!routeSource.includes(`<GuidedLabFrame moduleId={${moduleId}}`),`Module ${moduleId} still duplicates its specialized prediction workflow`);
assert(routeSource.includes("<AutonomicLab language={lang} />"),"Module 22 baroreflex lab is not routed");
const labSource=fs.readFileSync(path.resolve(__dirname,"../components/AutonomicLab.tsx"),"utf8");
for(const signal of ["setBaseline(true)","setPrediction", "function run()", "mode.series", "setExplanation", "recordOutcome(22"]){
 assert(labSource.includes(signal),`Module 22 lab is missing required interaction: ${signal}`);
}
for(const language of languages)assert(labSource.includes(`${language}:{title:`),`Module 22 controls are missing ${language} localization`);
const visionSource=fs.readFileSync(path.resolve(__dirname,"../components/VisionLab.tsx"),"utf8");
for(const signal of ["Parameter changed","Index prediction","name=\"target\"","name=\"direction\"","Conditional luminance","Conditional contrast","Conditional visual-response index"]){
 assert(visionSource.includes(signal),`Module 20 visual experiment is missing: ${signal}`);
}
console.log("Practical-station validation passed: Modules 3, 11, 19, 20, 21 and 22 route only their specialized laboratories; Module 22 has localized parameters, prediction targets, time-series results and interpretation.");
