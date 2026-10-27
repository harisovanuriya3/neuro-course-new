"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import { recordOutcome } from "../lib/courseProgress";
import { compareBasalGanglia, type BasalGangliaTrend, type BasalGangliaResult } from "../lib/basalGangliaModel";
import ExperimentReflection from "./ExperimentReflection";

type Trial = {
  id: number; dopamine: number; prediction: BasalGangliaTrend;
  observed: BasalGangliaResult; correct: boolean; note: string;
};
const T = {
  RU: {
    title: "Виртуальная лаборатория: базальные ганглии",
    intro: "Измените условную нигростриарную дофаминовую модуляцию и предскажите направление изменения модельного индекса таламо-кортикального облегчения относительно контрольного уровня 50.",
    task: "Проведите три опыта при уровнях 0, 50 и 100. До каждого запуска выберите прогноз, затем сравните результаты и объясните цепь D1/D2 → GPi/SNr → таламус.",
    dopamine: "Условная дофаминовая модуляция (индекс 0–100)",
    prediction: "Прогноз индекса облегчения по сравнению с контрольным уровнем 50",
    lower: "Ниже", same: "Такой же", higher: "Выше",
    run: "Проверить прогноз и записать опыт", reset: "Сбросить опыт",
    direct: "Влияние прямого пути", indirect: "Влияние непрямого пути",
    output: "Индекс таламо-кортикального облегчения", control: "Контрольный индекс",
    trial: "Опыт", result: "Результат модели", match: "Сопоставление прогноза",
    correct: "Прогноз совпал с результатом модели.", incorrect: "Прогноз не совпал. Сравните индекс с контролем 50 и проверьте знак изменения.",
    note: "Физиологическое объяснение (для проверки преподавателем)",
    notGraded: "Письменное объяснение автоматически не оценивается. Верный прогноз подтверждает только понимание направления изменения в этой модели, а не знание всего механизма.",
    anatomy: "Канонические связи (⊣ — торможение, → — возбуждающее влияние)",
    directPath: "Прямой: кора → стриатум (D1) ⊣ GPi/SNr ⊣ таламус → кора.",
    indirectPath: "Непрямой: кора → стриатум (D2) ⊣ GPe ⊣ STN → GPi/SNr ⊣ таламус.",
    hyperdirect: "Гиперпрямой: кора → STN → GPi/SNr ⊣ таламус; стриатум минуется.",
    limit: "Три пути действуют совместно; схема показывает лишь их канонические знаки. Индексы 0–100 и коэффициенты выбраны для обучения, не измеряют концентрацию дофамина, разряды нейронов, силу мышц или клиническую тяжесть. Изменение индекса не позволяет поставить диагноз или предсказать движение конкретного пациента."
  },
  EN: {
    title: "Virtual laboratory: basal ganglia",
    intro: "Change illustrative nigrostriatal dopaminergic modulation and predict the direction of change in a modeled thalamocortical facilitation index relative to the reference level of 50.",
    task: "Run trials at 0, 50 and 100. Predict before each run, compare the results and explain the D1/D2 → GPi/SNr → thalamus causal chain.",
    dopamine: "Illustrative dopaminergic modulation (index 0–100)",
    prediction: "Predicted facilitation index relative to reference level 50",
    lower: "Lower", same: "Same", higher: "Higher",
    run: "Check prediction and record trial", reset: "Reset trials",
    direct: "Direct-pathway influence", indirect: "Indirect-pathway influence",
    output: "Thalamocortical facilitation index", control: "Reference index",
    trial: "Trial", result: "Model result", match: "Prediction check",
    correct: "Prediction matches the model.", incorrect: "Prediction differs from the model. Compare the index with reference 50 and check the direction.",
    note: "Physiological explanation (for instructor review)",
    notGraded: "Written reasoning is not automatically graded. A correct prediction demonstrates only the direction of change within this model, not mastery of the full mechanism.",
    anatomy: "Canonical connections (⊣ inhibitory, → excitatory influence)",
    directPath: "Direct: cortex → striatum (D1) ⊣ GPi/SNr ⊣ thalamus → cortex.",
    indirectPath: "Indirect: cortex → striatum (D2) ⊣ GPe ⊣ STN → GPi/SNr ⊣ thalamus.",
    hyperdirect: "Hyperdirect: cortex → STN → GPi/SNr ⊣ thalamus; bypasses striatum.",
    limit: "All three pathways act together; the diagram shows only canonical signs. The 0–100 indices and coefficients are chosen for teaching. They do not measure dopamine concentration, neuronal firing, muscle strength or clinical severity. A change in this index cannot diagnose disease or predict an individual's movement."
  },
  KZ: {
    title: "Виртуалды зертхана: базальды ганглийлер",
    intro: "Нигростриарлық дофаминдік модуляцияның шартты деңгейін өзгертіп, таламо-қыртыстық жеңілдетудің модельдік индексі бақылау деңгейі 50-мен салыстырғанда қалай өзгеретінін болжаңыз.",
    task: "0, 50 және 100 деңгейлерінде үш тәжірибе өткізіңіз. Әр тәжірибеге дейін болжам жасаңыз, нәтижелерді салыстырып, D1/D2 → GPi/SNr → таламус себептік тізбегін түсіндіріңіз.",
    dopamine: "Шартты дофаминдік модуляция (0–100 индексі)",
    prediction: "Жеңілдету индексінің бақылау деңгейі 50-мен салыстырғандағы болжамы",
    lower: "Төмен", same: "Бірдей", higher: "Жоғары",
    run: "Болжамды тексеріп, тәжірибені жазу", reset: "Тәжірибелерді тазарту",
    direct: "Тікелей жолдың ықпалы", indirect: "Жанама жолдың ықпалы",
    output: "Таламо-қыртыстық жеңілдету индексі", control: "Бақылау индексі",
    trial: "Тәжірибе", result: "Модель нәтижесі", match: "Болжамды салыстыру",
    correct: "Болжам модель нәтижесіне сәйкес келді.", incorrect: "Болжам модель нәтижесіне сәйкес келмеді. Индексті бақылау мәні 50-мен салыстырып, өзгеріс бағытын тексеріңіз.",
    note: "Физиологиялық түсіндірме (оқытушы тексереді)",
    notGraded: "Жазбаша түсіндірме автоматты түрде бағаланбайды. Дұрыс болжам осы модельдегі өзгеріс бағытын түсінуді ғана көрсетеді; бүкіл механизмді меңгеруді дәлелдемейді.",
    anatomy: "Канондық байланыстар (⊣ — тежелу, → — қоздырушы ықпал)",
    directPath: "Тікелей: қыртыс → стриатум (D1) ⊣ GPi/SNr ⊣ таламус → қыртыс.",
    indirectPath: "Жанама: қыртыс → стриатум (D2) ⊣ GPe ⊣ STN → GPi/SNr ⊣ таламус.",
    hyperdirect: "Гипертікелей: қыртыс → STN → GPi/SNr ⊣ таламус; стриатумды айналып өтеді.",
    limit: "Үш жол бір мезгілде әрекет етеді; сызба олардың канондық әсер бағытын ғана көрсетеді. 0–100 индекстері мен коэффициенттер оқу үшін таңдалған. Олар дофамин концентрациясын, нейрон разрядтарын, бұлшықет күшін немесе аурудың ауырлығын өлшемейді. Индекстің өзгерісі диагноз қоюға немесе нақты адамның қозғалысын болжауға жарамайды."
  }
} as const;

export default function BasalGangliaLab({ language }: { language: Language }) {
  const c = T[language];
  const [dopamine, setDopamine] = useState(50);
  const [prediction, setPrediction] = useState<BasalGangliaTrend | "">("");
  const [result, setResult] = useState<ReturnType<typeof compareBasalGanglia> | null>(null);
  const [rows, setRows] = useState<Trial[]>([]);
  const latest = rows[rows.length - 1];
  function changeDopamine(value: number) {
    setDopamine(value);
    setPrediction("");
    setResult(null);
  }
  function run() {
    if (!prediction) return;
    const comparison = compareBasalGanglia(dopamine);
    const correct = prediction === comparison.trend;
    setResult(comparison);
    setRows(previous => [...previous, {
      id: previous.length + 1, dopamine: comparison.observed.dopamine,
      prediction, observed: comparison.observed, correct, note: ""
    }]);
    recordOutcome(12, "interactive", Number(correct), 1);
    recordOutcome(12, "criterion:application:lab", Number(correct), 1);
    // Neither a direction prediction nor text length certifies mechanism or justification.
  }
  const bars = result ? [
    { label: c.direct, value: result.observed.directIndex, opacity: 0.65 },
    { label: c.indirect, value: result.observed.indirectIndex, opacity: 0.4 },
    { label: c.output, value: result.observed.thalamicFacilitationIndex, opacity: 0.85 }
  ] : [];
  const trendLabel = (value: BasalGangliaTrend) => c[value];
  return <section style={{ margin: "28px 0", padding: 20, border: "1px solid #cfe0ea", borderRadius: 16 }}>
    <h2>{c.title}</h2>
    <p>{c.intro}</p><p><strong>{c.task}</strong></p>
    <h3>{c.anatomy}</h3>
    <ol>
      <li>{c.directPath}</li><li>{c.indirectPath}</li><li>{c.hyperdirect}</li>
    </ol>
    <label htmlFor="bg-dopamine">{c.dopamine}: <strong>{dopamine}</strong></label>
    <input id="bg-dopamine" type="range" min={0} max={100} step={10} value={dopamine}
      onChange={event => changeDopamine(Number(event.target.value))}
      style={{ display: "block", width: "100%", margin: "10px 0 18px" }} />
    <label htmlFor="bg-prediction">{c.prediction}</label>
    <select id="bg-prediction" value={prediction} onChange={event => { setPrediction(event.target.value as BasalGangliaTrend | ""); setResult(null); }}
      style={{ display: "block", maxWidth: "100%", margin: "8px 0 16px" }}>
      <option value="">—</option>
      <option value="lower">{c.lower}</option><option value="same">{c.same}</option><option value="higher">{c.higher}</option>
    </select>
    <button type="button" disabled={!prediction} onClick={run}>{c.run}</button>{" "}
    <button type="button" onClick={() => { setRows([]); setResult(null); setPrediction(""); setDopamine(50); }}>{c.reset}</button>
    {result && <div role="status" aria-live="polite" style={{ marginTop: 18 }}>
      <p><strong>{c.match}: {latest?.correct ? c.correct : c.incorrect}</strong></p>
      <p>{c.control}: {result.baseline.thalamicFacilitationIndex} · {c.output}: {result.observed.thalamicFacilitationIndex} · {trendLabel(result.trend)}</p>
      <svg viewBox="0 0 650 205" role="img" aria-label={c.result} style={{ width: "100%", maxWidth: 650 }}>
        {bars.map((bar, index) => <g key={bar.label} transform={`translate(0 ${index * 66})`}>
          <text x="8" y="20" fontSize="15" fill="currentColor">{bar.label}</text>
          <rect x="8" y="29" width="500" height="22" rx="4" fill="currentColor" opacity="0.12" />
          <rect x="8" y="29" width={bar.value * 5} height="22" rx="4" fill="currentColor" opacity={bar.opacity} />
          <text x="525" y="46" fontSize="18" fill="currentColor">{bar.value}/100</text>
        </g>)}
      </svg>
    </div>}
    <div style={{ overflowX: "auto", marginTop: 16 }}>
      <table>
        <caption>{c.result}</caption>
        <thead><tr>
          <th scope="col">{c.trial}</th><th scope="col">{c.dopamine}</th>
          <th scope="col">{c.prediction}</th><th scope="col">{c.output}</th>
          <th scope="col">{c.match}</th><th scope="col">{c.note}</th>
        </tr></thead>
        <tbody>{rows.map(row => <tr key={row.id}>
          <td>{row.id}</td><td>{row.dopamine}</td><td>{trendLabel(row.prediction)}</td>
          <td>{row.observed.thalamicFacilitationIndex}</td>
          <td>{row.correct ? c.correct : c.incorrect}</td>
          <td><input aria-label={`${c.note} ${row.id}`} value={row.note}
            onChange={event => setRows(previous => previous.map(item => item.id === row.id ? { ...item, note: event.target.value } : item))} /></td>
        </tr>)}</tbody>
      </table>
    </div>
    <p>{c.notGraded}</p>
    <p><small>{c.limit}</small></p>
    <ExperimentReflection language={language} theoryHref={`/modules/12/theory?lang=${language}`} />
  </section>;
}
