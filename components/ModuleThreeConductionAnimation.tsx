"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Qualitative axon schematic. The step sequence is not a conduction-velocity
// measurement and does not predict whether a particular patient has a block.
const copy = {
  RU: {
    title: "Миелин и проведение по аксону",
    subtitle: "Сравнение двух одинаковых аксонов: сверху миелин сохранён, снизу один межузловой участок демиелинизирован.",
    labels: ["Строение", "Возбуждение первого узла", "Местный ток", "Следующий узел"],
    intact: "Миелин сохранён",
    damaged: "Локальная демиелинизация",
    node: "Перехват Ранвье",
    myelin: "Миелин",
    leak: "Утечка тока",
    explanations: [
      "Миелин снижает утечку и ёмкостную нагрузку межузловой мембраны. Узлы Ранвье остаются возбудимыми.",
      "Потенциал действия регенерируется в первом узле; между узлами распространяется местный электрический ток.",
      "При сохранном миелине ток эффективнее достигает следующего узла. На участке демиелинизации часть тока утекает через мембрану.",
      "При сохранной изоляции следующий узел может достичь порога и регенерировать потенциал действия. При демиелинизации проведение может замедлиться или блокироваться; это не неизбежный исход."
    ],
    caveat: "Схема качественная: скорость, величина тока и вероятность блока здесь не рассчитываются.",
    back: "Назад", next: "Следующий шаг", replay: "Повторить",
  },
  EN: {
    title: "Myelin and axonal conduction",
    subtitle: "Two otherwise identical axons: intact myelin above, one locally demyelinated internode below.",
    labels: ["Structure", "First node fires", "Local current", "Next node"],
    intact: "Intact myelin",
    damaged: "Local demyelination",
    node: "Node of Ranvier",
    myelin: "Myelin",
    leak: "Current leak",
    explanations: [
      "Myelin reduces internodal current leakage and capacitive load. Nodes of Ranvier remain excitable.",
      "An action potential is regenerated at the first node; local electrical current spreads between nodes.",
      "With intact myelin, current reaches the next node more effectively. Across a demyelinated internode, some current leaks through the membrane.",
      "With intact insulation, the next node can reach threshold and regenerate an action potential. Demyelination may slow or block conduction; failure is not inevitable."
    ],
    caveat: "Qualitative schematic: conduction velocity, current amplitude and block probability are not calculated.",
    back: "Back", next: "Next step", replay: "Replay",
  },
  KZ: {
    title: "Миелин және аксон бойымен өткізу",
    subtitle: "Басқа қасиеттері бірдей екі аксон: жоғарыда миелин сақталған, төменде бір түйінаралық бөлікте миелин жоғалған.",
    labels: ["Құрылым", "Бірінші түйіннің қозуы", "Жергілікті ток", "Келесі түйін"],
    intact: "Миелин сақталған",
    damaged: "Жергілікті демиелиндену",
    node: "Ранвье түйіні",
    myelin: "Миелин",
    leak: "Токтың ағып кетуі",
    explanations: [
      "Миелин түйінаралық мембранадағы токтың ағып кетуін және сыйымдылық жүктемесін азайтады. Ранвье түйіндері қозғыш болып қалады.",
      "Әрекет потенциалы бірінші түйінде қайта түзіледі; түйіндер арасында жергілікті электр тогы таралады.",
      "Миелин сақталғанда ток келесі түйінге тиімдірек жетеді. Миелині жоғалған бөлікте токтың бір бөлігі мембрана арқылы ағып кетеді.",
      "Оқшаулау сақталғанда келесі түйін табалдырыққа жетіп, әрекет потенциалын қайта түзе алады. Демиелиндену өткізуді баяулатуы немесе бөгелтуі мүмкін, бірақ бұл міндетті емес."
    ],
    caveat: "Бұл сапалық сызба: өткізу жылдамдығы, ток амплитудасы және бөгелу ықтималдығы есептелмейді.",
    back: "Артқа", next: "Келесі қадам", replay: "Қайталау",
  }
} as const;

export default function ModuleThreeConductionAnimation({ language }: { language: Language }) {
  const [step, setStep] = useState(0);
  const c = copy[language];
  const nodeXs = [100, 245, 390, 535];
  const rows = [{ y: 70, damaged: false, label: c.intact }, { y: 170, damaged: true, label: c.damaged }];
  return <section aria-label={c.title} style={{ padding: 16, borderRadius: 16, background: "#0b2131", color: "#fff" }}>
    <h3 style={{ marginTop: 0 }}>{c.title}</h3>
    <p>{c.subtitle}</p>
    <div aria-live="polite"><strong>{step + 1}/4 — {c.labels[step]}</strong><p>{c.explanations[step]}</p></div>
    <svg viewBox="0 0 660 250" role="img" aria-label={c.subtitle} style={{ width: "100%", height: "auto", background: "#102e41", borderRadius: 12 }}>
      {rows.map(({ y, damaged, label }) => <g key={label}>
        <text x="12" y={y - 37} fontSize="14" fill="#fff">{label}</text>
        <line x1="78" y1={y} x2="562" y2={y} stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        {nodeXs.slice(0, 3).map((x, i) => {
          const missing = damaged && i === 1;
          return missing
            ? <g key={x}><path d={`M${x + 23} ${y - 10} L${x + 113} ${y + 10}`} stroke="#fb7185" strokeWidth="2" strokeDasharray="5 5" /></g>
            : <g key={x}><rect x={x + 17} y={y - 17} width="103" height="34" rx="12" fill="#38bdf8" stroke="#bae6fd" strokeWidth="2" /></g>;
        })}
        {nodeXs.map((x, i) => <g key={x}>
          <rect x={x - 9} y={y - 12} width="18" height="24" rx="5" fill={step >= 1 && i === 0 ? "#facc15" : step === 3 && i === 1 && !damaged ? "#facc15" : "#f8fafc"} stroke="#0f172a" strokeWidth="2" />
        </g>)}
        {step >= 2 && <path d={`M106 ${y} H227`} fill="none" stroke={damaged ? "#fda4af" : "#facc15"} strokeWidth="5" strokeDasharray={damaged ? "9 9" : undefined} />}
        {step >= 2 && damaged && <g>
          <path d={`M310 ${y - 7} V${y - 28} M310 ${y + 7} V${y + 28}`} stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />
          <path d={`M304 ${y - 22} L310 ${y - 32} L316 ${y - 22} M304 ${y + 22} L310 ${y + 32} L316 ${y + 22}`} fill="none" stroke="#fda4af" strokeWidth="3" />
        </g>}
        {step === 3 && !damaged && <path d={`M246 ${y} H372`} stroke="#facc15" strokeWidth="5" />}
      </g>)}
      <text x="12" y="231" fontSize="12" fill="#cbd5e1">{c.node}: □   •   {c.myelin}: ▰</text>
      {step >= 2 && <text x="405" y="231" fontSize="12" fill="#fda4af">{c.leak} ↑↓</text>}
    </svg>
    <p style={{ fontSize: "0.9em" }}>{c.caveat}</p>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button type="button" disabled={step === 0} onClick={() => setStep(v => Math.max(0, v - 1))}>{c.back}</button>
      <button type="button" disabled={step === 3} onClick={() => setStep(v => Math.min(3, v + 1))}>{c.next}</button>
      <button type="button" onClick={() => setStep(0)}>{c.replay}</button>
    </div>
  </section>;
}
