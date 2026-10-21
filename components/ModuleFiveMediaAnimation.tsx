"use client";
import { useState } from "react";
import type { Language } from "../content/course";

// A user-stepped conceptual diagram, NOT a quantitative simulation or recorded synapse.
// No automatic movement; accessible with keyboard and reduced-motion preferences.
const copy = {
 RU: {
  phases: [
   ["Приход импульса", "Потенциал действия достиг пресинаптического окончания. Сам по себе приход импульса ещё не равен выделению медиатора."],
   ["Вход Ca²⁺", "Деполяризация открывает потенциал-зависимые Ca²⁺-каналы пресинаптической мембраны. Ca²⁺ входит в окончание."],
   ["Выделение медиатора", "Ca²⁺ увеличивает вероятность слияния синаптических везикул в активной зоне. Выделение квантовое и вероятностное."],
   ["Постсинаптический ответ", "После экзоцитоза медиатор диффундирует через щель и связывается с рецепторами. Быстрый ионотропный ответ может быть деполяризующим, гиперполяризующим или шунтирующим (с малым изменением Vm); новый импульс не гарантирован."],
  ],
  note: "Учебная схема: число точек, размеры, расположение и интервалы не соответствуют измеренным молекулам, квантам или миллисекундам. Случайное выделение и миниатюрные ответы здесь не моделируются.",
  back:"Назад",next:"Следующий этап",reset:"С начала",
  terminal:"Пресинаптическое окончание",cell:"Постсинаптическая клетка",cleft:"Щель",
 },
 EN: {
  phases: [
   ["Spike arrival", "An action potential reaches the presynaptic terminal. Spike arrival is not itself transmitter release."],
   ["Ca²⁺ entry", "Depolarization opens voltage-gated Ca²⁺ channels in the presynaptic membrane. Ca²⁺ enters the terminal."],
   ["Transmitter release", "Ca²⁺ raises the probability of vesicle fusion at the active zone. Release is quantal and probabilistic."],
   ["Postsynaptic response", "After exocytosis, transmitter diffuses across the synaptic cleft and binds to receptors. A fast ionotropic response can depolarize, hyperpolarize, or shunt current (with little change in Vm); another spike is not guaranteed."],
  ],
  note: "Teaching schematic: dot counts, sizes, locations and intervals are not measured molecules, quanta or milliseconds. Stochastic release and miniature events are not simulated.",
  back:"Back",next:"Next stage",reset:"Restart",
  terminal:"Presynaptic terminal",cell:"Postsynaptic cell",cleft:"Cleft",
 },
 KZ: {
  phases: [
   ["Импульстің келуі", "Әрекет потенциалы пресинапстық ұшқа жетеді. Импульстің келуі медиатордың бөлінуімен бірдей емес."],
   ["Ca²⁺ енуі", "Деполяризация пресинапстық мембранадағы кернеуге тәуелді Ca²⁺ арналарын ашады. Ca²⁺ ұшқа енеді."],
   ["Медиатордың бөлінуі", "Ca²⁺ белсенді аймақта көпіршіктердің мембранамен қосылу ықтималдығын арттырады. Бөліну кванттық әрі ықтималдық сипатта болады."],
   ["Постсинапстық жауап", "Экзоцитоздан кейін медиатор синапстық саңылау арқылы диффузияланып, рецепторлармен байланысады. Жылдам ионотроптық жауап деполяризация, гиперполяризация немесе Vm аз өзгеретін шунттаушы тежелу тудыруы мүмкін; жаңа импульс міндетті емес."],
  ],
  note: "Оқу сызбасы: нүктелердің саны, өлшемі, орны мен уақыт аралықтары нақты молекулаларға, кванттарға немесе миллисекундтарға сәйкес келмейді. Кездейсоқ бөліну мен миниатюралық жауаптар модельденбейді.",
  back:"Артқа",next:"Келесі кезең",reset:"Басынан",
  terminal:"Пресинапстық ұш",cell:"Постсинапстық жасуша",cleft:"Саңылау",
 },
} as const;

export default function ModuleFiveMediaAnimation({language}:{language:Language}) {
 const [step,setStep]=useState(0);
 const c=copy[language];
 const phase=c.phases[step];
 return <section style={{padding:16,borderRadius:16,background:"#0b2437",color:"#f8fafc"}}>
  <h3 aria-live="polite" style={{marginTop:0}}>{step+1}/4 — {phase[0]}</h3>
  <svg viewBox="0 0 680 245" role="img" aria-label={phase[0]+": "+phase[1]}
   style={{width:"100%",background:"#071827",borderRadius:12}}>
   <rect x="25" y="65" width="266" height="144" rx="22" fill="#1e40af" stroke="#93c5fd" strokeWidth="3"/>
   <rect x="411" y="65" width="245" height="144" rx="22" fill="#0f766e" stroke="#99f6e4" strokeWidth="3"/>
   <text x="35" y="27" fontSize="16" fill="#e2e8f0">{c.terminal}</text>
   <text x="417" y="27" fontSize="16" fill="#e2e8f0">{c.cell}</text>
   <text x="318" y="229" fontSize="14" fill="#e2e8f0">{c.cleft}</text>
   <path d="M290 65 V209 M411 65 V209" stroke="#cbd5e1" strokeWidth="4"/>
   <path d="M65 145 H140" stroke={step>=0?"#fde047":"#64748b"} strokeWidth="7" strokeLinecap="round"/>
   <path d="M135 133 L155 145 L135 157" fill="none" stroke="#fde047" strokeWidth="5"/>
   <text x="63" y="122" fontSize="17" fill="#fde047">AP</text>
   {[0,1].map(i=><g key={i}>
    <circle cx={207+i*23} cy={116+(i%2)*28} r="12" fill="#c4b5fd" stroke="#ddd6fe" strokeWidth="2"/>
    <circle cx={207+i*23} cy={116+(i%2)*28} r="4" fill="#7c3aed"/>
   </g>)}
   {step<2
    ? <circle cx="268" cy="145" r="12" fill="#c4b5fd" stroke="#ddd6fe" strokeWidth="2"/>
    : <g aria-hidden="true">
       <path d="M290 133 A13 13 0 1 0 290 157" fill="none" stroke="#ddd6fe" strokeWidth="4"/>
       <path d="M290 133 H299 M290 157 H299" fill="none" stroke="#ddd6fe" strokeWidth="3"/>
      </g>}
   <rect x="281" y="162" width="19" height="31" rx="5" fill="#38bdf8"/>
   {step>=1 && <g>
    <text x="221" y="191" fontSize="18" fill="#7dd3fc">Ca²⁺</text>
    <path d="M315 175 H276" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round"/>
    <path d="M283 168 L272 175 L283 182" fill="none" stroke="#7dd3fc" strokeWidth="3"/>
   </g>}
   {step>=2 && <g>
    {[0,1,2,3,4].map(i=><circle key={i} cx={step>=3?367+(i%3)*15:326+(i%3)*24} cy={step>=3?122+(i%2)*16:100+(i%2)*42} r="6" fill="#fde047"/>)}
    <path d="M297 139 H390" stroke="#fde047" strokeWidth="3" strokeDasharray="6 7"/>
   </g>}
   <path d="M412 113 h17 v35 h-17" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round"/>
   {step>=3 && <g>
    <path d="M445 130 H485 Q498 130 507 109 Q525 96 548 121 L558 130" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M445 130 H485 Q498 130 507 151 Q525 164 548 139 L558 130" stroke="#c4b5fd" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M445 130 H558" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 5" />
    <text x="563" y="106" fontSize="14" fill="#bbf7d0">+ΔVm</text>
    <text x="563" y="160" fontSize="14" fill="#ddd6fe">−ΔVm</text>
   </g>}
  </svg>
  <p>{phase[1]}</p>
  <p style={{fontSize:14,color:"#cbd5e1"}}>{c.note}</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
   <button type="button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>{c.back}</button>
   <button type="button" disabled={step===3} onClick={()=>setStep(v=>Math.min(3,v+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStep(0)}>{c.reset}</button>
  </div>
 </section>;
}
