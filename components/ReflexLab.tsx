"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Language } from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import styles from "./ReflexLab.module.css";

type Condition = "intact" | "receptor" | "afferent" | "spinal" | "efferent";
type Prediction = "moves" | "still";

const copy = {
  RU: {
    languages: "Язык лаборатории", anatomyTitle: "Динамическая анатомия рефлекторной дуги", enabled: "Включено", disabled: "Исключено",
    title: "Лаборатория: где прервётся рефлекс?", intro: "Смоделируйте отдёргивание руки от болезненно горячей поверхности. Выберите состояние одного пути, предскажите движение и запустите опыт.",
    condition: "Включение / исключение участка дуги", intact: "✓ Вся дуга включена", receptor: "✕ Выключить рецептор", afferent: "✕ Выключить афферентный путь", spinal: "✕ Выключить спинальный центр", efferent: "✕ Выключить эфферентный путь",
    predict: "Ваш прогноз до опыта", moves: "Рука отдёрнется", still: "Рефлекторного движения не будет", run: "Запустить опыт", replay: "Повторить", reset: "Новый прогноз",
    stages: ["Раздражитель действует на кожу", "Сенсорный сигнал идёт к спинному мозгу", "В спинном мозге формируется ответ", "Моторный сигнал идёт к мышцам", "Мышцы сокращаются: рука отдёргивается"],
    waiting: "Сначала выберите условие и прогноз.", running: "Опыт идёт", stopped: "Передача остановилась", finished: "Опыт завершён", blockedAt: { receptor: "Ноцицептор выключен: афферентный сигнал не возникает", afferent: "Сенсорный сигнал не дошёл до спинного мозга", spinal: "Спинальный центр выключен: моторная команда не сформирована", efferent: "Моторный сигнал не дошёл до мышц" },
    correct: "Прогноз подтвердился.", incorrect: "Прогноз не подтвердился.",
    outcome: { intact: "Все звенья дуги работают: сенсорный сигнал достигает спинного мозга, а моторный ответ — мышцы.", receptor: "При выключенном ноцицепторе сигнал не возникает, поэтому рефлекс не запускается.", afferent: "Сигнал возник у рецептора, но не дошёл до спинного мозга по выбранному пути. Рефлекторный ответ в этой модели не запускается.", spinal: "Афферентный сигнал достигает спинного мозга, но при выключенном спинальном центре моторный ответ не формируется.", efferent: "Сенсорный сигнал достиг спинного мозга, но команда не прошла по моторному пути к мышцам. Рефлекторного сокращения нет." },
    limit: "Учебная модель одного рефлекторного пути. Анимация из изображений, созданных ИИ, показывает внешнее движение; ход нервного сигнала отображён словами. Сознательное восприятие боли, другие пути и защитные реакции здесь не моделируются. Не проверяйте это на себе горячими предметами.",
    anatomy: ["Ноцицептор кожи","Чувствительный нейрон","Задний корешок","Вставочный нейрон","Мотонейрон переднего рога","Передний корешок","Мышца-сгибатель"], ascending: "Коллатераль к восходящим путям: осознание боли не требуется для запуска спинального ответа", photo: "Постановочные изображения, созданные ИИ для учебника", contactAlt: "Кисть у металлической чашки до отдёргивания", withdrawalAlt: "Та же кисть отведена от металлической чашки", record: "Записать результат", journal: "Журнал опытов", explanation: "Почему рефлекс возник или прервался?", source: "Физиология рефлекса: OpenStax, Anatomy and Physiology 2e, гл. 14",
  },
  EN: {
    languages: "Laboratory language", anatomyTitle: "Dynamic anatomy of the reflex arc", enabled: "Enabled", disabled: "Excluded",
    title: "Laboratory: where does the reflex stop?", intro: "Model hand withdrawal from a painfully hot surface. Choose the state of one pathway, predict movement, and run the experiment.",
    condition: "Include / exclude reflex-arc segment", intact: "✓ Entire arc enabled", receptor: "✕ Disable receptor", afferent: "✕ Disable afferent pathway", spinal: "✕ Disable spinal center", efferent: "✕ Disable efferent pathway",
    predict: "Your prediction before the run", moves: "The hand withdraws", still: "No reflex movement", run: "Run experiment", replay: "Replay", reset: "New prediction",
    stages: ["Stimulus activates receptors in the skin", "Sensory signal travels toward the spinal cord", "A response is formed in the spinal cord", "Motor signal travels toward the muscles", "Muscles contract: the hand withdraws"],
    waiting: "Choose a condition and make a prediction first.", running: "Experiment running", stopped: "Transmission stopped", finished: "Experiment complete", blockedAt: { receptor: "Nociceptor disabled: no afferent signal is generated", afferent: "Sensory input did not reach the spinal cord", spinal: "Spinal center disabled: no motor command is formed", efferent: "Motor output did not reach the muscles" },
    correct: "Your prediction was supported.", incorrect: "Your prediction was not supported.",
    outcome: { intact: "All reflex-arc links work: sensory input reaches the spinal cord and motor output reaches the muscle.", receptor: "With the nociceptor disabled, no afferent signal is generated and the reflex does not start.", afferent: "A signal arises at the receptor but cannot reach the spinal cord along the selected pathway. The modeled reflex response does not begin.", spinal: "Afferent input reaches the spinal cord, but with the spinal center disabled no motor response is formed.", efferent: "Sensory input reaches the spinal cord, but the command cannot pass along the motor pathway to the muscles. No reflex contraction occurs." },
    limit: "A teaching model of one reflex pathway. An animation made from AI-generated images shows external movement; the nerve signal is described in words. Conscious pain perception, alternative pathways and other protective responses are outside this model. Do not try this with hot objects.",
    anatomy: ["Skin nociceptor","Sensory neuron","Dorsal root","Interneuron","Ventral-horn motor neuron","Ventral root","Flexor muscle"], ascending: "Collateral to ascending pathways: conscious pain perception is not required to initiate the spinal response", photo: "Staged AI-generated photographs for this textbook", contactAlt: "Hand by a metal cup before withdrawal", withdrawalAlt: "The same hand moved away from the metal cup", record: "Record result", journal: "Experiment log", explanation: "Why did the reflex occur or stop?", source: "Reflex physiology: OpenStax, Anatomy and Physiology 2e, ch. 14",
  },
  KZ: {
    languages: "Зертхана тілі", anatomyTitle: "Рефлекс доғасының динамикалық анатомиясы", enabled: "Қосулы", disabled: "Алып тасталды",
    title: "Зертхана: рефлекс қай жерде үзіледі?", intro: "Қолды ауырсындыратын ыстық беттен тартып алу жағдайын модельдеңіз. Жолдың күйін таңдап, қозғалысты болжаңыз және тәжірибені бастаңыз.",
    condition: "Доға бөлігін қосу / алып тастау", intact: "✓ Бүкіл доға қосулы", receptor: "✕ Рецепторды өшіру", afferent: "✕ Афференттік жолды өшіру", spinal: "✕ Жұлын орталығын өшіру", efferent: "✕ Эфференттік жолды өшіру",
    predict: "Тәжірибеге дейінгі болжамыңыз", moves: "Қол тартылады", still: "Рефлекстік қозғалыс болмайды", run: "Тәжірибені бастау", replay: "Қайталау", reset: "Жаңа болжам",
    stages: ["Тітіркендіргіш тері рецепторларына әсер етеді", "Сенсорлық сигнал жұлынға бағытталады", "Жұлында жауап қалыптасады", "Моторлық сигнал бұлшықеттерге бағытталады", "Бұлшықеттер жиырылады: қол тартылады"],
    waiting: "Алдымен шарт пен болжамды таңдаңыз.", running: "Тәжірибе жүріп жатыр", stopped: "Сигналдың өтуі тоқтады", finished: "Тәжірибе аяқталды", blockedAt: { receptor: "Ноцицептор өшірілді: афференттік сигнал пайда болмайды", afferent: "Сенсорлық сигнал жұлынға жетпеді", spinal: "Жұлын орталығы өшірілді: моторлық команда қалыптаспайды", efferent: "Моторлық сигнал бұлшықеттерге жетпеді" },
    correct: "Болжамыңыз расталды.", incorrect: "Болжамыңыз расталмады.",
    outcome: { intact: "Рефлекс доғасының барлық буыны жұмыс істейді: сенсорлық сигнал жұлынға, моторлық жауап бұлшықетке жетеді.", receptor: "Ноцицептор өшірілсе, афференттік сигнал пайда болмайды және рефлекс басталмайды.", afferent: "Рецепторда сигнал пайда болады, бірақ таңдалған жолмен жұлынға жетпейді. Бұл модельде рефлекстік жауап басталмайды.", spinal: "Афференттік сигнал жұлынға жетеді, бірақ жұлын орталығы өшірілсе моторлық жауап қалыптаспайды.", efferent: "Сенсорлық сигнал жұлынға жетеді, бірақ бұйрық моторлық жолмен бұлшықеттерге өтпейді. Рефлекстік жиырылу болмайды." },
    limit: "Бұл — бір рефлекс жолының оқу моделі. ЖИ жасаған кескіндерден құралған анимация сыртқы қозғалысты көрсетеді; жүйке сигналы мәтінмен сипатталады. Ауырсынуды саналы сезіну, басқа жолдар мен қорғаныш реакциялары модельденбейді. Мұны ыстық заттармен өзіңізде сынамаңыз.",
    anatomy: ["Тері ноцицепторы","Сезімтал нейрон","Артқы түбір","Аралық нейрон","Алдыңғы мүйіз мотонейроны","Алдыңғы түбір","Бүккіш бұлшықет"], ascending: "Жоғарылаушы жолдарға коллатераль: жұлындық жауаптың басталуы үшін ауырсынуды саналы сезіну міндетті емес", photo: "Оқулық үшін ЖИ жасаған қойылымдық фотосуреттер", contactAlt: "Қол тартылғанға дейін металл тостағанның жанында", withdrawalAlt: "Сол қол металл тостағаннан алыстатылған", record: "Нәтижені жазу", journal: "Тәжірибелер журналы", explanation: "Рефлекс неге пайда болды немесе үзілді?", source: "Рефлекс физиологиясы: OpenStax, Anatomy and Physiology 2e, 14-тарау",
  },
} satisfies Record<Language, {
  languages: string; anatomyTitle: string; enabled: string; disabled: string; title: string; intro: string; condition: string; intact: string; afferent: string; efferent: string; predict: string; moves: string; still: string; run: string; replay: string; reset: string;
  stages: string[]; waiting: string; running: string; stopped: string; finished: string; blockedAt: Record<Exclude<Condition,"intact">, string>; correct: string; incorrect: string;
  outcome: Record<Condition, string>; limit: string; anatomy: string[]; ascending: string; photo: string; contactAlt: string; withdrawalAlt: string; record: string; journal: string; explanation: string; source: string;
}>;

const lastStage: Record<Condition, number> = { intact: 4, receptor: 0, afferent: 1, spinal: 2, efferent: 3 };

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
    <div className={styles.languageBar}><strong>{c.languages}</strong><div>{(["RU","KZ","EN"] as const).map(code => <Link key={code} className={language===code?styles.languageActive:styles.languageButton} href={`/modules/7/interactive?lang=${code}#reflex-lab`}>{code}</Link>)}</div></div>
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
          {(["intact", "receptor", "afferent", "spinal", "efferent"] as const).map(item => <label key={item}>
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
    <figure className={styles.anatomyPanel}>
      <h3>{c.anatomyTitle}</h3>
      <div className={styles.statusStrip}>{(["receptor","afferent","spinal","efferent"] as const).map(part => <span key={part} data-off={condition===part}>{condition===part ? "✕ " + c.disabled : "✓ " + c.enabled}</span>)}</div>
      <svg viewBox="0 0 1100 430" className={styles.arcSvg} role="img" aria-label={c.anatomy.join(" → ")}>
        <defs>
          <marker id="reflexArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="currentColor"/></marker>
          <filter id="pulseGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* skin and nociceptor */}
        <path d="M20 245 Q90 215 175 242 L175 330 L20 330 Z" fill="#d9a17e" stroke="currentColor" strokeWidth="2"/>
        <path d="M45 260 C75 235 100 295 130 255 M65 290 C85 260 115 315 150 278" fill="none" stroke="#8a4d38" strokeWidth="5"/>
        <path d="M118 270 C130 250 145 250 155 230" fill="none" stroke="#d69b00" strokeWidth="6"/>
        <text x="95" y="355" textAnchor="middle" fontSize="15">{c.anatomy[0]}</text>
        {/* afferent nerve and DRG */}
        <path d="M155 230 C245 170 315 160 390 185" fill="none" stroke="#2377b9" strokeWidth="13"/>
        <ellipse cx="330" cy="173" rx="35" ry="23" fill="#c89b62" stroke="currentColor" strokeWidth="2"/>
        <text x="275" y="125" textAnchor="middle" fontSize="15">{c.anatomy[1]}</text>
        <text x="370" y="145" textAnchor="middle" fontSize="14">{c.anatomy[2]}</text>
        {/* spinal cord anatomical cross-section */}
        <ellipse cx="560" cy="215" rx="155" ry="175" fill="#eadcc8" stroke="currentColor" strokeWidth="4"/>
        <path d="M510 95 C545 120 552 155 560 175 C568 155 575 120 610 95 C635 135 620 175 590 205 C625 240 635 285 605 320 C575 292 570 255 560 238 C550 255 545 292 515 320 C485 285 495 240 530 205 C500 175 485 135 510 95Z" fill="#9d948b" opacity=".85"/>
        <path d="M390 185 C445 185 475 190 515 205" fill="none" stroke="#2377b9" strokeWidth="11"/>
        <path d="M515 205 C535 215 545 225 558 240" fill="none" stroke="#35a853" strokeWidth="9"/>
        <path d="M558 240 C590 260 620 275 690 280" fill="none" stroke="#d95135" strokeWidth="11"/>
        <text x="480" y="62" fontSize="13">{c.anatomy[3]}</text>
        <text x="585" y="345" fontSize="13">{c.anatomy[4]}</text>
        {/* ventral root, peripheral motor nerve, flexor muscle */}
        <path d="M690 280 C775 285 825 300 890 315" fill="none" stroke="#d95135" strokeWidth="13"/>
        <text x="755" y="260" fontSize="13">{c.anatomy[5]}</text>
        <path d="M890 285 C965 260 1040 285 1070 320 C1035 365 950 375 885 338 C870 322 873 300 890 285Z" fill="#b94f45" stroke="currentColor" strokeWidth="2"/>
        <path d="M900 300 C950 285 1010 300 1050 325 M900 320 C955 305 1015 325 1045 345" fill="none" stroke="#f2b1a8" strokeWidth="5"/>
        <text x="975" y="395" textAnchor="middle" fontSize="15">{c.anatomy[6]}</text>
        {/* ascending collateral */}
        <path d="M535 180 C535 125 600 80 680 70" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 7" markerEnd="url(#reflexArrow)"/>
        <foreignObject x="680" y="18" width="390" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style={{fontSize:12,lineHeight:1.25,textAlign:"center",overflowWrap:"anywhere"}}>{c.ascending}</div></foreignObject>
        {/* moving impulse follows anatomical route; no schematic circles */}
        {stage>=0&&<circle r="9" fill={stage<3?"#36a7ff":"#ff6a35"} filter="url(#pulseGlow)">
          <animateMotion dur="1.7s" repeatCount={running?"indefinite":"1"} path={stage<2?"M155 230 C245 170 315 160 390 185 C445 185 475 190 515 205":stage<4?"M515 205 C535 215 545 225 558 240 C590 260 620 275 690 280":"M690 280 C775 285 825 300 890 315"}/>
        </circle>}
        {condition==="receptor"&&stage>=0&&<path d="M130 210 L165 250 M165 210 L130 250" stroke="#b00020" strokeWidth="9"/>}
        {condition==="afferent"&&stage>=1&&<path d="M380 160 L410 210 M410 160 L380 210" stroke="#b00020" strokeWidth="9"/>}
        {condition==="spinal"&&stage>=2&&<path d="M535 215 L580 265 M580 215 L535 265" stroke="#b00020" strokeWidth="9"/>}
        {condition==="efferent"&&stage>=3&&<path d="M675 255 L705 305 M705 255 L675 305" stroke="#b00020" strokeWidth="9"/>}
      </svg>
      <figcaption>{stage < 0 ? c.waiting : c.stages[Math.max(0,stage)]}</figcaption>
    </figure>
    {complete && <div className={styles.feedback}>
      <h3>{prediction === (condition === "intact" ? "moves" : "still") ? c.correct : c.incorrect}</h3>
      <p>{c.outcome[condition]}</p>
      <ol>{c.stages.map((label, i) => <li key={label} className={condition !== "intact" && i >= stage ? styles.blocked : undefined}>{label}{condition !== "intact" && i === stage ? " ×" : i > stage ? " —" : " ✓"}</li>)}</ol>
    </div>}
    {complete && prediction && <button type="button" onClick={() => setRows(xs => [...xs, {id: Date.now(), condition, prediction, actual: condition === "intact" ? "moves" : "still", note: ""}])}>{c.record}</button>}
    {rows.length > 0 && <div style={{overflowX:"auto"}}><h3>{c.journal}</h3><table><tbody>{rows.map((r,i)=><tr key={r.id}><td>{i+1}</td><td>{c[r.condition]}</td><td>{c[r.prediction]}</td><td>{c[r.actual]}</td><td><input aria-label={c.explanation} value={r.note} onChange={e=>setRows(xs=>xs.map(x=>x.id===r.id?{...x,note:e.target.value}:x))}/></td></tr>)}</tbody></table></div>}
    <p className={styles.limit}>{c.limit}</p>
    <p><a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/14-introduction" target="_blank" rel="noopener noreferrer">{c.source}</a></p>
  <ExperimentReflection language={language} theoryHref={`/modules/7/theory?lang=${language}`} /></section>;
}
