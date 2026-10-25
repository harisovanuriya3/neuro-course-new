import type { Language, Lesson } from "../types";

// Module 9: spinal cord organization, segmental circuits, descending control.
// Reviewed against Library copies: Guyton & Hall 13e, ch. 55 (PDF 667–673);
// Ganong 23e, ch. 9 (PDF 169–171), ch. 16 (PDF 261);
// C. L. Ghai Practical Physiology 8e, clinical examination (PDF 313–319).
// Clinical examples are not stand-alone diagnostic criteria.
type Trilingual = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Trilingual => ({ RU, EN, KZ });

const sections: { id: string; heading: Trilingual; paragraphs: Trilingual[] }[] = [
  {
    id: "spinal-roots-horns-and-segments",
    heading: t("Сегменты, корешки и серое вещество спинного мозга",
      "Spinal segments, roots and gray matter",
      "Жұлын сегменттері, түбіршектер және сұр зат"),
    paragraphs: [
      t(
        "Тела первичных соматосенсорных нейронов находятся в спинномозговых узлах; их центральные отростки входят через задние корешки. Задние рога принимают и перерабатывают сенсорные сигналы, а в передних рогах расположены соматические мотонейроны, аксоны которых выходят через передние корешки. Между ними действуют возбуждающие и тормозные интернейроны. Корешок, спинномозговой нерв, сегмент серого вещества и длинный проводящий путь — не одно и то же анатомическое образование.",
        "Primary somatosensory cell bodies lie in dorsal root ganglia, and their central processes enter through dorsal roots. Dorsal horns process sensory input; ventral horns contain somatic motor neurons whose axons leave through ventral roots. Excitatory and inhibitory interneurons link these systems. A root, a mixed spinal nerve, a gray-matter segment and a long tract are distinct anatomical structures.",
        "Бірінші реттік соматосенсорлық нейрондардың денелері жұлын түйіндерінде орналасады, ал орталық өсінділері артқы түбіршектер арқылы енеді. Артқы мүйіздер сезімтал кірісті өңдейді; алдыңғы мүйіздерде аксондары алдыңғы түбіршектер арқылы шығатын соматикалық мотонейрондар бар. Қоздырушы және тежеуші интернейрондар осы жүйелерді байланыстырады. Түбіршек, аралас жұлын нерві, сұр зат сегменті және ұзын өткізгіш жол — әртүрлі анатомиялық құрылымдар."
      ),
      t(
        "Сегмент спинного мозга определяют по паре отходящих от него корешков, а не по номеру лежащего рядом позвонка. Из-за различия роста позвоночника и спинного мозга у взрослого человека их уровни, особенно в нижних отделах, не совпадают. Дерматомы перекрываются, поэтому изолированное снижение чувствительности в небольшой зоне не позволяет без дополнительных признаков назвать единственный поражённый корешок.",
        "A spinal cord segment is defined by its associated root pair, not by the number of the adjacent vertebra. Because the vertebral column and cord grow differently, their levels—especially caudally—do not coincide in adults. Dermatomes overlap, so a small sensory deficit alone does not uniquely identify an injured root.",
        "Жұлын сегменті жанындағы омыртқа нөмірімен емес, одан шығатын түбіршектер жұбымен анықталады. Омыртқа бағанасы мен жұлынның өсуі әртүрлі болғандықтан, ересек адамда, әсіресе төменгі бөлімдерде, олардың деңгейлері сәйкес келмейді. Дерматомдар қабаттасады, сондықтан шағын аймақтағы сезімталдық төмендеуіне қарап қана зақымданған бір түбіршекті дәл анықтауға болмайды."
      )
    ]
  },
  {
    id: "spinal-stretch-withdrawal-and-reciprocal-circuits",
    heading: t("Рефлекс растяжения и защитное отдёргивание: разные цепи",
      "Stretch and withdrawal reflexes: different circuits",
      "Созылу және қорғаныштық тартып алу рефлекстері: әртүрлі тізбектер"),
    paragraphs: [
      t(
        "При ударе по связке надколенника кратковременно растягивается четырёхглавая мышца и её мышечные веретёна. Ia-афференты возбуждают α-мотонейроны этой мышцы через прямое центральное синаптическое звено: это моносинаптический компонент рефлекса растяжения. Параллельная ветвь Ia-входа может активировать тормозный интернейрон и уменьшать активность антагониста — реципрокное торможение уже содержит дополнительный синапс. γ-мотонейроны регулируют чувствительность веретена через интрафузальные волокна и являются эфферентами, а не чувствительными Ia-афферентами.",
        "Tapping the patellar tendon briefly stretches the quadriceps and its muscle spindles. Group Ia afferents excite quadriceps α-motor neurons through a direct central synapse: this is the monosynaptic component of the stretch reflex. A collateral Ia pathway can recruit an inhibitory interneuron and reduce antagonist activity; reciprocal inhibition therefore includes an additional synapse. γ-motor neurons regulate spindle sensitivity through intrafusal fibers and are efferents, not sensory Ia afferents.",
        "Тізе тобығының байламын соққанда төртбасты бұлшықет пен оның бұлшықет ұршықтары қысқа уақытқа созылады. Ia-афференттер осы бұлшықеттің α-мотонейрондарын тікелей орталық синапс арқылы қоздырады: бұл — созылу рефлексінің моносинапстық бөлігі. Ia-кірістің жанама тармағы тежегіш интернейронды белсендіріп, антагонист белсенділігін азайта алады; демек, реципроктық тежелуде қосымша синапс бар. γ-мотонейрондар интрафузалдық талшықтар арқылы ұршық сезімталдығын реттейтін эфференттер, сезімтал Ia-афференттер емес."
      ),
      t(
        "Болевой стимул может запускать полисинаптический сгибательный рефлекс отдёргивания с участием нескольких сегментов; одновременно тормозятся соответствующие разгибатели. В подходящих условиях интернейронные связи вызывают перекрёстный разгибательный ответ противоположной конечности для поддержания опоры, но он не обязателен при каждом слабом стимуле. Сухожильный орган Гольджи сообщает о напряжении через Ib-афференты и не является рецептором, непосредственно запускающим обычный коленный рефлекс.",
        "A noxious stimulus may recruit a polysynaptic, multisegmental flexor-withdrawal circuit while inhibiting relevant extensors. Under suitable conditions, interneuronal pathways also produce crossed extension in the opposite limb to support posture, but this is not obligatory for every weak stimulus. Golgi tendon organs signal tension through group Ib afferents; they are not the receptors that directly initiate the usual knee jerk.",
        "Ауырсындыратын тітіркендіргіш бірнеше сегментті қамтитын полисинапстық бүгу және тартып алу тізбегін іске қосып, тиісті жазғыш бұлшықеттерді тежей алады. Қолайлы жағдайда интернейрондық жолдар тіректі сақтау үшін қарсы аяқта айқаспалы жазылу жауабын туғызады, бірақ ол әр әлсіз стимулда міндетті емес. Гольджи сіңір органдары кернеу туралы ақпаратты Ib-афференттер арқылы жеткізеді; олар кәдімгі тізе рефлексін тікелей бастайтын рецепторлар емес."
      )
    ]
  },
  {
    id: "descending-control-and-spinal-patterns",
    heading: t("Нисходящий контроль и локальные двигательные сети",
      "Descending control and local motor networks",
      "Төмендеуші бақылау және жергілікті қозғалтқыш желілер"),
    paragraphs: [
      t(
        "Сегментарные рефлексы не работают изолированно: корково-спинномозговые, ретикулоспинальные, вестибулоспинальные и другие нисходящие влияния изменяют возбудимость интернейронов и мотонейронов. Поэтому усиление или угнетение сухожильного рефлекса может возникать при нарушениях на разных уровнях рефлекторной дуги и её контроля. Нельзя отождествлять отсутствие произвольного движения с уничтожением всех локальных спинальных цепей.",
        "Segmental reflexes are not isolated: corticospinal, reticulospinal, vestibulospinal and other descending influences modulate interneuron and motor-neuron excitability. Tendon reflexes can therefore be altered by disturbances in the arc itself or in its descending control. Loss of voluntary movement must not be equated with destruction of every local spinal circuit.",
        "Сегменттік рефлекстер оқшау жұмыс істемейді: қыртыс-жұлын, ретикула-жұлын, вестибуло-жұлын және басқа төмендеуші әсерлер интернейрондар мен мотонейрондардың қозғыштығын өзгертеді. Сондықтан сіңір рефлексінің күшеюі не бәсеңдеуі доғаның өзінде немесе оны жоғарыдан реттеуде бұзылыс болғанда байқалуы мүмкін. Ерікті қозғалыстың жоғалуын барлық жергілікті жұлын тізбектерінің жойылуымен теңестіруге болмайды."
      ),
      t(
        "Эксперименты на животных показывают, что спинальные сети могут генерировать чередование сгибания и разгибания при соответствующей активации и сенсорной обратной связи. Это не означает, что человек после полного перерыва спинного мозга автоматически способен к самостоятельной ходьбе. Функциональное движение зависит также от нисходящего управления, состояния мышц, равновесия, афферентации и реабилитационных условий.",
        "Animal experiments show that spinal networks can generate alternating flexor–extensor patterns when appropriately activated and supported by sensory feedback. This does not imply that a person with a complete cord transection can automatically walk independently. Functional movement also depends on descending control, muscle capacity, balance, afferent input and rehabilitation context.",
        "Жануарларға жасалған тәжірибелер тиісті белсендіру және сенсорлық кері байланыс кезінде жұлын желілері бүгу мен жазудың кезектескен үлгілерін тудыра алатынын көрсетеді. Бұл жұлын толық үзілген адам өздігінен автоматты түрде жүре алады деген сөз емес. Қызметтік қозғалыс төмендеуші басқаруға, бұлшықет жағдайына, тепе-теңдікке, афференттік кіріске және оңалту жағдайларына да тәуелді."
      )
    ]
  },
  {
    id: "spinal-shock-time-course",
    heading: t("Спинальный шок: раннее угнетение и последующая динамика",
      "Spinal shock: early depression and later evolution",
      "Жұлындық шок: бастапқы бәсеңдеу және кейінгі өзгерістер"),
    paragraphs: [
      t(
        "После тяжёлого острого повреждения спинного мозга ниже уровня поражения могут временно резко угнетаться сегментарные рефлексы, тонус и вегетативные ответы — это спинальный шок. Его связывают, в частности, с внезапной утратой тонических нисходящих влияний, однако полный механизм и сроки восстановления рефлекторной возбудимости неодинаковы. Нельзя делать вывод о необратимой утрате всех спинальных рефлексов по обследованию только в первые часы после травмы.",
        "After severe acute spinal cord injury, segmental reflexes, tone and autonomic responses below the lesion may be markedly depressed: this is spinal shock. Abrupt loss of tonic descending influences contributes, but its full mechanism and the timing of reflex recovery vary. An examination in the first hours after injury cannot establish irreversible loss of every spinal reflex.",
        "Жұлынның ауыр жедел зақымынан кейін ошақтан төмен сегменттік рефлекстер, тонус және вегетативтік жауаптар уақытша қатты бәсеңдеуі мүмкін — бұл жұлындық шок. Оған төмендеуші тонустық әсерлердің кенет үзілуі ықпал етеді, бірақ толық тетігі мен рефлекстердің қалпына келу уақыты әртүрлі. Жарақаттан кейінгі алғашқы сағаттардағы тексеруге қарап барлық жұлын рефлекстері біржола жойылды деп тұжырымдауға болмайды."
      ),
      t(
        "По мере выхода из спинального шока отдельные рефлексы могут возвращаться, а позднее становиться чрезмерно выраженными; последовательность и сроки зависят от тяжести, уровня повреждения и осложнений. Возвращение рефлекса не доказывает восстановления произвольного движения. Спинальный шок — состояние рефлекторной активности, его следует отличать от нейрогенного шока, при котором после определённых повреждений нарушается симпатическая сердечно-сосудистая регуляция и может возникать гипотензия.",
        "As spinal shock resolves, some reflexes can return and later become exaggerated; their sequence and timing depend on injury severity, level and complications. Reflex recovery does not demonstrate recovery of voluntary movement. Spinal shock describes reflex suppression and must be distinguished from neurogenic shock, in which impaired sympathetic cardiovascular control after certain injuries may cause hypotension.",
        "Жұлындық шок бәсеңдеген сайын кейбір рефлекстер қайта пайда болып, кейін күшеюі мүмкін; олардың реті мен мерзімі зақымның ауырлығына, деңгейіне және асқынуларға тәуелді. Рефлекстің қайтуы ерікті қозғалыстың қалпына келгенін дәлелдемейді. Жұлындық шок рефлекстік белсенділіктің бәсеңдеуін білдіреді; оны кейбір жарақаттардан кейін симпатикалық жүрек-қантамыр реттелуі бұзылып, гипотензия туындауы мүмкін нейрогендік шоктан ажырату қажет."
      )
    ]
  },
  {
    id: "clinical-reflex-localization-limits",
    heading: t("Клиническая локализация: что позволяет и чего не позволяет рефлекс",
      "Clinical localization: what a reflex can and cannot establish",
      "Клиникалық локализация: рефлекс нені көрсетеді және нені көрсетпейді"),
    paragraphs: [
      t(
        "При исследовании глубоких сухожильных рефлексов сравнивают стороны, положение конечностей, степень расслабления и силу стимула. Коленный рефлекс преимущественно оценивает дугу с участием бедренного нерва и сегментов L2–L4 (особенно L3–L4), ахиллов — большеберцового нерва и S1–S2 (преимущественно S1). Ослабление ответа может быть связано с афферентным звеном, мотонейроном, периферическим нервом, нервно-мышечной передачей или мышцей; усиление может отражать изменение нисходящей модуляции.",
        "When examining deep tendon reflexes, compare sides, limb position, relaxation and stimulus intensity. The patellar reflex primarily samples the femoral-nerve arc at L2–L4 (especially L3–L4), and the Achilles reflex the tibial-nerve arc at S1–S2 (especially S1). A weak response may arise from afferent, motor-neuron, peripheral-nerve, neuromuscular or muscle dysfunction; a brisk response may reflect altered descending modulation.",
        "Терең сіңір рефлекстерін тексергенде екі жақты, аяқ-қол қалпын, босаңсуды және стимул күшін салыстырады. Тізе рефлексі негізінен сан нерві мен L2–L4 (әсіресе L3–L4) сегменттерінің доғасын, ахилл рефлексі асықты жілік нерві мен S1–S2 (көбіне S1) сегменттерінің доғасын бағалайды. Әлсіз жауап афференттік буын, мотонейрон, шеткі нерв, жүйке-бұлшықет берілуі не бұлшықет бұзылысынан болуы мүмкін; күшейген жауап төмендеуші реттелудің өзгерісін көрсетуі мүмкін."
      ),
      t(
        "Для обоснованной локализации сопоставляют силу и распределение слабости, чувствительные модальности, рефлексы, сфинктерные симптомы, время после начала заболевания и при необходимости визуализацию. Один рефлекс не различает надёжно корешковое, периферическое и центральное поражение. Острая слабость с нарушением мочеиспускания или чувствительности в промежности требует не учебного эксперимента, а срочной медицинской оценки; не проводите болезненные провокационные пробы самостоятельно.",
        "Localization requires the pattern of weakness, sensory modalities, reflexes, sphincter symptoms, timing and, when indicated, imaging. One reflex alone cannot reliably distinguish a root lesion from peripheral or central disease. New weakness with urinary dysfunction or saddle sensory loss calls for urgent clinical assessment rather than a classroom experiment; do not perform painful provocative testing yourself.",
        "Зақым орнын негіздеу үшін әлсіздіктің таралуын, сезімталдық түрлерін, рефлекстерді, сфинктер белгілерін, басталу уақытын және қажет болса бейнелеу нәтижелерін бірге бағалайды. Бір рефлекс түбіршек, шеткі нерв және орталық зақымды сенімді ажыратпайды. Зәр шығарудың бұзылуымен не шат аймағы сезімталдығының төмендеуімен қатар пайда болған әлсіздік оқу тәжірибесін емес, шұғыл медициналық бағалауды талап етеді; ауырсындыратын сынамаларды өз бетіңізше жасамаңыз."
      )
    ]
  }
];

export function createModuleNineTheory(
  language: Language,
  base: Lesson & { kind: "theory" },
): Lesson & { kind: "theory" } {
  return {
    ...base,
    sections: [
      ...base.sections,
      ...sections.map(section => ({
        id: section.id,
        title: section.heading[language],
        blocks: section.paragraphs.map(paragraph => ({
          type: "paragraph" as const,
          text: paragraph[language],
        })),
      })),
    ],
  };
}
