"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Qualitative diagram only: not a clinical recording or a latency simulator.
// Direct Ia→alpha excitation and the separate interneuron branch are shown
// as distinct pathways; no claim is made about quantitative reflex amplitude.
const copy = {
  RU: {
    title: "Дуга коленного рефлекса — учебная схема",
    stages: ["Растяжение мышцы", "Ia-афферент", "Прямой синапс Ia→α", "Сокращение четырёхглавой мышцы", "Торможение антагониста"],
    items: ["Мышечное веретено", "Задний корешок / Ia", "Передний рог / α-мотонейрон", "Передний корешок / нервно-мышечное соединение", "Тормозный интернейрон"],
    main: "Прямая моносинаптическая ветвь",
    parallel: "Параллельная ветвь через интернейрон",
    note: "Стрелки показывают направление функциональной связи, а не расстояние, время или силу сигнала. Прямой Ia→α-синапс глутаматергический; в нервно-мышечном соединении действует ацетилхолин.",
    previous: "Назад", next: "Далее", replay: "Сначала"
  },
  EN: {
    title: "Patellar reflex arc — teaching diagram",
    stages: ["Muscle stretch", "Ia afferent", "Direct Ia→α synapse", "Quadriceps contraction", "Antagonist inhibition"],
    items: ["Muscle spindle", "Dorsal root / Ia", "Ventral horn / α-motor neuron", "Ventral root / neuromuscular junction", "Inhibitory interneuron"],
    main: "Direct monosynaptic branch",
    parallel: "Parallel interneuron branch",
    note: "Arrows show functional direction, not distance, timing or signal magnitude. The direct Ia→α synapse is glutamatergic; the neuromuscular junction uses acetylcholine.",
    previous: "Previous", next: "Next", replay: "Restart"
  },
  KZ: {
    title: "Тізе рефлексінің доғасы — оқу сызбасы",
    stages: ["Бұлшықеттің созылуы", "Ia-афферент", "Тікелей Ia→α синапсы", "Төртбасты бұлшықеттің жиырылуы", "Антагонистің тежелуі"],
    items: ["Бұлшықет ұршығы", "Артқы түбір / Ia", "Алдыңғы мүйіз / α-мотонейрон", "Алдыңғы түбір / жүйке-бұлшықет түйіскен жері", "Тежеуші интернейрон"],
    main: "Тікелей моносинапстық тармақ",
    parallel: "Интернейрон арқылы өтетін қатарлас тармақ",
    note: "Бағыттамалар сигналдың қызметтік бағытын көрсетеді, арақашықтықты, уақытты немесе сигнал күшін көрсетпейді. Тікелей Ia→α синапсы глутаматергиялық, жүйке-бұлшықет түйіскен жерінде ацетилхолин әсер етеді.",
    previous: "Алдыңғы", next: "Келесі", replay: "Басынан"
  }
} as const;

export default function ModuleSevenMediaAnimation({ language }: { language: Language }) {
  const [step, setStep] = useState(0);
  const c = copy[language];
  return <section data-testid="module-seven-media-animation" aria-label={c.title}
    style={{padding:16,borderRadius:14,background:"#092338",color:"#f7fafc"}}>
    <h3 style={{marginTop:0}}>{c.title}</h3>
    <p role="status" aria-live="polite"><strong>{step+1}/5. {c.stages[step]}</strong></p>
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"stretch",gap:8}}>
      {c.items.slice(0,4).map((label,index)=><div key={index}
        style={{display:"flex",alignItems:"center",gap:8,flex:"1 1 125px"}}>
        <div aria-current={step===index?"step":undefined}
          style={{padding:10,borderRadius:9,minHeight:62,width:"100%",
            background:step===index?"#135e55":"#16364d",
            border:step===index?"2px solid #86efac":"1px solid #66879a",
            fontWeight:step===index?700:400}}>
          {index+1}. {label}
        </div>
        {index<3?<span aria-hidden="true" style={{fontSize:22}}>→</span>:null}
      </div>)}
    </div>
    <p style={{marginBottom:4}}>{c.main}</p>
    <div style={{borderLeft:"4px solid #fbbf24",padding:"8px 12px",
      background:step===4?"#6b4e16":"#203a4b",borderRadius:8}}>
      <strong>{c.parallel}:</strong> {c.items[4]}
      {step===4?<span aria-hidden="true"> ✓</span>:null}
    </div>
    <p style={{fontSize:"0.93rem"}}>{c.note}</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
      <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{c.previous}</button>
      <button type="button" disabled={step===4} onClick={()=>setStep(v=>Math.min(4,v+1))}>{c.next}</button>
      <button type="button" onClick={()=>setStep(0)}>{c.replay}</button>
    </div>
  </section>;
}
