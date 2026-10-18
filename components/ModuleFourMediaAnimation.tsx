"use client";
import { useState } from "react";
import type { Language } from "../content/course";

// Illustrative shape, not a quantitative voltage or conductance simulation.
const copy = {
 RU: {
  phases: [
   ["Покой","K⁺-каналы утечки открыты; потенциал-зависимые Na⁺-каналы готовы к активации.","Na⁺: доступны","K⁺: утечка"],
   ["Восходящая фаза","После достижения порога Na⁺-каналы быстро активируются; Na⁺ входит в клетку.","Na⁺: вход","K⁺: задержанная активация"],
   ["Реполяризация","Na⁺-каналы инактивируются; K⁺-каналы открыты и K⁺ выходит.","Na⁺: инактивация","K⁺: выход"],
   ["Следовая гиперполяризация","K⁺-каналы закрываются с задержкой; Na⁺-каналы восстанавливаются.","Na⁺: восстановление","K⁺: закрытие с задержкой"]
  ],
  note:"Условная схема, не реальная запись: масштаб времени и напряжения не задан.",
  back:"Назад",next:"Следующая фаза",reset:"Повторить",
 },
 EN: {
  phases: [
   ["Rest","K⁺ leak channels are open; voltage-gated Na⁺ channels are available.","Na⁺: available","K⁺: leak"],
   ["Upstroke","After threshold, Na⁺ channels activate rapidly and Na⁺ enters the cell.","Na⁺: influx","K⁺: delayed activation"],
   ["Repolarization","Na⁺ channels inactivate; K⁺ channels open and K⁺ leaves the cell.","Na⁺: inactivated","K⁺: efflux"],
   ["After-hyperpolarization","K⁺ channels close with a delay as Na⁺ channels recover.","Na⁺: recovering","K⁺: delayed closure"]
  ],
  note:"Illustrative schematic, not a recording; time and voltage are not to scale.",
  back:"Back",next:"Next phase",reset:"Replay",
 },
 KZ: {
  phases: [
   ["Тыныштық","K⁺ ағу арналары ашық; кернеуге тәуелді Na⁺ арналары белсенуге дайын.","Na⁺: дайын","K⁺: ағу"],
   ["Көтерілу фазасы","Табалдырықтан кейін Na⁺ арналары тез белсеніп, Na⁺ жасушаға енеді.","Na⁺: ішке ену","K⁺: кешігіп белсену"],
   ["Реполяризация","Na⁺ арналары инактивацияланады; K⁺ арналары ашылып, K⁺ сыртқа шығады.","Na⁺: инактивация","K⁺: сыртқа шығу"],
   ["Кейінгі гиперполяризация","K⁺ арналары кеш жабылады, Na⁺ арналары қалпына келеді.","Na⁺: қалпына келу","K⁺: кеш жабылу"]
  ],
  note:"Шартты оқу сызбасы, нақты жазба емес: уақыт пен кернеу масштабы көрсетілмеген.",
  back:"Артқа",next:"Келесі фаза",reset:"Қайталау",
 }
} as const;
const xPositions=[105,241,311,377];
const yPositions=[130,32,116,156];

export default function ModuleFourMediaAnimation({language}:{language:Language}){
 const [step,setStep]=useState(0);
 const c=copy[language],p=c.phases[step];
 return <section style={{padding:16,borderRadius:16,background:"#0b2437",color:"#f8fafc"}}>
  <h3 aria-live="polite" style={{marginTop:0}}>{step+1}/4 — {p[0]}</h3>
  <svg viewBox="0 0 540 205" role="img" aria-label={p[0]+": "+p[1]}
    style={{width:"100%",background:"#071827",borderRadius:12}}>
   <line x1="32" y1="130" x2="502" y2="130" stroke="#64748b" strokeDasharray="5 5"/>
   <path d="M40 130 L148 130 Q174 130 190 113 L223 45 Q242 10 254 45 Q272 78 307 116 Q343 161 375 156 Q402 151 423 130 L500 130"
    fill="none" stroke="#7dd3fc" strokeWidth="5" strokeLinecap="round"/>
   <circle cx={xPositions[step]} cy={yPositions[step]} r="12" fill="#fde047" stroke="#0b2437" strokeWidth="3"/>
   <text x="36" y="22" fill="#f8fafc" fontSize="14">Vm</text>
   <text x="447" y="188" fill="#f8fafc" fontSize="14">t →</text>
   <text x="40" y="123" fill="#cbd5e1" fontSize="12">{language==="RU"?"покой":language==="EN"?"rest":"тыныштық"}</text>
  </svg>
  <p>{p[1]}</p>
  <p><strong>{p[2]} · {p[3]}</strong></p>
  <p style={{fontSize:14,color:"#cbd5e1"}}>{c.note}</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{c.back}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(v=>Math.min(3,v+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStep(0)}>{c.reset}</button>
  </div>
 </section>;
}
