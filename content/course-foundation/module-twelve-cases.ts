import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Module 12 basal ganglia: authored thought experiments, not patient diagnosis.
// Checked against Guyton & Hall 13e ch.57 PDF 697–700; Ganong 23e ch.16
// PDF 262–265; C. L. Ghai Practical Physiology 8e PDF 307–309.
// No copyrighted textbook text is reproduced.
type Text = Record<Language, string>;
type Scenario = { id: string; title: Text; situation: Text; questions: [Text,Text,Text]; explanations: [Text,Text] };
const scenarios: Scenario[] = [
  {
    "id": "direct-indirect-model",
    "title": {
      "RU": "1. Выбор действия в условной модели",
      "EN": "1. Action selection in a simplified model",
      "KZ": "1. Қарапайым модельдегі әрекетті таңдау"
    },
    "situation": {
      "RU": "В учебной схеме два конкурирующих движения имеют одинаковую мышечную силу. Для движения A условно усиливают активность D1-популяции стриатума, проецирующейся на GPi/SNr. Для движения B усиливают D2-популяцию, проецирующуюся на GPe. Преподаватель предлагает предсказать изменение тормозного выхода GPi/SNr к таламусу. Эти изменения заданы как мысленный эксперимент: числа разрядов и поведение человека не измерялись.",
      "EN": "In a teaching model two competing movements have equal muscle strength. For movement A, activity of the striatal D1 population projecting to GPi/SNr is increased. For movement B, the D2 population projecting to GPe is activated more strongly. Students predict the inhibitory output from GPi/SNr to the thalamus. This is a thought experiment: no firing rates or human behavior were measured.",
      "KZ": "Оқу моделінде екі бәсекелес қозғалыстың бұлшықет күші бірдей. A қозғалысы үшін GPi/SNr-ге бағытталған стриатумның D1 нейрондары белсендірек, ал B қозғалысы үшін GPe-ге бағытталған D2 нейрондары белсендірек деп алынады. Студент GPi/SNr-дің таламусқа тежегіш әсерін болжайды. Бұл ойша тәжірибе: нейрондардың разряд жиілігі де, адамның мінез-құлқы да өлшенген жоқ."
    },
    "questions": [
      {
        "RU": "Для движения A проследите тормозную связь стриатум → GPi/SNr и предскажите изменение торможения таламуса.",
        "EN": "For movement A, trace the inhibitory striatum → GPi/SNr connection and predict the resulting change in thalamic disinhibition.",
        "KZ": "A қозғалысы үшін стриатум → GPi/SNr тежегіш байланысын көрсетіп, таламустың тежелуден босау бағытын болжаңыз."
      },
      {
        "RU": "Для B последовательно проследите стриатум ⊣ GPe ⊣ STN → GPi/SNr ⊣ таламус. Какой знак изменения ожидается в упрощённой схеме?",
        "EN": "For B, trace striatum ⊣ GPe ⊣ STN → GPi/SNr ⊣ thalamus. What direction of change follows in the simplified circuit?",
        "KZ": "B үшін стриатум ⊣ GPe ⊣ STN → GPi/SNr ⊣ таламус тізбегін талдаңыз. Қарапайым сызбада өзгеріс бағыты қандай?"
      },
      {
        "RU": "Почему из этих знаков нельзя вычислить время реакции или поставить диагноз? Назовите два отсутствующих фактора.",
        "EN": "Why can neither reaction time nor a diagnosis be calculated from these signs? Name two missing factors.",
        "KZ": "Осы байланыс таңбалары бойынша реакция уақытын немесе диагнозды неге анықтауға болмайды? Ескерілмеген екі факторды атаңыз."
      }
    ],
    "explanations": [
      {
        "RU": "В канонической схеме D1-ассоциированный прямой путь тормозит выходные ГАМК-ергические нейроны GPi/SNr и уменьшает их тоническое торможение таламуса. Непрямой путь через GPe и возбуждающее субталамическое ядро STN в среднем усиливает тормозный выход GPi/SNr. Таламо-корковые проекции возбуждающие, но эти знаки описывают локальные звенья модели, а не гарантированный выбор конкретного действия.",
        "EN": "In the canonical scheme, the D1-associated direct pathway inhibits GABAergic output neurons in GPi/SNr, reducing tonic inhibition of the thalamus. The indirect pathway through GPe and excitatory subthalamic nucleus (STN) tends to increase GPi/SNr inhibitory output. Thalamocortical projections are excitatory, but these signs describe model links rather than guaranteeing selection of a particular action.",
        "KZ": "Канондық сызбада D1-мен байланысты тікелей жол GPi/SNr-дегі ГАМҚ-ергиялық шығу нейрондарын тежеп, олардың таламусқа тоникалық тежегіш әсерін азайтады. GPe мен қоздырғыш субталамикалық ядро (STN) арқылы өтетін жанама жол GPi/SNr тежегіш шығысын күшейтуге бейім. Таламус-қыртыс проекциялары қоздырғыш, бірақ бұл таңбалар нақты әрекеттің міндетті түрде таңдалатынын білдірмейді."
      },
      {
        "RU": "Обе петли действуют параллельно и зависят от исходной активности, коркового входа, рецепторов, интернейронов и контекста задачи. Из условной схемы нельзя получить точную частоту разрядов, латентность или индивидуальный диагноз. В письменном ответе требуется различать локальный знак синаптической связи и итоговое поведение, а также указать хотя бы два недостающих параметра.",
        "EN": "Both loops operate in parallel and depend on baseline activity, cortical input, receptors, interneurons and task context. The schematic cannot yield an exact firing rate, latency or individual diagnosis. A good written answer separates local synaptic signs from whole-person behavior and identifies at least two missing parameters.",
        "KZ": "Екі ілмек қатар жұмыс істейді; нәтиже бастапқы белсенділікке, қыртыстық кіріске, рецепторларға, интернейрондарға және тапсырма жағдайына тәуелді. Сызба нақты разряд жиілігін, кідірісті немесе жеке диагнозды бермейді. Жазбаша жауапта жергілікті синапстық байланыстың таңбасын жалпы мінез-құлықтан ажыратып, кемінде екі жетіспейтін параметрді көрсету қажет."
      }
    ]
  },
  {
    "id": "hyperdirect-conflict",
    "title": {
      "RU": "2. Конфликт и гиперпрямой путь",
      "EN": "2. Conflict and the hyperdirect pathway",
      "KZ": "2. Қайшылық және гипертікелей жол"
    },
    "situation": {
      "RU": "В компьютерном учебном задании студент заранее готовит нажатие правой кнопки. В части проб за 150 мс до ожидаемого сигнала появляется новый знак, требующий пересмотреть выбор. Модель показывает условную быструю активацию коркового входа в STN; это не запись нейронов и не доказательство конкретной задержки физиологического ответа. Сравните вариант с дополнительным корковым входом в STN и вариант без него при одинаковой инструкции.",
      "EN": "In a computer-based teaching task a learner prepares to press the right key. On some trials a new cue appears 150 ms before the expected signal and requires reconsidering the choice. The model displays a hypothetical fast cortical input to STN; this is not a neuronal recording or evidence for a particular physiological response latency. Compare conditions with and without extra cortical input to STN under the same instructions.",
      "KZ": "Компьютерлік оқу тапсырмасында студент оң жақ батырманы басуға дайындалады. Кейбір сынақта күтілетін сигналға 150 мс қалғанда таңдауды қайта қарауды талап ететін жаңа белгі пайда болады. Модель STN-ге жылдам қыртыстық кірісті шартты түрде көрсетеді; бұл нейрон жазбасы да, физиологиялық жауаптың нақты кідірісін дәлелдеу де емес. Бірдей нұсқауда STN-ге қосымша қыртыстық кіріс бар және жоқ жағдайларды салыстырыңыз."
    },
    "questions": [
      {
        "RU": "Какие структуры соединяет гиперпрямой путь и чем он отличается от непрямого пути через стриатум и GPe?",
        "EN": "Which structures are linked by the hyperdirect pathway, and how does it differ from the indirect route through striatum and GPe?",
        "KZ": "Гипертікелей жол қандай құрылымдарды байланыстырады және ол стриатум мен GPe арқылы өтетін жанама жолдан несімен ерекшеленеді?"
      },
      {
        "RU": "Если STN возбуждает GPi/SNr, какое изменение таламического торможения ожидается в канонической схеме? Отделите это от наблюдаемого решения участника.",
        "EN": "If STN excites GPi/SNr, how should thalamic inhibition change in the canonical scheme? Distinguish this from the participant's actual decision.",
        "KZ": "STN GPi/SNr-ді қоздырса, канондық сызбада таламустың тежелуі қалай өзгереді? Мұны қатысушының нақты шешімінен ажыратыңыз."
      },
      {
        "RU": "Какие данные нужно собрать, чтобы проверить связь модели с поведением, и почему 150 мс в условии не доказывают скорость гиперпрямого пути?",
        "EN": "What data would test the model-behavior link, and why does the 150-ms cue interval not establish hyperdirect-pathway speed?",
        "KZ": "Модель мен мінез-құлық байланысын тексеру үшін қандай дерек керек? Неліктен шарттағы 150 мс гипертікелей жол жылдамдығын дәлелдемейді?"
      }
    ],
    "explanations": [
      {
        "RU": "Гиперпрямой путь соединяет кору с STN без обязательного прохождения через стриатум и GPe. Возбуждающий STN-вход к GPi/SNr в упрощённой модели усиливает тормозное влияние выходных ядер на таламус и может участвовать в быстром ограничении конкурирующих действий. Это функциональная гипотеза для учебного разбора, а не утверждение, что единственный путь самостоятельно «останавливает» любое движение.",
        "EN": "The hyperdirect route connects cortex to STN without necessarily passing through striatum or GPe. Excitatory STN input to GPi/SNr can increase inhibitory output to the thalamus in the simplified model and may contribute to rapid restraint of competing actions. This is a teaching-level functional hypothesis, not a claim that one pathway alone stops every movement.",
        "KZ": "Гипертікелей жол қыртысты STN-мен стриатум мен GPe арқылы міндетті түрде өтпей байланыстырады. STN-нің GPi/SNr-ге қоздырғыш кірісі қарапайым модельде таламусқа тежегіш шығысты арттырып, бәсекелес әрекеттерді жылдам шектеуге қатысуы мүмкін. Бұл оқу деңгейіндегі функционалдық болжам; бір ғана жол кез келген қозғалысты өзі тоқтатады деген сөз емес."
      },
      {
        "RU": "Для проверки сравнивают долю ошибочных ответов, распределение времени реакции и успешность пересмотра выбора при одинаковых сенсорных и моторных требованиях. Интервал появления знака задан экспериментатором и не равен задержке нейронной передачи. Влияние внимания, обучения, других корково-подкорковых сетей и базовой скорости реакции необходимо рассматривать отдельно.",
        "EN": "A test would compare error rates, reaction-time distributions and successful choice revision while matching sensory and motor demands. The cue interval is set by the experimenter and is not a neuronal conduction delay. Attention, learning, other cortico-subcortical networks and baseline response speed must be considered separately.",
        "KZ": "Тексеру үшін сенсорлық және қозғалыстық талаптарды бірдей ұстап, қате жауап үлесін, реакция уақытының таралуын және таңдауды сәтті қайта қарауды салыстырады. Белгінің пайда болу аралығын зерттеуші белгілейді, ол нейрондық өткізудің кідірісіне тең емес. Зейін, үйрену, өзге қыртыс-қыртысасты желілер және бастапқы жауап жылдамдығы бөлек ескерілуі тиіс."
      }
    ]
  },
  {
    "id": "cue-and-sequence",
    "title": {
      "RU": "3. Подсказка и последовательность движений",
      "EN": "3. Cues and movement sequences",
      "KZ": "3. Белгі және қозғалыс тізбегі"
    },
    "situation": {
      "RU": "В вымышленном наблюдении два участника с одинаковой максимальной силой кисти выполняют последовательность из четырёх движений пальцев. У первого начало серии замедлено, амплитуда следующих движений уменьшается; при внешних ритмических подсказках выполнение улучшается. У второго скорость начала нормальная, но он часто промахивается по пространственной цели. Студент утверждает, что обе картины доказывают одинаковое поражение базальных ганглиев.",
      "EN": "In a hypothetical observation two participants with equal maximal grip strength perform a four-step finger sequence. The first starts slowly and successive movements become smaller; external rhythmic cues improve performance. The second starts at normal speed but often misses a spatial target. A learner concludes that both patterns prove the same basal-ganglia lesion.",
      "KZ": "Ойдан алынған бақылауда қол басының ең жоғары күші бірдей екі қатысушы саусақпен төрт қозғалыстан тұратын тізбекті орындайды. Біріншісі баяу бастайды, кейінгі қозғалыстардың амплитудасы кішірейеді; сыртқы ырғақтық белгілер орындауды жақсартады. Екіншісі қалыпты жылдамдықпен бастайды, бірақ кеңістіктік нысанадан жиі жаңылады. Студент екі көрініс те базальды ганглияның бірдей зақымын дәлелдейді дейді."
    },
    "questions": [
      {
        "RU": "Какие признаки первого участника соответствуют брадикинезии и уменьшению амплитуды последовательных движений, а какие сведения говорят о сохранности силы?",
        "EN": "Which findings in the first participant suggest bradykinesia and decrement of successive movement amplitude, and which observation addresses strength?",
        "KZ": "Бірінші қатысушының қандай белгілері брадикинезия мен қозғалыс амплитудасының біртіндеп азаюына сәйкес? Қандай дерек күштің сақталғанын көрсетеді?"
      },
      {
        "RU": "Почему пространственные промахи второго участника требуют рассмотреть мозжечковую координацию, зрение и условия задания, а не автоматически тот же механизм?",
        "EN": "Why should the second participant's spatial errors prompt consideration of cerebellar coordination, vision and task conditions rather than automatically the same mechanism?",
        "KZ": "Екінші қатысушының кеңістіктік қателері неге дәл сол тетікке емес, мишықтық үйлестіруге, көруге және тапсырма жағдайына назар аудартуы тиіс?"
      },
      {
        "RU": "Предложите два повторных измерения и одну альтернативную причину улучшения с подсказкой. Почему по этому случаю нельзя ставить диагноз?",
        "EN": "Propose two repeatable measurements and one alternative reason for improvement with cues. Why is this vignette insufficient for diagnosis?",
        "KZ": "Қайталанатын екі өлшемді және белгінің көмегімен жақсарудың бір балама себебін ұсыныңыз. Неліктен бұл жағдай диагноз қоюға жеткіліксіз?"
      }
    ],
    "explanations": [
      {
        "RU": "Брадикинезия относится к замедлению движения и может сопровождаться уменьшением амплитуды при повторении. Она не тождественна снижению максимальной мышечной силы. Базальные ганглии участвуют в выборе и масштабировании двигательных программ в сетях с корой и таламусом; внешняя подсказка может менять стратегию выполнения, но не локализует механизм сама по себе. Непопадание в цель требует отдельной оценки точности и сенсорной обратной связи.",
        "EN": "Bradykinesia denotes slowness of movement and may include decreasing amplitude during repetition; it is not identical to loss of maximal muscle strength. Basal ganglia contribute to selection and scaling of actions within cortical-thalamic networks. External cues may change the execution strategy but do not localize the mechanism on their own. Missing a target calls for separate assessment of accuracy and sensory feedback.",
        "KZ": "Брадикинезия қозғалыстың баяулығын білдіреді және қайталағанда амплитуданың азаюымен қатар жүруі мүмкін; ол ең жоғары бұлшықет күшінің төмендеуімен бірдей емес. Базальды ганглия қыртыс пен таламус желілерімен бірге әрекетті таңдау мен ауқымын реттеуге қатысады. Сыртқы белгі орындау тәсілін өзгертуі мүмкін, бірақ өздігінен зақым орнын анықтамайды. Нысанадан жаңылу дәлдік пен сенсорлық кері байланысты бөлек бағалауды талап етеді."
      },
      {
        "RU": "Измерьте задержку начала, амплитуду последовательных движений, число ошибок и конечную точность при повторных пробах с одинаковой инструкцией и темпом. Улучшение с подсказкой может также отражать внимание, тренировку или лучшее понимание ритма. В учебном сюжете отсутствуют анамнез, неврологический осмотр, сведения о лекарствах и чувствительности, поэтому нельзя установить диагноз или единственный анатомический очаг.",
        "EN": "Measure initiation latency, amplitude of successive movements, error count and final accuracy in repeated trials with matched instructions and pacing. Cue-related improvement could also reflect attention, practice or better understanding of the rhythm. The vignette lacks history, examination, medication and sensory information, so it cannot establish a diagnosis or a unique anatomical lesion.",
        "KZ": "Қозғалысты бастау кідірісін, әр қимыл амплитудасын, қате санын және соңғы дәлдікті бірдей нұсқау мен ырғақта бірнеше рет өлшеу керек. Белгінің көмегімен жақсару зейін, жаттығу немесе ырғақты жақсы түсіну әсерінен де болуы мүмкін. Бұл оқу жағдайында анамнез, тексеру, дәрі-дәрмек және сезімталдық туралы деректер жоқ; сондықтан нақты диагнозды немесе жалғыз анатомиялық ошақты дәлелдеу мүмкін емес."
      }
    ]
  }
];

export function createModuleTwelveCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  const headings: Record<Language, [string,string,string]> = {
    RU: ["Найдите факты", "Объясните механизм", "Проверьте пределы вывода"],
    EN: ["Identify observations", "Explain the mechanism", "Check inference limits"],
    KZ: ["Бақылауды анықтаңыз", "Тетікті түсіндіріңіз", "Қорытынды шегін тексеріңіз"]
  };
  const introduction: Text = {
    RU: "Три независимые ситуационные задачи о прямом и непрямом путях, гиперпрямом корково-субталамическом пути и различии замедления движения, силы и точности. Сначала запишите свой прогноз, затем откройте объяснение. Все данные условны и не предназначены для диагностики.",
    EN: "Three independent reasoning cases address direct and indirect pathways, the hyperdirect cortico-subthalamic route, and distinctions among slowness, strength and accuracy. Record your prediction before opening the explanation. All data are hypothetical and not diagnostic.",
    KZ: "Үш тәуелсіз жағдай тікелей және жанама жолдарды, гипертікелей қыртыс-субталамикалық жолды және қозғалыс баяулығы, күш пен дәлдік айырмасын қарастырады. Түсіндірмені ашпас бұрын болжамыңызды жазыңыз. Барлық дерек шартты және диагноз қоюға арналмаған."
  };
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle, introduction: introduction[language], ui,
    cases: scenarios.map(item => ({
      id: "m12-basal-case-" + item.id,
      title: item.title[language],
      situation: item.situation[language],
      stages: item.questions.map((question, index) => ({ title: headings[language][index], questions: [question[language]] })),
      explanation: item.explanations.map(paragraph => paragraph[language])
    }))
  };
}
