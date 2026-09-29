"use client";

import { useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import ru from "../content/modules/1/theory/ru";
import en from "../content/modules/1/theory/en";
import kz from "../content/modules/1/theory/kz";
import type { ContentBlock } from "../content/types";
import SpeechPlayer from "./SpeechPlayer";
import styles from "./ModuleTools.module.css";

const copy = {
  RU: { title: "Голосовое сопровождение", intro: "Здесь можно отдельно прослушать фрагмент теории. Кнопки озвучки и голосового ввода также доступны вверху каждой страницы модуля.", select: "Фрагмент теории", play: "Слушать фрагмент", open: "Открыть в теории" },
  EN: { title: "Audio guide", intro: "Listen to an individual theory section here. Playback and voice input are also available at the top of every module page.", select: "Theory section", play: "Listen to section", open: "Open in theory" },
  KZ: { title: "Дауыстық сүйемелдеу", intro: "Мұнда теорияның жеке бөлімін тыңдай аласыз. Оқу және дауыспен енгізу батырмалары модульдің әр бетінің жоғарғы жағында да бар.", select: "Теория бөлімі", play: "Бөлімді тыңдау", open: "Теорияда ашу" },
} as const;
function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "paragraph": case "subheading": return block.text;
    case "list": return block.items.join(". ");
    case "callout": return `${block.title}. ${block.text}`;
  }
}
export default function VoiceContent({ language }: { language: Language }) {
  const lesson = { RU: ru, EN: en, KZ: kz }[language];
  const [sectionIndex, setSectionIndex] = useState(0);
  const section = lesson.sections[sectionIndex];
  const paragraphs = section.blocks.map(blockText);
  const c = copy[language];
  return <article className={styles.tool}>
    <h1>{c.title}</h1><p>{c.intro}</p>
    <label htmlFor="voice-section">{c.select}</label>
    <select id="voice-section" value={sectionIndex} onChange={event => { window.dispatchEvent(new Event("neuro-speech-stop")); setSectionIndex(Number(event.target.value)); }}>
      {lesson.sections.map((item, index) => <option key={item.id ?? item.title} value={index}>{item.title}</option>)}
    </select>
    <SpeechPlayer language={language} getText={() => [section.title, ...paragraphs]} playLabel={c.play} />
    <h2>{section.title}</h2>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <Link href={`/modules/1/theory?lang=${language}${section.id ? `#${section.id}` : ""}`}>{c.open}</Link>
  </article>;
}
