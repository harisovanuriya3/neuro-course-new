"use client";

import { useId, useState } from "react";
import type { Language } from "../content/course";
import type { InteractiveLesson } from "../content/interactive";
import ru from "../content/modules/1/cases/ru";
import en from "../content/modules/1/cases/en";
import kz from "../content/modules/1/cases/kz";
import shared from "./PracticeContent.module.css";
import controls from "./InteractiveContent.module.css";
import styles from "./BalanceDiagram.module.css";

const copy = {
  RU: {
    title: "5. Равновесие: сенсорная обратная связь",
    stages: ["Стопа наступает на неровность", "Сенсорные сигналы поступают в ЦНС", "Движение и дальнейшая коррекция"],
    signals: ["Кожные", "Проприоцептивные", "Зрительные", "Вестибулярные"],
    cns: "ЦНС", motor: "К мышцам", feedback: "Новая сенсорная информация → ЦНС", replay: "Повторить",
    note: "Учебная схема по случаю integrative. Этапы выделены условно: многие процессы идут параллельно. Схема не рассчитывает устойчивость и не предсказывает падение.",
  },
  EN: {
    title: "5. Balance: sensory feedback",
    stages: ["The foot meets uneven ground", "Sensory signals reach the CNS", "Movement and further correction"],
    signals: ["Cutaneous", "Proprioceptive", "Visual", "Vestibular"],
    cns: "CNS", motor: "To muscles", feedback: "New sensory information → CNS", replay: "Replay",
    note: "Teaching diagram based on the integrative case. Stages are schematic: many processes occur in parallel. This diagram does not calculate stability or predict falls.",
  },
  KZ: {
    title: "5. Тепе-теңдік: сенсорлық кері байланыс",
    stages: ["Табан тегіс емес жерді басады", "Сенсорлық сигналдар ОЖЖ-ге түседі", "Қозғалыс және кейінгі түзету"],
    signals: ["Тері", "Проприоцептивтік", "Көру", "Вестибулярлық"],
    cns: "ОЖЖ", motor: "Бұлшықеттерге", feedback: "Жаңа сенсорлық ақпарат → ОЖЖ", replay: "Қайталау",
    note: "Integrative тапсырмасына негізделген оқу сызбасы. Кезеңдер шартты түрде бөлінген: көптеген үдеріс қатар жүреді. Сызба тұрақтылықты есептемейді және құлауды болжамайды.",
  },
};

export default function BalanceDiagram({ language, ui }: { language: Language; ui: InteractiveLesson["ui"] }) {
  const [step, setStep] = useState(0);
  const [replay, setReplay] = useState(0);
  const id = useId();
  const c = copy[language];
  const source = { RU: ru, EN: en, KZ: kz }[language].cases.find(item => item.id === "integrative")!;
  return <section id="integrative" className={`${shared.card} ${controls.card}`} aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`}>{c.title}</h2>
    <p className={controls.note}>{c.note}</p>
    <figure className={styles.figure} data-step={step}>
      <svg key={replay} viewBox="0 0 400 300" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{c.stages[step]}</title>
        <desc id={`${id}-desc`}>{source.explanation[step]}</desc>
        <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5 0 10Z" fill="context-stroke" /></marker></defs>
        <path d="M15 252H84L99 237 116 252H385" fill="#e0e7ed" stroke="#5c6c7c" strokeWidth="3" />
        <g className={styles.body} style={{ transform: step === 2 ? "translate(12px, 0) rotate(0deg)" : "rotate(-9deg)" }}>
          <circle cx="93" cy="62" r="19" fill="#e4f0fa" stroke="#29465e" strokeWidth="4" />
          <path d="M93 84V158M93 100L58 139M93 100L126 128M93 158L68 204 61 242M93 158L107 203 103 233" fill="none" stroke="#29465e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="100" cy="58" r="3" fill="#29465e" />
          <path d="M48 244H70" stroke="#29465e" strokeWidth="8" strokeLinecap="round" />
        </g>
        <path className={styles.foot} style={{ transform: step === 2 ? "translate(17px, 8px) rotate(0deg)" : "rotate(-18deg)" }} d="M88 235H119Q129 235 128 243H88Z" fill="#dc9b40" stroke="#855000" strokeWidth="3" />
        <g opacity={step >= 1 ? 1 : 0.3}>
          {c.signals.map((label, i) => <g key={label}>
            <rect x="174" y={20 + i * 40} width="153" height="30" rx="7" fill="#edf6ff" stroke="#00599c" />
            <text x="250" y={40 + i * 40} textAnchor="middle">{label}</text>
            <path className={step >= 1 ? styles.flow : undefined} d={`M327 ${35 + i * 40}H351V188`} fill="none" stroke="#00599c" strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
          </g>)}
          <rect x="321" y="191" width="62" height="34" rx="10" fill="#d8eaf8" stroke="#00599c" strokeWidth="2" />
          <text x="352" y="213" textAnchor="middle" fontWeight="bold">{c.cns}</text>
        </g>
        {step === 2 && <g>
          <path className={styles.flow} d="M320 208H149L112 168" fill="none" stroke="#855000" strokeWidth="3" markerEnd={`url(#${id}-arrow)`} />
          <text x="223" y="199" textAnchor="middle">{c.motor}</text>
          <path className={styles.flow} d="M128 244V269H390V210H385" fill="none" stroke="#287548" strokeWidth="3" strokeDasharray="6 5" markerEnd={`url(#${id}-arrow)`} />
          <text x="200" y="291" textAnchor="middle">{c.feedback}</text>
        </g>}
      </svg>
      <figcaption>{ui.step} {step + 1} / 3 — {c.stages[step]}</figcaption>
    </figure>
    <div className={controls.actions} role="group" aria-label={ui.select}>
      {c.stages.map((label, i) => <button key={label} type="button" aria-pressed={step === i} aria-controls={`${id}-explanation`} onClick={() => setStep(i)}>{i + 1}. {label}</button>)}
    </div>
    <div className={controls.actions}>
      <button type="button" disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}>{ui.previous}</button>
      <button type="button" disabled={step === 2} onClick={() => setStep(value => Math.min(2, value + 1))}>{ui.next}</button>
      <button type="button" onClick={() => { setStep(0); setReplay(value => value + 1); }}>{c.replay}</button>
    </div>
    <div id={`${id}-explanation`} className={controls.explanation} role="status" aria-live="polite" aria-atomic="true">
      <h3>{c.stages[step]}</h3><p>{source.explanation[step]}</p>
    </div>
  </section>;
}
