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
const audioCopy = {
  RU: { volume: "Громкость", voice: "Голос", noVoice: "В браузере нет голоса выбранного языка. Для казахского нужен голос с языком kk-KZ; голос другого языка не будет подставлен. Для устойчивого произношения можно добавить запись диктора.", maximum: "100% — максимум озвучивания. Если звук тихий, увеличьте громкость браузера в микшере компьютера.", error: "Не удалось воспроизвести голос. Выберите другой голос и попробуйте снова." },
  EN: { volume: "Volume", voice: "Voice", noVoice: "This browser has no voice for the selected language. Kazakh needs a kk-KZ voice; a different language will not be substituted. A narrator recording can provide consistent pronunciation.", maximum: "100% is the maximum speech volume. If it is quiet, increase the browser volume in your computer's sound mixer.", error: "The voice could not be played. Select another voice and try again." },
  KZ: { volume: "Дыбыс деңгейі", voice: "Дауыс", noVoice: "Браузерде таңдалған тілдегі дауыс жоқ. Қазақша оқу үшін kk-KZ дауысы қажет; басқа тілдегі дауыс қолданылмайды. Тұрақты айтылым үшін диктор жазбасын қосуға болады.", maximum: "100% — оқудың ең жоғары дыбыс деңгейі. Дыбыс бәсең болса, компьютердің дыбыс микшерінде браузердің дыбысын көтеріңіз.", error: "Дауысты ойнату мүмкін болмады. Басқа дауысты таңдап, қайта көріңіз." },
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
  const c = copy[language];
  const [sectionIndex, setSectionIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState<"stopped" | "playing" | "paused" | "finished">("stopped");
  const [supported, setSupported] = useState(false);
  const run = useRef(0);
  const activeUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(() => {
    const available = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSupported(available);
    if (!available) return;
    const synthesis = window.speechSynthesis;
    const loadVoices = () => setVoices(synthesis.getVoices());
    loadVoices();
    synthesis.addEventListener("voiceschanged", loadVoices);
    return () => { run.current++; synthesis.cancel(); activeUtterance.current = null; synthesis.removeEventListener("voiceschanged", loadVoices); };
  }, [language]);
  const a = audioCopy[language];
  const languageCode = locales[language].split("-")[0];
  const matchingVoices = voices.filter(voice => voice.lang.toLowerCase().replace(/_/g, "-").split("-")[0] === languageCode);
  const selectedVoice = matchingVoices.find(voice => voice.voiceURI === voiceURI) ?? matchingVoices.find(voice => voice.default) ?? matchingVoices[0];
  const section = lesson.sections[sectionIndex];
  const paragraphs = section.blocks.map(blockText);
  function stop() { run.current++; if (supported) window.speechSynthesis.cancel(); activeUtterance.current = null; setStatus("stopped"); setFailed(false); }
  function play() {
    if (!supported || !selectedVoice) return;
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
      activeUtterance.current = utterance;
      utterance.lang = locales[language]; utterance.voice = selectedVoice; utterance.rate = rate; utterance.volume = volume;
      utterance.onend = speakNext;
      utterance.onerror = () => { if (current === run.current) { setStatus("stopped"); setFailed(true); activeUtterance.current = null; } };
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
    <label htmlFor="voice-choice">{a.voice}</label>
    <select id="voice-choice" disabled={!supported || !matchingVoices.length} value={selectedVoice?.voiceURI ?? ""} onChange={event => { stop(); setVoiceURI(event.target.value); }}>
      {!matchingVoices.length && <option value="">—</option>}
      {matchingVoices.map(voice => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}
    </select>
    {supported && !selectedVoice && <p role="status">{a.noVoice}</p>}
    <label htmlFor="voice-volume">{a.volume}: {Math.round(volume * 100)}%</label>
    <input id="voice-volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={event => { stop(); setVolume(Number(event.target.value)); }} />
    <p>{a.maximum}</p>
    <label htmlFor="voice-rate">{c.rate}: {rate.toFixed(1)}×</label>
    <input id="voice-rate" type="range" min="0.7" max="1.3" step="0.1" value={rate} onChange={event => { stop(); setRate(Number(event.target.value)); }} />
    <div className={styles.row}>
      <button type="button" disabled={!supported || !selectedVoice || volume === 0} onClick={play}>{status === "paused" ? c.resume : c.play}</button>
      <button type="button" disabled={!supported || status !== "playing"} onClick={() => { window.speechSynthesis.pause(); setStatus("paused"); }}>{c.pause}</button>
      <button type="button" disabled={!supported || status === "stopped"} onClick={stop}>{c.stop}</button>
    </div>
    <p role="status">{!supported ? c.unsupported : failed ? a.error : c[status]}</p>
    <h2>{section.title}</h2>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <Link href={`/modules/1/theory?lang=${language}${section.id ? `#${section.id}` : ""}`}>{c.open}</Link>
  </article>;
}
