"use client";

import VoiceIcon from "./VoiceIcon";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import type { Language } from "../content/course";
import styles from "./VoiceTextarea.module.css";

type RecognitionResult = { isFinal: boolean; [index: number]: { transcript: string } };
type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: { resultIndex: number; results: ArrayLike<RecognitionResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
type RecognitionWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
const copy = {
  RU: { start: "Ответить голосом", stop: "Завершить диктовку", listen: "Слушаю…", ready: "Текст добавлен. Проверьте и исправьте его.", unsupported: "Диктовка недоступна в этом браузере. Введите текст вручную.", error: "Не удалось распознать речь. Проверьте микрофон, интернет и выбранный язык.", denied: "Разрешите доступ к микрофону в браузере или введите текст вручную.", note: "Распознавание выполняет браузер; он может передавать звук своему сервису. Текст можно исправить." },
  EN: { start: "Answer by voice", stop: "Finish dictation", listen: "Listening…", ready: "Text added. Review and correct it.", unsupported: "Dictation is unavailable in this browser. Type your answer.", error: "Speech could not be recognised. Check your microphone, connection and language.", denied: "Allow microphone access in the browser or type your answer.", note: "Your browser recognises speech and may send audio to its service. You can edit the text." },
  KZ: { start: "Дауыспен жауап беру", stop: "Диктантты аяқтау", listen: "Тыңдап жатырмын…", ready: "Мәтін қосылды. Тексеріп, түзетіңіз.", unsupported: "Бұл браузерде дауыспен енгізу қолжетімсіз. Жауапты жазыңыз.", error: "Сөйлеуді тану мүмкін болмады. Микрофонды, интернетті және тілді тексеріңіз.", denied: "Браузерде микрофонға рұқсат беріңіз немесе жауапты жазыңыз.", note: "Сөйлеуді браузер таниды және дыбысты өз қызметіне жіберуі мүмкін. Мәтінді түзете аласыз." },
} as const;
type Props = Omit<ComponentProps<"textarea">, "value" | "onChange" | "defaultValue"> & {
  language: Language; label?: string; value?: string; onValue?: (value: string) => void;
};

export default function VoiceTextarea({ language, label, value, onValue, id, disabled, maxLength, ...props }: Props) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [localValue, setLocalValue] = useState("");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState<"ready" | "error" | "denied" | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const currentValue = value ?? localValue;
  const callback = useRef({ currentValue, onValue });
  callback.current = { currentValue, onValue };
  const c = copy[language];
  useEffect(() => {
    const browser = window as RecognitionWindow;
    setListening(false);
    setMessage(null);
    setSupported(Boolean(browser.SpeechRecognition || browser.webkitSpeechRecognition));
    const cancel = () => recognition.current?.abort();
    window.addEventListener("neuro-dictation-stop", cancel);
    return () => {
      window.removeEventListener("neuro-dictation-stop", cancel);
      const active = recognition.current;
      if (active) { active.onresult = null; active.onerror = null; active.onend = null; active.abort(); }
      recognition.current = null;
    };
  }, [language]);
  useEffect(() => { if (disabled) { const active = recognition.current; recognition.current = null; active?.abort(); setListening(false); } }, [disabled]);
  function change(text: string) {
    const next = maxLength ? text.slice(0, maxLength) : text;
    if (callback.current.onValue) callback.current.onValue(next); else setLocalValue(next);
  }
  function start() {
    if (disabled) return;
    if (listening) { recognition.current?.stop(); return; }
    const browser = window as RecognitionWindow;
    const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Constructor) return;
    window.dispatchEvent(new Event("neuro-dictation-stop"));
    window.dispatchEvent(new Event("neuro-speech-stop"));
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    const instance = new Constructor();
    recognition.current = instance;
    instance.lang = { RU: "ru-RU", EN: "en-US", KZ: "kk-KZ" }[language];
    instance.continuous = false; instance.interimResults = false;
    setMessage(null);
    instance.onresult = event => {
      if (recognition.current !== instance) return;
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index++) if (event.results[index].isFinal) transcript += `${event.results[index][0].transcript} `;
      if (transcript.trim()) { change(`${callback.current.currentValue.trimEnd()}${callback.current.currentValue.trim() ? " " : ""}${transcript.trim()}`); setMessage("ready"); }
    };
    instance.onerror = event => { if (recognition.current === instance && event.error !== "aborted") setMessage(event.error === "not-allowed" || event.error === "service-not-allowed" ? "denied" : "error"); };
    instance.onend = () => { if (recognition.current === instance) { setListening(false); recognition.current = null; } };
    try { instance.start(); setListening(true); } catch { setMessage("error"); setListening(false); }
  }
  return <div className={styles.field} data-no-narration>
    {label && <label htmlFor={fieldId}>{label}</label>}
    <textarea {...props} id={fieldId} value={currentValue} disabled={disabled} maxLength={maxLength} onChange={event => change(event.target.value)} />
    {supported !== false && <button type="button" disabled={!supported || disabled} aria-pressed={listening} onClick={start}><VoiceIcon kind="microphone" />{listening ? c.stop : c.start}</button>}
    <p className={styles.note}>{supported === false ? c.unsupported : c.note}</p>
    <p role="status" aria-live="polite">{listening ? c.listen : message ? c[message] : ""}</p>
  </div>;
}
