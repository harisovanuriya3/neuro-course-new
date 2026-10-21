import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 6: measurable learning outcomes for excitation and inhibition.
// Checked against Ganong 23e ch. 6 (PDF pp. 129–133), Guyton & Hall
// 13e ch. 46 (PDF pp. 559–561). Ghai 8e (PDF pp. 353–354)
// describes a peripheral nerve–muscle preparation, not intracellular
// recordings of central EPSP/IPSP summation.
type Goal = { title: string; description: string };
const goals: Record<Language, [Goal, Goal, Goal, Goal, Goal]> = {
  RU: [
    {
      title: "1. Различать возбуждение и торможение",
      description: "По изменению мембранной проводимости и движущей силы для ионов объяснить, почему синаптический вход может увеличить или уменьшить вероятность разряда; не приравнивать любой ВПСП к потенциалу действия.",
    },
    {
      title: "2. Сравнивать временную и пространственную суммацию",
      description: "На двух схемах различить перекрытие ВПСП одного входа во времени и совместное действие разных синаптических входов; объяснить роль затухания и расположения синапсов.",
    },
    {
      title: "3. Объяснять шунтирующее торможение",
      description: "При потенциале равновесия Cl⁻ около потенциала покоя предсказать, почему рост Cl⁻-проводимости может уменьшить ВПСП без заметной гиперполяризации.",
    },
    {
      title: "4. Прогнозировать результат изменения проводимости",
      description: "При одинаковом возбуждающем токе сравнить ответы мембраны до и после увеличения общей проводимости; использовать соотношение ΔV ≈ I/г только как упрощённую стационарную модель, а не точный расчёт живого нейрона.",
    },
    {
      title: "5. Оценивать границы экспериментального вывода",
      description: "По записи ВПСП, ТПСП и разряда в области запуска импульса указать, какие измерения нужны для проверки механизма; не выводить состояние центрального торможения из одного опыта на изолированном нервно-мышечном препарате.",
    },
  ],
  EN: [
    {
      title: "1. Distinguish excitation from inhibition",
      description: "Use changes in membrane conductance and ionic driving force to explain why an input can raise or lower spike probability; do not treat every EPSP as an action potential.",
    },
    {
      title: "2. Compare temporal and spatial summation",
      description: "Use two diagrams to distinguish overlapping EPSPs from one input over time from the combined action of distinct synaptic inputs; account for decay and synapse location.",
    },
    {
      title: "3. Explain shunting inhibition",
      description: "When the Cl⁻ reversal potential is near resting voltage, predict why increased Cl⁻ conductance can reduce an EPSP without obvious hyperpolarization.",
    },
    {
      title: "4. Predict the effect of altered conductance",
      description: "For the same excitatory current, compare membrane responses before and after an increase in total conductance; use ΔV ≈ I/g only as a simplified steady-state model, not as an exact living-neuron calculation.",
    },
    {
      title: "5. State the limits of experimental inference",
      description: "From EPSP, IPSP and spike-initiation recordings, identify what measurements test the proposed mechanism; do not infer central inhibition from an isolated nerve–muscle experiment alone.",
    },
  ],
  KZ: [
    {
      title: "1. Қозу мен тежелуді ажырату",
      description: "Мембраналық өткізгіштік пен иондардың қозғаушы күшінің өзгеруі синапстық кірістің импульс пайда болу ықтималдығын неліктен арттыратынын не азайтатынын түсіндіру; әр ҚПСП-ны әрекет потенциалы деп есептемеу.",
    },
    {
      title: "2. Уақыттық және кеңістіктік қосылуды салыстыру",
      description: "Екі сызбада бір кірістің уақыт бойынша қабаттасатын ҚПСП-ларын әртүрлі синапстардан келетін сигналдардың қосылуынан ажырату; потенциалдың бәсеңдеуі мен синапстың орналасуын ескеру.",
    },
    {
      title: "3. Шунттаушы тежелуді түсіндіру",
      description: "Cl⁻ реверсиялық потенциалы тыныштық потенциалына жақын болса, Cl⁻ өткізгіштігінің артуы айқын гиперполяризациясыз ҚПСП амплитудасын қалай азайтатынын болжау.",
    },
    {
      title: "4. Өткізгіштік өзгерісінің нәтижесін болжау",
      description: "Қоздырушы ток бірдей болғанда жалпы өткізгіштік артқанға дейінгі және кейінгі мембрана жауабын салыстыру; ΔV ≈ I/g қатынасын тірі нейронның дәл есебі емес, тек қарапайым стационарлық модель ретінде қолдану.",
    },
    {
      title: "5. Тәжірибелік қорытындының шегін бағалау",
      description: "ҚПСП, тежеуші постсинапстық потенциал (ТПСП) және импульс басталатын аймақтың жазбалары бойынша тетікті тексеруге қажет өлшемдерді атау; оқшауланған жүйке-бұлшықет тәжірибесінен орталық тежелу туралы бірден қорытынды жасамау.",
    },
  ],
};

export function createModuleSixObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU"
      ? "После изучения модуля студент сможет:"
      : language === "EN"
        ? "After completing this module, the student will be able to:"
        : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(({ title, description }, index) => ({
      id: "module-6-objective-" + (index + 1),
      title,
      description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля" : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут" : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [{ section: "theory" }, { section: "practice" }, { section: "cases" }, { section: "interactive" }, { section: "virtual-patient" }],
    },
  };
}
