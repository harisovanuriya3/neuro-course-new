import type { Language, Lesson } from "../types";

// Module 14 thalamus, evidence-informed original teaching text.
// Direct Library reading: Guyton & Hall 13e PDF 584-588 (ch. 48);
// Ganong 23e PDF 185-187 (ch. 11), 196 (ch. 12), 241-243 (ch. 15);
// C. L. Ghai Practical Physiology 8e PDF 323-325 (clinical sensory examination).
// These excerpts directly support somatosensory relays, cortical inputs, visual
// pathways and clinical limits. Other circuit details require further expert review.
// Educational overview, not a clinical diagnostic protocol.
type Text = Record<Language, string>;
type Section = { id: string; head: Text; paragraphs: [Text, Text] };
const sections: Section[] = [
  {
    "id": "thalamic-nuclear-map",
    "head": {
      "RU": "Группы ядер таламуса: не один универсальный переключатель",
      "EN": "Thalamic nuclear groups: not one universal relay",
      "KZ": "Таламус ядроларының топтары: бір ғана әмбебап ауыстырғыш емес"
    },
    "paragraphs": [
      {
        "RU": "Таламус — парная структура промежуточного мозга с несколькими функционально различными группами ядер. VPL передаёт преимущественно соматосенсорную информацию тела, VPM — лица; латеральное и медиальное коленчатые тела связаны соответственно со зрением и слухом. Названия ядер обозначают преимущественные связи, а не абсолютную изоляцию от других сетей.",
        "EN": "The paired thalamus contains multiple nuclear groups with different connections. VPL mainly relays somatosensory information from the body, VPM from the face; the lateral and medial geniculate nuclei are associated with vision and hearing, respectively. These names describe predominant pathways, not complete isolation from other networks.",
        "KZ": "Таламус — аралық мида орналасқан жұп құрылым; оның ядро топтарының байланыстары мен қызметтері әртүрлі. VPL көбіне денеден келетін соматосенсорлық ақпаратты, VPM беттен келетін ақпаратты өткізеді. Латералдық тізелі дене көрумен, медиалдық тізелі дене естумен байланысты. Бұл атаулар басым жолдарды білдіреді, басқа жүйелерден толық оқшаулануды емес."
      },
      {
        "RU": "VA/VL участвуют в двигательных петлях с базальными ганглиями, мозжечком и корой; передние ядра связаны с лимбическими контурами, медиодорсальное — с префронтальными сетями, а интраламинарные ядра имеют более широкие проекции. Функцию таламуса нельзя сводить к передаче всех сигналов в одно и то же корковое поле. При интерпретации схемы всегда указывайте конкретное ядро, вход, выход и задачу.",
        "EN": "VA/VL participate in motor loops linking basal ganglia, cerebellum and cortex; anterior nuclei are associated with limbic circuits, the mediodorsal nucleus with prefrontal networks, and intralaminar nuclei have broader projections. Thalamic function is not the delivery of every signal to one cortical field. When interpreting a diagram, specify the nucleus, its input, output and task.",
        "KZ": "VA/VL базальды ганглийлерді, мишықты және қыртысты байланыстыратын қозғалыс ілмектеріне қатысады. Алдыңғы ядролар лимбиялық тізбектермен, медиодорсалдық ядро префронталдық желілермен, ал интраламинарлық ядролар кең таралған проекциялармен байланысты. Барлық сигнал бір қыртыстық аймаққа беріледі деуге болмайды. Сызбада ядроны, оның кірісін, шығысын және қызметін жеке көрсетіңіз."
      }
    ]
  },
  {
    "id": "somatosensory-relays-and-somatotopy",
    "head": {
      "RU": "Соматосенсорные пути, перекрёсты и соматотопия",
      "EN": "Somatosensory pathways, decussations and somatotopy",
      "KZ": "Соматосенсорлық жолдар, айқасу және соматотопия"
    },
    "paragraphs": [
      {
        "RU": "Тонкое осязание, вибрация и осознанная проприоцепция тела идут по задним канатикам к ядрам Голля и Бурдаха в продолговатом мозге. После переключения аксоны второго нейрона перекрещиваются и поднимаются в медиальной петле к вентральным задним ядрам таламуса, прежде всего VPL. Оттуда таламокортикальные нейроны проецируются преимущественно к постцентральной коре. Указание уровня перекрёста принципиально для клинической локализации.",
        "EN": "Fine touch, vibration and conscious proprioception from the body ascend in the dorsal columns to the gracile and cuneate nuclei in the medulla. Second-order axons then decussate and ascend in the medial lemniscus to ventral posterior thalamic nuclei, especially VPL. Thalamocortical neurons project mainly to postcentral somatosensory cortex. The level of crossing matters when reasoning about the side of a lesion.",
        "KZ": "Денеден келетін нәзік жанасу, діріл және саналы проприоцепция сигналдары жұлынның артқы бағандары арқылы сопақша мидағы нәзік және сына тәрізді ядроларға жетеді. Екінші нейрон аксондары осы жерде айқасып, медиалдық ілмекпен таламустың вентралдық артқы ядроларына, әсіресе VPL-ге көтеріледі. Одан кейін сигналдар постцентралдық соматосенсорлық қыртысқа барады. Айқасу деңгейі зақым жағын талдауда маңызды."
      },
      {
        "RU": "Болевые и температурные сигналы в основном переключаются в заднем роге и переходят на противоположную сторону в спинном мозге, поднимаясь в переднебоковой системе; их таламические и корковые проекции шире, чем у одного VPL. Чувствительность лица поступает по тройничным путям преимущественно в VPM. Соматотопическая организация сохраняет различия между участками тела, но сама по себе не объясняет все аспекты боли, внимания и осознания ощущения.",
        "EN": "Pain and temperature pathways mainly synapse in the dorsal horn, cross within the spinal cord and ascend in the anterolateral system; their thalamic and cortical targets extend beyond VPL alone. Facial sensation reaches mainly VPM through trigeminal pathways. Somatotopic organization preserves information about body location, but cannot by itself explain every component of pain, attention or conscious sensation.",
        "KZ": "Ауырсыну мен температура сигналдары көбіне жұлынның артқы мүйізінде ауысып, жұлын деңгейінде қарсы жаққа өтеді де, алдыңғы-бүйірлік жүйемен жоғары көтеріледі. Олардың таламустық және қыртыстық нысаналары тек VPL-мен шектелмейді. Бет сезімталдығы үшкіл жүйке жолдары арқылы көбіне VPM-ге жетеді. Соматотопия дене бөліктерінің орналасуын сақтайды, бірақ ауырсыну мен саналы қабылдаудың барлық қырын түсіндірмейді."
      }
    ]
  },
  {
    "id": "geniculate-and-olfactory-exception",
    "head": {
      "RU": "Зрительный и слуховой пути; исключение для обоняния",
      "EN": "Visual and auditory pathways; the olfactory exception",
      "KZ": "Көру және есту жолдары; иіс сезу ерекшелігі"
    },
    "paragraphs": [
      {
        "RU": "Основной путь осознанного зрения проходит от ганглиозных клеток сетчатки через зрительный нерв, хиазму и тракт к латеральному коленчатому телу, затем по зрительной лучистости к первичной зрительной коре V1. Волокна от носовых половин сетчаток перекрещиваются в хиазме, а от височных — преимущественно остаются на своей стороне. Часть ретинальных сигналов направляется также к претектальной области, верхним холмикам и супрахиазматическому ядру; поэтому схема не должна изображать ЛКТ единственной мишенью сетчатки.",
        "EN": "The principal pathway for conscious vision runs from retinal ganglion cells through optic nerve, chiasm and tract to the lateral geniculate nucleus, then via optic radiations to primary visual cortex V1. Fibres from nasal hemiretinae cross in the chiasm, while temporal hemiretinal fibres largely remain ipsilateral. Other retinal projections reach pretectal regions, superior colliculi and the suprachiasmatic nucleus; the lateral geniculate is not the retina's only target.",
        "KZ": "Саналы көрудің негізгі жолы торқабықтың ганглиоздық жасушаларынан көру жүйкесі, хиазма және көру жолы арқылы латералдық тізелі денеге, одан көру сәулеленуімен V1 қыртысына өтеді. Торқабықтың мұрындық жартысынан шыққан талшықтар хиазмада айқасады, самайлық жартысының талшықтары көбіне өз жағында қалады. Торқабықтан претекталдық аймаққа, жоғарғы төмпешіктерге және супрахиазмалық ядроға да тармақтар барады; латералдық тізелі дене жалғыз нысана емес."
      },
      {
        "RU": "Слуховые сигналы после стволовых переключений и нижних холмиков поступают к медиальному коленчатому телу, затем к слуховой коре; стволовые слуховые связи двусторонние, поэтому их нельзя описывать как простой односторонний провод. Обонятельная информация достигает первичной обонятельной коры без обязательного первого переключения в таламусе, хотя дальнейшая обработка включает таламические связи. Формулировка «все ощущения без исключения сначала проходят таламус» неверна.",
        "EN": "After brainstem relays and the inferior colliculus, auditory signals reach the medial geniculate nucleus and then auditory cortex. Bilateral brainstem auditory connections make this more than a single unilateral wire. Olfactory input reaches primary olfactory cortex without an obligatory first thalamic relay, although later processing involves thalamic connections. Thus the claim that every sensory modality first passes through thalamus is incorrect.",
        "KZ": "Есту сигналдары ми бағанындағы бірнеше ауысудан және төменгі төмпешіктен кейін медиалдық тізелі денеге, одан есту қыртысына жетеді. Ми бағанындағы есту байланыстары екіжақты болғандықтан, оны бір жақты қарапайым өткізгіш деп көрсету дұрыс емес. Иіс сезу ақпараты бастапқы иіс қыртысына таламуста міндетті алғашқы ауысусыз жетеді, бірақ кейінгі өңдеуге таламустық байланыстар қатысады. Сондықтан барлық сезім алдымен таламустан өтеді деу қате."
      }
    ]
  },
  {
    "id": "relay-feedback-and-inhibition",
    "head": {
      "RU": "Возбуждающие реле, корковая обратная связь и торможение",
      "EN": "Excitatory relays, cortical feedback and inhibition",
      "KZ": "Қоздырушы реле, қыртыстық кері байланыс және тежелу"
    },
    "paragraphs": [
      {
        "RU": "Большинство специфических таламокортикальных релейных нейронов используют глутамат и возбуждают корковые мишени; в сенсорных областях важной мишенью является IV слой коры. Кортикоталамические проекции возвращают информацию от коры к таламусу и изменяют обработку входа в зависимости от активности сети. Поэтому «переключение» — это не механическое копирование импульса, а взаимодействие входящих, нисходящих и местных сигналов.",
        "EN": "Most specific thalamocortical relay neurons use glutamate and excite cortical targets; layer IV is an important target in sensory cortex. Corticothalamic projections return information from cortex to thalamus and shape input processing according to network activity. A relay therefore does not merely copy each incoming impulse: ascending inputs, descending feedback and local interactions all matter.",
        "KZ": "Арнайы таламокортикалық релейлік нейрондардың көбі глутамат бөліп, қыртыстағы нысаналарды қоздырады; сенсорлық қыртыста IV қабат маңызды қабылдаушы аймақ болып саналады. Қыртыс-таламус проекциялары ақпаратты кері жеткізіп, желі белсенділігіне қарай кіріс сигналдарының өңделуін өзгертеді. Демек, реле импульсті жай ғана көшірмейді: жоғарылаушы кіріс, төмендеуші кері байланыс және жергілікті өзара әсер маңызды."
      },
      {
        "RU": "Ретикулярное ядро таламуса содержит преимущественно ГАМК-ергические тормозные нейроны, которые регулируют активность других таламических ядер. Это ядро нельзя смешивать с ретикулярной формацией ствола мозга: названия похожи, но анатомические структуры и связи различаются. Усиление тормозного входа в условной модели может изменить ответ релейного нейрона; по такой модели нельзя напрямую вычислить субъективное восприятие, сознание или диагноз пациента.",
        "EN": "The thalamic reticular nucleus consists predominantly of GABAergic inhibitory neurons that regulate other thalamic nuclei. It must not be confused with the brainstem reticular formation: the names resemble one another but their anatomy and connections differ. More inhibitory input in a simplified model may change a relay neuron's response, but does not directly predict conscious experience, awareness or a patient's diagnosis.",
        "KZ": "Таламустың ретикулярлық ядросында негізінен ГАМҚ қолданатын тежегіш нейрондар орналасады; олар басқа таламустық ядролардың белсенділігін реттейді. Оны ми бағанының ретикулярлық формациясымен шатастыруға болмайды: атауы ұқсас болғанымен, анатомиясы мен байланыстары бөлек. Оқу моделінде тежегіш кірістің күшеюі релейлік нейрон жауабын өзгертуі мүмкін, бірақ осыдан қабылдауды, сананы немесе диагнозды тікелей анықтауға болмайды."
      }
    ]
  },
  {
    "id": "motor-associative-and-arousal-loops",
    "head": {
      "RU": "Двигательные, ассоциативные контуры и бодрствование",
      "EN": "Motor and associative loops and wakefulness",
      "KZ": "Қозғалыстық, ассоциациялық ілмектер және сергектік"
    },
    "paragraphs": [
      {
        "RU": "Вентральные передние и вентральные латеральные ядра включены в контуры с базальными ганглиями и мозжечком, которые влияют на моторные области коры. Эти связи помогают выбирать, подготавливать и корректировать движения, но не означают, что таламус непосредственно иннервирует мышцы. Передние и медиодорсальные ядра взаимодействуют с лимбическими и префронтальными сетями; поэтому таламус участвует не только в ощущениях, но и в задачах поведения и познания.",
        "EN": "Ventral anterior and ventral lateral nuclei belong to loops with basal ganglia and cerebellum that influence motor cortical areas. These connections help select, prepare and adjust movement, but do not mean that thalamus directly innervates muscles. Anterior and mediodorsal nuclei interact with limbic and prefrontal networks, so thalamic function extends beyond sensation to behaviour and cognition.",
        "KZ": "Вентралдық алдыңғы және вентралдық латералдық ядролар базальды ганглийлермен және мишықпен бірге қозғалыс қыртысына әсер ететін ілмектерге кіреді. Бұл байланыстар қимылды таңдауға, дайындауға және түзетуге көмектеседі, бірақ таламус бұлшықеттерді тікелей жүйкелендірмейді. Алдыңғы және медиодорсалдық ядролар лимбиялық әрі префронталдық желілермен байланысады; таламус сезімнен бөлек мінез-құлық пен танымға да қатысады."
      },
      {
        "RU": "Восходящие активирующие системы ствола мозга взаимодействуют с интраламинарными и другими таламическими ядрами и широкими корковыми сетями, участвуя в регуляции бодрствования и внимания. Однако сознание не локализуется в одном ядре, а нарушения бодрствования не доказывают изолированное поражение таламуса. На схеме различайте специфическую сенсорную передачу, широкую модуляцию активности и корково-таламические петли; эти процессы взаимосвязаны, но не тождественны.",
        "EN": "Ascending activating systems of the brainstem interact with intralaminar and other thalamic nuclei and widespread cortical networks in regulating arousal and attention. Consciousness is not located in one nucleus, and reduced wakefulness does not establish an isolated thalamic lesion. Distinguish specific sensory transmission, broad modulation of network activity and corticothalamic loops on diagrams; they interact but are not identical.",
        "KZ": "Ми бағанының жоғарылаушы белсендіруші жүйелері интраламинарлық және басқа таламустық ядролармен, сондай-ақ кең қыртыстық желілермен әрекеттесіп, сергектік пен зейінді реттеуге қатысады. Сана бір ғана ядрода орналаспайды, ал сергектіктің төмендеуі таламустың оқшау зақымын дәлелдемейді. Сызбада нақты сенсорлық берілісті, желі белсенділігінің кең модуляциясын және қыртыс-таламус ілмектерін ажыратыңыз; олар байланысты, бірақ бірдей емес."
      }
    ]
  },
  {
    "id": "clinical-testing-and-inference-limits",
    "head": {
      "RU": "Клиническая оценка и пределы экспериментальных выводов",
      "EN": "Clinical assessment and limits of experimental inference",
      "KZ": "Клиникалық бағалау және тәжірибелік қорытындының шегі"
    },
    "paragraphs": [
      {
        "RU": "Проверка прикосновения, вибрации, положения сустава и двухточечной дискриминации помогает описать сенсорный дефицит, но не определяет его анатомическую причину по одной пробе. Нарушение возможно на уровне рецептора, периферического нерва, спинного мозга, ствола, таламуса или коры. Сопоставляйте модальность, сторону, распределение, другие неврологические признаки и обстоятельства появления симптомов. Внезапный очаговый дефицит требует срочной медицинской оценки.",
        "EN": "Tests of touch, vibration, joint position and two-point discrimination describe sensory impairment but do not identify its anatomical cause from one result. Dysfunction may arise in receptors, peripheral nerves, spinal cord, brainstem, thalamus or cortex. Compare modality, side, distribution, accompanying neurological signs and time of onset. A sudden focal deficit requires urgent medical assessment.",
        "KZ": "Жанасуды, дірілді, буын қалпын және екі нүктені ажыратуды тексеру сезімталдық бұзылысын сипаттайды, бірақ бір сынама оның анатомиялық себебін анықтамайды. Өзгеріс рецепторда, шеткі жүйкеде, жұлында, ми бағанында, таламуста немесе қыртыста болуы мүмкін. Сезім түрін, жағын, таралуын, қосымша неврологиялық белгілерді және басталу уақытын салыстырыңыз. Кенет пайда болған ошақты тапшылық шұғыл медициналық бағалауды қажет етеді."
      },
      {
        "RU": "В учебном эксперименте можно сравнить точность обнаружения слабого стимула или время реакции при двух условиях внимания, сохраняя интенсивность, длительность, число попыток и правила ответа. Сначала запишите прогноз, затем результаты и возможные смешивающие факторы: утомление, обучение, мотивацию, шум. Даже статистически заметное различие поведения не доказывает изменение активности конкретного таламического ядра без независимой нейрофизиологической регистрации; не придумывайте измерения или клинические диагнозы.",
        "EN": "A teaching experiment may compare weak-stimulus detection accuracy or reaction time between attentional conditions while holding stimulus intensity, duration, trial count and response rules constant. Record a prediction first, then results and possible confounders such as fatigue, practice, motivation and noise. Even a clear behavioural difference does not establish activity changes in one thalamic nucleus without independent physiological measurement; do not invent data or diagnoses.",
        "KZ": "Оқу тәжірибесінде зейіннің екі жағдайында әлсіз стимулды анықтау дәлдігін немесе реакция уақытын салыстыруға болады; стимул қарқындылығын, ұзақтығын, сынақ санын және жауап ережесін тұрақты ұстаңыз. Әуелі болжамды, содан кейін нәтижені және шаршау, жаттығу, ынта, шу сияқты ықпалдарды жазыңыз. Мінез-құлықтағы айқын айырмашылықтың өзі тәуелсіз физиологиялық тіркеусіз нақты таламустық ядро белсенділігінің өзгергенін дәлелдемейді; дерек пен диагнозды ойдан қоспаңыз."
      }
    ]
  }
];

export function createModuleFourteenTheory(
  language: Language,
  base: Lesson & { kind: "theory" }
): Lesson & { kind: "theory" } {
  return {
    ...base,
    sections: [
      ...base.sections,
      ...sections.map(section => ({
        id: section.id,
        title: section.head[language],
        blocks: section.paragraphs.map(paragraph => ({
          type: "paragraph" as const,
          text: paragraph[language]
        }))
      }))
    ]
  };
}
