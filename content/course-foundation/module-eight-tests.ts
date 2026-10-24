import type { Language } from "../course";
import type { BranchingTest, QuestionCopy, TestNode } from "../tests";

// Module 8: clinically interpretable, localized pathway questions.
// The original generic generator incorrectly treated "decussation" as a
// continuously varying measurement caused by "weakening" a neural pathway.
// Questions here test tract anatomy, side, modality and limits of inference.
type Q = [prompt:string,correct:string,wrong1:string,wrong2:string,wrong3:string,explanation:string];
type Pair = [main:Q,corrective:Q];
const q = (...args:Q):Q => args;
const copy: Record<Language,Pair[]> = {
 RU: [
  [
   q("При небольшом правостороннем поражении заднего столба спинного мозга на грудном уровне, ниже перекрёста, что вероятнее всего нарушится ниже очага?",
     "Вибрация и суставно-мышечное чувство преимущественно справа.",
     "Боль и температура преимущественно справа из-за перекрёста в продолговатом мозге.",
     "Вибрация преимущественно слева, потому что волокна уже перекрестились в спинном мозге.",
     "Только слух и равновесие, без соматосенсорных изменений.",
     "Волокна задних столбов поднимаются ипсилатерально и перекрещиваются после переключения в ядрах продолговатого мозга."),
   q("Где в норме перекрещиваются волокна второго нейрона пути задние столбы — медиальная петля?",
     "В продолговатом мозге после переключения в тонком и клиновидном ядрах.",
     "Сразу в передней белой спайке каждого сегмента спинного мозга.",
     "Только в первичной соматосенсорной коре.",
     "В латеральном корково-спинномозговом тракте.",
     "Тонкий и клиновидный пучки поднимаются на своей стороне; внутренние дугообразные волокна второго нейрона образуют чувствительный перекрёст в продолговатом мозге.")
  ],
  [
   q("После правостороннего повреждения антеролатерального пути на уровне Th8 у пациента снижается болевая и температурная чувствительность. Где ожидается преимущественный дефицит?",
     "Слева ниже очага, часто начиная на несколько сегментов ниже.",
     "Справа ниже очага с той же точной границей Th8.",
     "Только на лице справа.",
     "С обеих сторон исключительно в задних столбах.",
     "Афференты боли и температуры переключаются в заднем роге и обычно перекрещиваются в спинном мозге; короткий ход в тракте Лиссауэра объясняет смещение границы."),
   q("Почему нельзя ожидать резкую границу утраты боли точно на уровне правого поражения антеролатерального тракта?",
     "Первичные афференты могут пройти вверх или вниз на несколько сегментов до переключения и перекрёста.",
     "Потому что все болевые волокна перекрещиваются только в коре.",
     "Потому что задние столбы всегда проводят всю боль.",
     "Потому что путь не имеет соматотопической организации.",
     "Переход по тракту Лиссауэра и сегментарный перекрёст делают границу вариабельной; точный уровень не выводят по одному симптому.")
  ],
  [
   q("Какое сочетание лучше соответствует ограниченному правостороннему поражению латерального корково-спинномозгового тракта в грудном отделе?",
     "Признаки нарушения нисходящего двигательного контроля преимущественно справа ниже очага.",
     "Изолированная потеря боли слева без двигательных признаков.",
     "Слабость исключительно левой кисти вследствие перекрёста в каждом грудном сегменте.",
     "Только выпадение слуха на правой стороне.",
     "Большинство корково-спинномозговых волокон перекрещивается в каудальном отделе продолговатого мозга, до входа в латеральный тракт спинного мозга."),
   q("У больного очаг в правой задней ножке внутренней капсулы. Какова типичная сторона пирамидной слабости?",
     "Слева, поскольку поражение находится выше пирамидного перекрёста.",
     "Справа, потому что пирамидный перекрёст находится в спинном мозге.",
     "Всегда с двух сторон одинаково.",
     "Невозможно появление двигательного дефицита при поражении капсулы.",
     "Корково-спинномозговые волокна внутренней капсулы ещё не достигли перекрёста в каудальной части продолговатого мозга.")
  ],
  [
   q("Вибрация и положение пальца справа снижены, а укол различается. Какой вывод обоснован?",
     "Нужно отдельно оценить систему задних столбов и периферические крупные волокна; одного признака недостаточно для локализации.",
     "Это доказывает полное выключение всех чувствительных путей.",
     "Сохранность укола исключает любое поражение нервной системы.",
     "Это доказывает поражение только левой моторной коры.",
     "Модальности используют преимущественно разные пути; клиническая локализация требует распределения симптомов, силы, рефлексов и дополнительных данных."),
   q("Какое обследование лучше дополняет жалобу на утрату вибрации и положения пальцев?",
     "Сравнить стороны камертоном и пробой положения пальца, проверить силу, рефлексы, укол и температурную чувствительность.",
     "Проверить только остроту слуха.",
     "Ограничиться вопросом о наличии боли без осмотра.",
     "Считать нормальное лёгкое прикосновение доказательством сохранности всех проводящих путей.",
     "Сопоставление модальностей и сторон позволяет отличать поражение проводников от периферического расстройства; один тест не даёт окончательного диагноза.")
  ],
  [
   q("При правостороннем частичном грудном поражении есть слабость и потеря вибрации справа, снижение боли слева. Какой вывод наиболее корректен?",
     "Это согласуется с поражением нескольких проводящих систем, но уровень и причину подтверждают полным осмотром и визуализацией.",
     "Только по этим данным доказан конкретный позвонок и этиология.",
     "Все три симптома должны возникнуть только слева.",
     "Отсутствие полной анестезии исключает поражение спинного мозга.",
     "Проводниковая диссоциация указывает на возможную локализацию; частичность, корешковые признаки и вариабельность перекрёста ограничивают вывод."),
   q("Почему модель правого гемисиндрома спинного мозга нельзя считать обязательной картиной каждого пациента?",
     "Неполное поражение, сегментарные и корешковые компоненты, время после травмы и индивидуальные различия меняют признаки.",
     "Потому что анатомия перекрёстов случайна в каждом опыте.",
     "Потому что все пути несут одинаковую модальность.",
     "Потому что неврологическое обследование никогда не помогает локализации.",
     "Схема проводящих путей предсказывает типичные стороны и модальности, но не заменяет осмотр и поиск причины.")
  ]
 ],
 EN: [
  [
   q("A small right thoracic dorsal-column lesion occurs below the sensory decussation. What deficit is most likely below the lesion?",
     "Predominantly right-sided loss of vibration and joint-position sense.",
     "Predominantly right-sided pain-temperature loss due to a medullary crossing.",
     "Left-sided vibration loss because these fibers already crossed in the cord.",
     "Only impaired hearing and balance.",
     "Dorsal-column fibers ascend ipsilaterally and cross after synapsing in the medullary gracile and cuneate nuclei."),
   q("Where do second-order dorsal-column–medial-lemniscal fibers normally cross?",
     "In the medulla after synapsing in the gracile and cuneate nuclei.",
     "Immediately in the anterior white commissure of every spinal segment.",
     "Only in primary somatosensory cortex.",
     "Within the lateral corticospinal tract.",
     "Gracile and cuneate fasciculi ascend ipsilaterally; second-order internal arcuate fibers cross in the medulla.")
  ],
  [
   q("After a right anterolateral tract lesion at T8, pain and temperature are reduced. Which distribution is most likely?",
     "Predominantly left-sided below the lesion, often beginning several segments lower.",
     "Right-sided below the lesion with an exact T8 border.",
     "Only the right side of the face.",
     "Both sides exclusively in the dorsal columns.",
     "Pain-temperature afferents relay in the dorsal horn and usually cross within the cord; short travel in Lissauer's tract affects the sensory level."),
   q("Why might the pain-temperature deficit not start exactly at the level of a right anterolateral tract lesion?",
     "Primary afferents may ascend or descend several segments before synapsing and crossing.",
     "All pain fibers cross only in the cortex.",
     "Dorsal columns carry all pain.",
     "The tract has no somatotopic organization.",
     "Lissauer's tract and segmental crossing produce variability; one symptom does not establish the precise lesion level.")
  ],
  [
   q("Which finding best fits a limited right lateral corticospinal tract lesion in the thoracic spinal cord?",
     "Predominantly right-sided signs of impaired descending motor control below the lesion.",
     "Isolated left pain loss without motor findings.",
     "Only left-hand weakness because fibers cross at every thoracic segment.",
     "Only right-sided hearing loss.",
     "Most corticospinal fibers cross in the caudal medulla before entering the lateral corticospinal tract."),
   q("A lesion affects the right posterior limb of the internal capsule. On which side is pyramidal weakness typically found?",
     "On the left, because the lesion is above the pyramidal decussation.",
     "On the right, because pyramidal fibers cross in the spinal cord.",
     "Always symmetrically on both sides.",
     "An internal-capsule lesion cannot cause weakness.",
     "Corticospinal fibers in the internal capsule have not yet reached the decussation in the caudal medulla.")
  ],
  [
   q("Right-sided vibration and digit-position sense are reduced but pinprick is preserved. What is justified?",
     "Examine dorsal-column function and peripheral large fibers; one finding cannot localize the lesion.",
     "This proves complete failure of every sensory pathway.",
     "Preserved pinprick excludes all neurological disease.",
     "This proves an isolated lesion of the left motor cortex.",
     "Different modalities predominantly use different pathways; localization also needs distribution, strength, reflexes and further findings."),
   q("Which examination best complements reduced vibration and position sense?",
     "Compare sides with a tuning fork and digit-position testing, and examine strength, reflexes, pinprick and temperature.",
     "Test hearing acuity only.",
     "Ask about pain without performing an examination.",
     "Treat preserved light touch as proof that every pathway is intact.",
     "Comparing modalities and sides helps distinguish tract from peripheral deficits; no single test establishes a diagnosis.")
  ],
  [
   q("A partial right thoracic lesion causes right weakness and vibration loss, with left pain loss. Which inference is best?",
     "Multiple tract involvement is plausible, but full examination and imaging are needed to establish level and cause.",
     "These findings alone prove an exact vertebral level and etiology.",
     "All three deficits must occur only on the left.",
     "Incomplete anesthesia excludes spinal cord damage.",
     "Dissociated deficits can suggest localization; partial lesions, root signs and crossing variability limit certainty."),
   q("Why is the schematic right spinal hemicord syndrome not mandatory in every patient?",
     "Incomplete injury, segmental/root involvement, time since injury and anatomical variation can alter the pattern.",
     "Neural decussations are randomly located in each experiment.",
     "Every pathway carries the same sensory modality.",
     "Neurological examination can never aid localization.",
     "Tract anatomy predicts typical sides and modalities but does not replace examination and investigation.")
  ]
 ],
 KZ: [
  [
   q("Кеуде деңгейінде сезімталдық айқасуынан төмен оң жақ артқы баған аздап зақымданды. Ошақтан төмен қандай бұзылыс ықтимал?",
     "Діріл мен буын қалпын сезудің көбіне оң жақта төмендеуі.",
     "Ауырсыну мен температураның оң жақта төмендеуі, өйткені олар сопақша мида айқасады.",
     "Дірілдің сол жақта төмендеуі, өйткені талшықтар жұлында айқасып қойған.",
     "Тек есту мен тепе-теңдіктің бұзылуы.",
     "Артқы баған талшықтары өз жағымен жоғары көтеріліп, сопақша мидағы жұқа және сына тәрізді ядроларда ауысқаннан кейін айқасады."),
   q("Артқы баған–медиалдық ілмек жолының екінші нейрон талшықтары қай жерде айқасады?",
     "Жұқа және сына тәрізді ядроларда ауысқаннан кейін сопақша мида.",
     "Әр жұлын сегментінің алдыңғы ақ комиссурасында бірден.",
     "Тек біріншілік соматосенсорлық қыртыста.",
     "Латералдық қыртыс-жұлын жолының ішінде.",
     "Артқы бағандар өз жағымен көтеріледі; екінші нейронның ішкі доғалы талшықтары сопақша мида сезімталдық айқасуын түзеді.")
  ],
  [
   q("Th8 деңгейіндегі оң антеролатералдық жол зақымынан кейін ауырсыну мен температура сезімі төмендеді. Қай жақта күтіледі?",
     "Ошақтан төмен көбіне сол жақта, кейде бірнеше сегмент төменнен бастап.",
     "Дәл Th8 шекарасымен оң жақта.",
     "Тек беттің оң жартысында.",
     "Тек артқы бағандарда екі жақта.",
     "Ауырсыну мен температура афференттері артқы мүйізде ауысып, әдетте жұлында айқасады; Лиссауэр жолындағы қысқа жүріс шекараны өзгертеді."),
   q("Неліктен антеролатералдық жолдың оң жақ зақымында ауырсыну жоғалуы дәл ошақ деңгейінен басталмауы мүмкін?",
     "Біріншілік афференттер ауысу мен айқасуға дейін бірнеше сегмент жоғары не төмен жүруі мүмкін.",
     "Барлық ауырсыну талшықтары тек қыртыста айқасады.",
     "Артқы бағандар барлық ауырсынуды өткізеді.",
     "Бұл жолда соматотопиялық ұйымдасу жоқ.",
     "Лиссауэр жолы мен сегменттік айқасу шекараны өзгертуі мүмкін; бір белгі нақты деңгейге жеткіліксіз.")
  ],
  [
   q("Кеуде жұлынындағы оң латералдық қыртыс-жұлын жолының шектелген зақымына қандай белгі сәйкес?",
     "Ошақтан төмен көбіне оң жақта төмендеуші қозғалыс бақылауының бұзылу белгілері.",
     "Қозғалыс бұзылысынсыз тек сол жақ ауырсынудың жоғалуы.",
     "Әр кеуде сегментінде айқасу салдарынан тек сол қолдың әлсіздігі.",
     "Тек оң жақ естудің жоғалуы.",
     "Қыртыс-жұлын талшықтарының көпшілігі латералдық жұлын жолына кірер алдында сопақша мидың төменгі бөлігінде айқасады."),
   q("Оң ішкі капсуланың артқы аяғы зақымданса, пирамидалық әлсіздік әдетте қай жақта байқалады?",
     "Сол жақта, өйткені ошақ пирамидалық айқасудан жоғары орналасқан.",
     "Оң жақта, өйткені пирамидалық талшықтар жұлында айқасады.",
     "Әрқашан екі жақта бірдей.",
     "Ішкі капсула зақымы қозғалыс әлсіздігін туғызбайды.",
     "Ішкі капсуладағы қыртыс-жұлын талшықтары сопақша мидың төменгі бөлігіндегі айқасуға әлі жетпеген.")
  ],
  [
   q("Оң жақта діріл мен саусақ қалпын сезу төмендеген, ал шаншу сезімі сақталған. Қандай қорытынды орынды?",
     "Артқы баған қызметі мен шеткі ірі талшықтарды тексеру керек; бір белгі ошақты анықтауға жеткіліксіз.",
     "Бұл барлық сезімтал жолдардың толық істен шыққанын дәлелдейді.",
     "Шаншуды сезу барлық неврологиялық ауруды жоққа шығарады.",
     "Бұл тек сол қозғалыс қыртысының зақымын дәлелдейді.",
     "Әртүрлі сезімталдық түрлері негізінен әртүрлі жолдармен өтеді; ошақты анықтау үшін таралуын, күшті, рефлекстерді және басқа деректерді салыстырады."),
   q("Діріл мен саусақ қалпын сезу төмендегенде қандай тексеру пайдалы?",
     "Камертон және саусақ қалпын анықтау сынамасымен екі жақты салыстырып, күшті, рефлекстерді, шаншу мен температураны тексеру.",
     "Тек есту өткірлігін тексеру.",
     "Қараусыз тек ауырсыну бар-жоғын сұрау.",
     "Жеңіл жанасу сақталса, барлық жолдар сау деп санау.",
     "Сезімталдық түрлері мен жақтарын салыстыру өткізгіш жол мен шеткі зақымды ажыратуға көмектеседі; бір сынама диагнозды анықтамайды.")
  ],
  [
   q("Оң кеуде жұлын ошағында оң жақ әлсіздік пен дірілдің төмендеуі, сол жақ ауырсынудың төмендеуі байқалады. Қай қорытынды негізді?",
     "Бірнеше өткізгіш жолдың зақымы ықтимал, бірақ деңгейі мен себебін толық қарау және бейнелеу арқылы нақтылау қажет.",
     "Осы белгілер нақты омыртқа деңгейі мен себепті бірден дәлелдейді.",
     "Үш бұзылыстың бәрі тек сол жақта болуы тиіс.",
     "Толық анестезия болмауы жұлын зақымын жоққа шығарады.",
     "Сезімталдық пен қозғалыс бұзылыстарының ажырауы ошақ орнын болжауға көмектеседі; толық емес зақым мен айқасу өзгерістері қорытындыны шектейді."),
   q("Неліктен жұлынның оң жартысы зақымының сызбалық көрінісі барлық науқасқа міндетті емес?",
     "Толық емес зақым, сегмент пен түбірдің қатысуы, жарақаттан кейінгі уақыт және анатомиялық айырмашылықтар белгілерді өзгертеді.",
     "Әр тәжірибеде талшықтардың айқасу орны кездейсоқ өзгереді.",
     "Барлық жол бірдей сезімталдық түрін өткізеді.",
     "Неврологиялық тексеру ошақты анықтауға ешқашан көмектеспейді.",
     "Өткізгіш жол сызбасы тән жақ пен сезімталдық түрін болжайды, бірақ клиникалық қарау мен зерттеуді алмастырмайды.")
  ]
 ]
};
const ids=["concept","mechanism","application","transfer","justification"] as const;
const next=["mechanism:main","application:main","transfer:main","justification:main","end"];
const shuffled=(item:Q,offset:number):QuestionCopy=>{
 const options=[
  {id:"a",text:item[1]},{id:"b",text:item[2]},
  {id:"c",text:item[3]},{id:"d",text:item[4]}
 ];
 const shift=offset%4;
 return {prompt:item[0],options:[...options.slice(shift),...options.slice(0,shift)],correctAnswer:"a",explanation:item[5]};
};
export function adaptModuleEightTest(base:BranchingTest,language:Language):BranchingTest{
 const nodes:Record<string,TestNode>={...base.nodes};
 const pairs=copy[language];
 ids.forEach((competency,i)=>{
  const main=competency+":main",corrective=competency+":corrective",basic=competency+":basic";
  for(const [key,item,offset] of [[main,pairs[i][0],i+1],[corrective,pairs[i][1],i+2],[basic,pairs[i][1],i+3]] as const){
   const previous=nodes[key];
   if(!previous || previous.type!=="question") throw new Error("Missing test node "+key);
   nodes[key]={...previous,...shuffled(item,offset)};
  }
  const review1=competency+":review-1",review2=competency+":review-2";
  const note=language==="RU"
   ?"Сопоставьте модальность, сторону поражения, место перекрёста и пределы вывода. После разбора ответьте на новый вопрос."
   :language==="EN"
    ?"Compare modality, lesion side, decussation site and limits of inference. Then answer a new question."
    :"Сезімталдық түрін, ошақ жағын, айқасу орнын және қорытынды шегін салыстырыңыз. Кейін жаңа сұраққа жауап беріңіз.";
  for(const id of [review1,review2]){
   const old=nodes[id];
   if(!old || old.type!=="remediation") throw new Error("Missing remediation "+id);
   nodes[id]={...old,text:note+" "+pairs[i][0][5],theoryTarget:{moduleId:8,anchor:i===4?"interpretation":"mechanism"}};
  }
 });
 return {...base,nodes};
}
