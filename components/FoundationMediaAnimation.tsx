"use client";

import { useState } from "react";
import type { Language } from "../content/course";

export default function FoundationMediaAnimation({moduleId,language}:{moduleId:number;language:Language}){
 const [step,setStep]=useState(0);
 const labels=language==="RU"?["Исходное состояние","Изменение параметра","Физиологический ответ","Интерпретация"]:language==="EN"?["Baseline","Parameter change","Physiological response","Interpretation"]:["Бастапқы күй","Параметрді өзгерту","Физиологиялық жауап","Түсіндіру"];
 const value=[24,46,72,88][step];
 const group=moduleId===7?"reflex":moduleId===8?"pathway":moduleId===9?"spinal":moduleId===10?"arousal":moduleId===11?"motor":moduleId===12?"basal":moduleId===13?"cerebellum":moduleId===14?"thalamus":moduleId===15?"homeostasis":moduleId===16?"limbic":moduleId===17?"amygdala":moduleId===18?"cortex":moduleId===19?"somatic":moduleId===20?"vision":moduleId===21?"auditory":moduleId===22?"autonomic":moduleId===23?"memory":moduleId===24?"sleep":moduleId===25?"plasticity":"signal";
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
   {group==="homeostasis"&&<><line x1="90" y1="90" x2="550" y2="90" stroke="#64748b" strokeWidth="3"/><circle cx={160+step*105} cy={90-(step===1?35:step===2?18:0)} r="16" fill="#4ade80"/><path d="M475 55 Q545 90 475 125" fill="none" stroke="#fbbf24" strokeWidth="5"/></>}
   {group==="limbic"&&<><circle cx="180" cy="85" r={22+step*3} fill="#f472b6"/><circle cx="320" cy="85" r={22+step*3} fill="#a78bfa"/><circle cx="460" cy="85" r={22+step*3} fill="#38bdf8"/><path d="M205 85 H295 M345 85 H435" stroke="#e2e8f0" strokeWidth="5"/></>}
   {group==="amygdala"&&<><circle cx="150" cy="90" r="18" fill="#fbbf24"/><path d="M170 90 H300" stroke="#fbbf24" strokeWidth="5"/><ellipse cx="350" cy="90" rx={30+step*5} ry={22+step*3} fill="#fb7185"/><path d="M385 90 H550" stroke="#f472b6" strokeWidth="5"/></>}
   {group==="cortex"&&[0,1,2,3,4].map(i=><circle key={i} cx={150+i*85} cy={60+(i%2)*55} r={12+(i<=step?8:0)} fill={i<=step?"#38bdf8":"#475569"}/>)}
   {group==="somatic"&&<><circle cx="105" cy="90" r="18" fill="#f472b6"/><path d="M125 90 C220 30 300 150 390 90 S500 45 565 90" fill="none" stroke="#a78bfa" strokeWidth="5"/><circle cx={210+step*90} cy="90" r="10" fill="#fde047"/></>}
   {group==="vision"&&<><ellipse cx="120" cy="85" rx="45" ry="28" fill="#e0f2fe"/><circle cx="120" cy="85" r="13" fill="#0f172a"/><path d="M165 85 L310 85 L420 45 M310 85 L420 125" fill="none" stroke="#38bdf8" strokeWidth="5"/><rect x="485" y="35" width="90" height="100" rx="12" fill={step<2?"#334155":"#1d4ed8"}/></>}
   {group==="auditory"&&<><path d="M75 90 Q105 45 135 90 T195 90 T255 90" fill="none" stroke="#38bdf8" strokeWidth={3+step}/><circle cx="330" cy="90" r={25+step*3} fill="#fbbf24"/><path d="M360 90 C430 35 500 145 570 90" fill="none" stroke="#4ade80" strokeWidth="5"/></>}
   {group==="autonomic"&&<><text x="70" y="55" fill="#bae6fd" fontSize="20">HR</text><text x="115" y="55" fill="white" fontSize="26">{72+[0,12,7,2][step]}</text><path d="M75 110 L135 110 L155 75 L180 140 L205 110 H565" fill="none" stroke="#4ade80" strokeWidth="5"/></>}
   {group==="memory"&&<><rect x="75" y="55" width="110" height="70" rx="12" fill="#1d4ed8"/><rect x="265" y="55" width="110" height="70" rx="12" fill="#7c3aed"/><rect x="455" y="55" width="110" height="70" rx="12" fill="#0f766e"/><path d="M185 90 H265 M375 90 H455" stroke="#e2e8f0" strokeWidth={3+step}/></>}
   {group==="sleep"&&<><path d="M70 105 C140 35 205 35 270 105 S400 175 470 105 S555 35 610 80" fill="none" stroke="#818cf8" strokeWidth="6"/><circle cx={115+step*135} cy={55+(step%2)*65} r="15" fill="#fde047"/></>}
   {group==="plasticity"&&<><path d="M85 130 L220 80 L350 115 L510 55" fill="none" stroke="#64748b" strokeWidth="4"/><path d={`M85 130 L220 ${80-step*7} L350 ${115-step*13} L510 ${55+step*4}`} fill="none" stroke="#4ade80" strokeWidth={4+step}/>{[85,220,350,510].map((x,i)=><circle key={i} cx={x} cy={[130,80-step*7,115-step*13,55+step*4][i]} r={9+step} fill="#38bdf8"/>)}</>}
  </svg>
  <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{language==="RU"?"Назад":language==="EN"?"Back":"Артқа"}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(v=>Math.min(3,v+1))}>{language==="RU"?"Следующий шаг":language==="EN"?"Next step":"Келесі қадам"}</button>
   <button type="button" onClick={()=>setStep(0)}>{language==="RU"?"Повторить":language==="EN"?"Replay":"Қайталау"}</button>
  </div>
 </section>;
}
