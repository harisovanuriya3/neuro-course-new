"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Qualitative teaching schematic. Neither trace is a measured CMAP or a
// quantitative conduction-velocity simulation.
const copy = {
  RU: {
    title: "Сравнение проведения по миелинизированному аксону",
    intact: "Миелин сохранён",
    damaged: "Локальная демиелинизация",
    node: "Перехват Ранвье",
    step: "Этап",
    prev: "Предыдущий этап",
    next: "Следующий этап",
    reset: "Начать заново",
    stages: [
      "Возбуждение возникает в первом перехвате Ранвье.",
      "Под миелином местный ток распространяется к следующему перехвату.",
      "При утрате миелина ток сильнее утекает через мембрану: следующему узлу может не хватить деполяризации.",
      "При сохранном миелине возбуждение распространяется дальше; при демиелинизации оно может замедлиться или блокироваться."
    ],
    caveat: "Схема качественная: длина, амплитуда и скорость здесь не измеряются. Блок проведения возможен, но не неизбежен."
  },
  EN: {
    title: "Comparing conduction along a myelinated axon",
    intact: "Myelin intact",
    damaged: "Focal demyelination",
    node: "Node of Ranvier",
    step: "Stage",
    prev: "Previous stage",
    next: "Next stage",
    reset: "Start again",
    stages: [
      "Excitation begins at the first node of Ranvier.",
      "Local current spreads beneath myelin toward the next node.",
      "With myelin loss, more current leaks across the membrane: the next node may not reach threshold.",
      "Conduction continues with intact myelin; demyelination may slow or block propagation."
    ],
    caveat: "Qualitative schematic only: distances, amplitudes and velocities are not measured. Conduction block is possible, not inevitable."
  },
  KZ: {
    title: "Миелинденген аксон бойымен өткізуді салыстыру",
    intact: "Миелин сақталған",
    damaged: "Жергілікті демиелиндену",
    node: "Ранвье түйіні",
    step: "Кезең",
    prev: "Алдыңғы кезең",
    next: "Келесі кезең",
    reset: "Қайта бастау",
    stages: [
      "Қозу бірінші Ранвье түйінінде пайда болады.",
      "Жергілікті ток миелин астымен келесі түйінге таралады.",
      "Миелин жоғалғанда ток мембрана арқылы көбірек ағып кетеді: келесі түйін табалдырыққа жетпеуі мүмкін.",
      "Миелин сақталса, қозу әрі қарай таралады; демиелинденгенде өткізу баяулауы немесе бөгелуі мүмкін."
    ],
    caveat: "Бұл тек сапалық сызба: арақашықтық, амплитуда және жылдамдық өлшенбейді. Өткізудің бөгелуі мүмкін, бірақ міндетті емес."
  }
} as const;

export default function ModuleThreeMediaAnimation({language}:{language:Language}) {
  const [stage,setStage] = useState(0);
  const t = copy[language];
  const xs = [92,204,316,428,540];
  const rows = [{y:84,damaged:false,label:t.intact},{y:185,damaged:true,label:t.damaged}];
  return <section aria-label={t.title} style={{borderRadius:16,padding:16,background:"#0c2336",color:"#f8fafc"}}>
    <h3 style={{margin:"0 0 10px"}}>{t.title}</h3>
    <svg viewBox="0 0 650 255" role="img" aria-label={t.stages[stage]} style={{width:"100%",height:"auto",background:"#102d44",borderRadius:12}}>
      {rows.map(row=><g key={row.y}>
        <text x="20" y={row.y-43} fill="#e2e8f0" fontSize="16">{row.label}</text>
        <path d={`M92 ${row.y} H540`} stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
        {[0,1,2,3].map(i=><g key={i}>
          {row.damaged && i===2
            ? <g>
                <rect x={xs[i]+12} y={row.y-14} width="88" height="28" rx="10" fill="none" stroke="#fb7185" strokeDasharray="6 5" strokeWidth="2"/>
                <path d={`M${xs[i]+30} ${row.y-14} l-12 -18 m42 18 l12 -18 m18 18 l12 -18`} stroke="#fb7185" strokeWidth="2" fill="none"/>
              </g>
            : <rect x={xs[i]+12} y={row.y-14} width="88" height="28" rx="10" fill="#38bdf8" fillOpacity=".52" stroke="#7dd3fc" strokeWidth="2"/>}
        </g>)}
        {xs.map((x,i)=><g key={i}>
          <circle cx={x} cy={row.y} r="9" fill={i<=stage+1 && (!row.damaged || i<=2)?"#facc15":"#e2e8f0"} stroke="#0c2336" strokeWidth="2"/>
          {i<=stage && i<4 && (!row.damaged || i<2) && <path d={`M${x+16} ${row.y} H${xs[i+1]-17}`} stroke="#facc15" strokeWidth="3" strokeDasharray="5 5"/>}
        </g>)}
        {row.damaged && stage>=2 && <text x="355" y={row.y+40} fill="#fda4af" fontSize="13">↓ {language==="RU"?"утечка тока":language==="EN"?"current leak":"токтың ағып кетуі"}</text>}
      </g>)}
      <text x="20" y="245" fill="#cbd5e1" fontSize="13">{t.node}: ●</text>
    </svg>
    <p role="status" aria-live="polite" style={{minHeight:"3em",lineHeight:1.5}}>
      <strong>{t.step} {stage+1}/4.</strong> {t.stages[stage]}
    </p>
    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      <button type="button" disabled={stage===0} onClick={()=>setStage(s=>Math.max(0,s-1))}>{t.prev}</button>
      <button type="button" disabled={stage===3} onClick={()=>setStage(s=>Math.min(3,s+1))}>{t.next}</button>
      <button type="button" onClick={()=>setStage(0)}>{t.reset}</button>
    </div>
    <p style={{fontSize:14,color:"#cbd5e1",marginBottom:0}}>{t.caveat}</p>
  </section>;
}
