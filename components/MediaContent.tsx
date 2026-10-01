"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { MediaBlock, MediaLesson } from "../content/media";
import type { Language } from "../content/course";
import shared from "./PracticeContent.module.css";
import styles from "./MediaContent.module.css";
import OrganizationAnimation from "./OrganizationAnimation";
import FoundationMediaAnimation from "./FoundationMediaAnimation";

function durationLabel(seconds?: number) {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) return null;
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function Player({ block, ui }: { block: MediaBlock; ui: MediaLesson["ui"] }) {
  const [failed, setFailed] = useState(false);
  const [duration, setDuration] = useState(block.source?.durationSeconds);
  const source = block.source;
  const hasVideo = Boolean(source?.videoUrl?.trim());
  return <>
    <div className={styles.player} data-player={hasVideo ? (failed ? "error" : "video") : "pending"}>
      {hasVideo && !failed ? <video controls playsInline preload="metadata" src={source!.videoUrl} poster={source?.poster}
        crossOrigin={source?.captions?.length ? "anonymous" : undefined}
        aria-label={block.title} aria-describedby={`${block.id}-transcript-label`}
        onError={() => setFailed(true)} onLoadedMetadata={event => setDuration(event.currentTarget.duration)}>
        {source?.captions?.map(track => <track key={`${track.srcLang}-${track.src}`} kind={track.kind ?? "captions"} src={track.src} srcLang={track.srcLang} label={track.label} default={track.default} />)}
        {ui.alternative}
      </video> : <div className={styles.placeholder} role="group" aria-label={block.title}>
        {source?.poster && <img src={source.poster} alt="" className={styles.poster} />}
        <p className={styles.status} role={failed ? "status" : undefined}>{failed ? ui.unavailable : ui.pending}</p>
        <p>{ui.alternative}</p>
      </div>}
    </div>
    <dl className={styles.metadata}>
      <div><dt>{ui.duration}</dt><dd>{durationLabel(duration) ?? ui.durationPending}</dd></div>
      <div><dt>{ui.language}</dt><dd>{ui.languageName}</dd></div>
      {source?.credit && <div><dt>{ui.credit}</dt><dd>{source.credit}</dd></div>}
    </dl>
  </>;
}

function SelfCheck({ block, ui }: { block: MediaBlock; ui: MediaLesson["ui"] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const firstOption = useRef<HTMLInputElement>(null);
  const question = block.question;
  const answer = question.options.find(option => option.id === selected);
  const correct = selected === question.correctAnswer;
  return <section className={styles.question} aria-labelledby={`${block.id}-question-title`}>
    <h3 id={`${block.id}-question-title`}>{ui.question}</h3>
    <fieldset disabled={checked}>
      <legend>{question.prompt}</legend>
      {question.options.map((option, index) => <label className={styles.option} key={option.id}>
        <input ref={index === 0 ? firstOption : undefined} type="radio" name={`media-${block.id}`} value={option.id} checked={selected === option.id} onChange={() => setSelected(option.id)} />
        <span>{option.text}</span>
      </label>)}
    </fieldset>
    <button type="button" data-action="check" disabled={selected === null || checked} onClick={() => setChecked(true)}>{ui.check}</button>
    {checked && answer && <>
      <div role="status" aria-live="polite" className={correct ? shared.success : shared.retry}>
        <strong>{correct ? ui.correct : ui.incorrect}</strong>
        <p>{answer.feedback}</p>
        <p><strong>{ui.correctAnswer}: </strong>{question.options.find(option => option.id === question.correctAnswer)?.text}</p>
        <p>{question.explanation}</p>
      </div>
      <button type="button" data-action="retry" onClick={() => {
        setSelected(null); setChecked(false);
        requestAnimationFrame(() => firstOption.current?.focus());
      }}>{ui.retry}</button>
    </>}
  </section>;
}

export default function MediaContent({ lesson, moduleId, language }: { lesson: MediaLesson; moduleId: string; language: Language }) {
  const ui = lesson.ui;
  return <article className={`${shared.practice} ${styles.media}`} data-testid="media-content" lang={language === "KZ" ? "kk" : language.toLowerCase()}>
    <h1>{lesson.title}</h1><p>{lesson.introduction}</p>
    {lesson.blocks.map((block, index) => <section key={block.id} id={`media-${block.id}`} data-media={block.id} className={shared.card} aria-labelledby={`${block.id}-title`}>
      <h2 id={`${block.id}-title`}>{index + 1}. {block.title}</h2>
      <p><strong>{ui.preview}: </strong>{block.preview}</p>
      {block.animation === "organization" ? <OrganizationAnimation key={language} language={language} />
        : block.animation === "foundation" ? <FoundationMediaAnimation key={`${moduleId}-${language}-${block.id}`} moduleId={Number(moduleId)} language={language} />
        : <Player key={block.source?.videoUrl ?? "pending"} block={block} ui={ui} />}
      <details className={styles.transcript}>
        <summary id={`${block.id}-transcript-label`}>{ui.transcript}</summary>
        {block.transcript.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </details>
      <p><Link href={`/modules/${moduleId}/theory?lang=${language}#${block.theoryAnchor}`}>{ui.theory}</Link></p>
      <SelfCheck block={block} ui={ui} />
    </section>)}
  </article>;
}
