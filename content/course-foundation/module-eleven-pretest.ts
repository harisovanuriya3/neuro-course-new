import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 11: motor systems and movement control.
// Cross-checked with Guyton & Hall 13e, ch. 56 (print pp. 709–711;
// Library PDF pp. 677–679); Ganong 23e, ch. 16 (print pp. 241–244;
// Library PDF pp. 253–256); Ghai Practical Physiology 8e
// (print pp. 295–297; Library PDF pp. 317–319).
// Formative, ungraded diagnostic questions. No examination of real patients.
type Choice = "a" | "b" | "c" | "d";
type Item = {
  prompt: string;
  options: [string, string, string, string];
  answer: Choice;
  explanation: string;
};
type Locale = { intro: string; questions: [Item, Item, Item] };

const localized: Record<Language, Locale> = {
  RU: {
    intro: "Три диагностических вопроса по нисходящим двигательным путям, постуральной регуляции и сенсорной обратной связи. Они не оцениваются баллами. Сначала выберите ответ, затем сравните объяснение с механизмом. Схемы поражения условны и не предназначены для самостоятельной диагностики.",
    questions: [
      {
        prompt: "В учебной схеме повреждён правый латеральный кортикоспинальный тракт на шейном уровне, ниже перекрёста пирамид. На какой стороне преимущественно ожидается нарушение произвольных тонких движений конечностей ниже очага?",
        options: [
          "Только слева, потому что все кортикоспинальные волокна перекрещиваются повторно в каждом сегменте спинного мозга.",
          "Только двусторонне, потому что латеральный кортикоспинальный тракт не имеет перекрёста.",
          "Преимущественно справа: большая часть волокон уже перешла на противоположную сторону в каудальной части продолговатого мозга.",
          "Только в мышцах лица слева, потому что спинной тракт заканчивается исключительно в ядрах черепных нервов."
        ],
        answer: "c",
        explanation: "Большинство кортикоспинальных волокон перекрещивается в области пирамид продолговатого мозга. Правый латеральный тракт в шейном отделе содержит преимущественно волокна, уже перешедшие на правую сторону, поэтому его поражение может нарушить движения справа ниже очага. Часть волокон идёт другими путями, а клиническая картина зависит от объёма и уровня поражения; один признак не определяет диагноз."
      },
      {
        prompt: "При неожиданном отклонении головы и туловища человеку требуется быстро стабилизировать позу. Какие нисходящие влияния особенно связаны с автоматическими настройками осевых и проксимальных мышц?",
        options: [
          "Вестибулоспинальные и ретикулоспинальные пути в составе распределённой постуральной сети.",
          "Только латеральный кортикоспинальный тракт к отдельным мышцам пальцев.",
          "Только зрительный нерв, напрямую заканчивающийся на спинальных альфа-мотонейронах.",
          "Только кортикобульбарные волокна к мимическим мышцам без участия спинного мозга."
        ],
        answer: "a",
        explanation: "Вестибулоспинальные и ретикулоспинальные пути участвуют в поддержании равновесия, мышечного тонуса и постуральных реакциях, действуя вместе с мозжечком, сенсорными входами и другими нисходящими системами. Латеральный кортикоспинальный тракт особенно важен для точных движений дистальных отделов конечностей, но разделение функций не абсолютно."
      },
      {
        prompt: "В лабораторной модели студент выполняет направленное движение при сохранной проприоцепции; затем зрительную обратную связь убирают. Какой вывод о контроле движения наиболее обоснован?",
        options: [
          "Без зрения исчезают все моторные команды, поэтому любое движение становится невозможным.",
          "Сенсорная обратная связь поступает только после окончания движения и никогда не влияет на текущую траекторию.",
          "При выключении зрения проприоцепция автоматически перестаёт передавать сигналы в центральную нервную систему.",
          "Предварительная моторная команда сохраняется; доступная проприоцептивная обратная связь продолжает помогать коррекции, а точность может измениться в зависимости от задания."
        ],
        answer: "d",
        explanation: "Предварительное управление (feedforward) позволяет начать движение до получения текущего зрительного сигнала. Проприоцептивные и другие сенсорные входы участвуют в коррекции. Удаление зрительной информации может повысить ошибку в задачах, где она важна, но не отменяет движение и не выключает проприоцепцию; эффект нужно измерять в заданных условиях."
      }
    ]
  },
  EN: {
    intro: "Three ungraded diagnostic questions on descending motor pathways, postural control, and sensory feedback. Choose an answer first, then compare the explanation with the mechanism. Lesion scenarios are schematic and are not instructions for self-diagnosis.",
    questions: [
      {
        prompt: "A schematic lesion affects the right lateral corticospinal tract in the cervical spinal cord, below the pyramidal decussation. On which side would fine voluntary limb movements below the lesion be predominantly impaired?",
        options: [
          "Only on the left, because every corticospinal axon crosses again at each spinal segment.",
          "Only bilaterally, because the lateral corticospinal tract never crosses.",
          "Predominantly on the right: most of these fibers have already crossed in the caudal medulla.",
          "Only in left facial muscles, because the spinal tract ends exclusively in cranial motor nuclei."
        ],
        answer: "c",
        explanation: "Most corticospinal fibers cross at the medullary pyramids. At cervical levels the right lateral tract predominantly contains fibers that have already crossed to the right, so its injury may impair movements on the right below the lesion. Some fibers follow other routes, and the signs depend on lesion extent and level; a single sign does not establish a diagnosis."
      },
      {
        prompt: "After an unexpected tilt of the head and trunk, a person must rapidly stabilize posture. Which descending influences are especially associated with automatic adjustments of axial and proximal muscles?",
        options: [
          "Vestibulospinal and reticulospinal pathways within a distributed postural network.",
          "Only the lateral corticospinal tract controlling individual finger muscles.",
          "Only the optic nerve, which projects directly to spinal alpha motor neurons.",
          "Only corticobulbar fibers to facial muscles, without spinal contributions."
        ],
        answer: "a",
        explanation: "Vestibulospinal and reticulospinal pathways contribute to balance, muscle tone, and postural responses together with the cerebellum, sensory input, and other descending systems. The lateral corticospinal tract is particularly important for skilled distal limb movements, but this functional division is not absolute."
      },
      {
        prompt: "In a laboratory model, a student makes a reaching movement with proprioception intact. Visual feedback is then removed. Which conclusion about motor control is best supported?",
        options: [
          "Without vision, all motor commands disappear and no movement is possible.",
          "Sensory feedback arrives only after movement ends and never affects its trajectory.",
          "Removing vision automatically stops proprioceptive signals from reaching the central nervous system.",
          "A feedforward command remains available; proprioceptive feedback can still support correction, while accuracy may change depending on the task."
        ],
        answer: "d",
        explanation: "Feedforward control can initiate movement before current visual feedback arrives. Proprioceptive and other sensory inputs support online correction. Removing vision may increase error in tasks that rely on it, but does not abolish movement or proprioception; the effect must be measured under defined conditions."
      }
    ]
  },
  KZ: {
    intro: "Төмендеуші қозғалыс жолдары, дене қалпын реттеу және сенсорлық кері байланыс бойынша бағаланбайтын үш диагностикалық сұрақ. Алдымен жауапты таңдаңыз, кейін түсіндірмені физиологиялық тетікпен салыстырыңыз. Зақымдану мысалдары шартты, өзіндік диагноз қоюға арналмаған.",
    questions: [
      {
        prompt: "Оқу сызбасында пирамидалар айқасуынан төмен, жұлынның мойын деңгейінде оң жақ латералды кортикоспиналдық жол зақымданған. Ошақтан төмен аяқ-қолдың дәл ерікті қозғалыстары негізінен қай жақта бұзылады?",
        options: [
          "Тек сол жақта, себебі барлық кортикоспиналдық талшықтар жұлынның әр сегментінде қайта айқасады.",
          "Тек екі жақта бірдей, себебі латералды кортикоспиналдық жол мүлде айқаспайды.",
          "Көбіне оң жақта: талшықтардың басым бөлігі сопақша мидың төменгі бөлігінде айқасып қойған.",
          "Тек сол жақ бет бұлшықеттерінде, себебі бұл жұлындық жол тек бассүйек жүйкелерінің ядроларында аяқталады."
        ],
        answer: "c",
        explanation: "Кортикоспиналдық талшықтардың көпшілігі сопақша мидың пирамидалары деңгейінде айқасады. Сондықтан мойын деңгейіндегі оң латералды жолда негізінен оң жаққа өтіп қойған талшықтар болады; оның зақымдануы ошақтан төмен оң жақ қозғалыстарын бұзуы мүмкін. Кейбір талшықтар басқа жолмен өтеді, ал белгілер зақымның деңгейі мен көлеміне тәуелді; бір белгі диагнозды дәлелдемейді."
      },
      {
        prompt: "Бас пен тұлға күтпеген жерден қисайғанда адам дене қалпын тез тұрақтандыруы керек. Тұлға мен аяқ-қолдың проксималдық бұлшықеттерін автоматты реттеуге қандай төмендеуші әсерлер ерекше қатысады?",
        options: [
          "Таралған постуралдық желідегі вестибулоспиналдық және ретикулоспиналдық жолдар.",
          "Тек саусақтың жеке бұлшықеттерін басқаратын латералды кортикоспиналдық жол.",
          "Тек жұлынның альфа-мотонейрондарында тікелей аяқталатын көру жүйкесі.",
          "Жұлын қатыспайтын, тек бет бұлшықеттеріне баратын кортикобульбарлық талшықтар."
        ],
        answer: "a",
        explanation: "Вестибулоспиналдық және ретикулоспиналдық жолдар мишықпен, сенсорлық кірістермен және басқа төмендеуші жүйелермен бірге тепе-теңдікке, бұлшықет тонусына және дене қалпының реакцияларына қатысады. Латералды кортикоспиналдық жол аяқ-қолдың дисталдық бөлімдерінің дәл қозғалыстары үшін ерекше маңызды, бірақ қызметтердің бұл бөлінуі абсолютті емес."
      },
      {
        prompt: "Зертханалық модельде студент проприоцепциясы сақталған жағдайда нысанаға қарай қолын созады. Кейін көру арқылы кері байланыс алынып тасталады. Қозғалысты басқару туралы қандай тұжырым негіздірек?",
        options: [
          "Көру болмаса, барлық қозғалыс командалары жойылып, қозғалу мүмкін болмайды.",
          "Сенсорлық кері байланыс тек қозғалыс аяқталған соң келеді және ағымдағы траекторияға ешқашан әсер етпейді.",
          "Көруді алып тастау проприоцептивтік сигналдардың орталық жүйке жүйесіне өтуін автоматты түрде тоқтатады.",
          "Алдын ала берілетін моторлық команда сақталады; проприоцептивтік кері байланыс түзетуге көмектесе береді, ал дәлдік тапсырмаға қарай өзгеруі мүмкін."
        ],
        answer: "d",
        explanation: "Алдын ала басқару (feedforward) ағымдағы көру сигналы келмей тұрып қозғалысты бастауға мүмкіндік береді. Проприоцептивтік және басқа сенсорлық кірістер қозғалыс барысындағы түзетуге қатысады. Көру ақпаратын алып тастау оған тәуелді тапсырмаларда қатені ұлғайтуы мүмкін, бірақ қозғалысты да, проприоцепцияны да жоймайды; әсерді нақты шарттарда өлшеу қажет."
      }
    ]
  }
};

export function createModuleElevenPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: data.intro,
    questions: data.questions.map((item, index) => ({
      id: ["module-11-pretest-decussation", "module-11-pretest-posture", "module-11-pretest-feedback"][index],
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((text, i) => ({ id: (["a", "b", "c", "d"] as const)[i], text })),
      correctAnswer: item.answer,
      explanation: item.explanation,
      target: { section: "theory" as const }
    }))
  };
}
