"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { modules, type Language } from "../content/course";
import { readCourseProgress, recordVisit, type CourseProgressData } from "../lib/courseProgress";
import { readPatientProgress, type PatientProgress } from "../lib/virtualPatientProgress";
import styles from "./VirtualPatient.module.css";

const copy = {
  RU: { title: "Мой прогресс · весь курс", scope: "Обзор 23 модулей", visited: "Посещено модулей", module: "Модуль", sections: "Открыто разделов", pending: "Материалы и измерение успеха ещё готовятся", patient: "Виртуальный пациент", pretest: "Входной тест", tests: "Ветвящийся тест (первая попытка)", cases: "Ситуационные задачи выполнены", result: "Последние сохранённые результаты заданий модуля 1", none: "Результатов пока нет", first: "Верно с первой попытки", saved: "Данные остаются только в этом браузере. Посещение не означает успешное завершение; общая оценка курса пока не рассчитывается.", continue: "Продолжить обучение", start: "Открыть модуль", review: "Рекомендуем повторить", good: "Все решения виртуального пациента на первом проходе верны.", topics: ["вопросы о симптомах", "проверка чувствительности", "предварительный диагноз"] },
  EN: { title: "My progress · whole course", scope: "23-module overview", visited: "Modules visited", module: "Module", sections: "Sections opened", pending: "Content and success tracking are being prepared", patient: "Virtual patient", pretest: "Entry test", tests: "Branching test (first attempt)", cases: "Case studies completed", result: "Latest saved Module 1 activity results", none: "No results yet", first: "Correct on the first attempt", saved: "Data stays only in this browser. Visiting does not mean successful completion; no overall course grade is calculated yet.", continue: "Continue learning", start: "Open module", review: "Suggested review", good: "All first virtual-patient decisions were correct.", topics: ["symptom questions", "sensory examination", "provisional diagnosis"] },
  KZ: { title: "Менің үлгерімім · бүкіл курс", scope: "23 модуль бойынша шолу", visited: "Қаралған модульдер", module: "Модуль", sections: "Ашылған бөлімдер", pending: "Материалдар мен нәтижені бақылау әзірленуде", patient: "Виртуалды пациент", pretest: "Кіріспе тест", tests: "Тармақталған тест (бірінші әрекет)", cases: "Аяқталған жағдаяттық тапсырмалар", result: "1-модуль тапсырмаларының соңғы сақталған нәтижелері", none: "Әзірше нәтиже жоқ", first: "Бірінші әрекеттен дұрыс", saved: "Деректер тек осы браузерде қалады. Бөлімді ашу оны сәтті аяқтауды білдірмейді; курстың жалпы бағасы әзірше есептелмейді.", continue: "Оқуды жалғастыру", start: "Модульді ашу", review: "Қайталау ұсынылады", good: "Виртуалды пациенттің алғашқы шешімдерінің бәрі дұрыс.", topics: ["симптомдар туралы сұрақтар", "сезімталдықты тексеру", "алдын ала диагноз"] },
} as const;

export default function ModuleProgress({ language, moduleId }: { language: Language; moduleId: number }) {
  const [data, setData] = useState<CourseProgressData | null>(null);
  const [patient, setPatient] = useState<PatientProgress | null>(null);
  useEffect(() => { recordVisit(moduleId, "progress"); setData(readCourseProgress()); setPatient(readPatientProgress()); }, [moduleId]);
  const c = copy[language];
  const patientDone = patient?.answers.filter(value => value !== null).length ?? 0;
  const patientFirst = patient?.firstTryCorrect.filter(Boolean).length ?? 0;
  const review = patient?.answers.map((answer, i) => answer === null || !patient.firstTryCorrect[i] ? i : -1).filter(i => i >= 0) ?? [];
  const results = data?.outcomes ?? {};
  return <section className={styles.patient}>
    <h1>{c.title}</h1><p>{c.scope}. {c.saved}</p>
    <div className={styles.summary}>
      <p>{c.visited}: <strong>{data?.visitedModules.length ?? 0} / {modules[language].length}</strong></p>
      <progress aria-label={c.visited} value={data?.visitedModules.length ?? 0} max={modules[language].length} />
    </div>
    <h2>{c.result}</h2>
    <ul>
      <li><Link href={`/modules/1/virtual-patient?lang=${language}`}>{c.patient}</Link>: {patientDone} / 3; {c.first.toLowerCase()}: {patientFirst} / 3.</li>
      {results["1:pretest"] && <li>{c.pretest}: {results["1:pretest"].correct} / {results["1:pretest"].total}</li>}
      {results["1:tests"] && <li>{c.tests}: {results["1:tests"].correct} / {results["1:tests"].total}</li>}
      {results["1:cases"] && <li>{c.cases}: {results["1:cases"].correct} / {results["1:cases"].total}</li>}
    </ul>
    {patientDone > 0 && <div><h3>{c.review}</h3>{review.length ? <ul>{review.map(i => <li key={i}>{c.topics[i]}</li>)}</ul> : <p>{c.good}</p>}</div>}
    <h2>{c.continue}</h2>
    <div className={styles.courseModules}>{modules[language].map((title, index) => {
      const id = index + 1;
      const count = data?.visitedSections[id]?.length ?? 0;
      const visited = data?.visitedModules.includes(id) ?? false;
      return <div key={id}>
        <h3>{c.module} {id}: {title}</h3>
        <p>{c.sections}: {count}{visited ? " ✓" : ""}</p>
        <Link href={`/modules/${id}?lang=${language}`}>{c.start}</Link>
      </div>;
    })}</div>
  </section>;
}
