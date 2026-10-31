"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { Language } from "../content/course";
import { getOrganizationAnimation } from "../content/modules/1/organization-animation";
import styles from "./OrganizationAnimation.module.css";

export default function OrganizationAnimation({ language }: { language: Language }) {
  const copy = getOrganizationAnimation(language);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const id = useId();
  const stage = copy.stages[index];
  const last = index === copy.stages.length - 1;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (last) setPlaying(false);
      else setIndex(current => current + 1);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);
  useEffect(() => {
    const pauseWhenHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);
  function go(next: number) { setPlaying(false); setIndex(next); }
  const both = index === 0 || index === 5;
  const cns = both || index === 1;
  const pns = both || index === 2;
  return <div className={styles.player} data-testid="organization-animation" data-stage={stage.id} data-playing={playing}>
    <h3 id={`${id}-heading`}>{copy.title}</h3>
    <p id={`${id}-instructions`}>{copy.instruction}</p>
    <p className={styles.reduced}>{copy.reduced}</p>
    <div className={styles.visual}>
      <div className={styles.anatomySequence} role="img" aria-labelledby={`${id}-visual-title ${id}-visual-desc`}>
        <span id={`${id}-visual-title`} className={styles.srOnly}>{stage.title}</span>
        <span id={`${id}-visual-desc`} className={styles.srOnly}>{stage.text}</span>
        <figure className={styles.anatomyPanel} data-active={cns}>
          <div className={styles.photo}>
            <Image src="/images/anatomy/brain-spinal-cord.jpg" alt={copy.cns} fill sizes="(max-width: 600px) 88vw, 260px" priority />
          </div>
          <figcaption>{copy.cns}</figcaption>
        </figure>
        <div className={`${styles.signal} ${(index === 3 || index === 5) && playing ? styles.moving : ""}`} data-active={index === 3 || index === 5} aria-hidden="true">
          <span>←</span><small>{copy.input}</small>
        </div>
        <figure className={styles.anatomyPanel} data-active={pns}>
          <div className={styles.photo}>
            <Image src="/images/anatomy/peripheral-nerve.jpg" alt={copy.pns} fill sizes="(max-width: 600px) 88vw, 260px" />
          </div>
          <figcaption>{copy.pns}</figcaption>
        </figure>
        <div className={`${styles.signal} ${(index === 4 || index === 5) && playing ? styles.moving : ""}`} data-active={index === 4 || index === 5} aria-hidden="true">
          <span>→</span><small>{copy.output}</small>
        </div>
        <figure className={styles.anatomyPanel} data-active={index === 4 || index === 5}>
          <div className={styles.photo}>
            <Image src="/images/anatomy/neuromuscular-junction.jpg" alt={copy.output} fill sizes="(max-width: 600px) 88vw, 260px" />
          </div>
          <figcaption>{copy.output}</figcaption>
        </figure>
      </div>
      <ul className={styles.legend}>
        <li data-active={cns}>{copy.cns}</li><li data-active={pns}>{copy.pns}</li>
        {(index === 3 || index === 5) && <li className={styles.direction}>{copy.input}</li>}
        {(index === 4 || index === 5) && <li className={styles.direction}>{copy.output}</li>}
      </ul>
    </div>
    <div className={styles.controls} role="group" aria-labelledby={`${id}-heading`} aria-describedby={`${id}-instructions`}>
      <button type="button" data-animation-action="play" aria-pressed={playing} onClick={() => {
        if (playing) setPlaying(false);
        else { if (last) setIndex(0); setPlaying(true); }
      }}>{playing ? copy.pause : copy.play}</button>
      <button type="button" data-animation-action="previous" disabled={index === 0} onClick={() => go(index - 1)}>{copy.previous}</button>
      <button type="button" data-animation-action="next" disabled={last} onClick={() => go(index + 1)}>{copy.next}</button>
      <button type="button" data-animation-action="restart" onClick={() => go(0)}>{copy.restart}</button>
    </div>
    <p>{copy.steps}: {copy.stages.length} · {playing ? copy.playing : copy.paused}</p>
    <progress max={copy.stages.length} value={index + 1} aria-label={copy.progress} />
    <div className={styles.explanation} role="status" aria-live="polite" aria-atomic="true">
      <p>{copy.step} {index + 1} / {copy.stages.length}</p>
      <h4>{stage.title}</h4><p>{stage.text}</p>
      {last && !playing && <p>{copy.last}</p>}
    </div>
    <p className={styles.note}>{copy.model}</p>
  </div>;
}
