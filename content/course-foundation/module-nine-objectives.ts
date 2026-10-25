import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 9: spinal cord, segmental circuits, reflexes and descending control.
// Evidence: Guyton & Hall 13e, ch. 55, printed pp. 698–705 (PDF 666–673);
// Ganong 23e, ch. 16, printed p. 249 (PDF 261);
// C. L. Ghai Practical Physiology 8e, printed pp. 291–296 (PDF 313–318).
// Goals distinguish the monosynaptic core of the stretch reflex from
// polysynaptic withdrawal, and avoid a fixed time-course of spinal shock.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Проследить входы и выходы сегмента спинного мозга",
      "На поперечном срезе указать задний корешок и спинномозговой узел (чувствительный вход), задний рог, передний рог и передний корешок (двигательный выход); отличить поражение корешка от нарушения длинного нисходящего пути."],
    ["Различить рефлекс растяжения и защитное отдёргивание",
      "Построить цепь Ia-афферент мышечного веретена → α-мотонейрон → экстрафузальные волокна для моносинаптического звена рефлекса растяжения; отдельно показать полисинаптические интернейронные сети отдёргивания и реципрокного торможения."],
    ["Объяснить сегментарную и нисходящую регуляцию",
      "Объяснить, как сенсорные входы, интернейроны, α- и γ-мотонейроны и нисходящие влияния меняют возбудимость рефлекторных цепей; не считать амплитуду сухожильного рефлекса прямым измерением одной структуры."],
    ["Предсказать ответ при контролируемом стимуле",
      "При одинаковом положении конечности и методике стимуляции качественно предсказать влияние растяжения мышцы или повреждения афферентного/эфферентного звена на ответ; отличать прогноз от измерения и не обещать неизменную латентность при любой силе стимула."],
    ["Интерпретировать спинальный шок и клинический осмотр",
      "Сравнить угнетение рефлексов непосредственно после тяжёлого повреждения спинного мозга с возможным их восстановлением и гиперрефлексией позже; указать время, уровень очага, чувствительность, силу и другие данные, не ставя диагноз по одному рефлексу."]
  ],
  EN: [
    ["Trace segmental spinal inputs and outputs",
      "On a spinal cross-section identify the dorsal root and dorsal root ganglion (sensory input), dorsal horn, ventral horn and ventral root (motor output); distinguish root injury from interruption of a long descending pathway."],
    ["Differentiate stretch and protective withdrawal reflexes",
      "Trace the muscle-spindle Ia afferent → α-motor neuron → extrafusal muscle fibers as the monosynaptic core of the stretch reflex; separately depict polysynaptic interneuron networks for withdrawal and reciprocal inhibition."],
    ["Explain segmental and descending modulation",
      "Explain how sensory input, interneurons, α- and γ-motor neurons and descending pathways modulate spinal reflex excitability; do not treat tendon-jerk amplitude as a direct measure of any single structure."],
    ["Predict a response under controlled conditions",
      "With limb position and stimulation method held constant, qualitatively predict how muscle stretch or injury to an afferent/efferent limb affects the response; separate prediction from measurement and do not assume latency is invariant across all stimulus strengths."],
    ["Interpret spinal shock and clinical reflex findings",
      "Contrast early depression of reflexes after severe spinal cord injury with their possible later return and hyperreflexia; account for time, lesion level, sensation, strength and other findings rather than diagnosing from a single reflex."]
  ],
  KZ: [
    ["Жұлын сегментінің кіріс және шығыс жолдарын көрсету",
      "Жұлынның көлденең кесіндісінде артқы түбіршек пен жұлын түйінін (сезімтал кіріс), артқы мүйізді, алдыңғы мүйізді және алдыңғы түбіршекті (қозғалтқыш шығыс) белгілеу; түбіршек зақымын ұзын төмендеуші жол зақымынан ажырату."],
    ["Созылу және қорғаныштық тартып алу рефлекстерін ажырату",
      "Бұлшықет ұршығының Ia-афференті → α-мотонейрон → экстрафузалдық талшықтар тізбегін созылу рефлексінің моносинапстық негізгі буыны ретінде көрсету; тартып алу мен реципроктық тежелудің полисинапстық интернейрондық желілерін бөлек түсіндіру."],
    ["Сегменттік және төмендеуші реттелуді түсіндіру",
      "Сезімтал кірістер, интернейрондар, α- және γ-мотонейрондар мен төмендеуші жолдардың жұлын рефлекстерінің қозғыштығын қалай өзгертетінін түсіндіру; сіңір рефлексінің амплитудасын бір құрылымның тікелей өлшемі деп қарастырмау."],
    ["Бақыланатын жағдайда жауапты болжау",
      "Аяқ-қол қалпы мен тітіркендіру әдісін тұрақты ұстап, бұлшықет созылуының немесе афференттік/эфференттік буын зақымының жауапқа ықпалын сапалық түрде болжау; болжамды өлшеуден ажырату және кез келген стимул күшінде латенттілік өзгермейді деп тұжырымдамау."],
    ["Жұлындық шок пен клиникалық рефлекстерді түсіндіру",
      "Жұлынның ауыр зақымынан кейінгі бастапқы рефлекстер бәсеңдеуін кейін олардың қалпына келуі және гиперрефлексия мүмкіндігімен салыстыру; бір рефлекске сүйеніп диагноз қоймай, уақытты, зақым деңгейін, сезімталдықты, күшті және өзге белгілерді ескеру."]
  ]
};

export function createModuleNineObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-9-objective-" + (index + 1), title, description,
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
