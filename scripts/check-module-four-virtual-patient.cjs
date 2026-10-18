// Module 4 virtual-model source contract; does not replace a browser test.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
const file="content/reviewed-virtual-patients.ts";
const src=fs.readFileSync(file,"utf8");
const route=fs.readFileSync("components/UnifiedVirtualPatient.tsx","utf8");
const parsed=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(parsed.parseDiagnostics.length,0,"Reviewed virtual patient must parse");
assert(src.includes("if(moduleId===4 && base)"),"Module 4 override not connected");
for(const lang of ["RU","EN","KZ"]){
 assert(src.includes(lang+":{patient:"),lang+" missing model-specific profile");
 assert(src.includes("}["+ "language"+"]"),"Model must use language key");
}
assert(src.includes("not a patient")&&src.includes("пациент емес"),"No human experiment disclaimer");
assert(src.includes("index===5"),"Final stage must be reviewed");
assert(src.includes("model.final"),"Physiological feedback missing");
assert(route.includes("getReviewedVirtualPatientScenario"),"Renderer must use reviewed scenarios");
console.log("PASS: module 4 virtual model RU/EN/KZ override and route.");
