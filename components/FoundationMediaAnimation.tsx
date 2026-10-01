"use client";

import { useState } from "react";
import type { Language } from "../content/course";

export default function FoundationMediaAnimation({moduleId,language}:{moduleId:number;language:Language}){
 const [step,setStep]=useState(0);
 const labels=language==="RU"?["Исходное состояние","Изменение параметра","Физиологический ответ","Интерпретация"]:language==="EN"?["Baseline","Parameter change","Physiological response","Interpretation"]:["Бастапқы күй","Параметрді өзгерту","Физиологиялық жауап","Түсіндіру"];
 const value=[24,46,72,88][step];
 return <section style={{padding:16,borderRadius:16,background:"linear-gradient(145deg,#071a2c,#12364a)",color:"white"}}>
  <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",alignItems:"center"}}>
   <strong>{labels[step]}</strong><span>{language==="RU"?"Модуль":language==="EN"?"Module":"Модуль"} {moduleId}</span>
  </div>
  <svg viewBox="0 0 640 170" role="img" aria-label={labels[step]} style={{width:"100%",marginTop:12,background:"#06131f",borderRadius:12}}>
   <defs><linearGradient id={`media-gradient-${moduleId}`} x1="0" x2="1"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#4ade80"/></linearGradient></defs>
   <path d={`M10 95 C70 ${95-value/3},105 ${95+value/4},150 95 S230 ${95-value},280 95 S370 ${95+value/2},420 95 S520 ${95-value*.7},630 95`} fill="none" stroke={`url(#media-gradient-${moduleId})`} strokeWidth="5"/>
   <circle cx={120+step*125} cy="45" r="14" fill="#fbbf24"/>
  </svg>
  <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{language==="RU"?"Назад":language==="EN"?"Back":"Артқа"}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(v=>Math.min(3,v+1))}>{language==="RU"?"Следующий шаг":language==="EN"?"Next step":"Келесі қадам"}</button>
   <button type="button" onClick={()=>setStep(0)}>{language==="RU"?"Повторить":language==="EN"?"Replay":"Қайталау"}</button>
  </div>
 </section>;
}
