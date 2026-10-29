import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 14: original scripted thalamic/somatosensory reasoning case, NOT a diagnostic algorithm.
// Source checks: Guyton & Hall 13e PDF 584–586 (print 609–611);
// Ganong 23e PDF 241–243 (print 229–231);
// C. L. Ghai Practical Physiology 8e PDF 323–325 (print 301–303).
// Clinical observations are predefined, not produced by the learner's choice.
type L = Record<Language,string>;
const l=(RU:string,EN:string,KZ:string):L=>({RU,EN,KZ});
type Step={title:L;task:L;observation:L;choices:[L,L,L];explanation:L;wrong:[L,L]};
const steps:Step[]=[
 {
  title:l("Начало и безопасность","Onset and safety","Басталуы және қауіпсіздік"),
  task:l("Женщина 50 лет отмечает изменение чувствительности правой кисти и стопы. Что уточнить до анатомической локализации?","A 50-year-old woman reports altered sensation in her right hand and foot. What should be established before anatomical localization?","50 жастағы әйел оң қолы мен табанындағы сезімталдықтың өзгергенін айтады. Анатомиялық орнын болжаудан бұрын нені анықтау қажет?"),
  observation:l("В учебном описании симптомы развивались постепенно в течение трёх недель; внезапного начала, слабости, нарушения речи и новой сильной головной боли не было. Внезапные новые очаговые симптомы требовали бы срочной медицинской оценки.","In this scripted history symptoms developed gradually over three weeks; there was no sudden onset, weakness, speech disturbance or new severe headache. New sudden focal symptoms would require urgent medical assessment.","Оқу сипаттамасында белгілер үш апта ішінде біртіндеп дамыған; кенет басталу, әлсіздік, сөйлеудің бұзылуы немесе жаңа қатты бас ауруы болмаған. Жаңа кенет ошақтық белгілер шұғыл медициналық бағалауды қажет етеді."),
  choices:[
   l("Уточнить время начала, динамику и признаки острого неврологического нарушения до обсуждения пути","Clarify onset, progression and acute neurological warning signs before discussing a pathway","Жолды талқылаудан бұрын басталу уақытын, өзгерісін және жедел неврологиялық қауіпті белгілерді анықтау"),
   l("Сразу подтвердить поражение левого таламуса по жалобе на онемение","Immediately confirm a left thalamic lesion from the complaint of numbness","Ұю туралы шағыммен сол таламустың зақымын бірден растау"),
   l("Не выяснять внезапность, поскольку важна только сторона онемения","Ignore sudden onset because only the side of numbness matters","Тек ұю жағы маңызды деп, кенет басталуын анықтамау")
  ],
  explanation:l("Временной профиль определяет срочность, но не указывает единственный очаг. Жалоба на изменение чувствительности встречается при поражении периферических и центральных звеньев.","Time course guides urgency but does not identify a unique lesion. Altered sensation can arise from peripheral or central pathways.","Белгілердің уақыттық ағымы шұғылдықты анықтайды, бірақ жалғыз ошақты көрсетпейді. Сезімталдықтың өзгеруі шеткі де, орталық та жолдардың бұзылуынан болуы мүмкін."),
  wrong:[
   l("Одна жалоба не подтверждает очаг в таламусе.","One symptom cannot establish a thalamic lesion.","Бір шағым таламус ошағын дәлелдемейді."),
   l("Пропуск внезапного начала опасен: острая очаговая симптоматика требует срочной оценки.","Ignoring sudden onset is unsafe; acute focal symptoms require urgent assessment.","Кенет басталуды елемеу қауіпті: жедел ошақтық белгілер шұғыл бағалауды қажет етеді.")
  ]
 },
 {
  title:l("Модальность и сила","Modality and strength","Сезім түрі және күш"),
  task:l("Какие данные помогут различить заднеканатиково-медиально-петлевую систему и переднебоковой путь?","Which findings help distinguish the dorsal column–medial lemniscal system from the anterolateral pathway?","Артқы баған–медиалдық ілмек жүйесін алдыңғы-бүйірлік жолдан ажыратуға қандай деректер көмектеседі?"),
  observation:l("В синтетическом осмотре вибрация и чувство положения пальцев справа снижены; болевая и температурная чувствительность относительно сохранены, сила при сопротивлении сохранена. Это описание, а не проведённый студентом осмотр.","In the scripted examination vibration and joint-position sense are reduced on the right; pain and temperature are relatively preserved, and strength against resistance is preserved. The learner has not performed an examination.","Оқу тексеруінде оң жақта дірілді және буын қалпын сезу төмендеген; ауырсыну мен температура сезімі салыстырмалы сақталған, қарсыласуға қарсы күш сақталған. Студент нақты тексеру жүргізген жоқ."),
  choices:[
   l("Сопоставить нарушение вибрации и проприоцепции с задними канатиками и медиальной петлёй, не делая вывода об уровне очага","Relate vibration and proprioception loss to the dorsal columns and medial lemniscus without fixing a lesion level","Діріл мен проприоцепцияның төмендеуін артқы бағандар және медиалдық ілмекпен байланыстырып, ошақ деңгейін түпкілікті анықтамау"),
   l("Приписать избирательное нарушение вибрации только переднебоковому болевому пути","Attribute selective vibration loss solely to the anterolateral pain pathway","Діріл сезімінің таңдамалы төмендеуін тек алдыңғы-бүйірлік ауырсыну жолына жатқызу"),
   l("Считать сохранную силу доказательством отсутствия всех центральных поражений","Treat preserved strength as proof that no central lesion exists","Күштің сақталуын орталық зақымның мүлде жоқтығына дәлел деп санау")
  ],
  explanation:l("Тонкое осязание, вибрация и сознательная проприоцепция преимущественно передаются заднеканатиково-медиально-петлевой системой; боль и температура — главным образом переднебоковой. Сохранная сила не исключает чувствительное центральное поражение.","Fine discriminative touch, vibration and conscious proprioception are mainly conveyed by the dorsal column–medial lemniscal system; pain and temperature mainly by the anterolateral system. Preserved strength does not exclude a central sensory lesion.","Нәзік ажыратылатын жанасу, діріл және саналы проприоцепция көбіне артқы баған–медиалдық ілмек жүйесімен, ал ауырсыну мен температура негізінен алдыңғы-бүйірлік жүйемен беріледі. Күштің сақталуы орталық сезімталдық зақымын жоққа шығармайды."),
  wrong:[
   l("Переднебоковой путь прежде всего связан с болью и температурой, а не с точной вибрацией.","The anterolateral pathway chiefly conveys pain and temperature, not precise vibration.","Алдыңғы-бүйірлік жол негізінен ауырсыну мен температураны өткізеді, дәл дірілді емес."),
   l("Двигательная сила и сенсорная проводимость оценивают разные функции.","Motor strength and sensory transmission test different functions.","Қозғалтқыш күш пен сезім өткізгіштігі әртүрлі қызметтерді бағалайды.")
  ]
 },
 {
  title:l("Перекрёст и сторона","Decussation and side","Айқасу және жақ"),
  task:l("Где пересекаются основные волокна системы вибрации и положения тела и почему сторона симптомов не доказывает уровень очага?","Where does the main vibration/position pathway cross, and why does symptom laterality not establish the lesion level?","Діріл мен дене қалпын сезудің негізгі жолы қайда айқасады және белгі жағы неге ошақ деңгейін дәлелдемейді?"),
  observation:l("Данные о правостороннем снижении вибрации и положения повторяются при учебном осмотре. Сведений о спинальных, стволовых и корковых признаках пока недостаточно.","Right-sided vibration and position deficits are repeated in the scripted examination. Information about spinal, brainstem and cortical signs is still insufficient.","Оқу тексеруінде оң жақтағы діріл мен қалып сезімінің төмендеуі қайталанды. Жұлындық, ми бағандық және қыртыстық белгілер туралы дерек әлі жеткіліксіз."),
  choices:[
   l("Указать переключение в ядрах тонкого и клиновидного пучков и перекрёст в продолговатом мозге; сравнить очаги выше и ниже перекрёста","Identify relay in gracile/cuneate nuclei and decussation in the medulla; compare lesions above and below the crossing","Жіңішке және сына тәрізді шоғыр ядроларындағы ауысуды, сопақша мидағы айқасуды атап, айқасудан жоғары және төмен ошақтарды салыстыру"),
   l("Утверждать, что все волокна вибрации впервые пересекаются сразу в спинном мозге","Claim that all vibration fibers first cross immediately in the spinal cord","Діріл талшықтарының бәрі бірден жұлында айқасады деу"),
   l("Назвать левый VPL единственно возможным очагом без исследования спинного мозга и коры","Name the left VPL as the only possible lesion without examining cord or cortex","Жұлын мен қыртысты тексермей, сол VPL-ді жалғыз ықтимал ошақ деу")
  ],
  explanation:l("В заднеканатиковом пути первые нейроны поднимаются на своей стороне до ядер продолговатого мозга; волокна вторых нейронов пересекаются и идут медиальной петлёй к контралатеральному VPL. Правосторонний дефицит может возникать на разных уровнях, в том числе справа ниже перекрёста или слева выше него.","In the dorsal column pathway first-order axons ascend ipsilaterally to medullary nuclei; second-order axons cross and ascend in the medial lemniscus to the contralateral VPL. Right-sided deficits may arise at different levels, including on the right below the crossing or on the left above it.","Артқы баған жолында бірінші нейрон аксондары өз жағымен сопақша ми ядроларына дейін көтеріледі; екінші нейрон талшықтары айқасып, медиалдық ілмек арқылы қарсы жақ VPL-ге барады. Оң жақтағы тапшылық айқасудан төмен оң жақта да, одан жоғары сол жақта да пайда болуы мүмкін."),
  wrong:[
   l("В отличие от переднебокового пути, основной заднеканатиковый перекрёст находится в продолговатом мозге.","Unlike the anterolateral system, the main dorsal column decussation is in the medulla.","Алдыңғы-бүйірлік жүйеден өзгеше, артқы баған жолының негізгі айқасуы сопақша мида өтеді."),
   l("VPL — возможное реле, но не единственная локализация для такого сенсорного дефицита.","VPL is a possible relay, not the only site capable of producing this deficit.","VPL — ықтимал реле, бірақ мұндай тапшылықтың жалғыз орны емес.")
  ]
 },
 {
  title:l("VPL и VPM","VPL and VPM","VPL және VPM"),
  task:l("Как учесть сохранную чувствительность лица при оценке вентральных задних ядер таламуса?","How should spared facial sensation be interpreted when considering ventral posterior thalamic nuclei?","Таламустың вентралды артқы ядроларын қарастырғанда бет сезімталдығының сақталуын қалай түсіндіруге болады?"),
  observation:l("При повторном учебном осмотре чувствительность лица симметрична, а нарушения вибрации и положения сохраняются в правых конечностях. Это не исключает поражение за пределами таламуса.","On repeat scripted examination facial sensation is symmetric while vibration and position deficits persist in the right limbs. This does not exclude lesions outside the thalamus.","Қайталама оқу тексеруінде бет сезімталдығы екі жақта бірдей, ал оң аяқ-қолдағы діріл мен қалып сезімінің бұзылысы сақталған. Бұл таламустан тыс ошақтарды жоққа шығармайды."),
  choices:[
   l("Сопоставить VPL с чувствительностью тела, VPM с лицом и сохранить альтернативные локализации","Associate VPL with body sensation and VPM with facial sensation while retaining alternative sites","VPL-ді дене, VPM-ді бет сезімталдығымен байланыстырып, балама ошақтарды да қарастыру"),
   l("Считать VPM главным реле вибрации от стопы и кисти","Treat VPM as the principal vibration relay from foot and hand","VPM-ді табан мен қолдың діріл сезімінің негізгі релесі деу"),
   l("Считать сохранность лица окончательным доказательством изолированного поражения VPL","Treat facial sparing as definitive proof of an isolated VPL lesion","Бет сезімінің сақталуын VPL-дің оқшау зақымының түпкілікті дәлелі деу")
  ],
  explanation:l("VPL получает преимущественно соматосенсорные сигналы от тела, VPM — от лица через тройничные пути. Сохранность лица помогает обсуждать соматотопию, но не отделяет VPL от всех спинальных, стволовых и корковых причин.","VPL predominantly relays somatosensory input from the body, whereas VPM relays facial input through trigeminal pathways. Facial sparing informs somatotopy but cannot distinguish VPL from every spinal, brainstem or cortical cause.","VPL көбіне денеден келетін соматосенсорлық ақпаратты, ал VPM үшкіл жүйке жолдары арқылы беттен келетін ақпаратты өткізеді. Бет сезімінің сақталуы соматотопияны талқылауға көмектеседі, бірақ VPL-ді жұлын, ми бағаны немесе қыртыс себептерінің бәрінен ажыратпайды."),
  wrong:[
   l("VPM связан преимущественно с лицом, а не с конечностями.","VPM mainly concerns the face, not the limbs.","VPM негізінен бетке қатысты, аяқ-қолға емес."),
   l("Сохранность лица не является самостоятельным доказательством конкретного таламического очага.","Facial sparing alone does not prove a specific thalamic lesion.","Бет сезімінің сақталуы нақты таламустық ошақты өздігінен дәлелдемейді.")
  ]
 },
 {
  title:l("Пределы сенсорных проб","Limits of sensory testing","Сезім сынамаларының шегі"),
  task:l("Как корректно интерпретировать сложные корковые сенсорные пробы при нарушении первичной чувствительности?","How should higher-order cortical sensory tests be interpreted when primary sensation is impaired?","Бастапқы сезімталдық бұзылғанда күрделі қыртыстық сезім сынамаларын қалай түсіндіру керек?"),
  observation:l("В учебном опыте пациентка зат в правой руке на ощупь распознаёт хуже. В той же руке уже снижено различение вибрации и положения. Внимание и базовое осязание отдельно ещё не проверены.","In the scripted test the patient identifies an object by touch less reliably in the right hand. Vibration and position sense are already reduced there; attention and elementary touch have not been separately checked.","Оқу сынамасында пациент оң қолымен затты сипап тануда қиналады. Сол қолда діріл мен қалып сезімі бұрыннан төмен; зейін мен қарапайым жанасу бөлек тексерілмеген."),
  choices:[
   l("Сначала проверить базовое осязание и внимание, затем оценивать стереогноз; по одной ошибке не локализовать очаг","Check elementary touch and attention before judging stereognosis; do not localize from one error","Алдымен қарапайым жанасу мен зейінді тексеріп, содан кейін стереогнозды бағалау; бір қатемен ошақты анықтамау"),
   l("Считать ошибку стереогноза самостоятельным доказательством поражения теменной коры","Treat a stereognosis error alone as proof of a parietal cortical lesion","Стереогноз қатесін төбе қыртысы зақымының жеке дәлелі деу"),
   l("Использовать обычную ЭЭГ для точного измерения активности ретикулярного ядра таламуса","Use routine EEG to measure thalamic reticular nucleus activity directly and precisely","Кәдімгі ЭЭГ арқылы таламустың ретикулярлық ядросы белсенділігін тікелей әрі дәл өлшеу")
  ],
  explanation:l("Распознавание предмета на ощупь требует достаточного первичного тактильного входа и внимания. При их нарушении ошибка стереогноза сама по себе не доказывает корковый очаг. Скальповая ЭЭГ не является прямым измерением активности отдельного ядра таламуса.","Object recognition by touch requires adequate elementary tactile input and attention. When these are impaired, a stereognosis error alone does not establish a cortical lesion. Scalp EEG does not directly measure the activity of an individual thalamic nucleus.","Затты сипап тану үшін қарапайым жанасу сезімі мен зейін жеткілікті болуы қажет. Олар бұзылса, стереогноз қатесі қыртыстық ошақты өздігінен дәлелдемейді. Бас терісінен жазылған ЭЭГ жеке таламус ядросының белсенділігін тікелей өлшемейді."),
  wrong:[
   l("Стереогноз нельзя надёжно локализовать без проверки первичного осязания.","Stereognosis cannot be reliably localized without checking primary touch.","Қарапайым жанасуды тексермей, стереогноз бұзылысын сенімді локализациялау мүмкін емес."),
   l("ЭЭГ отражает суммарную активность сетей, а не отдельный таламический релейный нейрон.","EEG reflects aggregate network activity, not an individual thalamic relay neuron.","ЭЭГ желілердің жиынтық белсенділігін көрсетеді, жеке таламус релейлік нейронын емес.")
  ]
 },
 {
  title:l("Итог и ограничения","Synthesis and limits","Қорытынды және шектеулер"),
  task:l("Какой итог обоснован шестью учебными наблюдениями и что потребуется для клинического вывода?","What conclusion is justified by the six scripted observations, and what is required for a clinical conclusion?","Алты оқу бақылауынан қандай қорытынды жасауға болады және клиникалық тұжырым үшін не қажет?"),
  observation:l("Итоговые учебные данные: постепенное начало, снижение вибрации и положения справа, относительная сохранность боли, температуры, силы и чувствительности лица. Полного неврологического осмотра, анамнеза и визуализации нет.","Final scripted findings: gradual onset, reduced vibration and position sense on the right, relative preservation of pain, temperature, strength and facial sensation. A full neurological examination, history and imaging are unavailable.","Оқу деректерінің қорытындысы: біртіндеп басталу, оң жақта діріл мен қалып сезімінің төмендеуі, ауырсыну, температура, күш және бет сезімінің салыстырмалы сақталуы. Толық неврологиялық тексеру, анамнез және бейнелеу деректері жоқ."),
  choices:[
   l("Описать преимущественное нарушение заднеканатикового типа, назвать несколько возможных уровней и необходимость очной оценки","Describe a predominantly dorsal-column-type deficit, consider multiple levels and the need for clinical assessment","Артқы баған типіне басым сәйкес келетін тапшылықты сипаттап, бірнеше ықтимал деңгейді және дәрігерлік бағалау қажеттігін көрсету"),
   l("Окончательно поставить диагноз изолированного инсульта левого VPL по этим шести карточкам","Definitively diagnose an isolated left VPL stroke from these six cards","Осы алты карточкамен сол VPL-дің оқшау инсультін түпкілікті анықтау"),
   l("Исключить поражение центральной нервной системы только потому, что сила сохранена","Exclude a central nervous system lesion solely because strength is preserved","Күш сақталғаны үшін орталық жүйке жүйесінің зақымын жоққа шығару")
  ],
  explanation:l("Картина указывает на преимущественное вовлечение путей вибрации и положения, но не доказывает таламическую локализацию. В дифференциальном ряду остаются периферические, спинальные, стволовые, таламические и корковые уровни; требуются анамнез, полноценный осмотр и обследования по показаниям. Выбор кнопки не меняет состояние пациентки.","The pattern suggests involvement of vibration/position pathways but does not prove thalamic localization. Peripheral, spinal, brainstem, thalamic and cortical levels remain possible; history, full examination and investigations as indicated are needed. Clicking a choice does not change the patient.","Көрініс діріл мен қалып сезімі жолдарының қатысуын меңзейді, бірақ таламустық ошақты дәлелдемейді. Шеткі, жұлындық, ми бағандық, таламустық және қыртыстық деңгейлер ықтимал; анамнез, толық тексеру және көрсетілім бойынша зерттеулер қажет. Батырманы басу пациенттің жағдайын өзгертпейді."),
  wrong:[
   l("Без внезапного начала и подтверждающих исследований инсульт конкретного ядра не доказан.","Without acute onset or confirmatory investigations a stroke of a specific nucleus is not established.","Кенет басталу мен растайтын зерттеулерсіз нақты ядро инсульті дәлелденбейді."),
   l("Сохранная сила не исключает изолированное нарушение чувствительных путей ЦНС.","Preserved strength does not exclude an isolated central sensory pathway deficit.","Күштің сақталуы ОЖЖ сезім жолдарының оқшау бұзылысын жоққа шығармайды.")
  ]
 }
];
const copy:Record<Language,{opening:string;summary:string;notice:string;mentor:string;next:string;right:string;wrong:string}>={
 RU:{opening:"Синтетический учебный случай: женщина 50 лет отмечает изменение чувствительности правой кисти и стопы. Данные шести этапов заранее заданы; выбор студента не вызывает новых симптомов и не устанавливает диагноз.",summary:"Заднеканатиково-медиально-петлевая система передаёт вибрацию и положение тела; после перекрёста в продолговатом мозге сигналы тела идут к VPL, лица — преимущественно к VPM. Клиническая локализация требует полного осмотра. Шесть ответов по ключу не подтверждают диагностическую компетентность; письменные объяснения не оцениваются автоматически.",notice:"Учебные наблюдения заранее заданы; студент не обследует пациентку и не назначает лечение.",mentor:"Сначала сопоставьте модальность, сторону и уровень перекрёста. После письменного обоснования появится физиологический разбор.",next:"Следующее наблюдение было заранее задано и не вызвано вашим выбором.",right:"Выбор согласуется с учебными данными.",wrong:"Выбор не подтверждается данными учебного случая."},
 EN:{opening:"Synthetic teaching case: a 50-year-old woman reports altered sensation in her right hand and foot. All six observations are scripted; learner choices cannot cause symptoms or establish a diagnosis.",summary:"The dorsal column–medial lemniscal system conveys vibration and position; after decussation in the medulla, body signals reach VPL, while facial signals predominantly reach VPM. Clinical localization requires a full examination. Six keyed choices do not certify diagnostic competence; written reasoning is not automatically graded.",notice:"All observations are scripted; the learner neither examines the patient nor prescribes treatment.",mentor:"Compare modality, laterality and decussation level first. The physiological explanation follows written reasoning.",next:"The next observation was predefined and was not caused by your choice.",right:"This choice is supported by the teaching evidence.",wrong:"This choice is not supported by the teaching evidence."},
 KZ:{opening:"Ойдан құрастырылған оқу жағдайы: 50 жастағы әйел оң қолы мен табанындағы сезімталдықтың өзгергенін айтады. Алты бақылау алдын ала берілген; студент таңдауы жаңа белгілер туғызбайды және диагноз қоймайды.",summary:"Артқы баған–медиалдық ілмек жүйесі діріл мен дене қалпын сезуді өткізеді; сопақша мида айқасқаннан кейін денеден келген ақпарат VPL-ге, беттен келгені көбіне VPM-ге жетеді. Клиникалық локализация үшін толық тексеру қажет. Алты дұрыс таңдау диагноз қою құзыретін растамайды; жазбаша түсіндіру автоматты бағаланбайды.",notice:"Бақылаулар алдын ала берілген; студент пациентті тексермейді және ем тағайындамайды.",mentor:"Алдымен сезім түрін, жағын және айқасу деңгейін салыстырыңыз. Физиологиялық талдау жазбаша негіздемеден кейін ашылады.",next:"Келесі бақылау алдын ала берілген және сіздің таңдауыңыздан туындаған жоқ.",right:"Бұл таңдау оқу деректеріне сәйкес.",wrong:"Бұл таңдау оқу деректерімен расталмайды."}
};
const positions:readonly number[]=[2,0,1,2,0,1];
export function reviewModuleFourteenVirtualPatient(base:VirtualPatientScenario,language:Language):VirtualPatientScenario{
 if(base.moduleId!==14 || base.stages.length!==6 || steps.length!==6) throw new Error("Module 14 virtual patient requires six stages");
 const c=copy[language];
 return {...base,opening:c.opening,mechanismSummary:c.summary,
  stages:base.stages.map((stage,index)=>{
   const step=steps[index];
   const correctOption=positions[index];
   const order=correctOption===0?[0,1,2]:correctOption===1?[1,0,2]:[1,2,0];
   return {...stage,title:step.title[language],situation:c.notice,mentorPrompt:c.mentor,
    task:step.task[language],newData:step.observation[language],mechanism:step.explanation[language],
    options:order.map((which,position)=>({
     id:"vp-14-stage-"+(index+1)+"-choice-"+(position+1),
     text:step.choices[which][language],
     response:(which===0?c.right:c.wrong)+" "+c.next,
     feedback:which===0?step.explanation[language]:step.wrong[which-1][language]
    })) as VirtualPatientStage["options"],correctOption};
  })
 };
}
