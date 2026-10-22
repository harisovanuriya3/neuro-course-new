import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 6: measurable outcomes grounded in Ganong 23e, ch. 6
// (Library PDF pp. 130–133), Guyton & Hall 13e, ch. 46
// (Library PDF pp. 559–562). Ghai 8e (PDF pp. 353–354)
// describes a peripheral nerve-muscle preparation and cannot
// establish central shunting inhibition or summation directly.
type Goal = readonly [title: string, description: string];
const goals: Record<Language, readonly [Goal, Goal, Goal, Goal, Goal]> = {
  RU: [
    ["ВПСП, ТПСП и потенциал действия", "По записи мембранного потенциала отличить градуированный ВПСП или ТПСП от распространяющегося потенциала действия; объяснить, почему один ВПСП не гарантирует разряд."],
    ["Временная и пространственная суммация", "Для двух заданных схем стимуляции определить вид суммации и объяснить, как интервалы, места входов и мембранная проводимость влияют на ответ."],
    ["Шунтирующее торможение", "При Vm, близком к потенциалу реверсии Cl⁻, предсказать влияние увеличения Cl⁻-проводимости на входное сопротивление и совпадающий ВПСП без обязательной гиперполяризации."],
    ["Пре- и постсинаптическое торможение", "Сопоставить снижение выделения медиатора в окончании аксона с изменением проводимости клетки-мишени; предложить измерения, позволяющие различить эти механизмы."],
    ["Границы физиологического вывода", "Объяснить, почему амплитуда ВПСП на соме не доказывает ни генерацию ПД в начальном сегменте аксона, ни точное место торможения; назвать дополнительные условия измерения."],
  ],
  EN: [
    ["EPSPs, IPSPs and action potentials", "Use a membrane-voltage trace to distinguish a graded EPSP or IPSP from a propagated action potential; explain why a single EPSP does not guarantee a spike."],
    ["Temporal and spatial summation", "Given two stimulation patterns, identify the form of summation and explain the effects of timing, synaptic location and membrane conductance."],
    ["Shunting inhibition", "When Vm is near the Cl⁻ reversal potential, predict how increased Cl⁻ conductance changes input resistance and a coincident EPSP without requiring hyperpolarization."],
    ["Presynaptic versus postsynaptic inhibition", "Contrast reduced transmitter release at an axon terminal with altered target-cell conductance; propose measurements that distinguish the mechanisms."],
    ["Limits of physiological inference", "Explain why a somatic EPSP amplitude alone proves neither spike initiation at the axon initial segment nor the precise site of inhibition; identify additional measurements needed."],
  ],
  KZ: [
    ["Қоздырушы және тежеуші постсинапстық потенциалдар", "Мембраналық потенциал жазбасынан шамасы өзгеретін қоздырушы (ҚПСП) не тежеуші (ТПСП) постсинапстық потенциалды таралатын әрекет потенциалынан ажырату; бір ҚПСП импульске кепіл болмайтынын түсіндіру."],
    ["Уақыттық және кеңістіктік суммация", "Екі тітіркендіру сызбасында суммация түрін анықтау; уақыт аралығы, синапс орны және мембрана өткізгіштігі жауапқа қалай әсер ететінін түсіндіру."],
    ["Шунттаушы тежелу", "Vm Cl⁻ реверсия потенциалына жақын болғанда Cl⁻ өткізгіштігінің артуы кіріс кедергісін және қатар келген ҚПСП-ны қалай өзгертетінін, міндетті гиперполяризациясыз, болжау."],
    ["Пресинапстық және постсинапстық тежелу", "Аксон ұшында медиатор бөлінуінің азаюын нысана жасуша өткізгіштігінің өзгеруімен салыстыру; екі механизмді ажырататын өлшеулерді ұсыну."],
    ["Физиологиялық қорытындының шектеулері", "Сомадағы ҚПСП амплитудасы ғана аксонның бастапқы сегментінде әрекет потенциалы туғанын да, тежелудің нақты орнын да дәлелдемейтінін түсіндіру; қосымша өлшеулерді атау."],
  ],
};

export function createModuleSixObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-6-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [{ section: "theory" }, { section: "practice" }, { section: "cases" },
        { section: "interactive" }, { section: "virtual-patient" }],
    },
  };
}
