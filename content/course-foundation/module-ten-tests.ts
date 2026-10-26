import type { Language } from "../course";
import type { BranchingTest, QuestionCopy, TestNode } from "../tests";

// Module 10: authored brainstem questions; do not replace physiology with
// generic "weaken concept A and predict concept B" metacognitive prompts.
// Each competency has a different main and corrective vignette in RU/EN/KZ.
// Text is original; mechanisms checked against Guyton & Hall 13e, Ganong 23e,
// and C. L. Ghai Practical Physiology 8e.
type Q = [prompt:string, correct:string, wrong1:string, wrong2:string, wrong3:string, explanation:string];
type Pair = [main:Q, corrective:Q];
const q=(...items:Q):Q=>items;
const authored:Record<Language,Pair[]> = {
 RU:[
  [
   q("У пациента сохранён ранний слуховой вызванный ответ, но резко снижена реактивность. Что следует заключить?",
    "Проведение части слухового пути возможно, но это не доказывает сохранность систем бодрствования.",
    "Наличие ответа доказывает нормальное сознание.",
    "Ранний слуховой ответ измеряет только произвольную речь.",
    "Сохранённый ответ исключает повреждение ствола мозга.",
    "Специфический слуховой путь и распределённые восходящие активирующие сети выполняют разные функции."),
   q("Какое утверждение о ретикулярной формации ствола наиболее точное?",
    "Это неоднородная сеть, участвующая в бодрствовании, мышечном тонусе и вегетативной регуляции.",
    "Это один изолированный центр сознания с единственным медиатором.",
    "Это исключительно зрительный релейный центр таламуса.",
    "Она проводит только импульсы по пирамидному тракту.",
    "Бодрствование поддерживают взаимодействующие стволовые, гипоталамические, таламические и корковые системы.")
  ],
  [
   q("При освещении правого глаза суживаются оба зрачка. Какой путь обеспечивает содружественный ответ левого зрачка?",
    "Правый II нерв → претектальная область → оба ядра Эдингера—Вестфаля → левый III нерв.",
    "Правый III нерв → спинной мозг → левый II нерв.",
    "Правый II нерв → только правая зрительная кора → левый симпатический ствол.",
    "Левый слуховой нерв → нижние холмики → левый III нерв.",
    "Афферентный сигнал идёт по II нерву; двусторонние претектальные связи активируют парасимпатический выход III нерва."),
   q("При освещении любого глаза правый зрачок не сужается, а левый сужается при освещении любого глаза. Где вероятнее нарушение?",
    "В правом эфферентном звене парасимпатического зрачкового рефлекса, при сохранном левом.",
    "Только в правом зрительном нерве как афферентном звене.",
    "В обоих зрительных нервах одновременно.",
    "Только в левом эфферентном звене III нерва.",
    "Ответ, не зависящий от освещаемого глаза, указывает на правый эфферентный дефект; необходимы проверка формы зрачка, препаратов и глазной патологии.")
  ],
  [
   q("Внезапно появились дисфагия, осиплость, атаксия справа, утрата боли на правой половине лица и на левой половине тела. Где вероятнее очаг?",
    "В правой латеральной части продолговатого мозга.",
    "В левом зрительном тракте.",
    "В правой затылочной коре.",
    "В передних рогах поясничного отдела спинного мозга.",
    "Перекрёстное выпадение болевой чувствительности и бульбарные признаки типичны для латерального медуллярного синдрома."),
   q("После поражения латеральной части продолговатого мозга нарушено глотание и голос стал хриплым. Какая структура особенно важна?",
    "Двигательные нейроны двойного ядра (nucleus ambiguus), связанные с IX–X нервами.",
    "Только латеральное коленчатое тело.",
    "Только нижние мотонейроны поясничного утолщения.",
    "Только первичная зрительная кора.",
    "Двойное ядро участвует в иннервации мышц глотки и гортани; один симптом без остальных данных не определяет локализацию.")
  ],
  [
   q("В учебной модели артериальное давление кратковременно повышается. Каков ранний барорефлекторный ответ при сохранной дуге?",
    "Увеличение импульсации барорецепторов и тенденция к снижению ЧСС и симпатического сосудосуживающего влияния.",
    "Снижение импульсации барорецепторов и обязательная тахикардия.",
    "Немедленное прекращение работы всех центров дыхания.",
    "Усиление симпатического выхода независимо от афферентного сигнала.",
    "Сигналы каротидного синуса и дуги аорты через IX/X поступают в NTS; рефлекс противодействует росту давления."),
   q("При быстром вставании давление на короткое время падает. Какое изменение барорефлекса ожидается?",
    "Уменьшение разрядов барорецепторов с тенденцией к усилению симпатического влияния и учащению пульса.",
    "Увеличение барорецепторной импульсации с выраженной вагусной брадикардией.",
    "Полное выключение вестибулярной системы.",
    "Утрата функции коры при любом кратком падении давления.",
    "Разгрузка артериальных барорецепторов ослабляет торможение симпатического выхода; реальная реакция зависит от состояния пациента.")
  ],
  [
   q("Ранние компоненты слуховых стволовых вызванных потенциалов регистрируются, но пациент не выполняет команды. Какой вывод обоснован?",
    "Сохранность части слухового проведения не позволяет по одному тесту судить о сознании.",
    "Регистрируемый ответ доказывает осознанное восприятие речи.",
    "Все сети бодрствования и кора обязательно интактны.",
    "Всякое отсутствие ответа на команды означает только глухоту.",
    "Оценка уровня сознания требует клинического обследования и учёта лекарств, метаболических и структурных причин."),
   q("Почему нельзя диагностировать поражение ретикулярной формации только по сонливости?",
    "Сонливость неспецифична: нужны осмотр, оценка препаратов, метаболизма и другие данные.",
    "Сонливость всегда доказывает изолированное поражение среднего мозга.",
    "Сонливость не связана с нейронными сетями бодрствования.",
    "Один нормальный зрачковый рефлекс исключает все причины угнетения сознания.",
    "Стволовые и гипоталамические сети регулируют бодрствование совместно; клинический симптом не равен анатомическому диагнозу.")
  ]
 ],
 EN:[
  [
   q("An early auditory evoked response is preserved, but the patient is poorly responsive. What follows?",
    "Some auditory conduction may persist, but this does not establish intact arousal networks.",
    "The response proves normal consciousness.",
    "An early auditory response measures only voluntary speech.",
    "The response excludes any brainstem lesion.",
    "Specific auditory conduction and distributed ascending arousal systems serve different functions."),
   q("Which description of the brainstem reticular formation is most accurate?",
    "A heterogeneous network involved in arousal, muscle tone and autonomic regulation.",
    "One isolated consciousness center with a single transmitter.",
    "Only a visual relay nucleus in the thalamus.",
    "A pathway carrying only pyramidal tract impulses.",
    "Wakefulness depends on interacting brainstem, hypothalamic, thalamic and cortical systems.")
  ],
  [
   q("Light in the right eye constricts both pupils. Which pathway mediates the left consensual response?",
    "Right CN II → pretectum → both Edinger–Westphal nuclei → left CN III.",
    "Right CN III → spinal cord → left CN II.",
    "Right CN II → only right visual cortex → left sympathetic trunk.",
    "Left auditory nerve → inferior colliculus → left CN III.",
    "CN II carries the afferent signal; bilateral pretectal projections activate the parasympathetic CN III outflow."),
   q("The right pupil does not constrict when either eye is illuminated; the left constricts with either eye. What is most likely?",
    "A right-sided efferent defect in the parasympathetic pupillary pathway.",
    "An isolated right optic-nerve afferent defect.",
    "Simultaneous complete failure of both optic nerves.",
    "An isolated left CN III efferent defect.",
    "Failure independent of which eye receives light favors a right efferent deficit; examine pupils, medication effects and ocular causes.")
  ],
  [
   q("Sudden dysphagia, hoarseness, right ataxia, loss of facial pain on the right and body pain on the left suggest which site?",
    "Right lateral medulla.",
    "Left optic tract.",
    "Right occipital cortex.",
    "Lumbar anterior horn cells.",
    "Crossed pain-temperature loss with bulbar findings supports a lateral medullary syndrome."),
   q("After a lateral medullary lesion, swallowing and voice are impaired. Which structure is especially relevant?",
    "The nucleus ambiguus motor neurons associated with CN IX–X.",
    "Only the lateral geniculate nucleus.",
    "Only lumbar lower motor neurons.",
    "Only primary visual cortex.",
    "The nucleus ambiguus contributes to pharyngeal and laryngeal motor function; a single symptom does not localize a lesion.")
  ],
  [
   q("In a teaching model, arterial pressure rises briefly. What early baroreflex response is expected if the arc is intact?",
    "Increased baroreceptor firing with a tendency to reduce heart rate and sympathetic vasoconstrictor drive.",
    "Reduced baroreceptor firing and obligatory tachycardia.",
    "Immediate shutdown of all respiratory centers.",
    "Increased sympathetic outflow regardless of afferent input.",
    "Carotid sinus and aortic arch signals travel via CN IX/X to the NTS; the reflex opposes the pressure rise."),
   q("On standing rapidly, arterial pressure falls briefly. What baroreflex adjustment is expected?",
    "Reduced baroreceptor firing with a tendency to increase sympathetic drive and heart rate.",
    "Increased baroreceptor firing with marked vagal bradycardia.",
    "Complete loss of vestibular function.",
    "Loss of cortical function after every brief pressure drop.",
    "Unloading arterial baroreceptors reduces inhibition of sympathetic outflow; the actual response depends on patient state.")
  ],
  [
   q("Early auditory brainstem evoked potentials are present, but a patient cannot follow commands. Which inference is justified?",
    "Preserved conduction along part of the auditory pathway does not establish consciousness.",
    "The response proves conscious understanding of speech.",
    "All arousal networks and the cortex must be intact.",
    "Failure to follow commands always means deafness.",
    "Consciousness assessment requires clinical examination and consideration of drugs, metabolic and structural causes."),
   q("Why is sleepiness alone insufficient to diagnose reticular formation damage?",
    "Sleepiness is nonspecific; examination, medication and metabolic review and other evidence are needed.",
    "Sleepiness always proves an isolated midbrain lesion.",
    "Sleepiness has no relation to arousal circuits.",
    "A single normal pupillary reflex excludes all causes of impaired consciousness.",
    "Brainstem and hypothalamic circuits jointly regulate wakefulness; one symptom is not an anatomical diagnosis.")
  ]
 ],
 KZ:[
  [
   q("Ерте есту шақырылған жауабы сақталған, бірақ пациенттің реакциясы күрт төмендеген. Қандай қорытынды орынды?",
    "Есту жолының бір бөлігі өткізеді, бірақ бұл сергектік желілерінің сақталғанын дәлелдемейді.",
    "Жауаптың болуы сананың қалыпты екенін дәлелдейді.",
    "Ерте есту жауабы тек ерікті сөйлеуді өлшейді.",
    "Бұл жауап ми бағанының кез келген зақымын жоққа шығарады.",
    "Арнайы есту өткізгіш жолы мен жоғарылаушы белсендіруші желілер әртүрлі қызмет атқарады."),
   q("Ми бағанының ретикулярлық формациясын қай сипаттама дұрыс түсіндіреді?",
    "Сергектікке, бұлшықет тонусына және вегетативтік реттелуге қатысатын әртекті желі.",
    "Бір ғана медиаторы бар оқшауланған сана орталығы.",
    "Таламустағы тек көру ақпаратын өткізетін ядро.",
    "Тек пирамидалық жол импульстарын өткізетін жүйе.",
    "Сергектік ми бағаны, гипоталамус, таламус және қыртыс желілерінің бірлескен жұмысына тәуелді.")
  ],
  [
   q("Оң көзге жарық түсіргенде екі қарашық та тарылады. Сол жақтың содружестволық жауабын қандай жол қамтамасыз етеді?",
    "Оң II жүйке → претекталдық аймақ → екі Эдингер—Вестфаль ядросы → сол III жүйке.",
    "Оң III жүйке → жұлын → сол II жүйке.",
    "Оң II жүйке → тек оң көру қыртысы → сол симпатикалық баған.",
    "Сол есту жүйкесі → төменгі төмпешіктер → сол III жүйке.",
    "II жүйке афференттік сигналды жеткізеді; екі жақты претекталдық байланыс III жүйкенің парасимпатикалық шығысын іске қосады."),
   q("Қай көзге жарық түссе де оң қарашық тарылмайды, ал сол қарашық екі жағдайда да тарылады. Ең ықтимал ақау қайда?",
    "Оң жақ қарашық рефлексінің парасимпатикалық эфференттік буынында.",
    "Тек оң көру жүйкесінің афференттік буынында.",
    "Екі көру жүйкесінің толық зақымында.",
    "Тек сол III жүйкенің эфференттік буынында.",
    "Жарық түскен көзге тәуелсіз оң жауаптың болмауы эфференттік ақауға сәйкес; қарашықты, дәрілерді және көз ауруларын да тексеру керек.")
  ],
  [
   q("Кенет жұтыну қиындап, дауыс қарлығып, оң жақ атаксия, оң бет пен сол денеде ауырсыну сезімі төмендеді. Ошақ қайда?",
    "Сопақша мидың оң жақ латералды бөлігінде.",
    "Сол көру жолында.",
    "Оң шүйде қыртысында.",
    "Жұлынның бел бөлігінің алдыңғы мүйіздерінде.",
    "Айқасқан ауырсыну-сезімталдық тапшылығы мен бульбарлық белгілер латералды медуллярлық синдромға тән."),
   q("Сопақша мидың латералды зақымынан кейін жұтыну мен дауыс бұзылды. Қай құрылым маңызды?",
    "IX–X жүйкелерімен байланысты қос ядроның (nucleus ambiguus) қозғалтқыш нейрондары.",
    "Тек латералды тізелі дене.",
    "Тек бел сегменттерінің төменгі мотонейрондары.",
    "Тек бастапқы көру қыртысы.",
    "Қос ядро жұтқыншақ пен көмей бұлшықеттерін жүйкелендіруге қатысады; бір белгі ошақты дәл анықтамайды.")
  ],
  [
   q("Оқу моделінде артериялық қысым қысқа уақытқа жоғарылады. Рефлекс доғасы сақталса, бастапқы жауап қандай?",
    "Барорецептор импульсациясы артып, жүрек соғу жиілігі мен симпатикалық тамыр тарылтқыш ықпал төмендеуге бейім болады.",
    "Барорецептор импульсациясы азайып, міндетті түрде тахикардия дамиды.",
    "Барлық тыныс орталықтары бірден тоқтайды.",
    "Афференттік сигналға қарамай симпатикалық шығыс артады.",
    "Каротид синусы мен қолқа доғасынан сигнал IX/X жүйкелер арқылы NTS-ке барады; рефлекс қысымның көтерілуіне қарсы әсер етеді."),
   q("Тез тұрған кезде артериялық қысым қысқа уақытқа төмендеді. Қандай барорефлекторлық өзгеріс күтіледі?",
    "Барорецептор импульсациясы азайып, симпатикалық ықпал мен пульс жиілеуге бейім болады.",
    "Барорецептор импульсациясы артып, айқын вагустық брадикардия пайда болады.",
    "Вестибулярлық жүйе толық өшеді.",
    "Қысым аздап төмендеген сайын қыртыс қызметі жоғалады.",
    "Артериялық барорецепторлар жүктемесінің азаюы симпатикалық шығыстың тежелуін әлсіретеді; нақты жауап пациент күйіне тәуелді.")
  ],
  [
   q("Есту ми бағаны шақырылған потенциалдарының ерте компоненттері бар, бірақ пациент нұсқауды орындамайды. Қандай қорытынды дұрыс?",
    "Есту жолының бір бөлігіндегі өткізгіштік сақталғанымен, бір тест сананы дәлелдемейді.",
    "Жауаптың болуы сөйлеуді саналы түсінуді дәлелдейді.",
    "Барлық сергектік желілері мен қыртыс міндетті түрде сау.",
    "Нұсқауды орындамау әрқашан тек кереңдікке байланысты.",
    "Сананы бағалау үшін клиникалық тексеру, дәрілер, метаболизм және құрылымдық себептер ескеріледі."),
   q("Неліктен тек ұйқышылдыққа қарап ретикулярлық формацияның зақымын анықтауға болмайды?",
    "Ұйқышылдық бейспецификалық; тексеру, дәрілер мен метаболизмді бағалау және қосымша деректер қажет.",
    "Ұйқышылдық әрқашан ортаңғы мидың оқшау зақымын дәлелдейді.",
    "Ұйқышылдық сергектік желілерімен байланысты емес.",
    "Бір қалыпты қарашық рефлексі сана бұзылысының барлық себебін жоққа шығарады.",
    "Ми бағаны мен гипоталамус желілері сергектікті бірге реттейді; бір симптом анатомиялық диагноз емес.")
  ]
 ]
};
const ids=["concept","mechanism","application","transfer","justification"] as const;
function question(item:Q,shift:number):QuestionCopy{
 const options=[{id:"a",text:item[1]},{id:"b",text:item[2]},{id:"c",text:item[3]},{id:"d",text:item[4]}];
 const n=shift%4;
 return {prompt:item[0],options:[...options.slice(n),...options.slice(0,n)],correctAnswer:"a",explanation:item[5]};
}
export function adaptModuleTenTest(base:BranchingTest,lang:Language):BranchingTest{
 const nodes:Record<string,TestNode>={...base.nodes};
 const pairs=authored[lang];
 if(pairs.length!==5) throw new Error("Module 10 needs five competencies");
 ids.forEach((competency,i)=>{
  const [main,corrective]=pairs[i];
  for(const [level,item,offset] of [["main",main,i+1],["corrective",corrective,i+2],["basic",corrective,i+3]] as const){
   const key=competency+":"+level;
   const old=nodes[key];
   if(!old || old.type!=="question") throw new Error("Missing module 10 node "+key);
   nodes[key]={...old,...question(item,offset)};
  }
  const note=lang==="RU"?"Определите путь, сторону и пределы вывода. ":lang==="EN"?"Identify the pathway, side and limits of inference. ":"Жолды, зақым жағын және қорытынды шегін анықтаңыз. ";
  for(const suffix of ["review-1","review-2"]){
   const key=competency+":"+suffix;
   const old=nodes[key];
   if(!old || old.type!=="remediation") throw new Error("Missing module 10 remediation "+key);
   nodes[key]={...old,text:note+main[5],theoryTarget:{moduleId:10,anchor:i===4?"interpretation":"mechanism"}};
  }
 });
 return {...base,nodes};
}
