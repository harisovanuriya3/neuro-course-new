import type { Language, Lesson } from "../types";

// Module 5 only. Preserve the foundation theory and replace its short NMJ card.
// Text reviewed against Ganong 23e ch. 6; Guyton & Hall 13e chs. 7 and 46;
// Ghai 8e expt. 4-9 (an isolated preparation, not a clinical fatigue model).
export function createModuleFiveTheory(language: Language, base: Lesson & { kind: "theory" }) {
  const local = (RU: string, EN: string, KZ: string) =>
    language === "RU" ? RU : language === "EN" ? EN : KZ;
  return {
    ...base,
    sections: [
      ...base.sections.filter(section => section.id !== "neuromuscular-junction"),
      {
        id: "chemical-electrical-comparison",
        title: local("Химическая и электрическая передача", "Chemical and electrical transmission", "Химиялық және электрлік берілу"),
        blocks: [
          { type: "paragraph" as const, text: local(
            "В химическом синапсе импульс открывает пресинаптические потенциал-зависимые Ca²⁺-каналы. Вход Ca²⁺ увеличивает вероятность слияния везикул с мембраной. Высвобождение медиатора квантовое и вероятностное. Рецепторы создают градуальный постсинаптический ответ; один такой ответ не обязательно вызывает новый потенциал действия.",
            "At a chemical synapse, an impulse opens presynaptic voltage-gated Ca²⁺ channels. Ca²⁺ entry raises the probability of vesicle fusion. Transmitter release is quantal and probabilistic. Receptors produce a graded postsynaptic response; a single response need not trigger a new action potential.",
            "Химиялық синапста импульс пресинапстық кернеуге тәуелді Ca²⁺ арналарын ашады. Ca²⁺ енуі везикулалардың мембранамен қосылу ықтималдығын арттырады. Медиатор бөлінуі кванттық әрі ықтималдық сипатта. Рецепторлар градуалды постсинапстық жауап туғызады; бір жауап міндетті түрде жаңа әрекет потенциалын тудырмайды."
          ) },
          { type: "paragraph" as const, text: local(
            "Ионотропный рецептор сам является ионным каналом; метаботропный действует через внутриклеточные сигнальные пути. Эффект медиатора зависит от рецептора, ионных градиентов и состояния клетки. Электрический синапс проводит ток через щелевые контакты без везикулярного выделения медиатора; передача часто двусторонняя, но может быть выпрямляющей и регулируемой.",
            "An ionotropic receptor is an ion channel; a metabotropic receptor acts through intracellular signaling. Transmitter effects depend on receptors, ion gradients and cell state. Electrical synapses conduct current through gap junctions without vesicular transmitter release; transmission is often bidirectional but can be rectifying and regulated.",
            "Ионотроптық рецептордың өзі иондық арна, ал метаботроптық рецептор жасушаішілік сигналдық жолдар арқылы әсер етеді. Медиатор әсері рецепторға, иондық градиенттерге және жасуша күйіне тәуелді. Электрлік синапс токты саңылаулы түйіспелер арқылы везикулалық медиаторсыз өткізеді; берілу көбіне екі бағытты, бірақ түзеткіш және реттелетін болуы мүмкін."
          ) },
        ],
      },
      {
        id: "postsynaptic-integration-and-shunting",
        title: local("Постсинаптические ответы и шунтирующее торможение", "Postsynaptic responses and shunting inhibition", "Постсинапстық жауаптар және шунттаушы тежелу"),
        blocks: [
          { type: "paragraph" as const, text: local(
            "Возбуждающий постсинаптический потенциал (ВПСП) — локальное градуальное изменение напряжения, которое может приблизить мембрану к порогу. Тормозный вход уменьшает вероятность разряда, но не обязан вызывать заметную гиперполяризацию. Итог зависит от суммирования входов во времени и пространстве, а также от расположения синапсов относительно зоны запуска импульса.",
            "An excitatory postsynaptic potential (EPSP) is a local graded voltage change that can bring the membrane closer to threshold. Inhibitory input reduces firing probability but need not produce an obvious hyperpolarization. The outcome depends on temporal and spatial integration and on synapse location relative to the spike-initiation zone.",
            "Қоздырушы постсинапстық потенциал (ҚПСП) — мембрананы табалдырыққа жақындата алатын жергілікті градуалды кернеу өзгерісі. Тежеуші кіріс импульс пайда болу ықтималдығын төмендетеді, бірақ міндетті түрде айқын гиперполяризация туғызбайды. Нәтиже кірістердің уақыт пен кеңістікте қосылуына және синапстардың импульс басталу аймағына қатысты орналасуына тәуелді."
          ) },
          { type: "paragraph" as const, text: local(
            "Пример шунтирования: если потенциал мембраны Vm близок к равновесному потенциалу Cl⁻ (E(Cl)), открытие Cl⁻-проницаемых каналов почти не меняет Vm в покое, но повышает мембранную проводимость и снижает входное сопротивление. Поэтому тот же возбуждающий ток вызывает меньшую деполяризацию. Это не универсальное правило для всех клеток: знак и сила эффекта зависят от градиента Cl⁻, других ионных проводимостей и локализации контакта.",
            "For example, when membrane voltage Vm is near the Cl⁻ equilibrium potential E(Cl), opening Cl⁻-permeable channels may barely change resting Vm but increases membrane conductance and lowers input resistance. The same excitatory current then causes a smaller depolarization. This is not universal: the sign and magnitude of the effect depend on the Cl⁻ gradient, other conductances and synapse location.",
            "Шунттаудың мысалы: мембраналық потенциал Vm хлор ионының тепе-теңдік потенциалына E(Cl) жақын болса, Cl⁻ өткізетін арналардың ашылуы тыныштықтағы Vm мәнін аз өзгертеді, бірақ мембраналық өткізгіштікті арттырып, кіріс кедергісін төмендетеді. Сондықтан сол бір қоздырушы ток азырақ деполяризация туғызады. Бұл барлық жасушаға ортақ ереже емес: әсердің бағыты мен шамасы Cl⁻ градиентіне, басқа иондық өткізгіштіктерге және түйіспенің орналасуына тәуелді."
          ) },
        ],
      },
      {
        id: "neuromuscular-junction",
        title: local("Нервно-мышечная передача", "Neuromuscular transmission", "Жүйке-бұлшықет берілуі"),
        blocks: [
          { type: "paragraph" as const, text: local(
            "В скелетном нервно-мышечном соединении вход Ca²⁺ вызывает выделение ацетилхолина. Мышечные никотиновые рецепторы — катионные каналы: преобладающий вход Na⁺ создаёт локальный потенциал концевой пластинки (ПКП). ПКП не является распространяющимся потенциалом действия. Если соседняя мембрана достигает порога, открываются потенциал-зависимые Na⁺-каналы и возникает мышечный потенциал действия.",
            "At the skeletal neuromuscular junction, Ca²⁺ entry triggers acetylcholine release. Muscle-type nicotinic receptors are cation channels: predominant Na⁺ influx produces a local end-plate potential (EPP). The EPP is not a propagating action potential. When adjacent membrane reaches threshold, voltage-gated Na⁺ channels initiate a muscle action potential.",
            "Қаңқа бұлшықетінің жүйке-бұлшықет түйіспесінде Ca²⁺ енуі ацетилхолин бөлінуін туғызады. Бұлшықеттік никотиндік рецепторлар — катиондық арналар: Na⁺ иондарының басым енуі соңғы пластинканың жергілікті потенциалын (СПП) тудырады. СПП таралатын әрекет потенциалы емес. Көрші мембрана табалдырыққа жетсе, кернеуге тәуелді Na⁺ арналары бұлшықеттің әрекет потенциалын бастайды."
          ) },
          { type: "paragraph" as const, text: local(
            "В норме запас надёжности передачи обычно обеспечивает ответ мышцы на импульс мотонейрона. Если выделение ацетилхолина или число доступных рецепторов уменьшается, ПКП может остаться ниже порога: это нарушение синаптической передачи, не обязательно блок аксона. Ацетилхолинэстераза расщепляет медиатор в щели. Мышечный потенциал действия затем запускает возбуждение–сокращение.",
            "Normally, the safety factor makes a muscle response to a motor-neuron impulse reliable. Reduced acetylcholine release or fewer available receptors can leave the EPP below threshold: this is transmission failure, not necessarily an axonal block. Acetylcholinesterase hydrolyzes transmitter in the cleft. The muscle action potential then initiates excitation–contraction coupling.",
            "Қалыптыда берілістің сенімділік қоры мотонейрон импульсіне бұлшықеттің жауап беруін қамтамасыз етеді. Ацетилхолин бөлінуі не қолжетімді рецепторлар саны азайса, СПП табалдырықтан төмен қалуы мүмкін: бұл міндетті түрде аксон бөгелуі емес, синапстық берілістің бұзылысы. Ацетилхолинэстераза медиаторды саңылауда ыдыратады. Содан кейін бұлшықет әрекет потенциалы қозу–жиырылу байланысын бастайды."
          ) },
        ],
      },
      {
        id: "synaptic-model-limits",
        title: local("Ограничения виртуального опыта", "Limits of the virtual experiment", "Виртуалды тәжірибенің шектеулері"),
        blocks: [{ type: "paragraph" as const, text: local(
          "В модели блокада входа Ca²⁺ и блокада постсинаптических рецепторов обе уменьшают ответ, но нарушают разные звенья. Расчётный результат модели детерминирован и не воспроизводит случайные квантовые события реального синапса. В изолированном нервно-мышечном препарате сохранение ответа на прямую стимуляцию мышцы после исчезновения ответа на стимуляцию нерва указывает на сбой непрямой активации, но не доказывает единственную молекулярную причину и не описывает утомление человека.",
          "In the model, blocking Ca²⁺ entry and blocking postsynaptic receptors can both reduce the response, but affect different links. Its calculated result is deterministic and does not simulate stochastic quantal release. In an isolated nerve–muscle preparation, preserved direct-muscle responses after responses to nerve stimulation disappear indicate failure of indirect activation, but do not establish a unique molecular cause or explain fatigue in humans.",
          "Модельде Ca²⁺ енуін немесе постсинапстық рецепторларды бөгеу жауапты азайтады, бірақ әртүрлі буынға әсер етеді. Модельдің есептелген нәтижесі детерминдік, ол нақты синапстағы кездейсоқ кванттық бөлінуді модельдемейді. Оқшауланған жүйке-бұлшықет препаратында жүйкені тітіркендіргендегі жауап жоғалып, бұлшықетті тікелей тітіркендіргендегі жауап сақталса, жанама белсендірудің бұзылғанын көрсетеді; бірақ бұл жалғыз молекулалық себепті дәлелдемейді және адамдағы шаршауды түсіндірмейді."
        ) }],
      },
    ],
  };
}
