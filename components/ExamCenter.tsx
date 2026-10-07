"use client";

import { useEffect, useMemo, useState } from "react";
import type { Language } from "../content/course";

export type ExamQuestion = {
  id: string;
  moduleId: number;
  moduleTitle: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  responseType?: "mcq" | "written" | "sequence";
  writtenPrompt?: string;
  sequenceItems?: { id: string; text: string }[];
  correctOrder?: string[];
  taskType?: "standard" | "situation" | "sequence";
};

const ui: Record<Language, Record<string,string>> = {
 RU:{all:"Все 25 блоков",choose:"Выберите блок",start:"Начать",restart:"Новый вариант",submit:"Завершить попытку",jump:"К первому пропущенному",resume:"Незавершённая попытка восстановлена. Продолжайте с первого пропущенного задания.",locked:"Попытка завершена. Ответы больше нельзя менять; для новой попытки создайте новый вариант.",question:"Вопрос",of:"из",module:"Блок",answered:"Отвечено",finishWarn:"Есть пропущенные задания. Возвращаю к первому из них.",result:"Результат",correct:"Правильных ответов",review:"Разбор ответов",your:"Ваш ответ",right:"Правильный ответ",unanswered:"Нет ответа",pass:"Попытка завершена. Ниже можно спокойно разобрать ошибки.",bank:"В банке",items:"заданий",format:"Выберите быстрый вариант на 10 заданий или полный на 25. Вариант обязательно включает ситуационные задачи, а также тесты, письменное объяснение и сборку физиологической последовательности.",sequence:"Соберите последовательность",undo:"Отменить",reset:"Сначала",size:"Объём экзамена",quick:"Быстрый — 10 заданий",full:"Полный — 25 заданий",situation:"Ситуационная задача"},
 KZ:{all:"Барлық 25 блок",choose:"Блокты таңдаңыз",start:"Бастау",restart:"Жаңа нұсқа",submit:"Талпынысты аяқтау",jump:"Бірінші өткізіп алған сұраққа",resume:"Аяқталмаған талпыныс қалпына келтірілді. Бірінші жауап берілмеген тапсырмадан жалғастырыңыз.",locked:"Талпыныс бекітілді. Жауаптарды енді өзгертуге болмайды; жаңа талпыныс үшін жаңа нұсқа жасаңыз.",question:"Сұрақ",of:"ішінен",module:"Блок",answered:"Жауап берілді",finishWarn:"Жауап берілмеген сұрақтар бар. Бірінші өткізіп алған сұраққа қайтарамын.",result:"Нәтиже",correct:"Дұрыс жауап",review:"Жауаптарды талдау",your:"Сіздің жауабыңыз",right:"Дұрыс жауап",unanswered:"Жауап жоқ",pass:"Емтихан аяқталды. Төменде талдау берілген.",bank:"Банкте",items:"емтихан тапсырмасы",format:"10 тапсырмалық жылдам немесе 25 тапсырмалық толық нұсқаны таңдаңыз. Нұсқа міндетті түрде жағдаяттық есептерді, тесттерді, жазбаша түсіндіруді және физиологиялық тізбекті қамтиды.",sequence:"Тізбекті құрастырыңыз",undo:"Болдырмау",reset:"Басынан",size:"Емтихан көлемі",quick:"Жылдам — 10 тапсырма",full:"Толық — 25 тапсырма",situation:"Жағдаяттық есеп"},
 EN:{all:"All 25 blocks",choose:"Choose a block",start:"Start",restart:"New version",submit:"Finish attempt",jump:"Go to first unanswered",resume:"Your unfinished attempt was restored. Continue from the first unanswered item.",locked:"This attempt is finalized. Answers can no longer be changed; start a new version for another attempt.",question:"Question",of:"of",module:"Block",answered:"Answered",finishWarn:"Some questions are unanswered. Returning to the first unanswered question.",result:"Result",correct:"Correct answers",review:"Answer review",your:"Your answer",right:"Correct answer",unanswered:"No answer",pass:"Exam completed. Review is available below.",bank:"Question bank",items:"exam items",format:"Choose a quick 10-item version or a full 25-item version. Each version includes situational tasks plus answer selection, written explanation, and physiological sequence building.",sequence:"Build the sequence",undo:"Undo",reset:"Reset",size:"Exam length",quick:"Quick — 10 items",full:"Full — 25 items",situation:"Situational task"}
};

function shuffled<T>(items:T[]):T[]{
 const a=[...items];
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
}

function buildVersion(bank:ExamQuestion[], count=10){
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
   sequence.push({...q,responseType:"sequence"});used.add(q.id);usedModules.add(q.moduleId);
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

function words(text:string){return new Set(text.toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu," ").split(/\\s+/).filter(w=>w.length>=5));}
function gradeWritten(q:ExamQuestion,answer:string){
 const reference=words(q.options.find(o=>o.id===q.correctAnswer)?.text+" "+q.explanation);
 const student=words(answer);
 let hit=0; reference.forEach(w=>{if(student.has(w))hit++;});
 const coverage=reference.size?hit/reference.size:0;
 const physiologicalElement=coverage>=0.18;
 const causalDirection=/(потому|поэтому|привод|вызывает|вследствие|увелич|сниж|cause|because|therefore|leads|results|increase|decrease|себеп|сондықтан|әкел|арт|төмен)/i.test(answer);
 const mechanism=/(механизм|канал|рецептор|медиатор|потенциал|ион|интеграц|регуляц|mechanism|channel|receptor|transmitter|potential|ion|integration|regulation|механизм|арна|рецептор|медиатор|потенциал|ион|интеграц|реттел)/i.test(answer)||coverage>=0.32;
 const interpretation=/(результат|следств|итог|наблюд|ожида|функц|result|consequence|outcome|observ|expected|function|нәтиже|салдар|күтіл|қызмет)/i.test(answer)||coverage>=0.45;
 const points=(physiologicalElement?2:0)+(causalDirection?3:0)+(mechanism?3:0)+(interpretation?2:0);
 return {score:points*10,points,coverage,physiologicalElement,causalDirection,mechanism,interpretation};
}

export default function ExamCenter({lang,bank}:{lang:Language;bank:ExamQuestion[]}){
 const t=ui[lang];
 const [version,setVersion]=useState<ExamQuestion[]|null>(null);
 const [selectedModule,setSelectedModule]=useState<number>(0);
 const [examSize,setExamSize]=useState<10|25>(10);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [written,setWritten]=useState<Record<string,string>>({});
 const [sequences,setSequences]=useState<Record<string,string[]>>({});
 const [finished,setFinished]=useState(false);
 const [warning,setWarning]=useState("");
 const [hydrated,setHydrated]=useState(false);
 const [restored,setRestored]=useState(false);
 const storageKey=`neuro-course:exam:${lang}:v3`;
 const score=useMemo(()=>version?.reduce((n,q)=>n+(q.responseType==="mcq"&&answers[q.id]===q.correctAnswer?1:0),0)??0,[version,answers]);
 const mcqCount=version?.filter(q=>q.responseType==="mcq").length??0;
 const writtenGrades=useMemo(()=>Object.fromEntries((version??[]).filter(q=>q.responseType==="written").map(q=>[q.id,gradeWritten(q,written[q.id]??"")])),[version,written]);
 const writtenPoints=Object.values(writtenGrades).reduce((n,g)=>n+g.points,0);
 const sequencePoints=(version??[]).filter(q=>q.responseType==="sequence").reduce((n,q)=>{
   const a=sequences[q.id]??[]; const ok=q.correctOrder?.length===a.length&&q.correctOrder.every((id,i)=>a[i]===id);
   return n+(ok?10:0);
 },0);
 const earnedPoints=score*10+writtenPoints+sequencePoints;
 const maxPoints=version?version.length*10:0;
 const percent=maxPoints?Math.min(100,Math.round(earnedPoints/maxPoints*100)):0;
 const performanceLabel=lang==="RU"?(percent>=85?"Высокий уровень":percent>=70?"Уверенный уровень":percent>=55?"Формируется":"Требует повторения"):lang==="EN"?(percent>=85?"High mastery":percent>=70?"Secure":percent>=55?"Developing":"Needs review"):(percent>=85?"Жоғары деңгей":percent>=70?"Сенімді деңгей":percent>=55?"Қалыптасуда":"Қайталау қажет");
 const comment=lang==="RU"?(percent>=90?"Отличное владение материалом. Ошибки единичны.":percent>=75?"Хороший результат. Повторите блоки с ошибками.":percent>=60?"Базовый уровень достигнут, но есть темы для повторения.":"Необходимо повторить основные механизмы и причинно-следственные связи."):lang==="EN"?(percent>=90?"Excellent command of the material. Errors are isolated.":percent>=75?"Good result. Review the blocks with errors.":percent>=60?"Basic level achieved, but some topics need review.":"Review the core mechanisms and causal relationships."):percent>=90?"Материалды өте жақсы меңгерген. Қателер аз.":percent>=75?"Жақсы нәтиже. Қате жіберілген блоктарды қайталаңыз.":percent>=60?"Негізгі деңгейге жетті, бірақ кейбір тақырыптарды қайталау керек.":"Негізгі механизмдер мен себеп-салдар байланыстарын қайталау қажет.";
 const analysis=useMemo(()=>{if(!version)return [];const m=new Map<number,{title:string,total:number,earned:number}>();version.forEach(q=>{const x=m.get(q.moduleId)??{title:q.moduleTitle,total:0,earned:0};x.total+=10;if(q.responseType==="written"){x.earned+=writtenGrades[q.id]?.points??0;}else if(q.responseType==="sequence"){const a=sequences[q.id]??[];if(q.correctOrder?.length===a.length&&q.correctOrder.every((id,i)=>a[i]===id))x.earned+=10;}else if(answers[q.id]===q.correctAnswer){x.earned+=10;}m.set(q.moduleId,x)});return [...m.entries()].map(([id,x])=>({id,...x,pct:Math.round(x.earned/x.total*100)})).sort((a,b)=>a.pct-b.pct);},[version,answers,writtenGrades,sequences]);
 useEffect(()=>{
   try{
     const raw=JSON.parse(localStorage.getItem(storageKey)||"null");
     if(raw&&typeof raw==="object"&&Array.isArray(raw.version)){
       setVersion(raw.version);
       setSelectedModule(Number.isInteger(raw.selectedModule)?raw.selectedModule:0);
       setExamSize(raw.examSize===25?25:10);
       setAnswers(raw.answers&&typeof raw.answers==="object"?raw.answers:{});
       setWritten(raw.written&&typeof raw.written==="object"?raw.written:{});
       setSequences(raw.sequences&&typeof raw.sequences==="object"?raw.sequences:{});
       setFinished(raw.finished===true);
       setRestored(true);
     }
   }catch{/* Optional local storage */}
   setHydrated(true);
 },[storageKey]);
 useEffect(()=>{
   if(!hydrated)return;
   try{
     if(!version)localStorage.removeItem(storageKey);
     else localStorage.setItem(storageKey,JSON.stringify({version,selectedModule,examSize,answers,written,sequences,finished}));
   }catch{/* Optional local storage */}
 },[hydrated,storageKey,version,selectedModule,examSize,answers,written,sequences,finished]);
 useEffect(()=>{
   if(!hydrated||!version||finished)return;
   const missing=version.find(q=>q.responseType==="written"?!written[q.id]?.trim():q.responseType==="sequence"?(sequences[q.id]?.length??0)!==(q.sequenceItems?.length??0):!answers[q.id]);
   if(!missing)return;
   const id=`exam-${missing.id}`;
   requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:"center"}));
 },[hydrated,version,finished,answers,written,sequences]);


 const firstMissing=version?.find(q=>q.responseType==="written"?!written[q.id]?.trim():q.responseType==="sequence"?(sequences[q.id]?.length??0)!==(q.sequenceItems?.length??0):!answers[q.id]);
 const saveAttempt=()=>{
   if(!version)return;
   try{
     const key="neuro-course:exam-history:v1";
     const old=JSON.parse(localStorage.getItem(key)||"[]");
     const item={id:Date.now(),date:new Date().toISOString(),language:lang,size:version.length,module:selectedModule,percent,level:performanceLabel,blocks:analysis.map(x=>({id:x.id,title:x.title,percent:x.pct}))};
     localStorage.setItem(key,JSON.stringify([item,...(Array.isArray(old)?old:[])].slice(0,30)));
   }catch{/* optional history */}
 };
 const finishAttempt=()=>{
   const missing=version?.find(q=>q.responseType==="written"?!written[q.id]?.trim():q.responseType==="sequence"?(sequences[q.id]?.length??0)!==(q.sequenceItems?.length??0):!answers[q.id]);
   if(missing){setWarning(t.finishWarn);document.getElementById(`exam-${missing.id}`)?.scrollIntoView({behavior:"smooth",block:"center"});return;}
   setFinished(true);saveAttempt();window.scrollTo({top:0,behavior:"smooth"});
 };
 const begin=()=>{const pool=selectedModule===0?bank:bank.filter(q=>q.moduleId===selectedModule);setVersion(buildVersion(pool,Math.min(examSize,pool.length)));setAnswers({});setWritten({});setSequences({});setFinished(false);setWarning("");setRestored(false);window.scrollTo({top:0,behavior:"smooth"});};
 if(!version) return <section style={{marginTop:24,border:"2px solid #86aac4",borderRadius:16,padding:22}}>
   <p><strong>{t.bank}: {bank.length} {t.items}.</strong></p><p>{t.format}</p>
   <label style={{display:"block",fontWeight:700,margin:"18px 0 8px"}}>{t.size}</label>
   <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
    <button type="button" aria-pressed={examSize===10} onClick={()=>setExamSize(10)} style={{padding:"9px 12px",borderRadius:9}}>{t.quick}</button>
    <button type="button" aria-pressed={examSize===25} onClick={()=>setExamSize(25)} style={{padding:"9px 12px",borderRadius:9}}>{t.full}</button>
   </div>
   <label style={{display:"block",fontWeight:700,margin:"18px 0 8px"}}>{t.choose}</label>
   <select value={selectedModule} onChange={e=>setSelectedModule(Number(e.target.value))} style={{width:"100%",maxWidth:760,padding:"12px",borderRadius:10,marginBottom:16}}>
    <option value={0}>{t.all}</option>
    {[...new Map(bank.map(q=>[q.moduleId,q.moduleTitle])).entries()].sort((a,b)=>a[0]-b[0]).map(([id,title])=><option key={id} value={id}>{id}. {title}</option>)}
   </select><br/>
   <button onClick={begin} style={{padding:"12px 18px",borderRadius:10,cursor:"pointer",fontWeight:700}}>{t.start}</button>
 </section>;
 if(finished) return <section style={{marginTop:24}}>
   <div style={{border:"2px solid #86aac4",borderRadius:16,padding:22}}>
    <h2>{t.result}: {percent}/100</h2>
    <p><strong>{lang==="RU"?"Итоговый результат":lang==="EN"?"Overall result":"Қорытынды нәтиже"}: {percent}/100 · {performanceLabel}</strong></p>
    <p style={{fontSize:14,opacity:.82}}>{lang==="RU"?"Результат показывает текущий уровень выполнения этого варианта. Преподаватель может использовать его вместе с кейсами, практикой и другими доказательствами обучения; это не заменяет официальную ведомость.":lang==="EN"?"This score reflects performance on this version. A teacher may combine it with cases, practical work, and other learning evidence; it does not replace an official grade record.":"Бұл нәтиже осы нұсқадағы орындалу деңгейін көрсетеді. Оқытушы оны кейстер, практика және басқа оқу дәлелдерімен бірге қолдана алады; ол ресми бағалау ведомосын алмастырмайды."}</p>
    <p>{comment}</p>
    <h3>{lang==="RU"?"Анализ по блокам":lang==="EN"?"Analysis by block":"Блоктар бойынша талдау"}</h3>
    <p>{lang==="RU"?"Для преподавателя: сначала смотрите слабейшие блоки ниже; для студента: повторите механизм, затем выполните новый вариант, а не заучивайте правильный ответ.":lang==="EN"?"Teacher view: start with the weakest blocks below. Student view: review the mechanism, then take a new version rather than memorising the answer.":"Оқытушы үшін: төмендегі ең әлсіз блоктардан бастаңыз. Студент үшін: механизмді қайталап, дұрыс жауапты жаттамай жаңа нұсқаны орындаңыз."}</p>
    {analysis.map(x=><p key={x.id}><strong>{x.id}. {x.title}</strong>: {x.earned}/{x.total} ({x.pct}%)</p>)}
    <p>{t.pass}</p><p><strong>{t.locked}</strong></p>
    <div style={{padding:"14px",borderRadius:12,background:"#f5f9fc",margin:"14px 0"}}>
      <strong>{lang==="RU"?"Следующий учебный шаг":lang==="EN"?"Next learning step":"Келесі оқу қадамы"}</strong>
      <p>{analysis[0]?(lang==="RU"?`Начните с блока ${analysis[0].id} «${analysis[0].title}» (${analysis[0].pct}%): повторите механизм, разберите клинический кейс и только затем создайте новый вариант.`:lang==="EN"?`Start with block ${analysis[0].id} “${analysis[0].title}” (${analysis[0].pct}%): review the mechanism, work through a clinical case, then create a new version.`:`${analysis[0].id}-блок «${analysis[0].title}» (${analysis[0].pct}%) бойынша механизмді қайталап, клиникалық жағдайды талдап, содан кейін жаңа нұсқаны орындаңыз.`):""}</p>
    </div>
    <button onClick={begin} style={{padding:"10px 16px",borderRadius:10,cursor:"pointer"}}>{t.restart}</button>
   </div>
   <h2 style={{marginTop:30}}>{t.review}</h2>
   {version.map((q,i)=>{const a=answers[q.id]; const ok=a===q.correctAnswer; const find=(id:string)=>q.options.find(o=>o.id===id)?.text;
    return <article id={`exam-${q.id}`} key={q.id} style={{border:"1px solid #ccd9e3",borderRadius:14,padding:18,margin:"14px 0",overflowWrap:"anywhere",minWidth:0}}>
      <div style={{fontSize:14,opacity:.75}}>{t.question} {i+1} · {t.module} {q.moduleId}: {q.moduleTitle}{q.taskType==="situation"?` · ${t.situation}`:""}</div>
      <h3>{q.prompt}</h3>
      {q.responseType==="written"?<>
        <p><strong>{t.your}:</strong> {written[q.id]||t.unanswered}</p>
        <p><strong>{t.right}:</strong> {q.options.find(o=>o.id===q.correctAnswer)?.text}</p>
        <p>{q.explanation}</p>
        {(()=>{const g=writtenGrades[q.id];return <div style={{borderLeft:"4px solid #86aac4",paddingLeft:12}}>
          <p><strong>{lang==="RU"?"Локальная оценка":lang==="EN"?"Local rubric score":"Жергілікті бағалау"}:</strong> {g?.points??0}/10</p>
          <p>{lang==="RU"?(g?.physiologicalElement?"✓ Назван главный физиологический процесс или элемент.":"✗ Назовите главный процесс или элемент."):(lang==="EN"?(g?.physiologicalElement?"✓ Relevant physiological element identified.":"✗ Identify the key physiological element."):(g?.physiologicalElement?"✓ Негізгі физиологиялық элемент көрсетілген.":"✗ Негізгі физиологиялық элементті көрсетіңіз."))}</p>
          <p>{lang==="RU"?(g?.causalDirection?"✓ Объяснено, почему произошло изменение.":"✗ Добавьте, почему произошло изменение."):(lang==="EN"?(g?.causalDirection?"✓ Causal relationship is stated.":"✗ State the causal relationship more clearly."):(g?.causalDirection?"✓ Себеп-салдар байланысы көрсетілген.":"✗ Себеп-салдар байланысын анығырақ көрсетіңіз."))}</p>
          <p>{lang==="RU"?(g?.mechanism?"✓ Показано, что происходит в системе.":"✗ Объясните, что происходит в системе."):(lang==="EN"?(g?.mechanism?"✓ Mechanism explained.":"✗ Explain the physiological mechanism."):(g?.mechanism?"✓ Механизм түсіндірілген.":"✗ Физиологиялық механизмді түсіндіріңіз."))}</p>
          <p>{lang==="RU"?(g?.interpretation?"✓ Указано, к какому результату это приводит.":"✗ Добавьте, к какому результату это приводит."):(lang==="EN"?(g?.interpretation?"✓ Expected result/consequence stated.":"✗ Add the expected result or consequence."):(g?.interpretation?"✓ Күтілетін нәтиже/салдар көрсетілген.":"✗ Күтілетін нәтиже немесе салдарды қосыңыз."))}</p>
          <p>{lang==="RU"?"Проверка выполнена локальной рубрикой без ИИ/API; преподаватель может пересмотреть балл.":lang==="EN"?"Checked by a local rubric without AI/API; the teacher may review the score.":"AI/API қолданбай жергілікті рубрикамен тексерілді; оқытушы балды қайта қарай алады."}</p>
        </div>})()}
      </>:q.responseType==="sequence"?(()=>{
        const aseq=sequences[q.id]??[];
        const seqOk=q.correctOrder?.length===aseq.length&&q.correctOrder.every((id,idx)=>aseq[idx]===id);
        const label=(id:string)=>q.sequenceItems?.find(x=>x.id===id)?.text??id;
        return <div>
          <p><strong>{t.your}:</strong> <span style={{color:seqOk?"green":"crimson",fontWeight:800}}>{seqOk?"✓":"✗"} {aseq.map((id,idx)=>`${idx+1}. ${label(id)}`).join(" → ")||t.unanswered}</span></p>
          {!seqOk&&<p><strong>{t.right}:</strong> <span style={{color:"green",fontWeight:800}}>✓ {(q.correctOrder??[]).map((id,idx)=>`${idx+1}. ${label(id)}`).join(" → ")}</span></p>}
          <p>{q.explanation}</p>
        </div>
      })():<>
        <p><strong>{t.your}:</strong> <span style={{color:ok?"green":"crimson",fontWeight:800}}>{ok?"✓":"✗"} {a?find(a):t.unanswered}</span></p>
        {!ok&&<p><strong>{t.right}:</strong> <span style={{color:"green",fontWeight:800}}>✓ {find(q.correctAnswer)}</span></p>}
        <p>{q.explanation}</p>
      </>}
    </article>})}
 </section>;
 return <section style={{marginTop:24}}>
   {hydrated&&restored&&<p role="status" style={{fontWeight:700,color:"#49697c"}}>{t.resume}</p>}
   <div style={{position:"sticky",top:0,zIndex:2,background:"white",border:"1px solid #ccd9e3",borderRadius:12,padding:12,marginBottom:18}}>
    <strong>{t.answered}: {version.filter(q=>q.responseType==="written"?Boolean(written[q.id]?.trim()):q.responseType==="sequence"?(sequences[q.id]?.length??0)===(q.sequenceItems?.length??0):Boolean(answers[q.id])).length}/{version.length}</strong>
    {firstMissing&&<button type="button" onClick={()=>document.getElementById(`exam-${firstMissing.id}`)?.scrollIntoView({behavior:"smooth",block:"center"})} style={{marginLeft:12,padding:"7px 10px",borderRadius:8,cursor:"pointer"}}>{t.jump}</button>}
   </div>
   {version.map((q,i)=><article id={`exam-${q.id}`} key={q.id} style={{border:"1px solid #ccd9e3",borderRadius:14,padding:18,margin:"14px 0"}}>
    <div style={{fontSize:14,opacity:.75}}>{t.question} {i+1} {t.of} {version.length} · {t.module} {q.moduleId}: {q.moduleTitle}{q.taskType==="situation"?` · ${t.situation}`:""}</div>
    <h3>{q.prompt}</h3>
    {q.responseType==="written"?<><p><strong>{lang==="RU"?"Письменный ответ: напишите простыми шагами — что изменилось, почему и что получилось.":lang==="EN"?"Written answer: explain in simple steps — what changed, why, and what happened.":"Жазбаша жауап: қарапайым қадамдармен жазыңыз — не өзгерді, неліктен және не болды."}</strong></p><textarea aria-label={lang==="RU"?`Письменный ответ на вопрос ${i+1}`:lang==="EN"?`Written answer to question ${i+1}`:`${i+1}-сұраққа жазбаша жауап`} rows={7} value={written[q.id]??""} onChange={e=>setWritten(v=>({...v,[q.id]:e.target.value}))} style={{width:"100%",maxWidth:"100%",boxSizing:"border-box",padding:12,borderRadius:10,resize:"vertical"}} /></>:q.responseType==="sequence"?<div>
      <p><strong>{t.sequence}</strong></p>
      <div style={{minHeight:54,padding:10,border:"1px dashed #9fb7c5",borderRadius:10,display:"flex",gap:8,flexWrap:"wrap"}}>
        {(sequences[q.id]??[]).map((id,idx)=>{const item=q.sequenceItems?.find(x=>x.id===id);return <span key={id} style={{padding:"7px 9px",background:"#eef6fa",borderRadius:9}}>{idx+1}. {item?.text}</span>})}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
        {(q.sequenceItems??[]).filter(x=>!(sequences[q.id]??[]).includes(x.id)).map(item=><button key={item.id} type="button" onClick={()=>setSequences(v=>({...v,[q.id]:[...(v[q.id]??[]),item.id]}))}>{item.text}</button>)}
      </div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <button type="button" disabled={!(sequences[q.id]?.length)} onClick={()=>setSequences(v=>({...v,[q.id]:(v[q.id]??[]).slice(0,-1)}))}>{t.undo}</button>
        <button type="button" disabled={!(sequences[q.id]?.length)} onClick={()=>setSequences(v=>({...v,[q.id]:[]}))}>{t.reset}</button>
      </div>
    </div>:q.options.map(o=><label key={o.id} style={{display:"block",padding:"9px 0",cursor:"pointer"}}>
      <input type="radio" name={q.id} checked={answers[q.id]===o.id} onChange={()=>setAnswers(v=>({...v,[q.id]:o.id}))}/> <span style={{marginLeft:8}}>{o.text}</span>
    </label>)}
   </article>)}
   {warning&&<p role="alert" style={{fontWeight:700}}>{warning}</p>}
   <button onClick={finishAttempt} style={{padding:"12px 18px",borderRadius:10,cursor:"pointer",fontWeight:700}}>{t.submit}</button>
 </section>;
}
