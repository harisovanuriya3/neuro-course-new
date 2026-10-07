"use client";

import { useEffect, useState } from "react";
import type { Language } from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import {recordOutcome} from "../lib/courseProgress";
import styles from "./SynapseLab.module.css";

const copy = {
  RU: {
    title: "Лаборатория: нужен ли вход Ca²⁺ для передачи?",
    intro: "Измените только одно условие, предскажите ответ и запустите учебную модель химического синапса.",
    condition: "Вход Ca²⁺ в пресинаптическое окончание",
    open: "Сохранён",
    blocked: "Заблокирован",
    prediction: "Ваш прогноз до опыта",
    response: "Постсинаптический ответ возникнет",
    absent: "Вызванного ответа не будет",
    run: "Запустить опыт",
    reset: "Новый прогноз",
    replay: "Повторить движение",
    choose: "Выберите условие и прогноз.",
    visual: "Динамическая схема учебной модели",
    steps: ["Импульс пришёл к окончанию", "Ионы Ca²⁺ входят в окончание", "Выделение медиатора", "Постсинаптический ответ"],
    blockedSteps: ["Импульс пришёл к окончанию", "Вход Ca²⁺ заблокирован", "Вызванного выделения нет", "Вызванного ответа нет"],
    arrival: "Потенциал действия достиг окончания аксона.",
    normal: "Ca²⁺ входит → везикулы выделяют медиатор → возникает постсинаптический ответ в этой модели.",
    noCalcium: "Вход Ca²⁺ заблокирован → вызванное выделение медиатора не происходит → вызванного постсинаптического ответа нет.",
    correct: "Прогноз совпал с результатом модели.",
    revise: "Сравните прогноз с результатом. Вход Ca²⁺ связывает приход импульса с выделением медиатора.",
    record: "Записать опыт", journal: "Журнал экспериментов", explanation: "Объяснение механизма", scope: "Это учебная модель одного химического синапса. Она не моделирует спонтанное выделение медиатора, другие механизмы ответа или действие конкретного препарата. Микрофотография выше показывает строение соединения, а не результат этого опыта.",
  },
  EN: {
    title: "Lab: is Ca²⁺ entry needed for transmission?",
    intro: "Change one condition, predict the outcome, then run this teaching model of a chemical synapse.",
    condition: "Ca²⁺ entry into the presynaptic terminal",
    open: "Intact",
    blocked: "Blocked",
    prediction: "Your prediction before the experiment",
    response: "A postsynaptic response will occur",
    absent: "No evoked response will occur",
    run: "Run experiment",
    reset: "New prediction",
    replay: "Replay movement",
    choose: "Choose a condition and prediction.",
    visual: "Animated teaching model",
    steps: ["Impulse reaches the terminal", "Ca²⁺ ions enter the terminal", "Transmitter is released", "Postsynaptic response"],
    blockedSteps: ["Impulse reaches the terminal", "Ca²⁺ entry is blocked", "No evoked release", "No evoked response"],
    arrival: "An action potential reached the axon terminal.",
    normal: "Ca²⁺ enters → vesicles release transmitter → a postsynaptic response occurs in this model.",
    noCalcium: "Ca²⁺ entry is blocked → evoked transmitter release does not occur → there is no evoked postsynaptic response.",
    correct: "Your prediction matches the model's result.",
    revise: "Compare your prediction with the result. Ca²⁺ entry links impulse arrival to transmitter release.",
    record: "Record trial", journal: "Experiment log", explanation: "Mechanism explanation", scope: "This is a teaching model of one chemical synapse. It does not model spontaneous release, other response mechanisms, or a specific drug. The micrograph above shows structure, not the outcome of this experiment.",
  },
  KZ: {
    title: "Зертхана: берілу үшін Ca²⁺ кіруі қажет пе?",
    intro: "Бір ғана шартты өзгертіп, нәтижені болжаңыз, содан кейін химиялық синапстың оқу моделін іске қосыңыз.",
    condition: "Ca²⁺-тың пресинапстық ұшқа кіруі",
    open: "Сақталған",
    blocked: "Бұғатталған",
    prediction: "Тәжірибеге дейінгі болжамыңыз",
    response: "Постсинапстық жауап пайда болады",
    absent: "Шақырылған жауап болмайды",
    run: "Тәжірибені бастау",
    reset: "Жаңа болжам",
    replay: "Қозғалысты қайталау",
    choose: "Шарт пен болжамды таңдаңыз.",
    visual: "Оқу моделінің қозғалысты сызбасы",
    steps: ["Импульс ұшқа жетті", "Ca²⁺ иондары ұшқа кіреді", "Медиатор бөлінеді", "Постсинапстық жауап"],
    blockedSteps: ["Импульс ұшқа жетті", "Ca²⁺ кіруі бұғатталды", "Шақырылған бөліну жоқ", "Шақырылған жауап жоқ"],
    arrival: "Әрекет потенциалы аксон ұшына жетті.",
    normal: "Ca²⁺ кіреді → везикулалар медиатор бөледі → осы модельде постсинапстық жауап пайда болады.",
    noCalcium: "Ca²⁺ кіруі бұғатталған → медиатордың шақырылған бөлінуі болмайды → шақырылған постсинапстық жауап жоқ.",
    correct: "Болжамыңыз модель нәтижесімен сәйкес келді.",
    revise: "Болжам мен нәтижені салыстырыңыз. Ca²⁺ кіруі импульстің келуін медиатордың бөлінуімен байланыстырады.",
    record: "Тәжірибені жазу", journal: "Эксперимент журналы", explanation: "Тетікті түсіндіру", scope: "Бұл бір химиялық синапстың оқу моделі. Ол медиатордың өздігінен бөлінуін, жауаптың өзге тетіктерін немесе нақты препараттың әсерін көрсетпейді. Жоғарыдағы микрофото тәжірибе нәтижесін емес, құрылысты көрсетеді.",
  },
};

export default function SynapseLab({ language }: { language: Language }) {
  const c = copy[language];
  const [condition, setCondition] = useState<"open" | "blocked">("open");
  const [prediction, setPrediction] = useState<"response" | "absent" | null>(null);
  const [result, setResult] = useState<{ condition: "open" | "blocked"; prediction: "response" | "absent" } | null>(null);
  const [stage, setStage] = useState(-1);
  const [rows, setRows] = useState<{id:number;condition:"open"|"blocked";prediction:"response"|"absent";outcome:"response"|"absent";note:string}[]>([]);
  useEffect(() => {
    if (!result || stage >= 3) return;
    const timer = window.setTimeout(() => setStage(current => current + 1), 1700);
    return () => window.clearTimeout(timer);
  }, [result, stage]);
  const outcome = result?.condition === "open" ? "response" : "absent";
  const steps = result?.condition === "blocked" ? c.blockedSteps : c.steps;
  const open = result?.condition === "open";
  return <section className={styles.lab} aria-label={c.title}>
    <h2>{c.title}</h2><p>{c.intro}</p>
    <div className={styles.columns}>
      <div>
        <fieldset disabled={result !== null}><legend>{c.condition}</legend>
          {(["open", "blocked"] as const).map(value => <label key={value}>
            <input type="radio" name="synapse-lab-condition" checked={condition === value} onChange={() => setCondition(value)} /> {c[value]}
          </label>)}
        </fieldset>
        <fieldset disabled={result !== null}><legend>{c.prediction}</legend>
          {(["response", "absent"] as const).map(value => <label key={value}>
            <input type="radio" name="synapse-lab-prediction" checked={prediction === value} onChange={() => setPrediction(value)} /> {c[value]}
          </label>)}
        </fieldset>
        <div className={styles.actions}>
          <button type="button" disabled={!prediction || !!result} onClick={() => { if (prediction) { setStage(0); setResult({ condition, prediction }); } }}>{c.run}</button>
          <button type="button" disabled={!result} onClick={() => { setPrediction(null); setResult(null); setStage(-1); }}>{c.reset}</button>
          <button type="button" disabled={!result} onClick={() => setStage(0)}>{c.replay}</button>
        </div>
      </div>
      <div>
        <div className={styles.visual}>
          <h3>{c.visual}</h3>
          <svg className={styles.diagram} viewBox="0 0 360 220" role="img" aria-label={result ? steps[stage] : c.visual}>
            <path className={styles.axon} d="M 12 70 H 68" />
            <rect className={styles.terminal} x="67" y="29" width="226" height="88" rx="34" />
            <path className={styles.membrane} d="M 75 118 H 167 M 193 118 H 285" />
            <path className={styles.channel} d="M 168 108 V 126 M 192 108 V 126" />
            <path className={styles.postCell} d="M 38 184 Q 180 157 322 184 V 215 H 38 Z" />
            <path className={styles.receptor} d="M 168 171 V 186 H 192 V 171" />
            <circle className={styles.vesicle} cx="113" cy="84" r="15" />
            <circle className={styles.vesicle} cx="246" cy="84" r="15" />
            <circle className={styles.vesicle} cx="145" cy="77" r="11" />
            <text className={styles.caLabel} x="199" y="149">Ca²⁺</text>
            {stage >= 0 && <circle className={styles.impulse} cx="45" cy="70" r="9" />}
            {stage >= 1 && open && <path className={styles.caRoute} d="M 180 154 V 89 M 173 98 L 180 89 L 187 98" />}
            {stage >= 1 && (open ? <g className={styles.calcium}>
              <circle cx="175" cy="150" r="6" /><circle cx="185" cy="159" r="6" />
            </g> : <g className={styles.blockMark}><path d="M 165 104 L 195 132 M 195 104 L 165 132" /></g>)}
            {stage >= 2 && open && <g className={styles.transmitter}>
              <circle cx="106" cy="116" r="4" /><circle cx="115" cy="122" r="4" />
              <circle cx="243" cy="116" r="4" /><circle cx="252" cy="122" r="4" />
            </g>}
            {stage >= 3 && open && <circle className={styles.responsePulse} cx="180" cy="188" r="21" />}
          </svg>
          {result && <ol className={styles.timeline}>
            {steps.map((step, index) => <li key={index} className={stage === index ? styles.current : stage > index ? styles.done : ""} aria-current={stage === index ? "step" : undefined}>{step}</li>)}
          </ol>}
        </div>
        <div className={styles.result} role="status" aria-live="polite">
          {result ? <><p>{steps[stage]}</p>{stage === 3 && <><p><strong>{result.condition === "open" ? c.normal : c.noCalcium}</strong></p>
            <p>{result.prediction === outcome ? c.correct : c.revise}</p></>}</> : <p>{c.choose}</p>}
        </div>
      </div>
    </div>
    {result && stage === 3 && <button type="button" onClick={() => setRows(xs => [...xs, { id: Date.now(), condition: result.condition, prediction: result.prediction, outcome: result.condition === "open" ? "response" : "absent", note: "" }])}>{c.record}</button>}
    <h3>{c.journal}</h3>
    {rows.length > 0 && <div style={{overflowX:"auto"}}><table><thead><tr><th>#</th><th>{c.condition}</th><th>{c.prediction}</th><th>{c.visual}</th><th>{c.explanation}</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.id}><td>{i+1}</td><td>{c[r.condition]}</td><td>{c[r.prediction]}</td><td>{c[r.outcome]}</td><td><input aria-label={c.explanation} value={r.note} onChange={e=>setRows(xs=>xs.map(x=>x.id===r.id?{...x,note:e.target.value}:x))}/></td></tr>)}</tbody></table></div>}
    <p className={styles.scope}>{c.scope}</p>
  <ExperimentReflection language={language} theoryHref={`/modules/5/theory?lang=${language}`} moduleId={5}/></section>;
}
