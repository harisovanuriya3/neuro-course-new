"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Conceptual circuit stages, not anatomical scale or a measured reflex trace.
// Monosynaptic describes the direct Ia→α-motor neuron central connection;
// reciprocal inhibition is mediated by an additional interneuron.
const copy = {
 RU:{
  heading:"Две разные спинальные цепи",stretch:"Рефлекс растяжения",withdrawal:"Защитное отдёргивание",
  phases:["Рецептор и стимул","Афферент","Спинальная цепь","Двигательный ответ"],
  stretchSteps:[
   "Удар по связке надколенника растягивает мышечные веретёна четырёхглавой мышцы.",
   "Чувствительные Ia-волокна входят в спинной мозг через задний корешок.",
   "Прямая Ia→α-мотонейронная связь моносинаптическая; отдельная Ia-ветвь через тормозный интернейрон уменьшает активность антагониста.",
   "Четырёхглавая мышца сокращается и разгибает колено; реципрокное торможение помогает координации."
  ],
  withdrawalSteps:[
   "Болевой стимул кожи активирует ноцицептивные окончания.",
   "Ноцицептивные афференты входят через задний корешок и активируют интернейронные сети.",
   "Полисинаптические цепи возбуждают сгибатели и тормозят разгибатели; могут вовлекаться несколько сегментов.",
   "Конечность отдёргивается; при подходящих условиях противоположная нога разгибается для опоры."
  ],
  note:"Показана последовательность, а не время, амплитуда ЭМГ или анатомические размеры. Нисходящие влияния изменяют возбудимость обеих цепей. Перекрёстное разгибание не обязательно.",
  previous:"Назад",next:"Далее",reset:"Сначала"
 },
 EN:{
  heading:"Two distinct spinal circuits",stretch:"Stretch reflex",withdrawal:"Protective withdrawal",
  phases:["Receptor and stimulus","Afferent","Spinal circuit","Motor response"],
  stretchSteps:[
   "A patellar tendon tap stretches quadriceps muscle spindles.",
   "Sensory group Ia fibers enter the cord through the dorsal root.",
   "The direct Ia→α-motor neuron connection is monosynaptic; a separate Ia branch recruits an inhibitory interneuron for the antagonist.",
   "Quadriceps contracts to extend the knee; reciprocal inhibition helps coordinate the response."
  ],
  withdrawalSteps:[
   "A noxious skin stimulus activates nociceptive endings.",
   "Nociceptive afferents enter via the dorsal root and recruit interneuronal networks.",
   "Polysynaptic circuits excite flexors and inhibit extensors; several segments may participate.",
   "The limb withdraws; under suitable conditions the opposite leg extends for support."
  ],
  note:"Stages show sequence, not timing, EMG amplitude or anatomical scale. Descending input modulates both circuits. Crossed extension is not obligatory.",
  previous:"Back",next:"Next",reset:"Restart"
 },
 KZ:{
  heading:"Жұлынның екі түрлі тізбегі",stretch:"Созылу рефлексі",withdrawal:"Қорғаныштық тартып алу",
  phases:["Рецептор және тітіркендіргіш","Афферент","Жұлын тізбегі","Қозғалтқыш жауап"],
  stretchSteps:[
   "Тізе тобығының сіңірін соққанда төртбасты бұлшықеттің ұршықтары созылады.",
   "Сезімтал Ia-талшықтары жұлынға артқы түбір арқылы кіреді.",
   "Тікелей Ia→α-мотонейрон байланысы моносинапстық; бөлек Ia-тармақ антагонист үшін тежегіш интернейронды белсендіреді.",
   "Төртбасты бұлшықет жиырылып, тізе жазылады; реципроктық тежелу жауапты үйлестіреді."
  ],
  withdrawalSteps:[
   "Терінің ауырсындыратын тітіркендіргіші ноцицептивтік ұштарды белсендіреді.",
   "Ноцицептивтік афференттер артқы түбір арқылы кіріп, интернейрондық желілерді белсендіреді.",
   "Полисинапстық тізбектер бүккіштерді қоздырып, жазғыштарды тежейді; бірнеше сегмент қатысуы мүмкін.",
   "Аяқ-қол тартып алынады; қолайлы жағдайда қарсы аяқ тірек үшін жазылады."
  ],
  note:"Кезеңдер реттілікті көрсетеді, уақытты, ЭМГ амплитудасын немесе анатомиялық өлшемді емес. Төмендеуші кіріс екі тізбекті де реттейді. Айқаспалы жазылу міндетті емес.",
  previous:"Артқа",next:"Келесі",reset:"Басынан"
 }
} as const;

export default function ModuleNineMediaAnimation({language}:{language:Language}){
 const [mode,setMode]=useState<"stretch"|"withdrawal">("stretch");
 const [step,setStep]=useState(0);
 const c=copy[language];
 const stages=mode==="stretch"?c.stretchSteps:c.withdrawalSteps;
 return <section data-testid="module-nine-media-animation" aria-label={c.heading}
  style={{background:"#102437",color:"#fff",padding:"1rem",borderRadius:"1rem",margin:"1rem 0"}}>
  <h3 style={{marginTop:0}}>{c.heading}</h3>
  <div role="group" aria-label={c.heading} style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   <button type="button" aria-pressed={mode==="stretch"} onClick={()=>{setMode("stretch");setStep(0);}}>{c.stretch}</button>
   <button type="button" aria-pressed={mode==="withdrawal"} onClick={()=>{setMode("withdrawal");setStep(0);}}>{c.withdrawal}</button>
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
