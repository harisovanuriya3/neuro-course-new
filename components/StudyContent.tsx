"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Language } from "../content/course";
import type { GlossaryLesson, PretestLesson, QuestionsLesson, ReadingLesson, StudyLesson, StudyLink } from "../content/study";
import { getSectionTitle } from "../content/sections";
import shared from "./PracticeContent.module.css";
import styles from "./StudyContent.module.css";
import { recordOutcome } from "../lib/courseProgress";

const labels = {
  RU: { check: "Проверить ответ", next: "Следующий вопрос", finish: "Диагностический результат", correct: "Верно", incorrect: "Нужно повторить", select: "Выберите один ответ", answer: "Ваш ответ", show: "Показать эталонное объяснение", hide: "Скрыть объяснение", gate: "Сначала запишите свой ответ.", search: "Поиск по термину или определению", empty: "Ничего не найдено. Измените запрос.", count: "Найдено терминов", restart: "Пройти заново", score: "Верных ответов", note: "Результат диагностический и не входит в итоговую оценку.", review: "Рекомендуем повторить", ready: "Базовые темы знакомы. Переходите к теории, чтобы уточнить и систематизировать знания.", related: "Связанные материалы", sources: "Внешние источники", result: "Объяснение" },
  KZ: { check: "Жауапты тексеру", next: "Келесі сұрақ", finish: "Диагностикалық нәтиже", correct: "Дұрыс", incorrect: "Қайталау қажет", select: "Бір жауапты таңдаңыз", answer: "Сіздің жауабыңыз", show: "Үлгі түсіндірмені көрсету", hide: "Түсіндірмені жасыру", gate: "Алдымен жауабыңызды жазыңыз.", search: "Термин немесе анықтама бойынша іздеу", empty: "Ештеңе табылмады. Сұрауды өзгертіңіз.", count: "Табылған терминдер", restart: "Қайта өту", score: "Дұрыс жауаптар", note: "Нәтиже диагностикалық сипатта және қорытынды бағаға кірмейді.", review: "Қайталауға ұсынамыз", ready: "Негізгі тақырыптар таныс. Білімді нақтылау және жүйелеу үшін теорияға өтіңіз.", related: "Байланысты материалдар", sources: "Сыртқы дереккөздер", result: "Түсіндірме" },
  EN: { check: "Check answer", next: "Next question", finish: "Diagnostic result", correct: "Correct", incorrect: "Review needed", select: "Choose one answer", answer: "Your answer", show: "Show model explanation", hide: "Hide explanation", gate: "Write your answer first.", search: "Search terms or definitions", empty: "No matches. Try another search.", count: "Terms found", restart: "Try again", score: "Correct answers", note: "This is a diagnostic result and does not contribute to a final grade.", review: "Recommended review", ready: "You recognise the basic topics. Continue to theory to refine and organise your knowledge.", related: "Related material", sources: "External sources", result: "Explanation" },
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
    {!checked ? <button className={shared.primary} data-action="check" disabled={selected === null} onClick={() => { if (selected !== null) setAnswers(previous => [...previous, selected]); }}>{ui.check}</button> : <><div role="status" className={selected === question.correctAnswer ? shared.success : shared.retry}><strong>{selected === question.correctAnswer ? ui.correct : ui.incorrect}</strong><p>{question.explanation}</p></div><p><MaterialLink target={question.target} {...context} /></p><button data-action="next" onClick={() => { setIndex(index + 1); setSelected(null); }}>{index + 1 === lesson.questions.length ? ui.finish : ui.next}</button></>}
  </section>;
}
function ReviewQuestion({ question, ...context }: Context & { question: QuestionsLesson["questions"][number] }) {
  const ui = labels[context.language];
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);
  return <section className={shared.card} id={question.id}><h2>{question.prompt}</h2><label className={shared.response} htmlFor={`${question.id}-answer`}>{ui.answer}</label><textarea id={`${question.id}-answer`} value={answer} rows={4} onChange={event => { setAnswer(event.target.value); setOpen(false); }} /><p id={`${question.id}-hint`} className={shared.note}>{ui.gate}</p><button aria-describedby={`${question.id}-hint`} aria-expanded={open} aria-controls={`${question.id}-explanation`} disabled={!answer.trim()} onClick={() => setOpen(!open)}>{open ? ui.hide : ui.show}</button><div id={`${question.id}-explanation`} hidden={!open} className={shared.answers}>{open && <><h3>{ui.result}</h3><p>{question.explanation}</p><MaterialLink target={question.target} {...context} /></>}</div></section>;
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
    case "questions": content = lesson.questions.map(question => <ReviewQuestion key={question.id} question={question} {...context} />); break;
    case "glossary": content = <Glossary lesson={lesson} {...context} />; break;
    case "objectives": case "one-minute": case "clinical": case "references": content = <Reading lesson={lesson} {...context} />; break;
    default: { const exhaustive: never = lesson; throw Error(`Unsupported study content: ${exhaustive}`); }
  }
  return <article className={`${shared.practice} ${styles.study}`} data-study={lesson.kind} lang={context.language === "KZ" ? "kk" : context.language.toLowerCase()}><h1>{lesson.title}</h1><p>{lesson.introduction}</p>{content}</article>;
}
