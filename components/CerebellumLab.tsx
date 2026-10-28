"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import { recordOutcome } from "../lib/courseProgress";
import { compareCerebellum, type CerebellumTrend } from "../lib/cerebellumModel";

type TrialRecord = {
  id: number;
  error: number;
  feedback: number;
  baseline: number;
  observed: number;
  prediction: CerebellumTrend;
  actual: CerebellumTrend;
  note: string;
};

const T = {
  RU: {
    title: "Виртуальная лаборатория: коррекция ошибки движения",
    intro: "Сравните две учебные ситуации при одинаковой исходной ошибке: эталонное качество обратной связи 50% и выбранное вами значение. Сначала предскажите направление изменения остаточной ошибки.",
    error: "Условный индекс исходной ошибки",
    feedback: "Условное качество сенсорной обратной связи",
    prediction: "Прогноз: остаточная ошибка по сравнению с эталоном",
    lower: "Уменьшится", same: "Не изменится", higher: "Увеличится",
    choose: "Выберите прогноз", run: "Проверить прогноз", again: "Изменить условия и повторить",
    baseline: "Эталон (обратная связь 50%)", observed: "Выбранное условие",
    residual: "Индекс остаточной ошибки", correction: "Индекс коррекции",
    outcome: "Результат сравнения", right: "Прогноз совпал с результатом учебной модели.",
    wrong: "Прогноз не совпал. Сравните два индекса и объясните расхождение.",
    trial: "Опыт", note: "Ваше объяснение (не оценивается автоматически)",
    limit: "Числа — условные индексы от 0 до 100, а не проценты нейронной активности, точность пациента или результат клинической пробы. Нелинейная зависимость в модели задана для учебного сравнения, не получена экспериментально. В реальной физиологии важны предсказание движения, эфферентная копия, проприоцепция, зрение, задержки, адаптация, клетки Пуркинье и глубокие ядра. Одна сенсорная переменная не позволяет диагностировать поражение мозжечка.",
    theory: "Сверьте вывод с физиологией: мшистые и лазающие волокна дают возбуждающие входы, клетки Пуркинье тормозят глубокие ядра. Эта схема не моделирует отдельные синапсы.",
    chart: "Сравнение индекса остаточной ошибки: эталон и выбранное условие",
  },
  EN: {
    title: "Virtual laboratory: movement-error correction",
    intro: "Compare two teaching conditions with the same initial error: reference feedback quality of 50% and your chosen value. Predict the direction of change in residual error before revealing the result.",
    error: "Illustrative initial-error index",
    feedback: "Illustrative sensory-feedback quality",
    prediction: "Prediction: residual error relative to the reference",
    lower: "Lower", same: "Unchanged", higher: "Higher",
    choose: "Choose a prediction", run: "Check prediction", again: "Change conditions and try again",
    baseline: "Reference (feedback 50%)", observed: "Chosen condition",
    residual: "Residual-error index", correction: "Correction index",
    outcome: "Comparison result", right: "Your prediction matches the teaching model.",
    wrong: "Your prediction differs from the model. Compare the two indices and explain why.",
    trial: "Trial", note: "Your explanation (not automatically graded)",
    limit: "Numbers are illustrative indices from 0 to 100, not percentages of neural activity, patient accuracy, or clinical test results. The nonlinear relationship is an explicit teaching assumption, not an experimentally fitted law. Actual physiology also depends on movement prediction, efference copy, proprioception, vision, delays, adaptation, Purkinje cells and deep nuclei. One sensory variable cannot diagnose a cerebellar lesion.",
    theory: "Check the mechanism: mossy and climbing fibres provide excitatory inputs; Purkinje cells inhibit deep nuclei. This diagram does not simulate individual synapses.",
    chart: "Residual-error index comparison: reference versus chosen condition",
  },
  KZ: {
    title: "Виртуалды зертхана: қозғалыс қатесін түзету",
    intro: "Бастапқы қатесі бірдей екі оқу жағдайын салыстырыңыз: кері байланыстың эталондық сапасы 50% және өзіңіз таңдаған мән. Нәтижені ашпай тұрып, қалдық қатенің өзгеру бағытын болжаңыз.",
    error: "Бастапқы қатенің шартты индексі",
    feedback: "Сенсорлық кері байланыс сапасының шартты индексі",
    prediction: "Болжам: эталонмен салыстырғандағы қалдық қате",
    lower: "Азаяды", same: "Өзгермейді", higher: "Артады",
    choose: "Болжамды таңдаңыз", run: "Болжамды тексеру", again: "Шарттарды өзгертіп, қайталау",
    baseline: "Эталон (кері байланыс 50%)", observed: "Таңдалған жағдай",
    residual: "Қалдық қате индексі", correction: "Түзету индексі",
    outcome: "Салыстыру нәтижесі", right: "Болжамыңыз оқу моделінің нәтижесіне сәйкес келді.",
    wrong: "Болжам модель нәтижесіне сәйкес келмеді. Екі индексті салыстырып, айырмашылығын түсіндіріңіз.",
    trial: "Тәжірибе", note: "Өз түсіндірмеңіз (автоматты түрде бағаланбайды)",
    limit: "Сандар — 0-ден 100-ге дейінгі шартты индекстер; олар нейрон белсенділігінің пайызы, науқас қозғалысының дәлдігі немесе клиникалық сынақ нәтижесі емес. Модельдегі сызықтық емес тәуелділік тәжірибеден алынған заң емес, оқу үшін таңдалған жорамал. Нақты физиологияда қозғалысты болжау, эфференттік көшірме, проприоцепция, көру, кідіріс, бейімделу, Пуркинье жасушалары мен терең ядролар маңызды. Бір сенсорлық айнымалы мишық зақымын анықтауға жеткіліксіз.",
    theory: "Механизмді салыстырыңыз: мүк тәрізді және өрмелегіш талшықтар қоздырушы кіріс береді, Пуркинье жасушалары терең ядроларды тежейді. Бұл сызба жеке синапстарды модельдемейді.",
    chart: "Қалдық қате индексін салыстыру: эталон және таңдалған жағдай",
  },
} as const;

export default function CerebellumLab({ language }: { language: Language }) {
  const c = T[language];
  const [error, setError] = useState(60);
  const [feedback, setFeedback] = useState(70);
  const [prediction, setPrediction] = useState<CerebellumTrend | "">("");
  const [revealed, setRevealed] = useState(false);
  const [rows, setRows] = useState<TrialRecord[]>([]);
  const comparison = compareCerebellum(error, feedback);
  const correct = prediction !== "" && prediction === comparison.trend;

  function invalidate() {
    setPrediction("");
    setRevealed(false);
  }

  function runTrial() {
    if (!prediction || revealed) return;
    const isCorrect = prediction === comparison.trend;
    recordOutcome(13, "interactive", Number(isCorrect), 1);
    recordOutcome(13, "criterion:application:lab", Number(isCorrect), 1);
    // A prediction does not certify a mechanism or a written justification.
    setRows(previous => [...previous, {
      id: previous.length + 1,
      error, feedback,
      baseline: comparison.baseline.residualErrorIndex,
      observed: comparison.observed.residualErrorIndex,
      prediction, actual: comparison.trend, note: "",
    }]);
    setRevealed(true);
  }

  return <section style={{ margin: "28px 0", padding: 20, border: "1px solid #cfe0ea", borderRadius: 16 }}>
    <h2>{c.title}</h2>
    <p>{c.intro}</p>
    <label style={{ display: "block", marginBottom: 16 }}>
      {c.error}: <strong>{error}</strong>
      <input type="range" min={0} max={100} value={error}
        onChange={event => { setError(Number(event.target.value)); invalidate(); }}
        style={{ display: "block", width: "100%" }} />
    </label>
    <label style={{ display: "block", marginBottom: 16 }}>
      {c.feedback}: <strong>{feedback}</strong>
      <input type="range" min={0} max={100} value={feedback}
        onChange={event => { setFeedback(Number(event.target.value)); invalidate(); }}
        style={{ display: "block", width: "100%" }} />
    </label>
    <label style={{ display: "block", marginBottom: 12 }}>
      {c.prediction}
      <select value={prediction} onChange={event => { setPrediction(event.target.value as CerebellumTrend | ""); setRevealed(false); }}
        style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}>
        <option value="">{c.choose}</option>
        <option value="lower">{c.lower}</option>
        <option value="same">{c.same}</option>
        <option value="higher">{c.higher}</option>
      </select>
    </label>
    <button type="button" disabled={!prediction || revealed} onClick={runTrial}>{c.run}</button>
    {revealed && <div role="status" aria-live="polite" style={{ marginTop: 16 }}>
      <h3>{c.outcome}</h3>
      <p>{correct ? c.right : c.wrong}</p>
      <p>{c.baseline}: {comparison.baseline.residualErrorIndex}; {c.observed}: {comparison.observed.residualErrorIndex}.</p>
      <p>{c.correction}: {comparison.observed.correctionIndex}; {c.residual}: {comparison.observed.residualErrorIndex}.</p>
      <svg viewBox="0 0 650 150" role="img" aria-label={c.chart} style={{ width: "100%", maxWidth: 650 }}>
        <text x="10" y="30" fontSize="16" fill="currentColor">{c.baseline}</text>
        <rect x="10" y="42" width={comparison.baseline.residualErrorIndex * 5} height="18" fill="#397fa8" />
        <text x="10" y="90" fontSize="16" fill="currentColor">{c.observed}</text>
        <rect x="10" y="102" width={comparison.observed.residualErrorIndex * 5} height="18" fill="#bd773b" />
      </svg>
      <p>{c.theory}</p>
    </div>}
    {rows.length > 0 && <div style={{ overflowX: "auto", marginTop: 18 }}>
      <table>
        <thead><tr>
          <th scope="col">{c.trial}</th><th scope="col">{c.error}</th><th scope="col">{c.feedback}</th>
          <th scope="col">{c.baseline}</th><th scope="col">{c.observed}</th><th scope="col">{c.note}</th>
        </tr></thead>
        <tbody>{rows.map(row => <tr key={row.id}>
          <td>{row.id}</td><td>{row.error}</td><td>{row.feedback}</td>
          <td>{row.baseline}</td><td>{row.observed}</td>
          <td><input type="text" aria-label={c.note + " " + row.id} value={row.note}
            onChange={event => { const note = event.target.value; setRows(previous => previous.map(item => item.id === row.id ? { ...item, note } : item)); }} /></td>
        </tr>)}</tbody>
      </table>
    </div>}
    <p><small>{c.limit}</small></p>
    <ExperimentReflection language={language} theoryHref={`/modules/13/theory?lang=${language}`} />
  </section>;
}
