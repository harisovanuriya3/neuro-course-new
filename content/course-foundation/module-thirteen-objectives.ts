import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 13: cerebellum. Source reading in user's Library:
// Guyton & Hall 13e, ch. 57, printed pp. 721–725 (PDF pp. 688–692);
// Ganong 23e, ch. 16, printed pp. 242–243 (PDF pp. 254–255);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–287 (PDF pp. 307–309).
// These are learning outcomes, not a diagnostic algorithm or a claim that the
// educational simulation directly measures human cerebellar nuclei.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Различить функциональные зоны мозжечка",
      "На схеме связать клочково-узелковую долю и вестибулярные связи с равновесием и движениями глаз; червь и промежуточные зоны — с позой и коррекцией движений; латеральные полушария и зубчатое ядро — с подготовкой и согласованием последовательностей движений. Не представлять зоны полностью независимыми."],
    ["Объяснить входы и выходы мозжечковой сети",
      "Проследить сенсорные и двигательные входы через мшистые и лазающие волокна; показать тормозное ГАМК-ергическое влияние клеток Пуркинье на глубокие ядра мозжечка и возбуждающий вход к этим ядрам. Указать, что моторное влияние осуществляется через стволовые и таламокорковые сети, а не прямым нервом к мышце."],
    ["Связать обратную связь с точностью и временем движения",
      "Сопоставить сведения о планируемом движении с проприоцептивной и другой сенсорной информацией о его выполнении. Объяснить роль мозжечковых сетей в коррекции ошибки, времени включения мышц-агонистов и антагонистов и моторном обучении, не сводя все эти функции к единственному линейному механизму."],
    ["Проверить прогноз в учебной симуляции",
      "При одинаковом задании сравнить условия с доступной и ограниченной сенсорной обратной связью. Заранее выбрать измеряемый показатель — конечную ошибку траектории, точность или время коррекции — и сформулировать проверяемый прогноз. Различать условный результат модели, поведение испытуемого и прямую запись нейронной активности."],
    ["Различить признаки нарушения координации и слабости",
      "По описанию пробы «палец — нос» объяснить дисметрию, интенционный тремор и возможную атаксию; отдельно оценивать мышечную силу, зрение и проприоцепцию. Мозжечковое поражение часто даёт ипсилатеральные конечностные признаки, но по одной пробе нельзя достоверно локализовать очаг или установить диагноз."]
  ],
  EN: [
    ["Distinguish functional regions of the cerebellum",
      "On a diagram relate the flocculonodular lobe and vestibular connections to balance and eye movements; the vermis and intermediate zones to posture and movement correction; and lateral hemispheres and dentate nucleus to preparation and sequencing of movements. Do not treat these regions as fully independent."],
    ["Explain inputs and outputs of cerebellar circuits",
      "Trace sensory and movement-related inputs through mossy and climbing fibres; identify inhibitory GABAergic Purkinje-cell output to deep cerebellar nuclei alongside excitatory afferent input to those nuclei. Explain that motor effects pass through brainstem and thalamocortical circuits, not a direct nerve to muscle."],
    ["Connect feedback with movement accuracy and timing",
      "Compare information about intended movement with proprioceptive and other sensory information about ongoing performance. Explain the contribution of cerebellar networks to error correction, timing of agonist–antagonist activity and motor learning, without reducing all these functions to a single linear mechanism."],
    ["Make a testable prediction in an educational simulation",
      "Compare the same task with available versus restricted sensory feedback. Specify a measurable outcome in advance: endpoint trajectory error, movement accuracy or correction time. Distinguish a simulated output from an observed human movement and from direct neuronal recordings."],
    ["Distinguish incoordination from muscle weakness",
      "From a finger-to-nose task description identify dysmetria, intention tremor and possible ataxia, while considering strength, vision and proprioception separately. Cerebellar lesions often cause ipsilateral limb findings, but one task alone cannot establish a lesion location or diagnosis."]
  ],
  KZ: [
    ["Мишықтың функциялық аймақтарын ажырату",
      "Сызбада флоккулонодулярлық бөлік пен вестибулярлық байланыстарды тепе-теңдік және көз қозғалыстарымен; құртша мен аралық аймақтарды дене қалпы және қимылды түзетумен; латералдық жартышарлар мен тісті ядроны қимылдар тізбегін дайындау және үйлестірумен байланыстыру. Аймақтарды бір-бірінен толық тәуелсіз деп есептемеу."],
    ["Мишық желілерінің кірістері мен шығыстарын түсіндіру",
      "Сенсорлық және қозғалысқа қатысты кірістерді мүкті және өрмелеуші талшықтар арқылы көрсету; Пуркинье жасушаларының мишықтың терең ядроларына ГАМҚ-ергиялық тежеуші әсерін және осы ядроларға келетін қоздырушы кірісті ажырату. Қимылға ықпал ми сабауы мен таламо-қыртыстық желілер арқылы жүретінін, бұлшықетке тікелей жүйке емес екенін түсіндіру."],
    ["Кері байланысты қимыл дәлдігі және уақытымен байланыстыру",
      "Жоспарланған қозғалыс туралы ақпаратты орындалып жатқан қимыл жөніндегі проприоцепциялық және басқа сенсорлық ақпаратпен салыстыру. Мишық желілерінің қатені түзетуге, агонист пен антагонист бұлшықеттер белсенділігінің уақытын үйлестіруге және моторлық үйренуге қатысуын түсіндіру; мұны бір ғана сызықтық тетікке теңемеу."],
    ["Оқу симуляциясында тексерілетін болжам жасау",
      "Бірдей тапсырманы сенсорлық кері байланыс сақталған және шектелген жағдайларда салыстыру. Алдын ала өлшенетін көрсеткішті — траекторияның соңғы қатесін, қимыл дәлдігін немесе түзету уақытын — таңдап, тексерілетін болжам ұсыну. Модель нәтижесін адамның нақты қимылынан және нейрон белсенділігін тікелей тіркеуден ажырату."],
    ["Үйлесім бұзылысын бұлшықет әлсіздігінен ажырату",
      "«Саусақ — мұрын» сынамасының сипаттамасы бойынша дисметрияны, интенциялық треморды және ықтимал атаксияны тану; бұлшықет күшін, көруді және проприоцепцияны бөлек бағалау. Мишық зақымында аяқ-қол белгілері көбіне сол жақтағы зақымға сәйкес ипсилатералды көрінеді, бірақ бір сынама бойынша ошақты дәл анықтау немесе диагноз қоюға болмайды."]
  ]
};

export function createModuleThirteenObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-13-objective-" + (index + 1), title, description,
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
