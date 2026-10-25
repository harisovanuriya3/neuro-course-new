import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 9: spinal roots, acute spinal shock and polysynaptic withdrawal.
// Checked against Ganong 23e ch. 9 (Library PDF pp. 169–175), ch. 16 (p. 261);
// Guyton & Hall 13e ch. 55 (Library PDF pp. 667–671);
// C. L. Ghai Practical Physiology 8e (Library PDF pp. 318–319).
// Diagnostic teaching examples, not patient-specific diagnoses.
type Choice = "a" | "b" | "c" | "d";
type Item = { prompt: string; options: [string,string,string,string]; answer: Choice; explanation: string };
type Locale = { intro: string; questions: [Item,Item,Item] };
const localized: Record<Language, Locale> = {
  "RU": {
    "intro": "Три диагностических вопроса о заднем и переднем корешках, спинальном шоке и защитном рефлексе отдёргивания. Баллы не выставляются. Для каждого ответа объясните путь сигнала и границы вывода по одному признаку.",
    "questions": [
      {
        "prompt": "В учебной модели избирательно повреждён задний корешок сегмента, участвующего в коленном рефлексе. Передний корешок и четырёхглавая мышца сохранены. Какое изменение наиболее вероятно?",
        "options": [
          "Аксоны альфа-мотонейронов обязательно прерываются, потому что они проходят в заднем корешке.",
          "Уменьшается чувствительный вход от мышечных веретён, поэтому коленный рефлекс может ослабнуть даже при сохранённом двигательном выходе.",
          "Коленный рефлекс обязательно усиливается из-за избирательной утраты корково-спинномозгового тракта.",
          "Нарушается только болевая чувствительность противоположной ноги, а рефлекторная дуга не меняется."
        ],
        "answer": "b",
        "explanation": "Афференты мышечного веретена входят в спинной мозг через задний корешок; аксоны соматических мотонейронов выходят через передний. Избирательное повреждение чувствительного звена уменьшает вход Ia-афферентов в сегментарную рефлекторную цепь и может ослабить ответ, хотя эфферентное звено сохранено. По одному ослабленному коленному рефлексу нельзя доказать конкретную локализацию: важны сила мышцы, чувствительность, методика и другие признаки."
      },
      {
        "prompt": "После тяжёлого повреждения спинного мозга ниже очага в первые часы сухожильные рефлексы резко снижены. Какой вывод лучше всего соответствует физиологии спинального шока?",
        "options": [
          "Все сегментарные нейронные цепи ниже очага обязательно разрушены и не могут функционировать позднее.",
          "Отсутствие рефлекса доказывает только изолированное повреждение периферического двигательного нерва.",
          "Спинальный шок означает немедленную гиперрефлексию при любом повреждении спинного мозга.",
          "В острой фазе рефлексы могут угнетаться из-за утраты нисходящих влияний; позднее часть сегментарных рефлексов может восстановиться или стать усиленной."
        ],
        "answer": "d",
        "explanation": "После тяжёлого повреждения спинного мозга внезапное прекращение нисходящей модуляции способно временно угнетать рефлекторную возбудимость ниже очага — это спинальный шок. С течением времени сегментарные ответы могут возвращаться, иногда с гиперрефлексией; динамика зависит от тяжести и уровня поражения и не доказывает сохранность произвольных движений. Для интерпретации обязательно учитывать время после травмы и другие неврологические признаки."
      },
      {
        "prompt": "Болевой стимул кожи стопы вызывает сгибание и отдёргивание этой ноги. Какой механизм лучше описывает основную спинальную организацию такого ответа?",
        "options": [
          "Только прямой моносинаптический контакт кожного ноцицептора с альфа-мотонейроном разгибателя.",
          "Изолированная активация сухожильного органа Гольджи без участия спинальных интернейронов.",
          "Полисинаптическая сеть интернейронов, активирующая сгибатели и тормозящая антагонистические разгибатели; при достаточном стимуле возможна перекрёстная разгибательная реакция.",
          "Исключительно произвольная команда моторной коры, без участия спинальных сегментарных сетей."
        ],
        "answer": "c",
        "explanation": "Рефлекс отдёргивания обычно запускается ноцицептивным входом и реализуется полисинаптическими интернейронными сетями спинного мозга. Они обеспечивают возбуждение мышц-сгибателей и реципрокное торможение разгибателей; при достаточно сильном стимуле могут включаться контралатеральные разгибательные цепи. Это не та же моносинаптическая ветвь, что Ia-афферент → альфа-мотонейрон при рефлексе растяжения. Выраженность ответа зависит от стимула и состояния нервной системы."
      }
    ]
  },
  "EN": {
    "intro": "Three ungraded diagnostic questions on dorsal versus ventral roots, spinal shock and protective withdrawal. After each answer, trace the neural pathway and consider why a single finding cannot establish a diagnosis.",
    "questions": [
      {
        "prompt": "In a teaching model, the dorsal root of a segment contributing to the knee-jerk reflex is selectively damaged. The ventral root and quadriceps muscle remain intact. Which change is most likely?",
        "options": [
          "Alpha motor-neuron axons are necessarily interrupted because they travel in the dorsal root.",
          "Sensory input from muscle spindles is reduced, so the knee jerk may weaken even though the motor output pathway remains intact.",
          "The knee jerk must become stronger because the corticospinal tract is selectively removed.",
          "Only pain sensation in the opposite leg is impaired; the reflex arc remains entirely unchanged."
        ],
        "answer": "b",
        "explanation": "Muscle-spindle afferents enter the spinal cord through dorsal roots, whereas somatic motor axons exit through ventral roots. Selective damage to the sensory limb reduces Ia afferent input to the segmental reflex circuit and may weaken the response despite preserved efferent output. An isolated weak knee jerk does not prove a particular lesion site: muscle strength, sensation, technique and other signs must also be assessed."
      },
      {
        "prompt": "In the first hours after a severe spinal cord injury, tendon reflexes below the lesion are markedly depressed. Which interpretation best fits the physiology of spinal shock?",
        "options": [
          "Every segmental neural circuit below the injury has necessarily been destroyed and can never function again.",
          "An absent reflex proves only isolated injury to a peripheral motor nerve.",
          "Spinal shock means immediate hyperreflexia after every spinal cord injury.",
          "In the acute phase, loss of descending influences can depress reflexes; later, some segmental reflexes may return or become exaggerated."
        ],
        "answer": "d",
        "explanation": "Abrupt loss of descending modulation after severe spinal cord injury can temporarily depress reflex excitability below the lesion, a phenomenon called spinal shock. Segmental responses may later return, sometimes with hyperreflexia; the time course depends on lesion level and severity and does not imply restoration of voluntary movement. Interpretation requires time since injury and other neurological findings."
      },
      {
        "prompt": "A noxious stimulus to the skin of the foot produces flexion and withdrawal of that leg. Which mechanism best describes the principal spinal organization of this response?",
        "options": [
          "Only a direct monosynaptic connection from a skin nociceptor to an extensor alpha motor neuron.",
          "Isolated activation of a Golgi tendon organ without spinal interneurons.",
          "A polysynaptic interneuron network that activates flexors and inhibits antagonist extensors; stronger stimuli may recruit a crossed extensor response.",
          "Exclusively a voluntary motor-cortex command without any segmental spinal circuits."
        ],
        "answer": "c",
        "explanation": "The withdrawal reflex is commonly initiated by nociceptive input and organized by polysynaptic spinal interneuron circuits. These excite flexors and reciprocally inhibit extensors; sufficiently strong stimuli can also recruit contralateral extensor circuits. This is distinct from the monosynaptic Ia-afferent-to-alpha-motor-neuron component of the stretch reflex. Response magnitude depends on the stimulus and nervous-system state."
      }
    ]
  },
  "KZ": {
    "intro": "Артқы және алдыңғы түбіршектер, жұлындық шок және қорғаныштық тартып алу рефлексі туралы бағаланбайтын үш диагностикалық сұрақ. Әр жауаптан кейін жүйкелік жолды түсіндіріп, бір ғана белгімен диагноз қоюға болмайтынын ескеріңіз.",
    "questions": [
      {
        "prompt": "Оқу үлгісінде тізе рефлексіне қатысатын сегменттің артқы түбіршегі таңдамалы зақымданған. Алдыңғы түбіршек пен санның төртбасты бұлшықеті сақталған. Қандай өзгеріс ықтимал?",
        "options": [
          "Альфа-мотонейрондардың аксондары міндетті түрде үзіледі, себебі олар артқы түбіршекпен өтеді.",
          "Бұлшықет ұршықтарынан келетін сезімтал кіріс азаяды, сондықтан қозғалтқыш шығыс жолы сақталса да тізе рефлексі әлсіреуі мүмкін.",
          "Қыртыс-жұлын жолы таңдамалы жойылғандықтан тізе рефлексі міндетті түрде күшейеді.",
          "Тек қарсы аяқтың ауырсыну сезімі бұзылады, ал рефлекстік доға мүлде өзгермейді."
        ],
        "answer": "b",
        "explanation": "Бұлшықет ұршығының афференттері жұлынға артқы түбіршек арқылы кіреді, ал соматикалық мотонейрон аксондары алдыңғы түбіршек арқылы шығады. Сезімтал буынның таңдамалы зақымы сегменттік рефлекстік тізбекке келетін Ia-афференттік кірісті азайтып, эфференттік жол сақталса да жауапты әлсіретуі мүмкін. Тізе рефлексінің бір ғана әлсіреуіне қарап зақым орнын дәл анықтауға болмайды: бұлшықет күші, сезімталдық, тексеру әдісі және өзге белгілер ескеріледі."
      },
      {
        "prompt": "Жұлынның ауыр зақымынан кейін алғашқы сағаттарда ошақтан төмен сіңір рефлекстері айқын төмендеген. Қай түсіндірме жұлындық шок физиологиясына көбірек сәйкес келеді?",
        "options": [
          "Зақымнан төмен барлық сегменттік нейрондық тізбектер міндетті түрде жойылған және кейін ешқашан жұмыс істемейді.",
          "Рефлекстің болмауы тек шеткі қозғалтқыш жүйкенің оқшауланған зақымын дәлелдейді.",
          "Жұлындық шок кез келген жұлын зақымында бірден гиперрефлексия пайда болуын білдіреді.",
          "Жедел кезеңде төмендеуші ықпалдардың жоғалуы рефлекстерді бәсеңдетуі мүмкін; кейін кейбір сегменттік рефлекстер қайта пайда болып немесе күшеюі мүмкін."
        ],
        "answer": "d",
        "explanation": "Жұлынның ауыр зақымынан кейін төмендеуші реттеудің кенет үзілуі ошақтан төмен рефлекстік қозғыштықты уақытша төмендетуі мүмкін; бұл — жұлындық шок. Уақыт өте сегменттік жауаптар қалпына келіп, кейде гиперрефлексия дамуы ықтимал. Өзгеріс барысы зақым деңгейі мен ауырлығына тәуелді және ерікті қозғалыстың қалпына келгенін білдірмейді. Түсіндіру үшін жарақаттан өткен уақыт пен өзге неврологиялық белгілер қажет."
      },
      {
        "prompt": "Табан терісіне ауырсындыратын стимул әсер еткенде аяқ бүгіліп, тітіркендіргіштен тартылады. Бұл жауаптың негізгі жұлындық ұйымдасуын қай тетік дұрыс сипаттайды?",
        "options": [
          "Тері ноцицепторының жазғыш бұлшықет альфа-мотонейронымен тек тікелей моносинапстық байланысы.",
          "Жұлын интернейрондарынсыз Гольджи сіңір органының оқшау белсенуі.",
          "Бүккіштерді қоздырып, антагонист жазғыштарды тежейтін полисинапстық интернейрондық желі; күшті стимулда қарсы аяқтың айқасқан жазу жауабы қосылуы мүмкін.",
          "Жұлынның сегменттік тізбектерінсіз тек қимыл қыртысынан шығатын ерікті команда."
        ],
        "answer": "c",
        "explanation": "Тартып алу рефлексі көбіне ноцицептивтік кіріспен басталып, жұлынның полисинапстық интернейрондық тізбектері арқылы іске асады. Олар бүккіштерді қоздырып, жазғыш антагонистерді реципроктық тежейді; жеткілікті күшті стимул қарсы жақтағы жазғыш тізбектерді де қосуы мүмкін. Бұл созылу рефлексінің Ia-афферент → альфа-мотонейрон моносинапстық буынымен бірдей емес. Жауаптың шамасы стимул мен жүйке жүйесінің күйіне тәуелді."
      }
    ]
  }
};

export function createModuleNinePretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest", title, introduction: data.intro,
    questions: data.questions.map((q,index)=>({
      id: ["module-9-pretest-dorsal-root","module-9-pretest-spinal-shock","module-9-pretest-withdrawal"][index],
      topic: moduleTitle, prompt: q.prompt,
      options: q.options.map((text,i)=>({id:["a","b","c","d"][i],text})),
      correctAnswer: q.answer, explanation: q.explanation,
      target: { section: "theory" as const },
    })),
  };
}
