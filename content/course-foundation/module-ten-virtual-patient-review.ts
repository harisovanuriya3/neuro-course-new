import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Synthetic module 10 case. Sources actually read in Library:
// Guyton & Hall 13e PDF 718–720; Ganong 23e PDF 249–250, 579;
// C. L. Ghai Practical Physiology 8e PDF 256–257 (BAEP), 301–303 (reflexes).
// This is NOT a diagnostic protocol. No corneal/gag stimulation or
// provocative blood-pressure manoeuvre is performed.
type Step=readonly [task:string,observation:string,correct:string,wrongA:string,wrongB:string,explanation:string];
const steps:Record<Language,readonly Step[]>={
 RU:[
  ["У пациентки меняется реакция на обращение. Как исследовать проблему без поспешной локализации?",
   "Синтетический случай: женщина 47 лет, реакция на голос непостоянна. Клиническая команда отдельно оценивает дыхание, оксигенацию, давление, зрачки и двигательные ответы.",
   "Сопоставить реакцию на голос с дыханием, оксигенацией, давлением и возможными лекарственными или метаболическими влияниями.",
   "Считать ответ на звук доказательством сохранного сознания.",
   "Считать колебания ответа доказательством поражения одного ядра ретикулярной формации.",
   "Бодрствование обеспечивают распределённые стволовые, гипоталамические, таламические и корковые сети. Изменение реактивности неспецифично; одна проба не определяет локализацию."],
  ["При освещении каждого глаза сужаются оба зрачка. Какой вывод допустим?",
   "Врачебное наблюдение: прямая и содружественная световые реакции сохранены с обеих сторон; движения глаз и сознание оцениваются отдельно.",
   "Отметить сохранность исследуемых звеньев II→претектальная область→оба ядра Эдингера—Вестфаля→III; не выводить из этого сохранность сознания.",
   "Считать сохранную реакцию зрачков доказательством целостности всего ствола мозга.",
   "Приписать сужение зрачков VII нерву.",
   "Световой рефлекс включает сетчатку, II нерв, претектальные связи, двусторонние парасимпатические ядра III нерва и ресничный узел. Он не является тестом сознания."],
  ["На схеме показано двустороннее мигание после раздражения одной роговицы. Как устроена дуга?",
   "Только учебная схема ранее описанного врачом рефлекса; студент не касается глаза. Изображены вход от роговицы и сокращение круговых мышц обоих глаз.",
   "Назвать V1 афферентом, VII эфферентом двустороннего мигания и ограничить вывод уровнем рефлекторной дуги.",
   "Назвать II нерв афферентом корнеального рефлекса.",
   "Предложить студенту самостоятельно коснуться роговицы пациента.",
   "Корнеальный рефлекс: V1→стволовые интернейронные связи→оба VII. Двустороннее мигание не доказывает сохранность сознания; реальную пробу проводит только обученный специалист по показаниям."],
  ["Сохранены ранние слуховые стволовые потенциалы. Что они подтверждают?",
   "В условной записи ранние слуховые ответы присутствуют, но реакция на речь непостоянна. Артефакты и условия записи рассматривают отдельно.",
   "Сделать ограниченный вывод о проведении по исследуемым ранним слуховым путям; бодрствование оценивать независимо.",
   "Считать ранние потенциалы доказательством осознанного понимания речи.",
   "Считать отсутствие реакции на голос доказательством полной блокады слуховых путей.",
   "Ранние слуховые вызванные потенциалы отражают определённые этапы проведения, а не сознательное восприятие. Нужны контроль качества записи и клинический контекст."],
  ["В модели АД снизилось с 125/80 до 100/65 мм рт. ст., ЧСС выросла с 74 до 92/мин. Каков быстрый барорефлекс?",
   "Это заранее заданный числовой график, не провокационная проба. Растяжение каротидного синуса и дуги аорты уменьшается при прочих равных условиях.",
   "Ожидать меньший вход IX/X в NTS, ослабление CVLM-торможения RVLM, усиление симпатического и уменьшение кардиовагусного влияния.",
   "Ожидать роста барорецепторной импульсации и вагусного торможения при падении давления.",
   "Объявить тахикардию доказательством повреждения определённого ядра продолговатого мозга.",
   "При падении давления барорецепторный вход в NTS уменьшается, торможение RVLM через CVLM ослабевает, симпатический выход обычно растёт, а кардиовагусный снижается. Пульс сам по себе не локализует очаг."],
  ["Какой итог объединяет рефлексы, сенсорные ответы и бодрствование?",
   "Колебания реакции на обращение сопоставлены с сохранными световыми реакциями, схемой корнеального рефлекса, ранними слуховыми ответами и отдельной барорефлекторной моделью. Причина неизвестна.",
   "Разделить функции отдельных рефлекторных дуг, автономную обратную связь и распределённые сети бодрствования; указать ограничения.",
   "Назвать сохранные зрачки и слуховые ответы доказательством нормального сознания.",
   "Поставить диагноз поражения одного стволового ядра по этой модели.",
   "Сохранность отдельных дуг II/III, V1/VII и ранних слуховых путей не устанавливает сознание. Бодрствование зависит от взаимодействия ствола, таламуса, гипоталамуса и коры; это учебный, а не диагностический вывод."]
 ],
 EN:[
  ["Responses to voice fluctuate. What should be assessed before localizing a brainstem lesion?",
   "Synthetic case: a 47-year-old woman responds inconsistently to voice. A clinical team records breathing, oxygenation, blood pressure, pupils and motor responses separately.",
   "Compare responsiveness with breathing, oxygenation, pressure, medication and metabolic factors.",
   "Treat a response to sound as proof of normal awareness.",
   "Treat fluctuating responsiveness as proof of damage to one reticular nucleus.",
   "Arousal depends on distributed brainstem, hypothalamic, thalamic and cortical networks. Reduced responsiveness is nonspecific and one finding cannot localize a lesion."],
  ["Both pupils constrict when either eye is illuminated. What does this establish?",
   "Clinician-recorded direct and consensual light reflexes are present bilaterally. Eye movements and consciousness are assessed separately.",
   "Identify functioning tested components of CN II→pretectum→bilateral Edinger–Westphal nuclei→CN III; do not infer awareness.",
   "Assume intact pupils prove that the entire brainstem is intact.",
   "Attribute pupillary constriction to cranial nerve VII.",
   "The light reflex uses retina, CN II, pretectal projections, bilateral parasympathetic CN III nuclei and ciliary ganglia. It is not a test of consciousness."],
  ["A diagram shows bilateral blinking after stimulation of one cornea. Which arc is involved?",
   "This is a teaching diagram of a previously documented reflex; no student touches an eye. Corneal sensory input and bilateral eyelid closure are shown.",
   "Identify V1 afferents and bilateral VII efferents, limiting the inference to the reflex arc.",
   "Identify CN II as the corneal-reflex afferent.",
   "Ask a student to touch the patient's cornea to verify the model.",
   "Corneal reflex: V1→brainstem interneurons→bilateral VII. Blinking cannot establish consciousness; actual corneal testing is for trained clinicians when indicated."],
  ["Early auditory brainstem responses are preserved. What do they establish?",
   "Early auditory components are present in the synthetic recording, but response to speech remains inconsistent. Artifacts and recording conditions are checked separately.",
   "Infer conduction in the tested early auditory pathways, and assess arousal independently.",
   "Treat early responses as proof of conscious speech comprehension.",
   "Treat lack of response to voice as proof of complete auditory-pathway failure.",
   "Early auditory evoked responses probe selected conduction stages, not conscious perception. Recording quality and clinical context limit interpretation."],
  ["In a model BP falls from 125/80 to 100/65 mmHg while HR rises from 74 to 92/min. What rapid baroreflex is expected?",
   "This is a predefined numerical chart, not a provocative test. Carotid-sinus and aortic-arch stretch decreases, other factors equal.",
   "Expect less IX/X input to NTS, reduced CVLM inhibition of RVLM, increased sympathetic and reduced cardiac vagal activity.",
   "Expect increased baroreceptor firing and vagal cardiac inhibition as BP falls.",
   "Treat tachycardia as proof of damage to one medullary nucleus.",
   "Falling pressure reduces baroreceptor input to NTS, weakens CVLM-mediated inhibition of RVLM and generally increases sympathetic while reducing cardiac vagal output. Pulse alone does not localize a lesion."],
  ["How should reflexes, sensory responses and arousal be integrated?",
   "Variable response to voice is compared with preserved pupil reflexes, a corneal-reflex diagram, early auditory responses and a separate baroreflex model. The cause remains unknown.",
   "Distinguish specific reflex arcs, autonomic feedback and distributed arousal networks; state the limits of each finding.",
   "Claim normal awareness because pupil and auditory responses are present.",
   "Diagnose injury to a specific brainstem nucleus from this model.",
   "Intact selected II/III, V1/VII and early auditory pathways cannot establish awareness. Arousal involves brainstem, thalamus, hypothalamus and cortex; this is a teaching inference, not a diagnosis."]
 ],
 KZ:[
  ["Дауысқа жауап тұрақсыз. Ми бағанындағы зақымды болжаудан бұрын нені салыстыру қажет?",
   "Оқу жағдайы: 47 жастағы әйел дауысқа әртүрлі жауап береді. Клиникалық топ тынысты, оттегімен қанығуды, қысымды, қарашықтарды және қозғалысты бөлек бақылайды.",
   "Жауапты тыныспен, оттегімен қанығумен, қысыммен, дәрілік және метаболизмдік факторлармен салыстыру.",
   "Дыбысқа жауапты сананың қалыпты екенінің дәлелі деу.",
   "Жауаптың ауытқуын бір ретикулярлық ядроның зақымдануының дәлелі деу.",
   "Сергектік ми бағаны, гипоталамус, таламус және қыртыстың таралған желілеріне тәуелді. Жауаптың төмендеуі арнайы белгі емес; бір нәтиже ошақты анықтамайды."],
  ["Әр көзге жарық түсіргенде екі қарашық та тарылса, қандай қорытынды дұрыс?",
   "Дәрігерлік бақылауда тікелей және екінші көздің қатар жүретін жарық реакциялары екі жақта сақталған. Көз қозғалысы мен сана бөлек бағаланады.",
   "II жүйке→претекталдық аймақ→екі Эдингер–Вестфаль ядросы→III жүйке доғасының зерттелген бөліктері қызмет ететінін айтып, сананы дәлелдемеу.",
   "Қарашық реакциясы сақталса, бүкіл ми бағаны бүтін деу.",
   "Қарашық тарылуын тек VII жүйкемен түсіндіру.",
   "Жарық рефлексі торқабық, II жүйке, претекталдық байланыстар, III жүйкенің екі жақты парасимпатикалық ядролары және кірпікшелі түйін арқылы өтеді. Бұл сананы бағалайтын сынама емес."],
  ["Сызбада бір қасаң қабық тітіркенгенде екі көздің жыпылықтауы берілген. Қандай доға қатысады?",
   "Бұл бұрын дәрігер тіркеген рефлекстің оқу сызбасы; студент көзге тимейді. Қасаң қабықтан сезімтал кіріс пен екі көздің жұмылуы көрсетілген.",
   "V1 афферентін және екі жақты VII эфферентін атап, қорытындыны рефлекстік доғамен шектеу.",
   "Қасаң қабық рефлексінің афференті II жүйке деу.",
   "Студентке пациенттің қасаң қабығына қол тигізуді ұсыну.",
   "Қасаң қабық рефлексі: V1→ми бағанының интернейрондары→екі жақты VII. Жыпылықтау сананы дәлелдемейді; нақты сынаманы тек дайындалған маман көрсетілім бойынша орындайды."],
  ["Ерте есту ми бағандық жауаптары сақталған. Бұл нені көрсетеді?",
   "Оқу жазбасында ерте есту компоненттері бар, бірақ сөйлеуге жауап тұрақсыз. Артефакт пен тіркеу шарттары бөлек тексеріледі.",
   "Зерттелген ерте есту жолдарының өткізгіштігі туралы шектеулі қорытынды жасап, сергектікті бөлек бағалау.",
   "Ерте потенциалдар сөйлеуді саналы түсінуді дәлелдейді деу.",
   "Дауысқа жауап болмауы есту жолдары толық бұзылғанын дәлелдейді деу.",
   "Ерте есту потенциалдары өткізудің белгілі кезеңдерін көрсетеді, саналы қабылдауды емес. Тіркеу сапасы мен клиникалық жағдай ескеріледі."],
  ["Оқу моделінде қысым 125/80-нен 100/65 мм сын.бағ.-на түсіп, ЖСЖ 74-тен 92/мин-ге өсті. Қандай барорефлекс күтіледі?",
   "Бұл қысымды әдейі өзгертетін сынама емес, алдын ала берілген график. Басқа факторлар тұрақты болса, каротид синусы мен қолқа доғасының созылуы азаяды.",
   "IX/X арқылы NTS-ке кіріс азайып, CVLM-нің RVLM-ді тежеуі әлсірейтінін, симпатикалық ықпал артып, жүректік вагустық ықпал азаятынын болжау.",
   "Қысым төмендегенде барорецепторлық импульсация мен вагустық тежелу артады деу.",
   "ЖСЖ өсуін сопақша мидың бір ядросы зақымдалғанының дәлелі деу.",
   "Қысым төмендегенде NTS-ке кіріс азаяды, CVLM арқылы RVLM тежелуі әлсірейді; симпатикалық шығыс әдетте артып, жүректік вагустық ықпал азаяды. ЖСЖ ошақты жеке анықтамайды."],
  ["Рефлекстерді, сенсорлық жауаптарды және сергектікті қалай біріктірген дұрыс?",
   "Дауысқа жауап ауытқиды; қарашық реакциялары, қасаң қабық рефлексінің сызбасы, ерте есту жауаптары және бөлек барорефлекс моделі берілген. Себеп белгісіз.",
   "Жекелеген рефлекстік доғаларды, автономдық кері байланысты және сергектіктің таралған желілерін ажыратып, шектеулерін көрсету.",
   "Қарашық пен есту жауаптары сақталғандықтан сана қалыпты деу.",
   "Осы модель бойынша ми бағанының бір ядросы зақымдалған деп диагноз қою.",
   "II/III, V1/VII доғалары мен ерте есту жолдарының сақталуы сананы анықтамайды. Сергектік ми бағаны, таламус, гипоталамус және қыртысқа тәуелді; бұл диагноз емес, оқу қорытындысы."]
 ]
};
const positions=[2,0,1,2,0,1] as const;
const copy:Record<Language,{opening:string;summary:string;right:string;wrong:string;notice:string}>={
 RU:{opening:"Синтетический случай: 47-летняя пациентка с колебаниями реакции на голос. Все наблюдения заданы заранее; студент не проводит обследование.",summary:"Отдельные дуги II/III и V1/VII и ранние слуховые ответы не доказывают сознание. Барорефлекс IX/X→NTS→CVLM→RVLM — отдельная автономная обратная связь; бодрствование поддерживают распределённые стволовые, гипоталамические, таламические и корковые сети.",right:"Выбор согласуется с данными; следующие сведения заданы сценарием, а не вызваны нажатием.",wrong:"Вывод не следует из данных; следующие сведения заданы сценарием, а не вызваны нажатием.",notice:"Учебный сценарий: этапы не являются инструкцией к обследованию или лечению."},
 EN:{opening:"Synthetic case: a 47-year-old woman with fluctuating response to voice. All observations are predefined; no student examination is performed.",summary:"Selected II/III and V1/VII arcs and early auditory responses do not establish consciousness. The IX/X→NTS→CVLM→RVLM baroreflex is separate autonomic feedback; arousal involves distributed brainstem, hypothalamic, thalamic and cortical networks.",right:"This choice fits the evidence; subsequent findings are predefined, not caused by clicking.",wrong:"This inference is unsupported; subsequent findings are predefined, not caused by clicking.",notice:"Teaching scenario: stages are not instructions for examination or treatment."},
 KZ:{opening:"Синтетикалық оқу жағдайы: 47 жастағы әйелдің дауысқа жауабы ауытқиды. Барлық бақылау алдын ала берілген; студент тексеру жүргізбейді.",summary:"II/III және V1/VII доғалары мен ерте есту жауаптары сананы дәлелдемейді. IX/X→NTS→CVLM→RVLM барорефлексі — бөлек автономдық кері байланыс; сергектік ми бағаны, гипоталамус, таламус және қыртыс желілеріне тәуелді.",right:"Таңдау деректерге сәйкес; келесі мәліметтер алдын ала берілген, батырманың салдары емес.",wrong:"Қорытынды расталмайды; келесі мәліметтер алдын ала берілген, батырманың салдары емес.",notice:"Оқу сценарийі: кезеңдер тексеру не емдеу нұсқаулығы емес."}
};
export function reviewModuleTenVirtualPatient(base:VirtualPatientScenario,language:Language):VirtualPatientScenario {
 if(base.moduleId!==10 || base.stages.length!==6 || steps[language].length!==6) throw new Error("Module 10 virtual patient requires six stages");
 const c=copy[language];
 return {...base,opening:c.opening,mechanismSummary:c.summary,stages:base.stages.map((stage,index)=>{
  const [task,observation,correct,wrongA,wrongB,explanation]=steps[language][index];
  const choices=[correct,wrongA,wrongB],correctOption=positions[index];
  const order=correctOption===0?[0,1,2]:correctOption===1?[1,0,2]:[1,2,0];
  return {...stage,situation:c.notice,task,newData:observation,mentorPrompt:explanation,mechanism:explanation,
   options:order.map((which,position)=>({id:`vp-10-stage-${index+1}-choice-${position+1}`,text:choices[which],response:which===0?c.right:c.wrong,feedback:explanation})) as VirtualPatientStage["options"],
   correctOption};
 })};
}
