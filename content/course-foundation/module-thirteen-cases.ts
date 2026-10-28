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
        "RU": "Қандай екі белгі қозғалыс дәлдігінің бұзылуын жай бұлшықет әлсіздігінен ажыратуға көмектеседі? Нысанаға жақындағандағы қатені және күш сынамасын бөлек түсіндіріңіз.",
        "EN": "Which two observations help distinguish impaired coordination from simple muscle weakness? Interpret target-approach error separately from the strength test.",
        "KZ": "Қандай екі белгі үйлесім бұзылысын жай бұлшықет әлсіздігінен ажыратуға көмектеседі? Нысанаға жақындағандағы қатені күш сынамасынан бөлек түсіндіріңіз."
      },
      {
        "RU": "Мишықтың қозғалыс уақыты мен түзетуін реттеудегі рөлін сипаттаңыз. Неліктен сақталған ең жоғары күш дисметрияны жоққа шығармайды?",
        "EN": "Explain the cerebellum's role in movement timing and correction. Why does preserved maximal force not exclude dysmetria?",
        "KZ": "Мишықтың қимыл уақытын және түзетуін реттеудегі рөлін сипаттаңыз. Неліктен ең жоғары күштің сақталуы дисметрияны жоққа шығармайды?"
      },
      {
        "RU": "Сенсорлық атаксия, көру және дәрі әсері сияқты баламаларды тексеру үшін тағы не өлшер едіңіз? Бір сынама бойынша нақты ошақ не диагноз қоюға бола ма?",
        "EN": "Which additional examinations would distinguish sensory ataxia, visual effects and medication effects? Can one test establish a unique lesion or diagnosis?",
        "KZ": "Сенсорлық атаксияны, көру мен дәрі әсерін ажырату үшін қандай қосымша тексерулер керек? Бір сынамамен нақты зақым орнын немесе диагнозды дәлелдеуге бола ма?"
      }
    ],
    "explanations": [
      {
        "RU": "Дисметрия қозғалыстың ауқымы мен тоқтауын дұрыс реттей алмаудан көрінуі мүмкін; интенциялық тремор нысанаға жақындағанда күшеюі ықтимал. Мишық жоспарланған әрекет пен сенсорлық ақпараттың өзара сәйкестігін қамтамасыз ететін желілерге қатысады. Сақталған күш үйлесімнің сақталғанын білдірмейді; бұл бақылау парезбен бірдей емес.",
        "EN": "Dysmetria may reflect faulty scaling or braking of movement; intention tremor can become more prominent near a target. Cerebellar networks contribute to matching motor plans with sensory information and timing corrections. Preserved strength does not imply preserved coordination; the observation is not equivalent to paresis.",
        "KZ": "Дисметрия қимыл ауқымын және тоқтауын дұрыс реттей алмаумен көрінуі мүмкін; интенциялық тремор нысанаға жақындағанда күшеюі ықтимал. Мишық желілері қозғалыс жоспарын сенсорлық ақпаратпен сәйкестендіруге және түзетуді уақытында жасауға қатысады. Күштің сақталуы үйлесімнің сақталғанын білдірмейді, бұл парезбен бірдей емес."
      },
      {
        "RU": "Сезімталдықты, буын қалпын сезуді, көз қозғалысын, жылдам алма-кезек қимылды және жүрісті бөлек тексеріңіз; қайталап өлшеу мен дәрі анамнезі қажет. Мұндай көрініс мишық зақымына сәйкес келуі мүмкін, бірақ жалғыз пальценосовая проба мишықтың нақты аймағын, себепті немесе диагнозды дәлелдемейді. Кенет пайда болған жаңа неврологиялық белгі шұғыл клиникалық бағалауды қажет етеді.",
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
      "RU": "Участник устойчиво стоит с сомкнутыми стопами и открытыми глазами, но после закрывания глаз резко усиливается покачивание. При отдельной пробе обнаружено снижение чувства положения пальцев стоп. Второй участник заметно неустойчив уже с открытыми глазами и идёт на широкой базе. Нужно интерпретировать разницу, не объявляя пробу Ромберга специфической пробой мишықа.",
      "EN": "One participant stands steadily with feet together and eyes open, but sway increases markedly on closing the eyes; toe joint-position sense is reduced on separate testing. Another participant is unstable even with eyes open and walks with a wide base. Interpret the contrast without treating the Romberg test as a cerebellum-specific examination.",
      "KZ": "Бір қатысушы аяқтарын қосып, көзін ашып тұрғанда орнықты, ал көзін жұмғанда теңселуі күрт күшейеді; бөлек тексеруде башпайлардың қалпын сезуі төмендеген. Екінші қатысушы көзі ашық кезде де теңселіп, кең адыммен жүреді. Ромберг сынамасын мишыққа ғана тән деп есептемей, айырмашылықты түсіндіріңіз."
    },
    "questions": [
      {
        "RU": "Бірінші қатысушыда көруді алып тастағанда тепе-теңдіктің нашарлауы нені көрсетеді? Буын қалпын сезудің маңызын атаңыз.",
        "EN": "What does worsening after vision is removed suggest in the first participant? State the role of joint-position sense.",
        "KZ": "Бірінші қатысушыда көру ақпараты жойылғанда тепе-теңдіктің нашарлауы нені білдіреді? Буын қалпын сезудің рөлін атаңыз."
      },
      {
        "RU": "Екінші қатысушыда көз ашық кезде де тұрақсыздықтың болуы мишық пен басқа постуралдық жүйелерді бағалауға қалай әсер етеді?",
        "EN": "How does instability even with eyes open in the second participant guide assessment of cerebellar and other postural systems?",
        "KZ": "Екінші қатысушының көзі ашық кезде де тұрақсыз болуы мишық пен басқа постуралдық жүйелерді бағалауға қалай әсер етеді?"
      },
      {
        "RU": "Сенсорлық, вестибулярлық және мишықтық себептерді ажырату үшін қандай қосымша сынамалар қажет? Ромбергтің оң нәтижесі диагноз бола ма?",
        "EN": "Which further tests could distinguish sensory, vestibular and cerebellar causes? Is a positive Romberg result a diagnosis?",
        "KZ": "Сенсорлық, вестибулярлық және мишықтық себептерді ажырату үшін тағы қандай сынамалар қажет? Ромбергтің оң нәтижесі диагноз бола ма?"
      }
    ],
    "explanations": [
      {
        "RU": "Тұрақты тұру көру, проприоцепция және вестибулярлық сигналдардың бірігуіне тәуелді. Көзі ашықта тұрақты болып, көз жұмғанда күрт нашарлау проприоцептивтік немесе вестибулярлық ақпараттың жеткіліксіздігімен үйлесуі мүмкін; бұл мишық зақымының арнайы дәлелі емес. Буын қалпын сезудің төмендеуі сенсорлық түсіндірмені күшейтеді.",
        "EN": "Stable standing integrates vision, proprioception and vestibular input. Stability with eyes open but marked deterioration on eye closure can fit impaired proprioceptive or vestibular information; it is not specific evidence of cerebellar damage. Reduced joint-position sense strengthens a sensory explanation.",
        "KZ": "Орнықты тұру көру, проприоцепция және вестибулярлық ақпараттың бірігуіне тәуелді. Көзі ашықта орнықты болып, көз жұмғанда күрт нашарлау проприоцептивтік не вестибулярлық ақпарат тапшылығымен үйлесуі мүмкін; бұл мишық зақымының арнайы дәлелі емес. Буын қалпын сезудің төмендеуі сенсорлық түсіндірмені күшейтеді."
      },
      {
        "RU": "Көз ашық кездегі тұрақсыздық пен кең негізді жүріс мишықтық немесе басқа постуралдық бұзылыстарда кездесуі мүмкін. Буын қалпын сезуді, діріл сезімін, көз қозғалысын, нистагмды, жүрісті және аяқ-қол үйлесімін салыстырыңыз. Ромберг сынамасы жеке өзі нақты анатомиялық локализацияны да, аурудың себебін де анықтамайды; қауіпсіздік үшін құлау қаупі ескерілуі тиіс.",
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
        "RU": "Флоккулонодулярлық бөлік пен вестибулярлық ядролардың тепе-теңдік және көз қозғалысын реттеудегі байланысын сипаттаңыз.",
        "EN": "Describe how the flocculonodular lobe and vestibular nuclei contribute to balance and eye-movement control.",
        "KZ": "Флоккулонодулярлық бөлік пен вестибулярлық ядролардың тепе-теңдік пен көз қимылын реттеудегі байланысын сипаттаңыз."
      },
      {
        "RU": "Неліктен нистагмның болуы мишықтың бір ғана бөлігінің зақымын дәлелдемейді? Қандай балама құрылымдарды қарастырасыз?",
        "EN": "Why does nystagmus not establish a lesion in one specific cerebellar region? Which alternative structures should be considered?",
        "KZ": "Неліктен нистагм мишықтың белгілі бір бөлігінің зақымын жеке өзі дәлелдемейді? Қандай балама құрылымдарды қарастырасыз?"
      },
      {
        "RU": "Көз қозғалысы, вестибулоокулярлық рефлекс, есту және басқа неврологиялық белгілердің қандай деректері тұжырымды нақтылайды? Кенет басталу болса не маңызды?",
        "EN": "What eye-movement, vestibulo-ocular reflex, hearing and other neurological findings would refine the inference? Why does sudden onset matter?",
        "KZ": "Көз қозғалысы, вестибулоокулярлық рефлекс, есту және басқа неврологиялық белгілер туралы қандай деректер қорытындыны нақтылайды? Кенет басталу неліктен маңызды?"
      }
    ],
    "explanations": [
      {
        "RU": "Вестибулоцеребеллум, әсіресе флоккулонодулярлық бөлік, вестибулярлық сигналдарды пайдаланып, көзқарасты тұрақтандыруға және дене тепе-теңдігін реттеуге қатысады. Мишық пен вестибулярлық ядролардың өзара байланысы көз және дене қимылдарының үйлесуіне ықпал етеді. Бұл қызмет нистагмның бір ғана себептен туатынын білдірмейді.",
        "EN": "The vestibulocerebellum, especially the flocculonodular lobe, uses vestibular information to help stabilize gaze and regulate balance. Reciprocal connections with vestibular nuclei coordinate eye and body movements. This functional relationship does not imply that nystagmus has a single cause.",
        "KZ": "Вестибулоцеребеллум, әсіресе флоккулонодулярлық бөлік, вестибулярлық ақпаратты пайдаланып, көзқарасты тұрақтандыруға және тепе-теңдікті реттеуге қатысады. Мишық пен вестибулярлық ядролардың өзара байланысы көз бен дене қимылдарының үйлесуіне ықпал етеді. Бұл нистагмның бір ғана себебі бар дегенді білдірмейді."
      },
      {
        "RU": "Нистагм ішкі құлақ, вестибулярлық жүйке, ми бағаны немесе мишық деңгейіндегі әртүрлі бұзылыстарда болуы мүмкін. Бағыты, баспен қозғалысқа жауабы, вестибулоокулярлық рефлекс, есту және қосымша ошақтық белгілерді тексермей локализация жасамаңыз. Кенет басталған тепе-теңдік бұзылысы, әсіресе жаңа неврологиялық белгілермен бірге болса, шұғыл медициналық бағалауды талап етеді.",
        "EN": "Nystagmus may arise from disorders involving the inner ear, vestibular nerve, brainstem or cerebellum. Do not localize solely from its presence: examine direction, response to head movement, vestibulo-ocular reflex, hearing and associated focal signs. Sudden imbalance, especially with new neurological signs, warrants urgent medical assessment.",
        "KZ": "Нистагм ішкі құлақ, вестибулярлық жүйке, ми бағаны немесе мишық бұзылыстарында байқалуы мүмкін. Тек оның бар болуына сүйеніп локализация жасамаңыз: бағытын, бас қозғалысына жауабын, вестибулоокулярлық рефлексті, естуді және қосымша ошақтық белгілерді бағалаңыз. Тепе-теңдік кенет бұзылса, әсіресе жаңа неврологиялық белгілер қосылса, шұғыл медициналық бағалау қажет."
      }
    ]
  },
  {
    "id": "adaptation-aftereffect",
    "title": {
      "RU": "4. Сенсорлық қатеден үйрену",
      "EN": "4. Learning from sensory error",
      "KZ": "4. Сенсорлық қате арқылы үйрену"
    },
    "situation": {
      "RU": "Зертханалық оқу тапсырмасында экрандағы курсор қол қозғалысына қатысты бірдей бұрышқа бұрылады. Алғашқы он талпыныста нысанаға жету қатесі жоғары; қайталаудан кейін орташа қате азаяды. Курсор бұрылуы алынып тасталғанда қимыл қысқа уақыт қарсы бағытқа ауытқиды. Бұл деректер тек мінез-құлықты көрсетеді; нейрондардың разрядтары тіркелмеген.",
      "EN": "In a teaching task, the on-screen cursor is rotated by a fixed angle relative to hand movement. Target error is large over the first ten attempts but decreases with repetition. When rotation is removed, movements briefly deviate in the opposite direction. These are behavioral measurements only; no neuronal firing was recorded.",
      "KZ": "Оқу тәжірибесінде экрандағы курсор қол қимылына қатысты тұрақты бұрышқа бұрылады. Алғашқы он әрекетте нысанаға жету қатесі үлкен, ал қайталаған сайын орташа қате азаяды. Бұрылу жойылғанда қимыл қысқа уақыт қарама-қарсы жаққа ауытқиды. Бұл тек мінез-құлық өлшемдері; нейрон импульстері тіркелмеген."
    },
    "questions": [
      {
        "RU": "Қате азаюын және бұрылу алынғаннан кейінгі қарама-қарсы ауытқуды жеке сипаттаңыз. Қайсысы бейімделудің кейінгі әсеріне сәйкес келеді?",
        "EN": "Describe error reduction and the opposite deviation after rotation removal separately. Which observation is an adaptation aftereffect?",
        "KZ": "Қатенің азаюын және бұрылу жойылғаннан кейінгі қарама-қарсы ауытқуды бөлек сипаттаңыз. Қайсысы бейімделудің кейінгі әсеріне сәйкес келеді?"
      },
      {
        "RU": "Мишық желілерінің сенсорлық қате бойынша қимылды дәлдеудегі рөлін түсіндіріңіз. Қай тұжырым тек мінез-құлық деректерінен жасалмайды?",
        "EN": "Explain how cerebellar networks contribute to calibration using sensory error. What cannot be inferred from behavioral data alone?",
        "KZ": "Мишық желілерінің сенсорлық қате арқылы қимылды дәлдеудегі рөлін түсіндіріңіз. Тек мінез-құлық деректерінен қандай тұжырым жасауға болмайды?"
      },
      {
        "RU": "Стратегиялық түзету мен сенсомоторлық бейімделуді ажырату үшін қандай бақылау жағдайларын қосасыз? Неге бір қисық нақты нейрондық механизмді дәлелдемейді?",
        "EN": "Which control conditions could separate explicit strategy from sensorimotor adaptation? Why cannot one learning curve establish a unique neuronal mechanism?",
        "KZ": "Саналы стратегия мен сенсомоторлық бейімделуді ажырату үшін қандай бақылау шарттарын қосасыз? Неліктен бір үйрену қисығы нақты нейрондық механизмді дәлелдемейді?"
      }
    ],
    "explanations": [
      {
        "RU": "Қателіктің қайталанған әрекеттерде азаюы жаттығу мен бейімделуге сәйкес келеді, бірақ зейін мен саналы стратегияның әсерін де қамтуы мүмкін. Бұрылуды алып тастағаннан кейінгі қарсы бағыттағы қысқа ауытқу бұрынғы түрлендіруге бейімделудің кейінгі әсері ретінде түсіндіріледі. Мишық сенсорлық қатеге негізделген дәлдеуге қатысады, бірақ мінез-құлық дерегі бір нейрондық тізбекті жеке анықтамайды.",
        "EN": "Declining error with repetition is compatible with practice and adaptation, but attention and explicit strategies can also contribute. A brief deviation opposite to the previous rotation after its removal is an adaptation aftereffect. Cerebellar circuits participate in sensory-error calibration, yet behavior alone cannot identify a single neuronal circuit.",
        "KZ": "Қайталанған әрекеттерде қатенің азаюы жаттығу мен бейімделуге сәйкес келеді, бірақ зейін және саналы стратегия да әсер етуі мүмкін. Бұрылу жойылғаннан кейінгі қарама-қарсы қысқа ауытқу бейімделудің кейінгі әсері болып саналады. Мишық сенсорлық қате арқылы қимылды дәлдеуге қатысады, алайда мінез-құлық дерегі бір ғана нейрондық тізбекті анықтамайды."
      },
      {
        "RU": "Қатысушылардың бастапқы дәлдігін, бұрылу бұрышын, әрекет санын, көру кері байланысын және нұсқауды бірдей ұстаңыз; күтпеген бұрылу мен кері байланысты алып тастау кезеңдерін салыстырыңыз. Саналы стратегия туралы есеп пен кейінгі әсерді бөлек өлшеу пайдалы. Нақты жасуша белсенділігін, ошақтық зақымды немесе диагнозды осы графиктен шығаруға болмайды.",
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
    "Бақылау",
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
