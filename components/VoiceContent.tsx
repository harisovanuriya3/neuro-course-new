"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {modules,type Language} from "../content/course";
import VoiceTextarea from "./VoiceTextarea";
import styles from "./ModuleTools.module.css";

const copy={
 RU:{title:"Механизм своими словами",intro:"Объясните ключевой физиологический механизм этого модуля так, как объяснили бы его студенту. Можно ввести текст или воспользоваться голосовым вводом.",prompt:"Ваше объяснение",check:"Проверить структуру ответа",saved:"Ответ сохранён в этом браузере.",cause:"Указана причина или стимул",path:"Описан путь / последовательность событий",result:"Указан физиологический результат",ready:"Структура ответа заполнена. Теперь сверьтесь с теорией и при необходимости уточните механизм.",need:"Добавьте недостающие элементы объяснения.",open:"Открыть теорию",progress:"Готовность объяснения"},
 EN:{title:"Explain the mechanism",intro:"Explain the key physiological mechanism of this module as if teaching another student. Type your answer or use voice input.",prompt:"Your explanation",check:"Check answer structure",saved:"Your answer is saved in this browser.",cause:"Cause or stimulus stated",path:"Pathway / sequence of events described",result:"Physiological outcome stated",ready:"Your explanation has the core structure. Compare it with the theory and refine it if needed.",need:"Add the missing parts of the explanation.",open:"Open theory",progress:"Explanation readiness"},
 KZ:{title:"Механизмді өз сөзіңізбен",intro:"Осы модульдің негізгі физиологиялық механизмін басқа студентке түсіндіргендей баяндаңыз. Мәтін енгізуге немесе дауыспен енгізуге болады.",prompt:"Сіздің түсіндірмеңіз",check:"Жауап құрылымын тексеру",saved:"Жауап осы браузерде сақталды.",cause:"Себеп немесе стимул көрсетілген",path:"Жол / оқиғалар реті сипатталған",result:"Физиологиялық нәтиже көрсетілген",ready:"Жауаптың негізгі құрылымы бар. Теориямен салыстырып, қажет болса нақтылаңыз.",need:"Жетіспейтін түсіндіру элементтерін қосыңыз.",open:"Теорияны ашу",progress:"Түсіндіру дайындығы"}
} as const;

export default function VoiceContent({language,moduleId}:{language:Language;moduleId:number}){
 const c=copy[language];
 const key=`neuro-course:mechanism:${moduleId}:${language}`;
 const[answer,setAnswer]=useState("");
 const[cause,setCause]=useState(false),[path,setPath]=useState(false),[result,setResult]=useState(false),[checked,setChecked]=useState(false);
 useEffect(()=>{try{setAnswer(localStorage.getItem(key)||"")}catch{}},[key]);
 function update(v:string){setAnswer(v);setChecked(false);try{localStorage.setItem(key,v)}catch{}}
 const done=[cause,path,result].filter(Boolean).length;
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
   <button type="button" disabled={answer.trim().length<12} onClick={()=>setChecked(true)}>{c.check}</button>
   {answer.trim().length>=12&&<p><small>{c.saved}</small></p>}
   {checked&&<p role="status"><strong>{done===3?c.ready:c.need}</strong></p>}
   <Link href={`/modules/${moduleId}/theory?lang=${language}`}>{c.open}</Link>
 </article>
}