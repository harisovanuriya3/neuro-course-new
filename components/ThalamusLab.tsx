"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import { recordOutcome } from "../lib/courseProgress";
import { compareThalamus, type ThalamusTrend } from "../lib/thalamusModel";

type TrialRecord = {
  id: number; input: number; gate: number; baseline: number; observed: number;
  predicted: ThalamusTrend; actual: ThalamusTrend; note: string;
};
const T = {
  RU: {
    title: "Виртуальная лаборатория: таламическое реле и обнаружение сигнала",
    intro: "Сравните одинаковый сенсорный вход при эталонном индексе передачи 50 и выбранном индексе. Сначала предскажите направление изменения условного коркового ответа, затем откройте результат.",
    input: "Условный индекс сенсорного входа", gate: "Условный индекс передачи",
    pathway: "Путь для анатомического разбора", body: "Соматосенсорный сигнал от тела — VPL",
    face: "Соматосенсорный сигнал от лица — VPM",
    pathwayNote: "VPL преимущественно связан с чувствительностью тела, VPM — лица. Выбор пути меняет анатомическую подпись, но не численную формулу: одинаковый коэффициент не означает одинаковую реальную физиологию этих ядер.",
    prediction: "Прогноз относительно эталона", lower: "Уменьшится", same: "Не изменится", higher: "Увеличится",
    choose: "Выберите прогноз", run: "Проверить прогноз", baseline: "Эталон (передача 50)",
    observed: "Выбранное условие", relay: "Индекс релейного выхода", cortex: "Индекс условного коркового ответа",
    right: "Прогноз соответствует результату учебной модели.", wrong: "Прогноз не совпал: сравните численные индексы и объясните причину.",
    outcome: "Результат", trial: "Опыт", note: "Ваше объяснение (не оценивается автоматически)",
    chart: "Сравнение условного коркового ответа при эталонном и выбранном индексе передачи",
    theory: "Таламические релейные нейроны в основном передают возбуждение в кору; ГАМК-ергическое ретикулярное ядро регулирует релейные нейроны. Режимы тонических и пачечных разрядов, T-типа Ca²⁺-каналы, обратная связь коры и состояние бодрствования здесь не рассчитываются.",
    limit: "Индексы от 0 до 100 безразмерны. Формула — специально заданное учебное допущение, не экспериментальная зависимость, не ЭЭГ, не запись нейронов, не точность обнаружения сигнала и не клинический диагностический тест. Совпадение прогноза оценивается автоматически; физиологическая правильность письменного объяснения — нет.",
    inputNode: "Сенсорный вход", relayNode: "Таламус", cortexNode: "Кора",
  },
  EN: {
    title: "Virtual laboratory: thalamic relay and signal detection",
    intro: "Compare identical sensory input under a reference transmission index of 50 and a chosen index. Predict the direction of change in the illustrative cortical output before revealing the result.",
    input: "Illustrative sensory-input index", gate: "Illustrative transmission index",
    pathway: "Pathway for anatomical discussion", body: "Body somatosensation — VPL",
    face: "Facial somatosensation — VPM",
    pathwayNote: "VPL predominantly relays body sensation; VPM relays facial sensation. The pathway choice changes the anatomical label, not the numerical equation: equal coefficients do not imply identical real physiology.",
    prediction: "Prediction relative to reference", lower: "Lower", same: "Unchanged", higher: "Higher",
    choose: "Choose a prediction", run: "Check prediction", baseline: "Reference (transmission 50)",
    observed: "Chosen condition", relay: "Relay-output index", cortex: "Illustrative cortical-output index",
    right: "Prediction matches the teaching model.", wrong: "Prediction differs from the model: compare the indices and explain why.",
    outcome: "Result", trial: "Trial", note: "Your explanation (not automatically graded)",
    chart: "Illustrative cortical-output comparison: reference versus chosen transmission",
    theory: "Thalamic relay neurons mainly provide excitatory output to cortex; the GABAergic thalamic reticular nucleus modulates relay neurons. Tonic/burst modes, T-type Ca²⁺ channels, cortical feedback and vigilance state are not calculated here.",
    limit: "Values from 0 to 100 are dimensionless indices. The formula is an explicit teaching assumption, not an experimentally fitted relation, EEG, neural recording, detection accuracy or clinical diagnostic test. Only the selected prediction is automatically scored; written physiological reasoning is not.",
    inputNode: "Sensory input", relayNode: "Thalamus", cortexNode: "Cortex",
  },
  KZ: {
    title: "Виртуалды зертхана: таламустық реле және сигналды анықтау",
    intro: "Сенсорлық кірісі бірдей екі жағдайды салыстырыңыз: берілістің эталондық индексі 50 және өзіңіз таңдаған индекс. Нәтижені ашпас бұрын шартты қыртыстық шығыстың өзгеру бағытын болжаңыз.",
    input: "Сенсорлық кірістің шартты индексі", gate: "Берілістің шартты индексі",
    pathway: "Анатомиялық талдауға арналған жол", body: "Денеден келетін соматосенсорлық сигнал — VPL",
    face: "Беттен келетін соматосенсорлық сигнал — VPM",
    pathwayNote: "VPL көбіне дене сезімталдығымен, VPM бет сезімталдығымен байланысты. Жолды таңдау анатомиялық атауды өзгертеді, сандық формуланы өзгертпейді: бірдей коэффициенттер нақты физиологияның бірдей екенін білдірмейді.",
    prediction: "Эталонға қатысты болжам", lower: "Азаяды", same: "Өзгермейді", higher: "Артады",
    choose: "Болжамды таңдаңыз", run: "Болжамды тексеру", baseline: "Эталон (беріліс 50)",
    observed: "Таңдалған жағдай", relay: "Релейлік шығыс индексі", cortex: "Қыртыстық шығыстың шартты индексі",
    right: "Болжам оқу моделінің нәтижесіне сәйкес келді.", wrong: "Болжам модельмен сәйкес келмеді: индекстерді салыстырып, себебін түсіндіріңіз.",
    outcome: "Нәтиже", trial: "Тәжірибе", note: "Түсіндірмеңіз (автоматты түрде бағаланбайды)",
    chart: "Эталон мен таңдалған берілістегі шартты қыртыстық шығысты салыстыру",
    theory: "Таламустың релейлік нейрондары қыртысқа негізінен қоздырушы сигнал жібереді; ГАМҚ-ергиялық ретикулярлық ядро релейлік нейрондардың жұмысын реттейді. Тоникалық және топтық разряд режимдері, T-типті Ca²⁺ арналары, қыртыстық кері байланыс және сергектік күйі бұл модельде есептелмейді.",
    limit: "0-ден 100-ге дейінгі сандар — өлшемсіз индекстер. Формула тәжірибемен дәлелденген заң емес, оқу үшін алынған жорамал; ол ЭЭГ, нейрон жазбасы, сигналды анықтау дәлдігі немесе клиникалық диагностикалық сынақ емес. Тек таңдалған болжам автоматты бағаланады, жазбаша физиологиялық түсіндірме бағаланбайды.",
    inputNode: "Сенсорлық кіріс", relayNode: "Таламус", cortexNode: "Қыртыс",
  },
} as const;

export default function ThalamusLab({ language }: { language: Language }) {
  const c = T[language];
  const [input, setInput] = useState(70);
  const [gate, setGate] = useState(60);
  const [pathway, setPathway] = useState<"body" | "face">("body");
  const [prediction, setPrediction] = useState<ThalamusTrend | "">("");
  const [revealed, setRevealed] = useState(false);
  const [rows, setRows] = useState<TrialRecord[]>([]);
  const comparison = compareThalamus(input, gate);
  const correct = prediction !== "" && prediction === comparison.trend;

  function invalidate() {
    setPrediction("");
    setRevealed(false);
  }
  function runTrial() {
    if (!prediction || revealed) return;
    const isCorrect = prediction === comparison.trend;
    recordOutcome(14, "interactive", Number(isCorrect), 1);
    recordOutcome(14, "criterion:application:lab", Number(isCorrect), 1);
    // Neither text length nor presence certifies a mechanism or justification.
    setRows(previous => [...previous, {
      id: previous.length + 1, input, gate,
      baseline: comparison.baseline.corticalIndex,
      observed: comparison.observed.corticalIndex,
      predicted: prediction, actual: comparison.trend, note: "",
    }]);
    setRevealed(true);
  }
  return <section style={{ margin: "28px 0", padding: 20, border: "1px solid #cfe0ea", borderRadius: 16 }}>
    <h2>{c.title}</h2>
    <p>{c.intro}</p>
    <label style={{ display: "block", marginBottom: 14 }}>{c.pathway}
      <select value={pathway} onChange={e => { setPathway(e.target.value as "body" | "face"); invalidate(); }}
        style={{ display: "block", width: "100%", padding: 8 }}>
        <option value="body">{c.body}</option><option value="face">{c.face}</option>
      </select>
    </label>
    <p><small>{c.pathwayNote}</small></p>
    <label style={{ display: "block", marginBottom: 14 }}>{c.input}: <strong>{input}</strong>
      <input type="range" min={0} max={100} value={input}
        onChange={e => { setInput(Number(e.target.value)); invalidate(); }} style={{ display: "block", width: "100%" }} />
    </label>
    <label style={{ display: "block", marginBottom: 14 }}>{c.gate}: <strong>{gate}</strong>
      <input type="range" min={0} max={100} value={gate}
        onChange={e => { setGate(Number(e.target.value)); invalidate(); }} style={{ display: "block", width: "100%" }} />
    </label>
    <svg viewBox="0 0 600 130" role="img" aria-label={pathway === "body" ? c.body : c.face}
      style={{ width: "100%", maxWidth: 600, margin: "12px 0" }}>
      <rect x="8" y="35" width="160" height="56" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="216" y="35" width="160" height="56" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="424" y="35" width="168" height="56" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M168 63 H216 M376 63 H424" stroke="currentColor" strokeWidth="3" />
      <text x="88" y="68" textAnchor="middle" fontSize="13" fill="currentColor">{c.inputNode}</text>
      <text x="296" y="68" textAnchor="middle" fontSize="13" fill="currentColor">{pathway === "body" ? "VPL" : "VPM"}</text>
      <text x="508" y="68" textAnchor="middle" fontSize="13" fill="currentColor">{c.cortexNode}</text>
    </svg>
    <label style={{ display: "block", marginBottom: 12 }}>{c.prediction}
      <select value={prediction} onChange={e => { setPrediction(e.target.value as ThalamusTrend | ""); setRevealed(false); }}
        style={{ display: "block", width: "100%", padding: 8 }}>
        <option value="">{c.choose}</option><option value="lower">{c.lower}</option>
        <option value="same">{c.same}</option><option value="higher">{c.higher}</option>
      </select>
    </label>
    <button type="button" disabled={!prediction || revealed} onClick={runTrial}>{c.run}</button>
    {revealed && <div role="status" aria-live="polite" style={{ marginTop: 16 }}>
      <h3>{c.outcome}</h3>
      <p>{correct ? c.right : c.wrong}</p>
      <p>{c.relay}: {comparison.observed.relayIndex}; {c.cortex}: {comparison.observed.corticalIndex}.</p>
      <p>{c.baseline}: {comparison.baseline.corticalIndex}; {c.observed}: {comparison.observed.corticalIndex}.</p>
      <svg viewBox="0 0 560 128" role="img" aria-label={c.chart} style={{ width: "100%", maxWidth: 560 }}>
        <text x="8" y="18" fontSize="13" fill="currentColor">{c.baseline}</text>
        <rect x="8" y="26" width={comparison.baseline.corticalIndex * 4.8} height="16" fill="#397fa8" />
        <text x="8" y="76" fontSize="13" fill="currentColor">{c.observed}</text>
        <rect x="8" y="84" width={comparison.observed.corticalIndex * 4.8} height="16" fill="#bd773b" />
      </svg>
    </div>}
    {rows.length > 0 && <div style={{ overflowX: "auto", marginTop: 18 }}>
      <table><thead><tr>
        <th scope="col">{c.trial}</th><th scope="col">{c.input}</th><th scope="col">{c.gate}</th>
        <th scope="col">{c.baseline}</th><th scope="col">{c.observed}</th><th scope="col">{c.note}</th>
      </tr></thead><tbody>{rows.map(row => <tr key={row.id}>
        <td>{row.id}</td><td>{row.input}</td><td>{row.gate}</td>
        <td>{row.baseline}</td><td>{row.observed}</td>
        <td><input type="text" aria-label={c.note + " " + row.id} value={row.note}
          onChange={e => { const note = e.target.value; setRows(previous => previous.map(item => item.id === row.id ? { ...item, note } : item)); }} /></td>
      </tr>)}</tbody></table>
    </div>}
    <p>{c.theory}</p>
    <p><small>{c.limit}</small></p>
    <ExperimentReflection language={language} theoryHref={`/modules/14/theory?lang=${language}`} />
  </section>;
}
