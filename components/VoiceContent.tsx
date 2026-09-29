"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import ru from "../content/modules/1/theory/ru";
import en from "../content/modules/1/theory/en";
import kz from "../content/modules/1/theory/kz";
import type { ContentBlock } from "../content/types";
import styles from "./ModuleTools.module.css";

const copy = {
  RU: { title: "Голосовое сопровождение", intro: "Прослушайте теорию модуля по разделам. Озвучивание выполняет голос вашего браузера; звучание зависит от доступных голосов.", select: "Фрагмент теории", rate: "Скорость", play: "Слушать", pause: "Пауза", resume: "Продолжить", stop: "Остановить", unsupported: "В этом браузере синтез речи недоступен. Текст можно прочитать ниже.", stopped: "Остановлено", playing: "Идёт озвучивание", paused: "Пауза", finished: "Фрагмент завершён", open: "Открыть в теории" },
  EN: { title: "Audio guide", intro: "Listen to module theory section by section. Your browser supplies the voice; quality depends on available voices.", select: "Theory section", rate: "Speed", play: "Listen", pause: "Pause", resume: "Resume", stop: "Stop", unsupported: "Speech synthesis is unavailable in this browser. You can read the text below.", stopped: "Stopped", playing: "Speaking", paused: "Paused", finished: "Section finished", open: "Open in theory" },
  KZ: { title: "Дауыстық сүйемелдеу", intro: "Модуль теориясын бөлімдер бойынша тыңдаңыз. Дауысты браузер қамтамасыз етеді; сапасы қолжетімді дауыстарға байланысты.", select: "Теория бөлімі", rate: "Жылдамдық", play: "Тыңдау", pause: "Үзіліс", resume: "Жалғастыру", stop: "Тоқтату", unsupported: "Бұл браузерде сөйлеу синтезі жоқ. Төмендегі мәтінді оқи аласыз.", stopped: "Тоқтатылды", playing: "Оқылып жатыр", paused: "Үзіліс", finished: "Бөлім аяқталды", open: "Теорияда ашу" },
} as const;
const locales = { RU: "ru-RU", EN: "en-US", KZ: "kk-KZ" };
function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "paragraph": case "subheading": return block.text;
    case "list": return block.items.join(". ");
    case "callout": return `${block.title}. ${block.text}`;
  }
}

export default function VoiceContent({ language }: { language: Language }) {
  const lesson = { RU: ru, EN: en, KZ: kz }[language];
  const c = copy[language];
  const [sectionIndex, setSectionIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [status, setStatus] = useState<"stopped" | "playing" | "paused" | "finished">("stopped");
  const [supported, setSupported] = useState(false);
  const run = useRef(0);
  useEffect(() => {
    setSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return () => { run.current++; if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, [language]);
  const section = lesson.sections[sectionIndex];
  const paragraphs = section.blocks.map(blockText);
  function stop() { run.current++; window.speechSynthesis.cancel(); setStatus("stopped"); }
  function play() {
    if (!supported) return;
    if (status === "paused") { window.speechSynthesis.resume(); setStatus("playing"); return; }
    stop();
    const current = run.current;
    const chunks = [section.title, ...paragraphs];
    const synthesis = window.speechSynthesis;
    let index = 0;
    const speakNext = () => {
      if (current !== run.current) return;
      if (index === chunks.length) { setStatus("finished"); return; }
      const utterance = new SpeechSynthesisUtterance(chunks[index++]);
      utterance.lang = locales[language]; utterance.rate = rate;
      utterance.onend = speakNext;
      utterance.onerror = () => { if (current === run.current) setStatus("stopped"); };
      synthesis.speak(utterance);
    };
    setStatus("playing"); speakNext();
  }
  return <article className={styles.tool}>
    <h1>{c.title}</h1><p>{c.intro}</p>
    <label htmlFor="voice-section">{c.select}</label>
    <select id="voice-section" value={sectionIndex} onChange={event => { if (supported) stop(); setSectionIndex(Number(event.target.value)); }}>
      {lesson.sections.map((item, index) => <option key={item.id ?? item.title} value={index}>{item.title}</option>)}
    </select>
    <label htmlFor="voice-rate">{c.rate}: {rate.toFixed(1)}×</label>
    <input id="voice-rate" type="range" min="0.7" max="1.3" step="0.1" value={rate} onChange={event => setRate(Number(event.target.value))} />
    <div className={styles.row}>
      <button type="button" disabled={!supported} onClick={play}>{status === "paused" ? c.resume : c.play}</button>
      <button type="button" disabled={!supported || status !== "playing"} onClick={() => { window.speechSynthesis.pause(); setStatus("paused"); }}>{c.pause}</button>
      <button type="button" disabled={!supported || status === "stopped"} onClick={stop}>{c.stop}</button>
    </div>
    <p role="status">{!supported ? c.unsupported : c[status]}</p>
    <h2>{section.title}</h2>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <Link href={`/modules/1/theory?lang=${language}${section.id ? `#${section.id}` : ""}`}>{c.open}</Link>
  </article>;
}
