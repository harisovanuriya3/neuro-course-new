import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Three authored clinical-reasoning cases for module 11, RU/EN/KZ.
// Physiology checked with the user's Library editions:
// Guyton & Hall 13e, ch. 56, PDF pp. 677–679 (printed 709–711);
// Ganong 23e, ch. 16, PDF pp. 253–256 (printed 241–244);
// C. L. Ghai Practical Physiology 8e, PDF pp. 317–319 (printed 295–297).
// Clinical cases are hypothetical; no patient testing is instructed.
type Text = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Text => ({ RU, EN, KZ });
type Scenario = {
  id: string; title: Text; situation: Text;
  questions: [Text, Text, Text]; explanations: [Text, Text];
};
const scenarios: Scenario[] = [
  {
    id: "visual-target-shift",
    title: t("1. Изменение зрительной цели во время движения", "1. Visual target shifts during a reach", "1. Қозғалыс кезіндегі көру нысанасының ығысуы"),
    situation: t(
      "В учебном эксперименте здоровый доброволец тянется правой рукой к неподвижной световой метке. После начала движения метка неожиданно смещается вправо. В условии A зрительная обратная связь доступна, в условии B положение кисти и метки временно скрыто. В A траектория позже отклоняется к новой цели, в B коррекция меньше и менее точна. Исходная сила руки одинакова. Это описание учебного наблюдения, а не диагностический тест.",
      "In a teaching experiment a healthy volunteer reaches with the right hand toward a stationary light target. After movement begins, the target unexpectedly jumps to the right. In condition A visual feedback is available; in B the hand and target are briefly hidden. In A the trajectory later bends toward the new target; in B the correction is smaller and less accurate. Initial hand strength is identical. This is a teaching observation, not a diagnostic test.",
      "Оқу тәжірибесінде дені сау ерікті оң қолын қозғалмайтын жарық нысанасына созады. Қозғалыс басталғаннан кейін нысана кенет оңға ығысады. А жағдайында көру арқылы кері байланыс бар, В жағдайында қол мен нысананың орны уақытша жасырылған. А жағдайында траектория кейін жаңа нысанаға қарай түзеледі, В жағдайында түзету азырақ әрі дәлдігі төмен. Қолдың бастапқы күші бірдей. Бұл диагностикалық сынақ емес, оқу бақылауы."
    ),
    questions: [
      t("Какие наблюдения позволяют отличить первоначально запланированную команду от сенсорной обратной связи, поступающей во время движения? Объясните роль команды в момент смещения цели.",
        "Which observations distinguish the initially planned command from sensory feedback acquired during the movement? Explain the command's role when the target jumps.",
        "Қандай бақылаулар алдын ала жоспарланған команданы қозғалыс кезіндегі сенсорлық кері байланыстан ажыратуға мүмкіндік береді? Нысана ығысқан сәттегі команданың рөлін түсіндіріңіз."),
      t("Зрительная и проприоцептивная информация каким образом помогает оценивать ошибку положения кисти? Почему коррекция не обязана быть мгновенной и не является доказательством работы одного «центра»?",
        "How can visual and proprioceptive information help estimate hand-position error? Why is the correction neither instantaneous nor proof of a single motor 'center'?",
        "Көру және проприоцептивтік ақпарат қол орнының қатесін бағалауға қалай көмектеседі? Неліктен түзету бірден болмайды және жалғыз қозғалыс «орталығының» дәлелі емес?"),
      t("Назовите минимум два контролируемых показателя и одну альтернативу объяснению: например, изменение внимания или видимости цели. Что нельзя заключить только по одной траектории?",
        "Name at least two controlled measures and one alternative explanation, such as attention or target visibility. What cannot be inferred from one trajectory alone?",
        "Кемінде екі бақыланатын көрсеткішті және зейін не нысананың көрінуі сияқты бір балама түсіндірмені атаңыз. Бір траектория бойынша нені анықтауға болмайды?")
    ],
    explanations: [
      t("Первоначальная команда может быть подготовлена до смещения цели и запускает движение. Позднее зрительные сигналы о новой цели вместе с проприоцепцией о положении конечности позволяют обновить оценку ошибки и изменить нисходящий выход. Коррекция зависит от задержек обработки, состояния моторных сетей и текущей задачи; корковые, мозжечковые, стволовые и спинальные контуры взаимодействуют, а не образуют единственный изолированный центр.",
        "The initial motor command can be prepared before the target shift and launches the reach. Subsequent visual information about the new target, combined with proprioception about limb state, allows an updated error estimate and adjustment of descending output. Correction depends on processing delays, network state and task demands; cortical, cerebellar, brainstem and spinal circuits interact rather than forming one isolated center.",
        "Алғашқы моторлық команда нысана ығысқанға дейін дайындалып, қол созуды бастайды. Кейін жаңа нысана туралы көру сигналы мен аяқ-қол қалпы туралы проприоцепция қатені қайта бағалауға және төмендеуші команданы түзетуге көмектеседі. Түзету өңдеу кідірісіне, желі күйіне және тапсырмаға тәуелді; қыртыстық, мишықтық, ми бағаны мен жұлын тізбектері өзара әрекеттеседі, жалғыз оқшау орталық емес."),
      t("Сравнивают задержку начала коррекции, отклонение кисти от цели и конечную ошибку при одинаковой начальной скорости, видимости и инструкции. Ухудшение без зрения совместимо с ролью зрительной обратной связи, но не доказывает её единственный вклад: остаются проприоцепция, предсказание, внимание и обучение. По одной траектории нельзя диагностировать поражение мозжечка, коры или конкретного проводящего пути.",
        "Compare correction latency, hand deviation and final target error while controlling initial speed, visibility and instructions. Worse performance without vision is consistent with visual feedback contributing, but it does not establish vision as the only input: proprioception, prediction, attention and learning also matter. A single trajectory cannot diagnose a cerebellar, cortical or specific tract lesion.",
        "Бастапқы жылдамдық, көріну және нұсқау бірдей болғанда түзетудің басталу кідірісін, қол ауытқуын және соңғы қатені салыстырады. Көрусіз нәтиженің нашарлауы көру кері байланысының үлесін қолдайды, бірақ оның жалғыз кіріс екенін дәлелдемейді: проприоцепция, болжау, зейін және үйрену де маңызды. Бір траекториямен мишықтың, қыртыстың не нақты жолдың зақымын анықтауға болмайды.")
    ]
  },
  {
    id: "acute-versus-late-upper-motor-neuron",
    title: t("2. Центральное двигательное поражение во времени", "2. Central motor lesion over time", "2. Орталық қозғалыс зақымының уақыт бойынша өзгеруі"),
    situation: t(
      "В учебном клиническом случае у пациента после подтверждённого левостороннего очага в задней ножке внутренней капсулы возникла преимущественно правосторонняя слабость. В первые часы тонус и некоторые сухожильные рефлексы снижены. Спустя несколько недель у пациента выявлены повышенное сопротивление быстрому пассивному растяжению и оживление рефлексов справа. Студент считает, что ранняя гипорефлексия исключает центральное поражение, а поздняя гиперрефлексия доказывает восстановление силы.",
      "In a teaching case a patient with an established left posterior-limb internal-capsule lesion develops predominantly right-sided weakness. In the first hours tone and some tendon reflexes are reduced. Weeks later resistance to rapid passive stretch and tendon reflexes are increased on the right. A student argues that early hyporeflexia excludes a central lesion and later hyperreflexia proves that voluntary strength has recovered.",
      "Оқу клиникалық жағдайында сол жақ ішкі капсуланың артқы аяқшасында зақымы расталған науқаста көбіне оң жақты әлсіздік пайда болды. Алғашқы сағаттарда бұлшықет тонусы мен кейбір сіңір рефлекстері төмендеген. Бірнеше аптадан кейін оң жақта жылдам пассивті созуға қарсылық пен сіңір рефлекстері күшейген. Студент ерте гипорефлексия орталық зақымды жоққа шығарады, ал кейінгі гиперрефлексия ерікті күштің қалпына келгенін дәлелдейді деп есептейді."
    ),
    questions: [
      t("Почему поражение слева выше пирамидного перекрёста вызывает преимущественно правостороннюю слабость? Какие признаки условия позволяют обсуждать верхний, а не только нижний мотонейрон?",
        "Why does a lesion on the left above the pyramidal decussation predominantly weaken the right side? Which findings support an upper-motor-neuron mechanism rather than only a lower-motor-neuron one?",
        "Пирамидалық айқасудан жоғары сол жақ зақым неліктен көбіне оң жақ әлсіздік туғызады? Қандай деректер төменгі емес, жоғарғы мотонейрон тетігін қарастыруға негіз болады?"),
      t("Объясните, почему тонус и рефлексы могут изменяться после острого центрального повреждения и почему гиперрефлексия не тождественна восстановлению произвольного контроля.",
        "Explain why tone and reflexes can evolve after acute central injury and why hyperreflexia is not equivalent to recovery of voluntary control.",
        "Жедел орталық зақымнан кейін тонус пен рефлекстер неліктен өзгеруі мүмкін және гиперрефлексия неге ерікті басқарудың қалпына келуімен бірдей емес екенін түсіндіріңіз."),
      t("Какие дополнительные признаки силы, распределения чувствительных нарушений и времени болезни нужно оценить? Почему нельзя локализовать очаг только по одному рефлексу?",
        "Which additional findings about strength, sensory distribution and timing should be assessed? Why cannot one tendon reflex alone localize the lesion?",
        "Күш, сезімталдық бұзылысының таралуы және ауру мерзімі туралы қандай қосымша деректер қажет? Неліктен бір сіңір рефлексі зақым орнын дәл анықтамайды?")
    ],
    explanations: [
      t("Большая часть кортикоспинальных волокон перекрещивается в каудальном продолговатом мозге; очаг в левой внутренней капсуле расположен выше этого перекрёста и потому обычно вызывает правосторонний двигательный дефицит. Внезапная утрата нисходящей модуляции может первоначально сопровождаться вялостью и снижением рефлексов. Позднее изменение баланса возбуждения и торможения сегментарных цепей нередко проявляется гиперрефлексией и спастичностью; сроки и выраженность вариабельны.",
        "Most corticospinal fibers cross in the caudal medulla, so a left internal-capsule lesion above the crossing usually causes right-sided motor impairment. Abrupt loss of descending modulation can initially accompany flaccidity and reduced reflexes. Later changes in the balance of excitation and inhibition within segmental circuits often produce hyperreflexia and spasticity, with variable timing and severity.",
        "Кортикоспиналдық талшықтардың көбі сопақша мидың каудалдық бөлігінде айқасады, сондықтан айқасудан жоғары сол жақ ішкі капсула зақымы әдетте оң жақ қозғалыс кемістігін туғызады. Төмендеуші модуляцияның кенет жоғалуы алғашында босаңсу және рефлекстердің төмендеуімен қатар жүруі мүмкін. Кейін сегменттік тізбектердегі қозу мен тежелу теңгерімінің өзгеруі гиперрефлексия мен спастикалылыққа әкелуі мүмкін; мерзімі мен ауырлығы әртүрлі."),
      t("Сухожильный рефлекс отражает состояние рефлекторной дуги и нисходящей модуляции, но не измеряет точность произвольного движения. Нужны повторная оценка силы, скорости и избирательности движений, распределения чувствительных нарушений и других неврологических признаков. Изолированная гипорефлексия бывает также при периферических поражениях и зависит от методики; изолированная гиперрефлексия не доказывает восстановление кортикоспинального пути.",
        "A tendon reflex reflects the reflex arc and descending modulation, not the precision of voluntary movement. Serial assessment of strength, speed and selectivity of movement, sensory findings and other neurological signs is needed. Isolated hyporeflexia can also accompany peripheral disease and depends on examination technique; isolated hyperreflexia does not prove corticospinal pathway recovery.",
        "Сіңір рефлексі рефлекстік доға мен төмендеуші модуляцияның күйін көрсетеді, ерікті қозғалыстың дәлдігін өлшемейді. Күшті, қозғалыс жылдамдығы мен таңдаулылығын, сезімталдықты және өзге неврологиялық белгілерді қайталап бағалау қажет. Жеке гипорефлексия шеткі зақымда да болуы мүмкін және тексеру әдісіне тәуелді; жеке гиперрефлексия кортикоспиналдық жолдың қалпына келгенін дәлелдемейді.")
    ]
  },
  {
    id: "postural-adjustment-and-reach",
    title: t("3. Поза перед произвольным движением", "3. Posture before a voluntary reach", "3. Ерікті қозғалыс алдындағы дене қалпы"),
    situation: t(
      "В модельном опыте участник стоит на устойчивой платформе и быстро поднимает руку к метке. При обычном выполнении активность некоторых мышц туловища и ног меняется ещё до заметного движения руки. Когда платформа неожиданно слегка смещается, появляется дополнительная корректирующая реакция. У другого участника время подъёма руки сходное, но устойчивость хуже. Студент заключает, что поддержание позы полностью обеспечивается кортикоспинальным путём, а любое изменение равновесия доказывает слабость мышц руки.",
      "In a model experiment a participant stands on a stable platform and rapidly raises an arm toward a target. Normally activity in some trunk and leg muscles changes before visible arm movement. When the platform unexpectedly shifts slightly, an additional corrective response appears. Another participant raises the arm at a similar speed but is less stable. A student concludes that posture is entirely controlled by the corticospinal tract and any balance change proves weakness of the arm muscles.",
      "Үлгілік тәжірибеде қатысушы тұрақты платформада тұрып, қолын нысанаға қарай тез көтереді. Қалыпты жағдайда тұлға мен аяқтың кейбір бұлшықеттерінің белсенділігі қолдың көзге көрінетін қозғалысына дейін өзгереді. Платформа күтпеген жерден аздап ығысқанда қосымша түзету жауабы пайда болады. Екінші қатысушы қолын ұқсас жылдамдықпен көтереді, бірақ тұрақтылығы нашар. Студент дене қалпын тек кортикоспиналдық жол басқарады және тепе-теңдік өзгерісі міндетті түрде қол бұлшықетінің әлсіздігін көрсетеді деп тұжырымдайды."
    ),
    questions: [
      t("Как отличить предварительную постуральную настройку от компенсаторного ответа на смещение платформы? Какие временные признаки наблюдения помогают их разделить?",
        "How would you distinguish anticipatory postural adjustment from a compensatory response to platform displacement? Which timing observations separate them?",
        "Алдын ала постуральдық реттеуді платформа ығысқаннан кейінгі компенсациялық жауаптан қалай ажыратасыз? Оларды бөлуге қандай уақыттық белгілер көмектеседі?"),
      t("Какой вклад могут вносить ретикулоспинальные и вестибулоспинальные влияния вместе с сенсорной обратной связью? Почему скорость движения руки не равна устойчивости позы?",
        "How can reticulospinal and vestibulospinal influences work with sensory feedback? Why is the speed of the arm movement not a measure of postural stability?",
        "Ретикулоспиналдық және вестибулоспиналдық ықпалдар сенсорлық кері байланыспен қалай бірігеді? Қол қозғалысының жылдамдығы неліктен дене қалпының тұрақтылығын өлшемейді?"),
      t("Предложите сравнение активности мышц, колебаний центра давления и скорости руки в одинаковых условиях. Какие альтернативы следует исключить до вывода о поражении конкретного пути?",
        "Propose a comparison of muscle activity, center-of-pressure sway and arm speed under matched conditions. Which alternatives must be considered before naming a specific pathway lesion?",
        "Бірдей жағдайда бұлшықет белсенділігін, қысым орталығының тербелісін және қол жылдамдығын салыстыруды ұсыныңыз. Нақты жол зақымы туралы қорытындыдан бұрын қандай баламалар ескерілуі тиіс?")
    ],
    explanations: [
      t("Предварительная постуральная настройка начинается в связи с запланированным действием и может предшествовать заметному движению конечности; компенсаторная реакция возникает после внешнего возмущения и сенсорного обнаружения изменения позы. Кортикальные и стволовые двигательные сети взаимодействуют со спинальными контурами. Ретикулоспинальные и вестибулоспинальные системы особенно важны для аксиальных и проксимальных мышц и поддержания устойчивости, но не действуют изолированно.",
        "Anticipatory postural adjustments are coupled to the planned action and can precede visible limb motion; compensatory responses follow external perturbation and sensory detection of changed posture. Cortical and brainstem motor networks interact with spinal circuits. Reticulospinal and vestibulospinal systems contribute especially to axial and proximal muscle control and stability, but do not operate in isolation.",
        "Алдын ала постуральдық реттеу жоспарланған әрекетпен байланысты және аяқ-қолдың көрінетін қозғалысынан бұрын басталуы мүмкін; компенсациялық жауап сыртқы әсер мен дене қалпы өзгерісінің сенсорлық анықталуынан кейін туындайды. Қыртыстық және ми бағанының қозғалтқыш желілері жұлын тізбектерімен әрекеттеседі. Ретикулоспиналдық және вестибулоспиналдық жүйелер әсіресе тұлға мен проксималдық бұлшықеттердің тұрақтылығына қатысады, бірақ оқшау жұмыс істемейді."),
      t("Сравните время начала ЭМГ туловища относительно подъёма руки, амплитуду и направление смещения центра давления, а также скорость руки; повторите испытания при одинаковых инструкциях и сенсорных условиях. Ухудшение равновесия может отражать особенности сенсорной интеграции, стратегии, внимания или опоры, а не обязательно слабость руки. Одного временного ряда или изменения центра давления недостаточно для локализации поражения отдельного нисходящего пути.",
        "Compare trunk EMG onset relative to arm elevation, the magnitude and direction of center-of-pressure displacement, and arm speed; repeat trials with matched instructions and sensory conditions. Poorer balance may reflect sensory integration, strategy, attention or support conditions rather than arm weakness. One time series or change in center of pressure is insufficient to localize a lesion in a specific descending tract.",
        "Тұлға ЭМГ-сінің басталуын қол көтеру уақытымен, қысым орталығы ығысуының шамасы мен бағытын және қол жылдамдығын салыстырып, бірдей нұсқау мен сенсорлық жағдайда тәжірибені қайталаңыз. Тепе-теңдіктің нашарлауы қол әлсіздігінен емес, сенсорлық біріктіру, стратегия, зейін не тірек ерекшелігінен болуы мүмкін. Бір уақыттық қатар немесе қысым орталығының өзгерісі жеке төмендеуші жол зақымын анықтауға жеткіліксіз.")
    ]
  }
];

export function createModuleElevenCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  const headings = language === "RU"
    ? ["Выделите факты", "Объясните механизм", "Проверьте альтернативы"]
    : language === "EN"
      ? ["Identify the findings", "Explain the mechanism", "Check alternatives"]
      : ["Негізгі деректерді анықтаңыз", "Тетікті түсіндіріңіз", "Баламаларды тексеріңіз"];
  const intro = t(
    "Три независимые ситуационные задачи о планировании и коррекции движения, нисходящих путях и поддержании позы. Сначала ответьте сами, затем сравните причинную цепь с разбором. Описание не заменяет клиническую диагностику.",
    "Three independent cases about movement planning and correction, descending pathways and postural control. Reason from the observations before opening the explanation. These scenarios do not replace clinical assessment.",
    "Қозғалысты жоспарлау мен түзету, төмендеуші жолдар және дене қалпын сақтау туралы үш тәуелсіз жағдай. Түсіндірмені ашпас бұрын бақылауларға сүйеніп өзіңіз жауап беріңіз. Бұл жағдайлар клиникалық диагностиканы алмастырмайды."
  );
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle, introduction: intro[language], ui,
    cases: scenarios.map(item => ({
      id: "m11-motor-case-" + item.id,
      title: item.title[language],
      situation: item.situation[language],
      stages: item.questions.map((question, i) => ({
        title: headings[i], questions: [question[language]]
      })),
      explanation: item.explanations.map(paragraph => paragraph[language])
    }))
  };
}
