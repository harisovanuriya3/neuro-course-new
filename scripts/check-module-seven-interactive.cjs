// Module 7 / interactive: reflex-arc simulation contract and small runtime tests.
// Textbook cross-check: Guyton & Hall 13e PDF pp. 670–671 (ch. 55),
// Ganong 23e PDF pp. 175–176 (ch. 9), Ghai 8e PDF p. 316.
// This is NOT a clinical validation or browser interaction test.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const vm = require("node:vm");
const read = path => fs.readFileSync(path, "utf8");
const path = "components/ReflexLab.tsx";
const source = read(path);
const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length, 0, "Module 7 reflex TSX must parse");

const root = ast.statements.find(n => ts.isFunctionDeclaration(n) && n.name?.text === "ReflexLab");
assert(root?.body, "ReflexLab component missing");
const declaration = ast.statements.find(n => ts.isVariableStatement(n) &&
  n.declarationList.declarations.some(d => d.name.getText(ast) === "copy"));
assert(declaration, "Localized laboratory copy missing");
const copy = declaration.declarationList.declarations[0].initializer;
const localeObject = ts.isSatisfiesExpression(copy) ? copy.expression : copy;
assert(ts.isObjectLiteralExpression(localeObject), "Localized copy must be an object");
const property = (object, name) => object.properties.find(p =>
  ts.isPropertyAssignment(p) && p.name.getText(ast) === name);
for (const lang of ["RU", "EN", "KZ"]) {
  const locale = property(localeObject, lang);
  assert(locale && ts.isObjectLiteralExpression(locale.initializer), "Missing " + lang);
  const stages = property(locale.initializer, "stages");
  assert(stages && ts.isArrayLiteralExpression(stages.initializer), lang + ": stages missing");
  assert.equal(stages.initializer.elements.length, 5, lang + ": one stage per actual reflex step");
  assert(stages.initializer.elements.every(e => ts.isStringLiteral(e) && e.text.length > 25),
    lang + ": nonempty explanatory stages required");
  const first = stages.initializer.elements[0].text.toLowerCase();
  assert(first.includes(lang === "RU" ? "ноцицептор" : lang === "EN" ? "nociceptor" : "ноцицепторы"),
    lang + ": first step must describe receptor transduction");
  const limit = property(locale.initializer, "limit");
  assert(limit && ts.isStringLiteral(limit.initializer) && limit.initializer.text.length > 180,
    lang + ": model limitations must be explicit");
}
const compile = code => ts.transpileModule("(" + code + ")", {
  compilerOptions: {target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS},
  reportDiagnostics: true
});
const getFunction = name => {
  const fn = root.body.statements.find(n => ts.isFunctionDeclaration(n) && n.name?.text === name);
  assert(fn?.body, "Missing " + name);
  return fn.getText(ast);
};
const toggle = getFunction("togglePart");
function testToggle(initial, part, running=false, stage=-1) {
  let result, condition, prediction;
  const ctx = {
    running, stage, excluded: new Set(initial),
    setExcluded: x => {result = x;},
    setCondition: x => {condition = x;},
    setPrediction: x => {prediction = x;}
  };
  const fn = vm.runInNewContext(compile(toggle).outputText, ctx);
  fn(part);
  return {result: result && Array.from(result), condition, prediction};
}
assert.deepEqual(testToggle(["receptor"], "spinal").result, ["spinal"],
  "A new excluded segment must replace, not accumulate with, the old one");
assert.equal(testToggle(["receptor"], "spinal").condition, "spinal");
assert.equal(testToggle(["spinal"], "spinal").condition, "intact");
assert.deepEqual(testToggle(["spinal"], "spinal").result, []);
assert.equal(testToggle(["spinal"], "receptor", true).result, undefined,
  "Cannot change a running trial");
assert.equal(testToggle(["spinal"], "receptor", false, 1).result, undefined,
  "Cannot change a completed/in-progress trial");

const effectCall = root.body.statements
  .filter(ts.isExpressionStatement).map(x => x.expression)
  .find(x => ts.isCallExpression(x) && x.expression.getText(ast) === "useEffect");
assert(effectCall, "Timer effect missing");
const effect = effectCall.arguments[0].getText(ast);
function testTimer(stage, prediction="moves", paused=false) {
  let callback, delay;
  const stages=[], running=[], scores=[];
  const ctx = {
    stage, prediction, paused, running:true, slow:false, condition:"intact",
    lastStage:{intact:4,receptor:0,afferent:1,spinal:2,efferent:3},
    window:{setTimeout:(fn,ms)=>{callback=fn;delay=ms;return 1;},clearTimeout:()=>{}},
    setStage:x=>stages.push(x), setRunning:x=>running.push(x),
    recordOutcome:(...x)=>scores.push(x)
  };
  const fn = vm.runInNewContext(compile(effect).outputText, ctx);
  const cleanup = fn();
  if(callback) callback();
  if(cleanup) cleanup();
  return {stages,running,scores,delay};
}
const early = testTimer(0);
assert.deepEqual(early.stages,[1],"Advance only one stage per tick");
assert.equal(early.scores.length,0,"Do not score unfinished experiments");
const done = testTimer(4);
assert.deepEqual(done.running,[false],"Stop after last stage");
assert.equal(done.scores.length,2,"Save both outcomes only on completion");
assert.equal(done.scores[0][0],7);
assert.equal(done.scores[0][2],1);
assert.equal(testTimer(4,"still").scores[0][2],0,"Wrong prediction must not earn full credit");
assert.equal(testTimer(4,"moves",true).scores.length,0,"Paused trial must not finish");

assert(source.includes('data-active={stage===i} data-done={stage>i}'),
  "Stage indicator must align with the five simulation steps");
assert(!source.includes('<b>6</b>'),"Do not label fifth step as sixth");
assert(source.includes('stage>=3&&!excluded.has("receptor")&&!excluded.has("afferent")&&!excluded.has("spinal")&&!excluded.has("efferent")'),
  "Motor pulse must require intact upstream pathway");
assert(!source.includes("setInterval"),"Timer must be cancellable per stage");
assert(!source.includes("setStage(current =>"),"Avoid side effects inside a React state updater");
const css=read("components/ReflexLab.module.css");
assert(css.includes(".stageRail{grid-template-columns:repeat(5,1fr);background:"),
  "Stage rail CSS must match five steps");
for (const asset of ["reflex-background.webp","reflex-hand.webp"])
  assert(fs.existsSync("public/images/lab/" + asset),"Missing visual asset: " + asset);
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('moduleNumber === 7 && section === "interactive"'));
assert(route.includes('<ReflexLab language={lang} />'));
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false);
console.log("PASS: module 7 reflex model, five stages × RU/EN/KZ, single-lesion trials, completion scoring, assets and route.");
console.log("NOTE: browser, keyboard, mobile, voice and full scientific validation still pending.");
