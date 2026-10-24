import type { Language, Lesson } from "../types";

// Module 8: ascending somatosensory and descending motor pathways.
// Checked against Guyton & Hall 13e, ch. 48 (PDF pp. 584–586), ch. 56 (677–678);
// Ganong 23e, ch. 11 (PDF pp. 185–187), ch. 16 (254–255);
// C. L. Ghai Practical Physiology 8e, clinical examination (PDF pp. 324–327).
// These are teaching patterns, not an individual diagnostic rule.
type Trilingual = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Trilingual => ({ RU, EN, KZ });

const details: { id: string; heading: Trilingual; paragraphs: Trilingual[] }[] = [
  {
    id: "dorsal-column-medial-lemniscus",
    heading: t("Задние столбы — медиальная петля: три нейрона и перекрёст",
      "Dorsal column–medial lemniscus: relays and crossing",
      "Артқы бағандар — медиалдық ілмек: нейрондар мен айқасу"),
    paragraphs: [
      t("Сознательная проприоцепция, вибрация и тонкое различительное осязание от туловища и конечностей передаются преимущественно по системе задних столбов — медиальной петли. Тела первичных чувствительных нейронов находятся в спинномозговых узлах. Их центральные отростки поднимаются на своей стороне в тонком пучке (преимущественно нижняя часть тела) и клиновидном пучке (преимущественно верхняя часть тела), достигая одноимённых ядер каудальной части продолговатого мозга.",
        "Conscious proprioception, vibration and discriminative touch from the trunk and limbs travel mainly through the dorsal column–medial lemniscal system. First-order sensory cell bodies lie in dorsal root ganglia. Their central processes ascend ipsilaterally in the gracile fasciculus (mainly lower body) or cuneate fasciculus (mainly upper body) to the corresponding nuclei of the caudal medulla.",
        "Тұлға мен аяқ-қолдан келетін саналы проприоцепция, діріл сезімі және ажыратушы нәзік жанасу негізінен артқы бағандар — медиалдық ілмек жүйесімен өтеді. Бірінші сезімтал нейрондардың денелері жұлын түйіндерінде орналасады. Олардың орталық өсінділері өз жағымен нәзік будада (көбіне дененің төменгі бөлігі) немесе сына тәрізді будада (көбіне жоғарғы бөлігі) жоғары көтеріліп, сопақша мидың каудалдық бөлігіндегі тиісті ядроларға жетеді."),
      t("Вторые нейроны тонкого и клиновидного ядер перекрещиваются в продолговатом мозге как внутренние дугообразные волокна и формируют медиальную петлю. Далее сигнал идёт преимущественно к вентральному заднелатеральному ядру таламуса (VPL), а третий нейрон — к соматосенсорной коре. Поэтому ограниченное поражение правого заднего столба в грудном отделе может нарушать эти модальности справа ниже уровня очага; выше сенсорного перекрёста направление латерализации меняется.",
        "Second-order axons from the gracile and cuneate nuclei cross in the medulla as internal arcuate fibers and form the medial lemniscus. The signal then reaches chiefly the ventral posterolateral thalamic nucleus (VPL), and third-order neurons project to somatosensory cortex. Thus a restricted right thoracic dorsal-column lesion can affect these modalities on the right below the lesion; above the sensory decussation, the side relationship reverses.",
        "Нәзік және сына тәрізді ядролардың екінші нейрон аксондары сопақша мида ішкі доға тәрізді талшықтар ретінде айқасып, медиалдық ілмекті түзеді. Сигнал көбіне таламустың вентралдық артқы-латералдық ядросына (VPL), одан үшінші нейрон арқылы соматосенсорлық қыртысқа өтеді. Сондықтан кеуде деңгейіндегі оң артқы бағанның шектелген зақымы ошақтан төмен оң жақта осы сезімдерді бұзуы мүмкін; сезімтал айқасудан жоғары жақта зақым жағы мен симптом жағының қатынасы өзгереді.")
    ]
  },
  {
    id: "anterolateral-system",
    heading: t("Антеролатеральная система: боль, температура и спинальный перекрёст",
      "Anterolateral system: pain, temperature and spinal crossing",
      "Антеролатералдық жүйе: ауырсыну, температура және жұлындағы айқасу"),
    paragraphs: [
      t("Первичные афференты боли и температуры входят в спинной мозг через задний корешок; часть волокон проходит вверх или вниз на один-два сегмента в тракте Лиссауэра, прежде чем переключиться в заднем роге. Аксоны вторых нейронов преимущественно пересекают переднюю белую спайку на уровне входа или поблизости и поднимаются с противоположной стороны в антеролатеральной системе. В ней проходят также пути грубого осязания и другие восходящие проекции; она не сводится к одному изолированному пучку.",
        "Primary pain- and temperature-related afferents enter through the dorsal root; some ascend or descend approximately one or two segments in Lissauer's tract before synapsing in the dorsal horn. Many second-order axons cross in the anterior white commissure near their segment of entry and ascend contralaterally in the anterolateral system. This system also conveys crude touch and includes multiple ascending projections; it is not a single isolated fiber bundle.",
        "Ауырсыну мен температураның бастапқы афференттері жұлынға артқы түбір арқылы кіреді; кейбірі артқы мүйізде синапс түзер алдында Лиссауэр жолымен шамамен бір-екі сегмент жоғары не төмен өтеді. Екінші нейрон аксондарының көбі кірген сегментке жақын алдыңғы ақ комиссурада айқасып, қарсы жақтағы антеролатералдық жүйемен көтеріледі. Бұл жүйе дөрекі жанасуды да өткізеді және бірнеше жоғарылаушы проекциядан тұрады; оны бір ғана оқшау буда деп қарастыруға болмайды."),
      t("Спиноталамические проекции достигают таламуса, включая VPL, а другие ноцицептивные проекции связаны со стволовыми и медиальными таламическими сетями. Поэтому левостороннее поражение антеролатерального пути на уровне Th8 может преимущественно снижать боль и температуру справа ниже очага; верхняя граница дефицита не обязана совпадать точно с сегментом Th8. Отдельная проверка лёгкого прикосновения не позволяет надёжно судить о целости одного из двух путей из-за частичного перекрытия их функций.",
        "Spinothalamic projections reach the thalamus, including VPL, while other nociceptive projections engage brainstem and medial thalamic networks. A left T8 anterolateral tract lesion may therefore predominantly reduce pain and temperature on the right below the lesion; the upper boundary need not coincide exactly with T8. Light-touch testing alone cannot reliably establish integrity of either pathway because their contributions overlap.",
        "Спиноталамустық проекциялар таламусқа, соның ішінде VPL ядросына жетеді; басқа ноцицептивтік проекциялар ми бағаны мен таламустың медиалдық желілеріне қатысады. Сондықтан Th8 деңгейіндегі сол антеролатералдық жолдың зақымы ошақтан төмен оң жақта ауырсыну мен температура сезімін басым төмендетуі мүмкін; бұзылыстың жоғарғы шекарасы дәл Th8 сегментімен сәйкес келмеуі мүмкін. Жеңіл жанасуды ғана тексеру екі жолдың бірінің бүтіндігін сенімді анықтамайды, өйткені олардың қызметтері ішінара қабаттасады.")
    ]
  },
  {
    id: "corticospinal-tract",
    heading: t("Корково-спинномозговой путь: произвольное движение",
      "Corticospinal tract: voluntary movement",
      "Қыртыс-жұлын жолы: ерікті қозғалыс"),
    paragraphs: [
      t("Корково-спинномозговые аксоны начинаются не только в первичной моторной коре, но также в премоторных, дополнительных моторных и соматосенсорных областях. Они проходят через лучистый венец, внутреннюю капсулу, ножки мозга, основание моста и пирамиды продолговатого мозга. Большинство волокон перекрещивается в каудальной части продолговатого мозга и формирует латеральный корково-спинномозговой тракт, особенно важный для точных произвольных движений дистальных отделов конечностей.",
        "Corticospinal axons arise not only from primary motor cortex but also from premotor, supplementary motor and somatosensory regions. They descend through the corona radiata, internal capsule, cerebral peduncles, basis pontis and medullary pyramids. Most cross in the caudal medulla to form the lateral corticospinal tract, which is particularly important for precise voluntary movements of distal limbs.",
        "Қыртыс-жұлын аксондары тек бастапқы моторлық қыртыстан емес, премоторлық, қосымша моторлық және соматосенсорлық аймақтардан да басталады. Олар сәулелі тәж, ішкі капсула, ми аяқшалары, көпір негізі және сопақша мидың пирамидалары арқылы төмендейді. Талшықтардың көбі сопақша мидың каудалдық бөлігінде айқасып, аяқ-қолдың дисталдық бөліктерінің дәл ерікті қозғалыстары үшін маңызды латералдық қыртыс-жұлын жолын түзеді."),
      t("Оставшиеся волокна могут идти в переднем корково-спинномозговом тракте и воздействовать на двусторонние или сегментарно перекрещивающиеся сети, особенно для осевой и проксимальной мускулатуры. Корково-спинномозговые сигналы часто действуют через спинальные интернейроны; прямые контакты с мотонейронами существуют, но не описывают все связи. Изолированное поражение правого латерального тракта в спинном мозге ниже пирамидного перекрёста обычно даёт преимущественно правосторонний двигательный дефицит ниже очага, а поражение левого полушария выше перекрёста — преимущественно правосторонний.",
        "Remaining fibers may descend in the anterior corticospinal tract and influence bilateral or segmentally crossing networks, especially those serving axial and proximal muscles. Corticospinal output often acts through spinal interneurons; direct motoneuron contacts exist but are not universal. A restricted right lateral tract lesion in the spinal cord below the pyramidal decussation generally causes predominantly right-sided motor impairment below the lesion, whereas a left hemispheric lesion above the decussation tends to affect the right side.",
        "Қалған талшықтар алдыңғы қыртыс-жұлын жолымен түсіп, әсіресе тұлға мен проксималдық бұлшықеттерге қатысты екіжақты немесе сегментте айқасатын желілерге ықпал етуі мүмкін. Қыртыс-жұлын әсері көбіне жұлын интернейрондары арқылы беріледі; мотонейрондармен тікелей байланыстар бар, бірақ барлық байланыс ондай емес. Пирамидалық айқасудан төмен жұлындағы оң латералдық жолдың шектелген зақымы әдетте ошақтан төмен оң жақ қозғалысты басым бұзады, ал айқасудан жоғары сол ми сыңарының зақымы көбіне оң жаққа әсер етеді.")
    ]
  },
  {
    id: "localization-comparison",
    heading: t("Сопоставление путей при одностороннем очаге",
      "Compare pathways in a unilateral lesion",
      "Біржақты ошақта өткізгіш жолдарды салыстыру"),
    paragraphs: [
      t("Предположим небольшой правосторонний очаг в грудном отделе спинного мозга, захватывающий задний столб, латеральный корково-спинномозговой и антеролатеральный пути. Ниже очага ожидают преимущественно правостороннее снижение вибрации и чувства положения, правосторонние признаки нарушения нисходящего двигательного контроля и преимущественно левостороннее снижение боли и температуры. Последнее может начинаться несколькими сегментами ниже уровня поражения из-за входа, короткого продольного хода и перекрёста афферентов.",
        "Consider a small right thoracic spinal cord lesion involving the dorsal column, lateral corticospinal and anterolateral tracts. Below it, one expects predominantly right-sided impairment of vibration and position sense, right-sided signs of impaired descending motor control, and predominantly left-sided reduction of pain and temperature. The latter may begin several segments below the lesion because afferents enter, travel a short distance and cross over multiple nearby levels.",
        "Кеуде жұлын деңгейіндегі оң жақ шағын ошақ артқы бағанды, латералдық қыртыс-жұлын және антеролатералдық жолдарды қамтысын. Ошақтан төмен діріл мен буын қалпын сезудің көбіне оң жақта төмендеуі, төмендеуші қозғалыс бақылауының оң жақтағы бұзылу белгілері және ауырсыну мен температураның көбіне сол жақта төмендеуі күтіледі. Соңғы бұзылыс афференттердің кіруі, қысқа бойлық жүрісі және жақын деңгейлерде айқасуы себепті ошақтан бірнеше сегмент төмен басталуы мүмкін."),
      t("Это упрощённая модель синдрома проводникового поражения, а не обязательная картина у каждого пациента. Неполное повреждение, разные границы дерматомов, сочетание с поражением корешков и спинальных сегментов, а также время после травмы меняют признаки. Для локализации нужно совместно оценивать двигательную силу, тонус, рефлексы, чувствительные модальности и данные клинического обследования; одно изолированное ощущение не определяет уровень очага.",
        "This is a simplified tract-lesion model, not a required pattern in every patient. Partial injury, dermatome overlap, combined root or segmental damage, and time since injury modify the findings. Localization requires joint interpretation of strength, tone, reflexes, sensory modalities and the clinical examination; one sensory finding alone does not establish a lesion level.",
        "Бұл өткізгіш жол зақымының ықшамдалған үлгісі, әр науқаста міндетті түрде болатын көрініс емес. Толық емес зақым, дерматомдардың қабаттасуы, түбір не сегмент зақымының қосылуы және жарақаттан кейінгі уақыт белгілерді өзгертеді. Ошақты анықтау үшін күшті, тонусты, рефлекстерді, сезімталдық түрлерін және клиникалық тексеруді бірге бағалау қажет; бір сезім белгісі зақым деңгейін өздігінен анықтамайды.")
    ]
  },
  {
    id: "clinical-examination-and-limits",
    heading: t("Как проверять модальности и не переоценивать схему",
      "Examine modalities without overinterpreting the diagram",
      "Сезімталдық түрлерін тексеру және сызба шектеулері"),
    paragraphs: [
      t("При учебной проверке вибрации используют камертон на костных выступах, положения — небольшие пассивные движения пальца с закрытыми глазами, боли — безопасный стандартизованный стимул, температуры — различимые тёплый и прохладный стимулы. Сравнивают симметричные участки, предупреждают обследуемого и избегают травмирующих воздействий. Лёгкое прикосновение, двухточечная дискриминация и стереогнозис не являются взаимозаменяемыми тестами одного и того же пути.",
        "For teaching examination, vibration is tested with a tuning fork on bony prominences, position sense with small passive digit movements while the eyes are closed, pinprick with a safe standardized stimulus, and temperature with distinguishable cool and warm stimuli. Compare symmetrical sites, explain the procedure and avoid injury. Light touch, two-point discrimination and stereognosis are not interchangeable tests of a single pathway.",
        "Оқу тексеруінде діріл сезімін сүйек шығыңқыларында камертонмен, буын қалпын көз жұмылғанда саусақты аздап пассивті жылжытумен, шаншу сезімін қауіпсіз стандартталған тітіркендіргішпен, температураны жылы және салқын тітіркендіргіштермен бағалайды. Симметриялы аймақтарды салыстырып, тексеруді алдын ала түсіндіріп, жарақаттан сақтану керек. Жеңіл жанасу, екі нүктені ажырату және стереогноз бір ғана жолды тексеретін өзара алмастырылатын сынақтар емес."),
      t("Учебная схема показывает основное направление проведения и типичный перекрёст, но не воспроизводит все коллатерали, двусторонние проекции, вариабельность уровней и пластичность. Она не измеряет скорость нервной проводимости, пороги ощущения или диагностическую чувствительность. При ответе указывайте: модальность → первый нейрон → синапс → уровень перекрёста → таламическую/спинальную мишень → ожидаемую сторону изменения с оговоркой о границах модели.",
        "The teaching diagram shows a principal route and typical decussation, not every collateral, bilateral projection, level variation or plastic change. It does not measure nerve conduction velocity, sensory thresholds or diagnostic sensitivity. A defensible answer specifies modality → first-order neuron → synapse → crossing level → thalamic or spinal target → expected side of impairment, together with the model's limits.",
        "Оқу сызбасы негізгі өткізгіш бағыт пен әдеттегі айқасуды көрсетеді, бірақ барлық тармақтарды, екіжақты проекцияларды, деңгей айырмашылықтарын не пластикалық өзгерістерді қамтымайды. Ол жүйке өткізгіштігінің жылдамдығын, сезім табалдырығын немесе диагностикалық сезімталдықты өлшемейді. Дәлелді жауапта сезім түрі → бірінші нейрон → синапс → айқасу деңгейі → таламустық не жұлындық нысана → күтілетін бұзылыс жағы және үлгінің шектеулері көрсетіледі.")
    ]
  }
];

export function createModuleEightTheory(
  language: Language,
  base: Lesson & { kind: "theory" },
): Lesson & { kind: "theory" } {
  return {
    ...base,
    sections: [
      ...base.sections,
      ...details.map(item => ({
        id: item.id,
        title: item.heading[language],
        blocks: item.paragraphs.map(paragraph => ({
          type: "paragraph" as const,
          text: paragraph[language],
        })),
      })),
    ],
  };
}
