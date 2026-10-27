import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 12: basal-ganglia terminology, RU/EN/KZ.
// Source review: Guyton & Hall 13e ch.57 (PDF 697–699, print 730–732);
// Ganong 23e ch.16 (PDF 262–264, print 250–252);
// C. L. Ghai Practical Physiology 8e (PDF 307–309, print 285–287).
// Direct/indirect/hyperdirect pathways are explanatory simplifications;
// clinical signs alone cannot establish a lesion site or diagnosis.
const baseDefinitions: Record<Language, string>[] = [
  {
    "RU": "Полосатое тело (хвостатое ядро и скорлупа) получает корковые и таламические входы, а также дофаминергическую модуляцию от компактной части чёрного вещества. Его ГАМК-ергические проекционные нейроны участвуют в нескольких параллельных петлях выбора действия; это не непосредственный моторный выход к мышцам.",
    "EN": "The striatum (caudate and putamen) receives cortical and thalamic input and dopaminergic modulation from substantia nigra pars compacta. Its GABAergic projection neurons participate in parallel action-selection loops; they do not directly innervate skeletal muscle.",
    "KZ": "Стриатум (құйрықты ядро мен қабықша) қыртыстан және таламустан кіріс алады, ал қара заттың тығыз бөлігінен дофаминдік модуляция алады. Оның ГАМҚ-ергиялық проекциялық нейрондары әрекет таңдаудың қатарлас контурларына қатысады; олар қаңқа бұлшықетіне тікелей бармайды."
  },
  {
    "RU": "Бледный шар состоит из наружного (GPe) и внутреннего (GPi) сегментов с разными связями. GPe участвует в непрямом пути и сетевых взаимодействиях, а GPi вместе с ретикулярной частью чёрного вещества формирует важный тормозный выход базальных ганглиев к таламическим и другим мишеням.",
    "EN": "The globus pallidus has external (GPe) and internal (GPi) segments with different connections. GPe participates in indirect-pathway and network interactions; GPi, alongside substantia nigra pars reticulata, provides a major inhibitory basal-ganglia output to thalamic and other targets.",
    "KZ": "Бозғылт шардың сыртқы (GPe) және ішкі (GPi) сегменттерінің байланыстары әртүрлі. GPe жанама жолға және желілік өзара әсерге қатысады; GPi қара заттың торлы бөлігімен бірге таламусқа және басқа нысаналарға базальды ганглийлердің негізгі тежеуші шығысын береді."
  }
];
const extra = [
  {
    "id": "caudate",
    "anchor": "basal-ganglia-nodes-and-loops",
    "term": {
      "RU": "Хвостатое ядро",
      "EN": "Caudate nucleus",
      "KZ": "Құйрықты ядро"
    },
    "definition": {
      "RU": "Часть полосатого тела, получающая корковые входы и включённая в двигательные, ассоциативные и когнитивные петли. Не следует приписывать всем его нейронам одну двигательную функцию или считать его самостоятельным выходом к мышце.",
      "EN": "A component of the striatum receiving cortical inputs and participating in motor, associative and cognitive loops. It should not be treated as a single-purpose motor nucleus or as a direct output to skeletal muscle.",
      "KZ": "Қыртыстан кіріс алатын, қозғалыстық, ассоциативтік және танымдық контурларға қатысатын стриатум бөлігі. Оның барлық нейрондары бір ғана қозғалыс қызметін атқармайды және ол бұлшықетке тікелей шығатын жол емес."
    }
  },
  {
    "id": "putamen",
    "anchor": "basal-ganglia-nodes-and-loops",
    "term": {
      "RU": "Скорлупа (путамен)",
      "EN": "Putamen",
      "KZ": "Қабықша (путамен)"
    },
    "definition": {
      "RU": "Часть полосатого тела, связанная с сенсомоторными корковыми областями и освоенными двигательными программами. В корково-базально-ганглионарных петлях она влияет на выбор и масштаб движения, но не заменяет кортикоспинальный путь.",
      "EN": "The putamen is a striatal component strongly connected to sensorimotor cortical areas and learned motor patterns. Through cortico-basal-ganglia loops it influences movement selection and scaling without replacing corticospinal output.",
      "KZ": "Қабықша — сенсомоторлық қыртыс аймақтарымен және меңгерілген қозғалыс үлгілерімен байланысқан стриатум бөлігі. Ол қыртыс-базальды ганглий контурларында қимылды таңдауға және оның ауқымына әсер етеді, бірақ кортикоспиналдық жолды алмастырмайды."
    }
  },
  {
    "id": "gpe",
    "anchor": "direct-indirect-and-hyperdirect",
    "term": {
      "RU": "Наружный сегмент бледного шара (GPe)",
      "EN": "External globus pallidus (GPe)",
      "KZ": "Бозғылт шардың сыртқы сегменті (GPe)"
    },
    "definition": {
      "RU": "ГАМК-ергический узел, получающий тормозные проекции от части стриатума и связанный с субталамическим ядром и другими структурами. В классической схеме непрямого пути снижение активности GPe снимает торможение с STN; реальная сеть сложнее линейной цепи.",
      "EN": "A GABAergic node receiving inhibitory input from a striatal population and connected to the subthalamic nucleus and other structures. In the canonical indirect-pathway model, reduced GPe activity disinhibits STN; actual network dynamics are more complex.",
      "KZ": "Стриатум нейрондарының бір тобынан тежеуші кіріс алатын, субталамустық ядромен және өзге құрылымдармен байланысқан ГАМҚ-ергиялық түйін. Жанама жолдың қарапайым сызбасында GPe белсенділігінің төмендеуі STN тежелуін азайтады; нақты желі күрделірек."
    }
  },
  {
    "id": "output",
    "anchor": "basal-ganglia-nodes-and-loops",
    "term": {
      "RU": "Выходные ядра GPi и SNr",
      "EN": "Output nuclei GPi and SNr",
      "KZ": "GPi және SNr шығыс ядролары"
    },
    "definition": {
      "RU": "Внутренний сегмент бледного шара (GPi) и ретикулярная часть чёрного вещества (SNr) дают преимущественно ГАМК-ергические тормозные сигналы таламическим и стволовым мишеням. Их изменение влияет на последующие двигательные сети, а не прямо вызывает сокращение мышцы.",
      "EN": "The internal globus pallidus (GPi) and substantia nigra pars reticulata (SNr) provide predominantly GABAergic inhibitory output to thalamic and brainstem targets. Changing this output modulates downstream motor networks rather than directly contracting muscle.",
      "KZ": "Бозғылт шардың ішкі сегменті (GPi) мен қара заттың торлы бөлігі (SNr) таламус пен ми бағаны нысаналарына көбіне ГАМҚ-ергиялық тежеуші сигнал береді. Бұл шығыс төменгі қозғалыс желілерін реттейді, бірақ бұлшықетті тікелей жиырылтпайды."
    }
  },
  {
    "id": "stn",
    "anchor": "direct-indirect-and-hyperdirect",
    "term": {
      "RU": "Субталамическое ядро (STN)",
      "EN": "Subthalamic nucleus (STN)",
      "KZ": "Субталамустық ядро (STN)"
    },
    "definition": {
      "RU": "Возбуждающий, преимущественно глутаматергический узел, связанный с GPe и выходными ядрами GPi/SNr. В упрощённых непрямом и гиперпрямом путях увеличение его активности усиливает возбуждающее влияние на GPi/SNr; эффект поведения зависит от всей сети.",
      "EN": "A predominantly glutamatergic excitatory node connected to GPe and the output nuclei GPi/SNr. In simplified indirect and hyperdirect pathways, greater STN activity increases excitatory drive to GPi/SNr; behavioral effects depend on the wider network.",
      "KZ": "GPe және GPi/SNr шығыс ядроларымен байланысқан, негізінен глутаматергиялық қоздырушы түйін. Жанама және гипертікелей жолдардың қарапайым үлгісінде STN белсенділігі артса, GPi/SNr-ға қоздырушы ықпал күшейеді; мінез-құлықтық нәтиже бүкіл желіге тәуелді."
    }
  },
  {
    "id": "snc",
    "anchor": "dopamine-modulates-selection",
    "term": {
      "RU": "Компактная часть чёрного вещества (SNc)",
      "EN": "Substantia nigra pars compacta (SNc)",
      "KZ": "Қара заттың тығыз бөлігі (SNc)"
    },
    "definition": {
      "RU": "Содержит дофаминергические нейроны, проецирующиеся в стриатум. Дофамин по-разному модулирует популяции нейронов с D1- и D2-рецепторами; он не является одинаковым возбуждающим сигналом для всех звеньев базальных ганглиев.",
      "EN": "Contains dopaminergic neurons projecting to the striatum. Dopamine modulates D1- and D2-receptor-expressing neuronal populations differently; it is not a uniform excitatory signal to every basal-ganglia connection.",
      "KZ": "Стриатумға проекция жіберетін дофаминергиялық нейрондар орналасқан бөлік. Дофамин D1 және D2 рецепторлары бар нейрон топтарына әртүрлі әсер етеді; ол базальды ганглийлердің барлық байланысын бірдей қоздырмайды."
    }
  },
  {
    "id": "direct",
    "anchor": "direct-indirect-and-hyperdirect",
    "term": {
      "RU": "Прямой путь",
      "EN": "Direct pathway",
      "KZ": "Тікелей жол"
    },
    "definition": {
      "RU": "В канонической модели тормозные нейроны стриатума снижают активность GPi/SNr; это ослабляет их тоническое торможение таламуса и может облегчать выбранное действие. Такая дизингибиция не означает, что стриатум непосредственно возбуждает мышцу.",
      "EN": "In the canonical model, inhibitory striatal neurons reduce GPi/SNr activity, thereby reducing tonic inhibition of the thalamus and potentially facilitating a selected action. This disinhibition does not mean that the striatum directly excites muscle.",
      "KZ": "Канондық үлгіде стриатумның тежеуші нейрондары GPi/SNr белсенділігін төмендетіп, олардың таламусқа тұрақты тежеуін әлсіретеді; бұл таңдалған әрекетті жеңілдетуі мүмкін. Тежеудің алынуы стриатум бұлшықетті тікелей қоздырады деген сөз емес."
    }
  },
  {
    "id": "indirect",
    "anchor": "direct-indirect-and-hyperdirect",
    "term": {
      "RU": "Непрямой путь",
      "EN": "Indirect pathway",
      "KZ": "Жанама жол"
    },
    "definition": {
      "RU": "В учебной цепи стриатум тормозит GPe, уменьшая его торможение STN; STN возбуждает GPi/SNr, и их тормозное влияние на таламус усиливается. Это объясняет подавление конкурирующих действий в модели, но не сводит всю физиологию к одному переключателю.",
      "EN": "In the teaching chain, striatum inhibits GPe, reducing GPe inhibition of STN; STN excites GPi/SNr, strengthening their inhibitory influence on thalamus. This illustrates suppression of competing actions, not a single switch explaining all behavior.",
      "KZ": "Оқу сызбасында стриатум GPe-ні тежейді, соның салдарынан GPe-нің STN-ге тежеуі азаяды; STN GPi/SNr-ды қоздырып, олардың таламусқа тежеуін күшейтеді. Бұл бәсекелес әрекеттерді шектеуді түсіндіреді, бірақ бүкіл физиология бір қосқышпен анықталмайды."
    }
  },
  {
    "id": "hyperdirect",
    "anchor": "direct-indirect-and-hyperdirect",
    "term": {
      "RU": "Гиперпрямой путь",
      "EN": "Hyperdirect pathway",
      "KZ": "Гипертікелей жол"
    },
    "definition": {
      "RU": "Корковые возбуждающие проекции достигают субталамического ядра, минуя стриатум; затем STN может усиливать активность GPi/SNr и временно ограничивать передачу через таламус. Это схема быстрого сетевого влияния, а не универсальная числовая латентность реакции.",
      "EN": "Excitatory cortical projections reach the subthalamic nucleus without passing through striatum; STN can then increase GPi/SNr activity and transiently restrict thalamic transmission. This is a network-level model, not a universal numerical reaction latency.",
      "KZ": "Қыртыстың қоздырушы проекциялары стриатумнан өтпей субталамустық ядроға жетеді; STN кейін GPi/SNr белсенділігін арттырып, таламус арқылы берілуді уақытша шектей алады. Бұл желілік үлгі, жауаптың бәріне ортақ сандық латенттілігі емес."
    }
  },
  {
    "id": "d1d2",
    "anchor": "dopamine-modulates-selection",
    "term": {
      "RU": "D1/D2-рецепторная модуляция",
      "EN": "D1/D2 receptor modulation",
      "KZ": "D1/D2 рецепторлық модуляция"
    },
    "definition": {
      "RU": "В упрощённой схеме дофамин через D1-рецепторы чаще способствует активности нейронов прямого пути, а через D2-рецепторы снижает активность нейронов непрямого пути. Реальные эффекты зависят от типа клетки, состояния сети и дополнительных рецепторов.",
      "EN": "In a simplified account, dopamine acting at D1 receptors tends to facilitate direct-pathway neurons, while D2 signaling tends to reduce indirect-pathway neuronal activity. Actual effects depend on cell type, network state and additional receptors.",
      "KZ": "Қарапайым үлгіде дофамин D1 рецепторлары арқылы тікелей жол нейрондарының белсенділігін көбіне қолдайды, ал D2 арқылы жанама жол нейрондарының белсенділігін төмендетуге бейім. Нақты әсер жасуша түріне, желі күйіне және басқа рецепторларға тәуелді."
    }
  },
  {
    "id": "bradykinesia",
    "anchor": "hypokinetic-hyperkinetic-and-differential",
    "term": {
      "RU": "Брадикинезия",
      "EN": "Bradykinesia",
      "KZ": "Брадикинезия"
    },
    "definition": {
      "RU": "Замедление произвольных движений, нередко с уменьшением амплитуды при повторении. Её следует отличать от пареза (снижения силы), дисметрии (ошибки достижения цели) и апраксии; один симптом без осмотра и контекста не устанавливает диагноз.",
      "EN": "Slowness of voluntary movement, sometimes with progressive reduction in movement amplitude on repetition. Distinguish it from paresis (weakness), dysmetria (targeting error) and apraxia; one sign without examination and context does not establish a diagnosis.",
      "KZ": "Ерікті қимылдың баяулауы, кейде қайталанған сайын қозғалыс амплитудасының кемуімен көрінеді. Оны парезден (күштің азаюы), дисметриядан (нысанаға жету қатесі) және апраксиядан ажырату қажет; бір белгі диагноз қоюға жеткіліксіз."
    }
  }
] as const;

export function createModuleTwelveGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length !== 2) {
    throw new Error("Module 12 glossary requires two original foundation terms");
  }
  const introduction: Record<Language, string> = {
    RU: "Проследите движение сигнала от стриатума через GPe, STN и GPi/SNr к таламусу. Учитывайте знаки тормозных и возбуждающих связей, а также различие между учебной схемой и клиническим наблюдением.",
    EN: "Trace signals from striatum through GPe, STN and GPi/SNr to thalamus. Keep track of inhibitory versus excitatory connections and distinguish a teaching circuit from a clinical observation.",
    KZ: "Стриатумнан GPe, STN және GPi/SNr арқылы таламусқа өтетін сигналды қадағалаңыз. Тежеуші және қоздырушы байланыстарды, сондай-ақ оқу сызбасы мен клиникалық бақылаудың айырмасын ескеріңіз."
  };
  return {
    ...base,
    introduction: introduction[language],
    terms: [
      ...base.terms.map((term, index) => ({
        ...term,
        definition: baseDefinitions[index][language],
        target: { section: "theory" as const, anchor: "basal-ganglia-nodes-and-loops" }
      })),
      ...extra.map(item => ({
        id: "module-12-glossary-" + item.id,
        term: item.term[language],
        definition: item.definition[language],
        target: { section: "theory" as const, anchor: item.anchor }
      }))
    ]
  };
}
