import type { Language } from "../course";
import type { CasesLesson, CaseExercise } from "../cases";

// Module 7: three authored, ungraded cases on spinal reflexes.
// Source verification: Ganong 23e ch. 9, Library PDF pp. 169–171, 175–176;
// Guyton & Hall 13e ch. 55, Library PDF pp. 670–671;
// C. L. Ghai Practical Physiology 8e, Library PDF pp. 317–319.
// These are instructional scenarios, not patient records or diagnostic tests.
type Triple = [string, string, string];
type Copy = {
  introduction: string;
  titles: Triple;
  situations: Triple;
  stageTitles: Triple;
  questions: [Triple, Triple, Triple];
  explanations: [[string, string], [string, string], [string, string]];
};
const copy: Record<Language, Copy> = {
  RU: {
    introduction: "Три задачи с заданными наблюдениями. Для каждой отделите факт от механизма и назовите проверку альтернативы. Письменные ответы автоматически не оцениваются; сравните их с разбором. Это учебные ситуации, не диагностика.",
    titles: ["1. Почему сработал коленный рефлекс?", "2. Слабый рефлекс не равен готовому диагнозу", "3. Отдёргивание и перекрёстное разгибание"],
    situations: [
      "В учебном исследовании при расслабленной четырёхглавой мышце краткий удар по связке надколенника вызывает разгибание колена. Прямое надавливание на кожу той же области без быстрого растяжения мышцы такого ответа не вызывает. Участники называют рецептором сухожильный орган Гольджи.",
      "У пациента после травмы правого бедра справа снижены коленный рефлекс и сила разгибания колена. Также отмечается изменение чувствительности на передней поверхности бедра. Других данных о состоянии нервов и корешков пока нет. Студент сразу записал: «повреждён только бедренный нерв».",
      "В схематической экспериментальной модели болезненный стимул левой стопы активирует сгибатели левой ноги, уменьшает активность её разгибателей и при подходящих условиях усиливает разгибатели правой ноги. Другой студент утверждает, что это тот же моносинаптический путь, что и коленный рефлекс, и что такой рисунок обязателен при каждом стимуле у человека."
    ],
    stageTitles: ["Наблюдение", "Механизм", "Проверка и границы вывода"],
    questions: [
      [
        "Какое изменение в ткани действительно запускает основной коленный рефлекс? Где расположен рецептор?",
        "Назовите афферент Ia, сегментарную основную связь и эфферент. Чем мышечное веретено отличается от сухожильного органа Гольджи (Ib)?",
        "Почему по одному видимому разгибанию нельзя измерить отдельно проводимость Ia-волокна или диагностировать поражение?"
      ],
      [
        "Какие три наблюдения имеются и что из них ещё не определяет точное место повреждения?",
        "Какие элементы рефлекторной дуги и мышечного ответа могут давать снижение коленного рефлекса?",
        "Какие дополнительные признаки и исследования помогут различить бедренную нейропатию, поражение корешков L2–L4 и другие причины?"
      ],
      [
        "Какие мышцы активируются и тормозятся в каждом из описанных ответов?",
        "Почему ноцицептивный ответ полисинаптический и чем перекрёстный разгибательный путь отличается от Ia→альфа-мотонейронной ветви?",
        "Какие условия влияют на выраженность перекрёстного ответа и почему нельзя обещать один рисунок движения у каждого человека?"
      ]
    ],
    explanations: [
      [
        "Краткий удар по связке надколенника растягивает четырёхглавую мышцу и мышечные веретёна внутри неё. Первичные Ia-афференты возбуждают альфа-мотонейроны четырёхглавой мышцы преимущественно в сегментах L2–L4 (особенно L3–L4); эфферентные импульсы по бедренному нерву вызывают сокращение и разгибание колена. Основная возбуждающая центральная связь моносинаптическая.",
        "Сухожильный орган Гольджи находится в сухожилии и передаёт сведения о мышечном напряжении по волокнам Ib; это не основной рецептор коленного рефлекса. Реципрокное торможение антагонистов проходит через интернейрон и не отменяет моносинаптичности основной ветви. Видимое движение зависит также от состояния мышцы, нервно-мышечной передачи и условий осмотра."
      ],
      [
        "Снижение рефлекса, слабость разгибания и сенсорное изменение требуют оценки всей дуги: мышечного веретена, Ia-афферента, корешка, сегментарных связей, альфа-мотонейрона, бедренного нерва, нервно-мышечной передачи и четырёхглавой мышцы. Совокупность признаков может быть совместима с бедренной нейропатией, но не доказывает её единственной причиной.",
        "Сравните стороны при одинаковом положении и расслаблении; уточните распределение чувствительных нарушений, другие рефлексы, силу отдельных мышц и симптомы со стороны спины. По клиническим показаниям врач может использовать электрофизиологические исследования и визуализацию. Изолированный коленный рефлекс не различает достоверно поражение бедренного нерва и корешков L2–L4."
      ],
      [
        "Защитный сгибательный ответ обычно запускается ноцицептивным входом и распределяется по сети спинальных интернейронов: возбуждаются необходимые сгибатели и подавляются антагонисты. При подходящих условиях межсегментарные и перекрёстные пути усиливают разгибатели противоположной конечности для поддержки позы. Это не прямой моносинаптический Ia-путь.",
        "Сила стимула, поза, нагрузка, состояние спинальных сетей и нисходящие влияния меняют рисунок ответа. Особенно выраженные перекрёстные ответы классически изучены в животных спинальных препаратах; нельзя переносить их неизменным шаблоном на каждый опыт у бодрствующего человека. Схема не заменяет измерение активности мышц."
      ]
    ]
  },
  EN: {
    introduction: "Three cases with specified observations. Separate evidence from mechanism and propose a discriminating check. Written responses are not automatically graded; compare them with the explanation. These are teaching scenarios, not diagnoses.",
    titles: ["1. What produces the knee jerk?", "2. A weak reflex is not a diagnosis", "3. Withdrawal and crossed extension"],
    situations: [
      "In a teaching demonstration, a brief tap on the patellar ligament with the quadriceps relaxed causes knee extension. Pressing the skin at the same location without rapidly stretching the muscle does not. Learners identify the Golgi tendon organ as the receptor.",
      "After a right-thigh injury, a patient has a reduced right knee jerk and weaker knee extension. Sensation over the anterior thigh is also altered. No further root or peripheral-nerve examination data are available. A learner concludes: 'Only the femoral nerve is injured.'",
      "In a schematic experimental model, a noxious stimulus to the left foot activates left-leg flexors, reduces ipsilateral extensor activity, and under suitable conditions facilitates right-leg extensors. A learner claims that this is the same monosynaptic pathway as the knee jerk and occurs in every human trial."
    ],
    stageTitles: ["Observation", "Mechanism", "Discriminating check and limitations"],
    questions: [
      [
        "What tissue change initiates the principal knee jerk, and where is its receptor?",
        "Identify the Ia afferent, principal spinal connection and efferent. How does the muscle spindle differ from the Golgi tendon organ (Ib)?",
        "Why does observing knee extension alone neither measure Ia conduction velocity nor diagnose a lesion?"
      ],
      [
        "Which three findings are present, and which cannot localize the lesion on its own?",
        "Which components of the reflex arc and muscle response can reduce the knee jerk?",
        "Which additional findings and investigations would help distinguish femoral neuropathy, L2–L4 root lesions and other causes?"
      ],
      [
        "Which muscles are excited or inhibited in each described response?",
        "Why is nociceptive withdrawal polysynaptic, and how does crossed extension differ from the Ia-to-alpha-motor-neuron pathway?",
        "What determines whether crossed extension appears, and why is a fixed response pattern not guaranteed in every person?"
      ]
    ],
    explanations: [
      [
        "Tapping the patellar ligament briefly stretches the quadriceps and its intramuscular spindles. Primary group Ia afferents excite quadriceps alpha motor neurons mainly at L2–L4 (particularly L3–L4); efferent impulses travel via the femoral nerve and produce knee extension. The principal central excitatory connection is monosynaptic.",
        "Golgi tendon organs in tendons signal muscle tension through Ib afferents; they are not the principal knee-jerk receptors. Reciprocal inhibition of antagonists involves an interneuron without changing the monosynaptic classification of the principal excitatory branch. Visible movement also depends on neuromuscular transmission, muscle state and examination conditions."
      ],
      [
        "Hyporeflexia, extension weakness and altered sensation warrant assessment of the entire arc: spindle, Ia afferent, root, spinal circuitry, alpha motor neuron, femoral nerve, neuromuscular junction and quadriceps. The combination may be consistent with femoral neuropathy, but does not prove it as the sole cause.",
        "Compare both sides with standardized posture and relaxation; map sensory loss, test other reflexes and muscles, and assess back-related symptoms. When clinically indicated, a clinician may use electrodiagnostic testing and imaging. The knee jerk alone cannot reliably separate a femoral nerve lesion from L2–L4 radiculopathy."
      ],
      [
        "Nociceptive withdrawal recruits a network of spinal interneurons that excites appropriate flexors and inhibits antagonists. Under suitable conditions, crossed and intersegmental circuits recruit contralateral extensors to support posture. This is not the direct monosynaptic Ia pathway.",
        "Stimulus intensity, posture, loading, spinal network state and descending influences affect the response. Prominent crossed extensor responses were classically demonstrated in spinal animal preparations; their exact pattern should not be assumed for every awake human trial. A diagram is not a direct measurement of muscle activity."
      ]
    ]
  },
  KZ: {
    introduction: "Бақылаулары нақты берілген үш жағдай. Деректі механизмнен ажыратып, балама түсіндірмені тексеру жолын ұсыныңыз. Жазбаша жауаптар автоматты түрде бағаланбайды; оларды талдаумен салыстырыңыз. Бұл — диагноз емес, оқу жағдайлары.",
    titles: ["1. Тізе рефлексі қалай пайда болады?", "2. Әлсіз рефлекс — дайын диагноз емес", "3. Тартып алу және айқас жазылу"],
    situations: [
      "Оқу тәжірибесінде төртбасты бұлшықет босаңсыған кезде тізе тостағаншасының байламын қысқа соғу тізенің жазылуын туғызады. Бұлшықетті жылдам созбай, сол аймақтың терісін басу мұндай жауап бермейді. Студенттер рецепторды Гольджи сіңір органы деп атайды.",
      "Оң сан жарақатынан кейін науқаста оң жақ тізе рефлексі төмендеп, тізені жазу күші азайған. Санның алдыңғы бетінде сезімталдық та өзгерген. Түбірлер мен шеткі жүйкелер туралы қосымша тексеру деректері жоқ. Студент: «Тек сан жүйкесі зақымданған», — деп қорытындылайды.",
      "Сызбалық эксперименттік модельде сол табанға ауырсындырғыш тітіркендіргіш берілгенде сол аяқтың бүгетін бұлшықеттері белсеніп, сол жақ жазғыштардың белсенділігі төмендейді; қолайлы жағдайда оң аяқтың жазғыштары күшейеді. Студент мұны тізе рефлексіндей моносинапстық жол және әр адамда міндетті түрде байқалатын жауап деп санайды."
    ],
    stageTitles: ["Бақылау", "Механизм", "Ажыратушы тексеру және шектеулер"],
    questions: [
      [
        "Тізе рефлексінің негізгі жауабын қандай тіндік өзгеріс бастайды және рецептор қайда орналасқан?",
        "Ia-афферентті, негізгі жұлындық байланысты және эфферентті атаңыз. Бұлшықет ұршығы Гольджи сіңір органынан (Ib) несімен ерекшеленеді?",
        "Тізенің жазылуын ғана бақылау неге Ia талшығының өткізу жылдамдығын өлшеуге де, зақымды анықтауға да жеткіліксіз?"
      ],
      [
        "Қандай үш белгі берілген және олардың қайсысы зақым орнын өздігінен анықтамайды?",
        "Рефлекстік доғаның және бұлшықет жауабының қандай бөліктері тізе рефлексін төмендетуі мүмкін?",
        "Сан жүйкесінің нейропатиясын, L2–L4 түбірлерінің зақымын және өзге себептерді ажыратуға қандай қосымша белгілер мен зерттеулер көмектеседі?"
      ],
      [
        "Сипатталған жауаптардың әрқайсысында қандай бұлшықеттер қозады немесе тежеледі?",
        "Ноцицептивтік тартып алу неге полисинапстық және айқас жазылу Ia→альфа-мотонейрон жолынан несімен өзгеше?",
        "Айқас жазылудың айқындылығына қандай жағдайлар әсер етеді және неге әр адамда бірдей қозғалыс міндетті емес?"
      ]
    ],
    explanations: [
      [
        "Тізе тостағаншасының байламын соғу төртбасты бұлшықет пен оның ішіндегі ұршықтарды жылдам созады. Ia-афференттер негізінен L2–L4 (әсіресе L3–L4) сегменттеріндегі төртбасты бұлшықеттің альфа-мотонейрондарын қоздырады; эфференттік импульстер сан жүйкесімен өтіп, тізені жаздырады. Негізгі орталық қоздырғыш байланыс моносинапстық.",
        "Сіңірдегі Гольджи органы бұлшықет керілу күшін Ib-афференттер арқылы жеткізеді; ол тізе рефлексінің негізгі рецепторы емес. Антагонистердің реципрокты тежелуі интернейрон арқылы жүреді, бірақ негізгі қоздырғыш тармақтың моносинапстық сипатын өзгертпейді. Көрінетін қозғалыс жүйке-бұлшықет берілуіне, бұлшықет күйіне және тексеру жағдайына да тәуелді."
      ],
      [
        "Рефлекстің төмендеуі, тізені жазу әлсіздігі және сезімталдықтың өзгеруі бүкіл доғаны бағалауды талап етеді: ұршық, Ia-афферент, түбір, жұлындық байланыстар, альфа-мотонейрон, сан жүйкесі, жүйке-бұлшықет түйіспесі және төртбасты бұлшықет. Белгілер сан жүйкесінің нейропатиясына сәйкес келуі мүмкін, бірақ оның жалғыз себеп екенін дәлелдемейді.",
        "Екі жақты бірдей қалыпта және босаңсу жағдайында салыстырыңыз; сезімталдық өзгерісінің таралуын, басқа рефлекстер мен бұлшықеттердің күшін, арқаға қатысты белгілерді анықтаңыз. Клиникалық көрсеткіш болса, дәрігер электрофизиологиялық зерттеу мен бейнелеуді қолдануы мүмкін. Тізе рефлексі жеке өзі сан жүйкесі зақымын L2–L4 радикулопатиясынан сенімді ажыратпайды."
      ],
      [
        "Ноцицептивтік тартып алу жұлын интернейрондарының желісін белсендіріп, қажетті бүгетін бұлшықеттерді қоздырады және антагонистерді тежейді. Қолайлы жағдайда айқас және сегментаралық жолдар дене қалпын қолдау үшін қарама-қарсы аяқтың жазғыштарын белсендіреді. Бұл тікелей моносинапстық Ia жолы емес.",
        "Тітіркендіргіш күші, дене қалпы, аяққа түсетін жүктеме, жұлын желісінің күйі және жоғарыдан түсетін әсерлер жауапты өзгертеді. Айқын айқас жазылу классикалық түрде жұлындық жануар модельдерінде зерттелген; оның нақты көрінісін әрбір сергек адамға бірдей көшіруге болмайды. Сызба бұлшықет белсенділігінің тікелей өлшемі емес."
      ]
    ]
  }
};

export function createModuleSevenCases(language: Language, base: CasesLesson): CasesLesson {
  const c = copy[language];
  const cases: CaseExercise[] = c.titles.map((title, i) => ({
    id: "m7-authored-case-" + (i + 1),
    title,
    situation: c.situations[i],
    stages: c.stageTitles.map((stageTitle, j) => ({
      title: stageTitle,
      questions: [c.questions[i][j]]
    })),
    explanation: c.explanations[i]
  }));
  return { ...base, introduction: c.introduction, cases };
}
