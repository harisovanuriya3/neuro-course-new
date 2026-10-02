"use client";

import { useMemo, useState } from "react";
import type { Language } from "../content/course";

export type ExamQuestion = {
  id: string;
  moduleId: number;
  moduleTitle: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
};

const ui: Record<Language, Record<string,string>> = {
 RU:{all:"Все 25 блоков",choose:"Выберите блок для экзамена",start:"Начать экзамен",restart:"Новый вариант",submit:"Завершить экзамен",question:"Вопрос",of:"из",module:"Блок",answered:"Отвечено",finishWarn:"Ответьте на все вопросы перед завершением.",result:"Результат",correct:"Правильных ответов",review:"Разбор ответов",your:"Ваш ответ",right:"Правильный ответ",unanswered:"Нет ответа",pass:"Экзамен завершён. Ниже доступен разбор.",bank:"В банке",items:"экзаменационных заданий",format:"В вариант случайно выбираются 50 заданий. Во время попытки правильные ответы и объяснения скрыты."},
 KZ:{all:"Барлық 25 блок",choose:"Емтихан блогын таңдаңыз",start:"Емтиханды бастау",restart:"Жаңа нұсқа",submit:"Емтиханды аяқтау",question:"Сұрақ",of:"ішінен",module:"Блок",answered:"Жауап берілді",finishWarn:"Аяқтау алдында барлық сұраққа жауап беріңіз.",result:"Нәтиже",correct:"Дұрыс жауап",review:"Жауаптарды талдау",your:"Сіздің жауабыңыз",right:"Дұрыс жауап",unanswered:"Жауап жоқ",pass:"Емтихан аяқталды. Төменде талдау берілген.",bank:"Банкте",items:"емтихан тапсырмасы",format:"Нұсқаға кездейсоқ 50 тапсырма таңдалады. Талпыныс кезінде дұрыс жауаптар мен түсіндірмелер жасырын."},
 EN:{all:"All 25 blocks",choose:"Choose an exam block",start:"Start exam",restart:"New version",submit:"Finish exam",question:"Question",of:"of",module:"Block",answered:"Answered",finishWarn:"Answer every question before finishing.",result:"Result",correct:"Correct answers",review:"Answer review",your:"Your answer",right:"Correct answer",unanswered:"No answer",pass:"Exam completed. Review is available below.",bank:"Question bank",items:"exam items",format:"Each version randomly selects 50 items. Correct answers and explanations stay hidden during the attempt."}
};

function shuffled<T>(items:T[]):T[]{
 const a=[...items];
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
}

function buildVersion(bank:ExamQuestion[], count=50){
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
 return shuffled(chosen).slice(0,Math.min(count,bank.length));
}

export default function ExamCenter({lang,bank}:{lang:Language;bank:ExamQuestion[]}){
 const t=ui[lang];
 const [version,setVersion]=useState<ExamQuestion[]|null>(null);
 const [selectedModule,setSelectedModule]=useState<number>(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [finished,setFinished]=useState(false);
 const [warning,setWarning]=useState("");
 const score=useMemo(()=>version?.reduce((n,q)=>n+(answers[q.id]===q.correctAnswer?1:0),0)??0,[version,answers]);
 const begin=()=>{const pool=selectedModule===0?bank:bank.filter(q=>q.moduleId===selectedModule);setVersion(buildVersion(pool,selectedModule===0?50:Math.min(20,pool.length)));setAnswers({});setFinished(false);setWarning("");};
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
    <h2>{t.result}: {score}/{version.length} ({Math.round(score/version.length*100)}%)</h2><p>{t.pass}</p>
    <button onClick={begin} style={{padding:"10px 16px",borderRadius:10,cursor:"pointer"}}>{t.restart}</button>
   </div>
   <h2 style={{marginTop:30}}>{t.review}</h2>
   {version.map((q,i)=>{const a=answers[q.id]; const ok=a===q.correctAnswer; const find=(id:string)=>q.options.find(o=>o.id===id)?.text;
    return <article key={q.id} style={{border:"1px solid #ccd9e3",borderRadius:14,padding:18,margin:"14px 0"}}>
      <div style={{fontSize:14,opacity:.75}}>{t.question} {i+1} · {t.module} {q.moduleId}: {q.moduleTitle}</div>
      <h3>{q.prompt}</h3>
      <p><strong>{t.your}:</strong> {a?find(a):t.unanswered} {ok?"✓":"✗"}</p>
      {!ok&&<p><strong>{t.right}:</strong> {find(q.correctAnswer)}</p>}
      <p>{q.explanation}</p>
    </article>})}
 </section>;
 return <section style={{marginTop:24}}>
   <div style={{position:"sticky",top:0,zIndex:2,background:"white",border:"1px solid #ccd9e3",borderRadius:12,padding:12,marginBottom:18}}>
    <strong>{t.answered}: {Object.keys(answers).length}/{version.length}</strong>
   </div>
   {version.map((q,i)=><article key={q.id} style={{border:"1px solid #ccd9e3",borderRadius:14,padding:18,margin:"14px 0"}}>
    <div style={{fontSize:14,opacity:.75}}>{t.question} {i+1} {t.of} {version.length} · {t.module} {q.moduleId}: {q.moduleTitle}</div>
    <h3>{q.prompt}</h3>
    {q.options.map(o=><label key={o.id} style={{display:"block",padding:"9px 0",cursor:"pointer"}}>
      <input type="radio" name={q.id} checked={answers[q.id]===o.id} onChange={()=>setAnswers(v=>({...v,[q.id]:o.id}))}/> <span style={{marginLeft:8}}>{o.text}</span>
    </label>)}
   </article>)}
   {warning&&<p role="alert" style={{fontWeight:700}}>{warning}</p>}
   <button onClick={()=>{if(Object.keys(answers).length<version.length){setWarning(t.finishWarn);return;}setFinished(true);window.scrollTo({top:0,behavior:"smooth"});}} style={{padding:"12px 18px",borderRadius:10,cursor:"pointer",fontWeight:700}}>{t.submit}</button>
 </section>;
}