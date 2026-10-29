import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 14: thalamic physiology; original RU/EN/KZ definitions.
// Source cross-check: Guyton & Hall 13e PDF 584–585; Ganong 23e PDF 241–242;
// C. L. Ghai Practical Physiology 8e PDF 323–324.
// Teaching glossary only; no single term establishes a clinical diagnosis.
type Text = Record<Language, string>;
type Entry = { id: string; anchor: string; term: Text; definition: Text };
const baseDefinitions: Text[] = [
  {
    "RU": "Таламическое ядро — анатомически и функционально выделяемая группа нейронов таламуса с характерными входами и выходами. Например, VPL связан преимущественно с чувствительностью тела, VPM — лица; разные ядра не образуют единого универсального переключателя всех ощущений.",
    "EN": "A thalamic nucleus is an anatomically and functionally defined neuronal group with characteristic inputs and outputs. VPL mainly handles somatosensory signals from the body, whereas VPM serves the face; thalamic nuclei are not a single undifferentiated relay for every sensation.",
    "KZ": "Таламус ядросы — өзіне тән кіріс және шығыс байланыстары бар нейрондар тобы. Мысалы, VPL көбіне денеден, VPM беттен келетін соматосенсорлық ақпаратпен байланысты; таламустың барлық ядросы бірдей әмбебап ауыстырғыш емес."
  },
  {
    "RU": "Таламокортикальная петля — взаимосвязанная система проекций таламуса к коре и обратных кортикоталамических волокон. Восходящие релейные нейроны преимущественно возбуждают кору глутаматом, а обратная связь изменяет обработку сигналов; схема не равна прямому измерению внимания или сознания.",
    "EN": "A thalamocortical loop combines thalamus-to-cortex projections with corticothalamic feedback. Many relay neurons use glutamate to excite cortical targets, while feedback shapes transmission according to network state; a diagram of the loop is not a direct measure of attention or consciousness.",
    "KZ": "Таламо-қыртыстық контур — таламустан қыртысқа баратын проекциялар мен қыртыстан таламусқа қайтатын байланыстар жүйесі. Көптеген релейлік нейрондар глутамат арқылы қыртысты қоздырады; кері байланыс өңдеуді өзгертеді, бірақ сызба зейін мен сананы тікелей өлшемейді."
  }
];
const extra: Entry[] = [
  {
    "id": "vpl",
    "anchor": "somatosensory-relays-and-somatotopy",
    "term": {
      "RU": "VPL — вентральное заднелатеральное ядро",
      "EN": "VPL — ventral posterolateral nucleus",
      "KZ": "VPL — вентралдық артқы латералдық ядро"
    },
    "definition": {
      "RU": "VPL принимает преимущественно соматосенсорную информацию от противоположной половины тела через медиальную петлю и переднебоковые пути и направляет её к соматосенсорной коре. Это не основное реле чувствительности лица; изолированное нарушение чувствительности не доказывает поражение VPL.",
      "EN": "VPL receives much of the somatosensory input from the contralateral body via medial lemniscal and anterolateral pathways and relays it to somatosensory cortex. It is not the principal facial relay; a sensory deficit alone cannot prove a VPL lesion.",
      "KZ": "VPL қарсы жақтағы денеден медиалдық ілмек және алдыңғы-бүйірлік жолдар арқылы келетін соматосенсорлық ақпараттың едәуір бөлігін қабылдап, қыртысқа өткізеді. Ол бет сезімталдығының негізгі релесі емес; сезімталдықтың бір бұзылысы VPL зақымын дәлелдемейді."
    }
  },
  {
    "id": "vpm",
    "anchor": "somatosensory-relays-and-somatotopy",
    "term": {
      "RU": "VPM — вентральное заднемедиальное ядро",
      "EN": "VPM — ventral posteromedial nucleus",
      "KZ": "VPM — вентралдық артқы медиалдық ядро"
    },
    "definition": {
      "RU": "VPM служит важным таламическим реле чувствительности лица по тройничным путям и связан с корковым представительством лица; в нём также обрабатываются некоторые вкусовые входы. Нельзя переносить на VPM схему перекрёста задних канатиков тела без уточнения конкретного пути.",
      "EN": "VPM is a major thalamic relay for facial somatosensation conveyed by trigeminal pathways and also receives some gustatory input. Its projections contribute to cortical representations of the face; the medullary crossing of body dorsal-column pathways must not be applied indiscriminately to facial pathways.",
      "KZ": "VPM үшкіл жүйке жолдары арқылы келетін бет сезімталдығының маңызды таламустық релесі; оған кейбір дәм сезу кірістері де жетеді. Ол бетке қатысты қыртыстық өкілдікпен байланысады; дененің артқы баған жолдарының айқасуын бет жолдарына өзгеріссіз көшіруге болмайды."
    }
  },
  {
    "id": "dcml",
    "anchor": "somatosensory-relays-and-somatotopy",
    "term": {
      "RU": "Заднеканатиково-медиально-петлевая система",
      "EN": "Dorsal column–medial lemniscal system",
      "KZ": "Артқы баған–медиалдық ілмек жүйесі"
    },
    "definition": {
      "RU": "Проводит тонкое осязание, вибрацию и осознанную проприоцепцию тела: первые нейроны поднимаются по задним канатикам, вторые после переключения в продолговатом мозге перекрещиваются и идут к VPL. Поэтому сторона нарушения зависит от уровня поражения относительно перекрёста.",
      "EN": "This pathway conveys discriminative touch, vibration and conscious proprioception from the body. First-order fibres ascend in dorsal columns; second-order axons cross in the medulla and ascend in the medial lemniscus toward VPL. The side of a deficit depends on the lesion level relative to this crossing.",
      "KZ": "Бұл жол денеден нәзік жанасу, діріл және саналы проприоцепцияны өткізеді. Бірінші нейрон талшықтары артқы бағанмен көтеріледі; екінші нейрон аксондары сопақша мида айқасып, медиалдық ілмекпен VPL-ге жетеді. Тапшылық жағы зақымның айқасуға қатысты деңгейіне тәуелді."
    }
  },
  {
    "id": "anterolateral",
    "anchor": "somatosensory-relays-and-somatotopy",
    "term": {
      "RU": "Переднебоковая сенсорная система",
      "EN": "Anterolateral sensory system",
      "KZ": "Алдыңғы-бүйірлік сенсорлық жүйе"
    },
    "definition": {
      "RU": "Передаёт преимущественно болевые и температурные сигналы тела: после переключения в заднем роге значительная часть волокон пересекает среднюю линию в спинном мозге и поднимается к нескольким таламическим и стволовым мишеням. Это не один провод только к VPL.",
      "EN": "The anterolateral system conveys much of body pain and temperature information. After dorsal-horn synapses, many axons cross within the spinal cord and ascend toward several thalamic and brainstem targets. It is not a single isolated wire terminating only in VPL.",
      "KZ": "Алдыңғы-бүйірлік жүйе дененің ауырсыну және температура сигналдарының едәуір бөлігін өткізеді. Артқы мүйізде ауысқан соң көптеген талшық жұлында айқасып, таламус пен ми бағанының бірнеше нысанасына көтеріледі. Бұл тек VPL-ге баратын жалғыз жол емес."
    }
  },
  {
    "id": "lgn",
    "anchor": "geniculate-and-olfactory-exception",
    "term": {
      "RU": "Латеральное коленчатое тело (LGN)",
      "EN": "Lateral geniculate nucleus (LGN)",
      "KZ": "Латералдық тізелі дене (LGN)"
    },
    "definition": {
      "RU": "Главное таламическое реле пути от сетчатки к первичной зрительной коре V1: после LGN аксоны идут по зрительной лучистости. Волокна носовых половин сетчаток перекрещиваются в хиазме; не все ретинальные сигналы проходят LGN, часть направляется в другие центры.",
      "EN": "The LGN is the principal thalamic relay from retina to primary visual cortex V1 through optic radiations. Nasal hemiretinal axons cross at the optic chiasm; other retinal projections reach non-LGN targets, so the LGN is not the retina's only destination.",
      "KZ": "LGN — торқабықтан бастапқы көру қыртысы V1-ге баратын негізгі таламустық реле; одан көру сәулеленуі өтеді. Торқабықтың мұрындық жартысының талшықтары хиазмада айқасады, ал кейбір торқабық проекциялары LGN-нен басқа орталықтарға барады."
    }
  },
  {
    "id": "mgn",
    "anchor": "geniculate-and-olfactory-exception",
    "term": {
      "RU": "Медиальное коленчатое тело (MGN)",
      "EN": "Medial geniculate nucleus (MGN)",
      "KZ": "Медиалдық тізелі дене (MGN)"
    },
    "definition": {
      "RU": "Важное таламическое реле слухового пути от нижних холмиков к слуховой коре. В отличие от простой односторонней схемы, слуховые проводящие сети ствола имеют двусторонние связи; изолированное одностороннее поражение выше этих переключений нельзя приравнивать к полной глухоте одного уха.",
      "EN": "The MGN relays auditory information from pathways involving the inferior colliculus to auditory cortex. Brainstem auditory connections are bilateral, not a single uncrossed wire; a unilateral lesion above those relays does not simply imply total deafness in one ear.",
      "KZ": "MGN — төменгі төмпешік арқылы өтетін есту жолынан есту қыртысына ақпарат беретін таламустық реле. Ми бағанындағы есту байланыстары екіжақты; сондықтан осы деңгейден жоғары біржақты зақымды бір құлақтың толық кереңдігімен теңестіруге болмайды."
    }
  },
  {
    "id": "trn",
    "anchor": "relay-feedback-and-inhibition",
    "term": {
      "RU": "Ретикулярное ядро таламуса (TRN)",
      "EN": "Thalamic reticular nucleus (TRN)",
      "KZ": "Таламустың ретикулярлық ядросы (TRN)"
    },
    "definition": {
      "RU": "Преимущественно ГАМК-ергические нейроны TRN тормозят другие таламические ядра и регулируют работу релейных сетей; они не образуют обычную возбуждающую проекцию к коре. TRN не следует путать с ретикулярной формацией ствола мозга, несмотря на сходство названий.",
      "EN": "TRN neurons are predominantly GABAergic and inhibit other thalamic nuclei, shaping relay activity rather than providing the usual excitatory thalamocortical projection. The thalamic reticular nucleus is distinct from the brainstem reticular formation despite similar names.",
      "KZ": "TRN нейрондары негізінен ГАМҚ-ергиялық: олар басқа таламустық ядроларды тежеп, релейлік белсенділікті реттейді; қыртысқа әдеттегі қоздырушы проекция бермейді. Атауы ұқсас болса да, бұл ядро ми бағанының ретикулярлық формациясынан бөлек."
    }
  },
  {
    "id": "somatotopy",
    "anchor": "somatosensory-relays-and-somatotopy",
    "term": {
      "RU": "Соматотопия",
      "EN": "Somatotopy",
      "KZ": "Соматотопия"
    },
    "definition": {
      "RU": "Упорядоченное представительство разных участков тела в сенсорных путях, таламусе и коре. В вентральном заднем комплексе области тела и лица имеют различное положение; это помогает рассуждать о локализации, но клиническая карта выпадений не даёт однозначного диагноза.",
      "EN": "Somatotopy is the ordered representation of body regions along sensory pathways, within thalamus and cortex. Body and facial representations occupy different regions of the ventral posterior complex; this guides localization but a sensory map alone does not establish a diagnosis.",
      "KZ": "Соматотопия — дене бөліктерінің сенсорлық жолдарда, таламуста және қыртыста реттеліп көрсетілуі. Вентралдық артқы кешенде дене мен бет аймақтары бөлек орналасады; бұл локализацияға көмектеседі, бірақ сезімталдық картасы өздігінен диагноз қоймайды."
    }
  },
  {
    "id": "olfaction",
    "anchor": "geniculate-and-olfactory-exception",
    "term": {
      "RU": "Обонятельное исключение",
      "EN": "Olfactory relay exception",
      "KZ": "Иіс сезу жолының ерекшелігі"
    },
    "definition": {
      "RU": "Первичная обонятельная информация достигает первичной обонятельной коры без обязательного предварительного переключения в таламусе. Это не означает полного отсутствия таламуса в обонятельных сетях: дальнейшая обработка запахов может включать медиодорсальные таламические связи.",
      "EN": "Primary olfactory signals reach primary olfactory cortex without an obligatory preceding thalamic relay. This does not mean that thalamus is absent from all olfactory processing: later olfactory networks can involve mediodorsal thalamic connections.",
      "KZ": "Алғашқы иіс сезу сигналдары бастапқы иіс қыртысына таламуста міндетті алдын ала ауысусыз жетеді. Бірақ таламус иіс өңдеуге мүлде қатыспайды деген сөз емес: кейінгі желілерге медиодорсалдық таламустық байланыстар кіруі мүмкін."
    }
  },
  {
    "id": "motor-va-vl",
    "anchor": "motor-associative-and-arousal-loops",
    "term": {
      "RU": "Вентральные передние и латеральные ядра (VA/VL)",
      "EN": "Ventral anterior and lateral nuclei (VA/VL)",
      "KZ": "Вентралдық алдыңғы және латералдық ядролар (VA/VL)"
    },
    "definition": {
      "RU": "VA/VL участвуют в таламокортикальных двигательных контурах, получая влияние базальных ганглиев и мозжечка и передавая сигналы моторным областям коры. Это не прямые мотонейроны мышцы; характер движения нельзя вычислить по одному обозначению ядра.",
      "EN": "VA/VL participate in motor thalamocortical loops influenced by basal ganglia and cerebellum and project toward motor cortical areas. They are not lower motor neurons directly activating muscle, and the movement outcome cannot be inferred from the nucleus label alone.",
      "KZ": "VA/VL базальды ганглийлер мен мишық ықпалына ұшырайтын таламо-қыртыстық қозғалыс контурларына қатысып, моторлық қыртыс аймақтарына сигнал жібереді. Бұлар бұлшықетті тікелей қоздыратын төменгі мотонейрондар емес; қимылды ядро атауынан ғана болжауға болмайды."
    }
  }
];
const introductions: Text = {
  "RU": "Сопоставляйте термин с ядром, основным входом, корковой мишенью и физиологическим ограничением. Различайте пути тела и лица, уровни перекрёста, возбуждающие реле и ГАМК-ергическое торможение; ссылки ведут к соответствующим подразделам теории.",
  "EN": "For each term, identify the nucleus or pathway, its input, cortical target and limits of interpretation. Distinguish body from facial pathways, levels of decussation, excitatory relays and GABAergic inhibition; links lead to the matching theory sections.",
  "KZ": "Әр термин үшін ядроны не жолды, негізгі кірісті, қыртыстық нысананы және түсіндіру шегін анықтаңыз. Дене мен бет жолдарын, айқасу деңгейін, қоздырушы релені және ГАМҚ-ергиялық тежелуді ажыратыңыз; сілтемелер теорияның тиісті бөліміне апарады."
};

export function createModuleFourteenGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length !== 2) {
    throw new Error("Module 14 glossary requires two foundation terms");
  }
  return {
    ...base,
    introduction: introductions[language],
    terms: [
      ...base.terms.map((item, index) => ({
        ...item,
        definition: baseDefinitions[index][language],
        target: { section: "theory" as const, anchor: index === 0 ? "thalamic-nuclear-map" : "relay-feedback-and-inhibition" }
      })),
      ...extra.map(item => ({
        id: "module-14-glossary-" + item.id,
        term: item.term[language],
        definition: item.definition[language],
        target: { section: "theory" as const, anchor: item.anchor }
      }))
    ]
  };
}
