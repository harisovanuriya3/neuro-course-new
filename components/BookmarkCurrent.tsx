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

export default function BookmarkCurrent({ section, language }: { section: Section; language: Language }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setBookmarked(readModuleNotes().bookmarks.includes(section)); setReady(true); }, [section]);
  const c = copy[language];
  function toggle() {
    const stored = readModuleNotes();
    const next = !stored.bookmarks.includes(section);
    saveModuleNotes({ ...stored, bookmarks: next ? [...stored.bookmarks, section] : stored.bookmarks.filter(item => item !== section) });
    setBookmarked(next);
  }
  return <div className={styles.bookmark}>
    <button type="button" disabled={!ready} aria-pressed={bookmarked} onClick={toggle}>{bookmarked ? c[1] : c[0]}</button>
    <Link href={`/modules/1/notes?lang=${language}`}>{c[2]}</Link>
  </div>;
}
