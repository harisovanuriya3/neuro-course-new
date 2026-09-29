"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import { getSectionTitle, sectionOrder, type Section } from "../content/sections";
import { emptyModuleNotes, readModuleNotes, saveModuleNotes, type ModuleNotes } from "../lib/moduleNotes";
import styles from "./ModuleTools.module.css";
import VoiceTextarea from "./VoiceTextarea";

const copy = {
  RU: { title: "Закладки и заметки", intro: "Сохраняйте ссылки на разделы модуля и свои заметки. Данные остаются только в этом браузере.", pick: "Раздел", add: "Добавить закладку", remove: "Убрать закладку", note: "Моя заметка", saved: "Сохранено", failed: "Не удалось сохранить в браузере. Текст останется только до закрытия страницы.", bookmarks: "Мои закладки", empty: "Закладок пока нет", open: "Открыть раздел" },
  EN: { title: "Bookmarks and notes", intro: "Save module section links and your notes. Data stays only in this browser.", pick: "Section", add: "Add bookmark", remove: "Remove bookmark", note: "My note", saved: "Saved", failed: "The browser could not save this. The text will remain until you close the page.", bookmarks: "My bookmarks", empty: "No bookmarks yet", open: "Open section" },
  KZ: { title: "Бетбелгілер мен жазбалар", intro: "Модуль бөлімдеріне сілтемелерді және өз жазбаңызды сақтаңыз. Деректер тек осы браузерде қалады.", pick: "Бөлім", add: "Бетбелгі қосу", remove: "Бетбелгіні өшіру", note: "Менің жазбам", saved: "Сақталды", failed: "Браузерде сақтау мүмкін болмады. Мәтін тек бет жабылғанға дейін қалады.", bookmarks: "Менің бетбелгілерім", empty: "Әлі бетбелгі жоқ", open: "Бөлімді ашу" },
} as const;

export default function NotesContent({ language }: { language: Language }) {
  const [value, setValue] = useState<ModuleNotes>(emptyModuleNotes);
  const [selected, setSelected] = useState<Section>("theory");
  const [ready, setReady] = useState(false);
  const [persisted, setPersisted] = useState(true);
  useEffect(() => { setValue(readModuleNotes()); setReady(true); }, []);
  const c = copy[language];
  const bookmarked = value.bookmarks.includes(selected);
  const update = (next: ModuleNotes) => { setValue(next); setPersisted(saveModuleNotes(next)); };
  return <article className={styles.tool}>
    <h1>{c.title}</h1><p>{c.intro}</p>
    <label htmlFor="notes-section">{c.pick}</label>
    <select id="notes-section" value={selected} onChange={event => setSelected(event.target.value as Section)}>
      {sectionOrder.map(section => <option key={section} value={section}>{getSectionTitle(section, language)}</option>)}
    </select>
    <div className={styles.row}>
      <button type="button" disabled={!ready} onClick={() => update({ ...value, bookmarks: bookmarked ? value.bookmarks.filter(item => item !== selected) : [...value.bookmarks, selected] })}>{bookmarked ? c.remove : c.add}</button>
      <Link href={`/modules/1/${selected}?lang=${language}`}>{c.open}</Link>
    </div>
    <label htmlFor="section-note">{c.note}</label>
    <VoiceTextarea key={selected} language={language} id="section-note" disabled={!ready} maxLength={5000} rows={7} value={value.notes[selected] ?? ""} onValue={text => update({ ...value, notes: { ...value.notes, [selected]: text } })} />
    <p role="status">{ready ? persisted ? c.saved : c.failed : ""}</p>
    <h2>{c.bookmarks}</h2>
    {value.bookmarks.length ? <ul>{value.bookmarks.map(section => <li key={section}><Link href={`/modules/1/${section}?lang=${language}`}>{getSectionTitle(section, language)}</Link></li>)}</ul> : <p>{c.empty}</p>}
  </article>;
}
