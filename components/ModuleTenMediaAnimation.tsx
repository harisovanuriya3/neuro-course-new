"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Conceptual network map, NOT a measured BAEP waveform or an arousal scale.
// Distributed projections are simplified for learning, not a single serial tract.
const copy={
 RU:{
  heading:"Что показывает цепь — и чего она не показывает",arousal:"Сети бодрствования",auditory:"Ранний слуховой ответ",
  phases:["Вход","Стволовые структуры","Восходящие связи","Допустимый вывод"],
  arousalSteps:[
   "Сенсорные сигналы и внутренние регуляторные влияния меняют активность нервных сетей.",
   "Ретикулярные и нейромодуляторные системы верхнего ствола участвуют в поддержании бодрствования.",
   "Связи с таламусом, гипоталамусом, базальным передним мозгом и корой образуют распределённую сеть.",
   "Бодрствование зависит от взаимодействия сетей; отдельный рефлекс не доказывает сознательное восприятие."
  ],
  auditorySteps:[
   "Повторные короткие звуковые стимулы вызывают небольшие электрические ответы.",
   "Сигнал проходит через слуховой нерв и ряд слуховых структур ствола мозга.",
   "При усреднении выделяют ранние компоненты BAEP; их форма и латентность зависят от условий записи.",
   "Сохранный ранний ответ поддерживает вывод о проведении в части слухового пути, но не о сохранном сознании."
  ],
  note:"Схема качественная: нет измеренных латентностей, амплитуд, процента сознания или точной анатомической геометрии. Не используйте её для диагноза.",
  previous:"Назад",next:"Далее",reset:"Сначала"
 },
 EN:{
  heading:"What a pathway supports — and what it cannot prove",arousal:"Arousal networks",auditory:"Early auditory response",
  phases:["Input","Brainstem structures","Ascending connections","Permitted inference"],
  arousalSteps:[
   "Sensory inputs and internal regulatory signals modulate neural networks.",
   "Upper-brainstem reticular and neuromodulatory systems help sustain wakefulness.",
   "Connections with thalamus, hypothalamus, basal forebrain and cortex form a distributed network.",
   "Wakefulness depends on interacting networks; an individual reflex cannot prove conscious awareness."
  ],
  auditorySteps:[
   "Repeated brief sounds elicit small electrical responses.",
   "Signals travel through the auditory nerve and several brainstem auditory structures.",
   "Averaging reveals early BAEP components whose waveforms and latencies depend on recording conditions.",
   "A preserved early response supports conduction through parts of the auditory pathway, not preserved awareness."
  ],
  note:"Qualitative schematic: no measured latency, amplitude, consciousness percentage or anatomical scale. Do not use it for diagnosis.",
  previous:"Back",next:"Next",reset:"Restart"
 },
 KZ:{
  heading:"Жол нені көрсетеді және нені дәлелдемейді",arousal:"Сергектік желілері",auditory:"Ерте есту жауабы",
  phases:["Кіріс","Ми бағаны құрылымдары","Жоғарылаушы байланыстар","Негізді қорытынды"],
  arousalSteps:[
   "Сенсорлық кірістер мен ішкі реттеуші сигналдар жүйке желілерінің белсенділігін өзгертеді.",
   "Жоғарғы ми бағанының ретикулярлық және нейромодуляторлық жүйелері сергектікті қолдайды.",
   "Таламус, гипоталамус, базалдық алдыңғы ми және қыртыспен байланыстар таралған желіні құрайды.",
   "Сергектік желілердің өзара әсеріне тәуелді; жеке рефлекс саналы қабылдауды дәлелдемейді."
  ],
  auditorySteps:[
   "Қайталанатын қысқа дыбыстар әлсіз электрлік жауаптар туғызады.",
   "Сигнал есту жүйкесі және ми бағанының бірнеше есту құрылымдары арқылы өтеді.",
   "Орташалау ерте ЕШП компоненттерін бөліп көрсетеді; олардың пішіні мен латенттілігі жазба жағдайына тәуелді.",
   "Ерте жауаптың сақталуы есту жолының бір бөлігінде өткізуді көрсетеді, бірақ сананың сақталғанын дәлелдемейді."
  ],
  note:"Сапалық сызба: өлшенген латенттілік, амплитуда, сана пайызы немесе анатомиялық масштаб жоқ. Диагноз қоюға қолданбаңыз.",
  previous:"Артқа",next:"Келесі",reset:"Басынан"
 }
} as const;

export default function ModuleTenMediaAnimation({language}:{language:Language}){
 const [mode,setMode]=useState<"arousal"|"auditory">("arousal");
 const [step,setStep]=useState(0);
 const c=copy[language];
 const stages=mode==="arousal"?c.arousalSteps:c.auditorySteps;
 return <section data-testid="module-ten-media-animation" aria-label={c.heading}
  style={{background:"#102437",color:"#fff",padding:"1rem",borderRadius:"1rem",margin:"1rem 0"}}>
  <h3 style={{marginTop:0}}>{c.heading}</h3>
  <div role="group" aria-label={c.heading} style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   <button type="button" aria-pressed={mode==="arousal"} onClick={()=>{setMode("arousal");setStep(0);}}>{c.arousal}</button>
   <button type="button" aria-pressed={mode==="auditory"} onClick={()=>{setMode("auditory");setStep(0);}}>{c.auditory}</button>
  </div>
  <p aria-live="polite"><strong>{step+1}/4 — {c.phases[step]}</strong></p>
  <ol style={{paddingInlineStart:"1.5rem"}}>
   {stages.map((stage,i)=><li key={i} aria-current={i===step?"step":undefined}
    style={{marginBottom:10,opacity:i<=step?1:0.48,
     borderInlineStart:i===step?"4px solid #67e8f9":"4px solid transparent",
     paddingInlineStart:8,fontWeight:i===step?700:400}}>
    <strong>{c.phases[i]}: </strong>{stage}
   </li>)}
  </ol>
  <p style={{fontSize:"0.9rem",lineHeight:1.5}}>{c.note}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>{c.previous}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(s=>Math.min(3,s+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStep(0)}>{c.reset}</button>
  </div>
 </section>;
}
