import type { Language } from "../course";
import type { BranchingTest, QuestionNode } from "../tests";

// Module 7 / tests: five explicitly authored MAIN-route questions.
// Corrective/basic branches are still the foundation templates and remain to be reviewed.
// Source checks: Ganong 23e, chapter 9, Library PDF pp. 169–171;
// Guyton & Hall 13e, chapter 55, Library PDF pp. 666–669;
// C. L. Ghai Practical Physiology 8e, Library PDF pp. 317–319.
type Text = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Text => ({ RU, EN, KZ });
type Item = { prompt: Text; options: [Text, Text, Text, Text]; explanation: Text };

const authored: Record<string, Item> = {
  "concept:main": {
    prompt: t(
      "При исследовании коленного рефлекса врач ударяет по связке надколенника. Какой рецептор инициирует основную коротколатентную реакцию?",
      "During a knee-jerk examination, the patellar tendon is tapped. Which receptor initiates the principal short-latency response?",
      "Тізе рефлексін тексергенде дәрігер тізе тобығының байламын соғады. Негізгі қысқа латентті жауапты қай рецептор бастайды?"
    ),
    options: [
      t("Мышечное веретено четырёхглавой мышцы: растяжение активирует первичные Ia-афференты.",
        "The quadriceps muscle spindle: stretch activates its primary Ia afferents.",
        "Төртбасты бұлшықеттің бұлшықет ұршығы: созылу бастапқы Ia-афференттерді белсендіреді."),
      t("Сухожильный орган Гольджи: он служит главным рецептором коленного рефлекса.",
        "The Golgi tendon organ is the primary receptor of the knee jerk.",
        "Гольджи сіңірлік органы тізе рефлексінің негізгі рецепторы болады."),
      t("Кожный болевой рецептор надколенника: ответ обязательно начинается с боли.",
        "A cutaneous nociceptor over the patella: the reflex must begin with pain.",
        "Тізе тобығы үстіндегі тері ноцицепторы: рефлекс міндетті түрде ауырсынудан басталады."),
      t("Рецептор суставной капсулы: мышечные афференты в этом рефлексе не участвуют.",
        "A joint-capsule receptor: muscle afferents do not participate in this reflex.",
        "Буын қапшығының рецепторы: бұл рефлекске бұлшықет афференттері қатыспайды.")
    ],
    explanation: t(
      "Удар растягивает четырёхглавую мышцу и её веретёна. Ia-афференты дают прямое возбуждение альфа-мотонейронов той же мышцы. Сухожильные органы Гольджи преимущественно кодируют напряжение и связаны с Ib-путями; удар по сухожилию не делает их главным рецептором коленного рефлекса.",
      "The tap briefly stretches the quadriceps and its spindles. Ia afferents directly excite alpha motor neurons of that muscle. Golgi tendon organs mainly signal tension via Ib pathways; striking a tendon does not make them the principal knee-jerk receptors.",
      "Соққы төртбасты бұлшықет пен оның ұршықтарын қысқа уақытқа созады. Ia-афференттер осы бұлшықеттің альфа-мотонейрондарын тікелей қоздырады. Гольджи сіңірлік органдары көбіне кернеуді Ib-жолдары арқылы хабарлайды; сіңірге соғу оларды тізе рефлексінің негізгі рецепторы етпейді."
    )
  },
  "mechanism:main": {
    prompt: t(
      "Почему основную возбуждающую ветвь коленного рефлекса называют моносинаптической, хотя одновременно может тормозиться мышца-антагонист?",
      "Why is the principal excitatory limb of the knee jerk termed monosynaptic even though the antagonist muscle may be inhibited at the same time?",
      "Антагонист бұлшықет бір мезгілде тежелуі мүмкін болса да, тізе рефлексінің негізгі қоздырғыш тармағы неге моносинапстық деп аталады?"
    ),
    options: [
      t("Ia-афферент образует прямой центральный синапс с альфа-мотонейроном агониста; торможение антагониста идёт через отдельный интернейрон.",
        "An Ia afferent directly synapses on an agonist alpha motor neuron; antagonist inhibition uses a separate interneuron.",
        "Ia-афферент агонистің альфа-мотонейронымен тікелей синапс түзеді; антагонистің тежелуі бөлек интернейрон арқылы жүреді."),
      t("Между Ia-афферентом и мотонейроном агониста обязательно расположены два тормозных интернейрона.",
        "Two inhibitory interneurons must lie between the Ia afferent and the agonist motor neuron.",
        "Ia-афферент пен агонист мотонейронының арасында міндетті түрде екі тежеуші интернейрон болады."),
      t("Моносинаптический рефлекс не может сопровождаться никакими полисинаптическими ответвлениями.",
        "A monosynaptic reflex cannot coexist with any polysynaptic side branches.",
        "Моносинапстық рефлекспен қатар ешқандай полисинапстық тармақ бола алмайды."),
      t("Альфа-мотонейрон соединяется с мышцей без нервно-мышечного синапса.",
        "The alpha motor neuron reaches muscle without a neuromuscular junction.",
        "Альфа-мотонейрон бұлшықетке жүйке-бұлшықет синапсынсыз жетеді.")
    ],
    explanation: t(
      "Термин «моносинаптический» относится к прямой центральной Ia→альфа-мотонейронной связи растянутой мышцы. Реципрокное торможение антагониста включает как минимум один дополнительный интернейрон. Нервно-мышечный синапс не отменяет классификацию центральной рефлекторной ветви.",
      "Monosynaptic refers to the direct central Ia-to-alpha-motor-neuron connection for the stretched muscle. Reciprocal inhibition of the antagonist involves an additional interneuron. The neuromuscular junction does not change the classification of this central reflex limb.",
      "«Моносинапстық» атауы созылған бұлшықеттің орталық Ia→альфа-мотонейрон байланысына қатысты. Антагонистің реципрокты тежелуіне қосымша интернейрон қатысады. Жүйке-бұлшықет синапсы орталық рефлекстік тармақтың жіктелуін өзгертпейді."
    )
  },
  "application:main": {
    prompt: t(
      "После травмы бедра справа снижены коленный рефлекс, сила разгибания колена и чувствительность на передней поверхности бедра. Какой вывод об уровне поражения обоснован?",
      "After a right-thigh injury, the knee jerk, knee-extension strength and anterior-thigh sensation are reduced. Which localization conclusion is justified?",
      "Оң сан жарақатынан кейін тізе рефлексі, тізені жазу күші және санның алдыңғы бетінің сезімталдығы төмендеді. Зақым орнын анықтауда қандай қорытынды негізді?"
    ),
    options: [
      t("Нарушено одно или несколько звеньев рефлекторной дуги; для различения бедренной нейропатии, поражения корешков L2–L4 и иных причин нужны дополнительные данные.",
        "One or more reflex-arc components may be affected; additional findings are needed to distinguish femoral neuropathy, L2–L4 root involvement and other causes.",
        "Рефлекстік доғаның бір не бірнеше буыны зақымдалуы мүмкін; сан жүйкесінің нейропатиясын, L2–L4 түбіршектерінің зақымын және басқа себептерді ажырату үшін қосымша дерек қажет."),
      t("По этим трём признакам уже доказано изолированное повреждение только бедренного нерва.",
        "These three findings prove an isolated femoral-nerve injury.",
        "Осы үш белгі тек сан жүйкесінің оқшау зақымын толық дәлелдейді."),
      t("Снижение коленного рефлекса всегда означает поражение мозжечка.",
        "A reduced knee jerk always localizes to the cerebellum.",
        "Тізе рефлексінің төмендеуі әрқашан мишық зақымын білдіреді."),
      t("Изменение чувствительности исключает любое поражение периферического нерва.",
        "A sensory deficit rules out any peripheral-nerve lesion.",
        "Сезімталдықтың өзгеруі шеткі жүйке зақымын толық жоққа шығарады.")
    ],
    explanation: t(
      "Коленный рефлекс зависит от рецептора, Ia-афферента, сегментарной центральной связи, альфа-мотонейрона, двигательного аксона и мышцы. Вовлечение силы и чувствительности сужает дифференциальный ряд, но не локализует поражение по трём признакам без исследования других мышц, чувствительных зон и при необходимости электрофизиологии.",
      "The knee jerk depends on spindle, Ia afferent, segmental connection, alpha motor neuron, motor axon and muscle. Weakness plus sensory change narrows the differential but does not uniquely localize a lesion without examination of other muscles, sensory territories and, when appropriate, electrodiagnostic testing.",
      "Тізе рефлексі ұршыққа, Ia-афферентке, сегменттік байланысқа, альфа-мотонейронға, қозғалтқыш аксонға және бұлшықетке тәуелді. Әлсіздік пен сезімталдық өзгерісі ықтимал себептерді тарылтады, бірақ басқа бұлшықеттер мен сезім аймақтарын тексермей, қажет болса электрофизиология жасамай, зақымды нақты бір жерге бекітуге болмайды."
    )
  },
  "transfer:main": {
    prompt: t(
      "В упрощённой модели растяжения сохранена Ia-связь с мотонейроном растянутой мышцы, но избирательно выключен тормозный интернейрон к антагонисту. Что ожидается?",
      "In a simplified stretch-reflex model, the Ia connection to the stretched muscle's motor neuron is intact, but the inhibitory interneuron to its antagonist is selectively silenced. What is expected?",
      "Созылу рефлексінің қарапайым моделінде созылған бұлшықет мотонейронына Ia-байланыс сақталған, ал антагонистке баратын тежеуші интернейрон таңдамалы өшірілген. Не күтіледі?"
    ),
    options: [
      t("Прямое возбуждение агониста может сохраниться, а реципрокное торможение антагониста ослабнет.",
        "Direct excitation of the agonist may persist while reciprocal inhibition of the antagonist weakens.",
        "Агонистің тікелей қозуы сақталуы мүмкін, ал антагонистің реципрокты тежелуі әлсірейді."),
      t("Ia-афферент обязательно перестанет проводить потенциалы действия на всём протяжении.",
        "The Ia afferent must stop conducting action potentials along its entire length.",
        "Ia-афферент бүкіл бойымен әрекет потенциалдарын өткізуді міндетті түрде тоқтатады."),
      t("Выключение одного интернейрона означает гибель всех мотонейронов антагониста.",
        "Silencing one interneuron means all antagonist motor neurons have died.",
        "Бір интернейронның өшуі антагонистің барлық мотонейрондары өлгенін білдіреді."),
      t("В модели обязательно усилится болевое отдёргивание, хотя болевой стимул не задан.",
        "Pain withdrawal must increase even though no noxious stimulus is specified.",
        "Ауырсындырғыш стимул берілмесе де, ауырсынудан тартып алу жауабы міндетті түрде күшейеді.")
    ],
    explanation: t(
      "Прямая Ia-ветвь и ветвь реципрокного торможения различны. Избирательное выключение тормозного интернейрона не доказывает блок Ia-проведения или исчезновение мотонейронов. Модель не позволяет предсказать количественную силу движения без дополнительных параметров.",
      "The direct Ia limb and the reciprocal-inhibition limb are distinct. Selectively silencing the inhibitory interneuron does not establish Ia conduction block or motor-neuron loss. The model cannot predict movement magnitude without further parameters.",
      "Тікелей Ia-тармақ пен реципрокты тежелу тармағы бөлек. Тежеуші интернейронды таңдамалы өшіру Ia-өткізудің бөгелгенін не мотонейрондардың жоғалғанын дәлелдемейді. Қосымша параметрлерсіз модель қозғалыс күшін сандық болжай алмайды."
    )
  },
  "justification:main": {
    prompt: t(
      "При повторной проверке слабого коленного рефлекса ответ усилился после приёма Ендрассика. Как правильно интерпретировать это наблюдение?",
      "A previously weak knee jerk becomes more evident during the Jendrassik maneuver. How should this observation be interpreted?",
      "Бастапқыда әлсіз болған тізе рефлексі Ендрассик тәсілі кезінде айқынырақ көрінді. Бұл бақылауды қалай түсіндіру керек?"
    ),
    options: [
      t("Подкрепление меняет возбудимость рефлекторных цепей и условия исследования; усиление ответа само по себе не доказывает ни болезнь, ни конкретный нейромедиаторный механизм.",
        "Reinforcement alters reflex-circuit excitability and examination conditions; a larger response alone proves neither disease nor a specific transmitter mechanism.",
        "Күшейту тәсілі рефлекстік тізбектердің қозғыштығы мен тексеру жағдайларын өзгертеді; жауаптың ұлғаюы өздігінен ауруды да, нақты медиаторлық тетікті де дәлелдемейді."),
      t("Приём обязательно устраняет любое органическое поражение бедренного нерва.",
        "The maneuver necessarily excludes any organic femoral-nerve lesion.",
        "Бұл тәсіл сан жүйкесінің кез келген органикалық зақымын міндетті түрде жоққа шығарады."),
      t("Усиление рефлекса точно измеряет концентрацию глицина в спинном мозге.",
        "The increased jerk directly measures spinal glycine concentration.",
        "Рефлекстің күшеюі жұлындағы глицин концентрациясын тікелей өлшейді."),
      t("После приёма Ендрассика рецептором коленного рефлекса становится сухожильный орган Гольджи.",
        "The Golgi tendon organ becomes the knee-jerk receptor after the Jendrassik maneuver.",
        "Ендрассик тәсілінен кейін тізе рефлексінің рецепторы Гольджи сіңірлік органына ауысады.")
    ],
    explanation: t(
      "Приём Ендрассика часто облегчает выявление слабого сухожильного рефлекса, меняя состояние спинальных и надспинальных влияний, внимания и мышечного напряжения. Он не служит самостоятельным тестом конкретного поражения и не измеряет концентрацию медиаторов. Для сравнения ответов стандартизируют положение и стимул.",
      "The Jendrassik maneuver often facilitates a weak tendon reflex through changes in spinal/supraspinal influences, attention and muscle activation. It is not a stand-alone lesion-localization test and does not measure neurotransmitter concentrations. Posture and stimulus should be standardized for comparison.",
      "Ендрассик тәсілі жұлындық және жұлынүстілік ықпалдардың, зейіннің және бұлшықет белсенділігінің өзгеруі арқылы әлсіз сіңірлік рефлексті айқындауы мүмкін. Ол зақым орнын жеке анықтайтын сынақ емес әрі медиатор концентрациясын өлшемейді. Салыстыру үшін қалып пен стимулды біріздендіру керек."
    )
  }
};

const ids = ["concept:main", "mechanism:main", "application:main", "transfer:main", "justification:main"] as const;
export function createModuleSevenTests(language: Language, moduleTitle: string, base: BranchingTest): BranchingTest {
  const nodes: BranchingTest["nodes"] = { ...base.nodes };
  for (const id of ids) {
    const original = nodes[id];
    if (!original || original.type !== "question" || original.level !== "main")
      throw new Error("Missing module 7 main test node: " + id);
    const q = authored[id];
    const options = original.options.map(option => {
      const optionIndex = ["a", "b", "c", "d"].indexOf(option.id);
      if (optionIndex < 0) throw new Error("Unexpected module 7 option id: " + option.id);
      return { ...option, text: q.options[optionIndex][language] };
    });
    if (options.length !== 4 || new Set(options.map(option => option.text)).size !== 4)
      throw new Error("Invalid module 7 test options: " + id);
    const reviewed: QuestionNode = {
      ...original, prompt: q.prompt[language], options, correctAnswer: "a",
      explanation: q.explanation[language]
    };
    nodes[id] = reviewed;
  }
  return { ...base, moduleTitle, nodes };
}
