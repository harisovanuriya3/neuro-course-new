import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 5 objectives; grounded in Ganong 23e ch. 6, Guyton & Hall 13e
// chs. 7/46 and Ghai 8e experiment 4-9.
const goals: Record<Language, [string, string][]> = {
  RU: [
    ["Этапы химической передачи", "Упорядочить: импульс в окончании → вход Ca²⁺ → вероятностное выделение медиатора → активация рецепторов → постсинаптический ответ."],
    ["Химический и электрический синапсы", "Сравнить везикулярное выделение с передачей тока через щелевые контакты; объяснить возможную двусторонность электрической передачи."],
    ["Рецепторы и знак ответа", "Различить ионотропные и метаботропные рецепторы; объяснить, почему один медиатор может вызывать разные эффекты."],
    ["Прогноз лабораторного опыта", "При одинаковом приходе импульса сравнить сохранённый и блокированный вход Ca²⁺; отделить детерминированный результат модели от вероятностной реальной передачи."],
    ["Нервно-мышечная передача", "Отличить локальный потенциал концевой пластинки от мышечного потенциала действия; объяснить запас надёжности и ограничения опыта с прямой стимуляцией мышцы."],
  ],
  EN: [
    ["Stages of chemical transmission", "Sequence terminal spike → Ca²⁺ influx → probabilistic transmitter release → receptor activation → postsynaptic response."],
    ["Chemical versus electrical synapses", "Contrast vesicular release with current flow through gap junctions; explain why electrical transmission can be bidirectional."],
    ["Receptors and response polarity", "Distinguish ionotropic and metabotropic receptors; explain why one transmitter can have different effects."],
    ["Predict the laboratory outcome", "With spike arrival unchanged, compare intact and blocked Ca²⁺ entry; distinguish deterministic model output from probabilistic real transmission."],
    ["Neuromuscular transmission", "Distinguish the local end-plate potential from a muscle action potential; explain the safety factor and limits of direct muscle stimulation."],
  ],
  KZ: [
    ["Химиялық берілудің кезеңдері", "Кезеңдерді реттеу: ұштағы импульс → Ca²⁺ кіруі → медиатордың ықтималдық сипатта бөлінуі → рецепторлардың белсенуі → постсинапстық жауап."],
    ["Химиялық және электрлік синапстар", "Везикуладан бөлінуді саңылаулы түйіспелер арқылы токтың өтуімен салыстыру; электрлік берілудің екі бағытты болуы мүмкін екенін түсіндіру."],
    ["Рецепторлар және жауаптың бағыты", "Ионотроптық және метаботроптық рецепторларды ажырату; бір медиатордың әртүрлі әсер ету себебін түсіндіру."],
    ["Зертхана нәтижесін болжау", "Импульс бірдей жеткенде Ca²⁺ кіруі сақталған және бөгелген жағдайларды салыстыру; модельдің анықталған нәтижесін нақты ықтималдық берілуден ажырату."],
    ["Жүйке-бұлшықет берілуі", "Соңғы пластинканың жергілікті потенциалын бұлшықеттің әрекет потенциалынан ажырату; беріліс сенімділігін және бұлшықетті тікелей тітіркендіру тәжірибесінің шектеулерін түсіндіру."],
  ],
};
export function createModuleFiveObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:" : language === "EN" ? "After completing this module, the student will be able to:" : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-5-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля" : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут" : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [{ section: "theory" }, { section: "practice" }, { section: "cases" }, { section: "interactive" }, { section: "virtual-patient" }],
    },
  };
}
