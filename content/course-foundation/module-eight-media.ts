import type { Language } from "../types";
import type { MediaLesson } from "../media";

// Qualitative sensory-pathway teaching schematic; not a patient recording.
// Physiology: Guyton & Hall 13e ch. 48; Ganong 23e ch. 11;
// C. L. Ghai Practical Physiology 8e, sensory examination.
const copy = {
  RU: {
    title: "Два пути — два уровня перекрёста",
    introduction: "Пошаговая схема путей чувствительности туловища и конечностей. Она показывает типичные уровни перекрёста, но не является МРТ, записью нервной проводимости или диагностическим алгоритмом.",
    preview: "Проследите отдельно вибрацию и положение сустава, затем боль и температуру. До перехода к следующему этапу назовите сторону проведения и уровень перекрёста.",
    transcript: [
      "1. Для вибрации и сознательной проприоцепции первичный нейрон спинномозгового узла входит через задний корешок и поднимается по заднему столбу на той же стороне спинного мозга.",
      "2. В тонком или клиновидном ядре каудальной части продолговатого мозга находится первое центральное переключение этого пути; аксоны вторых нейронов пересекают среднюю линию как внутренние дугообразные волокна и формируют медиальную петлю.",
      "3. Для боли и температуры часть первичных волокон проходит один-два сегмента в тракте Лиссауэра и переключается в заднем роге. Аксоны вторых нейронов пересекают переднюю белую спайку вблизи уровня входа и поднимаются преимущественно на противоположной стороне в антеролатеральной системе.",
      "4. Оба пути имеют таламические проекции, в частности к VPL для туловища и конечностей, но антеролатеральная система включает также другие восходящие связи. Третьи нейроны таламуса проецируются в соматосенсорную кору.",
      "5. При ограниченном левостороннем поражении грудного отдела спинного мозга вибрация и положение могут снижаться слева ниже очага, а боль и температура — справа, обычно начиная несколько ниже уровня повреждения. Это качественный пример; он не определяет причину, точный сегмент или полный объём очага."
    ],
    prompt: "У пациента предполагают частичное левостороннее поражение грудного отдела спинного мозга. Какое сочетание ожидается при повреждении соответствующих восходящих путей?",
    options: [
      "Вибрация и боль обязательно выпадают только справа на одном уровне.",
      "Вибрация нарушается справа, а боль и температура слева ниже очага.",
      "Вибрация и положение преимущественно слева ниже очага; боль и температура преимущественно справа, часто начиная на несколько сегментов ниже.",
      "Все виды чувствительности обязательно сохраняются, потому что оба пути перекрещиваются только в коре."
    ],
    feedback: [
      "У путей разные уровни перекрёста, поэтому обязательного совпадения стороны и уровня нет.",
      "Стороны перепутаны для ограниченного левого спинального очага ниже бульбарного перекрёста задних столбов.",
      "Верно: задние столбы в спинном мозге ещё ипсилатеральны, а антеролатеральный путь уже преимущественно контралатерален.",
      "Перекрёст задних столбов происходит в продолговатом мозге, боле-температурного пути — в спинном мозге."
    ],
    explanation: "Это учебная закономерность при поражении соответствующих трактов: задние столбы перекрещиваются в продолговатом мозге, а боле-температурные волокна — сегментарно в спинном мозге. Точное клиническое распределение зависит от уровня, протяжённости и характера повреждения."
  },
  EN: {
    title: "Two pathways, two levels of crossing",
    introduction: "A stepwise schematic of sensory pathways from trunk and limbs. It illustrates typical decussations, not an MRI scan, nerve-conduction recording or diagnostic algorithm.",
    preview: "Trace vibration and joint position separately from pain and temperature. Before each step, predict the side of ascent and where the fibers cross.",
    transcript: [
      "1. For vibration and conscious proprioception, a dorsal-root-ganglion first-order neuron enters through the dorsal root and ascends ipsilaterally in the spinal dorsal columns.",
      "2. The first central relay is in the gracile or cuneate nucleus of the caudal medulla. Second-order axons cross as internal arcuate fibers and form the medial lemniscus.",
      "3. Some primary pain-temperature afferents travel one or two segments in Lissauer's tract before synapsing in the dorsal horn. Second-order axons cross in the anterior white commissure near entry level and ascend mainly contralaterally in the anterolateral system.",
      "4. Both pathways project to thalamic targets, notably VPL for trunk and limbs, but the anterolateral system also has additional ascending connections. Thalamic third-order neurons project to somatosensory cortex.",
      "5. With a restricted left thoracic spinal lesion, vibration and position sense may be impaired on the left below the lesion, while pain and temperature may be impaired on the right, typically beginning somewhat below the injury. This qualitative example cannot establish etiology, exact segment or lesion extent."
    ],
    prompt: "A partial left thoracic spinal-cord lesion is suspected. Which pattern is expected if the relevant ascending pathways are affected?",
    options: [
      "Vibration and pain must both be lost on the right at exactly the same level.",
      "Vibration is lost on the right and pain-temperature on the left below the lesion.",
      "Vibration and position are mainly impaired on the left below the lesion; pain-temperature mainly on the right, often beginning a few segments below.",
      "All modalities must remain intact because both pathways cross only in cerebral cortex."
    ],
    feedback: [
      "The pathways cross at different levels, so their sides and sensory levels need not match.",
      "The sides are reversed for a restricted left spinal lesion below the dorsal-column decussation.",
      "Correct: dorsal columns remain ipsilateral in the cord, whereas the anterolateral pathway has mainly crossed.",
      "Dorsal-column fibers cross in the medulla; pain-temperature fibers cross within the spinal cord."
    ],
    explanation: "This is an educational pattern when the corresponding tracts are affected: dorsal-column fibers cross in the medulla, whereas pain-temperature second-order axons cross segmentally in the spinal cord. The exact distribution depends on lesion level, extent and mechanism."
  },
  KZ: {
    title: "Екі жол — айқасудың екі деңгейі",
    introduction: "Тұлға мен аяқ-қол сезімталдығы жолдарының кезеңдік оқу сызбасы. Ол әдеттегі айқасу деңгейлерін көрсетеді, бірақ МРТ, жүйке өткізгіштігінің жазбасы немесе диагноз қою алгоритмі емес.",
    preview: "Діріл мен буын қалпы сезімін ауырсыну және температура сезімінен бөлек қадағалаңыз. Әр кезеңге өтпес бұрын өткізілетін жақты және айқасу деңгейін болжаңыз.",
    transcript: [
      "1. Діріл мен саналы проприоцепцияның бірінші нейроны жұлын түйінінде орналасады; оның өсіндісі артқы түбір арқылы кіріп, жұлынның артқы бағанымен өз жағында жоғары көтеріледі.",
      "2. Бірінші орталық синапс сопақша мидың каудалдық бөлігіндегі нәзік немесе сына тәрізді ядрода орналасады. Екінші нейрондардың аксондары ішкі доға тәрізді талшықтар түрінде айқасып, медиалдық ілмекті түзеді.",
      "3. Ауырсыну мен температураның кейбір бірінші афференттері артқы мүйізде синапс түзер алдында Лиссауэр жолында бір-екі сегментке өтеді. Екінші нейрон аксондары кірген деңгейге жақын алдыңғы ақ комиссурада айқасып, антеролатералдық жүйемен көбіне қарсы жақта жоғары көтеріледі.",
      "4. Екі жол да таламусқа, соның ішінде тұлға мен аяқ-қол үшін VPL ядросына проекция береді, бірақ антеролатералдық жүйенің басқа да жоғарылаушы байланыстары бар. Таламустың үшінші нейрондары соматосенсорлық қыртысқа барады.",
      "5. Жұлынның кеуде бөлімінің сол жағындағы шектелген зақымда діріл мен буын қалпы сезімі ошақтан төмен сол жақта, ал ауырсыну мен температура оң жақта, көбіне зақым деңгейінен бірнеше сегмент төменірек бұзылуы мүмкін. Бұл сапалық мысал себепті, нақты сегментті немесе зақым көлемін анықтамайды."
    ],
    prompt: "Жұлынның кеуде бөлімінің сол жағындағы жартылай зақым күдікті. Тиісті жоғарылаушы жолдар зақымданса, қандай өзгеріс күтіледі?",
    options: [
      "Діріл мен ауырсыну міндетті түрде бір деңгейде тек оң жақта жоғалады.",
      "Діріл оң жақта, ал ауырсыну мен температура ошақтан төмен сол жақта бұзылады.",
      "Діріл мен буын қалпы көбіне ошақтан төмен сол жақта, ал ауырсыну мен температура көбіне оң жақта, жиі бірнеше сегмент төменірек бұзылады.",
      "Екі жол да тек ми қыртысында айқасатындықтан, барлық сезім түрлері міндетті түрде сақталады."
    ],
    feedback: [
      "Жолдар әртүрлі деңгейде айқасады; бұзылыстың жағы мен деңгейі міндетті түрде сәйкес келмейді.",
      "Артқы бағандардың айқасуынан төмен орналасқан сол жақ жұлын ошағы үшін жақтар ауыстырылған.",
      "Дұрыс: артқы бағандар жұлында өз жағымен өтеді, ал антеролатералдық жол негізінен қарсы жаққа өткен.",
      "Артқы баған талшықтары сопақша мида, ал ауырсыну мен температура жолы жұлында айқасады."
    ],
    explanation: "Тиісті жолдар зақымданғандағы оқу заңдылығы: артқы баған талшықтары сопақша мида, ал ауырсыну мен температураның екінші нейрон аксондары жұлында сегменттік деңгейде айқасады. Нақты таралу зақым деңгейіне, көлеміне және механизміне байланысты."
  }
} as const;

export function createModuleEightMedia(language: Language, base: MediaLesson): MediaLesson {
  const c = copy[language];
  const block = base.blocks[0];
  if (!block) throw new Error("Module 8 media base block missing");
  return {
    ...base,
    introduction: c.introduction,
    blocks: [{
      ...block,
      id: "module-8-sensory-crossings",
      title: c.title,
      preview: c.preview,
      transcript: [...c.transcript],
      theoryAnchor: "dorsal-column-medial-lemniscus",
      animation: "foundation",
      question: {
        prompt: c.prompt,
        correctAnswer: "c",
        explanation: c.explanation,
        options: c.options.map((text, i) => ({
          id: ["a", "b", "c", "d"][i],
          text,
          feedback: c.feedback[i]
        }))
      }
    }]
  };
}
