"use client";

import Link from "next/link";
import { useState } from "react";
import type { Language, PracticeBlock } from "../content/types";
import styles from "./PracticeContent.module.css";
import VoiceTextarea from "./VoiceTextarea";

type Audit = Extract<PracticeBlock, { type: "ai-audit" }>;
const meaningful = (value: string) => (value.match(/[\p{L}\p{N}]/gu) ?? []).length >= 12;

export default function AIAuditPractice({ block, language, moduleId }: { block: Audit; language: Language; moduleId: string }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [trust, setTrust] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [rationale, setRationale] = useState("");
  const [checked, setChecked] = useState(false);
  const current = block.cases[caseIndex];
  const l = block.labels;
  const missed = current.claims.some((claim, index) => claim.isError && !selected.includes(index));
  const falseAlarm = current.claims.some((claim, index) => !claim.isError && selected.includes(index));

  function nextCase() {
    setCaseIndex((caseIndex + 1) % block.cases.length);
    setPrediction("");
    setTrust(null);
    setLocked(false);
    setSelected([]);
    setRationale("");
    setChecked(false);
  }

  return (
    <div className={styles.audit}>
      <p>{block.instructions}</p>
      <div className={styles.aiResponse}>
        <strong>{l.aiAnswer}</strong>
        <p>{current.claims.map((claim) => claim.text).join(" ")}</p>
      </div>
      <VoiceTextarea language={language} label={l.prediction} value={prediction} onValue={setPrediction} disabled={locked} rows={3} />
      <fieldset className={styles.trust} disabled={locked}>
        <legend>{l.trust}</legend>
        <p>{l.trustHint}</p>
        <div className={styles.trustOptions}>
          {[1, 2, 3, 4, 5].map((value) => <label key={value}>
            <input type="radio" name={`ai-trust-${caseIndex}-${language}`} checked={trust === value} onChange={() => setTrust(value)} /> {value}
          </label>)}
        </div>
      </fieldset>
      {!locked && <button type="button" className={styles.primary} disabled={!meaningful(prediction) || trust === null} onClick={() => setLocked(true)}>{l.lock}</button>}
      {locked && <>
        <p><strong>{l.identify}</strong></p>
        <div className={styles.auditClaims}>
          {current.claims.map((claim, index) => <label key={index}>
            <input type="checkbox" checked={selected.includes(index)} disabled={checked} onChange={() => setSelected((old) => old.includes(index) ? old.filter((value) => value !== index) : [...old, index])} />
            <span>{claim.text}</span>
          </label>)}
        </div>
        <VoiceTextarea language={language} label={l.rationale} value={rationale} onValue={setRationale} disabled={checked} rows={4} />
        <p className={styles.auditSource}>{l.source} <Link href={`/modules/${moduleId}/theory?lang=${language}#${current.theoryAnchor}`}>{l.theory}</Link> · <a href={current.source.href} target="_blank" rel="noopener noreferrer">{current.source.label}</a></p>
        {!checked && <button type="button" className={styles.primary} disabled={!selected.length || !meaningful(rationale)} onClick={() => setChecked(true)}>{l.check}</button>}
      </>}
      {checked && <div className={styles.auditResult} role="status" aria-live="polite">
        <h3>{l.result}</h3>
        <p>{missed || falseAlarm ? l.retry : l.correct}</p>
        <p>{l.found}: {current.claims.filter((claim, index) => claim.isError && selected.includes(index)).length} / {current.claims.filter((claim) => claim.isError).length}. {l.missed}: {current.claims.filter((claim, index) => claim.isError && !selected.includes(index)).length}.</p>
        <p><strong>{l.modelAnswer}</strong></p>
        <ol>{current.claims.map((claim, index) => <li key={index}><strong>{claim.isError ? l.missing : l.markedCorrect}</strong> {claim.explanation}</li>)}</ol>
        {block.cases.length > 1 && <button type="button" onClick={nextCase}>{l.nextCase}</button>}
      </div>}
    </div>
  );
}
