import type {ExamQuestion} from "../components/ExamCenter";

function shuffled<T>(items:T[]):T[]{
 const a=[...items];
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
}

export function buildVersion(bank:ExamQuestion[], count=10){
 const sequenceTarget=Math.min(count>=20?3:2,bank.filter(q=>q.sequenceItems?.length&&q.correctOrder?.length).length,count);
 const situationTarget=Math.min(count>=20?5:2,Math.max(0,count-sequenceTarget));
 const writtenTarget=Math.min(count>=20?4:2,Math.max(0,count-sequenceTarget-situationTarget));
 const mcqTarget=Math.max(0,count-sequenceTarget-situationTarget-writtenTarget);
 const used=new Set<string>();
 const usedModules=new Set<number>();
 const sequence:ExamQuestion[]=[];
 for(const q of shuffled(bank.filter(q=>q.sequenceItems?.length&&q.correctOrder?.length))){
   if(sequence.length>=sequenceTarget)break;
   if(usedModules.has(q.moduleId))continue;
   sequence.push({...q,sequenceItems:shuffled(q.sequenceItems!),responseType:"sequence"});used.add(q.id);usedModules.add(q.moduleId);
 }
 const situations:ExamQuestion[]=[];
 for(const q of shuffled(bank.filter(q=>q.taskType==="situation"&&!used.has(q.id)))){
   if(situations.length>=situationTarget)break;
   if(usedModules.has(q.moduleId))continue;
   situations.push({...q,options:shuffled(q.options),responseType:"mcq"});used.add(q.id);usedModules.add(q.moduleId);
 }
 const allModules=shuffled([...new Set(bank.map(q=>q.moduleId))]);
 const written:ExamQuestion[]=[];
 const writtenModuleOrder=[...allModules.filter(id=>!usedModules.has(id)),...allModules.filter(id=>usedModules.has(id))];
 for(const id of writtenModuleOrder){
   if(written.length>=writtenTarget)break;
   const q=shuffled(bank.filter(x=>x.moduleId===id&&x.writtenPrompt&&!x.sequenceItems&&x.taskType!=="situation"&&!used.has(x.id)))[0];
   if(q){written.push({...q,prompt:q.writtenPrompt!,responseType:"written"});used.add(q.id);usedModules.add(id);}
 }
 const mcq:ExamQuestion[]=[];
 const mcqModuleOrder=[...allModules.filter(id=>!usedModules.has(id)),...allModules.filter(id=>usedModules.has(id))];
 for(const id of mcqModuleOrder){
   if(mcq.length>=mcqTarget)break;
   const q=shuffled(bank.filter(x=>x.moduleId===id&&x.options.length>=2&&!x.sequenceItems&&x.taskType!=="situation"&&!used.has(x.id)))[0];
   if(q){mcq.push({...q,options:shuffled(q.options),responseType:"mcq"});used.add(q.id);usedModules.add(id);}
 }
 if(mcq.length<mcqTarget){
   for(const q of shuffled(bank.filter(q=>!used.has(q.id)&&q.options.length>=2&&!q.sequenceItems&&q.taskType!=="situation")).slice(0,mcqTarget-mcq.length)){
     mcq.push({...q,options:shuffled(q.options),responseType:"mcq"});used.add(q.id);
   }
 }
 let result=[...sequence,...situations,...written,...mcq];
 if(result.length<count){
   const extras=shuffled(bank.filter(q=>!used.has(q.id)&&q.options.length>=2&&!q.sequenceItems)).slice(0,count-result.length).map(q=>({...q,options:shuffled(q.options),responseType:"mcq" as const}));
   result=[...result,...extras];
 }
 return shuffled(result).slice(0,count);
}
