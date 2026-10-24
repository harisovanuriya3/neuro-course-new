import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 7: patellar stretch-reflex examination, not a diagnostic simulation.
// Guyton & Hall 13e ch.55; Ganong 23e ch.9; Ghai 8e, Deep Reflexes.
// Each decision has one defensible best answer; unlike the generic scenario,
// other stages' valid decisions are not recycled as wrong choices.
type Step = readonly [task:string, observation:string, correct:string, distractorA:string, distractorB:string, explanation:string];
const steps: Record<Language, Step[]> = {
  RU: [
    ["Что запускает коленный рефлекс при ударе по связке надколенника?",
     "Доброволец сидит с расслабленными голенями. После удара молоточком возникает кратковременное разгибание колена.",
     "Краткое растяжение четырёхглавой мышцы возбуждает её мышечные веретёна и Ia-афференты.",
     "Срабатывают прежде всего сухожильные органы Гольджи, непосредственно вызывая сокращение квадрицепса.",
     "Кожные болевые рецепторы обеспечивают основной моносинаптический путь разгибания.",
     "Удар по связке растягивает квадрицепс. Веретено кодирует изменение длины; орган Гольджи преимущественно сигнализирует о напряжении."],
    ["Слева ответ слабее. Как проверить, что асимметрия воспроизводима?",
     "При первом осмотре разгибание левого колена менее заметно. Положение ног и сила удара ещё не были стандартизированы.",
     "Повторить пробу с одинаковым положением, расслаблением и сопоставимым ударом с обеих сторон.",
     "По одному удару диагностировать поражение левого корешка L3.",
     "Не повторять пробу: различия сухожильных ответов всегда указывают на повреждение мотонейронов.",
     "Сила ответа зависит от исходного напряжения мышцы, положения конечности, стимула и нисходящей модуляции. Одного удара недостаточно для локализации."],
    ["После стандартизации левый ответ остаётся слабым, но усиливается при манёвре Ендрассика. Что означает усиление?",
     "Повторные пробы подтверждают слабый левый ответ. При сцеплении пальцев рук и попытке разъединить их ответ становится заметнее.",
     "Манёвр изменяет возбудимость рефлекторных сетей; усиление не доказывает ни норму, ни точную локализацию поражения.",
     "Усиление доказывает, что чувствительный и двигательный пути не могут быть поражены.",
     "Манёвр заменяет Ia-афферента прямой стимуляцией сухожильного органа Гольджи.",
     "Подкрепление сухожильного рефлекса связано с центральной модуляцией. Его эффект полезен при осмотре, но не исключает заболевание и не локализует очаг сам по себе."],
    ["Какой центральный путь обеспечивает наиболее короткую часть рефлекса растяжения?",
     "При растяжении веретена импульсы Ia-афферента входят в спинной мозг через задний корешок.",
     "Ia-афферент возбуждает α-мотонейрон квадрицепса через центральный глутаматергический моносинаптический контакт.",
     "Ацетилхолин — основной медиатор Ia→α-мотонейронного синапса в спинном мозге.",
     "Сухожильный орган Гольджи через Ib-афферент образует основной прямой возбуждающий контакт коленного рефлекса.",
     "В спинном мозге центральный Ia→α-синапс преимущественно глутаматергический; ацетилхолин действует в нервно-мышечном соединении."],
    ["При сокращении квадрицепса активность сгибателей колена снижается. Как это объяснить?",
     "При контролируемом растяжении квадрицепса регистрируют его ответ и снижение активности антагонистов.",
     "Коллатерали Ia-афферентов возбуждают тормозные интернейроны, снижающие активность α-мотонейронов антагонистов.",
     "Один и тот же моносинаптический Ia-контакт напрямую тормозит мотонейроны сгибателей.",
     "Антагонисты расслабляются только из-за механического растяжения сухожилия, без спинальных интернейронов.",
     "Реципрокное торможение требует дополнительного тормозного интернейрона: моносинаптической является прежде всего возбуждающая ветвь к агонисту."],
    ["После повторных проб асимметрия сохраняется. Как сформулировать вывод без чрезмерной диагностики?",
     "Осмотр подтверждает асимметрию коленного рефлекса; результаты силы, чувствительности и других рефлексов необходимо учитывать отдельно.",
     "Оценить всю дугу (веретено, Ia, бедренный нерв, L2–L4, α-мотонейрон, мышца) и нисходящие влияния; по одному рефлексу точный очаг не устанавливают.",
     "По асимметрии рефлекса точно диагностировать поражение только заднего корешка L3.",
     "Раз ответ усилился при манёвре Ендрассика, дальнейшая неврологическая оценка не нужна.",
     "Коленный рефлекс преимущественно связан с сегментами L2–L4 (часто выделяют L3–L4) и бедренным нервом. Асимметрия неспецифична без сопоставления с другими признаками."]
  ],
  EN: [
    ["What initiates the knee jerk when the patellar tendon is tapped?",
     "A volunteer sits with both lower legs relaxed. A tendon tap produces brief knee extension.",
     "Brief quadriceps stretch activates its muscle spindles and group Ia afferents.",
     "Golgi tendon organs are the primary receptors and directly produce quadriceps contraction.",
     "Cutaneous nociceptors provide the main monosynaptic pathway for knee extension.",
     "The tap briefly stretches quadriceps. Spindles signal muscle length change; Golgi tendon organs primarily signal tension."],
    ["The left response looks smaller. What should be done before interpreting asymmetry?",
     "The first left knee jerk appears smaller, but leg position and tap force were not standardized.",
     "Repeat the examination with matched positioning, relaxation and comparable taps on both sides.",
     "Diagnose a left L3 root lesion from the first tendon tap.",
     "Avoid repetition because any difference between tendon jerks proves motor-neuron damage.",
     "Baseline muscle tension, posture, stimulus and descending modulation influence the response. A single tap cannot localize a lesion."],
    ["The left response remains small but increases with Jendrassik reinforcement. What follows?",
     "Repeated standardized taps show a small left response. Interlocking and pulling the fingers apart makes it more visible.",
     "Reinforcement modulates reflex-circuit excitability; improvement neither proves normality nor localizes a lesion.",
     "Improvement proves that the sensory and motor limbs are completely intact.",
     "The maneuver replaces Ia signaling with direct activation of Golgi tendon organs.",
     "Reinforcement reflects central modulation. It assists examination but cannot independently exclude disease or pinpoint a lesion."],
    ["What central pathway accounts for the shortest component of the stretch reflex?",
     "Group Ia signals from the spindle enter the spinal cord through the dorsal root.",
     "The Ia afferent excites a quadriceps alpha motor neuron at a central glutamatergic monosynaptic connection.",
     "Acetylcholine is the main transmitter at the spinal Ia-to-alpha-motor-neuron synapse.",
     "The Golgi tendon organ and its Ib afferent provide the main direct excitatory knee-jerk synapse.",
     "The central Ia-to-alpha synapse is predominantly glutamatergic; acetylcholine is the transmitter at the neuromuscular junction."],
    ["Quadriceps activation coincides with reduced hamstring activity. Why?",
     "During controlled quadriceps stretch, the agonist responds while activity of knee-flexor antagonists decreases.",
     "Ia collaterals excite inhibitory interneurons that reduce activity in antagonist alpha motor neurons.",
     "The same monosynaptic Ia contact directly inhibits knee-flexor motor neurons.",
     "Antagonists relax solely through tendon mechanics without spinal interneurons.",
     "Reciprocal inhibition recruits an inhibitory interneuron; the excitatory branch to the agonist is the principal monosynaptic pathway."],
    ["Asymmetry persists after repeated examinations. What is a defensible conclusion?",
     "The knee-jerk asymmetry persists. Muscle strength, sensation and other reflexes must be assessed separately.",
     "Assess the entire arc (spindle, Ia, femoral nerve, L2–L4, alpha motor neuron and muscle) and descending influences; one reflex cannot pinpoint a lesion.",
     "A single asymmetric reflex precisely diagnoses an isolated L3 dorsal-root lesion.",
     "Because Jendrassik reinforcement improved the response, no further neurological assessment is needed.",
     "The knee jerk chiefly involves L2–L4 (especially L3–L4) and the femoral nerve. Asymmetry requires correlation with other findings."]
  ],
  KZ: [
    ["Тізе тобығы сіңірін соққанда тізе рефлексін не іске қосады?",
     "Ерікті адам аяқтарын босаңсытып отыр. Сіңірге балғашықпен соққанда тізе қысқа уақытқа жазылады.",
     "Төртбасты бұлшықеттің қысқа созылуы оның бұлшықет ұршықтарын және Ia-афференттерін қоздырады.",
     "Негізгі рецепторлар — Гольджи сіңір мүшелері, олар төртбасты бұлшықетті тікелей жиырылтады.",
     "Тері ноцицепторлары тізені жазатын негізгі моносинапстық жолды құрайды.",
     "Сіңірге соққы төртбасты бұлшықетті қысқа уақытқа созады. Бұлшықет ұршығы ұзындық өзгерісін, ал Гольджи сіңір мүшесі негізінен кернеуді сезеді."],
    ["Сол жақтағы жауап әлсіздеу. Асимметрияны түсіндірмес бұрын не істеу керек?",
     "Алғашқы тексеруде сол тізе рефлексі әлсіздеу, бірақ аяқ қалпы мен соққы күші бірдей болмаған.",
     "Екі жақта аяқ қалпын, босаңсуын және соққыны бірдей етіп, сынаманы қайталау.",
     "Бір соққыға қарап сол жақ L3 түбіршесінің зақымын анықтау.",
     "Сынаманың қажеті жоқ: рефлекстер айырмасы әрдайым мотонейрон зақымын білдіреді.",
     "Жауапқа бұлшықеттің бастапқы кернеуі, аяқ қалпы, стимул және төмендеуші ықпал әсер етеді. Бір соққы ошақты анықтауға жеткіліксіз."],
    ["Сол жақтағы жауап әлсіз, бірақ Ендрассик тәсілімен күшейеді. Бұл нені білдіреді?",
     "Бірдей шарттарда сол жақтағы жауап әлсіз болып қалады. Қол саусақтарын айқастырып тартқанда жауап күшейеді.",
     "Бұл тәсіл рефлекс тізбегінің қозғыштығын өзгертеді; күшеюі қалыпты жағдайды да, зақым орнын да дәлелдемейді.",
     "Жауаптың күшеюі сезімтал және қозғалтқыш жолдардың толық сау екенін дәлелдейді.",
     "Бұл тәсіл Ia-афферентті Гольджи сіңір мүшесінің тікелей белсенуімен алмастырады.",
     "Рефлексті күшейту орталық модуляцияға байланысты. Ол тексеруге көмектеседі, бірақ ауруды жоққа шығармайды және ошақты жеке өзі анықтамайды."],
    ["Созылу рефлексінің ең қысқа орталық жолы қандай?",
     "Ұршықтан шыққан Ia импульстары жұлынға артқы түбірше арқылы кіреді.",
     "Ia-афферент төртбасты бұлшықеттің α-мотонейронын орталық глутаматергиялық моносинапстық түйісу арқылы қоздырады.",
     "Жұлындағы Ia→α-мотонейрон синапсының негізгі медиаторы — ацетилхолин.",
     "Гольджи сіңір мүшесінің Ib-афференті тізе рефлексінің негізгі тікелей қоздырғыш синапсын түзеді.",
     "Жұлындағы Ia→α-мотонейрон түйісуінде негізінен глутамат қызмет етеді; ацетилхолин жүйке-бұлшықет түйіспесінде әсер етеді."],
    ["Төртбасты бұлшықет жиырылғанда тізе бүккіштерінің белсенділігі төмендейді. Неліктен?",
     "Төртбасты бұлшықетті бақыланатын созу кезінде оның жауабымен қатар антагонистердің белсенділігі төмендейді.",
     "Ia-афферент коллатералдары тежегіш интернейрондарды қоздырып, антагонист α-мотонейрондарының белсенділігін төмендетеді.",
     "Сол бір моносинапстық Ia түйісуі тізе бүккіштерінің мотонейрондарын тікелей тежейді.",
     "Антагонистер жұлын интернейрондарынсыз тек сіңірдің механикалық созылуынан босаңсиды.",
     "Реципрокты тежелуге қосымша тежегіш интернейрон қажет; агонисті қоздыратын тармақ — негізгі моносинапстық жол."],
    ["Қайталап тексергенде асимметрия сақталды. Қандай қорытынды дұрыс?",
     "Тізе рефлексінің асимметриясы расталды. Бұлшықет күші, сезімталдық және басқа рефлекстер бөлек бағалануы тиіс.",
     "Толық доғаны (ұршық, Ia, сан жүйкесі, L2–L4, α-мотонейрон, бұлшықет) және төмендеуші ықпалды бағалау; бір рефлекс ошақты дәл анықтамайды.",
     "Бір асимметриялық рефлекс тек L3 артқы түбіршесінің зақымын нақты дәлелдейді.",
     "Ендрассик тәсілі жауапты күшейткендіктен, басқа неврологиялық тексеру қажет емес.",
     "Тізе рефлексі негізінен L2–L4 (әсіресе L3–L4) сегменттерімен және сан жүйкесімен байланысты. Асимметрияны басқа белгілермен бірге түсіндіру керек."]
  ]
};
const labels:Record<Language,{right:string;wrong:string}> = {
 RU:{right:"Решение соответствует данным; перейдите к следующему этапу.",wrong:"Этот выбор не следует из представленных данных; сравните с разбором."},
 EN:{right:"This choice fits the evidence; proceed to the next stage.",wrong:"This choice is not supported by the evidence; compare it with the explanation."},
 KZ:{right:"Шешім деректерге сәйкес келеді; келесі кезеңге өтіңіз.",wrong:"Бұл шешім деректермен расталмайды; түсіндірмемен салыстырыңыз."}
};
const answerPositions=[1,2,0,2,0,1] as const;
export function reviewModuleSevenVirtualPatient(base:VirtualPatientScenario, language:Language):VirtualPatientScenario {
 if(base.moduleId!==7 || base.stages.length!==6 || steps[language].length!==6)
   throw new Error("Module 7 virtual-patient contract requires six stages");
 return {
  ...base,
  stages:base.stages.map((stage,index)=>{
   const [task,observation,correct,wrongA,wrongB,explanation]=steps[language][index];
   const candidates=[correct,wrongA,wrongB];
   const position=answerPositions[index];
   const order=position===0?[0,1,2]:position===1?[1,0,2]:[1,2,0];
   return {
    ...stage,
    task,
    newData:observation,
    mechanism:explanation,
    mentorPrompt:explanation,
    // The patient's observations do not magically change with an incorrect choice.
    options:order.map((candidate,indexInOrder)=>({
     id:`vp-7-stage-${index+1}-choice-${indexInOrder+1}`,
     text:candidates[candidate],
     response:candidate===0?labels[language].right:labels[language].wrong,
     feedback:explanation
    })) as VirtualPatientStage["options"],
    correctOption:position
   };
  })
 };
}
