"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Qualitative interactive motor-network map. Not a measured signal or a diagnostic test.
// The cards denote functional contributions, NOT a serial anatomical tract.
const copy={
 RU:{
  heading:"Двигательная команда и сенсорная коррекция",
  command:"Подготовка и команда",feedback:"Сенсорная коррекция",
  commandLabels:["Выбор действия","Корковый выход","Нисходящие пути","Спинальный выход"],
  commandSteps:[
   "Ассоциативные и премоторные области взаимодействуют с петлями базальных ганглиев, мозжечка и таламуса. Эти петли не выстроены в одну линию.",
   "Моторные области коры направляют команды в кортикоспинальные, кортикобульбарные и связанные стволовые сети.",
   "Большинство кортикоспинальных волокон перекрещивается в каудальном продолговатом мозге. Стволовые пути участвуют в постуральной настройке.",
   "Спинальные интернейроны и α-мотонейроны объединяют входы; нижний мотонейрон обеспечивает конечный нервный выход к мышце."
  ],
  feedbackLabels:["Движение","Рецепторы","Центральная оценка","Коррекция"],
  feedbackSteps:[
   "Реальное движение зависит от команды, состояния мышцы, нагрузки и окружающей среды.",
   "Мышечные веретёна, другие соматосенсорные рецепторы и зрение дают информацию о состоянии и результате движения.",
   "Спинальные, мозжечковые и корковые сети используют афферентацию; их взаимодействие не сводится к одной обязательной цепи.",
   "Обратная связь помогает уменьшить ошибку, но требует времени; упреждающее управление также влияет на результат."
  ],
  note:"Функциональная схема без измеренных латентностей, точной геометрии волокон или численной оценки силы. Она не заменяет обследование. Выбор этапа показывает объяснение, а не изменяет состояние пациента.",
  previous:"Назад",next:"Далее",restart:"Сначала",phase:"Этап"
 },
 EN:{
  heading:"Motor command and sensory correction",
  command:"Preparation and command",feedback:"Sensory correction",
  commandLabels:["Action selection","Cortical output","Descending pathways","Spinal output"],
  commandSteps:[
   "Association and premotor cortices interact with basal ganglia, cerebellar and thalamic loops. These loops are not arranged in one serial line.",
   "Motor cortical regions send commands through corticospinal, corticobulbar and associated brainstem networks.",
   "Most corticospinal fibers cross in the caudal medulla. Brainstem pathways contribute to postural adjustment.",
   "Spinal interneurons and alpha motor neurons integrate inputs; lower motor neurons provide the final neural output to muscle."
  ],
  feedbackLabels:["Movement","Receptors","Central evaluation","Correction"],
  feedbackSteps:[
   "Actual movement depends on the command, muscle state, load and environment.",
   "Muscle spindles, other somatosensory receptors and vision report body state and movement outcome.",
   "Spinal, cerebellar and cortical networks use afferent signals; their interactions are not a single obligatory chain.",
   "Feedback can reduce error but takes time; anticipatory control also shapes the outcome."
  ],
  note:"Functional schematic without measured latencies, exact fiber geometry or numerical strength scores. Not a clinical examination. Choosing a stage reveals an explanation; it does not change a patient's condition.",
  previous:"Back",next:"Next",restart:"Restart",phase:"Stage"
 },
 KZ:{
  heading:"Қозғалтқыш команда және сенсорлық түзету",
  command:"Дайындау және команда",feedback:"Сенсорлық түзету",
  commandLabels:["Әрекетті таңдау","Қыртыстық шығыс","Төмендеуші жолдар","Жұлындық шығыс"],
  commandSteps:[
   "Ассоциативтік және премоторлық қыртыс базальды ганглийлер, мишық және таламус ілмектерімен өзара әрекеттеседі. Бұл ілмектер бір тізбекке тізілмейді.",
   "Қозғалтқыш қыртыс аймақтары командаларды кортикоспиналдық, кортикобульбарлық және ми бағанының байланысты желілері арқылы жібереді.",
   "Кортикоспиналдық талшықтардың көбі сопақша мидың каудалдық бөлігінде айқасады. Ми бағаны жолдары дене қалпын реттеуге қатысады.",
   "Жұлын интернейрондары мен α-мотонейрондар кірістерді біріктіреді; төменгі мотонейрондар бұлшықетке соңғы жүйкелік шығысты береді."
  ],
  feedbackLabels:["Қозғалыс","Рецепторлар","Орталық бағалау","Түзету"],
  feedbackSteps:[
   "Нақты қозғалыс командаға, бұлшықет күйіне, жүктемеге және қоршаған ортаға тәуелді.",
   "Бұлшықет ұршықтары, басқа соматосенсорлық рецепторлар және көру жүйесі дене күйі мен қозғалыс нәтижесі туралы ақпарат береді.",
   "Жұлын, мишық және қыртыс желілері афференттік сигналдарды қолданады; олардың өзара әсері бір ғана міндетті тізбек емес.",
   "Кері байланыс қатені азайта алады, бірақ оған уақыт керек; алдын ала басқару да нәтижеге әсер етеді."
  ],
  note:"Өлшенген латенттілік, талшықтардың нақты геометриясы немесе күштің сандық бағасы жоқ функционалдық сызба. Клиникалық тексеруді алмастырмайды. Кезеңді таңдау түсіндірмені көрсетеді, науқастың күйін өзгертпейді.",
  previous:"Артқа",next:"Келесі",restart:"Басынан",phase:"Кезең"
 }
} as const;

export default function ModuleElevenMediaAnimation({language}:{language:Language}){
 const [mode,setMode]=useState<"command"|"feedback">("command");
 const [step,setStep]=useState(0);
 const c=copy[language];
 const labels=mode==="command"?c.commandLabels:c.feedbackLabels;
 const descriptions=mode==="command"?c.commandSteps:c.feedbackSteps;
 return <section data-testid="module-eleven-media-animation" aria-label={c.heading}
  style={{background:"#102437",color:"#fff",borderRadius:"1rem",padding:"1rem",margin:"1rem 0"}}>
  <h3 style={{marginTop:0}}>{c.heading}</h3>
  <div role="group" aria-label={c.heading} style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   <button type="button" aria-pressed={mode==="command"} onClick={()=>{setMode("command");setStep(0);}}>{c.command}</button>
   <button type="button" aria-pressed={mode==="feedback"} onClick={()=>{setMode("feedback");setStep(0);}}>{c.feedback}</button>
  </div>
  <div role="group" aria-label={c.phase} style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,150px),1fr))",gap:8,marginTop:16}}>
   {labels.map((label,i)=><button key={label} type="button" aria-pressed={step===i}
    onClick={()=>setStep(i)}
    style={{textAlign:"start",border:"2px solid",borderColor:step===i?"#67e8f9":"#6b7280",
     background:step===i?"#164e63":"#1e293b",color:"#fff",borderRadius:10,padding:12,minHeight:72}}>
    <span style={{display:"block",fontSize:12,opacity:.85}}>{i+1}/4</span>
    <strong>{label}</strong>
   </button>)}
  </div>
  <p role="status" aria-live="polite" style={{minHeight:80,padding:"12px 0",lineHeight:1.6}}>
   <strong>{c.phase} {step+1}: {labels[step]}. </strong>{descriptions[step]}
  </p>
  <p style={{fontSize:".9rem",lineHeight:1.5}}>{c.note}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>{c.previous}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(s=>Math.min(3,s+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStep(0)}>{c.restart}</button>
  </div>
 </section>;
}
