import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Module 14 original thalamic cases. Evidence checked against:
// Guyton & Hall 13e PDF 584-587; Ganong 23e PDF 241-243;
// C. L. Ghai Practical Physiology 8e PDF 323-326.
// Teaching simplifications are not clinical diagnostic algorithms.
type Text = Record<Language, string>;
type Scenario = { id: string; title: Text; situation: Text; questions: [Text, Text, Text]; explanations: [Text, Text] };
const scenarios: Scenario[] = [
  {
    "id": "crossed-spinal-modalities",
    "title": {
      "RU": "1. Разные стороны потери чувствительности",
      "EN": "1. Opposite-sided sensory deficits",
      "KZ": "1. Сезімталдықтың екі жақта әртүрлі бұзылуы"
    },
    "situation": {
      "RU": "После одностороннего повреждения правой половины спинного мозга у участника ниже уровня поражения снижены вибрационная и суставно-мышечная чувствительность справа, а болевая и температурная — слева, начиная на несколько сегментов ниже. Чувствительность лица сохранена. Это учебная модель неполного поражения, а не описание реального диагноза.",
      "EN": "After a right-sided spinal cord lesion, a learner has reduced vibration and joint-position sense on the right below the lesion, but reduced pain and temperature sensation on the left beginning several segments lower. Facial sensation is preserved. This is a simplified teaching pattern of an incomplete lesion, not a clinical diagnosis.",
      "KZ": "Жұлынның оң жартысы зақымданған оқу жағдайында зақым деңгейінен төмен оң жақта дірілді және буын қалпын сезу, ал бірнеше сегмент төменнен бастап сол жақта ауырсыну мен температураны сезу азайған. Бет сезімталдығы сақталған. Бұл — толық емес зақымның ықшамдалған оқу үлгісі, нақты диагноз емес."
    },
    "questions": [
      {
        "RU": "Екі модальдық топты және әрқайсысының жұлындағы көтерілу жолын атаңыз. Қай белгі тек таламустық ошақпен түсіндіруге келмейді?",
        "EN": "Identify the two modality groups and their ascending spinal pathways. Which finding argues against a single isolated thalamic lesion?",
        "KZ": "Екі сезімталдық тобын және олардың жұлындағы жоғарылаушы жолдарын атаңыз. Қай белгі тек таламустағы жеке ошақпен түсіндірілмейді?"
      },
      {
        "RU": "Артқы баған жолының және алдыңғы-бүйірлік жүйенің негізгі айқасу деңгейлерін салыстырыңыз. Неліктен тапшылық жақтары әртүрлі?",
        "EN": "Compare the major decussation levels of the dorsal column–medial lemniscal and anterolateral pathways. Why are the deficits on different sides?",
        "KZ": "Артқы баған–медиалдық ілмек пен алдыңғы-бүйірлік жүйенің негізгі айқасу деңгейлерін салыстырыңыз. Неліктен сезімталдық бұзылыстары екі жақта орналасқан?"
      },
      {
        "RU": "Какие проверки уровня, модальностей, силы и чувствительности лица помогут проверить гипотезу? Можно ли определить точный очаг по одному шаблону?",
        "EN": "What examinations of sensory level, modalities, strength and facial sensation would test the hypothesis? Can this pattern alone establish the exact lesion?",
        "KZ": "Сезімталдық деңгейін, түрлерін, күшті және бет сезімталдығын қандай тексерулер нақтылайды? Тек осы үлгімен ошақты дәл анықтауға бола ма?"
      }
    ],
    "explanations": [
      {
        "RU": "Волокна осознанной проприоцепции и вибрации поднимаются в задних бағанах преимущественно на своей стороне и перекрещиваются после переключения в продолговатом мозге. Большинство болевых и температурных волокон переключаются в заднем роге и перекрещиваются в спинном мозге через переднюю белую спайку в пределах нескольких сегментов. Поэтому одностороннее спинальное поражение может дать разноимённые стороны потери модальностей; это не типичный изолированный таламический рисунок.",
        "EN": "Conscious proprioception and vibration ascend ipsilaterally in the dorsal columns before synapsing and crossing in the caudal medulla. Most pain and temperature fibers synapse in the dorsal horn and cross in the spinal cord through the anterior white commissure over a short segmental distance. Thus a unilateral spinal lesion can produce opposite-sided modality deficits; the pattern is not characteristic of a single isolated thalamic relay lesion.",
        "KZ": "Саналы проприоцепция мен діріл ақпараты артқы бағандармен өз жағында көтеріліп, сопақша мида ауысып, содан кейін айқасады. Ауырсыну мен температура талшықтарының көбі артқы мүйізде ауысып, бірнеше сегмент аралығында жұлынның алдыңғы ақ комиссурасы арқылы айқасады. Сондықтан біржақты жұлын зақымы сезімталдық түрлерінің қарама-қарсы жақтарда бұзылуын туғызуы мүмкін; бұл таламустың жеке релейлік ошағына тән емес."
      },
      {
        "RU": "VPL получает уже перекрещенную соматосенсорную информацию от противоположной половины тела, но сам по себе не объясняет характерный спинальный разрыв модальностей. Нужно проверить уровень чувствительности, сакральные сегменты, силу, рефлексы и альтернативные причины; положение пересечения боли и температуры варьирует по сегментам. Внезапный новый неврологический дефицит требует срочной медицинской оценки.",
        "EN": "The VPL receives predominantly crossed somatosensory information from the contralateral body, but a VPL lesion alone does not explain this spinal dissociation of modalities. Check the sensory level, sacral segments, strength, reflexes and alternatives; segmental pain/temperature crossing is not perfectly uniform. A sudden new neurological deficit warrants urgent clinical assessment.",
        "KZ": "VPL көбіне дененің қарама-қарсы жағынан айқасып келген соматосенсорлық ақпаратты қабылдайды, бірақ VPL-дің жеке зақымы мұндай жұлындық модальдық ажырауды түсіндірмейді. Сезімталдық деңгейін, сегменттерді, күшті, рефлекстерді және балама себептерді тексеру қажет; ауырсыну мен температура жолының айқасуы сегменттер бойынша біркелкі емес. Жаңа кенет неврологиялық тапшылық шұғыл бағалауды талап етеді."
      }
    ]
  },
  {
    "id": "face-body-relays",
    "title": {
      "RU": "2. Лицо и кисть: выбор ядра",
      "EN": "2. Face versus hand relay",
      "KZ": "2. Бет пен қол: релейлік ядроны таңдау"
    },
    "situation": {
      "RU": "В учебной карте сенсорной системы две записи: после раздражения кожи левой кисти ответ появляется в правом VPL, а после раздражения левой щеки — преимущественно в правом VPM. Измерены только усреднённые сигналы, без регистрации отдельных клеток и без данных о поражении. Студент должен связать вход, ядро и корковую проекцию.",
      "EN": "In a teaching map, stimulation of the left hand is associated with a response in the right VPL, whereas stimulation of the left cheek is associated mainly with the right VPM. Only averaged signals were recorded, not single-neuron activity, and no lesion data are available. The task is to map input, relay nucleus and cortical projection.",
      "KZ": "Оқу картасында сол қол терісін тітіркендіргенде оң VPL-де, ал сол жақ ұртты тітіркендіргенде көбіне оң VPM-де жауап байқалады. Тек орташа сигналдар тіркелген, жеке нейрондар өлшенбеген және зақым деректері жоқ. Міндет — кірісті, релейлік ядроны және қыртыстық проекцияны байланыстыру."
    },
    "questions": [
      {
        "RU": "Какое ядро преимущественно обрабатывает чувствительность тела, а какое — лица? Почему нельзя считать эти ядра полностью изолированными?",
        "EN": "Which relay predominantly handles body sensation, and which handles facial sensation? Why are these nuclei not entirely isolated systems?",
        "KZ": "Дене сезімталдығын қай ядро, ал бет сезімталдығын қай ядро негізінен өткізеді? Неліктен оларды толық оқшау жүйелер деуге болмайды?"
      },
      {
        "RU": "Укажите роль медиальной петли и тройничных соматосенсорных путей, а также основную корковую мишень. Объясните, что означает соматотопия.",
        "EN": "Identify the medial lemniscus and trigeminal somatosensory pathways and their main cortical target. Explain what somatotopy means.",
        "KZ": "Медиалдық ілмек пен үшкіл жүйкенің соматосенсорлық жолдарын және олардың негізгі қыртыстық нысанасын атаңыз. Соматотопияның мәнін түсіндіріңіз."
      },
      {
        "RU": "Какие дополнительные модальности и участки тела нужно сравнить, прежде чем локализовать возможный очаг? Доказывает ли усреднённый сигнал активность одного нейрона?",
        "EN": "Which other modalities and body regions should be compared before localizing a possible lesion? Does an averaged signal prove single-neuron activity?",
        "KZ": "Ықтимал ошақты анықтамас бұрын қандай сезімталдық түрлері мен дене бөліктерін салыстыру қажет? Орташа сигнал жеке нейрон белсенділігін дәлелдей ме?"
      }
    ],
    "explanations": [
      {
        "RU": "VPL связан преимущественно с соматосенсорной информацией тела, а VPM — лица, поступающей по тройничным путям. После соответствующих перекрёстов релейные нейроны проецируют информацию главным образом к постцентральной соматосенсорной коре. Соматотопия означает упорядоченное, хотя не абсолютно жёсткое, представительство участков тела.",
        "EN": "VPL predominantly relays somatosensory information from the body, while VPM predominantly handles the face through trigeminal pathways. After the relevant crossings, relay neurons project mainly to the postcentral somatosensory cortex. Somatotopy is an ordered, but not absolutely rigid, representation of body regions.",
        "KZ": "VPL көбіне денеден, ал VPM үшкіл жүйке жолдары арқылы беттен келетін соматосенсорлық ақпаратты өткізеді. Тиісті айқасулардан кейін релейлік нейрондар ақпаратты негізінен постцентралдық соматосенсорлық қыртысқа жеткізеді. Соматотопия — дене бөліктерінің реттелген, бірақ мүлде өзгермейтін емес, көрінісі."
      },
      {
        "RU": "Разделение VPL/VPM помогает построить гипотезу, но не позволяет по одному ответу отличить таламус от ствола, внутренней капсулы и коры. Усреднённый сигнал отражает активность популяций и условия измерения, а не уникальную клетку или диагноз. Дополнительные пробы должны охватывать лицо, руку, ногу и разные виды чувствительности.",
        "EN": "The VPL/VPM distinction guides a hypothesis but one response cannot distinguish thalamus from brainstem, internal capsule or cortical alternatives. An averaged response reflects population activity and measurement conditions, not one identified neuron or a diagnosis. Compare face, arm, leg and several sensory modalities.",
        "KZ": "VPL/VPM айырмашылығы болжам жасауға көмектеседі, бірақ бір жауаппен таламусты ми бағанынан, ішкі капсуладан не қыртыстан ажыратуға болмайды. Орташа жауап өлшеу жағдайлары мен нейрондар популяциясының белсенділігін көрсетеді, бір жасушаны немесе диагнозды емес. Бет, қол, аяқ және сезімталдық түрлерін салыстыру керек."
      }
    ]
  },
  {
    "id": "reticular-inhibition",
    "title": {
      "RU": "3. Таламическое торможение и внимание",
      "EN": "3. Reticular inhibition and attention",
      "KZ": "3. Таламустық тежелу және зейін"
    },
    "situation": {
      "RU": "В условной лаборатории сила кожного стимула постоянна. В одном блоке опытов активность таламических релейных нейронов ниже, когда сильнее активируются ГАМК-ергические нейроны ретикулярного ядра. Участник при этом иногда пропускает стимул, но число ложных тревог и состояние бодрствования не контролировали. Модель не является прямым измерением человеческого таламуса.",
      "EN": "In an illustrative experiment, skin stimulus intensity is held constant. Relay-cell activity is lower in trials with greater activation of GABAergic thalamic reticular neurons. The participant sometimes misses the stimulus, but false alarms and arousal were not controlled. The model is not a direct measurement of the human thalamus.",
      "KZ": "Шартты тәжірибеде тері тітіркендіргішінің күші өзгермейді. Таламустың ретикулярлық ядросындағы ГАМҚ-ергиялық нейрондар белсендірек болған сынақтарда релейлік жасушалардың жауабы төмен. Қатысушы кейде тітіркендіргішті байқамайды, бірақ жалған дабылдар мен сергектік күйі бақыланбаған. Бұл адам таламусын тікелей өлшеу емес."
    },
    "questions": [
      {
        "RU": "Какие клетки в этом контуре преимущественно возбуждают кору, а какие локально тормозят релейные ядра? Назовите медиаторы.",
        "EN": "Which cells predominantly excite cortex and which inhibit relay nuclei locally? Name their principal transmitters.",
        "KZ": "Бұл тізбекте қандай жасушалар қыртысты қоздырады, ал қайсысы релейлік ядроларды тежейді? Негізгі медиаторларды атаңыз."
      },
      {
        "RU": "Постройте причинную гипотезу о влиянии ГАМК-ергического торможения на релейный ответ. Почему меньший ответ не доказывает уменьшение осознанного восприятия?",
        "EN": "Build a causal hypothesis linking GABAergic inhibition to relay output. Why does a smaller response not prove reduced conscious perception?",
        "KZ": "ГАМҚ-ергиялық тежелу мен релейлік жауап арасындағы себептік болжамды құрыңыз. Неліктен әлсіз жауап саналы қабылдаудың азайғанын дәлелдемейді?"
      },
      {
        "RU": "Какие условия и показатели нужно контролировать: внимание, бодрствование, число пропусков, ложные тревоги, повторяемость? Можно ли по этому опыту локализовать клинический очаг?",
        "EN": "Which conditions and measures should be controlled: attention, arousal, misses, false alarms and repeatability? Can this experiment localize a clinical lesion?",
        "KZ": "Зейінді, сергектікті, өткізіп алуды, жалған дабылды және қайталануды қалай бақылауға болады? Осы тәжірибемен клиникалық ошақты анықтауға бола ма?"
      }
    ],
    "explanations": [
      {
        "RU": "Большинство таламокортикальных релейных нейронов возбуждающие и используют глутамат. Нейроны ретикулярного ядра таламуса ГАМК-ергические: они тормозят таламические релейные клетки и обычно не посылают аксонов прямо в кору. Кортикоталамическая обратная связь и состояние сети могут менять эффективность передачи, поэтому простая схема не заменяет реальную динамику таламокортикальных контуров.",
        "EN": "Most thalamocortical relay neurons are excitatory and use glutamate. Thalamic reticular neurons are GABAergic: they inhibit thalamic relay cells and generally do not send axons directly to cortex. Corticothalamic feedback and network state can modify transmission, so a simple diagram is not a complete model of thalamocortical dynamics.",
        "KZ": "Таламокортикалдық релейлік нейрондардың көбі қоздырғыш және глутамат бөледі. Таламустың ретикулярлық ядросындағы нейрондар ГАМҚ-ергиялық: олар релейлік жасушаларды тежейді және әдетте қыртысқа тікелей аксон жібермейді. Қыртыстан таламусқа кері байланыс пен желі күйі берілісті өзгертеді; қарапайым сызба толық физиологиялық модель емес."
      },
      {
        "RU": "При постоянном стимуле меньший релейный ответ совместим с усилением торможения, но причинность требует независимого изменения тормозного звена и контроля других входов. Осознанное обнаружение оценивают поведением, включая пропуски и ложные тревоги, а не одной амплитудой. Внимание, сонливость, мотивация и артефакты могут менять результат; из него нельзя вывести клинический диагноз.",
        "EN": "With a constant stimulus, reduced relay output is compatible with stronger inhibition, but causal inference requires independent manipulation and control of other inputs. Conscious detection must be assessed behaviorally, including misses and false alarms, not inferred from amplitude alone. Attention, drowsiness, motivation and artifacts can alter results; no clinical diagnosis follows.",
        "KZ": "Тітіркендіргіш өзгермегенде релейлік жауаптың азаюы тежелудің күшеюіне сәйкес келуі мүмкін, бірақ себептілікті дәлелдеу үшін тежегіш буынды бөлек өзгертіп, өзге кірістерді бақылау қажет. Саналы анықтау тек амплитудамен емес, өткізіп алу және жалған дабылдарды қоса мінез-құлықпен бағаланады. Зейін, ұйқышылдық және артефакт нәтижеге әсер етеді; диагноз шығаруға болмайды."
      }
    ]
  },
  {
    "id": "sensory-exceptions",
    "title": {
      "RU": "4. Три анализатора и обонятельное исключение",
      "EN": "4. Three senses and the olfactory exception",
      "KZ": "4. Үш сезім және иіс сезу ерекшелігі"
    },
    "situation": {
      "RU": "Студент рисует три пути к коре: сетчатка → латеральное коленчатое тело → зрительная кора; слуховые пути → медиальное коленчатое тело → слуховая кора; обонятельная луковица → первичные обонятельные корковые области. Он подписывает все три как «обязательное первое переключение в таламусе». Преподаватель просит найти ошибку и уточнить ограничения упрощённой схемы.",
      "EN": "A student draws three cortical routes: retina → lateral geniculate nucleus → visual cortex; auditory pathways → medial geniculate nucleus → auditory cortex; olfactory bulb → primary olfactory cortical regions. The student labels all three as requiring an initial thalamic relay. The instructor asks for the error and limits of this simplified diagram.",
      "KZ": "Студент қыртысқа баратын үш жолды сызады: торқабық → латералдық тізелі дене → көру қыртысы; есту жолдары → медиалдық тізелі дене → есту қыртысы; иіс сезу баданасы → алғашқы иіс сезу қыртысы. Ол үшеуін де «таламуста міндетті алғашқы ауысу» деп белгілейді. Оқытушы қатені және ықшам сызбаның шектеулерін табуды сұрайды."
    },
    "questions": [
      {
        "RU": "Какому анализатору соответствует латеральное, а какому — медиальное коленчатое тело? Почему слуховой путь нельзя свести к одному синапсу?",
        "EN": "Which sense uses the lateral versus medial geniculate nucleus? Why is the auditory pathway not a single-synapse chain?",
        "KZ": "Латералдық және медиалдық тізелі денелер қай сезімге сәйкес келеді? Неліктен есту жолы бір синапспен шектелмейді?"
      },
      {
        "RU": "Какое из трёх утверждений об обязательном первом таламическом реле неверно? Отличается ли отсутствие обязательного начального реле от полного отсутствия связей с таламусом?",
        "EN": "Which claim about an obligatory initial thalamic relay is incorrect? Does bypassing that initial relay mean olfaction has no thalamic connections at all?",
        "KZ": "Міндетті бастапқы таламустық реле туралы қай тұжырым қате? Алғашқы реледен өтпеу иіс сезудің таламуспен мүлде байланысы жоқ дегенді білдіре ме?"
      },
      {
        "RU": "Укажите, что схема не показывает: перекрёст зрительных волокон, стволовые слуховые переключения, обратные связи и ассоциативные пути. Почему нельзя ставить диагноз по этой схеме?",
        "EN": "Name what the drawing omits: visual chiasmal crossing, brainstem auditory relays, feedback and association pathways. Why is the drawing not a diagnostic test?",
        "KZ": "Сызба нені көрсетпейді: көру талшықтарының хиазмада айқасуын, ми бағанындағы есту релелерін, кері байланыс пен ассоциативтік жолдарды? Неліктен ол диагностикалық сынақ емес?"
      }
    ],
    "explanations": [
      {
        "RU": "Латеральное коленчатое тело — основное таламическое зрительное реле, медиальное — слуховое. Слуховая система включает несколько стволовых и среднемозговых переключений до медиального коленчатого тела. Обонятельная информация из луковицы достигает первичных обонятельных корковых областей без обязательного начального переключения в таламусе; позднее таламические связи участвуют в более сложной обработке запахов.",
        "EN": "The lateral geniculate nucleus is the principal visual thalamic relay and the medial geniculate nucleus is the auditory relay. Auditory processing includes several brainstem and midbrain stages before the medial geniculate. Olfactory bulb output can reach primary olfactory cortical regions without an obligatory initial thalamic relay; later thalamic connections contribute to higher-order odor processing.",
        "KZ": "Латералдық тізелі дене — көрудің негізгі таламустық релесі, медиалдық тізелі дене — естудің релесі. Есту жолында медиалдық тізелі денеге дейін ми бағаны мен ортаңғы мида бірнеше ауысу бар. Иіс сезу баданасынан ақпарат алғашқы иіс сезу қыртысына міндетті бастапқы таламустық релесіз жетеді; кейінгі таламустық байланыстар иісті күрделі өңдеуге қатысады."
      },
      {
        "RU": "Упрощённая стрелочная схема полезна для сравнения основных маршрутов, но не показывает все синапсы, обратные связи, двусторонние связи и индивидуальные различия. По одной схеме нельзя локализовать выпадение поля зрения, тугоухость или аносмию: необходимы отдельные исследования функции и анатомии. Не следует утверждать, что обоняние вообще не связано с таламусом.",
        "EN": "The arrows compare major routes but omit many synapses, feedback loops, bilateral projections and individual variation. The sketch cannot localize visual-field loss, hearing impairment or anosmia; separate functional and anatomical assessment is needed. The olfactory exception must not be misread as a complete absence of thalamic involvement.",
        "KZ": "Көрсеткілер негізгі жолдарды салыстыруға пайдалы, бірақ барлық синапсты, кері байланысты, екіжақты проекцияны және жеке ерекшеліктерді қамтымайды. Бұл сызба көру өрісі, есту немесе иіс сезу бұзылуының ошағын анықтамайды; бөлек функционалдық және анатомиялық тексерулер қажет. Иіс сезу таламуспен мүлде байланыспайды деп айтуға болмайды."
      }
    ]
  }
];
const introduction: Text = {
  "RU": "Четыре независимые задачи о таламических реле, перекрёстах, торможении и сенсорных исключениях. На каждом этапе сначала запишите собственный ответ, затем сравните его с физиологическим разбором. Ввод текста не означает автоматическую проверку научной правильности; задачи не предназначены для постановки диагноза.",
  "EN": "Four independent cases examine thalamic relays, sensory crossings, inhibition and exceptions. Write your own reasoning at each stage before viewing the physiological analysis. Text entry does not constitute automatic scientific grading, and these cases do not establish diagnoses.",
  "KZ": "Төрт тәуелсіз оқу жағдайы таламустық релелерді, сезімталдық жолдарының айқасуын, тежелуді және ерекшеліктерді талдайды. Әр кезеңде алдымен өз жауабыңызды жазыңыз, содан кейін физиологиялық түсіндірмені қараңыз. Мәтін енгізу ғылыми дұрыстықты автоматты бағаламайды; бұл жағдайлар диагноз қоюға арналмаған."
};
const headings: Record<Language, [string, string, string]> = {
  "RU": [
    "Наблюдения",
    "Механизм",
    "Проверка и ограничения"
  ],
  "EN": [
    "Observations",
    "Mechanism",
    "Tests and limits"
  ],
  "KZ": [
    "Бақылаулар",
    "Тетік",
    "Тексеру және шектеулер"
  ]
};
export function createModuleFourteenCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle,
    introduction: introduction[language],
    ui,
    cases: scenarios.map(item => ({
      id: "m14-thalamus-case-" + item.id,
      title: item.title[language],
      situation: item.situation[language],
      stages: item.questions.map((q, index) => ({ title: headings[language][index], questions: [q[language]] })),
      explanation: item.explanations.map(p => p[language]),
    })),
  };
}
