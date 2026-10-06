"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { modules, type Language } from "../content/course";
import { readCourseProgress, recordVisit, type CourseProgressData } from "../lib/courseProgress";
import styles from "./VirtualPatient.module.css";

type Level="review"|"forming"|"mastered"|"none";
const C={
 RU:{title:"Прогресс и оценивание",scope:"Обзор 25 модулей",visited:"Посещено модулей",criteria:"Критерии освоения",module:"Модуль",sections:"Открыто разделов",start:"Открыть модуль",saved:"Данные сохраняются локально в этом браузере. Входной блиц — диагностический и не влияет на уровень освоения.",none:"Нет данных",review:"Требует повторения",forming:"Формируется",mastered:"Освоено",concept:"Знание ключевых понятий",mechanism:"Понимание физиологического механизма",interpret:"Применение и интерпретация",transfer:"Перенос механизма в новую ситуацию",justification:"Обоснование вывода",clinical:"Решение ситуационных и клинических задач",correction:"Самостоятельное исправление ошибок",assessment:"Формирующее оценивание",exam:"Экзаменационный результат учитывается отдельно."},
 EN:{title:"Progress and Assessment",scope:"25-module overview",visited:"Modules visited",criteria:"Mastery criteria",module:"Module",sections:"Sections opened",start:"Open module",saved:"Data is stored locally in this browser. The entry quiz is diagnostic and does not affect mastery.",none:"No data",review:"Needs review",forming:"Developing",mastered:"Mastered",concept:"Knowledge of key concepts",mechanism:"Understanding the physiological mechanism",interpret:"Application and interpretation",transfer:"Mechanism transfer to a new situation",justification:"Justification of conclusion",clinical:"Case and clinical problem solving",correction:"Independent error correction",assessment:"Formative assessment",exam:"Exam results are reported separately."},
 KZ:{title:"Прогресс және бағалау",scope:"25 модуль бойынша шолу",visited:"Қаралған модульдер",criteria:"Меңгеру критерийлері",module:"Модуль",sections:"Ашылған бөлімдер",start:"Модульді ашу",saved:"Деректер осы браузерде жергілікті сақталады. Кіріспе блиц диагностикалық және меңгеру деңгейіне әсер етпейді.",none:"Дерек жоқ",review:"Қайталау қажет",forming:"Қалыптасуда",mastered:"Меңгерілді",concept:"Негізгі ұғымдарды білу",mechanism:"Физиологиялық тетікті түсіну",interpret:"Қолдану және түсіндіру",transfer:"Тетікті жаңа жағдайға көшіру",justification:"Қорытындыны негіздеу",clinical:"Жағдаяттық және клиникалық есептерді шешу",correction:"Қателерді өздігінен түзету",assessment:"Қалыптастырушы бағалау",exam:"Емтихан нәтижесі бөлек есептеледі."}
} as const;
function level(correct:number,total:number):Level{if(!total)return"none";const p=correct/total;return p>=.8?"mastered":p>=.5?"forming":"review"}
export default function ModuleProgress({language,moduleId}:{language:Language;moduleId:number}){
 const [data,setData]=useState<CourseProgressData|null>(null);
 useEffect(()=>{recordVisit(moduleId,"progress");setData(readCourseProgress())},[moduleId]);
 const c=C[language], outcomes=data?.outcomes??{};
 const currentVisited=data?.visitedSections[moduleId]?.length??0;
 const currentPercent=Math.round((currentVisited/17)*100);
 const test=outcomes[`${moduleId}:tests`], cases=outcomes[`${moduleId}:cases`];
 const combined=(items:({correct:number;total:number}|undefined)[])=>{const x=items.filter(Boolean) as {correct:number;total:number}[];return {correct:x.reduce((a,b)=>a+b.correct,0),total:x.reduce((a,b)=>a+b.total,0)}};
 const tc=combined([test,cases]), tOnly=combined([test]), cOnly=combined([cases]);
 const criterion=(name:string)=>outcomes[`${moduleId}:criterion:${name}`];
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
 return <section className={styles.patient}>
  <h1>{c.title}</h1><p>{c.scope}. {c.saved}</p>
  <div className={styles.summary}><p>{c.visited}: <strong>{data?.visitedModules.length??0} / {modules[language].length}</strong></p><progress aria-label={c.visited} value={data?.visitedModules.length??0} max={modules[language].length}/><p>{language==="RU"?"Текущий модуль":language==="KZ"?"Ағымдағы модуль":"Current module"}: <strong>{currentVisited}/17 · {currentPercent}%</strong></p><progress aria-label="module progress" value={currentVisited} max={17}/></div>
  <h2>{c.assessment} · {c.module} {moduleId}</h2>
  <p>{c.exam}</p>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{rows.map(([name,l])=><tr key={name}><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #dce8ef"}}>{name}</th><td style={{padding:"10px",borderBottom:"1px solid #dce8ef",fontWeight:700}}>{label(l)}</td></tr>)}</tbody></table></div>
  <h2 style={{marginTop:28}}>{c.criteria}</h2>
  <div className={styles.courseModules}>{modules[language].map((title,index)=>{const id=index+1,count=data?.visitedSections[id]?.length??0;return <div key={id}><h3>{c.module} {id}: {title}</h3><p>{c.sections}: {count}</p><Link href={`/modules/${id}?lang=${language}`}>{c.start}</Link></div>})}</div>
 </section>
}