import type { Language } from "../content/course";
import { eegSignal, type EEGState, type EEGArtifact } from "../lib/eegSignal";

const copy = {
  RU: { title: "Синтетическая ЭЭГ: 6 секунд", time: "Время, с", voltage: "мкВ", amplitude: "Амплитудный коэффициент", explanation: "Бодрствование с закрытыми глазами: альфа-активность; открывание глаз: её ослабление. N1: смешанная активность с тета-компонентом. N2: веретено около 1,5 с и K-комплекс около 3,3 с. N3: медленные высокоамплитудные волны. REM: низкоамплитудная смешанная активность; для определения REM нужны также движения глаз и мышечный тонус. Произвольное изменение частоты может вывести кривую за пределы типичного паттерна выбранной стадии.", artifact: "Артефакты около 4,7–5,3 с моделируют движение глаз и мышечную активность; они не являются корковым ритмом.", source: "Источник описаний паттернов" },
  EN: { title: "Synthetic EEG: 6 seconds", time: "Time, s", voltage: "µV", amplitude: "Amplitude coefficient", explanation: "Awake with eyes closed: alpha activity; opening the eyes attenuates it. N1: mixed activity with a theta component. N2: a spindle near 1.5 s and a K-complex near 3.3 s. N3: high-amplitude slow waves. REM: low-amplitude mixed activity; identifying REM also requires eye movements and muscle tone. Arbitrary frequency changes may take the trace outside the typical pattern of the selected stage.", artifact: "Artifacts near 4.7–5.3 s model eye movement and muscle activity; they are not cortical rhythms.", source: "Source for pattern descriptions" },
  KZ: { title: "Синтетикалық ЭЭГ: 6 секунд", time: "Уақыт, с", voltage: "мкВ", amplitude: "Амплитудалық коэффициент", explanation: "Көз жабық сергектікте альфа-белсенділік көрінеді; көз ашылғанда ол әлсірейді. N1: тета-компоненті бар аралас белсенділік. N2: шамамен 1,5 с кезінде ұйқы ұршығы және 3,3 с кезінде K-кешені. N3: жоғары амплитудалы баяу толқындар. REM: төмен амплитудалы аралас белсенділік; REM анықтау үшін көз қимылдары мен бұлшықет тонусы да қажет. Жиілікті еркін өзгерту таңдалған сатыға тән емес қисық беруі мүмкін.", artifact: "4,7–5,3 с маңындағы артефактілер көз қимылы мен бұлшықет белсенділігін модельдейді; олар қыртыстық ырғақ емес.", source: "Паттерн сипаттамаларының дереккөзі" },
};
export default function EEGTrace({ state, frequency, amplitude, artifact, language }: { state: EEGState; frequency: number; amplitude: number; artifact: boolean | EEGArtifact; language: Language }) {
  const t = copy[language];
  const points = eegSignal(state, frequency, amplitude, artifact).map(point => `${(60 + point.time * 100).toFixed(2)},${(150 - point.voltage * .45).toFixed(2)}`).join(" ");
  return <figure style={{ margin: "16px 0" }}>
    <div style={{ overflowX: "auto" }}><svg viewBox="0 0 700 320" style={{ width: "100%", minWidth: 520, background: "white" }} role="img" aria-label={t.title}>
      <title>{t.title}</title>
      {[-200, -100, 0, 100, 200].map(value => <g key={value}><line x1="60" x2="660" y1={150 - value * .45} y2={150 - value * .45} stroke="#dce7ee"/><text x="52" y={155 - value * .45} textAnchor="end" fontSize="12">{value}</text></g>)}
      {[0, 1, 2, 3, 4, 5, 6].map(value => <g key={value}><line x1={60 + value * 100} x2={60 + value * 100} y1="45" y2="255" stroke="#e5edf2"/><text x={60 + value * 100} y="277" textAnchor="middle" fontSize="12">{value}</text></g>)}
      <text x="15" y="25" fontSize="14">{t.voltage}</text><text x="350" y="307" textAnchor="middle" fontSize="14">{t.time}</text>
      <polyline points={points} fill="none" stroke="#0b6591" strokeWidth="1.3"/>
    </svg></div>
    <figcaption><p>{t.amplitude}: {amplitude} {t.voltage}. {t.explanation}</p>{artifact !== false && artifact !== "none" && <p>{t.artifact}</p>}<a href="https://www.ncbi.nlm.nih.gov/books/NBK390343/" target="_blank" rel="noopener noreferrer">{t.source}: American Epilepsy Society, Electroencephalography, 2016 — The Normal EEG</a> <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4755451/" target="_blank" rel="noopener noreferrer">Carley &amp; Farabi, 2016 ? Physiology of Sleep, Measurement and Quantification of Sleep and Wake States</a></figcaption>
  </figure>;
}
