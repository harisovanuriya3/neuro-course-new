"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { modules, type Language } from "../content/course";
import { readCourseProgress, recordVisit, type CourseProgressData } from "../lib/courseProgress";
import styles from "./VirtualPatient.module.css";

type Level="review"|"forming"|"mastered"|"none";
const C={
 RU:{title:"Прогресс и оценивание",scope:"Обзор 25 модулей",visited:"Посещено модулей",criteria:"Критерии освоения",module:"Модуль",sections:"Открыто разделов",start:"Открыть модуль",saved:"Данные сохраняются локально в этом браузере. Входной блиц — диагностический и не влияет на уровень освоения.",none:"Нет данных",review:"Требует повторения",forming:"Формируется",mastered:"Освоено",concept:"Понимает основные понятия",mechanism:"Может объяснить, как это работает",interpret:"Может применить знание к задаче",transfer:"Может применить знание в новой ситуации",justification:"Может объяснить, почему сделал такой вывод",clinical:"Понимает клиническую ситуацию и выбирает решение",correction:"Замечает и исправляет свои ошибки",assessment:"Формирующее оценивание",exam:"Экзаменационный результат учитывается отдельно.",teacher:"Что студент уже умеет",next:"Рекомендация",strong:"Студент готов переходить к следующему модулю.",mid:"Закрепить критерии со статусом «Формируется» и повторить слабые задания.",low:"Сначала повторить критерии со статусом «Требует повторения», затем снова выполнить тесты и кейсы.",evidence:"Уровень освоения строится по результатам, а выполнение практики и контрольных вопросов показывается отдельно как доказательство учебной работы.",work:"Доказательства учебной работы",practice:"Практика",questions:"Контрольные вопросы",patient:"Виртуальный пациент",tests:"Тесты",cases:"Кейсы"},
 EN:{title:"Progress and Assessment",scope:"25-module overview",visited:"Modules visited",criteria:"Mastery criteria",module:"Module",sections:"Sections opened",start:"Open module",saved:"Data is stored locally in this browser. The entry quiz is diagnostic and does not affect mastery.",none:"No data",review:"Needs review",forming:"Developing",mastered:"Mastered",concept:"Understands the key concepts",mechanism:"Can explain how it works",interpret:"Can use the knowledge in a task",transfer:"Can use the knowledge in a new situation",justification:"Can explain why the conclusion was made",clinical:"Understands a clinical situation and chooses a response",correction:"Notices and corrects mistakes",assessment:"Formative assessment",exam:"Exam results are reported separately.",teacher:"What the student can do",next:"Recommendation",strong:"The student is ready to move to the next module.",mid:"Consolidate criteria marked Developing and retry weak tasks.",low:"Review criteria marked Needs review, then repeat tests and cases.",evidence:"Mastery uses performance evidence; practice and review-question completion are shown separately as evidence of learning activity.",work:"Evidence of learning activity",practice:"Practice",questions:"Review questions",patient:"Virtual patient",tests:"Tests",cases:"Cases"},
 KZ:{title:"Прогресс және бағалау",scope:"25 модуль бойынша шолу",visited:"Қаралған модульдер",criteria:"Меңгеру критерийлері",module:"Модуль",sections:"Ашылған бөлімдер",start:"Модульді ашу",saved:"Деректер осы браузерде жергілікті сақталады. Кіріспе блиц диагностикалық және меңгеру деңгейіне әсер етпейді.",none:"Дерек жоқ",review:"Қайталау қажет",forming:"Қалыптасуда",mastered:"Меңгерілді",concept:"Негізгі ұғымдарды білу",mechanism:"Физиологиялық тетікті түсіну",interpret:"Қолдану және түсіндіру",transfer:"Тетікті жаңа жағдайға көшіру",justification:"Қорытындыны негіздеу",clinical:"Жағдаяттық және клиникалық есептерді шешу",correction:"Қателерді өздігінен түзету",assessment:"Қалыптастырушы бағалау",exam:"Емтихан нәтижесі бөлек есептеледі.",teacher:"Меңгеру профилі",next:"Ұсыныс",strong:"Студент келесі модульге өтуге дайын.",mid:"«Қалыптасуда» критерийлерін бекітіп, әлсіз тапсырмаларды қайталау керек.",low:"Алдымен «Қайталау қажет» критерийлерін қайталап, содан кейін тесттер мен кейстерді қайта орындау керек.",evidence:"Меңгеру деңгейі нәтижелер бойынша құрылады, ал практика мен бақылау сұрақтарының орындалуы оқу жұмысының дәлелі ретінде бөлек көрсетіледі.",work:"Оқу жұмысының дәлелдері",practice:"Практика",questions:"Бақылау сұрақтары",patient:"Виртуалды пациент",tests:"Тесттер",cases:"Кейстер"}
} as const;
function level(correct:number,total:number):Level{if(!total)return"none";const p=correct/total;return p>=.8?"mastered":p>=.5?"forming":"review"}
export default function ModuleProgress({language,moduleId}:{language:Language;moduleId:number}){
 const [data,setData]=useState<CourseProgressData|null>(null);
 useEffect(()=>{recordVisit(moduleId,"progress");setData(readCourseProgress())},[moduleId]);
 const c=C[language], outcomes=data?.outcomes??{};
 const visitedSections=data?.visitedSections[moduleId]??[];
 const coreSections=["objectives","pretest","theory","one-minute","clinical","interactive","practice","cases","tests","questions","virtual-patient"] as const;
 const coreVisited=coreSections.filter(section=>visitedSections.includes(section)).length;
 const supportVisited=visitedSections.length-coreVisited;
 const currentPercent=Math.round((coreVisited/coreSections.length)*100);
 const test=outcomes[`${moduleId}:tests`], cases=outcomes[`${moduleId}:cases`], practice=outcomes[`${moduleId}:practice`], questions=outcomes[`${moduleId}:questions`], patient=outcomes[`${moduleId}:virtual-patient`];
 const combined=(items:({correct:number;total:number}|undefined)[])=>{const x=items.filter(Boolean) as {correct:number;total:number}[];return {correct:x.reduce((a,b)=>a+b.correct,0),total:x.reduce((a,b)=>a+b.total,0)}};
 const tc=combined([test,cases]), tOnly=combined([test]), cOnly=combined([cases]);
 const criterion=(name:string)=>{
   const prefix=`${moduleId}:criterion:${name}`;
   const values=Object.entries(outcomes).filter(([key])=>key===prefix||key.startsWith(prefix+":")).map(([,value])=>value);
   if(!values.length)return undefined;
   return {correct:values.reduce((sum,value)=>sum+value.correct,0),total:values.reduce((sum,value)=>sum+value.total,0)};
 };
 const rows:[string,Level][]=[
  [c.concept,level(criterion("concept")?.correct??0,criterion("concept")?.total??0)],
  [c.mechanism,level(criterion("mechanism")?.correct??tc.correct,criterion("mechanism")?.total??tc.total)],
  [c.interpret,level(criterion("application")?.correct??tOnly.correct,criterion("application")?.total??tOnly.total)],
  [c.transfer,level(criterion("transfer")?.correct??0,criterion("transfer")?.total??0)],
  [c.justification,level(criterion("justification")?.correct??0,criterion("justification")?.total??0)],
  [c.clinical,level(criterion("clinical")?.correct??0,criterion("clinical")?.total??0)],
  [c.correction,level(criterion("correction")?.correct??0,criterion("correction")?.total??0)]
 ];
 const label=(x:Level)=>x==="mastered"?c.mastered:x==="forming"?c.forming:x==="review"?c.review:c.none;
 const available=rows.filter(([,l])=>l!=="none");
 const masteredCount=available.filter(([,l])=>l==="mastered").length;
 const reviewCount=available.filter(([,l])=>l==="review").length;
 const overallPercent=available.length?Math.round((available.reduce((sum,[,l])=>sum+(l==="mastered"?1:l==="forming"?0.5:0),0)/available.length)*100):0;
 const recommendation=available.length===0?c.none:reviewCount>0?c.low:masteredCount===available.length?c.strong:c.mid;
 return <section className={styles.patient}>
  <h1>{c.title}</h1><p>{c.scope}. {c.saved}</p>
  <div className={styles.summary}>
    <p>{c.visited}: <strong>{data?.visitedModules.length??0} / {modules[language].length}</strong></p>
    <progress aria-label={c.visited} value={data?.visitedModules.length??0} max={modules[language].length}/>
    <p>{language==="RU"?"Основной маршрут":language==="KZ"?"Негізгі маршрут":"Core learning path"}: <strong>{coreVisited}/{coreSections.length} · {currentPercent}%</strong></p>
    <progress aria-label="core module progress" value={coreVisited} max={coreSections.length}/>
    <p>{language==="RU"?"Дополнительные разделы":language==="KZ"?"Қосымша бөлімдер":"Additional sections"}: <strong>{supportVisited}/6</strong></p>
  </div>
  <h2>{c.assessment} · {c.module} {moduleId}</h2>
  <p>{c.exam}</p>
  <section style={{margin:"16px 0 20px",padding:"16px",border:"1px solid #d6e3eb",borderRadius:14,background:"#f8fcff"}}>
    <h3 style={{margin:"0 0 8px"}}>{c.teacher}</h3>
    <p style={{margin:"0 0 8px"}}><strong>{overallPercent}%</strong> · {available.length ? (reviewCount>0?c.review:masteredCount===available.length?c.mastered:c.forming) : c.none}</p>
    <progress value={overallPercent} max={100} aria-label={c.teacher} style={{width:"100%"}} />
    <p style={{margin:"10px 0 4px"}}><strong>{c.next}:</strong> {recommendation}</p>
    <p style={{margin:0,fontSize:"13px",color:"#607b8d"}}>{c.evidence}</p>
  </section>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{rows.map(([name,l])=><tr key={name}><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #dce8ef"}}>{name}</th><td style={{padding:"10px",borderBottom:"1px solid #dce8ef",fontWeight:700}}>{label(l)}</td></tr>)}</tbody></table></div>
  <h3 style={{marginTop:22}}>{c.work}</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:10}}>
    {[[c.practice,practice],[c.questions,questions],[c.tests,test],[c.cases,cases],[c.patient,patient]].map(([name,value])=><div key={String(name)} style={{padding:"12px",border:"1px solid #dce8ef",borderRadius:10,background:"#fff"}}><strong>{String(name)}</strong><p style={{margin:"5px 0 0"}}>{value && typeof value==="object" ? `${value.correct}/${value.total} · ${Math.round(value.correct/value.total*100)}%` : c.none}</p></div>)}
  </div>
  <h2 style={{marginTop:28}}>{c.criteria}</h2>
  <div className={styles.courseModules}>{modules[language].map((title,index)=>{const id=index+1,count=data?.visitedSections[id]?.length??0;return <div key={id}><h3>{c.module} {id}: {title}</h3><p>{c.sections}: {count}</p><Link href={`/modules/${id}?lang=${language}`}>{c.start}</Link></div>})}</div>
 </section>
}