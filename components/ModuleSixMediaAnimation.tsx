"use client";

import {useState} from "react";
import type {Language} from "../content/course";

// Four user-controlled explanatory states, not a recording or a numerical
// conductance simulation. Values match IntegrationExperimentLab.tsx at
// mode="spatial": baseline −70; EPSP +6; illustrative IPSP −4.5 mV.
const states=[
 {exc:0,inh:0,vm:-70},
 {exc:2,inh:0,vm:-58},
 {exc:3,inh:0,vm:-52},
 {exc:3,inh:1,vm:-56.5}
] as const;
const copy={
 RU:{
  stage:["Исходное состояние","Два одновременных ВПСП","Три одновременных ВПСП","Добавлен один ТПСП"],
  title:"Схема линейной суммации, не запись Vm",axis:"Условная оценка Vm",
  threshold:"Условный порог −55 мВ",baseline:"Исходный уровень −70 мВ",
  formula:"Расчёт",epsp:"ВПСП",ipsp:"ТПСП",
  below:"Ниже условного порога",above:"Выше условного порога в модели",
  limit:"Это арифметическая модель. Она не рассчитывает шунтирование, реальную дендритную интеграцию или запуск ПД.",
  previous:"Предыдущий шаг",next:"Следующий шаг",replay:"Повторить"
 },
 EN:{
  stage:["Baseline","Two simultaneous EPSPs","Three simultaneous EPSPs","Add one IPSP"],
  title:"Linear summation schematic, not a Vm recording",axis:"Illustrative Vm estimate",
  threshold:"Illustrative threshold −55 mV",baseline:"Baseline −70 mV",
  formula:"Calculation",epsp:"EPSPs",ipsp:"IPSPs",
  below:"Below illustrative threshold",above:"Above illustrative threshold in the model",
  limit:"This is arithmetic, not a conductance model. It does not compute shunting, real dendritic integration or spike initiation.",
  previous:"Previous step",next:"Next step",replay:"Replay"
 },
 KZ:{
  stage:["Бастапқы күй","Бір мезгілдегі екі ҚПСП","Бір мезгілдегі үш ҚПСП","Бір ТПСП қосылды"],
  title:"Сызықтық суммация сызбасы, Vm жазбасы емес",axis:"Vm-нің шартты бағасы",
  threshold:"Шартты табалдырық −55 мВ",baseline:"Бастапқы деңгей −70 мВ",
  formula:"Есеп",epsp:"ҚПСП",ipsp:"ТПСП",
  below:"Шартты табалдырықтан төмен",above:"Модельдегі шартты табалдырықтан жоғары",
  limit:"Бұл — арифметикалық модель. Шунттау, нақты дендриттік интеграция және әрекет потенциалының басталуы есептелмейді.",
  previous:"Алдыңғы қадам",next:"Келесі қадам",replay:"Қайталау"
 }
} as const;

export default function ModuleSixMediaAnimation({language}:{language:Language}){
 const [step,setStep]=useState(0);
 const c=copy[language];
 const {exc,inh,vm}=states[step];
 const threshold=-55;
 const y=(value:number)=>180-(value+75)*4;
 const above=vm>=threshold;
 return <section data-testid="module-six-media-animation" aria-label={c.title}
   style={{padding:16,borderRadius:14,background:"#092338",color:"#f7fafc"}}>
  <h3 style={{marginTop:0}}>{c.title}</h3>
  <p aria-live="polite" role="status"><strong>{step+1}/4. {c.stage[step]}</strong></p>
  <svg viewBox="0 0 640 220" role="img"
   aria-label={`${c.axis}: ${vm} mV. ${above?c.above:c.below}`}
   style={{display:"block",width:"100%",background:"#102e43",borderRadius:10}}>
   <line x1="65" x2="585" y1={y(-70)} y2={y(-70)} stroke="#9cb8ce" strokeDasharray="5 6"/>
   <line x1="65" x2="585" y1={y(threshold)} y2={y(threshold)} stroke="#fcd34d" strokeWidth="2" strokeDasharray="8 5"/>
   <line x1="65" x2="585" y1={y(vm)} y2={y(vm)} stroke={above?"#86efac":"#7dd3fc"} strokeWidth="4"/>
   <circle cx="330" cy={y(vm)} r="8" fill={above?"#86efac":"#7dd3fc"}/>
   <text x="70" y="30" fill="white" fontSize="16">{c.axis}: {vm} mV</text>
   <text x="70" y="48" fill="#e2e8f0" fontSize="13">{c.formula}: −70 + {exc} × 6 − {inh} × 4.5</text>
   <text x="70" y={y(threshold)-8} fill="#fde68a" fontSize="13">{c.threshold}</text>
   <text x="70" y="204" fill="#d5e5f0" fontSize="13">{c.baseline}</text>
  </svg>
  <p>{c.epsp}: {exc} × +6 mV · {c.ipsp}: {inh} × −4.5 mV ·
   <strong> {above?c.above:c.below}</strong></p>
  <p style={{fontSize:"0.92rem"}}>{c.limit}</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{c.previous}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(v=>Math.min(3,v+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStep(0)}>{c.replay}</button>
  </div>
 </section>;
}
