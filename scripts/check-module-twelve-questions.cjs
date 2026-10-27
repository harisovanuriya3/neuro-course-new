const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const source=fs.readFileSync("content/course-foundation/module-twelve-questions.ts","utf8");
const file=ts.createSourceFile("module-twelve-questions.ts",source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(file.parseDiagnostics.length,0);
const result=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});
assert.equal(result.diagnostics.filter(x=>x.category===ts.DiagnosticCategory.Error).length,0);
const adaptedExports={};new Function("exports",result.outputText)(adaptedExports);
for(const language of ["RU","EN","KZ"]){
 const questions=adaptedExports.moduleTwelveReviewQuestions(language);
 assert.equal(questions.length,5);
 assert.equal(new Set(questions.map(q=>q.id)).size,5);
 assert(questions.every(q=>q.prompt.length>=90&&q.explanation.length>=140));
 assert(questions.every(q=>["theory","practice"].includes(q.target.section)));
}
const routing=fs.readFileSync("content/course-foundation/index.ts","utf8");
assert(routing.includes("moduleTwelveReviewQuestions(language)"));
assert(routing.includes("topic.id === 12"));
assert.equal(JSON.parse(fs.readFileSync("vercel.json","utf8")).git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: 5 original review questions × RU/EN/KZ, targeted route, previews disabled.");
