import type {Language} from "../course";
const chapters=[
  [
    "neuron-compartments",
    [
      "Нейрон: компартменты и функциональная полярность",
      "Neuron compartments and functional polarity",
      "Нейрон: бөліктері және функционалдық полярлығы"
    ],
    [
      "Дендриты принимают множество синаптических сигналов, сома интегрирует метаболические и электрические процессы, а начальный сегмент аксона благодаря высокой плотности потенциал-зависимых натриевых каналов часто служит местом инициации потенциала действия. Аксон проводит сигнал к пресинаптическим окончаниям, где вход кальция запускает высвобождение медиатора. Функциональная полярность не абсолютна: дендриты могут генерировать активные электрические события, а аксональные коллатерали передают сигналы нескольким мишеням. Длина и диаметр отростков, миелин и расположение синапсов влияют на интеграцию и проведение. На анатомической иллюстрации следует различать наблюдаемую морфологию и предполагаемую функцию.",
      "Dendrites receive many synaptic inputs, the soma integrates metabolic and electrical processes, and the axon initial segment often initiates action potentials owing to a high density of voltage-gated sodium channels. The axon conducts signals to presynaptic terminals, where calcium entry triggers transmitter release. Functional polarity is not absolute: dendrites can generate active electrical events and axon collaterals reach multiple targets. Process length and diameter, myelination and synapse location shape integration and conduction. Anatomical appearance should be distinguished from inferred physiological function.",
      "Дендриттер көптеген синапстық сигналды қабылдайды, сома метаболикалық және электрлік үдерістерді біріктіреді, ал натрий арналары тығыз орналасқан аксонның бастапқы сегментінде әрекет потенциалы жиі басталады. Аксон сигналды пресинапстық ұштарға өткізеді, кальцийдің енуі медиатор бөлінуін іске қосады. Функционалдық полярлық абсолютті емес: дендриттер белсенді электрлік оқиғаларды тудыра алады, аксон тармақтары бірнеше нысанаға жетеді. Өсінді ұзындығы мен диаметрі, миелин және синапс орны интеграция мен өткізгіштікке әсер етеді."
    ]
  ],
  [
    "glial-physiology",
    [
      "Глия: астроциты, олигодендроциты, микроглия",
      "Glia: astrocytes, oligodendrocytes and microglia",
      "Глия: астроциттер, олигодендроциттер және микроглия"
    ],
    [
      "Астроциты участвуют в регуляции внеклеточного калия, захвате глутамата, метаболической поддержке нейронов и нейрососудистых взаимодействиях. Олигодендроциты формируют миелин центральной нервной системы; одна клетка может миелинизировать участки нескольких аксонов. В периферической системе миелин образуют шванновские клетки. Микроглия осуществляет иммунный надзор, фагоцитоз и участвует в перестройке синаптических связей. Глиальные клетки не следует называть пассивным «клеем»: нарушение их функций может менять возбудимость сети, скорость проведения и воспалительные реакции. При этом отдельные роли глии различаются в зависимости от возраста, области мозга и состояния ткани.",
      "Astrocytes help regulate extracellular potassium, clear glutamate, support neuronal metabolism and participate in neurovascular interactions. Oligodendrocytes produce CNS myelin; one cell can myelinate segments of several axons. Schwann cells form myelin in the peripheral nervous system. Microglia contribute to immune surveillance, phagocytosis and synaptic remodeling. Glia are not passive 'glue': their dysfunction can alter network excitability, conduction and inflammatory responses. Specific functions vary with age, region and tissue state.",
      "Астроциттер жасушадан тыс калийді реттеуге, глутаматты сіңіруге, нейрон метаболизмін қолдауға және нейротамырлық өзара әрекетке қатысады. Олигодендроциттер ОЖЖ миелинін түзеді; бір жасуша бірнеше аксон бөлігін миелиндей алады. Шеткі жүйкеде миелинді Шванн жасушалары түзеді. Микроглия иммундық бақылауға, фагоцитозға және синапстардың қайта құрылуына қатысады. Глияны пассивті «желім» деп қарастыру дұрыс емес: оның бұзылысы желі қозғыштығын, өткізуді және қабынуды өзгертуі мүмкін."
    ]
  ],
  [
    "myelin-clinical",
    [
      "Миелин и клиническая физиология демиелинизации",
      "Myelin and clinical physiology of demyelination",
      "Миелин және демиелинизацияның клиникалық физиологиясы"
    ],
    [
      "Миелин увеличивает электрическое сопротивление мембраны и снижает её эффективную ёмкость на межузловых участках, облегчая быстрое распространение деполяризации между узлами Ранвье. Потенциал действия активно регенерируется в узловых областях; выражение «импульс прыгает» — метафора, а не буквальное перемещение заряда через пустоту. Демиелинизация может замедлять проведение, вызывать временную дисперсию и блок, но клинические последствия зависят от локализации, тяжести и компенсаторных механизмов. Центральные и периферические демиелинизирующие заболевания имеют разные анатомические и иммунные механизмы. Неврологическое обследование, МРТ и исследования проводимости отвечают на разные вопросы и не взаимозаменяемы.",
      "Myelin increases membrane resistance and reduces effective capacitance across internodes, enabling rapid depolarization spread between nodes of Ranvier. Action potentials are actively regenerated at nodes; the phrase 'impulses jump' is a metaphor rather than literal movement across empty space. Demyelination can slow conduction, cause temporal dispersion and block, but consequences depend on location, severity and compensation. Central and peripheral demyelinating diseases differ in anatomy and immune mechanisms. Neurological examination, MRI and conduction studies address different questions and are not interchangeable.",
      "Миелин түйінаралық бөліктерде мембрана кедергісін арттырып, тиімді сыйымдылықты азайтады, Ранвье түйіндері арасында деполяризацияның жылдам таралуына жағдай жасайды. Әрекет потенциалы түйіндерде қайта түзіледі; «импульс секіреді» деген сөз — бейнелі түсінік. Демиелинизация өткізуді баяулатып, уақыттық дисперсия мен блок тудыруы мүмкін, бірақ салдары зақым орнына, ауырлығына және компенсацияға тәуелді. Орталық және шеткі демиелинизацияның механизмдері әртүрлі; тексеру, МРТ және өткізгіштік зерттеулері әртүрлі сұрақтарға жауап береді."
    ]
  ]
] as const;
export function moduleThreeDetailedTheory(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return chapters.map(c=>({id:c[0],title:c[1][i],blocks:[{type:"paragraph" as const,text:c[2][i]}]}));}
