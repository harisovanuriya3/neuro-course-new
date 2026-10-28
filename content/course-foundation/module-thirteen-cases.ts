import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Module 13: original cerebellar reasoning cases; no textbook material copied.
// Source checks: Guyton & Hall 13e ch.57, Ganong 23e ch.16,
// C. L. Ghai Practical Physiology 8e clinical examination (pp. 287–291).
// Illustrative vignettes are not patient data or diagnostic algorithms.
type Text = Record<Language, string>;
type Scenario = { id: string; title: Text; situation: Text; questions: [Text, Text, Text]; explanations: [Text, Text] };
const scenarios: Scenario[] = [
  {
    "id": "target-dysmetria",
    "title": {
      "RU": "1. Промахивание при сохранной силе",
      "EN": "1. Target error with preserved strength",
      "KZ": "1. Күш сақталған кездегі нысанадан жаңылу"
    },
    "situation": {
      "RU": "У пациента при пальценосовой пробе справа появляются повторные промахивания, которые становятся заметнее у цели; максимальное усилие разгибателей кисти при проверке сопротивлением сохранено. При открытых глазах ошибка остаётся. Исследователь сравнивает точность движения с силой, но не располагает данными о чувствительности, лекарствах и нейровизуализации. Все наблюдения учебные, не диагноз.",
      "EN": "During right-hand finger-to-nose testing, the participant repeatedly overshoots near the target, although maximal wrist-extension force against resistance is preserved. The error persists with eyes open. The examiner compares coordination with strength but has no sensory examination, medication history or imaging. These are teaching observations, not a diagnosis.",
      "KZ": "Оң қолмен саусақ-мұрын сынамасын орындағанда нысанаға жақындаған сайын қайта-қайта дәл тимеу байқалады; алайда білезікті жазу кезіндегі қарсылыққа қарсы ең жоғары күш сақталған. Көз ашық кезде де қате бар. Тексеруші қимыл дәлдігін күшпен салыстырады, бірақ сезімталдық, дәрілер және бейнелеу деректері жоқ. Бұл — оқу жағдайы, диагноз емес."
    },
    "questions": [
      {
        "RU": "Какие два признака позволяют отличить нарушение точности движения от простой мышечной слабости? Отдельно оцените ошибку у цели и результат проверки силы.",
        "EN": "Which two observations help distinguish impaired coordination from simple muscle weakness? Interpret target-approach error separately from the strength test.",
        "KZ": "Қандай екі белгі үйлесім бұзылысын жай бұлшықет әлсіздігінен ажыратуға көмектеседі? Нысанаға жақындағандағы қатені күш сынамасынан бөлек түсіндіріңіз."
      },
      {
        "RU": "Объясните участие мозжечка в согласовании времени и коррекции движений. Почему сохранная максимальная сила не исключает дисметрию?",
        "EN": "Explain the cerebellum's role in movement timing and correction. Why does preserved maximal force not exclude dysmetria?",
        "KZ": "Мишықтың қимыл уақытын және түзетуін реттеудегі рөлін сипаттаңыз. Неліктен ең жоғары күштің сақталуы дисметрияны жоққа шығармайды?"
      },
      {
        "RU": "Какие дополнительные измерения помогут исключить сенсорную атаксию, зрительные нарушения и действие лекарств? Можно ли по одной пробе установить очаг и диагноз?",
        "EN": "Which additional examinations would distinguish sensory ataxia, visual effects and medication effects? Can one test establish a unique lesion or diagnosis?",
        "KZ": "Сенсорлық атаксияны, көру мен дәрі әсерін ажырату үшін қандай қосымша тексерулер керек? Бір сынамамен нақты зақым орнын немесе диагнозды дәлелдеуге бола ма?"
      }
    ],
    "explanations": [
      {
        "RU": "Дисметрия может отражать нарушение масштабирования и своевременного торможения движения; интенционный тремор иногда усиливается по мере приближения к цели. Мозжечковые сети участвуют в сопоставлении двигательного плана с сенсорной информацией и своевременной коррекции. Сохранная сила не означает сохранную координацию и не равнозначна отсутствию неврологического дефицита.",
        "EN": "Dysmetria may reflect faulty scaling or braking of movement; intention tremor can become more prominent near a target. Cerebellar networks contribute to matching motor plans with sensory information and timing corrections. Preserved strength does not imply preserved coordination; the observation is not equivalent to paresis.",
        "KZ": "Дисметрия қимыл ауқымын және тоқтауын дұрыс реттей алмаумен көрінуі мүмкін; интенциялық тремор нысанаға жақындағанда күшеюі ықтимал. Мишық желілері қозғалыс жоспарын сенсорлық ақпаратпен сәйкестендіруге және түзетуді уақытында жасауға қатысады. Күштің сақталуы үйлесімнің сақталғанын білдірмейді, бұл парезбен бірдей емес."
      },
      {
        "RU": "Нужно отдельно проверить суставно-мышечное чувство и другие виды чувствительности, движения глаз, быстрые чередующиеся движения и походку, повторить пробу и уточнить лекарственный анамнез. Подобный рисунок может соответствовать мозжечковой дисфункции, но одна пальценосовая проба не доказывает точный очаг, причину или диагноз. Внезапно появившиеся неврологические симптомы требуют срочной клинической оценки.",
        "EN": "Examine joint-position sense, other sensory modalities, eye movements, rapid alternating movements and gait separately; repeat observations and obtain medication history. This pattern can be compatible with cerebellar dysfunction, but a single finger-to-nose test cannot establish the precise site, cause or diagnosis. Sudden new neurological signs require urgent clinical assessment.",
        "KZ": "Буын қалпын сезуді, басқа сезімталдық түрлерін, көз қимылын, жылдам алма-кезек қозғалыстарды және жүрісті бөлек тексеріңіз; сынаманы қайталап, дәрі анамнезін жинаңыз. Мұндай көрініс мишық дисфункциясына сәйкес келуі мүмкін, бірақ жалғыз саусақ-мұрын сынамасы нақты ошақты, себепті немесе диагнозды дәлелдемейді. Жаңадан кенет пайда болған неврологиялық белгі шұғыл клиникалық бағалауды талап етеді."
      }
    ]
  },
  {
    "id": "romberg-vision",
    "title": {
      "RU": "2. Устойчивость с открытыми и закрытыми глазами",
      "EN": "2. Standing with eyes open and closed",
      "KZ": "2. Көз ашық және жабық кездегі тепе-теңдік"
    },
    "situation": {
      "RU": "Участник устойчиво стоит с сомкнутыми стопами и открытыми глазами, но после закрывания глаз резко усиливается покачивание. При отдельной пробе обнаружено снижение чувства положения пальцев стоп. Второй участник заметно неустойчив уже с открытыми глазами и идёт на широкой базе. Нужно интерпретировать разницу, не объявляя пробу Ромберга специфической пробой мозжечка.",
      "EN": "One participant stands steadily with feet together and eyes open, but sway increases markedly on closing the eyes; toe joint-position sense is reduced on separate testing. Another participant is unstable even with eyes open and walks with a wide base. Interpret the contrast without treating the Romberg test as a cerebellum-specific examination.",
      "KZ": "Бір қатысушы аяқтарын қосып, көзін ашып тұрғанда орнықты, ал көзін жұмғанда теңселуі күрт күшейеді; бөлек тексеруде башпайлардың қалпын сезуі төмендеген. Екінші қатысушы көзі ашық кезде де теңселіп, кең адыммен жүреді. Ромберг сынамасын мишыққа ғана тән деп есептемей, айырмашылықты түсіндіріңіз."
    },
    "questions": [
      {
        "RU": "Что означает резкое ухудшение устойчивости у первого участника при закрывании глаз? Укажите роль чувства положения суставов.",
        "EN": "What does worsening after vision is removed suggest in the first participant? State the role of joint-position sense.",
        "KZ": "Бірінші қатысушыда көру ақпараты жойылғанда тепе-теңдіктің нашарлауы нені білдіреді? Буын қалпын сезудің рөлін атаңыз."
      },
      {
        "RU": "Как неустойчивость второго участника даже с открытыми глазами влияет на оценку мозжечка и других систем поддержания позы?",
        "EN": "How does instability even with eyes open in the second participant guide assessment of cerebellar and other postural systems?",
        "KZ": "Екінші қатысушының көзі ашық кезде де тұрақсыз болуы мишық пен басқа постуралдық жүйелерді бағалауға қалай әсер етеді?"
      },
      {
        "RU": "Какие дополнительные пробы помогут различить сенсорные, вестибулярные и мозжечковые причины? Является ли положительная проба Ромберга диагнозом?",
        "EN": "Which further tests could distinguish sensory, vestibular and cerebellar causes? Is a positive Romberg result a diagnosis?",
        "KZ": "Сенсорлық, вестибулярлық және мишықтық себептерді ажырату үшін тағы қандай сынамалар қажет? Ромбергтің оң нәтижесі диагноз бола ма?"
      }
    ],
    "explanations": [
      {
        "RU": "Устойчивость в положении стоя зависит от объединения зрительной, проприоцептивной и вестибулярной информации. Если человек устойчив с открытыми глазами, но резко теряет устойчивость при их закрывании, это может отражать недостаток проприоцептивного или вестибулярного входа; такой результат не является специфическим доказательством поражения мозжечка. Снижение суставно-мышечного чувства дополнительно поддерживает сенсорное объяснение.",
        "EN": "Stable standing integrates vision, proprioception and vestibular input. Stability with eyes open but marked deterioration on eye closure can fit impaired proprioceptive or vestibular information; it is not specific evidence of cerebellar damage. Reduced joint-position sense strengthens a sensory explanation.",
        "KZ": "Орнықты тұру көру, проприоцепция және вестибулярлық ақпараттың бірігуіне тәуелді. Көзі ашықта орнықты болып, көз жұмғанда күрт нашарлау проприоцептивтік не вестибулярлық ақпарат тапшылығымен үйлесуі мүмкін; бұл мишық зақымының арнайы дәлелі емес. Буын қалпын сезудің төмендеуі сенсорлық түсіндірмені күшейтеді."
      },
      {
        "RU": "Неустойчивость с открытыми глазами и широкая база ходьбы могут встречаться при мозжечковых и иных постуральных расстройствах. Сравните суставно-мышечное и вибрационное чувство, движения глаз, нистагм, походку и координацию конечностей. Проба Ромберга сама по себе не определяет единственный анатомический очаг или этиологию; при обследовании необходимо учитывать риск падения.",
        "EN": "Instability with eyes open and a broad-based gait can occur in cerebellar or other postural disorders. Compare joint-position and vibration sense, eye movements, nystagmus, gait and limb coordination. The Romberg test alone neither localizes a unique anatomical lesion nor determines etiology; examination must also address fall risk.",
        "KZ": "Көз ашық кездегі тұрақсыздық пен кең негізді жүріс мишықтық не басқа постуралдық бұзылыстарда болуы мүмкін. Буын қалпын және дірілді сезуді, көз қозғалысын, нистагмды, жүрісті және аяқ-қол үйлесімін салыстырыңыз. Ромберг сынамасы жалғыз өзі нақты анатомиялық ошақты да, себепті де анықтамайды; тексеруде құлау қаупін ескеру керек."
      }
    ]
  },
  {
    "id": "gaze-balance",
    "title": {
      "RU": "3. Взгляд, нистагм и равновесие",
      "EN": "3. Gaze, nystagmus and balance",
      "KZ": "3. Көзқарас, нистагм және тепе-теңдік"
    },
    "situation": {
      "RU": "При учебном наблюдении у человека появились неустойчивость и непроизвольные колебательные движения глаз. При удержании взгляда в сторону колебания становятся заметнее, но измерения вестибулоокулярного рефлекса не выполнены. Преподаватель предлагает связать симптомы с флоккулонодулярной долей, не исключая поражение вестибулярного аппарата или ствола мозга.",
      "EN": "In a teaching observation, a person has imbalance and involuntary oscillatory eye movements. Oscillations become more visible during eccentric gaze, but the vestibulo-ocular reflex has not been measured. The instructor asks about the flocculonodular lobe while keeping peripheral vestibular and brainstem explanations open.",
      "KZ": "Оқу бақылауында адамда тепе-теңдік бұзылып, көздің еріксіз ырғақты қозғалыстары байқалады. Шетке қарағанда тербеліс күшейеді, бірақ вестибулоокулярлық рефлекс өлшенбеген. Оқытушы флоккулонодулярлық бөлік рөлін талдауды, сонымен бірге ішкі құлақ пен ми бағанының себептерін ескеруді сұрайды."
    },
    "questions": [
      {
        "RU": "Опишите роль флоккулонодулярной доли и вестибулярных ядер в регуляции равновесия и движений глаз.",
        "EN": "Describe how the flocculonodular lobe and vestibular nuclei contribute to balance and eye-movement control.",
        "KZ": "Флоккулонодулярлық бөлік пен вестибулярлық ядролардың тепе-теңдік пен көз қимылын реттеудегі байланысын сипаттаңыз."
      },
      {
        "RU": "Почему наличие нистагма само по себе не доказывает поражение одной конкретной зоны мозжечка? Какие альтернативные анатомические структуры следует учитывать?",
        "EN": "Why does nystagmus not establish a lesion in one specific cerebellar region? Which alternative structures should be considered?",
        "KZ": "Неліктен нистагм мишықтың белгілі бір бөлігінің зақымын жеке өзі дәлелдемейді? Қандай балама құрылымдарды қарастырасыз?"
      },
      {
        "RU": "Какие сведения о движениях глаз, вестибулоокулярном рефлексе, слухе и других неврологических признаках уточнят вывод? Почему важно внезапное начало?",
        "EN": "What eye-movement, vestibulo-ocular reflex, hearing and other neurological findings would refine the inference? Why does sudden onset matter?",
        "KZ": "Көз қозғалысы, вестибулоокулярлық рефлекс, есту және басқа неврологиялық белгілер туралы қандай деректер қорытындыны нақтылайды? Кенет басталу неліктен маңызды?"
      }
    ],
    "explanations": [
      {
        "RU": "Вестибулоцеребеллум, особенно флоккулонодулярная доля, использует вестибулярные сигналы для стабилизации взгляда и поддержания равновесия. Взаимодействие мозжечка с вестибулярными ядрами помогает согласовывать движения глаз и тела. Однако наличие нистагма не доказывает единственную причину или конкретный очаг поражения.",
        "EN": "The vestibulocerebellum, especially the flocculonodular lobe, uses vestibular information to help stabilize gaze and regulate balance. Reciprocal connections with vestibular nuclei coordinate eye and body movements. This functional relationship does not imply that nystagmus has a single cause.",
        "KZ": "Вестибулоцеребеллум, әсіресе флоккулонодулярлық бөлік, вестибулярлық ақпаратты пайдаланып, көзқарасты тұрақтандыруға және тепе-теңдікті реттеуге қатысады. Мишық пен вестибулярлық ядролардың өзара байланысы көз бен дене қимылдарының үйлесуіне ықпал етеді. Бұл нистагмның бір ғана себебі бар дегенді білдірмейді."
      },
      {
        "RU": "Нистагм возможен при нарушениях внутреннего уха, вестибулярного нерва, ствола мозга и мозжечка. Не локализуйте поражение только по его наличию: оцените направление, реакцию на движения головы, вестибулоокулярный рефлекс, слух и сопутствующие очаговые признаки. Внезапное нарушение равновесия, особенно с новыми неврологическими симптомами, требует срочной медицинской оценки.",
        "EN": "Nystagmus may arise from disorders involving the inner ear, vestibular nerve, brainstem or cerebellum. Do not localize solely from its presence: examine direction, response to head movement, vestibulo-ocular reflex, hearing and associated focal signs. Sudden imbalance, especially with new neurological signs, warrants urgent medical assessment.",
        "KZ": "Нистагм ішкі құлақ, вестибулярлық жүйке, ми бағаны немесе мишық бұзылыстарында байқалуы мүмкін. Тек оның бар болуына сүйеніп локализация жасамаңыз: бағытын, бас қозғалысына жауабын, вестибулоокулярлық рефлексті, естуді және қосымша ошақтық белгілерді бағалаңыз. Тепе-теңдік кенет бұзылса, әсіресе жаңа неврологиялық белгілер қосылса, шұғыл медициналық бағалау қажет."
      }
    ]
  },
  {
    "id": "adaptation-aftereffect",
    "title": {
      "RU": "4. Обучение на сенсорной ошибке",
      "EN": "4. Learning from sensory error",
      "KZ": "4. Сенсорлық қате арқылы үйрену"
    },
    "situation": {
      "RU": "В учебном эксперименте курсор на экране поворачивают на фиксированный угол относительно движения руки. В первых десяти попытках ошибка попадания велика, затем при повторениях средняя ошибка уменьшается. После отмены поворота движение кратковременно отклоняется в противоположную сторону. Измерено только поведение; разряды нейронов не регистрировались.",
      "EN": "In a teaching task, the on-screen cursor is rotated by a fixed angle relative to hand movement. Target error is large over the first ten attempts but decreases with repetition. When rotation is removed, movements briefly deviate in the opposite direction. These are behavioral measurements only; no neuronal firing was recorded.",
      "KZ": "Оқу тәжірибесінде экрандағы курсор қол қимылына қатысты тұрақты бұрышқа бұрылады. Алғашқы он әрекетте нысанаға жету қатесі үлкен, ал қайталаған сайын орташа қате азаяды. Бұрылу жойылғанда қимыл қысқа уақыт қарама-қарсы жаққа ауытқиды. Бұл тек мінез-құлық өлшемдері; нейрон импульстері тіркелмеген."
    },
    "questions": [
      {
        "RU": "Отдельно опишите снижение ошибки при повторениях и отклонение в противоположную сторону после снятия поворота. Что является последействием адаптации?",
        "EN": "Describe error reduction and the opposite deviation after rotation removal separately. Which observation is an adaptation aftereffect?",
        "KZ": "Қатенің азаюын және бұрылу жойылғаннан кейінгі қарама-қарсы ауытқуды бөлек сипаттаңыз. Қайсысы бейімделудің кейінгі әсеріне сәйкес келеді?"
      },
      {
        "RU": "Объясните участие мозжечковых сетей в коррекции движений по сенсорной ошибке. Какой вывод нельзя сделать только из поведения?",
        "EN": "Explain how cerebellar networks contribute to calibration using sensory error. What cannot be inferred from behavioral data alone?",
        "KZ": "Мишық желілерінің сенсорлық қате арқылы қимылды дәлдеудегі рөлін түсіндіріңіз. Тек мінез-құлық деректерінен қандай тұжырым жасауға болмайды?"
      },
      {
        "RU": "Какие контрольные условия помогут различить сознательную стратегию и сенсомоторную адаптацию? Почему одна кривая не доказывает конкретный нейронный механизм?",
        "EN": "Which control conditions could separate explicit strategy from sensorimotor adaptation? Why cannot one learning curve establish a unique neuronal mechanism?",
        "KZ": "Саналы стратегия мен сенсомоторлық бейімделуді ажырату үшін қандай бақылау шарттарын қосасыз? Неліктен бір үйрену қисығы нақты нейрондық механизмді дәлелдемейді?"
      }
    ],
    "explanations": [
      {
        "RU": "Уменьшение ошибки при повторениях согласуется с тренировкой и адаптацией, но может также отражать внимание и сознательную стратегию. Краткое отклонение в обратную сторону после снятия поворота соответствует последействию адаптации. Мозжечок участвует в настройке движений по сенсорной ошибке, однако по одному поведению нельзя определить конкретную нейронную цепь.",
        "EN": "Declining error with repetition is compatible with practice and adaptation, but attention and explicit strategies can also contribute. A brief deviation opposite to the previous rotation after its removal is an adaptation aftereffect. Cerebellar circuits participate in sensory-error calibration, yet behavior alone cannot identify a single neuronal circuit.",
        "KZ": "Қайталанған әрекеттерде қатенің азаюы жаттығу мен бейімделуге сәйкес келеді, бірақ зейін және саналы стратегия да әсер етуі мүмкін. Бұрылу жойылғаннан кейінгі қарама-қарсы қысқа ауытқу бейімделудің кейінгі әсері болып саналады. Мишық сенсорлық қате арқылы қимылды дәлдеуге қатысады, алайда мінез-құлық дерегі бір ғана нейрондық тізбекті анықтамайды."
      },
      {
        "RU": "Сопоставьте исходную точность, угол поворота, число попыток, зрительную обратную связь и инструкции; сравните этапы возмущения и отмены. Отдельно измерьте сообщаемую сознательную стратегию и последействие. По графику нельзя определить активность отдельных клеток, доказать очаговое поражение или поставить диагноз.",
        "EN": "Match baseline accuracy, rotation angle, trial count, visual feedback and instructions; compare perturbation and washout phases. Measure reported explicit strategy separately from the aftereffect. The graph cannot reveal individual cell activity, demonstrate a focal lesion or establish a clinical diagnosis; it supports a limited behavioral inference.",
        "KZ": "Бастапқы дәлдікті, бұрылу бұрышын, әрекет санын, көру кері байланысын және нұсқауды бірдей ұстаңыз; бұрылу мен оны жою кезеңдерін салыстырыңыз. Саналы стратегия туралы жауапты кейінгі әсерден бөлек өлшеңіз. График жеке жасушалардың белсенділігін, нақты зақымды немесе диагнозды анықтамайды; ол тек шектеулі мінез-құлық қорытындысын қолдайды."
      }
    ]
  }
];
const introduction: Text = {
  "RU": "Четыре самостоятельных учебных случая о точности движения, сенсорной зависимости равновесия, вестибулоцеребеллуме и сенсомоторной адаптации. Сначала сформулируйте собственный ответ; раскрытое объяснение предназначено для самопроверки, а не для автоматической медицинской оценки. Ни один случай не устанавливает диагноз.",
  "EN": "Four independent teaching cases cover movement accuracy, sensory contributions to stance, the vestibulocerebellum and sensorimotor adaptation. Answer before revealing the explanation. Written responses are not automatically medically graded and no vignette establishes a diagnosis.",
  "KZ": "Төрт оқу жағдайы қимыл дәлдігін, тепе-теңдіктің сенсорлық негізін, вестибулоцеребеллумды және сенсомоторлық бейімделуді қарастырады. Түсіндірмені ашпас бұрын өз жауабыңызды жазыңыз. Жазбаша жауаптың медициналық дұрыстығы автоматты бағаланбайды; ешбір жағдай диагноз қоймайды."
};
const headings: Record<Language, [string, string, string]> = {
  "RU": [
    "Наблюдение",
    "Физиологический механизм",
    "Проверка и ограничения"
  ],
  "EN": [
    "Observations",
    "Physiological mechanism",
    "Tests and limits"
  ],
  "KZ": [
    "Бақылаулар",
    "Физиологиялық тетік",
    "Тексеру және шектеулер"
  ]
};

export function createModuleThirteenCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle,
    introduction: introduction[language],
    ui,
    cases: scenarios.map(item => ({
      id: "m13-cerebellum-case-" + item.id,
      title: item.title[language],
      situation: item.situation[language],
      stages: item.questions.map((question, index) => ({ title: headings[language][index], questions: [question[language]] })),
      explanation: item.explanations.map(paragraph => paragraph[language])
    }))
  };
}
