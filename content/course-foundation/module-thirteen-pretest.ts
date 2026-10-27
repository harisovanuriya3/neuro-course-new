import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 13: cerebellar circuits and clinical coordination; ungraded pretest.
// Cross-checked against Library originals: Guyton & Hall 13e, ch. 57,
// printed pp. 723–725 (PDF 690–692); Ganong 23e, ch. 16,
// printed pp. 254–257 (PDF 266–269); C. L. Ghai 8e,
// printed pp. 287–290 (PDF 309–312).
// Qualitative models and described tasks cannot establish a clinical diagnosis.
type Choice = "a" | "b" | "c" | "d";
type Item = { prompt: string; options: [string, string, string, string]; answer: Choice; explanation: string };
type Locale = { intro: string; questions: [Item, Item, Item] };
const localized: Record<Language, Locale> = {
  "RU": {
    "intro": "Три предварительных вопроса о мозжечковых входах и выходах, коррекции ошибки и клинических признаках нарушения координации. Это диагностическая самопроверка без итоговой оценки. Сначала выберите ответ, затем прочитайте физиологическое объяснение. Учебные ситуации не позволяют установить диагноз по одной пробе.",
    "questions": [
      {
        "prompt": "В учебной схеме мшистые и лазающие волокна посылают возбуждающие коллатерали к глубоким ядрам мозжечка. Одновременно активируются клетки Пуркинье коры. Какой знак имеет влияние клеток Пуркинье на глубокие ядра?",
        "options": [
          "Клетки Пуркинье непосредственно возбуждают альфа-мотонейроны спинного мозга, минуя глубокие ядра и ствол мозга.",
          "Клетки Пуркинье выделяют глутамат и всегда усиливают активность глубоких ядер при каждом движении.",
          "Клетки Пуркинье оказывают ГАМК-ергическое тормозящее влияние на глубокие ядра; их выход сочетается с возбуждающими афферентными входами.",
          "Клетки Пуркинье служат единственным источником возбуждающих входов глубоких ядер, а мшистые волокна к ним не подходят."
        ],
        "answer": "c",
        "explanation": "Аксоны клеток Пуркинье являются главным выходом коры мозжечка и преимущественно тормозят нейроны глубоких ядер с помощью ГАМК. Мшистые и лазающие волокна дают возбуждающие коллатерали к этим ядрам. Поэтому итоговый выход зависит от сочетания возбуждения и торможения, а не от прямой команды мозжечка мышце. Это принцип качественной схемы, не точное предсказание частоты импульсов."
      },
      {
        "prompt": "Человек повторяет точное движение к видимой цели. Затем зрительная информация о движущейся руке ограничена, но проприоцептивные сигналы сохранены. Какой прогноз о коррекции движения наиболее обоснован?",
        "options": [
          "Точность может измениться в зависимости от задачи и доступных сигналов; проприоцепция и предварительная моторная команда продолжают участвовать в движении.",
          "Без зрительного контроля все сигналы от мышечных веретён прекращаются, поэтому мозжечок не получает никакой сенсорной информации.",
          "Ограничение зрения всегда делает конечную ошибку равной нулю, потому что мозжечок полностью заменяет обратную связь.",
          "Ограничение зрения полностью прекращает движение, поскольку двигательная команда формируется исключительно в мозжечке."
        ],
        "answer": "a",
        "explanation": "Мозжечковые сети участвуют в сопоставлении информации о планируемом и выполняемом движении и в его адаптивной коррекции. Зрительная обратная связь полезна, но не единственна: проприоцептивные и другие входы сохраняются. Величина ошибки зависит от конкретной задачи и условий; нельзя заранее обещать ни полную утрату движения, ни обязательное улучшение. Модельная симуляция не равна записи активности мозжечковых нейронов."
      },
      {
        "prompt": "В описании пробы «палец — нос» рука неоднократно проходит мимо цели, а колебания усиливаются при приближении к ней. При отдельном исследовании максимальная мышечная сила сохранена. Какая интерпретация наиболее обоснована?",
        "options": [
          "Сохранённая сила доказывает отсутствие любых нарушений центральной нервной системы и исключает необходимость оценки координации.",
          "Промахивание доказывает изолированное поражение кортикоспинального тракта, даже если другие неврологические данные неизвестны.",
          "Нарастание колебаний при приближении к цели всегда указывает на тремор покоя, поэтому проверка чувствительности не нужна.",
          "Описание совместимо с дисметрией и интенционным тремором; следует отдельно оценить зрение, проприоцепцию, силу и другие признаки, не устанавливая диагноз по одной пробе."
        ],
        "answer": "d",
        "explanation": "Дисметрия означает ошибку масштаба или конечной точки движения; интенционный тремор усиливается при приближении к цели. Эти признаки могут встречаться при дисфункции мозжечковых сетей, даже когда грубая мышечная сила сохранена. Но нарушение зрения, проприоцепции и другие причины также влияют на пробу. Одна проба не определяет ни диагноз, ни точную локализацию очага."
      }
    ]
  },
  "EN": {
    "intro": "Three ungraded diagnostic questions on cerebellar inputs and outputs, error correction, and signs of impaired coordination. Choose an answer before reading the physiological explanation. These simplified educational scenarios cannot establish a diagnosis from a single bedside task.",
    "questions": [
      {
        "prompt": "In a teaching circuit, mossy and climbing fibres send excitatory collaterals to deep cerebellar nuclei while cerebellar cortical Purkinje cells are active. What is the sign of Purkinje-cell influence on the deep nuclei?",
        "options": [
          "Purkinje cells directly excite spinal alpha motor neurons, bypassing deep nuclei and the brainstem entirely.",
          "Purkinje cells release glutamate and invariably increase deep nuclear firing during every movement.",
          "Purkinje cells provide GABAergic inhibition to deep nuclei, acting alongside excitatory afferent inputs to those nuclei.",
          "Purkinje cells are the only excitatory input to deep nuclei, and mossy fibres have no collaterals there."
        ],
        "answer": "c",
        "explanation": "Purkinje-cell axons provide the principal output of the cerebellar cortex and mainly inhibit deep nuclear neurons through GABA. Mossy and climbing fibres also send excitatory collaterals to deep nuclei. Nuclear output therefore reflects the balance and timing of excitation and inhibition; the cerebellum does not issue a direct motor-nerve command to muscle. This is a qualitative circuit principle, not a precise firing-rate prediction."
      },
      {
        "prompt": "A learner repeatedly reaches towards a visible target. Visual information about the moving hand is then restricted, but proprioceptive input remains available. Which prediction about movement correction is most justified?",
        "options": [
          "Accuracy may change depending on the task and remaining signals; proprioceptive feedback and feedforward motor commands can still contribute.",
          "Restricting vision stops all muscle-spindle signals, so the cerebellum receives no sensory information at all.",
          "Removing visual feedback invariably reduces endpoint error to zero because the cerebellum replaces every sensory input.",
          "Removing visual feedback completely prevents reaching because the motor command originates exclusively in the cerebellum."
        ],
        "answer": "a",
        "explanation": "Cerebellar circuits contribute to comparing intended and ongoing movement and adapting corrections. Visual feedback is useful but not the only input: proprioceptive and other sensory information remains available. The size and direction of an accuracy change depend on task demands and conditions, so neither total loss of movement nor guaranteed improvement follows. An educational simulation output is not a direct neuronal recording."
      },
      {
        "prompt": "During a finger-to-nose task, a hand repeatedly overshoots the target and oscillation grows as it approaches the nose. A separate strength assessment shows preserved maximal muscle power. Which interpretation is most defensible?",
        "options": [
          "Preserved strength proves that the central nervous system is intact and that coordination need not be assessed.",
          "Overshooting proves an isolated corticospinal lesion even though no other neurological findings are available.",
          "Increasing oscillation near the target always means resting tremor, so proprioception need not be considered.",
          "The description is compatible with dysmetria and intention tremor; vision, proprioception, strength and other signs require separate assessment before any clinical conclusion."
        ],
        "answer": "d",
        "explanation": "Dysmetria refers to an error in movement amplitude or endpoint; intention tremor becomes more prominent when approaching a target. These findings may accompany dysfunction of cerebellar networks even when gross strength is preserved. Visual or proprioceptive impairment and other causes may affect performance, however. A single task cannot determine a diagnosis or precisely localize a lesion."
      }
    ]
  },
  "KZ": {
    "intro": "Мишықтың кірістері мен шығыстары, қозғалыс қатесін түзету және үйлесім бұзылысының белгілері туралы үш бастапқы диагностикалық сұрақ. Бұл қорытынды баға қойылмайтын өзіндік тексеру. Алдымен жауапты таңдаңыз, кейін физиологиялық түсіндірмені оқыңыз. Бір ғана сынама бойынша диагноз қоюға болмайды.",
    "questions": [
      {
        "prompt": "Оқу сызбасында мүкті және өрмелеуші талшықтар мишықтың терең ядроларына қоздырушы тармақтар береді. Сол уақытта мишық қыртысының Пуркинье жасушалары белсенді. Олардың терең ядроларға әсерінің сипаты қандай?",
        "options": [
          "Пуркинье жасушалары терең ядролар мен ми сабауын айналып өтіп, жұлынның альфа-мотонейрондарын тікелей қоздырады.",
          "Пуркинье жасушалары глутамат бөліп, әр қозғалыста терең ядролардың белсенділігін міндетті түрде арттырады.",
          "Пуркинье жасушалары терең ядроларға ГАМҚ арқылы тежеуші әсер етеді; бұл әсер афференттерден келетін қоздырушы кірістермен қатар жүреді.",
          "Пуркинье жасушалары терең ядролардың жалғыз қоздырушы кірісі, ал мүкті талшықтар оларға тармақ бермейді."
        ],
        "answer": "c",
        "explanation": "Пуркинье жасушаларының аксондары мишық қыртысының негізгі шығысын құрайды және терең ядролардың нейрондарын көбіне ГАМҚ арқылы тежейді. Мүкті және өрмелеуші талшықтар терең ядроларға қоздырушы тармақтар береді. Сондықтан ядролардың шығысы қозу мен тежелудің өзара әсеріне тәуелді; мишық бұлшықетке тікелей моторлық жүйке командасын бермейді. Бұл импульс жиілігін дәл болжайтын өлшем емес, сапалық оқу сызбасы."
      },
      {
        "prompt": "Адам көрінетін нысанаға бағытталған дәл қимылды бірнеше рет қайталайды. Кейін қозғалып жатқан қол туралы көру ақпараты шектеледі, бірақ проприоцепциялық кіріс сақталады. Қимылды түзетуге қатысты қандай болжам негіздірек?",
        "options": [
          "Дәлдік тапсырмаға және сақталған сигналдарға қарай өзгеруі мүмкін; проприоцепциялық кері байланыс пен алдын ала моторлық команда қимылға қатыса береді.",
          "Көру шектелсе, бұлшықет ұршықтарынан барлық сигнал тоқтайды, сондықтан мишық ешқандай сенсорлық ақпарат алмайды.",
          "Көру кері байланысы жойылса, мишық барлық кірістерді алмастырып, қимылдың соңғы қатесін міндетті түрде нөлге жеткізеді.",
          "Көру шектелгенде қимыл толық тоқтайды, өйткені моторлық команда тек мишықта пайда болады."
        ],
        "answer": "a",
        "explanation": "Мишық желілері жоспарланған және орындалып жатқан қимыл туралы ақпаратты салыстыруға және түзетуді бейімдеуге қатысады. Көру кері байланысы маңызды, бірақ жалғыз ақпарат көзі емес: проприоцепциялық және басқа сенсорлық кірістер сақталады. Қатенің мөлшері нақты тапсырма мен жағдайларға байланысты, сондықтан қозғалыстың толық жоғалуын да, міндетті жақсаруын да болжауға болмайды. Оқу симуляциясы мишық нейрондарының тікелей жазбасы емес."
      },
      {
        "prompt": "«Саусақ — мұрын» сынамасында қол нысанадан қайта-қайта асып кетеді, ал мұрынға жақындаған сайын тербеліс күшейеді. Бөлек тексергенде бұлшықеттің ең жоғары күші сақталған. Қай түсіндіру ең негізді?",
        "options": [
          "Күштің сақталуы орталық жүйке жүйесінің толық сау екенін дәлелдейді және үйлесімді тексеру қажет емес.",
          "Нысанадан асып кету басқа неврологиялық деректерсіз-ақ кортикоспиналдық жолдың жеке зақымын дәлелдейді.",
          "Нысанаға жақындағанда тербелістің күшеюі әрқашан тыныштық треморы, сондықтан проприоцепцияны тексеру қажет емес.",
          "Сипаттама дисметрия мен интенциялық треморға сәйкес келуі мүмкін; қорытындыға дейін көруді, проприоцепцияны, күшті және басқа белгілерді бөлек бағалау керек."
        ],
        "answer": "d",
        "explanation": "Дисметрия — қозғалыс амплитудасының немесе соңғы нүктесінің қателігі; интенциялық тремор нысанаға жақындағанда айқынырақ болады. Бұл белгілер жалпы бұлшықет күші сақталғанда да мишық желілерінің бұзылуымен қатар жүруі мүмкін. Алайда көру, проприоцепция және басқа себептер де сынамаға әсер етеді. Бір сынама диагнозды немесе зақым ошағының нақты орнын анықтамайды."
      }
    ]
  }
};

export function createModuleThirteenPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: data.intro,
    questions: data.questions.map((item, index) => ({
      id: ["module-13-pretest-purkinje", "module-13-pretest-feedback", "module-13-pretest-dysmetria"][index],
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((text, i) => ({ id: (["a", "b", "c", "d"] as const)[i], text })),
      correctAnswer: item.answer,
      explanation: item.explanation,
      target: { section: "theory" as const }
    }))
  };
}
