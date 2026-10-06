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

export default function BookmarkCurrent({ section, language, moduleId }: { section: Section; language: Language; moduleId: number }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setBookmarked(readModuleNotes(moduleId).bookmarks.includes(section)); setReady(true); }, [section,moduleId]);
  const c = copy[language];
  function toggle() {
    const stored = readModuleNotes(moduleId);
    const next = !stored.bookmarks.includes(section);
    saveModuleNotes(moduleId,{ ...stored, bookmarks: next ? [...stored.bookmarks, section] : stored.bookmarks.filter(item => item !== section) });
    setBookmarked(next);
  }
  return <div className={styles.bookmark}>
    <button type="button" disabled={!ready} aria-pressed={bookmarked} onClick={toggle}>{bookmarked ? c[1] : c[0]}</button>
    <Link href={`/modules/${moduleId}/notes?lang=${language}`}>{c[2]}</Link>
  </div>;
}
