"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import { getSectionTitle, sectionOrder, type Section } from "../content/sections";
import { emptyModuleNotes, readModuleNotes, saveModuleNotes, type ModuleNotes } from "../lib/moduleNotes";
import styles from "./ModuleTools.module.css";
import VoiceTextarea from "./VoiceTextarea";

const copy = {
  RU: { title: "Закладки и заметки", intro: "Сохраняйте ссылки на разделы модуля и свои заметки. Данные сохраняются в профиле этого браузера и могут быть видны другим людям на общем устройстве. Не записывайте персональные данные пациентов.", pick: "Раздел", add: "Добавить закладку", remove: "Убрать закладку", note: "Моя заметка", saved: "Сохранено", failed: "Не удалось сохранить в браузере. Несохранённый текст пропадёт при переходе на другую страницу или обновлении.", bookmarks: "Мои закладки", empty: "Закладок пока нет", open: "Открыть раздел" },
  EN: { title: "Bookmarks and notes", intro: "Save module section links and your notes. Data is stored in this browser profile and may be visible to others on a shared device. Do not enter identifiable patient information.", pick: "Section", add: "Add bookmark", remove: "Remove bookmark", note: "My note", saved: "Saved", failed: "The browser could not save this. Unsaved text will be lost when you navigate away or reload.", bookmarks: "My bookmarks", empty: "No bookmarks yet", open: "Open section" },
  KZ: { title: "Бетбелгілер мен жазбалар", intro: "Модуль бөлімдеріне сілтемелерді және өз жазбаңызды сақтаңыз. Деректер осы браузер профилінде сақталады және ортақ құрылғыны пайдаланатын басқа адамдарға көрінуі мүмкін. Пациенттердің жеке деректерін енгізбеңіз.", pick: "Бөлім", add: "Бетбелгі қосу", remove: "Бетбелгіні өшіру", note: "Менің жазбам", saved: "Сақталды", failed: "Браузерде сақтау мүмкін болмады. Сақталмаған мәтін басқа бетке өткенде немесе бетті жаңартқанда жоғалады.", bookmarks: "Менің бетбелгілерім", empty: "Әлі бетбелгі жоқ", open: "Бөлімді ашу" },
} as const;

export default function NotesContent({ language, moduleId }: { language: Language; moduleId: number }) {
  const [value, setValue] = useState<ModuleNotes>(emptyModuleNotes);
  const [selected, setSelected] = useState<Section>("theory");
  const [ready, setReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "failed">("idle");
  useEffect(() => { setReady(false); setSaveStatus("idle"); setValue(readModuleNotes(moduleId)); setReady(true); }, [moduleId]);
  const c = copy[language];
  const bookmarked = value.bookmarks.includes(selected);
  const update = (next: ModuleNotes) => { setValue(next); setSaveStatus(saveModuleNotes(moduleId,next) ? "saved" : "failed"); };
  return <article className={styles.tool}>
    <h1>{c.title}</h1><p>{c.intro}</p>
    <label htmlFor="notes-section">{c.pick}</label>
    <select id="notes-section" value={selected} onChange={event => { setSelected(event.target.value as Section); setSaveStatus("idle"); }}>
      {sectionOrder.map(section => <option key={section} value={section}>{getSectionTitle(section, language)}</option>)}
    </select>
    <div className={styles.row}>
      <button type="button" disabled={!ready} onClick={() => update({ ...value, bookmarks: bookmarked ? value.bookmarks.filter(item => item !== selected) : [...value.bookmarks, selected] })}>{bookmarked ? c.remove : c.add}</button>
      <Link href={`/modules/${moduleId}/${selected}?lang=${language}`}>{c.open}</Link>
    </div>
    <label htmlFor="section-note">{c.note}</label>
    <VoiceTextarea key={selected} language={language} id="section-note" disabled={!ready} maxLength={5000} rows={7} value={value.notes[selected] ?? ""} onValue={text => update({ ...value, notes: { ...value.notes, [selected]: text } })} />
    <p role="status" aria-live="polite">{ready && saveStatus !== "idle" ? c[saveStatus] : ""}</p>
    <h2>{c.bookmarks}</h2>
    {value.bookmarks.length ? <ul>{value.bookmarks.map(section => <li key={section}><Link href={`/modules/${moduleId}/${section}?lang=${language}`}>{getSectionTitle(section, language)}</Link></li>)}</ul> : <p>{c.empty}</p>}
  </article>;
}
