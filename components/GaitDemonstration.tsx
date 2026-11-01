"use client";

import { useEffect, useState } from "react";
import type { Language } from "../content/course";

const copy = {
  RU: {title:"Виртуальная демонстрация: шаг, подъём и опускание ноги",intro:"Наблюдайте чередование фаз шага и изменение положения ног. Это учебная кинематическая анимация, а не запись реального пациента или биомеханический расчёт.",play:"Воспроизвести",pause:"Пауза",step:"Следующая фаза",reset:"Сначала",speed:"Скорость",phase:"Фаза шага",lift:"Подъём",lower:"Опускание",question:"Какая роль сенсорной обратной связи при коррекции шага?"},
  EN: {title:"Virtual demonstration: stepping, raising and lowering a leg",intro:"Observe alternating step phases and leg positions. This is a teaching kinematic animation, not a real patient recording or biomechanical calculation.",play:"Play",pause:"Pause",step:"Next phase",reset:"Reset",speed:"Speed",phase:"Gait phase",lift:"Lift",lower:"Lower",question:"How does sensory feedback contribute to step correction?"},
  KZ: {title:"Виртуалды көрсету: адымдау, аяқты көтеру және түсіру",intro:"Адым фазаларының кезектесуін және аяқтың қалпын бақылаңыз. Бұл нақты пациент жазбасы немесе биомеханикалық есеп емес, оқу кинематикалық анимациясы.",play:"Ойнату",pause:"Кідірту",step:"Келесі фаза",reset:"Бастапқы күй",speed:"Жылдамдық",phase:"Адым фазасы",lift:"Көтеру",lower:"Түсіру",question:"Адымды түзетуде сенсорлық кері байланыс қандай рөл атқарады?"}
};
export default function GaitDemonstration({language}:{language:Language}) {
  const t=copy[language];
  const [phase,setPhase]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [speed,setSpeed]=useState(1);
  useEffect(()=>{
    if(!playing)return;
    const timer=window.setInterval(()=>setPhase(p=>(p+1)%8),600/speed);
    return ()=>window.clearInterval(timer);
  },[playing,speed]);
  const theta=Math.sin(phase*Math.PI/4)*24;
  const other=Math.sin((phase+4)*Math.PI/4)*24;
  return <section style={{padding:18,margin:"24px 0",border:"1px solid #bad3e2",borderRadius:16,background:"#f4f9fc"}}>
    <h2>{t.title}</h2><p>{t.intro}</p>
    <svg role="img" aria-label={t.title} viewBox="0 0 460 350" style={{width:"100%",maxWidth:520,display:"block",margin:"auto",background:"white",borderRadius:12}}>
      <path d="M20 316 H440" stroke="#a3b4bf" strokeWidth="3"/>
      <circle cx="230" cy="65" r="27" fill="#f1c7a5" stroke="#46657b" strokeWidth="2"/>
      <path d="M230 93 L230 194" stroke="#346a91" strokeWidth="26" strokeLinecap="round"/>
      <path d="M230 111 L191 173 M230 111 L270 173" stroke="#f1c7a5" strokeWidth="13" strokeLinecap="round"/>
      <g transform={`rotate(${theta} 230 194)`}>
        <path d="M230 194 L230 251 L230 310 L250 310" fill="none" stroke="#275f91" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g transform={`rotate(${other} 230 194)`}>
        <path d="M230 194 L230 251 L230 310 L250 310" fill="none" stroke="#68a4ca" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text x="18" y="30" fontSize="15" fill="#244963">{t.phase}: {phase+1}/8</text>
    </svg>
    <div style={{display:"flex",flexWrap:"wrap",gap:10,alignItems:"center",marginTop:14}}>
      <button type="button" onClick={()=>setPlaying(p=>!p)}>{playing?t.pause:t.play}</button>
      <button type="button" onClick={()=>{setPlaying(false);setPhase(p=>(p+1)%8)}}>{t.step}</button>
      <button type="button" onClick={()=>{setPlaying(false);setPhase(0)}}>{t.reset}</button>
      <label>{t.speed} <select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option></select></label>
    </div>
    <p><strong>{t.question}</strong></p>
  </section>;
}
