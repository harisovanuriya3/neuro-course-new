"use client";

import { useId, useState, type ReactNode } from "react";
import type { Language, PracticeBlock, PracticeLesson } from "../content/types";
import styles from "./PracticeContent.module.css";

type UI = PracticeLesson["ui"] & { hideAnswer: string };

const hideAnswer = {
  RU: "Скрыть ответы и объяснения",
  KZ: "Жауаптар мен түсіндірмелерді жасыру",
  EN: "Hide answers and explanations",
};

function Disclosure({ children, ui }: { children: ReactNode; ui: UI }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={styles.disclosure}>
      <button type="button" className={styles.answerButton} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {open ? ui.hideAnswer : ui.showAnswer}
      </button>
      <div id={id} hidden={!open} className={styles.answers}>{children}</div>
    </div>
  );
}

function Answers({ items, ui }: { items: string[]; ui: UI }) {
  return (
    <Disclosure ui={ui}>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </Disclosure>
  );
}

function Sequence({ steps, ui }: { steps: string[]; ui: UI }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");
  // A stable mixed order keeps server rendering and hydration consistent.
  const options = steps.map((_, index) => index);
  const mixed = [...options.filter((index) => index % 2 === 1).reverse(), ...options.filter((index) => index % 2 === 0).reverse()];

  function update(next: number[]) {
    setSelected(next);
    setFeedback("");
  }

  function check() {
    setFeedback(selected.length !== steps.length
      ? ui.incomplete
      : selected.every((value, index) => value === index) ? ui.correct : ui.incorrect);
  }

  return (
    <div className={styles.sequence}>
      <p><strong>{ui.available}</strong></p>
      <div className={styles.options}>
        {mixed.map((index) => (
          <button type="button" key={index} disabled={selected.includes(index)} onClick={() => update([...selected, index])}>
            {steps[index]}
          </button>
        ))}
      </div>
      <p><strong>{ui.selected}</strong> ({selected.length}/{steps.length})</p>
      {selected.length ? <ol className={styles.chain}>{selected.map((index, position) => (
        <li key={index}>
          <span className={styles.chainCard}><span className={styles.number} aria-hidden="true">{position + 1}</span>{steps[index]}</span>
          {position < selected.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
        </li>
      ))}</ol> : <p className={styles.empty}>{ui.empty}</p>}
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={check}>{ui.check}</button>
        <button type="button" disabled={!selected.length} onClick={() => update(selected.slice(0, -1))}>{ui.undo}</button>
        <button type="button" disabled={!selected.length} onClick={() => update([])}>{ui.reset}</button>
      </div>
      <p role="status" aria-live="polite" className={feedback ? (feedback === ui.correct ? styles.success : styles.retry) : styles.status}>{feedback}</p>
      <Disclosure ui={ui}>
        <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </Disclosure>
    </div>
  );
}

function Worksheet({ block, ui }: { block: Extract<PracticeBlock, { type: "table" }>; ui: UI }) {
  return (
    <>
      <div className={styles.tableScroll} role="region" aria-label={block.headers.join(" / ")} tabIndex={0}>
        <table>
          <thead><tr>{block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody>
            {block.rows.map(([structure]) => (
              <tr key={structure}>
                <th scope="row">{structure}</th>
                {[1, 2].map((column) => (
                  <td key={column}>
                    <label>
                      <span className={styles.srOnly}>{structure}: {block.headers[column]}</span>
                      <textarea rows={3} placeholder={ui.input} />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Disclosure ui={ui}>
        <dl>{block.rows.map(([structure, category, purpose]) => (
          <div key={structure}>
            <dt><strong>{structure}</strong></dt>
            <dd><strong>{block.headers[1]}:</strong> {category}<br /><strong>{block.headers[2]}:</strong> {purpose}</dd>
          </div>
        ))}</dl>
      </Disclosure>
    </>
  );
}

function Block({ block, ui }: { block: PracticeBlock; ui: UI }) {
  switch (block.type) {
    case "paragraph": return <p>{block.text}</p>;
    case "subheading": return <h3>{block.text}</h3>;
    case "list": return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "callout": return <aside className={styles.callout}><h3>{block.title}</h3><p>{block.text}</p></aside>;
    case "answer": return <Answers items={block.items} ui={ui} />;
    case "response": return <label className={styles.response}>{block.label}<textarea rows={4} placeholder={ui.input} /></label>;
    case "sequence": return <Sequence steps={block.steps} ui={ui} />;
    case "table": return <Worksheet block={block} ui={ui} />;
    case "checklist": return <div className={styles.checklist}>{block.items.map((item) => (
      <label key={item}><input type="checkbox" /> <span>{item}</span></label>
    ))}</div>;
  }
}

export default function PracticeContent({ lesson, language }: { lesson: PracticeLesson; language: Language }) {
  const ui: UI = { ...lesson.ui, hideAnswer: hideAnswer[language] };
  return (
    <article className={styles.practice}>
      <p className={styles.note}>{lesson.ui.localNote}</p>
      {lesson.sections.map((section) => (
        <section key={section.title} className={styles.card}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, index) => <Block key={index} block={block} ui={ui} />)}
        </section>
      ))}
    </article>
  );
}
