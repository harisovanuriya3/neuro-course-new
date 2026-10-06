"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Language } from "../content/course";
import { getVirtualPatientScenario } from "../content/virtual-patients";
import VoiceTextarea from "./VoiceTextarea";
import VirtualPatientVisual from "./VirtualPatientVisual";
import styles from "./UnifiedVirtualPatient.module.css";

const interfaceCopy = {
  RU: { stage: "Этап", case: "Пациент / учебный случай", situation: "Ситуация", newData: "Новые данные", task: "Задача студента", why: "Почему это происходит", answer: "Ваше обоснование", placeholder: "Запишите наблюдение или ход рассуждения…", patient: "Результат / реакция", mentor: "Клинический наставник", feedback: "Комментарий наставника", next: "Следующий этап", previous: "Предыдущий этап", reset: "Начать случай заново", listen: "Слушать", stop: "Остановить", restartAudio: "Сначала", choose: "Варианты решения", correct: "Выбор согласуется с задачей.", revise: "Сопоставьте выбор с задачей и данными случая.", locked: "Сначала завершите предыдущий этап.", final: "Итоговое объяснение механизма", saved: "Ответы сохраняются при переходе между этапами.", history: "Последствие предыдущего решения", completed: "Случай завершён: все 6 решений и обоснований сохранены.", reasoningRequired: "Перед переходом кратко обоснуйте своё решение.", stagesLocked: "Этапы открываются по порядку. Завершите текущий этап, чтобы открыть следующий." },
  EN: { stage: "Stage", case: "Patient / teaching case", situation: "Situation", newData: "New data", task: "Student task", why: "Why this happens", answer: "Your reasoning", placeholder: "Record your observation or reasoning…", patient: "Result / response", mentor: "Clinical mentor", feedback: "Mentor comment", next: "Next stage", previous: "Previous stage", reset: "Restart case", listen: "Listen", stop: "Stop", restartAudio: "Restart", choose: "Decision options", correct: "The choice fits the task.", revise: "Compare the choice with the task and case data.", locked: "Complete the previous stage first.", final: "Final mechanism explanation", saved: "Answers are retained while moving between stages.", history: "Consequence of the previous decision", completed: "Case complete: all 6 decisions and rationales are saved.", reasoningRequired: "Before continuing, briefly justify your decision.", stagesLocked: "Stages open in order. Complete the current stage to unlock the next one." },
  KZ: { stage: "Кезең", case: "Пациент / оқу жағдайы", situation: "Жағдай", newData: "Жаңа деректер", task: "Студент тапсырмасы", why: "Бұл неліктен болады", answer: "Сіздің негіздемеңіз", placeholder: "Бақылауыңызды немесе ойлау жолын жазыңыз…", patient: "Нәтиже / реакция", mentor: "Клиникалық тәлімгер", feedback: "Тәлімгер пікірі", next: "Келесі кезең", previous: "Алдыңғы кезең", reset: "Жағдайды қайта бастау", listen: "Тыңдау", stop: "Тоқтату", restartAudio: "Басынан", choose: "Шешім нұсқалары", correct: "Таңдау тапсырмаға сәйкес келеді.", revise: "Таңдауды тапсырма және жағдай деректерімен салыстырыңыз.", locked: "Алдымен алдыңғы кезеңді аяқтаңыз.", final: "Механизмнің қорытынды түсіндірмесі", saved: "Кезеңдер арасында өткенде жауаптар сақталады.", history: "Алдыңғы шешімнің салдары", completed: "Жағдай аяқталды: 6 шешім мен негіздеменің барлығы сақталды.", reasoningRequired: "Келесі кезеңге өтпес бұрын шешіміңізді қысқаша негіздеңіз.", stagesLocked: "Кезеңдер ретімен ашылады. Келесі кезеңді ашу үшін ағымдағы кезеңді аяқтаңыз." },
} as const;

type StoredState = { current: number; unlocked: number; selected: (number | null)[]; notes: string[] };
const emptyState = (): StoredState => ({ current: 0, unlocked: 0, selected: [null, null, null, null, null, null], notes: ["", "", "", "", "", ""] });

export default function UnifiedVirtualPatient({ moduleId, language }: { moduleId: number; language: Language }) {
  const scenario = useMemo(() => getVirtualPatientScenario(moduleId, language), [moduleId, language]);
  const [state, setState] = useState<StoredState>(emptyState);
  const [ready, setReady] = useState(false);
  const [activeAudio, setActiveAudio] = useState<"patient" | "mentor" | null>(null);
  const storageKey = `neuro-course:virtual-patient:${moduleId}:${language}:v1`;

  useEffect(() => {
    setReady(false);
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "null") as Partial<StoredState> | null;
      if (parsed && Array.isArray(parsed.selected) && Array.isArray(parsed.notes)) {
        setState({
          current: Math.max(0, Math.min(5, Number(parsed.current) || 0)),
          unlocked: Math.max(0, Math.min(5, Number(parsed.unlocked) || 0)),
          selected: [0, 1, 2, 3, 4, 5].map((i) => Number.isInteger(parsed.selected?.[i]) ? Number(parsed.selected?.[i]) : null),
          notes: [0, 1, 2, 3, 4, 5].map((i) => typeof parsed.notes?.[i] === "string" ? parsed.notes[i].slice(0, 5000) : ""),
        });
      } else setState(emptyState());
    } catch { setState(emptyState()); }
    setReady(true);
  }, [storageKey]);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Keep the active attempt in memory. */ }
  }, [ready, state, storageKey]);

  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setActiveAudio(null);
    return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, [moduleId, language, state.current, state.selected[state.current]]);

  if (!scenario) return null;
  const c = interfaceCopy[language];
  const stage = scenario.stages[state.current];
  const selected = state.selected[state.current];
  const selectedOption = selected === null ? null : stage.options[selected];
  const previousSelection = state.current > 0 ? state.selected[state.current - 1] : null;
  const previousOption = previousSelection === null ? null : scenario.stages[state.current - 1].options[previousSelection];
  const complete = selected !== null;
  const reasoningComplete = state.notes[state.current].trim().length >= 12;
  const decisionCommitted = complete && reasoningComplete;

  function speak(value: string, role: "patient" | "mentor") {
    if (!("speechSynthesis" in window)) return;
    window.dispatchEvent(new Event("neuro-dictation-stop"));
    window.dispatchEvent(new Event("neuro-speech-stop"));
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = language === "RU" ? "ru-RU" : language === "KZ" ? "kk-KZ" : "en-US";
    utterance.rate = role === "mentor" ? 0.88 : 0.94;
    utterance.pitch = role === "mentor" ? 0.92 : 1;
    utterance.onend = () => setActiveAudio(null);
    utterance.onerror = () => setActiveAudio(null);
    setActiveAudio(role);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setActiveAudio(null);
  }

  function AudioControls({ value, role }: { value: string; role: "patient" | "mentor" }) {
    return <div className={styles.audioControls} aria-label={role === "mentor" ? c.mentor : c.patient}>
      <button type="button" onClick={() => speak(value, role)} aria-pressed={activeAudio === role}>🔊 {c.listen}</button>
      <button type="button" onClick={stopSpeech}>■ {c.stop}</button>
      <button type="button" onClick={() => speak(value, role)}>↺ {c.restartAudio}</button>
    </div>;
  }

  function choose(index: number) {
    setState((value) => ({ ...value, selected: value.selected.map((item, i) => i === value.current ? index : item) }));
  }

  function updateNote(note: string) {
    setState((value) => ({ ...value, notes: value.notes.map((item, i) => i === value.current ? note : item) }));
  }

  function next() {
    if (!complete || !reasoningComplete || state.current === 5) return;
    setState((value) => ({ ...value, current: value.current + 1, unlocked: Math.max(value.unlocked, value.current + 1) }));
  }

  function reset() {
    try { localStorage.removeItem(storageKey); } catch {}
    setState(emptyState());
  }

  return <article className={styles.patient} data-testid="unified-virtual-patient" data-module-id={moduleId} lang={language === "KZ" ? "kk" : language.toLowerCase()}>
    <header className={styles.header}>
      <div><h1>{scenario.title}</h1><p>{scenario.syntheticNote}</p></div>
      <div className={styles.progressText}>{c.stage} {state.current + 1}/6</div>
    </header>
    <progress value={state.current + 1} max={6} aria-label={`${c.stage} ${state.current + 1}/6`} />
    <nav className={styles.stageNav} aria-label={c.stage}>
      {scenario.stages.map((item, index) => {
        const locked = !ready || index > state.unlocked;
        return <button key={item.id} type="button" className={index === state.current ? styles.activeStage : undefined} data-locked={locked || undefined} aria-disabled={locked} aria-current={index === state.current ? "step" : undefined} title={locked ? c.locked : undefined} onClick={() => { if (!locked) setState((value) => ({ ...value, current: index })); }}><span>{index + 1}</span><b>{item.title}</b>{locked && <i aria-hidden="true">🔒</i>}</button>;
      })}
    </nav>
    <p className={styles.stageHelp}>{c.stagesLocked}</p>
    <div className={styles.desk}>
      <aside className={styles.patientCard}>
        <div className={styles.patientPortrait} data-patient-age={scenario.visualProfile.age} data-patient-sex={scenario.visualProfile.sex} data-patient-age-group={scenario.visualProfile.visualAgeGroup}>
          <Image src={scenario.visualProfile.patientVisual} width={1536} height={1024} priority sizes="(max-width: 700px) 100vw, (max-width: 900px) 320px, 280px" alt={`${c.case}: ${scenario.profile}`} />
          <span>{c.stage} {state.current + 1}/6</span>
        </div>
        <VirtualPatientVisual moduleId={moduleId} stage={state.current + 1} selected={decisionCommitted ? selected : null} language={language} />
        <div className={styles.caseLabel}>{c.case}</div><h2>{scenario.patient}</h2><p className={styles.profile}>{scenario.profile}</p><div className={styles.patientBubble}>{scenario.opening}</div>
      </aside>
      <section className={styles.workspace} aria-labelledby="vp-stage-title">
        <div className={styles.stageCount}>{c.stage} {state.current + 1}/6</div>
        <h2 id="vp-stage-title">{stage.title}</h2>
        {previousOption && <div className={styles.response} data-testid="branch-consequence"><h3>{c.history}</h3><p>{previousOption.response}</p></div>}
        <section className={styles.situationCard}><h3>{c.situation}</h3><p>{stage.situation}</p></section>
        <section className={styles.dataCard}><h3>{c.newData}</h3><p>{stage.newData}</p></section>
        <section className={styles.taskCard}><h3>{c.task}</h3><p>{stage.task}</p></section>
        <fieldset disabled={!ready}><legend>{c.choose}</legend>
          {stage.options.map((option, index) => <label key={option.id} className={selected === index ? styles.selected : undefined}><input type="radio" name={`vp-${moduleId}-${state.current}`} checked={selected === index} onChange={() => choose(index)} /> {option.text}</label>)}
        </fieldset>
        <label className={styles.reasoning}><strong>{c.answer}</strong><VoiceTextarea language={language} value={state.notes[state.current]} onValue={updateNote} placeholder={c.placeholder} rows={4} /></label>
        <p className={styles.saved}>{c.saved}</p>
        {selectedOption && !reasoningComplete && <p role="status" className={styles.saved}>{c.reasoningRequired}</p>}
        {selectedOption && reasoningComplete && <div className={styles.response} role="status" aria-live="polite"><div className={styles.responseHeaderControls}><h3>{c.patient}</h3><AudioControls value={selectedOption.response} role="patient" /></div><div className={styles.audioText}><p>{selectedOption.response}</p></div></div>}
        {selectedOption && reasoningComplete && <div className={selected === stage.correctOption ? styles.feedbackGood : styles.feedbackReview}><h3>{c.feedback}</h3><strong>{selected === stage.correctOption ? c.correct : c.revise}</strong><p>{selectedOption.feedback}</p><h3>{c.why}</h3><p>{stage.mechanism}</p></div>}
        {state.current === 5 && complete && reasoningComplete && <section className={styles.final} data-testid="virtual-patient-review">
          <h3>{c.final}</h3><p><strong>{c.completed}</strong></p>
          <p>{scenario.mechanismSummary}</p>
          <ol className={styles.reviewList}>
            {scenario.stages.map((reviewStage, index) => {
              const reviewSelection = state.selected[index];
              const reviewOption = reviewSelection === null ? null : reviewStage.options[reviewSelection];
              return <li key={reviewStage.id}>
                <strong>{index + 1}. {reviewStage.title}</strong>
                {reviewOption && <><span>{reviewOption.text}</span><small>{reviewOption.response}</small></>}
              </li>;
            })}
          </ol>
        </section>}
        <div className={styles.actions}><button type="button" disabled={state.current === 0} onClick={() => setState((value) => ({ ...value, current: value.current - 1 }))}>{c.previous}</button>{state.current < 5 && <button type="button" disabled={!complete || !reasoningComplete} onClick={next}>{c.next}</button>}</div>
      </section>
      <aside className={styles.mentorCard} aria-live="polite">
        <Image src="/images/module1/virtual-mentor-clinic.png" width={1456} height={1024} sizes="(max-width: 700px) 100vw, 270px" alt={c.mentor} />
        <details className={styles.mentorDetails} open>
          <summary>{c.mentor}</summary>
          <div className={styles.mentorHeaderControls}><h2>{c.mentor}</h2><AudioControls value={selectedOption && reasoningComplete ? selectedOption.feedback : stage.mentorPrompt} role="mentor" /></div>
          <div className={styles.mentorText}><p>{selectedOption && reasoningComplete ? selectedOption.feedback : stage.mentorPrompt}</p></div>
        </details>
      </aside>
    </div>
    <button type="button" className={styles.reset} onClick={reset}>{c.reset}</button>
  </article>;
}
