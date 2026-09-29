"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Language } from "../content/course";
import { emptyPatientProgress, readPatientProgress, savePatientProgress, type PatientProgress } from "../lib/virtualPatientProgress";
import styles from "./VirtualPatient.module.css";
import VoiceTextarea from "./VoiceTextarea";

const diagnosisCopy = {
  RU: { label: "Ваш предварительный диагноз и обоснование", compare: "Сравнить с вариантами", note: "Сначала сформулируйте свой ответ. Свободный текст не оценивается автоматически; затем сравните его с вариантами и разбором." },
  EN: { label: "Your provisional diagnosis and reasoning", compare: "Compare with options", note: "Formulate your answer first. Free text is not graded automatically; then compare it with the options and explanation." },
  KZ: { label: "Сіздің алдын ала диагнозыңыз және негіздемеңіз", compare: "Нұсқалармен салыстыру", note: "Алдымен өз жауабыңызды тұжырымдаңыз. Еркін мәтін автоматты бағаланбайды; кейін оны нұсқалармен және талдаумен салыстырыңыз." },
} as const;

const text = {
  RU: {
    title: "Виртуальный пациент: онемение кисти",
    intro: "Синтетический учебный случай. Сначала задайте пациенту вопросы, затем выберите обследование и сформулируйте предварительный диагноз. Ответы можно исправлять.",
    image: "Постановочная учебная иллюстрация, созданная ИИ; это не фотография реального пациента.",
    situation: "Пациент сообщает: «У меня периодически немеет кисть». Других сведений пока нет.",
    questions: ["Какие именно пальцы немеют?", "Когда чаще возникает онемение?", "Беспокоит ли боль в шее?", "Стало ли труднее удерживать предметы?"],
    replies: ["Чаще большой, указательный и средний. Мизинец обычно не немеет.", "Обычно ночью; иногда просыпаюсь от онемения.", "Нет, боли в шее не замечал.", "Иногда мелкие предметы стало труднее удерживать."],
    tasks: ["Задайте вопросы пациенту", "Какое обследование поможет проверить предположение?", "Какой предварительный диагноз лучше объясняет данные?"],
    options: [[], ["Оценить чувствительность каждого пальца и силу мышц основания большого пальца", "Проверить только зрачковые реакции", "Отказаться от исследования чувствительности"], ["Невропатия срединного нерва в запястном канале (синдром запястного канала)", "Изолированная невропатия локтевого нерва", "Диагноз уже достоверно подтверждён одним описанием жалоб"]],
    feedback: ["Распределение онемения по пальцам и ночное появление симптомов помогают выбрать направление обследования. Это сведения из учебного сценария, а не готовый диагноз.", "Осмотр и проверка чувствительности каждого пальца помогают сопоставить жалобы с зоной срединного нерва. В этом сценарии чувствительность большого, указательного и среднего пальцев снижена, мизинца сохранена. Одна находка не заменяет полноценную оценку.", "Лучшее предварительное предположение — синдром запястного канала: характерное распределение и ночные симптомы согласуются со сдавлением срединного нерва. Подтверждение требует клинической оценки; по одному сценарию нельзя установить степень поражения или назначить лечение."],
    stage: "Этап", ask: "Нажмите на вопрос, чтобы услышать ответ", asked: "Ответ пациента", hint: "Чтобы перейти дальше, выясните, какие пальцы немеют и когда появляются симптомы.", choice: "Выберите решение", correct: "Обоснованный выбор", revise: "Пересмотрите решение", next: "Следующий этап", previous: "Предыдущий этап", result: "Посмотреть результат", explanation: "Разбор", finished: "Сценарий завершён", independent: "Верно с первой попытки", saved: "Результат сохраняется в этом браузере.", progress: "Мой прогресс", reset: "Начать заново", sources: "Учебные источники",
  },
  EN: {
    title: "Virtual patient: hand numbness",
    intro: "A synthetic teaching case. Ask the patient questions, choose an examination, and make a provisional diagnosis. You can revise your choices.",
    image: "Staged AI-generated teaching illustration; this is not a photograph of a real patient.",
    situation: "The patient says: “My hand sometimes goes numb.” No other details are available yet.",
    questions: ["Which fingers go numb?", "When does the numbness occur most often?", "Do you have neck pain?", "Has it become harder to hold objects?"],
    replies: ["Mostly the thumb, index and middle finger. Usually not the little finger.", "Usually at night; sometimes it wakes me up.", "No, I have not noticed neck pain.", "Sometimes small objects have become harder to hold."],
    tasks: ["Ask the patient questions", "Which examination would help assess your hypothesis?", "Which provisional diagnosis best explains the findings?"],
    options: [[], ["Check sensation in each finger and strength at the base of the thumb", "Check only pupillary reactions", "Do not examine sensation"], ["Median neuropathy at the wrist (carpal tunnel syndrome)", "Isolated ulnar neuropathy", "The diagnosis is already proven by the symptom description alone"]],
    feedback: ["The affected fingers and nocturnal pattern guide the examination. These are details of a teaching scenario, not a diagnosis by themselves.", "Examination of individual fingers helps match symptoms to the median nerve territory. In this scenario, sensation is reduced in the thumb, index and middle fingers but preserved in the little finger. One finding does not replace a full clinical evaluation.", "The best provisional diagnosis is carpal tunnel syndrome: the distribution and nocturnal symptoms fit median nerve compression. Confirmation needs clinical evaluation; this scenario cannot establish severity or determine treatment."],
    stage: "Stage", ask: "Select a question to hear the answer", asked: "Patient's answer", hint: "Ask which fingers are affected and when symptoms appear before continuing.", choice: "Choose a decision", correct: "Well-supported choice", revise: "Reconsider your decision", next: "Next stage", previous: "Previous stage", result: "View result", explanation: "Explanation", finished: "Scenario completed", independent: "Correct on the first attempt", saved: "The result is saved in this browser.", progress: "My progress", reset: "Start again", sources: "Learning sources",
  },
  KZ: {
    title: "Виртуалды пациент: қолдың ұюы",
    intro: "Оқу үшін құрастырылған жағдай. Пациентке сұрақ қойыңыз, тексеруді таңдаңыз және алдын ала диагноз жасаңыз. Жауаптарды түзете аласыз.",
    image: "ЖИ жасаған қойылымдық оқу иллюстрациясы; бұл нақты пациенттің фотосы емес.",
    situation: "Пациент: «Қолым кейде ұйып қалады», – дейді. Әзірге басқа дерек жоқ.",
    questions: ["Қай саусақтар ұйиды?", "Ұю көбіне қашан пайда болады?", "Мойыныңыз ауыра ма?", "Заттарды ұстау қиындады ма?"],
    replies: ["Көбіне бас бармақ, сұқ және ортаңғы саусақ. Шынашақ әдетте ұйымаған.", "Көбіне түнде; кейде ұйқымнан оянамын.", "Жоқ, мойын ауырғанын байқамадым.", "Кейде кішкентай заттарды ұстау қиындайды."],
    tasks: ["Пациентке сұрақ қойыңыз", "Болжамыңызды тексеруге қандай зерттеу көмектеседі?", "Қандай алдын ала диагноз деректерді жақсырақ түсіндіреді?"],
    options: [[], ["Әр саусақтың сезімталдығын және бас бармақ түбіндегі бұлшықет күшін тексеру", "Тек қарашық реакциясын тексеру", "Сезімталдықты тексермеу"], ["Білезік деңгейіндегі ортаңғы жүйке невропатиясы (карпальды туннель синдромы)", "Оқшауланған шынтақ жүйкесінің невропатиясы", "Диагноз тек шағым бойынша толық дәлелденген"]],
    feedback: ["Қай саусақтың ұюы және симптомдардың түнде пайда болуы зерттеу бағытын таңдауға көмектеседі. Бұл мәліметтердің өзі диагноз емес.", "Саусақтардың сезімталдығын тексеру шағымды ортаңғы жүйкенің аймағымен салыстыруға көмектеседі. Осы оқу жағдайында бас бармақтың, сұқ және ортаңғы саусақтардың сезімталдығы төмен, ал шынашақтікі сақталған. Бір белгі толық бағалауды алмастырмайды.", "Ең орынды алдын ала диагноз — карпальды туннель синдромы: саусақтардағы таралуы және түнгі симптомдар ортаңғы жүйкенің қысылуына сәйкес келеді. Растау үшін клиникалық бағалау қажет; жағдай зақым дәрежесін немесе емді анықтамайды."],
    stage: "Кезең", ask: "Жауапты есту үшін сұрақты таңдаңыз", asked: "Пациенттің жауабы", hint: "Әрі қарай өту үшін қай саусақтар ұятынын және симптомдар қашан болатынын біліңіз.", choice: "Шешімді таңдаңыз", correct: "Негізді таңдау", revise: "Шешімді қайта қараңыз", next: "Келесі кезең", previous: "Алдыңғы кезең", result: "Нәтижені көру", explanation: "Талдау", finished: "Сценарий аяқталды", independent: "Бірінші әрекеттен дұрыс", saved: "Нәтиже осы браузерде сақталады.", progress: "Менің үлгерімім", reset: "Қайта бастау", sources: "Оқу дереккөздері",
  },
} as const;

export default function VirtualPatient({ language }: { language: Language }) {
  const [progress, setProgress] = useState<PatientProgress>(emptyPatientProgress);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => { setProgress(readPatientProgress()); setReady(true); }, []);
  const c = text[language];
  const answered = progress.answers.filter(value => value !== null).length;
  const selected = progress.answers[stage];
  function update(value: PatientProgress) { setProgress(value); savePatientProgress(value); }
  function ask(index: number) {
    if (progress.asked.includes(index)) return;
    const asked = [...progress.asked, index];
    const complete = asked.includes(0) && asked.includes(1);
    update({ ...progress, asked, answers: progress.answers.map((answer, i) => i === 0 && complete ? 0 : answer), firstTryCorrect: progress.firstTryCorrect.map((correct, i) => i === 0 && progress.asked.length === 0 ? index === 0 || index === 1 : correct) });
  }
  function select(index: number) {
    update({ ...progress, answers: progress.answers.map((answer, i) => i === stage ? index : answer), firstTryCorrect: progress.firstTryCorrect.map((correct, i) => i === stage && progress.answers[i] === null ? index === 0 : correct) });
  }
  function reset() { const cleared = emptyPatientProgress(); update(cleared); setStage(0); setShowOptions(false); }
  return <article className={styles.patient}>
    <h1>{c.title}</h1><p>{c.intro}</p>
    <div className={styles.layout}>
      <figure className={styles.photo}>
        <Image src="/images/module1/virtual-patient.webp" width={1536} height={1024} sizes="(max-width: 700px) 100vw, 340px" alt="" />
        <figcaption>{c.image}</figcaption>
      </figure>
      <div className={styles.work}>
        <p className={styles.situation}>{c.situation}</p>
        <p className={styles.counter}>{c.stage} {stage + 1} / 3 · {answered} / 3</p>
        <progress value={answered} max={3} aria-label={c.stage} />
        <h2>{c.tasks[stage]}</h2>
        {stage === 2 && <div>
          <VoiceTextarea language={language} label={diagnosisCopy[language].label} rows={4} maxLength={5000} value={progress.diagnosisText} disabled={!ready} onValue={text => update({ ...progress, diagnosisText: text })} />
          <p>{diagnosisCopy[language].note}</p>
          {!showOptions && selected === null && <button type="button" disabled={!progress.diagnosisText.trim()} onClick={() => setShowOptions(true)}>{diagnosisCopy[language].compare}</button>}
        </div>}
        {stage === 0 ? <div>
          <p>{c.ask}</p>
          <div className={styles.questions}>{c.questions.map((question, i) => <div key={question}>
            <button type="button" disabled={!ready || progress.asked.includes(i)} onClick={() => ask(i)}>{question}</button>
            {progress.asked.includes(i) && <p><strong>{c.asked}:</strong> {c.replies[i]}</p>}
          </div>)}</div>
          {selected === null && <p>{c.hint}</p>}
        </div> : (stage !== 2 || showOptions || selected !== null) && <fieldset disabled={!ready}>
          <legend>{c.choice}</legend>
          {c.options[stage].map((option, index) => <label key={option} className={selected === index ? styles.selected : undefined}>
            <input type="radio" name={`patient-${stage}`} checked={selected === index} onChange={() => select(index)} /> {option}
          </label>)}
        </fieldset>}
        {selected !== null && <div className={styles.feedback} role="status" aria-live="polite">
          {stage > 0 && <strong>{selected === 0 ? c.correct : c.revise}</strong>}
          <h3>{c.explanation}</h3><p>{c.feedback[stage]}</p>
        </div>}
        <div className={styles.actions}>
          <button type="button" onClick={() => setStage(value => value - 1)} disabled={stage === 0}>{c.previous}</button>
          {stage < 2 ? <button type="button" onClick={() => setStage(value => value + 1)} disabled={selected === null}>{c.next}</button> : answered === 3 ? <Link href={`/modules/1/progress?lang=${language}`}>{c.result}</Link> : null}
        </div>
      </div>
    </div>
    {answered === 3 && <p role="status" className={styles.finished}>{c.finished}. {c.independent}: {progress.firstTryCorrect.filter(Boolean).length} / 3. {c.saved} <Link href={`/modules/1/progress?lang=${language}`}>{c.progress}</Link></p>}
    <button type="button" className={styles.reset} onClick={reset}>{c.reset}</button>
    <p className={styles.sources}>{c.sources}: <a href="https://www.niams.nih.gov/health-topics/carpal-tunnel-syndrome" target="_blank" rel="noopener noreferrer">NIAMS</a> · <a href="https://orthoinfo.aaos.org/globalassets/pdfs/plain-language-summary_carpal-tunnel-syndrome-2024.pdf" target="_blank" rel="noopener noreferrer">AAOS</a></p>
  </article>;
}
