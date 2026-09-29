"use client";

import { useState } from "react";
import type { Language } from "../content/course";
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
    choose: "Выберите условие и прогноз.",
    arrival: "Потенциал действия достиг окончания аксона.",
    normal: "Ca²⁺ входит → везикулы выделяют медиатор → возникает постсинаптический ответ в этой модели.",
    noCalcium: "Вход Ca²⁺ заблокирован → вызванное выделение медиатора не происходит → вызванного постсинаптического ответа нет.",
    correct: "Прогноз совпал с результатом модели.",
    revise: "Сравните прогноз с результатом. Вход Ca²⁺ связывает приход импульса с выделением медиатора.",
    scope: "Это учебная модель одного химического синапса. Она не моделирует спонтанное выделение медиатора, другие механизмы ответа или действие конкретного препарата. Микрофотография выше показывает строение соединения, а не результат этого опыта.",
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
    choose: "Choose a condition and prediction.",
    arrival: "An action potential reached the axon terminal.",
    normal: "Ca²⁺ enters → vesicles release transmitter → a postsynaptic response occurs in this model.",
    noCalcium: "Ca²⁺ entry is blocked → evoked transmitter release does not occur → there is no evoked postsynaptic response.",
    correct: "Your prediction matches the model's result.",
    revise: "Compare your prediction with the result. Ca²⁺ entry links impulse arrival to transmitter release.",
    scope: "This is a teaching model of one chemical synapse. It does not model spontaneous release, other response mechanisms, or a specific drug. The micrograph above shows structure, not the outcome of this experiment.",
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
    choose: "Шарт пен болжамды таңдаңыз.",
    arrival: "Әрекет потенциалы аксон ұшына жетті.",
    normal: "Ca²⁺ кіреді → везикулалар медиатор бөледі → осы модельде постсинапстық жауап пайда болады.",
    noCalcium: "Ca²⁺ кіруі бұғатталған → медиатордың шақырылған бөлінуі болмайды → шақырылған постсинапстық жауап жоқ.",
    correct: "Болжамыңыз модель нәтижесімен сәйкес келді.",
    revise: "Болжам мен нәтижені салыстырыңыз. Ca²⁺ кіруі импульстің келуін медиатордың бөлінуімен байланыстырады.",
    scope: "Бұл бір химиялық синапстың оқу моделі. Ол медиатордың өздігінен бөлінуін, жауаптың өзге тетіктерін немесе нақты препараттың әсерін көрсетпейді. Жоғарыдағы микрофото тәжірибе нәтижесін емес, құрылысты көрсетеді.",
  },
};

export default function SynapseLab({ language }: { language: Language }) {
  const c = copy[language];
  const [condition, setCondition] = useState<"open" | "blocked">("open");
  const [prediction, setPrediction] = useState<"response" | "absent" | null>(null);
  const [result, setResult] = useState<{ condition: "open" | "blocked"; prediction: "response" | "absent" } | null>(null);
  const outcome = result?.condition === "open" ? "response" : "absent";
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
          <button type="button" disabled={!prediction || !!result} onClick={() => { if (prediction) setResult({ condition, prediction }); }}>{c.run}</button>
          <button type="button" disabled={!result} onClick={() => { setPrediction(null); setResult(null); }}>{c.reset}</button>
        </div>
      </div>
      <div className={styles.result} role="status" aria-live="polite">
        {result ? <><p>{c.arrival}</p><p><strong>{result.condition === "open" ? c.normal : c.noCalcium}</strong></p>
          <p>{result.prediction === outcome ? c.correct : c.revise}</p></> : <p>{c.choose}</p>}
      </div>
    </div>
    <p className={styles.scope}>{c.scope}</p>
  </section>;
}
