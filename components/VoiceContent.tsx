"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {modules,type Language} from "../content/course";
import VoiceTextarea from "./VoiceTextarea";
import styles from "./ModuleTools.module.css";

const copy={
 RU:{self:"Самопроверка структуры ответа — не автоматическая оценка знаний.",min:"Напишите или продиктуйте хотя бы одно короткое предложение.",title:"Объясните своими словами",intro:"Представьте, что объясняете тему знакомому без учебника. Скажите просто: что запускает процесс, что происходит дальше и чем всё заканчивается.",prompt:"Ваше объяснение",check:"Проверить себя",saved:"Ответ сохранён в этом браузере.",cause:"Я написал(а), с чего всё начинается",path:"Я объяснил(а), что происходит дальше",result:"Я написал(а), к какому результату это приводит",ready:"Отлично: в ответе есть начало, ход процесса и результат. Теперь при желании сравните формулировки с теорией.",need:"Добавьте то, чего пока не хватает:",open:"Сравнить с теорией",progress:"Готовность ответа",level:"Итог",weak:"Нужно дополнить",good:"Ответ полный"},
 EN:{self:"This is a structure self-check, not an automatic knowledge grade.",min:"Type or dictate at least one short sentence.",title:"Explain it in your own words",intro:"Imagine explaining the topic to someone without a textbook. Keep it simple: what starts the process, what happens next, and what result follows.",prompt:"Your explanation",check:"Check my answer",saved:"Your answer is saved in this browser.",cause:"I said what starts the process",path:"I explained what happens next",result:"I said what result follows",ready:"Good: your answer has a start, a sequence, and a result. You can now compare it with the theory.",need:"Add what is still missing:",open:"Compare with theory",progress:"Answer readiness",level:"Result",weak:"Needs more detail",good:"Complete answer"},
 KZ:{self:"Бұл жауап құрылымын өзіндік тексеру, білімді автоматты бағалау емес.",min:"Кемінде бір қысқа сөйлем жазыңыз немесе айтыңыз.",title:"Өз сөзіңізбен түсіндіріңіз",intro:"Тақырыпты оқулықсыз біреуге түсіндіріп жатырмын деп елестетіңіз. Қарапайым айтыңыз: процесс неден басталады, кейін не болады және немен аяқталады.",prompt:"Сіздің түсіндірмеңіз",check:"Өзімді тексеру",saved:"Жауап осы браузерде сақталды.",cause:"Мен процесс неден басталатынын жаздым",path:"Мен кейін не болатынын түсіндірдім",result:"Мен қандай нәтиже болатынын жаздым",ready:"Жақсы: жауапта басталуы, үдеріс және нәтиже бар. Енді теориямен салыстыруға болады.",need:"Жетпейтін бөлікті қосыңыз:",open:"Теориямен салыстыру",progress:"Жауап дайындығы",level:"Нәтиже",weak:"Толықтыру қажет",good:"Жауап толық"}
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
 }
 return <article className={styles.tool}>
   <h1>{c.title}</h1>
   <p><strong>{modules[language][moduleId-1]}</strong></p>
   <p>{c.intro}</p>
   <VoiceTextarea language={language} label={c.prompt} value={answer} onValue={update} rows={7}/>
   <p>{c.progress}: <strong>{done}/3</strong></p>
   <progress value={done} max={3} aria-label={c.progress}/>
   <p><small>{c.self}</small></p>
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