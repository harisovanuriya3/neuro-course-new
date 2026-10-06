"use client";

import { useEffect, useReducer, useRef } from "react";
import type { Language } from "../content/types";
import type { BranchingTest, TheoryTarget } from "../content/tests";
import { initialState, summarize, transition, type TestAction, type TestState } from "../lib/tests/engine";
import { recordOutcome } from "../lib/courseProgress";
import styles from "./BranchingTestContent.module.css";

const labels = {
  RU: { selectHint:"Сначала выберите один вариант ответа.", retry: "Повторить ошибочные задания", retryResult: "Результат повторения", original: "Результат основного прохождения", answer: "Правильный ответ", retryNote: "Повторение не изменяет результат основного прохождения.", score:"Результат", mastered:"Освоено", forming:"Формируется", review:"Требует повторения", next:"Следующий шаг", nextGood:"Перейдите к ситуационным задачам или виртуальному пациенту.", nextForming:"Повторите слабые темы и выполните ошибочные задания ещё раз.", nextReview:"Вернитесь к теории по слабым темам, затем повторите тест." },
  KZ: { selectHint:"Алдымен бір жауап нұсқасын таңдаңыз.", retry: "Қате орындалған тапсырмаларды қайталау", retryResult: "Қайталау нәтижесі", original: "Негізгі өту нәтижесі", answer: "Дұрыс жауап", retryNote: "Қайталау негізгі өту нәтижесін өзгертпейді.", score:"Нәтиже", mastered:"Меңгерілді", forming:"Қалыптасуда", review:"Қайталау қажет", next:"Келесі қадам", nextGood:"Жағдаяттық тапсырмаларға немесе виртуалды пациентке өтіңіз.", nextForming:"Әлсіз тақырыптарды қайталап, қате тапсырмаларды қайта орындаңыз.", nextReview:"Әлсіз тақырыптар бойынша теорияға оралып, содан кейін тестті қайталаңыз." },
  EN: { selectHint:"Select one answer option first.", retry: "Retry incorrect questions", retryResult: "Retry result", original: "Original attempt result", answer: "Correct answer", retryNote: "Retrying does not change the original attempt result.", score:"Score", mastered:"Mastered", forming:"Developing", review:"Needs review", next:"Next step", nextGood:"Continue to case problems or the virtual patient.", nextForming:"Review weak topics and retry the incorrect questions.", nextReview:"Return to theory for weak topics, then repeat the test." },
};

export default function BranchingTestContent({ test, language, moduleId }: { test: BranchingTest; language: Language; moduleId: number }) {
  const storageKey = `neuro-course:test:${moduleId}:${language}:v1`;
  const [state, dispatch] = useReducer(
    (state: TestState, action: TestAction) => transition(test, state, action),
    test,
    (value) => {
      if (typeof window === "undefined") return initialState(value);
      try {
        const raw = JSON.parse(localStorage.getItem(storageKey) || "null") as TestState | null;
        if (!raw || typeof raw !== "object" || typeof raw.current !== "string" || !["question","feedback","remediation","results"].includes(raw.phase)) return initialState(value);
        if (raw.current !== "end" && !value.nodes[raw.current]) return initialState(value);
        return { ...initialState(value), ...raw, selected: typeof raw.selected === "string" ? raw.selected : null };
      } catch { return initialState(value); }
    }
  );
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [state.current, state.phase]);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Optional local storage */ }
  }, [state, storageKey]);
  const ui = test.ui;
  const copy = labels[language];
  const result = summarize(test, state);
  const percent = result.total ? Math.round((result.firstCorrect / result.total) * 100) : 0;
  const levelLabel = percent >= 80 ? copy.mastered : percent >= 50 ? copy.forming : copy.review;
  const nextAdvice = percent >= 80 ? copy.nextGood : percent >= 50 ? copy.nextForming : copy.nextReview;
  useEffect(() => {
    if (state.phase === "results" && state.retryIds === null) {
      recordOutcome(moduleId, "tests", result.firstCorrect, result.total);
      const initiallyWrong = [...new Set(state.attempts.filter(attempt => attempt.level === "main" && !attempt.correct).map(attempt => attempt.competency))];
      const corrected = initiallyWrong.filter(competency =>
        state.attempts.some(attempt => attempt.competency === competency && attempt.level !== "main" && attempt.correct)
      );
      if (initiallyWrong.length) recordOutcome(moduleId, "criterion:correction", corrected.length, initiallyWrong.length);
      for (const competency of Object.keys(test.competencies)) {
        const mainAttempt = state.attempts.find(attempt => attempt.level === "main" && attempt.competency === competency);
        if (mainAttempt) recordOutcome(moduleId, `criterion:${competency}`, mainAttempt.correct ? 1 : 0, 1);
      }
      // Module 1 is the richer pilot: preserve its ten topic competencies and
      // aggregate them into the shared course-level assessment criteria.
      if (moduleId === 1) {
        const groups: Record<string, string[]> = {
          concept: ["organization", "cns-pns", "effector"],
          mechanism: ["afferent", "efferent", "excitation", "synapse"],
          application: ["integration", "regulation"],
          transfer: ["feedback", "integration"],
          justification: ["organization", "feedback", "regulation"],
        };
        for (const [criterion, competencies] of Object.entries(groups)) {
          const attempts = competencies
            .map(competency => state.attempts.find(attempt => attempt.level === "main" && attempt.competency === competency))
            .filter((attempt): attempt is NonNullable<typeof attempt> => Boolean(attempt));
          if (attempts.length) recordOutcome(moduleId, `criterion:${criterion}`, attempts.filter(attempt => attempt.correct).length, attempts.length);
        }
      }
    }
  }, [state.phase, state.retryIds, result.firstCorrect, result.total, moduleId, state.attempts, test.competencies]);
  const node = test.nodes[state.current];
  const attempts = state.retryIds === null ? state.attempts : state.retryAttempts;
  const last = attempts[attempts.length - 1];
  const canRetry = attempts.some(attempt => !attempt.correct);
  const theory = (target: TheoryTarget) => (
    <a href={`/modules/${target.moduleId}/theory?lang=${language}#${target.anchor}`} target="_blank" rel="noopener noreferrer">
      {ui.openTheory} ({ui.newTab})
    </a>
  );

  return (
    <article className={styles.test} data-testid="branching-test" lang={language === "KZ" ? "kk" : language.toLowerCase()}>
      <h1>{test.title}</h1>
      <p>{ui.introduction}</p>
      <p className={styles.note}>{ui.localNote} {ui.languageWarning}</p>
      <p>{state.retryIds === null ? ui.mainProgress : copy.retry}: {state.retryIds === null ? result.mainAnswered : state.retryAttempts.length} / {state.retryIds === null ? result.total : state.retryIds.length}</p>
      {state.phase === "results" ? (
        <section data-testid="results">
          <h2 ref={heading} tabIndex={-1}>{ui.complete}</h2>
          <h3>{copy.original}</h3>
          <div style={{margin:"0 0 18px",padding:"16px",border:"1px solid #d6e3eb",borderRadius:"14px",background:"#f8fcff"}}>
            <p style={{margin:"0 0 6px",fontSize:"18px"}}><strong>{copy.score}: {percent}% · {levelLabel}</strong></p>
            <progress value={result.firstCorrect} max={result.total} aria-label={copy.score} style={{width:"100%"}} />
            <p style={{margin:"10px 0 0"}}><strong>{copy.next}:</strong> {nextAdvice}</p>
          </div>
          <dl className={styles.metrics}>
            <div><dt>{ui.firstAttempt}</dt><dd>{result.firstCorrect} / {result.total}</dd></div>
            <div><dt>{ui.mastery}</dt><dd>{result.mastered} / {result.total}</dd></div>
            <div><dt>{ui.recoveredCount}</dt><dd>{result.recovered}</dd></div>
            <div><dt>{ui.extraCount}</dt><dd>{result.additional}</dd></div>
            <div><dt>{ui.remediationCount}</dt><dd>{result.remediations}</dd></div>
          </dl>
          <p>{ui.resultNote}</p>
          {state.retryIds !== null && <div role="status"><h3>{copy.retryResult}</h3><p>{state.retryAttempts.filter(attempt => attempt.correct).length} / {state.retryIds.length}</p><p>{copy.retryNote}</p></div>}
          <h3>{ui.weakTopics}</h3>
          {result.weak.length ? <ul>{result.weak.map(id => <li key={id}>{test.competencies[id].title}: {result.unresolved.includes(id) ? ui.needsReview : ui.recovered}. {theory(test.competencies[id].theoryTarget)}</li>)}</ul> : <p>{ui.noWeakTopics}</p>}
          <div className={styles.actions}>
            {canRetry && <button data-action="retry" onClick={() => dispatch({ type: "retry" })}>{copy.retry}</button>}
            <button data-action="restart" onClick={() => dispatch({ type: "restart" })}>{ui.restart}</button>
          </div>
          <details><summary>{ui.route}</summary><ol>{state.history.map((event, index) => <li key={index}>{event.type === "review" ? `${ui.theoryVisit}: ${test.competencies[event.competency].title}` : `${test.nodes[event.attempt.nodeId].type === "question" ? test.competencies[event.attempt.competency].title : ""}: ${event.attempt.correct ? ui.correct : ui.reviewNeeded}`}</li>)}</ol></details>
        </section>
      ) : node.type === "question" ? (
        <section data-node={node.id}>
          <p>{ui.competency}: {test.competencies[node.competency].title} · {node.level === "main" ? ui.mainQuestion : node.level === "basic" ? ui.basic : ui.additional}</p>
          <h2 ref={heading} tabIndex={-1}>{node.prompt}</h2>
          <fieldset disabled={state.phase !== "question"}>
            <legend>{ui.select}</legend>
            {node.options.map(option => <label key={option.id} className={styles.option}><input type="radio" name={node.id} value={option.id} checked={state.selected === option.id} onChange={() => dispatch({ type: "select", answer: option.id })} />{option.text}</label>)}
          </fieldset>
          {state.phase === "question" ? <><button data-action="check" disabled={state.selected === null} aria-describedby={state.selected === null ? "test-check-hint" : undefined} onClick={() => dispatch({ type: "check" })}>{ui.check}</button>{state.selected === null && <p id="test-check-hint" className={styles.actionHint}>{copy.selectHint}</p>}</> : (
            <>
              <div role="status" className={last.correct ? styles.correct : styles.feedback}>
                <strong>{last.correct ? ui.correct : ui.reviewNeeded}</strong>
                <p>{copy.answer}: {node.options.find(option => option.id === node.correctAnswer)?.text}</p>
                <p>{node.explanation}</p>
                {!last.correct && node.level === "basic" && state.retryIds === null && <p>{ui.unresolvedFeedback}</p>}
              </div>
              <button data-action="continue" onClick={() => dispatch({ type: "continue" })}>{ui.continue}</button>
            </>
          )}
          {state.phase !== "question" && <p>{theory(test.competencies[node.competency].theoryTarget)}</p>}
        </section>
      ) : (
        <section data-node={node.id}>
          <h2 ref={heading} tabIndex={-1}>{node.depth === 1 ? ui.review : ui.detailedReview}</h2>
          <p>{node.text}</p>
          <p>{theory(node.theoryTarget)}</p>
          <button data-action="continue" onClick={() => dispatch({ type: "continue" })}>{ui.reviewed}</button>
        </section>
      )}
    </article>
  );
}
