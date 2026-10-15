"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import { getSectionTitle, sectionOrder, type Section } from "../content/sections";
import { emptyModuleNotes, readModuleNotes, saveModuleNotes, type ModuleNotes } from "../lib/moduleNotes";
import styles from "./ModuleTools.module.css";
import VoiceTextarea from "./VoiceTextarea";

const copy = {
  RU: { title: "Закладки и заметки", intro: "Сохраняйте ссылки на разделы модуля и свои заметки. Данные сохраняются в профиле этого браузера и могут быть видны другим людям на общем устройстве. Не записывайте персональные данные пациентов.", pick: "Раздел", add: "Добавить закладку", remove: "Убрать закладку", note: "Моя заметка", saved: "Сохранено в этом браузере (не оценено)", clear: "Очистить заметки и закладки модуля", confirmClear: "Очистить все заметки и закладки этого модуля в данном браузере? Это действие нельзя отменить.", cleared: "Заметки и закладки этого модуля очищены.", failed: "Не удалось сохранить в браузере. Несохранённый текст пропадёт при переходе на другую страницу или обновлении.", bookmarks: "Мои закладки", empty: "Закладок пока нет", open: "Открыть раздел" },
  EN: { title: "Bookmarks and notes", intro: "Save module section links and your notes. Data is stored in this browser profile and may be visible to others on a shared device. Do not enter identifiable patient information.", pick: "Section", add: "Add bookmark", remove: "Remove bookmark", note: "My note", saved: "Saved in this browser (not graded)", clear: "Clear this module’s notes and bookmarks", confirmClear: "Clear all notes and bookmarks for this module in this browser? This cannot be undone.", cleared: "This module’s notes and bookmarks were cleared.", failed: "The browser could not save this. Unsaved text will be lost when you navigate away or reload.", bookmarks: "My bookmarks", empty: "No bookmarks yet", open: "Open section" },
  KZ: { title: "Бетбелгілер мен жазбалар", intro: "Модуль бөлімдеріне сілтемелерді және өз жазбаңызды сақтаңыз. Деректер осы браузер профилінде сақталады және ортақ құрылғыны пайдаланатын басқа адамдарға көрінуі мүмкін. Пациенттердің жеке деректерін енгізбеңіз.", pick: "Бөлім", add: "Бетбелгі қосу", remove: "Бетбелгіні өшіру", note: "Менің жазбам", saved: "Осы браузерде сақталды (бағаланбады)", clear: "Модуль жазбалары мен бетбелгілерін тазалау", confirmClear: "Осы браузердегі модульдің барлық жазбалары мен бетбелгілерін тазалайсыз ба? Бұл әрекетті қайтару мүмкін емес.", cleared: "Модульдің жазбалары мен бетбелгілері тазаланды.", failed: "Браузерде сақтау мүмкін болмады. Сақталмаған мәтін басқа бетке өткенде немесе бетті жаңартқанда жоғалады.", bookmarks: "Менің бетбелгілерім", empty: "Әлі бетбелгі жоқ", open: "Бөлімді ашу" },
} as const;

export default function NotesContent({ language, moduleId }: { language: Language; moduleId: number }) {
  const [value, setValue] = useState<ModuleNotes>(emptyModuleNotes);
  const [selected, setSelected] = useState<Section>("theory");
  const [ready, setReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "cleared" | "failed">("idle");
  useEffect(() => { setReady(false); setSaveStatus("idle"); setValue(readModuleNotes(moduleId)); setReady(true); }, [moduleId]);
  // Storage events are dispatched in other tabs, not in the tab that made the change.
  // Keep the visible notes in sync, but never discard an unsaved in-memory draft.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== `neuro-course:module-${moduleId}:notes:v1`) return;
      if (saveStatus === "failed") return;
      setValue(readModuleNotes(moduleId));
      setSaveStatus("idle");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [moduleId, saveStatus]);
  const c = copy[language];
  // Module-specific prompts guide note taking; these are not graded answers.
  const moduleThreePrompt = {
    RU: "Для самопроверки: чем отличаются функции дендритов, начального сегмента и аксона? Какие клетки образуют миелин в ЦНС и ПНС? Почему скорость моторного проведения рассчитывают по разности латентностей при двух точках стимуляции? Заметки не проверяются автоматически.",
    EN: "For self-review: how do dendrites, the initial segment and the axon differ in function? Which cells make myelin in the CNS and PNS? Why is motor conduction velocity calculated from the latency difference between two stimulation sites? Notes are not graded automatically.",
    KZ: "Өзіндік тексеру үшін: дендриттердің, бастапқы сегменттің және аксонның қызметтері қалай ерекшеленеді? ОЖЖ мен ШЖЖ-де миелинді қандай жасушалар түзеді? Неліктен қозғалтқыш жүйкенің өткізу жылдамдығы екі нүктеден тітіркендіргендегі латенттіліктер айырмасымен есептеледі? Жазбалар автоматты түрде бағаланбайды.",
  } as const;
  const bookmarked = value.bookmarks.includes(selected);
  const update = (change: (current: ModuleNotes) => ModuleNotes) => {
    // Re-read immediately before writing so editing a note in one tab does not
    // silently replace a bookmark or another section's note saved in another tab.
    // On storage failure preserve the unsaved in-memory draft instead.
    const current = saveStatus === "failed" ? value : readModuleNotes(moduleId);
    const next = change(current);
    setValue(next);
    setSaveStatus(saveModuleNotes(moduleId, next) ? "saved" : "failed");
  };
  const clearAll = () => {
    if (!ready || !window.confirm(c.confirmClear)) return;
    const empty = emptyModuleNotes();
    if (saveModuleNotes(moduleId, empty)) {
      setValue(empty);
      setSaveStatus("cleared");
    } else {
      setSaveStatus("failed");
    }
  };
  return <article className={styles.tool}>
    <h1>{c.title}</h1><p>{c.intro}</p>{moduleId === 3 && <p>{moduleThreePrompt[language]}</p>}
    <label htmlFor="notes-section">{c.pick}</label>
    <select id="notes-section" value={selected} onChange={event => { setSelected(event.target.value as Section); }}>
      {sectionOrder.map(section => <option key={section} value={section}>{getSectionTitle(section, language)}</option>)}
    </select>
    <div className={styles.row}>
      <button type="button" disabled={!ready} onClick={() => update(current => ({ ...current, bookmarks: current.bookmarks.includes(selected) ? current.bookmarks.filter(item => item !== selected) : [...current.bookmarks, selected] }))} aria-pressed={bookmarked}>{bookmarked ? c.remove : c.add}</button>
      <Link href={`/modules/${moduleId}/${selected}?lang=${language}`}>{c.open}</Link>
    </div>
    <label htmlFor="section-note">{c.note}</label>
    <VoiceTextarea key={selected} language={language} id="section-note" disabled={!ready} maxLength={5000} rows={7} value={value.notes[selected] ?? ""} onValue={text => update(current => ({ ...current, notes: { ...current.notes, [selected]: text } }))} />
    <p role="status" aria-live="polite">{ready && saveStatus !== "idle" ? c[saveStatus] : ""}</p>
    <button className={styles.clearButton} type="button" disabled={!ready} onClick={clearAll}>{c.clear}</button>
    <h2>{c.bookmarks}</h2>
    {value.bookmarks.length ? <ul>{value.bookmarks.map(section => <li key={section}><Link href={`/modules/${moduleId}/${section}?lang=${language}`}>{getSectionTitle(section, language)}</Link></li>)}</ul> : <p>{c.empty}</p>}
  </article>;
}
