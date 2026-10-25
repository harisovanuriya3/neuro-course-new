import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 10: brainstem reflex circuits and ascending arousal pathways.
// Physiology checked against Ghai Practical Physiology 8e, printed pp. 279–280
// (Library PDF 301–302); Ganong 23e, ch. 15, printed p. 231 (PDF 243);
// Guyton & Hall 13e, ch. 59, printed pp. 751–752 (PDF 718–719).
// These are ungraded reasoning questions, not instructions to examine the cornea.
type Choice = "a" | "b" | "c" | "d";
type Item = { prompt: string; options: [string,string,string,string]; answer: Choice; explanation: string };
type Locale = { intro: string; questions: [Item,Item,Item] };
const localized: Record<Language, Locale> = {
  "RU": {
    "intro": "Три диагностических вопроса о рефлексах черепных нервов и распределённых сетях ствола мозга. Они не оцениваются баллами. Выберите один ответ, затем проследите афферентное и эфферентное звенья либо объясните пределы клинического вывода. Не выполняйте болезненных проб на роговице.",
    "questions": [
      {
        "prompt": "При освещении правого глаза в учебной схеме сужаются оба зрачка. Какой путь лучше всего объясняет прямой и содружественный световые рефлексы при сохранных нервных структурах?",
        "options": [
          "Сигнал от правой сетчатки идёт только по правому III нерву к правому зрачку, а второй зрачок сужается через зрительную кору.",
          "Сигнал от сетчатки проходит по II нерву к претектальной области; двусторонние связи с ядрами Эдингера—Вестфаля активируют парасимпатические волокна III нервов и сфинктеры обоих зрачков.",
          "Свет возбуждает только симпатические волокна верхнего шейного узла, вызывая двустороннее сужение зрачков.",
          "Сужение обоих зрачков обеспечивается только VII нервами через круговые мышцы глаз без участия среднего мозга."
        ],
        "answer": "b",
        "explanation": "Афферентное звено светового рефлекса начинается в сетчатке и идёт по зрительному нерву (II) к претектальной области среднего мозга. Претектальные связи достигают обоих ядер Эдингера—Вестфаля; парасимпатические волокна в составе глазодвигательных нервов (III) переключаются в ресничных узлах и сокращают сфинктеры обоих зрачков. Поэтому освещение одного глаза вызывает прямой и содружественный ответы. По одному зрачковому признаку нельзя надёжно определить точную локализацию поражения."
      },
      {
        "prompt": "У пациента при неврологическом осмотре отсутствует моргательный ответ на лёгкое раздражение одной роговицы. Какую пару черепных нервов необходимо рассматривать при разборе афферентного и эфферентного звеньев корнеального рефлекса?",
        "options": [
          "II нерв как афферент и III нерв как эфферент, как при световом рефлексе зрачка.",
          "VIII нерв как афферент и VI нерв как эфферент, как при вестибулоокулярной стабилизации взгляда.",
          "IX нерв как афферент и X нерв как эфферент, как при глоточных защитных ответах.",
          "Глазная ветвь V нерва (V1) как афферент и VII нерв как эфферент к круговой мышце глаза; отсутствие ответа требует оценки обоих звеньев и стволовых связей."
        ],
        "answer": "d",
        "explanation": "Чувствительные волокна роговицы проходят преимущественно в глазной ветви тройничного нерва (V1), а моргание обеспечивается лицевым нервом (VII) через круговую мышцу глаза. Между ними работают стволовые интернейронные связи, обычно обеспечивающие двусторонний ответ. Отсутствие моргания само по себе не доказывает поражение конкретного ядра: возможны нарушения чувствительности, эфферентного пути, местные факторы и лекарственные влияния. Студентам не следует самостоятельно раздражать роговицу."
      },
      {
        "prompt": "После обширного поражения верхних отделов ствола мозга у пациента выраженно снижено бодрствование. Какое объяснение физиологически наиболее обосновано, если не делать вывод по одному симптому?",
        "options": [
          "Бодрствование определяется исключительно одним двигательным ядром моста, не связанным с таламусом и корой.",
          "Любое снижение бодрствования обязательно вызвано только повреждением периферических чувствительных нервов.",
          "Восходящие активирующие системы ствола, их таламические и другие переднемозговые связи участвуют в поддержании бодрствования; для клинического вывода нужно учитывать распространённость очага, лекарства и метаболические причины.",
          "Ретикулярная формация обеспечивает только коленный рефлекс и не участвует в регуляции состояния коры."
        ],
        "answer": "c",
        "explanation": "Ретикулярные и другие восходящие активирующие системы ствола связаны с таламусом, базальными отделами переднего мозга и корой; они участвуют в поддержании бодрствования. Ретикулярная формация — неоднородная сеть, а не один изолированный «центр сознания». Тяжёлое нарушение бодрствования возможно при поражениях этих путей, но его причины включают также лекарственные, метаболические и двусторонние полушарные нарушения. Один симптом не определяет локализацию или диагноз."
      }
    ]
  },
  "EN": {
    "intro": "Three ungraded diagnostic questions on cranial-nerve reflexes and distributed brainstem networks. Choose one answer, then trace the afferent and efferent limbs or explain the limits of clinical inference. Do not perform painful corneal stimulation.",
    "questions": [
      {
        "prompt": "In a teaching diagram, shining light into the right eye constricts both pupils. Which pathway best accounts for the direct and consensual pupillary light reflexes when the neural structures are intact?",
        "options": [
          "Signals from the right retina travel only in the right oculomotor nerve to the right pupil, and the other pupil constricts through the visual cortex.",
          "Retinal signals travel via CN II to the pretectal region; bilateral connections to the Edinger–Westphal nuclei recruit parasympathetic fibers in both CN III nerves and constrict both pupils.",
          "Light activates only sympathetic fibers from the superior cervical ganglion, producing bilateral pupillary constriction.",
          "Both pupils constrict solely through facial-nerve activation of the orbicularis oculi, without any midbrain involvement."
        ],
        "answer": "b",
        "explanation": "The afferent limb of the pupillary light reflex runs from the retina through the optic nerve (CN II) to the midbrain pretectal region. Pretectal connections reach both Edinger–Westphal nuclei; parasympathetic fibers in the oculomotor nerves (CN III) relay in the ciliary ganglia and activate both pupillary sphincters. Thus illumination of one eye normally causes direct and consensual constriction. A single pupillary finding does not reliably establish the precise site of a lesion."
      },
      {
        "prompt": "During a neurological examination, a patient does not blink in response to gentle stimulation of one cornea. Which cranial-nerve pair must be considered when identifying the afferent and efferent limbs of the corneal reflex?",
        "options": [
          "CN II as afferent and CN III as efferent, as in the pupillary light reflex.",
          "CN VIII as afferent and CN VI as efferent, as in vestibulo-ocular gaze stabilization.",
          "CN IX as afferent and CN X as efferent, as in some pharyngeal protective responses.",
          "The ophthalmic division of CN V (V1) as afferent and CN VII as efferent to orbicularis oculi; loss of blinking requires assessment of both limbs and their brainstem connections."
        ],
        "answer": "d",
        "explanation": "Corneal sensory afferents travel mainly in the ophthalmic division of the trigeminal nerve (V1), whereas blinking is mediated by the facial nerve (CN VII) acting on orbicularis oculi. Brainstem interneuronal connections normally support a bilateral blink response. Failure to blink alone does not prove a lesion of one specific nucleus: sensory, efferent, local ocular and medication-related factors must be considered. Students should not stimulate another person's cornea themselves."
      },
      {
        "prompt": "A patient has markedly reduced arousal after an extensive lesion involving the upper brainstem. Which explanation best fits physiology without drawing a diagnosis from this finding alone?",
        "options": [
          "Arousal depends exclusively on a single motor nucleus in the pons, with no connection to the thalamus or cortex.",
          "Any reduced arousal must result only from damage to peripheral sensory nerves.",
          "Ascending brainstem activating systems and their thalamic and other forebrain connections help maintain arousal; lesion extent, medications and metabolic causes must also be assessed.",
          "The reticular formation controls only the knee-jerk reflex and has no role in cortical state regulation."
        ],
        "answer": "c",
        "explanation": "Reticular and other ascending brainstem activating systems communicate with the thalamus, basal forebrain and cortex to support arousal. The reticular formation is a heterogeneous network, not a single isolated 'consciousness center'. Injury to these pathways may impair arousal, but drugs, metabolic disturbances and bilateral hemispheric lesions can also do so. A single sign cannot establish a precise lesion site or diagnosis."
      }
    ]
  },
  "KZ": {
    "intro": "Бассүйек жүйкелерінің рефлекстері мен ми бағанының таралған желілері туралы бағаланбайтын үш диагностикалық сұрақ. Бір жауапты таңдап, афференттік және эфференттік жолдарды немесе клиникалық қорытындының шегін түсіндіріңіз. Қасаң қабықты ауырсындыратын тәсілмен тітіркендірмеңіз.",
    "questions": [
      {
        "prompt": "Оқу сызбасында оң көзге жарық түсіргенде екі қарашық та тарылады. Жүйкелік құрылымдар сақталған жағдайда тікелей және келісілген жарық рефлекстерін қай жол дұрыс түсіндіреді?",
        "options": [
          "Оң торқабықтан сигнал тек оң III жүйкемен оң қарашыққа барады, ал екінші қарашық көру қыртысы арқылы тарылады.",
          "Торқабық сигналы II жүйкемен претекталдық аймаққа жетеді; екі жақтағы Эдингер—Вестфаль ядроларына байланыстар III жүйкелердегі парасимпатикалық талшықтарды белсендіріп, екі қарашық сфинктерін жиырады.",
          "Жарық тек жоғарғы мойын түйінінің симпатикалық талшықтарын қоздырып, екі қарашықты тарылтады.",
          "Екі қарашықтың тарылуын ортаңғы мидың қатысуынсыз VII жүйке арқылы көздің айналма бұлшықеті ғана қамтамасыз етеді."
        ],
        "answer": "b",
        "explanation": "Қарашықтың жарық рефлексінің афференттік жолы торқабықтан көру жүйкесімен (II) ортаңғы мидың претекталдық аймағына өтеді. Претекталдық байланыстар екі жақтағы Эдингер—Вестфаль ядроларына жетеді; көзқимылдатқыш жүйкелердегі (III) парасимпатикалық талшықтар кірпікшелі түйіндерде ауысып, екі қарашық сфинктерін жиырады. Сондықтан бір көзге жарық түскенде тікелей және келісілген жауаптар байқалады. Бір ғана қарашық белгісі зақымның нақты орнын дәл анықтамайды."
      },
      {
        "prompt": "Неврологиялық қарау кезінде науқастың бір қасаң қабығын жеңіл тітіркендіргенде кірпік қағу жауабы байқалмады. Қасаң қабық рефлексінің афференттік және эфференттік буындарын талдағанда қандай бассүйек жүйкелерін ескеру қажет?",
        "options": [
          "Қарашықтың жарық рефлексіндегідей II жүйке афферент, III жүйке эфферент болады.",
          "Көзқарасты вестибулоокулярлық тұрақтандырудағыдай VIII жүйке афферент, VI жүйке эфферент болады.",
          "Жұтқыншақтың кейбір қорғаныш жауаптарындағыдай IX жүйке афферент, X жүйке эфферент болады.",
          "V жүйкенің көз тармағы (V1) афферент, ал көздің айналма бұлшықетіне баратын VII жүйке эфферент болады; кірпік қағудың болмауы екі буын мен ми бағаны байланыстарын бағалауды қажет етеді."
        ],
        "answer": "d",
        "explanation": "Қасаң қабықтың сезімтал талшықтары көбіне үшкіл жүйкенің көз тармағымен (V1) өтеді, ал кірпік қағуды бет жүйкесі (VII) көздің айналма бұлшықеті арқылы қамтамасыз етеді. Ми бағанының аралық нейрондық байланыстары әдетте екі жақты кірпік қағу жауабын туғызады. Жауаптың болмауы жалғыз ядроның зақымын дәлелдемейді: сезімталдық, эфференттік жол, көздің жергілікті жағдайы және дәрілердің әсері ескеріледі. Студенттер басқа адамның қасаң қабығын өздігінен тітіркендірмеуі тиіс."
      },
      {
        "prompt": "Ми бағанының жоғарғы бөлімдерін қамтитын кең зақымнан кейін науқастың сергектігі айқын төмендеді. Бір белгі бойынша диагноз қоймай, қандай физиологиялық түсіндірме ең негізді болады?",
        "options": [
          "Сергектік тек көпірдегі бір қозғалтқыш ядроға тәуелді және таламуспен немесе қыртыспен байланыспайды.",
          "Сергектіктің кез келген төмендеуі міндетті түрде тек шеткі сезімтал жүйкелердің зақымынан болады.",
          "Ми бағанының жоғарылайтын белсендіруші жүйелері және олардың таламуспен әрі алдыңғы ми құрылымдарымен байланыстары сергектікті сақтауға қатысады; зақым көлемін, дәрілерді және зат алмасу себептерін де бағалау керек.",
          "Ретикулярлық формация тек тізе рефлексін реттейді және ми қыртысының белсенділік күйіне қатыспайды."
        ],
        "answer": "c",
        "explanation": "Ми бағанының ретикулярлық және өзге жоғарылайтын белсендіруші жүйелері таламуспен, алдыңғы мидың базалдық құрылымдарымен және қыртыспен байланысып, сергектікті қолдайды. Ретикулярлық формация — сананың жалғыз оқшауланған «орталығы» емес, әртүрлі нейрондық желі. Бұл жолдардың зақымы сергектікті төмендетуі мүмкін, бірақ дәрілер, зат алмасу бұзылыстары және екі жартышардың зақымдары да себеп болуы ықтимал. Бір белгі зақымның нақты орнын немесе диагнозды дәлелдемейді."
      }
    ]
  }
};

export function createModuleTenPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest", title, introduction: data.intro,
    questions: data.questions.map((q,index)=>({
      id: ["module-10-pretest-pupillary","module-10-pretest-corneal","module-10-pretest-arousal"][index],
      topic: moduleTitle, prompt: q.prompt,
      options: q.options.map((text,i)=>({id:["a","b","c","d"][i],text})),
      correctAnswer: q.answer, explanation: q.explanation,
      target: { section: "theory" as const },
    })),
  };
}
