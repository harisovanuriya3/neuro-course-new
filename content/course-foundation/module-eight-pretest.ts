import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 8: sensory and motor tract localization. Diagnostic (ungraded) questions.
// Source cross-check: Guyton & Hall 13e ch. 48 (PDF 584–586), ch. 56 (677–678);
// Ganong 23e ch. 11 (185–187), ch. 16 (254–255);
// Ghai Practical Physiology 8e, Clinical Examination (PDF 324–327).
// These simplified unilateral lesions teach pathways, not patient diagnosis.
type Choice = "a" | "b" | "c" | "d";
type Item = { prompt: string; options: [string, string, string, string]; answer: Choice; explanation: string };
type Locale = { intro: string; questions: [Item, Item, Item] };
const localized: Record<Language, Locale> = {
  RU: {
    intro: "Три диагностических вопроса о перекрёстах чувствительных и двигательных путей. Оценка не выставляется. После выбора ответа прочитайте механизм; локализация условного очага не заменяет клинический осмотр.",
    questions: [
      {
        prompt: "На учебной схеме показано изолированное поражение правого заднего столба спинного мозга на уровне Th8. Какой дефицит ниже очага ожидается в первую очередь?",
        options: [
          "Преимущественная утрата боли и температуры слева, начиная строго с уровня Th8.",
          "Нарушение вибрационной и суставно-мышечной чувствительности справа при относительной сохранности боли и температуры.",
          "Утрата вибрации слева, потому что волокна задних столбов перекрещиваются сразу при входе в спинной мозг.",
          "Двусторонняя полная утрата всех видов чувствительности при любом ограниченном повреждении заднего столба."
        ],
        answer: "b",
        explanation: "Волокна сознательной проприоцепции и вибрации поднимаются в задних столбах на своей стороне и перекрещиваются после переключения в ядрах тонкого и клиновидного пучков в каудальной части продолговатого мозга. Поэтому ограниченный правосторонний спинальный очаг преимущественно нарушает эти модальности справа ниже поражения. Болевые и температурные сигналы главным образом идут по антеролатеральной системе; клиническая картина зависит от объёма очага."
      },
      {
        prompt: "При условном изолированном повреждении левого антеролатерального пути спинного мозга на уровне Th8 какое изменение чувствительности наиболее вероятно?",
        options: [
          "Преимущественная утрата вибрации слева из-за перекрёста задних столбов на уровне Th8.",
          "Полная потеря всех ощущений справа точно на уровне Th8, без смещения границы.",
          "Нарушение тонкой моторики левой кисти как единственный обязательный признак.",
          "Снижение боли и температуры преимущественно справа, обычно начиная на несколько сегментов ниже очага."
        ],
        answer: "d",
        explanation: "Афференты боли и температуры переключаются в заднем роге, а аксоны вторых нейронов переходят через переднюю белую спайку в пределах нескольких спинальных сегментов и поднимаются контралатерально. Поэтому левый очаг антеролатерального пути может нарушить боль и температуру справа, причём верхняя граница дефицита не обязана совпадать с уровнем очага. Точная величина смещения и выраженность зависят от конкретного поражения."
      },
      {
        prompt: "Учебная модель: правый латеральный корково-спинномозговой тракт повреждён в спинном мозге ниже пирамидного перекрёста. Какой двигательный эффект наиболее ожидаем ниже очага?",
        options: [
          "Исключительно утрата болевой чувствительности слева без двигательного нарушения.",
          "Преимущественно слабость левых конечностей, потому что волокна латерального тракта перекрещиваются только в поясничном отделе.",
          "Нарушение произвольных движений преимущественно справа, особенно тонких дистальных движений; выраженность зависит от уровня и объёма повреждения.",
          "Полная симметричная утрата всех движений при любом частичном поражении одного тракта."
        ],
        answer: "c",
        explanation: "Большинство корково-спинномозговых аксонов перекрещивается в нижней части продолговатого мозга, затем идёт в латеральном канатике спинного мозга на стороне управляемых мышц. Правый спинальный очаг ниже перекрёста поэтому прежде всего нарушает ипсилатеральный произвольный контроль ниже уровня поражения. Другие нисходящие системы также участвуют в движениях; из одного условного повреждения нельзя вывести точную клиническую тяжесть."
      }
    ]
  },
  EN: {
    intro: "Three ungraded diagnostic questions about sensory and motor tract crossings. Review the mechanism after each answer; a schematic lesion is not a substitute for clinical examination.",
    questions: [
      {
        prompt: "A teaching diagram shows an isolated lesion of the right dorsal column of the spinal cord at T8. Which deficit is most likely below the lesion?",
        options: [
          "Predominant loss of pain and temperature on the left beginning exactly at T8.",
          "Impaired vibration and joint-position sense on the right with relative sparing of pain and temperature.",
          "Loss of vibration on the left because dorsal-column fibers cross immediately on entering the cord.",
          "Complete bilateral loss of all sensory modalities after any small dorsal-column lesion."
        ],
        answer: "b",
        explanation: "Vibration and conscious proprioceptive afferents ascend ipsilaterally in the dorsal columns and cross after synapsing in the gracile and cuneate nuclei of the caudal medulla. A restricted right spinal lesion therefore mainly affects these modalities on the right below the lesion. Pain and temperature travel chiefly in the anterolateral system; the observed pattern also depends on lesion extent."
      },
      {
        prompt: "In a simplified isolated lesion of the left anterolateral tract at spinal level T8, which sensory change is most likely?",
        options: [
          "Predominant loss of vibration on the left due to dorsal-column crossing at T8.",
          "Complete loss of every sensation on the right beginning exactly at T8, without any offset.",
          "Impaired fine movement of the left hand as the sole obligatory finding.",
          "Reduced pain and temperature sensation mainly on the right, often beginning a few segments below the lesion."
        ],
        answer: "d",
        explanation: "Pain and temperature afferents synapse in the dorsal horn. Second-order axons cross in the anterior white commissure over several spinal segments before ascending contralaterally. Thus a left anterolateral lesion may impair right-sided pain and temperature below the lesion, with an upper sensory level that need not coincide exactly with T8. The offset and severity vary with the lesion."
      },
      {
        prompt: "A teaching model shows damage to the right lateral corticospinal tract in the spinal cord, below the pyramidal decussation. Which motor consequence is most likely below the lesion?",
        options: [
          "Only left-sided pain loss with no motor effect.",
          "Mainly left-sided limb weakness because the lateral tract crosses only in the lumbar cord.",
          "Impaired voluntary movement mainly on the right, particularly skilled distal movement; severity depends on lesion level and extent.",
          "Complete symmetric paralysis after every partial lesion of one tract."
        ],
        answer: "c",
        explanation: "Most corticospinal axons cross in the caudal medulla and then descend in the lateral spinal cord on the side of the muscles they help control. A right spinal lesion below that crossing therefore mainly disrupts ipsilateral voluntary control below the lesion. Other descending pathways also contribute to movement, so exact clinical severity cannot be inferred from this simplified lesion alone."
      }
    ]
  },
  KZ: {
    intro: "Сезімтал және қозғалтқыш жолдардың айқасуы туралы бағаланбайтын үш диагностикалық сұрақ. Әр жауаптан кейін тетіктің түсіндірмесін оқыңыз; шартты зақым үлгісі клиникалық тексеруді алмастырмайды.",
    questions: [
      {
        prompt: "Оқу сызбасында жұлынның Th8 деңгейіндегі оң жақ артқы бағанының оқшауланған зақымы көрсетілген. Зақымнан төмен қай бұзылыс көбірек күтіледі?",
        options: [
          "Сол жақта ауырсыну мен температура сезімінің дәл Th8 деңгейінен бастап басым жоғалуы.",
          "Оң жақта діріл мен буын қалпын сезудің бұзылуы, ал ауырсыну мен температура сезімінің салыстырмалы сақталуы.",
          "Артқы баған талшықтары жұлынға кірген бойда айқасатындықтан, сол жақта діріл сезімінің жоғалуы.",
          "Артқы бағанның кез келген шағын зақымында барлық сезімталдық түрлерінің екі жақта толық жоғалуы."
        ],
        answer: "b",
        explanation: "Діріл мен саналы проприоцепция талшықтары артқы бағандарда өз жағымен жоғары көтеріліп, сопақша мидағы нәзік және сына тәрізді ядроларда ауысқаннан кейін айқасады. Сондықтан жұлындағы оң жақ шектеулі зақым төменгі деңгейлерде осы сезім түрлерін негізінен оң жақта бұзады. Ауырсыну мен температура сигналдары көбіне антеролатералдық жүйемен өтеді; нақты көрініс зақымның көлеміне тәуелді."
      },
      {
        prompt: "Жұлынның Th8 деңгейінде сол жақ антеролатералдық жол оқшауланып зақымданса, сезімталдықтың қандай өзгерісі ықтимал?",
        options: [
          "Артқы бағандар Th8 деңгейінде айқасатындықтан, сол жақта діріл сезімінің басым жоғалуы.",
          "Оң жақта барлық сезімнің дәл Th8 деңгейінен бастап, ығысусыз толық жоғалуы.",
          "Міндетті жалғыз белгі ретінде сол қолдың нәзік қозғалыстарының бұзылуы.",
          "Негізінен оң жақта ауырсыну мен температура сезімінің төмендеуі; бұзылыс көбіне зақымнан бірнеше сегмент төмен басталады."
        ],
        answer: "d",
        explanation: "Ауырсыну мен температура афференттері артқы мүйізде ауысады. Екінші нейрон аксондары бірнеше жұлын сегменті аралығында алдыңғы ақ комиссура арқылы қарсы жаққа өтіп, жоғары көтеріледі. Сондықтан сол жақ антеролатералдық жолдың зақымы оң жақта ауырсыну мен температура сезімін бұзуы мүмкін, бірақ бұзылыстың жоғарғы шекарасы Th8 деңгейімен дәл сәйкес келмеуі ықтимал. Ығысу шамасы мен ауырлығы зақымға байланысты."
      },
      {
        prompt: "Оқу үлгісінде пирамидалық айқасудан төмен жұлындағы оң жақ латералдық қыртыс-жұлын жолы зақымданған. Зақымнан төмен қандай қозғалыс өзгерісі ықтимал?",
        options: [
          "Қозғалыс бұзылмай, тек сол жақтағы ауырсыну сезімінің жоғалуы.",
          "Латералдық жол тек бел сегменттерінде айқасатындықтан, көбіне сол жақ аяқ-қолдың әлсіздігі.",
          "Ерікті қозғалыстардың негізінен оң жақта, әсіресе аяқ-қолдың дисталдық нәзік қозғалыстарының бұзылуы; ауырлығы зақым деңгейі мен көлеміне тәуелді.",
          "Бір жолдың кез келген жартылай зақымында барлық қозғалыстың екі жақта толық тоқтауы."
        ],
        answer: "c",
        explanation: "Қыртыс-жұлын аксондарының басым бөлігі сопақша мидың каудалдық бөлігінде айқасып, жұлынның латералдық бағанымен өздері басқаратын бұлшықеттер жағында төмен түседі. Сондықтан айқасудан төменгі оң жақ зақым осы деңгейден төмен оң жақтағы ерікті қозғалысты көбірек бұзады. Қозғалысқа басқа төмендеуші жүйелер де қатысады, сондықтан мұндай үлгімен нақты клиникалық ауырлықты анықтау мүмкін емес."
      }
    ]
  }
};
export function createModuleEightPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest", title, introduction: data.intro,
    questions: data.questions.map((item, index) => ({
      id: "module-8-pretest-" + ["dorsal-column", "anterolateral", "corticospinal"][index],
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((text, i) => ({ id: (["a", "b", "c", "d"] as const)[i], text })),
      correctAnswer: item.answer,
      explanation: item.explanation,
      target: { section: "theory" as const }
    }))
  };
}
