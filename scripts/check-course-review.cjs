const assert=require('node:assert/strict');
const fs=require('node:fs');
const {load}=require('./check-tests.cjs');
const {getLesson}=load('content/index.ts');
const {sectionOrder}=load('content/sections.ts');
const {validateTest}=load('lib/tests/engine.ts');
const {mediaWalkthroughs}=load('content/media-walkthroughs.ts');
const {createExamBank}=load('content/exam-bank.ts');
const {buildVersion}=load('lib/examVersion.ts');
const {words,gradeWritten}=load('lib/writtenAssessment.ts');
const {pathwayResult}=load('lib/pathwayModel.ts');
const service=new Set(['virtual-patient','voice','progress','notes']);
let lessons=0,tests=0;
for(const lang of ['RU','EN','KZ']){
 for(let id=1;id<=25;id++){
  for(const section of sectionOrder){
   if(service.has(section)||(section==='interactive'&&id>1))continue;
   const lesson=getLesson(id,section,lang);
   assert(lesson,`${id}/${section}/${lang}: missing content`);assert(lesson.title?.trim());lessons++;
   if(section==='tests'){
    validateTest(lesson);tests++;
    const graphNodes=Object.values(lesson.nodes||{});
    const questionNodes=graphNodes.filter(node=>Array.isArray(node.options)&&node.options.length);
    for(const node of questionNodes){
      assert.equal(node.options.length,4,`${id}/${section}/${lang}/${node.id}: expected exactly 4 answers`);
      assert.equal(new Set(node.options.map(opt=>opt.id)).size,4,`${id}/${section}/${lang}/${node.id}: duplicate option IDs`);
      assert(node.options.every(opt=>typeof opt.text==='string'&&opt.text.trim()),`${id}/${section}/${lang}/${node.id}: missing answer text`);
    }
   }
  }
  if(id>1){const steps=mediaWalkthroughs[id][lang];assert.equal(steps.length,4);assert.equal(new Set(steps).size,4);steps.forEach(s=>assert(s.length>20));}
 }
 const bank=createExamBank(lang);
 const sequenceSets=bank.filter(q=>q.sequenceItems);
 assert.equal(new Set(sequenceSets.map(q=>JSON.stringify(q.sequenceItems))).size,sequenceSets.length,'Physiology sequences must not be identical generic templates');
 assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of bank){if(!q.sequenceItems)assert(q.options.some(o=>o.id===q.correctAnswer),q.id);assert(q.prompt.trim());assert(q.explanation.trim());if(q.correctOrder)assert.deepEqual([...q.correctOrder].sort(),q.sequenceItems.map(x=>x.id).sort())}
 for(let run=0;run<30;run++){
  const full=buildVersion(bank,25);assert.equal(full.length,25);assert.equal(new Set(full.map(q=>q.moduleId)).size,25);assert.equal(new Set(full.map(q=>q.id)).size,25);
  assert(full.some(q=>q.taskType==='situation'));assert(full.some(q=>q.responseType==='written'));assert(full.some(q=>q.responseType==='sequence'));
 }
 for(let id=1;id<=25;id++){const pool=bank.filter(q=>q.moduleId===id);assert.equal(buildVersion(pool,Math.min(25,pool.length)).length,Math.min(25,pool.length));}
}
for(const side of ['left','right'])for(const level of ['C5','T10','L2']){
 assert.equal(pathwayResult('dorsal',side,level).deficitSide,side);
 assert.equal(pathwayResult('corticospinal',side,level).deficitSide,side);
 assert.notEqual(pathwayResult('spinothalamic',side,level).deficitSide,side);
}
assert(pathwayResult('dorsal','left','C5').lesionY<pathwayResult('dorsal','left','T10').lesionY);
assert(words('Нейроны передают импульсы').has('нейроны'));
assert(words('Neurons transmit impulses').has('neurons'));
assert(words('Нейрондар сигналдарды өткізеді').has('нейрондар'));
const q={options:[{id:'a',text:'Нейроны передают импульсы'}],correctAnswer:'a',explanation:'Рецепторы запускают потенциал'};
assert.equal(gradeWritten(q,'').points,0);
assert(gradeWritten(q,q.options[0].text+' '+q.explanation).coverage>.9);
const route=fs.readFileSync('app/modules/[id]/[section]/page.tsx','utf8');
assert(route.includes('moduleNumber === 20 && <VisualPathwayLocalizer'));
assert(!route.includes('<GuidedLabFrame'),'Specialized labs must not ask for a second prediction before opening');
console.log(`Review checks passed: ${lessons} localized content sections, ${tests} test graphs, 24 × 3 media walkthroughs, 3 exam banks, 90 full-course exam samples, multilingual written rubric and pathway laterality.`);
