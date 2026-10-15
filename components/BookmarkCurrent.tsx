"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import type { Section } from "../content/sections";
import { readModuleNotes, saveModuleNotes } from "../lib/moduleNotes";
import styles from "./ModuleTools.module.css";

const copy = {
  RU: ["В закладки", "Убрать закладку", "Мои заметки"],
  EN: ["Bookmark", "Remove bookmark", "My notes"],
  KZ: ["Бетбелгіге қосу", "Бетбелгіні өшіру", "Менің жазбаларым"],
} as const;
const failureCopy = {
  RU: "Закладка не сохранена: хранилище браузера недоступно или заполнено.",
  EN: "Bookmark not saved: browser storage is unavailable or full.",
  KZ: "Бетбелгі сақталмады: браузер жады қолжетімсіз немесе толған.",
} as const;

export default function BookmarkCurrent({ section, language, moduleId }: { section: Section; language: Language; moduleId: number }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [ready, setReady] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  useEffect(() => {
    const sync = () => setBookmarked(readModuleNotes(moduleId).bookmarks.includes(section));
    sync(); setReady(true); setSaveFailed(false);
    const onStorage = (event: StorageEvent) => {
      if (event.key === `neuro-course:module-${moduleId}:notes:v1` || event.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [section,moduleId]);
  const c = copy[language];
  function toggle() {
    const stored = readModuleNotes(moduleId);
    const next = !stored.bookmarks.includes(section);
    const saved = saveModuleNotes(moduleId,{ ...stored, bookmarks: next ? [...stored.bookmarks, section] : stored.bookmarks.filter(item => item !== section) });
    if (saved) setBookmarked(next);
    setSaveFailed(!saved);
  }
  return <div className={styles.bookmark}>
    <button type="button" disabled={!ready} aria-pressed={bookmarked} onClick={toggle}>{bookmarked ? c[1] : c[0]}</button>
    <Link href={`/modules/${moduleId}/notes?lang=${language}`}>{c[2]}</Link>
    {saveFailed && <span role="status" aria-live="polite">{failureCopy[language]}</span>}
  </div>;
}
