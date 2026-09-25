"use client";

import { useState } from "react";
import type { CasesLesson } from "../content/cases";
import CaseCard from "./cases/CaseCard";
import shared from "./PracticeContent.module.css";
import styles from "./CasesContent.module.css";

export default function CasesContent({ lesson }: { lesson: CasesLesson }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const ui = lesson.ui;

  function mark(id: string, done: boolean) {
    setCompleted((previous) => done ? [...new Set([...previous, id])] : previous.filter((value) => value !== id));
  }

  return (
    <div className={`${shared.practice} ${styles.cases}`}>
      <p>{lesson.introduction}</p>
      <p className={shared.note}>{ui.note}</p>
      <div className={styles.progress}>
        <p role="status">{ui.progress}: <strong>{completed.length} / {lesson.cases.length}</strong> {ui.completed}</p>
        <progress aria-label={ui.progress} value={completed.length} max={lesson.cases.length} />
        <nav aria-label={ui.navigation} className={styles.navigation}>
          {lesson.cases.map((item, index) => (
            <a key={item.id} href={`#case-${item.id}`} aria-label={`${ui.case} ${index + 1}: ${item.title}${completed.includes(item.id) ? ` — ${ui.done}` : ""}`} className={completed.includes(item.id) ? styles.doneLink : undefined}>
              {index + 1}{completed.includes(item.id) && <span aria-hidden="true"> ✓</span>}
            </a>
          ))}
        </nav>
      </div>
      {lesson.cases.map((item, index) => (
        <CaseCard key={item.id} item={item} number={index + 1} ui={ui} completed={completed.includes(item.id)} onComplete={(done) => mark(item.id, done)} />
      ))}
      {lesson.sources && <aside className={styles.sources}>
        <h2>{ui.sources}</h2>
        <ul>{lesson.sources.map((source) => <li key={source.href}><a href={source.href}>{source.title}</a></li>)}</ul>
      </aside>}
    </div>
  );
}
