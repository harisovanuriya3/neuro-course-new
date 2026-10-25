"use client";
import { useState } from "react";
import type { Language } from "../content/course";
import { simulateSpinalReflex, expectedAntagonistChange } from "../lib/spinalReflexModel";
import ExperimentReflection from "./ExperimentReflection";
import { recordOutcome } from "../lib/courseProgress";

type Prediction = "" | "decrease" | "increase" | "unchanged";
type Trial = {
  id: number;
  stretch: number;
  inhibition: boolean;
  agonist: number;
  antagonist: number;
  prediction: Prediction;
  correct: boolean;
  note: string;
};
const T = {
  RU: {
    title: "Лаборатория спинальной регуляции",
    intro: "Модель рефлекса растяжения: Ia-афферент мышечного веретена возбуждает α-мотонейрон растягиваемой мышцы. Его коллатераль может включать тормозный интернейрон антагониста.",
    task: "При одинаковом входе Ia сравните активность антагониста с включённым и выключенным реципрокным торможением.",
    stretch: "Условный вход от мышечного веретена (не длина мышцы)",
    inh: "Включить тормозный интернейрон антагониста",
    ago: "Агонист",
    ant: "Антагонист",
    interneuron: "Тормозный интернейрон",
    prediction: "Прогноз: как включение интернейрона изменит активность антагониста при том же входе Ia?",
    select: "Выберите прогноз",
    decrease: "Снизит", increase: "Повысит", unchanged: "Не изменит",
    save: "Проверить прогноз и записать опыт",
    correct: "Прогноз направления верен. Ia-коллатераль активирует тормозный интернейрон, который уменьшает возбуждение α-мотонейронов антагониста.",
    wrong: "Направление прогноза неверно. Сравните два столбца: в модели активный тормозный интернейрон снижает ответ антагониста.",
    compareOff: "Антагонист без торможения",
    compareOn: "Антагонист с торможением",
    selected: "Текущее состояние",
    note: "Объяснение результата (проверяется преподавателем)",
    number: "№", stimulus: "Вход Ia", state: "Интернейрон", outcome: "Прогноз",
    on: "Вкл.", off: "Выкл.", yes: "Верно", no: "Пересмотреть",
    limit: "Учебная схема с произвольно выбранными коэффициентами. Проценты — условные показатели модели, НЕ измерения ЭМГ, силы, длины мышцы или частоты импульсов. Реальный ответ зависит от скорости растяжения, γ-активации, нисходящего контроля и других цепей. Отсутствие торможения в модели не означает физиологического выключения всех интернейронов."
  },
  EN: {
    title: "Spinal regulation laboratory",
    intro: "Stretch-reflex model: a muscle-spindle Ia afferent excites the stretched muscle's α-motor neuron. An Ia collateral can recruit an inhibitory interneuron acting on the antagonist.",
    task: "At the same Ia input, compare antagonist activity with reciprocal inhibition enabled and disabled.",
    stretch: "Illustrative muscle-spindle input (not muscle length)",
    inh: "Enable the antagonist inhibitory interneuron",
    ago: "Agonist", ant: "Antagonist", interneuron: "Inhibitory interneuron",
    prediction: "Predict: at the same Ia input, how does enabling the interneuron change antagonist activity?",
    select: "Choose a prediction",
    decrease: "Decreases", increase: "Increases", unchanged: "Unchanged",
    save: "Check prediction and record trial",
    correct: "The predicted direction is correct. An Ia collateral recruits an inhibitory interneuron that reduces excitation of antagonist α-motor neurons.",
    wrong: "The predicted direction is incorrect. Compare the two values: in this model, activating the inhibitory interneuron reduces the antagonist response.",
    compareOff: "Antagonist without inhibition", compareOn: "Antagonist with inhibition",
    selected: "Current setting", note: "Explain the result (for instructor review)",
    number: "No.", stimulus: "Ia input", state: "Interneuron", outcome: "Prediction",
    on: "On", off: "Off", yes: "Correct", no: "Review",
    limit: "Teaching schematic with arbitrary coefficients. Percentages are MODEL INDICES, not measured EMG, force, muscle length or firing rate. Real responses depend on stretch velocity, γ-drive, descending control and other circuits. Disabling this branch does not imply that all spinal interneurons are physiologically silent."
  },
  KZ: {
    title: "Жұлындық реттелу зертханасы",
    intro: "Созылу рефлексінің моделі: бұлшықет ұршығының Ia-афференті созылған бұлшықеттің α-мотонейронын қоздырады. Ia-талшығының тармағы антагонистке әсер ететін тежеуші интернейронды белсендіре алады.",
    task: "Ia кірісі бірдей болғанда антагонист белсенділігін реципроктық тежелу қосылған және өшірілген жағдайларда салыстырыңыз.",
    stretch: "Бұлшықет ұршығының шартты кірісі (бұлшықет ұзындығы емес)",
    inh: "Антагонистің тежеуші интернейронын қосу",
    ago: "Агонист", ant: "Антагонист", interneuron: "Тежеуші интернейрон",
    prediction: "Болжаңыз: Ia кірісі бірдей болса, интернейронды қосу антагонист белсенділігін қалай өзгертеді?",
    select: "Болжамды таңдаңыз",
    decrease: "Төмендетеді", increase: "Арттырады", unchanged: "Өзгертпейді",
    save: "Болжамды тексеріп, тәжірибені жазу",
    correct: "Болжамның бағыты дұрыс. Ia-талшығының тармағы тежеуші интернейронды белсендіріп, антагонистің α-мотонейрондарының қозуын азайтады.",
    wrong: "Болжамның бағыты дұрыс емес. Екі мәнді салыстырыңыз: модельде тежеуші интернейронның белсенуі антагонист жауабын төмендетеді.",
    compareOff: "Тежелусіз антагонист", compareOn: "Тежелуі бар антагонист",
    selected: "Ағымдағы күй", note: "Нәтижені түсіндіру (оқытушы тексереді)",
    number: "№", stimulus: "Ia кірісі", state: "Интернейрон", outcome: "Болжам",
    on: "Қосулы", off: "Өшірулі", yes: "Дұрыс", no: "Қайта қарау",
    limit: "Коэффициенттері шартты түрде таңдалған оқу сызбасы. Пайыздар — МОДЕЛЬДІҢ ШАРТТЫ КӨРСЕТКІШТЕРІ; ЭМГ, күш, бұлшықет ұзындығы немесе импульс жиілігінің өлшемдері емес. Нақты жауап созылу жылдамдығына, γ-белсенділікке, төмендеуші реттелуге және басқа тізбектерге тәуелді. Бұл тармақты өшіру барлық жұлын интернейрондарының физиологиялық тұрғыдан өшуін білдірмейді."
  }
} as const;

export default function SpinalRegulationLab({ language }: { language: Language }) {
  const c = T[language];
  const [stretch, setStretch] = useState(50);
  const [inhibition, setInhibition] = useState(true);
  const [prediction, setPrediction] = useState<Prediction>("");
  const [revealed, setRevealed] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [rows, setRows] = useState<Trial[]>([]);
  const model = simulateSpinalReflex({ stretch, reciprocalInhibition: inhibition });
  const changeParameters = () => { setRevealed(false); };
  function runTrial() {
    if (!prediction) return;
    const correct = prediction === expectedAntagonistChange(stretch);
    setLastCorrect(correct);
    setRevealed(true);
    recordOutcome(9, "interactive", Number(correct), 1);
    recordOutcome(9, "criterion:application:lab", Number(correct), 1);
    // A direction choice cannot establish a mechanistic explanation or justify a lab result.
    setRows(previous => [...previous, {
      id: previous.length + 1, stretch, inhibition,
      agonist: model.agonist, antagonist: model.antagonist,
      prediction, correct, note: ""
    }]);
  }
  return <section style={{ margin: "28px 0", padding: 20, border: "1px solid #cfe0ea", borderRadius: 16 }}>
    <h2>{c.title}</h2>
    <p>{c.intro}</p>
    <p><strong>{c.task}</strong></p>
    <label style={{ display: "block", marginBottom: 12 }}>
      {c.stretch}: {stretch}%
      <input type="range" min="10" max="100" value={stretch}
        onChange={event => { setStretch(Number(event.target.value)); changeParameters(); }}
        style={{ display: "block", width: "100%" }} />
    </label>
    <label style={{ display: "block", marginBottom: 12 }}>
      <input type="checkbox" checked={inhibition}
        onChange={event => { setInhibition(event.target.checked); changeParameters(); }} /> {c.inh}
    </label>
    <svg role="img" aria-label={c.intro} viewBox="0 0 650 205"
      style={{ width: "100%", maxWidth: 700, background: "#fff", color: "#17446b" }}>
      <text x="15" y="65" fill="currentColor">Ia</text>
      <path d="M45 60 H275" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="295" cy="60" r="20" fill="white" stroke="currentColor" strokeWidth="3" />
      <text x="295" y="65" textAnchor="middle" fill="currentColor">α</text>
      <path d="M315 60 H590" fill="none" stroke="currentColor" strokeWidth="3" />
      <text x="430" y="45" fill="currentColor">{c.ago}</text>
      <path d="M160 60 V150 H275" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="295" cy="150" r="20" fill="white" stroke="currentColor" strokeWidth="3" />
      <text x="295" y="155" textAnchor="middle" fill="currentColor">I</text>
      <path d="M315 150 H390" fill="none" stroke={inhibition ? "#17446b" : "#a1a1a1"}
        strokeWidth="3" strokeDasharray={inhibition ? undefined : "5 5"} />
      <path d="M390 137 V163" fill="none" stroke={inhibition ? "#17446b" : "#a1a1a1"} strokeWidth="4" />
      <circle cx="445" cy="150" r="20" fill="white" stroke="currentColor" strokeWidth="3" />
      <text x="445" y="155" textAnchor="middle" fill="currentColor">α</text>
      <path d="M465 150 H590" fill="none" stroke="currentColor" strokeWidth="3" />
      <text x="495" y="136" fill="currentColor">{c.ant}</text>
      <text x="175" y="192" fontSize="15" fill="currentColor">{c.interneuron}</text>
    </svg>
    <label style={{ display: "block", margin: "12px 0" }}>
      {c.prediction}
      <select value={prediction} onChange={event => { setPrediction(event.target.value as Prediction); setRevealed(false); }}
        style={{ display: "block", maxWidth: "100%", padding: 8, marginTop: 6 }}>
        <option value="">{c.select}</option>
        <option value="decrease">{c.decrease}</option>
        <option value="increase">{c.increase}</option>
        <option value="unchanged">{c.unchanged}</option>
      </select>
    </label>
    <button type="button" disabled={!prediction} onClick={runTrial}>{c.save}</button>
    {revealed && <div role="status" aria-live="polite" style={{ marginTop: 16 }}>
      <p><strong>{lastCorrect ? c.correct : c.wrong}</strong></p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
        {[
          [c.ago, model.agonist],
          [c.compareOff, model.antagonistWithoutInhibition],
          [c.compareOn, model.antagonistWithInhibition],
          [c.selected + ": " + (inhibition ? c.on : c.off), model.antagonist]
        ].map(([label, value]) => <div key={String(label)}>
          <strong>{label}: {value}%</strong>
          <div style={{ height: 15, border: "1px solid currentColor", marginTop: 5 }}>
            <div style={{ width: value + "%", height: "100%", background: "currentColor" }} />
          </div>
        </div>)}
      </div>
    </div>}
    {rows.length > 0 && <div style={{ overflowX: "auto", marginTop: 18 }}>
      <table>
        <thead><tr><th>{c.number}</th><th>{c.stimulus}</th><th>{c.state}</th>
          <th>{c.ago}</th><th>{c.ant}</th><th>{c.outcome}</th><th>{c.note}</th></tr></thead>
        <tbody>{rows.map(row => <tr key={row.id}>
          <td>{row.id}</td><td>{row.stretch}%</td><td>{row.inhibition ? c.on : c.off}</td>
          <td>{row.agonist}%</td><td>{row.antagonist}%</td>
          <td>{row.correct ? c.yes : c.no}</td>
          <td><input aria-label={c.note + " " + row.id} value={row.note}
            onChange={event => setRows(previous => previous.map(item =>
              item.id === row.id ? { ...item, note: event.target.value } : item))} /></td>
        </tr>)}</tbody>
      </table>
    </div>}
    <p><small>{c.limit}</small></p>
    <ExperimentReflection language={language} theoryHref={`/modules/9/theory?lang=${language}`} />
  </section>;
}
