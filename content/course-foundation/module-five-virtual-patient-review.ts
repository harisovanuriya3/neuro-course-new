import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 5 is a SYNTHETIC neuromuscular-transmission experiment, not a patient.
// Scientific references: Ganong 23e, ch. 6 (PDF 127–130); Guyton & Hall
// 13e, ch. 46 (PDF 556–558); Ghai 8e, experiment 4-9 (PDF 353–354).
// Stage observations are predefined; a click does not perform an experiment.
type L = Record<Language, string>;
const l = (RU:string, EN:string, KZ:string):L => ({RU,EN,KZ});
type Stage = {situation:L; data:L; task:L; wrong:[L,L]; explanation:L};
const stages: [Stage,Stage,Stage,Stage,Stage,Stage] = [
 {
  situation:l("Модель нервно-мышечного соединения: после стимуляции нерва ответ мышцы уменьшается.",
    "Neuromuscular-junction model: the muscle response declines after nerve stimulation.",
    "Жүйке-бұлшықет түйісінің моделі: жүйкені қоздырғаннан кейін бұлшықет жауабы төмендейді."),
  data:l("Потенциал действия зарегистрирован в двигательном аксоне, но запись непосредственно из пресинаптического окончания пока отсутствует.",
    "An action potential is recorded in the motor axon, but there is no direct terminal recording yet.",
    "Әрекет потенциалы қозғалтқыш аксонда тіркелді, бірақ пресинапстық ұштан тікелей жазба әзірге жоқ."),
  task:l("Какой дополнительный контроль нужен до вывода о нарушении выделения медиатора?",
    "Which additional control is needed before attributing the deficit to transmitter release?",
    "Бұзылысты медиатордың бөлінуімен байланыстырмас бұрын қандай қосымша бақылау қажет?"),
  wrong:[
   l("Считать импульс в проксимальном аксоне доказательством его прихода в окончание.",
     "Treat a proximal axonal spike as proof that the spike reached the terminal.",
     "Аксонның проксималдық бөлігіндегі импульсті оның ұшқа жеткенінің дәлелі деп санау."),
   l("Сразу поставить диагноз болезни нервно-мышечного соединения по одному сокращению.",
     "Diagnose a neuromuscular-junction disease from a single contraction.",
     "Бір жиырылуға қарап жүйке-бұлшықет түйісінің ауруын бірден анықтау.")
  ],
  explanation:l("Регистрация в аксоне не исключает нарушения проведения дистальнее электрода. Чтобы локализовать сбой, отдельно проверяют приход импульса в окончание и постсинаптический ответ.",
    "Recording an axonal spike does not exclude failure distal to the electrode. Terminal invasion and postsynaptic response must be assessed separately.",
    "Аксондағы импульсті тіркеу электродтан дистальді өткізудің бұзылуын жоққа шығармайды. Ұшқа импульстің жетуі мен постсинапстық жауап бөлек тексеріледі.")
 },
 {
  situation:l("В компьютерном опыте повторяют стимуляцию при одинаковой температуре и силе стимула.",
    "The computer experiment repeats stimulation with temperature and stimulus strength held constant.",
    "Компьютерлік тәжірибеде температура мен стимул күші тұрақты ұсталып, қоздыру қайталанады."),
  data:l("Модель задаёт уменьшение потенциала концевой пластинки; при прямой стимуляции мышцы сокращение сохраняется.",
    "The model specifies a smaller end-plate potential; direct muscle stimulation still evokes contraction.",
    "Модельде соңғы пластинка потенциалы азаяды; бұлшықетті тікелей қоздырғанда жиырылу сақталады."),
  task:l("Как сопоставить постсинаптический электрический ответ и сокращение мышцы?",
    "How should the end-plate electrical response and muscle contraction be compared?",
    "Соңғы пластинканың электрлік жауабы мен бұлшықет жиырылуын қалай салыстыру керек?"),
  wrong:[
   l("Приравнять величину сокращения к амплитуде потенциала концевой пластинки.",
     "Equate contraction size directly with end-plate-potential amplitude.",
     "Жиырылу шамасын соңғы пластинка потенциалының амплитудасына тікелей теңестіру."),
   l("Объявить сохранённую прямую стимуляцию доказательством нормального выделения ацетилхолина.",
     "Treat preserved direct stimulation as proof of normal acetylcholine release.",
     "Тікелей қоздырудағы жауаптың сақталуын ацетилхолиннің қалыпты бөлінуінің дәлелі деу.")
  ],
  explanation:l("Потенциал концевой пластинки — градуальный электрический ответ; сокращение зависит также от порога мышечного ПД и возбуждения–сокращения. Прямая стимуляция обходит нервно-мышечную передачу.",
    "The end-plate potential is graded; contraction also depends on muscle action-potential threshold and excitation–contraction coupling. Direct muscle stimulation bypasses the junction.",
    "Соңғы пластинка потенциалы — градуалды электрлік жауап; жиырылу бұлшықет ӘП табалдырығына және қозу–жиырылу байланысына да тәуелді. Тікелей қоздыру түйісті айналып өтеді.")
 },
 {
  situation:l("Отдельно изменяют пресинаптический вход Ca²⁺ при сохранённом приходе импульса в окончание.",
    "Presynaptic Ca²⁺ entry is selectively changed while terminal spike arrival is preserved.",
    "Импульс ұшқа жеткен күйде пресинапстық Ca²⁺ енуі жеке өзгертіледі."),
  data:l("В модели блокада Ca²⁺-каналов уменьшает вызванный потенциал концевой пластинки; спонтанные миниатюрные ответы не обязаны исчезнуть.",
    "In the model, Ca²⁺-channel blockade reduces the evoked end-plate potential; spontaneous miniature events need not disappear.",
    "Модельде Ca²⁺ арналарының бөгелуі шақырылған соңғы пластинка потенциалын азайтады; өздігінен болатын миниатюралық жауаптар міндетті түрде жоғалмайды."),
  task:l("Какое звено передачи зависит от локального входа Ca²⁺?",
    "Which step of transmission depends on local Ca²⁺ entry?",
    "Берілудің қай кезеңі Ca²⁺ жергілікті енуіне тәуелді?"),
  wrong:[
   l("Считать Ca²⁺-каналы источником восходящей фазы ПД на всём аксоне.",
     "Assume Ca²⁺ channels generate the upstroke throughout the motor axon.",
     "Ca²⁺ арналары бүкіл қозғалтқыш аксондағы ӘП көтерілу фазасын тудырады деу."),
   l("Предсказать усиление экзоцитоза при уменьшении входа Ca²⁺.",
     "Predict greater exocytosis when Ca²⁺ entry is reduced.",
     "Ca²⁺ енуі азайғанда экзоцитоз күшейеді деп болжау.")
  ],
  explanation:l("Локальный вход Ca²⁺ у активной зоны повышает вероятность слияния везикул и вызванного квантового выделения. Это не равнозначно прекращению проведения импульса по аксону.",
    "Local Ca²⁺ entry at the active zone increases vesicle-fusion probability and evoked quantal release; it is distinct from axonal spike conduction.",
    "Белсенді аймақтағы Ca²⁺ жергілікті енуі везикулалардың қосылу ықтималдығын және шақырылған кванттық бөлінуді арттырады; бұл аксон бойымен импульс өткізуден бөлек.")
 },
 {
  situation:l("Сравниваются две разные компьютерные манипуляции: блок входа Ca²⁺ и блок никотиновых ацетилхолиновых рецепторов.",
    "Two separate computer manipulations are compared: reduced Ca²⁺ entry and nicotinic acetylcholine-receptor blockade.",
    "Екі бөлек компьютерлік әсер салыстырылады: Ca²⁺ енуін азайту және никотиндік ацетилхолин рецепторларын бөгеу."),
  data:l("Обе манипуляции уменьшают вызванный ответ, но действуют на разные стороны синапса.",
    "Both manipulations reduce the evoked response but act on opposite sides of the synapse.",
    "Екі әсер де шақырылған жауапты азайтады, бірақ синапстың әртүрлі жағында әрекет етеді."),
  task:l("Как отличить пресинаптический дефект от постсинаптического?",
    "How can a presynaptic defect be distinguished from a postsynaptic one?",
    "Пресинапстық ақауды постсинапстық ақаудан қалай ажыратуға болады?"),
  wrong:[
   l("Считать одинаковое уменьшение сокращения доказательством одинакового механизма.",
     "Assume an equal reduction in contraction proves the same mechanism.",
     "Жиырылудың бірдей азаюы бірдей механизмді дәлелдейді деу."),
   l("Объявить блок никотиновых рецепторов прямым блоком аксонных Na⁺-каналов.",
     "Call nicotinic-receptor blockade a direct block of axonal Na⁺ channels.",
     "Никотиндік рецепторлардың бөгелуін аксондағы Na⁺ арналарының тікелей бөгелуі деу.")
  ],
  explanation:l("Пресинаптическая манипуляция меняет высвобождение медиатора, постсинаптическая — чувствительность концевой пластинки. По одной амплитуде сокращения локализация недостоверна; нужны дополнительные измерения.",
    "Presynaptic manipulation changes release, while postsynaptic blockade changes end-plate responsiveness. Contraction amplitude alone cannot localize the defect.",
    "Пресинапстық әсер медиатор бөлінуін, постсинапстық бөгелу соңғы пластинканың сезімталдығын өзгертеді. Тек жиырылу амплитудасы ақауды анық локализацияламайды.")
 },
 {
  situation:l("Анализируется локализация нарушения передачи в учебном эксперименте.",
    "The teaching experiment now considers localization of the transmission deficit.",
    "Оқу тәжірибесінде берілу бұзылысының орналасуы талданады."),
  data:l("Ранее показаны уменьшенный потенциал концевой пластинки и сохранённое сокращение при прямой стимуляции мышцы. Количественных данных о квантовом выделении и реакции на локальное введение ацетилхолина нет.",
    "Earlier stages showed a reduced end-plate potential and preserved contraction with direct muscle stimulation. Quantal release and the response to locally applied acetylcholine have not been quantified.",
    "Алдыңғы кезеңдерде соңғы пластинка потенциалының азайғаны және бұлшықетті тікелей қоздырғанда жиырылудың сақталғаны көрсетілді. Кванттық бөліну мен жергілікті енгізілген ацетилхолинге жауап сандық түрде бағаланбаған."),
  task:l("Какие дополнительные измерения нужны, чтобы различить снижение выделения медиатора и снижение чувствительности концевой пластинки?",
    "Which additional measurements would distinguish reduced transmitter release from reduced end-plate responsiveness?",
    "Медиатор бөлінуінің азаюын соңғы пластинка сезімталдығының төмендеуінен ажырату үшін қандай қосымша өлшеулер қажет?"),
  wrong:[
   l("Определить точное число выделенных везикул по амплитуде сокращения.",
     "Determine the exact vesicle count from contraction amplitude.",
     "Жиырылу амплитудасынан бөлінген везикулалардың дәл санын табу."),
   l("Считать снижение мышечного ответа доказательством исключительно постсинаптического дефекта.",
     "Treat a reduced muscle response as proof of an exclusively postsynaptic defect.",
     "Бұлшықет жауабының азаюын тек постсинапстық ақаудың дәлелі деу.")
  ],
  explanation:l("Уменьшенный вызванный потенциал концевой пластинки возможен как при меньшем выделении ацетилхолина, так и при ослаблении постсинаптического ответа. Сопоставляют миниатюрные и вызванные ответы, а также реакцию на локальный ацетилхолин; при оценке квантового содержания учитывают нелинейную суммацию. Сохранённая прямая стимуляция мышцы сама по себе не разделяет эти причины.",
    "A smaller evoked end-plate potential may reflect reduced acetylcholine release or reduced postsynaptic responsiveness. Compare miniature and evoked responses with responses to locally applied acetylcholine; account for nonlinear summation when estimating quantal content. Preserved contraction on direct muscle stimulation alone does not distinguish these mechanisms.",
    "Шақырылған соңғы пластинка потенциалының азаюы ацетилхолин бөлінуінің төмендеуінен де, постсинапстық жауаптың әлсіреуінен де болуы мүмкін. Миниатюралық және шақырылған жауаптарды жергілікті енгізілген ацетилхолинге жауаппен салыстырады; кванттық құрамды бағалағанда сызықтық емес қосылуды ескереді. Бұлшықетті тікелей қоздырғанда жиырылудың сақталуы бұл себептерді өздігінен ажыратпайды.")
 },
 {
  situation:l("Завершение компьютерной модели нервно-мышечной передачи.",
    "The neuromuscular-transmission computer model is complete.",
    "Жүйке-бұлшықет берілісінің компьютерлік моделі аяқталды."),
  data:l("Показаны только заранее заданные качественные наблюдения; модель не вычисляет вероятность выделения, число квантов или клинический диагноз.",
    "Only predefined qualitative observations are shown; the model does not calculate release probability, quantal content or a clinical diagnosis.",
    "Тек алдын ала берілген сапалық бақылаулар көрсетілген; модель бөліну ықтималдығын, кванттар санын немесе клиникалық диагнозды есептемейді."),
  task:l("Как сформулировать итоговую причинную цепочку и ограничения модели?",
    "How should the causal sequence and the model's limitations be summarized?",
    "Себеп-салдар тізбегі мен модель шектеулерін қалай қорытындылау керек?"),
  wrong:[
   l("Сделать вывод, что каждый пресинаптический импульс обязательно вызывает мышечный ПД.",
     "Conclude that every presynaptic spike necessarily triggers a muscle action potential.",
     "Әр пресинапстық импульс міндетті түрде бұлшықет ӘП туғызады деу."),
   l("Назвать шесть учебных этапов подтверждённым диагнозом реального пациента.",
     "Call the six teaching stages a confirmed diagnosis in a real patient.",
     "Алты оқу кезеңін нақты пациенттің расталған диагнозы деу.")
  ],
  explanation:l("ПД в окончании → вход Ca²⁺ → вероятностный экзоцитоз → активация рецепторов → потенциал концевой пластинки → при достижении порога мышечный ПД. Это концептуальная последовательность, не диагноз.",
    "Terminal spike → Ca²⁺ entry → probabilistic exocytosis → receptor activation → end-plate potential → muscle spike if threshold is reached. This is a conceptual sequence, not a diagnosis.",
    "Ұштағы ӘП → Ca²⁺ енуі → ықтималдық экзоцитоз → рецептор белсенуі → соңғы пластинка потенциалы → табалдырыққа жетсе бұлшықет ӘП. Бұл диагноз емес, тұжырымдамалық тізбек.")
 }
];
const correctChoices: Record<Language,[string,string,string,string,string,string]> = {
 RU:[
  "Проверить приход импульса непосредственно в окончание и сопоставить с ответом концевой пластинки.",
  "Раздельно записать концевой потенциал и мышечное сокращение; прямую стимуляцию мышцы использовать как контроль.",
  "При сохранённом импульсе в окончании сравнить вызванное выделение при изменении входа Ca²⁺.",
  "Отдельно оценить выделение медиатора и ответ рецепторов при двух воздействиях.",
  "Сравнить миниатюрные и вызванные концевые потенциалы с ответом на локальный ацетилхолин; не выводить точную локализацию из одного сокращения.",
  "Объяснить цепь ПД–Ca²⁺–экзоцитоз–рецептор–концевой потенциал и границы модели."
 ],
 EN:[
  "Verify spike arrival directly at the terminal and compare it with the end-plate response.",
  "Record end-plate voltage and contraction separately; use direct muscle stimulation as a control.",
  "With terminal spike arrival preserved, compare evoked release when Ca²⁺ entry changes.",
  "Assess transmitter release and receptor responsiveness independently under both interventions.",
  "Compare miniature and evoked end-plate potentials with the response to locally applied acetylcholine; do not infer exact localization from contraction alone.",
  "Explain spike–Ca²⁺–exocytosis–receptor–end-plate potential and the model limitations."
 ],
 KZ:[
  "Импульстің ұшқа жетуін тікелей тексеріп, соңғы пластинка жауабымен салыстыру.",
  "Соңғы пластинка потенциалы мен жиырылуды бөлек жазып, бұлшықетті тікелей қоздыруды бақылау ету.",
  "Ұштағы импульс сақталғанда Ca²⁺ енуін өзгертіп, шақырылған бөлінуді салыстыру.",
  "Екі әсерде медиатор бөлінуі мен рецептор жауабын бөлек бағалау.",
  "Миниатюралық және шақырылған соңғы пластинка потенциалдарын жергілікті ацетилхолинге жауаппен салыстыру; тек жиырылуға қарап нақты локализация жасамау.",
  "ӘП–Ca²⁺–экзоцитоз–рецептор–соңғы пластинка потенциалы тізбегін және модель шектеулерін түсіндіру."
 ]
};
const label = l("Компьютерная модель (не пациент)","Computer model (not a patient)","Компьютерлік модель (пациент емес)");
const profile = l("Учебная модель нервно-мышечного соединения, без данных реального пациента.",
 "Teaching model of a neuromuscular junction; no real-patient data.",
 "Жүйке-бұлшықет түйісінің оқу моделі; нақты пациент деректері жоқ.");
const note = l("Следующие данные заданы заранее и не зависят от выбора. Выбор проверяет объяснение механизма, а не запускает физиологический опыт.",
 "The next observations are predefined, not caused by your selection. Choices test reasoning rather than run a physiological experiment.",
 "Келесі деректер алдын ала берілген, таңдауға тәуелді емес. Таңдау физиологиялық тәжірибені іске қоспайды, тек түсіндіруді тексереді.");
const correctFeedback=l("Физиологически обоснованный выбор. ","Physiologically supported choice. ","Физиологиялық негізделген таңдау. ");
const wrongFeedback=l("Этот вывод не следует из приведённых данных. ","This inference is not supported by the observations. ","Бұл қорытынды берілген деректерден шықпайды. ");
export function reviewModuleFiveVirtualPatient(base:VirtualPatientScenario,language:Language):VirtualPatientScenario {
 if(base.moduleId!==5 || base.stages.length!==6) throw new Error("Module 5 requires six stages");
 // The base scenario rotates options; the correct answer must still refer to
 // the physiology-based decision, not a distractor after reordering.
 for(const [index,stage] of base.stages.entries()){
  if(stage.options.length!==3 || !stage.options[stage.correctOption]?.id.endsWith("-decision-1"))
   throw new Error("Module 5 answer key mismatch at stage "+(index+1));
 }
 return {
  ...base,patient:label[language],profile:profile[language],opening:note[language],
  syntheticNote:note[language],
  stages:base.stages.map((stage,index)=>{
   const c=stages[index];
   const options=stage.options.map(option=>{
    const id=option.id.split("-decision-")[1];
    const correct=id==="1";
    const wrongIndex=id==="2"?0:1;
    return {
     ...option,
     text:correct?correctChoices[language][index]:c.wrong[wrongIndex][language],
     response:note[language],
     feedback:(correct?correctFeedback[language]:wrongFeedback[language])+c.explanation[language]
    };
   }) as VirtualPatientStage["options"];
   return {...stage,situation:c.situation[language],newData:c.data[language],
    task:c.task[language],mentorPrompt:c.task[language],
    mechanism:c.explanation[language],options};
  })
 };
}
