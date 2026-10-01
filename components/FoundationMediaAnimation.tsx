"use client";

import { useState } from "react";
import type { Language } from "../content/course";

export default function FoundationMediaAnimation({moduleId,language}:{moduleId:number;language:Language}){
 const [step,setStep]=useState(0);
 const labels=language==="RU"?["Исходное состояние","Изменение параметра","Физиологический ответ","Интерпретация"]:language==="EN"?["Baseline","Parameter change","Physiological response","Interpretation"]:["Бастапқы күй","Параметрді өзгерту","Физиологиялық жауап","Түсіндіру"];
 const value=[24,46,72,88][step];
 const group=moduleId===7?"reflex":moduleId===8?"pathway":moduleId===9?"spinal":moduleId===10?"arousal":moduleId===11?"motor":moduleId===12?"basal":moduleId===13?"cerebellum":moduleId===14?"thalamus":"signal";
 return <section style={{padding:16,borderRadius:16,background:"linear-gradient(145deg,#071a2c,#12364a)",color:"white"}}>
  <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",alignItems:"center"}}>
   <strong>{labels[step]}</strong><span>{language==="RU"?"Модуль":language==="EN"?"Module":"Модуль"} {moduleId}</span>
  </div>
  <svg viewBox="0 0 640 170" role="img" aria-label={labels[step]} style={{width:"100%",marginTop:12,background:"#06131f",borderRadius:12}}>
   <defs><linearGradient id={`media-gradient-${moduleId}`} x1="0" x2="1"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#4ade80"/></linearGradient></defs>
   <path d={`M10 95 C70 ${95-value/3},105 ${95+value/4},150 95 S230 ${95-value},280 95 S370 ${95+value/2},420 95 S520 ${95-value*.7},630 95`} fill="none" stroke={`url(#media-gradient-${moduleId})`} strokeWidth="5"/>
   <circle cx={120+step*125} cy="45" r="14" fill="#fbbf24"/>
   {group==="reflex"&&<path d="M70 145 L180 55 L300 145 L430 65 L565 145" fill="none" stroke="#f472b6" strokeWidth="4"/>}
   {group==="pathway"&&<><path d="M80 145 C170 145 180 55 270 55 S370 145 460 145 S535 70 600 45" fill="none" stroke="#a78bfa" strokeWidth="5"/><circle cx={315} cy={100} r="9" fill="#fde047"/></>}
   {group==="spinal"&&<><rect x="275" y="35" width="85" height="105" rx="32" fill="#334155"/><path d="M90 115 L275 85 M360 85 L555 115" stroke="#fb7185" strokeWidth="5"/></>}
   {group==="arousal"&&[0,1,2,3].map(i=><circle key={i} cx={260+i*45} cy={55+i*18} r={8+step*2} fill={i<=step?"#4ade80":"#475569"}/>)}
   {group==="motor"&&<path d={`M90 145 Q180 ${55-step*7} 270 105 T450 ${70+step*10} T590 110`} fill="none" stroke="#fbbf24" strokeWidth="6"/>}
   {group==="basal"&&<><circle cx="280" cy="75" r={26+step*3} fill="#6366f1"/><circle cx="355" cy="92" r={22+step*2} fill="#8b5cf6"/><path d="M120 85 H250 M385 92 H560" stroke="#c4b5fd" strokeWidth="5"/></>}
   {group==="cerebellum"&&<><path d="M90 130 Q190 35 290 115 T500 85" fill="none" stroke="#fb7185" strokeWidth="5"/><path d="M90 130 Q190 70 290 100 T500 85" fill="none" stroke="#4ade80" strokeWidth="4"/></>}
   {group==="thalamus"&&<><ellipse cx="320" cy="90" rx={45+step*3} ry="34" fill="#0ea5e9"/><path d="M80 90 H270 M370 90 H570" stroke="#7dd3fc" strokeWidth="6"/></>}
  </svg>
  <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{language==="RU"?"Назад":language==="EN"?"Back":"Артқа"}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(v=>Math.min(3,v+1))}>{language==="RU"?"Следующий шаг":language==="EN"?"Next step":"Келесі қадам"}</button>
   <button type="button" onClick={()=>setStep(0)}>{language==="RU"?"Повторить":language==="EN"?"Replay":"Қайталау"}</button>
  </div>
 </section>;
}
