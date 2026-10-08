"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Language } from "../content/course";
import type { GlossaryLesson, ObjectivesLesson, PretestLesson, QuestionsLesson, ReadingLesson, StudyLesson, StudyLink } from "../content/study";
import { getSectionTitle } from "../content/sections";
import shared from "./PracticeContent.module.css";
import styles from "./StudyContent.module.css";
import { recordOutcome } from "../lib/courseProgress";
import VoiceTextarea from "./VoiceTextarea";

const labels = {
  RU: { chooseFirst:"Сначала выберите один вариант ответа.", check: "Проверить ответ", next: "Следующий вопрос", finish: "Результат входной проверки", correct: "Верно", incorrect: "Здесь стоит повторить тему", select: "Выберите один ответ", answer: "Ответьте своими словами — текстом или голосом", show: "Показать пример объяснения", hide: "Скрыть объяснение", gate: "Сначала напишите короткий ответ своими словами, затем нажмите «Проверить ответ».", attempt: "Ответ сохранён. Теперь сравните его с примером объяснения.", search: "Поиск по термину или определению", empty: "Ничего не найдено. Измените запрос.", count: "Найдено терминов", restart: "Пройти заново", score: "Верных ответов", note: "Результат диагностический и не входит в итоговую оценку.", review: "Рекомендуем повторить", ready: "Базовые темы знакомы. Переходите к теории, чтобы уточнить и систематизировать знания.", related: "Связанные материалы", sources: "Внешние источники", result: "Объяснение" },
  KZ: { chooseFirst:"Алдымен бір жауап нұсқасын таңдаңыз.", check: "Жауапты тексеру", next: "Келесі сұрақ", finish: "Бастапқы тексеру нәтижесі", correct: "Дұрыс", incorrect: "Бұл тақырыпты қайталау керек", select: "Бір жауапты таңдаңыз", answer: "Өз сөзіңізбен жауап беріңіз — мәтінмен немесе дауыспен", show: "Түсіндіру үлгісін көрсету", hide: "Түсіндірмені жасыру", gate: "Алдымен қысқа жауап жазыңыз, содан кейін «Жауапты тексеру» батырмасын басыңыз.", attempt: "Жауап сақталды. Енді оны түсіндіру үлгісімен салыстырыңыз.", search: "Термин немесе анықтама бойынша іздеу", empty: "Ештеңе табылмады. Сұрауды өзгертіңіз.", count: "Табылған терминдер", restart: "Қайта өту", score: "Дұрыс жауаптар", note: "Нәтиже диагностикалық сипатта және қорытынды бағаға кірмейді.", review: "Қайталауға ұсынамыз", ready: "Негізгі тақырыптар таныс. Білімді нақтылау және жүйелеу үшін теорияға өтіңіз.", related: "Байланысты материалдар", sources: "Сыртқы дереккөздер", result: "Түсіндірме" },
  EN: { chooseFirst:"Select one answer option first.", check: "Check answer", next: "Next question", finish: "Entry check result", correct: "Correct", incorrect: "This topic needs another look", select: "Choose one answer", answer: "Answer in your own words — type or use voice", show: "Show an example explanation", hide: "Hide explanation", gate: "Write a short answer in your own words, then press “Check answer”.", attempt: "Your answer is saved. Now compare it with the example explanation.", search: "Search terms or definitions", empty: "No matches. Try another search.", count: "Terms found", restart: "Try again", score: "Correct answers", note: "This is a diagnostic result and does not contribute to a final grade.", review: "Recommended review", ready: "You recognise the basic topics. Continue to theory to refine and organise your knowledge.", related: "Related material", sources: "External sources", result: "Explanation" },
};
type Context = { moduleId: string; language: Language };
function RecordPretestResult({ correct, total, moduleId }: { correct: number; total: number; moduleId: string }) {
  useEffect(() => { recordOutcome(Number(moduleId), "pretest", correct, total); }, [correct, total, moduleId]);
  return null;
}
function MaterialLink({ target, moduleId, language }: Context & { target: StudyLink }) {
  return <Link href={`/modules/${moduleId}/${target.section}?lang=${language}${target.anchor ? `#${target.anchor}` : ""}`}>{getSectionTitle(target.section, language)}</Link>;
}
function Reading({ lesson, ...context }: Context & { lesson: ReadingLesson }) {
  const ui = labels[context.language];
  return <>{lesson.cards.map(card => <section className={shared.card} key={card.id} id={card.id}>
    <h2>{card.title}</h2>{card.paragraphs.map((text, index) => <p key={index}>{text}</p>)}
    <nav aria-label={ui.related} className={styles.links}>{card.links.map((target, index) => <MaterialLink key={index} target={target} {...context} />)}</nav>
  </section>)}
    {lesson.sources && <section><h2>{ui.sources}</h2>{lesson.sources.map((source, index) => <section className={shared.card} id={`source-${index + 1}`} key={source.href}><h3><a href={source.href}>{source.title}</a></h3><p>{source.description}</p><nav aria-label={ui.related} className={styles.links}>{source.links.map((target, index) => <MaterialLink key={index} target={target} {...context} />)}</nav></section>)}</section>}
  </>;
}
function Objectives({ lesson, ...context }: Context & { lesson: ObjectivesLesson }) {
  return <>
    <ol className={styles.objectives}>
      {lesson.outcomes.map(outcome => <li key={outcome.id} className={styles.objective}>
        <h2>{outcome.title}</h2>
        <p>{outcome.description}</p>
      </li>)}
    </ol>
    <nav className={styles.objectiveNavigation} aria-labelledby="objective-navigation-title">
      <h2 id="objective-navigation-title">{lesson.navigation.title}</h2>
      <div className={styles.objectiveLinks}>
        {lesson.navigation.links.map(target => <MaterialLink key={target.section} target={target} {...context} />)}
      </div>
    </nav>
  </>;
}
function Pretest({ lesson, ...context }: Context & { lesson: PretestLesson }) {
  const ui = labels[context.language];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [index]);
  const question = lesson.questions[index];
  if (!question) {
    const wrong = lesson.questions.filter((item, i) => item.correctAnswer !== answers[i]);
    return <section className={shared.card} data-testid="diagnostic-result"><RecordPretestResult moduleId={context.moduleId} correct={lesson.questions.length - wrong.length} total={lesson.questions.length} /><h2 ref={heading} tabIndex={-1}>{ui.finish}</h2><p>{ui.score}: {lesson.questions.length - wrong.length} / {lesson.questions.length}</p><p>{ui.note}</p>{wrong.length ? <><h3>{ui.review}</h3><ul>{wrong.map(item => <li key={item.id}>{item.topic}: <MaterialLink target={item.target} {...context} /></li>)}</ul></> : <p>{ui.ready}</p>}<p><MaterialLink target={{ section: "theory" }} {...context} /></p><button onClick={() => { setIndex(0); setSelected(null); setAnswers([]); }} data-action="restart">{ui.restart}</button></section>;
  }
  const checked = answers.length > index;
  return <section className={shared.card} data-testid="diagnostic-question">
    <p>{index + 1} / {lesson.questions.length}</p><h2 ref={heading} tabIndex={-1}>{question.prompt}</h2>
    <fieldset disabled={checked}><legend>{ui.select}</legend>{question.options.map(option => <label className={styles.option} key={option.id}><input type="radio" name={question.id} value={option.id} checked={selected === option.id} onChange={() => setSelected(option.id)} />{option.text}</label>)}</fieldset>
    {!checked ? <><button className={shared.primary} data-action="check" disabled={selected === null} aria-describedby={selected===null?"pretest-choice-hint":undefined} onClick={() => { if (selected !== null) setAnswers(previous => [...previous, selected]); }}>{ui.check}</button>{selected===null&&<p id="pretest-choice-hint" className={shared.note}>{ui.chooseFirst}</p>}</> : <><div role="status" className={selected === question.correctAnswer ? shared.success : shared.retry}><strong>{selected === question.correctAnswer ? ui.correct : ui.incorrect}</strong><p>{question.explanation}</p></div><p><MaterialLink target={question.target} {...context} /></p><button data-action="next" onClick={() => { setIndex(index + 1); setSelected(null); }}>{index + 1 === lesson.questions.length ? ui.finish : ui.next}</button></>}
  </section>;
}
function ReviewQuestion({ question, index, total, onComplete, ...context }: Context & { question: QuestionsLesson["questions"][number]; index: number; total: number; onComplete: (done: boolean) => void }) {
  const ui = labels[context.language];
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const meaningful = (answer.match(/[\p{L}\p{N}]/gu) ?? []).length >= 12;
  return <section className={shared.card} id={question.id}><p><strong>{context.language==="RU"?"Вопрос":context.language==="KZ"?"Сұрақ":"Question"}: {index + 1} / {total}{checked ? (context.language==="RU"?" · выполнено":context.language==="KZ"?" · орындалды":" · completed") : ""}</strong></p><h2>{question.prompt}</h2><VoiceTextarea language={context.language} label={ui.answer} id={`${question.id}-answer`} value={answer} rows={4} onValue={text => { setAnswer(text); setChecked(false); setOpen(false); onComplete(false); }} /><p id={`${question.id}-hint`} className={shared.note}>{checked ? ui.attempt : ui.gate}</p>{!checked ? <button className={shared.primary} aria-describedby={`${question.id}-hint`} disabled={!meaningful} onClick={() => { setChecked(true); onComplete(true); }}>{ui.check}</button> : <button aria-describedby={`${question.id}-hint`} aria-expanded={open} aria-controls={`${question.id}-explanation`} onClick={() => setOpen(!open)}>{open ? ui.hide : ui.show}</button>}<div id={`${question.id}-explanation`} hidden={!checked || !open} className={shared.answers}>{checked && open && <><h3>{ui.result}</h3><p>{question.explanation}</p><MaterialLink target={question.target} {...context} /></>}</div></section>;
}
function ReviewQuestions({ lesson, ...context }: Context & { lesson: QuestionsLesson }) {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const storageKey = `neuro-course:questions:${context.moduleId}:${context.language}:v1`;
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (!raw || typeof raw !== "object") return;
      const restored: Record<number, boolean> = {};
      for (const [key, value] of Object.entries(raw)) {
        const index = Number(key);
        if (Number.isInteger(index) && index >= 0 && index < lesson.questions.length && value === true) restored[index] = true;
      }
      setCompleted(restored);
    } catch { /* Optional local storage */ }
  }, [storageKey, lesson.questions.length]);
  const done = Object.values(completed).filter(Boolean).length;
  function mark(index: number, value: boolean) {
    setCompleted(old => {
      const next = { ...old, [index]: value };
      const count = Object.values(next).filter(Boolean).length;
      recordOutcome(Number(context.moduleId), "questions", count, lesson.questions.length);
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Optional local storage */ }
      return next;
    });
  }
  const label = context.language==="RU"?"Выполнено контрольных вопросов":context.language==="KZ"?"Орындалған бақылау сұрақтары":"Review questions completed";
  return <>
    <div className={shared.taskProgress}><span>{label}: <strong>{done} / {lesson.questions.length}</strong></span><progress value={done} max={lesson.questions.length} aria-label={label}/></div>
    {lesson.questions.map((question,index) => <ReviewQuestion key={question.id} question={question} index={index} total={lesson.questions.length} onComplete={(value)=>mark(index,value)} {...context} />)}
  </>;
}

function Glossary({ lesson, ...context }: Context & { lesson: GlossaryLesson }) {
  const ui = labels[context.language];
  const [search, setSearch] = useState("");
  const query = search.trim().normalize("NFKC").toLocaleLowerCase();
  const terms = lesson.terms.filter(item => `${item.term} ${item.definition}`.normalize("NFKC").toLocaleLowerCase().includes(query));
  return <><label htmlFor="glossary-search">{ui.search}</label><input id="glossary-search" className={styles.search} type="search" value={search} onChange={event => setSearch(event.target.value)} /><p role="status">{ui.count}: {terms.length}</p>{terms.length ? <dl>{terms.map(item => <div key={item.id} id={item.id} className={shared.card}><dt><strong>{item.term}</strong></dt><dd className={styles.definition}><p>{item.definition}</p><MaterialLink target={item.target} {...context} /></dd></div>)}</dl> : <p>{ui.empty}</p>}</>;
}
export default function StudyContent({ lesson, ...context }: Context & { lesson: StudyLesson }) {
  let content;
  switch (lesson.kind) {
    case "pretest": content = <Pretest lesson={lesson} {...context} />; break;
    case "questions": content = <ReviewQuestions lesson={lesson} {...context} />; break;
    case "glossary": content = <Glossary lesson={lesson} {...context} />; break;
    case "objectives": content = <Objectives lesson={lesson} {...context} />; break;
    case "one-minute": case "clinical": case "references": content = <Reading lesson={lesson} {...context} />; break;
    default: { const exhaustive: never = lesson; throw Error(`Unsupported study content: ${exhaustive}`); }
  }
  return <article className={`${shared.practice} ${styles.study}`} data-study={lesson.kind} lang={context.language === "KZ" ? "kk" : context.language.toLowerCase()}><h1>{lesson.title}</h1><p>{lesson.introduction}</p>{content}</article>;
}
