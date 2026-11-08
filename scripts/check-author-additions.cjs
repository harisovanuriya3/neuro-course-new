const assert=require('node:assert/strict');
const {load}=require('./check-tests.cjs');
const {getLesson}=load('content/index.ts');
const specs=[['module-1-pretest','module1Pretest',15],['module-13-pretest','module13Pretest',17]];
for(const [file,name,count] of specs){
 const bank=load('content/author-review/'+file+'.ts')[name];assert.equal(bank.length,count);
 for(const language of ['RU','EN','KZ']){
  const answers=[];
  for(const item of bank){const q=item[language];assert(q.prompt.length>15&&q.explanation.length>30);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);}
  const moduleId=file.includes('13')?13:1;
  const lesson=getLesson(moduleId,'pretest',language);assert.equal(lesson.questions.length,20);
  for(const q of lesson.questions.filter(q=>q.id.startsWith('author-'))){
   const index=Number(q.id.split('-').at(-1))-1;
   assert.equal(q.options.find(o=>o.id===q.correctAnswer).text,bank[index][language].options[0]);answers.push(q.correctAnswer);
  }
  for(const key of ['a','b','c','d'])assert(answers.filter(x=>x===key).length>=3,'Unbalanced key positions');
 }
}
for(const language of ['RU','EN','KZ']){
 assert.equal(getLesson(1,'questions',language).questions.length,25);
 assert.equal(getLesson(1,'glossary',language).terms.length,50);
}
console.log('Authored additions: localized copies, exact lengths, unique options, rotated answer keys and rendered counts passed.');
