"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Language } from "../content/course";
import type { SearchResult } from "../lib/courseSearch";
import { newTimer, remainingTime, restoreTimer, TIMER_KEY, type TimerState } from "../lib/studyTimer";
import styles from "./StudyToolbar.module.css";

const copy = {
  RU: { tools: "Инструменты учебника", search: "Поиск по учебнику", placeholder: "Тема, термин или фраза", hint: "Введите от 2 символов. Поиск по материалам на выбранном языке; показаны первые 40 совпадений.", close: "Закрыть", loading: "Поиск…", empty: "Совпадений нет. Попробуйте другой термин.", error: "Не удалось выполнить поиск. Измените запрос, чтобы повторить.", clock: "Местное время", timer: "Учебный таймер", minutes: "Минуты", start: "Запустить", pause: "Пауза", resume: "Продолжить", reset: "Сбросить", done: "Занятие завершено. Время сделать перерыв!", storage: "Браузер не разрешает сохранение: таймер работает до перезагрузки страницы.", results: "Результаты поиска" },
  KZ: { tools: "Оқулық құралдары", search: "Оқулықтан іздеу", placeholder: "Тақырып, термин немесе сөз тіркесі", hint: "Кемінде 2 таңба енгізіңіз. Таңдалған тілдегі материалдардан іздеу; алғашқы 40 нәтиже көрсетіледі.", close: "Жабу", loading: "Іздеу…", empty: "Сәйкестік табылмады. Басқа терминді енгізіңіз.", error: "Іздеу орындалмады. Қайталау үшін сұрауды өзгертіңіз.", clock: "Жергілікті уақыт", timer: "Оқу таймері", minutes: "Минут", start: "Бастау", pause: "Кідірту", resume: "Жалғастыру", reset: "Қалпына келтіру", done: "Оқу уақыты аяқталды. Үзіліс жасаңыз!", storage: "Браузер сақтауға рұқсат бермейді: таймер бет қайта жүктелгенге дейін жұмыс істейді.", results: "Іздеу нәтижелері" },
  EN: { tools: "Study tools", search: "Search textbook", placeholder: "Topic, term or phrase", hint: "Enter at least 2 characters. Searches materials in the selected language; shows the first 40 matches.", close: "Close", loading: "Searching…", empty: "No matches. Try another term.", error: "Search failed. Change the query to retry.", clock: "Local time", timer: "Study timer", minutes: "Minutes", start: "Start", pause: "Pause", resume: "Resume", reset: "Reset", done: "Study session complete. Time for a break!", storage: "Browser storage is unavailable: the timer will work until the page reloads.", results: "Search results" },
};
function highlight(text: string, query: string) {
  const terms = [...new Set(query.trim().split(/\s+/).filter(Boolean))];
  if (!terms.length) return text;
  const pattern = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[её]/gi, "[её]")).join("|");
  return text.split(new RegExp(`(${pattern})`, "giu")).map((part, index) => index % 2 ? <mark key={index}>{part}</mark> : part);
}
function formatTime(milliseconds: number) {
  const seconds = Math.ceil(milliseconds / 1000);
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}
export default function StudyToolbar() {
  const params = useSearchParams();
  const pathname = usePathname();
  const language: Language = params.get("lang") === "KZ" ? "KZ" : params.get("lang") === "EN" ? "EN" : "RU";
  const t = copy[language];
  const [panel, setPanel] = useState<"search" | "timer" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [timer, setTimer] = useState<TimerState>(newTimer);
  const [now, setNow] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [minutes, setMinutes] = useState("25");

  useEffect(() => {
    try {
      const saved = restoreTimer(localStorage.getItem(TIMER_KEY));
      setTimer(saved); setMinutes(String(saved.duration / 60000));
    } catch { setStorageError(true); }
    setNow(Date.now()); setReady(true);
    const interval = window.setInterval(() => setNow(Date.now()), 500);
    const sync = () => setNow(Date.now());
    document.addEventListener("visibilitychange", sync);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", sync); };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(TIMER_KEY, JSON.stringify(timer)); } catch { setStorageError(true); }
  }, [timer, ready]);
  useEffect(() => {
    if (now !== null && timer.deadline !== null && remainingTime(timer, now) === 0) {
      setTimer(previous => ({ ...previous, remaining: 0, deadline: null, finished: true }));
    }
  }, [now, timer]);
  useEffect(() => {
    if (panel) { dialog.current?.showModal(); if (panel === "search") searchInput.current?.focus(); }
    else dialog.current?.close();
  }, [panel]);
  useEffect(() => { setPanel(null); }, [pathname, language]);
  useEffect(() => {
    if (panel !== "search" || query.trim().length < 2) { setResults([]); setStatus("idle"); return; }
    const controller = new AbortController();
    setResults([]); setStatus("loading");
    const delay = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${language}`, { signal: controller.signal });
        if (!response.ok) throw new Error("search");
        const data = await response.json();
        if (!controller.signal.aborted) { setResults(data.results); setStatus("ready"); }
      } catch { if (!controller.signal.aborted) setStatus("error"); }
    }, 200);
    return () => { clearTimeout(delay); controller.abort(); };
  }, [query, language, panel]);

  const remaining = now === null ? timer.remaining : remainingTime(timer, now);
  const validMinutes = Number.isInteger(Number(minutes)) && Number(minutes) >= 1 && Number(minutes) <= 180;
  function chooseMinutes(value: number) { setMinutes(String(value)); setTimer(newTimer(value)); }
  function toggleTimer() {
    const timestamp = Date.now();
    setNow(timestamp);
    setTimer(previous => previous.deadline !== null
      ? { ...previous, deadline: null, remaining: remainingTime(previous, timestamp) }
      : { ...previous, remaining: previous.remaining || previous.duration, deadline: timestamp + (previous.remaining || previous.duration), finished: false });
  }
  if (pathname === "/login") return null;
  return <>
    <nav className={styles.toolbar} aria-label={t.tools}>
      <button type="button" onClick={() => setPanel("search")} aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m15 15 6 6" stroke="currentColor" strokeWidth="2"/></svg>{t.search}
      </button>
      <time aria-label={t.clock}>{now === null ? "--:--" : new Intl.DateTimeFormat(language === "KZ" ? "kk-KZ" : language === "RU" ? "ru-RU" : "en-GB", { hour: "2-digit", minute: "2-digit" }).format(now)}</time>
      <button type="button" onClick={() => setPanel("timer")} aria-haspopup="dialog">{t.timer} · {formatTime(remaining)}</button>
    </nav>
    <div role="status" className={timer.finished ? styles.notice : undefined}>{timer.finished ? t.done : ""}</div>
    <dialog ref={dialog} className={styles.dialog} onCancel={() => setPanel(null)} onClose={() => setPanel(null)} aria-labelledby="study-tool-title">
      <header className={styles.heading}><h2 id="study-tool-title">{panel === "search" ? t.search : t.timer}</h2><button type="button" onClick={() => setPanel(null)}>{t.close}</button></header>
      {panel === "search" ? <>
        <label className={styles.label}>{t.placeholder}<input ref={searchInput} type="search" maxLength={160} value={query} onChange={event => setQuery(event.target.value)} aria-describedby="study-search-hint"/></label>
        <p id="study-search-hint">{t.hint}</p>
        <p role="status">{status === "loading" ? t.loading : status === "error" ? t.error : status === "ready" && !results.length ? t.empty : ""}</p>
        <ul className={styles.results} aria-label={t.results}>{results.map(result => <li key={result.href}>
          <Link href={result.href} onClick={() => setPanel(null)}><strong>{highlight(result.title, query)}</strong><small>{highlight(result.moduleTitle, query)}</small><span>{highlight(result.excerpt, query)}</span></Link>
        </li>)}</ul>
      </> : <>
        <p className={styles.countdown} role="timer" aria-label={t.timer}>{formatTime(remaining)}</p>
        <div className={styles.actions}>{[5, 15, 25, 45].map(value => <button type="button" key={value} disabled={!ready || timer.deadline !== null} onClick={() => chooseMinutes(value)}>{value} {t.minutes.toLowerCase()}</button>)}</div>
        <label className={styles.label}>{t.minutes} (1–180)<input type="number" min="1" max="180" step="1" value={minutes} disabled={!ready || timer.deadline !== null} onChange={event => {
          const value = event.target.value; setMinutes(value);
          if (Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 180) setTimer(newTimer(Number(value)));
        }} aria-invalid={!validMinutes}/></label>
        <div className={styles.actions}>
          <button type="button" disabled={!ready || !validMinutes} onClick={toggleTimer}>{timer.deadline !== null ? t.pause : timer.remaining < timer.duration && !timer.finished ? t.resume : t.start}</button>
          <button type="button" disabled={!ready} onClick={() => chooseMinutes(timer.duration / 60000)}>{t.reset}</button>
        </div>
        {storageError && <p role="status">{t.storage}</p>}
      </>}
    </dialog>
  </>;
}
