import type { Language } from "../../course";
import type { MediaBlock, MediaLesson } from "../../media";
import { mediaSources } from "./media-sources";

type Copy = [string, string, string]; // RU, EN, KZ
export function createMediaLesson(language: Language): MediaLesson {
  const t = (copy: Copy) => copy[language === "RU" ? 0 : language === "EN" ? 1 : 2];
  const option = (id: string, text: Copy, feedback: Copy) => ({ id, text: t(text), feedback: t(feedback) });
  const blocks: MediaBlock[] = [
    {
      id: "organization", title: t(["Организация нервной системы", "Organisation of the nervous system", "Жүйке жүйесінің ұйымдасуы"]),
      preview: t(["Как ЦНС и ПНС образуют единую систему и в каком направлении передаётся информация.", "How the CNS and PNS form one system and in which direction information travels.", "ОЖЖ мен ШЖЖ қалай біртұтас жүйе құрайды және ақпарат қай бағытта беріледі."]),
      theoryAnchor: "cns-pns", source: mediaSources[language].organization, animation: "organization",
      transcript: [
        t(["Центральная нервная система включает головной и спинной мозг. Она обрабатывает и интегрирует сигналы. Периферическая нервная система включает нервы, ганглии и нервные окончания, связывающие ЦНС с органами и тканями.", "The central nervous system comprises the brain and spinal cord. It processes and integrates signals. The peripheral nervous system includes nerves, ganglia and nerve endings connecting the CNS with organs and tissues.", "Орталық жүйке жүйесіне ми мен жұлын жатады. Ол сигналдарды өңдеп, біріктіреді. Шеткі жүйке жүйесіне ОЖЖ-ні мүшелермен және тіндермен байланыстыратын жүйкелер, ганглийлер және жүйке ұштары жатады."]),
        t(["Афферентные пути несут информацию от рецепторов к ЦНС. Эфферентные пути передают команды от ЦНС к мышцам и железам. Обратная связь о результате помогает корректировать ответ. ЦНС и ПНС работают совместно, а не как независимые системы.", "Afferent pathways carry information from receptors towards the CNS. Efferent pathways carry commands from the CNS to muscles and glands. Feedback about the outcome helps adjust the response. The CNS and PNS work together rather than independently.", "Афференттік жолдар ақпаратты рецепторлардан ОЖЖ-ге жеткізеді. Эфференттік жолдар бұйрықтарды ОЖЖ-ден бұлшықеттер мен бездерге береді. Нәтиже туралы кері байланыс жауапты түзетуге көмектеседі. ОЖЖ мен ШЖЖ дербес емес, бірлесіп жұмыс істейді."]),
      ],
      question: {
        prompt: t(["Какое направление соответствует афферентному пути?", "Which direction describes an afferent pathway?", "Қай бағыт афференттік жолға сәйкес келеді?"]), correctAnswer: "b",
        explanation: t(["Афферентный путь направлен к ЦНС и передаёт сенсорную информацию. Направление от ЦНС к эффектору называется эфферентным.", "An afferent pathway carries sensory information towards the CNS. The direction from the CNS towards an effector is efferent.", "Афференттік жол сенсорлық ақпаратты ОЖЖ-ге жеткізеді. ОЖЖ-ден эффекторға бағытталған жол эфференттік деп аталады."]),
        options: [
          option("a", ["От ЦНС к мышце", "From the CNS to a muscle", "ОЖЖ-ден бұлшықетке"], ["Это эфферентное направление: команда идёт к исполнительному органу.", "This is the efferent direction: a command travels to an effector.", "Бұл эфференттік бағыт: бұйрық атқарушы мүшеге барады."]),
          option("b", ["От рецептора к ЦНС", "From a receptor to the CNS", "Рецептордан ОЖЖ-ге"], ["Верно: информация поступает от периферии к центральным сетям.", "Correct: information travels from the periphery to central circuits.", "Дұрыс: ақпарат шеттен орталық желілерге түседі."]),
          option("c", ["Только между мышцами, без ЦНС", "Only between muscles, without the CNS", "Тек бұлшықеттер арасында, ОЖЖ-сіз"], ["Афферентный путь определяется передачей информации к ЦНС, а не между мышцами.", "An afferent pathway is defined by information travelling towards the CNS, not between muscles.", "Афференттік жол бұлшықеттер арасындағы емес, ОЖЖ-ге бағытталған ақпарат берілуімен анықталады."]),
        ],
      },
    },
    {
      id: "pathway", title: t(["От рецептора к ответу", "From receptor to response", "Рецептордан жауапқа дейін"]),
      preview: t(["Как сенсорный вход преобразуется в ответ: рецептор, афферентный путь, ЦНС, эфферентный путь и эффектор.", "How sensory input becomes a response: receptor, afferent pathway, CNS, efferent pathway and effector.", "Сенсорлық кіріс жауапқа қалай айналады: рецептор, афференттік жол, ОЖЖ, эфференттік жол және эффектор."]),
      theoryAnchor: "cns-pns", source: mediaSources[language].pathway,
      transcript: [
        t(["При контакте с горячим предметом рецептор воспринимает воздействие. По афферентному пути информация поступает в ЦНС. Центральные сети обрабатывают сигнал и участвуют в организации защитной реакции.", "On contact with a hot object, a receptor detects the stimulus. Information travels along an afferent pathway to the CNS. Central circuits process the signal and help organise a protective response.", "Ыстық затқа жанасқанда рецептор әсерді қабылдайды. Ақпарат афференттік жолмен ОЖЖ-ге түседі. Орталық желілер сигналды өңдеп, қорғаныш реакциясын ұйымдастыруға қатысады."]),
        t(["По эфферентному пути команда передаётся к мышцам. Мышцы как эффекторы выполняют ответ — рука отдёргивается. Интеграция происходит внутри ЦНС, а не в отдельном звене после неё. Информация о результате действия позволяет уточнять ответ.", "A command travels along an efferent pathway to the muscles. The muscles act as effectors: the hand withdraws. Integration occurs within the CNS, not in a separate stage after it. Information about the outcome allows the response to be adjusted.", "Бұйрық эфференттік жолмен бұлшықеттерге беріледі. Бұлшықеттер эффектор ретінде жауапты орындайды: қол тартып алынады. Интеграция ОЖЖ-ден кейінгі бөлек буында емес, ОЖЖ ішінде жүреді. Нәтиже туралы ақпарат жауапты нақтылауға мүмкіндік береді."]),
      ],
      question: {
        prompt: t(["Какую роль выполняет мышца в описанной реакции?", "What role does a muscle play in this response?", "Сипатталған реакцияда бұлшықет қандай рөл атқарады?"]), correctAnswer: "c",
        explanation: t(["Мышца — эффектор, выполняющий ответ по поступившей команде. Рецептор воспринимает воздействие, а центральные сети обрабатывают информацию.", "A muscle is an effector carrying out the response to a command. A receptor detects the stimulus, while central circuits process information.", "Бұлшықет — келген бұйрыққа сай жауапты орындайтын эффектор. Рецептор әсерді қабылдайды, ал орталық желілер ақпаратты өңдейді."]),
        options: [
          option("a", ["Центральное звено интеграции", "Central integration stage", "Интеграцияның орталық буыны"], ["Центральная обработка происходит в ЦНС. Мышца выполняет ответ.", "Central processing occurs in the CNS. The muscle carries out the response.", "Орталық өңдеу ОЖЖ-де жүреді. Бұлшықет жауапты орындайды."]),
          option("b", ["Афферентный путь", "Afferent pathway", "Афференттік жол"], ["Афферентный путь передаёт информацию к ЦНС; мышца здесь является исполнительным органом.", "An afferent pathway carries information to the CNS; the muscle here is the responding organ.", "Афференттік жол ақпаратты ОЖЖ-ге жеткізеді; бұлшықет мұнда атқарушы мүше болып табылады."]),
          option("c", ["Эффектор", "Effector", "Эффектор"], ["Верно: мышца выполняет двигательный ответ.", "Correct: the muscle produces the motor response.", "Дұрыс: бұлшықет қимыл жауабын орындайды."]),
        ],
      },
    },
    {
      id: "synapse", title: t(["Проведение и передача между клетками", "Conduction and transmission between cells", "Өткізу және жасушалар арасындағы берілу"]),
      preview: t(["Сравните проведение сигнала по нервному волокну и передачу влияния следующей клетке.", "Compare signal conduction along a nerve fibre with transmission of influence to the next cell.", "Жүйке талшығы бойымен сигнал өткізуді әсердің келесі жасушаға берілуімен салыстырыңыз."]),
      theoryAnchor: "principles", source: mediaSources[language].synapse,
      transcript: [
        t(["Сигнал распространяется по нервному волокну к месту контакта с другой клеткой. Затем начинается отдельный функциональный этап — передача влияния следующей клетке.", "A signal propagates along a nerve fibre to a contact with another cell. A distinct functional stage then begins: transmission of influence to the next cell.", "Сигнал жүйке талшығы бойымен басқа жасушамен түйісу орнына таралады. Одан кейін жеке функциялық кезең — әсерді келесі жасушаға беру басталады."]),
        t(["На вводном уровне важно не смешивать эти этапы. Молекулярные механизмы межклеточной передачи рассматриваются в последующих модулях.", "At the introductory level, the important point is not to confuse these stages. Molecular mechanisms of intercellular transmission are covered in later modules.", "Кіріспе деңгейде бұл кезеңдерді шатастырмау маңызды. Жасушааралық берілістің молекулалық тетіктері кейінгі модульдерде қарастырылады."]),
      ],
      question: {
        prompt: t(["Какое различие важно сохранить в функциональной схеме?", "Which distinction should be preserved in a functional map?", "Функциялық сызбада қандай айырмашылықты сақтау маңызды?"]), correctAnswer: "a",
        explanation: t(["Проведение по волокну и передача влияния следующей клетке — последовательные, но разные функциональные этапы.", "Conduction along a fibre and transmission to the next cell are sequential but distinct functional stages.", "Талшық бойымен өткізу және әсерді келесі жасушаға беру — бірізді, бірақ бөлек функциялық кезеңдер."]),
        options: [
          option("a", ["Проведение по волокну и межклеточная передача — разные этапы", "Fibre conduction and intercellular transmission are different stages", "Талшық бойымен өткізу мен жасушааралық берілу — бөлек кезеңдер"], ["Верно.", "Correct.", "Дұрыс."]),
          option("b", ["Это один и тот же процесс без функциональной границы", "They are one process with no functional boundary", "Олар функциялық шекарасы жоқ бір үдеріс"], ["Нет: их следует различать.", "No: they should be distinguished.", "Жоқ: оларды ажырату керек."]),
          option("c", ["Передача следующей клетке происходит до проведения по волокну", "Transmission to the next cell occurs before fibre conduction", "Келесі жасушаға берілу талшық бойымен өткізуден бұрын жүреді"], ["В этой схеме порядок обратный.", "The order is reversed in this map.", "Бұл сызбада реттілік керісінше."]),
        ],
      },
    },
    {
      id: "integration", title: t(["Центральная обработка нескольких сигналов", "Central processing of multiple signals", "Бірнеше сигналды орталық өңдеу"]),
      preview: t(["Почему ответ нервной системы нельзя выводить из одного входного сигнала.", "Why a nervous-system response cannot be inferred from one input signal alone.", "Неліктен жүйке жүйесінің жауабын бір ғана кіріс сигналынан шығаруға болмайды."]),
      theoryAnchor: "principles", source: mediaSources[language].integration,
      transcript: [
        t(["В ЦНС одновременно поступает информация из разных источников. Нервные сети сопоставляют её с текущим состоянием системы и формируют согласованный ответ.", "Information from different sources reaches the CNS at the same time. Neural networks combine it with the system's current state to organise a coordinated response.", "ОЖЖ-ге әртүрлі көздерден ақпарат бір мезгілде түседі. Нейрондық желілер оны жүйенің ағымдағы күйімен байланыстырып, үйлесімді жауап қалыптастырады."]),
        t(["Поэтому одинаковый входной сигнал не всегда означает одинаковый итоговый ответ. Подробные клеточные механизмы возбуждения, торможения и интеграции изучаются в последующих модулях.", "Therefore, the same input signal does not always imply the same final response. Detailed cellular mechanisms of excitation, inhibition and integration are studied in later modules.", "Сондықтан бірдей кіріс сигналы әрқашан бірдей қорытынды жауапты білдірмейді. Қозу, тежелу және интеграцияның жасушалық тетіктері кейінгі модульдерде оқытылады."]),
      ],
      question: {
        prompt: t(["Почему один и тот же сенсорный сигнал может сопровождаться разными ответами?", "Why can the same sensory signal be associated with different responses?", "Неліктен бірдей сенсорлық сигнал әртүрлі жауаптармен қатар жүруі мүмкін?"]), correctAnswer: "b",
        explanation: t(["Итог зависит от совокупности поступающей информации и текущего состояния нервной системы.", "The outcome depends on the combination of incoming information and the current state of the nervous system.", "Нәтиже түсетін ақпараттың жиынтығына және жүйке жүйесінің ағымдағы күйіне тәуелді."]),
        options: [
          option("a", ["Каждый вход всегда задаёт один неизменный ответ", "Each input always specifies one fixed response", "Әр кіріс әрқашан бір өзгермейтін жауапты анықтайды"], ["Это не учитывает центральную обработку.", "This ignores central processing.", "Бұл орталық өңдеуді ескермейді."]),
          option("b", ["ЦНС обрабатывает несколько источников информации в контексте состояния системы", "The CNS processes multiple information sources in the context of the system's state", "ОЖЖ бірнеше ақпарат көзін жүйенің күйімен бірге өңдейді"], ["Верно.", "Correct.", "Дұрыс."]),
          option("c", ["Ответ не связан с обработкой информации в ЦНС", "The response is unrelated to information processing in the CNS", "Жауап ОЖЖ-дегі ақпарат өңдеумен байланысты емес"], ["Центральная обработка является важным этапом организации ответа.", "Central processing is an important stage in organising a response.", "Орталық өңдеу жауапты ұйымдастырудың маңызды кезеңі."]),
        ],
      },
    },
  ];
  return {
    kind: "media", language, blocks,
    title: t(["Медиа / Видео", "Media / Video", "Медиа / Бейне"]),
    introduction: t(["Четыре учебных медиаблока по теории Модуля 1. Пока видео готовятся, прочитайте текстовые версии и выполните самопроверку: просмотр не является условием доступа к вопросам. Ответы не сохраняются после ухода со страницы или смены языка.", "Four learning media blocks based on Module 1 theory. While videos are being prepared, read the text alternatives and answer the self-check questions: viewing is not required to unlock them. Answers are not saved after leaving the page or changing language.", "Модуль 1 теориясына негізделген төрт оқу медиаблогы. Бейнелер дайындалып жатқанда мәтіндік нұсқаларды оқып, өзін-өзі тексеру сұрақтарына жауап беріңіз: сұрақтарды ашу үшін бейнені көру міндетті емес. Беттен шыққанда немесе тіл өзгергенде жауаптар сақталмайды."]),
    ui: {
      preview: t(["Что вы увидите", "What you will see", "Не көресіз"]),
      pending: t(["Интерактивная учебная визуализация", "Interactive learning visualisation", "Интерактивті оқу визуализациясы"]),
      unavailable: t(["Не удалось загрузить видео", "Video could not be loaded", "Бейнені жүктеу мүмкін болмады"]),
      alternative: t(["Текстовая версия и самопроверка доступны ниже.", "The text alternative and self-check are available below.", "Мәтіндік нұсқа мен өзін-өзі тексеру төменде қолжетімді."]),
      duration: t(["Продолжительность", "Duration", "Ұзақтығы"]),
      durationPending: t(["Будет указана после добавления видео", "Available when the video is added", "Бейне қосылғаннан кейін көрсетіледі"]),
      language: t(["Язык материала", "Material language", "Материал тілі"]),
      languageName: t(["Русский", "English", "Қазақша"]),
      credit: t(["Источник видео", "Video source", "Бейне дереккөзі"]),
      transcript: t(["Текстовая версия / транскрипт", "Text alternative / transcript", "Мәтіндік нұсқа / транскрипт"]),
      theory: t(["Перейти к теории", "Go to theory", "Теорияға өту"]),
      question: t(["Самопроверка после просмотра или чтения", "Self-check after watching or reading", "Көргеннен немесе оқығаннан кейінгі өзін-өзі тексеру"]),
      check: t(["Проверить ответ", "Check answer", "Жауапты тексеру"]),
      retry: t(["Ответить заново", "Try again", "Қайта жауап беру"]),
      correct: t(["Верно", "Correct", "Дұрыс"]), incorrect: t(["Нужно повторить", "Review needed", "Қайталау қажет"]),
      correctAnswer: t(["Правильный ответ", "Correct answer", "Дұрыс жауап"]),
    },
  };
}
