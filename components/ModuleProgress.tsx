"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { modules, type Language } from "../content/course";
import { readCourseProgress, recordVisit, type CourseProgressData } from "../lib/courseProgress";
import styles from "./VirtualPatient.module.css";

type Level="review"|"forming"|"mastered"|"none";
const C={
 RU:{title:"Прогресс: что уже получается",scope:"Обзор 25 модулей",visited:"Посещено модулей",criteria:"Что студент уже умеет",module:"Модуль",sections:"Открыто разделов",start:"Открыть модуль",saved:"Данные сохраняются локально в этом браузере. Входной блиц — диагностический и не влияет на уровень освоения.",none:"Нет данных",review:"Требует повторения",forming:"Формируется",mastered:"Освоено",concept:"Понимает основные понятия",mechanism:"Может объяснить, как это работает",interpret:"Может применить знание к задаче",transfer:"Может применить знание в новой ситуации",justification:"Может объяснить, почему сделал такой вывод",clinical:"Понимает клиническую ситуацию и выбирает решение",correction:"Замечает и исправляет свои ошибки",assessment:"Результат обучения",exam:"Экзаменационный результат учитывается отдельно.",teacher:"Что студент уже умеет",next:"Рекомендация",strong:"Студент готов переходить к следующему модулю.",mid:"Закрепить критерии со статусом «Формируется» и повторить слабые задания.",low:"Сначала повторить критерии со статусом «Требует повторения», затем снова выполнить тесты и кейсы.",evidence:"Уровень освоения строится по реальным действиям: тестам, кейсам, объяснениям, лабораториям, собранным путям и сохранённым схемам.",work:"Что уже выполнено",practice:"Практика",questions:"Контрольные вопросы",patient:"Виртуальный пациент",tests:"Тесты",cases:"Кейсы",sketch:"Нарисованная схема",builder:"Собранный путь"},
 EN:{title:"Progress: what is going well",scope:"25-module overview",visited:"Modules visited",criteria:"What the student can do",module:"Module",sections:"Sections opened",start:"Open module",saved:"Data is stored locally in this browser. The entry quiz is diagnostic and does not affect mastery.",none:"No data",review:"Needs review",forming:"Developing",mastered:"Mastered",concept:"Understands the key concepts",mechanism:"Can explain how it works",interpret:"Can use the knowledge in a task",transfer:"Can use the knowledge in a new situation",justification:"Can explain why the conclusion was made",clinical:"Understands a clinical situation and chooses a response",correction:"Notices and corrects mistakes",assessment:"Learning result",exam:"Exam results are reported separately.",teacher:"What the student can do",next:"Recommendation",strong:"The student is ready to move to the next module.",mid:"Consolidate criteria marked Developing and retry weak tasks.",low:"Review criteria marked Needs review, then repeat tests and cases.",evidence:"Mastery uses real performance evidence: tests, cases, explanations, labs, built pathways, and saved diagrams.",work:"Completed learning work",practice:"Practice",questions:"Review questions",patient:"Virtual patient",tests:"Tests",cases:"Cases",sketch:"Student diagram",builder:"Built pathway"},
 KZ:{title:"Прогресс: не меңгерілді",scope:"25 модуль бойынша шолу",visited:"Қаралған модульдер",criteria:"Студент нені істей алады",module:"Модуль",sections:"Ашылған бөлімдер",start:"Модульді ашу",saved:"Деректер осы браузерде сақталады. Кіріспе блиц қорытынды бағалауға кірмейді.",none:"Әзірге дерек жоқ",review:"Қайталау қажет",forming:"Қалыптасуда",mastered:"Меңгерілді",concept:"Негізгі ұғымдарды түсінеді",mechanism:"Қалай жұмыс істейтінін түсіндіре алады",interpret:"Білімді тапсырмада қолдана алады",transfer:"Білімді жаңа жағдайда қолдана алады",justification:"Неліктен осындай қорытынды жасағанын түсіндіре алады",clinical:"Клиникалық жағдайды түсініп, шешім таңдай алады",correction:"Өз қатесін байқап, түзете алады",assessment:"Оқу нәтижесі",exam:"Емтихан нәтижесі бөлек көрсетіледі.",teacher:"Студент не істей алады",next:"Келесі қадам",strong:"Келесі модульге өтуге болады.",mid:"«Қалыптасуда» тұрған дағдыларды бекітіп, әлсіз тапсырмаларды қайталаңыз.",low:"Алдымен «Қайталау қажет» дағдыларды қайталап, содан кейін тесттер мен кейстерді қайта орындаңыз.",evidence:"Профиль студенттің нақты жұмысына сүйенеді: тесттер, есептер, практика және өз сөзімен түсіндіру.",work:"Орындалған оқу жұмысы",practice:"Практика",questions:"Өзін-өзі тексеру сұрақтары",patient:"Виртуалды пациент",tests:"Тесттер",cases:"Жағдайлар",sketch:"Салынған сызба",builder:"Құрастырылған жол"}
} as const;
function level(correct:number,total:number):Level{if(!total)return"none";const p=correct/total;return p>=.8?"mastered":p>=.5?"forming":"review"}
export default function ModuleProgress({language,moduleId}:{language:Language;moduleId:number}){
 const [data,setData]=useState<CourseProgressData|null>(null);
 useEffect(()=>{recordVisit(moduleId,"progress");setData(readCourseProgress())},[moduleId]);
 const c=C[language], outcomes=data?.outcomes??{};
 const visitedSections=data?.visitedSections[moduleId]??[];
 const coreSections=["objectives","pretest","theory","one-minute","clinical","interactive","practice","cases","tests","questions","virtual-patient"] as const;
 const coreVisited=coreSections.filter(section=>visitedSections.includes(section)).length;
 const supportSections=["media","glossary","voice","progress","notes","references"] as const;
 const supportVisited=supportSections.filter(section=>visitedSections.includes(section)).length;
 const currentPercent=Math.round((coreVisited/coreSections.length)*100);
 const allModules=modules[language].map((title,index)=>{const id=index+1;const sections=data?.visitedSections[id]??[];const core=coreSections.filter(s=>sections.includes(s)).length;const o=data?.outcomes??{};const evidence=Object.entries(o).filter(([k])=>k.startsWith(id+":")&&!k.includes(":pretest")).map(([,v])=>v);const correct=evidence.reduce((s,v)=>s+v.correct,0),total=evidence.reduce((s,v)=>s+v.total,0);const mastery=total?Math.round(correct/total*100):0;return{id,title,core,completion:Math.round(core/coreSections.length*100),mastery,total}});
 const courseCompletion=Math.round(allModules.reduce((s,m)=>s+m.completion,0)/allModules.length);
 const assessed=allModules.filter(m=>m.total>0);const courseMastery=assessed.length?Math.round(assessed.reduce((s,m)=>s+m.mastery,0)/assessed.length):0;
 const needsAttention=allModules.filter(m=>m.total>0&&m.mastery<55).sort((a,b)=>a.mastery-b.mastery).slice(0,5);
 const test=outcomes[`${moduleId}:tests`], cases=outcomes[`${moduleId}:cases`], practice=outcomes[`${moduleId}:practice`], questions=outcomes[`${moduleId}:questions`], patient=outcomes[`${moduleId}:virtual-patient`], sketch=outcomes[`${moduleId}:criterion:application:sketch`], builder=outcomes[`${moduleId}:criterion:application:path-builder`];
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
  <section style={{margin:"18px 0",padding:"16px",border:"2px solid #b9d3e6",borderRadius:14,background:"#fff"}}>
    <h2 style={{marginTop:0}}>{language==="RU"?"Панель курса":language==="KZ"?"Курс панелі":"Course dashboard"}</h2>
    <p>{language==="RU"?"Завершение учебного маршрута":language==="KZ"?"Оқу маршрутының аяқталуы":"Learning-path completion"}: <strong>{courseCompletion}%</strong></p><progress value={courseCompletion} max={100} style={{width:"100%"}}/>
    <p>{language==="RU"?"Освоение по выполненным оцениваниям":language==="KZ"?"Орындалған бағалаулар бойынша меңгеру":"Mastery from completed assessments"}: <strong>{courseMastery}%</strong></p><progress value={courseMastery} max={100} style={{width:"100%"}}/>
    {needsAttention.length>0&&<><h3>{language==="RU"?"Приоритет повторения":language==="KZ"?"Қайталау басымдығы":"Review priority"}</h3><p>{needsAttention.map(m=>`${m.id}. ${m.title} — ${m.mastery}%`).join(" · ")}</p></>}
  </section>
  <h2>{c.assessment} · {c.module} {moduleId}</h2>
  <p>{c.exam}</p>
  <section style={{margin:"16px 0 20px",padding:"16px",border:"1px solid #d6e3eb",borderRadius:14,background:"#f8fcff"}}>
    <h3 style={{margin:"0 0 8px"}}>{c.teacher}</h3>
    <p style={{margin:"0 0 8px"}}><strong>{overallPercent}%</strong> · {available.length ? (reviewCount>0?c.review:masteredCount===available.length?c.mastered:c.forming) : c.none}</p>
    <progress value={overallPercent} max={100} aria-label={c.teacher} style={{width:"100%"}} />
    <p style={{margin:"10px 0 8px"}}><strong>{c.next}:</strong> {recommendation}</p>
    {available.length>0 && <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"10px 0"}}>
      {reviewCount>0 || masteredCount<available.length ? <>
        <Link href={`/modules/${moduleId}/theory?lang=${language}`}>{language==="RU"?"Повторить теорию":language==="KZ"?"Теорияны қайталау":"Review theory"}</Link>
        <Link href={`/modules/${moduleId}/cases?lang=${language}`}>{language==="RU"?"Разобрать ситуации":language==="KZ"?"Жағдайларды талдау":"Review cases"}</Link>
        <Link href={`/modules/${moduleId}/tests?lang=${language}`}>{language==="RU"?"Повторить тест":language==="KZ"?"Тестті қайталау":"Retry test"}</Link>
      </> : moduleId < modules[language].length ? <Link href={`/modules/${moduleId+1}?lang=${language}`}>{language==="RU"?"Следующий модуль →":language==="KZ"?"Келесі модуль →":"Next module →"}</Link> : null}
    </div>}
    <p style={{margin:0,fontSize:"13px",color:"#607b8d"}}>{c.evidence}</p>
  </section>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{rows.map(([name,l])=><tr key={name}><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #dce8ef"}}>{name}</th><td style={{padding:"10px",borderBottom:"1px solid #dce8ef",fontWeight:700}}>{label(l)}</td></tr>)}</tbody></table></div>
  <h3 style={{marginTop:22}}>{c.work}</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:10}}>
    {[[c.practice,practice],[c.questions,questions],[c.tests,test],[c.cases,cases],[c.patient,patient],[c.sketch,sketch],[c.builder,builder]].map(([name,value])=><div key={String(name)} style={{padding:"12px",border:"1px solid #dce8ef",borderRadius:10,background:"#fff"}}><strong>{String(name)}</strong><p style={{margin:"5px 0 0"}}>{value && typeof value==="object" ? `${value.correct}/${value.total} · ${Math.round(value.correct/value.total*100)}%` : c.none}</p></div>)}
  </div>
  <h2 style={{marginTop:28}}>{c.criteria}</h2>
  <div className={styles.courseModules}>{allModules.map(m=>{const count=data?.visitedSections[m.id]?.length??0;return <div key={m.id}><h3>{c.module} {m.id}: {m.title}</h3><p>{c.sections}: {count} · {language==="RU"?"маршрут":language==="KZ"?"маршрут":"path"} {m.completion}% · {language==="RU"?"освоение":language==="KZ"?"меңгеру":"mastery"} {m.total?m.mastery+"%":c.none}</p><progress value={m.completion} max={100} style={{width:"100%"}}/><br/><Link href={`/modules/${m.id}?lang=${language}`}>{c.start}</Link></div>})}</div>
 </section>
}