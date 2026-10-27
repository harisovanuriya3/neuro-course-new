"use client";

import { useState } from "react";
import type { Language } from "../content/course";

type PathId = "direct" | "indirect" | "hyperdirect";
type Path = { label: string; nodes: string[]; signs: ("+" | "−")[]; steps: string[] };
type Copy = {
 heading: string; positive: string; negative: string; step: string;
 back: string; next: string; restart: string; note: string;
 paths: Record<PathId,Path>;
};

// Connection signs describe the EFFECT of the source on the next node, not
// measured firing rates. The thalamic disinhibition is a two-inhibition effect.
const copy: Record<Language,Copy> = {
 RU:{
  heading:"Контуры базальных ганглиев: знаки связей",positive:"Возбуждает",negative:"Тормозит",step:"Звено",
  back:"Назад",next:"Далее",restart:"Сначала",
  note:"Качественная учебная модель при прочих равных. Знак связи не задаёт величину ответа, задержку, диагноз или сокращение мышцы. В реальности пути взаимодействуют параллельно.",
  paths:{
   direct:{label:"Прямой",nodes:["Кора","Стриатум (D1)","GPi/SNr","Таламус","Кора"],
    signs:["+","−","−","+"],
    steps:[
     "Корковый глутамат возбуждает определённые стриарные нейроны.",
     "ГАМК-ергические нейроны прямого пути тормозят выходные ядра GPi/SNr.",
     "Снижение тонического торможения GPi/SNr растормаживает соответствующие нейроны таламуса.",
     "Таламокорковая проекция возбуждает корковые сети. Это не прямая команда мышце."
    ]},
   indirect:{label:"Непрямой",nodes:["Кора","Стриатум (D2)","GPe","STN","GPi/SNr","Таламус"],
    signs:["+","−","−","+","−"],
    steps:[
     "Корковый вход возбуждает нейроны стриатума непрямого пути.",
     "Стриатум через ГАМК тормозит наружный сегмент бледного шара (GPe).",
     "Ослабление торможения от GPe растормаживает субталамическое ядро (STN).",
     "Глутаматергический STN возбуждает GPi/SNr.",
     "Выход GPi/SNr усиливает торможение соответствующих таламических нейронов."
    ]},
   hyperdirect:{label:"Гиперпрямой",nodes:["Кора","STN","GPi/SNr","Таламус"],
    signs:["+","+","−"],
    steps:[
     "Часть корковых сигналов поступает в STN, минуя стриатум.",
     "Возбуждающий выход STN повышает активность соответствующих нейронов GPi/SNr.",
     "Тормозный выход GPi/SNr к таламусу может быстро возрасти. Числовую латентность схема не показывает."
    ]}
  }
 },
 EN:{
  heading:"Basal-ganglia circuits: connection signs",positive:"Excites",negative:"Inhibits",step:"Link",
  back:"Back",next:"Next",restart:"Restart",
  note:"Qualitative teaching model with other inputs held fixed. A connection sign gives neither response magnitude, latency, diagnosis nor muscle contraction. Actual circuits interact in parallel.",
  paths:{
   direct:{label:"Direct",nodes:["Cortex","Striatum (D1)","GPi/SNr","Thalamus","Cortex"],
    signs:["+","−","−","+"],
    steps:[
     "Cortical glutamate excites a specified population of striatal neurons.",
     "Direct-pathway GABAergic neurons inhibit the output nuclei GPi/SNr.",
     "Reduced tonic inhibition from GPi/SNr disinhibits the corresponding thalamic neurons.",
     "Thalamocortical projections excite cortical networks, not muscle directly."
    ]},
   indirect:{label:"Indirect",nodes:["Cortex","Striatum (D2)","GPe","STN","GPi/SNr","Thalamus"],
    signs:["+","−","−","+","−"],
    steps:[
     "Cortical input excites indirect-pathway striatal neurons.",
     "Striatum inhibits the external globus pallidus (GPe) through GABA.",
     "Reduced GPe inhibition disinhibits the subthalamic nucleus (STN).",
     "Glutamatergic STN output excites GPi/SNr.",
     "GPi/SNr output increases inhibition of corresponding thalamic neurons."
    ]},
   hyperdirect:{label:"Hyperdirect",nodes:["Cortex","STN","GPi/SNr","Thalamus"],
    signs:["+","+","−"],
    steps:[
     "Some cortical signals reach STN without passing through striatum.",
     "Excitatory STN output increases activity in the corresponding GPi/SNr population.",
     "Inhibitory GPi/SNr output to thalamus may rise rapidly. No numerical latency is depicted."
    ]}
  }
 },
 KZ:{
  heading:"Базальды ганглийлер контурлары: байланыс әсерлері",positive:"Қоздырады",negative:"Тежейді",step:"Буын",
  back:"Артқа",next:"Келесі",restart:"Басынан",
  note:"Басқа кірістер тұрақты деп алынған сапалық оқу үлгісі. Байланыс әсері жауап шамасын, латенттілікті, диагнозды немесе бұлшықеттің жиырылуын көрсетпейді. Нақты контурлар қатар әрекеттеседі.",
  paths:{
   direct:{label:"Тікелей",nodes:["Қыртыс","Стриатум (D1)","GPi/SNr","Таламус","Қыртыс"],
    signs:["+","−","−","+"],
    steps:[
     "Қыртыстың глутаматы стриатум нейрондарының белгілі тобын қоздырады.",
     "Тікелей жолдың ГАМҚ-ергиялық нейрондары GPi/SNr шығыс ядроларын тежейді.",
     "GPi/SNr-дің тұрақты тежеуі азайғанда таламустың тиісті нейрондары тежелуден босайды.",
     "Таламус-қыртыс проекциялары қыртыстық желілерді қоздырады, бұлшықетті тікелей емес."
    ]},
   indirect:{label:"Жанама",nodes:["Қыртыс","Стриатум (D2)","GPe","STN","GPi/SNr","Таламус"],
    signs:["+","−","−","+","−"],
    steps:[
     "Қыртыс кірісі жанама жолдың стриатум нейрондарын қоздырады.",
     "Стриатум ГАМҚ арқылы бозғылт шардың сыртқы сегментін (GPe) тежейді.",
     "GPe-нің тежеуі азайғанда субталамустық ядро (STN) тежелуден босайды.",
     "STN-нің глутаматергиялық шығысы GPi/SNr-ді қоздырады.",
     "GPi/SNr таламустың тиісті нейрондарына тежеуші әсерді күшейтеді."
    ]},
   hyperdirect:{label:"Гипертікелей",nodes:["Қыртыс","STN","GPi/SNr","Таламус"],
    signs:["+","+","−"],
    steps:[
     "Қыртыстың кейбір сигналдары стриатумды айналып өтіп, STN-ге жетеді.",
     "STN-нің қоздырушы шығысы GPi/SNr-дің тиісті нейрондарын белсендіреді.",
     "GPi/SNr-дің таламусқа тежеуші әсері жылдам күшеюі мүмкін. Сызба нақты латенттілікті көрсетпейді."
    ]}
  }
 }
};

export default function ModuleTwelveMediaAnimation({language}:{language:Language}) {
 const [pathId,setPathId]=useState<PathId>("direct");
 const [step,setStep]=useState(0);
 const c=copy[language], path=c.paths[pathId];
 const last=path.signs.length-1;
 const choose=(id:PathId)=>{setPathId(id);setStep(0);};
 return <section data-testid="module-twelve-media-animation" aria-label={c.heading}
  style={{background:"#102437",color:"#fff",borderRadius:16,padding:16,margin:"1rem 0"}}>
  <h3 style={{marginTop:0}}>{c.heading}</h3>
  <div role="group" aria-label={c.heading} style={{display:"flex",flexWrap:"wrap",gap:8}}>
   {(["direct","indirect","hyperdirect"] as PathId[]).map(id=>
    <button key={id} type="button" aria-pressed={pathId===id} onClick={()=>choose(id)}
     style={{border:"2px solid",borderColor:pathId===id?"#67e8f9":"#94a3b8",background:pathId===id?"#164e63":"#1e293b",color:"#fff",borderRadius:8,padding:"8px 12px"}}>
     {c.paths[id].label}
    </button>)}
  </div>
  <div role="group" aria-label={path.label} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:6,margin:"1rem 0"}}>
   {path.nodes.map((node,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
    {i>0&&<span aria-label={path.signs[i-1]==="+"?c.positive:c.negative}
      title={path.signs[i-1]==="+"?c.positive:c.negative}
      style={{fontWeight:800,color:path.signs[i-1]==="+"?"#86efac":"#fda4af",whiteSpace:"nowrap"}}>
      {path.signs[i-1]==="+"?"+":"−"} →
    </span>}
    <button type="button" onClick={()=>setStep(Math.max(0,Math.min(i-1,last)))}
     aria-current={i===step+1?"step":undefined}
     style={{padding:"10px 12px",borderRadius:8,minHeight:52,
       border:"2px solid",borderColor:i===step+1?"#67e8f9":"#64748b",
       background:i===step+1?"#155e75":"#1e293b",color:"#fff"}}>
      {node}
    </button>
   </div>)}
  </div>
  <p aria-live="polite" role="status" style={{lineHeight:1.65,minHeight:80}}>
   <strong>{c.step} {step+1}/{path.steps.length}: {path.nodes[step]} {path.signs[step]==="+"?c.positive.toLowerCase():c.negative.toLowerCase()} {path.nodes[step+1]}. </strong>
   {path.steps[step]}
  </p>
  <p style={{fontSize:".9rem",lineHeight:1.5}}>{c.note}</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{c.back}</button>
   <button type="button" disabled={step===last} onClick={()=>setStep(v=>Math.min(last,v+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStep(0)}>{c.restart}</button>
  </div>
 </section>;
}
