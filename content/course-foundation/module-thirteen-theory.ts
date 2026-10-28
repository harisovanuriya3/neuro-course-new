import type { Language, Lesson } from "../types";

// Module 13: authored cerebellar physiology, cross-checked against Library sources:
// Guyton & Hall 13e, ch. 57, printed pp. 721–729 (PDF pp. 688–696);
// Ganong 23e, ch. 16, printed pp. 254–258 (PDF pp. 266–270);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–290 (PDF pp. 307–312).
// Educational simplification: not a unique computational model or diagnostic protocol.
type Text = Record<Language, string>;
type TheorySection = { id: string; heading: Text; paragraphs: Text[] };
const sections: TheorySection[] = [
  {
    "id": "cerebellar-functional-divisions",
    "heading": {
      "RU": "Функциональные отделы мозжечка и задачи движения",
      "EN": "Functional cerebellar divisions and motor tasks",
      "KZ": "Мишықтың функционалдық бөлімдері және қимыл міндеттері"
    },
    "paragraphs": [
      {
        "RU": "Мозжечок участвует в координации, точности и временной организации движения, но не посылает конечную двигательную команду непосредственно мышце. Клочково-узелковая доля и её вестибулярные связи особенно важны для равновесия и согласования движений глаз; червь связан преимущественно с позой и осевыми мышцами, промежуточные зоны — с коррекцией движений конечностей. Эти зоны работают совместно с корой, стволом и спинным мозгом.",
        "EN": "The cerebellum contributes to coordination, accuracy and movement timing but does not send the final motor command directly to muscle. The flocculonodular lobe and its vestibular connections are particularly important for balance and coordinated eye movements; the vermis contributes mainly to posture and axial control, and intermediate zones to limb movement adjustment. These regions interact with cortex, brainstem and spinal cord.",
        "KZ": "Мишық қимылдың үйлесіміне, дәлдігіне және уақыт бойынша реттелуіне қатысады, бірақ бұлшықетке соңғы қозғалтқыш команданы тікелей жібермейді. Үлпекше-түйіншек бөлігі мен оның вестибулярлық байланыстары тепе-теңдік пен көз қимылдарын үйлестіру үшін маңызды; құртша көбіне дене қалпы мен тұлға бұлшықеттерін, аралық аймақтар аяқ-қол қимылын түзетуді реттеуге қатысады. Бұл аймақтар қыртыспен, ми бағанымен және жұлынмен бірге жұмыс істейді."
      },
      {
        "RU": "Латеральные отделы полушарий мозжечка получают значительную часть информации через корково-мостовые пути и взаимодействуют с корой при планировании последовательных и сложных движений. Функциональные названия «вестибулоцеребеллум», «спиноцеребеллум» и «цереброцеребеллум» описывают преобладающие связи, а не непроницаемые анатомические границы. Нарушение одной зоны не позволяет без дополнительного исследования однозначно предсказать каждый симптом.",
        "EN": "Lateral cerebellar hemispheres receive substantial information through corticopontine pathways and interact with cerebral cortex in planning sequences of skilled movements. The terms vestibulocerebellum, spinocerebellum and cerebrocerebellum describe predominant connections, not completely isolated anatomical compartments. Dysfunction of one region cannot by itself predict every sign without further examination.",
        "KZ": "Мишық сыңарларының латералдық бөліктері ақпараттың елеулі бөлігін қыртыс-көпір жолдары арқылы алып, күрделі қимылдар тізбегін жоспарлауда үлкен ми қыртысымен әрекеттеседі. «Вестибулоцеребеллум», «спиноцеребеллум» және «цереброцеребеллум» атаулары басым байланыстарды сипаттайды, бірақ толық оқшауланған анатомиялық бөлімдерді білдірмейді. Бір аймақ қызметінің бұзылуы қосымша тексерусіз барлық белгіні бірмәнді болжауға мүмкіндік бермейді."
      }
    ]
  },
  {
    "id": "cerebellar-afferents-and-efference-copy",
    "heading": {
      "RU": "Сенсорные входы, моторная копия и олива",
      "EN": "Sensory inputs, motor copy and inferior olive",
      "KZ": "Сенсорлық кірістер, моторлық көшірме және төменгі олива"
    },
    "paragraphs": [
      {
        "RU": "Дорсальные спиноцеребеллярные пути несут главным образом сведения от проприорецепторов о положении и движении конечностей; вентральные спиноцеребеллярные пути также передают информацию о состоянии спинальных двигательных сетей. Через ядра моста к мозжечку поступают сигналы от корковых моторных и ассоциативных областей. Входы через нижнюю оливу образуют лазающие волокна; значительная часть остальных входов приходит по мшистым волокнам. Не все эти сигналы равнозначны прямому измерению движения.",
        "EN": "Dorsal spinocerebellar pathways convey mainly proprioceptive information about limb position and movement, whereas ventral spinocerebellar pathways also reflect activity in spinal motor networks. Pontine nuclei relay signals from cortical motor and association areas to the cerebellum. Inputs from the inferior olive form climbing fibres; many other inputs arrive through mossy fibres. These pathways are not interchangeable with direct measurement of movement.",
        "KZ": "Дорсалдық жұлын-мишық жолдары негізінен аяқ-қолдың қалпы мен қимылы туралы проприорецепторлық ақпаратты жеткізеді, ал вентралдық жұлын-мишық жолдары жұлынның қозғалтқыш желілерінің күйі туралы да мәлімет береді. Көпір ядролары арқылы мишыққа қыртыстың моторлық және ассоциациялық аймақтарынан сигналдар келеді. Төменгі оливадан келетін кірістер өрмелеуші талшықтарды, ал көптеген басқа кірістер мүкті талшықтарды түзеді. Бұл жолдардың барлығын қимылды тікелей өлшеумен теңестіруге болмайды."
      },
      {
        "RU": "Копия двигательной команды (efference copy) сообщает нервным сетям о запланированном или направленном к исполнению действии, а сенсорная обратная связь — о состоянии тела и последствиях действия. Мозжечковые контуры используют эти потоки для настройки движения; задержки проведения и изменчивость сигналов делают коррекцию только по поздней обратной связи недостаточной для очень быстрых действий. Конкретный вычислительный алгоритм не выводится из одной анатомической схемы.",
        "EN": "An efference copy informs neural circuits about an intended or issued motor command, while sensory feedback reports body state and the consequences of action. Cerebellar circuits use these streams to adjust movement; conduction delays and signal variability mean that late feedback alone is insufficient for very rapid actions. A single anatomical diagram does not establish one universal computational algorithm.",
        "KZ": "Қозғалтқыш команданың көшірмесі (efference copy) жүйке желілеріне жоспарланған не орындалуға бағытталған әрекет туралы, ал сенсорлық кері байланыс дене күйі мен әрекет салдары туралы ақпарат береді. Мишық контурлары осы ағындарды қимылды реттеуге пайдаланады; өткізудің кідірісі мен сигнал өзгергіштігі өте жылдам әрекеттерді тек кешіккен кері байланыспен түзетуді жеткіліксіз етеді. Бір анатомиялық сызбадан барлық жағдайға ортақ жалғыз есептеу алгоритмін шығаруға болмайды."
      }
    ]
  },
  {
    "id": "purkinje-deep-nuclei-microcircuit",
    "heading": {
      "RU": "Кора мозжечка: Пуркинье, мшистые и лазающие волокна",
      "EN": "Cerebellar cortex: Purkinje, mossy and climbing fibres",
      "KZ": "Мишық қыртысы: Пуркинье, мүкті және өрмелеуші талшықтар"
    },
    "paragraphs": [
      {
        "RU": "Кора мозжечка имеет молекулярный слой, слой клеток Пуркинье и зернистый слой. Мшистые волокна возбуждают зернистые клетки, чьи параллельные волокна воздействуют на дендриты клеток Пуркинье; лазающие волокна из нижней оливы обеспечивают мощный возбуждающий вход к клеткам Пуркинье. Корзинчатые, звёздчатые клетки и клетки Гольджи участвуют в локальном торможении. Эти связи создают распределённую обработку входов, а не прямую линию от рецептора к мышце.",
        "EN": "The cerebellar cortex has molecular, Purkinje-cell and granular layers. Mossy fibres excite granule cells, whose parallel fibres contact Purkinje-cell dendrites; climbing fibres from the inferior olive provide powerful excitatory input to Purkinje cells. Basket, stellate and Golgi cells participate in local inhibition. This circuitry distributes and transforms incoming signals rather than forming a direct line from receptor to muscle.",
        "KZ": "Мишық қыртысында молекулалық қабат, Пуркинье жасушаларының қабаты және түйіршікті қабат бар. Мүкті талшықтар түйіршікті жасушаларды қоздырады, олардың параллель талшықтары Пуркинье жасушаларының дендриттеріне әсер етеді; төменгі оливадан келетін өрмелеуші талшықтар Пуркинье жасушаларына күшті қоздырушы кіріс береді. Себетше, жұлдызша және Гольджи жасушалары жергілікті тежелуге қатысады. Бұл байланыстар кіріс сигналдарын өңдейді, рецептордан бұлшықетке тікелей жол құрмайды."
      },
      {
        "RU": "Аксоны клеток Пуркинье — основной выход коры мозжечка; они выделяют ГАМК и тормозят глубокие ядра, а в вестибулоцеребеллярных цепях — также соответствующие вестибулярные ядра. Мшистые и лазающие афференты дают возбуждающие коллатерали глубоким ядрам. Поэтому активность ядер определяется сочетанием возбуждения, торможения и их времени; ошибочно считать клетки Пуркинье возбуждающим выходом или полагать, что любое их усиление всегда ускоряет движение.",
        "EN": "Purkinje-cell axons are the principal output of the cerebellar cortex: they release GABA and inhibit deep cerebellar nuclei and, in vestibulocerebellar circuits, relevant vestibular nuclei. Mossy and climbing afferents also send excitatory collaterals to deep nuclei. Nuclear activity thus reflects the combination and timing of excitation and inhibition; Purkinje cells are not an excitatory cortical output, and greater Purkinje firing does not invariably speed movement.",
        "KZ": "Пуркинье жасушаларының аксондары мишық қыртысының негізгі шығысы болып саналады: олар ГАМҚ бөліп, терең ядроларды, ал вестибулоцеребеллярлық контурларда тиісті вестибулярлық ядроларды тежейді. Мүкті және өрмелеуші афференттер терең ядроларға қоздырушы тармақтар да береді. Демек, ядролар белсенділігі қозу мен тежелудің арақатынасы және уақытына тәуелді; Пуркинье жасушаларын қоздырушы қыртыстық шығыс деп санау немесе олардың белсенділігі әрқашан қимылды тездетеді деу қате."
      }
    ]
  },
  {
    "id": "deep-nuclei-and-motor-output",
    "heading": {
      "RU": "Глубокие ядра и косвенный двигательный выход",
      "EN": "Deep nuclei and indirect motor output",
      "KZ": "Терең ядролар және жанама қозғалтқыш шығыс"
    },
    "paragraphs": [
      {
        "RU": "К основным глубоким ядрам относятся зубчатое, вставочные (пробковидное и шаровидное) и ядро шатра. Латеральные отделы через зубчатое ядро связаны с таламокорковыми двигательными сетями; промежуточные зоны через вставочные ядра взаимодействуют с моторными структурами ствола и таламусом; червь и связанные с ним цепи через ядро шатра влияют на позные и вестибулярно-ретикулярные механизмы. Эти связи не заменяют нисходящие пути и нижние мотонейроны.",
        "EN": "Major deep nuclei include dentate, interposed (emboliform and globose) and fastigial nuclei. Lateral regions interact with thalamocortical motor networks through the dentate nucleus; intermediate zones communicate with brainstem motor structures and thalamus through interposed nuclei; vermal circuits influence postural and vestibulo-reticular mechanisms through the fastigial nucleus. These pathways do not replace descending tracts or lower motor neurons.",
        "KZ": "Мишықтың негізгі терең ядроларына тісті ядро, аралық ядролар (тығынтәрізді және шар тәрізді) және шатыр ядросы жатады. Латералдық бөлімдер тісті ядро арқылы таламус-қыртыс моторлық желілерімен, аралық аймақтар аралық ядролар арқылы ми бағанының қозғалтқыш құрылымдарымен және таламуспен байланысады; құртшаға қатысты контурлар шатыр ядросы арқылы дене қалпы мен вестибулярлық-ретикулярлық тетіктерге әсер етеді. Бұл жолдар төмендеуші трактілер мен төменгі мотонейрондарды алмастырмайды."
      },
      {
        "RU": "При оценке стороны поражения учитывают перекрёсты: многие выходы мозжечка пересекают среднюю линию на пути к таламусу или стволу, а нисходящие двигательные пути могут перекрещиваться снова. Поэтому поражение полушария мозжечка нередко даёт координационные нарушения конечностей преимущественно на той же стороне тела. Это клиническая тенденция, а не правило для любого очага, уровня или отдельного признака; необходима полноценная неврологическая оценка.",
        "EN": "Side of dysfunction must be interpreted with pathway crossings in mind: many cerebellar outputs cross en route to thalamus or brainstem, and descending motor pathways may cross again. Consequently, a cerebellar hemisphere lesion often produces predominantly ipsilateral limb incoordination. This is a clinical tendency rather than a rule for every lesion site, pathway or individual sign; full neurological assessment is required.",
        "KZ": "Зақым жағын бағалағанда жолдардың айқасуын ескеру қажет: мишықтан шығатын көптеген талшықтар таламусқа немесе ми бағанына барарда ортаңғы сызықтан өтеді, ал төмендеуші қозғалтқыш жолдар қайта айқасуы мүмкін. Сондықтан мишық сыңары зақымданғанда аяқ-қол үйлесімінің бұзылысы жиі дененің сол зақым жағына сәйкес жағында байқалады. Бұл әр ошаққа, жолға немесе жеке белгіге міндетті ереже емес; толық неврологиялық бағалау қажет."
      }
    ]
  },
  {
    "id": "timing-adaptation-and-experiment",
    "heading": {
      "RU": "Временная настройка, обратная связь и обучение",
      "EN": "Timing, feedback and motor adaptation",
      "KZ": "Уақыттық реттеу, кері байланыс және қимылға үйрену"
    },
    "paragraphs": [
      {
        "RU": "Для плавного достижения цели нервная система должна согласовать начало, продолжительность и прекращение активности агонистов и антагонистов. Мозжечковые сети помогают настраивать эти временные соотношения и адаптировать движение при изменении нагрузки и условий. Ошибка между ожидаемым и полученным результатом может служить обучающим сигналом, однако механизмы обучения распределены по разным синапсам и контурам; нельзя сводить всё обучение к одному типу пластичности.",
        "EN": "Smooth goal-directed action requires coordinated onset, duration and termination of agonist and antagonist activity. Cerebellar networks help tune this timing and adapt movements when load or context changes. A discrepancy between expected and observed outcomes can contribute to learning, but learning mechanisms are distributed across synapses and circuits; no single plasticity rule explains all cerebellar learning.",
        "KZ": "Нысанаға бағытталған бірқалыпты қимыл үшін агонист пен антагонист белсенділігінің басталуын, ұзақтығын және аяқталуын үйлестіру керек. Мишық желілері осы уақыттық қатынастарды реттеуге және жүктеме мен жағдай өзгергенде қимылды бейімдеуге көмектеседі. Күтілген және байқалған нәтиже айырмасы үйренуге сигнал бола алады, бірақ үйрену тетіктері әртүрлі синапстар мен контурларға таралған; мишықтағы бүкіл үйренуді бір ғана пластикалық ережемен түсіндіруге болмайды."
      },
      {
        "RU": "Проверяемый учебный опыт: при одинаковой цели, скорости инструкции и нагрузке сравнить достижение цели с доступной и ограниченной зрительной обратной связью, сохранив проприоцепцию. До опыта выбрать показатель — конечную ошибку, время или вариабельность — и сформулировать условный прогноз. Изменение зрения не выключает мышечные веретёна, а направление и величина эффекта зависят от задачи и человека. Числа в симуляции являются выходом модели, не записью активности клеток Пуркинье.",
        "EN": "A testable teaching experiment compares target reaching with available versus restricted visual feedback while keeping the goal, instructions, load and proprioceptive input comparable. Specify an outcome—endpoint error, movement time or variability—and a conditional prediction before the trial. Restricting vision does not silence muscle spindles, and effect size and direction depend on task and participant. Simulation values are model outputs, not recordings of Purkinje-cell activity.",
        "KZ": "Тексерілетін оқу тәжірибесінде мақсатты, нұсқауды, жүктемені және проприоцепциялық кірісті салыстырмалы тұрақты ұстап, нысанаға жетуді көру кері байланысы бар және шектелген жағдайда салыстырады. Тәжірибеге дейін соңғы қате, қимыл уақыты не өзгергіштік көрсеткішін таңдап, шартты болжам жазыңыз. Көрудің шектелуі бұлшықет ұршықтарының сигналын тоқтатпайды; әсердің бағыты мен шамасы тапсырмаға және адамға тәуелді. Симуляция сандары Пуркинье жасушалары белсенділігінің жазбасы емес, модель нәтижесі."
      }
    ]
  },
  {
    "id": "clinical-signs-and-evidence-limits",
    "heading": {
      "RU": "Координационные признаки и границы клинического вывода",
      "EN": "Coordination signs and limits of clinical inference",
      "KZ": "Үйлесім белгілері және клиникалық қорытынды шектері"
    },
    "paragraphs": [
      {
        "RU": "Дисметрия означает неточную амплитуду или конечную точку целенаправленного движения; интенционный тремор может усиливаться по мере приближения к цели. Нарушение быстрых чередующихся движений (дисдиадохокинез) и широкая неустойчивая походка также возможны при мозжечковой дисфункции. Эти признаки не равны снижению максимальной мышечной силы: координацию, силу, тонус, рефлексы и походку оценивают раздельно, как и зрение и проприоцепцию.",
        "EN": "Dysmetria is inaccurate movement amplitude or endpoint; intention tremor may become more evident near a target. Impaired rapid alternating movements (dysdiadochokinesia) and a broad-based unsteady gait may also occur with cerebellar dysfunction. These signs are not equivalent to reduced maximal muscle power: coordination, strength, tone, reflexes and gait should be assessed separately, alongside vision and proprioception.",
        "KZ": "Дисметрия — мақсатты қимыл амплитудасының немесе соңғы нүктесінің дәл болмауы; интенциялық тремор нысанаға жақындағанда айқынырақ болуы мүмкін. Жылдам кезектесетін қимылдардың бұзылысы (дисдиадохокинез) және кең негізді тұрақсыз жүріс те мишық қызметі бұзылғанда кездеседі. Бұл белгілер бұлшықеттің ең жоғары күшінің төмендеуімен бірдей емес: үйлесімді, күшті, тонусты, рефлекстерді және жүрісті, сондай-ақ көру мен проприоцепцияны бөлек бағалайды."
      },
      {
        "RU": "При пробах «палец — нос» и на быстрые чередующиеся движения учитывают инструкцию, зрительный контроль, слабость, чувствительность и возможность понять задание. Сенсорная атаксия может заметно усиливаться при закрывании глаз, но это не единственный диагностический критерий. Одна проба не устанавливает диагноз, точную локализацию или причину атаксии. Основа объяснения: Guyton & Hall 13e, гл. 57, с. 721–729; Ganong 23e, гл. 16, с. 254–258; C. L. Ghai 8e, с. 285–290. Это учебная физиология, не клинический протокол.",
        "EN": "In finger-to-nose and rapid alternating movement tasks, consider instructions, visual control, weakness, sensory function and the ability to understand the task. Sensory ataxia may worsen markedly when eyes close, but this is not a stand-alone diagnostic criterion. One bedside task cannot establish diagnosis, precise localization or cause of ataxia. Physiological basis: Guyton & Hall 13e, ch. 57, pp. 721–729; Ganong 23e, ch. 16, pp. 254–258; C. L. Ghai 8e, pp. 285–290. This is teaching physiology, not a clinical protocol.",
        "KZ": "«Саусақ — мұрын» және жылдам кезектесетін қимыл сынамаларында нұсқауды, көру бақылауын, әлсіздікті, сезімталдықты және тапсырманы түсіну мүмкіндігін ескереді. Сенсорлық атаксия көзді жұмғанда айқын күшеюі мүмкін, бірақ бұл жеке өзі диагноз қоятын өлшем емес. Бір сынама атаксияның диагнозын, нақты орналасуын немесе себебін анықтамайды. Физиологиялық негіз: Guyton & Hall 13e, 57-тарау, 721–729-б.; Ganong 23e, 16-тарау, 254–258-б.; C. L. Ghai 8e, 285–290-б. Бұл клиникалық хаттама емес, оқу физиологиясы."
      }
    ]
  }
];

export function createModuleThirteenTheory(
  language: Language,
  base: Lesson & { kind: "theory" }
): Lesson & { kind: "theory" } {
  return {
    ...base,
    sections: [
      ...base.sections,
      ...sections.map(section => ({
        id: section.id,
        title: section.heading[language],
        blocks: section.paragraphs.map(paragraph => ({
          type: "paragraph" as const,
          text: paragraph[language]
        }))
      }))
    ]
  };
}
