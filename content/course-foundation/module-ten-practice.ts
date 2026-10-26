import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 10, brainstem physiology. Sources consulted in Library:
// Guyton & Hall 13e PDF 718–720; Ganong 23e PDF 243–244;
// C. L. Ghai Practical Physiology 8e PDF 301–303.
// Thought experiments only; corneal testing must be performed by clinicians.
type Text = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Text => ({ RU, EN, KZ });
type Task = { id: string; title: Text; prompt: Text; answers: [Text, Text] };
const tasks: readonly Task[] = [
  {
    id: "pupillary-light",
    title: t("1. Зрачковый рефлекс: вход и выход",
      "1. Pupillary reflex: afferent versus efferent",
      "1. Қарашық рефлексі: кіріс және шығыс"),
    prompt: t(
      "Мысленный эксперимент. Вариант А: освещение правого глаза не сужает ни один зрачок, освещение левого сужает оба. Вариант Б: правый зрачок не сужается при освещении любого глаза, левый сужается в обоих опытах. Для каждого варианта назовите вероятное звено рефлекторной дуги и альтернативные причины. Почему нельзя поставить диагноз по одной паре ответов?",
      "Thought experiment. Pattern A: illuminating the right eye constricts neither pupil, but illuminating the left constricts both. Pattern B: the right pupil never constricts, but the left constricts with illumination of either eye. Identify the likely reflex limb and alternative causes for each pattern. Why are these responses insufficient for a definitive diagnosis?",
      "Ойша тәжірибе. А үлгісі: оң көзге жарық түсіргенде екі қарашық та тарылмайды, ал сол көзге түсіргенде екеуі де тарылады. Б үлгісі: қай көзге жарық түссе де оң қарашық тарылмайды, сол қарашық екі жағдайда да тарылады. Әр үлгіде рефлекс доғасының ықтимал буынын және балама себептерді атаңыз. Неліктен бір ғана сынақпен диагноз қоюға болмайды?"
    ),
    answers: [
      t(
        "А — вероятное нарушение афферентного входа от правой сетчатки или II нерва: левый вход способен активировать оба ядра Эдингера—Вестфаля через претектальные связи. Такое распределение не доказывает изолированное повреждение II нерва: возможна патология сетчатки и другие причины снижения световой афферентации.",
        "A suggests impaired right retinal or CN II afferent input. Left-eye input can activate both Edinger–Westphal nuclei through pretectal connections. The pattern does not prove an isolated optic-nerve lesion: retinal disease and other causes of reduced afferent signaling remain possible.",
        "А үлгісі оң торқабық не II жүйке афферентінің бұзылуына сәйкес: сол көзден келген сигнал претекталдық байланыстар арқылы екі жақтағы Эдингер—Вестфаль ядроларын белсендіреді. Бұл II жүйкенің оқшау зақымын дәлелдемейді: торқабық ауруы және басқа афференттік себептер болуы мүмкін."
      ),
      t(
        "Б — вероятное нарушение правого эфферентного звена: III нерв, ресничный узел, короткие ресничные нервы или сфинктер радужки; также возможна фармакологическая блокада. Нормальная дуга: сетчатка → II → претектум → оба ядра Эдингера—Вестфаля → III → ресничный узел → сфинктер. Для локализации нужны другие признаки и осмотр.",
        "B suggests a right efferent defect: CN III, ciliary ganglion, short ciliary nerves or iris sphincter; pharmacologic dilation is an alternative. Normal pathway: retina → CN II → pretectum → both Edinger–Westphal nuclei → CN III → ciliary ganglion → sphincter. Other clinical findings are needed to localize the defect.",
        "Б үлгісі оң жақ эфференттік буынға сәйкес: III жүйке, кірпікшелі түйін, қысқа кірпікшелі жүйкелер не нұрлы қабық сфинктері; дәрілік кеңею де мүмкін. Қалыпты жол: торқабық → II → претектум → екі Эдингер—Вестфаль ядросы → III → кірпікшелі түйін → сфинктер. Нақтылау үшін қосымша клиникалық белгілер қажет."
      )
    ]
  },
  {
    id: "corneal-reflex",
    title: t("2. Корнеальный рефлекс: V1 и VII",
      "2. Corneal reflex: V1 and VII",
      "2. Қасаң қабық рефлексі: V1 және VII"),
    prompt: t(
      "По описанию врачебной пробы: стимуляция правой роговицы не вызывает моргания с обеих сторон; стимуляция левой вызывает двустороннее моргание. Что вероятнее: нарушение правого V1-афферента или изолированное повреждение правого VII-эфферента? Объясните различие и границы вывода. Студентам нельзя самостоятельно касаться чужой роговицы.",
      "In a clinician's examination, right corneal stimulation evokes neither blink, whereas left stimulation evokes bilateral blinking. Is a right V1 afferent lesion or isolated right CN VII efferent lesion more consistent? Explain the distinction and limitations. Students must not stimulate another person's cornea.",
      "Дәрігерлік тексеруде оң қасаң қабықты қоздырғанда екі көз де кірпік қақпайды, сол қасаң қабықты қоздырғанда екеуі де кірпік қағады. Оң V1 афферентінің бұзылысы ма, әлде оң VII эфферентінің жеке зақымы ма — қайсысы сәйкес келеді? Себебін және қорытынды шектерін түсіндіріңіз. Студенттер басқа адамның қасаң қабығын өздігінен қоздырмауы тиіс."
    ),
    answers: [
      t(
        "Вероятнее правосторонний афферентный дефект V1 или связанных стволовых чувствительных путей: при стимуляции слева обе эфферентные ветви VII способны вызвать моргание. Корнеальный рефлекс полисинаптический: V1 → стволовые интернейроны → двусторонние двигательные ядра VII → круговые мышцы глаз.",
        "A right V1 afferent or related brainstem sensory defect fits better: left stimulation can still recruit both facial efferent outputs. The reflex is polysynaptic: V1 → brainstem interneuronal connections → bilateral CN VII motor output → orbicularis oculi.",
        "Оң V1 афференті не онымен байланысты ми бағанының сезімтал жолы бұзылғаны ықтимал: сол жақтан қоздырғанда екі VII эфференті де кірпік қағуды туғыза алады. Бұл полисинапстық доға: V1 → ми бағанының интернейрондары → екі жақтағы VII қозғалтқыш ядролары → көздің айналма бұлшықеттері."
      ),
      t(
        "При изолированном поражении правого VII правый глаз плохо моргал бы после стимуляции любой роговицы, а левый мог бы моргать. Здесь правый глаз моргает на левый стимул, поэтому изолированная правосторонняя эфферентная недостаточность не объясняет картину. Учитывают заболевания глаза, препараты, методику осмотра и другие неврологические признаки.",
        "With an isolated right CN VII lesion, the right blink would be impaired regardless of which cornea was stimulated, while the left blink could persist. Here the right eye blinks with left stimulation, arguing against that isolated efferent lesion. Eye disease, medication, examination technique and other signs remain relevant.",
        "Оң VII жеке зақымданса, қай қасаң қабық қоздырылса да оң көз нашар кірпік қағар еді, ал сол жақ жауап сақталуы мүмкін. Мұнда оң көз сол жақ тітіркендіргішке жауап береді, сондықтан оң VII-нің оқшау зақымы бұл үлгіні түсіндірмейді. Көз ауруын, дәрілерді, тексеру тәсілін және басқа белгілерді ескеру керек."
      )
    ]
  },
  {
    id: "arousal-and-posture",
    title: t("3. Восходящая активация и нисходящая регуляция позы",
      "3. Ascending arousal and descending postural control",
      "3. Жоғарылайтын сергектік және төмендеуші дене қалпын реттеу"),
    prompt: t(
      "В виртуальной лаборатории сенсорный вход увеличивает безразмерный индекс восходящего влияния. Отдельно обсуждается изменение тонуса после поражения нисходящих путей. Постройте две цепи и объясните, почему индекс не измеряет сознание, а любое поражение ретикулярной формации не обязано одинаково изменять тонус.",
      "A virtual laboratory increases a dimensionless ascending-influence index with sensory input. Separately, a descending lesion may change muscle tone. Trace two distinct circuits and explain why the index does not measure consciousness and why reticular lesions do not uniformly alter tone.",
      "Виртуалды зертханада сенсорлық кіріс артқанда жоғарылайтын ықпалдың өлшемсіз индексі өседі. Бөлек жағдайда төмендеуші жол зақымынан тонус өзгеруі мүмкін. Екі бөлек тізбек құрып, индекстің сананы өлшемейтінін және ретикулярлық зақымдардың тонусты міндетті түрде бір бағытта өзгертпейтінін түсіндіріңіз."
    ),
    answers: [
      t(
        "Сенсорные коллатерали → неоднородные стволовые активирующие сети → таламические и другие переднемозговые связи → кора. Эти пути поддерживают бодрствование, но сознание нельзя измерить единственным условным индексом. Число симулятора не является ЭЭГ, клинической шкалой или процентом активности ретикулярной формации.",
        "Sensory collaterals → heterogeneous brainstem activating networks → thalamic and other forebrain pathways → cortex. These circuits support arousal, but a single dimensionless model index cannot quantify consciousness. The simulated value is not EEG, a clinical scale or a percentage of reticular activity.",
        "Сенсорлық тармақтар → ми бағанының әркелкі белсендіруші желілері → таламус және алдыңғы мидың басқа жолдары → қыртыс. Бұл жолдар сергектікті қолдайды, бірақ бір өлшемсіз индекс сананы өлшемейді. Модель саны ЭЭГ де, клиникалық шкала да, ретикулярлық белсенділіктің пайызы да емес."
      ),
      t(
        "Ретикулярные и вестибулярные сети → ретикулоспинальные и вестибулоспинальные пути → спинальные интернейроны и мотонейроны → поза и тонус. Эффект зависит от уровня и состава повреждённых путей, времени после травмы и сохранных связей; кортикоспинальные влияния тоже важны. Снижение бодрствования требует отдельного клинического анализа.",
        "Reticular and vestibular networks → reticulospinal and vestibulospinal tracts → spinal interneurons and motor neurons → posture and tone. Effects depend on lesion level, specific pathways, timing and spared connections; corticospinal influences also matter. Reduced arousal needs separate clinical assessment.",
        "Ретикулярлық және вестибулярлық желілер → ретикулоспиналдық және вестибулоспиналдық жолдар → жұлын интернейрондары мен мотонейрондары → дене қалпы және тонус. Нәтиже зақым деңгейіне, нақты жолдарға, уақытқа және сақталған байланыстарға тәуелді; қыртыс-жұлын әсері де маңызды. Сергектікті бөлек клиникалық бағалау керек."
      )
    ]
  },
  {
    id: "chemoreflex-and-baroreflex",
    title: t("4. Дыхательная регуляция и барорефлекс",
      "4. Respiratory control and baroreflex",
      "4. Тыныс реттелуі және барорефлекс"),
    prompt: t(
      "Сравните две условные ситуации: повышение PaCO₂ при сохранной хемочувствительности и повышение артериального давления с растяжением каротидного синуса. Укажите рецепторы, стволовые звенья и ожидаемое направление вентиляции и ЧСС. Почему нельзя объяснить дыхание одним «пневмотаксическим переключателем» или локализовать поражение по одной ЧСС?",
      "Compare two conceptual scenarios: rising PaCO₂ with intact chemosensitivity and rising arterial pressure with increased carotid-sinus stretch. Identify receptors, brainstem integration and expected directions of ventilation and heart rate. Why is one 'pneumotaxic switch' inadequate, and why does heart rate alone not localize a lesion?",
      "Екі шартты жағдайды салыстырыңыз: хемосезімталдық сақталғанда PaCO₂ өсуі және қысым артқанда каротид синусының көбірек созылуы. Рецепторларды, ми бағанындағы байланыстарды, вентиляция мен жүрек жиілігінің күтілетін бағытын атаңыз. Неліктен тынысты бір «пневмотаксикалық қосқышпен» түсіндіруге және бір жүрек жиілігімен зақым орнын анықтауға болмайды?"
    ),
    answers: [
      t(
        "PaCO₂ повышает стимуляцию центральных хемочувствительных путей преимущественно через изменение H⁺ в мозговой внеклеточной жидкости и ликворе, а также влияет на периферические хеморецепторы. При сохранном ответе вентиляционный драйв обычно возрастает. Ритм формируют взаимодействующие сети продолговатого мозга; мостовые и другие входы изменяют дыхательный паттерн.",
        "Rising PaCO₂ stimulates central chemosensitive pathways largely via brain extracellular-fluid/CSF H⁺ and also influences peripheral chemoreceptors. With intact responsiveness, ventilatory drive usually increases. Interacting medullary networks generate respiratory rhythm, while pontine and other inputs shape the pattern.",
        "PaCO₂ өскенде ми жасушадан тыс сұйықтығы мен ликвордағы H⁺ өзгерісі арқылы орталық хемосезімтал жолдар және шеткі хеморецепторлар белсенеді. Жауап сақталса, вентиляциялық ынта әдетте күшейеді. Тыныс ырғағын сопақша мидың өзара байланысқан желілері қалыптастырады, көпір мен басқа кірістер тыныс үлгісін өзгертеді."
      ),
      t(
        "Растяжение каротидного синуса увеличивает импульсацию барорецепторов по IX нерву в ядро одиночного пути. Интеграция обычно усиливает вагусное влияние на сердце и снижает симпатический сосудистый выход: ЧСС и сосудистый тонус имеют тенденцию снижаться. Исходное состояние, лекарства и другие рефлексы меняют ответ; один показатель не доказывает поражение ствола.",
        "Carotid-sinus stretch increases baroreceptor firing through CN IX to the nucleus tractus solitarius. Integration generally increases cardiac vagal influence and decreases sympathetic vasomotor output, tending to lower heart rate and vascular tone. Baseline state, drugs and other reflexes modify the response; one measurement does not prove brainstem damage.",
        "Каротид синусы созылғанда барорецепторлардан импульс IX жүйке арқылы жалғыз жол ядросына жиірек келеді. Әдетте жүрекке вагустық ықпал күшейіп, тамырларға симпатикалық әсер азаяды, сондықтан жүрек жиілігі мен тамыр тонусы төмендеуге бейім. Бастапқы күй, дәрілер және басқа рефлекстер жауапты өзгертеді; бір көрсеткіш зақымды дәлелдемейді."
      )
    ]
  }
];
const response: Text = t(
  "Сначала запишите собственный прогноз, механизм и ограничения вывода",
  "First record your prediction, mechanism and limits of inference",
  "Алдымен өз болжамыңызды, тетікті және қорытындының шектерін жазыңыз"
);
const criteria: Record<Language, string[]> = {
  RU: ["Различаю II-афферент и III-эфферент светового рефлекса.", "Различаю V1-афферент и VII-эфферент корнеального рефлекса.", "Не принимаю индекс симулятора за уровень сознания.", "Разделяю восходящую активацию и нисходящий постуральный контроль.", "Объясняю хеморефлекс и барорефлекс с границами вывода."],
  EN: ["I distinguish CN II afferent from CN III efferent in the light reflex.", "I distinguish V1 afferent from CN VII efferent in the corneal reflex.", "I do not treat the simulated index as a measure of consciousness.", "I separate ascending arousal from descending postural control.", "I explain chemoreflex and baroreflex with limits of inference."],
  KZ: ["Жарық рефлексіндегі II афференті мен III эфферентін ажыратамын.", "Қасаң қабық рефлексіндегі V1 афференті мен VII эфферентін ажыратамын.", "Модель индексін сана деңгейімен теңестірмеймін.", "Жоғарылайтын сергектік пен төмендеуші дене қалпын реттеуді ажыратамын.", "Хеморефлекс пен барорефлексті қорытынды шектерімен түсіндіремін."]
};
const selfCheck: Text = t("Самопроверка", "Self-check", "Өзін-өзі тексеру");

export function createModuleTenPractice(language: Language, base: PracticeLesson): PracticeLesson {
  return { ...base, sections: [
    ...tasks.map(task => ({ title: task.title[language], blocks: [
      { type: "paragraph" as const, text: task.prompt[language] },
      { type: "response" as const, label: response[language] },
      { type: "answer" as const, items: task.answers.map(a => a[language]) }
    ] })),
    { title: selfCheck[language], blocks: [{ type: "checklist" as const, items: criteria[language] }] }
  ] };
}
