"use client";

import {useMemo,useState} from "react";
import type {Language} from "../content/course";

type Mode="normal"|"release"|"receptor"|"ache";
const T={
 RU:{title:"Виртуальная лаборатория: нервно-мышечная передача",intro:"Проследите путь от потенциала действия мотонейрона до сокращения мышцы и измените одно звено.",normal:"Норма",release:"Уменьшить выделение ацетилхолина",receptor:"Снизить доступность никотиновых рецепторов",ache:"Замедлить расщепление ацетилхолина",steps:["Потенциал действия приходит к окончанию мотонейрона","Открываются Ca²⁺-каналы","Выделяется ацетилхолин","Активируются никотиновые рецепторы концевой пластинки","Возникает концевой потенциал и мышечный потенциал действия","Запускается сокращение мышцы"],signal:"Передача сигнала",muscle:"Ответ мышцы",explain:"Почему изменился ответ?",reset:"Вернуть норму",note:"Учебная модель показывает направление эффекта, а не количественный клинический прогноз."},
 EN:{title:"Virtual lab: neuromuscular transmission",intro:"Follow the path from a motor-neuron action potential to muscle contraction and alter one step.",normal:"Normal",release:"Reduce acetylcholine release",receptor:"Reduce nicotinic receptor availability",ache:"Slow acetylcholine breakdown",steps:["Action potential reaches the motor terminal","Ca²⁺ channels open","Acetylcholine is released","Nicotinic end-plate receptors are activated","End-plate potential and muscle action potential develop","Muscle contraction is triggered"],signal:"Signal transmission",muscle:"Muscle response",explain:"Why did the response change?",reset:"Restore normal",note:"This teaching model shows the direction of an effect, not a quantitative clinical prediction."},
 KZ:{title:"Виртуалды зертхана: жүйке-бұлшықет берілуі",intro:"Мотонейрон әрекет потенциалынан бұлшықет жиырылуына дейінгі жолды бақылап, бір буынды өзгертіңіз.",normal:"Қалыпты",release:"Ацетилхолин бөлінуін азайту",receptor:"Никотиндік рецепторлардың қолжетімділігін азайту",ache:"Ацетилхолин ыдырауын баяулату",steps:["Әрекет потенциалы мотонейрон ұшына келеді","Ca²⁺ арналары ашылады","Ацетилхолин бөлінеді","Соңғы пластинканың никотиндік рецепторлары белсенеді","Соңғы пластинка потенциалы және бұлшықет әрекет потенциалы пайда болады","Бұлшықет жиырылуы басталады"],signal:"Сигнал берілуі",muscle:"Бұлшықет жауабы",explain:"Жауап неліктен өзгерді?",reset:"Қалыптыға қайтару",note:"Бұл оқу моделі әсер бағытын көрсетеді, клиникалық сандық болжам бермейді."}
} as const;

export default function NeuromuscularJunctionLab({language}:{language:Language}){
 const t=T[language]; const [mode,setMode]=useState<Mode>("normal"),[explanation,setExplanation]=useState("");
 const transmission=useMemo(()=>mode==="normal"?100:mode==="release"?45:mode==="receptor"?35:85,[mode]);
 const muscle=useMemo(()=>mode==="ache"?75:transmission,[mode,transmission]);
 return <section style={{margin:"26px 0",padding:18,border:"1px solid #cfe0ea",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{([["normal",t.normal],["release",t.release],["receptor",t.receptor],["ache",t.ache]] as [Mode,string][]).map(([id,label])=><button key={id} type="button" aria-pressed={mode===id} onClick={()=>{setMode(id);setExplanation("")}}>{label}</button>)}</div>
  <ol style={{marginTop:14}}>{t.steps.map((s,i)=><li key={s} style={{padding:"5px 0",opacity:(mode==="release"&&i>=2)||(mode==="receptor"&&i>=3)?0.55:1}}>{s}</li>)}</ol>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
   <div style={{padding:12,background:"#f8fcff",borderRadius:12}}><strong>{t.signal}: {transmission}%</strong><div style={{height:12,marginTop:8,background:"#e5edf2",borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:`${transmission}%`,background:"linear-gradient(90deg,#9cc7df,#3d7ca4)",transition:"width .45s"}}/></div></div>
   <div style={{padding:12,background:"#f8fcff",borderRadius:12}}><strong>{t.muscle}: {muscle}%</strong><div style={{height:12,marginTop:8,background:"#e5edf2",borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:`${muscle}%`,background:"linear-gradient(90deg,#a8cfae,#4b8a57)",transition:"width .45s"}}/></div></div>
  </div>
  <label style={{display:"block",marginTop:12}}>{t.explain}<textarea rows={3} value={explanation} onChange={e=>setExplanation(e.target.value)} style={{width:"100%"}}/></label>
  <p><small>{t.note}</small></p>
 </section>
}
