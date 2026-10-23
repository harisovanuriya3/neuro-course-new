import type { Language, Lesson } from "../types";

// Module 7: reflexes and neural networks.
// Cross-checked with Ganong 23e ch. 9 (Library PDF pp. 169–171),
// Guyton & Hall 13e ch. 55 (Library PDF pp. 666–669),
// C. L. Ghai Practical Physiology 8e (Library PDF pp. 317–319).
// Clinical examination is not a diagnostic substitute for professional assessment.
export function createModuleSevenTheory(
  language: Language,
  base: Lesson & { kind: "theory" },
): Lesson & { kind: "theory" } {
  const local = (ru: string, en: string, kz: string) =>
    language === "RU" ? ru : language === "EN" ? en : kz;
  const section = (
    id: string,
    heading: [string, string, string],
    paragraphs: [string, string, string][],
  ) => ({
    id,
    title: local(...heading),
    blocks: paragraphs.map(([ru, en, kz]) => ({
      type: "paragraph" as const,
      text: local(ru, en, kz),
    })),
  });

  return {
    ...base,
    sections: [
      ...base.sections,
      section("reflex-arc-path", [
        "Рефлекторная дуга: вход, центр и выход",
        "Reflex arc: input, central integration and output",
        "Рефлекстік доға: кіріс, орталық өңдеу және шығыс",
      ], [
        [
          "Рефлекторная дуга включает рецептор, чувствительный (афферентный) нейрон, центральную синаптическую связь, двигательный (эфферентный) нейрон и эффектор. В спинальном соматическом рефлексе тело первичного чувствительного нейрона находится в спинномозговом узле, его центральный отросток входит через задний корешок, а аксон альфа-мотонейрона выходит через передний корешок. Это функциональная схема, а не утверждение, что любой рефлекс обязательно ограничен одним сегментом.",
          "A reflex arc includes a receptor, a sensory (afferent) neuron, a central synaptic connection, a motor (efferent) neuron and an effector. In a spinal somatic reflex, the primary sensory neuron cell body lies in a dorsal root ganglion; its central process enters through the dorsal root, while the alpha motor neuron axon exits through the ventral root. This is a functional outline, not a claim that every reflex is confined to one spinal segment.",
          "Рефлекстік доға рецептордан, сезімтал (афференттік) нейроннан, орталық синапстық байланыстан, қозғалтқыш (эфференттік) нейроннан және эффектордан тұрады. Жұлындық соматикалық рефлексте бастапқы сезімтал нейрон денесі жұлын түйінінде орналасады, оның орталық өсіндісі артқы түбір арқылы кіреді, ал альфа-мотонейрон аксоны алдыңғы түбір арқылы шығады. Бұл қызметтік сызба; барлық рефлекс бір сегментпен шектеледі деген сөз емес.",
        ],
        [
          "Коленный рефлекс: удар по связке надколенника быстро растягивает четырёхглавую мышцу и её мышечные веретёна. Ia-афференты возбуждают альфа-мотонейроны этой мышцы через основную моносинаптическую связь, вызывая разгибание колена. Рецептор расположен в мышце, а не в связке. Нервно-мышечная передача и сокращение мышцы также необходимы для видимого ответа.",
          "Knee jerk: tapping the patellar ligament rapidly stretches the quadriceps and its muscle spindles. Group Ia afferents excite alpha motor neurons supplying the quadriceps through the principal monosynaptic connection, producing knee extension. The receptor is in the muscle, not the ligament. Neuromuscular transmission and muscle contraction are also required for a visible response.",
          "Тізе рефлексі: тізе тостағаншасының байламын соғу төртбасты бұлшықет пен оның ұршықтарын тез созады. Ia-афференттер осы бұлшықеттің альфа-мотонейрондарын негізгі моносинапстық байланыс арқылы қоздырып, тізені жазады. Рецептор байламда емес, бұлшықетте орналасады. Көрінетін жауап үшін жүйке-бұлшықет берілуі мен бұлшықет жиырылуы да қажет.",
        ],
      ]),
      section("spindle-and-gamma", [
        "Мышечное веретено: длина, скорость и гамма-настройка",
        "Muscle spindle: length, velocity and gamma adjustment",
        "Бұлшықет ұршығы: ұзындық, жылдамдық және гамма-реттелу",
      ], [
        [
          "Интрафузальные волокна мышечного веретена расположены параллельно экстрафузальным мышечным волокнам. Первичные окончания Ia реагируют как на длину мышцы, так и особенно сильно на скорость её изменения при быстром растяжении. Вторичные окончания группы II преимущественно сообщают о сохраняющейся длине. Нельзя утверждать, что Ia передают только скорость, а II — только длину: их чувствительность перекрывается.",
          "Intrafusal muscle-spindle fibers run in parallel with extrafusal muscle fibers. Primary group Ia endings encode muscle length and respond especially strongly to the velocity of rapid stretch. Secondary group II endings mainly encode sustained length. Ia afferents are not exclusively velocity sensors, nor are group II afferents exclusively length sensors; their sensitivities overlap.",
          "Бұлшықет ұршығының интрафузалдық талшықтары экстрафузалдық талшықтарға параллель орналасады. Ia тобының бастапқы ұштары бұлшықет ұзындығын және әсіресе тез созылу кезіндегі оның өзгеру жылдамдығын сезеді. II тобының екіншілік ұштары көбіне сақталған ұзындық туралы хабарлайды. Ia тек жылдамдықты, ал II тек ұзындықты сезеді деу дұрыс емес: сезімталдықтары ішінара қабаттасады.",
        ],
        [
          "Гамма-мотонейроны иннервируют сократимые концы интрафузальных волокон и регулируют чувствительность веретена. Динамическая и статическая гамма-активация по-разному меняют ответы на быстрое и устойчивое растяжение. При совместной активации альфа- и гамма-мотонейронов веретено сохраняет чувствительность во время сокращения мышцы. Поэтому величина рефлекса зависит не только от удара, но и от исходного состояния сети.",
          "Gamma motor neurons innervate the contractile ends of intrafusal fibers and tune spindle sensitivity. Dynamic and static gamma activation affect responses to rapid and sustained stretch differently. Alpha–gamma coactivation helps preserve spindle sensitivity as the muscle contracts. Reflex size therefore depends on baseline circuit state as well as the applied tap.",
          "Гамма-мотонейрондар интрафузалдық талшықтардың жиырылатын ұштарын жүйкелендіріп, ұршық сезімталдығын реттейді. Динамикалық және статикалық гамма-белсендіру тез және тұрақты созылуға жауапты әртүрлі өзгертеді. Альфа- және гамма-мотонейрондардың бірлескен белсенуі бұлшықет жиырылғанда ұршық сезімталдығын сақтауға көмектеседі. Сондықтан рефлекс шамасы тек соққыға емес, тізбектің бастапқы күйіне де тәуелді.",
        ],
      ]),
      section("inhibition-and-tendon", [
        "Реципрокное торможение и сухожильный орган Гольджи",
        "Reciprocal inhibition and the Golgi tendon organ",
        "Реципроктық тежелу және Гольджи сіңір органы",
      ], [
        [
          "У Ia-афферента есть ответвление, которое возбуждает тормозный спинальный интернейрон; тот уменьшает активность альфа-мотонейронов мышц-антагонистов. Это реципрокное торможение. Оно содержит дополнительный центральный синапс и потому не является той же моносинаптической ветвью, которая возбуждает растянутую мышцу. Состояние других входов может изменять выраженность торможения.",
          "A collateral of the Ia afferent excites a spinal inhibitory interneuron, which reduces activity of alpha motor neurons supplying antagonist muscles. This is reciprocal inhibition. It includes an additional central synapse and is not the same monosynaptic branch that excites the stretched muscle. Other converging inputs can modify its strength.",
          "Ia-афференттің тармағы жұлындағы тежегіш интернейронды қоздырады; ол антагонист бұлшықеттердің альфа-мотонейрондары белсенділігін төмендетеді. Бұл — реципроктық тежелу. Мұнда қосымша орталық синапс бар, сондықтан ол созылған бұлшықетті қоздыратын моносинапстық тармақпен бірдей емес. Басқа кірістер тежелу күшін өзгерте алады.",
        ],
        [
          "Сухожильный орган Гольджи расположен в области соединения мышцы с сухожилием, функционально последовательно с мышечными волокнами, и передаёт сведения о напряжении по Ib-афферентам. В учебной модели Ib-вход через тормозные интернейроны способен уменьшать активность мотонейронов той же мышцы; в реальном движении знак и величина ответа зависят от задачи и нисходящих влияний. Нельзя путать этот рецептор с веретеном, которое запускает основной путь коленного рефлекса.",
          "The Golgi tendon organ lies near the musculotendinous junction, functionally in series with muscle fibers, and signals tension via group Ib afferents. In the textbook circuit, Ib input through inhibitory interneurons can reduce motor-neuron activity in the same muscle; during real movement, response sign and magnitude are task- and context-dependent. Do not confuse this receptor with the spindle initiating the principal knee-jerk pathway.",
          "Гольджи сіңір органы бұлшықет пен сіңір қосылатын аймаққа жақын орналасып, бұлшықет талшықтарымен қызметтік тұрғыдан тізбектей байланысады және кернеу туралы ақпаратты Ib-афференттермен жеткізеді. Оқу сызбасында Ib кірісі тежегіш интернейрондар арқылы сол бұлшықеттің мотонейрон белсенділігін азайта алады; нақты қозғалыста жауаптың бағыты мен шамасы тапсырма мен контекстке тәуелді. Бұл рецепторды тізе рефлексінің негізгі жолын бастайтын ұршықпен шатастырмаңыз.",
        ],
      ]),
      section("reflex-examination-limits", [
        "Клиническая интерпретация и границы вывода",
        "Clinical interpretation and limits of inference",
        "Клиникалық түсіндіру және қорытынды шектеулері",
      ], [
        [
          "При исследовании коленного рефлекса сравнивают обе стороны, обеспечивают расслабление и одинаковое положение конечностей. При слабом ответе врач может использовать приём Ендрассика (сцепить пальцы рук и тянуть их в разные стороны), который способен облегчать выявление рефлекса. Уменьшение ответа возможно при нарушении афферентного пути, спинальных синапсов, эфферентного пути, нервно-мышечной передачи или мышцы; из одного слабого ответа нельзя выбрать единственную причину.",
          "During knee-jerk examination, both sides are compared with similar positioning and relaxed muscles. For a weak response, the examiner may use the Jendrassik maneuver (interlocking the fingers and pulling apart) to facilitate the reflex. A reduced response can reflect sensory input, spinal integration, motor output, neuromuscular transmission or muscle function; a single weak jerk does not identify one cause.",
          "Тізе рефлексін тексергенде екі жақты салыстырып, аяқтарды бірдей қалыпқа келтіріп, бұлшықеттерді босаңсытады. Әлсіз жауап кезінде дәрігер Ендрассик тәсілін (қол саусақтарын айқастырып, екі жаққа тарту) қолдануы мүмкін. Жауаптың азаюы афференттік жолға, жұлындық өңдеуге, эфференттік жолға, жүйке-бұлшықет берілуіне немесе бұлшықетке байланысты болуы мүмкін; бір әлсіз жауап нақты себепті анықтамайды.",
        ],
        [
          "Усиление сухожильных рефлексов может сопровождать поражение нисходящих двигательных систем, но зависит от клинического контекста и не доказывает конкретную локализацию без других признаков. Рефлекторная дуга работает под влиянием нисходящих команд, возбуждающих и тормозных интернейронов. Учебная анимация отражает направления связей, а не измеряет клиническую латентность или диагностическую чувствительность.",
          "Brisk tendon reflexes can accompany damage to descending motor pathways, but their meaning depends on the clinical context and cannot localize a lesion without other findings. Reflex circuits are continuously influenced by descending commands and excitatory and inhibitory interneurons. A teaching animation illustrates connections; it does not measure clinical latency or diagnostic sensitivity.",
          "Сіңір рефлекстерінің күшеюі төмендеуші қозғалтқыш жолдардың зақымымен қатар жүруі мүмкін, бірақ оның мағынасы клиникалық жағдайға тәуелді және басқа белгілерсіз зақым орнын анықтамайды. Рефлекстік тізбектерге төмендеуші командалар, қоздырушы және тежегіш интернейрондар үнемі әсер етеді. Оқу анимациясы байланыс бағытын көрсетеді, клиникалық латенттілікті немесе диагностикалық сезімталдықты өлшемейді.",
        ],
      ]),
    ],
  };
}
