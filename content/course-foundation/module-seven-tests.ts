import type { Language } from "../course";
import type { BranchingTest, QuestionNode } from "../tests";

// Module 7 / tests: five authored main and five authored corrective questions.
// Five basic branches remain foundation templates and require review.
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

const corrective: Record<string, Item> = {
  "concept:corrective": {
    prompt: t("При медленном пассивном растяжении четырёхглавой мышцы без удара по сухожилию какой рецептор передаёт информацию о длине мышцы?", "During slow passive stretching of the quadriceps without a tendon tap, which receptor signals muscle length?", "Сіңірді соқпай, төртбасты бұлшықетті баяу пассивті созғанда бұлшықет ұзындығы туралы қай рецептор хабарлайды?"),
    options: [
      t("Мышечное веретено: афференты Ia и II передают сведения о растяжении и поддерживаемой длине.", "The muscle spindle: Ia and group II afferents signal stretch and sustained muscle length.", "Бұлшықет ұршығы: Ia және II топ афференттері созылу мен сақталған ұзындық туралы хабарлайды."),
      t("Сухожильный орган Гольджи: его Ib-афференты являются главным датчиком длины мышечных волокон.", "The Golgi tendon organ: its Ib afferents are the primary sensor of muscle-fiber length.", "Гольджи сіңірлік органы: оның Ib-афференттері бұлшықет талшықтары ұзындығының негізгі датчигі."),
      t("Кожный ноцицептор: без болевого сигнала проприоцепция длины невозможна.", "A cutaneous nociceptor: muscle-length proprioception requires pain input.", "Терілік ноцицептор: ауырсыну сигналы болмаса, ұзындық проприоцепциясы мүмкін емес."),
      t("Нервно-мышечный синапс: он самостоятельно измеряет статическую длину мышцы.", "The neuromuscular junction: it directly measures static muscle length.", "Жүйке-бұлшықет синапсы: ол бұлшықеттің тұрақты ұзындығын тікелей өлшейді.")
    ],
    explanation: t("Веретёна расположены параллельно экстрафузальным волокнам. Первичные Ia-окончания особенно чувствительны к скорости изменения длины, а Ia и II передают информацию о сохраняющемся растяжении. Сухожильный орган Гольджи преимущественно отражает мышечное напряжение, а не является главным датчиком длины.", "Spindles lie in parallel with extrafusal fibers. Primary Ia endings are especially sensitive to the rate of length change, while Ia and group II endings signal maintained stretch. Golgi tendon organs primarily signal muscle tension rather than serving as the principal length receptors.", "Ұршықтар экстрафузалдық талшықтарға параллель орналасады. Бастапқы Ia-ұштар ұзындық өзгерісінің жылдамдығына әсіресе сезімтал, ал Ia және II топ ұштары сақталған созылуды хабарлайды. Гольджи сіңірлік органдары негізінен бұлшықет кернеуін сезеді, ұзындықтың басты рецепторы емес.")
  },
  "mechanism:corrective": {
    prompt: t("Ia-афферент мышечного веретена образует прямой возбуждающий синапс с альфа-мотонейроном. Какой медиатор обычно обеспечивает эту центральную передачу?", "A muscle-spindle Ia afferent forms a direct excitatory synapse on an alpha motor neuron. Which transmitter normally mediates this central connection?", "Бұлшықет ұршығының Ia-афференті альфа-мотонейронмен тікелей қоздырушы синапс түзеді. Осы орталық байланыста әдетте қандай медиатор қызмет етеді?"),
    options: [
      t("Глутамат, вызывающий возбуждающий постсинаптический ответ мотонейрона.", "Glutamate, producing an excitatory postsynaptic response in the motor neuron.", "Глутамат, мотонейронда қоздырушы постсинапстық жауап туғызады."),
      t("Глицин, поскольку прямая Ia-связь обязательно тормозит мотонейрон агониста.", "Glycine, because the direct Ia connection necessarily inhibits the agonist motor neuron.", "Глицин, өйткені тікелей Ia-байланыс агонист мотонейронын міндетті түрде тежейді."),
      t("ГАМК, поскольку мышечное веретено не может вызывать центрального возбуждения.", "GABA, because muscle-spindle input cannot excite spinal motor neurons.", "ГАМҚ, өйткені бұлшықет ұршығынан келетін сигнал жұлын мотонейрондарын қоздыра алмайды."),
      t("Ацетилхолин, потому что медиатор нервно-мышечного соединения обязательно тот же и в центральном Ia-синапсе.", "Acetylcholine, because the transmitter at the neuromuscular junction must also mediate the central Ia synapse.", "Ацетилхолин, өйткені жүйке-бұлшықет түйіспесіндегі медиатор орталық Ia-синапста да міндетті түрде бірдей.")
    ],
    explanation: t("Прямое центральное возбуждение альфа-мотонейрона Ia-афферентом является глутаматергическим. Это не следует путать с холинергической передачей от мотонейрона к мышце и с тормозными интернейронными путями реципрокного торможения, где возможны глицинергические механизмы.", "Direct central excitation of alpha motor neurons by Ia afferents is glutamatergic. It must not be confused with cholinergic transmission at the motor end plate or inhibitory interneuronal pathways of reciprocal inhibition, which can involve glycine.", "Ia-афференттің альфа-мотонейронды тікелей орталық қоздыруы глутамат арқылы жүреді. Мұны мотонейрон мен бұлшықет арасындағы холинергиялық беріліспен немесе глицин қатысуы мүмкін реципрокты тежелудің интернейрондық жолдарымен шатастырмау керек.")
  },
  "application:corrective": {
    prompt: t("У пациента справа коленный рефлекс кажется слабее, чем слева, но ноги при первом осмотре были в разном положении. Какой следующий шаг наиболее обоснован до вывода о поражении?", "A patient's right knee jerk seems weaker than the left, but the legs were positioned differently during the first examination. What is the best next step before inferring a lesion?", "Науқастың оң жақ тізе рефлексі сол жақтан әлсіз көрінеді, бірақ алғашқы тексеруде аяқтардың қалпы әртүрлі болды. Зақым туралы қорытынды жасамас бұрын қандай қадам орынды?"),
    options: [
      t("Повторить двустороннюю проверку при сопоставимой позе, расслаблении и ударе; затем оценить силу, чувствительность и другие рефлексы.", "Repeat bilateral testing with comparable posture, relaxation and taps; then assess strength, sensation and other reflexes.", "Екі жақты тексеруді бірдей қалыпта, босаңсуда және соққы жағдайында қайталап, содан кейін күшті, сезімталдықты және өзге рефлекстерді бағалау."),
      t("Немедленно диагностировать изолированное повреждение правого бедренного нерва только по первому сравнению.", "Immediately diagnose isolated right femoral neuropathy from the initial comparison alone.", "Алғашқы салыстыруға ғана сүйеніп, оң сан жүйкесінің оқшау нейропатиясын бірден анықтау."),
      t("Заключить, что справа обязательно поражена кора больших полушарий, не повторяя пробу.", "Conclude that the right cerebral cortex is necessarily injured without repeating the test.", "Сынақты қайталамай-ақ оң жақ ми қыртысы міндетті түрде зақымдалған деп тұжырымдау."),
      t("Считать положение конечностей несущественным и отказаться от исследования других неврологических признаков.", "Treat limb position as irrelevant and omit examination of other neurological signs.", "Аяқ қалпы маңызды емес деп санап, өзге неврологиялық белгілерді тексермеу.")
    ],
    explanation: t("Амплитуда сухожильного рефлекса зависит от позы, предрастяжения, расслабления, силы удара и нисходящей модуляции. Асимметрию сначала подтверждают при сопоставимых условиях; затем интерпретируют вместе с силой, чувствительностью и другими рефлексами. Одна слабая реакция не локализует поражение.", "Tendon-jerk amplitude depends on posture, prestretch, relaxation, tap strength and descending modulation. First confirm asymmetry under comparable conditions, then interpret it with strength, sensory findings and other reflexes. One weak response does not uniquely localize a lesion.", "Сіңірлік рефлекс амплитудасы қалыпқа, алдын ала созылуға, босаңсуға, соққы күшіне және төмендеуші реттеуге тәуелді. Асимметрияны алдымен бірдей жағдайда растау, кейін оны күшпен, сезімталдықпен және басқа рефлекстермен бірге бағалау қажет. Бір әлсіз жауап зақым орнын нақты анықтамайды.")
  },
  "transfer:corrective": {
    prompt: t("Во время произвольного укорочения мышцы альфа-мотонейроны активны, но в учебной модели гамма-мотонейроны выключены. Какое последствие наиболее вероятно для мышечного веретена?", "During voluntary muscle shortening, alpha motor neurons remain active but gamma motor neurons are silenced in a teaching model. What is the most likely consequence for the spindle?", "Ерікті бұлшықет қысқаруы кезінде альфа-мотонейрондар белсенді, бірақ оқу моделінде гамма-мотонейрондар өшірілген. Бұлшықет ұршығында қандай өзгеріс ықтимал?"),
    options: [
      t("Интрафузальные концы не сокращаются вместе с мышцей; веретено может провиснуть, а его сигнал о длине стать менее надёжным.", "Intrafusal ends fail to contract with the muscle; the spindle may become slack and its length feedback less reliable.", "Интрафузалдық ұштар бұлшықетпен бірге жиырылмайды; ұршық босаңсып, ұзындық туралы кері байланыс сенімсіздеу болуы мүмкін."),
      t("Гамма-мотонейроны непосредственно обеспечивают основную силу экстрафузального сокращения, поэтому мышца полностью парализуется.", "Gamma motor neurons generate the main extrafusal force, so the muscle becomes completely paralyzed.", "Гамма-мотонейрондар экстрафузалдық жиырылудың негізгі күшін жасайды, сондықтан бұлшықет толық салданады."),
      t("Без гамма-активации Ia-афференты обязательно превращаются в Ib-афференты сухожильного органа Гольджи.", "Without gamma activation, Ia afferents necessarily become Golgi-tendon-organ Ib afferents.", "Гамма-белсенділік болмаса, Ia-афференттер міндетті түрде Гольджи сіңірлік органының Ib-афференттеріне айналады."),
      t("Отключение гамма-мотонейронов всегда увеличивает динамическую чувствительность веретена при любом движении.", "Silencing gamma motor neurons always increases spindle dynamic sensitivity during every movement.", "Гамма-мотонейрондарды өшіру кез келген қозғалыста ұршықтың динамикалық сезімталдығын міндетті түрде арттырады.")
    ],
    explanation: t("Альфа-гамма-коактивация позволяет сокращаться экстрафузальным и полярным интрафузальным волокнам одновременно, сохраняя натяжение чувствительной области веретена при укорочении мышцы. В этой упрощённой модели отсутствие гамма-привода может уменьшить афферентную обратную связь; это не означает потери альфа-иннервации.", "Alpha–gamma coactivation contracts extrafusal fibers and intrafusal polar ends together, maintaining tension in the spindle's sensory region during shortening. In this simplified model, loss of gamma drive may reduce afferent feedback; it does not imply loss of alpha innervation.", "Альфа-гамма-коактивация экстрафузалдық талшықтар мен интрафузалдық полюстік ұштарды қатар жиырылтып, бұлшықет қысқарғанда ұршықтың сезімтал бөлігін керілген күйде ұстайды. Бұл қарапайым модельде гамма-жетектің болмауы афференттік кері байланысты азайтуы мүмкін, бірақ альфа-иннервацияның жоғалғанын білдірмейді.")
  },
  "justification:corrective": {
    prompt: t("После приёма Ендрассика коленный рефлекс стал заметнее. Какое сравнение лучше отделит влияние условий теста от устойчивой неврологической асимметрии?", "The knee jerk becomes more evident during the Jendrassik maneuver. Which comparison best separates examination effects from persistent neurological asymmetry?", "Ендрассик тәсілі кезінде тізе рефлексі айқынырақ болды. Тексеру жағдайының әсерін тұрақты неврологиялық асимметриядан қай салыстыру жақсы ажыратады?"),
    options: [
      t("Сравнить обе стороны до и во время подкрепления при одинаковом положении, расслаблении и сопоставимой силе удара.", "Compare both sides before and during reinforcement with matched posture, relaxation and comparable tap strength.", "Екі жақты күшейтуге дейін және күшейту кезінде бірдей қалыпта, босаңсуда әрі ұқсас соққы күшімен салыстыру."),
      t("Сравнить один сильный удар справа с едва заметным ударом слева и назвать различие заболеванием.", "Compare a strong tap on the right with a barely perceptible tap on the left and label the difference disease.", "Оң жаққа күшті, сол жаққа өте әлсіз соққы беріп, айырманы ауру деп атау."),
      t("По усилению ответа вычислить концентрацию глицина без биохимических измерений.", "Calculate spinal glycine concentration from the larger jerk without biochemical measurements.", "Жауаптың күшеюіне қарап, биохимиялық өлшемсіз жұлындағы глицин концентрациясын есептеу."),
      t("Считать, что подкрепление автоматически исключает поражение периферического нерва, и прекратить осмотр.", "Assume reinforcement automatically excludes peripheral-nerve disease and stop the examination.", "Күшейту шеткі жүйке ауруын автоматты түрде жоққа шығарады деп, тексеруді тоқтату.")
    ],
    explanation: t("Приём Ендрассика изменяет возбудимость и условия выявления сухожильного рефлекса, поэтому наблюдение следует воспроизводить с контролем позы, предрастяжения и стимула на обеих сторонах. Увеличение ответа не даёт количественной оценки медиаторов и само по себе не подтверждает или исключает поражение нерва.", "The Jendrassik maneuver changes reflex excitability and examination conditions, so the observation should be reproduced with posture, prestretch and stimulus controlled on both sides. A larger response does not quantify transmitters or by itself confirm or exclude nerve injury.", "Ендрассик тәсілі рефлекстік қозғыштық пен тексеру жағдайын өзгертеді, сондықтан бақылауды екі жақта да қалыпты, алдын ала созылуды және стимулды біріздендіріп қайталау қажет. Жауаптың күшеюі медиатор мөлшерін өлшемейді және жүйке зақымын өздігінен дәлелдемейді не жоққа шығармайды.")
  }
};

const ids = ["concept:main", "mechanism:main", "application:main", "transfer:main", "justification:main"] as const;
const correctiveIds = ["concept:corrective", "mechanism:corrective", "application:corrective", "transfer:corrective", "justification:corrective"] as const;
export function createModuleSevenTests(language: Language, moduleTitle: string, base: BranchingTest): BranchingTest {
  const nodes: BranchingTest["nodes"] = { ...base.nodes };
  for (const id of [...ids, ...correctiveIds]) {
    const original = nodes[id];
    const level = id.endsWith(":main") ? "main" : "corrective";
    if (!original || original.type !== "question" || original.level !== level)
      throw new Error("Missing module 7 " + level + " test node: " + id);
    const q = id.endsWith(":main") ? authored[id] : corrective[id];
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
