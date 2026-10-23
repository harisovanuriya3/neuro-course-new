"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import { getSectionTitle, sectionOrder, type Section } from "../content/sections";
import { emptyModuleNotes, readModuleNotes, saveModuleNotes, type ModuleNotes } from "../lib/moduleNotes";
import styles from "./ModuleTools.module.css";
import VoiceTextarea from "./VoiceTextarea";

const copy = {
  RU: { title: "Закладки и заметки", intro: "Сохраняйте ссылки на разделы модуля и свои заметки. Данные сохраняются в профиле этого браузера и могут быть видны другим людям на общем устройстве. Не записывайте персональные данные пациентов.", pick: "Раздел", add: "Добавить закладку", remove: "Убрать закладку", note: "Моя заметка", saved: "Сохранено в этом браузере (не оценено)", clear: "Очистить заметки и закладки модуля", confirmClear: "Очистить все заметки и закладки этого модуля в данном браузере? Это действие нельзя отменить.", cleared: "Заметки и закладки этого модуля очищены.", failed: "Не удалось сохранить в браузере. Несохранённый текст пропадёт при переходе на другую страницу или обновлении.", bookmarks: "Мои закладки", empty: "Закладок пока нет", open: "Открыть раздел" },
  EN: { title: "Bookmarks and notes", intro: "Save module section links and your notes. Data is stored in this browser profile and may be visible to others on a shared device. Do not enter identifiable patient information.", pick: "Section", add: "Add bookmark", remove: "Remove bookmark", note: "My note", saved: "Saved in this browser (not graded)", clear: "Clear this module’s notes and bookmarks", confirmClear: "Clear all notes and bookmarks for this module in this browser? This cannot be undone.", cleared: "This module’s notes and bookmarks were cleared.", failed: "The browser could not save this. Unsaved text will be lost when you navigate away or reload.", bookmarks: "My bookmarks", empty: "No bookmarks yet", open: "Open section" },
  KZ: { title: "Бетбелгілер мен жазбалар", intro: "Модуль бөлімдеріне сілтемелерді және өз жазбаңызды сақтаңыз. Деректер осы браузер профилінде сақталады және ортақ құрылғыны пайдаланатын басқа адамдарға көрінуі мүмкін. Пациенттердің жеке деректерін енгізбеңіз.", pick: "Бөлім", add: "Бетбелгі қосу", remove: "Бетбелгіні өшіру", note: "Менің жазбам", saved: "Осы браузерде сақталды (бағаланбады)", clear: "Модуль жазбалары мен бетбелгілерін тазалау", confirmClear: "Осы браузердегі модульдің барлық жазбалары мен бетбелгілерін тазалайсыз ба? Бұл әрекетті қайтару мүмкін емес.", cleared: "Модульдің жазбалары мен бетбелгілері тазаланды.", failed: "Браузерде сақтау мүмкін болмады. Сақталмаған мәтін басқа бетке өткенде немесе бетті жаңартқанда жоғалады.", bookmarks: "Менің бетбелгілерім", empty: "Әлі бетбелгі жоқ", open: "Бөлімді ашу" },
} as const;

export default function NotesContent({ language, moduleId }: { language: Language; moduleId: number }) {
  const [value, setValue] = useState<ModuleNotes>(emptyModuleNotes);
  const [selected, setSelected] = useState<Section>("theory");
  const [ready, setReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "cleared" | "failed">("idle");
  useEffect(() => { setReady(false); setSaveStatus("idle"); setValue(readModuleNotes(moduleId)); setReady(true); }, [moduleId]);
  // Storage events are dispatched in other tabs, not in the tab that made the change.
  // Keep the visible notes in sync, but never discard an unsaved in-memory draft.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== `neuro-course:module-${moduleId}:notes:v1`) return;
      if (saveStatus === "failed") return;
      setValue(readModuleNotes(moduleId));
      setSaveStatus("idle");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [moduleId, saveStatus]);
  const c = copy[language];
  // Module-specific prompts guide note taking; these are not graded answers.
  const moduleThreePrompt = {
    RU: "Для самопроверки: чем отличаются функции дендритов, начального сегмента и аксона? Какие клетки образуют миелин в ЦНС и ПНС? Почему скорость моторного проведения рассчитывают по разности латентностей при двух точках стимуляции? Заметки не проверяются автоматически.",
    EN: "For self-review: how do dendrites, the initial segment and the axon differ in function? Which cells make myelin in the CNS and PNS? Why is motor conduction velocity calculated from the latency difference between two stimulation sites? Notes are not graded automatically.",
    KZ: "Өзіндік тексеру үшін: дендриттердің, бастапқы сегменттің және аксонның қызметтері қалай ерекшеленеді? ОЖЖ мен ШЖЖ-де миелинді қандай жасушалар түзеді? Неліктен қозғалтқыш жүйкенің өткізу жылдамдығы екі нүктеден тітіркендіргендегі латенттіліктер айырмасымен есептеледі? Жазбалар автоматты түрде бағаланбайды.",
  } as const;
  // Module 4 asks students to record a controlled prediction rather than a diagnosis.
  // The illustrative Goldman calculation does not simulate channel kinetics.
  const moduleFourPrompt = {
    RU: "Для самопроверки: при 37 °C и неизменных остальных параметрах что произойдёт с E(K) и расчётным Vm, если наружный K⁺ повысить с 4 до 8 мМ? Почему сильная длительная деполяризация может снизить доступность Na⁺-каналов? Почему неизменная нарисованная кривая импульса в двухионной модели не доказывает нормальную возбудимость пациента? Заметки не проверяются автоматически.",
    EN: "For self-review: at 37 °C with all other inputs fixed, how do E(K) and calculated Vm change when extracellular K⁺ rises from 4 to 8 mM? Why can marked sustained depolarization reduce Na⁺-channel availability? Why does an unchanged illustrative spike trace in a two-ion model not establish normal excitability in a patient? Notes are not graded automatically.",
    KZ: "Өзіндік тексеру үшін: 37 °C-та басқа параметрлер тұрақты болғанда жасушадан тыс K⁺ 4-тен 8 мМ-ге артса, E(K) және есептелген Vm қалай өзгереді? Неліктен айқын әрі ұзақ деполяризация Na⁺ арналарының қолжетімділігін төмендетуі мүмкін? Екі ионды модельдегі өзгермейтін шартты импульс қисығы неге пациенттің қалыпты қозғыштығын дәлелдемейді? Жазбалар автоматты түрде бағаланбайды.",
  } as const;
  // Module 6: use a concrete mechanism-comparison task rather than generic reflection.
  // These notes are a learning scaffold, not a scored diagnostic or a measured trace.
  const moduleSixPrompt = {
    RU: "Для самопроверки: (1) сравните временную суммацию последовательных ВПСП и пространственную суммацию входов разных синапсов; (2) при Vm = −65 мВ и E(Cl) ≈ −65 мВ объясните, почему увеличение Cl⁻-проводимости может ослабить совпадающий ВПСП без заметной гиперполяризации (шунтирующее торможение); (3) сравните это с пресинаптическим торможением, когда уменьшаются вход Ca²⁺ и выделение медиатора. Почему одного измерения Vm на соме недостаточно, чтобы установить место торможения или факт разряда? Числа условны; заметки не проверяются автоматически.",
    EN: "For self-review: (1) compare temporal summation of successive EPSPs with spatial summation of inputs from different synapses; (2) at Vm = −65 mV and E(Cl) ≈ −65 mV, explain why increased Cl⁻ conductance can attenuate a coincident EPSP without clear hyperpolarization (shunting inhibition); (3) contrast this with presynaptic inhibition that reduces Ca²⁺ entry and transmitter release. Why is a somatic Vm recording alone insufficient to locate inhibition or establish that a spike occurred? Values are illustrative; notes are not graded automatically.",
    KZ: "Өзіндік тексеру үшін: (1) бірінен кейін бірі келетін ҚПСП-лардың уақыттық суммациясын әртүрлі синапстардан келетін кірістердің кеңістіктік суммациясымен салыстырыңыз; (2) Vm = −65 мВ және E(Cl) ≈ −65 мВ кезінде Cl⁻ өткізгіштігінің артуы айқын гиперполяризациясыз қатар келген ҚПСП-ны неге әлсірететінін түсіндіріңіз (шунттаушы тежелу); (3) мұны Ca²⁺ енуі мен медиатор бөлінуі азаятын пресинапстық тежелумен салыстырыңыз. Тек сомада тіркелген Vm тежелу орнын немесе әрекет потенциалының пайда болғанын анықтауға неге жеткіліксіз? Сандар шартты; жазбалар автоматты түрде бағаланбайды.",
  } as const;
  const bookmarked = value.bookmarks.includes(selected);
  const update = (change: (current: ModuleNotes) => ModuleNotes) => {
    // Re-read immediately before writing so editing a note in one tab does not
    // silently replace a bookmark or another section's note saved in another tab.
    // On storage failure preserve the unsaved in-memory draft instead.
    const current = saveStatus === "failed" ? value : readModuleNotes(moduleId);
    const next = change(current);
    setValue(next);
    setSaveStatus(saveModuleNotes(moduleId, next) ? "saved" : "failed");
  };
  const clearAll = () => {
    if (!ready || !window.confirm(c.confirmClear)) return;
    const empty = emptyModuleNotes();
    if (saveModuleNotes(moduleId, empty)) {
      setValue(empty);
      setSaveStatus("cleared");
    } else {
      setSaveStatus("failed");
    }
  };
  return <article className={styles.tool}>
    <h1>{c.title}</h1><p>{c.intro}</p>{moduleId === 3 && <p>{moduleThreePrompt[language]}</p>}{moduleId === 4 && <p>{moduleFourPrompt[language]}</p>}{moduleId === 6 && <p>{moduleSixPrompt[language]}</p>}
    <label htmlFor="notes-section">{c.pick}</label>
    <select id="notes-section" value={selected} onChange={event => { setSelected(event.target.value as Section); }}>
      {sectionOrder.map(section => <option key={section} value={section}>{getSectionTitle(section, language)}</option>)}
    </select>
    <div className={styles.row}>
      <button type="button" disabled={!ready} onClick={() => update(current => ({ ...current, bookmarks: current.bookmarks.includes(selected) ? current.bookmarks.filter(item => item !== selected) : [...current.bookmarks, selected] }))} aria-pressed={bookmarked}>{bookmarked ? c.remove : c.add}</button>
      <Link href={`/modules/${moduleId}/${selected}?lang=${language}`}>{c.open}</Link>
    </div>
    <label htmlFor="section-note">{c.note}</label>
    <VoiceTextarea key={selected} language={language} id="section-note" disabled={!ready} maxLength={5000} rows={7} value={value.notes[selected] ?? ""} onValue={text => update(current => ({ ...current, notes: { ...current.notes, [selected]: text } }))} />
    <p role="status" aria-live="polite">{ready && saveStatus !== "idle" ? c[saveStatus] : ""}</p>
    <button className={styles.clearButton} type="button" disabled={!ready} onClick={clearAll}>{c.clear}</button>
    <h2>{c.bookmarks}</h2>
    {value.bookmarks.length ? <ul>{value.bookmarks.map(section => <li key={section}><Link href={`/modules/${moduleId}/${section}?lang=${language}`}>{getSectionTitle(section, language)}</Link></li>)}</ul> : <p>{c.empty}</p>}
  </article>;
}
