// Source-level quality gate for authored examination items.
// Run: node scripts/check-exam-content-quality.cjs
const fs=require("node:fs");
const assert=require("node:assert/strict");
const files=[
"content/reviewed-module-one-exam.ts",
"content/reviewed-exam-items.ts",
"content/additional-reviewed-exam-items.ts",
"content/reviewed-pathway-exam-items.ts",
"content/reviewed-advanced-exam-items.ts",
"content/supplementary-reviewed-exam-items.ts",
"content/supplementary-systems-exam-items.ts",
"content/third-reviewed-exam-items.ts",
"content/third-systems-exam-items.ts"
];
const seen=new Map();
let count=0;
let failures=[];
const normalize=(v)=>v.toLocaleLowerCase().replace(/[^\\p{L}\\p{N}]+/gu," ").trim();
for(const file of files){
 const source=fs.readFileSync(file,"utf8");
 // Both authored TS object literals and JSON-stringified object literals are supported.
 const matches=[...source.matchAll(/(?:prompt:|"prompt":)\\s*"((?:\\\\.|[^"\\\\])*)"/g)];
 assert(matches.length>0,"No authored prompts in "+file);
 for(const match of matches){
  const prompt=JSON.parse('"'+match[1]+'"');
  count++;
  if(prompt.trim().length<35)failures.push(file+": short prompt: "+prompt);
  const key=normalize(prompt);
  if(seen.has(key))failures.push("Duplicate prompt: "+file+" and "+seen.get(key));
  seen.set(key,file);
  const following=source.slice(match.index,source.indexOf("}",match.index)+1);
  const correct=following.match(/(?:correct:|"correct":)\\s*"((?:\\\\.|[^"\\\\])*)"/);
  const explanation=following.match(/(?:explanation:|"explanation":)\\s*"((?:\\\\.|[^"\\\\])*)"/);
  if(!correct||!explanation)failures.push(file+": missing answer or explanation near "+prompt.slice(0,55));
  if(correct&&normalize(JSON.parse('"'+correct[1]+'"'))===key)failures.push(file+": correct answer repeats question");
  if(explanation&&JSON.parse('"'+explanation[1]+'"').length<25)failures.push(file+": too-short explanation");
 }
}
if(failures.length){console.error(failures.join("\\n"));process.exitCode=1;}
else console.log("Exam content QA passed: "+count+" language-specific prompts across "+files.length+" authored source files; no exact duplicate prompts, short prompts or missing explanations.");
