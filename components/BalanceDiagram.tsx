"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
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
    note: "Учебная модель по случаю integrative. Кадры созданы ИИ и показывают постановочную ситуацию, а не реального пациента. Этапы выделены условно: многие процессы идут параллельно. Модель не рассчитывает устойчивость и не предсказывает падение.",
  },
  EN: {
    title: "5. Balance: sensory feedback",
    stages: ["The foot meets uneven ground", "Sensory signals reach the CNS", "Movement and further correction"],
    signals: ["Cutaneous", "Proprioceptive", "Visual", "Vestibular"],
    cns: "CNS", motor: "To muscles", feedback: "New sensory information → CNS", replay: "Replay",
    note: "Teaching model based on the integrative case. These AI-generated frames depict a staged situation, not a real patient. Stages are simplified: many processes occur in parallel. The model does not calculate stability or predict falls.",
  },
  KZ: {
    title: "5. Тепе-теңдік: сенсорлық кері байланыс",
    stages: ["Табан тегіс емес жерді басады", "Сенсорлық сигналдар ОЖЖ-ге түседі", "Қозғалыс және кейінгі түзету"],
    signals: ["Тері", "Проприоцептивтік", "Көру", "Вестибулярлық"],
    cns: "ОЖЖ", motor: "Бұлшықеттерге", feedback: "Жаңа сенсорлық ақпарат → ОЖЖ", replay: "Қайталау",
    note: "Integrative тапсырмасына негізделген оқу моделі. Кадрлар ЖИ көмегімен жасалған, олар нақты пациентті емес, қойылымдық жағдайды көрсетеді. Кезеңдер шартты түрде бөлінген: көптеген үдеріс қатар жүреді. Модель тұрақтылықты есептемейді және құлауды болжамайды.",
  },
};

const frames = ["approach", "signals", "correction"] as const;

export default function BalanceDiagram({ language, ui }: { language: Language; ui: InteractiveLesson["ui"] }) {
  const [step, setStep] = useState(0);
  const [replay, setReplay] = useState(0);
  const id = useId();
  const c = copy[language];
  const source = { RU: ru, EN: en, KZ: kz }[language].cases.find(item => item.id === "integrative")!;
  useEffect(() => {
    if (!replay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const second = window.setTimeout(() => setStep(1), 1100);
    const third = window.setTimeout(() => setStep(2), 2200);
    return () => { window.clearTimeout(second); window.clearTimeout(third); };
  }, [replay]);
  const chooseStep = (value: number) => { setReplay(0); setStep(value); };
  return <section id="integrative" className={`${shared.card} ${controls.card}`} aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`}>{c.title}</h2>
    <p className={controls.note}>{c.note}</p>
    <figure className={styles.figure}>
      <div className={styles.scene} role="img" aria-label={`${c.stages[step]}. ${source.explanation[step]}`}>
        {frames.map((frame, index) => <Image
          key={frame}
          src={`/images/module1/balance/${frame}.webp`}
          alt=""
          aria-hidden="true"
          width={646}
          height={809}
          sizes="(max-width: 600px) 70vw, 280px"
          className={`${styles.frame} ${step === index ? styles.active : ""}`}
        />)}
      </div>
      {step >= 1 && <div className={styles.process} aria-hidden="true">
        {step === 1 ? <>{c.signals.join(" · ")} → {c.cns}</> : <>{c.cns} → {c.motor} → {c.feedback}</>}
      </div>}
      <figcaption>{ui.step} {step + 1} / 3 — {c.stages[step]}</figcaption>
    </figure>
    <div className={controls.actions} role="group" aria-label={ui.select}>
      {c.stages.map((label, i) => <button key={label} type="button" aria-pressed={step === i} aria-controls={`${id}-explanation`} onClick={() => chooseStep(i)}>{i + 1}. {label}</button>)}
    </div>
    <div className={controls.actions}>
      <button type="button" disabled={step === 0} onClick={() => chooseStep(Math.max(0, step - 1))}>{ui.previous}</button>
      <button type="button" disabled={step === 2} onClick={() => chooseStep(Math.min(2, step + 1))}>{ui.next}</button>
      <button type="button" onClick={() => { setStep(0); setReplay(value => value + 1); }}>{c.replay}</button>
    </div>
    <div id={`${id}-explanation`} className={controls.explanation} role="status" aria-live="polite" aria-atomic="true">
      <h3>{c.stages[step]}</h3><p>{source.explanation[step]}</p>
    </div>
  </section>;
}
