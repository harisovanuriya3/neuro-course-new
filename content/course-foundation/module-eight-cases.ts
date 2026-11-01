import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Module 8: authored somatosensory and corticospinal pathway localization.
// Physiological source cross-check (user Library):
// Guyton & Hall 13e, PDF pp. 584–585 and 677–678;
// Ganong 23e, PDF pp. 185–187 and 254–255;
// C. L. Ghai Practical Physiology 8e, PDF pp. 324–328.
// These are simplified teaching vignettes, NOT diagnostic algorithms.
type CaseCopy = {
  title: string;
  situation: string;
  questions: [string, string, string];
  explanation: [string, string];
};
type Copy = { introduction: string; cases: [CaseCopy, CaseCopy, CaseCopy] };
const copy: Record<Language, Copy> = {
  RU: {
    introduction: "Три самостоятельные клинические задачи. Сначала укажите модальность и сторону дефицита, затем место перекрёста и ограничения локализации. Это учебные модели, не диагнозы.",
    cases: [
      {
        title: "1. Правостороннее частичное поражение грудного отдела спинного мозга",
        situation: "Учебная модель: после очагового повреждения правой половины грудного отдела спинного мозга ниже очага слабее точные произвольные движения правой ноги и снижены вибрация и чувство положения справа. Боль и температура преимущественно снижены слева, начиная несколько ниже очага. Чувствительность лица не изменена.",
        questions: [
          "Разделите признаки на двигательные, заднестолбовые и антеролатеральные. Укажите сторону каждого дефицита.",
          "Где перекрещиваются латеральный корково-спинномозговой путь, заднестолбовая система и волокна боли/температуры? Объясните латерализацию.",
          "Почему верхняя граница утраты боли может располагаться ниже очага? Что требуется проверить, прежде чем делать клинический вывод?"
        ],
        explanation: [
          "Большинство корково-спинномозговых волокон перекрещивается в каудальной продолговатой части мозга, поэтому ниже перекрёста правый спинальный очаг может вызвать правостороннюю слабость. Волокна вибрации и сознательной проприоцепции идут в задних столбах на своей стороне до ядер продолговатого мозга; правый очаг вызывает преимущественно правостороннее снижение этих модальностей.",
          "Волокна боли и температуры переключаются в заднем роге, а аксоны вторых нейронов переходят на противоположную сторону через переднюю белую спайку вблизи сегмента входа. Некоторые афференты проходят один-два сегмента в тракте Лиссауэра, поэтому контралатеральный дефицит может начинаться ниже очага. Реальные очаги часто неполные: требуются сегментарное обследование, рефлексы, сила, анамнез и при показаниях визуализация."
        ]
      },
      {
        title: "2. Одинаковая сторона очага — разная сторона двигательной слабости",
        situation: "Сравните два условных изолированных очага: A — правый латеральный корково-спинномозговой тракт на грудном уровне; Б — правый задний отдел внутренней капсулы. В обоих случаях нужно предсказать сторону преимущественной слабости конечностей. Отдельно дан правый задний столб спинного мозга и правая медиальная петля.",
        questions: [
          "Для A и Б укажите ожидаемую сторону двигательного дефицита и объясните различие относительно пирамидного перекрёста.",
          "Для правого заднего столба и правой медиальной петли укажите сторону тела, от которой преимущественно идёт информация о вибрации/положении.",
          "Почему нельзя переносить правило латерализации двигательного пути на сенсорную систему без указания уровня её перекрёста?"
        ],
        explanation: [
          "Очаг A расположен ниже пирамидного перекрёста: ожидается преимущественно ипсилатеральная (правая) слабость. Очаг Б расположен выше него: преимущественно контралатеральная (левая) слабость. Это относится к выбранному корково-спинномозговому пути, а не ко всем возможным моторным системам.",
          "Правый задний столб проводит преимущественно правостороннюю вибрацию и положение от туловища/конечностей до чувствительного перекрёста в продолговатом мозге. Правая медиальная петля выше перекрёста несёт преимущественно левостороннюю информацию. Изолированные очаги — упрощение; клиническая картина зависит от соседних путей и объёма поражения."
        ]
      },
      {
        title: "3. Сохранность лёгкого прикосновения не исключает нарушения задних столбов",
        situation: "Пациент с закрытыми глазами плохо определяет направление пассивного движения пальца ноги и слабее ощущает вибрацию камертона на стопе, но замечает лёгкое прикосновение ватой. Боль и температура на этой стопе сохранены. Одного этого набора данных недостаточно для определения причины.",
        questions: [
          "Какие модальности нарушены, а какие сохранены? С какой системой преимущественно связаны нарушенные модальности?",
          "Почему сохранное лёгкое прикосновение не доказывает целость задних столбов?",
          "Какое обследование поможет различить центральное проводниковое нарушение и периферическую нейропатию, не ставя диагноз по одной пробе?"
        ],
        explanation: [
          "Вибрация и сознательное чувство положения преимущественно зависят от заднестолбово-медиальнопетлевой системы. Лёгкое прикосновение имеет перекрывающиеся пути передачи; его сохранность сама по себе не подтверждает целость задних столбов. Боль и температура преимущественно связаны с антеролатеральной системой.",
          "Сопоставьте обе стороны и уровни: вибрацию камертоном, направление пассивного движения пальца, боль и температуру безопасными стимулами, силу, рефлексы, распределение по нервам и корешкам. Периферическое поражение крупных волокон тоже может нарушать вибрацию и положение; необходимы анамнез и полный неврологический осмотр."
        ]
      }
    ]
  },
  EN: {
    introduction: "Three independent clinical reasoning cases. First identify modality and side, then crossing point and limits of localization. These are teaching models, not diagnoses.",
    cases: [
      {
        title: "1. Partial right-sided thoracic spinal cord lesion",
        situation: "Teaching model: after a focal injury to the right half of the thoracic cord, skilled voluntary movement of the right leg and right-sided vibration and joint-position sense are reduced below the lesion. Pain and temperature are predominantly reduced on the left beginning somewhat below the lesion. Facial sensation is unchanged.",
        questions: [
          "Separate motor, dorsal-column and anterolateral findings. State the side of each deficit.",
          "Where do the lateral corticospinal, dorsal-column–medial-lemniscal and pain-temperature pathways cross? Explain the laterality.",
          "Why might the upper boundary of pain loss be below the lesion? What should be examined before a clinical conclusion?"
        ],
        explanation: [
          "Most corticospinal fibers cross in the caudal medulla, so a right-sided spinal lesion below the crossing may cause right-sided weakness. Vibration and conscious position signals ascend ipsilaterally in the dorsal columns until the medullary nuclei; a right cord lesion therefore mainly impairs these modalities on the right.",
          "Pain-temperature fibers synapse in the dorsal horn, and second-order axons cross in the anterior white commissure near the entry level. Some afferents travel one or two segments in Lissauer's tract; contralateral loss can begin below the lesion. Real lesions are often incomplete: examine segmental signs, reflexes, strength and history; use imaging when indicated."
        ]
      },
      {
        title: "2. Same lesion side, opposite patterns of weakness",
        situation: "Compare two hypothetical isolated lesions: A — the right lateral corticospinal tract at thoracic spinal level; B — the right posterior limb of the internal capsule. Predict the predominant side of limb weakness in each. Separately consider the right dorsal column of the cord and the right medial lemniscus.",
        questions: [
          "For A and B, predict the side of weakness and explain their positions relative to the pyramidal decussation.",
          "For the right dorsal column and right medial lemniscus, state the side of the body supplying vibration and position information.",
          "Why must motor laterality rules not be applied to sensory pathways without locating their crossings?"
        ],
        explanation: [
          "A is below the pyramidal decussation and therefore mainly produces ipsilateral (right) weakness. B is above it and therefore mainly produces contralateral (left) weakness. This reasoning concerns the selected corticospinal tract, not every motor pathway.",
          "The right dorsal column carries predominantly right-sided vibration and position signals from trunk and limbs before the sensory crossing in the medulla. The right medial lemniscus above that crossing carries predominantly left-sided information. Isolated lesions simplify real clinical patterns, which depend on lesion size and adjacent tracts."
        ]
      },
      {
        title: "3. Preserved light touch does not prove intact dorsal columns",
        situation: "With eyes closed, a patient poorly identifies the direction of passive toe movement and perceives tuning-fork vibration less well at the foot, yet detects a light cotton touch. Pain and temperature at that foot are preserved. These findings alone cannot establish the cause.",
        questions: [
          "Which modalities are affected and which are preserved? Which system predominantly carries the affected modalities?",
          "Why does preserved light touch not prove dorsal-column integrity?",
          "Which examination findings could help distinguish a central tract lesion from peripheral neuropathy without diagnosing from one test?"
        ],
        explanation: [
          "Vibration and conscious joint-position sense depend mainly on the dorsal-column–medial-lemniscal system. Light touch has overlapping ascending pathways; its preservation alone does not prove dorsal-column integrity. Pain and temperature depend mainly on anterolateral pathways.",
          "Compare both sides and levels: tuning-fork vibration, passive joint-movement direction, safe pain and temperature testing, strength, reflexes, and nerve/root distributions. Peripheral large-fiber disease can also impair vibration and position; history and a complete neurological examination are needed."
        ]
      }
    ]
  },
  KZ: {
    introduction: "Үш дербес клиникалық жағдай. Алдымен бұзылған сезімталдық түрін және жағын, кейін айқасу деңгейін және локализация шектеулерін анықтаңыз. Бұлар диагноз емес, оқу модельдері.",
    cases: [
      {
        title: "1. Жұлынның кеуде бөлімінің оң жақты жартылай зақымдануы",
        situation: "Оқу моделі: жұлынның кеуде бөлімінің оң жартысы ошақты зақымданғаннан кейін зақымнан төмен оң аяқтың дәл ерікті қозғалысы, оң жақтағы діріл мен буын қалпын сезу төмендеген. Ауырсыну мен температура сезімі көбіне сол жақта, ошақтан сәл төменірек деңгейден бастап әлсіреген. Бет сезімталдығы өзгермеген.",
        questions: [
          "Қозғалыс, артқы баған және антеролатералдық жүйе белгілерін ажыратып, әр бұзылыстың жағын атаңыз.",
          "Латералды кортикоспиналдық жол, артқы баған–медиалдық ілмек жүйесі және ауырсыну-температура жолдары қай жерде айқасады? Жақтардың айырмасын түсіндіріңіз.",
          "Ауырсыну сезімінің жоғарғы шекарасы неге ошақтан төмен болуы мүмкін? Клиникалық қорытындыға дейін нені тексеру керек?"
        ],
        explanation: [
          "Кортикоспиналдық талшықтардың көбі сопақша мидың каудалдық бөлігінде айқасады, сондықтан осы айқасудан төмен орналасқан оң жақ жұлын ошағы оң жақтағы әлсіздікке әкелуі мүмкін. Діріл мен саналы проприоцепция ақпараты сопақша мидағы ядроларға дейін артқы бағанмен өз жағында көтеріледі; оң жақ ошақ бұл сезімдерді негізінен оң жақта төмендетеді.",
          "Ауырсыну мен температура афференттері жұлынның артқы мүйізінде синапс түзеді, ал екінші нейрондардың аксондары кірген сегментке жақын жерде алдыңғы ақ комиссура арқылы айқасады. Кейбір афференттер Лиссауэр жолымен бір-екі сегмент өтеді, сондықтан қарама-қарсы жақтағы бұзылыс ошақтан төмен басталуы мүмкін. Нақты зақымдар жиі толық емес: сегменттік белгілерді, рефлекстерді, күшті және анамнезді бағалап, көрсетілім болса бейнелеу зерттеуін жүргізу қажет."
        ]
      },
      {
        title: "2. Ошақ жағы бірдей, бірақ әлсіздік жағы әртүрлі",
        situation: "Екі шартты оқшау зақымды салыстырыңыз: А — кеуде деңгейіндегі оң латералды кортикоспиналдық жол; Б — ішкі капсуланың оң артқы аяғы. Екі жағдайда аяқ-қол әлсіздігінің басым жағын болжаңыз. Оған қоса жұлынның оң артқы бағанын және оң медиалдық ілмекті салыстырыңыз.",
        questions: [
          "А және Б үшін әлсіздік жағын атаңыз; пирамидалық айқасуға қатысты орналасуының маңызын түсіндіріңіз.",
          "Оң артқы баған мен оң медиалдық ілмек дененің қай жағынан діріл және буын қалпы туралы ақпарат жеткізеді?",
          "Сезімталдық жолының айқасу деңгейін көрсетпей, қозғалыс жолының латерализация ережесін неге қолдануға болмайды?"
        ],
        explanation: [
          "А ошағы пирамидалық айқасудан төмен, сондықтан әлсіздік негізінен өз жағында (оң жақта) болады. Б ошағы айқасудан жоғары, сондықтан әлсіздік көбіне қарама-қарсы жақта (сол жақта) болады. Бұл қорытынды барлық қозғалыс жолына емес, таңдалған кортикоспиналдық жолға қатысты.",
          "Оң артқы баған сезімталдық айқасуына дейін дене мен аяқ-қолдың көбіне оң жағынан діріл және буын қалпы ақпаратын жеткізеді. Айқасудан жоғары оң медиалдық ілмек көбіне сол жақтан ақпарат тасиды. Оқшау ошақтар — оңайлатылған модель; нақты белгілер зақым көлемі мен көрші жолдарға тәуелді."
        ]
      },
      {
        title: "3. Жеңіл жанасудың сақталуы артқы бағанның бүтіндігін дәлелдемейді",
        situation: "Көзі жұмулы пациент аяқ башпайының пассивті қозғалыс бағытын нашар ажыратады және табандағы камертон дірілін әлсіз сезеді, бірақ мақтамен жеңіл жанасуды байқайды. Сол табанда ауырсыну мен температура сезімі сақталған. Бұл мәліметтер себепті анықтауға жеткіліксіз.",
        questions: [
          "Қандай сезімталдық түрлері бұзылған, қайсысы сақталған? Бұзылған түрлер негізінен қай жүйемен байланысты?",
          "Жеңіл жанасудың сақталуы неге артқы бағандардың бүтіндігін дәлелдемейді?",
          "Бір сынамаға қарап диагноз қоймай, орталық өткізгіш жолдың зақымын шеткі нейропатиядан ажыратуға қандай тексерулер көмектеседі?"
        ],
        explanation: [
          "Діріл мен буын қалпын саналы сезіну негізінен артқы баған–медиалдық ілмек жүйесіне тәуелді. Жеңіл жанасу ақпараты бірнеше қабаттасатын жолмен беріледі; оның сақталуы артқы бағандардың бүтіндігін өздігінен дәлелдемейді. Ауырсыну мен температура көбіне антеролатералдық жүйемен жеткізіледі.",
          "Екі жақ пен әр деңгейде камертон дірілін, буынның пассивті қозғалыс бағытын, қауіпсіз ауырсыну мен температура сынамаларын, бұлшықет күшін, рефлекстерді және жүйке/түбір аймақтарын салыстырыңыз. Шеткі ірі талшықтардың зақымы да діріл мен буын қалпын сезуді бұзуы мүмкін; анамнез бен толық неврологиялық тексеру қажет."
        ]
      }
    ]
  }
};

export function createModuleEightCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  const c = copy[language];
  const stageTitles = language === "RU"
    ? ["Выделите данные", "Укажите перекрёст и механизм", "Проверьте пределы вывода"]
    : language === "EN"
      ? ["Identify the findings", "Locate crossing and mechanism", "Test the limits of inference"]
      : ["Белгілерді анықтаңыз", "Айқасу мен тетікті көрсетіңіз", "Қорытынды шектеулерін тексеріңіз"];
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle,
    introduction: c.introduction,
    ui,
    cases: c.cases.map((item, i) => ({
      id: `m8-pathway-${i + 1}`,
      title: item.title,
      situation: item.situation,
      stages: item.questions.map((question, j) => ({ title: stageTitles[j], questions: [question] })),
      explanation: [...item.explanation]
    }))
  };
}
