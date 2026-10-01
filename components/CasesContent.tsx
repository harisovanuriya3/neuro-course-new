"use client";

import { useEffect, useState } from "react";
import type { CasesLesson } from "../content/cases";
import CaseCard from "./cases/CaseCard";
import shared from "./PracticeContent.module.css";
import styles from "./CasesContent.module.css";
import { recordOutcome } from "../lib/courseProgress";

const caseStateKey = (moduleId: number) => `neuro-course:cases:${moduleId}:v1`;
import type { Language } from "../content/course";

export default function CasesContent({ lesson, language, moduleId }: { lesson: CasesLesson; language: Language; moduleId: number }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const ui = lesson.ui;

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(caseStateKey(moduleId)) || "null");
      if (!raw || typeof raw !== "object") return;
      const validIds = new Set(lesson.cases.map(item => item.id));
      const restoredCompleted = Array.isArray(raw.completed) ? raw.completed.filter((id: unknown): id is string => typeof id === "string" && validIds.has(id)) : [];
      const restoredChecked: Record<string, boolean> = {};
      if (raw.checked && typeof raw.checked === "object") for (const [id, value] of Object.entries(raw.checked)) {
        if (validIds.has(id) && typeof value === "boolean") restoredChecked[id] = value;
      }
      setCompleted(restoredCompleted);
      setChecked(restoredChecked);
    } catch { /* Optional local storage */ }
  }, [moduleId, lesson.cases]);

  function persist(nextCompleted: string[], nextChecked: Record<string, boolean>) {
    try { localStorage.setItem(caseStateKey(moduleId), JSON.stringify({ completed: nextCompleted, checked: nextChecked })); } catch { /* Optional local storage */ }
  }

  function recordChecked(id: string, correct: boolean) {
    const next = { ...checked, [id]: correct };
    setChecked(next);
    persist(completed, next);
    const results = Object.values(next);
    if (results.length) recordOutcome(moduleId, "criterion:clinical", results.filter(Boolean).length, results.length);
  }

  function mark(id: string, done: boolean) {
    const next = done ? [...new Set([...completed, id])] : completed.filter(value => value !== id);
    setCompleted(next);
    persist(next, checked);
    recordOutcome(moduleId, "cases", next.length, lesson.cases.length);
  }

  return (
    <div className={`${shared.practice} ${styles.cases}`}>
      <h1>{lesson.title}</h1>
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
        <CaseCard key={item.id} item={item} number={index + 1} ui={ui} language={language} completed={completed.includes(item.id)} onComplete={(done) => mark(item.id, done)} onChecked={(correct) => recordChecked(item.id, correct)} />
      ))}
      {lesson.sources && <aside className={styles.sources}>
        <h2>{ui.sources}</h2>
        <ul>{lesson.sources.map((source) => <li key={source.href}><a href={source.href}>{source.title}</a></li>)}</ul>
      </aside>}
    </div>
  );
}
