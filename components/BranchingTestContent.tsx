"use client";

import { useEffect, useReducer, useRef } from "react";
import type { Language } from "../content/types";
import type { BranchingTest, TheoryTarget } from "../content/tests";
import { initialState, summarize, transition, type TestAction, type TestState } from "../lib/tests/engine";
import styles from "./BranchingTestContent.module.css";

const labels = {
  RU: { retry: "Повторить ошибочные задания", retryResult: "Результат повторения", original: "Результат основного прохождения", answer: "Правильный ответ", retryNote: "Повторение не изменяет результат основного прохождения." },
  KZ: { retry: "Қате орындалған тапсырмаларды қайталау", retryResult: "Қайталау нәтижесі", original: "Негізгі өту нәтижесі", answer: "Дұрыс жауап", retryNote: "Қайталау негізгі өту нәтижесін өзгертпейді." },
  EN: { retry: "Retry incorrect questions", retryResult: "Retry result", original: "Original attempt result", answer: "Correct answer", retryNote: "Retrying does not change the original attempt result." },
};

export default function BranchingTestContent({ test, language }: { test: BranchingTest; language: Language }) {
  const [state, dispatch] = useReducer((state: TestState, action: TestAction) => transition(test, state, action), test, initialState);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [state.current, state.phase]);
  const ui = test.ui;
  const copy = labels[language];
  const result = summarize(test, state);
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
          {state.phase === "question" ? <button data-action="check" disabled={state.selected === null} onClick={() => dispatch({ type: "check" })}>{ui.check}</button> : (
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
          <p>{theory(test.competencies[node.competency].theoryTarget)}</p>
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
