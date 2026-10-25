import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 9: anatomically anchored glossary, not a diagnostic decision rule.
// Compared with Library PDFs: Ganong 23e pp. 169–176, 261;
// Guyton & Hall 13e pp. 670–673; C. L. Ghai Practical Physiology 8e pp. 317–319.
type Triple = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Triple => ({ RU, EN, KZ });
const roots = "spinal-roots-horns-and-segments";
const stretch = "spinal-stretch-withdrawal-and-reciprocal-circuits";
const descending = "descending-control-and-spinal-patterns";
const shock = "spinal-shock-time-course";
const clinical = "clinical-reflex-localization-limits";

const foundationDefinitions = [
  t(
    "Совокупность местных нейронов и интернейронных связей определённого участка спинного мозга, объединяющих афферентный вход, нисходящие влияния и выход к мотонейронам. Сегментарная сеть не тождественна одному рефлексу и может сохранять часть функций при повреждении длинных путей.",
    "Local spinal neurons and interneuronal connections that integrate afferent input, descending influences and motor-neuron output. A segmental circuit is not identical to one reflex and may retain some functions when long tracts are interrupted.",
    "Жұлынның белгілі бөлігіндегі афференттік кірісті, төмендеуші ықпалдарды және мотонейрондық шығысты біріктіретін жергілікті нейрондар мен интернейрондық байланыстар. Сегменттік желі бір ғана рефлекске тең емес және ұзын жолдар үзілгенде кей қызметін сақтауы мүмкін."
  ),
  t(
    "Спинальный шок — острое выраженное угнетение сегментарных рефлексов ниже тяжёлого повреждения спинного мозга, связанное в том числе с внезапной утратой нисходящих облегчающих влияний. Рефлексы могут позднее возвращаться без восстановления произвольных проводящих связей. Не путать с нейрогенным шоком, при котором нарушается гемодинамика.",
    "Spinal shock is the acute marked depression of segmental reflex activity below a severe spinal cord lesion, partly due to abrupt loss of descending facilitation. Reflexes may return without restoration of voluntary descending pathways. It differs from neurogenic shock, which involves circulatory instability.",
    "Жұлындық шок — жұлынның ауыр зақымынан төмен сегменттік рефлекстердің жедел айқын бәсеңдеуі; оның бір себебі — төмендеуші жеңілдетуші ықпалдың кенет жоғалуы. Ерікті қозғалыс жолдары қалпына келмесе де рефлекстер кейін оралуы мүмкін. Мұны қанайналым бұзылыстарымен өтетін нейрогендік шокпен шатастырмау керек."
  )
] as const;

const extra = [
  { id:"dorsal-root", anchor:roots,
    term:t("Задний корешок", "Dorsal root", "Артқы түбіршек"),
    definition:t("Спинномозговой корешок, по которому в спинной мозг входят центральные отростки первичных чувствительных нейронов. Их тела обычно находятся в спинномозговом узле вне вещества спинного мозга.",
      "The spinal root through which central processes of primary sensory neurons enter the cord. Their cell bodies normally lie in the dorsal root ganglion outside the spinal cord.",
      "Бастапқы сезімтал нейрондардың орталық өсінділері жұлынға кіретін түбіршек. Бұл нейрондардың денелері әдетте жұлынның өзінен тыс орналасқан жұлын түйінінде болады.") },
  { id:"ventral-root", anchor:roots,
    term:t("Передний корешок", "Ventral root", "Алдыңғы түбіршек"),
    definition:t("Путь выхода аксонов соматических мотонейронов из передних рогов; на соответствующих уровнях содержит также преганглионарные вегетативные волокна. После соединения с задним корешком образуется смешанный спинномозговой нерв.",
      "The exit route for somatic motor axons from ventral horn neurons; at relevant levels it also carries preganglionic autonomic fibers. It joins the dorsal root to form a mixed spinal nerve.",
      "Алдыңғы мүйіз мотонейрондарының аксондары шығатын жол; тиісті деңгейлерде преганглионарлық вегетативтік талшықтар да өтеді. Артқы түбіршекпен қосылып, аралас жұлын нервін түзеді.") },
  { id:"muscle-spindle", anchor:stretch,
    term:t("Мышечное веретено", "Muscle spindle", "Бұлшықет ұршығы"),
    definition:t("Проприорецептор внутри мышцы с интрафузальными волокнами, реагирующий на длину и скорость её изменения. При ударе по связке надколенника именно растяжение веретён четырёхглавой мышцы запускает основной компонент коленного рефлекса.",
      "An intramuscular proprioceptor containing intrafusal fibers that signals muscle length and its rate of change. A patellar tendon tap stretches quadriceps spindles, initiating the principal knee-jerk reflex component.",
      "Интрафузалдық талшықтары бар, бұлшықет ұзындығы мен оның өзгеру жылдамдығын сезетін проприорецептор. Тізе сіңірін соққанда төртбасты бұлшықет ұршықтарының созылуы тізе рефлексінің негізгі бөлігін бастайды.") },
  { id:"ia-afferent", anchor:stretch,
    term:t("Ia-афферент", "Group Ia afferent", "Ia-афферент"),
    definition:t("Быстро проводящее первичное чувствительное волокно мышечного веретена. В коленном рефлексе оно непосредственно возбуждает α-мотонейроны той же мышцы в спинном мозге; его коллатераль может включать тормозный интернейрон антагониста.",
      "A rapidly conducting primary sensory fiber from a muscle spindle. In the knee jerk it directly excites α-motor neurons of the same muscle in the spinal cord; a collateral may recruit an inhibitory interneuron for the antagonist.",
      "Бұлшықет ұршығынан шығатын тез өткізетін бастапқы сезімтал талшық. Тізе рефлексінде сол бұлшықеттің α-мотонейрондарын жұлында тікелей қоздырады; тармағы антагонистке әсер ететін тежегіш интернейронды белсендіре алады.") },
  { id:"alpha-motor", anchor:stretch,
    term:t("α-мотонейрон", "Alpha motor neuron", "α-мотонейрон"),
    definition:t("Соматический двигательный нейрон переднего рога, иннервирующий экстрафузальные скелетные мышечные волокна. Его возбуждение приводит к мышечному сокращению; он не является чувствительным Ia-волокном веретена.",
      "A ventral-horn somatic motor neuron supplying extrafusal skeletal muscle fibers. Its activation drives contraction; it is not the spindle's sensory Ia afferent.",
      "Алдыңғы мүйіздегі экстрафузалдық қаңқа бұлшықет талшықтарын жүйкелендіретін соматикалық қозғалтқыш нейрон. Оның белсенуі жиырылуды туғызады; ол ұршықтың сезімтал Ia-талшығы емес.") },
  { id:"gamma-motor", anchor:stretch,
    term:t("γ-мотонейрон", "Gamma motor neuron", "γ-мотонейрон"),
    definition:t("Двигательный нейрон, иннервирующий сократительные участки интрафузальных волокон и меняющий чувствительность мышечного веретена к растяжению. Сам по себе не является прямым эфферентом сокращения основной массы мышцы.",
      "A motor neuron supplying the contractile ends of intrafusal fibers and adjusting spindle sensitivity to stretch. It is not the main efferent driving extrafusal muscle contraction.",
      "Интрафузалдық талшықтардың жиырылғыш ұштарын жүйкелендіріп, ұршықтың созылуға сезімталдығын реттейтін қозғалтқыш нейрон. Ол бұлшықеттің негізгі экстрафузалдық бөлігін жиыратын басты эфферент емес.") },
  { id:"reciprocal-inhibition", anchor:stretch,
    term:t("Реципрокное торможение", "Reciprocal inhibition", "Реципроктық тежелу"),
    definition:t("Уменьшение возбуждения мотонейронов мышцы-антагониста при активации агониста. При рефлексе растяжения коллатераль Ia-афферента действует через тормозный интернейрон, поэтому эта ветвь имеет дополнительный центральный синапс.",
      "Reduced excitation of antagonist motor neurons during agonist activation. In the stretch reflex an Ia collateral recruits an inhibitory interneuron, so this branch has an additional central synapse.",
      "Агонист белсенгенде антагонист мотонейрондарының қозуының төмендеуі. Созылу рефлексінде Ia-афференттің тармағы тежегіш интернейрон арқылы әсер етеді, сондықтан бұл тармақта қосымша орталық синапс бар.") },
  { id:"golgi-organ", anchor:stretch,
    term:t("Сухожильный орган Гольджи (Ib)", "Golgi tendon organ (Ib)", "Гольджи сіңір органы (Ib)"),
    definition:t("Проприорецептор в области мышечно-сухожильного перехода, преимущественно сигнализирующий о напряжении мышцы по Ib-афферентам. Не является основным рецептором, запускающим обычный коленный рефлекс растяжения.",
      "A proprioceptor near the musculotendinous junction that mainly signals muscle tension via group Ib afferents. It is not the principal receptor initiating the ordinary patellar stretch reflex.",
      "Бұлшықет пен сіңір түйіскен аймақта орналасып, бұлшықет кернеуі туралы көбіне Ib-афференттерімен хабарлайтын проприорецептор. Ол кәдімгі тізе созылу рефлексін бастайтын негізгі рецептор емес.") },
  { id:"withdrawal", anchor:stretch,
    term:t("Защитный рефлекс отдёргивания", "Withdrawal (flexor) reflex", "Қорғаныштық тартып алу рефлексі"),
    definition:t("Полисинаптическая защитная реакция на обычно ноцицептивный стимул: через спинальные интернейронные сети активируются мышцы, отводящие часть тела от раздражителя, а соответствующие антагонисты тормозятся. Это не моносинаптический коленный рефлекс.",
      "A polysynaptic protective response, usually to nociceptive input, in which spinal interneuron circuits activate muscles that move the stimulated part away and inhibit appropriate antagonists. It is not the monosynaptic knee jerk.",
      "Көбіне ноцицептивтік тітіркендіргішке жауап беретін полисинапстық қорғаныштық реакция: жұлын интернейрондық желілері зақымдаушы әсерден алыстататын бұлшықеттерді қоздырып, тиісті антагонистерді тежейді. Бұл моносинапстық тізе рефлексі емес.") },
  { id:"crossed-extensor", anchor:descending,
    term:t("Перекрёстный разгибательный рефлекс", "Crossed extensor reflex", "Айқаспалы жазғыш рефлекс"),
    definition:t("В некоторых условиях сильный стимул, вызывающий отдёргивание одной конечности, через межсегментарные и комиссуральные сети способствует разгибанию противоположной для опоры. Это не обязательный ответ на каждый болевой стимул и не повод вызывать боль у студентов.",
      "Under some conditions a strong withdrawal-provoking stimulus recruits intersegmental and commissural circuits that favor extension of the opposite limb for support. It is not obligatory after every painful stimulus and should not be provoked painfully in students.",
      "Кей жағдайда бір аяқ-қолдың тартып алынуын туғызатын күшті тітіркендіргіш сегментаралық және комиссуралдық желілер арқылы қарсы аяқ-қолдың тірек үшін жазылуына ықпал етеді. Бұл әрбір ауырсыну стимулында міндетті емес; студенттерге ауырсындыратын сынама жасалмайды.") }
] as const;

export function createModuleNineGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length !== 2) {
    throw new Error("Module 9 glossary requires two original foundation terms");
  }
  return {
    ...base,
    introduction: t(
      "Свяжите каждый термин с рефлекторной дугой и соответствующим разделом теории. Различайте афферентные и эфферентные звенья, моносинаптический компонент и полисинаптические сети. Один рефлекс не устанавливает диагноз.",
      "Link each term to a reflex arc and the relevant theory section. Distinguish afferent from efferent elements and a monosynaptic component from polysynaptic networks. A single reflex does not establish a diagnosis.",
      "Әр терминді рефлекс доғасымен және тиісті теория бөлімімен байланыстырыңыз. Афференттік пен эфференттік бөліктерді, моносинапстық компонент пен полисинапстық желілерді ажыратыңыз. Бір рефлекс диагноз қоюға жеткіліксіз."
    )[language],
    terms: [
      ...base.terms.map((entry, index) => ({
        ...entry,
        definition: foundationDefinitions[index][language],
        target: { section: "theory" as const, anchor: index === 0 ? roots : shock }
      })),
      ...extra.map(entry => ({
        id: "module-9-glossary-" + entry.id,
        term: entry.term[language],
        definition: entry.definition[language],
        target: { section: "theory" as const, anchor: entry.anchor }
      }))
    ]
  };
}
