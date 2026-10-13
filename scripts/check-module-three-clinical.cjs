const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript');
const s=fs.readFileSync('content/course-foundation/module-three-clinical.ts','utf8');
const r=fs.readFileSync('content/index.ts','utf8');
const ast=ts.createSourceFile('clinical.ts',s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
assert.equal(ast.parseDiagnostics.length,0);
for(const l of ['RU','EN','KZ']){
 assert(s.includes(' '+l+': ['),'Missing '+l);
 assert(r.includes('createModuleThreeClinical("'+l+'")'),'Unregistered '+l);
}
assert(s.includes('60 m/s')&&s.includes('60 м/с'));
assert(s.includes('5.8')&&s.includes('9.8')&&s.includes('5,8')&&s.includes('9,8'));
assert(r.includes('...foundationLessons[3]'));
console.log('PASS module 3 clinical RU EN KZ and route');
