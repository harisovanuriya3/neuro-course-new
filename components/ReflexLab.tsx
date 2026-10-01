"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Language } from "../content/course";
import styles from "./ReflexLab.module.css";

type Condition = "intact" | "afferent" | "efferent";
type Prediction = "moves" | "still";

const copy = {
  RU: {
    title: "Лаборатория: где прервётся рефлекс?", intro: "Смоделируйте отдёргивание руки от болезненно горячей поверхности. Выберите состояние одного пути, предскажите движение и запустите опыт.",
    condition: "Состояние рефлекторной дуги", intact: "Пути сохранены", afferent: "Прерван афферентный путь", efferent: "Прерван эфферентный путь",
    predict: "Ваш прогноз до опыта", moves: "Рука отдёрнется", still: "Рефлекторного движения не будет", run: "Запустить опыт", replay: "Повторить", reset: "Новый прогноз",
    stages: ["Раздражитель действует на кожу", "Сенсорный сигнал идёт к спинному мозгу", "В спинном мозге формируется ответ", "Моторный сигнал идёт к мышцам", "Мышцы сокращаются: рука отдёргивается"],
    waiting: "Сначала выберите условие и прогноз.", running: "Опыт идёт", stopped: "Передача остановилась", finished: "Опыт завершён", blockedAt: { afferent: "Сенсорный сигнал не дошёл до спинного мозга", efferent: "Моторный сигнал не дошёл до мышц" },
    correct: "Прогноз подтвердился.", incorrect: "Прогноз не подтвердился.",
    outcome: { intact: "Оба пути работают: сенсорный сигнал достигает спинного мозга, а моторный ответ — мышц.", afferent: "Сигнал возник у рецептора, но не дошёл до спинного мозга по выбранному пути. Рефлекторный ответ в этой модели не запускается.", efferent: "Сенсорный сигнал достиг спинного мозга, но команда не прошла по моторному пути к мышцам. Рефлекторного сокращения нет." },
    limit: "Учебная модель одного рефлекторного пути. Анимация из изображений, созданных ИИ, показывает внешнее движение; ход нервного сигнала отображён словами. Сознательное восприятие боли, другие пути и защитные реакции здесь не моделируются. Не проверяйте это на себе горячими предметами.",
    photo: "Постановочные изображения, созданные ИИ для учебника", contactAlt: "Кисть у металлической чашки до отдёргивания", withdrawalAlt: "Та же кисть отведена от металлической чашки", record: "Записать результат", journal: "Журнал опытов", explanation: "Почему рефлекс возник или прервался?", source: "Физиология рефлекса: OpenStax, Anatomy and Physiology 2e, гл. 14",
  },
  EN: {
    title: "Laboratory: where does the reflex stop?", intro: "Model hand withdrawal from a painfully hot surface. Choose the state of one pathway, predict movement, and run the experiment.",
    condition: "Reflex pathway condition", intact: "Pathways intact", afferent: "Afferent pathway interrupted", efferent: "Efferent pathway interrupted",
    predict: "Your prediction before the run", moves: "The hand withdraws", still: "No reflex movement", run: "Run experiment", replay: "Replay", reset: "New prediction",
    stages: ["Stimulus activates receptors in the skin", "Sensory signal travels toward the spinal cord", "A response is formed in the spinal cord", "Motor signal travels toward the muscles", "Muscles contract: the hand withdraws"],
    waiting: "Choose a condition and make a prediction first.", running: "Experiment running", stopped: "Transmission stopped", finished: "Experiment complete", blockedAt: { afferent: "Sensory input did not reach the spinal cord", efferent: "Motor output did not reach the muscles" },
    correct: "Your prediction was supported.", incorrect: "Your prediction was not supported.",
    outcome: { intact: "Both pathways work: the sensory signal reaches the spinal cord and the motor output reaches the muscles.", afferent: "A signal arises at the receptor but cannot reach the spinal cord along the selected pathway. The modeled reflex response does not begin.", efferent: "Sensory input reaches the spinal cord, but the command cannot pass along the motor pathway to the muscles. No reflex contraction occurs." },
    limit: "A teaching model of one reflex pathway. An animation made from AI-generated images shows external movement; the nerve signal is described in words. Conscious pain perception, alternative pathways and other protective responses are outside this model. Do not try this with hot objects.",
    photo: "Staged AI-generated photographs for this textbook", contactAlt: "Hand by a metal cup before withdrawal", withdrawalAlt: "The same hand moved away from the metal cup", record: "Record result", journal: "Experiment log", explanation: "Why did the reflex occur or stop?", source: "Reflex physiology: OpenStax, Anatomy and Physiology 2e, ch. 14",
  },
  KZ: {
    title: "Зертхана: рефлекс қай жерде үзіледі?", intro: "Қолды ауырсындыратын ыстық беттен тартып алу жағдайын модельдеңіз. Жолдың күйін таңдап, қозғалысты болжаңыз және тәжірибені бастаңыз.",
    condition: "Рефлекс доғасының күйі", intact: "Жолдар сақталған", afferent: "Афференттік жол үзілген", efferent: "Эфференттік жол үзілген",
    predict: "Тәжірибеге дейінгі болжамыңыз", moves: "Қол тартылады", still: "Рефлекстік қозғалыс болмайды", run: "Тәжірибені бастау", replay: "Қайталау", reset: "Жаңа болжам",
    stages: ["Тітіркендіргіш тері рецепторларына әсер етеді", "Сенсорлық сигнал жұлынға бағытталады", "Жұлында жауап қалыптасады", "Моторлық сигнал бұлшықеттерге бағытталады", "Бұлшықеттер жиырылады: қол тартылады"],
    waiting: "Алдымен шарт пен болжамды таңдаңыз.", running: "Тәжірибе жүріп жатыр", stopped: "Сигналдың өтуі тоқтады", finished: "Тәжірибе аяқталды", blockedAt: { afferent: "Сенсорлық сигнал жұлынға жетпеді", efferent: "Моторлық сигнал бұлшықеттерге жетпеді" },
    correct: "Болжамыңыз расталды.", incorrect: "Болжамыңыз расталмады.",
    outcome: { intact: "Екі жол да жұмыс істейді: сенсорлық сигнал жұлынға, ал моторлық жауап бұлшықеттерге жетеді.", afferent: "Рецепторда сигнал пайда болады, бірақ таңдалған жолмен жұлынға жетпейді. Бұл модельде рефлекстік жауап басталмайды.", efferent: "Сенсорлық сигнал жұлынға жетеді, бірақ бұйрық моторлық жолмен бұлшықеттерге өтпейді. Рефлекстік жиырылу болмайды." },
    limit: "Бұл — бір рефлекс жолының оқу моделі. ЖИ жасаған кескіндерден құралған анимация сыртқы қозғалысты көрсетеді; жүйке сигналы мәтінмен сипатталады. Ауырсынуды саналы сезіну, басқа жолдар мен қорғаныш реакциялары модельденбейді. Мұны ыстық заттармен өзіңізде сынамаңыз.",
    photo: "Оқулық үшін ЖИ жасаған қойылымдық фотосуреттер", contactAlt: "Қол тартылғанға дейін металл тостағанның жанында", withdrawalAlt: "Сол қол металл тостағаннан алыстатылған", record: "Нәтижені жазу", journal: "Тәжірибелер журналы", explanation: "Рефлекс неге пайда болды немесе үзілді?", source: "Рефлекс физиологиясы: OpenStax, Anatomy and Physiology 2e, 14-тарау",
  },
} satisfies Record<Language, {
  title: string; intro: string; condition: string; intact: string; afferent: string; efferent: string; predict: string; moves: string; still: string; run: string; replay: string; reset: string;
  stages: string[]; waiting: string; running: string; stopped: string; finished: string; blockedAt: Record<"afferent" | "efferent", string>; correct: string; incorrect: string;
  outcome: Record<Condition, string>; limit: string; photo: string; contactAlt: string; withdrawalAlt: string; record: string; journal: string; explanation: string; source: string;
}>;

const lastStage: Record<Condition, number> = { intact: 4, afferent: 1, efferent: 3 };

export default function ReflexLab({ language }: { language: Language }) {
  const c = copy[language];
  const [condition, setCondition] = useState<Condition>("intact");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState<{id:number;condition:Condition;prediction:Prediction;actual:Prediction;note:string}[]>([]);
  const complete = stage === lastStage[condition] && !running;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage(current => {
        if (current >= lastStage[condition]) { setRunning(false); return current; }
        return current + 1;
      });
    }, 850);
    return () => window.clearInterval(timer);
  }, [condition, running]);

  function changeCondition(next: Condition) { setCondition(next); setPrediction(null); setStage(-1); setRunning(false); }
  function start() { if (!prediction) return; setStage(0); setRunning(true); }
  function reset() { setPrediction(null); setStage(-1); setRunning(false); }

  return <section id="reflex-lab" className={styles.lab} aria-labelledby="reflex-lab-title" lang={language === "KZ" ? "kk" : language.toLowerCase()}>
    <h2 id="reflex-lab-title">{c.title}</h2><p>{c.intro}</p>
    <div className={styles.workspace}>
      <figure className={styles.photo}>
        <div className={styles.scene} role="img" aria-label={stage >= 4 && condition === "intact" ? c.withdrawalAlt : c.contactAlt}
          data-withdrawn={stage >= 4 && condition === "intact"}>
          <Image src="/images/lab/reflex-background.webp" alt="" aria-hidden="true" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 520px" />
          <Image className={styles.hand} src="/images/lab/reflex-hand.webp" alt="" aria-hidden="true" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 520px" />
        </div>
        <figcaption>{c.photo}</figcaption>
      </figure>
      <div className={styles.controls}>
        <fieldset disabled={running || stage >= 0} className={styles.choices}>
          <legend>{c.condition}</legend>
          {(["intact", "afferent", "efferent"] as const).map(item => <label key={item}>
            <input type="radio" name="reflex-condition" checked={condition === item} onChange={() => changeCondition(item)} />{c[item]}
          </label>)}
        </fieldset>
        <fieldset disabled={running || stage >= 0} className={styles.choices}>
          <legend>{c.predict}</legend>
          {(["moves", "still"] as const).map(item => <label key={item}>
            <input type="radio" name="reflex-prediction" checked={prediction === item} onChange={() => setPrediction(item)} />{c[item]}
          </label>)}
        </fieldset>
        <div className={styles.actions}>
          <button type="button" onClick={start} disabled={!prediction || running}>{stage < 0 ? c.run : c.replay}</button>
          <button type="button" onClick={reset} disabled={running || stage < 0}>{c.reset}</button>
        </div>
        <div className={styles.results} aria-live="polite" aria-atomic="true">
          <strong>{stage < 0 ? c.waiting : running ? c.running : condition === "intact" ? c.finished : c.stopped}</strong>
          {stage >= 0 && <p>{complete && condition !== "intact" ? c.blockedAt[condition] : c.stages[stage]}.</p>}
        </div>
      </div>
    </div>
    {complete && <div className={styles.feedback}>
      <h3>{prediction === (condition === "intact" ? "moves" : "still") ? c.correct : c.incorrect}</h3>
      <p>{c.outcome[condition]}</p>
      <ol>{c.stages.map((label, i) => <li key={label} className={condition !== "intact" && i >= stage ? styles.blocked : undefined}>{label}{condition !== "intact" && i === stage ? " ×" : i > stage ? " —" : " ✓"}</li>)}</ol>
    </div>}
    {complete && prediction && <button type="button" onClick={() => setRows(xs => [...xs, {id: Date.now(), condition, prediction, actual: condition === "intact" ? "moves" : "still", note: ""}])}>{c.record}</button>}
    {rows.length > 0 && <div style={{overflowX:"auto"}}><h3>{c.journal}</h3><table><tbody>{rows.map((r,i)=><tr key={r.id}><td>{i+1}</td><td>{c[r.condition]}</td><td>{c[r.prediction]}</td><td>{c[r.actual]}</td><td><input aria-label={c.explanation} value={r.note} onChange={e=>setRows(xs=>xs.map(x=>x.id===r.id?{...x,note:e.target.value}:x))}/></td></tr>)}</tbody></table></div>}
    <p className={styles.limit}>{c.limit}</p>
    <p><a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/14-introduction" target="_blank" rel="noopener noreferrer">{c.source}</a></p>
  </section>;
}
