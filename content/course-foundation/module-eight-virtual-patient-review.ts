import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 8: a synthetic Brown–Séquard-type pattern. Never infer etiology from the pattern.
// Sources reviewed: Guyton & Hall 13e PDF 584–585; Ganong 23e PDF 185–187;
// C. L. Ghai Practical Physiology 8e PDF 324–326.
// Each distractor is specifically false or unsupported at its own stage, not a
// clinically valid decision borrowed from another stage.
type Step = readonly [task:string, observation:string, correct:string, wrongA:string, wrongB:string, explanation:string];
const steps: Record<Language, Step[]> = {
  "RU": [
    [
      "Какие чувствительные модальности нужно проверить раздельно и с обеих сторон?",
      "У женщины 36 лет после очагового поражения спинного мозга изменена чувствительность ног. Пока известно только, что ощущения справа и слева различаются.",
      "С закрытыми глазами сравнить справа и слева вибрацию камертоном, положение пальца стопы, боль и температуру; отметить уровень изменений.",
      "Проверить только лёгкое прикосновение и считать его норму доказательством сохранности всех проводящих путей.",
      "По жалобе на онемение сразу назвать сторону поражения, не картируя модальности.",
      "Разные модальности идут преимущественно разными путями. Лёгкое прикосновение передаётся несколькими системами и не заменяет проверку вибрации, положения, боли и температуры."
    ],
    [
      "Что означает левостороннее выпадение вибрации и суставно-мышечного чувства ниже уровня T10?",
      "Повторная проба показывает снижение вибрации и чувства положения пальцев левой стопы ниже предполагаемого неврологического уровня T10; справа они сохранены.",
      "Предположить повреждение левого заднего столба ниже перекрёста в продолговатом мозге и сопоставить с остальными признаками.",
      "Предположить изолированное повреждение правого заднего столба, поскольку все волокна чувствительности перекрещиваются сразу в спинном мозге.",
      "Считать снижение вибрации доказательством поражения только периферического нерва левой стопы.",
      "Первичные аксоны задних столбов поднимаются в спинном мозге на своей стороне; перекрёст происходит в каудальной части продолговатого мозга. Один признак ещё не доказывает уровень очага."
    ],
    [
      "Как объяснить снижение боли и температуры справа, начинающееся несколько ниже T10?",
      "Снижение боли и температуры выявлено справа примерно с уровня T12, тогда как вибрация справа сохранена. Слева болевая и температурная чувствительность ниже T10 в основном сохранена.",
      "Учесть переход болевых и температурных афферентов через переднюю белую спайку вблизи уровня входа и восхождение в левом антеролатеральном пути.",
      "Объяснить правосторонний дефицит тем, что спиноталамические волокна идут справа до продолговатого мозга и перекрещиваются только там.",
      "Приравнять границу болевого дефицита к точному уровню повреждённого позвонка без учёта хода волокон.",
      "Афференты боли и температуры могут проходить 1–2 сегмента до перекрёста; поэтому контралатеральное выпадение часто начинается несколько ниже очага. Уровень сегмента не равен автоматически уровню позвонка."
    ],
    [
      "Какой дополнительный признак усилил бы гипотезу левостороннего поражения половины спинного мозга?",
      "Ниже уровня T10 слева обнаружены умеренная слабость ноги и повышенный сухожильный рефлекс; на лице изменений чувствительности нет.",
      "Сопоставить левосторонние пирамидные признаки с ипсилатеральным ходом латерального корково-спинномозгового пути ниже перекрёста пирамид.",
      "Объяснить слабость слева обязательным поражением правого корково-спинномозгового пути на уровне T10.",
      "Считать гиперрефлексию доказательством изолированного повреждения левого периферического двигательного нерва.",
      "Большинство латеральных корково-спинномозговых волокон перекрещивается в каудальной части продолговатого мозга; спинальный очаг слева может дать ипсилатеральные пирамидные признаки ниже уровня поражения."
    ],
    [
      "Как интерпретировать совместное распределение трёх дефицитов?",
      "Сопоставлены: слева ниже T10 нарушены вибрация и положение, справа примерно ниже T12 — боль и температура, слева также имеются пирамидные признаки. МРТ описывает ограниченный левосторонний очаг в области сегмента T10.",
      "Рассматривать частичное левостороннее поражение спинного мозга с синдромом по типу Броун–Секара; сверить клинический уровень с МРТ и исключить другие очаги.",
      "Считать, что один изолированный корешок справа объясняет все двусторонние чувствительные и левосторонние двигательные признаки.",
      "Диагностировать точную причину очага только по перекрёстному распределению выпадений.",
      "Сочетание ипсилатерального заднеканатикового и пирамидного дефицита с контралатеральным боле-температурным дефицитом поддерживает синдром по типу Броун–Секара. Причина поражения из этих признаков не определяется."
    ],
    [
      "Какой итог соответствует данным и границам метода?",
      "Учебный случай завершён. Данные осмотра и условной МРТ согласуются с частичным левосторонним очагом спинного мозга вблизи сегмента T10.",
      "Указать наиболее вероятную левостороннюю спинальную локализацию, объяснить оба перекрёста и отметить, что этиология и точные границы требуют дополнительной оценки.",
      "Заявить, что сохранное лёгкое прикосновение полностью исключает повреждение задних столбов.",
      "Назвать уровень T10 позвонка и единственную причину поражения без данных визуализации и анамнеза.",
      "Это учебная локализация, не диагноз конкретному пациенту: задние столбы перекрещиваются в продолговатом мозге, боле-температурные волокна — в спинном мозге, пирамидный путь — у пирамид продолговатого мозга. Сегмент и позвонок различаются."
    ]
  ],
  "EN": [
    [
      "Which sensory modalities should be tested separately on both sides?",
      "A 36-year-old woman reports altered sensation in her legs after a focal spinal cord lesion. Only a left–right difference is known so far.",
      "With eyes closed, compare tuning-fork vibration, toe joint position, pinprick and temperature on both sides; map the level of each deficit.",
      "Test only light touch and treat a normal result as proof that every ascending pathway is intact.",
      "Determine the lesion side from the word 'numbness' without mapping the affected modalities.",
      "Different modalities mainly use different ascending systems. Light touch has partly redundant pathways and cannot replace separate testing of vibration, position, pain and temperature."
    ],
    [
      "What does left-sided loss of vibration and joint position below T10 suggest?",
      "Repeat testing shows impaired vibration and toe position sense on the left below an estimated neurological T10 level; these modalities are preserved on the right.",
      "Consider a left dorsal-column lesion in the spinal cord, below the decussation in the medulla, and correlate with other findings.",
      "Assume an isolated right dorsal-column lesion because all sensory axons cross immediately upon entering the spinal cord.",
      "Conclude that impaired vibration necessarily identifies a peripheral nerve lesion in the left foot.",
      "Primary dorsal-column axons ascend ipsilaterally in the spinal cord and cross in the caudal medulla. This sign alone does not establish the exact lesion level."
    ],
    [
      "Why does right-sided pain and temperature loss begin somewhat below T10?",
      "Pain and temperature are reduced on the right from approximately T12, while right-sided vibration is preserved. Left pain and temperature below T10 are largely spared.",
      "Allow for nociceptive and thermal fibers crossing through the anterior white commissure near their entry level and then ascending in the left anterolateral pathway.",
      "Explain the right-sided deficit by claiming spinothalamic fibers ascend ipsilaterally to the medulla before crossing there.",
      "Treat the sensory level as the exact injured vertebral level without accounting for fiber trajectories.",
      "Pain-temperature afferents may travel one or two segments before crossing; contralateral loss can therefore begin below the lesion. Spinal segment and vertebral level are not interchangeable."
    ],
    [
      "What additional sign would strengthen the hypothesis of a left spinal hemicord lesion?",
      "Below T10, the left leg shows mild weakness and increased tendon reflexes; facial sensation is unchanged.",
      "Correlate left-sided upper motor neuron signs with the ipsilateral lateral corticospinal tract below the pyramidal decussation.",
      "Explain left leg weakness as necessarily resulting from injury to the right corticospinal tract at T10.",
      "Treat hyperreflexia as proof of an isolated left peripheral motor nerve lesion.",
      "Most lateral corticospinal axons cross in the caudal medulla. A left spinal cord lesion can cause ipsilateral upper motor neuron signs below its level."
    ],
    [
      "How should the three deficits be interpreted together?",
      "Findings include left loss of vibration and position below T10, right pain-temperature loss beginning near T12, and left upper motor neuron signs. The teaching-case MRI describes a left-sided focus near spinal cord segment T10.",
      "Consider a partial left spinal cord lesion with a Brown–Séquard-type pattern; correlate the neurological level with MRI and consider alternative or additional lesions.",
      "Attribute all bilateral sensory and left motor findings to one isolated right nerve root.",
      "Identify the precise cause of the lesion from the crossed sensory pattern alone.",
      "Ipsilateral dorsal-column and corticospinal deficits with contralateral pain-temperature loss support a Brown–Séquard-type pattern. The etiology is not determined by this pattern."
    ],
    [
      "Which final interpretation respects the evidence and its limits?",
      "The teaching case is complete. Examination and the stipulated MRI are consistent with a partial left-sided spinal cord lesion near segment T10.",
      "State the most likely left spinal localization, explain the relevant crossings and note that etiology and exact extent require further assessment.",
      "Claim that intact light touch entirely rules out dorsal-column damage.",
      "Name the T10 vertebra and a single cause of injury without vertebral imaging or history.",
      "This is an educational localization, not a patient-specific diagnosis: dorsal-column fibers cross in the medulla, pain-temperature fibers in the cord, and the corticospinal tract at the medullary pyramids. Vertebral and segmental levels differ."
    ]
  ],
  "KZ": [
    [
      "Қандай сезім түрлерін екі жақта бөлек тексеру қажет?",
      "36 жастағы әйелде жұлынның ошақты зақымынан кейін аяқтарының сезімталдығы өзгерген. Әзірге оң және сол жақтың айырмашылығы ғана белгілі.",
      "Көзін жұмғызып, екі жақта камертонмен дірілді, аяқ башпайының қалпын сезуді, ауырсыну мен температураны бөлек тексеріп, өзгеріс деңгейін белгілеу.",
      "Тек жеңіл жанасуды тексеріп, ол сақталса, барлық өрлеме жолдар сау деп қорытындылау.",
      "Сезімталдықтың түрлері мен таралуын анықтамай, «ұю» шағымы бойынша ошақтың жағын бірден атау.",
      "Сезім түрлері көбіне әртүрлі өрлеме жолдармен өтеді. Жеңіл жанасу бірнеше жолмен берілуі мүмкін; ол діріл, қалып, ауырсыну және температура сынамаларын алмастырмайды."
    ],
    [
      "T10 деңгейінен төмен сол жақта діріл мен буын қалпын сезудің төмендеуі нені көрсетеді?",
      "Қайта тексергенде болжамды неврологиялық T10 деңгейінен төмен сол жақта діріл мен аяқ башпайының қалпын сезу төмендеген, ал оң жақта сақталған.",
      "Сопақша мидағы айқасудан төмен, жұлынның сол жақ артқы бағанының зақымын болжап, оны басқа белгілермен салыстыру.",
      "Барлық сезімтал талшықтар жұлынға кірген бойда айқасады деп, оң жақ артқы бағанның жеке зақымын болжау.",
      "Діріл сезімінің төмендеуі міндетті түрде сол аяқтың шеткі жүйкесінің зақымын дәлелдейді деу.",
      "Артқы бағанның бірінші реттік аксондары жұлында өз жағымен көтеріліп, сопақша мидың төменгі бөлігінде айқасады. Бір белгі ошақтың нақты деңгейін дәлелдемейді."
    ],
    [
      "Неліктен оң жақта ауырсыну мен температураның төмендеуі T10-нан сәл төмен басталады?",
      "Оң жақта ауырсыну мен температура шамамен T12 деңгейінен бастап төмендеген, бірақ діріл сақталған. Сол жақта T10-нан төмен ауырсыну мен температура көбіне сақталған.",
      "Ауырсыну мен температура талшықтарының кірген деңгейіне жақын алдыңғы ақ комиссура арқылы айқасып, сол жақ антеролатералдық жолмен көтерілетінін ескеру.",
      "Спиноталамустық талшықтар сопақша миға дейін өз жағымен көтеріліп, тек сол жерде айқасады деп түсіндіру.",
      "Талшықтардың жүрісін ескермей, сезімталдық шекарасын зақымданған омыртқаның нақты деңгейіне теңестіру.",
      "Ауырсыну мен температура афференттері айқасқанға дейін бір-екі сегмент өтуі мүмкін. Сондықтан қарсы жақтағы жоғалу ошақтан төмен басталуы ықтимал. Жұлын сегменті мен омыртқа деңгейі бірдей емес."
    ],
    [
      "Қандай қосымша белгі жұлынның сол жақ жартысының зақымын қолдайды?",
      "T10-нан төмен сол аяқта жеңіл әлсіздік және сіңір рефлекстерінің күшеюі анықталды; бет сезімталдығы өзгермеген.",
      "Сол жақ пирамидалық белгілерді пирамидалар айқасуынан төмен сол жақпен өтетін латералдық қыртыс-жұлын жолымен байланыстыру.",
      "T10 деңгейіндегі сол аяқ әлсіздігін міндетті түрде оң жақ қыртыс-жұлын жолының зақымымен түсіндіру.",
      "Рефлекстердің күшеюі сол жақ шеткі қозғалтқыш жүйкенің жеке зақымын дәлелдейді деу.",
      "Латералдық қыртыс-жұлын талшықтарының көбі сопақша мидың төменгі бөлігінде айқасады. Сол жақ жұлын ошағы одан төмен сол жақта жоғарғы мотонейрон белгілерін туғызуы мүмкін."
    ],
    [
      "Үш түрлі тапшылықты бірге қалай түсіндіруге болады?",
      "T10-нан төмен сол жақта діріл мен қалып сезімі төмендеген, оң жақта шамамен T12-ден бастап ауырсыну мен температура төмендеген, сол жақта пирамидалық белгілер бар. Оқу жағдайының МРТ сипаттамасында жұлынның T10 сегменті маңында сол жақ ошақ көрсетілген.",
      "Жұлынның сол жақ бөлігінің ішінара зақымын Броун–Секар типті синдром ретінде қарастырып, неврологиялық деңгейін МРТ-мен салыстыру және басқа ошақтарды ескеру.",
      "Екі жақтағы сезімталдық және сол жақтағы қозғалыс бұзылыстарын оң жақтағы бір жүйке түбіршесінің зақымымен ғана түсіндіру.",
      "Сезімталдықтың қарама-қарсы таралуына қарап, ошақтың нақты себебін анықтау.",
      "Бір жақтағы артқы баған мен қыртыс-жұлын тапшылығының қарсы жақтағы ауырсыну-температура тапшылығымен қатар болуы Броун–Секар типті үлгіні қолдайды. Оның себебі тек осы белгілерден анықталмайды."
    ],
    [
      "Қандай қорытынды деректер мен әдістің шектеулеріне сәйкес келеді?",
      "Оқу жағдайы аяқталды. Тексеру мен шартты МРТ жұлынның T10 сегменті маңындағы ішінара сол жақ ошақпен үйлеседі.",
      "Жұлынның сол жақтағы ең ықтимал локализациясын атап, тиісті айқасуларды түсіндіру және себеп пен нақты көлем үшін қосымша бағалау қажет екенін көрсету.",
      "Жеңіл жанасу сақталғандықтан, артқы бағанның зақымы толық жоққа шығарылады деу.",
      "Омыртқа кескіні мен анамнезсіз T10 омыртқасын және зақымның жалғыз себебін нақты атау.",
      "Бұл нақты пациенттің диагнозы емес, оқу мақсатындағы локализация: артқы баған талшықтары сопақша мида, ауырсыну-температура талшықтары жұлында, қыртыс-жұлын жолы сопақша мидың пирамидалары тұсында айқасады. Жұлын сегменті мен омыртқа деңгейі ажыратылады."
    ]
  ]
};
const positions = [1, 2, 0, 2, 1, 0] as const;
const labels:Record<Language,{right:string;wrong:string;opening:string;summary:string}> = {
 RU:{right:"Решение согласуется с наблюдениями.",wrong:"Выбор не подтверждается этими данными.",opening:"У женщины 36 лет после ограниченного поражения спинного мозга изменена чувствительность ног. Определите модальности, сторону и неврологический уровень дефицита поэтапно.",summary:"Учебный пример частичного левостороннего поражения спинного мозга около сегмента T10: ипсилатеральное снижение вибрации/проприоцепции и пирамидные признаки, контралатеральное снижение боли/температуры ниже очага. Этиология не установлена."},
 EN:{right:"This decision fits the observed findings.",wrong:"The evidence does not support this choice.",opening:"A 36-year-old woman has altered leg sensation after a focal spinal cord lesion. Identify each modality, side and neurological level step by step.",summary:"Teaching example of a partial left spinal cord lesion near segment T10: ipsilateral vibration/proprioception loss and upper motor neuron signs, with contralateral pain/temperature loss beginning below the lesion. Etiology is undetermined."},
 KZ:{right:"Бұл шешім бақылау деректеріне сәйкес келеді.",wrong:"Бұл таңдау ұсынылған деректермен расталмайды.",opening:"36 жастағы әйелде жұлынның ошақты зақымынан кейін аяқтарының сезімталдығы өзгерген. Сезім түрін, жағын және неврологиялық деңгейін кезең-кезеңімен анықтаңыз.",summary:"T10 сегменті маңындағы жұлынның ішінара сол жақ зақымының оқу мысалы: сол жақта діріл/проприоцепция төмендеп, пирамидалық белгілер пайда болады; оң жақта ошақтан төмен ауырсыну мен температура төмендейді. Себебі анықталмаған."}
};
export function reviewModuleEightVirtualPatient(base:VirtualPatientScenario,language:Language):VirtualPatientScenario {
 if(base.moduleId!==8 || base.stages.length!==6 || steps[language].length!==6)
   throw new Error("Module 8 virtual patient must have exactly six stages");
 const copy=labels[language];
 return {
  ...base,
  opening:copy.opening,
  mechanismSummary:copy.summary,
  stages:base.stages.map((stage,index)=>{
   const [task,observation,correct,wrongA,wrongB,explanation]=steps[language][index];
   const candidates=[correct,wrongA,wrongB];
   const correctOption=positions[index];
   const order=correctOption===0?[0,1,2]:correctOption===1?[1,0,2]:[1,2,0];
   return {
    ...stage,
    task,
    newData:observation,
    mechanism:explanation,
    mentorPrompt:explanation,
    options:order.map((candidate,position)=>({
      id:`vp-8-stage-${index+1}-choice-${position+1}`,
      text:candidates[candidate],
      response:candidate===0?copy.right:copy.wrong,
      feedback:explanation
    })) as VirtualPatientStage["options"],
    correctOption
   };
  })
 };
}
