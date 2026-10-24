import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 8: ascending sensory and descending motor pathways.
// Cross-checked with Guyton & Hall 13e, PDF 584–586 and 677–678;
// Ganong 23e, PDF 185–187 and 254–255;
// C. L. Ghai Practical Physiology 8e, PDF 324–327.
// Simplified lesion patterns are educational, not individual diagnoses.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];

const takeaways: Record<Language, FiveTakeaways> = {
  RU: [
    { title: "Задние столбы — медиальная петля",
      explanation: "Вибрация, сознательная проприоцепция и различительное осязание от тела идут преимущественно по задним столбам своей стороны до тонкого и клиновидного ядер продолговатого мозга. Вторые нейроны перекрещиваются там, идут в медиальной петле к VPL таламуса; третьи — к соматосенсорной коре." },
    { title: "Антеролатеральная система",
      explanation: "Афференты боли и температуры переключаются в заднем роге; часть перед переключением проходит один-два сегмента по тракту Лиссауэра. Аксоны вторых нейронов обычно перекрещиваются в передней белой спайке близ уровня входа и поднимаются на противоположной стороне. Это не один изолированный пучок." },
    { title: "Корково-спинномозговой путь",
      explanation: "Корково-спинномозговые волокна идут из нескольких областей коры через внутреннюю капсулу и пирамиды продолговатого мозга. Большинство пересекается в каудальной части продолговатого мозга и образует латеральный тракт, важный для точных движений кисти и пальцев. Не все нисходящие пути перекрещиваются одинаково." },
    { title: "Сторона нарушения зависит от уровня перекрёста",
      explanation: "Ограниченный правый очаг в заднем столбе грудного отдела может нарушить вибрацию и чувство положения справа ниже очага; левый антеролатеральный очаг — боль и температуру преимущественно справа ниже очага, иногда начиная ниже уровня поражения. Правый латеральный корково-спинномозговой очаг ниже пирамидного перекрёста преимущественно ослабляет движения справа." },
    { title: "Проверяйте модальности отдельно",
      explanation: "Исследуйте вибрацию камертоном, положение пальца, боль и температуру, силу и характер движений на обеих сторонах. Лёгкое прикосновение не является надёжным маркером одного пути, а одиночный симптом не определяет точный уровень очага. Вывод зависит от полноты осмотра и дополнительных данных." },
  ],
  EN: [
    { title: "Dorsal columns and medial lemniscus",
      explanation: "Vibration, conscious proprioception and discriminative touch from the body ascend mainly ipsilaterally in dorsal columns to gracile and cuneate nuclei in the medulla. Second-order axons cross there and ascend in the medial lemniscus to the thalamic VPL; third-order neurons project to somatosensory cortex." },
    { title: "Anterolateral system",
      explanation: "Pain- and temperature-related afferents relay in the dorsal horn; some travel one or two spinal segments in Lissauer's tract before synapsing. Second-order axons usually cross in the anterior white commissure near entry level and ascend contralaterally. This system comprises several pathways, not one isolated tract." },
    { title: "Corticospinal tract",
      explanation: "Corticospinal axons arise from several cortical regions and descend through the internal capsule and medullary pyramids. Most cross in the caudal medulla to form the lateral tract, important for precise hand and finger movements. Other descending motor pathways do not all follow this crossing pattern." },
    { title: "Lesion side depends on crossing level",
      explanation: "A restricted right thoracic dorsal-column lesion may impair vibration and joint-position sense on the right below the lesion; a left anterolateral lesion may impair pain and temperature mainly on the right, sometimes beginning below the lesion level. A right lateral corticospinal lesion below pyramidal decussation predominantly impairs right-sided voluntary movement." },
    { title: "Test modalities separately",
      explanation: "Compare tuning-fork vibration, joint-position sense, pain, temperature, strength and movement quality on both sides. Light touch alone cannot isolate a single ascending pathway, and one symptom cannot establish a precise lesion level. Interpretation requires a full examination and corroborating information." },
  ],
  KZ: [
    { title: "Артқы бағандар мен медиалдық ілмек",
      explanation: "Діріл сезімі, саналы проприоцепция және ажыратушы нәзік жанасу денеден негізінен өз жағындағы артқы бағандармен сопақша мидың нәзік және сына тәрізді ядроларына жетеді. Екінші нейрон аксондары сол жерде айқасып, медиалдық ілмек арқылы таламустың VPL ядросына өтеді; үшінші нейрондар соматосенсорлық қыртысқа барады." },
    { title: "Антеролатералдық жүйе",
      explanation: "Ауырсыну мен температура афференттері артқы мүйізде синапс түзеді; кейбірі оған дейін Лиссауэр жолымен бір-екі сегмент өтеді. Екінші нейрон аксондары көбіне кірген деңгейге жақын алдыңғы ақ комиссурада айқасып, қарсы жақпен жоғары көтеріледі. Бұл бір ғана оқшауланған жол емес, бірнеше проекциядан тұратын жүйе." },
    { title: "Қыртыс-жұлын жолы",
      explanation: "Қыртыс-жұлын аксондары қыртыстың бірнеше аймағынан басталып, ішкі капсула және сопақша мидың пирамидалары арқылы төмендейді. Көпшілігі сопақша мидың каудалдық бөлігінде айқасып, қол мен саусақтардың дәл қозғалыстары үшін маңызды латералдық жолды түзеді. Барлық төмендеуші жолдар бірдей айқаспайды." },
    { title: "Бұзылыс жағы айқасу деңгейіне байланысты",
      explanation: "Кеуде деңгейіндегі оң артқы бағанның шектелген зақымы ошақтан төмен оң жақта діріл мен буын қалпын сезуді бұзуы мүмкін. Сол антеролатералдық жол зақымданса, ауырсыну мен температура көбіне оң жақта, кейде ошақ деңгейінен төменірек бұзылады. Пирамидалық айқасудан төмен оң латералдық қыртыс-жұлын жолының зақымы көбіне оң жақтағы ерікті қозғалысты әлсіретеді." },
    { title: "Сезімталдық түрлерін бөлек тексеріңіз",
      explanation: "Камертонмен дірілді, саусақтың қалпын сезуді, ауырсынуды, температураны, бұлшықет күшін және қозғалыс сапасын екі жақта салыстырыңыз. Жеңіл жанасу бір ғана жоғарылаушы жолдың күйін сенімді көрсетпейді, ал жалғыз белгі зақымның нақты деңгейін анықтамайды. Қорытынды үшін толық тексеру және қосымша деректер қажет." },
  ],
};

export function createModuleEightSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU"
      ? "Пять ключевых выводов: модальность, нейронное переключение, перекрёст и границы локализации."
      : language === "EN"
        ? "Five key takeaways: modality, relay, decussation and the limits of localization."
        : "Бес негізгі қорытынды: модальдық, нейрондық ауысу, айқасу және локализацияның шегі.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-8-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "practice" }],
    })),
  };
}
