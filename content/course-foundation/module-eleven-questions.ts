import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { QuestionsLesson } from "../study";

// Module 11: open-ended mechanism questions with explanatory feedback.
// Cross-checked against Guyton & Hall 13e ch. 56 (PDF 677–679),
// Ganong 23e ch. 16 (PDF 253–257), C. L. Ghai 8e (PDF 317–319).
// Educational analysis only; not unsupervised clinical examination.
type Text = Record<Language, string>;
type Question = { section: "theory"|"clinical"|"interactive"|"cases"|"practice"; prompt: Text; explanation: Text };
const authored: Question[] = [
  {
    "section": "theory",
    "prompt": {
      "RU": "Студент изображает движение кисти как прямую цепь «базальные ганглии → мозжечок → моторная кора → мышца». Какие звенья и обратные связи необходимо исправить на этой схеме?",
      "EN": "A student draws hand movement as a single chain: “basal ganglia → cerebellum → motor cortex → muscle.” Which missing pathways and feedback loops must be corrected?",
      "KZ": "Студент қол қозғалысын «базальды ганглийлер → мишық → моторлық қыртыс → бұлшықет» деген бір тізбекпен көрсеткен. Сызбада қандай жолдар мен кері байланыстарды түзету қажет?"
    },
    "explanation": {
      "RU": "Двигательная программа формируется распределёнными корковыми и подкорковыми сетями. Базальные ганглии и мозжечок взаимодействуют с корой через таламические и стволовые связи, а не располагаются последовательно на единственном пути к мышце. Нисходящие кортикоспинальные и стволовые влияния сходятся на спинальных интернейронах и мотонейронах. Конечный нервный выход к скелетной мышце дают α-мотонейроны и двигательные ядра черепных нервов. Сенсорные сигналы помогают изменять выполнение движения.",
      "EN": "Motor planning is distributed across cortical and subcortical networks. Basal ganglia and cerebellum interact with cortex through thalamic and brainstem loops; they do not form a mandatory serial pathway to muscle. Corticospinal and brainstem descending influences converge on spinal interneurons and motor neurons. Alpha motor neurons and cranial motor nuclei provide the final neural output to skeletal muscle. Sensory information helps update ongoing movement.",
      "KZ": "Қозғалыс бағдарламасы қыртыстық және қыртысасты желілерде бірлесіп қалыптасады. Базальды ганглийлер мен мишық қыртыспен таламустық және ми бағаны ілмектері арқылы байланысады, бұлшықетке баратын міндетті бірізді жол құрмайды. Кортикоспиналдық және ми бағанының төмендеуші ықпалдары жұлын интернейрондары мен мотонейрондарында тоғысады. Қаңқа бұлшықетіне соңғы жүйкелік шығысты α-мотонейрондар және бассүйек жүйкелерінің қозғалтқыш ядролары береді. Сенсорлық ақпарат жүріп жатқан қозғалысты түзетеді."
    }
  },
  {
    "section": "clinical",
    "prompt": {
      "RU": "У пациента после небольшого левостороннего поражения задней ножки внутренней капсулы ослабли тонкие движения правой кисти. Объясните сторону слабости, назовите место основного перекрёста и укажите, чего один этот признак не доказывает.",
      "EN": "A patient has impaired fine movements of the right hand after a small lesion of the left posterior limb of the internal capsule. Explain the side of weakness, locate the major decussation and state what this sign alone cannot establish.",
      "KZ": "Ішкі капсуланың артқы аяқшасындағы шағын сол жақ зақымнан кейін науқастың оң қол басының дәл қимылдары әлсіреді. Әлсіздіктің жағын, негізгі айқасу орнын және осы жалғыз белгіден нені дәлелдеуге болмайтынын түсіндіріңіз."
    },
    "explanation": {
      "RU": "Кортикоспинальные аксоны проходят через внутреннюю капсулу, а большинство перекрещивается значительно ниже — в каудальном отделе продолговатого мозга. Поэтому левый супратенториальный очаг часто нарушает произвольные движения правых конечностей. Латеральный тракт особенно важен для точных движений пальцев, но действует также через интернейроны. По одной слабости нельзя доказать ни изолированное повреждение конкретного тракта, ни точную протяжённость очага: необходимы другие двигательные, чувствительные и визуализационные данные.",
      "EN": "Corticospinal axons pass through the internal capsule, while most decussate farther caudally in the lower medulla. A left supratentorial lesion therefore commonly weakens voluntary movement of the right limbs. The lateral corticospinal tract is especially important for skilled finger movements, although many effects involve interneurons. Weakness alone does not prove an isolated tract lesion or its exact extent; additional motor, sensory and imaging findings are required.",
      "KZ": "Кортикоспиналдық аксондар ішкі капсула арқылы өтеді, ал олардың көбі әлдеқайда төменде — сопақша мидың каудалдық бөлігінде айқасады. Сондықтан сол жақ супратенториалдық ошақ оң аяқ-қолдың ерікті қозғалысын жиі әлсіретеді. Латералдық жол саусақтың дәл қимылдары үшін маңызды, бірақ әсері интернейрондар арқылы да іске асады. Жалғыз әлсіздік нақты жолдың оқшау зақымын не ошақтың толық көлемін дәлелдемейді; қосымша қозғалтқыш, сезімталдық және бейнелеу деректері қажет."
    }
  },
  {
    "section": "interactive",
    "prompt": {
      "RU": "Перед подъёмом руки у человека меняется активность мышц туловища; затем опорная поверхность неожиданно смещается. Какие нисходящие пути и сенсорные сигналы участвуют в предварительной и последующей постуральной коррекции?",
      "EN": "Trunk muscles activate before an arm raise, and then the support surface unexpectedly shifts. Which descending pathways and sensory signals contribute to anticipatory and subsequent postural adjustment?",
      "KZ": "Қолды көтермей тұрып тұлға бұлшықеттері белсенеді, содан кейін тірек беті күтпеген жерден жылжиды. Алдын ала және кейінгі постуральдық түзетуге қандай төмендеуші жолдар мен сенсорлық сигналдар қатысады?"
    },
    "explanation": {
      "RU": "Предвосхищающая настройка позы использует корковые и стволовые моторные сети. Многие ретикулоспинальные и вестибулоспинальные влияния особенно важны для осевой и проксимальной мускулатуры, а латеральный кортикоспинальный тракт — для точных дистальных действий. После смещения опоры в коррекции участвуют вестибулярные, проприоцептивные, кожные и зрительные сигналы. Это функциональные предпочтения, а не абсолютное разделение путей; по одному смещению центра давления нельзя установить единственный повреждённый тракт.",
      "EN": "Anticipatory postural adjustments involve cortical and brainstem motor networks. Many reticulospinal and vestibulospinal projections are particularly important for axial and proximal muscles, whereas lateral corticospinal output supports skilled distal action. After support moves, vestibular, proprioceptive, cutaneous and visual signals help update posture. These are relative functional specializations rather than independent exclusive pathways; a single center-of-pressure shift cannot identify one damaged tract.",
      "KZ": "Дене қалпын алдын ала реттеуге қыртыстық және ми бағанының қозғалтқыш желілері қатысады. Көптеген ретикулоспиналдық және вестибулоспиналдық проекциялар тұлға мен проксималдық бұлшықеттер үшін маңызды, ал латералдық кортикоспиналдық ықпал дисталдық дәл қимылдарға көбірек қатысады. Тірек жылжығаннан кейін вестибулярлық, проприоцептивтік, терілік және көру сигналдары дене қалпын түзетеді. Бұл абсолютті бөліну емес; қысым орталығының бір өзгерісі зақымдалған жалғыз жолды анықтамайды."
    }
  },
  {
    "section": "cases",
    "prompt": {
      "RU": "При протягивании руки зрительная цель сместилась уже после начала движения. Как отделить заранее подготовленную команду от коррекции по обратной связи? Что изменится, если проприоцептивный сигнал ослабнет, но зрение сохранится?",
      "EN": "While reaching, a visual target moves after the movement has begun. How do feedforward preparation and feedback correction differ? What might change if proprioception weakens while vision remains available?",
      "KZ": "Қолды созу басталғаннан кейін көру нысанасы жылжыды. Алдын ала дайындалған команданы кері байланыс бойынша түзетуден қалай ажыратуға болады? Проприоцепция әлсіреп, көру сақталса не өзгеруі мүмкін?"
    },
    "explanation": {
      "RU": "Исходная команда задаёт движение до получения новой информации о цели. После смещения зрительный сигнал и данные о положении конечности обновляют оценку ошибки; последующая коррекция имеет конечную задержку. Ослабление проприоцепции может уменьшить точность и устойчивость, особенно без зрительного контроля, но сохранное зрение и другие афференты способны частично компенсировать потерю. Величина эффекта зависит от задачи и условий; нельзя обещать обязательный паралич или полную компенсацию.",
      "EN": "The initial motor command starts before new target information is available. Once the target shifts, visual input and information about limb state update the movement-error estimate, and correction occurs after a finite delay. Reduced proprioception may impair precision and stability, especially without visual guidance, but intact vision and other afferents can partly compensate. The effect depends on task and context; neither inevitable paralysis nor complete compensation follows.",
      "KZ": "Бастапқы қозғалыс командасы жаңа нысана ақпараты келмей тұрып орындала бастайды. Нысана жылжыған соң көру сигналы мен аяқ-қол қалпы туралы ақпарат қозғалыс қатесін бағалауды жаңартады; түзету белгілі кідірістен кейін жүреді. Проприоцепцияның әлсіреуі, әсіресе көрусіз, дәлдік пен тұрақтылықты төмендетуі мүмкін, бірақ сақталған көру және басқа афференттер ішінара өтей алады. Әсері тапсырма мен жағдайға тәуелді; міндетті салдану не толық өтем болмайды."
    }
  },
  {
    "section": "practice",
    "prompt": {
      "RU": "После острого центрального двигательного поражения рефлексы сначала снижены, а спустя недели становятся оживлёнными. Как это согласуется с изменением нисходящего контроля? Почему удар по сухожилию не означает, что основной рецептор рефлекса находится в сухожилии?",
      "EN": "After an acute central motor lesion, reflexes are initially depressed but become brisk weeks later. How can altered descending control explain this? Why does a tendon tap not mean the main stretch-reflex receptor is in the tendon?",
      "KZ": "Жедел орталық қозғалтқыш зақымынан кейін рефлекстер алғаш әлсіз, ал бірнеше аптадан соң күшейеді. Мұны төмендеуші бақылаудың өзгеруімен қалай түсіндіруге болады? Сіңірді соғу неліктен созылу рефлексінің негізгі рецепторы сіңірде орналасқанын білдірмейді?"
    },
    "explanation": {
      "RU": "При остром поражении нисходящих систем могут возникать ранняя гипотония и гипорефлексия; позднее меняется возбудимость спинальных цепей, что иногда приводит к гиперрефлексии и спастичности. Эти признаки не доказывают восстановление произвольной силы или изолированное повреждение одного аксона. Удар по сухожилию быстро растягивает мышцу и возбуждает мышечные веретёна: Ia-афференты активируют α-мотонейроны. Слабый ответ может возникать при дефекте афферентного, сегментарного или эфферентного звена; оценка требует контекста.",
      "EN": "Acute loss of descending influence can initially produce low tone and depressed reflexes; later spinal-circuit excitability changes may yield hyperreflexia and spasticity. Neither finding proves restored voluntary strength or a lesion of one isolated axon. A tendon tap rapidly stretches muscle and activates muscle spindles; Ia afferents excite alpha motor neurons. A reduced response can reflect afferent, segmental or efferent dysfunction and requires clinical context rather than a single-sign diagnosis.",
      "KZ": "Төмендеуші ықпалдардың жедел бұзылысы алғаш гипотония мен гипорефлексияға әкелуі мүмкін; кейін жұлын тізбектерінің қозғыштығы өзгеріп, гиперрефлексия мен спастикалық тонус дамуы ықтимал. Бұл ерікті күштің қалпына келгенін не бір аксонның оқшау зақымын дәлелдемейді. Сіңірді соғу бұлшықетті тез созып, бұлшықет ұршықтарын белсендіреді; Ia-афференттер α-мотонейрондарды қоздырады. Әлсіз жауап афференттік, сегменттік немесе эфференттік буынның бұзылуынан болуы мүмкін; бір белгімен диагноз қойылмайды."
    }
  }
];

export function createModuleElevenQuestions(language: Language): QuestionsLesson {
  return {
    kind: "questions",
    title: getSectionTitle("questions", language),
    introduction: language === "RU"
      ? "Пять вопросов на причинное объяснение двигательного контроля. Сначала сформулируйте собственный ответ, затем сравните с разбором и укажите границы вывода."
      : language === "EN"
        ? "Five open-ended motor-control questions. Explain the mechanism before revealing feedback and state the limits of what the observation proves."
        : "Қозғалысты басқарудың себептік тетігі туралы бес сұрақ. Алдымен өз жауабыңызды беріп, кейін талдаумен салыстырыңыз және қорытындының шегін көрсетіңіз.",
    questions: authored.map(({ section, prompt, explanation }, index) => ({
      id: "module-11-question-" + (index + 1),
      prompt: prompt[language],
      explanation: explanation[language],
      target: { section },
    })),
  };
}
