"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// This interactive pathway map is a qualitative teaching aid.
// Horizontal positions are stages of transmission, not anatomical distances.
// It does not measure latency, signal amplitude or clinical sensory thresholds.
const copy = {
  RU: {
    title: "Сравните место перекрёста двух чувствительных путей",
    stage: ["Первичный афферент", "Первое переключение", "Перекрёст", "Таламус и кора"],
    dorsal: "Вибрация / положение",
    pain: "Боль / температура",
    dorsalSteps: ["Левый спинномозговой узел → задний столб слева", "Тонкое / клиновидное ядро слева, продолговатый мозг", "Перекрёст в продолговатом мозге → медиальная петля справа", "Правый VPL → правая соматосенсорная кора"],
    painSteps: ["Левый спинномозговой узел → задний рог", "Синапс в заднем роге; возможен ход по тракту Лиссауэра", "Передняя белая спайка спинного мозга → путь справа", "Правый VPL и другие проекции → кора"],
    note: "Стороны приведены для сигналов от левой половины туловища или конечности. Стрелки показывают логическую последовательность, не скорость и не точные размеры. Боле-температурный путь может переходить на противоположную сторону вблизи уровня входа, а не строго в одном сегменте.",
    previous: "Назад", next: "Далее", restart: "Сначала"
  },
  EN: {
    title: "Compare where the two sensory pathways cross",
    stage: ["Primary afferent", "First relay", "Crossing", "Thalamus and cortex"],
    dorsal: "Vibration / position",
    pain: "Pain / temperature",
    dorsalSteps: ["Left dorsal root ganglion → left dorsal column", "Left gracile / cuneate nucleus in medulla", "Cross in medulla → right medial lemniscus", "Right VPL → right somatosensory cortex"],
    painSteps: ["Left dorsal root ganglion → dorsal horn", "Dorsal horn relay; possible passage in Lissauer's tract", "Anterior white commissure in cord → right-sided ascent", "Right VPL and other projections → cortex"],
    note: "Sides refer to signals from the left trunk or limb. Arrows show sequence, not conduction velocity or anatomical scale. Pain-temperature fibers may cross near the entry level, not necessarily within one exact segment.",
    previous: "Previous", next: "Next", restart: "Restart"
  },
  KZ: {
    title: "Екі сезімталдық жолының қай жерде айқасатынын салыстырыңыз",
    stage: ["Бірінші афферент", "Бірінші синапс", "Айқасу", "Таламус пен қыртыс"],
    dorsal: "Діріл / буын қалпы",
    pain: "Ауырсыну / температура",
    dorsalSteps: ["Сол жақ жұлын түйіні → сол жақ артқы баған", "Сол жақ нәзік / сына тәрізді ядро, сопақша ми", "Сопақша мида айқасу → оң жақ медиалдық ілмек", "Оң жақ VPL → оң жақ соматосенсорлық қыртыс"],
    painSteps: ["Сол жақ жұлын түйіні → артқы мүйіз", "Артқы мүйіздегі синапс; Лиссауэр жолымен өтуі мүмкін", "Жұлындағы алдыңғы ақ комиссура → оң жақпен жоғарылау", "Оң жақ VPL және басқа проекциялар → қыртыс"],
    note: "Жақтар тұлға не аяқ-қолдың сол жағынан келетін сигналға қатысты көрсетілген. Бағыттауыштар жылдамдықты немесе анатомиялық өлшемді емес, реттілікті білдіреді. Ауырсыну мен температура талшықтары дәл бір сегментте емес, кірген деңгейге жақын айқасуы мүмкін.",
    previous: "Артқа", next: "Келесі", restart: "Басынан"
  }
} as const;

export default function ModuleEightMediaAnimation({ language }: { language: Language }) {
  const [step, setStep] = useState(0);
  const c = copy[language];
  const rows = [
    { name: c.dorsal, steps: c.dorsalSteps, accent: "#67e8f9" },
    { name: c.pain, steps: c.painSteps, accent: "#fda4af" }
  ];
  return <section data-testid="module-eight-media-animation"
    aria-label={c.title}
    style={{background:"#102437",color:"#fff",padding:"1rem",borderRadius:"1rem",margin:"1rem 0"}}>
    <h3 style={{marginTop:0}}>{c.title}</h3>
    <p aria-live="polite"><strong>{step+1}/4 — {c.stage[step]}</strong></p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,280px),1fr))",gap:"1rem"}}>
      {rows.map(row=><div key={row.name} style={{border:"1px solid #52728b",borderRadius:12,padding:12}}>
        <h4 style={{color:row.accent,marginTop:0}}>{row.name}</h4>
        <ol style={{paddingInlineStart:"1.4rem",marginBottom:0}}>
          {row.steps.map((item,i)=><li key={i}
            aria-current={i===step?"step":undefined}
            style={{marginBottom:10,opacity:i<=step?1:0.48,fontWeight:i===step?700:400,
              borderInlineStart:i===step?`4px solid ${row.accent}`:"4px solid transparent",
              paddingInlineStart:8}}>
            {item}
          </li>)}
        </ol>
      </div>)}
    </div>
    <p style={{fontSize:"0.9rem",lineHeight:1.5}}>{c.note}</p>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <button type="button" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>{c.previous}</button>
      <button type="button" disabled={step===3} onClick={()=>setStep(s=>Math.min(3,s+1))}>{c.next}</button>
      <button type="button" onClick={()=>setStep(0)}>{c.restart}</button>
    </div>
  </section>;
}
