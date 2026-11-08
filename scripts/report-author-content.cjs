// Exact 300-cell ledger and preservation comparison against the reviewed main snapshot.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {load}=require('./check-tests.cjs');
const {getLesson}=load('content/index.ts');
const {sections}=load('content/sections.ts');
const dir=path.join(__dirname,'../docs/author-review');
const baseline=JSON.parse(fs.readFileSync(path.join(dir,'baseline.json'),'utf8'));
const requirements={pretest:20,cases:20,questions:25,glossary:50};
const keys={pretest:'questions',cases:'cases',questions:'questions',glossary:'terms'};
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x ?? null)).digest('hex');
const normalize=x=>x.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ').trim();
assert.equal(sections.length,17);
const rows=[],existingDuplicateTerms=[];let preserved=0;
for(const b of baseline.rows){
 const lesson=getLesson(b.moduleId,b.section,b.language);
 const key=keys[b.section];
 if(key){
  assert.equal(hash(lesson[key].slice(0,b.count)),b.itemHash,'Existing items changed '+JSON.stringify(b));
  assert.equal(hash({...lesson,[key]:[]}),b.metadataHash,'Existing metadata changed '+JSON.stringify(b));
  const items=lesson[key],ids=items.map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
  if(b.section==='glossary'){
   const oldNames=items.slice(0,b.count).map(x=>normalize(x.term));
   const newNames=items.slice(b.count).map(x=>normalize(x.term));
   assert.equal(new Set([...oldNames,...newNames]).size-new Set(oldNames).size,newNames.length,'New duplicate glossary term');
   if(new Set(oldNames).size<oldNames.length)existingDuplicateTerms.push({moduleId:b.moduleId,language:b.language,duplicates:oldNames.length-new Set(oldNames).size});
   for(const t of items)assert(t.definition.trim().length>15,'Missing definition');
  }
  const actual=items.length,minimum=requirements[b.section];
  rows.push({moduleId:b.moduleId,language:b.language,category:b.section,before:b.count,actual,minimum,added:actual-b.count,remaining:Math.max(0,minimum-actual),closed:b.count<minimum&&actual>=minimum});
 } else assert.equal(hash(lesson),b.hash,'Preserved lesson changed '+JSON.stringify(b));
 preserved++;
}
assert.equal(preserved,25*17*3);assert.equal(rows.length,300);
const summary={baselineCommit:baseline.commit,baselineShortfalls:rows.filter(r=>r.before<r.minimum).length,closed:rows.filter(r=>r.closed).length,remaining:rows.filter(r=>r.remaining>0).length,missingItems:rows.reduce((s,r)=>s+r.remaining,0),addedLocalizedItems:rows.reduce((s,r)=>s+r.added,0),preservedSectionSlots:preserved,preservedRegisteredLessons:baseline.rows.filter(b=>b.hash!==hash(null)).length,existingDuplicateTerms};
fs.writeFileSync(path.join(dir,'counts.json'),JSON.stringify({summary,rows},null,2)+'\n');
fs.writeFileSync(path.join(dir,'counts.csv'),'module,language,category,before,actual,minimum,added,remaining,closed\n'+rows.map(r=>[r.moduleId,r.language,r.category,r.before,r.actual,r.minimum,r.added,r.remaining,r.closed].join(',')).join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));
if(process.env.AUTHOR_RELEASE_GATE==='strict'&&summary.remaining)throw Error(`Author content incomplete: ${summary.remaining} section-language shortfalls`);
