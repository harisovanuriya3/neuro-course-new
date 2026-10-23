// Module 6 notes: localized physiology prompt and actual note-taking route.
// AST/data validation; not a browser, speech recognition, or scientific peer review.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const ts=require("typescript");
const vm=require("node:vm");
const read=p=>fs.readFileSync(p,"utf8");
const path="components/NotesContent.tsx";
const source=read(path);
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
assert.equal(ast.parseDiagnostics.length,0,"NotesContent TSX parse errors");
let prompt;
function walk(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="moduleSixPrompt")
  prompt=node.initializer;
 ts.forEachChild(node,walk);
}
walk(ast);
assert(prompt,"Module 6 note prompt missing");
const expression="const moduleSixPrompt = "+prompt.getText(ast)+"; globalThis.copy = moduleSixPrompt;";
const js=ts.transpileModule(expression,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const ctx={};
vm.runInNewContext(js,ctx);
const copy=ctx.copy;
assert.deepEqual(Object.keys(copy).sort(),["EN","KZ","RU"]);
for(const lang of ["RU","EN","KZ"]){
 const text=copy[lang];
 assert(typeof text==="string"&&text.length>350,lang+": prompt too short");
 for(const token of ["−65","E(Cl)","Cl⁻","Ca²⁺","Vm"])
  assert(text.includes(token),lang+": missing physiology marker "+token);
 assert(!/always hyperpolariz|всегда гиперполяр|әрқашан гиперполяр/i.test(text),
  lang+": unqualified chloride effect");
}
for(const [lang,required] of Object.entries({
 RU:["временную суммацию","пространственную суммацию","шунтирующее торможение","пресинаптическим торможением","не проверяются автоматически","на соме"],
 EN:["temporal summation","spatial summation","shunting inhibition","presynaptic inhibition","not graded automatically","somatic Vm"],
 KZ:["уақыттық суммациясын","кеңістіктік суммациясымен","шунттаушы тежелу","пресинапстық тежелумен","автоматты түрде бағаланбайды","сомада"]
})){
 for(const word of required)
  assert(copy[lang].includes(word),lang+": missing "+word);
}
assert(source.includes("moduleId === 6 && <p>{moduleSixPrompt[language]}</p>"),
 "Module 6 prompt is not rendered");
assert(source.includes('saveModuleNotes(moduleId, next)'),"Notes must be persisted");
assert(source.includes('key={selected}'),"Changing section must update note input");
assert(source.includes('disabled={!ready}'),"Note input must await stored data");
const route=read("app/modules/[id]/[section]/page.tsx");
assert(route.includes('section === "notes"')&&
 route.includes('<NotesContent language={lang} moduleId={moduleNumber} />'),
 "Module 6 notes route must pass module and language");
const vercel=JSON.parse(read("vercel.json"));
assert.equal(vercel.git.deploymentEnabled["refactor/evidence-based-assessment-audit"],false,
 "Audit branch must not trigger Vercel preview");
console.log("PASS: module 6 notes RU/EN/KZ physiology, route, persistence contract and no-preview policy.");
console.log("NOTE: browser storage, speech input, accessibility and full build remain unverified.");
