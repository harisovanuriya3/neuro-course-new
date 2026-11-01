import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { QuestionsLesson } from "../study";

// Module 8 / questions: five authored localization exercises with model feedback.
// Cross-checked with Library originals:
// Guyton & Hall 13e, PDF pp. 584–586 and 677–678;
// Ganong 23e, PDF pp. 185–187 and 254–255;
// C. L. Ghai Practical Physiology 8e, PDF pp. 324–327.
// Patterns below assume restricted lesions; real neurological signs require
// examination and corroborating investigations, not a single tract inference.
type Target = "theory" | "practice" | "clinical" | "cases";
type Entry = { prompt: string; explanation: string; section: Target };
type Five = readonly [Entry, Entry, Entry, Entry, Entry];

const questions: Record<Language, Five> = {
  RU: [
    {
      prompt: "При ограниченном поражении правого заднего столба на уровне Th8 пациент хуже ощущает вибрацию и положение правой стопы. Почему нарушение находится справа и где в норме перекрещиваются волокна этого пути?",
      explanation: "Аксоны первых нейронов вибрации и сознательной проприоцепции поднимаются в заднем столбе своей стороны до тонкого и клиновидного ядер продолговатого мозга. Аксоны вторых нейронов перекрещиваются в каудальной части продолговатого мозга и образуют медиальную петлю. Поэтому поражение правого заднего столба ниже перекрёста даёт преимущественно правосторонний дефицит ниже очага. Для локализации проверяют также другие модальности и уровень поражения.",
      section: "theory"
    },
    {
      prompt: "После ограниченного повреждения левого антеролатерального канатика грудного отдела ослаблено ощущение укола и температуры справа ниже очага. Почему дефицит противоположный и почему он может начинаться не точно на уровне повреждения?",
      explanation: "Ноцицептивные и температурные афференты переключаются в заднем роге. Часть первичных волокон проходит один-два сегмента в тракте Лиссауэра; аксоны вторых нейронов перекрещиваются в передней белой спайке близ уровня входа и затем восходят на противоположной стороне. Поэтому левосторонний очаг антеролатеральной системы может нарушать боль и температуру справа, часто начиная на несколько сегментов ниже. Точная граница зависит от протяжённости и характера очага.",
      section: "practice"
    },
    {
      prompt: "После травмы правой половины спинного мозга на уровне Th10 у пациента нарушено чувство положения правой ноги и снижена болевая чувствительность левой ноги. Какая комбинация проводниковых повреждений объясняет это и достаточно ли двух симптомов для диагноза?",
      explanation: "Справа ниже очага могут страдать неперекрещённые волокна задних столбов, а слева — боль и температура из-за повреждения уже перекрещённых справа антеролатеральных волокон. Такая диссоциация согласуется с синдромом гемипоражения спинного мозга, но не доказывает полный синдром Броун-Секара: нужно оценить двигательную функцию, сегментарные признаки, точные уровни и визуализацию.",
      section: "cases"
    },
    {
      prompt: "Сравните два изолированных поражения: левую заднюю ножку внутренней капсулы и левый латеральный корково-спинномозговой тракт в грудном отделе. На какой стороне преимущественно ожидается слабость произвольных движений в каждом случае и почему?",
      explanation: "Большинство корково-спинномозговых волокон пересекается в пирамидном перекрёсте каудальной части продолговатого мозга. Поэтому левый очаг внутренней капсулы выше перекрёста преимущественно нарушает движения справа, а левый латеральный тракт в спинном мозге ниже перекрёста — слева. Сила и характер дефицита зависят от объёма поражения и участия других нисходящих путей.",
      section: "theory"
    },
    {
      prompt: "У пациента сохранено ощущение лёгкого прикосновения, но снижены вибрация и определение положения пальца ноги. Можно ли считать задние столбы неповреждёнными? Какие пробы нужно повторить с закрытыми глазами и с двух сторон?",
      explanation: "Нет. Лёгкое прикосновение передаётся несколькими восходящими системами и само по себе не исключает поражения задних столбов. Сравните вибрацию камертоном, пассивное перемещение пальца вверх/вниз при закрытых глазах, различительное осязание, укол и температуру на обеих сторонах; оцените воспроизводимость и периферические причины дефицита. Одного признака недостаточно для точной локализации.",
      section: "clinical"
    }
  ],
  EN: [
    {
      prompt: "A restricted right dorsal-column lesion at T8 reduces vibration and joint-position sense in the right foot. Why is the deficit ipsilateral, and where do fibers of this pathway normally cross?",
      explanation: "First-order axons carrying vibration and conscious proprioception ascend ipsilaterally in the dorsal columns to the gracile and cuneate nuclei of the medulla. Second-order axons decussate in the caudal medulla and form the medial lemniscus. A right dorsal-column lesion below that crossing therefore mainly affects right-sided sensation below the lesion. Other modalities and the lesion level must also be examined.",
      section: "theory"
    },
    {
      prompt: "A restricted left thoracic anterolateral cord lesion impairs pinprick and temperature sensation on the right below the lesion. Why is the deficit contralateral, and why may it begin below rather than exactly at the injury level?",
      explanation: "Pain- and temperature-related afferents relay in the dorsal horn. Some primary axons travel one or two segments in Lissauer's tract; second-order axons cross in the anterior white commissure near entry level and ascend contralaterally. Thus a left anterolateral lesion may impair pain and temperature on the right, often beginning several segments below the injury. The exact border varies with lesion extent and anatomy.",
      section: "practice"
    },
    {
      prompt: "After a right-sided spinal cord injury at T10, a patient has reduced joint-position sense in the right leg and reduced pain sensation in the left leg. Which pathways account for this pattern, and do these two signs prove a complete hemicord syndrome?",
      explanation: "A right lesion can interrupt uncrossed right dorsal-column fibers and right anterolateral fibers that have already crossed from the left. This dissociated pattern is compatible with a hemicord lesion, but two signs alone do not establish complete Brown-Séquard syndrome. Examine strength, segmental findings, sensory levels and imaging before assigning a precise diagnosis.",
      section: "cases"
    },
    {
      prompt: "Compare an isolated lesion in the left posterior limb of the internal capsule with a lesion of the left lateral corticospinal tract in the thoracic cord. Which side predominantly develops impaired voluntary movement in each case, and why?",
      explanation: "Most corticospinal fibers cross at the pyramidal decussation in the caudal medulla. A left internal-capsule lesion above the crossing therefore mainly affects movement on the right, while a left lateral corticospinal lesion below the crossing mainly affects the left. Severity and pattern depend on lesion extent and other descending pathways.",
      section: "theory"
    },
    {
      prompt: "A patient detects light touch but has impaired vibration and great-toe position sense. Does preserved light touch exclude a dorsal-column lesion? Which tests should be repeated bilaterally with the eyes closed?",
      explanation: "No. Light touch can travel through more than one ascending pathway and cannot independently exclude dorsal-column damage. Compare tuning-fork vibration, passive toe-up/toe-down position sense with eyes closed, discriminative touch, pinprick and temperature bilaterally; check consistency and peripheral causes. No single result gives a definitive lesion level.",
      section: "clinical"
    }
  ],
  KZ: [
    {
      prompt: "Th8 деңгейінде оң артқы бағанның шектелген зақымынан кейін науқастың оң табанында дірілді және буын қалпын сезуі төмендеді. Неліктен бұзылыс оң жақта байқалады және бұл жолдың талшықтары қалыптыда қай жерде айқасады?",
      explanation: "Діріл мен саналы проприоцепцияны өткізетін бірінші нейрон аксондары өз жағындағы артқы бағандармен сопақша мидың нәзік және сына тәрізді ядроларына дейін көтеріледі. Екінші нейрон аксондары сопақша мидың каудалдық бөлігінде айқасып, медиалдық ілмекті түзеді. Сондықтан айқасудан төмен оң артқы баған зақымданса, ошақтан төмен сезімталдық негізінен оң жақта бұзылады. Локализация үшін басқа сезімталдық түрлерін де тексеру қажет.",
      section: "theory"
    },
    {
      prompt: "Кеуде бөліміндегі сол антеролатералдық жол шектеліп зақымданған соң, оң жақта ошақтан төмен шаншуды және температураны сезу төмендеді. Неліктен бұзылыс қарсы жақта және неге ол зақым деңгейінен төменірек басталуы мүмкін?",
      explanation: "Ауырсыну мен температура афференттері жұлынның артқы мүйізінде синапс түзеді. Кейбір бірінші нейрон талшықтары Лиссауэр жолымен бір-екі сегмент жүріп, екінші нейрон аксондары кірген деңгейге жақын алдыңғы ақ комиссурада айқасады да, қарсы жақпен көтеріледі. Сондықтан сол антеролатералдық жолдың зақымы оң жақта ауырсыну мен температура сезімін, кейде ошақтан бірнеше сегмент төменірек бастап, бұзуы мүмкін. Нақты шекара зақымның көлеміне байланысты.",
      section: "practice"
    },
    {
      prompt: "Th10 деңгейінде жұлынның оң жартысы жарақаттанғаннан кейін оң аяқта буын қалпын сезу, ал сол аяқта ауырсынуды сезу төмендеді. Бұл белгілерді қандай жолдардың зақымы түсіндіреді және екі белгі толық гемисекция диагнозын дәлелдей ме?",
      explanation: "Оң жақтағы айқаспаған артқы баған талшықтары және сол жақтан айқасып келген оң антеролатералдық жол талшықтары зақымдануы мүмкін. Бұл диссоциация жұлынның жартылай зақымдануымен үйлеседі, бірақ екі белгі Броун-Секар синдромының толық көрінісін дәлелдемейді. Қозғалыс күшін, сегменттік белгілерді, сезімталдық деңгейлерін және бейнелеу деректерін бірге бағалау керек.",
      section: "cases"
    },
    {
      prompt: "Екі оқшау зақымды салыстырыңыз: ішкі капсуланың артқы аяқшасының сол жақ зақымы және кеуде деңгейіндегі сол латералдық қыртыс-жұлын жолының зақымы. Әр жағдайда ерікті қозғалыс қай жақта басым бұзылады және неліктен?",
      explanation: "Қыртыс-жұлын талшықтарының көпшілігі сопақша мидың каудалдық бөлігіндегі пирамидалық айқасуда қарсы жаққа өтеді. Сондықтан айқасудан жоғары сол ішкі капсула зақымы көбіне оң жақ қозғалысын, ал айқасудан төмен жұлындағы сол латералдық жол зақымы көбіне сол жақ қозғалысын бұзады. Бұзылыстың дәрежесі мен сипаты зақым көлеміне және басқа төмендеуші жолдарға байланысты.",
      section: "theory"
    },
    {
      prompt: "Науқас жеңіл жанасуды сезеді, бірақ дірілді және аяқтың бас бармағының қалпын анықтауы нашарлаған. Бұл артқы бағандардың сау екенін дәлелдей ме? Көзін жұмып, екі жақта қандай сынақтарды қайталау керек?",
      explanation: "Жоқ. Жеңіл жанасу бірнеше жоғарылаушы жүйе арқылы берілуі мүмкін, сондықтан оның сақталуы артқы баған зақымын жоққа шығармайды. Екі жақта камертонмен дірілді, көз жұмулы кезде башпайды жоғары-төмен пассивті қозғағанда оның қалпын, ажыратушы жанасуды, шаншуды және температураны салыстырыңыз; нәтижелердің тұрақтылығын және шеткі жүйке зақымын бағалаңыз. Бір белгі ошақ деңгейін нақты анықтамайды.",
      section: "clinical"
    }
  ]
};

export function createModuleEightQuestions(language: Language): QuestionsLesson {
  return {
    kind: "questions",
    title: getSectionTitle("questions", language),
    introduction: language === "RU"
      ? "Пять клинико-физиологических вопросов: сначала определите модальность, сторону и уровень перекрёста, затем сравните ответ с разбором."
      : language === "EN"
        ? "Five clinical-physiology questions: identify modality, side and crossing level before comparing your answer with the explanation."
        : "Бес клиникалық-физиологиялық сұрақ: алдымен сезімталдық түрін, жақты және айқасу деңгейін анықтап, кейін жауапты түсіндірмемен салыстырыңыз.",
    questions: questions[language].map(({ prompt, explanation, section }, index) => ({
      id: "module-8-question-" + (index + 1),
      prompt, explanation, target: { section }
    }))
  };
}
