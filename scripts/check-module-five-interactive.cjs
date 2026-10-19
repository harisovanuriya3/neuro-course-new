// Structural checks only; scientific and browser review remain separate.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
const compare=fs.readFileSync('components/SynapseExperimentLab.tsx','utf8');
const lab=fs.readFileSync('components/SynapseLab.tsx','utf8');
for(const [name,src] of [['compare',compare],['lab',lab]]){
 const ast=ts.createSourceFile(name+'.tsx',src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 assert.equal(ast.parseDiagnostics.length,0,name+' TSX parse error');
}
for(const phrase of ['Пластичность и регуляция','Икемділік және реттелу',
 'Plasticity and regulation','Возможна: проводимость',
 'Мүмкін: саңылаулы','Possible: gap-junction',
 'mediator:"Neurotransmitter"']){
 assert(compare.includes(phrase),'Missing RU/EN/KZ comparison: '+phrase);
}
const kz=compare.slice(compare.indexOf('},KZ:{'),compare.indexOf('},EN:{'));
assert(!kz.includes('Пластичность и регуляция'),'Russian label in KZ UI');
assert(lab.includes('prefers-reduced-motion: reduce'),'Missing motion preference');
assert(lab.includes('disabled={!prediction || !!result}'),'Prediction not required');
const route=fs.readFileSync('app/modules/[id]/[section]/page.tsx','utf8');
assert(route.includes('moduleNumber === 5 && section === "interactive"'),'Route missing');
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.git.deploymentEnabled['refactor/evidence-based-assessment-audit'],false);
console.log('PASS module 5 synapse laboratory source contract; browser unverified.');
