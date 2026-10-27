import type { Language, Lesson } from "../types";

// Module 12: basal ganglia theory; authored and checked against the user's Library copies.
// Guyton & Hall 13e, ch. 57, printed pp. 730–735 (PDF pp. 697–702);
// Ganong 23e, ch. 16, printed pp. 250–254 (PDF pp. 262–266);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–287 (PDF pp. 307–309).
// Canonical direct/indirect/hyperdirect pathways are simplified explanatory models.
// Clinical text is for interpretation, not unsupervised examination or treatment.
type Text = Record<Language, string>;
type TheorySection = { id: string; heading: Text; paragraphs: Text[] };
const sections: TheorySection[] = [
  {
    "id": "basal-ganglia-nodes-and-loops",
    "heading": {
      "RU": "Узлы базальных ганглиев и направление сигналов",
      "EN": "Basal-ganglia nuclei and signal flow",
      "KZ": "Базальды ганглийлердің ядролары және сигнал бағыты"
    },
    "paragraphs": [
      {
        "RU": "Базальные ганглии образуют несколько взаимодействующих петель с корой и таламусом. Хвостатое ядро и скорлупа (путамен) составляют стриатум — главный получатель многих корковых и таламических входов. Бледный шар имеет наружный (GPe) и внутренний (GPi) сегменты; к функционально связанным структурам относятся субталамическое ядро (STN) и чёрная субстанция с компактной (SNc) и ретикулярной (SNr) частями. Это не самостоятельный проводящий путь от коры к мышце.",
        "EN": "Basal ganglia participate in several interacting loops with cortex and thalamus. Caudate nucleus and putamen form the striatum, a major recipient of cortical and thalamic inputs. The globus pallidus has external (GPe) and internal (GPi) segments; functionally associated structures include the subthalamic nucleus (STN) and the substantia nigra with pars compacta (SNc) and pars reticulata (SNr). These nuclei do not form a direct nerve pathway from cortex to muscle.",
        "KZ": "Базальды ганглийлер қыртыс пен таламус қатысатын бірнеше өзара байланысты контурға кіреді. Құйрықты ядро мен путамен бірге стриатумды құрайды; оған қыртыс пен таламустан көптеген сигнал келеді. Бозғылт шардың сыртқы (GPe) және ішкі (GPi) сегменттері бар. Субталамустық ядро (STN) және қара субстанцияның тығыз (SNc), торлы (SNr) бөліктері де осы жүйемен функционалдық байланыста. Бұл ядролар қыртыстан бұлшықетке баратын тікелей жүйке жолы емес."
      },
      {
        "RU": "Корковые глутаматергические проекции преимущественно возбуждают стриарные нейроны; стриарные проекционные нейроны в основном ГАМК-ергические. GPi и SNr обеспечивают важный тонический тормозный выход к таламическим и некоторым стволовым мишеням. Таламокорковые проекции, напротив, преимущественно возбуждающие. Следовательно, ослабление торможения таламуса может облегчать активность выбранной корковой двигательной сети, но само по себе не вызывает сокращение конкретной мышцы: для этого нужны нисходящие пути и мотонейроны.",
        "EN": "Cortical glutamatergic projections generally excite striatal neurons; striatal projection neurons are predominantly GABAergic. GPi and SNr provide important tonic inhibitory output to thalamic and some brainstem targets, whereas thalamocortical projections are predominantly excitatory. Reducing thalamic inhibition can therefore facilitate a selected cortical motor network, but it does not itself contract a particular muscle: descending pathways and motor neurons remain necessary.",
        "KZ": "Қыртыстың глутаматергиялық проекциялары стриатум нейрондарын көбіне қоздырады, ал стриатумның проекциялық нейрондары негізінен ГАМҚ-ергиялық. GPi мен SNr таламусқа және ми бағанының кейбір нысандарына тұрақты тежеуші әсер береді. Таламус-қыртыс проекциялары көбіне қоздырушы болады. Сондықтан таламустың тежелуін азайту таңдалған қыртыстық қозғалыс желісінің белсенділігін жеңілдетуі мүмкін, бірақ бұл жеке бұлшықетті тікелей жиырылтпайды: төмендеуші жолдар мен мотонейрондар қажет."
      }
    ]
  },
  {
    "id": "direct-indirect-and-hyperdirect",
    "heading": {
      "RU": "Прямой, непрямой и гиперпрямой пути",
      "EN": "Direct, indirect and hyperdirect pathways",
      "KZ": "Тікелей, жанама және гипертікелей жолдар"
    },
    "paragraphs": [
      {
        "RU": "В канонической схеме прямого пути корковый вход возбуждает определённые стриарные нейроны, которые через ГАМК тормозят GPi/SNr. Если остальные входы фиксированы, тоническое торможение соответствующих таламических нейронов уменьшается — происходит растормаживание. В непрямом пути другая популяция стриарных нейронов тормозит GPe; это может ослабить торможение STN, усилить его глутаматергическое возбуждение GPi/SNr и увеличить тормозный выход к таламусу. Эти противоположные прогнозы относятся к заданным звеньям модели, а не ко всем нейронам базальных ганглиев одновременно.",
        "EN": "In the canonical direct pathway, cortical input excites a specified population of striatal neurons that inhibit GPi/SNr through GABA. With other inputs held fixed, tonic inhibition of corresponding thalamic neurons decreases: disinhibition occurs. In the indirect pathway, another striatal population inhibits GPe; this can reduce inhibition of STN, increase its glutamatergic excitation of GPi/SNr and strengthen inhibitory output to thalamus. These contrasting predictions concern specified parts of a model, not every basal-ganglia neuron at once.",
        "KZ": "Канондық тікелей жол үлгісінде қыртыстан келген сигнал стриатумның белгілі нейрондарын қоздырады; олар ГАМҚ арқылы GPi/SNr белсенділігін тежейді. Басқа кірістер өзгермесе, таламустың тиісті нейрондарына тұрақты тежеу азаяды, яғни тежелуден босау байқалады. Жанама жолда стриатумның басқа нейрондары GPe-ні тежейді; бұл STN тежелуін азайтып, оның GPi/SNr-ге глутаматергиялық қоздыруын және таламусқа тежеуші шығысты күшейтуі мүмкін. Бұл болжамдар бүкіл жүйеге емес, үлгінің нақты буындарына қатысты."
      },
      {
        "RU": "Гиперпрямой путь передаёт часть корковых сигналов непосредственно в STN, минуя стриатум, и может быстро усиливать выход GPi/SNr. В реальном мозге прямой, непрямой и гиперпрямой контуры действуют параллельно, имеют коллатерали и неоднородные популяции клеток. Поэтому упрощённое правило «прямой путь включает любое движение, непрямой выключает любое движение» неверно; эффекты зависят от активности конкретной популяции, времени, задачи и обратных связей.",
        "EN": "The hyperdirect pathway carries some cortical signals directly to STN without passing through striatum and can rapidly increase GPi/SNr output. In the intact brain, direct, indirect and hyperdirect circuits operate in parallel, with collateral connections and heterogeneous cell populations. Thus the slogan 'the direct pathway turns every movement on and the indirect pathway turns every movement off' is misleading; effects depend on the active population, timing, task and feedback.",
        "KZ": "Гипертікелей жол қыртыстың кейбір сигналдарын стриатумды айналып өтіп, тікелей STN-ге жеткізеді және GPi/SNr шығысын жылдам күшейте алады. Нақты мида тікелей, жанама және гипертікелей контурлар қатар жұмыс істейді, қосымша тармақтары мен әртүрлі жасушалық топтары бар. Сондықтан «тікелей жол барлық қозғалысты қосады, жанама жол барлық қозғалысты өшіреді» деген ереже дәл емес; әсер нақты нейрондар тобына, уақытқа, тапсырмаға және кері байланысқа тәуелді."
      }
    ]
  },
  {
    "id": "dopamine-modulates-selection",
    "heading": {
      "RU": "Дофамин: модуляция, а не единое возбуждение",
      "EN": "Dopamine modulates rather than uniformly excites",
      "KZ": "Дофамин: бәрін бірдей қоздыру емес, модуляция"
    },
    "paragraphs": [
      {
        "RU": "Нигростриарные нейроны SNc выделяют дофамин в стриатуме. В учебной модели активация D1-рецепторов обычно облегчает активность нейронов прямого пути, а D2-зависимое действие обычно снижает активность соответствующих нейронов непрямого пути. Оба эффекта в определённых условиях могут уменьшать суммарный тормозный выход GPi/SNr на выбранную таламокорковую цепь. Это рецепторно- и контекстно-зависимая модуляция: дофамин нельзя называть исключительно возбуждающим или исключительно тормозным медиатором для всего мозга.",
        "EN": "Nigrostriatal neurons in SNc release dopamine in the striatum. In an introductory model, D1-receptor activation generally facilitates direct-pathway neurons, while D2-mediated actions generally reduce activity of corresponding indirect-pathway neurons. Under specified conditions, both effects can reduce the net inhibitory output of GPi/SNr to a selected thalamocortical circuit. Modulation depends on receptors and context: dopamine is neither uniformly excitatory nor uniformly inhibitory throughout the brain.",
        "KZ": "SNc-нің нигростриатумдық нейрондары стриатумда дофамин бөледі. Бастапқы оқу үлгісінде D1-рецепторларының белсенуі тікелей жол нейрондарының белсенділігін көбіне арттырады, ал D2 арқылы әсер жанама жолдың тиісті нейрондарының белсенділігін көбіне төмендетеді. Белгілі жағдайларда екі әсер де таңдалған таламус-қыртыс контурына GPi/SNr беретін жалпы тежеуді азайта алады. Дофаминнің әсері рецептор мен жағдайға тәуелді; оны бүкіл мида тек қоздырушы немесе тек тежеуші медиатор деуге болмайды."
      },
      {
        "RU": "При утрате дофаминергических входов SNc каноническая модель предсказывает ослабление облегчения прямого пути и усиление влияния непрямого пути; тормозный выход GPi/SNr к части таламических мишеней может возрастать. Это помогает понять брадикинезию, но не объясняет автоматически каждый симптом паркинсонизма и не задаёт точную скорость движения отдельного пациента. На результат влияют корковые, стволовые, сенсорные и другие базально-ганглионарные сети; не следует переносить модельные изменения активности ядер напрямую на мышечную силу.",
        "EN": "When SNc dopaminergic input is lost, the canonical model predicts less facilitation of the direct pathway and stronger relative influence of the indirect pathway; GPi/SNr inhibition of some thalamic targets may rise. This helps explain bradykinesia, but does not automatically explain every feature of parkinsonism or predict an individual patient's movement speed. Cortical, brainstem, sensory and other basal-ganglia networks matter; model changes in nuclear activity must not be equated directly with muscle force.",
        "KZ": "SNc-ден келетін дофаминергиялық кіріс азайғанда канондық үлгі тікелей жолдың жеңілдетілуі төмендеп, жанама жолдың салыстырмалы ықпалы күшеюі мүмкін деп болжайды; GPi/SNr-дің таламустың кейбір нысандарына тежеуі артуы ықтимал. Бұл брадикинезияны түсінуге көмектеседі, бірақ паркинсонизмнің барлық белгісін немесе жеке адамның қозғалыс жылдамдығын толық болжай алмайды. Қыртыстық, бағандық, сенсорлық және басқа желілер де маңызды; ядро белсенділігіндегі модельдік өзгерісті бұлшықет күшімен тікелей теңестіруге болмайды."
      }
    ]
  },
  {
    "id": "action-selection-and-measurable-predictions",
    "heading": {
      "RU": "Выбор действия и проверяемые прогнозы",
      "EN": "Action selection and testable predictions",
      "KZ": "Әрекет таңдау және тексерілетін болжамдар"
    },
    "paragraphs": [
      {
        "RU": "Базальные ганглии участвуют в подготовке, выборе, последовательности и масштабе действий вместе с корой, таламусом и мозжечком. Например, при выборе между двумя движениями можно отдельно измерить латентность начала, долю ошибочных выборов, амплитуду и вариабельность ответа. Эти показатели не взаимозаменяемы: медленный старт при сохранной максимальной силе не равен периферическому парезу, а ошибка достижения цели не обязательно означает брадикинезию. Для причинного вывода следует заранее определить входное воздействие и фиксируемые условия.",
        "EN": "Basal ganglia contribute to preparation, selection, sequencing and scaling of actions together with cortex, thalamus and cerebellum. When choosing between two movements, one can measure onset latency, error frequency, response amplitude and variability separately. These outcomes are not interchangeable: slow initiation with preserved maximal force is not peripheral paresis, and inaccurate reaching does not necessarily imply bradykinesia. A causal interpretation requires a specified manipulation and controlled conditions.",
        "KZ": "Базальды ганглийлер қыртыс, таламус және мишықпен бірге әрекетті дайындауға, таңдауға, ретімен орындауға және оның ауқымын реттеуге қатысады. Екі қозғалыстың бірін таңдағанда басталу кідірісін, қате таңдау жиілігін, жауап амплитудасын және өзгергіштігін бөлек өлшеуге болады. Бұлар бірдей көрсеткіш емес: ең жоғары күш сақталған баяу басталу шеткі парезге тең емес, ал нысанаға дәл жетпеу міндетті түрде брадикинезияны білдірмейді. Себептік қорытынды үшін өзгертілетін әсер мен тұрақты жағдайларды алдын ала белгілеу қажет."
      },
      {
        "RU": "Мысленный эксперимент: в виртуальной задаче изменяют только уровень условного дофаминергического входа или активность заданной популяции стриатума; сложность стимула, требуемую силу и алгоритм оценки сохраняют. Сначала студент прогнозирует направление изменения выбранного показателя, затем сравнивает с расчётом симуляции и объясняет расхождение. Числа и траектории учебной модели не являются записью нейронов пациента и не должны выдаваться за клинические нормативы. Если интерфейс не позволяет управлять указанной переменной, такой опыт остаётся планом, а не выполненным экспериментом.",
        "EN": "Thought experiment: in a virtual task, change only a modeled dopaminergic input or activity of a specified striatal population while keeping stimulus difficulty, required force and scoring rules fixed. First predict the direction of a selected outcome, then compare it with the simulation and explain discrepancies. Numerical outputs and trajectories from a teaching model are not patient neuronal recordings or clinical reference ranges. If the interface cannot manipulate the stated variable, this remains an experimental plan rather than a performed experiment.",
        "KZ": "Ойша тәжірибе: виртуалды тапсырмада тек модельдік дофаминергиялық кірісті немесе стриатумның белгіленген нейрондар тобының белсенділігін өзгертіп, стимул күрделілігін, қажет күшті және бағалау ережесін тұрақты ұстайды. Алдымен таңдалған көрсеткіштің өзгеру бағытын болжайды, кейін симуляция нәтижесімен салыстырып, айырмашылықты түсіндіреді. Оқу үлгісінің сандары мен траекториялары науқас нейрондарының жазбасы да, клиникалық норма да емес. Интерфейсте айнымалыны өзгерту мүмкін болмаса, бұл орындалған тәжірибе емес, тек тәжірибе жоспары."
      }
    ]
  },
  {
    "id": "hypokinetic-hyperkinetic-and-differential",
    "heading": {
      "RU": "Двигательные признаки: что можно и нельзя заключить",
      "EN": "Motor signs: what can and cannot be inferred",
      "KZ": "Қозғалыс белгілері: қорытындының мүмкіндігі мен шегі"
    },
    "paragraphs": [
      {
        "RU": "Брадикинезия означает замедленность движения, а акинезия — выраженную трудность его начала или отсутствие спонтанных движений. Ригидность проявляется повышенным сопротивлением пассивному движению, обычно менее зависимым от скорости, чем спастичность. Тремор покоя может встречаться при паркинсонизме, но не обязателен у каждого пациента. Хорея — неритмичные непроизвольные движения, относимые к гиперкинетическим проявлениям. Ни один из этих признаков по отдельности не доказывает конкретную болезнь или локализацию.",
        "EN": "Bradykinesia is slowness of movement, whereas akinesia refers to marked difficulty initiating movement or reduced spontaneous movement. Rigidity is increased resistance to passive movement, generally less velocity-dependent than spasticity. Rest tremor can occur in parkinsonism but is not obligatory in every patient. Chorea consists of irregular involuntary movements and is a hyperkinetic feature. None of these signs alone proves a specific disease or lesion site.",
        "KZ": "Брадикинезия — қозғалыстың баяулауы, ал акинезия — қозғалысты бастаудың айқын қиындауы немесе өздігінен болатын қимылдың азаюы. Ригидтілік пассивті қозғалысқа қарсылықтың артуымен көрінеді және спастикалық тонусқа қарағанда жылдамдыққа әдетте азырақ тәуелді. Тыныштық треморы паркинсонизмде кездесуі мүмкін, бірақ әр науқаста міндетті емес. Хорея — ырғақсыз еріксіз қимылдар, гиперкинетикалық белгі. Бұл белгілердің ешқайсысы жеке өзі белгілі ауруды не зақым орнын дәлелдемейді."
      },
      {
        "RU": "Слабость означает уменьшение способности развить силу и требует отдельной оценки нисходящих путей, нижнего мотонейрона, нервно-мышечной передачи и мышцы. Дисметрия означает ошибку амплитуды при достижении цели и часто связана с мозжечковыми сетями; она не тождественна брадикинезии. В учебной ситуации следует сравнивать начало движения, скорость, точность, силу, тонус и контекст. Клиническое обследование и диагноз требуют специалиста; учебные примеры не являются указаниями самостоятельно испытывать пациентов.",
        "EN": "Weakness is reduced capacity to generate force and calls for separate consideration of descending pathways, lower motor neurons, neuromuscular transmission and muscle. Dysmetria is an amplitude error when reaching a target, often involving cerebellar networks; it is not synonymous with bradykinesia. Educational cases should compare initiation, speed, accuracy, strength, tone and context. Clinical examination and diagnosis require professional assessment; classroom examples are not instructions to test patients independently.",
        "KZ": "Әлсіздік — күш өндіру қабілетінің төмендеуі; оны бағалауда төмендеуші жолдарды, төменгі мотонейронды, жүйке-бұлшықет берілісін және бұлшықетті бөлек қарастыру қажет. Дисметрия — нысанаға жеткенде амплитуданың қате болуы; ол көбіне мишық желілерімен байланысты және брадикинезияға тең емес. Оқу жағдайында қозғалыстың басталуын, жылдамдығын, дәлдігін, күшін, тонусын және мәнмәтінін салыстыру керек. Нақты тексеру мен диагноз маман бағалауын талап етеді; оқу мысалдары науқастарға өз бетінше сынақ жасау нұсқауы емес."
      }
    ]
  },
  {
    "id": "evidence-model-and-source-limits",
    "heading": {
      "RU": "Пределы учебной модели и чтение источников",
      "EN": "Limits of the model and of the sources",
      "KZ": "Оқу үлгісі мен дереккөздердің шектеулері"
    },
    "paragraphs": [
      {
        "RU": "Прямой и непрямой пути объясняют знак отдельных синаптических влияний, но не полностью предсказывают поведение человека. Необходимо отличать установленную анатомическую связь от гипотезы о выборе действия и от результата конкретной симуляции. В старых изданиях учебников встречаются обобщения о «тормозном дофамине» или простом включении и выключении движения; их нельзя переносить на все D1/D2-популяции. Проверяйте, указаны ли ядро, рецептор, исходные условия и измеряемая величина.",
        "EN": "Direct and indirect pathways clarify signs of individual synaptic influences but do not fully predict human behavior. Distinguish established anatomical connections from hypotheses about action selection and from outputs of a particular simulation. Older textbook editions sometimes generalize about 'inhibitory dopamine' or simple movement on/off switches; such claims must not be extended to every D1/D2 population. Check whether the nucleus, receptor, baseline conditions and measured outcome are specified.",
        "KZ": "Тікелей және жанама жолдар жеке синапстық әсерлердің бағытын түсіндіреді, бірақ адамның мінез-құлқын толық болжай алмайды. Дәлелденген анатомиялық байланысты, әрекет таңдау туралы гипотезаны және нақты симуляция нәтижесін ажырату қажет. Ескі оқулықтарда «тежеуші дофамин» немесе қозғалысты жай ғана қосып-өшіру туралы жалпылаулар кездеседі; оларды барлық D1/D2 нейрондарына қолдануға болмайды. Ядро, рецептор, бастапқы жағдай және өлшенетін көрсеткіш көрсетілгенін тексеріңіз."
      },
      {
        "RU": "Для этой главы сопоставлены Guyton & Hall, 13-е изд., глава 57 (печатные с. 730–735), Ganong, 23-е изд., глава 16 (с. 250–254) и C. L. Ghai, 8-е изд., раздел о двигательной системе (с. 285–287). Первые два источника объясняют корково-подкорковые контуры; третий помогает отличать планирование движения от конечного общего пути мотонейрона. Эти издания не заменяют современные клинические руководства, а приведённые страницы — ориентир для проверки механизма, не основание для самостоятельной диагностики или лечения.",
        "EN": "This chapter was cross-checked against Guyton & Hall, 13th ed., chapter 57 (printed pp. 730–735), Ganong, 23rd ed., chapter 16 (pp. 250–254), and C. L. Ghai, 8th ed., motor-system section (pp. 285–287). The first two explain cortico-subcortical loops; the third helps distinguish movement planning from the motor neuron's final common pathway. These editions do not replace current clinical guidance, and the page references support mechanism checking, not independent diagnosis or treatment.",
        "KZ": "Бұл тарау Guyton & Hall 13-басылымының 57-тарауымен (баспа 730–735-б.), Ganong 23-басылымының 16-тарауымен (250–254-б.) және C. L. Ghai 8-басылымының қозғалыс жүйесі бөлімімен (285–287-б.) салыстырылды. Алғашқы екі дереккөз қыртыс-қыртысасты контурларын, үшіншісі қозғалысты жоспарлау мен мотонейронның соңғы ортақ жолының айырмасын түсіндіреді. Бұл басылымдар қазіргі клиникалық нұсқаулықтарды алмастырмайды; бет сілтемелері тетікті тексеруге арналған, өз бетінше диагноз қоюға не емдеуге негіз емес."
      }
    ]
  }
];

export function createModuleTwelveTheory(
  language: Language,
  base: Lesson & { kind: "theory" }
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
          text: paragraph[language]
        }))
      }))
    ]
  };
}
