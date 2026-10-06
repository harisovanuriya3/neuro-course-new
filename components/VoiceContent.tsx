"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {modules,type Language} from "../content/course";
import VoiceTextarea from "./VoiceTextarea";
import styles from "./ModuleTools.module.css";
import {recordOutcome} from "../lib/courseProgress";

const copy={
 RU:{min:"Введите или продиктуйте не менее 12 символов, чтобы проверить структуру.",title:"Механизм своими словами",intro:"Объясните ключевой физиологический механизм этого модуля так, как объяснили бы его студенту. Можно ввести текст или воспользоваться голосовым вводом.",prompt:"Ваше объяснение",check:"Самопроверка структуры",saved:"Ответ сохранён в этом браузере.",cause:"Указана причина или стимул",path:"Описан путь / последовательность событий",result:"Указан физиологический результат",ready:"Базовая причинно-следственная структура собрана. Теперь сверьте формулировки с теорией и уточните механизм.",need:"Ответ пока неполный. Добавьте недостающие элементы:",open:"Открыть теорию",progress:"Готовность объяснения",level:"Уровень",weak:"Нужно доработать",good:"Структура сформирована"},
 EN:{min:"Type or dictate at least 12 characters to check the structure.",title:"Explain the mechanism",intro:"Explain the key physiological mechanism of this module as if teaching another student. Type your answer or use voice input.",prompt:"Your explanation",check:"Structure self-check",saved:"Your answer is saved in this browser.",cause:"Cause or stimulus stated",path:"Pathway / sequence of events described",result:"Physiological outcome stated",ready:"The core cause-and-effect structure is present. Compare the wording with the theory and refine the mechanism.",need:"The explanation is incomplete. Add:",open:"Open theory",progress:"Explanation readiness",level:"Level",weak:"Needs work",good:"Structure formed"},
 KZ:{min:"Құрылымды тексеру үшін кемінде 12 таңба жазыңыз немесе айтыңыз.",title:"Механизмді өз сөзіңізбен",intro:"Осы модульдің негізгі физиологиялық механизмін басқа студентке түсіндіргендей баяндаңыз. Мәтін енгізуге немесе дауыспен енгізуге болады.",prompt:"Сіздің түсіндірмеңіз",check:"Құрылымды өзіндік тексеру",saved:"Жауап осы браузерде сақталды.",cause:"Себеп немесе стимул көрсетілген",path:"Жол / оқиғалар реті сипатталған",result:"Физиологиялық нәтиже көрсетілген",ready:"Негізгі себеп-салдарлық құрылым бар. Теориямен салыстырып, механизмді нақтылаңыз.",need:"Түсіндіру толық емес. Қосыңыз:",open:"Теорияны ашу",progress:"Түсіндіру дайындығы",level:"Деңгей",weak:"Толықтыру қажет",good:"Құрылым қалыптасты"}
} as const;

export default function VoiceContent({language,moduleId}:{language:Language;moduleId:number}){
 const c=copy[language];
 const key=`neuro-course:mechanism:${moduleId}:${language}`;
 const[answer,setAnswer]=useState("");
 const[cause,setCause]=useState(false),[path,setPath]=useState(false),[result,setResult]=useState(false),[checked,setChecked]=useState(false);
 useEffect(()=>{try{setAnswer(localStorage.getItem(key)||"")}catch{}},[key]);
 function update(v:string){setAnswer(v);setChecked(false);try{localStorage.setItem(key,v)}catch{}}
 const checks=[{ok:cause,label:c.cause},{ok:path,label:c.path},{ok:result,label:c.result}];
 const done=checks.filter(x=>x.ok).length;
 const missing=checks.filter(x=>!x.ok).map(x=>x.label);
 function evaluate(){
   setChecked(true);
   if(answer.trim().length>=12) recordOutcome(moduleId,"criterion:mechanism:self-explanation",done,3);
 }
 return <article className={styles.tool}>
   <h1>{c.title}</h1>
   <p><strong>{modules[language][moduleId-1]}</strong></p>
   <p>{c.intro}</p>
   <VoiceTextarea language={language} label={c.prompt} value={answer} onValue={update} rows={7}/>
   <p>{c.progress}: <strong>{done}/3</strong></p>
   <progress value={done} max={3} aria-label={c.progress}/>
   <fieldset>
     <legend>{c.check}</legend>
     <label><input type="checkbox" checked={cause} onChange={e=>{setCause(e.target.checked);setChecked(false)}}/> {c.cause}</label><br/>
     <label><input type="checkbox" checked={path} onChange={e=>{setPath(e.target.checked);setChecked(false)}}/> {c.path}</label><br/>
     <label><input type="checkbox" checked={result} onChange={e=>{setResult(e.target.checked);setChecked(false)}}/> {c.result}</label>
   </fieldset>
   <button type="button" disabled={answer.trim().length<12} aria-describedby={answer.trim().length<12?"mechanism-check-hint":undefined} onClick={evaluate}>{c.check}</button>{answer.trim().length<12&&<p id="mechanism-check-hint" style={{color:"#607b8d",fontSize:"0.92rem"}}>{c.min}</p>}
   {answer.trim().length>=12&&<p><small>{c.saved}</small></p>}
   {checked&&<div role="status" style={{marginTop:14,padding:"14px 16px",border:"1px solid #d6e3eb",borderRadius:12,background:"#f8fcff"}}>
     <p style={{margin:"0 0 8px"}}><strong>{c.level}: {done===3?c.good:c.weak} · {done}/3</strong></p>
     <p style={{margin:0}}>{done===3?c.ready:c.need}</p>
     {done<3&&<ul>{missing.map(item=><li key={item}>{item}</li>)}</ul>}
   </div>}
   <Link href={`/modules/${moduleId}/theory?lang=${language}`}>{c.open}</Link>
 </article>
}