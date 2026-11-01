import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 8: authored pathway-localization practice. Sources read in Library:
// Guyton & Hall 13e, PDF pp. 584–586, 677–678; Ganong 23e,
// PDF pp. 185–187, 254–255; C. L. Ghai 8e, PDF pp. 324–327.
// The lesion patterns are constrained teaching models, not patient diagnoses.
type Four<T> = [T, T, T, T];
type Copy = {
  titles: [string, string, string, string, string];
  prompts: Four<string>;
  answers: Four<[string, string]>;
  response: string;
  criteria: [string, string, string, string, string];
};
const data: Record<Language, Copy> = {
  RU: {
    titles: [
      "1. Сравните три пути и их перекрёсты",
      "2. Локализуйте одностороннее спинальное поражение",
      "3. Почему уровень перекрёста меняет сторону симптома?",
      "4. Выберите пробы и ограничьте вывод",
      "Самопроверка физиологического рассуждения"
    ],
    prompts: [
      "Постройте таблицу для трёх путей от туловища и конечностей: задние столбы — медиальная петля, антеролатеральная система и латеральный корково-спинномозговой путь. Для каждого укажите основную функцию, направление сигнала, место переключения и перекрёста, а также сторону нарушения при изолированном поражении правого спинального тракта ниже продолговатого мозга. Не смешивайте сторону волокна и сторону рецептора.",
      "Учебная модель: ограниченный очаг справа в грудном отделе спинного мозга, ниже пирамидного перекрёста, с поражением заднего столба, латерального корково-спинномозгового и антеролатерального трактов. Предскажите сторону изменения вибрации и чувства положения, произвольных движений, боли и температуры ниже очага. Почему верхняя граница болевого дефицита может начинаться на несколько сегментов ниже очага? Какие признаки на уровне очага не отражены в этой упрощённой модели?",
      "Сравните два изолированных повреждения латерального корково-спинномозгового пути: A — в правой половине спинного мозга ниже пирамидного перекрёста; Б — в правой внутренней капсуле выше перекрёста. На какой стороне ожидается слабость конечностей в каждом случае? Отдельно сравните правый задний столб спинного мозга с правой медиальной петлёй после чувствительного перекрёста. Не приравнивайте двигательную слабость к утрате чувствительности.",
      "Студент обследует человека с предполагаемым проводниковым расстройством. Подберите разные пробы для вибрации, положения сустава, боли/температуры и произвольного движения; объясните, зачем сравнивать стороны и уровни. Можно ли только по лёгкому прикосновению установить сохранность задних столбов? Можно ли по одному рисунку или симуляции назвать точный сегмент, причину поражения и диагноз?"
    ],
    answers: [
      [
        "Задние столбы: вибрация, сознательная проприоцепция, различительное осязание; сигнал поднимается на своей стороне до тонкого/клиновидного ядер, затем вторые нейроны перекрещиваются в продолговатом мозге. Правый спинальный очаг — преимущественно правостороннее нарушение ниже очага.",
        "Антеролатеральная система: преимущественно боль и температура; после переключения в заднем роге большинство вторых нейронов перекрещивается в спинном мозге и поднимается противоположно — правый спинальный очаг преимущественно влияет на левую сторону. Латеральный корково-спинномозговой путь нисходящий; большинство волокон пересекается в каудальной части продолговатого мозга, поэтому правый спинальный очаг ослабляет движения справа."
      ],
      [
        "При описанном правом спинальном очаге ожидаются правостороннее снижение вибрации/позиционного чувства и слабость ниже очага, а также преимущественно левостороннее снижение боли/температуры ниже очага. Это типовая учебная комбинация, а не обязательная картина любого повреждения.",
        "Некоторые болевые афференты проходят один-два сегмента в тракте Лиссауэра до переключения, а перекрёст происходит поблизости; поэтому верхняя граница контралатерального дефицита может быть ниже уровня очага. Модель не описывает сегментарную слабость нижнего мотонейрона, корешковые симптомы, вегетативные расстройства и временную динамику рефлексов."
      ],
      [
        "A: справа ниже пирамидного перекрёста — преимущественно правосторонняя слабость. Б: справа выше перекрёста — преимущественно левосторонняя слабость. Точный клинический рисунок зависит от объёма очага, соседних путей и стадии заболевания.",
        "Правый задний столб до чувствительного перекрёста связан с вибрацией/положением правой половины тела; правая медиальная петля выше перекрёста — преимущественно с левой половиной тела. Это разные восходящие сенсорные структуры; нельзя переносить их латерализацию на нисходящий моторный тракт."
      ],
      [
        "Вибрацию исследуют камертоном; положение — определением направления пассивного движения пальца при закрытых глазах; боль — осторожным уколом, температуру — безопасными тёплыми/холодными стимулами; движения — оценкой силы и выполнения команд. Сопоставляют симметричные участки и возможную сегментарную границу, учитывая внимание и сотрудничество.",
        "Лёгкое прикосновение имеет перекрывающиеся пути, поэтому одна проба не доказывает целость задних столбов. Учебная схема не позволяет установить точный уровень, этиологию или диагноз; нужны анамнез, полноценный неврологический осмотр и дополнительные исследования по показаниям."
      ]
    ],
    response: "Ваш прогноз, механизм и ограничения вывода",
    criteria: [
      "Различил восходящие сенсорные и нисходящий моторный путь.",
      "Указал перекрёст задних столбов в продолговатом мозге.",
      "Указал спинальный перекрёст антеролатеральных волокон и его сегментарную неточность.",
      "Указал пирамидный перекрёст и сторону слабости выше/ниже него.",
      "Назвал разные клинические пробы и не сделал диагноз по одной схеме."
    ]
  },
  EN: {
    titles: [
      "1. Compare three pathways and their crossings",
      "2. Localize a unilateral spinal-cord lesion",
      "3. Why does the crossing level reverse the deficit?",
      "4. Choose examination tests and limit inference",
      "Physiology reasoning self-check"
    ],
    prompts: [
      "Build a table for pathways serving the trunk and limbs: dorsal column–medial lemniscus, anterolateral system, and lateral corticospinal tract. For each, state its principal function, signal direction, relay and crossing level, and expected side of deficit after a restricted right-sided spinal tract lesion below the medulla. Distinguish the side of the axon from the side of the receptor.",
      "Teaching model: a restricted right thoracic spinal-cord lesion below the pyramidal decussation affects the dorsal column, lateral corticospinal tract and anterolateral system. Predict which side loses vibration/position sense, skilled voluntary movement, and pain/temperature below the lesion. Why might contralateral pain loss begin a few segments below the lesion? What signs at the lesion level does this simplified model omit?",
      "Compare two isolated corticospinal injuries: A — right spinal cord below the pyramidal decussation; B — right internal capsule above that crossing. Which limbs are expected to be weak in each? Separately compare a right spinal dorsal-column lesion with a right medial-lemniscus lesion above the sensory decussation. Do not confuse motor weakness with sensory loss.",
      "A student examines a person with suspected long-tract dysfunction. Choose different tests for vibration, joint position, pain/temperature, and voluntary movement; explain why both sides and segmental levels matter. Can light touch alone prove that dorsal columns are intact? Can a diagram or simulator identify the exact spinal segment, cause, or diagnosis?"
    ],
    answers: [
      [
        "Dorsal columns mainly convey vibration, conscious proprioception and discriminative touch; signals ascend ipsilaterally to the gracile/cuneate nuclei, then second-order fibers cross in the medulla. A right spinal dorsal-column lesion mainly impairs these modalities on the right below the lesion.",
        "The anterolateral system mainly conveys pain and temperature: after dorsal-horn relay, many second-order fibers cross within the spinal cord and ascend contralaterally, so a right tract lesion mainly affects the left side. The lateral corticospinal tract descends after most fibers cross in the caudal medulla, so a right spinal lesion can impair right-sided voluntary movement."
      ],
      [
        "For the stated right spinal lesion, expect predominantly right-sided vibration/position deficits and weakness, together with predominantly left-sided pain/temperature loss below the lesion. This is a constrained teaching pattern, not a required presentation for every cord injury.",
        "Some pain afferents travel one or two segments in Lissauer's tract before synapsing, with crossing near the entry level; thus contralateral loss may start below the lesion. This model omits lower-motor-neuron signs at the injured segment, root-level symptoms, autonomic findings and time-dependent reflex changes."
      ],
      [
        "A: a right spinal corticospinal lesion below the pyramidal crossing mainly produces right-sided weakness. B: a right internal-capsule lesion above the crossing mainly produces left-sided weakness. Actual findings depend on lesion size, nearby structures and time course.",
        "A right dorsal-column lesion below the sensory crossing mainly affects right-sided vibration/position; a right medial-lemniscus lesion above the crossing mainly affects the left body. These are ascending sensory pathways, so their laterality should not be conflated with descending motor fibers."
      ],
      [
        "Test vibration with a tuning fork; joint position by identifying the direction of passive finger/toe movement with eyes closed; pain with a safe pinprick stimulus, temperature with safe warm/cool stimuli; and movement through strength and commanded tasks. Compare matching sites bilaterally and map the possible sensory level while considering attention and cooperation.",
        "Light touch uses overlapping pathways and cannot alone confirm dorsal-column integrity. A teaching model cannot establish an exact lesion level, cause or diagnosis: history, a full neurological examination and investigations when indicated are needed."
      ]
    ],
    response: "Your prediction, physiological mechanism and limits of inference",
    criteria: [
      "Distinguished ascending sensory from descending motor pathways.",
      "Located dorsal-column crossing in the medulla.",
      "Located anterolateral crossing in the cord and allowed segmental variation.",
      "Located pyramidal crossing and predicted weakness above/below it.",
      "Selected distinct examination tests and avoided diagnosis from a diagram."
    ]
  },
  KZ: {
    titles: [
      "1. Үш өткізгіш жол мен олардың айқасуын салыстырыңыз",
      "2. Жұлынның бір жақты зақымын жергіліктендіріңіз",
      "3. Айқасу деңгейі бұзылыс жағын неге өзгертеді?",
      "4. Тексеру сынамаларын таңдаңыз және қорытындыны шектеңіз",
      "Физиологиялық пайымдауды өзіндік тексеру"
    ],
    prompts: [
      "Тұлға мен аяқ-қолдың үш жолына кесте құрыңыз: артқы бағандар — медиалдық ілмек, антеролатералдық жүйе және латералдық кортикоспиналдық жол. Әрқайсысының негізгі қызметін, сигнал бағытын, нейрондардың ауысу және айқасу орнын, сондай-ақ сопақша мидан төмен жұлынның оң жақ өткізгіш жолы шектеліп зақымданғанда бұзылыс қай жақта болатынын жазыңыз. Аксон орналасқан жақ пен рецептор орналасқан жақты шатастырмаңыз.",
      "Оқу үлгісі: пирамидалар айқасуынан төмен кеуде жұлынның оң жағындағы шектелген ошақ артқы бағанды, латералдық кортикоспиналдық жолды және антеролатералдық жүйені зақымдаған. Ошақтан төмен діріл мен буын қалпын сезудің, ерікті қозғалыстың, ауырсыну мен температура сезімінің қай жақта бұзылатынын болжаңыз. Қарама-қарсы жақтағы ауырсыну сезімінің төмендеуі неге бірнеше сегмент төменнен басталуы мүмкін? Бұл үлгі ошақ деңгейіндегі қандай белгілерді көрсетпейді?",
      "Екі оқшау кортикоспиналдық зақымды салыстырыңыз: A — пирамидалар айқасуынан төмен оң жұлында; Б — айқасудан жоғары оң ішкі капсулада. Әр жағдайда аяқ-қол әлсіздігі қай жақта күтіледі? Бұдан бөлек, оң жұлынның артқы бағанының зақымын сезімтал айқасудан жоғары оң медиалдық ілмектің зақымымен салыстырыңыз. Қозғалыс әлсіздігін сезімталдықтың төмендеуімен теңестірмеңіз.",
      "Студент өткізгіш жол бұзылысы күдіктелген адамды тексереді. Діріл, буын қалпы, ауырсыну/температура және ерікті қозғалыс үшін әртүрлі сынама таңдаңыз; екі жақ пен сегменттік деңгейді салыстыру не үшін қажет екенін түсіндіріңіз. Жеңіл жанасу сынамасы ғана артқы бағандардың бүтіндігін дәлелдей ме? Сызба немесе симулятор нақты сегментті, себепті және диагнозды анықтай ала ма?"
    ],
    answers: [
      [
        "Артқы бағандар көбіне дірілді, саналы проприоцепцияны және ажыратушы жанасуды өткізеді; сигнал өз жағымен жіңішке/сына тәрізді ядроларға көтеріліп, екінші нейрон талшықтары сопақша мида айқасады. Оң жұлынның артқы бағаны зақымданса, ошақтан төмен осы сезімдер негізінен оң жақта бұзылады.",
        "Антеролатералдық жүйе негізінен ауырсыну мен температураны өткізеді: артқы мүйізде ауысқан соң екінші нейрон талшықтарының көбі жұлында айқасып, қарсы жақпен көтеріледі; оң жақтағы зақым сол жаққа әсер етеді. Латералдық кортикоспиналдық жол төмендейді, талшықтарының көбі сопақша мидың каудалдық бөлігінде айқасады; сондықтан оң жұлын ошағы оң жақ ерікті қимылды әлсіретуі мүмкін."
      ],
      [
        "Берілген оң жақ жұлын ошағында ошақтан төмен діріл/буын қалпы сезімі мен қозғалыс оң жақта, ауырсыну/температура сезімі көбіне сол жақта бұзылады деп күтіледі. Бұл — барлық жұлын зақымына міндетті түрде тән емес, шектелген оқу үлгісі.",
        "Кейбір ауырсыну афференттері синапсқа дейін Лиссауэр жолымен бір-екі сегмент жүріп, содан кейін жақын деңгейде айқасады; сондықтан қарсы жақтағы сезім бұзылысының жоғарғы шекарасы ошақтан төмен болуы мүмкін. Үлгі зақым сегментіндегі төменгі мотонейрон белгілерін, түбіршек белгілерін, вегетативтік бұзылыстарды және рефлекстердің уақыт бойынша өзгерісін көрсетпейді."
      ],
      [
        "A: пирамидалар айқасуынан төмен оң жұлын жолы зақымданса, әлсіздік негізінен оң жақта болады. Б: айқасудан жоғары оң ішкі капсула зақымданса, әлсіздік негізінен сол жақта болады. Нақты белгілер ошақ көлеміне, көрші құрылымдарға және уақытқа тәуелді.",
        "Сезімтал айқасудан төмен оң артқы бағанның зақымы оң жақтағы діріл/буын қалпы сезімін, ал айқасудан жоғары оң медиалдық ілмектің зақымы негізінен дененің сол жағындағы сезімдерді бұзады. Бұл — жоғарылаушы сезімтал жолдар; олардың латералдылығын төмендеуші қозғалыс жолына қолдануға болмайды."
      ],
      [
        "Дірілді камертонмен; буын қалпын көз жұмулы кезде саусақты пассивті қозғалту бағытын анықтаумен; ауырсынуды қауіпсіз шаншу, температураны қауіпсіз жылы/салқын тітіркендіргішпен; қозғалысты бұлшықет күші мен берілген қимылды орындау арқылы тексереді. Екі жақтағы сәйкес аймақтар мен ықтимал сегменттік шекараны салыстырып, зейін мен ынтымақтастықты ескеру қажет.",
        "Жеңіл жанасу бірнеше жол арқылы берілуі мүмкін, сондықтан ол жалғыз өзі артқы бағандардың бүтіндігін дәлелдемейді. Оқу үлгісі ошақтың дәл деңгейін, себебін немесе диагнозын анықтамайды; анамнез, толық неврологиялық тексеру және көрсетілім бойынша қосымша зерттеу қажет."
      ]
    ],
    response: "Сіздің болжамыңыз, физиологиялық механизм және қорытындының шектеулері",
    criteria: [
      "Жоғарылаушы сезімтал және төмендеуші қозғалыс жолдарын ажыраттым.",
      "Артқы баған талшықтарының сопақша мида айқасатынын көрсеттім.",
      "Антеролатералдық талшықтардың жұлында айқасатынын және сегменттік айырмашылықты ескердім.",
      "Пирамидалар айқасуын көрсетіп, оның жоғарысы/төменіндегі әлсіздік жағын болжадым.",
      "Әртүрлі клиникалық сынаманы таңдадым және сызба бойынша диагноз қоймадым."
    ]
  }
};

export function createModuleEightPractice(language: Language, base: PracticeLesson): PracticeLesson {
  const copy = data[language];
  return {
    ...base,
    sections: [
      ...copy.prompts.map((prompt, i) => ({
        title: copy.titles[i],
        blocks: [
          { type: "paragraph" as const, text: prompt },
          { type: "response" as const, label: copy.response },
          { type: "answer" as const, items: copy.answers[i] }
        ]
      })),
      {
        title: copy.titles[4],
        blocks: [{ type: "checklist" as const, items: copy.criteria }]
      }
    ]
  };
}
