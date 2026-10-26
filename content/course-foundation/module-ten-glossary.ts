import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 10 brainstem glossary. Scientific comparison: Library PDFs
// Guyton & Hall 13e PDF pp. 718–720 (ascending reticular activation);
// Ganong 23e PDF pp. 249–250 (sleep–wake networks), p. 579 (NTS/CVLM/RVLM);
// C. L. Ghai Practical Physiology 8e PDF pp. 301–303 (II/III, V1/VII),
// pp. 256–257 (brainstem auditory evoked potentials).
// These are explanatory teaching definitions, not clinical diagnostic rules.
type Triple = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Triple => ({ RU, EN, KZ });
const levels = "brainstem-levels-and-tracts";
const reflexes = "pupillary-and-corneal-reflexes";
const arousal = "ascending-arousal-and-descending-posture";
const autonomic = "distributed-autonomic-brainstem-networks";

const baseDefinitions = [
  t(
    "Неоднородные взаимосвязанные группы нейронов, проходящие через несколько уровней ствола мозга. Их восходящие проекции участвуют в поддержании бодрствования, нисходящие — в регуляции тонуса и позы. Это не единый «центр сознания».",
    "Heterogeneous interconnected neuronal groups extending across brainstem levels. Ascending projections contribute to wakefulness, while descending projections influence tone and posture. The formation is not a single 'consciousness center'.",
    "Ми бағанының бірнеше деңгейінде орналасқан, өзара байланысқан әртүрлі нейрон топтары. Олардың жоғарылаушы проекциялары сергектікті қолдауға, төмендеуші проекциялары тонус пен дене қалпын реттеуге қатысады. Бұл сананың жалғыз орталығы емес."
  ),
  t(
    "Состояние поддерживаемой активации мозга, позволяющее воспринимать стимулы и отвечать на них. Бодрствование не тождественно осознанному восприятию: сохранный отдельный стволовой рефлекс или ранний вызванный потенциал не доказывает наличие сознания.",
    "A state of sustained brain activation that permits responsiveness to stimuli. Wakefulness is not identical to conscious awareness: an isolated preserved brainstem reflex or early evoked potential does not establish awareness.",
    "Мидың тітіркендіргіштерді қабылдап, оларға жауап беруге мүмкіндік беретін белсенді күйі. Сергектік саналы қабылдаумен бірдей емес: жеке ми бағаны рефлексінің не ерте шақырылған потенциалдың сақталуы сананың бар екенін дәлелдемейді."
  )
] as const;

const extra = [
  {
    id: "medulla", target: { section: "theory", anchor: levels },
    term: t("Продолговатый мозг", "Medulla oblongata", "Сопақша ми"),
    definition: t(
      "Каудальная часть ствола мозга, содержащая проводящие пути, ядра ряда черепных нервов и сети, участвующие в дыхательной и сердечно-сосудистой регуляции. Важные рефлексы реализуются совместно с мостом, спинным мозгом и вышележащими структурами.",
      "The caudal brainstem region containing long tracts, several cranial-nerve nuclei and circuits involved in respiratory and cardiovascular control. These reflexes also interact with pontine, spinal and higher networks.",
      "Ми бағанының төменгі бөлігі: өткізгіш жолдар, бірқатар бассүйек жүйкелерінің ядролары, тыныс пен жүрек-қантамыр қызметін реттейтін желілер орналасады. Бұл рефлекстер көпір, жұлын және жоғары құрылымдармен бірлесіп іске асады."
    )
  },
  {
    id: "pons", target: { section: "theory", anchor: levels },
    term: t("Мост", "Pons", "Көпір"),
    definition: t(
      "Отдел ствола между продолговатым и средним мозгом. Содержит проводящие связи, ядра и пути, связанные в том числе с V–VIII нервами, а также сети, влияющие на дыхательный паттерн, бодрствование и движения глаз.",
      "The brainstem region between medulla and midbrain. It contains pathways and nuclei associated in part with cranial nerves V–VIII, and networks that shape breathing patterns, arousal and eye movements.",
      "Сопақша ми мен ортаңғы мидың арасындағы бөлім. Мұнда V–VIII бассүйек жүйкелеріне қатысты ядролар мен жолдар, сондай-ақ тыныс үлгісіне, сергектікке және көз қозғалысына әсер ететін желілер бар."
    )
  },
  {
    id: "midbrain", target: { section: "theory", anchor: levels },
    term: t("Средний мозг", "Midbrain", "Ортаңғы ми"),
    definition: t(
      "Ростральный отдел ствола мозга, содержащий ядра III и IV нервов, претектальную область и верхние и нижние холмики. Участвует в зрачковых и ориентировочных реакциях и связан с распределёнными системами бодрствования.",
      "The rostral brainstem region containing nuclei of cranial nerves III and IV, the pretectal area and superior and inferior colliculi. It contributes to pupillary and orienting responses and interacts with distributed arousal systems.",
      "Ми бағанының жоғарғы бөлігі; III және IV жүйке ядролары, претекталдық аймақ, жоғарғы және төменгі төмпешіктер орналасады. Қарашық пен бағдарлау реакцияларына қатысып, сергектік желілерімен байланысады."
    )
  },
  {
    id: "pupillary-light", target: { section: "theory", anchor: reflexes },
    term: t("Зрачковый световой рефлекс", "Pupillary light reflex", "Қарашықтың жарық рефлексі"),
    definition: t(
      "Световой сигнал от сетчатки проходит по II нерву к претектальной области среднего мозга, затем двусторонне к парасимпатическим ядрам III нерва. После переключения в ресничном узле сокращается сфинктер зрачка; поэтому есть прямая и содружественная реакции.",
      "Retinal light input travels via cranial nerve II to the midbrain pretectal region, which projects bilaterally to parasympathetic nuclei of III. After a relay in the ciliary ganglion, the pupil constricts, producing direct and consensual responses.",
      "Жарық сигналы торқабықтан II жүйке арқылы ортаңғы мидың претекталдық аймағына, одан III жүйкенің парасимпатикалық ядроларына екі жақты беріледі. Кірпікшелі түйінде ауысқан соң қарашық тарылады; тікелей және екінші көздегі келісімді жауап пайда болады."
    )
  },
  {
    id: "corneal", target: { section: "theory", anchor: reflexes },
    term: t("Корнеальный рефлекс", "Corneal reflex", "Қасаң қабық рефлексі"),
    definition: t(
      "Полисинаптический защитный рефлекс: чувствительные сигналы от роговицы идут по V1, через стволовые интернейроны активируются двигательные волокна VII нерва к круговой мышце глаза, обычно с двух сторон. Учебная проверка — только на схеме, без касания роговицы.",
      "A polysynaptic protective reflex: corneal afferents travel in V1 and recruit brainstem interneurons, then VII motor fibers activate orbicularis oculi, usually bilaterally. Teach it with diagrams, not by students touching a person's cornea.",
      "Полисинапстық қорғаныш рефлексі: қасаң қабықтың сезімтал сигналы V1 арқылы өтіп, ми бағанының интернейрондары VII жүйкенің қозғалтқыш талшықтарын белсендіреді; әдетте екі көз де жыпылықтайды. Оны қасаң қабыққа тимей, сызбада үйренеді."
    )
  },
  {
    id: "ascending-arousal", target: { section: "theory", anchor: arousal },
    term: t("Восходящие системы бодрствования", "Ascending arousal systems", "Сергектіктің жоғарылаушы жүйелері"),
    definition: t(
      "Распределённые активирующие связи ствола мозга, таламуса, гипоталамуса, базального переднего мозга и коры, поддерживающие уровень бодрствования. Они не образуют одной обязательной цепочки и не равны отдельному «центру сознания».",
      "Distributed activating interactions among brainstem, thalamus, hypothalamus, basal forebrain and cortex that support wakefulness. They are not one obligatory serial pathway and do not constitute a single consciousness center.",
      "Сергектікті қолдайтын ми бағаны, таламус, гипоталамус, алдыңғы мидың базалдық бөліктері мен қыртыс арасындағы таралған белсендіруші байланыстар. Олар бір ғана міндетті тізбек те, сананың жалғыз орталығы да емес."
    )
  },
  {
    id: "reticulospinal", target: { section: "theory", anchor: arousal },
    term: t("Ретикулоспинальный путь", "Reticulospinal pathway", "Ретикулоспиналдық жол"),
    definition: t(
      "Нисходящие проекции стволовых ретикулярных сетей к спинальным интернейронам и мотонейронам, влияющие на постуральные реакции и мышечный тонус. Эффект зависит от конкретных проекций и взаимодействия с другими двигательными путями.",
      "Descending projections from brainstem reticular networks to spinal interneurons and motor neurons that influence posture and muscle tone. Their effect depends on the particular pathway and interactions with other descending motor systems.",
      "Ми бағанының ретикулярлық желілерінен жұлын интернейрондары мен мотонейрондарына түсетін, дене қалпы мен бұлшықет тонусына әсер ететін проекциялар. Әсері нақты жолға және басқа төмендеуші қозғалтқыш жүйелермен өзара әрекетіне тәуелді."
    )
  },
  {
    id: "baep", target: { section: "media" },
    term: t("Слуховые стволовые вызванные потенциалы (КСВП)", "Brainstem auditory evoked potentials (BAEPs)", "Ми бағанының есту шақырылған потенциалдары"),
    definition: t(
      "Слабые электрические ответы на повторные звуковые стимулы, выделяемые усреднением записи. Ранние компоненты отражают проведение по части слухового пути; зависят от слуха, температуры и качества регистрации. Сохранный ответ не доказывает сознание.",
      "Small electrical responses to repeated sounds extracted by averaging. Early components reflect conduction through parts of the auditory pathway and depend on hearing, temperature and recording quality. A preserved BAEP does not prove awareness.",
      "Қайталанатын дыбыстық тітіркендіргіштерге берілетін, жазбаны орташа есептеу арқылы ажыратылатын әлсіз электрлік жауаптар. Ерте компоненттер есту жолының бір бөлігін көрсетеді; естуге, температураға және жазба сапасына тәуелді. Сақталған жауап сананы дәлелдемейді."
    )
  },
  {
    id: "baroreflex", target: { section: "theory", anchor: autonomic },
    term: t("Барорецепторный рефлекс", "Arterial baroreflex", "Артериялық барорефлекс"),
    definition: t(
      "Кратковременная отрицательная обратная связь артериального давления. Афференты каротидного синуса (IX) и дуги аорты (X) идут в ядро одиночного пути; через медуллярные сети регулируются симпатические и кардиовагусные выходы. Повышение давления обычно снижает ЧСС и симпатический тонус.",
      "Short-term negative feedback for arterial pressure. Carotid sinus (IX) and aortic arch (X) afferents reach the nucleus tractus solitarius; medullary networks adjust sympathetic and cardiac vagal output. Increased pressure usually lowers heart rate and sympathetic tone.",
      "Артериялық қысымды қысқа мерзімде реттейтін теріс кері байланыс. Каротид синусының (IX) және қолқа доғасының (X) афференттері жалғыз жол ядросына келеді; сопақша ми желілері симпатикалық және жүрекке баратын кезбе жүйке шығысын реттейді. Қысым өскенде жүрек жиілігі мен симпатикалық тонус әдетте төмендейді."
    )
  },
  {
    id: "respiratory-network", target: { section: "theory", anchor: autonomic },
    term: t("Стволовые дыхательные сети", "Brainstem respiratory networks", "Ми бағанының тыныс желілері"),
    definition: t(
      "Взаимодействующие нейронные сети продолговатого мозга формируют дыхательный ритм, а мостовые связи изменяют его временную организацию. Хеморецепторные и другие афферентные сигналы изменяют вентиляцию; это не единственный «пневмотаксический переключатель».",
      "Interacting medullary neural circuits generate breathing rhythm, while pontine connections shape its timing. Chemoreceptor and other afferent inputs modify ventilation; there is no single isolated 'pneumotaxic switch'.",
      "Сопақша мидың өзара әрекеттесетін нейрондық желілері тыныс ырғағын қалыптастырады, ал көпір байланыстары оның уақыттық үлгісін өзгертеді. Хеморецепторлар мен басқа афференттік сигналдар желдетілуге әсер етеді; бұл жалғыз «пневмотаксикалық қосқыш» емес."
    )
  }
] as const;

export function createModuleTenGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length !== 2) {
    throw new Error("Module 10 glossary requires the two original foundation terms");
  }
  return {
    ...base,
    introduction: t(
      "Свяжите строение ствола с механизмами рефлексов, бодрствования и вегетативной регуляции. Сравнивайте афферентное и эфферентное звенья; один сохранный рефлекс или вызванный потенциал не определяет уровень сознания.",
      "Connect brainstem anatomy to reflexes, arousal and autonomic regulation. Distinguish afferent from efferent pathways; one preserved reflex or evoked response cannot determine awareness.",
      "Ми бағанының құрылысын рефлекстермен, сергектікпен және вегетативтік реттелумен байланыстырыңыз. Афференттік пен эфференттік жолдарды ажыратыңыз; бір сақталған рефлекс немесе шақырылған жауап сананың деңгейін анықтамайды."
    )[language],
    terms: [
      ...base.terms.map((entry, index) => ({
        ...entry,
        definition: baseDefinitions[index][language],
        target: { section: "theory" as const, anchor: arousal }
      })),
      ...extra.map(entry => ({
        id: "module-10-glossary-" + entry.id,
        term: entry.term[language],
        definition: entry.definition[language],
        target: entry.target
      }))
    ]
  };
}
