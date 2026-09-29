"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import { readPatientProgress, type PatientProgress } from "../lib/virtualPatientProgress";
import styles from "./VirtualPatient.module.css";

const copy = {
  RU: { title: "Мой прогресс · Модуль 1", scope: "Пилотный результат виртуального пациента", done: "Пройдено этапов", first: "Верно с первой попытки", saved: "Данные хранятся только в этом браузере. Они не отправляются преподавателю и не являются оценкой за модуль.", empty: "Начните виртуального пациента, чтобы увидеть результат.", continue: "Перейти к виртуальному пациенту", review: "Рекомендуем повторить", good: "Все решения на первом проходе верны. Сравните их с разбором случая.", topics: ["вопросы о распределении и времени симптомов", "выбор проверки чувствительности", "предварительный диагноз и его ограничения"] },
  EN: { title: "My progress · Module 1", scope: "Virtual patient pilot result", done: "Stages completed", first: "Correct on the first attempt", saved: "Data is stored only in this browser. It is not sent to an instructor and is not a module grade.", empty: "Start the virtual patient to see a result.", continue: "Go to virtual patient", review: "Suggested review", good: "All first answers were correct. Compare your reasoning with the case explanation.", topics: ["questions about symptom distribution and timing", "selection of a sensory examination", "provisional diagnosis and its limits"] },
  KZ: { title: "Менің үлгерімім · 1-модуль", scope: "Виртуалды пациенттің пилоттық нәтижесі", done: "Аяқталған кезеңдер", first: "Бірінші әрекеттен дұрыс", saved: "Деректер тек осы браузерде сақталады. Олар оқытушыға жіберілмейді және модульдің бағасы болып саналмайды.", empty: "Нәтижені көру үшін виртуалды пациент тапсырмасын бастаңыз.", continue: "Виртуалды пациентке өту", review: "Қайталауға ұсыныс", good: "Алғашқы жауаптардың бәрі дұрыс. Түсіндіруіңізді тапсырма талдауымен салыстырыңыз.", topics: ["симптомдардың таралуы мен уақыты туралы сұрақтар", "сезімталдықты тексеруді таңдау", "алдын ала диагноз және оның шектері"] },
} as const;

export default function ModuleProgress({ language }: { language: Language }) {
  const [progress, setProgress] = useState<PatientProgress | null>(null);
  useEffect(() => { setProgress(readPatientProgress()); }, []);
  const c = copy[language];
  const done = progress?.answers.filter(value => value !== null).length ?? 0;
  const first = progress?.firstTryCorrect.filter(Boolean).length ?? 0;
  const review = progress?.answers.map((answer, i) => answer === null || !progress.firstTryCorrect[i] ? i : -1).filter(i => i >= 0) ?? [];
  return <section className={styles.patient}>
    <h1>{c.title}</h1><p>{c.scope}</p>
    <div className={styles.summary} aria-live="polite">
      <p>{c.done}: <strong>{done} / 3</strong></p><progress aria-label={c.done} value={done} max={3} />
      <p>{c.first}: <strong>{first} / 3</strong></p>
    </div>
    <p>{c.saved}</p>
    {progress && (done === 0 ? <p>{c.empty}</p> : <div><h2>{c.review}</h2>{review.length > 0 ? <ul>{review.map(i => <li key={i}>{c.topics[i]}</li>)}</ul> : <p>{c.good}</p>}</div>)}
    <Link href={`/modules/1/virtual-patient?lang=${language}`}>{c.continue}</Link>
  </section>;
}
