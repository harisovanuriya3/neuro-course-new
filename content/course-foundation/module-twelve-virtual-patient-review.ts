import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 12: scripted case of slowed movement, NOT a clinical diagnostic algorithm.
// Source checks: Guyton & Hall 13e ch.57 (PDF 697–699 / print 730–732);
// Ganong 23e ch.16 (PDF 262–264 / print 250–252);
// C. L. Ghai Practical Physiology 8e (PDF 307–309 / print 285–287).
// All observations are predefined; button selections cannot change patient physiology.
type Step = readonly [task:string, observation:string, correct:string, distractorA:string, distractorB:string, explanation:string];
const steps: Record<Language, readonly Step[]> = {
 RU: [
  [
   "У женщины 58 лет движения стали медленнее. Как отличить брадикинезию от снижения мышечной силы?",
   "В заранее составленном описании врач отмечает медленное начало движения; при отдельной проверке разгибания кисти сопротивление сохраняется. Данные учебные, а не результат осмотра студентом.",
   "Отдельно сопоставить скорость и амплитуду движения с силой при сопротивлении, учитывая боль и понимание инструкции.",
   "Считать любое замедление доказательством пареза без исследования силы.",
   "Определить поражённое ядро базальных ганглиев только по возрасту.",
   "Брадикинезия описывает замедление движения, а парез — снижение силы. Эти признаки могут сосуществовать, но один не доказывает другой; нужны сопоставимые пробы и исключение альтернатив."
  ],
  [
   "Врач описывает повторные движения пальцев. Что следует сравнить, чтобы оценить характер замедления?",
   "В условных данных при повторном соединении большого и указательного пальцев темп и размах движений постепенно уменьшаются; сила одиночного сжатия относительно сохранена. Наблюдение заранее задано.",
   "Сравнить темп, амплитуду и их изменение по серии повторов при одинаковой инструкции и нагрузке.",
   "Измерить только силу одиночного сжатия и считать темп несущественным.",
   "Назвать снижение амплитуды без проверки повторов точным признаком конкретного диагноза.",
   "Постепенное уменьшение амплитуды и скорости при повторных движениях поддерживает описание брадикинезии с декрементом, но не определяет единственную причину. Сила оценивается отдельно."
  ],
  [
   "Как в канонической схеме объяснить облегчение таламо-коркового сигнала прямым путём?",
   "Для учебного разбора дана упрощённая схема: кора возбуждает стриатум; часть стриарных нейронов тормозит GPi/SNr, которые обычно тонически тормозят таламус. Это схема, а не запись разрядов пациентки.",
   "Усиление торможения GPi/SNr стриатумом уменьшает их тормозный выход к таламусу и может облегчить таламо-корковую активность.",
   "Прямой путь возбуждает GPi/SNr и тем самым обязательно усиливает их торможение таламуса.",
   "Базальные ганглии непосредственно заменяют нижние мотонейроны в передаче команды мышцам.",
   "В упрощённом прямом пути стриатум тормозит GPi/SNr, ослабляя тоническое торможение таламуса. Это дизингибиция, а не прямое возбуждение мышцы и не численный прогноз скорости движения."
  ],
  [
   "Как описать непрямой путь и дофамин SNc, не называя дофамин универсальным возбудителем?",
   "В схеме непрямой путь проходит через GPe и субталамическое ядро STN к GPi/SNr. Нигростриарный дофамин действует на разные рецепторные популяции D1 и D2. Клиническая концентрация медиатора здесь не измерена.",
   "Различить D1- и D2-зависимую модуляцию; в канонической модели снижение дофаминового влияния меняет баланс прямого и непрямого путей.",
   "Утверждать, что дофамин одинаково возбуждает все нейроны стриатума.",
   "Приравнять активность GPe к выходу GPi/SNr, исключив STN из схемы.",
   "Непрямой путь: стриатум тормозит GPe, ослабление торможения STN повышает возбуждающее влияние STN на GPi/SNr. D1- и D2-популяции по-разному реагируют на дофамин; реальная сеть сложнее учебной схемы."
  ],
  [
   "При одинаковой дистанции шаг иногда начинается быстрее после внешнего зрительного сигнала. Что означает это наблюдение?",
   "В синтетическом повторении врач фиксирует более быстрый запуск шага после зрительного сигнала; сила мышц не менялась. Условия подсказки и внимания могли повлиять на результат. Кнопки студента не изменяют наблюдение.",
   "Сравнить одинаковые условия с подсказкой и без неё, учитывая внимание, сенсорные и постуральные факторы.",
   "Считать эффект подсказки доказательством полного восстановления дофаминовой передачи.",
   "Сделать вывод, что зрительный сигнал непосредственно увеличил силу мышцы.",
   "Внешние сигналы могут облегчать запуск действия через распределённые сенсомоторные сети. Улучшение не измеряет дофамин, не локализует очаг и не устанавливает диагноз."
  ],
  [
   "Какой итог можно сделать по этому учебному случаю без самодиагностики и назначения лечения?",
   "Имеются заранее заданные признаки замедления, декремента повторных движений и влияния подсказки при относительно сохранной силе. Нет полного неврологического осмотра, анамнеза лекарств и иных причин замедления.",
   "Описать возможное нарушение регуляции движения, перечислить альтернативы и указать необходимость профессиональной оценки для диагноза.",
   "По шести карточкам окончательно диагностировать болезнь Паркинсона и выбрать лечение.",
   "Исключить все неврологические причины, поскольку отдельная силовая проба сохранна.",
   "Базальные ганглии участвуют в выборе и масштабировании действий, но признаки не специфичны для одного заболевания. Для клинического вывода нужны полноценное обследование, история симптомов и альтернативные объяснения."
  ]
 ],
 EN: [
  [
   "A 58-year-old woman moves more slowly. How should bradykinesia be distinguished from reduced muscle strength?",
   "In this predefined teaching description, the clinician notes delayed movement initiation while resisted wrist extension remains relatively strong. These are scripted observations, not a student examination.",
   "Compare speed and amplitude separately from strength against resistance, while accounting for pain and comprehension.",
   "Treat any slowness as proof of paresis without testing strength.",
   "Identify a particular basal-ganglia nucleus as damaged from age alone.",
   "Bradykinesia refers to slowness of movement, whereas paresis denotes reduced strength. They may coexist, but neither establishes the other; comparable tests and alternatives matter."
  ],
  [
   "The clinician describes repeated finger movements. What comparison best characterizes the slowness?",
   "In the scripted observations, repeated thumb–index tapping progressively loses speed and amplitude, while isolated grip strength is relatively preserved. These data are predefined.",
   "Compare speed, amplitude and change across repetitions under matched instructions and load.",
   "Measure only a single grip-strength effort and ignore movement speed.",
   "Call reduced amplitude a definitive diagnosis without assessing repetition.",
   "Progressive reduction in speed and amplitude across repeated movements supports a description of bradykinesia with decrement, but does not identify a unique cause. Strength is assessed separately."
  ],
  [
   "In the canonical circuit, how can the direct pathway facilitate thalamocortical activity?",
   "A simplified teaching circuit is supplied: cortex excites striatum; one striatal population inhibits GPi/SNr, which normally exerts tonic inhibition on thalamus. This is not a patient neural recording.",
   "Striatal inhibition of GPi/SNr reduces their inhibitory thalamic output and may facilitate thalamocortical activity.",
   "The direct pathway excites GPi/SNr and necessarily increases their inhibition of thalamus.",
   "The basal ganglia directly replace lower motor neurons in delivering commands to muscle.",
   "In the simplified direct pathway, striatum inhibits GPi/SNr, reducing tonic thalamic inhibition. This is disinhibition, not direct muscle excitation or a numerical prediction of movement speed."
  ],
  [
   "How should the indirect pathway and SNc dopamine be described without calling dopamine universally excitatory?",
   "The indirect circuit includes GPe and the subthalamic nucleus (STN) before GPi/SNr. Nigrostriatal dopamine acts on distinct D1- and D2-receptor populations. No patient dopamine concentration was measured.",
   "Distinguish D1- and D2-dependent modulation; in the canonical model, reduced dopaminergic influence changes the balance of direct and indirect pathways.",
   "Claim that dopamine excites all striatal neurons in the same way.",
   "Treat GPe as equivalent to GPi/SNr output and omit STN.",
   "Indirect pathway: striatum inhibits GPe, reduced GPe inhibition disinhibits STN, and STN excites GPi/SNr. D1 and D2 populations respond differently to dopamine; actual circuits are more complex."
  ],
  [
   "At a matched walking distance, an external visual cue sometimes helps initiate a step. What does this finding mean?",
   "In a scripted repeat, the clinician records quicker step initiation with a visual cue and unchanged strength. Attention and cue conditions may influence performance. Student clicks do not change the observation.",
   "Compare matched conditions with and without cueing while considering attention, sensory and postural factors.",
   "Treat cue benefit as proof that dopaminergic transmission has fully recovered.",
   "Conclude that the visual signal directly increased muscle strength.",
   "External cues can facilitate action initiation through distributed sensorimotor networks. Benefit does not measure dopamine, localize a lesion or establish a diagnosis."
  ],
  [
   "What conclusion is justified by this teaching case without self-diagnosis or treatment advice?",
   "The predefined case shows slowness, decrement during repetition and cue sensitivity with relatively preserved isolated strength. A full neurological examination, medication history and alternative causes are unavailable.",
   "Describe possible altered motor regulation, consider alternatives and require professional assessment for diagnosis.",
   "Diagnose Parkinson disease definitively and select treatment from six cards.",
   "Exclude all neurological causes because one strength test was preserved.",
   "Basal ganglia contribute to action selection and scaling, but these signs are not unique to one disease. Diagnosis requires full examination, history and consideration of alternatives."
  ]
 ],
 KZ: [
  [
   "58 жастағы әйелдің қимылы баяулаған. Брадикинезияны бұлшықет күшінің төмендеуінен қалай ажыратуға болады?",
   "Алдын ала берілген оқу сипаттамасында дәрігер қимылдың кеш басталатынын, ал білезікті қарсы күшке жазу салыстырмалы сақталғанын көрсетеді. Бұл студент жүргізген тексеру емес.",
   "Қимыл жылдамдығы мен амплитудасын қарсыласуға қарсы күштен бөлек салыстырып, ауырсыну мен нұсқауды түсінуді ескеру.",
   "Күшті тексермей, кез келген баяулауды парездің дәлелі деу.",
   "Тек жасына қарап базальды ганглийлердің белгілі бір ядросын зақымданған деп атау.",
   "Брадикинезия — қимылдың баяулауы, ал парез — күштің төмендеуі. Олар қатар кездесуі мүмкін, бірақ бірі екіншісін дәлелдемейді; салыстырмалы сынамалар мен балама себептер қажет."
  ],
  [
   "Дәрігер саусақтардың қайталама қимылдарын сипаттайды. Баяулаудың сипатын бағалау үшін нені салыстыру керек?",
   "Алдын ала берілген бақылауда бас бармақ пен сұқ саусақты қайталап түйістіру кезінде қимыл қарқыны мен амплитудасы біртіндеп азаяды, ал бір реттік қысу күші салыстырмалы сақталған.",
   "Нұсқау мен жүктеме бірдей болғанда қайталанулар бойындағы жылдамдықты, амплитуданы және олардың өзгерісін салыстыру.",
   "Тек бір реттік қысу күшін өлшеп, қимыл қарқынын елемеу.",
   "Қайталануды бағаламай, амплитуда азаюын нақты диагноздың дәлелі деу.",
   "Қайталама қимылда жылдамдық пен амплитуданың біртіндеп азаюы декрементпен жүретін брадикинезияны сипаттауға көмектеседі, бірақ жалғыз себепті анықтамайды. Күш бөлек бағаланады."
  ],
  [
   "Канондық сызбада тікелей жол таламо-қыртыстық белсенділікті қалай жеңілдетеді?",
   "Оқу сызбасы ықшамдалған: қыртыс стриатумды қоздырады; стриатум нейрондарының бір бөлігі GPi/SNr-ды тежейді, ал олар таламусты тонустық түрде тежейді. Бұл пациент нейрондарының нақты жазбасы емес.",
   "Стриатум GPi/SNr-ды тежегенде, олардың таламусқа тежеуші шығысы азайып, таламо-қыртыстық белсенділік жеңілдеуі мүмкін.",
   "Тікелей жол GPi/SNr-ды қоздырып, олардың таламусты тежеуін міндетті түрде арттырады.",
   "Базальды ганглийлер бұлшықетке команда жеткізуде төменгі мотонейрондарды тікелей алмастырады.",
   "Ықшам тікелей жолда стриатум GPi/SNr-ды тежеп, таламустың тонустық тежелуін азайтады. Бұл тежелуден босату, бұлшықетті тікелей қоздыру немесе жылдамдықтың сандық болжамы емес."
  ],
  [
   "Жанама жол мен SNc дофаминін дофаминді әмбебап қоздырғыш демей қалай сипаттау керек?",
   "Жанама жол GPe мен субталамустық ядро (STN) арқылы GPi/SNr-ға өтеді. Нигростриаталдық дофамин D1 және D2 рецепторлы нейрондар популяцияларына әртүрлі әсер етеді. Пациенттегі дофамин деңгейі өлшенбеген.",
   "D1 және D2 арқылы модуляцияны ажырату; канондық модельде дофаминдік әсердің төмендеуі тікелей және жанама жолдардың тепе-теңдігін өзгертеді.",
   "Дофамин барлық стриатум нейрондарын бірдей қоздырады деу.",
   "GPe белсенділігін GPi/SNr шығысымен теңестіріп, STN-ды алып тастау.",
   "Жанама жолда стриатум GPe-ні тежейді, GPe тежелуі азайғанда STN белсенділігі артады, ал STN GPi/SNr-ды қоздырады. D1 және D2 популяциялары дофаминге әртүрлі жауап береді; нақты желі күрделірек."
  ],
  [
   "Бірдей қашықтықта сыртқы көрнекі белгі кейде қадамды тезірек бастауға көмектеседі. Бұл нені білдіреді?",
   "Алдын ала берілген қайталама бақылауда дәрігер көрнекі белгімен қадамның тезірек басталғанын, ал күштің өзгермегенін тіркейді. Назар мен жағдай әсер етуі мүмкін; студент батырмасы бақылауды өзгертпейді.",
   "Назар, сенсорлық және постуралдық факторларды ескеріп, көрнекі белгі бар және жоқ бірдей жағдайларды салыстыру.",
   "Көрнекі белгі көмектессе, дофаминдік берілу толық қалпына келді деу.",
   "Көрнекі белгі бұлшықет күшін тікелей арттырды деп қорытындылау.",
   "Сыртқы белгілер таралған сенсомоторлық желілер арқылы қимылды бастауды жеңілдетуі мүмкін. Жақсару дофаминді өлшемейді, ошақты анықтамайды және диагнозды дәлелдемейді."
  ],
  [
   "Бұл оқу жағдайынан өзінше диагноз қоймай және ем ұсынбай қандай қорытынды жасауға болады?",
   "Алдын ала берілген жағдайда баяу қимыл, қайталанғанда амплитуда мен қарқынның азаюы, көрнекі белгі әсері және салыстырмалы сақталған күш бар. Толық неврологиялық тексеру, дәрілік анамнез және өзге себептер туралы дерек жоқ.",
   "Қимыл реттелуінің ықтимал бұзылысын сипаттап, балама себептерді атап, диагноз үшін кәсіби тексеру қажеттігін көрсету.",
   "Алты карточка бойынша Паркинсон ауруын түпкілікті анықтап, ем таңдау.",
   "Бір күш сынамасы сақталғандықтан, барлық неврологиялық себептерді жоққа шығару.",
   "Базальды ганглийлер қимылды таңдау мен оның ауқымын реттеуге қатысады, бірақ бұл белгілер бір ауруға ғана тән емес. Диагноз үшін толық тексеру, анамнез және балама түсіндірулер қажет."
  ]
 ]
};
const copy: Record<Language, { opening:string; summary:string; notice:string; right:string; wrong:string; mentor:string }> = {
 RU: {
  opening:"Синтетический учебный случай: у женщины 58 лет замедлены движения и начало шага. Сила отдельных движений относительно сохранена. Все наблюдения заранее заданы; студент не обследует пациентку и не влияет на её состояние кнопками.",
  summary:"Базальные ганглии влияют на выбор и масштабирование движений через взаимодействующие корково-стриато-паллидо-таламические контуры. Прямой и непрямой пути — упрощённая схема, не численная модель симптомов. Шесть решений проверяют выбор объяснения, но не устанавливают диагноз и не оценивают качество письменных ответов.",
  notice:"Учебная ситуация с заранее заданными наблюдениями; самостоятельное обследование, диагноз и лечение не предлагаются.",
  right:"Выбор соответствует учебным данным. Следующее наблюдение заранее задано и не вызвано нажатием кнопки.",
  wrong:"Выбор не подтверждается представленными данными. Следующее наблюдение заранее задано и не вызвано нажатием кнопки.",
  mentor:"Сначала сопоставьте наблюдение с физиологическим механизмом и альтернативными объяснениями. Полное объяснение появится после письменного обоснования."
 },
 EN: {
  opening:"Synthetic teaching case: a 58-year-old woman has slowed movement and delayed step initiation. Isolated strength is relatively preserved. All observations are predefined; the learner neither examines the patient nor changes her condition by clicking.",
  summary:"Basal ganglia contribute to action selection and scaling through interacting cortico-striato-pallido-thalamic circuits. Direct and indirect pathways are simplified teaching schemes, not numerical symptom models. Six keyed choices do not establish a diagnosis or grade written explanations.",
  notice:"Scripted teaching observations; no independent examination, diagnosis or treatment is requested.",
  right:"This choice fits the teaching evidence. The next observation is predefined and not caused by clicking.",
  wrong:"This choice is not supported by the given evidence. The next observation is predefined and not caused by clicking.",
  mentor:"First compare the observation with the physiological mechanism and alternatives. The full explanation follows your written reasoning."
 },
 KZ: {
  opening:"Ойдан құрастырылған оқу жағдайы: 58 жастағы әйелдің қимылы мен қадам бастауы баяулаған. Жеке қимыл күші салыстырмалы сақталған. Барлық бақылау алдын ала берілген; студент пациентті тексермейді және батырмамен оның жағдайын өзгертпейді.",
  summary:"Базальды ганглийлер қыртыс–стриатум–паллидум–таламус желілері арқылы қимылды таңдау мен оның ауқымын реттеуге қатысады. Тікелей және жанама жолдар — ықшам оқу сызбалары, симптомдардың сандық моделі емес. Алты таңдау диагноз қоймайды және жазбаша түсіндірулерді бағаламайды.",
  notice:"Алдын ала берілген бақылаулары бар оқу жағдайы; өз бетінше тексеру, диагноз қою немесе ем таңдау ұсынылмайды.",
  right:"Таңдау оқу деректеріне сәйкес. Келесі бақылау алдын ала берілген және батырмадан туындамайды.",
  wrong:"Таңдау берілген деректермен расталмайды. Келесі бақылау алдын ала берілген және батырмадан туындамайды.",
  mentor:"Алдымен бақылауды физиологиялық механизммен және балама түсіндірулермен салыстырыңыз. Толық түсіндіру жазбаша негіздемеден кейін көрсетіледі."
 }
};
const positions: readonly [number,number,number,number,number,number] = [2,0,1,2,0,1];

export function reviewModuleTwelveVirtualPatient(base: VirtualPatientScenario, language: Language): VirtualPatientScenario {
 if (base.moduleId !== 12 || base.stages.length !== 6 || steps[language].length !== 6)
  throw new Error("Module 12 virtual patient requires six stages");
 const c=copy[language];
 return {
  ...base, opening:c.opening, mechanismSummary:c.summary,
  stages:base.stages.map((stage,index)=>{
   const [task,observation,correct,wrongA,wrongB,explanation]=steps[language][index];
   const choices=[correct,wrongA,wrongB];
   const correctOption=positions[index];
   const order=correctOption===0?[0,1,2]:correctOption===1?[1,0,2]:[1,2,0];
   return {
    ...stage, situation:c.notice, task, newData:observation,
    mentorPrompt:c.mentor, mechanism:explanation,
    options:order.map((which,position)=>({
     id:"vp-12-stage-"+(index+1)+"-choice-"+(position+1),
     text:choices[which],
     response:which===0?c.right:c.wrong,
     feedback:explanation
    })) as VirtualPatientStage["options"],
    correctOption
   };
  })
 };
}
