import type {Language} from "../course";
const cases=[
  [
    "potassium",
    [
      "Гиперкалиемия и возбудимость",
      "Hyperkalemia and excitability",
      "Гиперкалиемия және қозғыштық"
    ],
    [
      "При повышении внеклеточного K⁺ с 4 до 8 ммоль/л нейрон деполяризуется. Студент утверждает, что частота импульсов обязательно возрастёт. Объясните, почему вывод недостаточен.",
      "Extracellular K⁺ rises from 4 to 8 mmol/L and a neuron depolarizes. A student claims firing must increase. Why is that inference insufficient?",
      "Жасушадан тыс K⁺ 4-тен 8 ммоль/л-ге артқанда нейрон деполяризацияланады. Студент импульс жиілігі міндетті түрде өседі дейді. Неге бұл жеткіліксіз?"
    ],
    [
      "Рост внеклеточного K⁺ делает E_K менее отрицательным. Умеренная деполяризация может повышать возбудимость, но длительная сильная деполяризация инактивирует натриевые каналы и может вызывать блок проведения. Нужны данные о потенциале, времени и доступности каналов.",
      "Higher extracellular K⁺ makes E_K less negative. Modest depolarization may increase excitability, but sustained strong depolarization can inactivate sodium channels and cause conduction block. Voltage, timing and channel availability must be assessed.",
      "Сыртқы K⁺ артуы E_K-ді азырақ теріс етеді. Орташа деполяризация қозғыштықты арттыруы мүмкін, бірақ ұзақ күшті деполяризация натрий арналарын инактивациялап, өткізуді блоктауы мүмкін."
    ]
  ],
  [
    "myelin",
    [
      "Замедление проведения после демиелинизации",
      "Slowed conduction after demyelination",
      "Демиелинизациядан кейін өткізудің баяулауы"
    ],
    [
      "После повреждения миелина латентность ответа увеличилась, а часть стимулов перестала вызывать регистрируемый ответ. Различите замедление и блок проведения.",
      "Following myelin injury, response latency increases and some stimuli no longer evoke a recordable response. Distinguish slowing from conduction block.",
      "Миелин зақымынан кейін жауап латенттілігі ұзарды, кейбір стимулдарда жауап тіркелмейді. Баяулау мен блокты ажыратыңыз."
    ],
    [
      "Демиелинизация повышает потери тока через интернодальную мембрану и ухудшает распространение деполяризации к следующему узлу. Замедление означает сохранённый, но более поздний ответ; блок — отсутствие проведения части импульсов. Оценка зависит от метода, температуры и распределения повреждения.",
      "Demyelination increases internodal current loss and impairs depolarization reaching the next node. Slowing means a preserved but delayed response; block means failure of some impulses to propagate. Interpretation depends on method, temperature and lesion distribution.",
      "Демиелинизация түйінаралық ток шығынын арттырып, келесі түйінге деполяризацияның жетуін қиындатады. Баяулау — кешіккен жауап, блок — импульстердің бір бөлігінің өтпеуі."
    ]
  ],
  [
    "glutamate",
    [
      "Нарушение захвата глутамата",
      "Impaired glutamate clearance",
      "Глутаматты сіңірудің бұзылуы"
    ],
    [
      "В культуре нейронов подавили астроцитарный транспорт глутамата, после чего длительность возбуждающих токов увеличилась. Как проверить причинность и исключить прямое действие препарата на нейроны?",
      "Astrocytic glutamate uptake is inhibited in a neuronal culture, prolonging excitatory currents. How test causality and exclude direct drug effects on neurons?",
      "Нейрон мәдениетінде астроциттердің глутамат тасымалы тежеліп, қоздырғыш ток ұзақтығы артты. Себептілікті қалай тексереміз?"
    ],
    [
      "Астроцитарные переносчики ограничивают внеклеточное накопление глутамата. Требуются контроль препарата на нейронах, измерение внеклеточного глутамата, независимое вмешательство и восстановление функции транспорта. Одного совпадения изменений недостаточно.",
      "Astrocytic transporters limit extracellular glutamate accumulation. Controls should include direct drug effects on neurons, extracellular glutamate measurements, independent perturbation and transport rescue. Temporal association alone is insufficient.",
      "Астроцит тасымалдаушылары сыртқы глутаматтың жиналуын шектейді. Дәрінің нейронға тікелей әсерін, сыртқы глутаматты, тәуелсіз әсерді және тасымалды қалпына келтіруді тексеру қажет."
    ]
  ],
  [
    "bbb",
    [
      "Нарушение гематоэнцефалического барьера",
      "Blood–brain barrier disruption",
      "Гематоэнцефалдық бөгеттің бұзылуы"
    ],
    [
      "На МРТ обнаружены признаки повышения проницаемости сосудистого барьера после воспаления. Можно ли по одному изображению доказать, что первично повреждены астроциты?",
      "MRI suggests increased vascular barrier permeability after inflammation. Does the image alone prove primary astrocyte injury?",
      "Қабынудан кейін МРТ тамырлық бөгет өткізгіштігінің артқанын көрсетті. Бұл астроциттердің бастапқы зақымын дәлелдей ме?"
    ],
    [
      "Нет. Барьер формируется специализированным эндотелием при участии перицитов, базальной мембраны и астроцитов. Изображение не определяет первичное клеточное событие; нужны дополнительные экспериментальные и клинические данные.",
      "No. Specialized endothelium, pericytes, basement membrane and astrocytes contribute to barrier function. Imaging does not identify the initiating cell type; further evidence is required.",
      "Жоқ. Бөгетке арнайы эндотелий, перициттер, базалдық мембрана және астроциттер қатысады. Сурет бастапқы зақымдалған жасушаны анықтамайды."
    ]
  ],
  [
    "synapse",
    [
      "Синаптическая депрессия при повторных стимулах",
      "Synaptic depression during repeated stimulation",
      "Қайталама стимулдағы синапстық депрессия"
    ],
    [
      "При частой стимуляции амплитуда постсинаптического ответа постепенно снижается, а после отдыха восстанавливается. Назовите две конкурирующие физиологические гипотезы и способ различения.",
      "Repeated stimulation gradually reduces postsynaptic response amplitude, which recovers after rest. Name two competing physiological mechanisms and a discriminating experiment.",
      "Жиі стимул кезінде постсинапстық жауап азайып, демалыстан кейін қалпына келеді. Екі ықтимал механизм мен оларды ажырататын тәжірибені атаңыз."
    ],
    [
      "Возможны истощение доступного пула везикул, изменение вероятности высвобождения, десенситизация рецепторов и другие механизмы. Сопоставьте пресинаптические маркеры, квантовый анализ и ответ на прямое применение медиатора. Одна временная кривая не устанавливает механизм.",
      "Possible mechanisms include vesicle-pool depletion, altered release probability and postsynaptic receptor desensitization. Compare presynaptic indicators, quantal measurements and responses to direct transmitter application. A time course alone cannot identify the mechanism.",
      "Мүмкін механизмдер: көпіршік қорының азаюы, бөліну ықтималдығының өзгеруі және рецептор десенситизациясы. Пресинапстық көрсеткіштерді, кванттық өлшеуді және медиаторды тікелей қолдану жауабын салыстырыңыз."
    ]
  ]
] as const;
export function moduleThreeClinicalCases(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return cases.map(c=>({id:"m3-curated-"+c[0],title:c[1][i],situation:c[2][i],stages:[{title:language==="RU"?"Клиническое и экспериментальное рассуждение":language==="EN"?"Clinical and experimental reasoning":"Клиникалық және эксперименттік талдау",questions:[language==="RU"?"Каков механизм наблюдаемого изменения и какая альтернативная гипотеза возможна?":language==="EN"?"What mechanism explains the observation and what alternative hypothesis is possible?":"Бақылауды қандай механизм түсіндіреді және қандай балама болжам бар?",language==="RU"?"Какой контроль или дополнительное исследование различит гипотезы?":language==="EN"?"Which control or further investigation distinguishes the hypotheses?":"Қандай бақылау немесе қосымша зерттеу болжамдарды ажыратады?"]}],explanation:[c[3][i],language==="RU"?"Не делайте клинический диагноз без подтверждения; отдельно укажите ограничения данных.":language==="EN"?"Do not infer a clinical diagnosis without confirmation; identify the evidence limitations.":"Растаусыз клиникалық диагноз қоймаңыз; дерек шектеулерін көрсетіңіз."]}));}
