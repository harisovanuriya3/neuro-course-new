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
  responseType?: "mcq" | "written";
  writtenPrompt?: string;
};

const ui: Record<Language, Record<string,string>> = {
 RU:{all:"Все 25 блоков",choose:"Выберите блок для экзамена",start:"Начать экзамен",restart:"Новый вариант",submit:"Завершить экзамен",question:"Вопрос",of:"из",module:"Блок",answered:"Отвечено",finishWarn:"Есть неотвеченные вопросы. Возвращаю к первому пропущенному.",result:"Результат",correct:"Правильных ответов",review:"Разбор ответов",your:"Ваш ответ",right:"Правильный ответ",unanswered:"Нет ответа",pass:"Экзамен завершён. Ниже доступен разбор.",bank:"В банке",items:"экзаменационных заданий",format:"В вариант случайно выбираются 10 заданий: 7 тестовых и 3 письменных. Правильные ответы и объяснения скрыты до завершения."},
 KZ:{all:"Барлық 25 блок",choose:"Емтихан блогын таңдаңыз",start:"Емтиханды бастау",restart:"Жаңа нұсқа",submit:"Емтиханды аяқтау",question:"Сұрақ",of:"ішінен",module:"Блок",answered:"Жауап берілді",finishWarn:"Жауап берілмеген сұрақтар бар. Бірінші өткізіп алған сұраққа қайтарамын.",result:"Нәтиже",correct:"Дұрыс жауап",review:"Жауаптарды талдау",your:"Сіздің жауабыңыз",right:"Дұрыс жауап",unanswered:"Жауап жоқ",pass:"Емтихан аяқталды. Төменде талдау берілген.",bank:"Банкте",items:"емтихан тапсырмасы",format:"Нұсқаға кездейсоқ 10 тапсырма таңдалады: 7 тест және 3 жазбаша. Дұрыс жауаптар мен түсіндірмелер аяқталғанға дейін жасырын."},
 EN:{all:"All 25 blocks",choose:"Choose an exam block",start:"Start exam",restart:"New version",submit:"Finish exam",question:"Question",of:"of",module:"Block",answered:"Answered",finishWarn:"Some questions are unanswered. Returning to the first unanswered question.",result:"Result",correct:"Correct answers",review:"Answer review",your:"Your answer",right:"Correct answer",unanswered:"No answer",pass:"Exam completed. Review is available below.",bank:"Question bank",items:"exam items",format:"Each version randomly selects 10 items: 7 multiple-choice and 3 written. Correct answers and explanations stay hidden until completion."}
};

function shuffled<T>(items:T[]):T[]{
 const a=[...items];
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
}

function buildVersion(bank:ExamQuestion[], count=10){
 const byModule=new Map<number,ExamQuestion[]>();
 bank.forEach(q=>byModule.set(q.moduleId,[...(byModule.get(q.moduleId)??[]),q]));
 const chosen:ExamQuestion[]=[];
 [...byModule.keys()].sort((a,b)=>a-b).forEach(id=>{
   const pool=shuffled(byModule.get(id)??[]);
   if(pool[0]) chosen.push(pool[0]);
 });
 const used=new Set(chosen.map(q=>q.id));
 const rest=shuffled(bank.filter(q=>!used.has(q.id)));
 chosen.push(...rest.slice(0,Math.max(0,count-chosen.length)));
 const picked=shuffled(chosen).slice(0,Math.min(count,bank.length)).map(q=>{const opts=shuffled(q.options);return {...q,options:opts,responseType:"mcq" as const};});
 return picked.map((q,i):ExamQuestion=>({...q,responseType:i>=Math.max(0,picked.length-3)?"written":"mcq"}));
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
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [written,setWritten]=useState<Record<string,string>>({});
 const [finished,setFinished]=useState(false);
 const [warning,setWarning]=useState("");
 const score=useMemo(()=>version?.reduce((n,q)=>n+(q.responseType!=="written"&&answers[q.id]===q.correctAnswer?1:0),0)??0,[version,answers]);
 const mcqCount=version?.filter(q=>q.responseType!=="written").length??0;
 const writtenGrades=useMemo(()=>Object.fromEntries((version??[]).filter(q=>q.responseType==="written").map(q=>[q.id,gradeWritten(q,written[q.id]??"")])),[version,written]);
 const writtenPoints=Object.values(writtenGrades).reduce((n,g)=>n+g.points,0);
 const percent=version?Math.min(100,score*10+writtenPoints):0;
 const comment=lang==="RU"?(percent>=90?"Отличное владение материалом. Ошибки единичны.":percent>=75?"Хороший результат. Повторите блоки с ошибками.":percent>=60?"Базовый уровень достигнут, но есть темы для повторения.":"Необходимо повторить основные механизмы и причинно-следственные связи."):lang==="EN"?(percent>=90?"Excellent command of the material. Errors are isolated.":percent>=75?"Good result. Review the blocks with errors.":percent>=60?"Basic level achieved, but some topics need review.":"Review the core mechanisms and causal relationships."):percent>=90?"Материалды өте жақсы меңгерген. Қателер аз.":percent>=75?"Жақсы нәтиже. Қате жіберілген блоктарды қайталаңыз.":percent>=60?"Негізгі деңгейге жетті, бірақ кейбір тақырыптарды қайталау керек.":"Негізгі механизмдер мен себеп-салдар байланыстарын қайталау қажет.";
 const analysis=useMemo(()=>{if(!version)return [];const m=new Map<number,{title:string,total:number,earned:number}>();version.forEach(q=>{const x=m.get(q.moduleId)??{title:q.moduleTitle,total:0,earned:0};x.total+=10;if(q.responseType==="written"){x.earned+=writtenGrades[q.id]?.points??0;}else if(answers[q.id]===q.correctAnswer){x.earned+=10;}m.set(q.moduleId,x)});return [...m.entries()].map(([id,x])=>({id,...x,pct:Math.round(x.earned/x.total*100)})).sort((a,b)=>a.pct-b.pct);},[version,answers,writtenGrades]);
 useEffect(()=>{if(!finished)return;history.pushState({examFinished:true},"",location.href);const lock=()=>history.pushState({examFinished:true},"",location.href);addEventListener("popstate",lock);return()=>removeEventListener("popstate",lock);},[finished]);
 const begin=()=>{const pool=selectedModule===0?bank:bank.filter(q=>q.moduleId===selectedModule);setVersion(buildVersion(pool,Math.min(10,pool.length)));setAnswers({});setWritten({});setFinished(false);setWarning("");};
 if(!version) return <section style={{marginTop:24,border:"2px solid #86aac4",borderRadius:16,padding:22}}>
   <p><strong>{t.bank}: {bank.length} {t.items}.</strong></p><p>{t.format}</p>
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
    <p><strong>{lang==="RU"?"Оценка":lang==="EN"?"Grade":"Баға"}: {percent}/100</strong></p>
    <p>{comment}</p>
    <h3>{lang==="RU"?"Анализ по блокам":lang==="EN"?"Analysis by block":"Блоктар бойынша талдау"}</h3>
    {analysis.map(x=><p key={x.id}><strong>{x.id}. {x.title}</strong>: {x.earned}/{x.total} ({x.pct}%)</p>)}
    <p>{t.pass}</p>
    <button onClick={begin} style={{padding:"10px 16px",borderRadius:10,cursor:"pointer"}}>{t.restart}</button>
   </div>
   <h2 style={{marginTop:30}}>{t.review}</h2>
   {version.map((q,i)=>{const a=answers[q.id]; const ok=a===q.correctAnswer; const find=(id:string)=>q.options.find(o=>o.id===id)?.text;
    return <article id={`exam-${q.id}`} key={q.id} style={{border:"1px solid #ccd9e3",borderRadius:14,padding:18,margin:"14px 0"}}>
      <div style={{fontSize:14,opacity:.75}}>{t.question} {i+1} · {t.module} {q.moduleId}: {q.moduleTitle}</div>
      <h3>{q.prompt}</h3>
      {q.responseType==="written"?<>
        <p><strong>{t.your}:</strong> {written[q.id]||t.unanswered}</p>
        {(()=>{const g=writtenGrades[q.id];return <div style={{borderLeft:"4px solid #86aac4",paddingLeft:12}}>
          <p><strong>{lang==="RU"?"Локальная оценка":lang==="EN"?"Local rubric score":"Жергілікті бағалау"}:</strong> {g?.points??0}/10</p>
          <p>{lang==="RU"?(g?.connectors?"✓ Причинно-следственная связь обозначена.":"✗ Нужно яснее показать причинно-следственную связь."):(lang==="EN"?(g?.connectors?"✓ Causal relationship is stated.":"✗ State the causal relationship more clearly."):(g?.connectors?"✓ Себеп-салдар байланысы көрсетілген.":"✗ Себеп-салдар байланысын анығырақ көрсетіңіз."))}</p>
          <p>{lang==="RU"?"Проверка выполнена локальной рубрикой без ИИ/API; преподаватель может пересмотреть балл.":lang==="EN"?"Checked by a local rubric without AI/API; the teacher may review the score.":"AI/API қолданбай жергілікті рубрикамен тексерілді; оқытушы балды қайта қарай алады."}</p>
        </div>})()}
      </>:<>
        <p><strong>{t.your}:</strong> <span style={{color:ok?"green":"crimson",fontWeight:800}}>{ok?"✓":"✗"} {a?find(a):t.unanswered}</span></p>
        {!ok&&<p><strong>{t.right}:</strong> <span style={{color:"green",fontWeight:800}}>✓ {find(q.correctAnswer)}</span></p>}
        <p>{q.explanation}</p>
      </>}
    </article>})}
 </section>;
 return <section style={{marginTop:24}}>
   <div style={{position:"sticky",top:0,zIndex:2,background:"white",border:"1px solid #ccd9e3",borderRadius:12,padding:12,marginBottom:18}}>
    <strong>{t.answered}: {version.filter(q=>q.responseType==="written"?Boolean(written[q.id]?.trim()):Boolean(answers[q.id])).length}/{version.length}</strong>
   </div>
   {version.map((q,i)=><article id={`exam-${q.id}`} key={q.id} style={{border:"1px solid #ccd9e3",borderRadius:14,padding:18,margin:"14px 0"}}>
    <div style={{fontSize:14,opacity:.75}}>{t.question} {i+1} {t.of} {version.length} · {t.module} {q.moduleId}: {q.moduleTitle}</div>
    <h3>{q.prompt}</h3>
    {q.responseType==="written"?<><p><strong>{lang==="RU"?"Письменный ответ: объясните причину, механизм и следствие.":lang==="EN"?"Written answer: explain the cause, mechanism, and consequence.":"Жазбаша жауап: себеп, механизм және салдарды түсіндіріңіз."}</strong></p><textarea rows={7} value={written[q.id]??""} onChange={e=>setWritten(v=>({...v,[q.id]:e.target.value}))} style={{width:"100%",padding:12,borderRadius:10}} /></>:q.options.map(o=><label key={o.id} style={{display:"block",padding:"9px 0",cursor:"pointer"}}>
      <input type="radio" name={q.id} checked={answers[q.id]===o.id} onChange={()=>setAnswers(v=>({...v,[q.id]:o.id}))}/> <span style={{marginLeft:8}}>{o.text}</span>
    </label>)}
   </article>)}
   {warning&&<p role="alert" style={{fontWeight:700}}>{warning}</p>}
   <button onClick={()=>{const missing=version.find(q=>q.responseType==="written"?!written[q.id]?.trim():!answers[q.id]);if(missing){setWarning(t.finishWarn);document.getElementById(`exam-${missing.id}`)?.scrollIntoView({behavior:"smooth",block:"center"});return;}setFinished(true);window.scrollTo({top:0,behavior:"smooth"});}} style={{padding:"12px 18px",borderRadius:10,cursor:"pointer",fontWeight:700}}>{t.submit}</button>
 </section>;
}