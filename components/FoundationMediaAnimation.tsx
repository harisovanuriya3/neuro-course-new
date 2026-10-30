"use client";

import { useEffect, useState } from "react";
import type { Language } from "../content/course";
import { mediaWalkthroughs } from "../content/media-walkthroughs";
import styles from "./FoundationMediaAnimation.module.css";

export default function FoundationMediaAnimation({ moduleId, language }: { moduleId: number; language: Language }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const labels = language === "RU"
    ? ["Исходное состояние", "Изменение параметра", "Физиологический ответ", "Интерпретация"]
    : language === "EN"
      ? ["Baseline", "Parameter change", "Physiological response", "Interpretation"]
      : ["Бастапқы күй", "Параметрді өзгерту", "Физиологиялық жауап", "Түсіндіру"];
  const explanations = mediaWalkthroughs[moduleId]?.[language] ?? [];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setStep(current => {
        if (current >= 3) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const text = {
    RU: {
      title: "Пошаговый физиологический разбор",
      instruction: "Сначала сформулируйте прогноз, затем откройте следующий этап. Анатомическая структура и специализированная лаборатория показаны отдельно ниже.",
      play: "Воспроизвести", pause: "Пауза", back: "Назад", next: "Следующий этап", replay: "Начать сначала",
    },
    EN: {
      title: "Step-by-step physiological explanation",
      instruction: "Make a prediction before revealing the next stage. The anatomical structure and specialized laboratory are displayed separately below.",
      play: "Play", pause: "Pause", back: "Back", next: "Next stage", replay: "Restart",
    },
    KZ: {
      title: "Физиологиялық кезеңдік талдау",
      instruction: "Келесі кезеңді ашпас бұрын болжам жасаңыз. Анатомиялық құрылым мен арнайы зертхана төменде бөлек көрсетілген.",
      play: "Ойнату", pause: "Кідірту", back: "Артқа", next: "Келесі кезең", replay: "Басынан бастау",
    },
  }[language];

  function select(index: number) {
    setPlaying(false);
    setStep(index);
  }

  return (
    <section className={styles.player} data-testid="foundation-media-walkthrough" data-module={moduleId} data-step={step}>
      <div className={styles.header}>
        <div>
          <span>{language === "RU" ? "Модуль" : language === "EN" ? "Module" : "Модуль"} {moduleId}</span>
          <h3>{text.title}</h3>
        </div>
        <strong>{step + 1}/4</strong>
      </div>
      <p className={styles.instruction}>{text.instruction}</p>

      <ol className={styles.timeline} aria-label={text.title}>
        {labels.map((label, index) => (
          <li key={label} data-active={index === step} data-complete={index < step}>
            <button type="button" aria-current={index === step ? "step" : undefined} onClick={() => select(index)}>
              <i>{index + 1}</i><span>{label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.explanation} role="status" aria-live="polite">
        <span>{labels[step]}</span>
        <p>{explanations[step]}</p>
      </div>

      <div className={styles.controls}>
        <button type="button" aria-pressed={playing} onClick={() => {
          if (playing) setPlaying(false);
          else {
            if (step === 3) setStep(0);
            setPlaying(true);
          }
        }}>{playing ? text.pause : text.play}</button>
        <button type="button" disabled={step === 0} onClick={() => select(Math.max(0, step - 1))}>{text.back}</button>
        <button type="button" disabled={step === 3} onClick={() => select(Math.min(3, step + 1))}>{text.next}</button>
        <button type="button" onClick={() => select(0)}>{text.replay}</button>
      </div>
    </section>
  );
}
