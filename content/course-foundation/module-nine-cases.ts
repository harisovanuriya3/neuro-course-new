import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Module 9: three independent, non-diagnostic spinal reflex cases.
// Cross-checked with user Library editions: Ganong 23e PDF 169–175, 261;
// Guyton & Hall 13e PDF 667–673; C. L. Ghai Practical Physiology 8e PDF 317–319.
// No invasive/painful human reflex demonstration is requested.
type CaseCopy = {
  title: string;
  situation: string;
  questions: [string, string, string];
  explanation: [string, string];
};
type Copy = { introduction: string; cases: [CaseCopy, CaseCopy, CaseCopy] };

const copy: Record<Language, Copy> = {
  RU: {
    introduction: "Три независимые учебные задачи о спинальных рефлексах. Сначала выделите наблюдение, затем назовите звенья дуги и предложите альтернативную гипотезу. Ни один отдельный рефлекс не устанавливает диагноз; не воспроизводите болезненные стимулы на людях.",
    cases: [
      {
        title: "1. Ослабленный коленный рефлекс при сохранённой мышце",
        situation: "Модель изолированного повреждения: у взрослого снижена чувствительная импульсация по заднему корешку, проводящему часть Ia-афферентов от мышечных веретён четырёхглавой мышцы бедра (сегменты L2–L4). Передний корешок, двигательные аксоны бедренного нерва и сама мышца сохранены. При стандартном обследовании коленный рефлекс на этой стороне ослаблен. Студент делает вывод: «Раз рефлекс слабый, повреждён α-мотонейрон».",
        questions: [
          "Какая часть дуги коленного рефлекса нарушена в условиях задачи, а какие элементы явно сохранены?",
          "Постройте последовательность: растяжение четырёхглавой мышцы → мышечное веретено → Ia-афферент → спинной мозг → α-мотонейрон → мышца. Как повлияет выпадение афферентного входа?",
          "Почему слабый рефлекс в реальной клинике не доказывает именно поражение заднего корешка? Какие дополнительные сведения нужны?"
        ],
        explanation: [
          "Удар по сухожилию надколенника кратковременно растягивает четырёхглавую мышцу и её веретёна; Ia-афференты проходят через задний корешок и возбуждают α-мотонейроны той же мышцы через центральный моносинаптический компонент. Утрата части Ia-входа может ослабить ответ, хотя передний корешок и мышца остаются функциональными. Реципрокное торможение антагониста проходит через дополнительный тормозный интернейрон, поэтому не является частью этой единственной синаптической связи.",
          "В клинике снижение коленного рефлекса может зависеть от афферентного пути, сегментарного мотонейрона, эфферентного нерва, нервно-мышечной передачи, мышцы, положения пациента и техники исследования. Оценивают силу, чувствительность, распределение других рефлексов и анамнез. Это упражнение задаёт селективное повреждение искусственно; по одному слабому рефлексу такую локализацию у человека подтвердить нельзя."
        ]
      },
      {
        title: "2. Рефлексы в разные сроки после повреждения спинного мозга",
        situation: "Пациент с тяжёлым повреждением грудного отдела спинного мозга находится под наблюдением специалистов. В первые часы ниже предполагаемого уровня повреждения выражены слабость, снижение тонуса и угнетение нескольких сухожильных рефлексов. Позднее часть сегментарных рефлексов возвращается и становится более выраженной, но произвольные движения остаются значительно нарушенными. Студент заключает: «Возвращение рефлексов означает восстановление нисходящих путей».",
        questions: [
          "Как называется раннее угнетение спинальных рефлексов после тяжёлого повреждения и почему оно возможно при сохранности некоторых местных дуг?",
          "Объясните, почему позднее усиление рефлексов не доказывает восстановления произвольного движения; следует ли ожидать одинаковые сроки у всех пациентов?",
          "Чем спинальный шок отличается от нейрогенного гемодинамического шока и какие дополнительные данные нельзя пропускать?"
        ],
        explanation: [
          "Спинальный шок — раннее угнетение сегментарной рефлекторной активности после тяжёлого повреждения спинного мозга; существенна внезапная утрата нисходящей модуляции. Сохранённые локальные цепи способны позднее вновь отвечать и иногда становятся гипервозбудимыми. Эти изменения не означают восстановления связи с головным мозгом, полноты произвольного контроля или самостоятельной ходьбы. Время и выраженность возвращения рефлексов различаются; жёсткий срок или обязательная гиперрефлексия некорректны.",
          "Спинальный шок описывает рефлекторную функцию, а нейрогенный шок — возможную гипотензию и брадикардию вследствие потери симпатического тонуса, чаще при более высоком повреждении. Состояния могут сочетаться, но не являются синонимами. Важны давление, пульс, чувствительность, сила, функции тазовых органов, уровень и полнота поражения, сопутствующая травма и динамика. Новое ухудшение требует срочной профессиональной оценки."
        ]
      },
      {
        title: "3. Защитное отдёргивание и перекрёстное разгибание",
        situation: "На схеме животной экспериментальной модели показан краткий ноцицептивный вход от кожи левой стопы: левая конечность сгибается, а при более сильном входе в некоторых условиях активируются разгибатели противоположной конечности. Студент считает, что весь ответ проходит через единственный моносинаптический путь Ia→α, как коленный рефлекс. Эксперимент представлен только на схеме: студентам не предлагают наносить болезненные стимулы.",
        questions: [
          "Какие афферентные сигналы и интернейронные сети преимущественно обеспечивают сгибательное отдёргивание и торможение антагонистов?",
          "Почему возможная перекрёстная разгибательная реакция требует дополнительных межсегментарных и комиссуральных связей, а не одной Ia→α-синаптической дуги?",
          "Какие ограничения возникают при переносе результатов животной модели на клиническое обследование человека и можно ли ожидать перекрёстное разгибание всегда?"
        ],
        explanation: [
          "Защитное отдёргивание обычно запускается ноцицептивным входом и организуется полисинаптическими сетями спинальных интернейронов: возбуждаются сгибатели стимулированной конечности, а разгибатели могут тормозиться. При достаточной активации и соответствующем состоянии сети через комиссуральные цепи возможно разгибание противоположной конечности для опоры. Это функционально отличается от прямого центрального Ia→α-компонента рефлекса растяжения.",
          "Выраженность, длительность и межконечностное распространение зависят от силы и места входа, состояния нисходящего контроля и вида животного. Перекрёстное разгибание не является обязательным ответом у здорового человека; животная модель не даёт диагностического критерия. Болезненные стимулы студентам не предлагаются. Объясняйте различие между моносинаптической и полисинаптической цепями, а не подменяйте его одним общим словом «рефлекс»."
        ]
      }
    ]
  },
  EN: {
    introduction: "Three independent teaching cases about spinal reflexes. Identify the observation, trace the reflex arc and consider an alternative explanation before reading the discussion. A single reflex is not a diagnosis; do not reproduce painful stimuli in people.",
    cases: [
      {
        title: "1. Reduced knee jerk with preserved muscle",
        situation: "Selective-lesion model: an adult has reduced sensory input through a dorsal root carrying some group Ia afferents from quadriceps muscle spindles (L2–L4 segments). The ventral root, femoral motor axons and quadriceps muscle are intact. Under standardized examination the knee jerk is diminished on that side. A student concludes: 'A weak knee jerk proves that the alpha motor neuron is damaged.'",
        questions: [
          "Which part of the knee-jerk arc is affected by the stipulated lesion, and which components are explicitly intact?",
          "Trace quadriceps stretch → muscle spindle → Ia afferent → spinal cord → alpha motor neuron → muscle. What follows from loss of afferent input?",
          "Why does a weak knee jerk in clinical practice not prove a dorsal-root lesion, and what additional findings would you seek?"
        ],
        explanation: [
          "A patellar tendon tap briefly stretches quadriceps and its spindles. Ia afferents enter through a dorsal root and excite alpha motor neurons supplying the same muscle through the central monosynaptic component. Loss of some Ia input can reduce the reflex despite intact ventral-root motor output and muscle. Reciprocal inhibition of the antagonist requires an additional inhibitory interneuron and is not part of that single synapse.",
          "Clinically, a reduced knee jerk may reflect the sensory limb, segmental motor neurons, efferent nerve, neuromuscular transmission, muscle, positioning or examination technique. Compare strength, sensation, other reflexes and the history. Selective dorsal-root damage is stipulated for this teaching model; an isolated weak reflex in a patient cannot establish that localization."
        ]
      },
      {
        title: "2. Reflexes at different times after spinal cord injury",
        situation: "A patient with a severe thoracic spinal cord injury is under specialist care. In the first hours, weakness, low tone and depressed tendon reflexes are noted below the suspected lesion. Later, some segmental reflexes return and become brisker, while voluntary movement remains severely impaired. A student concludes: 'The return of reflexes means that descending pathways have recovered.'",
        questions: [
          "What is the early depression of spinal reflexes after severe injury called, and why may it occur even if some local arcs survive?",
          "Why does later reflex exaggeration not prove recovery of voluntary movement, and should all patients have the same time course?",
          "How does spinal shock differ from hemodynamic neurogenic shock, and which additional observations are necessary?"
        ],
        explanation: [
          "Spinal shock is early depression of segmental reflex activity after severe spinal cord injury; abrupt loss of descending modulation is important. Surviving local circuits may later regain responsiveness and sometimes become hyperexcitable. This does not demonstrate restored connections with the brain, normal voluntary control or independent walking. Timing and magnitude vary, so neither a fixed recovery interval nor obligatory hyperreflexia is justified.",
          "Spinal shock concerns reflex function; neurogenic shock refers to possible hypotension and bradycardia from loss of sympathetic tone, especially with higher lesions. They can coexist but are not synonyms. Evaluate blood pressure, pulse, sensation, strength, bladder and bowel function, lesion level and completeness, associated injuries and change over time. New deterioration requires urgent professional assessment."
        ]
      },
      {
        title: "3. Protective withdrawal and crossed extension",
        situation: "A schematic animal experimental model shows a brief nociceptive input from the skin of the left foot: the left limb flexes, and under some conditions stronger input recruits extensors in the opposite limb. A student claims that the entire response uses the single monosynaptic Ia-to-alpha pathway of the knee jerk. This is a diagram-based exercise; students are not asked to apply painful stimuli.",
        questions: [
          "Which afferent inputs and spinal interneuron networks chiefly support flexor withdrawal and inhibition of antagonist muscles?",
          "Why does a possible crossed extensor response require additional commissural and intersegmental pathways rather than one Ia-to-alpha synapse?",
          "What limits apply when extrapolating from animal preparations to human clinical examination, and is crossed extension obligatory?"
        ],
        explanation: [
          "Protective withdrawal is usually initiated by nociceptive input and organized by polysynaptic spinal interneuron networks. Flexors of the stimulated limb are recruited while antagonist extensors can be inhibited. With sufficient recruitment and an appropriate network state, commissural circuits may also excite contralateral extensors to support the body. This is functionally distinct from the direct central Ia-to-alpha component of the stretch reflex.",
          "The magnitude, duration and spread across limbs depend on stimulus strength and location, descending control and species. Crossed extension is not an obligatory response in a healthy human, and animal data are not a stand-alone diagnostic criterion. No painful stimulation is proposed for students. Distinguish mono- from polysynaptic circuitry rather than labeling both simply 'reflexes'."
        ]
      }
    ]
  },
  KZ: {
    introduction: "Жұлын рефлекстеріне арналған үш дербес оқу жағдайы. Алдымен бақылауды бөліп, рефлекс доғасының буындарын анықтаңыз, содан кейін балама түсіндірмені қарастырыңыз. Бір ғана рефлекс диагноз қойғызбайды; адамдарға ауырсындыратын тітіркендіргіш қолданбаңыз.",
    cases: [
      {
        title: "1. Бұлшықет сақталса да тізе рефлексінің әлсіреуі",
        situation: "Таңдамалы зақымның оқу үлгісі: ересек адамда санның төртбасты бұлшықетінің ұршықтарынан Ia-афференттердің бір бөлігін өткізетін артқы түбіршек арқылы сезімтал кіріс азайған (L2–L4 сегменттері). Алдыңғы түбіршек, сан жүйкесінің қозғалтқыш аксондары және бұлшықеттің өзі сақталған. Стандартты тексеруде сол жақтағы тізе рефлексі әлсіреген. Студент: «Рефлекс әлсіз болса, α-мотонейрон зақымданғаны дәлелденді», — дейді.",
        questions: [
          "Оқу жағдайында тізе рефлексі доғасының қай бөлігі бұзылған, ал қандай бөліктері сақталған?",
          "Тізбекті құрыңыз: төртбасты бұлшықеттің созылуы → бұлшықет ұршығы → Ia-афферент → жұлын → α-мотонейрон → бұлшықет. Афференттік кіріс азайса не болады?",
          "Неліктен клиникада әлсіз тізе рефлексі артқы түбіршек зақымын жеке өзі дәлелдемейді? Қандай қосымша мәлімет керек?"
        ],
        explanation: [
          "Тізе тобығының сіңірін соғу төртбасты бұлшықет пен оның ұршықтарын қысқа уақытқа созады. Ia-афференттер артқы түбіршекпен кіріп, сол бұлшықеттің α-мотонейрондарын орталық моносинапстық буын арқылы қоздырады. Ia-кірістің бір бөлігінің жоғалуы алдыңғы түбіршек пен бұлшықет сақталғанның өзінде жауапты әлсіретуі мүмкін. Антагонисті реципрокты тежеу қосымша тежегіш интернейрон арқылы өтеді, сондықтан жалғыз синапстың бөлігі емес.",
          "Клиникада әлсіз рефлекс сезімтал кіріске, сегменттік мотонейронға, эфференттік жүйкеге, жүйке-бұлшықет берілуіне, бұлшықетке, адамның қалпына немесе тексеру әдісіне байланысты болуы мүмкін. Күшті, сезімталдықты, басқа рефлекстерді және анамнезді салыстырыңыз. Артқы түбіршектің таңдамалы зақымы бұл оқу үлгісінде алдын ала берілген; пациенттегі бір әлсіз рефлекс мұндай локализацияны дәлелдемейді."
        ]
      },
      {
        title: "2. Жұлын жарақатынан кейінгі әр кезеңдегі рефлекстер",
        situation: "Кеуде деңгейінде жұлынның ауыр жарақатын алған пациент мамандардың бақылауында. Алғашқы сағаттарда болжамды зақым деңгейінен төмен бұлшықет әлсіздігі, тонустың төмендеуі және бірнеше сіңір рефлексінің бәсеңдеуі байқалады. Кейін кейбір сегменттік рефлекстер қайта пайда болып, күшейеді, бірақ ерікті қозғалыс айқын бұзылған күйінде қалады. Студент: «Рефлекстер қайтса, төмендеуші жолдар қалпына келді», — дейді.",
        questions: [
          "Ауыр жарақаттан кейінгі жұлын рефлекстерінің ерте бәсеңдеуі қалай аталады және жергілікті доғалардың бір бөлігі сақталса да неге болады?",
          "Неліктен кейінгі гиперрефлексия ерікті қозғалыстың қалпына келгенін дәлелдемейді? Барлық пациентте уақыт бірдей ме?",
          "Жұлындық шок гемодинамикалық нейрогендік шоктан несімен ерекшеленеді және қандай қосымша деректер қажет?"
        ],
        explanation: [
          "Жұлындық шок — жұлын ауыр зақымданғаннан кейін сегменттік рефлекс белсенділігінің ерте бәсеңдеуі; төмендеуші модуляцияның кенет жоғалуы маңызды. Сақталған жергілікті тізбектер кейін қайта жауап беріп, кейде шамадан тыс қозғыш болуы мүмкін. Бұл мимен байланыс, ерікті басқару немесе өздігінен жүру қалпына келгенін білдірмейді. Рефлекстердің қайту уақыты мен дәрежесі әртүрлі; қатаң мерзімді не міндетті гиперрефлексияны болжауға болмайды.",
          "Жұлындық шок рефлекс қызметіне қатысты, ал нейрогендік шок — әсіресе жоғары зақымда симпатикалық тонус жоғалғанда туындауы мүмкін гипотензия мен брадикардияға қатысты гемодинамикалық жағдай. Екеуі қатар кездесуі мүмкін, бірақ бір ұғым емес. Қан қысымын, пульсті, сезімталдықты, күшті, қуық пен ішек қызметін, зақым деңгейі мен толықтығын, қосымша жарақаттарды және өзгеріс динамикасын бағалау керек. Жағдай нашарласа, шұғыл маман көмегі қажет."
        ]
      },
      {
        title: "3. Қорғаныштық тартып алу және айқасқан жазылу",
        situation: "Жануарға жасалған тәжірибенің сызбалық үлгісінде сол аяқ терісінен қысқа ноцицептивтік кіріс көрсетілген: сол аяқ бүгіледі, ал кей жағдайларда күшті кіріс қарсы аяқтың жазғыш бұлшықеттерін белсендіреді. Студент бұл жауаптың бәрі тізе рефлексіндегідей жалғыз Ia→α моносинапстық жол арқылы өтеді деп есептейді. Бұл тек сызбамен орындалатын тапсырма; студенттерге ауырсындыратын тітіркендіргіш қолдану ұсынылмайды.",
        questions: [
          "Қандай афференттік кіріс пен жұлын интернейрондарының желісі бүгу арқылы тартып алуды және антагонисті тежеуді қамтамасыз етеді?",
          "Айқасқан жазылу реакциясы неліктен бір Ia→α синапсынан гөрі қосымша комиссуралдық және сегментаралық жолдарды қажет етеді?",
          "Жануар тәжірибесін адам клиникасына көшірудің шегі қандай және айқасқан жазылу әрқашан бола ма?"
        ],
        explanation: [
          "Қорғаныштық тартып алу әдетте ноцицептивтік кірістен басталып, жұлын интернейрондарының полисинапстық желілерімен ұйымдасады. Тітіркенген аяқтың бүгуші бұлшықеттері белсенеді, ал антагонист жазғыштар тежелуі мүмкін. Кіріс жеткілікті болғанда және желі күйі сәйкес келгенде комиссуралдық тізбектер қарсы аяқтың жазғыштарын да белсендіріп, денеге тірек болуға көмектеседі. Бұл созылу рефлексінің тікелей орталық Ia→α буынынан өзгеше.",
          "Жауаптың күші, ұзақтығы және аяқтар арасындағы таралуы кірістің орны мен қарқынына, төмендеуші бақылауға және жануар түріне тәуелді. Айқасқан жазылу дені сау адамда міндетті жауап емес; жануар үлгісі жеке клиникалық диагностикалық белгі бола алмайды. Студенттерге ауырсындыратын стимул қолдану ұсынылмайды. Моносинапстық және полисинапстық тізбектерді ажырату керек."
        ]
      }
    ]
  }
};

export function createModuleNineCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  const data = copy[language];
  const stages = language === "RU"
    ? ["Выделите данные", "Постройте механизм", "Проверьте альтернативу и ограничения"]
    : language === "EN"
      ? ["Identify the evidence", "Trace the mechanism", "Test alternatives and limitations"]
      : ["Деректерді анықтаңыз", "Тетікті құрыңыз", "Баламалар мен шектеулерді тексеріңіз"];
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle,
    introduction: data.introduction,
    ui,
    cases: data.cases.map((item, i) => ({
      id: `m9-spinal-case-${i + 1}`,
      title: item.title,
      situation: item.situation,
      stages: item.questions.map((question, j) => ({ title: stages[j], questions: [question] })),
      explanation: [...item.explanation]
    }))
  };
}
