"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Signs refer to the immediate synaptic influence, not measured firing rate.
// Both afferent collateral excitation and Purkinje inhibition reach deep nuclei.
type Copy = {
  heading: string; back: string; next: string; reset: string;
  stage: string; excites: string; inhibits: string; note: string;
  labels: [string,string,string,string,string,string];
  stages: [string,string,string];
  descriptions: [string,string,string];
};
const copy: Record<Language,Copy> = {
 RU: {
  heading:"Микротізбек мозжечка: параллельные влияния".replace("Микротізбек","Микросхема"),
  back:"Назад",next:"Далее",reset:"Сначала",stage:"Этап",
  excites:"Возбуждает",inhibits:"Тормозит",
  note:"Знаки показывают тип влияния в упрощённой сети, а не измеренные разряды, скорость, силу движения или диагноз. Все связи действуют в перекрывающихся контурах; этапы служат для объяснения, а не для моделирования реального времени.",
  labels:["Мшистые волокна","Гранулярные клетки","Лазающие волокна (нижняя олива)","Клетки Пуркинье","Глубокие ядра","Таламус / ствол мозга"],
  stages:["Входы и гранулярный слой","Тормозный выход коры","Интеграция в глубоких ядрах"],
  descriptions:[
   "Мшистые волокна возбуждают гранулярные клетки, а их параллельные волокна возбуждают клетки Пуркинье. Лазающие волокна из нижней оливы также возбуждают клетки Пуркинье.",
   "Клетки Пуркинье являются ГАМК-ергическими: их выход тормозит соответствующие нейроны глубоких ядер. Это не означает, что все глубокие ядра всегда молчат.",
   "Коллатерали мшистых и лазающих волокон возбуждают глубокие ядра параллельно торможению Пуркинье. Итоговая активность зависит от баланса входов; основные выходы направляются к таламусу и стволу."
  ]
 },
 EN: {
  heading:"Cerebellar microcircuit: parallel influences",
  back:"Back",next:"Next",reset:"Restart",stage:"Stage",
  excites:"Excites",inhibits:"Inhibits",
  note:"Signs indicate synaptic influences in a simplified circuit, not measured spikes, speed, movement force or diagnosis. Connections act in overlapping networks; stages explain relationships rather than model real time.",
  labels:["Mossy fibres","Granule cells","Climbing fibres (inferior olive)","Purkinje cells","Deep nuclei","Thalamus / brainstem"],
  stages:["Afferents and granule layer","Inhibitory cortical output","Deep-nuclear integration"],
  descriptions:[
   "Mossy fibres excite granule cells, whose parallel fibres excite Purkinje cells. Climbing fibres from the inferior olive also excite Purkinje cells.",
   "Purkinje cells are GABAergic: their output inhibits corresponding deep-nuclear neurons. This does not imply that deep nuclei are always silent.",
   "Mossy and climbing fibre collaterals excite deep nuclei in parallel with Purkinje inhibition. Net activity depends on the balance of inputs; major outputs reach thalamic and brainstem targets."
  ]
 },
 KZ: {
  heading:"Мишық микротізбегі: қатар әсер ететін ықпалдар",
  back:"Артқа",next:"Келесі",reset:"Басынан",stage:"Кезең",
  excites:"Қоздырады",inhibits:"Тежейді",
  note:"Белгілер жеңілдетілген тізбектегі синапстық ықпалды көрсетеді; олар нақты импульстерді, жылдамдықты, қозғалыс күшін немесе диагнозды білдірмейді. Байланыстар өзара әрекеттесетін желілерде жұмыс істейді; кезеңдер нақты уақытты емес, түсіндіру ретін көрсетеді.",
  labels:["Мүкті талшықтар","Түйіршікті жасушалар","Өрмелеуші талшықтар (төменгі олива)","Пуркинье жасушалары","Терең ядролар","Таламус / ми бағаны"],
  stages:["Кірістер және түйіршікті қабат","Қыртыстың тежеуші шығысы","Терең ядролардағы біріктіру"],
  descriptions:[
   "Мүкті талшықтар түйіршікті жасушаларды, ал олардың параллель талшықтары Пуркинье жасушаларын қоздырады. Төменгі оливадан шығатын өрмелеуші талшықтар да Пуркинье жасушаларын қоздырады.",
   "Пуркинье жасушалары ГАМҚ-ергиялық: олардың шығысы терең ядролардың тиісті нейрондарын тежейді. Бұл терең ядролар әрдайым үнсіз дегенді білдірмейді.",
   "Мүкті және өрмелеуші талшықтардың коллатералдары Пуркинье тежеуімен қатар терең ядроларды қоздырады. Жалпы белсенділік кірістер теңгеріміне тәуелді; негізгі шығыстар таламус пен ми бағанына бағытталады."
  ]
 }
};
type Edge = {from:number;to:number;sign:"+"|"−";stage:number;via?:string};
const edges: Edge[] = [
 {from:0,to:1,sign:"+",stage:0},
 {from:1,to:3,sign:"+",stage:0,via:"parallel fibres"},
 {from:2,to:3,sign:"+",stage:0},
 {from:3,to:4,sign:"−",stage:1},
 {from:0,to:4,sign:"+",stage:2,via:"collateral"},
 {from:2,to:4,sign:"+",stage:2,via:"collateral"},
 {from:4,to:5,sign:"+",stage:2}
];

export default function ModuleThirteenMediaAnimation({language}:{language:Language}) {
 const [stage,setStage]=useState(0);
 const c=copy[language];
 return <section data-testid="module-thirteen-media-animation" aria-label={c.heading}
  style={{background:"#102437",color:"#fff",borderRadius:16,padding:16,margin:"1rem 0"}}>
  <h3 style={{marginTop:0}}>{c.heading}</h3>
  <div role="group" aria-label={c.heading} style={{display:"flex",flexWrap:"wrap",gap:8}}>
   {c.stages.map((label,i)=><button key={i} type="button" aria-pressed={stage===i}
    onClick={()=>setStage(i)}
    style={{padding:"8px 12px",borderRadius:8,color:"#fff",
      background:stage===i?"#155e75":"#1e293b",border:"2px solid",
      borderColor:stage===i?"#67e8f9":"#94a3b8"}}>{i+1}. {label}</button>)}
  </div>
  <div role="img" aria-label={c.stages[stage]+". "+c.descriptions[stage]}
   style={{display:"grid",gap:8,margin:"1rem 0"}}>
   {edges.map((edge,i)=><div key={i}
    style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,
      borderRadius:8,padding:8,background:edge.stage===stage?"#155e75":"#1e293b",
      border:edge.stage===stage?"2px solid #67e8f9":"1px solid #64748b",
      opacity:edge.stage===stage?1:0.65}}>
    <span>{c.labels[edge.from]}</span>
    <strong style={{color:edge.sign==="+"?"#86efac":"#fda4af"}}>
      {edge.sign} →</strong>
    <span>{c.labels[edge.to]}</span>
    <small>({edge.sign==="+"?c.excites:c.inhibits})</small>
   </div>)}
  </div>
  <p role="status" aria-live="polite" style={{minHeight:90,lineHeight:1.6}}>
   <strong>{c.stage} {stage+1}/3 — {c.stages[stage]}. </strong>{c.descriptions[stage]}
  </p>
  <p style={{fontSize:".9rem",lineHeight:1.5}}>{c.note}</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
   <button type="button" disabled={stage===0} onClick={()=>setStage(v=>Math.max(0,v-1))}>{c.back}</button>
   <button type="button" disabled={stage===2} onClick={()=>setStage(v=>Math.min(2,v+1))}>{c.next}</button>
   <button type="button" onClick={()=>setStage(0)}>{c.reset}</button>
  </div>
 </section>;
}
