"use client";

import { useState } from "react";
import type { CaseExercise, CasesLesson } from "../../content/cases";
import shared from "../PracticeContent.module.css";
import styles from "../CasesContent.module.css";

type Props = { item: CaseExercise; number: number; ui: CasesLesson["ui"]; completed: boolean; onComplete: (done: boolean) => void };

export default function CaseCard({ item, number, ui, completed, onComplete }: Props) {
  const [visible, setVisible] = useState(1);
  const [responses, setResponses] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const id = `case-${item.id}`;
  const interaction = item.interaction;
  const sequence = interaction?.type === "sequence" ? interaction : undefined;
  const selection = interaction?.type === "choice" ? interaction : undefined;
  const answered = sequence || item.stages.slice(0, visible).every((_, index) => responses[index]?.trim());
  const ready = Boolean(answered && visible === item.stages.length && (!interaction || checked));
  const hint = sequence ? ui.sequenceGate : selection ? ui.choiceGate : ui.gate;

  function invalidateReview() {
    setOpen(false);
    setReviewed(false);
    if (completed) onComplete(false);
  }

  function updateSequence(next: number[]) {
    setSelected(next);
    setChecked(false);
    setFeedback("");
    invalidateReview();
  }

  function check() {
    if (sequence) {
      if (selected.length !== sequence.steps.length) {
        setCorrect(false);
        setFeedback(ui.incomplete);
        return;
      }
      const success = selected.every((step, index) => step === index);
      setCorrect(success);
      setFeedback(success ? ui.correct : ui.incorrect);
    } else if (selection) {
      if (choice === null) {
        setCorrect(false);
        setFeedback(ui.choose);
        return;
      }
      setCorrect(selection.options[choice].correct);
      setFeedback(selection.options[choice].feedback);
    }
    setChecked(true);
  }

  function nextStage() {
    setVisible(visible + 1);
    requestAnimationFrame(() => document.getElementById(`${id}-stage-${visible}`)?.focus());
  }

  // Stable mixing avoids hydration differences and does not expose the answer order.
  const mixed = sequence ? sequence.steps.map((_, index) => index).filter((index) => index % 2 === 1).reverse()
    .concat(sequence.steps.map((_, index) => index).filter((index) => index % 2 === 0).reverse()) : [];

  return (
    <article id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={`${shared.card} ${styles.card}`}>
      <div className={styles.cardHeader}>
        <span className={styles.eyebrow}>{ui.case} {number}</span>
        {completed && <span className={styles.completed}>✓ {ui.done}</span>}
      </div>
      <h2 id={`${id}-title`}>{item.title}</h2>
      <div className={shared.callout}><h3>{ui.situation}</h3><p>{item.situation}</p></div>
      {item.stages.slice(0, visible).map((stage, index) => (
        <section key={index} className={styles.stage} aria-labelledby={`${id}-stage-${index}`}>
          <h3 id={`${id}-stage-${index}`} tabIndex={-1}>{item.stages.length > 1 && `${ui.stage} ${index + 1} / ${item.stages.length}: `}{stage.title}</h3>
          {stage.data && <p className={styles.data}>{stage.data}</p>}
          <ol>{stage.questions.map((question) => <li key={question}>{question}</li>)}</ol>
          {!sequence && <label className={shared.response} htmlFor={`${id}-response-${index}`}>
            {ui.answer}{item.stages.length > 1 && ` — ${ui.stage.toLowerCase()} ${index + 1}`}
            <textarea id={`${id}-response-${index}`} rows={4} value={responses[index] ?? ""} placeholder={ui.placeholder} onChange={(event) => {
              const next = [...responses];
              next[index] = event.target.value;
              setResponses(next);
              invalidateReview();
            }} />
          </label>}
        </section>
      ))}
      {visible < item.stages.length && <div className={shared.actions}>
        <button type="button" className={shared.primary} disabled={!answered} aria-describedby={`${id}-hint`} onClick={nextStage}>{ui.next}</button>
      </div>}
      {sequence && <section aria-label={ui.available}>
        <p><strong>{ui.available}</strong></p>
        <div className={shared.options}>
          {mixed.map((index) => <button type="button" key={index} disabled={selected.includes(index)} onClick={() => updateSequence([...selected, index])}>{sequence.steps[index]}</button>)}
        </div>
        <p><strong>{ui.selected}</strong> ({selected.length}/{sequence.steps.length})</p>
        {selected.length ? <ol className={styles.selected}>{selected.map((index) => <li key={index}>{sequence.steps[index]}</li>)}</ol> : <p className={shared.empty}>{ui.empty}</p>}
        <div className={shared.actions}>
          <button type="button" className={shared.primary} onClick={check}>{ui.check}</button>
          <button type="button" disabled={!selected.length} onClick={() => updateSequence(selected.slice(0, -1))}>{ui.undo}</button>
          <button type="button" disabled={!selected.length} onClick={() => updateSequence([])}>{ui.reset}</button>
        </div>
      </section>}
      {selection && <fieldset className={styles.choices}>
        <legend>{selection.prompt}</legend>
        {selection.options.map((option, index) => <label key={index}>
          <input type="radio" name={`${id}-choice`} checked={choice === index} onChange={() => {
            setChoice(index); setChecked(false); setFeedback(""); invalidateReview();
          }} />
          <span>{option.text}</span>
        </label>)}
        <button type="button" className={shared.primary} onClick={check}>{ui.check}</button>
      </fieldset>}
      {interaction && <p role="status" className={feedback ? (correct ? shared.success : shared.retry) : shared.status}>{feedback}</p>}
      <p id={`${id}-hint`} className={shared.note}>{hint}</p>
      <div className={shared.disclosure}>
        <button type="button" className={shared.answerButton} disabled={!ready} aria-expanded={open} aria-controls={`${id}-explanation`} aria-describedby={`${id}-hint`} onClick={() => {
          setOpen(!open);
          if (!open) setReviewed(true);
        }}>{open ? ui.hide : ui.show}</button>
        <div id={`${id}-explanation`} hidden={!open} className={shared.answers}>
          {open && <>
            <h3>{ui.explanation}</h3>
            {sequence && <ol>{sequence.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
            {item.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {item.diagram && <><h3>{ui.diagram}</h3><ol className={styles.diagram}>{item.diagram.map((step, index) => <li key={step}><span>{step}</span>{index < item.diagram!.length - 1 && <span aria-hidden="true">↓</span>}</li>)}</ol></>}
          </>}
        </div>
      </div>
      {reviewed && <label className={styles.completion}>
        <input type="checkbox" checked={completed} onChange={(event) => onComplete(event.target.checked)} /> {ui.complete}
      </label>}
    </article>
  );
}
