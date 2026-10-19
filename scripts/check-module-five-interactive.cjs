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
const theory=fs.readFileSync('content/course-foundation/module-five-theory.ts','utf8');
for(const phrase of ['chemical-electrical-comparison','neuromuscular-junction','synaptic-model-limits']) assert(theory.includes(phrase),'Missing module 5 theory section '+phrase);
const registry=fs.readFileSync('content/index.ts','utf8');
for(const [file,source] of [['content/index.ts',registry],['module-five-theory.ts',theory]]){
 const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 assert.equal(parsed.parseDiagnostics.length,0,file+' parse error');
}
assert(registry.includes('import { createModuleFiveTheory } from "./course-foundation/module-five-theory"'),'Theory import missing');
assert(registry.includes('...foundationLessons[5]'),'Module 5 foundation not retained');
assert(registry.includes('foundationLessons[5]?.theory?.[language]'),'Module 5 base theory guard missing');
for(const lang of ['RU','EN','KZ']){
 assert(registry.includes('createModuleFiveTheory("'+lang+'", moduleFiveBaseTheory("'+lang+'"))'),'Module 5 theory not registered for '+lang);
}
for(const phrase of ['quantal and probabilistic','end-plate potential','gap junctions','deterministic','квантовое и вероятностное','потенциал концевой пластинки','кванттық әрі ықтималдық','соңғы пластинканың жергілікті потенциалын']){
 assert(theory.includes(phrase),'Module 5 theory missing: '+phrase);
}
console.log('PASS module 5 interactive and registered synapse theory RU/EN/KZ source contract; browser unverified.');
