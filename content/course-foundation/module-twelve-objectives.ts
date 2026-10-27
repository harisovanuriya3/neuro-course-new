import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 12: basal ganglia. Evidence read from user's Library:
// Guyton & Hall 13e, ch. 57, printed pp. 730–735 (PDF 697–702);
// Ganong 23e, ch. 16, printed pp. 250–253 (PDF 262–265);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–288 (PDF 307–310).
// Direct/indirect pathways are explanatory models, not exhaustive causal maps.
// These educational outcomes do not authorize unsupervised patient examination.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Обозначить узлы корково-подкоркового двигательного контура",
      "На схеме различить хвостатое ядро и скорлупу (вместе — стриатум), наружный и внутренний сегменты бледного шара (GPe, GPi), субталамическое ядро, чёрную субстанцию (SNc, SNr), таламус и кору. Отметить входы и тормозные выходы; не изображать базальные ганглии прямым нервом к мышце."],
    ["Сравнить прямой и непрямой пути с учётом ограничений модели",
      "Проследить корковый возбуждающий вход в стриатум и тоническое ГАМК-ергическое торможение таламуса со стороны GPi/SNr. В канонической схеме прямой путь ослабляет это торможение, а непрямой через GPe и субталамическое ядро усиливает его. Указать, что реальные пути действуют параллельно и не задают однозначно отдельное движение."],
    ["Объяснить роль дофамина в выборе и запуске действия",
      "Сопоставить нигростриарную проекцию SNc с D1- и D2-зависимой модуляцией стриарных нейронов в учебной модели. Не считать дофамин универсальным возбуждающим медиатором и не приравнивать снижение двигательной инициативы к снижению силы мышцы; обсудить взаимодействие с корой и другими сетями."],
    ["Сформулировать проверяемый прогноз для учебной модели",
      "При изменении условия выбора между двумя движениями предсказать направление изменения латентности начала, доли ошибочных выборов или масштаба ответа. Сохранять неизменными сенсорный стимул и требования к мышечной силе; отличать модельный результат от прямого измерения активности конкретного ядра."],
    ["Различить гипокинетические и гиперкинетические проявления",
      "По описанию ситуации сопоставить брадикинезию, ригидность и возможный тремор покоя с гипокинетическим синдромом, а хореические движения — с гиперкинетическим. Отдельно отличить мышечную слабость и мозжечковую дисметрию. Не ставить болезнь Паркинсона или иную нозологию по одному признаку и не считать термин «экстрапирамидный» отдельным прямым трактом к мышце."]
  ],
  EN: [
    ["Identify nodes of the cortico-basal-ganglia motor loop",
      "On a diagram distinguish caudate and putamen (together, striatum), external and internal globus pallidus (GPe, GPi), subthalamic nucleus, substantia nigra (SNc, SNr), thalamus and cortex. Label major inputs and inhibitory outputs; do not depict basal ganglia as a direct nerve to muscle."],
    ["Compare direct and indirect pathways without overinterpreting them",
      "Trace excitatory cortical input to striatum and tonic GABAergic inhibition of thalamus by GPi/SNr. In the canonical model, the direct pathway reduces this inhibition; the indirect pathway via GPe and subthalamic nucleus increases it. Explain that real pathways operate in parallel and do not uniquely determine a single movement."],
    ["Explain dopamine's modulatory role in action initiation",
      "Relate the nigrostriatal SNc projection to D1- and D2-dependent modulation of striatal neurons in an introductory model. Do not treat dopamine as uniformly excitatory or equate reduced spontaneous movement with loss of muscle strength; discuss interactions with cortical and other circuits."],
    ["Make a testable prediction in an educational simulation",
      "When a choice condition between two actions changes, predict the direction of change in movement-onset latency, erroneous-choice frequency or response amplitude. Hold sensory input and required muscle force constant; distinguish simulated outcomes from direct recordings of activity in a particular nucleus."],
    ["Distinguish hypokinetic and hyperkinetic motor findings",
      "Compare bradykinesia, rigidity and possible rest tremor in a hypokinetic presentation with choreiform movements in a hyperkinetic presentation. Distinguish weakness and cerebellar dysmetria. Do not diagnose Parkinson disease or another disorder from one sign, or interpret 'extrapyramidal' as a single direct tract to muscle."]
  ],
  KZ: [
    ["Қыртыс пен базальды ганглийлер контурының бөліктерін көрсету",
      "Сызбада құйрықты ядро мен қабықты (бірге — стриатум), бозғылт шардың сыртқы және ішкі сегменттерін (GPe, GPi), субталамустық ядроны, қара субстанцияны (SNc, SNr), таламус пен қыртысты ажырату. Негізгі кірістер мен тежеуші шығыстарды белгілеу; базальды ганглийлерді бұлшықетке тікелей баратын жүйке ретінде көрсетпеу."],
    ["Тікелей және жанама жолдарды модель шегінде салыстыру",
      "Қыртыстан стриатумға қоздырушы кірісті және GPi/SNr тарапынан таламусқа тұрақты ГАМҚ-ергиялық тежелуді көрсету. Канондық модельде тікелей жол бұл тежелуді азайтады, ал GPe мен субталамустық ядро арқылы өтетін жанама жол күшейтеді. Нақты контурлардың қатар жұмыс істейтінін және жеке қозғалысты бір ғана жол анықтамайтынын түсіндіру."],
    ["Дофаминнің әрекетті бастаудағы реттеуші рөлін түсіндіру",
      "SNc-ден стриатумға баратын нигростриарлық проекцияны оқу моделіндегі D1- және D2-рецепторларына тәуелді әсерлермен байланыстыру. Дофамин барлық нейрондарды бірдей қоздырады деп есептемеу және қозғалыс басталуының баяулауын бұлшықет күшінің азаюымен теңестірмеу; қыртыстық және басқа контурлардың рөлін көрсету."],
    ["Оқу симуляциясына тексерілетін болжам жасау",
      "Екі әрекеттің бірін таңдау шарты өзгергенде қозғалыстың басталу латенттілігі, қате таңдау жиілігі немесе жауап амплитудасы қалай өзгеруі мүмкін екенін болжау. Сенсорлық кіріс пен қажетті бұлшықет күшін тұрақты ұстау; модель нәтижесін нақты ядроның нейрондық белсенділігін тікелей өлшеумен шатастырмау."],
    ["Гипокинетикалық және гиперкинетикалық белгілерді ажырату",
      "Брадикинезия, ригидтілік және болуы мүмкін тыныштық треморын гипокинетикалық көрініспен, ал хореялық қимылдарды гиперкинетикалық көрініспен салыстыру. Бұлшықет әлсіздігі мен мишықтық дисметрияны бөлек ажырату. Бір белгімен Паркинсон ауруы не басқа диагноз қоймау; «экстрапирамидалық» атауын бұлшықетке тікелей баратын жеке жол деп түсінбеу."]
  ]
};

export function createModuleTwelveObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-12-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [
        { section: "pretest" }, { section: "theory" }, { section: "interactive" },
        { section: "practice" }, { section: "cases" },
      ],
    },
  };
}
