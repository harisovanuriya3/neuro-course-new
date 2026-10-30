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
      <svg viewBox="0 0 640 440" role="img" aria-labelledby={`${id}-svg-title ${id}-svg-desc`}>
        <title id={`${id}-svg-title`}>{stage.title}</title>
        <desc id={`${id}-svg-desc`}>{stage.text} {copy.model}</desc>
        <defs>
          <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8e5d7" /><stop offset="1" stopColor="#e7c3ad" />
          </linearGradient>
          <linearGradient id={`${id}-brain`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7a8b8" /><stop offset="1" stopColor="#cf6685" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id={`${id}-arrow`} markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
            <path d="M0 0L12 6 0 12Z" fill="currentColor" />
          </marker>
        </defs>

        <g className={styles.anatomyBackdrop} aria-hidden="true">
          <ellipse cx="320" cy="405" rx="170" ry="18" />
          <path d="M272 104C252 118 243 143 239 175L224 306C220 342 246 372 279 378L320 385 361 378C394 372 420 342 416 306L401 175C397 143 388 118 368 104L348 90H292Z" />
          <path d="M292 93C273 81 263 60 266 38C269 14 289 2 320 2C351 2 371 14 374 38C377 60 367 81 348 93Z" />
          <path d="M250 162L178 279 203 294 266 220M390 162L462 279 437 294 374 220" />
          <path d="M287 372L253 430M353 372L387 430" />
        </g>

        <g className={cns ? styles.highlight : styles.structure} data-structure="cns" data-active={cns} filter={cns ? `url(#${id}-glow)` : undefined}>
          <path className={styles.brain} fill={`url(#${id}-brain)`} d="M320 25C303 12 278 23 278 45C266 57 273 77 291 81C297 96 316 98 324 86C339 99 360 89 360 72C376 58 367 34 349 32C342 19 329 18 320 25Z" />
          <path className={styles.brainFold} d="M319 28V85M289 43C302 35 311 42 313 51M281 61C294 54 306 63 305 74M347 35C333 36 328 47 331 57M356 58C344 52 335 61 337 75" />
          <path className={styles.brainStem} d="M314 84C313 97 306 104 309 117H331C334 104 327 97 326 84Z" />
          <path className={styles.spinalCord} d="M313 112C307 153 309 201 311 247C312 276 309 307 304 334L320 358 336 334C331 307 328 276 329 247C331 201 333 153 327 112Z" />
        </g>

        <g className={pns ? styles.highlight : styles.structure} data-structure="pns" data-active={pns} filter={pns ? `url(#${id}-glow)` : undefined}>
          <g className={styles.nerveRoots}>
            {[132,160,188,216,244,272,300].map((y, i) => <g key={y}>
              <path d={`M312 ${y}C${286-i*2} ${y+2} ${269-i*4} ${y+12} ${250-i*6} ${y+31}`} />
              <path d={`M328 ${y}C${354+i*2} ${y+2} ${371+i*4} ${y+12} ${390+i*6} ${y+31}`} />
            </g>)}
          </g>
          <path d="M257 177C229 188 211 216 193 248L177 278M383 177C411 188 429 216 447 248L463 278" />
          <path d="M247 222C226 244 218 270 205 297M393 222C414 244 422 270 435 297" />
          <path d="M288 326C279 354 267 383 253 427M352 326C361 354 373 383 387 427" />
          <path d="M304 337C292 363 287 394 282 425M336 337C348 363 353 394 358 425" />
          <circle cx="177" cy="278" r="7" /><circle cx="463" cy="278" r="7" />
          <circle cx="253" cy="427" r="7" /><circle cx="387" cy="427" r="7" />
        </g>

        <g className={styles.callouts} aria-hidden="true">
          <path d="M275 56H104" /><circle cx="275" cy="56" r="4" />
          <path d="M307 207H104" /><circle cx="307" cy="207" r="4" />
          <path d="M405 206H548" /><circle cx="405" cy="206" r="4" />
          <rect x="30" y="35" width="74" height="42" rx="21" /><rect x="30" y="186" width="74" height="42" rx="21" />
          <rect x="548" y="185" width="62" height="42" rx="21" />
          <path d="M52 56h30M52 207h30M568 206h22" />
        </g>

        {(index === 3 || index === 5) && <path data-direction="afferent" className={`${styles.flow} ${styles.afferent} ${playing ? styles.moving : ""}`} d="M477 283C455 247 427 220 394 205C367 192 348 176 331 148" markerEnd={`url(#${id}-arrow)`} />}
        {(index === 4 || index === 5) && <path data-direction="efferent" className={`${styles.flow} ${styles.efferent} ${playing ? styles.moving : ""}`} d="M327 151C348 188 371 221 407 250C430 268 450 286 474 306" markerEnd={`url(#${id}-arrow)`} />}
      </svg>

      <div className={styles.anatomyKey} aria-hidden="true">
        <span className={cns ? styles.keyActive : ""}><i className={styles.cnsSwatch} />{copy.cns}</span>
        <span className={pns ? styles.keyActive : ""}><i className={styles.pnsSwatch} />{copy.pns}</span>
      </div>
      <ul className={styles.legend}>
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
