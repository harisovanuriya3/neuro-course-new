import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 11: synthetic six-stage motor-planning case, not a diagnostic algorithm.
// Checked against Library copies: Guyton & Hall 13e ch.56 PDF 677–679;
// Ganong 23e ch.16 PDF 253–256; C. L. Ghai 8e PDF 317–319.
// Observations are scripted and never caused by the learner's button press.
type Step = readonly [task: string, observation: string, correct: string, wrongA: string, wrongB: string, explanation: string];
const steps: Record<Language, readonly Step[]> = {
 RU: [
  [
   "У мужчины 39 лет затруднено застёгивание рубашки. Как начать анализ, не приравнивая сложность действия к слабости?",
   "В условном клиническом описании сила сгибания и разгибания пальцев при отдельных пробах сохранена; застёгивание занимает больше времени, порядок движений иногда нарушается. Это не результат обследования студентом.",
   "Раздельно сопоставить силу одиночных движений, понимание задания, чувствительность и выполнение знакомой последовательности.",
   "Объявить снижение силы причиной нарушения, не проверяя её.",
   "Сразу локализовать очаг в мозжечке только по медленному застёгиванию.",
   "Сила отдельного движения и организация сложного навыка — разные функции. Прежде чем обсуждать праксис, необходимо учесть понимание, внимание, сенсорные и двигательные ограничения."
  ],
  [
   "Какое сравнение поможет уточнить, связано ли затруднение с организацией действия, а не с непониманием команды?",
   "В описании врача понимание простых инструкций и узнавание предметов сохранены. При выполнении серии жестов по словесной инструкции возникают перестановки; после показа часть последовательности выполняется лучше.",
   "Сравнить одинаковую последовательность по словесной инструкции, по подражанию и при реальном использовании предмета, учитывая понимание.",
   "По одному неудачному жесту объявить нарушение речи доказанным.",
   "Признать сохранную силу достаточным доказательством отсутствия нарушения действия.",
   "Различия между выполнением по команде, подражанием и действием с предметом помогают описать профиль навыка. Они не доказывают локализацию и требуют контроля понимания инструкции."
  ],
  [
   "Как отделить нарушение последовательности от грубой дисметрии и выраженной брадикинезии?",
   "По заранее заданным данным врач не отмечает выраженного тремора покоя; при пробе палец–нос нет явного промахивания. Отдельные движения выполняются с достаточной амплитудой, но серия действий остаётся неустойчивой.",
   "Сопоставить точность целевого движения, скорость и амплитуду одиночных движений с ошибками порядка в серии.",
   "Назвать отсутствие тремора покоя доказательством нормальной работы базальных ганглиев.",
   "Приравнять любую ошибку серии к поражению мозжечка без проверки точности движения.",
   "Координация, скорость и организация последовательности частично перекрываются, но оцениваются раздельно. Отсутствие одного признака не исключает поражение конкретной сети."
  ],
  [
   "После демонстрации образца последовательность становится точнее. Как интерпретировать эффект подсказки?",
   "В учебном повторении число перестановок снижается при зрительном показе, хотя исходная сила руки не меняется. Данные заранее заданы и не зависят от выбранного ответа.",
   "Сопоставить выполнение без подсказки и с одинаковым зрительным образцом, не меняя силовую нагрузку.",
   "Считать улучшение при показе доказательством полностью сохранного моторного планирования.",
   "Приписать улучшение увеличению силы мышцы, хотя силовая задача не изменилась.",
   "Зрительная подсказка может частично компенсировать затруднение выбора или упорядочения действий. Эффект не устанавливает единственную анатомическую причину."
  ],
  [
   "Как связать наблюдения с физиологией моторных сетей без упрощения до одного «центра»?",
   "Сохранная сила одиночных движений сочетается с трудностью последовательности; понимание и базовая чувствительность при описанном скрининге относительно сохранены, а зрительная подсказка помогает.",
   "Рассмотреть взаимодействие ассоциативной и премоторной коры, моторных областей, базальных ганглиев, мозжечка и сенсорной обратной связи.",
   "Утверждать, что сложные движения целиком создаёт только первичная моторная кора.",
   "Утверждать, что мозжечок непосредственно является единственным источником команды к мотонейрону.",
   "Двигательная программа формируется распределённой сетью. Корково-спинальные и стволовые выходы воздействуют на спинальные сети; α-мотонейроны составляют конечный общий нервный путь к мышцам."
  ],
  [
   "Какой итог допустим для синтетического случая и чего он не позволяет заключить?",
   "Нарушена последовательность знакомого действия при относительно сохранной силе одиночных движений; эффект зависит от условий подсказки. Нет нейровизуализации и полного неврологического обследования.",
   "Описать вероятное нарушение организации сложного действия, указать альтернативы и необходимость профессиональной клинической оценки для диагноза.",
   "Поставить окончательный диагноз апраксии и назвать точную локализацию очага только по этим шести карточкам.",
   "Считать сохранную силу доказательством отсутствия любой патологии центральной нервной системы.",
   "Случай показывает, почему силу, праксис, координацию и сенсорную поддержку оценивают отдельно. Описания недостаточно для диагноза, определения стороны очага или выбора лечения."
  ]
 ],
 EN: [
  [
   "A 39-year-old man struggles to button his shirt. What should be assessed before equating this with weakness?",
   "In this synthetic clinical description, isolated finger flexion and extension have preserved strength; buttoning is slower and the order of movements is sometimes disrupted. No student examination is performed.",
   "Compare isolated strength, comprehension, sensation and performance of a familiar movement sequence separately.",
   "Assume muscle weakness is the cause without assessing it.",
   "Localize a cerebellar lesion from slow buttoning alone.",
   "Strength in an isolated movement differs from organization of a learned sequence. Comprehension, attention, sensory deficits and motor limitations must be considered before interpreting praxis."
  ],
  [
   "Which comparison can help distinguish difficulty organizing an action from failure to understand instructions?",
   "The clinician's scripted observations describe intact comprehension of simple commands and object recognition. A series of gestures contains ordering errors on verbal command; some steps improve after demonstration.",
   "Compare the same sequence on verbal command, imitation and actual object use while controlling for comprehension.",
   "Treat one unsuccessful gesture as proof of a language disorder.",
   "Treat preserved strength as proof that complex action is normal.",
   "Command, imitation and real-object performance may differ in disorders of skilled action. This pattern does not independently localize a lesion; instruction comprehension must be checked."
  ],
  [
   "How can sequencing errors be distinguished from marked dysmetria or bradykinesia?",
   "In the predefined clinical observations, there is no prominent resting tremor and no clear overshoot on finger-to-nose testing. Isolated movements have adequate amplitude, but the multistep action remains inconsistent.",
   "Compare target accuracy, speed and amplitude of single movements with ordering errors in a multistep sequence.",
   "Conclude that the basal ganglia are normal because resting tremor is absent.",
   "Call every sequencing error cerebellar damage without testing movement accuracy.",
   "Coordination, speed and sequencing involve partly overlapping circuits but require separate assessment. Absence of a single sign cannot exclude dysfunction in an entire network."
  ],
  [
   "The sequence improves after demonstration. What does this change support?",
   "In the scripted repetition, ordering errors decrease with a visual model while the force requirement remains unchanged. These observations are predefined, not caused by a learner choice.",
   "Compare performance without and with the same visual demonstration while keeping force demand constant.",
   "Claim that improvement with imitation proves motor planning is completely intact.",
   "Attribute improvement to increased muscle strength despite an unchanged force requirement.",
   "Visual cueing may partly compensate for difficulty selecting or ordering actions. Improvement does not establish a unique anatomical cause."
  ],
  [
   "Which motor-system account best integrates the findings without invoking one movement center?",
   "Preserved isolated strength coexists with poor sequencing; comprehension and basic sensation appear relatively intact on the described screening, and visual cueing helps.",
   "Consider interacting association and premotor cortices, motor areas, basal ganglia, cerebellum and sensory feedback.",
   "Claim that primary motor cortex alone generates every complex action.",
   "Claim that the cerebellum is the sole direct source of commands to spinal motor neurons.",
   "Movement is organized by distributed circuits. Corticospinal and brainstem pathways act on spinal networks; alpha motor neurons provide the final common neural output to skeletal muscles."
  ],
  [
   "What conclusion is justified by this teaching case, and what remains uncertain?",
   "A familiar sequence is impaired despite relatively preserved isolated strength; visual cueing changes performance. There is no neuroimaging or complete neurological examination.",
   "Describe possible impairment of skilled-action organization, consider alternatives and require professional assessment before diagnosis.",
   "Make a definitive diagnosis of apraxia and specify the lesion site from these six cards alone.",
   "Treat preserved strength as proof that no central nervous system disorder exists.",
   "The case separates strength, praxis, coordination and sensory support. It cannot establish a diagnosis, lesion laterality or treatment from these observations alone."
  ]
 ],
 KZ: [
  [
   "39 жастағы ер адамға жейдесінің түймесін тағу қиын. Мұны бірден бұлшықет әлсіздігіне жатқызбай, нені бағалау керек?",
   "Ойдан құрастырылған клиникалық сипаттамада саусақтарды жеке бүгу және жазу күші сақталған; түйме тағу баяу, қимылдардың реті кейде бұзылады. Студент пациентті тексермейді.",
   "Жеке қимыл күшін, нұсқауды түсінуін, сезімталдықты және таныс қимылдар тізбегін орындауын бөлек салыстыру.",
   "Күшті тексермей, бұзылыстың себебі бұлшықет әлсіздігі деп санау.",
   "Тек түйме тағудың баяулығына қарап, ошақты мишықта деп анықтау.",
   "Жеке қимылдың күші мен үйренген әрекеттер тізбегін ұйымдастыру әртүрлі қызметтер. Праксисті түсіндіру алдында нұсқауды түсіну, зейін, сезімталдық және қозғалыс шектеулерін ескеру қажет."
  ],
  [
   "Әрекетті ұйымдастыру қиындығын нұсқауды түсінбеуден ажыратуға қай салыстыру көмектеседі?",
   "Алдын ала берілген дәрігерлік бақылауда қарапайым нұсқауды түсіну және затты тану сақталған. Ауызша нұсқаумен жасалған ишаралар тізбегінде рет қателері бар; көрсеткеннен кейін кей қадамдар жақсарады.",
   "Бір тізбекті ауызша нұсқаумен, еліктеу арқылы және нақты затты қолданып орындауды, түсінуін ескере отырып, салыстыру.",
   "Бір ишараны орындай алмауды сөйлеу бұзылысының дәлелі деп санау.",
   "Күш сақталса, күрделі әрекет те міндетті түрде қалыпты деп санау.",
   "Нұсқау, еліктеу және затпен әрекет жасау нәтижелері әртүрлі болуы мүмкін. Мұндай айырмашылық ошақтың орнын өздігінен дәлелдемейді; нұсқауды түсіну де тексерілуі керек."
  ],
  [
   "Қимылдар ретінің бұзылуын айқын дисметриядан немесе брадикинезиядан қалай ажыратуға болады?",
   "Алдын ала берілген сипаттамада тыныштықтағы айқын тремор жоқ, саусақ–мұрын сынамасында анық мүлт кету байқалмайды. Жеке қимылдардың амплитудасы жеткілікті, бірақ көпсатылы әрекет тұрақсыз.",
   "Нысанаға жету дәлдігін, жеке қимыл жылдамдығы мен амплитудасын тізбектегі реттік қателермен салыстыру.",
   "Тыныштық треморы жоқ болғандықтан, базальды ганглийлер толық сау деп тұжырымдау.",
   "Дәлдікті тексермей, кез келген реттік қатені мишық зақымына жатқызу.",
   "Үйлесім, жылдамдық және қимылдар реті ішінара ортақ жүйелерге сүйенеді, бірақ бөлек бағаланады. Бір белгінің болмауы бүкіл желінің бұзылысын жоққа шығармайды."
  ],
  [
   "Көрсетілген үлгіден кейін әрекет дәлірек орындалды. Бұл нені білдіреді?",
   "Алдын ала берілген қайталауда көрнекі үлгімен реттік қателер азаяды, ал күш талабы өзгермейді. Деректер студенттің таңдауынан туындамайды.",
   "Күш талабын өзгертпей, көрнекі үлгісіз және сол үлгімен орындалған әрекетті салыстыру.",
   "Еліктеу кезіндегі жақсару моторлық жоспарлаудың толық сақталғанын дәлелдейді деп санау.",
   "Күш талабы өзгермесе де, жақсаруды бұлшықет күшінің артуымен түсіндіру.",
   "Көрнекі нұсқау әрекетті таңдау не реттеу қиындығын ішінара өтей алады. Жақсару зақымның жалғыз анатомиялық себебін анықтамайды."
  ],
  [
   "Бір ғана «қозғалыс орталығын» атамай, осы белгілерді қандай физиологиялық жүйе арқылы түсіндіруге болады?",
   "Жеке қимыл күші сақталғанымен, тізбек бұзылған; сипатталған бастапқы бағалауда түсіну мен негізгі сезімталдық салыстырмалы сақталған, ал көрнекі нұсқау көмектеседі.",
   "Ассоциативтік және премоторлық қыртыс, моторлық аймақтар, базальды ганглийлер, мишық пен сенсорлық кері байланыстың өзара әрекетін қарастыру.",
   "Барлық күрделі әрекетті тек бастапқы моторлық қыртыс жасайды деп тұжырымдау.",
   "Жұлын мотонейрондарына барлық команданы тікелей тек мишық береді деп санау.",
   "Қимылды таралған жүйелер ұйымдастырады. Қыртыс-жұлын және ми бағанының жолдары жұлын желілеріне әсер етеді; α-мотонейрондар қаңқа бұлшықеттеріне соңғы жалпы жүйкелік шығысты береді."
  ],
  [
   "Бұл оқу жағдайынан қандай қорытынды жасауға болады және не анықталмайды?",
   "Таныс қимылдар тізбегі жеке қозғалыс күші салыстырмалы сақталса да бұзылған; көрнекі нұсқау нәтижеге әсер етеді. Нейробейнелеу және толық неврологиялық тексеру жоқ.",
   "Күрделі үйренген әрекетті ұйымдастыру бұзылысы мүмкін екенін айтып, баламаларды ескеріп, диагнозға дейін кәсіби тексеру қажеттігін көрсету.",
   "Осы алты карточкамен апраксияның нақты диагнозын және зақым ошағының орнын анықтау.",
   "Күш сақталғандықтан, орталық жүйке жүйесінде ешбір бұзылыс жоқ деп санау.",
   "Бұл жағдай күшті, праксисті, үйлесімді және сенсорлық қолдауды бөлек бағалауды үйретеді. Тек осы мәліметтер диагнозды, ошақ жағын не емдеуді анықтауға жеткіліксіз."
  ]
 ]
};
const copy: Record<Language, { opening:string; summary:string; right:string; wrong:string; notice:string }> = {
 RU: {
  opening:"Синтетический учебный случай: мужчина 39 лет испытывает трудности с последовательностью знакомого действия при относительно сохранной силе отдельных движений. Все наблюдения заранее заданы; студент не обследует пациента.",
  summary:"Планирование и организация сложного действия зависят от распределённых корковых, базально-ганглионарных, мозжечковых и сенсорных контуров. Сохранная сила не исключает нарушения праксиса; одних учебных карточек недостаточно для диагноза и локализации.",
  right:"Выбор согласуется с данными. Следующие наблюдения заранее заданы и не вызваны нажатием кнопки.",
  wrong:"Этот вывод не следует из имеющихся данных. Следующие наблюдения заранее заданы и не вызваны нажатием кнопки.",
  notice:"Учебный сценарий, а не инструкция для самостоятельной диагностики или лечения."
 },
 EN: {
  opening:"Synthetic teaching case: a 39-year-old man has difficulty sequencing a familiar action despite relatively preserved isolated strength. All observations are predefined; the student does not examine a patient.",
  summary:"Complex action relies on distributed cortical, basal-ganglia, cerebellar and sensory circuits. Preserved strength does not exclude impaired praxis; teaching cards alone cannot establish diagnosis or lesion localization.",
  right:"This choice fits the evidence. Subsequent observations are predefined and not caused by clicking.",
  wrong:"This conclusion is not supported. Subsequent observations are predefined and not caused by clicking.",
  notice:"Teaching scenario, not instructions for independent diagnosis or treatment."
 },
 KZ: {
  opening:"Ойдан құрастырылған оқу жағдайы: 39 жастағы ер адамда жеке қимыл күші салыстырмалы сақталса да, таныс әрекеттің реті бұзылады. Барлық бақылау алдын ала берілген; студент пациентті тексермейді.",
  summary:"Күрделі әрекет қыртыс, базальды ганглийлер, мишық және сенсорлық желілердің өзара байланысына тәуелді. Күштің сақталуы праксис бұзылысын жоққа шығармайды; оқу карточкалары диагноз бен ошақ орнын дәлелдемейді.",
  right:"Таңдау деректерге сәйкес. Кейінгі бақылаулар алдын ала берілген және батырманы басудан туындамайды.",
  wrong:"Бұл қорытынды деректермен расталмайды. Кейінгі бақылаулар алдын ала берілген және батырманы басудан туындамайды.",
  notice:"Бұл оқу жағдайы; өз бетінше диагноз қоюға немесе емдеуге арналған нұсқаулық емес."
 }
};
const positions: readonly [number,number,number,number,number,number] = [1,2,0,1,2,0];
export function reviewModuleElevenVirtualPatient(base: VirtualPatientScenario, language: Language): VirtualPatientScenario {
 if (base.moduleId !== 11 || base.stages.length !== 6 || steps[language].length !== 6)
  throw new Error("Module 11 virtual patient requires six stages");
 const c = copy[language];
 return {
  ...base, opening:c.opening, mechanismSummary:c.summary,
  stages:base.stages.map((stage,index)=>{
   const [task,observation,correct,wrongA,wrongB,explanation]=steps[language][index];
   const choices=[correct,wrongA,wrongB];
   const correctOption=positions[index];
   const order=correctOption===0?[0,1,2]:correctOption===1?[1,0,2]:[1,2,0];
   return {
    ...stage, situation:c.notice, task, newData:observation,
    mentorPrompt:explanation, mechanism:explanation,
    options:order.map((which,position)=>({
     id:`vp-11-stage-${index+1}-choice-${position+1}`,
     text:choices[which], response:which===0?c.right:c.wrong,
     feedback:explanation
    })) as VirtualPatientStage["options"],
    correctOption
   };
  })
 };
}
