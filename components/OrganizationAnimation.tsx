"use client";

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
      <svg viewBox="0 0 420 350" role="img" aria-labelledby={`${id}-svg-title ${id}-svg-desc`}>
        <title id={`${id}-svg-title`}>{stage.title}</title><desc id={`${id}-svg-desc`}>{stage.text} {copy.model}</desc>
        <defs><marker id={`${id}-arrow`} markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0L12 6 0 12Z" fill="currentColor" /></marker></defs>
        <path className={styles.body} d="M184 95Q158 81 164 45Q169 15 210 15Q251 15 256 45Q262 81 236 95Q270 104 281 139L323 217 300 230 255 169 256 247 276 328 246 328 210 264 174 328 144 328 164 247 165 169 120 230 97 217 139 139Q150 104 184 95Z" />
        <g className={cns ? styles.highlight : styles.structure} data-structure="cns" data-active={cns}>
          <path d="M207 36C194 24 174 43 183 56C169 70 188 88 208 80C226 90 247 73 240 58C251 40 224 24 207 36Z" />
          <path d="M210 37V80M187 51q13-10 18 4m18-10q15 10 2 19M190 70q10-9 18-2" fill="none" />
          <path d="M205 87H215V230L210 248 205 230Z" />
        </g>
        <g className={pns ? styles.highlight : styles.structure} data-structure="pns" data-active={pns}>
          <path d="M205 120L164 139 117 216M215 120L256 139 304 216M205 156L163 167M215 156L257 167M205 225L178 272 160 317M215 225L242 272 260 317" fill="none" />
          {[[184,130],[236,130],[184,161],[236,161]].map(([x,y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="6" ry="9" />)}
          <path d="M117 216l-10 1m10-1-2 11m187-11 11 1m-11-1 3 11m-144 90-9 4m9-4 3 10m97-10 10 4m-10-4-2 10" fill="none" />
        </g>
        {(index === 3 || index === 5) && <path data-direction="afferent" className={`${styles.flow} ${playing ? styles.moving : ""}`} d="M315 190C350 124 282 94 225 144" markerEnd={`url(#${id}-arrow)`} />}
        {(index === 4 || index === 5) && <path data-direction="efferent" className={`${styles.flow} ${playing ? styles.moving : ""}`} d="M227 190C272 187 302 236 335 241" markerEnd={`url(#${id}-arrow)`} />}
      </svg>
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
