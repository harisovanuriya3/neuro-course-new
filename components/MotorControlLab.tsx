"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import { recordOutcome } from "../lib/courseProgress";
import { compareMotorFeedback, type MotorFeedbackTrend } from "../lib/motorControlModel";

type Row = {
  id: number;
  drive: number;
  sensory: number;
  baselineError: number;
  output: number;
  error: number;
  correct: boolean;
  note: string;
};

const T = {
  RU: {
    title: "Лаборатория моторного контроля",
    intro: "Сравните выполнение одной условной двигательной команды без сенсорной коррекции и при выбранном качестве обратной связи. В модели внешнее возмущение одинаково; обратная связь может компенсировать часть ошибки.",
    task: "Сохраните одинаковую команду и сравните два опыта с разным качеством обратной связи. Перед каждым опытом предскажите изменение ошибки относительно нулевой обратной связи.",
    drive: "Заданная двигательная команда (условные единицы)",
    sensory: "Качество обратной связи (условный индекс)",
    target: "Цель",
    output: "Результат",
    error: "Остаточная ошибка",
    baseline: "Ошибка без обратной связи",
    prediction: "Прогноз: как изменится ошибка относительно режима без обратной связи?",
    lower: "Уменьшится",
    same: "Не изменится",
    higher: "Увеличится",
    save: "Проверить прогноз и записать опыт",
    note: "Объяснение результата (проверяется преподавателем)",
    trial: "Опыт",
    comparison: "Сопоставление прогноза",
    correct: "Прогноз совпал с результатом учебной модели.",
    incorrect: "Прогноз не совпал с результатом учебной модели. Сравните две ошибки в таблице.",
    anatomy: "Историческая анатомическая схема коры, а не схема измерения моторного выхода",
    limit: "Это не запись движения человека и не диагностический тест. В модели условное возмущение равно 30% команды; обратная связь компенсирует до 80% этого возмущения. Эти коэффициенты выбраны для обучения, не являются физиологическими константами. Реальное движение зависит от предсказания, задержек, проприоцепции, зрения, вестибулярного входа, мозжечка, базальных ганглиев, спинальных сетей и биомеханики. Числа — индексы, не клинические проценты; правильность письменного объяснения автоматически не оценивается."
  },
  EN: {
    title: "Motor control laboratory",
    intro: "Compare the same illustrative motor target without sensory correction and with a selected feedback quality. The modeled disturbance stays constant; feedback can compensate for part of the error.",
    task: "Keep the command fixed and compare two trials with different feedback quality. Before each trial predict the error relative to the no-feedback baseline.",
    drive: "Target motor command (arbitrary units)",
    sensory: "Feedback quality (illustrative index)",
    target: "Target",
    output: "Outcome",
    error: "Residual error",
    baseline: "Error without feedback",
    prediction: "Prediction: how will error change relative to no feedback?",
    lower: "Decrease",
    same: "Stay the same",
    higher: "Increase",
    save: "Check prediction and record trial",
    note: "Explain the result (for instructor review)",
    trial: "Trial",
    comparison: "Prediction check",
    correct: "Prediction agrees with the teaching model.",
    incorrect: "Prediction does not agree with the teaching model. Compare both errors in the table.",
    anatomy: "Historical cortical anatomy, not a measurement of motor output",
    limit: "This is not a human movement recording or a diagnostic test. The illustrative disturbance is 30% of the target and feedback compensates at most 80% of it. These teaching coefficients are not physiological constants. Real movements also depend on prediction, delays, proprioception, vision, vestibular input, cerebellar and basal-ganglia circuits, spinal networks and biomechanics. Numbers are model indices, not clinical percentages; written explanations are not automatically graded."
  },
  KZ: {
    title: "Қозғалысты басқару зертханасы",
    intro: "Бірдей шартты қозғалыс командасының сенсорлық түзетусіз және кері байланыс сапасы өзгерген кездегі орындалуын салыстырыңыз. Модельдегі сыртқы ауытқу тұрақты, ал кері байланыс қатенің бір бөлігін өтей алады.",
    task: "Команданы өзгертпей, кері байланыс сапасы әртүрлі екі тәжірибені салыстырыңыз. Әр тәжірибенің алдында қатенің кері байланыссыз жағдайға қатысты өзгерісін болжаңыз.",
    drive: "Мақсатты қозғалыс командасы (шартты бірлік)",
    sensory: "Кері байланыс сапасы (шартты индекс)",
    target: "Мақсат",
    output: "Нәтиже",
    error: "Қалдық қате",
    baseline: "Кері байланыссыз қате",
    prediction: "Болжам: кері байланыссыз жағдаймен салыстырғанда қате қалай өзгереді?",
    lower: "Азаяды",
    same: "Өзгермейді",
    higher: "Артады",
    save: "Болжамды тексеріп, тәжірибені жазу",
    note: "Нәтижені түсіндіру (оқытушы тексереді)",
    trial: "Тәжірибе",
    comparison: "Болжамды тексеру",
    correct: "Болжам оқу моделінің нәтижесіне сәйкес келді.",
    incorrect: "Болжам оқу моделінің нәтижесіне сәйкес келмеді. Кестедегі екі қатені салыстырыңыз.",
    anatomy: "Қыртыстың тарихи анатомиялық сызбасы; қозғалыс нәтижесінің өлшемі емес",
    limit: "Бұл адам қозғалысының нақты жазбасы да, диагностикалық сынақ та емес. Оқу моделінде шартты ауытқу команда шамасының 30%-ына тең, ал кері байланыс оның ең көбі 80%-ын өтейді. Бұл коэффициенттер физиологиялық тұрақтылар емес. Нақты қозғалыс болжамға, кідіріске, проприоцепцияға, көру және вестибулярлық ақпаратқа, мишыққа, базальды ганглийлерге, жұлын желілеріне және биомеханикаға тәуелді. Сандар клиникалық пайыздар емес, модель индекстері; жазбаша түсіндірме автоматты түрде бағаланбайды."
  }
} as const;

export default function MotorControlLab({ language }: { language: Language }) {
  const c = T[language];
  const [drive, setDrive] = useState(65);
  const [sensory, setSensory] = useState(50);
  const [prediction, setPrediction] = useState<MotorFeedbackTrend | "">("");
  const [result, setResult] = useState<ReturnType<typeof compareMotorFeedback> | null>(null);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const current = compareMotorFeedback(drive, sensory);

  const invalidate = () => {
    setPrediction("");
    setResult(null);
  };
  const recordTrial = () => {
    if (!prediction) return;
    const comparison = compareMotorFeedback(drive, sensory);
    const correct = prediction === comparison.trend;
    setResult(comparison);
    setWasCorrect(correct);
    recordOutcome(11, "interactive", Number(correct), 1);
    if (correct) recordOutcome(11, "criterion:application:lab", 1, 1);
    setRows(previous => [...previous, {
      id: previous.length + 1,
      drive, sensory,
      baselineError: comparison.baseline.error,
      output: comparison.observed.output,
      error: comparison.observed.error,
      correct, note: ""
    }]);
  };
  const updateNote = (id: number, note: string) =>
    setRows(previous => previous.map(row => row.id === id ? { ...row, note } : row));

  return (
    <section style={{ margin: "28px 0", padding: 20, border: "1px solid #cfe0ea", borderRadius: 16 }}>
      <h2>{c.title}</h2>
      <p>{c.intro}</p>
      <p><strong>{c.task}</strong></p>
      <figure>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/88/Gray726-Brodman.png"
          alt={c.anatomy}
          loading="lazy"
          style={{ maxWidth: 420, width: "100%", height: "auto" }}
        />
        <figcaption>{c.anatomy} — Gray&apos;s Anatomy (1918), Wikimedia Commons, public domain.</figcaption>
      </figure>
      <label style={{ display: "block" }}>
        {c.drive}: {drive}
        <input type="range" min={0} max={100} value={drive}
          onChange={event => { setDrive(Number(event.target.value)); invalidate(); }}
          style={{ width: "100%" }} />
      </label>
      <label style={{ display: "block" }}>
        {c.sensory}: {sensory}
        <input type="range" min={0} max={100} value={sensory}
          onChange={event => { setSensory(Number(event.target.value)); invalidate(); }}
          style={{ width: "100%" }} />
      </label>
      <svg viewBox="0 0 600 150" role="img" aria-label={c.intro}
        style={{ width: "100%", background: "#fff", margin: "12px 0" }}>
        <circle cx="80" cy="75" r="29" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M109 75 H285" stroke="currentColor" strokeWidth={2 + drive / 25} />
        <circle cx="320" cy="75" r="27" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M347 75 H535" stroke="currentColor"
          strokeWidth={2 + current.observed.output / 25} />
        <path d="M500 111 C390 144 250 144 190 111" fill="none"
          stroke="currentColor" strokeWidth={2 + sensory / 30} strokeDasharray="7 5" />
        <text x="10" y="22" fontSize="15">{c.target}: {drive}</text>
        {result && <text x="330" y="22" fontSize="15">{c.output}: {result.observed.output}</text>}
      </svg>
      <label style={{ display: "block", margin: "12px 0" }}>
        {c.prediction}
        <select value={prediction} onChange={event => {
          setPrediction(event.target.value as MotorFeedbackTrend | "");
          setResult(null);
        }} style={{ display: "block", width: "100%", padding: 8 }}>
          <option value="">—</option>
          <option value="lower">{c.lower}</option>
          <option value="same">{c.same}</option>
          <option value="higher">{c.higher}</option>
        </select>
      </label>
      <button type="button" disabled={!prediction} onClick={recordTrial}>{c.save}</button>
      {result && <div role="status" aria-live="polite">
        <p>{wasCorrect ? c.correct : c.incorrect}</p>
        <p>{c.baseline}: {result.baseline.error}; {c.error}: {result.observed.error};
          {" "}{c.output}: {result.observed.output}.</p>
      </div>}
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr>
            <th scope="col">{c.trial}</th>
            <th scope="col">{c.drive}</th>
            <th scope="col">{c.sensory}</th>
            <th scope="col">{c.baseline}</th>
            <th scope="col">{c.output}</th>
            <th scope="col">{c.error}</th>
            <th scope="col">{c.comparison}</th>
            <th scope="col">{c.note}</th>
          </tr></thead>
          <tbody>
            {rows.map(row => <tr key={row.id}>
              <td>{row.id}</td><td>{row.drive}</td><td>{row.sensory}</td>
              <td>{row.baselineError}</td><td>{row.output}</td><td>{row.error}</td>
              <td>{row.correct ? c.correct : c.incorrect}</td>
              <td><input aria-label={c.note} value={row.note}
                onChange={event => updateNote(row.id, event.target.value)} /></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <p><small>{c.limit}</small></p>
      <ExperimentReflection language={language}
        theoryHref={`/modules/11/theory?lang=${language}`} />
    </section>
  );
}
