import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 9: synthetic longitudinal thoracic spinal-cord injury case.
// Checked against Library: Ganong 23e PDF 169–172, 261–262;
// Guyton & Hall 13e PDF 667–673; Ghai 8e PDF 317–319.
// No painful testing. Reflex signs alone are not a diagnosis or prognosis.
type Step = readonly [task:string, observation:string, correct:string, wrongA:string, wrongB:string, explanation:string];
const steps:Record<Language,readonly Step[]> = {
 RU:[
  ["В первые часы после грудной травмы снижены тонус и коленные рефлексы. Какой вывод допустим?",
   "Мужчина 31 года после тяжёлой грудной травмы наблюдается специалистами. Ноги слабы, коленные рефлексы угнетены; артериальное давление и пульс оценивают отдельно.",
   "Предположить спинальный шок; документировать неврологический уровень, силу, чувствительность и рефлексы и повторить осмотр.",
   "Считать угнетение рефлекса доказательством необратимой гибели всех поясничных α-мотонейронов.",
   "Приравнять спинальный шок к гемодинамическому нейрогенному шоку, не проверяя давление и пульс.",
   "Спинальный шок — раннее угнетение сегментарных рефлексов после повреждения спинного мозга. Нейрогенный шок — другое, гемодинамическое состояние. Один слабый рефлекс не определяет полноту травмы или прогноз."],
  ["МРТ выявляет грудной очаг без разрушения поясничного утолщения. Как объяснить слабые коленные рефлексы?",
   "В первые сутки поясничные сегменты на учебной МРТ не имеют отдельного очага, но коленные рефлексы всё ещё снижены.",
   "Учитывать временную гиповозбудимость нижележащих спинальных сетей при утрате нисходящих влияний и повторять осмотры.",
   "Считать сохранный вид поясничных сегментов на МРТ доказательством нормальной функции всех рефлекторных дуг.",
   "Приравнять номер повреждённого грудного позвонка к номеру сегмента спинного мозга.",
   "Нижеочаговые сегментарные цепи могут быть анатомически сохранны, но временно функционально угнетены. МРТ не измеряет Ia-вход и возбудимость α-мотонейронов; уровень позвонка не равен автоматически уровню сегмента."],
  ["Через несколько недель рефлексы усилились, но произвольные движения остаются нарушенными. Почему?",
   "Повторные осмотры выявляют возвращение и усиление коленных рефлексов при сохраняющейся выраженной слабости ног.",
   "Связать усиление рефлексов с изменением возбудимости сегментарных сетей и нисходящего контроля, не заявляя о восстановлении произвольных путей.",
   "Считать оживление рефлексов доказательством полного восстановления корково-спинномозгового пути.",
   "Объяснить усиление рефлексов обязательным разрушением Ia-афферентов мышечных веретён.",
   "По мере выхода из спинального шока рефлексы могут возвращаться и становиться усиленными, несмотря на стойкое нарушение произвольного движения. Сроки вариабельны; гиперрефлексия не доказывает восстановление проводимости нисходящих путей."],
  ["Какие звенья обеспечивают коленный рефлекс и реципрокное торможение антагониста?",
   "Стандартный безопасный осмотр вызывает краткое разгибание голени. Учебная схема показывает мышечное веретено четырёхглавой мышцы, Ia, α-мотонейрон и интернейрон.",
   "Провести Ia-сигнал от веретена к α-мотонейрону через один центральный синапс; торможение антагониста объяснить дополнительным Ia-тормозным интернейроном.",
   "Назвать Ib-афферент органа Гольджи непосредственным рецептором обычного коленного рефлекса.",
   "Назвать γ-мотонейрон чувствительным волокном заднего корешка.",
   "Быстрое растяжение возбуждает веретёна; Ia-афферент моносинаптически возбуждает α-мотонейрон той же мышцы. Реципрокное торможение требует интернейрона. γ-эфференты регулируют чувствительность интрафузальных волокон."],
  ["Как различить рецепторы длины и напряжения, не выдавая схему за измерение?",
   "На схеме показаны мышечное веретено и сухожильный орган Гольджи. У пациента отдельно не регистрировали импульсы Ia, Ib или γ-волокон.",
   "Различить Ia/II веретена (длина и изменение длины), Ib органа Гольджи (напряжение) и γ-эфференты интрафузальных волокон; указать, что вывод косвенный.",
   "Считать Ib-афференты датчиками только длины и прямыми инициаторами коленного рефлекса.",
   "Считать γ-волокна сенсорными и утверждать, что один удар молоточком измеряет их разряды.",
   "Веретёна кодируют растяжение через Ia/II, органы Гольджи — напряжение через Ib; γ-мотонейроны — двигательные. Отдельные разряды этих волокон в учебном случае не измерены."],
  ["Какой итог верно различает рефлексы и произвольное управление?",
   "Раннее угнетение и позднее усиление рефлексов сопоставлены со стойкой слабостью. Защитное отдёргивание рассматривают только на схеме, не вызывая боль у пациента.",
   "Заключить, что нижеочаговые рефлексы могут сохраняться без восстановления произвольных путей; отдёргивание полисинаптично, перекрёстное разгибание возможно, но не обязательно.",
   "Считать все спинальные рефлексы моносинаптическими, а гиперрефлексию доказательством полного выздоровления.",
   "Предложить болезненную пробу на пациенте и объявить перекрёстное разгибание обязательным при любом стимуле.",
   "Рефлекс растяжения имеет моносинаптический Ia→α-компонент; отдёргивание включает полисинаптические сети. Перекрёстное разгибание зависит от условий и не обязательно. Случай учебный и не заменяет диагностику."]
 ],
 EN:[
  ["How should reduced tone and knee jerks in the first hours after thoracic trauma be interpreted?",
   "A 31-year-old man is assessed after severe thoracic trauma. His legs are weak and knee jerks depressed; blood pressure and pulse are evaluated separately.",
   "Consider spinal shock, document neurological level, strength, sensation and reflexes, and reassess serially.",
   "Treat a depressed knee jerk as proof of irreversible loss of every lumbar α-motor neuron.",
   "Equate spinal shock with hemodynamic neurogenic shock without checking blood pressure or pulse.",
   "Spinal shock denotes early depression of segmental reflexes after spinal cord injury; neurogenic shock is a separate hemodynamic syndrome. A single weak reflex cannot establish injury completeness or prognosis."],
  ["MRI shows a thoracic lesion without destruction of the lumbar enlargement. Why are knee jerks still depressed?",
   "On day one, the teaching MRI shows no separate lumbar cord lesion, but knee jerks remain reduced.",
   "Allow for temporary hypoexcitability of caudal spinal circuits after loss of descending influences; follow serial examinations.",
   "Assume a normal lumbar MRI appearance proves that all lumbar reflex arcs function normally.",
   "Equate the number of an injured thoracic vertebra with the number of a spinal cord segment.",
   "Caudal segmental circuits can be structurally preserved yet transiently functionally depressed. MRI does not measure Ia input or α-motor-neuron excitability; vertebral and cord segment levels differ."],
  ["Weeks later knee jerks are brisk but voluntary leg movement remains impaired. What explains this?",
   "Serial examinations show return and exaggeration of knee jerks despite persistent marked leg weakness.",
   "Attribute hyperreflexia to altered segmental excitability and descending modulation, without claiming recovery of voluntary motor pathways.",
   "Take brisk reflexes as proof of complete corticospinal tract recovery.",
   "Assume hyperreflexia must result from destruction of muscle-spindle Ia afferents.",
   "As spinal shock resolves, reflexes can return and become brisk while voluntary movement remains impaired. Timing varies; hyperreflexia does not prove restoration of descending conduction."],
  ["Which connections produce the knee jerk and reciprocal antagonist inhibition?",
   "A safe routine examination evokes brief knee extension. The teaching diagram shows quadriceps spindles, Ia, α-motor neurons and an interneuron.",
   "Trace spindle Ia input through one central synapse to homonymous α-motor neurons, and antagonist inhibition through an additional Ia inhibitory interneuron.",
   "Call Golgi tendon organ Ib afferents the direct receptors for the ordinary knee jerk.",
   "Call γ-motor neurons sensory dorsal-root fibers.",
   "Rapid stretch excites spindles; Ia afferents monosynaptically excite homonymous α-motor neurons. Reciprocal inhibition uses an interneuron. γ-efferents regulate intrafusal spindle sensitivity."],
  ["How do stretch and tension receptors differ without mistaking a diagram for a measurement?",
   "The diagram shows a muscle spindle and a Golgi tendon organ. Ia, Ib and γ discharges were not separately recorded in this patient.",
   "Distinguish spindle Ia/II afferents (length and length change), Golgi Ib afferents (tension) and γ efferents to intrafusal fibers; acknowledge indirect inference.",
   "Claim Ib afferents encode only muscle length and directly trigger the knee jerk.",
   "Claim γ fibers are sensory and that one tendon tap directly measures their firing.",
   "Spindles encode stretch via Ia/II, Golgi tendon organs encode tension via Ib, and γ-motor neurons are efferent. None of these separate discharges was measured in this synthetic case."],
  ["Which conclusion correctly distinguishes spinal reflexes from voluntary control?",
   "Early reflex depression and later hyperreflexia are compared with persistent weakness. Withdrawal is discussed only using a diagram; no painful patient stimulus is used.",
   "Conclude that caudal reflexes can persist without restored voluntary pathways; withdrawal is polysynaptic and crossed extension is possible but not obligatory.",
   "Call all spinal reflexes monosynaptic and hyperreflexia proof of complete recovery.",
   "Recommend painful testing on the patient and claim crossed extension follows every stimulus.",
   "The stretch reflex has a monosynaptic Ia→α component; withdrawal uses polysynaptic networks. Crossed extension is context-dependent and not obligatory. This teaching case is not a diagnosis."]
 ],
 KZ:[
  ["Кеуде жарақатынан кейін алғашқы сағаттарда тонус пен тізе рефлекстері төмендесе, оны қалай түсіндіреміз?",
   "31 жастағы ер адам ауыр кеуде жарақатынан кейін тексерілуде. Аяқтары әлсіз, тізе рефлекстері төмен; артериялық қысым мен тамыр соғысы бөлек бағаланады.",
   "Жұлындық шокты ескеріп, неврологиялық деңгей, күш, сезімталдық пен рефлекстерді тіркеп, тексеруді қайталау.",
   "Тізе рефлексінің төмендеуін барлық белдік α-мотонейрондардың қайтымсыз жойылғанының дәлелі деу.",
   "Қысым мен тамыр соғысын тексермей, жұлындық шокты гемодинамикалық нейрогендік шокқа теңеу.",
   "Жұлындық шок — жұлын жарақатынан кейін сегменттік рефлекстердің ерте бәсеңдеуі. Нейрогендік шок — бөлек гемодинамикалық синдром. Бір әлсіз рефлекс жарақаттың толықтығын да, болжамын да анықтамайды."],
  ["МРТ кеуде ошағын көрсетті, бірақ белдік жуандау бұзылмаған. Тізе рефлексі неге төмен?",
   "Бірінші тәулікте оқу МРТ-сында белдік жұлынның жеке ошағы жоқ, бірақ тізе рефлекстері әлі төмен.",
   "Төмендеуші ықпал жоғалғаннан кейін төменгі сегменттік тізбектер уақытша бәсеңдеуі мүмкін екенін ескеріп, тексеруді қайталау.",
   "МРТ-да белдік сегменттер сақталса, барлық рефлекторлық доғалар міндетті түрде қалыпты жұмыс істейді деу.",
   "Зақымдалған кеуде омыртқасының нөмірін жұлын сегментінің нөмірімен теңестіру.",
   "Төменгі сегменттік тізбектер анатомиялық сақталса да уақытша бәсеңдеуі мүмкін. МРТ Ia-кірісті немесе α-мотонейрон қозғыштығын өлшемейді; омыртқа мен жұлын сегментінің деңгейлері әртүрлі."],
  ["Бірнеше аптадан кейін тізе рефлекстері күшейді, ал ерікті қозғалыс бұзылған. Неліктен?",
   "Қайталама тексеруде тізе рефлекстері оралып, күшейген, бірақ аяқтың айқын әлсіздігі сақталған.",
   "Гиперрефлексияны сегменттік қозғыштық пен төмендеуші бақылаудың өзгеруімен түсіндіріп, ерікті жолдар қалпына келді демеу.",
   "Күшейген рефлекстерді қыртыс-жұлын жолы толық қалпына келгенінің дәлелі деу.",
   "Гиперрефлексия міндетті түрде бұлшықет ұршығының Ia-афференттері жойылғандықтан болады деу.",
   "Жұлындық шок бәсеңдегенде рефлекстер оралып, күшеюі мүмкін, бірақ ерікті қозғалыс бұзылған күйде қалады. Уақыты әртүрлі; гиперрефлексия төмендеуші өткізгіштік қалпына келгенін дәлелдемейді."],
  ["Тізе рефлексі мен антагонистің реципроктық тежелуін қандай байланыстар туғызады?",
   "Қауіпсіз тексеруде тізе рефлексі балтырды қысқа жазады. Оқу сызбасында төртбасты бұлшықет ұршығы, Ia, α-мотонейрон және интернейрон көрсетілген.",
   "Ұршықтың Ia-кірісін бір орталық синапс арқылы аттас α-мотонейронға, антагонист тежелуін қосымша Ia-тежегіш интернейрон арқылы түсіндіру.",
   "Гольджи сіңір органының Ib-афферентін кәдімгі тізе рефлексінің тікелей рецепторы деу.",
   "γ-мотонейрондарды артқы түбіршектегі сезімтал талшықтар деу.",
   "Жылдам созылу ұршықтарды белсендіреді; Ia-афферент аттас α-мотонейронды моносинапстық қоздырады. Реципроктық тежелу интернейронды қамтиды. γ-эфференттер интрафузалдық талшықтардың сезімталдығын реттейді."],
  ["Созылу мен кернеу рецепторларын сызбаны тікелей өлшеу деп көрсетпей қалай ажыратамыз?",
   "Сызбада бұлшықет ұршығы мен Гольджи сіңір органы берілген. Пациентте Ia, Ib және γ разрядтары бөлек тіркелмеген.",
   "Ұршықтың Ia/II-афференттерін (ұзындық және өзгеруі), Гольджи органының Ib-афференттерін (кернеу), интрафузалдық γ-эфференттерді ажыратып, қорытындының жанама екенін айту.",
   "Ib-афференттер тек ұзындықты жеткізеді және тізе рефлексін тікелей бастайды деу.",
   "γ-талшықтар сезімтал, ал сіңірді бір соғу олардың разрядын тікелей өлшейді деу.",
   "Ұршық Ia/II арқылы созылуды, Гольджи органы Ib арқылы кернеуді кодтайды; γ-мотонейрондар — эфференттер. Бұл оқу жағдайында жеке разрядтар өлшенген жоқ."],
  ["Жұлын рефлекстері мен ерікті басқаруды ажырататын қорытынды қандай?",
   "Рефлекстердің ерте бәсеңдеуі мен кейінгі күшеюі тұрақты әлсіздікпен салыстырылды. Қорғаныштық тартып алу ауырсындыратын сынамасыз тек сызбада қаралды.",
   "Төменгі рефлекстер ерікті жолдар қалпына келмесе де сақталуы мүмкін; тартып алу полисинапстық, айқаспалы жазылу мүмкін, бірақ міндетті емес деп қорытындылау.",
   "Барлық жұлын рефлекстері моносинапстық, гиперрефлексия толық сауығуды дәлелдейді деу.",
   "Пациентке ауырсыну туғызуды ұсынып, айқаспалы жазылуды әр стимулда міндетті деу.",
   "Созылу рефлексінің Ia→α моносинапстық бөлігі бар, ал тартып алу полисинапстық желілерді қамтиды. Айқаспалы жазылу жағдайға тәуелді, міндетті емес. Оқу жағдайы диагноз қоймайды."]
 ]
};
const positions=[1,2,0,2,1,0] as const;
const labels:Record<Language,{opening:string;summary:string;right:string;wrong:string;notice:string}>={
 RU:{opening:"Синтетический случай: мужчина 31 года после грудной травмы. Сравните раннее угнетение и позднее усиление рефлексов; отличайте спинальный шок от нейрогенного.",summary:"Изменение сегментарных рефлексов не доказывает восстановление произвольного контроля. Ia→α — моносинаптический компонент; реципрокное торможение и защитное отдёргивание включают интернейроны. Это учебный вывод, не диагноз.",right:"Решение соответствует данным. Следующие сведения заданы сценарием, а не вызваны нажатием кнопки.",wrong:"Выбор не подтверждён. Следующие сведения заданы сценарием, а не вызваны выбранным действием.",notice:"Последовательность данных учебного случая не зависит от выбранного ответа."},
 EN:{opening:"Synthetic case: a 31-year-old man after thoracic trauma. Compare early reflex depression with later hyperreflexia; distinguish spinal from neurogenic shock.",summary:"Changing segmental reflexes do not prove restored voluntary control. Ia→α is a monosynaptic component; reciprocal inhibition and withdrawal use interneurons. This is a teaching interpretation, not a diagnosis.",right:"The choice fits the evidence. The next findings are predefined, not caused by clicking.",wrong:"This choice is unsupported. The next findings are predefined, not caused by the selected action.",notice:"The teaching-case data sequence does not depend on the selected answer."},
 KZ:{opening:"Оқу жағдайы: кеуде жарақатынан кейінгі 31 жастағы ер адам. Рефлекстердің ерте бәсеңдеуі мен кейінгі күшеюін салыстырып, жұлындық және нейрогендік шокты ажыратыңыз.",summary:"Сегменттік рефлекстердің өзгеруі ерікті бақылаудың қалпына келуін дәлелдемейді. Ia→α — моносинапстық бөлік; реципроктық тежелу мен тартып алу интернейрондарды қамтиды. Бұл диагноз емес, оқу қорытындысы.",right:"Шешім деректерге сәйкес. Келесі мәліметтер батырманы басудан емес, сценарийден алынған.",wrong:"Таңдау расталмайды. Келесі мәліметтер таңдалған әрекеттен туындамайды, сценарийде берілген.",notice:"Оқу жағдайының деректері таңдалған жауапқа тәуелді емес."}
};
export function reviewModuleNineVirtualPatient(base:VirtualPatientScenario,language:Language):VirtualPatientScenario {
 if(base.moduleId!==9 || base.stages.length!==6 || steps[language].length!==6)
  throw new Error("Module 9 virtual patient requires six stages");
 const copy=labels[language];
 return {...base,opening:copy.opening,mechanismSummary:copy.summary,
  stages:base.stages.map((stage,index)=>{
   const [task,observation,correct,wrongA,wrongB,explanation]=steps[language][index];
   const choices=[correct,wrongA,wrongB];
   const correctOption=positions[index];
   const order=correctOption===0?[0,1,2]:correctOption===1?[1,0,2]:[1,2,0];
   return {...stage,situation:copy.notice,task,newData:observation,
    mentorPrompt:explanation,mechanism:explanation,
    options:order.map((which,position)=>({
     id:`vp-9-stage-${index+1}-choice-${position+1}`,
     text:choices[which],response:which===0?copy.right:copy.wrong,feedback:explanation
    })) as VirtualPatientStage["options"],correctOption};
  })};
}
