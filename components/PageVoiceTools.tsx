"use client";

import VoiceIcon from "./VoiceIcon";

import { useEffect, useId, useRef, useState } from "react";
import type { Language } from "../content/course";
import type { Section } from "../content/sections";
import { readModuleNotes, saveModuleNotes } from "../lib/moduleNotes";
import { visiblePageText } from "../lib/speech";
import SpeechPlayer from "./SpeechPlayer";
import VoiceTextarea from "./VoiceTextarea";
import styles from "./PageVoiceTools.module.css";

const copy = {
  RU: { title: "Голосовые инструменты", input: "Ввод голосом", label: "Мой ответ или заметка к странице", hint: "Этот текст сохраняется как заметка. Для ответа на оцениваемое задание используйте поле самого задания ниже.", saved: "Заметка сохранена в этом браузере.", failed: "Сохранить заметку не удалось; скопируйте текст перед закрытием страницы." },
  EN: { title: "Voice tools", input: "Voice input", label: "My answer or page note", hint: "This text is saved as a note. Use the activity's own field below to answer a graded task.", saved: "Note saved in this browser.", failed: "The note could not be saved; copy it before closing the page." },
  KZ: { title: "Дауыстық құралдар", input: "Дауыспен енгізу", label: "Менің жауабым немесе бетке жазбам", hint: "Бұл мәтін жазба ретінде сақталады. Бағаланатын тапсырмаға жауап беру үшін төмендегі тапсырманың өз өрісін пайдаланыңыз.", saved: "Жазба осы браузерде сақталды.", failed: "Жазбаны сақтау мүмкін болмады; бетті жабудан бұрын мәтінді көшіріңіз." },
} as const;
const titleNoteKey = "neuro-course:module-1:title-note:v1";

export default function PageVoiceTools({ language, contentId, section, moduleId = 1 }: { language: Language; contentId: string; section?: Section; moduleId?: number }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);
  const c = copy[language];
  const panel = useRef<HTMLDivElement>(null);
  const noteKey = moduleId === 1 ? titleNoteKey : `neuro-course:module-${moduleId}:page-note:${section ?? 'title'}:v1`;
  useEffect(() => {
    setReady(false);
    if (moduleId === 1 && section) setNote(readModuleNotes().notes[section] ?? "");
    else { try { setNote(localStorage.getItem(noteKey) ?? ""); } catch { setNote(""); } }
    setReady(true);
  }, [section, moduleId, noteKey]);
  useEffect(() => {
    const root = document.getElementById(contentId);
    if (!root) return;
    const stopForInteraction = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || target.closest('[data-testid="page-voice-tools"]')) return;
      if (event.type !== "click" || target.closest("button,input,select,a,summary")) window.dispatchEvent(new Event("neuro-speech-stop"));
    };
    root.addEventListener("input", stopForInteraction);
    root.addEventListener("change", stopForInteraction);
    root.addEventListener("click", stopForInteraction);
    return () => { root.removeEventListener("input", stopForInteraction); root.removeEventListener("change", stopForInteraction); root.removeEventListener("click", stopForInteraction); };
  }, [contentId, language]);
  function update(text: string) {
    setNote(text);
    if (moduleId === 1 && section) { const current = readModuleNotes(); setSaved(saveModuleNotes({ ...current, notes: { ...current.notes, [section]: text } })); }
    else { try { localStorage.setItem(noteKey, text); setSaved(true); } catch { setSaved(false); } }
  }
  return <section className={styles.tools} aria-label={c.title} data-no-narration data-testid="page-voice-tools">
    <SpeechPlayer language={language} getText={() => { const root = document.getElementById(contentId); return root ? visiblePageText(root) : []; }} />
    <button className={styles.inputToggle} type="button" aria-expanded={open} aria-controls={`${id}-note`} onClick={() => {
      setOpen(value => !value);
      if (!open) requestAnimationFrame(() => panel.current?.querySelector('textarea')?.focus());
    }}><VoiceIcon kind="microphone" />{c.input}</button>
    <div id={`${id}-note`} hidden={!open} ref={panel}>
      {open && <>
        <p>{c.hint}</p>
        <VoiceTextarea language={language} label={c.label} disabled={!ready} maxLength={5000} rows={3} value={note} onValue={update} />
        <p role="status">{saved ? c.saved : c.failed}</p>
      </>}
    </div>
  </section>;
}
