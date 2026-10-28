import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 13: five authored cerebellar takeaways; this is a summary, not a scored test.
// Cross-checked with Library: Guyton & Hall 13e, ch. 57, printed pp. 721–729
// (PDF 688–696); Ganong 23e, ch. 16, printed pp. 254–258 (PDF 266–270);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–290 (PDF 307–312).
// Original wording; no protected textbook figures or passages reproduced.
// Cerebellar functional divisions are useful teaching categories, not exact lesion maps.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];

const takeaways: Record<Language, FiveTakeaways> = {
  "RU": [
    {
      "title": "Функциональные зоны решают разные задачи",
      "explanation": "Клочково-узелковая доля особенно важна для равновесия и согласования движений глаз; червь участвует в регуляции позы и осевых мышц, промежуточные зоны — в коррекции движений конечностей, латеральные отделы — в планировании сложных последовательностей. Границы этих функций не абсолютны."
    },
    {
      "title": "Мозжечок сопоставляет команду и обратную связь",
      "explanation": "Мозжечок получает сведения о планируемом движении через корково-мостовые связи и о выполнении движения через проприоцептивные и другие афферентные пути. Сопоставление ожидаемого и фактического состояния помогает своевременно корректировать движение; это не означает, что мозжечок непосредственно иннервирует мышцы."
    },
    {
      "title": "Клетки Пуркинье тормозят глубокие ядра",
      "explanation": "Мшистые и лазающие волокна возбуждают мозжечковые цепи и посылают возбуждающие коллатерали к глубоким ядрам. Клетки Пуркинье обеспечивают ГАМК-ергическое торможение глубоких ядер. Итоговый выход определяется сочетанием этих влияний, поэтому его нельзя описывать как только возбуждающий или только тормозный вход."
    },
    {
      "title": "Точность зависит от времени и адаптации",
      "explanation": "Мозжечковые сети участвуют в согласовании начала и завершения активности агонистов и антагонистов, а также в адаптации при изменении нагрузки. Расхождение между ожидаемым и полученным результатом может служить сигналом обучения, но моторное обучение не сводится к одному синапсу или одному виду пластичности."
    },
    {
      "title": "Дисметрия не равна мышечной слабости",
      "explanation": "Дисметрия означает ошибку амплитуды или точности целевого движения; интенционный тремор может усиливаться при приближении к цели. При исследовании отдельно оценивают силу, чувствительность, зрение и координацию. Одна проба «палец — нос» не устанавливает диагноз и не доказывает точную локализацию поражения."
    }
  ],
  "EN": [
    {
      "title": "Functional zones have distinct emphases",
      "explanation": "The flocculonodular lobe is especially important for balance and coordinated eye movements; the vermis contributes to posture and axial control, intermediate zones to limb adjustment, and lateral regions to planning complex movement sequences. These functional boundaries are not absolute."
    },
    {
      "title": "The cerebellum integrates plans and feedback",
      "explanation": "The cerebellum receives information about planned movement through corticopontine connections and about ongoing movement through proprioceptive and other afferent pathways. Comparing expected with actual states helps adjust action in time; the cerebellum does not directly innervate skeletal muscles."
    },
    {
      "title": "Purkinje cells inhibit deep nuclei",
      "explanation": "Mossy and climbing fibres excite cerebellar circuits and send excitatory collaterals to deep nuclei. Purkinje cells provide GABAergic inhibition to deep nuclei. The resulting output reflects both influences; it cannot be understood as a circuit receiving only excitation or only inhibition."
    },
    {
      "title": "Accuracy depends on timing and adaptation",
      "explanation": "Cerebellar networks help coordinate the onset and offset of agonist and antagonist activity and support adaptation when load changes. Differences between predicted and observed outcomes can contribute to learning, but motor learning cannot be reduced to one synapse or one form of plasticity."
    },
    {
      "title": "Dysmetria is not the same as weakness",
      "explanation": "Dysmetria is an error in the range or accuracy of goal-directed movement; intention tremor may increase as the target is approached. Strength, sensation, vision and coordination should be assessed separately. A single finger-to-nose test cannot establish a diagnosis or precisely localize a lesion."
    }
  ],
  "KZ": [
    {
      "title": "Функционалдық аймақтардың міндеттері әртүрлі",
      "explanation": "Үлпекше-түйіншек бөлігі тепе-теңдік пен көз қимылдарын үйлестіруде ерекше маңызды; құртша дене қалпы мен тұлға бұлшықеттерін реттеуге, аралық аймақтар аяқ-қол қимылын түзетуге, ал латералдық бөлімдер күрделі қимылдар тізбегін жоспарлауға қатысады. Бұл қызметтердің шекарасы абсолютті емес."
    },
    {
      "title": "Мишық жоспар мен кері байланысты салыстырады",
      "explanation": "Мишық жоспарланған қимыл туралы ақпаратты қыртыс-көпір байланыстары арқылы, ал орындалып жатқан қимыл туралы мәліметті проприоцептивтік және басқа афференттік жолдар арқылы алады. Күтілетін және нақты күйді салыстыру қимылды дер кезінде түзетуге көмектеседі; мишық қаңқа бұлшықеттерін тікелей жүйкелендірмейді."
    },
    {
      "title": "Пуркинье жасушалары терең ядроларды тежейді",
      "explanation": "Мүкті және өрмелегіш талшықтар мишық контурларын қоздырады әрі терең ядроларға қоздырушы коллатералдар береді. Пуркинье жасушалары терең ядроларға ГАМҚ-ергиялық тежеуші әсер көрсетеді. Соңғы шығыс осы әсерлердің үйлесуіне тәуелді, сондықтан контурды тек қоздырумен немесе тек тежелумен түсіндіруге болмайды."
    },
    {
      "title": "Дәлдік уақыттық үйлесім мен бейімделуге тәуелді",
      "explanation": "Мишық желілері агонист пен антагонист белсенділігінің басталуы мен аяқталуын үйлестіруге, жүктеме өзгергенде қимылды бейімдеуге қатысады. Күтілген және байқалған нәтиже арасындағы айырма үйренуге ықпал етуі мүмкін, бірақ қимылға үйренуді бір синапсқа немесе пластикалылықтың бір түріне ғана телуге болмайды."
    },
    {
      "title": "Дисметрия бұлшықет әлсіздігіне тең емес",
      "explanation": "Дисметрия — нысанаға бағытталған қимылдың ауқымы не дәлдігінің бұзылысы; интенциялық тремор нысанаға жақындағанда күшеюі мүмкін. Күшті, сезімталдықты, көруді және үйлесімділікті бөлек тексеру қажет. Жалғыз «саусақ — мұрын» сынамасы диагнозды да, зақымның нақты орнын да анықтамайды."
    }
  ]
};
const introductions: Record<Language, string> = {
  "RU": "Пять ключевых выводов по физиологии мозжечка: функциональные зоны, сенсорная обратная связь, клеточные цепи, временная настройка и клинические ограничения.",
  "EN": "Five essential takeaways about cerebellar physiology: functional zones, sensory feedback, cellular circuits, timing and adaptation, and the limits of clinical inference.",
  "KZ": "Мишық физиологиясының бес негізгі қорытындысы: функционалдық аймақтар, сезімдік кері байланыс, жасушалық контурлар, уақыттық реттеу және клиникалық қорытынды шектері."
};

export function createModuleThirteenSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: introductions[language],
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-13-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "clinical" }],
    })),
  };
}
