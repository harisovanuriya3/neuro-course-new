import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 7 practice: authored clinical/physiological reasoning in RU/EN/KZ.
// Sources read in Library: Ganong 23e, ch. 9 (PDF 169–171);
// Guyton & Hall 13e, ch. 55 (PDF 666–669);
// C. L. Ghai Practical Physiology 8e (PDF 317–319).
// All scenarios are illustrative, not validated patient measurements.
type Copy = {
  titles: [string, string, string, string, string];
  prompts: [string, string, string, string];
  answers: [string[], string[], string[], string[]];
  response: string;
  criteria: [string, string, string, string, string];
};
const copy: Record<Language, Copy> = {
  "RU": {
    "titles": [
      "1. Постройте дугу коленного рефлекса",
      "2. Сравните рецепторы и типы афферентов",
      "3. Реципрокное торможение и защитный ответ",
      "4. Почему изменился коленный рефлекс?",
      "Самопроверка"
    ],
    "prompts": [
      "При ударе по связке надколенника происходит быстрое растяжение четырёхглавой мышцы. Запишите цепь от рецептора до разгибания колена: рецептор → афферент → вход в спинной мозг → центральная связь → эфферент → мышца. Укажите, где находится тело чувствительного нейрона и какая ветвь цепи моносинаптическая. Почему удар по сухожилию не делает сухожильный орган Гольджи главным рецептором коленного рефлекса?",
      "В мысленном опыте одну мышцу растягивают быстро, другую — медленно до одинаковой конечной длины; исходная гамма-активация и остальные условия одинаковы. Сравните кратковременный ответ первичных окончаний Ia во время растяжения и сигналы о сохраняющейся длине от Ia/II после его завершения. Затем объясните, что преимущественно кодируют Ib-афференты сухожильного органа Гольджи и зачем нужна альфа-гамма-коактивация.",
      "В модели А Ia-афферент веретена четырёхглавой мышцы возбуждает её альфа-мотонейрон и одновременно через тормозный интернейрон уменьшает активность мотонейронов сгибателей колена. В модели Б болевой стимул кожи вызывает защитное сгибание конечности через сеть интернейронов. Отметьте моносинаптическую и полисинаптическую ветви. Почему нельзя изображать рефлекс отдёргивания как один-единственный интернейрон или утверждать, что каждый защитный ответ обязательно сопровождается перекрёстным разгибанием?",
      "В учебной записи сначала коленный рефлекс слева почти не виден, справа заметен. При повторе с одинаковой позой и расслаблением слева появляется небольшой ответ; после добавления приёма Ендрассика ответы с обеих сторон становятся более заметными. Назовите минимум две возможные причины изменения ответа. Что нужно стандартизировать и сравнить, прежде чем обсуждать патологию? Почему нельзя приписать улучшение исключительно приёму Ендрассика или установить уровень поражения по одному рефлексу?"
    ],
    "answers": [
      [
        "Рецептор — мышечное веретено в четырёхглавой мышце; Ia-афферент (тело в спинномозговом узле) входит через задний корешок, возбуждает альфа-мотонейрон переднего рога; моторный аксон через передний корешок и бедренный нерв достигает мышцы, вызывая разгибание колена. В дуге участвуют преимущественно сегменты L2–L4, особенно L3–L4.",
        "Основная связь Ia → альфа-мотонейрон четырёхглавой мышцы моносинаптическая; реципрокное торможение сгибателей проходит через интернейрон. Сухожильный орган Гольджи сигнализирует преимущественно о напряжении по Ib-афферентам, а основной рецептор коленного рефлекса — веретено, растянутое ударом."
      ],
      [
        "При одинаковом исходном состоянии быстрое растяжение обычно даёт более выраженный динамический разряд Ia во время изменения длины; после остановки сохраняются статические ответы Ia и II на достигнутую длину. II не являются единственными рецепторами длины, Ia не кодируют только скорость.",
        "Ib-афференты связаны с напряжением мышцы, а не с первичным запуском коленного рефлекса. Альфа-гамма-коактивация помогает поддерживать натяжение и чувствительность интрафузальных окончаний при сокращении экстрафузальных волокон. Это качественное предсказание, а не численная модель разрядов."
      ],
      [
        "Моносинаптическая ветвь А — Ia → альфа-мотонейрон четырёхглавой мышцы. Параллельная ветвь Ia → тормозный интернейрон → мотонейрон антагониста имеет дополнительный синапс; защитное сгибание Б реализуется полисинаптической сетью.",
        "В рефлексе отдёргивания участвуют распределённые возбуждающие и тормозные цепи, возможны последействие и нисходящая модуляция. Перекрёстный разгибательный ответ зависит от конечности, опоры и контекста, а не обязателен в каждом опыте."
      ],
      [
        "Сила ответа зависит от позы, степени расслабления, способа удара, внимания и возбудимости спинальных цепей; подкрепление приёмом Ендрассика также может облегчить ответ. Сравните стороны при одинаковом положении и способе исследования, затем другие рефлексы, силу, чувствительность и сопутствующие признаки.",
        "Поскольку поза/расслабление и подкрепление менялись последовательно, по этим наблюдениям нельзя оценить вклад каждого фактора отдельно. Один слабый рефлекс не локализует повреждение: возможны изменения афферентного, центрального, эфферентного, нервно-мышечного или мышечного звена."
      ]
    ],
    "response": "Ваш ответ и объяснение физиологического механизма",
    "criteria": [
      "Указываю мышечное веретено, Ia, спинномозговой узел и альфа-мотонейрон.",
      "Различаю моносинаптическую ветвь и интернейронное торможение.",
      "Не смешиваю сигналы Ia/II о длине и Ib о напряжении.",
      "Отличаю полисинаптический защитный рефлекс от рефлекса растяжения.",
      "Учитываю условия исследования и не ставлю диагноз по одному ответу."
    ]
  },
  "EN": {
    "titles": [
      "1. Trace the knee-jerk arc",
      "2. Compare receptors and afferent groups",
      "3. Reciprocal inhibition and protective withdrawal",
      "4. Why did the knee jerk change?",
      "Self-check"
    ],
    "prompts": [
      "Tapping the patellar ligament briefly stretches the quadriceps. Trace receptor → afferent → spinal entry → central connection → efferent → muscle → knee extension. Where is the sensory neuron's cell body, and which central branch is monosynaptic? Why does tapping a tendon not make the Golgi tendon organ the main receptor for the knee jerk?",
      "In a thought experiment one muscle is stretched rapidly and another slowly to the same final length, with equal baseline gamma drive and other conditions. Compare the transient response of primary Ia endings during stretch and sustained length signals from Ia/II after stretch stops. Then explain what Golgi tendon organ Ib afferents mainly encode and why alpha–gamma coactivation matters.",
      "In model A a quadriceps spindle Ia afferent excites a quadriceps alpha motor neuron and, via an inhibitory interneuron, reduces activity of knee-flexor motor neurons. In model B a cutaneous nociceptive input produces protective limb flexion through an interneuronal network. Identify the monosynaptic and polysynaptic branches. Why is it wrong to draw withdrawal as a single obligatory interneuron or assume crossed extension in every protective response?",
      "In a teaching scenario the left knee jerk is barely visible at first while the right is clear. After repeating the test with matched positioning and relaxation, a small left response appears; after adding the Jendrassik maneuver, both responses are more apparent. Name at least two possible reasons for the changes. What must be standardized and compared before considering pathology? Why can neither the improvement be attributed solely to Jendrassik nor a lesion localized from one reflex?"
    ],
    "answers": [
      [
        "The receptor is a quadriceps muscle spindle; its Ia afferent has a cell body in a dorsal root ganglion and enters via a dorsal root. It excites an anterior-horn alpha motor neuron whose axon leaves by a ventral root and travels in the femoral nerve to quadriceps, producing knee extension. Mainly L2–L4, especially L3–L4, contribute.",
        "The principal Ia → quadriceps alpha motor neuron connection is monosynaptic. Reciprocal inhibition of knee flexors requires an interneuron. Golgi tendon organs mainly report tension through Ib afferents; the tendon tap primarily stretches the spindle-bearing muscle."
      ],
      [
        "With matched baseline conditions, faster stretch generally causes a larger dynamic Ia discharge during length change; once stretch stops, Ia and II continue to encode the attained length. Group II is not the sole length sensor, nor is Ia purely a velocity sensor.",
        "Ib afferents signal muscle tension rather than initiate the principal knee jerk. Alpha–gamma coactivation helps keep intrafusal endings taut and sensitive as extrafusal fibers contract. These are qualitative predictions, not a calibrated spike-train model."
      ],
      [
        "The monosynaptic branch in A is Ia → quadriceps alpha motor neuron. The parallel Ia → inhibitory interneuron → antagonist motor neuron branch has an additional synapse. Protective withdrawal in B is mediated by polysynaptic circuits.",
        "Withdrawal recruits distributed excitatory and inhibitory pathways; after-discharge and descending modulation may contribute. Crossed extension depends on limb, weight-bearing and context, and is not an obligatory response in every trial."
      ],
      [
        "Position, relaxation, tap technique, attention and spinal circuit excitability affect the jerk; Jendrassik reinforcement may also facilitate it. Compare sides under matched conditions and examine other reflexes, strength, sensation and accompanying signs.",
        "Because positioning/relaxation and reinforcement changed sequentially, their individual contributions cannot be isolated. One weak jerk does not localize a lesion: afferent, central, efferent, neuromuscular and muscle factors remain possible."
      ]
    ],
    "response": "Your answer and physiological explanation",
    "criteria": [
      "Identified spindle, Ia, dorsal root ganglion and alpha motor neuron.",
      "Separated the monosynaptic branch from interneuronal inhibition.",
      "Distinguished Ia/II length signals from Ib tension signals.",
      "Distinguished polysynaptic withdrawal from the stretch reflex.",
      "Controlled examination conditions and avoided diagnosis from a single response."
    ]
  },
  "KZ": {
    "titles": [
      "1. Тізе рефлексінің доғасын құрастырыңыз",
      "2. Рецепторлар мен афференттік топтарды салыстырыңыз",
      "3. Реципроктық тежелу және қорғаныштық тартып алу",
      "4. Тізе рефлексі неліктен өзгерді?",
      "Өзіндік тексеру"
    ],
    "prompts": [
      "Тізе тостағаншасының байламын соққанда төртбасты бұлшықет қысқа уақытқа созылады. Рецептор → афферент → жұлынға кіру → орталық байланыс → эфферент → бұлшықет → тізенің жазылуы тізбегін құрыңыз. Сезімтал нейронның денесі қайда орналасады және қай орталық тармақ моносинапстық? Сіңірді соғу неліктен Гольджи сіңір органын тізе рефлексінің негізгі рецепторы етпейді?",
      "Ойша тәжірибеде бір бұлшықет тез, екіншісі баяу созылады, бірақ соңғы ұзындығы бірдей; бастапқы гамма-белсенділік пен басқа жағдайлар тең. Созылу кезіндегі Ia бастапқы ұштарының қысқа мерзімді жауабын және созылу тоқтағаннан кейін Ia/II жеткізетін тұрақты ұзындық сигналдарын салыстырыңыз. Содан соң Гольджи сіңір органының Ib-афференттері негізінен нені кодтайтынын және альфа-гамма-коактивация не үшін қажет екенін түсіндіріңіз.",
      "А моделінде төртбасты бұлшықет ұршығының Ia-афференті осы бұлшықеттің альфа-мотонейронын қоздырады және тежегіш интернейрон арқылы тізені бүгетін бұлшықеттер мотонейрондарының белсенділігін азайтады. Б моделінде терінің ноцицептивтік кірісі интернейрондар желісі арқылы аяқ-қолдың қорғаныштық бүгілуін туғызады. Моносинапстық және полисинапстық тармақтарды ажыратыңыз. Неліктен тартып алу рефлексін жалғыз интернейронмен бейнелеу немесе әр жауапта міндетті түрде қарсы жақтың жазылуы болады деу қате?",
      "Оқу жағдайында бастапқыда сол жақ тізе рефлексі әрең байқалады, ал оң жақта анық көрінеді. Аяқ қалпы мен босаңсуды бірдей етіп қайталағанда сол жақта әлсіз жауап пайда болады; Ендрассик тәсілін қосқанда екі жақтың жауабы айқынырақ болады. Өзгерістің кемінде екі ықтимал себебін атаңыз. Патологияны талқыламас бұрын нені біріздендіріп, нені салыстыру керек? Неліктен жақсаруды тек Ендрассик тәсіліне телуге немесе бір рефлекспен зақым деңгейін анықтауға болмайды?"
    ],
    "answers": [
      [
        "Рецептор — төртбасты бұлшықеттегі бұлшықет ұршығы; Ia-афферент денесі жұлын түйінінде орналасады, оның орталық өсіндісі артқы түбірмен кіреді. Ол алдыңғы мүйіздің альфа-мотонейронын қоздырады; моторлық аксон алдыңғы түбір және сан жүйкесі арқылы төртбасты бұлшықетке жетіп, тізені жазады. Негізінен L2–L4, әсіресе L3–L4 сегменттері қатысады.",
        "Негізгі Ia → төртбасты бұлшықеттің альфа-мотонейроны байланысы моносинапстық. Антагонисттерді реципроктық тежеуге интернейрон қажет. Гольджи сіңір органы Ib-афференттер арқылы көбіне кернеу туралы хабарлайды; сіңірге соққы ұршық орналасқан бұлшықетті созады."
      ],
      [
        "Бастапқы жағдай бірдей болса, тез созылу ұзындық өзгеріп жатқанда Ia-ның айқынырақ динамикалық разрядын әдетте туғызады; созылу тоқтағанда Ia мен II жеткен ұзындық туралы статикалық ақпаратты жеткізуді жалғастырады. II ұзындықтың жалғыз рецепторы емес, ал Ia тек жылдамдықты кодтамайды.",
        "Ib-афференттер негізінен бұлшықет кернеуі туралы хабарлайды, тізе рефлексінің негізгі бастауыш жолы емес. Альфа-гамма-коактивация экстрафузалдық талшықтар жиырылғанда интрафузалдық ұштардың керілуі мен сезімталдығын сақтауға көмектеседі. Бұл сандық разряд моделі емес, сапалық болжам."
      ],
      [
        "А моделіндегі моносинапстық тармақ — Ia → төртбасты бұлшықеттің альфа-мотонейроны. Ia → тежегіш интернейрон → антагонист мотонейроны тармағында қосымша синапс бар. Б моделіндегі қорғаныштық тартып алу полисинапстық тізбектер арқылы іске асады.",
        "Тартып алу рефлексіне таралған қоздырушы және тежегіш жолдар қатысады; кейінгі разряд пен төмендеуші реттелу әсер етуі мүмкін. Қарсы жақтың жазылуы аяқ-қолға, тірек жағдайына және контекстке тәуелді, әр сынақта міндетті емес."
      ],
      [
        "Жауапқа аяқ қалпы, босаңсу, соққы тәсілі, зейін және жұлын тізбектерінің қозғыштығы әсер етеді; Ендрассик тәсілі де жауапты күшейтуі мүмкін. Бірдей жағдайда екі жақты салыстырып, басқа рефлекстерді, күшті, сезімталдықты және қосымша белгілерді тексеру керек.",
        "Аяқ қалпы/босаңсу және қосымша тәсіл бірінен соң бірі өзгергендіктен, әр фактордың жеке үлесін ажыратуға болмайды. Бір әлсіз рефлекс зақым орнын анықтамайды: афференттік, орталық, эфференттік, жүйке-бұлшықет және бұлшықеттік себептер болуы мүмкін."
      ]
    ],
    "response": "Жауабыңыз және физиологиялық түсіндірмеңіз",
    "criteria": [
      "Бұлшықет ұршығын, Ia, жұлын түйінін және альфа-мотонейронды атадым.",
      "Моносинапстық тармақты интернейрондық тежелуден ажыраттым.",
      "Ia/II ұзындық сигналдарын Ib кернеу сигналдарынан ажыраттым.",
      "Полисинапстық тартып алуды созылу рефлексінен ажыраттым.",
      "Тексеру жағдайларын ескеріп, бір жауаппен диагноз қоймадым."
    ]
  }
};

export function createModuleSevenPractice(language: Language, base: PracticeLesson): PracticeLesson {
  const c = copy[language];
  return {
    ...base,
    sections: [
      ...c.prompts.map((prompt, i) => ({
        title: c.titles[i],
        blocks: [
          { type: "paragraph" as const, text: prompt },
          { type: "response" as const, label: c.response },
          { type: "answer" as const, items: c.answers[i] },
        ],
      })),
      {
        title: c.titles[4],
        blocks: [{ type: "checklist" as const, items: c.criteria }],
      },
    ],
  };
}
