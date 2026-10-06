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
    languages: "Язык лаборатории", slow: "Замедленно", normal: "Обычная скорость", anatomyTitle: "Динамическая анатомия рефлекторной дуги", enabled: "Включено", disabled: "Исключено",
    title: "Лаборатория: где прервётся рефлекс?", intro: "Смоделируйте отдёргивание руки от болезненно горячей поверхности. Выберите состояние одного пути, предскажите движение и запустите опыт.",
    condition: "Включение / исключение участка дуги", intact: "✓ Вся дуга включена", receptor: "✕ Выключить рецептор", afferent: "✕ Выключить афферентный путь", spinal: "✕ Выключить спинальный центр", efferent: "✕ Выключить эфферентный путь",
    predict: "Ваш прогноз до опыта", moves: "Рука отдёрнется", still: "Рефлекторного движения не будет", run: "Запустить опыт", replay: "Повторить", reset: "Новый прогноз",
    stages: ["Раздражитель действует на кожу", "Сенсорный сигнал идёт к спинному мозгу", "В спинном мозге формируется ответ", "Моторный сигнал идёт к мышцам", "Мышцы сокращаются: рука отдёргивается"],
    waiting: "Сначала выберите условие и прогноз.", running: "Опыт идёт", stopped: "Передача остановилась", finished: "Опыт завершён", blockedAt: { receptor: "Ноцицептор выключен: афферентный сигнал не возникает", afferent: "Сенсорный сигнал не дошёл до спинного мозга", spinal: "Спинальный центр выключен: моторная команда не сформирована", efferent: "Моторный сигнал не дошёл до мышц" },
    correct: "Прогноз подтвердился.", incorrect: "Прогноз не подтвердился.",
    outcome: { intact: "Все звенья дуги работают: сенсорный сигнал достигает спинного мозга, а моторный ответ — мышцы.", receptor: "При выключенном ноцицепторе сигнал не возникает, поэтому рефлекс не запускается.", afferent: "Сигнал возник у рецептора, но не дошёл до спинного мозга по выбранному пути. Рефлекторный ответ в этой модели не запускается.", spinal: "Афферентный сигнал достигает спинного мозга, но при выключенном спинальном центре моторный ответ не формируется.", efferent: "Сенсорный сигнал достиг спинного мозга, но команда не прошла по моторному пути к мышцам. Рефлекторного сокращения нет." },
    limit: "Учебная модель одного рефлекторного пути. Анимация показывает движение руки и распространение нервного сигнала по анатомической схеме. Сознательное восприятие боли, другие пути и защитные реакции здесь не моделируются. Не проверяйте это на себе горячими предметами.",
    anatomy: ["Ноцицептор кожи","Чувствительный нейрон","Задний корешок","Вставочный нейрон","Мотонейрон переднего рога","Передний корешок","Мышца-сгибатель"], ascending: "Коллатераль к восходящим путям: осознание боли не требуется для запуска спинального ответа", photo: "Постановочные изображения, созданные ИИ для учебника", contactAlt: "Кисть у металлической чашки до отдёргивания", withdrawalAlt: "Та же кисть отведена от металлической чашки", record: "Записать результат", journal: "Журнал опытов", explanation: "Почему рефлекс возник или прервался?", source: "Физиология рефлекса: OpenStax, Anatomy and Physiology 2e, гл. 14",
  },
  EN: {
    languages: "Laboratory language", slow: "Slow motion", normal: "Normal speed", anatomyTitle: "Dynamic anatomy of the reflex arc", enabled: "Enabled", disabled: "Excluded",
    title: "Laboratory: where does the reflex stop?", intro: "Model hand withdrawal from a painfully hot surface. Choose the state of one pathway, predict movement, and run the experiment.",
    condition: "Include / exclude reflex-arc segment", intact: "✓ Entire arc enabled", receptor: "✕ Disable receptor", afferent: "✕ Disable afferent pathway", spinal: "✕ Disable spinal center", efferent: "✕ Disable efferent pathway",
    predict: "Your prediction before the run", moves: "The hand withdraws", still: "No reflex movement", run: "Run experiment", replay: "Replay", reset: "New prediction",
    stages: ["Stimulus activates receptors in the skin", "Sensory signal travels toward the spinal cord", "A response is formed in the spinal cord", "Motor signal travels toward the muscles", "Muscles contract: the hand withdraws"],
    waiting: "Choose a condition and make a prediction first.", running: "Experiment running", stopped: "Transmission stopped", finished: "Experiment complete", blockedAt: { receptor: "Nociceptor disabled: no afferent signal is generated", afferent: "Sensory input did not reach the spinal cord", spinal: "Spinal center disabled: no motor command is formed", efferent: "Motor output did not reach the muscles" },
    correct: "Your prediction was supported.", incorrect: "Your prediction was not supported.",
    outcome: { intact: "All reflex-arc links work: sensory input reaches the spinal cord and motor output reaches the muscle.", receptor: "With the nociceptor disabled, no afferent signal is generated and the reflex does not start.", afferent: "A signal arises at the receptor but cannot reach the spinal cord along the selected pathway. The modeled reflex response does not begin.", spinal: "Afferent input reaches the spinal cord, but with the spinal center disabled no motor response is formed.", efferent: "Sensory input reaches the spinal cord, but the command cannot pass along the motor pathway to the muscles. No reflex contraction occurs." },
    limit: "A teaching model of one reflex pathway. The animation shows hand withdrawal and nerve-signal propagation along the anatomical diagram. Conscious pain perception, alternative pathways and other protective responses are outside this model. Do not try this with hot objects.",
    anatomy: ["Skin nociceptor","Sensory neuron","Dorsal root","Interneuron","Ventral-horn motor neuron","Ventral root","Flexor muscle"], ascending: "Collateral to ascending pathways: conscious pain perception is not required to initiate the spinal response", photo: "Staged AI-generated photographs for this textbook", contactAlt: "Hand by a metal cup before withdrawal", withdrawalAlt: "The same hand moved away from the metal cup", record: "Record result", journal: "Experiment log", explanation: "Why did the reflex occur or stop?", source: "Reflex physiology: OpenStax, Anatomy and Physiology 2e, ch. 14",
  },
  KZ: {
    languages: "Зертхана тілі", slow: "Баяу", normal: "Қалыпты жылдамдық", anatomyTitle: "Рефлекс доғасының динамикалық анатомиясы", enabled: "Қосулы", disabled: "Алып тасталды",
    title: "Зертхана: рефлекс қай жерде үзіледі?", intro: "Қолды ауырсындыратын ыстық беттен тартып алу жағдайын модельдеңіз. Жолдың күйін таңдап, қозғалысты болжаңыз және тәжірибені бастаңыз.",
    condition: "Доға бөлігін қосу / алып тастау", intact: "✓ Бүкіл доға қосулы", receptor: "✕ Рецепторды өшіру", afferent: "✕ Афференттік жолды өшіру", spinal: "✕ Жұлын орталығын өшіру", efferent: "✕ Эфференттік жолды өшіру",
    predict: "Тәжірибеге дейінгі болжамыңыз", moves: "Қол тартылады", still: "Рефлекстік қозғалыс болмайды", run: "Тәжірибені бастау", replay: "Қайталау", reset: "Жаңа болжам",
    stages: ["Тітіркендіргіш тері рецепторларына әсер етеді", "Сенсорлық сигнал жұлынға бағытталады", "Жұлында жауап қалыптасады", "Моторлық сигнал бұлшықеттерге бағытталады", "Бұлшықеттер жиырылады: қол тартылады"],
    waiting: "Алдымен шарт пен болжамды таңдаңыз.", running: "Тәжірибе жүріп жатыр", stopped: "Сигналдың өтуі тоқтады", finished: "Тәжірибе аяқталды", blockedAt: { receptor: "Ноцицептор өшірілді: афференттік сигнал пайда болмайды", afferent: "Сенсорлық сигнал жұлынға жетпеді", spinal: "Жұлын орталығы өшірілді: моторлық команда қалыптаспайды", efferent: "Моторлық сигнал бұлшықеттерге жетпеді" },
    correct: "Болжамыңыз расталды.", incorrect: "Болжамыңыз расталмады.",
    outcome: { intact: "Рефлекс доғасының барлық буыны жұмыс істейді: сенсорлық сигнал жұлынға, моторлық жауап бұлшықетке жетеді.", receptor: "Ноцицептор өшірілсе, афференттік сигнал пайда болмайды және рефлекс басталмайды.", afferent: "Рецепторда сигнал пайда болады, бірақ таңдалған жолмен жұлынға жетпейді. Бұл модельде рефлекстік жауап басталмайды.", spinal: "Афференттік сигнал жұлынға жетеді, бірақ жұлын орталығы өшірілсе моторлық жауап қалыптаспайды.", efferent: "Сенсорлық сигнал жұлынға жетеді, бірақ бұйрық моторлық жолмен бұлшықеттерге өтпейді. Рефлекстік жиырылу болмайды." },
    limit: "Бұл — бір рефлекс жолының оқу моделі. Анимация қолдың қозғалысын және анатомиялық сызба бойымен жүйке сигналының таралуын көрсетеді. Ауырсынуды саналы сезіну, басқа жолдар мен қорғаныш реакциялары модельденбейді. Мұны ыстық заттармен өзіңізде сынамаңыз.",
    anatomy: ["Тері ноцицепторы","Сезімтал нейрон","Артқы түбір","Аралық нейрон","Алдыңғы мүйіз мотонейроны","Алдыңғы түбір","Бүккіш бұлшықет"], ascending: "Жоғарылаушы жолдарға коллатераль: жұлындық жауаптың басталуы үшін ауырсынуды саналы сезіну міндетті емес", photo: "Оқулық үшін ЖИ жасаған қойылымдық фотосуреттер", contactAlt: "Қол тартылғанға дейін металл тостағанның жанында", withdrawalAlt: "Сол қол металл тостағаннан алыстатылған", record: "Нәтижені жазу", journal: "Тәжірибелер журналы", explanation: "Рефлекс неге пайда болды немесе үзілді?", source: "Рефлекс физиологиясы: OpenStax, Anatomy and Physiology 2e, 14-тарау",
  },
} satisfies Record<Language, {
  languages: string; slow: string; normal: string; anatomyTitle: string; enabled: string; disabled: string; title: string; intro: string; condition: string; intact: string; receptor: string; afferent: string; spinal: string; efferent: string; predict: string; moves: string; still: string; run: string; replay: string; reset: string;
  stages: string[]; waiting: string; running: string; stopped: string; finished: string; blockedAt: Record<Exclude<Condition,"intact">, string>; correct: string; incorrect: string;
  outcome: Record<Condition, string>; limit: string; anatomy: string[]; ascending: string; photo: string; contactAlt: string; withdrawalAlt: string; record: string; journal: string; explanation: string; source: string;
}>;

const lastStage: Record<Condition, number> = { intact: 4, receptor: 0, afferent: 1, spinal: 2, efferent: 3 };

export default function ReflexLab({ language }: { language: Language }) {
  const c = copy[language];
  const [condition, setCondition] = useState<Condition>("intact");
  const [excluded, setExcluded] = useState<Set<Exclude<Condition,"intact">>>(new Set());
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [slow, setSlow] = useState(false);
  const [rows, setRows] = useState<{id:number;condition:Condition;prediction:Prediction;actual:Prediction;note:string}[]>([]);
  const complete = stage === lastStage[condition] && !running;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage(current => {
        if (current >= lastStage[condition]) { setRunning(false); return current; }
        return current + 1;
      });
    }, slow ? 1500 : 850);
    return () => window.clearInterval(timer);
  }, [condition, running, slow]);

  function changeCondition(next: Condition) { setCondition(next); setExcluded(next === "intact" ? new Set() : new Set([next])); setPrediction(null); setStage(-1); setRunning(false); }
  function togglePart(part: Exclude<Condition,"intact">) { if (running || stage >= 0) return; const next = new Set(excluded); if (next.has(part)) next.delete(part); else next.add(part); setExcluded(next); const first = (["receptor","afferent","spinal","efferent"] as const).find(x=>next.has(x)); setCondition(first ?? "intact"); setPrediction(null); }
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
          <button type="button" onClick={()=>setSlow(v=>!v)} aria-pressed={slow}>{slow ? c.normal : c.slow}</button>
        </div>
        <div className={styles.results} aria-live="polite" aria-atomic="true">
          <strong>{stage < 0 ? c.waiting : running ? c.running : condition === "intact" ? c.finished : c.stopped}</strong>
          {stage >= 0 && <p>{complete && condition !== "intact" ? c.blockedAt[condition] : c.stages[stage]}.</p>}
        </div>
      </div>
    </div>
    <figure className={styles.anatomyPanel} data-running={running} data-stage={stage}>
      <h3>{c.anatomyTitle}</h3>
      <div className={styles.statusStrip}>{(["receptor","afferent","spinal","efferent"] as const).map((part,i) => <button type="button" key={part} disabled={running || stage>=0} aria-pressed={excluded.has(part)} onClick={()=>togglePart(part)} data-off={excluded.has(part)}><strong>{c.anatomy[[0,1,3,5][i]]}</strong><small>{excluded.has(part) ? "✕ " + c.disabled : "✓ " + c.enabled}</small></button>)}</div>
      <div className={styles.realAnatomyScene} data-stage={stage} data-condition={condition}>
        <div className={styles.bodySilhouette} aria-hidden="true"><span className={styles.armShape}/><span className={styles.handShape}/></div>
        <div className={styles.skinPhoto} aria-hidden="true"><span className={styles.receptorGlow}/></div>
        <div className={styles.drgPhoto} aria-hidden="true"/>
        <div className={styles.cordPhoto} aria-hidden="true"><span className={styles.grayMatter}/></div>
        <div className={styles.musclePhoto} aria-hidden="true"/>
        <svg viewBox="0 0 1000 650" className={styles.realOverlay} role="img" aria-label={c.anatomyTitle}>
          <defs><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <path className={styles.afferentBase} d="M155 360 C245 300 315 265 430 295 C470 300 490 315 505 335"/>
          <path className={styles.interneuronBase} d="M505 335 C535 300 565 305 590 345"/><path className={styles.inhibitoryBase} d="M525 350 C555 385 585 405 620 410"/>
          <path className={styles.efferentBase} d="M590 345 C680 385 745 405 865 435"/>
          {stage>=0&&!excluded.has("receptor")&&!excluded.has("afferent")&&<path className={styles.afferentPulse} d="M155 360 C245 300 315 265 430 295 C470 300 490 315 505 335"/>}
          {stage>=2&&!excluded.has("receptor")&&!excluded.has("afferent")&&!excluded.has("spinal")&&<path className={styles.interneuronPulse} d="M505 335 C535 300 565 305 590 345"/>}
          {stage>=3&&!excluded.has("receptor")&&!excluded.has("afferent")&&!excluded.has("spinal")&&!excluded.has("efferent")&&<path className={styles.efferentPulse} d="M590 345 C680 385 745 405 865 435"/>}
          <path className={styles.ascBase} d="M535 310 C560 245 575 190 585 100"/>
          <text x="82" y="410">{c.anatomy[0]}</text><text x="250" y="270">{c.anatomy[1]}</text>
          <text x="390" y="245">{c.anatomy[2]}</text><text x="505" y="395">{c.anatomy[3]}</text>
          <text x="610" y="390">{c.anatomy[4]}</text><text x="790" y="490">{c.anatomy[5]}</text>
          {excluded.has("receptor")&&<g className={styles.lesion}><path d="M135 335l35 35M170 335l-35 35"/></g>}
          {excluded.has("afferent")&&<g className={styles.lesion}><path d="M315 275l35 35M350 275l-35 35"/></g>}
          {excluded.has("spinal")&&<g className={styles.lesion}><path d="M510 315l35 35M545 315l-35 35"/></g>}
          {excluded.has("efferent")&&<g className={styles.lesion}><path d="M700 385l35 35M735 385l-35 35"/></g>}
        </svg>
        <div className={styles.withdrawHand} data-active={stage>=4&&condition==="intact"} aria-hidden="true"/>
      </div>
      <div className={styles.stageRail} aria-hidden="true">{c.stages.map((label,i)=><span key={label} data-active={stage===i} data-done={stage>i}>{i+1}</span>)}</div>
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
