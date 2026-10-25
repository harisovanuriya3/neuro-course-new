import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 9 clinical bridge: time-dependent reflex findings after spinal cord injury.
// Source review: Ganong 23e, chapter 16, PDF 261; Guyton & Hall 13e,
// chapter 55, PDF 673; C. L. Ghai 8e, clinical reflex examination, PDF 313–315.
// This is a teaching vignette, not a diagnostic algorithm or self-examination guide.
type Copy = {
  introduction: string;
  titles: [string, string, string, string, string];
  paragraphs: [string, string, string, string, string];
};
const data: Record<Language, Copy> = {
  RU: {
    introduction: "Клинический мост: как время после повреждения спинного мозга меняет интерпретацию сухожильных рефлексов.",
    titles: ["Наблюдение в разные сроки", "Механизм раннего угнетения", "Возвращение сегментарной активности", "Что ещё необходимо проверить", "Границы вывода и безопасность"],
    paragraphs: [
      "Учебный случай: взрослый пациент после тяжёлой травмы грудного отдела позвоночника находится под наблюдением специалистов. В первые часы ниже предполагаемого уровня повреждения отмечаются выраженная слабость движений, сниженный тонус и слабые сухожильные рефлексы. Спустя несколько недель некоторые рефлексы становятся более выраженными, но произвольные движения по-прежнему существенно нарушены. Почему поздняя гиперрефлексия не доказывает восстановления проводящих путей к головному мозгу?",
      "Острое угнетение сегментарных рефлексов после тяжёлого повреждения спинного мозга называют спинальным шоком. Один из механизмов — внезапная потеря нисходящего тонического возбуждающего влияния на спинальные нейроны. Сохранённые ниже очага локальные рефлекторные цепи могут временно отвечать слабее. Это не означает, что каждый мотонейрон или интернейрон анатомически разрушен; выраженность и продолжительность изменений у людей различаются.",
      "Позднее возбудимость сохранённых спинальных цепей может повышаться, и сухожильные либо сгибательные рефлексы могут возвращаться или усиливаться. Изменение чувствительности к входящим сигналам и перестройка связей обсуждаются как возможные механизмы; один рефлекс не позволяет доказать конкретный клеточный механизм. Возвращение коленного рефлекса означает наличие работающих компонентов его дуги, но не подтверждает восстановление произвольного нисходящего контроля или самостоятельной ходьбы.",
      "Оцените динамику, уровень и полноту неврологического дефицита: силу и произвольные движения, чувствительность, тонус, несколько рефлексов, функцию тазовых органов и сопутствующие повреждения. Различайте спинальный шок (временное угнетение рефлекторной активности) и нейрогенный шок (гемодинамическое нарушение вследствие утраты симпатического тонуса, возможное при высоком поражении). Артериальное давление и частота пульса оцениваются отдельно; отсутствие гипотензии не исключает спинальный шок.",
      "По одному ослабленному или усиленному сухожильному рефлексу нельзя определить точный сегмент, полноту повреждения, прогноз ходьбы или диагноз. Рефлекторная дуга включает чувствительный вход, сегментарные связи, мотонейрон, периферический нерв и мышцу, а её возбудимость зависит от нисходящего контроля и условий осмотра. Подозрение на новую травму спинного мозга, нарастающую слабость или нарушение функций тазовых органов требует срочной профессиональной оценки; студент не должен самостоятельно провоцировать болезненные рефлексы."
    ]
  },
  EN: {
    introduction: "Clinical bridge: why time after spinal cord injury changes the interpretation of tendon reflexes.",
    titles: ["Observations at different times", "Mechanism of early depression", "Return of segmental activity", "Additional findings to assess", "Limits of inference and safety"],
    paragraphs: [
      "Teaching case: an adult with a severe thoracic spinal injury is under specialist care. In the first hours, movement below the suspected injury level is markedly weak, muscle tone is reduced and tendon reflexes are diminished. Several weeks later some reflexes are more brisk, although voluntary movement remains severely impaired. Why does later hyperreflexia not demonstrate that descending pathways to and from the brain have recovered?",
      "The early depression of segmental reflexes after severe spinal cord injury is called spinal shock. Abrupt loss of tonic descending facilitation of spinal neurons is one important mechanism. Local reflex circuits that remain anatomically intact below the lesion may temporarily respond poorly. This does not imply that every motor neuron or interneuron has been destroyed; severity and duration of the response vary in humans.",
      "Later, excitability of surviving spinal circuits may increase, and tendon or flexor reflexes may reappear or become exaggerated. Changes in responsiveness to afferent input and circuit reorganization are proposed contributors, but a single reflex cannot establish a specific cellular mechanism. Recovery of a knee jerk demonstrates that components of its local arc are functional; it does not establish recovery of voluntary descending control or independent walking.",
      "Assess the time course, level and completeness of the neurological deficit: strength and voluntary movement, sensation, tone, multiple reflexes, bladder and bowel function, and associated injuries. Distinguish spinal shock (transient depression of spinal reflex activity) from neurogenic shock (a hemodynamic disturbance due to loss of sympathetic tone that may accompany higher lesions). Blood pressure and pulse must be assessed separately; normal blood pressure does not exclude spinal shock.",
      "A single reduced or brisk tendon reflex cannot establish the exact segment, completeness of injury, walking prognosis or diagnosis. The reflex arc includes sensory input, segmental connections, motor neuron, peripheral nerve and muscle, and its excitability depends on descending influences and examination conditions. Suspected new spinal injury, progressive weakness or new bladder or bowel dysfunction requires urgent professional assessment; students must not provoke painful reflexes on their own."
    ]
  },
  KZ: {
    introduction: "Клиникалық байланыс: жұлын зақымынан кейінгі уақыт сіңір рефлекстерін түсіндіруге қалай әсер етеді.",
    titles: ["Әртүрлі кезеңдегі бақылау", "Ерте тежелудің механизмі", "Сегменттік белсенділіктің қайта пайда болуы", "Қосымша нені тексеру қажет", "Қорытындының шегі және қауіпсіздік"],
    paragraphs: [
      "Оқу жағдайы: кеуде бөліміндегі жұлын ауыр зақымданған ересек науқас мамандардың бақылауында. Алғашқы сағаттарда болжамды зақым деңгейінен төмен ерікті қимылдар айқын әлсіреген, бұлшықет тонусы төмен және сіңір рефлекстері бәсең. Бірнеше аптадан кейін кейбір рефлекстер күшейеді, бірақ ерікті қимылдар әлі де едәуір бұзылған. Неліктен кейінгі гиперрефлексия ми мен жұлын арасындағы төмендеуші жолдардың қалпына келгенін дәлелдемейді?",
      "Жұлынның ауыр зақымынан кейін сегменттік рефлекстердің бастапқы бәсеңдеуі жұлындық шок деп аталады. Оның маңызды механизмдерінің бірі — жұлын нейрондарына жоғарыдан келетін тұрақты қоздырушы ықпалдың кенет үзілуі. Зақымнан төмен анатомиялық тұрғыдан сақталған жергілікті рефлекстік тізбектер уақытша әлсіз жауап беруі мүмкін. Бұл барлық мотонейрондар мен интернейрондар жойылды деген сөз емес; адамда өзгерістердің ұзақтығы мен айқындығы әртүрлі болады.",
      "Кейін сақталған жұлындық тізбектердің қозғыштығы артып, сіңір немесе бүгу рефлекстері қайта пайда болуы не күшеюі мүмкін. Афференттік кіріске сезімталдықтың өзгеруі және байланыстардың қайта құрылуы ықтимал механизмдер ретінде қарастырылады, бірақ бір рефлекс нақты жасушалық механизмді дәлелдемейді. Тізе рефлексінің қайта пайда болуы оның жергілікті доғасының кейбір бөліктері жұмыс істейтінін көрсетеді; бұл ерікті төмендеуші бақылаудың немесе өздігінен жүрудің қалпына келгенін білдірмейді.",
      "Неврологиялық бұзылыстың уақыт бойынша өзгерісін, деңгейі мен толықтығын бағалаңыз: күш пен ерікті қозғалыстарды, сезімталдықты, тонусты, бірнеше рефлексті, қуық пен ішек қызметін және қатар жүретін жарақаттарды тексеріңіз. Жұлындық шокты (жұлын рефлекстерінің уақытша бәсеңдеуі) нейрогендік шоктан (жоғары деңгейдегі зақымда симпатикалық тонустың жоғалуына байланысты болуы мүмкін гемодинамикалық бұзылыс) ажыратыңыз. Қан қысымы мен тамыр соғысы бөлек бағаланады; гипотензияның болмауы жұлындық шокты жоққа шығармайды.",
      "Бір ғана әлсіз не күшейген сіңір рефлексі зақымның дәл сегментін, толықтығын, жүру болжамын немесе диагнозды анықтамайды. Рефлекстік доғаға сезімтал кіріс, сегменттік байланыстар, мотонейрон, шеткері жүйке және бұлшықет қатысады; оның қозғыштығына жоғарыдан келетін ықпал мен тексеру жағдайлары әсер етеді. Жұлынның жаңа жарақатына күдік, үдемелі әлсіздік немесе қуық пен ішек қызметінің жаңа бұзылысы болса, шұғыл медициналық бағалау қажет; студенттер ауырсындыратын рефлекстерді өз бетінше қоздырмауы тиіс."
    ]
  }
};

export function createModuleNineClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const destinations = [
    ["cases", "theory"],
    ["theory", "one-minute"],
    ["theory", "practice"],
    ["practice", "cases"],
    ["tests", "questions"]
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.introduction,
    cards: copy.titles.map((title, i) => ({
      id: "module-9-clinical-" + (i + 1),
      title,
      paragraphs: [copy.paragraphs[i]],
      links: destinations[i].map(section => ({ section }))
    }))
  };
}
