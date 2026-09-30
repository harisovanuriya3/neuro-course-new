"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { modules, type Language } from "../content/course";
import { readCourseProgress, recordVisit, type CourseProgressData } from "../lib/courseProgress";
import styles from "./VirtualPatient.module.css";

type Level="review"|"forming"|"mastered"|"none";
const C={
 RU:{title:"Прогресс и оценивание",scope:"Обзор 25 модулей",visited:"Посещено модулей",criteria:"Критерии освоения",module:"Модуль",sections:"Открыто разделов",start:"Открыть модуль",saved:"Данные сохраняются локально в этом браузере. Входной блиц — диагностический и не влияет на уровень освоения.",none:"Нет данных",review:"Требует повторения",forming:"Формируется",mastered:"Освоено",mechanism:"Понимание физиологического механизма",causal:"Причинно-следственное объяснение",interpret:"Интерпретация данных, схем и результатов",application:"Применение в новой ситуации",clinical:"Решение ситуационных и клинических задач",correction:"Самостоятельное исправление ошибок",assessment:"Формирующее оценивание",exam:"Экзаменационный результат учитывается отдельно."},
 EN:{title:"Progress and Assessment",scope:"25-module overview",visited:"Modules visited",criteria:"Mastery criteria",module:"Module",sections:"Sections opened",start:"Open module",saved:"Data is stored locally in this browser. The entry quiz is diagnostic and does not affect mastery.",none:"No data",review:"Needs review",forming:"Developing",mastered:"Mastered",mechanism:"Understanding the physiological mechanism",causal:"Cause-and-effect explanation",interpret:"Interpretation of data, diagrams, and results",application:"Application to a new situation",clinical:"Case and clinical problem solving",correction:"Independent error correction",assessment:"Formative assessment",exam:"Exam results are reported separately."},
 KZ:{title:"Прогресс және бағалау",scope:"25 модуль бойынша шолу",visited:"Қаралған модульдер",criteria:"Меңгеру критерийлері",module:"Модуль",sections:"Ашылған бөлімдер",start:"Модульді ашу",saved:"Деректер осы браузерде жергілікті сақталады. Кіріспе блиц диагностикалық және меңгеру деңгейіне әсер етпейді.",none:"Дерек жоқ",review:"Қайталау қажет",forming:"Қалыптасуда",mastered:"Меңгерілді",mechanism:"Физиологиялық тетікті түсіну",causal:"Себеп-салдарлық түсіндіру",interpret:"Деректерді, сызбаларды және нәтижелерді түсіндіру",application:"Жаңа жағдайда білімді қолдану",clinical:"Жағдаяттық және клиникалық есептерді шешу",correction:"Қателерді өздігінен түзету",assessment:"Қалыптастырушы бағалау",exam:"Емтихан нәтижесі бөлек есептеледі."}
} as const;
function level(correct:number,total:number):Level{if(!total)return"none";const p=correct/total;return p>=.8?"mastered":p>=.5?"forming":"review"}
export default function ModuleProgress({language,moduleId}:{language:Language;moduleId:number}){
 const [data,setData]=useState<CourseProgressData|null>(null);
 useEffect(()=>{recordVisit(moduleId,"progress");setData(readCourseProgress())},[moduleId]);
 const c=C[language], outcomes=data?.outcomes??{};
 const test=outcomes[`${moduleId}:tests`], cases=outcomes[`${moduleId}:cases`];
 const combined=(items:({correct:number;total:number}|undefined)[])=>{const x=items.filter(Boolean) as {correct:number;total:number}[];return {correct:x.reduce((a,b)=>a+b.correct,0),total:x.reduce((a,b)=>a+b.total,0)}};
 const tc=combined([test,cases]), tOnly=combined([test]), cOnly=combined([cases]);
 const rows:[string,Level][]=[
  [c.mechanism,level(tc.correct,tc.total)],
  [c.causal,level(tc.correct,tc.total)],
  [c.interpret,level(tOnly.correct,tOnly.total)],
  [c.application,level(cOnly.correct,cOnly.total)],
  [c.clinical,level(cOnly.correct,cOnly.total)],
  [c.correction,level(tOnly.correct,tOnly.total)]
 ];
 const label=(x:Level)=>x==="mastered"?c.mastered:x==="forming"?c.forming:x==="review"?c.review:c.none;
 return <section className={styles.patient}>
  <h1>{c.title}</h1><p>{c.scope}. {c.saved}</p>
  <div className={styles.summary}><p>{c.visited}: <strong>{data?.visitedModules.length??0} / {modules[language].length}</strong></p><progress aria-label={c.visited} value={data?.visitedModules.length??0} max={modules[language].length}/></div>
  <h2>{c.assessment} · {c.module} {moduleId}</h2>
  <p>{c.exam}</p>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{rows.map(([name,l])=><tr key={name}><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #dce8ef"}}>{name}</th><td style={{padding:"10px",borderBottom:"1px solid #dce8ef",fontWeight:700}}>{label(l)}</td></tr>)}</tbody></table></div>
  <h2 style={{marginTop:28}}>{c.criteria}</h2>
  <div className={styles.courseModules}>{modules[language].map((title,index)=>{const id=index+1,count=data?.visitedSections[id]?.length??0;return <div key={id}><h3>{c.module} {id}: {title}</h3><p>{c.sections}: {count}</p><Link href={`/modules/${id}?lang=${language}`}>{c.start}</Link></div>})}</div>
 </section>
}