import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 14: thalamic clinical bridge, original teaching scenarios.
// Evidence checked in Library: Guyton & Hall 13e PDF pp. 584–586;
// Ganong 23e PDF pp. 185–187, 196–197, 241–243;
// C. L. Ghai Practical Physiology 8e PDF pp. 323–327.
// These are mechanisms and localization limits, not diagnostic rules.
type Copy = { intro: string; titles: string[]; paragraphs: string[] };
const data: Record<Language, Copy> = {
  "RU": {
    "intro": "Клиническая связь с физиологией таламуса: сопоставьте сторону и модальность чувствительных нарушений, релейное ядро, уровень перекрёста и альтернативные места поражения. Это учебные ситуации, а не диагностический алгоритм; по одному симптому нельзя доказать очаг.",
    "titles": [
      "Чувствительность половины тела: VPL и границы локализации",
      "Лицо и тело: почему важно различать VPM и VPL",
      "Разные модальности: сравнение двух восходящих систем",
      "Выпадение половины поля зрения: латеральное коленчатое тело",
      "Внезапное нарушение чувствительности: срочность и ограничения"
    ],
    "paragraphs": [
      "Учебная ситуация: у человека снижены вибрационная и позиционная чувствительность в левой руке и ноге, но отдельная проверка силы не выявляет выраженного пареза. Заднеканатиковые волокна переключаются в продолговатом мозге, перекрещиваются и идут по медиальной петле преимущественно к VPL противоположного таламуса, затем к постцентральной коре. Правостороннее поражение на этом участке пути возможно, но аналогичные симптомы могут возникнуть в стволе, таламокортикальных волокнах или коре. Сравните обе стороны, лицо, боль, температуру, вибрацию и положение суставов; не устанавливайте очаг только по стороне симптомов.",
      "Учебная ситуация: у человека изменена чувствительность правой половины лица и правой руки. Тройничные соматосенсорные пути преимущественно переключаются в VPM, а информация от тела — в VPL. Их соседство в вентральной задней группе помогает объяснить совместные симптомы, но не доказывает поражение именно таламуса. Сравните чувствительность лица и туловища по разным модальностям, движения глаз, речь и другие признаки; учитывайте стволовые пути и таламокортикальные проекции. Вопрос студенту: какие дополнительные наблюдения помогут отличить повреждение периферического нерва от центрального нарушения?",
      "Учебная ситуация: пациент хуже распознаёт положение пальцев и вибрацию, тогда как ощущение укола и температуры относительно сохранено. Тонкое осязание, вибрация и осознанная проприоцепция преимущественно связаны с системой задних канатиков — медиальной петли; боль и температура — с переднебоковой системой. Первая пересекает среднюю линию в продолговатом мозге, вторая — преимущественно в спинном мозге. Такая диссоциация заставляет сравнивать разные проводящие пути и уровни, а не автоматически приписывать нарушение одному ядру таламуса. Опишите необходимую безопасную проверку каждой модальности и её ограничения.",
      "Учебная ситуация: при исследовании полей зрения выявлено сходное выпадение левой половины поля зрения обоих глаз. После перекрёста носовых ретинальных волокон в хиазме правый зрительный тракт, латеральное коленчатое тело, зрительная лучистость и правая первичная зрительная кора участвуют в обработке левого поля зрения. Повреждение на нескольких уровнях может давать сходный результат; само по себе поле зрения не определяет очаг в коленчатом теле. Нужно отдельно оценить остроту зрения, зрачковые реакции, поля зрения и другие признаки. Вопрос: почему выпадение поля зрения нельзя объяснять поражением VPL?",
      "Учебная ситуация: у взрослого внезапно появилась новая потеря чувствительности половины тела, возможно с нарушением речи, зрения, движений или равновесия. Это требует срочной медицинской оценки, поскольку среди возможных причин есть острое сосудистое поражение мозга. Таламус, внутреннюю капсулу, ствол и кору нельзя надёжно различить по одному короткому учебному описанию; отсутствие слабости не исключает опасное состояние. Для учебного ответа перечислите время начала, распределение и модальности нарушений, сопутствующие симптомы и необходимость немедленной помощи, не ставя диагноз и не предлагая самостоятельное лечение."
    ]
  },
  "EN": {
    "intro": "Clinical bridge to thalamic physiology: compare laterality, sensory modality, relay nucleus, decussation level and alternative lesion sites. These are teaching scenarios, not a diagnostic algorithm; a single symptom cannot establish a lesion.",
    "titles": [
      "Hemibody sensation: VPL and localization limits",
      "Face and body: distinguishing VPM from VPL",
      "Different modalities: comparing two ascending systems",
      "Homonymous field loss: the lateral geniculate pathway",
      "Sudden sensory change: urgency and uncertainty"
    ],
    "paragraphs": [
      "Teaching scenario: vibration and joint-position sense are reduced in the left arm and leg, while separate strength testing reveals no major paresis. Dorsal-column signals relay in the medulla, cross and ascend through the medial lemniscus mainly to the contralateral thalamic VPL, then to postcentral cortex. A right-sided interruption along this route is possible, but similar findings can arise in the brainstem, thalamocortical fibers or cortex. Compare both sides, face, pain, temperature, vibration and joint position; laterality alone does not pinpoint a thalamic lesion.",
      "Teaching scenario: sensation is altered over the right side of the face and the right arm. Trigeminal somatosensory signals relay mainly through VPM, whereas body sensation reaches VPL. Their proximity within the ventral posterior group helps explain combined findings but does not prove that the thalamus is the site of injury. Compare facial and body modalities, eye movements, speech and other signs; consider brainstem pathways and thalamocortical projections. Which additional observations would distinguish a peripheral nerve disorder from a central sensory deficit?",
      "Teaching scenario: a person has impaired joint-position and vibration perception but relatively preserved pinprick and temperature sensation. Discriminative touch, vibration and conscious proprioception predominantly use the dorsal-column–medial-lemniscal pathway; pain and temperature mainly use the anterolateral system. The former crosses in the medulla, whereas the latter crosses mainly in the spinal cord. This dissociation calls for comparison of pathways and lesion levels rather than automatic attribution to one thalamic nucleus. Describe safe tests of each modality and the limits of the findings.",
      "Teaching scenario: visual-field testing suggests loss of the left half of the visual field in both eyes. After nasal retinal fibers cross in the chiasm, the right optic tract, lateral geniculate nucleus, optic radiations and right primary visual cortex contribute to processing the left visual field. Damage at several levels may cause a similar pattern; the field defect alone cannot identify a lateral geniculate lesion. Evaluate visual acuity, pupillary responses, visual fields and accompanying findings separately. Why is VPL not the appropriate visual relay?",
      "Teaching scenario: an adult develops sudden new loss of sensation on one side of the body, perhaps accompanied by speech, vision, movement or balance changes. Urgent medical assessment is required because an acute cerebrovascular event is among the possibilities. The thalamus, internal capsule, brainstem and cortex cannot be reliably distinguished from this brief description; absence of weakness does not rule out danger. In a teaching response, document onset time, distribution, modalities, associated symptoms and need for immediate help, without assigning a diagnosis or self-treatment."
    ]
  },
  "KZ": {
    "intro": "Таламус физиологиясының клиникалық байланысы: сезімталдық бұзылысының жағын, түрін, өткізгіш ядросын, айқасу деңгейін және зақымның балама орындарын салыстырыңыз. Бұл — оқу жағдайлары, диагноз қою алгоритмі емес; бір белгі зақым ошағын дәлелдемейді.",
    "titles": [
      "Дене жартысының сезімталдығы: VPL және локализация шегі",
      "Бет пен дене: VPM және VPL айырмашылығы",
      "Сезімталдық түрлері: екі жоғарылаушы жүйені салыстыру",
      "Көру өрісінің жартысы жоғалуы: латералдық тізелі дене",
      "Кенет сезімталдық бұзылысы: шұғылдық пен белгісіздік"
    ],
    "paragraphs": [
      "Оқу жағдайы: адамның сол қолы мен аяғында діріл мен буын қалпын сезу төмендеген, ал бұлшықет күшін бөлек тексергенде айқын парез байқалмайды. Артқы баған сигналдары сопақша мида ауысып, айқасқаннан кейін медиалдық ілмек арқылы қарсы жақтағы таламустың VPL ядросына, одан постцентралдық қыртысқа барады. Осы жолдың оң жақтағы бөлігі зақымдануы мүмкін, бірақ ұқсас белгілер ми бағанында, таламус-қыртыс талшықтарында немесе қыртыста да пайда болады. Екі жақты, бетті, ауырсынуды, температураны, дірілді және буын қалпын салыстырыңыз; тек белгінің жағына қарап таламустағы ошақты анықтамаңыз.",
      "Оқу жағдайы: адамның бетінің оң жартысы мен оң қолының сезімталдығы өзгерген. Үшкіл жүйкенің соматосенсорлық сигналдары көбіне VPM ядросына, ал денеден келетін сигналдар VPL ядросына беріледі. Бұл ядролардың вентралдық артқы топта жақын орналасуы қатар байқалған белгілерді түсіндіруге көмектеседі, бірақ зақым дәл таламуста екенін дәлелдемейді. Бет пен денедегі әртүрлі сезімталдықты, көз қимылдарын, сөйлеуді және басқа белгілерді салыстырыңыз; ми бағанының жолдары мен қыртысқа баратын талшықтарды ескеріңіз. Шеткі жүйке зақымын орталық бұзылыстан ажырату үшін қандай қосымша дерек керек?",
      "Оқу жағдайы: адам саусақтарының қалпын және дірілді нашар сезеді, бірақ шаншу мен температураны салыстырмалы жақсы ажыратады. Нәзік жанасу, діріл және саналы проприоцепция негізінен артқы баған — медиалдық ілмек жүйесімен, ал ауырсыну мен температура алдыңғы-бүйірлік жүйемен өтеді. Бірінші жол сопақша мида, екіншісі көбіне жұлын деңгейінде айқасады. Мұндай айырмашылықты бір ғана таламус ядросына телімей, жолдар мен зақым деңгейлерін салыстыру керек. Әр сезімталдық түрін қауіпсіз тексеру тәсілін және оның шектеулерін сипаттаңыз.",
      "Оқу жағдайы: көру өрісін тексергенде екі көздің де сол жақ жартысында ұқсас жоғалу байқалады. Тор қабықтың мұрын жақ талшықтары хиазмада айқасқаннан кейін оң жақ көру жолы, латералдық тізелі дене, көру сәулеленуі және оң жақ бастапқы көру қыртысы сол көру өрісін өңдеуге қатысады. Бірнеше деңгейдегі зақым ұқсас нәтиже беруі мүмкін; көру өрісінің бұзылысы ғана тізелі денедегі ошақты дәлелдемейді. Көру өткірлігін, қарашық реакциясын, көру өрісін және қосымша белгілерді бөлек бағалаңыз. Неліктен VPL көру жолының негізгі релесі емес?",
      "Оқу жағдайы: ересек адамда денесінің бір жартысында сезімталдық кенет төмендеп, оған сөйлеу, көру, қозғалу немесе тепе-теңдік бұзылыстары қосылуы мүмкін. Шұғыл медициналық бағалау қажет, себебі ықтимал себептердің бірі — мидың жедел тамырлық зақымдануы. Осы қысқа сипаттама бойынша таламусты, ішкі капсуланы, ми бағанын және қыртысты сенімді ажырату мүмкін емес; әлсіздіктің болмауы қауіпсіздікті білдірмейді. Оқу жауабында басталу уақытын, бұзылыстың таралуын, сезімталдық түрлерін, қосымша белгілерді және жедел көмек қажеттігін көрсетіңіз; диагноз қоймаңыз және өз бетінше ем ұсынбаңыз."
    ]
  }
};

export function createModuleFourteenClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const destinations = [
    ["theory", "practice"],
    ["theory", "cases"],
    ["practice", "theory"],
    ["theory", "interactive"],
    ["cases", "references"],
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.intro,
    cards: copy.titles.map((title, index) => ({
      id: "module-14-clinical-" + (index + 1),
      title,
      paragraphs: [copy.paragraphs[index]],
      links: destinations[index].map(section => ({ section })),
    })),
  };
}
