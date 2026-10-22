// Execute the actual teaching-model function extracted from the TSX AST.
// Structural checks do not replace a browser interaction or physiological validation.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const file="components/IntegrationExperimentLab.tsx";
const source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"Module 6 laboratory TSX syntax");
const node=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==="estimateIntegrationVoltage");
assert(node,"Missing testable integration model");
const code=ts.transpileModule(node.getText(ast).replace(/^export\s+/,""),{
 compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}
}).outputText;
const estimate=vm.runInNewContext(code+"\nestimateIntegrationVoltage", {Math});
assert.equal(estimate("spatial",0,0,8),-70,"Resting voltage");
assert.equal(estimate("temporal",1,0,1),-64,"Single EPSP amplitude");
assert.equal(estimate("temporal",1,0,50),-64,"Single EPSP must not decay before its own peak");
assert(estimate("temporal",3,0,1)>estimate("temporal",3,0,50),
 "Shorter interval must increase temporal summation");
assert.equal(estimate("spatial",3,0,8),-52,"Three coincident EPSPs");
assert.equal(estimate("spatial",3,1,8),-56.5,"Inhibitory input changes threshold prediction");
assert(estimate("temporal",4,0,1)>=-55,"Short-interval train reaches illustrative threshold");
assert(estimate("temporal",4,0,50)<-55,"Long-interval train stays below threshold");
for(const label of ["RU","EN","KZ"])assert(source.includes(label+":{"),"Missing "+label);
assert(source.includes("Shunting conductance")&&source.includes("Шунтирующее торможение")&&source.includes("Шунттаушы тежелу"),
 "Missing RU/EN/KZ limitation of additive hyperpolarizing model");
const route=fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
assert(route.includes("<IntegrationExperimentLab language={lang} />"),"Lab route missing");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 6 integration lab numerical invariants, RU/EN/KZ caveats and route.");
