"use client";
import { useState } from "react";
import type { Language } from "../content/course";

const translations = {
  RU: {
    title: "Сальтаторное проведение: миелин сохранён или утрачен",
    intact: "Сохранный миелин",
    lost: "Демиелинизация между узлами 2 и 3",
    stages: ["Строение аксона", "Распространение местного тока", "Возбуждение следующего узла"],
    detail: [
      "Миелин уменьшает утечку тока и ёмкость межузловой мембраны.",
      "Потенциал действия возникает в узле 2. При демиелинизации между узлами 2 и 3 часть местного тока утекает.",
      "В сохранном волокне узел 3 достигает порога и регенерирует потенциал действия. В демиелинизированном волокне проведение может замедлиться или блокироваться, но это не обязательно."
    ],
    note: "Качественная схема, не измерение: амплитуда, скорость и вероятность блока не вычисляются.",
    back: "Назад", next: "Далее", restart: "Сначала",
  },
  EN: {
    title: "Saltatory conduction: intact versus lost myelin",
    intact: "Intact myelin",
    lost: "Demyelination between nodes 2 and 3",
    stages: ["Axon structure", "Local current spread", "Next node excitation"],
    detail: [
      "Myelin reduces internodal current leakage and membrane capacitance.",
      "An action potential occurs at node 2. Between nodes 2 and 3, demyelination allows some local current to leak away.",
      "In the intact fiber, node 3 reaches threshold and regenerates an action potential. In the demyelinated fiber, conduction may slow or fail, but failure is not inevitable."
    ],
    note: "Qualitative schematic, not a measurement: amplitude, velocity and probability of block are not calculated.",
    back: "Back", next: "Next", restart: "Restart",
  },
  KZ: {
    title: "Сальтаторлық өткізу: миелин сақталған және жоғалған жағдай",
    intact: "Миелин сақталған",
    lost: "2 және 3-түйін арасындағы демиелиндену",
    stages: ["Аксон құрылысы", "Жергілікті токтың таралуы", "Келесі түйіннің қозуы"],
    detail: [
      "Миелин түйінаралық мембранадағы токтың ағып кетуін және сыйымдылықты азайтады.",
      "Әрекет потенциалы 2-түйінде пайда болады. 2 және 3-түйін арасындағы демиелинденуде жергілікті токтың бір бөлігі сыртқа ағады.",
      "Миелин сақталған талшықта 3-түйін табалдырыққа жетіп, әрекет потенциалын қайта түзеді. Миелин жоғалғанда өткізу баяулауы немесе бөгелуі мүмкін, бірақ бұл міндетті емес."
    ],
    note: "Бұл өлшеу емес, сапалық сызба: амплитуда, жылдамдық және бөгелу ықтималдығы есептелмейді.",
    back: "Артқа", next: "Келесі", restart: "Басынан",
  }
} as const;

export default function ModuleThreeMyelinMedia({ language }: { language: Language }) {
  const [stage, setStage] = useState(0);
  const t = translations[language];
  const positions = [95, 240, 385, 530];
  return <section aria-label={t.title} style={{ padding: 16, borderRadius: 14, background: "#10283b", color: "#fff" }}>
    <h3>{t.title}</h3>
    <p aria-live="polite"><strong>{stage + 1}/3: {t.stages[stage]}.</strong> {t.detail[stage]}</p>
    <svg viewBox="0 0 650 235" role="img" aria-label={t.title} style={{ width: "100%", background: "#0b1c2a", borderRadius: 10 }}>
      {[0, 1].map(row => {
        const y = row === 0 ? 70 : 170;
        return <g key={row}>
          <text x="12" y={y - 33} fill="white" fontSize="14">{row === 0 ? t.intact : t.lost}</text>
          <path d={`M75 ${y} H555`} stroke="#cbd5e1" strokeWidth="7" />
          {[0, 1, 2].map(i => row === 1 && i === 1
            ? <path key={i} d={`M260 ${y-10} H365`} stroke="#fb7185" strokeWidth="2" strokeDasharray="6 5" />
            : <rect key={i} x={positions[i] + 19} y={y - 15} width="105" height="30" rx="11" fill="#38bdf8" stroke="#bae6fd" strokeWidth="2" />)}
          {positions.map((x, i) => <g key={x}>
            <rect x={x-9} y={y-12} width="18" height="24" rx="4"
              fill={stage >= 1 && i === 1 || stage === 2 && i === 2 && row === 0 ? "#facc15" : "#f8fafc"}
              stroke="#0f172a" strokeWidth="2" />
            <text x={x-4} y={y+34} fontSize="12" fill="white">{i+1}</text>
          </g>)}
          {stage >= 1 && <path d={`M250 ${y} H374`} stroke={row === 0 ? "#facc15" : "#fda4af"} strokeWidth="5" strokeDasharray={row === 1 ? "8 8" : undefined} />}
          {stage >= 1 && row === 1 && <g stroke="#fda4af" strokeWidth="3">
            <path d={`M315 ${y-6} V${y-28} M315 ${y+6} V${y+28}`} />
          </g>}
        </g>;
      })}
    </svg>
    <p style={{ fontSize: "0.9em" }}>{t.note}</p>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button type="button" disabled={stage === 0} onClick={() => setStage(s => Math.max(0, s - 1))}>{t.back}</button>
      <button type="button" disabled={stage === 2} onClick={() => setStage(s => Math.min(2, s + 1))}>{t.next}</button>
      <button type="button" onClick={() => setStage(0)}>{t.restart}</button>
    </div>
  </section>;
}
