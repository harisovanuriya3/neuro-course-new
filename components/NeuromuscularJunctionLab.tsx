"use client";

import {useMemo,useState} from "react";
import type {Language} from "../content/course";
import {recordOutcome} from "../lib/courseProgress";

type Mode="normal"|"release"|"receptor"|"ache";
const T={
 RU:{title:"Виртуальная лаборатория: нервно-мышечная передача",intro:"Проследите путь от потенциала действия мотонейрона до сокращения мышцы и измените одно звено.",normal:"Норма",release:"Уменьшить выделение ацетилхолина",receptor:"Снизить доступность никотиновых рецепторов",ache:"Замедлить расщепление ацетилхолина",steps:["Потенциал действия приходит к окончанию мотонейрона","Открываются Ca²⁺-каналы","Выделяется ацетилхолин","Активируются никотиновые рецепторы концевой пластинки","Возникает концевой потенциал и мышечный потенциал действия","Запускается сокращение мышцы"],signal:"Передача сигнала",muscle:"Ответ мышцы",explain:"Почему изменился ответ?",reset:"Вернуть норму",note:"Учебная модель показывает направление эффекта, а не количественный клинический прогноз."},
 EN:{title:"Virtual lab: neuromuscular transmission",intro:"Follow the path from a motor-neuron action potential to muscle contraction and alter one step.",normal:"Normal",release:"Reduce acetylcholine release",receptor:"Reduce nicotinic receptor availability",ache:"Slow acetylcholine breakdown",steps:["Action potential reaches the motor terminal","Ca²⁺ channels open","Acetylcholine is released","Nicotinic end-plate receptors are activated","End-plate potential and muscle action potential develop","Muscle contraction is triggered"],signal:"Signal transmission",muscle:"Muscle response",explain:"Why did the response change?",reset:"Restore normal",note:"This teaching model shows the direction of an effect, not a quantitative clinical prediction."},
 KZ:{title:"Виртуалды зертхана: жүйке-бұлшықет берілуі",intro:"Мотонейрон әрекет потенциалынан бұлшықет жиырылуына дейінгі жолды бақылап, бір буынды өзгертіңіз.",normal:"Қалыпты",release:"Ацетилхолин бөлінуін азайту",receptor:"Никотиндік рецепторлардың қолжетімділігін азайту",ache:"Ацетилхолин ыдырауын баяулату",steps:["Әрекет потенциалы мотонейрон ұшына келеді","Ca²⁺ арналары ашылады","Ацетилхолин бөлінеді","Соңғы пластинканың никотиндік рецепторлары белсенеді","Соңғы пластинка потенциалы және бұлшықет әрекет потенциалы пайда болады","Бұлшықет жиырылуы басталады"],signal:"Сигнал берілуі",muscle:"Бұлшықет жауабы",explain:"Жауап неліктен өзгерді?",reset:"Қалыптыға қайтару",note:"Бұл оқу моделі әсер бағытын көрсетеді, клиникалық сандық болжам бермейді."}
} as const;

export default function NeuromuscularJunctionLab({language}:{language:Language}){
 const t=T[language]; const [mode,setMode]=useState<Mode>("normal"),[prediction,setPrediction]=useState(""),[revealed,setRevealed]=useState(false),[explanation,setExplanation]=useState("");
 const transmission=useMemo(()=>mode==="normal"?100:mode==="release"?45:mode==="receptor"?35:85,[mode]);
 const muscle=useMemo(()=>mode==="ache"?75:transmission,[mode,transmission]);
 return <section style={{margin:"26px 0",padding:18,border:"1px solid #cfe0ea",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{([["normal",t.normal],["release",t.release],["receptor",t.receptor],["ache",t.ache]] as [Mode,string][]).map(([id,label])=><button key={id} type="button" aria-pressed={mode===id} onClick={()=>{setMode(id);setPrediction("");setRevealed(false);setExplanation("")}}>{label}</button>)}</div>
  <label style={{display:"block",marginTop:12}}>{language==="RU"?"До результата предскажите изменение мышечного ответа":language==="KZ"?"Нәтижеге дейін бұлшықет жауабының өзгерісін болжаңыз":"Predict the change in muscle response before revealing the result"}<textarea rows={2} value={prediction} onChange={e=>{setPrediction(e.target.value);setRevealed(false)}} style={{width:"100%"}} /></label><button type="button" disabled={prediction.trim().length<20} onClick={()=>{setRevealed(true);recordOutcome(5,"interactive",1,1);recordOutcome(5,"criterion:mechanism:nmj",1,1)}}>{language==="RU"?"Показать результат":language==="KZ"?"Нәтижені көрсету":"Reveal result"}</button>
  <ol style={{marginTop:14}}>{t.steps.map((s,i)=><li key={s} style={{padding:"5px 0",opacity:(mode==="release"&&i>=2)||(mode==="receptor"&&i>=3)?0.55:1}}>{s}</li>)}</ol>
  {revealed&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
   <div style={{padding:12,background:"#f8fcff",borderRadius:12}}><strong>{t.signal}: {transmission}%</strong><div style={{height:12,marginTop:8,background:"#e5edf2",borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:`${transmission}%`,background:"linear-gradient(90deg,#9cc7df,#3d7ca4)",transition:"width .45s"}}/></div></div>
   <div style={{padding:12,background:"#f8fcff",borderRadius:12}}><strong>{t.muscle}: {muscle}%</strong><div style={{height:12,marginTop:8,background:"#e5edf2",borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:`${muscle}%`,background:"linear-gradient(90deg,#a8cfae,#4b8a57)",transition:"width .45s"}}/></div></div>
  </div>}
  {revealed&&<label style={{display:"block",marginTop:12}}>{t.explain}<textarea rows={3} value={explanation} onChange={e=>{const v=e.target.value;setExplanation(v);if(v.trim().length>=30)recordOutcome(5,"criterion:justification:nmj",1,1)}} style={{width:"100%"}}/></label>
  <p><small>{t.note}</small></p>
 </section>
}
