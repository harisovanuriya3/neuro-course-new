import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 7: reflexes and neural networks.
// Evidence: Ganong 23e ch. 9 (PDF 169–171), Guyton & Hall 13e ch. 55
// (PDF 666–668), C. L. Ghai Practical Physiology 8e (PDF 317–319).
// These are learning objectives, not claims that a simulation is a clinical test.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Дуга рефлекса растяжения", "По схеме коленного рефлекса обозначить мышечное веретено, Ia-афферент, задний корешок, спинальную связь с альфа-мотонейроном, двигательный выход и четырёхглавую мышцу; объяснить, почему удар по связке растягивает мышцу."],
    ["Веретено и сухожильный орган Гольджи", "Сопоставить Ia- и II-афференты мышечного веретена с Ib-афферентами сухожильного органа Гольджи; различить информацию о длине/скорости растяжения и мышечном напряжении без смешения рецепторов."],
    ["Моносинаптический путь и реципрокное торможение", "На схеме выделить прямое возбуждение альфа-мотонейронов растянутой мышцы Ia-афферентом и отдельный путь через тормозный интернейрон к мотонейронам антагониста; сосчитать центральные синапсы."],
    ["Прогноз при изменении условий", "Для заданных условий сравнить ответ Ia-афферентов на быстрое и медленное растяжение и объяснить роль гамма-мотонейронов в настройке чувствительности веретена; не приравнивать силу удара к измеренной силе рефлекса."],
    ["Оценка коленного рефлекса и границы вывода", "При ослабленном или асимметричном коленном рефлексе перечислить возможные нарушения афферентного, центрального и эфферентного звеньев и влияние нисходящих путей; предложить сравнение сторон и приём Ендрассика, не ставя диагноз по одному ответу."],
  ],
  EN: [
    ["Stretch-reflex arc", "On a knee-jerk diagram, label the muscle spindle, group Ia afferent, dorsal root, spinal connection to an alpha motor neuron, motor output and quadriceps; explain why tapping the ligament stretches the muscle."],
    ["Spindle versus Golgi tendon organ", "Compare group Ia and II spindle afferents with group Ib Golgi tendon organ afferents; distinguish information about muscle length and stretch velocity from muscle tension without confusing the receptors."],
    ["Monosynaptic excitation and reciprocal inhibition", "Diagram direct Ia excitation of alpha motor neurons supplying the stretched muscle and the separate inhibitory-interneuron pathway to antagonist motor neurons; count the central synapses in each branch."],
    ["Predicting changes in response", "Given controlled conditions, compare Ia responses to fast versus slow stretch and explain how gamma motor neurons adjust spindle sensitivity; do not equate hammer force with a directly measured reflex force."],
    ["Knee-jerk interpretation and limits", "For a reduced or asymmetric knee jerk, identify possible afferent, central and efferent causes and descending influences; propose side-to-side comparison and the Jendrassik maneuver without diagnosing from one response."],
  ],
  KZ: [
    ["Созылу рефлексінің доғасы", "Тізе рефлексінің сызбасында бұлшықет ұршығын, Ia-афферентті, артқы түбірді, альфа-мотонейронмен жұлындағы байланысты, қозғалтқыш шығуды және санның төртбасты бұлшықетін белгілеу; байламды соғу неліктен бұлшықетті созатынын түсіндіру."],
    ["Бұлшықет ұршығы мен Гольджи сіңір органы", "Бұлшықет ұршығының Ia және II афференттерін Гольджи сіңір органының Ib афференттерімен салыстыру; рецепторларды шатастырмай, бұлшықет ұзындығы мен созылу жылдамдығы туралы ақпаратты керілу күші туралы ақпараттан ажырату."],
    ["Моносинапстық қозу және реципрокты тежелу", "Сызбада созылған бұлшықеттің альфа-мотонейрондарын Ia-афференттің тікелей қоздыруын және антагонист мотонейрондарға тежегіш интернейрон арқылы баратын бөлек жолды көрсету; әр тармақтағы орталық синапстар санын анықтау."],
    ["Жағдай өзгергендегі жауапты болжау", "Бақыланатын жағдайларда Ia-афференттердің жылдам және баяу созылуға жауаптарын салыстыру, гамма-мотонейрондардың ұршық сезімталдығын реттеудегі рөлін түсіндіру; балғамен соғу күшін тікелей өлшенген рефлекс күші деп қабылдамау."],
    ["Тізе рефлексін бағалау және қорытынды шегі", "Тізе рефлексі әлсіз не асимметриялы болса, афференттік, орталық және эфференттік буындардың ықтимал бұзылыстарын және төмендеуші жолдардың әсерін атау; бір жауаппен диагноз қоймай, екі жақты салыстыруды және Ендрассик тәсілін ұсыну."],
  ],
};

export function createModuleSevenObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-7-objective-" + (index + 1), title, description,
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
