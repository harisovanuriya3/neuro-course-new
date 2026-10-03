import { modules, type Language } from "./course";
import { topics } from "./course-foundation/topics";

type Localized = Record<Language, string>;

export type VirtualPatientStage = {
  id: string;
  title: string;
  situation: string;
  mentorPrompt: string;
  task: string;
  newData: string;
  mechanism: string;
  options: [
    { id: string; text: string; response: string; feedback: string },
    { id: string; text: string; response: string; feedback: string },
    { id: string; text: string; response: string; feedback: string },
  ];
  correctOption: number;
};

export type VirtualPatientScenario = {
  moduleId: number;
  title: string;
  patient: string;
  profile: string;
  opening: string;
  syntheticNote: string;
  stages: VirtualPatientStage[];
  mechanismSummary: string;
};

type Seed = {
  moduleId: number;
  profile: Localized;
  opening: Localized;
  exam: Localized;
  investigation: Localized;
  conclusion: Localized;
};

const l = (RU: string, EN: string, KZ: string): Localized => ({ RU, EN, KZ });

const seeds: Seed[] = [
  { moduleId: 1, profile: l("Женщина, 42 года, офисный сотрудник", "Woman, 42, office worker", "42 жастағы әйел, кеңсе қызметкері"), opening: l("По ночам немеют большой, указательный и средний пальцы правой кисти; иногда трудно удерживать мелкие предметы.", "At night, the right thumb, index, and middle fingers become numb; small objects are sometimes difficult to hold.", "Түнде оң қолдың бас бармағы, сұқ және ортаңғы саусақтары ұйиды; кейде ұсақ заттарды ұстау қиындайды."), exam: l("Чувствительность снижена в I–III пальцах, V палец сохранён; сила мышц тенара слегка снижена.", "Sensation is reduced in digits I–III, digit V is spared, and thenar strength is mildly reduced.", "I–III саусақтардың сезімталдығы төмендеген, V саусақ сақталған, тенар бұлшықеттерінің күші сәл төмендеген."), investigation: l("Исследование проводимости срединного нерва через запястье выявляет замедление; данные нужно сопоставить с клинической картиной.", "Median-nerve conduction across the wrist is slowed; the result must be interpreted with the clinical pattern.", "Білек деңгейінде ортаңғы жүйкенің өткізгіштігі баяулаған; нәтижені клиникалық көрініспен салыстыру қажет."), conclusion: l("Рабочая локализация — компрессия срединного нерва на уровне запястья; это учебный случай, а не индивидуальное заключение.", "The working localization is median-nerve compression at the wrist; this is a teaching case, not an individual diagnosis.", "Жұмыс локализациясы — білек деңгейіндегі ортаңғы жүйкенің қысылуы; бұл жеке диагноз емес, оқу жағдайы.") },
  { moduleId: 2, profile: l("Доброволец, 24 года, участник учебного исследования", "Volunteer, 24, in a teaching study", "24 жастағы ерікті, оқу зерттеуінің қатысушысы"), opening: l("Во время регистрации ЭЭГ амплитуда сигнала меняется после открывания глаз.", "During EEG recording, signal amplitude changes after the eyes are opened.", "ЭЭГ тіркеу кезінде көзді ашқаннан кейін сигнал амплитудасы өзгереді."), exam: l("Повторение пробы воспроизводит изменение, но движение век добавляет артефакт.", "Repeating the task reproduces the change, while eyelid movement adds an artifact.", "Сынаманы қайталау өзгерісті қайта көрсетеді, ал қабақ қозғалысы артефакт қосады."), investigation: l("Сравнивают одинаковые эпохи записи, контроль артефактов и несколько повторов условия.", "Matched recording epochs, artifact control, and repeated trials are compared.", "Бірдей жазба кезеңдері, артефакт бақылауы және бірнеше қайталау салыстырылады."), conclusion: l("Наблюдение поддерживает реактивность ритма, но не позволяет делать клинический вывод по одной записи.", "The observation supports rhythm reactivity but does not justify a clinical conclusion from one trace.", "Бақылау ырғақ реактивтілігін қолдайды, бірақ бір жазба бойынша клиникалық қорытынды жасауға болмайды.") },
  { moduleId: 3, profile: l("Студент, 20 лет, участник демонстрации", "Student, 20, in a demonstration", "20 жастағы студент, көрсетілім қатысушысы"), opening: l("После краткого локального раздражения нервной ткани ответ зависит от состояния окружающих клеток.", "After brief local stimulation of neural tissue, the response depends on the state of surrounding cells.", "Жүйке тінін қысқа жергілікті тітіркендіргеннен кейін жауап айналадағы жасушалардың күйіне тәуелді."), exam: l("При нарушении ионного и метаболического окружения нейрональная активность становится менее устойчивой.", "When ionic and metabolic support is disturbed, neuronal activity becomes less stable.", "Иондық және метаболикалық орта бұзылғанда нейрондық белсенділік тұрақсызданады."), investigation: l("Сравнивают нейрональный ответ при неизменной и изменённой поддержке нейроглии.", "Neuronal responses are compared with stable versus altered glial support.", "Нейрон жауабы нейроглия қолдауы тұрақты және өзгерген жағдайда салыстырылады."), conclusion: l("Нейрон функционирует в микросреде, которую совместно поддерживают разные типы глии.", "A neuron functions within a microenvironment jointly maintained by several glial cell types.", "Нейрон әртүрлі глия жасушалары бірге сақтайтын микроортада қызмет етеді.") },
  { moduleId: 4, profile: l("Доброволец, 22 года, учебная электрофизиология", "Volunteer, 22, teaching electrophysiology", "22 жастағы ерікті, оқу электрофизиологиясы"), opening: l("При постепенном усилении стимула ответ появляется только после достижения порога.", "As stimulus strength increases, a response appears only after threshold is reached.", "Тітіркендіргіш күшейгенде жауап тек табалдырыққа жеткеннен кейін пайда болады."), exam: l("Подпороговые воздействия не вызывают полноценного потенциала действия; надпороговый стимул вызывает стереотипный ответ.", "Subthreshold stimuli do not evoke a full action potential; a suprathreshold stimulus evokes a stereotyped response.", "Табалдырықтан төмен әсер толық әрекет потенциалын тудырмайды; табалдырықтан жоғары стимул стереотипті жауап туғызады."), investigation: l("Сопоставляют мембранный потенциал, порог и изменение проводимости ионных каналов.", "Membrane potential, threshold, and ion-channel conductance changes are compared.", "Мембраналық потенциал, табалдырық және иондық арналар өткізгіштігінің өзгеруі салыстырылады."), conclusion: l("Возбудимость определяется мембранными градиентами и динамикой потенциалзависимых каналов.", "Excitability depends on membrane gradients and voltage-gated channel dynamics.", "Қозғыштық мембраналық градиенттер мен потенциалға тәуелді арналар динамикасына байланысты.") },
  { moduleId: 5, profile: l("Доброволец, 25 лет, нервно-мышечная демонстрация", "Volunteer, 25, neuromuscular demonstration", "25 жастағы ерікті, жүйке-бұлшықет көрсетілімі"), opening: l("Нервный импульс зарегистрирован, но мышечный ответ уменьшается при нарушении высвобождения медиатора.", "The nerve impulse is recorded, but the muscle response falls when transmitter release is impaired.", "Жүйке импульсі тіркеледі, бірақ медиатор бөлінуі бұзылғанда бұлшықет жауабы төмендейді."), exam: l("Повторная стимуляция выявляет изменение эффективности передачи при сохранённом проведении по нерву.", "Repeated stimulation reveals altered transmission efficiency despite preserved nerve conduction.", "Қайталап тітіркендіру жүйке өткізгіштігі сақталғанымен, беріліс тиімділігінің өзгеруін көрсетеді."), investigation: l("Оценивают пресинаптический вход Ca²⁺, выделение медиатора и постсинаптический ответ.", "Presynaptic Ca²⁺ entry, transmitter release, and the postsynaptic response are assessed.", "Пресинапстық Ca²⁺ кіруі, медиатор бөлінуі және постсинапстық жауап бағаланады."), conclusion: l("Химическая передача требует согласованной работы пресинаптических и постсинаптических механизмов.", "Chemical transmission requires coordinated presynaptic and postsynaptic mechanisms.", "Химиялық берілу пресинапстық және постсинапстық тетіктердің үйлесімді жұмысын қажет етеді.") },
  { moduleId: 6, profile: l("Студент, 21 год, модель нейрональной интеграции", "Student, 21, neuronal-integration model", "21 жастағы студент, нейрондық интеграция моделі"), opening: l("Одинаковый возбуждающий вход иногда вызывает разряд, а иногда нет.", "The same excitatory input sometimes evokes a spike and sometimes does not.", "Бірдей қоздырушы кіріс кейде разряд тудырады, кейде тудырмайды."), exam: l("Результат меняется в зависимости от одновременного тормозного входа и временного интервала между сигналами.", "The result changes with concurrent inhibitory input and the timing between signals.", "Нәтиже қатар жүретін тежеуші кіріске және сигналдар арасындағы уақытқа байланысты өзгереді."), investigation: l("Сравнивают пространственную и временную суммацию ВПСП и ТПСП у порога.", "Spatial and temporal summation of EPSPs and IPSPs near threshold are compared.", "Табалдырық маңындағы ҚПСП мен ТПСП-ның кеңістіктік және уақыттық суммациясы салыстырылады."), conclusion: l("Выход нейрона определяется интеграцией множества входов, а не одним сигналом.", "Neuronal output reflects integration of multiple inputs rather than a single signal.", "Нейрон шығысы бір сигналмен емес, көптеген кірістердің интеграциясымен анықталады.") },
  { moduleId: 7, profile: l("Доброволец, 23 года, исследование рефлекса", "Volunteer, 23, reflex examination", "23 жастағы ерікті, рефлексті зерттеу"), opening: l("После сухожильного удара возникает краткий разгибательный ответ.", "A tendon tap produces a brief extension response.", "Сіңірді соққаннан кейін қысқа жазылу жауабы пайда болады."), exam: l("Ответ зависит от афферентного входа, сегментарной сети и активности мотонейронов.", "The response depends on afferent input, the segmental network, and motor-neuron activity.", "Жауап афференттік кіріске, сегменттік желіге және мотонейрон белсенділігіне тәуелді."), investigation: l("Сравнивают латентность, симметрию и изменение ответа при отвлекающем манёвре.", "Latency, symmetry, and response change during reinforcement are compared.", "Латенттілік, симметрия және күшейту маневрі кезіндегі жауап өзгерісі салыстырылады."), conclusion: l("Рефлекс — результат работы цепи и её модуляции, а не изолированного центра.", "A reflex is the output of a circuit and its modulation, not an isolated center.", "Рефлекс оқшау орталық емес, тізбек пен оның модуляциясының нәтижесі.") },
  { moduleId: 8, profile: l("Пациент учебного случая, 36 лет", "Teaching-case patient, 36", "36 жастағы оқу жағдайының пациенті"), opening: l("После ограниченного поражения спинного мозга изменились разные виды чувствительности ниже уровня очага.", "After a focal spinal lesion, different sensory modalities changed below the lesion.", "Жұлынның шектелген зақымынан кейін ошақтан төмен әртүрлі сезім түрлері өзгерді."), exam: l("Тонкое осязание и боль нарушены по-разному из-за различий хода и перекрёста путей.", "Fine touch and pain are affected differently because their pathways ascend and cross differently.", "Нәзік жанасу мен ауырсыну жолдардың өтуі және айқасуы әртүрлі болғандықтан бөлек бұзылған."), investigation: l("Картируют модальность, сторону и уровень дефицита и сопоставляют их с местом перекрёста.", "Modality, side, and level of deficit are mapped against the site of decussation.", "Тапшылықтың модальдігі, жағы және деңгейі айқасу орнымен салыстырылады."), conclusion: l("Локализация требует проследить путь сигнала и место его перекрёста.", "Localization requires tracing the signal pathway and its decussation.", "Локализация үшін сигнал жолын және оның айқасу орнын қадағалау керек.") },
  { moduleId: 9, profile: l("Пациент учебного случая, 31 год", "Teaching-case patient, 31", "31 жастағы оқу жағдайының пациенті"), opening: l("Растяжение мышцы вызывает выраженное сокращение агониста.", "Muscle stretch evokes a marked agonist contraction.", "Бұлшықет созылуы агонистің айқын жиырылуын туғызады."), exam: l("Одновременно активность антагониста уменьшается при сохранной реципрокной организации.", "Antagonist activity decreases concurrently when reciprocal organization is intact.", "Реципрокты ұйымдасу сақталғанда антагонист белсенділігі қатар төмендейді."), investigation: l("Оценивают Ia-афферент, мотонейронный пул и тормозный интернейрон.", "The Ia afferent, motor-neuron pool, and inhibitory interneuron are assessed.", "Ia-афферент, мотонейрон пулы және тежеуші интернейрон бағаланады."), conclusion: l("Спинальная регуляция сочетает возбуждение агониста и торможение антагониста.", "Spinal regulation combines agonist excitation with antagonist inhibition.", "Жұлындық реттелу агонист қозуын антагонист тежелуімен біріктіреді.") },
  { moduleId: 10, profile: l("Пациент учебного случая, 47 лет", "Teaching-case patient, 47", "47 жастағы оқу жағдайының пациенті"), opening: l("Уровень бодрствования колеблется, хотя первичные сенсорные реакции частично сохранены.", "Arousal fluctuates although primary sensory responses are partly preserved.", "Бастапқы сенсорлық жауаптар жартылай сақталғанымен, сергектік деңгейі ауытқиды."), exam: l("Реакция на комплексные стимулы зависит от восходящего активирующего влияния и состояния распределённых сетей.", "Responses to complex stimuli depend on ascending activating influence and distributed network state.", "Күрделі стимулдарға жауап жоғарылаушы белсендіруші ықпалға және таралған желілер күйіне тәуелді."), investigation: l("Сопоставляют стволовые рефлексы, дыхание, двигательные реакции и корковую активность.", "Brainstem reflexes, breathing, motor responses, and cortical activity are compared.", "Ми бағаны рефлекстері, тыныс, қозғалыс жауаптары және қыртыстық белсенділік салыстырылады."), conclusion: l("Стволовые системы поддерживают жизненно важные функции и участвуют в регуляции бодрствования вместе с другими сетями.", "Brainstem systems support vital functions and help regulate arousal together with other networks.", "Ми бағаны жүйелері өмірлік қызметтерді қолдап, басқа желілермен бірге сергектікті реттеуге қатысады.") },
  { moduleId: 11, profile: l("Пациент учебного случая, 39 лет", "Teaching-case patient, 39", "39 жастағы оқу жағдайының пациенті"), opening: l("Сила отдельного движения сохранена, но последовательность сложного действия нарушена.", "Strength for a single movement is preserved, but sequencing of a complex action is impaired.", "Жеке қимыл күші сақталған, бірақ күрделі әрекет реттілігі бұзылған."), exam: l("Простая команда выполняется лучше, чем целенаправленная серия движений.", "A simple command is performed better than a goal-directed movement sequence.", "Қарапайым бұйрық мақсатты қимылдар тізбегіне қарағанда жақсы орындалады."), investigation: l("Раздельно оценивают силу, планирование, запуск, коррекцию и сенсорную обратную связь.", "Strength, planning, initiation, correction, and sensory feedback are assessed separately.", "Күш, жоспарлау, бастау, түзету және сенсорлық кері байланыс бөлек бағаланады."), conclusion: l("Моторный контроль распределён между несколькими контурами и не сводится к мышечной силе.", "Motor control is distributed across several circuits and cannot be reduced to muscle strength.", "Қозғалысты басқару бірнеше контурға таралған және бұлшықет күшімен ғана шектелмейді.") },
  { moduleId: 12, profile: l("Пациент учебного случая, 58 лет", "Teaching-case patient, 58", "58 жастағы оқу жағдайының пациенті"), opening: l("Движения стали замедленными, начало шага требует больше времени.", "Movements have slowed, and initiating a step takes longer.", "Қимылдар баяулаған, қадамды бастауға көбірек уақыт керек."), exam: l("Выявляются брадикинезия и трудность автоматического запуска при относительной сохранности чувствительности.", "Bradykinesia and impaired automatic initiation are found with relative sensory preservation.", "Сезімталдық салыстырмалы сақталып, брадикинезия және автоматты бастаудың қиындауы анықталады."), investigation: l("Сопоставляют прямой и непрямой пути, дофаминергическую модуляцию и таламо-кортикальный выход.", "Direct and indirect pathways, dopaminergic modulation, and thalamocortical output are compared.", "Тікелей және жанама жолдар, дофаминдік модуляция және таламо-қыртыстық шығыс салыстырылады."), conclusion: l("Базальные ганглии участвуют в выборе и масштабировании действия через взаимодействующие контуры.", "The basal ganglia contribute to action selection and scaling through interacting circuits.", "Базальды ганглийлер өзара әрекеттесетін контурлар арқылы әрекетті таңдауға және мөлшерлеуге қатысады.") },
  { moduleId: 13, profile: l("Пациент учебного случая, 44 года", "Teaching-case patient, 44", "44 жастағы оқу жағдайының пациенті"), opening: l("При достижении цели рука отклоняется и затем делает несколько коррекций.", "When reaching for a target, the hand deviates and then makes several corrections.", "Нысанаға қол созғанда қол ауытқып, кейін бірнеше түзету жасайды."), exam: l("Сила достаточна, но точность, темп и согласование движений нарушены.", "Strength is adequate, but movement accuracy, timing, and coordination are impaired.", "Күш жеткілікті, бірақ қимыл дәлдігі, ырғағы және үйлесімі бұзылған."), investigation: l("Сравнивают намерение движения, сенсорную обратную связь и ошибку исполнения.", "Movement intention, sensory feedback, and execution error are compared.", "Қимыл ниеті, сенсорлық кері байланыс және орындау қатесі салыстырылады."), conclusion: l("Мозжечок участвует в прогнозировании и коррекции ошибки, а не создаёт движение изолированно.", "The cerebellum contributes to prediction and error correction rather than generating movement in isolation.", "Мишық қимылды жеке тудырмай, қатені болжауға және түзетуге қатысады.") },
  { moduleId: 14, profile: l("Пациент учебного случая, 50 лет", "Teaching-case patient, 50", "50 жастағы оқу жағдайының пациенті"), opening: l("Сенсорный сигнал достигает коры нестабильно и зависит от состояния внимания.", "A sensory signal reaches cortex inconsistently and depends on attentional state.", "Сенсорлық сигнал қыртысқа тұрақсыз жетіп, зейін күйіне тәуелді болады."), exam: l("Первичный вход сохранён, но его передача и корковая обработка меняются с состоянием сети.", "Primary input is preserved, but relay and cortical processing vary with network state.", "Бастапқы кіріс сақталған, бірақ оның берілуі мен қыртыстық өңделуі желі күйіне қарай өзгереді."), investigation: l("Оценивают релейные ядра, ретикулоталамическое влияние и кортико-таламическую обратную связь.", "Relay nuclei, reticulothalamic influence, and corticothalamic feedback are assessed.", "Релейлік ядролар, ретикулоталамустық ықпал және қыртыс-таламустық кері байланыс бағаланады."), conclusion: l("Таламус работает как часть динамических таламо-кортикальных контуров, а не пассивный переключатель.", "The thalamus operates within dynamic thalamocortical circuits rather than as a passive switch.", "Таламус пассивті ауыстырғыш емес, динамикалық таламо-қыртыстық контурлардың бөлігі ретінде жұмыс істейді.") },
  { moduleId: 15, profile: l("Доброволец, 28 лет, модель водного баланса", "Volunteer, 28, water-balance model", "28 жастағы ерікті, су теңгерімі моделі"), opening: l("После ограничения воды усилились жажда и концентрация мочи.", "After water restriction, thirst and urine concentration increased.", "Суды шектегеннен кейін шөлдеу және зәрдің қоюлануы артты."), exam: l("Изменение внутренней среды сопровождается сенсорными, вегетативными и эндокринными ответами.", "The internal-state change is accompanied by sensory, autonomic, and endocrine responses.", "Ішкі орта өзгерісі сенсорлық, вегетативтік және эндокриндік жауаптармен қатар жүреді."), investigation: l("Сопоставляют осмолярность, объём, жажду, вазопрессин и изменение водного выведения.", "Osmolality, volume, thirst, vasopressin, and water excretion are compared.", "Осмолярлық, көлем, шөлдеу, вазопрессин және судың шығарылуы салыстырылады."), conclusion: l("Гипоталамические сети координируют взаимосвязанные нервные, эндокринные и поведенческие ответы с обратной связью.", "Hypothalamic networks coordinate interacting neural, endocrine, and behavioral responses with feedback.", "Гипоталамустық желілер кері байланысы бар жүйкелік, эндокриндік және мінез-құлықтық жауаптарды үйлестіреді.") },
  { moduleId: 16, profile: l("Пациент учебного случая, 33 года", "Teaching-case patient, 33", "33 жастағы оқу жағдайының пациенті"), opening: l("Эмоционально значимый стимул меняет внимание, вегетативную реакцию и запоминание.", "An emotionally salient stimulus changes attention, autonomic response, and memory.", "Эмоциялық маңызды стимул зейінді, вегетативтік жауапты және есте сақтауды өзгертеді."), exam: l("Реакция зависит от контекста и взаимодействия нескольких лимбических и корковых сетей.", "The response depends on context and interaction among several limbic and cortical networks.", "Жауап контекстке және бірнеше лимбиялық әрі қыртыстық желілердің әрекеттесуіне тәуелді."), investigation: l("Раздельно оценивают эмоциональную значимость, контекст, мотивацию, память и автономный ответ.", "Emotional salience, context, motivation, memory, and autonomic response are assessed separately.", "Эмоциялық маңыз, контекст, мотивация, жад және автономдық жауап бөлек бағаланады."), conclusion: l("Лимбические функции возникают в распределённых контурах и не принадлежат одной структуре.", "Limbic functions emerge from distributed circuits rather than belonging to one structure.", "Лимбиялық қызметтер бір құрылымға тиесілі емес, таралған контурларда қалыптасады.") },
  { moduleId: 17, profile: l("Доброволец, 26 лет, обучение сигналу безопасности", "Volunteer, 26, safety-learning task", "26 жастағы ерікті, қауіпсіздік сигналын үйрену тапсырмасы"), opening: l("Ранее нейтральный сигнал вызывает выраженную реакцию ожидания угрозы.", "A previously neutral cue evokes a marked threat-expectancy response.", "Бұрын бейтарап белгі қауіп күту реакциясын туғызады."), exam: l("При повторении сигнала без неблагоприятного события реакция постепенно уменьшается, но может возвращаться в другом контексте.", "Repeated cue presentation without an adverse event gradually reduces the response, but it may return in another context.", "Белгіні жағымсыз оқиғасыз қайталау жауапты біртіндеп азайтады, бірақ басқа контексте ол қайта оралуы мүмкін."), investigation: l("Сравнивают приобретение, угасание, контекст и участие префронтально-гиппокампальных сетей.", "Acquisition, extinction, context, and prefrontal-hippocampal network contributions are compared.", "Игеру, сөну, контекст және префронталды-гиппокамптық желілер үлесі салыстырылады."), conclusion: l("Миндалина участвует в обучении эмоциональной значимости вместе с другими сетями.", "The amygdala contributes to learning emotional significance together with other networks.", "Амигдала басқа желілермен бірге эмоциялық маңыздылықты үйренуге қатысады.") },
  { moduleId: 18, profile: l("Пациент учебного случая, 46 лет", "Teaching-case patient, 46", "46 жастағы оқу жағдайының пациенті"), opening: l("После небольшого левополушарного коркового повреждения пациент стал затрудняться при назывании знакомых предметов, хотя понимает обращённую речь и самостоятельно выполняет привычные действия.", "After a small left-hemisphere cortical injury, the patient has difficulty naming familiar objects despite understanding spoken language and independently performing familiar actions.", "Сол жақ ми сыңары қыртысының шағын зақымынан кейін пациент таныс заттарды атауда қиналады, бірақ айтылған сөзді түсінеді және үйреншікті әрекеттерді өздігінен орындайды."), exam: l("При назывании десяти предметов допущено семь ошибок; простые движения правой рукой, различение прикосновения и узнавание самих предметов сохранены.", "Seven errors occur when naming ten objects; simple right-hand movements, touch discrimination, and recognition of the objects themselves are preserved.", "Он затты атағанда жеті қате жіберілді; оң қолдың қарапайым қимылдары, жанасуды ажырату және заттардың өзін тану сақталған."), investigation: l("При предъявлении смысловой подсказки правильно названы шесть из семи ранее пропущенных предметов; повторение отдельных слов и выполнение устных инструкций остаются сохранными.", "With a semantic cue, six of the seven previously missed objects are named correctly; single-word repetition and following spoken commands remain intact.", "Мағыналық ишара берілгенде бұрын аталмаған жеті заттың алтауы дұрыс аталды; жеке сөздерді қайталау және ауызша нұсқауды орындау сақталған."), conclusion: l("Сочетание избирательного нарушения называния с сохранными движением, чувствительностью и пониманием указывает на вклад специализированного участка в распределённую языковую сеть, а не на утрату всей функции одним изолированным центром.", "Selective naming impairment with preserved movement, sensation, and comprehension indicates the contribution of a specialized region within a distributed language network rather than loss of the whole function from one isolated center.", "Қозғалыс, сезімталдық және түсіну сақталып, атаудың таңдамалы бұзылуы маманданған аймақтың таралған тілдік желіге қосатын үлесін көрсетеді; бұл бүкіл қызметтің бір оқшау орталықтан жоғалуын білдірмейді.") },
  { moduleId: 19, profile: l("Пациент учебного случая, 37 лет", "Teaching-case patient, 37", "37 жастағы оқу жағдайының пациенті"), opening: l("Лёгкое касание распознаётся, но локализация и различение двух точек ухудшены.", "Light touch is detected, but localization and two-point discrimination are impaired.", "Жеңіл жанасу сезіледі, бірақ оны локализациялау және екі нүктені ажырату нашарлаған."), exam: l("Разные соматосенсорные модальности и размеры рецептивных полей дают неодинаковый результат.", "Different somatosensory modalities and receptive-field sizes yield different results.", "Әртүрлі соматосенсорлық модальдіктер мен рецептивтік өріс өлшемдері әртүрлі нәтиже береді."), investigation: l("Картируют прикосновение, вибрацию, проприоцепцию, температуру и ноцицепцию раздельно.", "Touch, vibration, proprioception, temperature, and nociception are mapped separately.", "Жанасу, діріл, проприоцепция, температура және ноцицепция бөлек картаға түсіріледі."), conclusion: l("Ощущение зависит от рецептора, пути и центральной обработки; боль не тождественна ноцицепции.", "Sensation depends on receptor, pathway, and central processing; pain is not identical to nociception.", "Сезім рецепторға, жолға және орталық өңдеуге тәуелді; ауырсыну ноцицепциямен бірдей емес.") },
  { moduleId: 20, profile: l("Пациент учебного случая, 41 год", "Teaching-case patient, 41", "41 жастағы оқу жағдайының пациенті"), opening: l("Часть поля зрения выпадает, хотя острота центрального зрения относительно сохранена.", "Part of the visual field is missing although central visual acuity is relatively preserved.", "Орталық көру өткірлігі салыстырмалы сақталғанымен, көру өрісінің бір бөлігі түскен."), exam: l("Распределение дефекта помогает отличить поражение сетчатки, зрительного нерва, хиазмы и ретрохиазмальных путей.", "The defect pattern helps distinguish retinal, optic-nerve, chiasmal, and retrochiasmal lesions.", "Ақау үлгісі торқабық, көру жүйкесі, хиазма және хиазмадан кейінгі жол зақымдарын ажыратуға көмектеседі."), investigation: l("Сопоставляют поля зрения, зрачковые реакции, остроту, цветоощущение и глазное дно.", "Visual fields, pupillary responses, acuity, color vision, and fundus findings are compared.", "Көру өрістері, қарашық жауаптары, өткірлік, түсті көру және көз түбі салыстырылады."), conclusion: l("Локализация зрительного нарушения требует связать характер дефекта с анатомией пути.", "Visual localization requires linking the defect pattern to pathway anatomy.", "Көру бұзылысын локализациялау үшін ақау сипатын жол анатомиясымен байланыстыру керек.") },
  { moduleId: 21, profile: l("Пациент учебного случая, 29 лет", "Teaching-case patient, 29", "29 жастағы оқу жағдайының пациенті"), opening: l("После изменения одного сенсорного входа равновесие ухудшилось сильнее в темноте.", "After one sensory input changed, balance worsened more in darkness.", "Бір сенсорлық кіріс өзгергеннен кейін тепе-теңдік қараңғыда көбірек нашарлады."), exam: l("Зрительная компенсация помогает при открытых глазах, а вестибулярные и проприоцептивные сигналы требуют отдельной проверки.", "Visual compensation helps with eyes open, while vestibular and proprioceptive signals require separate testing.", "Көз ашық кезде көру компенсациясы көмектеседі, ал вестибулярлық және проприоцептивтік сигналдарды бөлек тексеру керек."), investigation: l("Сравнивают воздушную и костную проводимость, вестибулярные пробы и вклад зрения и проприоцепции.", "Air and bone conduction, vestibular tests, and visual and proprioceptive contributions are compared.", "Ауа және сүйек өткізгіштігі, вестибулярлық сынамалар, көру мен проприоцепция үлесі салыстырылады."), conclusion: l("Специальные сенсорные системы используют разные рецепторы, но все преобразуют стимул в нервный сигнал.", "Special senses use different receptors, but all transduce stimuli into neural signals.", "Арнайы сезім жүйелері әртүрлі рецепторларды қолданады, бірақ бәрі стимулды жүйкелік сигналға түрлендіреді.") },
  { moduleId: 22, profile: l("Доброволец, 34 года, автономная проба", "Volunteer, 34, autonomic test", "34 жастағы ерікті, автономдық сынама"), opening: l("При вставании кратковременно меняются давление и частота сердечных сокращений.", "On standing, blood pressure and heart rate change briefly.", "Орнынан тұрғанда қан қысымы мен жүрек жиілігі қысқа уақытқа өзгереді."), exam: l("Ответ включает сенсорный вход, центральную интеграцию и симпатические и парасимпатические эффекты.", "The response includes sensory input, central integration, and sympathetic and parasympathetic effects.", "Жауап сенсорлық кірісті, орталық интеграцияны және симпатикалық әрі парасимпатикалық әсерлерді қамтиды."), investigation: l("Сопоставляют давление, пульс, время ответа и влияние на разные органы-мишени.", "Pressure, pulse, response timing, and effects on different target organs are compared.", "Қысым, пульс, жауап уақыты және әртүрлі нысана-мүшелерге әсері салыстырылады."), conclusion: l("Автономная регуляция использует многоуровневые нервные контуры; энтеральные сети также обладают собственной регуляцией.", "Autonomic regulation uses multilevel neural circuits; enteric networks also have intrinsic regulatory capacity.", "Вегетативтік реттелу көпдеңгейлі жүйкелік контурларды қолданады; энтеральдық желілердің де өзіндік реттелуі бар.") },
  { moduleId: 23, profile: l("Студент, 20 лет, учебная задача на память", "Student, 20, memory task", "20 жастағы студент, жад тапсырмасы"), opening: l("Список слов воспроизводится сразу, но часть материала теряется после интерференции.", "A word list is recalled immediately, but some material is lost after interference.", "Сөздер тізімі бірден еске түседі, бірақ интерференциядан кейін материалдың бір бөлігі жоғалады."), exam: l("Подсказка улучшает воспроизведение, а узнавание оказывается лучше свободного припоминания.", "A cue improves retrieval, and recognition is better than free recall.", "Ишара еске түсіруді жақсартады, ал тану еркін еске түсіруден жақсы."), investigation: l("Раздельно проверяют кодирование, удержание, извлечение, внимание и влияние интерференции.", "Encoding, retention, retrieval, attention, and interference are tested separately.", "Кодтау, сақтау, қайта шығару, зейін және интерференция ықпалы бөлек тексеріледі."), conclusion: l("Результат памяти отражает несколько процессов и распределённых систем, а не единый склад информации.", "Memory performance reflects several processes and distributed systems, not a single storage site.", "Жад нәтижесі бір ақпарат қоймасын емес, бірнеше үдеріс пен таралған жүйелерді көрсетеді.") },
  { moduleId: 24, profile: l("Доброволец, 27 лет, дневник сна", "Volunteer, 27, sleep diary", "27 жастағы ерікті, ұйқы күнделігі"), opening: l("После нескольких поздних засыпаний утром выражена сонливость, а в выходной время сна смещается.", "After several late bedtimes, morning sleepiness is marked and sleep timing shifts on the weekend.", "Бірнеше кеш ұйықтаудан кейін таңертең ұйқышылдық айқын, демалыста ұйқы уақыты ығысады."), exam: l("Картина зависит и от накопленного давления сна, и от циркадной фазы.", "The pattern depends on both accumulated sleep pressure and circadian phase.", "Көрініс жиналған ұйқы қысымына да, циркадтық фазаға да тәуелді."), investigation: l("Сопоставляют дневник сна, освещённость, время активности и стадии сна; один показатель недостаточен.", "Sleep diary, light exposure, activity timing, and sleep stages are compared; one measure is insufficient.", "Ұйқы күнделігі, жарық әсері, белсенділік уақыты және ұйқы сатылары салыстырылады; бір көрсеткіш жеткіліксіз."), conclusion: l("Сон регулируется взаимодействием гомеостатических, циркадных и нейрогуморальных процессов.", "Sleep is regulated by interacting homeostatic, circadian, and neurohumoral processes.", "Ұйқы гомеостатикалық, циркадтық және нейрогуморальдық үдерістердің өзара әрекетімен реттеледі.") },
  { moduleId: 25, profile: l("Пациент учебного случая, 52 года, этап восстановления", "Teaching-case patient, 52, rehabilitation phase", "52 жастағы оқу жағдайының пациенті, қалпына келу кезеңі"), opening: l("Повторная тренировка улучшает выполнение знакомой задачи, но перенос на новую задачу неполон.", "Repeated training improves a practiced task, but transfer to a new task is incomplete.", "Қайталап жаттығу таныс тапсырманы жақсартады, бірақ жаңа тапсырмаға көшіру толық емес."), exam: l("Динамика зависит от дозы практики, обратной связи, сложности и исходного состояния сети.", "Change depends on practice dose, feedback, task difficulty, and the network's baseline state.", "Өзгеріс жаттығу мөлшеріне, кері байланысқа, тапсырма күрделілігіне және желінің бастапқы күйіне тәуелді."), investigation: l("Сравнивают исходный уровень, кривую обучения, удержание результата и перенос.", "Baseline, learning curve, retention, and transfer are compared.", "Бастапқы деңгей, үйрену қисығы, нәтижені сақтау және көшіру салыстырылады."), conclusion: l("Нейропластичность зависит от опыта и контекста; улучшение одной задачи не доказывает общее восстановление.", "Neuroplasticity is experience- and context-dependent; improvement on one task does not prove general recovery.", "Нейропластикалылық тәжірибе мен контекстке тәуелді; бір тапсырманың жақсаруы жалпы қалпына келуді дәлелдемейді.") },
];

/*
 * Six decisions are authored for every case.  They deliberately live in data
 * (rather than in the React component) so a case can be reviewed as a coherent
 * physiological investigation.  Alternatives at a stage are other plausible
 * decisions from the same case, not generic "right/wrong" placeholders.
 */
const decisions = (...items: Localized[]) => items;
const caseDecisions: Record<number, Localized[]> = {
  1: decisions(
    l("Уточнить ночное усиление и распределение онемения по пальцам", "Clarify nocturnal worsening and the sensory distribution across digits", "Түнгі күшеюді және саусақтардағы ұюдың таралуын нақтылау"),
    l("Сравнить чувствительность I–III и V пальцев и силу тенара", "Compare sensation in digits I–III versus V and test thenar strength", "I–III және V саусақ сезімталдығын және тенар күшін салыстыру"),
    l("Проверить локализацию срединного нерва на уровне запястья", "Test median-nerve localization at the wrist", "Ортаңғы жүйкенің білек деңгейіндегі локализациясын тексеру"),
    l("Сравнить проводимость срединного и локтевого нервов через запястье", "Compare median and ulnar conduction across the wrist", "Білек арқылы ортаңғы және шынтақ жүйкелерінің өткізгіштігін салыстыру"),
    l("Связать распределение дефицита с замедлением проводимости", "Link the deficit distribution to slowed conduction", "Тапшылықтың таралуын өткізгіштіктің баяулауымен байланыстыру"),
    l("Объяснить компрессионную демиелинизацию без превращения случая в диагноз", "Explain compressive demyelination without treating the case as a diagnosis", "Жағдайды диагнозға айналдырмай, компрессиялық демиелинизацияны түсіндіру")),
  2: decisions(
    l("Выбрать чистые 10-секундные эпохи с закрытыми и открытыми глазами", "Select clean 10-second eyes-closed and eyes-open epochs", "Көз жұмылған және ашық таза 10 секундтық дәуірлерді таңдау"),
    l("Проверить затылочный альфа-ритм в референтном и биполярном монтажах", "Check occipital alpha in referential and bipolar montages", "Шүйделік альфа-ырғақты референттік және биполярлық монтаждарда тексеру"),
    l("Сопоставить фронтальную медленную волну с каналом движений глаз", "Compare the frontal slow wave with the eye-movement channel", "Маңдайлық баяу толқынды көз қозғалысы арнасымен салыстыру"),
    l("Повторить пробу открывания глаз после исключения мигания", "Repeat eye opening after excluding blink-contaminated epochs", "Жыпылықтауы бар дәуірлерді алып тастап, көз ашу сынамасын қайталау"),
    l("Оценить воспроизводимое подавление альфа, а не одну амплитуду", "Assess reproducible alpha attenuation rather than one amplitude value", "Бір амплитуданы емес, альфаның қайталанатын бәсеңдеуін бағалау"),
    l("Разделить реактивность ритма, артефакт и клиническую интерпретацию", "Separate rhythm reactivity, artifact, and clinical interpretation", "Ырғақ реактивтілігін, артефактты және клиникалық түсіндіруді ажырату")),
  3: decisions(
    l("Уточнить, меняется ли ответ при накоплении внеклеточного K⁺", "Determine whether the response changes as extracellular K⁺ accumulates", "Жасушадан тыс K⁺ жиналғанда жауап өзгеретінін анықтау"),
    l("Сравнить активность нейрона при сохранной и нарушенной глиальной поддержке", "Compare neuronal activity with intact versus impaired glial support", "Глия қолдауы сақталған және бұзылған кездегі нейрон белсенділігін салыстыру"),
    l("Связать нестабильность с ионным и метаболическим микроокружением", "Link instability to the ionic and metabolic microenvironment", "Тұрақсыздықты иондық және метаболикалық микроортамен байланыстыру"),
    l("Изменить глиальный захват K⁺ при одинаковой стимуляции", "Alter glial K⁺ uptake while holding stimulation constant", "Стимуляцияны өзгертпей, глиялық K⁺ қармауын өзгерту"),
    l("Отделить нейрональный дефект от изменения окружающих клеток", "Distinguish a neuronal defect from altered surrounding cells", "Нейрон ақауын қоршаған жасушалар өзгерісінен ажырату"),
    l("Объяснить совместную роль астроцитов, олигодендроцитов и микроглии", "Explain the complementary roles of astrocytes, oligodendrocytes, and microglia", "Астроциттер, олигодендроциттер және микроглияның бірлескен рөлін түсіндіру")),
  4: decisions(
    l("Записать исходный Vm −70 мВ и менять стимул малыми шагами", "Record baseline Vm at −70 mV and increase stimulus in small steps", "Бастапқы Vm −70 мВ жазып, стимулды шағын қадаммен арттыру"),
    l("Сравнить ответы при −58, −55 и −50 мВ", "Compare responses at −58, −55, and −50 mV", "−58, −55 және −50 мВ кезіндегі жауаптарды салыстыру"),
    l("Определить порог около −55 мВ и принцип «всё или ничего»", "Identify the approximately −55 mV threshold and all-or-none behavior", "Шамамен −55 мВ табалдырықты және «бәрі не ештеңе» қағидасын анықтау"),
    l("Повторить надпороговый стимул разной силы и сравнить высоту ПД", "Repeat suprathreshold stimuli of different strength and compare spike height", "Әртүрлі күшті табалдырықтан жоғары стимулдарда ӘП биіктігін салыстыру"),
    l("Связать восходящую фазу с Na⁺-, а реполяризацию с K⁺-проводимостью", "Link the upstroke to Na⁺ conductance and repolarization to K⁺ conductance", "Өрлеу фазасын Na⁺, реполяризацияны K⁺ өткізгіштігімен байланыстыру"),
    l("Объяснить, почему сила надпорогового стимула кодируется частотой, а не высотой ПД", "Explain why suprathreshold strength is encoded by firing rate rather than spike height", "Табалдырықтан жоғары күш неге ӘП биіктігімен емес, жиілікпен кодталатынын түсіндіру")),
  5: decisions(
    l("Подтвердить сохранность потенциала действия в двигательном аксоне", "Confirm preservation of the motor-axon action potential", "Қозғалтқыш аксондағы әрекет потенциалының сақталуын растау"),
    l("Сравнить концевой потенциал и мышечный ответ при повторной стимуляции", "Compare end-plate potential and muscle response during repetitive stimulation", "Қайталап стимуляцияда соңғы пластинка потенциалы мен бұлшықет жауабын салыстыру"),
    l("Проверить пресинаптический вход Ca²⁺ и квантовый выброс медиатора", "Test presynaptic Ca²⁺ entry and quantal transmitter release", "Пресинапстық Ca²⁺ кіруін және медиатордың кванттық бөлінуін тексеру"),
    l("Сопоставить эффект изменения Ca²⁺ с блокадой постсинаптических рецепторов", "Compare altered Ca²⁺ effects with postsynaptic receptor blockade", "Ca²⁺ өзгерісінің әсерін постсинапстық рецепторлар бөгелуімен салыстыру"),
    l("Локализовать снижение передачи пре- или постсинаптически", "Localize reduced transmission to the pre- or postsynaptic side", "Берілудің төмендеуін пре- немесе постсинапстық деңгейде локализациялау"),
    l("Объяснить последовательность ПД—Ca²⁺—экзоцитоз—рецептор—ответ", "Explain the AP–Ca²⁺–exocytosis–receptor–response sequence", "ӘП—Ca²⁺—экзоцитоз—рецептор—жауап тізбегін түсіндіру")),
  6: decisions(
    l("Зафиксировать интервалы возбуждающих и тормозных входов", "Record the timing of excitatory and inhibitory inputs", "Қоздырушы және тежеуші кірістердің аралықтарын тіркеу"),
    l("Сравнить одиночный ВПСП с серией ВПСП у порога", "Compare one EPSP with an EPSP train near threshold", "Бір ҚПСП-ны табалдырық маңындағы ҚПСП сериясымен салыстыру"),
    l("Различить временную и пространственную суммацию", "Distinguish temporal from spatial summation", "Уақыттық және кеңістіктік суммацияны ажырату"),
    l("Добавить ТПСП до и после возбуждающего входа", "Add an IPSP before versus after the excitatory input", "ТПСП-ны қоздырушы кірістен бұрын және кейін қосу"),
    l("Предсказать разряд по сумме входов в аксонном холмике", "Predict firing from the summed inputs at the axon initial segment", "Аксонның бастапқы сегментіндегі кірістер қосындысынан разрядты болжау"),
    l("Объяснить выход нейрона интеграцией, а не одним входом", "Explain neuronal output by integration rather than a single input", "Нейрон шығысын бір кіріспен емес, интеграциямен түсіндіру")),
  7: decisions(
    l("Измерить латентность коленного рефлекса справа и слева", "Measure patellar-reflex latency on both sides", "Тізе рефлексінің латенттілігін екі жақтан өлшеу"),
    l("Сравнить амплитуду, симметрию и эффект манёвра Ендрассика", "Compare amplitude, symmetry, and the Jendrassik effect", "Амплитуданы, симметрияны және Ендрассик маневрінің әсерін салыстыру"),
    l("Проверить афферент Ia, сегмент L2–L4 и эфферент мотонейрона", "Test the Ia afferent, L2–L4 segment, and motor efferent", "Ia-афферентті, L2–L4 сегментін және қозғалтқыш эфферентті тексеру"),
    l("Сопоставить сухожильный ответ с произвольной силой мышцы", "Compare the tendon response with voluntary muscle strength", "Сіңір жауабын ерікті бұлшықет күшімен салыстыру"),
    l("Локализовать асимметрию внутри всей рефлекторной дуги", "Localize asymmetry within the complete reflex arc", "Асимметрияны толық рефлекстік доға ішінде локализациялау"),
    l("Объяснить рефлекс как модулируемый контур, а не автономный центр", "Explain the reflex as a modulated circuit, not an autonomous center", "Рефлексті автономды орталық емес, модуляцияланатын контур ретінде түсіндіру")),
  8: decisions(
    l("Нанести на карту уровень и сторону выпадения каждой модальности", "Map the level and side of loss for each sensory modality", "Әр сезім модальдігінің жоғалу деңгейі мен жағын картаға түсіру"),
    l("Раздельно проверить вибрацию, тонкое осязание, боль и температуру", "Test vibration, fine touch, pain, and temperature separately", "Дірілді, нәзік жанасуды, ауырсынуды және температураны бөлек тексеру"),
    l("Учесть заднеканатиковый перекрёст в продолговатом мозге", "Account for dorsal-column crossing in the medulla", "Артқы баған жолының сопақша мида айқасуын ескеру"),
    l("Учесть сегментарный перекрёст спиноталамического пути", "Account for segmental crossing of the spinothalamic pathway", "Спиноталамустық жолдың сегменттік айқасуын ескеру"),
    l("Сопоставить правую слабость с двусторонним рисунком чувствительности", "Relate right-sided weakness to the bilateral sensory pattern", "Оң жақ әлсіздікті екі жақты сезімталдық үлгісімен байланыстыру"),
    l("Назвать сторону и уровень очага с указанием ограничений", "State lesion side and level while acknowledging limits", "Ошақтың жағы мен деңгейін шектеулерімен бірге көрсету")),
  9: decisions(
    l("Измерить ответ на стандартизированное растяжение мышцы", "Measure the response to standardized muscle stretch", "Стандартталған бұлшықет созылуына жауапты өлшеу"),
    l("Одновременно записать активность агониста и антагониста", "Record agonist and antagonist activity simultaneously", "Агонист пен антагонист белсенділігін бір мезгілде жазу"),
    l("Выделить Ia-афферент, мотонейрон и тормозный интернейрон", "Identify the Ia afferent, motor neuron, and inhibitory interneuron", "Ia-афферентті, мотонейронды және тежеуші интернейронды ажырату"),
    l("Изменить растяжение при неизменном произвольном усилии", "Vary stretch while keeping voluntary effort constant", "Ерікті күшті өзгертпей, созылуды өзгерту"),
    l("Проверить реципрокное торможение антагониста", "Test reciprocal inhibition of the antagonist", "Антагонистің реципрокты тежелуін тексеру"),
    l("Объяснить координацию сегментарной сетью", "Explain coordination by the segmental network", "Үйлесуді сегменттік желі арқылы түсіндіру")),
  10: decisions(
    l("Проследить колебания бодрствования и дыхания во времени", "Track fluctuations in arousal and breathing over time", "Сергектік пен тыныс ауытқуын уақыт бойынша бақылау"),
    l("Проверить зрачковые, корнеальные и глоточные рефлексы", "Test pupillary, corneal, and gag reflexes", "Қарашық, қасаң қабық және жұтыну рефлекстерін тексеру"),
    l("Разделить первичную сенсорную проводимость и активацию коры", "Separate primary sensory conduction from cortical activation", "Бастапқы сенсорлық өткізуді қыртыс белсенуінен ажырату"),
    l("Сопоставить стволовые ответы с ЭЭГ и двигательными реакциями", "Compare brainstem responses with EEG and motor behavior", "Ми бағаны жауаптарын ЭЭГ және қозғалыс реакцияларымен салыстыру"),
    l("Оценить распределённую сеть бодрствования, а не одну точку", "Assess the distributed arousal network rather than one point", "Сергектіктің бір нүктесін емес, таралған желісін бағалау"),
    l("Объяснить совместную регуляцию жизненных функций и бодрствования", "Explain joint regulation of vital functions and arousal", "Өмірлік қызметтер мен сергектіктің бірлескен реттелуін түсіндіру")),
  11: decisions(
    l("Разделить силу одиночного движения и последовательность действия", "Separate single-movement strength from action sequencing", "Жеке қозғалыс күшін әрекет ретінен ажырату"),
    l("Сравнить самопроизвольное действие, подражание и действие по команде", "Compare spontaneous, imitated, and commanded actions", "Өздігінен, еліктеп және нұсқаумен орындалатын әрекеттерді салыстыру"),
    l("Проверить планирование, инициацию и сенсорную коррекцию", "Test planning, initiation, and sensory correction", "Жоспарлауды, бастауды және сенсорлық түзетуді тексеру"),
    l("Изменить сенсорную подсказку при одинаковой силовой задаче", "Vary sensory cueing while keeping force demand constant", "Күш талабы бірдей кезде сенсорлық ишараны өзгерту"),
    l("Связать ошибку последовательности с распределённым моторным контуром", "Link sequencing error to the distributed motor circuit", "Рет қатесін таралған қозғалтқыш контурмен байланыстыру"),
    l("Объяснить движение взаимодействием коры, подкорковых узлов и обратной связи", "Explain movement through cortex, subcortical loops, and feedback", "Қозғалысты қыртыс, қыртысасты ілмектер және кері байланыс арқылы түсіндіру")),
  12: decisions(
    l("Различить брадикинезию, слабость и нарушение координации", "Distinguish bradykinesia, weakness, and incoordination", "Брадикинезияны, әлсіздікті және үйлесімсіздікті ажырату"),
    l("Сравнить начало движения и выполнение уже начатого движения", "Compare movement initiation with execution after initiation", "Қозғалысты бастауды басталған қозғалысты орындаумен салыстыру"),
    l("Проследить прямой путь через D1 и непрямой путь через D2", "Trace the direct D1 and indirect D2 pathways", "D1 арқылы тікелей және D2 арқылы жанама жолды қадағалау"),
    l("Предсказать влияние дофамина на выход внутреннего сегмента", "Predict dopamine's effect on internal-segment output", "Дофаминнің ішкі сегмент шығысына әсерін болжау"),
    l("Связать усиленное торможение таламуса с гипокинезией", "Link excessive thalamic inhibition to hypokinesia", "Таламустың шамадан тыс тежелуін гипокинезиямен байланыстыру"),
    l("Объяснить выбор действия балансом прямого и непрямого путей", "Explain action selection through direct–indirect pathway balance", "Әрекет таңдауды тікелей және жанама жолдар теңгерімімен түсіндіру")),
  13: decisions(
    l("Сравнить точность, темп и траекторию целевого движения", "Compare accuracy, timing, and trajectory of a goal-directed movement", "Мақсатты қозғалыстың дәлдігін, уақытын және траекториясын салыстыру"),
    l("Проверить ошибку при открытых и закрытых глазах", "Test the error with eyes open and closed", "Қатені көз ашық және жұмық кезде тексеру"),
    l("Различить план команды и сенсорную ошибку исполнения", "Distinguish the motor command plan from sensory execution error", "Қозғалыс командасы жоспарын орындаудың сенсорлық қатесінен ажырату"),
    l("Повторить адаптационную пробу с предсказуемым смещением", "Repeat an adaptation task with a predictable perturbation", "Болжамды ығысумен бейімделу сынамасын қайталау"),
    l("Оценить уменьшение ошибки от попытки к попытке", "Assess trial-to-trial error reduction", "Әр әрекеттен кейін қатенің азаюын бағалау"),
    l("Объяснить мозжечковое сравнение намерения и результата", "Explain cerebellar comparison of intention and outcome", "Мишықтың ниет пен нәтижені салыстыруын түсіндіру")),
  14: decisions(
    l("Сопоставить стимул, уровень бодрствования и точность ответа", "Relate stimulus, arousal level, and response accuracy", "Стимулды, сергектік деңгейін және жауап дәлдігін салыстыру"),
    l("Сравнить специфический сенсорный ответ и неспецифическую активацию", "Compare specific sensory response with nonspecific activation", "Арнайы сенсорлық жауапты арнайы емес белсенумен салыстыру"),
    l("Проследить таламокортикальный и кортикоталамический потоки", "Trace thalamocortical and corticothalamic flow", "Таламокортикалық және кортикоталамикалық ағындарды қадағалау"),
    l("Изменить внимание при одинаковой интенсивности стимула", "Vary attention while holding stimulus intensity constant", "Стимул қарқындылығы бірдей кезде зейінді өзгерту"),
    l("Отделить релейную передачу от сетевой фильтрации", "Distinguish relay transmission from network filtering", "Релейлік берілісті желілік сүзгіден ажырату"),
    l("Объяснить таламус как узел распределённой петли", "Explain the thalamus as a node in a distributed loop", "Таламусты таралған ілмектің түйіні ретінде түсіндіру")),
  15: decisions(
    l("Зафиксировать исходные осмоляльность 285 мОсм/кг и диурез", "Record baseline osmolality of 285 mOsm/kg and urine output", "Бастапқы 285 мОсм/кг осмолялдық пен диурезді тіркеу"),
    l("После водной депривации сравнить осмоляльность, жажду и АДГ", "After water deprivation compare osmolality, thirst, and ADH", "Су шектеуінен кейін осмолялдықты, шөлді және АДГ-ны салыстыру"),
    l("Разделить осмосенсорный вход и гипоталамическую интеграцию", "Separate osmosensory input from hypothalamic integration", "Осмосенсорлық кірісті гипоталамустық интеграциядан ажырату"),
    l("Измерить концентрацию мочи после повышения АДГ", "Measure urine concentration after ADH rises", "АДГ жоғарылағаннан кейін несеп концентрациясын өлшеу"),
    l("Проверить возврат осмоляльности к диапазону после питья", "Test return of osmolality toward range after drinking", "Су ішкеннен кейін осмолялдықтың қалыпты ауқымға қайтуын тексеру"),
    l("Объяснить отрицательную обратную связь без единственного «центра»", "Explain negative feedback without invoking a single autonomous center", "Бір ғана автономды «орталықсыз» теріс кері байланысты түсіндіру")),
  16: decisions(
    l("Уточнить, какие контекстные признаки вызывают вегетативный ответ", "Identify which contextual cues evoke the autonomic response", "Қандай контекстік белгілер вегетативтік жауап туғызатынын нақтылау"),
    l("Сравнить узнавание события и эмоциональную оценку", "Compare event recognition with emotional appraisal", "Оқиғаны тануды эмоциялық бағалаумен салыстыру"),
    l("Проследить связи гиппокампа, миндалины, гипоталамуса и коры", "Trace hippocampal, amygdala, hypothalamic, and cortical links", "Гиппокамп, амигдала, гипоталамус және қыртыс байланыстарын қадағалау"),
    l("Изменить контекст при сохранении самого стимула", "Change context while preserving the stimulus itself", "Стимулдың өзін сақтап, контексті өзгерту"),
    l("Разделить память контекста и выражение эмоциональной реакции", "Separate contextual memory from expression of emotion", "Контекст жадын эмоциялық реакция көрінісінен ажырату"),
    l("Объяснить лимбические функции распределённой сетью", "Explain limbic functions as a distributed network", "Лимбиялық қызметтерді таралған желі арқылы түсіндіру")),
  17: decisions(
    l("Измерить реакцию на нейтральный и ранее связанный с угрозой стимул", "Measure responses to neutral and previously threat-associated cues", "Бейтарап және қауіппен байланыстырылған стимулдарға жауапты өлшеу"),
    l("Сравнить кожную проводимость, пульс и субъективную оценку", "Compare skin conductance, pulse, and subjective rating", "Тері өткізгіштігін, пульсті және субъективті бағалауды салыстыру"),
    l("Разделить быстрое обнаружение значимости и осознанную оценку", "Separate rapid salience detection from conscious appraisal", "Маңыздылықты жылдам анықтауды саналы бағалаудан ажырату"),
    l("Провести угасание без изменения исходного воспоминания", "Test extinction without assuming erasure of the original memory", "Бастапқы жад өшті деп санамай, сөнуді тексеру"),
    l("Проверить возврат реакции в новом контексте", "Test return of the response in a new context", "Жаңа контексте реакцияның қайта оралуын тексеру"),
    l("Объяснить роль миндалины в сети оценки значимости", "Explain the amygdala within a salience-evaluation network", "Амигдаланың маңыздылықты бағалау желісіндегі рөлін түсіндіру")),
  18: decisions(
    l("Сравнить называние предъявленного предмета с его узнаванием и выбором соответствующего рисунка", "Compare naming a presented object with recognizing it and selecting its matching picture", "Көрсетілген затты атауды оны танумен және сәйкес суретті таңдаумен салыстыру"),
    l("Проверить называние, повторение слов и понимание устной инструкции в отдельных сериях", "Test naming, word repetition, and comprehension of spoken commands in separate series", "Атауды, сөздерді қайталауды және ауызша нұсқауды түсінуді бөлек серияларда тексеру"),
    l("Связать семь ошибок называния при сохранном узнавании с доступом языковой сети к названию объекта", "Relate seven naming errors with preserved recognition to language-network access to the object's name", "Тану сақталған кездегі жеті атау қатесін тілдік желінің зат атауына қол жеткізуімен байланыстыру"),
    l("Сравнить свободное называние с называнием после смысловой и фонематической подсказок", "Compare uncued naming with naming after semantic and phonemic cues", "Еркін атауды мағыналық және фонемалық ишарадан кейінгі атаумен салыстыру"),
    l("Объединить сохранные движения, чувствительность и понимание с избирательным нарушением называния", "Integrate preserved movement, sensation, and comprehension with the selective naming impairment", "Сақталған қозғалысты, сезімталдықты және түсінуді атаудың таңдамалы бұзылуымен біріктіру"),
    l("Объяснить дефицит как нарушение одного звена распределённой языковой сети, а не потерю всей функции одним центром", "Explain the deficit as disruption of one component in a distributed language network rather than loss of the whole function from one center", "Тапшылықты бүкіл қызметтің бір орталықтан жоғалуы емес, таралған тілдік желінің бір буынының бұзылуы ретінде түсіндіру")),
  19: decisions(
    l("Картировать участок кожи и качество ощущения", "Map the skin region and sensory quality", "Тері аймағын және сезім сапасын картаға түсіру"),
    l("Сравнить лёгкое касание, давление, вибрацию и проприоцепцию", "Compare light touch, pressure, vibration, and proprioception", "Жеңіл жанасуды, қысымды, дірілді және проприоцепцияны салыстыру"),
    l("Проследить рецептор, афферент, путь и корковое представительство", "Trace receptor, afferent, pathway, and cortical representation", "Рецепторды, афферентті, жолды және қыртыстық өкілдікті қадағалау"),
    l("Изменить размер и частоту стимула для проверки рецептивного поля", "Vary stimulus size and frequency to test the receptive field", "Рецептивтік өрісті тексеру үшін стимул өлшемі мен жиілігін өзгерту"),
    l("Отделить периферическое кодирование от центральной интерпретации", "Separate peripheral encoding from central interpretation", "Шеткі кодтауды орталық түсіндіруден ажырату"),
    l("Объяснить ощущение последовательностью трансдукции и сетевой обработки", "Explain sensation through transduction and network processing", "Сезімді трансдукция және желілік өңдеу арқылы түсіндіру")),
  20: decisions(
    l("Нанести дефект каждого глаза на схему поля зрения", "Plot each eye's deficit on a visual-field chart", "Әр көздің ақауын көру өрісі сызбасына түсіру"),
    l("Проверить, соблюдает ли граница вертикальный меридиан", "Determine whether the defect respects the vertical meridian", "Ақау шекарасы тік меридианды сақтайтынын анықтау"),
    l("Проследить носовые волокна через хиазму, а височные — ипсилатерально", "Trace nasal fibers across the chiasm and temporal fibers ipsilaterally", "Мұрындық талшықтарды хиазма арқылы, самайлықтарды ипсилатералды қадағалау"),
    l("Сравнить зрачковую реакцию и поле зрения", "Compare pupillary responses with the visual-field pattern", "Қарашық реакциясын көру өрісі үлгісімен салыстыру"),
    l("Локализовать гомонимную гемианопсию позади хиазмы", "Localize a homonymous hemianopia posterior to the chiasm", "Гомонимді гемианопсияны хиазмадан кейін локализациялау"),
    l("Объяснить дефект ретинотопической организацией пути", "Explain the deficit through retinotopic pathway organization", "Ақауды жолдың ретинотопиялық ұйымдасуымен түсіндіру")),
  21: decisions(
    l("Уточнить, ухудшается ли равновесие именно в темноте", "Determine whether balance worsens specifically in darkness", "Тепе-теңдік дәл қараңғыда нашарлайтынын анықтау"),
    l("Раздельно проверить слух, вестибулярный вход и проприоцепцию", "Test hearing, vestibular input, and proprioception separately", "Естуді, вестибулярлық кірісті және проприоцепцияны бөлек тексеру"),
    l("Сравнить воздушную и костную проводимость", "Compare air and bone conduction", "Ауа және сүйек өткізгіштігін салыстыру"),
    l("Изменить зрительный контроль в пробе равновесия", "Vary visual input during the balance task", "Тепе-теңдік сынамасында көру бақылауын өзгерту"),
    l("Определить, какой сенсорный канал компенсирует другой", "Identify which sensory channel compensates for another", "Қай сенсорлық арна басқасын өтейтінін анықтау"),
    l("Объяснить общую трансдукцию при различии рецепторов", "Explain shared transduction principles despite different receptors", "Рецепторлар әртүрлі болса да, ортақ трансдукция қағидаларын түсіндіру")),
  22: decisions(
    l("Записать лёжа АД 118/74 мм рт. ст. и ЧСС 68/мин", "Record supine BP 118/74 mmHg and HR 68/min", "Жатқанда АҚ 118/74 мм сын. бағ. және ЖЖЖ 68/мин тіркеу"),
    l("Через 15 секунд стоя оценить АД 96/62 и ЧСС 88/мин", "At 15 seconds standing assess BP 96/62 and HR 88/min", "Тұрғаннан 15 секундтан соң АҚ 96/62 және ЖЖЖ 88/мин бағалау"),
    l("Связать растяжение барорецепторов с сигналом в ствол", "Link baroreceptor stretch to brainstem signaling", "Барорецептор созылуын ми бағанына сигналмен байланыстыру"),
    l("Через 60 секунд проверить восстановление АД до 112/70", "At 60 seconds test BP recovery to 112/70", "60 секундтан соң АҚ 112/70 дейін қалпына келуін тексеру"),
    l("Разделить симпатический сосудистый и вагусный сердечный эффекты", "Separate sympathetic vascular from vagal cardiac effects", "Симпатикалық тамырлық және вагустық жүрек әсерлерін ажырату"),
    l("Объяснить временную динамику барорефлекторной петлёй", "Explain the time course through the baroreflex loop", "Уақыттық динамиканы барорефлекстік ілмекпен түсіндіру")),
  23: decisions(
    l("Зафиксировать немедленное воспроизведение 9 из 12 слов", "Record immediate recall of 9 of 12 words", "12 сөздің 9-ын дереу еске түсіруді тіркеу"),
    l("После интерференции измерить свободное воспроизведение 4 из 12", "After interference measure free recall of 4 of 12", "Интерференциядан кейін 12 сөздің 4-ын еркін еске түсіруді өлшеу"),
    l("С подсказкой проверить улучшение до 8 из 12", "With cues test improvement to 8 of 12", "Ишарамен нәтиженің 12-ден 8-ге жақсаруын тексеру"),
    l("Сравнить узнавание 11 из 12 со свободным воспроизведением", "Compare recognition of 11 of 12 with free recall", "12-ден 11 тануды еркін еске түсірумен салыстыру"),
    l("Разделить кодирование, хранение и извлечение", "Distinguish encoding, storage, and retrieval", "Кодтауды, сақтауды және қайта шығаруды ажырату"),
    l("Объяснить профиль взаимодействием памяти, внимания и интерференции", "Explain the profile through memory, attention, and interference", "Профильді жад, зейін және интерференция әрекеттесуімен түсіндіру")),
  24: decisions(
    l("Собрать 7-дневный дневник сна с временем света и подъёма", "Collect a 7-day sleep diary including light exposure and rise time", "Жарық пен ояну уақытын қамтитын 7 күндік ұйқы күнделігін жинау"),
    l("Сопоставить будни 01:30–07:00 и выходные 03:00–11:00", "Compare weekday sleep 01:30–07:00 with weekend sleep 03:00–11:00", "Жұмыс күнгі 01:30–07:00 ұйқыны демалыстағы 03:00–11:00 ұйқымен салыстыру"),
    l("Разделить давление сна и задержку циркадной фазы", "Separate sleep pressure from delayed circadian phase", "Ұйқы қысымын циркадтық фазаның кешігуінен ажырату"),
    l("Сравнить стадии сна до и после ограничения сна", "Compare sleep stages before and after sleep restriction", "Ұйқыны шектеуге дейін және кейін ұйқы сатыларын салыстыру"),
    l("Проверить эффект утреннего света при постоянном времени подъёма", "Test morning light while keeping rise time constant", "Ояну уақытын тұрақты ұстап, таңғы жарық әсерін тексеру"),
    l("Объяснить результат взаимодействием гомеостата и циркадных часов", "Explain the result through interaction of sleep homeostasis and the circadian clock", "Нәтижені ұйқы гомеостаты мен циркадтық сағат әрекеттесуімен түсіндіру")),
  25: decisions(
    l("Зафиксировать исходные 42% точности и 80 секунд выполнения", "Record baseline accuracy of 42% and completion time of 80 seconds", "Бастапқы 42% дәлдік пен 80 секунд орындау уақытын тіркеу"),
    l("После пяти тренировок оценить 71% и 55 секунд", "After five sessions assess 71% accuracy and 55 seconds", "Бес жаттығудан кейін 71% және 55 секундты бағалау"),
    l("Через неделю проверить удержание 66% без подсказки", "One week later test 66% retention without cues", "Бір аптадан кейін ишарасыз 66% сақталуды тексеру"),
    l("На новой задаче измерить перенос: 48% точности", "On a novel task measure transfer at 48% accuracy", "Жаңа тапсырмада 48% дәлдікпен көшуді өлшеу"),
    l("Сравнить практико-специфическое обучение и общий перенос", "Compare practice-specific learning with general transfer", "Жаттығуға тән үйренуді жалпы көшумен салыстыру"),
    l("Объяснить пластичность изменением сети, не обещая полного восстановления", "Explain plasticity as network change without claiming complete recovery", "Толық қалпына келуді уәде етпей, пластикалылықты желі өзгерісімен түсіндіру")),
};

const ui = {
  RU: {
    title: "Виртуальный пациент", patient: "Пациент", synthetic: "Синтетический учебный случай: данные не относятся к реальному человеку.",
    stages: ["Анамнез", "Осмотр", "Локализация / механизм", "Обследование", "Диагноз / вывод", "Итог"],
    tasks: ["Выберите, какие сведения нужно уточнить прежде всего.", "Выберите наиболее информативное наблюдение или пробу.", "Определите наиболее согласованный механизм или уровень организации.", "Выберите исследование, которое проверяет рабочую гипотезу.", "Сформулируйте вывод, учитывая данные и ограничения.", "Соберите механизм в единое объяснение."],
    good: ["Анамнез должен уточнять время, контекст и распределение проявлений.", "Осмотр проверяет функцию, связанную с рабочей гипотезой.", "Локализация или механизм должны объяснять совокупность данных.", "Исследование должно проверять гипотезу, а не заменять рассуждение.", "Вывод должен объединять данные и сохранять неопределённость.", "Итог связывает наблюдение с механизмом и границами модели."],
    correct: ["Уточнить ключевые обстоятельства и динамику", "Проверить функцию, связанную с жалобой", "Связать данные с механизмом модуля", "Провести направленную проверку гипотезы", "Интегрировать все данные и ограничения", "Объяснить механизм и границы вывода"],
    wrongA: ["Сразу считать первое впечатление доказанным", "Ограничиться несвязанной общей пробой", "Назвать симптом вместо механизма", "Выбрать несвязанное исследование", "Считать один признак достаточным", "Запомнить только название"],
    wrongB: ["Пропустить сбор данных", "Не проводить осмотр", "Игнорировать противоречащие данные", "Отказаться от сравнения условий", "Скрыть неопределённость", "Перенести модель на любого пациента без проверки"],
  },
  EN: {
    title: "Virtual Patient", patient: "Patient", synthetic: "Synthetic teaching case: the data do not describe a real person.",
    stages: ["History", "Examination", "Localization / mechanism", "Investigation", "Diagnosis / conclusion", "Summary"],
    tasks: ["Choose which information should be clarified first.", "Choose the most informative observation or examination.", "Identify the mechanism or organizational level that best fits.", "Choose an investigation that tests the working hypothesis.", "Formulate a conclusion that includes evidence and limitations.", "Integrate the mechanism into one explanation."],
    good: ["History should clarify timing, context, and distribution.", "Examination should test the function linked to the hypothesis.", "Localization or mechanism should explain the whole pattern.", "An investigation should test the hypothesis, not replace reasoning.", "The conclusion should integrate evidence and preserve uncertainty.", "The summary links the observation to mechanism and model limits."],
    correct: ["Clarify key circumstances and time course", "Test the function related to the complaint", "Link the data to the module mechanism", "Perform a targeted test of the hypothesis", "Integrate all evidence and limitations", "Explain the mechanism and limits"],
    wrongA: ["Treat the first impression as proven", "Use only an unrelated general test", "Name a symptom instead of a mechanism", "Choose an unrelated investigation", "Treat one finding as sufficient", "Memorize only the label"],
    wrongB: ["Skip data collection", "Perform no examination", "Ignore conflicting data", "Avoid comparing conditions", "Hide uncertainty", "Apply the model to every patient without testing"],
  },
  KZ: {
    title: "Виртуалды пациент", patient: "Пациент", synthetic: "Синтетикалық оқу жағдайы: деректер нақты адамға қатысты емес.",
    stages: ["Анамнез", "Тексеру", "Локализация / механизм", "Зерттеу", "Диагноз / қорытынды", "Қорытынды"],
    tasks: ["Алдымен қандай мәліметті нақтылау керегін таңдаңыз.", "Ең ақпаратты бақылауды немесе тексеруді таңдаңыз.", "Деректерге ең сәйкес механизмді немесе ұйымдасу деңгейін анықтаңыз.", "Жұмыс гипотезасын тексеретін зерттеуді таңдаңыз.", "Деректер мен шектеулерді ескеріп қорытынды жасаңыз.", "Механизмді біртұтас түсіндірмеге біріктіріңіз."],
    good: ["Анамнез уақытты, контексті және белгілердің таралуын нақтылауы керек.", "Тексеру жұмыс гипотезасына байланысты қызметті бағалайды.", "Локализация немесе механизм деректер жиынтығын түсіндіруі керек.", "Зерттеу ойлауды алмастырмай, гипотезаны тексеруі керек.", "Қорытынды деректерді біріктіріп, белгісіздікті сақтауы керек.", "Қорытынды бақылауды механизммен және модель шегімен байланыстырады."],
    correct: ["Негізгі жағдайлар мен динамиканы нақтылау", "Шағымға байланысты қызметті тексеру", "Деректерді модуль механизмімен байланыстыру", "Гипотезаны бағытталған тексеру", "Барлық дерек пен шектеуді біріктіру", "Механизм мен қорытынды шегін түсіндіру"],
    wrongA: ["Алғашқы әсерді бірден дәлелденген деп санау", "Тек байланыссыз жалпы сынамамен шектелу", "Механизм орнына симптомды атау", "Байланыссыз зерттеуді таңдау", "Бір белгіні жеткілікті деп санау", "Тек атауын жаттау"],
    wrongB: ["Дерек жинауды өткізіп жіберу", "Тексеру жүргізбеу", "Қайшы деректерді елемеу", "Жағдайларды салыстырмау", "Белгісіздікті жасыру", "Модельді тексерусіз кез келген пациентке қолдану"],
  },
} as const;

const consequenceCopy = {
  RU: {
    data: "Новые данные",
    correct: "Решение проверяет рабочую гипотезу. Получен результат:",
    weak: "Шаг не различает основные гипотезы. При целевой проверке обнаружено:",
    conflict: "Решение приводит к противоречию с данными. Для пересмотра учтите:",
    correctFeedback: "Вы связали решение с данными этого случая.",
    weakFeedback: "Нужен показатель, который изменится по-разному при конкурирующих механизмах.",
    conflictFeedback: "Вернитесь к совокупности признаков: выбранное объяснение оставляет часть данных без механизма.",
  },
  EN: {
    data: "New data",
    correct: "The decision tests the working hypothesis. The result is:",
    weak: "This step does not distinguish the main hypotheses. Targeted testing shows:",
    conflict: "The decision conflicts with the evidence. To revise it, consider:",
    correctFeedback: "You linked the decision to this case's evidence.",
    weakFeedback: "Choose a measure expected to differ between the competing mechanisms.",
    conflictFeedback: "Return to the full pattern: the selected explanation leaves part of the evidence without a mechanism.",
  },
  KZ: {
    data: "Жаңа деректер",
    correct: "Шешім жұмыс гипотезасын тексереді. Алынған нәтиже:",
    weak: "Бұл қадам негізгі гипотезаларды ажыратпайды. Бағытталған тексеру мынаны көрсетті:",
    conflict: "Шешім деректерге қайшы келеді. Қайта қарау үшін мынаны ескеріңіз:",
    correctFeedback: "Сіз шешімді осы жағдайдың деректерімен байланыстырдыңыз.",
    weakFeedback: "Бәсекелес механизмдерде әртүрлі өзгеретін көрсеткішті таңдаңыз.",
    conflictFeedback: "Белгілер жиынтығына оралыңыз: таңдалған түсіндірме деректердің бір бөлігін механизмсіз қалдырады.",
  },
} as const;

const stageNarrative: Record<Language, string[]> = {
  RU: [
    "Начинается разбор исходной ситуации. Сначала необходимо отделить устойчивые признаки от случайного наблюдения.",
    "После первичного сбора сведений появились результаты направленного осмотра. Они позволяют проверить, согласуется ли исходная гипотеза с функцией системы.",
    "Случай переходит к локализации физиологического механизма. Теперь важно объяснить совокупность данных, а не только назвать отдельный симптом.",
    "Получен результат исследования или контролируемой пробы. Его нужно интерпретировать вместе с предыдущими данными и условиями измерения.",
    "Доступны несколько независимых результатов. На этом этапе требуется объединить их и явно отметить данные, которые ограничивают вывод.",
    "Случай достиг итоговой точки. Необходимо построить связанную причинную цепочку от входного сигнала до наблюдаемого результата и обратной связи.",
  ],
  KZ: [
    "Бастапқы жағдайды талдау басталады. Алдымен тұрақты белгілерді кездейсоқ бақылаудан ажырату қажет.",
    "Алғашқы мәліметтер жиналғаннан кейін бағытталған тексеру нәтижелері алынды. Олар бастапқы гипотезаның жүйе қызметімен сәйкестігін тексеруге мүмкіндік береді.",
    "Жағдай физиологиялық механизмді локализациялау кезеңіне өтті. Енді жеке белгіні атау емес, барлық деректер жиынтығын түсіндіру маңызды.",
    "Зерттеу немесе бақыланатын сынама нәтижесі алынды. Оны алдыңғы деректермен және өлшеу шарттарымен бірге түсіндіру керек.",
    "Бірнеше тәуелсіз нәтиже қолжетімді. Бұл кезеңде оларды біріктіріп, қорытындыны шектейтін деректерді нақты көрсету қажет.",
    "Жағдай қорытынды кезеңге жетті. Кіріс сигналынан байқалған нәтижеге және кері байланысқа дейінгі себептік тізбекті құру қажет.",
  ],
  EN: [
    "The initial situation is now being assessed. The first task is to separate reproducible findings from a chance observation.",
    "Targeted examination data are now available after the initial history. They can test whether the working hypothesis matches the function of the system.",
    "The case now moves to localization of the physiological mechanism. The complete pattern must be explained rather than merely naming one symptom.",
    "A study or controlled-test result is now available. It must be interpreted together with the earlier evidence and the measurement conditions.",
    "Several independent results can now be compared. They should be integrated while explicitly retaining evidence that limits the conclusion.",
    "The case has reached its synthesis stage. A causal chain is needed from input signal through the observed result and relevant feedback.",
  ],
};

const stagePurpose: Record<Language, string[]> = {
  RU: ["Выберите действие, которое даст максимально различающие сведения и сохранит возможность проверить конкурирующие объяснения.", "Определите, какая проверка непосредственно оценивает функцию, связанную с жалобой или экспериментальным эффектом.", "Сопоставьте уровень организации, направление сигнала и ожидаемый рисунок нарушения; укажите, какие данные делают эту локализацию предпочтительной.", "Выберите исследование, которое меняет один информативный параметр или сравнивает контролируемые условия, а не заменяет рассуждение названием метода.", "Сформулируйте вывод, который учитывает совпадающие результаты, противоречия и пределы выбранной модели.", "Выберите итоговое объяснение, связывающее наблюдение с клеточным, системным или регуляторным механизмом без необоснованного клинического обобщения."],
  KZ: ["Бәсекелес түсіндірмелерді тексеру мүмкіндігін сақтай отырып, ең ажыратушы мәлімет беретін әрекетті таңдаңыз.", "Шағымға немесе эксперименттік әсерге байланысты қызметті тікелей бағалайтын тексеруді анықтаңыз.", "Ұйымдасу деңгейін, сигнал бағытын және күтілетін бұзылыс үлгісін салыстырып, осы локализацияны қолдайтын деректерді көрсетіңіз.", "Ойлауды әдіс атауымен алмастырмай, бір ақпараттық параметрді өзгертетін немесе бақыланатын жағдайларды салыстыратын зерттеуді таңдаңыз.", "Сәйкес нәтижелерді, қайшылықтарды және модель шектерін ескеретін қорытынды жасаңыз.", "Бақылауды жасушалық, жүйелік немесе реттеуші механизммен байланыстыратын, негізсіз клиникалық жалпылаусыз қорытынды түсіндірмені таңдаңыз."],
  EN: ["Choose the action that provides the most discriminating evidence while keeping competing explanations testable.", "Identify the examination that directly assesses the function linked to the complaint or experimental effect.", "Relate organizational level, signal direction, and the expected deficit pattern, and identify the evidence favoring that localization.", "Choose a study that changes one informative variable or compares controlled conditions instead of replacing reasoning with a test name.", "Form a conclusion that accounts for convergent findings, contradictions, and the limits of the selected model.", "Choose a final explanation linking the observation to a cellular, systems, or regulatory mechanism without unsupported clinical generalization."],
};

function cleanLearnerTask(value: string, language: Language) {
  if (language === "RU") return value
    .replace(/^По (?:разделу|заданию) силлабуса /u, "")
    .replace(/ из силлабуса/gu, "")
    .replace(/^По СРО \d+(?:–\d+)? /u, "")
    .replace(/^По СРОП \d+(?:–\d+)? /u, "")
    .replace(/^По СРО \d+ и ПЗ \d+ /u, "")
    .replace(/По СРО \d+(?:–\d+)? /gu, "");
  if (language === "KZ") return value
    .replace(/Силлабус кестесін/gu, "Кестені")
    .replace(/силлабус/giu, "оқу материалы")
    .replace(/^СРО \d+(?:–\d+)? (?:мен ПЗ \d+ )?бойынша /u, "")
    .replace(/^СРОП \d+(?:–\d+)? бойынша /u, "")
    .replace(/СРО \d+(?:–\d+)? бойынша /gu, "");
  return value
    .replace(/^Using ISW \d+(?:–\d+)?,? /u, "")
    .replace(/^Use ISW \d+(?:–\d+)? and Practical \d+ to /u, "")
    .replace(/,? linking to ISW \d+(?:–\d+)?/gu, "")
    .replace(/ISW \d+(?:–\d+)?/gu, "the available evidence");
}

function naturalProfile(value: string, language: Language) {
  if (language === "RU") return value.replace(/^Пациент учебного случая,/u, "Пациент,");
  if (language === "EN") return value.replace(/^Teaching-case patient,/u, "Patient,");
  return value.replace(/^(\d+ жастағы) оқу жағдайының пациенті/u, "$1 пациент");
}

const evidenceLead: Record<Language, string[][]> = {
  RU: [
    ["При направленной первичной проверке установлено:", "Повторная проба дала воспроизводимый результат:", "Сопоставление сторон и условий показало:"],
    ["После стандартизированного осмотра зарегистрировано:", "При контроле исходных условий обнаружено:", "Функциональная проба уточнила:"],
    ["Карта сохранных и нарушенных функций показывает:", "Анализ распределения признаков выявил:", "Проверка конкурирующей локализации показала:"],
    ["В контролируемом исследовании получено:", "После исключения технического искажения установлено:", "Повтор измерения в сопоставимых условиях показал:"],
    ["Совместный анализ независимых результатов показывает:", "Проверка вывода на противоречия выявила:", "Сопоставление с сохранными функциями установило:"],
    ["На контрольном этапе воспроизведена следующая закономерность:", "После коррекции условий результат сохранился:", "Итоговое сравнение исходного и повторного измерения показало:"],
  ],
  EN: [
    ["Targeted initial testing established:", "The repeated test produced a reproducible result:", "Comparison across sides and conditions showed:"],
    ["Standardized examination recorded:", "Control of baseline conditions revealed:", "The functional test clarified:"],
    ["The map of impaired and preserved functions shows:", "Analysis of the finding distribution revealed:", "Testing the competing localization showed:"],
    ["The controlled investigation found:", "After technical distortion was excluded, the following remained:", "Repeat measurement under matched conditions showed:"],
    ["Joint analysis of independent results shows:", "Checking the conclusion for contradictions revealed:", "Comparison with preserved functions established:"],
    ["The control stage reproduced this relationship:", "The result persisted after conditions were corrected:", "Final comparison of baseline and repeat measurements showed:"],
  ],
  KZ: [
    ["Бағытталған бастапқы тексеру мынаны анықтады:", "Қайталама сынама тұрақты нәтиже берді:", "Жақтар мен жағдайларды салыстыру мынаны көрсетті:"],
    ["Стандартталған тексеруде мыналар тіркелді:", "Бастапқы жағдайларды бақылау кезінде мыналар анықталды:", "Функциялық сынама мынаны нақтылады:"],
    ["Бұзылған және сақталған қызметтер картасы мынаны көрсетеді:", "Белгілердің таралуын талдау мынаны анықтады:", "Бәсекелес локализацияны тексеру мынаны көрсетті:"],
    ["Бақыланатын зерттеуде мына нәтиже алынды:", "Техникалық бұрмалану алынып тасталғаннан кейін мыналар сақталды:", "Салыстырмалы жағдайда өлшеуді қайталау мынаны көрсетті:"],
    ["Тәуелсіз нәтижелерді бірге талдау мынаны көрсетеді:", "Қорытындыны қайшылыққа тексеру мынаны анықтады:", "Сақталған қызметтермен салыстыру мынаны көрсетті:"],
    ["Бақылау кезеңінде мына заңдылық қайта алынды:", "Жағдайлар түзетілгеннен кейін нәтиже сақталды:", "Бастапқы және қайталама өлшемдерді қорытынды салыстыру мынаны көрсетті:"],
  ],
};

function subjectTask(language: Language, stage: number, moduleTitle: string, observation: string, decisions: [string, string, string]) {
  const [first, second, third] = decisions;
  const tasks: Record<Language, string[]> = {
    RU: [
      `В случае «${moduleTitle}» получен первый проверяемый признак: ${observation} Сопоставьте три направления — «${first}», «${second}» и «${third}» — и определите, какое из них отделит ключевой признак от сопутствующего эффекта.`,
      `После первичного наблюдения зарегистрировано: ${observation} Решите, какая проверка — «${first}», «${second}» или «${third}» — непосредственно сравнит нарушенную функцию с сохранной.`,
      `Текущая карта признаков выглядит так: ${observation} Сравните объяснения «${first}», «${second}» и «${third}»: одно из них должно согласовать уровень организации, направление сигнала и сохранные компоненты.`,
      `Контролируемая проверка дала результат: ${observation} Определите, какой протокол — «${first}», «${second}» или «${third}» — разведёт конкурирующие механизмы при сопоставимых условиях.`,
      `К этапу вывода подтверждено: ${observation} Сопоставьте выводы «${first}», «${second}» и «${third}» с предыдущими результатами и выберите тот, который не игнорирует ограничения модели.`,
      `В итоговой проверке случая «${moduleTitle}» воспроизведено: ${observation} Сравните итоговые объяснения «${first}», «${second}» и «${third}» по полноте причинной цепочки от входа до ответа.`,
    ],
    EN: [
      `The first testable finding in “${moduleTitle}” is: ${observation} The three directions are: (1) ${first}; (2) ${second}; and (3) ${third}. Identify which one separates the key feature from a coincident effect.`,
      `After the initial observation, the following was recorded: ${observation} Consider (1) ${first}; (2) ${second}; and (3) ${third}. Decide which one directly contrasts the impaired function with a preserved one.`,
      `The current finding map is: ${observation} Evaluate (1) ${first}; (2) ${second}; and (3) ${third}. One must reconcile organizational level, signal direction, and preserved components.`,
      `Controlled testing produced: ${observation} Contrast protocols (1) ${first}; (2) ${second}; and (3) ${third}. Determine which one separates the competing mechanisms under matched conditions.`,
      `At the conclusion stage, the confirmed result is: ${observation} Compare conclusions (1) ${first}; (2) ${second}; and (3) ${third} with the preceding results, retaining model limits.`,
      `The final check in “${moduleTitle}” reproduced: ${observation} Evaluate (1) ${first}; (2) ${second}; and (3) ${third} for completeness of the causal chain from input to response.`,
    ],
    KZ: [
      `«${moduleTitle}» жағдайында алғашқы тексерілетін белгі алынды: ${observation} «${first}», «${second}» және «${third}» бағыттарын салыстырып, негізгі белгіні қатар жүретін әсерден ажырататынын анықтаңыз.`,
      `Бастапқы бақылаудан кейін мыналар тіркелді: ${observation} «${first}», «${second}» немесе «${third}» әрекеттерінің қайсысы бұзылған қызметті сақталған қызметпен тікелей салыстыратынын шешіңіз.`,
      `Белгілердің қазіргі картасы: ${observation} «${first}», «${second}» және «${third}» түсіндірмелерін салыстырыңыз; біреуі ұйымдасу деңгейін, сигнал бағытын және сақталған бөліктерді байланыстыруы керек.`,
      `Бақыланатын тексеру мына нәтиже берді: ${observation} «${first}», «${second}» немесе «${third}» хаттамаларының қайсысы бәсекелес механизмдерді салыстырмалы жағдайда ажырататынын анықтаңыз.`,
      `Қорытынды кезеңінде мыналар расталды: ${observation} «${first}», «${second}» және «${third}» қорытындыларын алдыңғы нәтижелермен салыстырып, модель шегін елемейтін нұсқаны алып тастаңыз.`,
      `«${moduleTitle}» жағдайының қорытынды тексеруінде мыналар қайта алынды: ${observation} «${first}», «${second}» және «${third}» түсіндірмелерін кірістен жауапқа дейінгі себептік тізбектің толықтығы бойынша салыстырыңыз.`,
    ],
  };
  return tasks[language][stage];
}

function subjectMentor(language: Language, stage: number, observation: string, conclusion: string, correctDecision: string) {
  const comments: Record<Language, string[]> = {
    RU: [
      `${observation} Поэтому действие «${correctDecision}» проверяет ключевой признак непосредственно, тогда как остальные направления смешивают его с последующими этапами анализа. ${conclusion}`,
      `${observation} На этом основании проба «${correctDecision}» сопоставляет нарушенную функцию с сохранной в одном протоколе и исключает общую неспособность выполнить задание. ${conclusion}`,
      `${observation} Интерпретация «${correctDecision}» учитывает не только яркий признак, но также уровень организации и сохранные компоненты; именно поэтому она лучше конкурирующей локализации. ${conclusion}`,
      `${observation} Протокол «${correctDecision}» создаёт контрольное сравнение, в котором конкурирующие механизмы предсказывают разные результаты. Без такого сравнения измерение осталось бы неоднозначным. ${conclusion}`,
      `${observation} Вывод «${correctDecision}» объединяет текущий результат с ранее сохранными и нарушенными функциями и не приписывает одному признаку больше доказательной силы, чем он имеет. ${conclusion}`,
      `${observation} Объяснение «${correctDecision}» строит цепочку от физиологического входа до ответа и сохраняет границы учебной модели вместо простого называния структуры. ${conclusion}`,
    ],
    EN: [
      `${observation} Therefore, “${correctDecision}” tests the key feature directly, whereas the other directions mix it with later stages of analysis. ${conclusion}`,
      `${observation} On that basis, “${correctDecision}” contrasts the impaired and preserved functions within one protocol and excludes a general inability to perform the task. ${conclusion}`,
      `${observation} The interpretation “${correctDecision}” accounts for organizational level and preserved components as well as the striking sign, making it stronger than the competing localization. ${conclusion}`,
      `${observation} The protocol “${correctDecision}” creates a control comparison in which the competing mechanisms predict different outcomes; without it, the measurement remains ambiguous. ${conclusion}`,
      `${observation} The conclusion “${correctDecision}” integrates the current result with previously preserved and impaired functions without giving one sign more evidential weight than it carries. ${conclusion}`,
      `${observation} The explanation “${correctDecision}” builds a chain from physiological input to response and retains the limits of the teaching model rather than merely naming a structure. ${conclusion}`,
    ],
    KZ: [
      `${observation} Сондықтан «${correctDecision}» әрекеті негізгі белгіні тікелей тексереді, ал басқа бағыттар оны талдаудың кейінгі кезеңдерімен араластырады. ${conclusion}`,
      `${observation} Осыған сүйеніп, «${correctDecision}» сынамасы бұзылған және сақталған қызметтерді бір хаттамада салыстырып, тапсырманы жалпы орындай алмауды жоққа шығарады. ${conclusion}`,
      `${observation} «${correctDecision}» түсіндірмесі айқын белгімен бірге ұйымдасу деңгейі мен сақталған бөліктерді де ескереді, сондықтан бәсекелес локализациядан негіздірек. ${conclusion}`,
      `${observation} «${correctDecision}» хаттамасы бәсекелес механизмдер әртүрлі нәтиже болжайтын бақылау салыстыруын жасайды; онсыз өлшем бірмәнді түсіндірілмейді. ${conclusion}`,
      `${observation} «${correctDecision}» қорытындысы қазіргі нәтижені бұрынғы сақталған және бұзылған қызметтермен біріктіріп, бір белгіге шамадан тыс дәлелдік мән бермейді. ${conclusion}`,
      `${observation} «${correctDecision}» түсіндірмесі физиологиялық кірістен жауапқа дейінгі тізбекті құрып, құрылымды ғана атаудың орнына оқу моделінің шегін сақтайды. ${conclusion}`,
    ],
  };
  return comments[language][stage];
}

export function getVirtualPatientScenario(moduleId: number, language: Language): VirtualPatientScenario | null {
  const seed = seeds.find((item) => item.moduleId === moduleId);
  if (!seed) return null;
  const authoredDecisions = caseDecisions[moduleId];
  if (!authoredDecisions || authoredDecisions.length !== 6) return null;
  const c = ui[language];
  const topic = topics.find((item) => item.id === moduleId);
  const moduleTitle = modules[language][moduleId - 1] ?? `${moduleId}`;
  const mechanism = moduleId === 1
    ? l("Распределение чувствительности и двигательная функция помогают локализовать поражение срединного нерва на уровне запястья.", "Sensory distribution and motor function help localize median-nerve involvement at the wrist.", "Сезімталдықтың таралуы мен қозғалтқыш қызметі ортаңғы жүйке зақымын білек деңгейінде локализациялауға көмектеседі.")[language]
    : topic!.mechanism[language];
  const interpretation = seed.conclusion[language];
  const observations = [seed.exam[language], seed.investigation[language], seed.exam[language], seed.investigation[language], seed.exam[language], seed.investigation[language]];
  const evidence = observations.map((observation, index) => `${evidenceLead[language][index][moduleId % 3]} ${observation}`);
  const finalResultLead = language === "RU" ? "После итоговой проверки:" : language === "KZ" ? "Қорытынды тексеруден кейін:" : "After the final verification:";
  const revealed = evidence.map((_, index) => index < 5 ? evidence[index + 1] : `${finalResultLead} ${seed.exam[language]}`);
  const consequences = consequenceCopy[language];
  return {
    moduleId,
    title: `${c.title}: ${moduleTitle}`,
    patient: c.patient,
    profile: naturalProfile(seed.profile[language], language),
    opening: seed.opening[language],
    syntheticNote: c.synthetic,
    mechanismSummary: `${mechanism} ${interpretation}`,
    stages: c.stages.map((title, index) => {
      const correctDecision = authoredDecisions[index][language];
      const competingDecisionA = authoredDecisions[(index + 1) % 6][language];
      const competingDecisionB = authoredDecisions[(index + 3) % 6][language];
      const task = subjectTask(language, index, moduleTitle, observations[index], [correctDecision, competingDecisionA, competingDecisionB]);
      const mentorComment = subjectMentor(language, index, observations[index], interpretation, correctDecision);
      const candidates = [
        { text: correctDecision, response: `${consequences.correct} ${revealed[index]}`, feedback: `${consequences.correctFeedback} ${mentorComment}` },
        { text: competingDecisionA, response: `${consequences.weak} ${revealed[index]}`, feedback: `${consequences.weakFeedback} ${mentorComment}` },
        { text: competingDecisionB, response: `${consequences.conflict} ${revealed[index]}`, feedback: `${consequences.conflictFeedback} ${mentorComment}` },
      ] as const;
      const correctOption = (moduleId + index * 2) % 3;
      const order = correctOption === 0 ? [0, 1, 2] : correctOption === 1 ? [1, 0, 2] : [1, 2, 0];
      return {
        id: `vp-${moduleId}-stage-${index + 1}`,
        title,
        situation: stageNarrative[language][index],
        mentorPrompt: `${observations[index]} ${interpretation}`,
        task,
        newData: evidence[index],
        mechanism,
        options: order.map((position) => ({
          id: `vp-${moduleId}-stage-${index + 1}-decision-${position + 1}`,
          ...candidates[position],
        })) as VirtualPatientStage["options"],
        correctOption,
      };
    }),
  };
}

export const virtualPatientModuleIds = seeds.map((seed) => seed.moduleId);
