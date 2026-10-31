"use client";

import { useMemo, useState } from "react";
import type { Language } from "../content/course";

type Condition = "baseline" | "salt" | "wash";
type Prediction = "shorter" | "longer" | "absent";

const copy = {
  RU: {
    title: "Классический опыт Сеченова: центральное торможение",
    intro: "Воспроизведите исторический опыт на виртуальном препарате лягушки. Раздражитель действует на лапку; кристалл NaCl на области зрительных бугров усиливает нисходящее торможение спинального рефлекса.",
    ethics: "Только цифровая учебная модель. Животное не используется; лабораторные манипуляции показаны исторически и схематично. Численные значения латентного времени условны, не получены из экспериментальных данных и не предназначены для клинической интерпретации.",
    condition: "Условие опыта", baseline: "До нанесения NaCl", salt: "Кристалл NaCl", wash: "После промывания",
    strength: "Сила раздражителя", predict: "Ваш прогноз", shorter: "Латентность уменьшится", longer: "Латентность увеличится", absent: "Ответ исчезнет",
    run: "Запустить опыт", reset: "Сбросить", latency: "Латентное время", response: "Результат",
    baselineResult: "Спинальный рефлекс сохранён: лапка отдёргивается после короткой задержки.",
    saltResult: "Нисходящее торможение подавляет нейроны рефлекторного центра: ответ запаздывает или не возникает при слабом раздражителе.",
    washResult: "После удаления NaCl тормозное влияние ослабевает, рефлекс частично восстанавливается.",
    correct: "Прогноз подтверждён.", incorrect: "Сравните результат с механизмом центрального торможения.",
    labels: ["Зрительные бугры", "Нисходящее торможение", "Спинной мозг", "Чувствительный вход", "Двигательный выход"],
    table: "Протокол измерений", mechanism: "Механизм", mechanismText: "Торможение возникает в центральной нервной системе, а не из-за повреждения нерва или мышцы. Усиление нисходящего влияния повышает порог спинального рефлекса.",
  },
  EN: {
    title: "Sechenov’s classic experiment: central inhibition",
    intro: "Reproduce the historical experiment using a virtual frog preparation. The foot receives a stimulus; a NaCl crystal over the optic-thalamic region strengthens descending inhibition of the spinal reflex.",
    ethics: "Digital teaching model only. No animal is used; historical laboratory manipulations are represented schematically. Reflex latency values are illustrative, not derived from experimental data, and must not be interpreted clinically.",
    condition: "Experimental condition", baseline: "Before NaCl", salt: "NaCl crystal", wash: "After washout",
    strength: "Stimulus strength", predict: "Your prediction", shorter: "Latency decreases", longer: "Latency increases", absent: "Response disappears",
    run: "Run experiment", reset: "Reset", latency: "Reflex latency", response: "Result",
    baselineResult: "The spinal reflex is intact: the foot withdraws after a short delay.",
    saltResult: "Descending inhibition suppresses neurons in the reflex center: the response is delayed or absent with a weak stimulus.",
    washResult: "After NaCl removal, inhibition weakens and the reflex partially recovers.",
    correct: "Prediction supported.", incorrect: "Compare the result with the mechanism of central inhibition.",
    labels: ["Optic-thalamic region", "Descending inhibition", "Spinal cord", "Sensory input", "Motor output"],
    table: "Measurement log", mechanism: "Mechanism", mechanismText: "Inhibition arises within the central nervous system, not from damage to the nerve or muscle. Stronger descending influence raises the threshold of the spinal reflex.",
  },
  KZ: {
    title: "Сеченовтің классикалық тәжірибесі: орталық тежелу",
    intro: "Тарихи тәжірибені виртуалды бақа препаратымен орындаңыз. Тітіркендіргіш аяққа әсер етеді; көру төмпешіктері аймағындағы NaCl кристалы жұлын рефлексінің төмендеуші тежелуін күшейтеді.",
    ethics: "Тек цифрлық оқу моделі. Жануар қолданылмайды; тарихи зертханалық әрекеттер сызбалық түрде көрсетілген. Рефлекстің латентті уақыт мәндері шартты, тәжірибелік деректерден алынбаған және клиникалық түсіндіруге арналмаған.",
    condition: "Тәжірибе шарты", baseline: "NaCl-ға дейін", salt: "NaCl кристалы", wash: "Жуғаннан кейін",
    strength: "Тітіркендіргіш күші", predict: "Сіздің болжамыңыз", shorter: "Латенттілік азаяды", longer: "Латенттілік артады", absent: "Жауап жоғалады",
    run: "Тәжірибені бастау", reset: "Қалпына келтіру", latency: "Латентті уақыт", response: "Нәтиже",
    baselineResult: "Жұлын рефлексі сақталған: аяқ қысқа кідірістен кейін тартылады.",
    saltResult: "Төмендеуші тежелу рефлекс орталығының нейрондарын басады: әлсіз тітіркендіргіште жауап кешігеді немесе болмайды.",
    washResult: "NaCl алынып тасталғаннан кейін тежелу әлсіреп, рефлекс жартылай қалпына келеді.",
    correct: "Болжам расталды.", incorrect: "Нәтижені орталық тежелу механизмімен салыстырыңыз.",
    labels: ["Көру төмпешіктері", "Төмендеуші тежелу", "Жұлын", "Сезімтал кіріс", "Қозғалтқыш шығыс"],
    table: "Өлшеу хаттамасы", mechanism: "Механизм", mechanismText: "Тежелу жүйке немесе бұлшықет зақымынан емес, орталық жүйке жүйесінде пайда болады. Төмендеуші әсердің күшеюі жұлын рефлексінің табалдырығын жоғарылатады.",
  },
} as const;

export default function SechenovExperiment({ language }: { language: Language }) {
  const c = copy[language];
  const [condition, setCondition] = useState<Condition>("baseline");
  const [strength, setStrength] = useState(55);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [running, setRunning] = useState(false);
  // Lock experimental settings while an observation is in progress.
  const [result, setResult] = useState<{ latency: number | null; expected: Prediction } | null>(null);
  const [rows, setRows] = useState<{ condition: Condition; strength: number; latency: number | null }[]>([]);

  const latency = useMemo(() => {
    const base = Math.max(1.4, 5.8 - strength * 0.055);
    if (condition === "salt" && strength < 42) return null;
    if (condition === "salt") return +(base + 3.8).toFixed(1);
    if (condition === "wash") return +(base + 0.9).toFixed(1);
    return +base.toFixed(1);
  }, [condition, strength]);

  function run() {
    if (!prediction) return;
    setRunning(true);
    setResult(null);
    window.setTimeout(() => {
      const expected: Prediction = latency === null ? "absent" : condition === "salt" ? "longer" : condition === "wash" ? "longer" : "shorter";
      setResult({ latency, expected });
      setRows(current => [...current.slice(-4), { condition, strength, latency }]);
      setRunning(false);
    }, 1450);
  }

  const resultText = condition === "baseline" ? c.baselineResult : condition === "salt" ? c.saltResult : c.washResult;
  const color = condition === "salt" ? "#8b2f46" : condition === "wash" ? "#815b00" : "#076b57";

  return <section id="sechenov-experiment" style={{marginTop:32,padding:"clamp(18px,3vw,30px)",border:"1px solid #b8d2df",borderRadius:20,background:"linear-gradient(145deg,#f8fcfe,#edf7f4)",boxShadow:"0 12px 35px rgba(12,69,91,.09)"}}>
    <p style={{margin:0,fontWeight:800,color:"#00637d",letterSpacing:".04em"}}>HISTORICAL PHYSIOLOGY · 1862</p>
    <h2 style={{color:"#073e5a",fontSize:"clamp(1.35rem,3vw,2rem)"}}>{c.title}</h2>
    <p style={{lineHeight:1.65}}>{c.intro}</p>
    <p style={{padding:12,borderLeft:"4px solid #aa7b14",background:"#fff9e8",borderRadius:8}}><strong>⚖</strong> {c.ethics}</p>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,alignItems:"start"}}>
      <figure style={{margin:0,padding:14,borderRadius:16,background:"#071e2c",color:"white"}}>
        <svg viewBox="0 0 620 390" role="img" aria-label={c.title} style={{width:"100%",height:"auto"}}>
          <defs>
            <linearGradient id="frogBody" x1="0" x2="1"><stop stopColor="#76a873"/><stop offset="1" stopColor="#315e55"/></linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M395 114c65-18 120 8 130 55 12 54-39 95-108 84-41-7-69-35-67-69 2-33 17-58 45-70Z" fill="url(#frogBody)"/>
          <ellipse cx="503" cy="145" rx="13" ry="16" fill="#d9efb7"/><circle cx="507" cy="145" r="6" fill="#071e2c"/>
          <path d="M388 229c-44 24-72 61-91 113m113-105c-14 45-5 78 19 118m-78-114c-64 1-109 22-151 70m111-86c-64-19-120-7-172 24" fill="none" stroke="#568b6a" strokeWidth="25" strokeLinecap="round"/>
          <path d="M193 306l-56 47m290 2 45 17M133 246l-68 18" fill="none" stroke="#8fbd75" strokeWidth="12" strokeLinecap="round"/>
          <path d="M430 134c-28 25-39 52-48 94-12 58-28 75-63 91" fill="none" stroke="#f4d35e" strokeWidth="8" opacity=".9"/>
          <circle cx="432" cy="132" r="12" fill={condition==="salt"?"#fff":"#8ad5c1"} stroke={color} strokeWidth="5"/>
          {condition==="salt" && <g filter="url(#glow)"><path d="M420 112l13-14 13 14-13 15Z" fill="#fff"/><path d="M430 151c-15 28-26 46-39 67" stroke="#e84a6a" strokeWidth="9" strokeDasharray="8 7"/></g>}
          <path d="M197 307c38-18 70-11 105 10" fill="none" stroke={running?"#46d8ff":"#86a7b8"} strokeWidth="8" strokeDasharray="10 8" filter={running?"url(#glow)":undefined}/>
          <path d="M319 319c39 11 72 20 108 36" fill="none" stroke={running&&condition!=="salt"?"#ffb02e":"#86a7b8"} strokeWidth="8" strokeDasharray="10 8"/>
          <g fill="#fff" fontSize="15" fontWeight="700">
            <text x="445" y="100">{c.labels[0]}</text><text x="252" y="220">{c.labels[1]}</text>
            <text x="330" y="292">{c.labels[2]}</text><text x="90" y="295">{c.labels[3]}</text><text x="440" y="345">{c.labels[4]}</text>
          </g>
        </svg>
        <figcaption style={{fontSize:".9rem",color:"#cce3ed"}}>{running ? "● " + c.run : c.mechanismText}</figcaption>
      </figure>

      <div>
        <fieldset style={{border:0,padding:0,margin:"0 0 16px"}}><legend style={{fontWeight:800,marginBottom:8}}>{c.condition}</legend>
          {(["baseline","salt","wash"] as const).map(x=><label key={x} style={{display:"block",padding:"8px 10px",marginBottom:6,borderRadius:8,background:condition===x?"#d8eef4":"#fff"}}>
            <input type="radio" checked={condition===x} disabled={running} onChange={()=>{setCondition(x);setResult(null);}}/> {c[x]}
          </label>)}
        </fieldset>
        <label style={{display:"block",fontWeight:800}}>{c.strength}: {strength}%<input style={{width:"100%",display:"block",margin:"10px 0 18px"}} type="range" min="20" max="100" value={strength} disabled={running} onChange={e=>{setStrength(+e.target.value);setResult(null);}}/></label>
        <fieldset style={{border:0,padding:0,margin:"0 0 16px"}}><legend style={{fontWeight:800,marginBottom:8}}>{c.predict}</legend>
          {(["shorter","longer","absent"] as const).map(x=><label key={x} style={{display:"block",marginBottom:6}}><input type="radio" checked={prediction===x} disabled={running} onChange={()=>setPrediction(x)}/> {c[x]}</label>)}
        </fieldset>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button type="button" onClick={run} disabled={!prediction||running} style={{padding:"11px 18px",border:0,borderRadius:10,background:"#006b84",color:"white",fontWeight:800,cursor:"pointer"}}>▶ {c.run}</button>
          <button type="button" disabled={running} onClick={()=>{setResult(null);setPrediction(null);setRows([]);}} style={{padding:"11px 18px",border:"1px solid #9db8c4",borderRadius:10,background:"white",fontWeight:700}}>↻ {c.reset}</button>
        </div>
        {result && <div aria-live="polite" style={{marginTop:16,padding:14,borderRadius:12,background:"#fff",border:"2px solid "+color}}>
          <strong>{c.latency}: {result.latency===null?"—":result.latency+" s"}</strong>
          <p>{resultText}</p><b style={{color}}>{prediction===result.expected?c.correct:c.incorrect}</b>
        </div>}
      </div>
    </div>

    <details style={{marginTop:20,padding:14,background:"#fff",borderRadius:12}}>
      <summary style={{fontWeight:800,cursor:"pointer"}}>{c.table}</summary>
      <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",marginTop:12}}>
        <thead><tr><th style={{textAlign:"left"}}>{c.condition}</th><th>{c.strength}</th><th>{c.latency}</th></tr></thead>
        <tbody>{rows.map((row,i)=><tr key={i}><td style={{padding:8,borderTop:"1px solid #d9e6eb"}}>{c[row.condition]}</td><td style={{textAlign:"center",borderTop:"1px solid #d9e6eb"}}>{row.strength}%</td><td style={{textAlign:"center",borderTop:"1px solid #d9e6eb"}}>{row.latency===null?"—":row.latency+" s"}</td></tr>)}</tbody>
      </table></div>
    </details>
    <h3 style={{color:"#073e5a"}}>{c.mechanism}</h3><p style={{lineHeight:1.65}}>{c.mechanismText}</p>
  </section>;
}
