"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import type { Language, PracticeBlock, PracticeLesson } from "../content/types";
import styles from "./PracticeContent.module.css";
import AIAuditPractice from "./AIAuditPractice";
import PracticeVisualMaterials from "./PracticeVisualMaterials";
import VoiceTextarea from "./VoiceTextarea";
import { recordOutcome } from "../lib/courseProgress";

type UI = PracticeLesson["ui"] & { hideAnswer: string };

const MIN_MEANINGFUL_CHARACTERS = 12;

const attemptCopy = {
  RU: { check: "Проверить ответ", ready: "Попытка сохранена. Теперь можно сравнить ответ с эталоном.", locked: "Сначала выполните задание и проверьте ответ.", short: "Введите не менее 12 содержательных букв или цифр." },
  EN: { check: "Check answer", ready: "Your attempt is saved. You may now compare it with the model answer.", locked: "Complete the task and check your answer first.", short: "Enter at least 12 meaningful letters or digits." },
  KZ: { check: "Жауапты тексеру", ready: "Талпынысыңыз сақталды. Енді жауабыңызды үлгімен салыстыруға болады.", locked: "Алдымен тапсырманы орындап, жауабыңызды тексеріңіз.", short: "Кемінде 12 мағыналы әріп немесе сан енгізіңіз." },
} as const;

function meaningfulLength(value: string) {
  return (value.match(/[\p{L}\p{N}]/gu) ?? []).length;
}

function isMeaningful(value: string) {
  return meaningfulLength(value) >= MIN_MEANINGFUL_CHARACTERS;
}

const hideAnswer = {
  RU: "Скрыть ответы и объяснения",
  KZ: "Жауаптар мен түсіндірмелерді жасыру",
  EN: "Hide answers and explanations",
};

function Disclosure({ children, ui, unlocked = true, lockedLabel }: { children: ReactNode; ui: UI; unlocked?: boolean; lockedLabel?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={styles.disclosure}>
      <button type="button" className={styles.answerButton} disabled={!unlocked} aria-expanded={unlocked ? open : false} aria-controls={id} aria-describedby={!unlocked ? `${id}-locked` : undefined} onClick={() => setOpen(!open)}>
        {open ? ui.hideAnswer : ui.showAnswer}
      </button>
      {!unlocked && <p id={`${id}-locked`} className={styles.note}>{lockedLabel}</p>}
      <div id={id} hidden={!unlocked || !open} className={styles.answers}>{children}</div>
    </div>
  );
}

function Answers({ items, ui, unlocked, lockedLabel }: { items: string[]; ui: UI; unlocked: boolean; lockedLabel: string }) {
  return (
    <Disclosure ui={ui} unlocked={unlocked} lockedLabel={lockedLabel}>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </Disclosure>
  );
}

function Sequence({ steps, ui, onComplete }: { steps: string[]; ui: UI; onComplete?: (done: boolean) => void }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");
  const [checked, setChecked] = useState(false);
  // A stable mixed order keeps server rendering and hydration consistent.
  const options = steps.map((_, index) => index);
  const mixed = [...options.filter((index) => index % 2 === 1).reverse(), ...options.filter((index) => index % 2 === 0).reverse()];

  function update(next: number[]) {
    setSelected(next);
    setFeedback("");
    setChecked(false);
    onComplete?.(false);
  }

  function check() {
    if (selected.length !== steps.length) return;
    setChecked(true);
    onComplete?.(true);
    setFeedback(selected.length !== steps.length
      ? ui.incomplete
      : selected.every((value, index) => value === index) ? ui.correct : ui.incorrect);
  }

  return (
    <div className={styles.sequence}>
      <p><strong>{ui.available}</strong></p>
      <div className={styles.options}>
        {mixed.map((index) => (
          <button type="button" key={index} disabled={selected.includes(index)} onClick={() => update([...selected, index])}>
            {steps[index]}
          </button>
        ))}
      </div>
      <p><strong>{ui.selected}</strong> ({selected.length}/{steps.length})</p>
      {selected.length ? <ol className={styles.chain}>{selected.map((index, position) => (
        <li key={index}>
          <span className={styles.chainCard}><span className={styles.number} aria-hidden="true">{position + 1}</span>{steps[index]}</span>
          {position < selected.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
        </li>
      ))}</ol> : <p className={styles.empty}>{ui.empty}</p>}
      <div className={styles.actions}>
        <button type="button" className={styles.primary} disabled={selected.length !== steps.length} onClick={check}>{ui.check}</button>
        <button type="button" disabled={!selected.length} onClick={() => update(selected.slice(0, -1))}>{ui.undo}</button>
        <button type="button" disabled={!selected.length} onClick={() => update([])}>{ui.reset}</button>
      </div>
      <p role="status" aria-live="polite" className={feedback ? (feedback === ui.correct ? styles.success : styles.retry) : styles.status}>{feedback}</p>
      {checked && <Disclosure ui={ui}>
        <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </Disclosure>}
    </div>
  );
}


function Classification({ block, ui, language, onComplete }: { block: Extract<PracticeBlock, { type: "classification" }>; ui: UI; language: Language; onComplete?: (done: boolean) => void }) {
  const [choices, setChoices] = useState<Record<number, number>>({});
  const [reasons, setReasons] = useState<[string, string]>(["", ""]);
  const [checked, setChecked] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const copy = {
    RU: { show: "Посмотреть правильный ответ", instruction: "Выберите ЦНС или ПНС для каждой структуры, затем обоснуйте обе группы.", check: "Проверить распределение", complete: "Сначала распределите все структуры и заполните оба обоснования.", correct: "Распределение верное.", retry: "Есть ошибки в распределении. Исправьте выделенные строки и проверьте снова." },
    EN: { show: "Show correct answer", instruction: "Assign each structure to the CNS or PNS, then justify both groups.", check: "Check classification", complete: "Classify every structure and complete both justifications first.", correct: "The classification is correct.", retry: "Some classifications are incorrect. Correct the marked rows and check again." },
    KZ: { show: "Дұрыс жауапты көру", instruction: "Әр құрылымды ОЖЖ немесе ШЖЖ тобына бөліп, екі топты да негіздеңіз.", check: "Бөлуді тексеру", complete: "Алдымен барлық құрылымды бөліп, екі негіздемені де толтырыңыз.", correct: "Бөлу дұрыс.", retry: "Бөлуде қателер бар. Белгіленген жолдарды түзетіп, қайта тексеріңіз." },
  }[language];
  const allChosen = block.items.every((_, index) => choices[index] === 0 || choices[index] === 1);
  const reasonsReady = reasons.every(isMeaningful);
  const ready = allChosen && reasonsReady;
  const allCorrect = block.items.every((item, index) => choices[index] === item.group);
  function choose(index: number, group: number) { setChoices(old => ({ ...old, [index]: group })); setChecked(false); setShowCorrect(false); onComplete?.(false); }
  function reason(index: 0 | 1, value: string) { setReasons(old => index === 0 ? [value, old[1]] : [old[0], value]); setChecked(false); setShowCorrect(false); onComplete?.(false); }
  return <div className={styles.sequence}>
    <p>{copy.instruction}</p>
    <div className={styles.tableScroll} role="region" tabIndex={0}>
      <table>
        <thead><tr><th scope="col"></th>{block.groups.map(group => <th scope="col" key={group}>{group}</th>)}</tr></thead>
        <tbody>{block.items.map((item, index) => {
          const wrong = checked && choices[index] !== item.group;
          return <tr key={item.label}>
            <th scope="row">{item.label}{wrong ? " ✕" : ""}</th>
            {block.groups.map((group, groupIndex) => <td key={group}>
              <label><input type="radio" name={`classification-${item.label}`} checked={choices[index] === groupIndex} onChange={() => choose(index, groupIndex)} /> <span>{group}</span></label>
            </td>)}
          </tr>;
        })}</tbody>
      </table>
    </div>
    {([0, 1] as const).map(index => <VoiceTextarea key={block.groups[index]} language={language} label={block.reasonLabels[index]} value={reasons[index]} onValue={(value) => reason(index, value)} rows={3} placeholder={ui.input} />)}
    <div className={styles.actions}><button type="button" className={styles.primary} disabled={!ready} onClick={() => { setChecked(true); onComplete?.(true); }}>{copy.check}</button></div>
    {!ready && <p className={styles.note}>{copy.complete}</p>}
    {checked && <p role="status" aria-live="polite" className={allCorrect ? styles.success : styles.retry}>{allCorrect ? copy.correct : copy.retry}</p>}
    {checked && !allCorrect && <div className={styles.actions}><button type="button" onClick={() => setShowCorrect(true)}>{copy.show}</button></div>}
    {checked && (allCorrect || showCorrect) && <Disclosure ui={ui}><ul>{block.answer.map(item => <li key={item}>{item}</li>)}</ul></Disclosure>}
  </div>;
}

function Worksheet({ block, ui, language, onComplete }: { block: Extract<PracticeBlock, { type: "table" }>; ui: UI; language: Language; onComplete?: (done: boolean) => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const c = attemptCopy[language];
  const keys = block.rows.flatMap(([structure]) => [1, 2].map((column) => `${structure}-${column}`));
  const ready = keys.every((key) => isMeaningful(values[key] ?? ""));
  function update(key: string, value: string) { setValues(old => ({ ...old, [key]: value })); setChecked(false); onComplete?.(false); }
  return (
    <>
      <div className={styles.tableScroll} role="region" aria-label={block.headers.join(" / ")} tabIndex={0}>
        <table>
          <thead><tr>{block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody>
            {block.rows.map(([structure]) => (
              <tr key={structure}>
                <th scope="row">{structure}</th>
                {[1, 2].map((column) => (
                  <td key={column}>
                    <VoiceTextarea language={language} aria-label={`${structure}: ${block.headers[column]}`} value={values[`${structure}-${column}`] ?? ""} onValue={(value) => update(`${structure}-${column}`, value)} rows={3} placeholder={ui.input} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.actions}><button type="button" className={styles.primary} disabled={!ready} onClick={() => { setChecked(true); onComplete?.(true); }}>{c.check}</button></div>
      {!ready && <p className={styles.note}>{c.short}</p>}
      {checked && <p role="status" aria-live="polite" className={styles.success}>{c.ready}</p>}
      {checked && <Disclosure ui={ui}>
        <dl>{block.rows.map(([structure, category, purpose]) => (
          <div key={structure}>
            <dt><strong>{structure}</strong></dt>
            <dd><strong>{block.headers[1]}:</strong> {category}<br /><strong>{block.headers[2]}:</strong> {purpose}</dd>
          </div>
        ))}</dl>
      </Disclosure>}
    </>
  );
}

function Block({ block, ui, language, moduleId, responseValue = "", onResponse, answersUnlocked = false, onComplete }: { block: PracticeBlock; ui: UI; language: Language; moduleId: string; responseValue?: string; onResponse?: (value: string) => void; answersUnlocked?: boolean; onComplete?: (done: boolean) => void }) {
  switch (block.type) {
    case "paragraph": return <p>{block.text}</p>;
    case "subheading": return <h3>{block.text}</h3>;
    case "list": return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "callout": return <aside className={styles.callout}><h3>{block.title}</h3><p>{block.text}</p></aside>;
    case "answer": return <Answers items={block.items} ui={ui} unlocked={answersUnlocked} lockedLabel={attemptCopy[language].locked} />;
    case "response": return <VoiceTextarea language={language} label={block.label} value={responseValue} onValue={onResponse} rows={4} placeholder={ui.input} />;
    case "sequence": return <Sequence steps={block.steps} ui={ui} onComplete={onComplete} />;
    case "table": return <Worksheet block={block} ui={ui} language={language} onComplete={onComplete} />;
    case "visual-materials": return <PracticeVisualMaterials language={language} />;
    case "classification": return <Classification block={block} ui={ui} language={language} onComplete={onComplete} />;
    case "checklist": return <div className={styles.checklist}>{block.items.map((item) => (
      <label key={item}><input type="checkbox" /> <span>{item}</span></label>
    ))}</div>;
    case "ai-audit": return <AIAuditPractice block={block} language={language} moduleId={moduleId} onComplete={onComplete} />;
  }
}

function PracticeSection({ section, ui, language, moduleId, index, total, onComplete }: { section: PracticeLesson["sections"][number]; ui: UI; language: Language; moduleId: string; index: number; total: number; onComplete: (value: boolean) => void }) {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [blockDone, setBlockDone] = useState<Record<number, boolean>>({});
  const responseIndexes = section.blocks.flatMap((block, index) => block.type === "response" ? [index] : []);
  const interactiveIndexes = section.blocks.flatMap((block, index) => ["sequence","table","classification","ai-audit"].includes(block.type) ? [index] : []);
  const hasAnswers = section.blocks.some((block) => block.type === "answer");
  const ready = responseIndexes.length > 0 && responseIndexes.every((index) => isMeaningful(responses[index] ?? ""));
  const c = attemptCopy[language];
  function update(index: number, value: string) { setResponses(old => ({ ...old, [index]: value })); setChecked(false); }
  function checkSection() { setChecked(true); }
  function markBlock(index: number, done: boolean) { setBlockDone(old => ({ ...old, [index]: done })); }
  const hasTextTask = hasAnswers && responseIndexes.length > 0;
  const textDone = !hasTextTask || checked;
  const interactiveDone = interactiveIndexes.every(index => blockDone[index]);
  const sectionHasTask = hasTextTask || interactiveIndexes.length > 0;
  const sectionDone = sectionHasTask && textDone && interactiveDone;
  useEffect(() => { onComplete(sectionDone); }, [sectionDone]);
  return <section className={styles.card}>
    <h2>{section.title}</h2>
    {section.blocks.map((block, index) => block.type === "answer" ? null : <Block key={index} block={block} ui={ui} language={language} moduleId={moduleId} responseValue={responses[index] ?? ""} onResponse={(value) => update(index, value)} answersUnlocked={checked} onComplete={(done) => markBlock(index, done)} />)}
    {hasAnswers && responseIndexes.length > 0 && <>
      <div className={styles.actions}><button type="button" className={styles.primary} disabled={!ready} onClick={checkSection}>{c.check}</button></div>
      {!ready && <p className={styles.note}>{c.short}</p>}
      {checked && <p role="status" aria-live="polite" className={styles.success}>{c.ready}</p>}
    </>}
    <div className={styles.taskProgress}><span>{language==="RU"?"Задание":language==="KZ"?"Тапсырма":"Task"}: <strong>{index + 1} / {total}</strong>{sectionDone ? (language==="RU"?" · выполнено":language==="KZ"?" · орындалды":" · completed") : ""}</span></div>
    {checked && section.blocks.map((block, index) => block.type === "answer" ? <Block key={index} block={block} ui={ui} language={language} moduleId={moduleId} answersUnlocked /> : null)}
  </section>;
}

export default function PracticeContent({ lesson, language, moduleId }: { lesson: PracticeLesson; language: Language; moduleId: string }) {
  const ui: UI = { ...lesson.ui, hideAnswer: hideAnswer[language] };
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const completedCount = Object.values(completed).filter(Boolean).length;
  function markComplete(index: number, value: boolean) {
    setCompleted(old => {
      const next = { ...old, [index]: value };
      const count = Object.values(next).filter(Boolean).length;
      recordOutcome(Number(moduleId), "practice", count, lesson.sections.length);
      return next;
    });
  }
  const progressLabel = language === "RU" ? "Выполнено практических заданий" : language === "KZ" ? "Орындалған практикалық тапсырмалар" : "Practice tasks completed";
  return (
    <article className={styles.practice}>
      <h1>{lesson.title}</h1>
      <p className={styles.note}>{lesson.ui.localNote}</p>
      <div className={styles.taskProgress}>
        <span>{progressLabel}: <strong>{completedCount} / {lesson.sections.length}</strong></span>
        <progress value={completedCount} max={lesson.sections.length} aria-label={progressLabel} />
      </div>
      {lesson.sections.map((section, index) => <PracticeSection key={section.title} section={section} ui={ui} language={language} moduleId={moduleId} index={index} total={lesson.sections.length} onComplete={(value) => markComplete(index, value)} />)}
    </article>
  );
}
