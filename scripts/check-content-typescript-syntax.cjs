// Parse all course TypeScript/TSX sources before runtime content validation.
// This catches malformed strings even if a route has not been rendered.
const fs=require("node:fs"),path=require("node:path"),ts=require("typescript");
const roots=["content","components","app","lib"];
const files=[];
function walk(dir){
 if(!fs.existsSync(dir))return;
 for(const item of fs.readdirSync(dir,{withFileTypes:true})){
  const full=path.join(dir,item.name);
  if(item.isDirectory())walk(full);
  else if(item.isFile()&&/\.tsx?$/.test(item.name))files.push(full);
 }
}
roots.forEach(walk);
if(files.length<30)throw Error("Unexpectedly small source set: "+files.length);
const errors=[];
for(const file of files){
 const source=fs.readFileSync(file,"utf8");
 const kind=file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS;
 const tree=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,kind);
 for(const diagnostic of tree.parseDiagnostics){
  const pos=tree.getLineAndCharacterOfPosition(diagnostic.start||0);
  errors.push(file+":"+(pos.line+1)+":"+(pos.character+1)+" "+ts.flattenDiagnosticMessageText(diagnostic.messageText,"\n"));
 }
}
if(errors.length){
 console.error(errors.slice(0,25).join("\n"));
 throw Error(errors.length+" TypeScript parse errors in "+files.length+" source files");
}
console.log("PASS: parsed "+files.length+" course TypeScript/TSX files without syntax errors.");
