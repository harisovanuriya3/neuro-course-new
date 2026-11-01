import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 8: ascending sensory and descending motor pathways.
// Checked against Guyton & Hall 13e, ch. 48 (PDF 584–586) and ch. 56
// (PDF 677–678); Ganong 23e, ch. 11 (PDF 185–187), ch. 16
// (PDF 254–255); C. L. Ghai Practical Physiology 8e (PDF 324–327).
// These outcomes teach the standard tract model, not a diagnostic algorithm.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Сопоставить модальности и восходящие пути",
      "Для тонкого осязания, вибрации, сознательной проприоцепции, боли и температуры выбрать основной путь; отличить систему задних столбов — медиальной петли от антеролатеральной системы и не считать все виды осязания одним трактом."],
    ["Проследить нейроны и перекрёсты",
      "На схеме указать спинномозговой узел, ядра тонкого и клиновидного пучков, перекрёст в продолговатом мозге, задний рог, перекрёст антеролатеральных волокон в спинном мозге, таламус и соматосенсорную кору; объяснить разницу уровней."],
    ["Разобрать нисходящий двигательный путь",
      "Проследить латеральный корково-спинномозговой путь от коры через внутреннюю капсулу и пирамиды продолговатого мозга до спинного мозга; обозначить перекрёст большинства волокон и не переносить эту схему на все нисходящие пути."],
    ["Предсказать сторону и характер дефицита",
      "Для заданного одностороннего очага выше или ниже соответствующего перекрёста предсказать сторону нарушения вибрации и положения сустава, боли и температуры либо произвольного движения; указывать уровень и модальность, а не только «нарушение чувствительности»."],
    ["Проверить гипотезу и границы локализации",
      "Предложить раздельную проверку вибрации, положения сустава, болевой и температурной чувствительности и моторной функции; объяснить, почему один симптом не доказывает точный уровень поражения без полного осмотра и дополнительных данных."],
  ],
  EN: [
    ["Match sensory modalities to ascending pathways",
      "For discriminative touch, vibration, conscious proprioception, pain and temperature, identify the principal route; distinguish the dorsal-column–medial-lemniscal from the anterolateral system without assigning every form of touch to one tract."],
    ["Trace relays and decussations",
      "On a diagram, locate the dorsal root ganglion, gracile and cuneate nuclei, medullary sensory decussation, dorsal horn, spinal crossing of anterolateral fibers, thalamus and somatosensory cortex; explain why the crossing levels differ."],
    ["Trace a descending motor pathway",
      "Follow the lateral corticospinal pathway from cortex through internal capsule and medullary pyramids to spinal cord; identify where most fibers cross, without treating this pattern as universal for all descending pathways."],
    ["Predict the side and modality of a deficit",
      "For a specified unilateral lesion above or below the relevant crossing, predict which side loses vibration/joint-position sense, pain/temperature sense or voluntary motor function; state lesion level and modality rather than just 'sensory loss'."],
    ["Test localization and its limitations",
      "Propose separate bedside assessments of vibration, joint position, pain, temperature and motor function; explain why a single finding cannot establish an exact lesion level without the full examination and corroborating evidence."],
  ],
  KZ: [
    ["Сезімталдық түрлерін жоғарылаушы жолдармен сәйкестендіру",
      "Нәзік сипап сезу, діріл, саналы проприоцепция, ауырсыну және температура үшін негізгі жолды таңдау; артқы бағандар–медиалдық ілмек жүйесін антеролатералдық жүйеден ажыратып, жанасудың барлық түрін бір жолға жатқызбау."],
    ["Нейрондар мен айқасу деңгейлерін көрсету",
      "Сызбада жұлын түйінін, нәзік және сына тәрізді шоғыр ядроларын, сопақша мидағы сезімтал талшықтар айқасуын, артқы мүйізді, антеролатералдық талшықтардың жұлындағы айқасуын, таламус пен соматосенсорлық қыртысты белгілеу; деңгей айырмасын түсіндіру."],
    ["Төмендеуші қозғалтқыш жолды қадағалау",
      "Латералдық қыртыс-жұлын жолын қыртыстан ішкі капсула мен сопақша мидың пирамидалары арқылы жұлынға дейін көрсету; талшықтардың басым бөлігі қайда айқасатынын атау және бұл үлгіні барлық төмендеуші жолдарға қолданбау."],
    ["Зақым жағымен сезімталдық түрін болжау",
      "Тиісті айқасудан жоғары немесе төмен орналасқан біржақты зақым үшін діріл мен буын қалпын сезудің, ауырсыну мен температура сезудің немесе ерікті қозғалыстың қай жақта бұзылатынын болжау; тек «сезімталдық бұзылды» демей, деңгейді және модальдықты көрсету."],
    ["Локализацияны тексеру және қорытынды шегін атау",
      "Дірілді, буын қалпын, ауырсынуды, температураны және қозғалыс қызметін бөлек тексеруді ұсыну; толық қарау мен қосымша дәлелдерсіз бір белгі арқылы зақымның нақты деңгейін анықтауға болмайтынын түсіндіру."],
  ],
};

export function createModuleEightObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-8-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [
        { section: "theory" }, { section: "pretest" }, { section: "interactive" },
        { section: "practice" }, { section: "cases" },
      ],
    },
  };
}
