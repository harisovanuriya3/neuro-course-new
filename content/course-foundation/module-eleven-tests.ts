import type { Language } from "../course";
import type { BranchingTest, QuestionCopy, TestNode } from "../tests";

// Module 11: authored motor-control reasoning, not generic metacognitive prompts.
// Original educational questions cross-checked with Guyton & Hall 13e, ch. 56,
// Ganong 23e, ch. 16, and C. L. Ghai Practical Physiology 8e, pp. 295–297.
// Five competencies; distinct main and corrective cases in RU/EN/KZ.
type Localized = Record<Language, string>;
type Item = {
  prompt: Localized; correct: Localized;
  wrong: [Localized, Localized, Localized]; explanation: Localized;
};
const items: Item[] = [
  {
    "prompt": {
      "RU": "Студент рисует путь произвольного движения кисти. Какая схема верно показывает конечный двигательный выход?",
      "EN": "A student draws the route of a voluntary hand movement. Which account correctly identifies the final motor output?",
      "KZ": "Студент қолдың ерікті қозғалысының жолын сызады. Соңғы қозғалтқыш шығысты қай түсіндірме дұрыс көрсетеді?"
    },
    "correct": {
      "RU": "Кора и подкорковые сети планируют действие; нисходящие сигналы через спинальные сети влияют на α-мотонейроны, непосредственно иннервирующие мышцу.",
      "EN": "Cortical and subcortical networks plan action; descending signals act through spinal circuits on alpha motor neurons that directly innervate muscle.",
      "KZ": "Қыртыстық және қыртысасты желілер әрекетті жоспарлайды; төмендеуші сигналдар жұлын тізбектері арқылы бұлшықетті тікелей жүйкелендіретін α-мотонейрондарға әсер етеді."
    },
    "wrong": [
      {
        "RU": "Базальные ганглии напрямую иннервируют мышечные волокна без участия спинальных нейронов.",
        "EN": "The basal ganglia innervate muscle fibers directly without spinal motor neurons.",
        "KZ": "Базальды ганглийлер бұлшықет талшықтарын жұлын мотонейрондарынсыз тікелей жүйкелендіреді."
      },
      {
        "RU": "Мозжечок передаёт каждую произвольную команду непосредственно в мышцу по отдельному нерву.",
        "EN": "The cerebellum sends every voluntary command directly to muscle along its own peripheral nerve.",
        "KZ": "Мишық әр ерікті команданы жеке шеткі жүйке арқылы тікелей бұлшықетке жібереді."
      },
      {
        "RU": "Мышечные веретёна сами формируют всю корковую программу произвольного движения.",
        "EN": "Muscle spindles alone generate the entire cortical plan for voluntary movement.",
        "KZ": "Бұлшықет ұршықтары ерікті қозғалыстың бүкіл қыртыстық жоспарын өздері қалыптастырады."
      }
    ],
    "explanation": {
      "RU": "Нижний мотонейрон — конечный общий нервный путь к скелетной мышце; кора, ствол, мозжечок, базальные ганглии и афференты влияют на его активность через связанные цепи.",
      "EN": "The lower motor neuron is the final common neural pathway to skeletal muscle; cortex, brainstem, cerebellum, basal ganglia and afferents influence its activity through connected circuits.",
      "KZ": "Төменгі мотонейрон — қаңқа бұлшықетіне баратын соңғы ортақ жүйкелік жол; қыртыс, ми бағаны, мишық, базальды ганглийлер және афференттер оның белсенділігіне байланысқан тізбектер арқылы әсер етеді."
    }
  },
  {
    "prompt": {
      "RU": "Перед движением активны моторная кора, базальные ганглии и мозжечок. Как правильно объяснить их функциональные связи?",
      "EN": "Motor cortex, basal ganglia and cerebellum are active before a movement. How should their functional relationship be explained?",
      "KZ": "Қозғалыс алдында моторлық қыртыс, базальды ганглийлер және мишық белсенді. Олардың қызметтік байланысын қалай түсіндіруге болады?"
    },
    "correct": {
      "RU": "Это взаимодействующие контуры планирования и коррекции, связанные в том числе через таламус и ствол; они не образуют единственную последовательную цепь к мышце.",
      "EN": "They are interacting planning and correction circuits, connected in part via thalamus and brainstem, not a single serial chain to muscle.",
      "KZ": "Бұлар таламус пен ми бағаны арқылы да байланысатын жоспарлау және түзету тізбектері; бұлшықетке баратын бір ғана тізбекті жол емес."
    },
    "wrong": [
      {
        "RU": "Мозжечок обязательно расположен между каждым кортикоспинальным аксоном и α-мотонейроном.",
        "EN": "The cerebellum necessarily lies between every corticospinal axon and an alpha motor neuron.",
        "KZ": "Мишық әр кортикоспиналдық аксон мен α-мотонейронның міндетті аралық буыны."
      },
      {
        "RU": "Базальные ганглии служат только периферическими рецепторами положения сустава.",
        "EN": "The basal ganglia serve only as peripheral joint-position receptors.",
        "KZ": "Базальды ганглийлер тек буын қалпының шеткі рецепторлары қызметін атқарады."
      },
      {
        "RU": "Таламус непосредственно образует нервно-мышечные синапсы в мышцах кисти.",
        "EN": "The thalamus directly forms neuromuscular junctions in hand muscles.",
        "KZ": "Таламус қол бұлшықеттерінде тікелей жүйке-бұлшықет синапстарын түзеді."
      }
    ],
    "explanation": {
      "RU": "Мозжечковые и базальноганглионарные петли взаимодействуют с корковыми и стволовыми системами, тогда как спинальные и черепные двигательные нейроны остаются конечным выходом.",
      "EN": "Cerebellar and basal-ganglia loops interact with cortical and brainstem systems, while spinal and cranial motor neurons remain the final motor output.",
      "KZ": "Мишық пен базальды ганглийлердің ілмектері қыртыстық және ми бағаны жүйелерімен өзара әрекеттеседі, ал жұлын және бассүйек қозғалтқыш нейрондары соңғы шығыс болып қалады."
    }
  },
  {
    "prompt": {
      "RU": "У пациента небольшой левый очаг в задней ножке внутренней капсулы и слабость правой кисти. Какая проводниковая закономерность лучше объясняет сторону слабости?",
      "EN": "A small left posterior-limb internal-capsule lesion is accompanied by right-hand weakness. Which pathway feature best explains the side of weakness?",
      "KZ": "Ішкі капсуланың артқы аяқшасындағы шағын сол жақ ошақ оң қол басының әлсіздігімен қатар жүреді. Әлсіздіктің жағын қай өткізгіштік ерекшелік түсіндіреді?"
    },
    "correct": {
      "RU": "Большинство кортикоспинальных волокон перекрещивается ниже внутренней капсулы, в каудальной части продолговатого мозга.",
      "EN": "Most corticospinal fibers cross below the internal capsule, in the caudal medulla.",
      "KZ": "Кортикоспиналдық талшықтардың көбі ішкі капсуладан төмен, сопақша мидың каудалдық бөлігінде айқасады."
    },
    "wrong": [
      {
        "RU": "Все кортикоспинальные волокна перекрещиваются непосредственно внутри внутренней капсулы.",
        "EN": "All corticospinal fibers cross within the internal capsule itself.",
        "KZ": "Барлық кортикоспиналдық талшықтар ішкі капсуланың өзінде айқасады."
      },
      {
        "RU": "Все двигательные волокна остаются на одной стороне на всём протяжении спинного мозга.",
        "EN": "All descending motor fibers remain ipsilateral throughout the spinal cord.",
        "KZ": "Барлық төмендеуші қозғалтқыш талшықтар жұлын бойында бір жақта қалады."
      },
      {
        "RU": "Правой кистью управляет исключительно правый латеральный кортикоспинальный путь из правой коры.",
        "EN": "The right hand is controlled only by the right lateral corticospinal tract from right cortex.",
        "KZ": "Оң қол басын тек оң қыртыстан шығатын оң латералдық кортикоспиналдық жол басқарады."
      }
    ],
    "explanation": {
      "RU": "Левый супратенториальный очаг обычно нарушает преимущественно перекрещивающиеся позже кортикоспинальные влияния на правые конечности; клиническая локализация требует остальных признаков.",
      "EN": "A left supratentorial lesion usually disrupts corticospinal influences that cross farther caudally and affect the right limbs; other signs are needed for clinical localization.",
      "KZ": "Сол жақ супратенториалдық ошақ көбіне төменірек айқасып, оң аяқ-қолға әсер ететін кортикоспиналдық ықпалдарды бұзады; клиникалық локализация үшін өзге белгілер қажет."
    }
  },
  {
    "prompt": {
      "RU": "Одностороннее повреждение латерального кортикоспинального тракта произошло в грудном отделе спинного мозга. Какую сторону произвольных движений ниже очага ожидают ослабленной преимущественно?",
      "EN": "A unilateral lateral corticospinal tract lesion occurs in the thoracic spinal cord. Which side is most likely to show weakened voluntary movement below the lesion?",
      "KZ": "Жұлынның кеуде бөлігінде латералдық кортикоспиналдық жол бір жақтан зақымданды. Ошақтан төмен ерікті қозғалыстар қай жақта көбірек әлсірейді?"
    },
    "correct": {
      "RU": "На стороне поражённого тракта, поскольку его основные волокна уже перекрестились в продолговатом мозге.",
      "EN": "On the side of the damaged tract, because most of its fibers already crossed in the medulla.",
      "KZ": "Зақымдалған жол жағында, өйткені оның негізгі талшықтары сопақша мида айқасып қойған."
    },
    "wrong": [
      {
        "RU": "На противоположной стороне, потому что все волокна перекрещиваются только в поясничном отделе.",
        "EN": "On the opposite side, because all fibers cross only in the lumbar spinal cord.",
        "KZ": "Қарама-қарсы жақта, себебі барлық талшықтар тек бел жұлында айқасады."
      },
      {
        "RU": "Всегда симметрично с двух сторон независимо от уровня и распространённости очага.",
        "EN": "Always symmetrically on both sides regardless of lesion level or extent.",
        "KZ": "Ошақ деңгейі мен көлеміне қарамастан әрқашан екі жақта бірдей."
      },
      {
        "RU": "Ни на одной стороне, потому что латеральный кортикоспинальный тракт не участвует в движении.",
        "EN": "On neither side, because the lateral corticospinal tract does not contribute to movement.",
        "KZ": "Ешбір жақта емес, өйткені латералдық кортикоспиналдық жол қозғалысқа қатыспайды."
      }
    ],
    "explanation": {
      "RU": "После пирамидного перекрёста поражение латерального тракта в спинном мозге обычно вызывает ипсилатеральный дефицит ниже очага. Это не исключает сопутствующие чувствительные нарушения.",
      "EN": "Below the pyramidal decussation, a spinal lateral-tract lesion usually causes ipsilateral motor deficits below the lesion. Associated sensory findings must still be assessed.",
      "KZ": "Пирамидалық айқасудан төмен жұлындағы латералдық жол зақымы әдетте ошақтан төмен зақымдалған жақтағы қозғалысты әлсіретеді. Қатар жүретін сезімталдық белгілерін де бағалау керек."
    }
  },
  {
    "prompt": {
      "RU": "Человек заранее напрягает мышцы туловища, прежде чем быстро поднять руку. Какие нисходящие влияния особенно участвуют в такой постуральной поддержке?",
      "EN": "A person activates trunk muscles before rapidly raising an arm. Which descending influences are especially involved in postural support?",
      "KZ": "Адам қолын тез көтермей тұрып тұлға бұлшықеттерін белсендіреді. Мұндай постуральдық тірекке қандай төмендеуші ықпалдар ерекше қатысады?"
    },
    "correct": {
      "RU": "Многие ретикулоспинальные и вестибулоспинальные проекции совместно с корковыми и спинальными сетями.",
      "EN": "Many reticulospinal and vestibulospinal projections working with cortical and spinal circuits.",
      "KZ": "Көптеген ретикулоспиналдық және вестибулоспиналдық проекциялар қыртыстық әрі жұлын тізбектерімен бірге."
    },
    "wrong": [
      {
        "RU": "Только одиночные аксоны зрительного нерва, непосредственно идущие к мышцам туловища.",
        "EN": "Only individual optic-nerve axons that project directly to trunk muscles.",
        "KZ": "Тек тұлға бұлшықеттеріне тікелей баратын көру жүйкесінің жеке аксондары."
      },
      {
        "RU": "Только периферические болевые афференты, полностью заменяющие нисходящую регуляцию.",
        "EN": "Only peripheral nociceptive afferents that entirely replace descending control.",
        "KZ": "Төмендеуші реттеуді толық алмастыратын тек шеткі ауырсыну афференттері."
      },
      {
        "RU": "Только латеральный кортикоспинальный тракт без участия стволовых сетей.",
        "EN": "Only the lateral corticospinal tract, with no contribution from brainstem networks.",
        "KZ": "Ми бағаны желілерінің қатысуынсыз тек латералдық кортикоспиналдық жол."
      }
    ],
    "explanation": {
      "RU": "Медиальные стволово-спинальные системы вносят важный вклад в осевую и проксимальную стабилизацию; заранее подготовленные настройки и сенсорная коррекция используют общие двигательные сети.",
      "EN": "Medial brainstem-to-spinal systems contribute strongly to axial and proximal stabilization; anticipatory settings and sensory corrections converge on motor networks.",
      "KZ": "Медиалдық ми бағаны–жұлын жүйелері тұлға мен проксималдық тұрақтануға елеулі үлес қосады; алдын ала дайындық пен сенсорлық түзету ортақ қозғалтқыш желілерге ықпал етеді."
    }
  },
  {
    "prompt": {
      "RU": "После поражения нисходящих путей точные движения пальцев резко ухудшились, но часть постуральных реакций сохранена. Какой вывод наиболее обоснован?",
      "EN": "After descending pathway damage, fine finger movements worsen markedly while some postural responses remain. Which inference is best supported?",
      "KZ": "Төмендеуші жолдар зақымданған соң саусақтың дәл қозғалыстары күрт нашарлады, бірақ кейбір постуральдық жауаптар сақталды. Қай қорытынды негіздірек?"
    },
    "correct": {
      "RU": "Дистальные точные движения особенно зависят от латеральных кортикоспинальных влияний; поддержание позы также использует стволовые пути.",
      "EN": "Skilled distal movements depend strongly on lateral corticospinal influences; posture also uses brainstem pathways.",
      "KZ": "Дисталдық дәл қозғалыстар латералдық кортикоспиналдық ықпалдарға ерекше тәуелді; дене қалпын сақтау ми бағаны жолдарын да пайдаланады."
    },
    "wrong": [
      {
        "RU": "Любая сохранная постуральная реакция доказывает полную сохранность кортикоспинального тракта.",
        "EN": "Any preserved postural response proves that the corticospinal tract is entirely intact.",
        "KZ": "Кез келген сақталған постуральдық жауап кортикоспиналдық жолдың толық сау екенін дәлелдейді."
      },
      {
        "RU": "Слабость пальцев доказывает изолированное поражение вестибулярного нерва без других данных.",
        "EN": "Finger weakness alone proves an isolated vestibular nerve lesion.",
        "KZ": "Саусақ әлсіздігі өзге дерексіз-ақ вестибулярлық жүйкенің оқшау зақымын дәлелдейді."
      },
      {
        "RU": "Ретикулоспинальные пути не влияют на постуральную мускулатуру человека.",
        "EN": "Reticulospinal pathways do not influence human postural muscles.",
        "KZ": "Ретикулоспиналдық жолдар адамның постуральдық бұлшықеттеріне әсер етпейді."
      }
    ],
    "explanation": {
      "RU": "Функциональное различие медиальных и латеральных систем относительное: пути сходятся на общих спинальных сетях, поэтому один симптом не определяет единственный повреждённый тракт.",
      "EN": "The medial-versus-lateral functional distinction is relative: pathways converge on spinal networks, so a single sign cannot uniquely identify the damaged tract.",
      "KZ": "Медиалдық және латералдық жүйелердің айырмашылығы салыстырмалы: жолдар ортақ жұлын желілерінде тоғысады, сондықтан бір белгі зақымдалған жалғыз жолды анықтамайды."
    }
  },
  {
    "prompt": {
      "RU": "Во время движения к цели она неожиданно смещается вправо. Что лучше объясняет последующую коррекцию траектории кисти?",
      "EN": "A reaching target unexpectedly moves to the right after movement begins. What best explains the subsequent adjustment of hand trajectory?",
      "KZ": "Қолды нысанаға созу басталғаннан кейін нысана кенет оңға жылжыды. Қол траекториясының кейінгі түзетілуін не жақсы түсіндіреді?"
    },
    "correct": {
      "RU": "Исходная команда уже запущена; новые зрительные и проприоцептивные сигналы помогают изменить продолжающееся движение с задержкой.",
      "EN": "The initial command is already under way; new visual and proprioceptive signals help adjust the ongoing movement after a delay.",
      "KZ": "Бастапқы команда орындалып жатыр; жаңа көру және проприоцептивтік сигналдар кідірістен кейін жүріп жатқан қозғалысты түзетуге көмектеседі."
    },
    "wrong": [
      {
        "RU": "Мышцы заранее знают новое положение цели ещё до поступления сенсорной информации.",
        "EN": "Muscles know the target's new position before any sensory information arrives.",
        "KZ": "Бұлшықеттер жаңа нысана орнын сенсорлық ақпарат келмей тұрып біледі."
      },
      {
        "RU": "Каждая коррекция требует полного прекращения всех спинальных рефлексов.",
        "EN": "Every adjustment requires all spinal reflexes to stop completely.",
        "KZ": "Әр түзету барлық жұлын рефлекстерінің толық тоқтауын талап етеді."
      },
      {
        "RU": "Зрительная обратная связь невозможна после начала произвольного движения.",
        "EN": "Visual feedback cannot influence a voluntary movement once it has begun.",
        "KZ": "Ерікті қозғалыс басталған соң көру кері байланысы оған әсер ете алмайды."
      }
    ],
    "explanation": {
      "RU": "Планирование движения и коррекция по ошибке сосуществуют: сенсорная информация о новой цели и состоянии конечности обновляет команду, но реакция имеет конечную задержку.",
      "EN": "Feedforward planning and error-based correction coexist: sensory information about the new target and limb state updates motor commands, with a finite response delay.",
      "KZ": "Алдын ала жоспарлау мен қате бойынша түзету қатар жүреді: жаңа нысана және аяқ-қол қалпы туралы сенсорлық ақпарат команданы жаңартады, бірақ жауаптың кідірісі болады."
    }
  },
  {
    "prompt": {
      "RU": "При ходьбе по неровной поверхности ухудшилась проприоцепция голеностопа, но зрение и вестибулярные сигналы сохранены. Какой прогноз наиболее осторожный?",
      "EN": "During walking on uneven ground, ankle proprioception is reduced but vision and vestibular signals remain. What is the most defensible prediction?",
      "KZ": "Тегіс емес жерде жүргенде тобықтың проприоцепциясы азайды, бірақ көру мен вестибулярлық сигналдар сақталды. Ең сақ болжам қандай?"
    },
    "correct": {
      "RU": "Точность коррекции может снизиться, особенно без зрения, но другие сенсорные входы способны частично компенсировать потерю.",
      "EN": "Corrections may become less accurate, especially without vision, but other sensory inputs may partly compensate.",
      "KZ": "Түзетудің дәлдігі, әсіресе көрусіз, төмендеуі мүмкін, алайда өзге сенсорлық кірістер жоғалтуды ішінара өтей алады."
    },
    "wrong": [
      {
        "RU": "Любое снижение проприоцепции обязательно вызывает полный паралич всех мышц ноги.",
        "EN": "Any reduction in proprioception necessarily causes complete paralysis of all leg muscles.",
        "KZ": "Проприоцепцияның кез келген төмендеуі аяқтың барлық бұлшықетін толық сал етеді."
      },
      {
        "RU": "Сохранное зрение доказывает, что постуральная устойчивость ни при каких условиях не изменится.",
        "EN": "Intact vision guarantees that postural stability cannot change under any conditions.",
        "KZ": "Көрудің сақталуы постуральдық тұрақтылық еш жағдайда өзгермейтінін дәлелдейді."
      },
      {
        "RU": "Вестибулярная информация полностью заменяет все сигналы мышечных веретён во всех задачах.",
        "EN": "Vestibular input completely replaces every muscle-spindle signal in every task.",
        "KZ": "Вестибулярлық ақпарат барлық жағдайда бұлшықет ұршықтарының барлық сигналдарын толық алмастырады."
      }
    ],
    "explanation": {
      "RU": "Сенсорные каналы дают частично взаимодополняющую информацию. Нарушение одного входа может ухудшить коррекцию, но степень дефицита зависит от задачи, времени и доступных компенсаторных сигналов.",
      "EN": "Sensory channels provide partly complementary information. Losing one input can impair correction, but the effect depends on the task, timing and available compensatory signals.",
      "KZ": "Сенсорлық арналар бірін-бірі ішінара толықтырады. Бір кірістің азаюы түзетуді нашарлатуы мүмкін, бірақ әсері тапсырмаға, уақытқа және өтемдік сигналдарға тәуелді."
    }
  },
  {
    "prompt": {
      "RU": "Сразу после острого центрального двигательного поражения у пациента слабость и сниженный тонус; спустя недели появляются оживлённые рефлексы. Как интерпретировать динамику?",
      "EN": "Immediately after an acute central motor lesion a patient has weakness and low tone; weeks later reflexes become brisk. How should the time course be interpreted?",
      "KZ": "Жедел орталық қозғалтқыш зақымнан кейін науқаста әлсіздік пен төмен тонус бар; бірнеше аптадан соң рефлекстер күшейеді. Уақыттық өзгерісті қалай түсіндіруге болады?"
    },
    "correct": {
      "RU": "Ранняя вялость не исключает центрального поражения; позже могут возникать гиперрефлексия и спастичность из-за перестройки нисходящего контроля.",
      "EN": "Early flaccidity does not exclude a central lesion; hyperreflexia and spasticity may emerge later as descending control changes.",
      "KZ": "Ерте босаңсу орталық зақымды жоққа шығармайды; төмендеуші бақылау өзгергенде кейін гиперрефлексия мен спастикалық тонус пайда болуы мүмкін."
    },
    "wrong": [
      {
        "RU": "Любая ранняя гипотония навсегда исключает поражение верхнего мотонейрона.",
        "EN": "Any early hypotonia permanently excludes upper motor neuron damage.",
        "KZ": "Кез келген ерте гипотония жоғарғы мотонейрон зақымын біржола жоққа шығарады."
      },
      {
        "RU": "Гиперрефлексия сама по себе доказывает полное восстановление произвольной силы.",
        "EN": "Hyperreflexia alone proves full recovery of voluntary strength.",
        "KZ": "Гиперрефлексияның өзі ерікті күштің толық қалпына келгенін дәлелдейді."
      },
      {
        "RU": "Спастичность возможна только при изолированном повреждении одного кортикоспинального аксона.",
        "EN": "Spasticity occurs only after damage to a single isolated corticospinal axon.",
        "KZ": "Спастикалық тонус тек бір оқшау кортикоспиналдық аксон зақымданғанда болады."
      }
    ],
    "explanation": {
      "RU": "При остром поражении центральных нисходящих систем рефлексы и тонус могут сначала снижаться; поздняя гиперрефлексия не означает нормальную произвольную функцию и не локализует единственный тракт.",
      "EN": "Following acute damage to central descending systems, reflexes and tone can initially be reduced; later hyperreflexia neither establishes normal voluntary function nor identifies one isolated tract.",
      "KZ": "Орталық төмендеуші жүйелердің жедел зақымында рефлекстер мен тонус алғаш төмендеуі мүмкін; кейінгі гиперрефлексия ерікті қызметтің қалпына келгенін де, жалғыз жолдың орнын да дәлелдемейді."
    }
  },
  {
    "prompt": {
      "RU": "При исследовании коленного рефлекса ударяют по связке надколенника. Что является основным рецептором краткого рефлекторного сокращения четырёхглавой мышцы?",
      "EN": "During a knee-jerk test, the patellar tendon is tapped. What receptor chiefly initiates the brief quadriceps stretch reflex?",
      "KZ": "Тізе рефлексін тексергенде тізе тостағаншасының сіңірін соғады. Төртбасты бұлшықеттің қысқа созылу рефлексін негізінен қай рецептор бастайды?"
    },
    "correct": {
      "RU": "Мышечное веретено, возбуждаемое быстрым растяжением мышцы; Ia-афференты активируют спинальные α-мотонейроны.",
      "EN": "The muscle spindle stretched rapidly by the tap; Ia afferents excite spinal alpha motor neurons.",
      "KZ": "Соққыдан бұлшықет тез созылғанда қозатын бұлшықет ұршығы; Ia-афференттер жұлын α-мотонейрондарын қоздырады."
    },
    "wrong": [
      {
        "RU": "Только сухожильный орган Гольджи, который непосредственно сокращает мышцу без спинного мозга.",
        "EN": "Only the Golgi tendon organ, which contracts the muscle directly without spinal circuits.",
        "KZ": "Тек жұлынсыз бұлшықетті тікелей жиыратын Гольджи сіңірлік органы."
      },
      {
        "RU": "Кожные болевые рецепторы, всегда заменяющие мышечные веретёна в сухожильном рефлексе.",
        "EN": "Cutaneous pain receptors that always replace muscle spindles in the tendon jerk.",
        "KZ": "Сіңір рефлексінде бұлшықет ұршықтарын әрқашан алмастыратын терідегі ауырсыну рецепторлары."
      },
      {
        "RU": "Зрительные фоторецепторы, передающие команду непосредственно в бедренный нерв.",
        "EN": "Visual photoreceptors sending the command directly into the femoral nerve.",
        "KZ": "Команданы тікелей сан жүйкесіне жіберетін көру фоторецепторлары."
      }
    ],
    "explanation": {
      "RU": "Несмотря на удар по сухожилию, возбуждаются прежде всего рецепторы растяжения внутри мышцы. Ослабление рефлекса может отражать нарушение афферента, мотонейрона или эфферента, а не один-единственный диагноз.",
      "EN": "Although the tendon is tapped, stretch receptors inside the muscle are primarily activated. A weak reflex may indicate afferent, motor-neuron or efferent dysfunction rather than a single diagnosis.",
      "KZ": "Сіңір соғылғанымен, алдымен бұлшықет ішіндегі созылу рецепторлары белсенеді. Әлсіз рефлекс афференттің, мотонейронның не эфференттің бұзылуын көрсетуі мүмкін; ол жалғыз диагноз емес."
    }
  }
];
const competencies = ["concept", "mechanism", "application", "transfer", "justification"] as const;

function question(item: Item, lang: Language, offset: number): QuestionCopy {
  const options = [
    { id: "a", text: item.correct[lang] },
    { id: "b", text: item.wrong[0][lang] },
    { id: "c", text: item.wrong[1][lang] },
    { id: "d", text: item.wrong[2][lang] },
  ];
  const shift = offset % options.length;
  return {
    prompt: item.prompt[lang],
    options: [...options.slice(shift), ...options.slice(0, shift)],
    correctAnswer: "a",
    explanation: item.explanation[lang],
  };
}

export function adaptModuleElevenTest(base: BranchingTest, lang: Language): BranchingTest {
  const nodes: Record<string, TestNode> = { ...base.nodes };
  competencies.forEach((competency, index) => {
    const main = items[index * 2], corrective = items[index * 2 + 1];
    for (const [level, item, offset] of [
      ["main", main, index + 1],
      ["corrective", corrective, index + 2],
      ["basic", corrective, index + 3],
    ] as const) {
      const key = competency + ":" + level;
      const previous = nodes[key];
      if (!previous || previous.type !== "question")
        throw new Error("Missing module 11 question node " + key);
      nodes[key] = { ...previous, ...question(item, lang, offset) };
    }
    const note = lang === "RU"
      ? "Сопоставьте наблюдение, механизм и ограничения вывода. "
      : lang === "EN"
        ? "Relate the observation to the mechanism and limits of inference. "
        : "Бақылауды тетікпен және қорытынды шегімен байланыстырыңыз. ";
    for (const suffix of ["review-1", "review-2"] as const) {
      const key = competency + ":" + suffix;
      const previous = nodes[key];
      if (!previous || previous.type !== "remediation")
        throw new Error("Missing module 11 remediation node " + key);
      nodes[key] = {
        ...previous,
        text: note + main.explanation[lang],
        theoryTarget: {
          moduleId: 11,
          anchor: competency === "justification" ? "interpretation" : "mechanism",
        },
      };
    }
  });
  return { ...base, nodes };
}
