import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 11 motor-control glossary. Reviewed with user's Library editions:
// Guyton & Hall 13e ch.56, PDF pp.677–679; Ganong 23e ch.16,
// PDF pp.253–256; C. L. Ghai Practical Physiology 8e, PDF pp.317–319.
// Definitions are educational; isolated signs cannot establish a diagnosis.
type Triple = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Triple => ({ RU, EN, KZ });

const baseDefinitions = [
  t("Сенсорный результат ещё не получен, но нервная система заранее формирует двигательную команду на основе цели, опыта и ожидаемых свойств тела и среды. Прогноз затем может уточняться обратной связью.", "A motor command is prepared using goals, experience and predictions about the body and environment before the sensory outcome is available. Later sensory feedback can update the command and future predictions.", "Сенсорлық нәтиже әлі алынбай тұрып, жүйке жүйесі мақсатқа, тәжірибеге және дене мен ортаның күтілетін қасиеттеріне сүйеніп қозғалыс командасын дайындайды. Кейін сенсорлық кері байланыс оны түзете алады."),
  t("Сигналы от проприорецепторов, кожи, зрения и вестибулярной системы сообщают о ходе движения и состоянии тела. Они используются для коррекции действия и последующего обучения, но сенсорная обработка имеет задержку.", "Signals from proprioceptors, skin, vision and vestibular receptors report movement and body state. They help correct ongoing action and update later commands, although sensory processing has a delay.", "Проприорецепторлардан, теріден, көру және вестибулярлық жүйелерден келген сигналдар қозғалыс барысы мен дене күйін хабарлайды. Олар әрекетті түзетуге және кейінгі үйренуге көмектеседі, бірақ сенсорлық өңдеу кешігеді.")
] as const;

const extra = [
  {
    id: "upper-motor-neuron",
    target: { section: "theory", anchor: "motor-command-and-final-common-path" },
    term: t("Верхний мотонейрон (клинический термин)", "Upper motor neuron (clinical term)", "Жоғарғы мотонейрон (клиникалық термин)"),
    definition: t("Нисходящие нейроны коры и ствола мозга, которые через прямые или промежуточные связи влияют на нижние мотонейроны. Термин описывает функциональную систему; признаки её поражения зависят от уровня и времени после повреждения.", "Descending cortical and brainstem neurons that influence lower motor neurons directly or through intervening circuits. This is a functional clinical category; lesion signs vary with location and time after injury.", "Қыртыс пен ми бағанындағы төмендеуші нейрондар төменгі мотонейрондарға тікелей не аралық тізбектер арқылы әсер етеді. Бұл функционалдық клиникалық ұғым; зақым белгілері орнына және зақымнан кейінгі уақытқа тәуелді.")
  },
  {
    id: "lower-motor-neuron",
    target: { section: "theory", anchor: "motor-command-and-final-common-path" },
    term: t("Нижний мотонейрон", "Lower motor neuron", "Төменгі мотонейрон"),
    definition: t("Мотонейрон переднего рога спинного мозга или двигательного ядра черепного нерва, аксон которого направляется к скелетной мышце. Это конечное общее нервное звено для множества нисходящих и рефлекторных влияний.", "A spinal anterior-horn or cranial motor-nucleus neuron whose axon supplies skeletal muscle. It is the final common neural pathway integrating multiple descending and reflex inputs before neuromuscular transmission.", "Жұлынның алдыңғы мүйізіндегі немесе бассүйек жүйкесінің қозғалтқыш ядросындағы, аксоны қаңқа бұлшықетіне баратын нейрон. Ол көптеген төмендеуші және рефлекстік ықпалдардың соңғы ортақ жүйкелік жолы.")
  },
  {
    id: "corticospinal",
    target: { section: "theory", anchor: "corticospinal-and-corticobulbar-projections" },
    term: t("Кортикоспинальный путь", "Corticospinal tract", "Кортикоспиналдық жол"),
    definition: t("Нисходящие аксоны из нескольких областей коры проходят через внутреннюю капсулу и ствол мозга к спинальным цепям. Большинство волокон перекрещивается в каудальном продолговатом мозге; путь особенно важен для точных движений кисти.", "Descending axons from several cortical regions pass through the internal capsule and brainstem to spinal circuits. Most cross in the caudal medulla; the pathway is particularly important for precise distal hand movements.", "Қыртыстың бірнеше аймағынан шығатын төмендеуші аксондар ішкі капсула мен ми бағаны арқылы жұлын тізбектеріне өтеді. Талшықтардың көбі сопақша мидың төменгі бөлігінде айқасады; жол қолдың дәл қозғалыстары үшін маңызды.")
  },
  {
    id: "corticobulbar",
    target: { section: "theory", anchor: "corticospinal-and-corticobulbar-projections" },
    term: t("Кортикобульбарные проекции", "Corticobulbar projections", "Кортикобульбарлық проекциялар"),
    definition: t("Нисходящие влияния коры на двигательные сети и ядра черепных нервов в стволе мозга, участвующие в движениях лица, языка и глотки. Двусторонность коркового входа различается между ядрами; не все мышцы получают одинаковую иннервацию.", "Descending cortical influences on brainstem motor networks and cranial motor nuclei for facial, lingual and pharyngeal movements. Bilateral cortical input varies by nucleus; it is not identical for all muscle groups.", "Қыртыстан ми бағанының қозғалтқыш желілері мен бассүйек жүйкелерінің ядроларына түсетін, бет, тіл және жұтқыншақ қозғалыстарына қатысатын ықпалдар. Екі жақты қыртыстық кіріс әр ядро үшін бірдей емес.")
  },
  {
    id: "pyramidal-decussation",
    target: { section: "theory", anchor: "corticospinal-and-corticobulbar-projections" },
    term: t("Перекрёст пирамид", "Pyramidal decussation", "Пирамидалар айқасуы"),
    definition: t("Основной перекрёст кортикоспинальных волокон в нижней части продолговатого мозга. Большинство волокон переходит на противоположную сторону, но часть идёт в переднем кортикоспинальном пути и может перекрещиваться на спинальном уровне.", "The main crossing of corticospinal fibers in the lower medulla. Most fibers cross here, while a minority descend in the anterior corticospinal tract and may cross near their spinal termination.", "Кортикоспиналдық талшықтардың негізгі айқасуы сопақша мидың төменгі бөлігінде өтеді. Көпшілігі қарсы жаққа өтеді, ал бір бөлігі алдыңғы кортикоспиналдық жолмен түсіп, жұлын деңгейінде айқасуы мүмкін.")
  },
  {
    id: "spinal-interneuron",
    target: { section: "theory", anchor: "motor-command-and-final-common-path" },
    term: t("Спинальный интернейрон", "Spinal interneuron", "Жұлын интернейроны"),
    definition: t("Вставочный нейрон спинного мозга, связывающий сенсорные, нисходящие и местные сигналы с мотонейронными цепями. Многие кортикоспинальные волокна действуют через интернейроны, а не непосредственно на α-мотонейрон.", "An interneuron in the spinal cord that integrates sensory, descending and local signals within motor circuits. Many corticospinal effects are mediated through interneurons rather than direct synapses on alpha motor neurons.", "Жұлындағы сенсорлық, төмендеуші және жергілікті сигналдарды қозғалтқыш тізбектермен байланыстыратын аралық нейрон. Кортикоспиналдық әсерлердің көбі α-мотонейрондарға тікелей емес, интернейрондар арқылы беріледі.")
  },
  {
    id: "gamma-motor-neuron",
    target: { section: "theory", anchor: "motor-command-and-final-common-path" },
    term: t("Гамма-мотонейрон", "Gamma motor neuron", "Гамма-мотонейрон"),
    definition: t("Спинальный мотонейрон, иннервирующий интрафузальные волокна мышечного веретена. Изменяет натяжение веретена и чувствительность его сенсорных окончаний при движении; не является основным источником силы экстрафузальных волокон.", "A spinal motor neuron supplying intrafusal muscle-spindle fibers. It adjusts spindle tension and sensory sensitivity during movement, rather than providing the main contractile force of extrafusal muscle fibers.", "Бұлшықет ұршығының интрафузалдық талшықтарын жүйкелендіретін жұлын мотонейроны. Қозғалыста ұршықтың керілуі мен сезімталдығын реттейді; экстрафузалдық талшықтардың негізгі күшін тудырмайды.")
  },
  {
    id: "reticulospinal",
    target: { section: "theory", anchor: "descending-postural-and-skilled-pathways" },
    term: t("Ретикулоспинальный путь", "Reticulospinal pathway", "Ретикулоспиналдық жол"),
    definition: t("Нисходящие проекции ретикулярных сетей ствола мозга к спинальным интернейронам и мотонейронам, влияющие на позу, тонус и подготовительные постуральные реакции. Эффекты зависят от конкретных связей и контекста движения.", "Descending projections from brainstem reticular networks to spinal interneurons and motor neurons that influence posture, tone and anticipatory postural adjustments. Effects depend on the specific circuits and movement context.", "Ми бағанының ретикулярлық желілерінен жұлын интернейрондары мен мотонейрондарына түсетін, дене қалпына, тонусқа және алдын ала постуральдық түзетулерге әсер ететін проекциялар. Әсері нақты тізбек пен қозғалыс жағдайына тәуелді.")
  },
  {
    id: "vestibulospinal",
    target: { section: "theory", anchor: "descending-postural-and-skilled-pathways" },
    term: t("Вестибулоспинальные пути", "Vestibulospinal pathways", "Вестибулоспиналдық жолдар"),
    definition: t("Нисходящие пути от вестибулярных ядер к спинальным сетям, участвующие в стабилизации головы и тела и регулировании постуральной активности. Они взаимодействуют с ретикулоспинальными путями, зрением и проприоцепцией.", "Descending pathways from vestibular nuclei to spinal networks that contribute to head and body stabilization and postural activity. They interact with reticulospinal circuits, vision and proprioception.", "Вестибулярлық ядролардан жұлын желілеріне баратын төмендеуші жолдар бас пен денені тұрақтандыруға және постуральдық белсенділікті реттеуге қатысады. Олар ретикулоспиналдық жолдармен, көрумен және проприоцепциямен әрекеттеседі.")
  },
  {
    id: "muscle-spindle",
    target: { section: "theory", anchor: "feedforward-feedback-and-learning" },
    term: t("Мышечное веретено", "Muscle spindle", "Бұлшықет ұршығы"),
    definition: t("Проприорецептор в скелетной мышце, сигнализирующий о её длине и изменении длины. При ударе по сухожилию быстро растягивается мышца и активируются окончания веретена; рецептором этого рефлекса не является сухожильный орган Гольджи.", "A proprioceptor within skeletal muscle that signals muscle length and its change. A tendon tap briefly stretches the muscle and activates spindle afferents; the receptor of this stretch reflex is not the Golgi tendon organ.", "Қаңқа бұлшықетіндегі ұзындық пен оның өзгерісін сезетін проприорецептор. Сіңірді соққанда бұлшықет қысқа уақытқа созылып, ұршық афференттері белсендіріледі; бұл созылу рефлексінің рецепторы Гольджи сіңір мүшесі емес.")
  },
  {
    id: "apraxia",
    target: { section: "theory", anchor: "motor-signs-and-limits-of-localization" },
    term: t("Апраксия (клинический синдром)", "Apraxia (clinical syndrome)", "Апраксия (клиникалық синдром)"),
    definition: t("Нарушение выполнения ранее освоенных целенаправленных действий, которое нельзя объяснить одной только слабостью, сенсорным дефицитом или непониманием инструкции. Для оценки нужны разные задания и клинический контекст; одна ошибка не доказывает апраксию.", "Impaired performance of learned purposeful actions not sufficiently explained by weakness, sensory loss or failure to understand instructions alone. Assessment requires several tasks and clinical context; one error does not establish apraxia.", "Бұрын үйренілген мақсатты әрекеттерді орындаудың бұзылуы; оны тек әлсіздікпен, сезімталдықтың жоғалуымен немесе нұсқауды түсінбеумен түсіндіруге болмайды. Бағалау үшін бірнеше тапсырма мен клиникалық мәнмәтін қажет; бір қате апраксияны дәлелдемейді.")
  }
] as const;

export function createModuleElevenGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length !== 2) {
    throw new Error("Module 11 glossary requires two original foundation terms");
  }
  return {
    ...base,
    introduction: t("Глоссарий связывает двигательный замысел с нисходящими путями, спинальными цепями и сенсорной коррекцией. Различайте предварительное управление и обратную связь; один клинический признак не устанавливает локализацию поражения.", "Use the glossary to connect motor planning, descending pathways, spinal circuits and sensory correction. Distinguish feedforward from feedback; a single clinical sign cannot localize a lesion.", "Глоссарий қозғалысты жоспарлауды төмендеуші жолдармен, жұлын тізбектерімен және сенсорлық түзетумен байланыстырады. Алдын ала басқару мен кері байланысты ажыратыңыз; бір клиникалық белгі зақым орнын дәл анықтамайды.")[language],
    terms: [
      ...base.terms.map((entry, index) => ({
        ...entry,
        definition: baseDefinitions[index][language],
        target: { section: "theory" as const, anchor: "feedforward-feedback-and-learning" }
      })),
      ...extra.map(entry => ({
        id: "module-11-glossary-" + entry.id,
        term: entry.term[language],
        definition: entry.definition[language],
        target: entry.target
      }))
    ]
  };
}
