"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Language } from "../content/course";
import { languageVoices, speechChunks, speechLocales } from "../lib/speech";
import styles from "./PageVoiceTools.module.css";

const copy = {
  RU: { play: "Слушать страницу", pause: "Пауза", resume: "Продолжить", stop: "Стоп", settings: "Голос и громкость", voice: "Голос", volume: "Громкость", rate: "Скорость", reload: "Проверить голоса", checking: "Проверяю доступные голоса…", unavailable: "В этом браузере озвучка недоступна.", missing: "Голос этого языка в браузере не найден. Проверьте список голосов в настройках ниже.", failed: "Не удалось запустить озвучку. Выберите другой голос и попробуйте снова.", empty: "На странице пока нет доступного текста для чтения.", playing: "Читаю страницу", paused: "Озвучка на паузе", finished: "Чтение завершено", stopped: "Озвучка остановлена", hint: "Можно выбрать другой голос. На 100% громкость озвучивания максимальна; общая громкость регулируется на компьютере." },
  EN: { play: "Listen to page", pause: "Pause", resume: "Resume", stop: "Stop", settings: "Voice and volume", voice: "Voice", volume: "Volume", rate: "Speed", reload: "Check voices", checking: "Checking available voices…", unavailable: "Speech playback is unavailable in this browser.", missing: "No voice for this language was found in the browser. Check the voice list in the settings below.", failed: "Speech playback failed. Choose another voice and try again.", empty: "No readable page text is available yet.", playing: "Reading page", paused: "Playback paused", finished: "Reading complete", stopped: "Playback stopped", hint: "You can choose another voice. 100% is the maximum speech volume; your computer controls the overall volume." },
  KZ: { play: "Бетті тыңдау", pause: "Үзіліс", resume: "Жалғастыру", stop: "Тоқтату", settings: "Дауыс және дыбыс деңгейі", voice: "Дауыс", volume: "Дыбыс деңгейі", rate: "Жылдамдық", reload: "Дауыстарды тексеру", checking: "Қолжетімді дауыстар тексерілуде…", unavailable: "Бұл браузерде дауыстап оқу қолжетімсіз.", missing: "Браузерде осы тілдегі дауыс табылмады. Төмендегі баптауларда дауыстар тізімін тексеріңіз.", failed: "Дауыстап оқу іске қосылмады. Басқа дауысты таңдап, қайта көріңіз.", empty: "Әзірге оқуға қолжетімді мәтін жоқ.", playing: "Бет оқылып жатыр", paused: "Оқу үзілісте", finished: "Оқу аяқталды", stopped: "Оқу тоқтатылды", hint: "Басқа дауысты таңдауға болады. 100% — оқудың ең жоғары дыбыс деңгейі; жалпы дыбыс компьютерде реттеледі." },
} as const;
type Status = "stopped" | "playing" | "paused" | "finished" | "failed" | "empty";
const preferencesKey = "neuro-course:speech-settings:v1";
const fallbackCopy = {
  RU: "Для казахского используется запасной голос; произношение может быть с акцентом.",
  EN: "A fallback voice is used for Kazakh; pronunciation may have an accent.",
  KZ: "Қазақша мәтін қосалқы дауыспен оқылады; айтылымда акцент болуы мүмкін.",
} as const;

export default function SpeechPlayer({ language, getText, playLabel }: { language: Language; getText: () => string[]; playLabel?: string }) {
  const id = useId();
  const c = copy[language];
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voicesReady, setVoicesReady] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [status, setStatus] = useState<Status>("stopped");
  const run = useRef(0);
  const active = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(() => {
    setStatus("stopped"); setVoicesReady(false); setVoiceURI(""); setRate(1); setVolume(1);
    try {
      const saved = JSON.parse(localStorage.getItem(preferencesKey) || "{}")[language];
      if (saved) {
        if (typeof saved.voiceURI === "string") setVoiceURI(saved.voiceURI);
        if (typeof saved.rate === "number" && saved.rate >= .7 && saved.rate <= 1.3) setRate(saved.rate);
        if (typeof saved.volume === "number" && saved.volume >= 0 && saved.volume <= 1) setVolume(saved.volume);
      }
    } catch { /* Use defaults if settings are unavailable. */ }
    const available = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSupported(available);
    if (!available) return;
    const synth = window.speechSynthesis;
    const load = (final = false) => { const list = synth.getVoices(); setVoices(list); if (list.length || final) setVoicesReady(true); };
    const changed = () => load();
    const cancel = () => { run.current++; synth.cancel(); active.current = null; setStatus("stopped"); };
    const settingsChanged = (event: Event) => {
      const detail = (event as CustomEvent<{ language: Language; next: { voiceURI: string; rate: number; volume: number } }>).detail;
      if (detail?.language === language) { setVoiceURI(detail.next.voiceURI); setRate(detail.next.rate); setVolume(detail.next.volume); }
    };
    load();
    const timers = [250, 1000, 2500].map(ms => window.setTimeout(() => load(ms === 2500), ms));
    synth.addEventListener("voiceschanged", changed);
    window.addEventListener("neuro-speech-stop", cancel);
    window.addEventListener("neuro-speech-settings", settingsChanged);
    return () => { run.current++; synth.cancel(); active.current = null; timers.forEach(window.clearTimeout); synth.removeEventListener("voiceschanged", changed); window.removeEventListener("neuro-speech-stop", cancel); window.removeEventListener("neuro-speech-settings", settingsChanged); };
  }, [language]);
  const nativeVoices = languageVoices(voices, language);
  const fallback = language === "KZ" && !nativeVoices.length;
  const russianVoices = fallback ? languageVoices(voices, "RU") : [];
  const options = fallback ? [...russianVoices, ...voices.filter(voice => !russianVoices.includes(voice))] : nativeVoices;
  const selected = options.find(voice => voice.voiceURI === voiceURI) ?? options[0];
  const canPlay = Boolean(supported && voicesReady && (selected || fallback));
  function save(next: { voiceURI: string; volume: number; rate: number }) {
    try { const saved = JSON.parse(localStorage.getItem(preferencesKey) || "{}"); localStorage.setItem(preferencesKey, JSON.stringify({ ...saved, [language]: next })); } catch { /* Playback does not require storage. */ }
    window.dispatchEvent(new CustomEvent("neuro-speech-settings", { detail: { language, next } }));
  }
  function stop() { run.current++; if (supported) window.speechSynthesis.cancel(); active.current = null; setStatus("stopped"); }
  function play() {
    if (!canPlay || volume === 0) return;
    if (status === "paused") { window.speechSynthesis.resume(); setStatus("playing"); return; }
    window.dispatchEvent(new Event("neuro-dictation-stop"));
    window.dispatchEvent(new Event("neuro-speech-stop"));
    stop();
    const token = run.current;
    const chunks = speechChunks(getText());
    if (!chunks.length) { setStatus("empty"); return; }
    let index = 0;
    const next = () => {
      if (token !== run.current) return;
      if (index >= chunks.length) { active.current = null; setStatus("finished"); return; }
      const utterance = new SpeechSynthesisUtterance(chunks[index++]);
      active.current = utterance;
      if (selected) utterance.voice = selected;
      utterance.lang = fallback ? selected?.lang ?? "ru-RU" : speechLocales[language]; utterance.volume = volume; utterance.rate = rate;
      utterance.onend = next;
      utterance.onerror = () => { if (token === run.current) { active.current = null; setStatus("failed"); } };
      window.speechSynthesis.speak(utterance);
    };
    save({ voiceURI: selected?.voiceURI ?? "", volume, rate });
    setStatus("playing"); next();
  }
  return <div className={styles.player} data-no-narration>
    <div className={styles.actions}>
      <button type="button" disabled={!canPlay || volume === 0} onClick={play}>{status === "paused" ? c.resume : playLabel ?? c.play}</button>
      <button type="button" disabled={status !== "playing"} onClick={() => { window.speechSynthesis.pause(); setStatus("paused"); }}>{c.pause}</button>
      <button type="button" disabled={status !== "playing" && status !== "paused"} onClick={stop}>{c.stop}</button>
    </div>
    <p role="status" aria-live="polite">{supported === null || supported && !voicesReady ? c.checking : !supported ? c.unavailable : !selected && !fallback ? c.missing : status === "stopped" ? "" : c[status]}</p>
    {supported && voicesReady && fallback && <p>{fallbackCopy[language]}</p>}
    <details className={styles.settings}>
      <summary>{c.settings}</summary>
      <label htmlFor={`${id}-voice`}>{c.voice}</label>
      <select id={`${id}-voice`} disabled={!options.length} value={selected?.voiceURI ?? ""} onChange={event => { stop(); setVoiceURI(event.target.value); save({ voiceURI: event.target.value, volume, rate }); }}>
        {!options.length && <option value="">—</option>}
        {options.map(voice => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}
      </select>
      <button type="button" disabled={!supported} onClick={() => { const list = window.speechSynthesis.getVoices(); setVoices(list); setVoicesReady(true); }}>{c.reload}</button>
      <label htmlFor={`${id}-volume`}>{c.volume}: {Math.round(volume * 100)}%</label>
      <input id={`${id}-volume`} type="range" min="0" max="1" step=".05" value={volume} onChange={event => { stop(); const next = Number(event.target.value); setVolume(next); save({ voiceURI: selected?.voiceURI ?? "", volume: next, rate }); }} />
      <label htmlFor={`${id}-rate`}>{c.rate}: {rate.toFixed(1)}×</label>
      <input id={`${id}-rate`} type="range" min=".7" max="1.3" step=".1" value={rate} onChange={event => { stop(); const next = Number(event.target.value); setRate(next); save({ voiceURI: selected?.voiceURI ?? "", volume, rate: next }); }} />
      <p>{c.hint}</p>
    </details>
  </div>;
}
