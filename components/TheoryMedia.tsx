import Link from "next/link";
import type { Language } from "../content/course";
import OrganizationAnimation from "./OrganizationAnimation";
import FoundationMediaAnimation from "./FoundationMediaAnimation";
import ReferenceImage from "./ReferenceImage";

const copy = {
  RU: { title: "Увидеть механизм", intro: "Сначала рассмотрите последовательность событий, затем сопоставьте её с объяснением в тексте.", animation: "Открыть пошаговую анимацию", images: "Анатомия и лаборатория ниже", media: "Все медиаматериалы модуля", video: "Учебное видео", note: "Khan Academy · на английском языке. Подписи и пошаговое объяснение в учебнике доступны на выбранном языке.", watch: "Открыть видео и расшифровку у автора", unavailable: "Если встроенный проигрыватель недоступен, откройте видео у автора.", brain: "Препарат головного и спинного мозга: сравните их расположение и непрерывность. На этом обзорном фото отдельные ядра не размечены.", source: "Источник и лицензия", neuron: "Как работает нейрон", potential: "Как возникает и распространяется потенциал действия", synapse: "Передача сигнала через химический синапс" },
  KZ: { title: "Механизмді көріңіз", intro: "Алдымен оқиғалар ретін қарап, оны мәтіндегі түсіндірмемен салыстырыңыз.", animation: "Қадамдық анимацияны ашу", images: "Төмендегі анатомия және зертхана", media: "Модульдің барлық медиаматериалдары", video: "Оқу бейнесі", note: "Khan Academy · ағылшын тілінде. Оқулықтағы жазулар мен қадамдық түсіндірме таңдалған тілде берілген.", watch: "Автордың бейнесі мен мәтінін ашу", unavailable: "Кірістірілген ойнатқыш қолжетімсіз болса, автордың бейнесін ашыңыз.", brain: "Бас миы мен жұлын препараты: орналасуы мен жалғастығын салыстырыңыз. Бұл жалпы фотода жеке ядролар белгіленбеген.", source: "Дереккөз және лицензия", neuron: "Нейрон қалай жұмыс істейді", potential: "Әрекет потенциалының пайда болуы және таралуы", synapse: "Химиялық синапс арқылы сигналдың берілуі" },
  EN: { title: "See the mechanism", intro: "Explore the sequence of events, then connect it to the explanation in the text.", animation: "Open the step-by-step animation", images: "Anatomy and laboratory below", media: "All module media", video: "Teaching video", note: "Khan Academy · English audio. Text and step-by-step explanations in this textbook use your selected language.", watch: "Open the creator’s video and transcript", unavailable: "If the embedded player is unavailable, open the creator’s video.", brain: "Brain and spinal cord specimen: compare their position and continuity. Individual nuclei are not labelled in this overview photograph.", source: "Source and licence", neuron: "How a neuron works", potential: "How an action potential starts and propagates", synapse: "Signal transmission at a chemical synapse" },
};

export default function TheoryMedia({ moduleId, language }: { moduleId: number; language: Language }) {
  const c = copy[language];
  const video = [1,3].includes(moduleId)
    ? { title: c.neuron, url: "https://www.khanacademy.org/v/overview-of-neuron-function" }
    : moduleId === 4
      ? { title: c.potential, url: "https://en.khanacademy.org/science/mcat/organ-systems/neuron-membrane-potentials/v/neuron-action-potential-mechanism" }
      : [5,6].includes(moduleId)
        ? { title: c.synapse, url: "https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/neuronal-synapses-chemical" }
        : null;
  return <section aria-labelledby="theory-media-heading" style={{ margin: "20px 0", padding: "clamp(12px,3vw,24px)", borderRadius: 18, border: "1px solid #b9dce9", background: "linear-gradient(125deg,#e8f8ff,#f1edff,#fff5e5)", color: "#193349", minWidth: 0 }}>
    <h2 id="theory-media-heading">{c.title}</h2><p>{c.intro}</p>
    <nav aria-label={c.title} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <a href="#theory-visuals">{c.images}</a>
      <Link href={`/modules/${moduleId}/media?lang=${language}`}>{c.media}</Link>
    </nav>
    {moduleId === 2 && <nav aria-label={language === "RU" ? "Связанные разделы вызванных потенциалов" : language === "KZ" ? "Шақырылған потенциалдардың байланысты бөлімдері" : "Related evoked-potential sections"} style={{display:"flex",gap:14,flexWrap:"wrap",padding:"12px 0"}}>
      <Link href={`/modules/2/interactive?lang=${language}#evoked-averaging-lab`}>{language === "RU" ? "Лабораторная работа: усреднение вызванных потенциалов" : language === "KZ" ? "Зертханалық жұмыс: шақырылған потенциалдарды орташалау" : "Laboratory: averaging evoked potentials"}</Link>
      <Link href={`/modules/2/cases?lang=${language}`}>{language === "RU" ? "Ситуационные задачи" : language === "KZ" ? "Жағдаяттық тапсырмалар" : "Clinical cases"}</Link>
      <Link href={`/modules/2/tests?lang=${language}`}>{language === "RU" ? "Тесты" : language === "KZ" ? "Тесттер" : "Tests"}</Link>
    </nav>}
    <details style={{ marginTop: 18 }}><summary style={{ cursor: "pointer", fontWeight: 700 }}>{c.animation}</summary>
      {moduleId === 1 ? <OrganizationAnimation language={language} /> : <FoundationMediaAnimation moduleId={moduleId} language={language} />}
    </details>
    {video && <details style={{ marginTop: 18 }}><summary style={{ cursor: "pointer", fontWeight: 700 }}>{c.video}: {video.title}</summary>
      <p>{c.note}</p>
      {moduleId === 4 && <iframe title={video.title} src="https://www.youtube-nocookie.com/embed/MZz4OUOyFvg" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ width: "100%", aspectRatio: "16/9", border: 0, borderRadius: 12 }} />}
      <p><a href={video.url} target="_blank" rel="noopener noreferrer">{c.watch}</a></p>
      {moduleId === 4 && <p>{c.unavailable}</p>}
    </details>}
    {moduleId === 1 && <figure id="theory-visuals" style={{ margin: "20px 0 0" }}>
      <ReferenceImage src="/images/anatomy/brain-spinal-cord.jpg" alt={c.brain} page="https://commons.wikimedia.org/wiki/File:Human_brain_and_spinal_cord.jpg" language={language} />
      <figcaption><p>{c.brain}</p><a href="https://commons.wikimedia.org/wiki/File:Human_brain_and_spinal_cord.jpg" target="_blank" rel="noopener noreferrer">{c.source}</a> · Z22 · National Museum of Health and Medicine · CC BY-SA 4.0</figcaption>
    </figure>}
  </section>;
}
