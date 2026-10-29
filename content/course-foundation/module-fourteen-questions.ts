import type { Language } from "../course";

// Module 14: original, evidence-checked thalamic review questions.
// Guyton & Hall 13e PDF 584–586; Ganong 23e PDF 241–243;
// C. L. Ghai 8e PDF 323–325. Free-text answers are self-assessed,
// not automatically marked as physiologically correct or diagnostic.
const entries = [
  {
    "id": "relay",
    "target": "theory",
    "prompt": {
      "RU": "Сравните путь сигнала от вибрации в левой кисти и прикосновения к левой щеке: какие таламические ядра преимущественно участвуют, куда они проецируются и почему важно учитывать перекрёсты?",
      "EN": "Compare the route of vibration from the left hand with touch from the left cheek. Which thalamic relay nuclei and cortical targets are mainly involved, and why must the relevant crossings be considered?",
      "KZ": "Сол қолдағы діріл мен сол жақ бетке жанасу сигналдарының жолын салыстырыңыз. Қай таламустық ядролар мен қыртыс аймақтары басым қатысады және айқасу деңгейін неге ескеру керек?"
    },
    "explanation": {
      "RU": "Сигналы от тела проходят преимущественно через VPL, от лица — через VPM; оба реле направляют информацию к соматосенсорной коре. Для левых стимулов после соответствующих перекрёстов обычно существенны правые центральные проекции. По одной жалобе нельзя уверенно определить уровень поражения.",
      "EN": "Body somatosensory signals mainly reach VPL, while facial trigeminal signals mainly reach VPM; both project to somatosensory cortex. Left-sided inputs usually involve right-sided central representations after their respective crossings. A single sensory complaint cannot establish a lesion level.",
      "KZ": "Дене сезімталдығының сигналдары көбіне VPL арқылы, ал беттен келетін үшкіл жүйке сигналдары VPM арқылы өтеді; екеуі де соматосенсорлық қыртысқа бағытталады. Сол жақтан келген ақпарат тиісті айқасулардан кейін көбіне оң жақта бейнеленеді. Бір шағым зақым деңгейін нақты анықтамайды."
    }
  },
  {
    "id": "crossings",
    "target": "theory",
    "prompt": {
      "RU": "У пациента ниже шейного уровня слева нарушена вибрационная чувствительность, а справа — болевая и температурная. Как различаются уровни перекрёста двух восходящих систем и какие данные нужны для проверки гипотезы?",
      "EN": "Below a cervical level, vibration is impaired on the left but pain and temperature on the right. Compare where the two ascending systems cross and name additional findings needed before localizing a lesion.",
      "KZ": "Мойын деңгейінен төмен сол жақта дірілді сезу, ал оң жақта ауырсыну мен температураны сезу бұзылған. Екі жоғарылаушы жол қай деңгейде айқасады және зақымды анықтау үшін тағы қандай деректер қажет?"
    },
    "explanation": {
      "RU": "Заднеканатиковая система несёт вибрацию и осознанную проприоцепцию на своей стороне спинного мозга и перекрещивается после переключения в продолговатом мозге. Болевая и температурная информация обычно переходит на противоположную сторону в спинном мозге. Нужны точные границы выпадения, сила, рефлексы и другие признаки; схема не заменяет осмотр.",
      "EN": "Dorsal-column vibration and conscious proprioceptive fibres ascend ipsilaterally in the cord and cross after synapsing in the medulla. Pain and temperature pathways generally cross in the spinal cord. Sensory levels, strength, reflexes and other signs are needed; this pattern alone is not a definitive diagnosis.",
      "KZ": "Артқы бағандар діріл мен саналы проприоцепцияны жұлында өз жағымен өткізіп, сопақша мида ауысқаннан кейін айқасады. Ауырсыну мен температура жолдары көбіне жұлын деңгейінде қарсы жаққа өтеді. Сезімталдық шекарасын, күшті, рефлекстерді және өзге белгілерді бағаламай диагноз қоюға болмайды."
    }
  },
  {
    "id": "inhibition",
    "target": "theory",
    "prompt": {
      "RU": "Сравните возбуждающие таламокортикальные нейроны и ГАМК-ергические нейроны ретикулярного ядра таламуса. Куда направлены их аксоны и почему усиление торможения не тождественно полному выключению ощущений?",
      "EN": "Contrast excitatory thalamocortical relay neurons with GABAergic neurons of the thalamic reticular nucleus. Where do their axons project, and why does greater inhibition not imply complete loss of sensation?",
      "KZ": "Қоздырғыш таламокортикалық нейрондарды таламустың ретикулярлық ядросындағы ГАМҚ-ергиялық нейрондармен салыстырыңыз. Олардың аксондары қайда барады және тежелудің күшеюі сезімнің толық жойылуын неге білдірмейді?"
    },
    "explanation": {
      "RU": "Большинство специфических релейных нейронов таламуса возбуждают корковые мишени, используя глутамат. Ретикулярное ядро выделяет ГАМК и тормозит другие таламические ядра, не образуя обычной прямой проекции к коре. Итог зависит от активности входов, обратной связи и состояния сети; отдельное тормозное звено не определяет восприятие целиком.",
      "EN": "Most specific thalamic relay neurons provide glutamatergic excitation to cortical targets. The reticular nucleus releases GABA and inhibits other thalamic nuclei rather than projecting directly to cortex as a usual relay. Network state, other inputs and corticothalamic feedback shape perception, so one inhibitory influence does not predict total sensory loss.",
      "KZ": "Таламустың арнайы релейлік нейрондары көбіне глутамат арқылы қыртыс нысаналарын қоздырады. Ретикулярлық ядро ГАМҚ бөліп, өзге таламустық ядроларды тежейді; оның аксондары әдеттегі реле сияқты қыртысқа тікелей бағытталмайды. Нәтиже кірістерге, кері байланысқа және желі күйіне тәуелді, сондықтан бір тежегіш әсер сезімнің толық жоғалуын білдірмейді."
    }
  },
  {
    "id": "special-senses",
    "target": "theory",
    "prompt": {
      "RU": "Проследите основные таламические реле для осознанного зрения и слуха. Чем отличается ранний обонятельный путь и почему выражение «обоняние вообще не связано с таламусом» научно неверно?",
      "EN": "Identify the principal thalamic relays for conscious vision and hearing. How does the early olfactory route differ, and why is it inaccurate to claim that smell has no thalamic connections at all?",
      "KZ": "Саналы көру мен естудің негізгі таламустық релелерін атаңыз. Иіс сезудің бастапқы жолы қалай ерекшеленеді және «иіс сезудің таламуспен еш байланысы жоқ» деу неліктен дұрыс емес?"
    },
    "explanation": {
      "RU": "Латеральное коленчатое тело — главное реле пути к первичной зрительной коре, медиальное — слухового пути к слуховой коре. Обонятельная информация достигает первичных обонятельных областей без обязательного первичного таламического переключения. Однако дальнейшая обработка запахов включает таламокортикальные связи; исключение касается раннего этапа, а не всех связей.",
      "EN": "The lateral geniculate nucleus is a major relay to primary visual cortex, and the medial geniculate nucleus is a major auditory relay. Olfactory signals can reach primary olfactory cortical areas without an obligatory first thalamic relay. Later odor processing still involves thalamic circuits, so the exception concerns the initial route, not all connections.",
      "KZ": "Латералдық тізелі дене көру ақпаратын бастапқы көру қыртысына, ал медиалдық тізелі дене есту ақпаратын есту қыртысына өткізетін негізгі реле болып саналады. Иіс сигналдары бастапқы иіс сезу аймақтарына міндетті алғашқы таламустық ауысусыз жете алады. Кейінгі өңдеуде таламус байланыстары бар, сондықтан ерекшелік тек бастапқы жолға қатысты."
    }
  },
  {
    "id": "experiment",
    "target": "practice",
    "prompt": {
      "RU": "В учебном эксперименте при изменении условия внимания выросла точность обнаружения слабого стимула. Какие показатели надо сравнить вместе с точностью и почему по поведению нельзя напрямую утверждать, что активность конкретного ядра таламуса возросла?",
      "EN": "In a teaching experiment, detection accuracy for weak stimuli rises when attention instructions change. Which other outcomes should be compared, and why cannot this behavioural result establish increased firing in one thalamic nucleus?",
      "KZ": "Оқу тәжірибесінде зейінге берілген нұсқау өзгергенде әлсіз стимулды анықтау дәлдігі артты. Қандай қосымша көрсеткіштерді салыстыру керек және осы мінез-құлықтан нақты таламус ядросының белсенділігі артты деуге неге болмайды?"
    },
    "explanation": {
      "RU": "Сопоставьте долю попаданий и ложных тревог, время реакции, интенсивность стимулов, число проб и исходное состояние участника. Изменение критерия ответа может повысить число обнаружений без улучшения чувствительности. Поведенческие данные не измеряют разряды нейронов; для локализации механизма нужны независимые нейрофизиологические методы.",
      "EN": "Compare hit rates with false-alarm rates, reaction time, stimulus strength, trial counts and baseline state. A response-criterion shift can increase reported detections without improving sensory sensitivity. Behaviour does not directly record neural firing; identifying a particular nucleus requires independent physiological evidence.",
      "KZ": "Дұрыс анықтау мен жалған дабыл жиілігін, реакция уақытын, стимул күшін, сынақ санын және бастапқы күйді салыстырыңыз. Жауап беру критерийі өзгерсе, сезімталдық жақсармай-ақ анықтау саны өсуі мүмкін. Мінез-құлық нейрон разрядтарын тікелей өлшемейді; нақты ядроны анықтау үшін тәуелсіз физиологиялық дерек қажет."
    }
  },
  {
    "id": "clinical",
    "target": "cases",
    "prompt": {
      "RU": "После очагового повреждения мозга у пациента снижена чувствительность половины тела. Какие сведения об исследовании лица, разных модальностей, силе и зрительных полях нужны до вывода о поражении VPL, VPM или соседних проводящих путей?",
      "EN": "A patient develops reduced sensation over one side of the body after a focal brain lesion. Which findings about facial sensation, sensory modalities, strength and visual fields are needed before attributing it to VPL, VPM or adjacent pathways?",
      "KZ": "Мидың ошақты зақымынан кейін пациент денесінің бір жағында сезімталдық төмендеді. VPL, VPM немесе көршілес өткізгіш жолдар зақымдалды деу үшін бет сезімталдығы, сезім түрлері, бұлшықет күші және көру өрістері туралы не білу керек?"
    },
    "explanation": {
      "RU": "VPL преимущественно связан с чувствительностью тела, VPM — лица, но одностороннее выпадение может возникать при поражении различных участков путей, включая внутреннюю капсулу и кору. Проверьте распределение симптомов, вибрацию, проприоцепцию, боль, температуру, чувствительность лица, силу и зрение. Без совокупности признаков и исследований нельзя установить точную локализацию.",
      "EN": "VPL chiefly relays body sensation and VPM facial sensation, but unilateral deficits can also arise in pathways such as the internal capsule or cortex. Examine distribution, vibration, position sense, pain, temperature, facial sensation, motor strength and visual fields. The pattern and appropriate investigations are needed before a precise localization is justified.",
      "KZ": "VPL көбіне дене, VPM бет сезімталдығымен байланысты, бірақ бір жақтағы бұзылыс ішкі капсула мен қыртысты қоса алғанда әртүрлі жолдар зақымдалғанда да байқалады. Таралуын, дірілді, қалып сезімін, ауырсынуды, температураны, бет сезімталдығын, күш пен көру өрісін тексеріңіз. Қосымша дерексіз нақты локализация жасауға болмайды."
    }
  }
] as const;

export function moduleFourteenReviewQuestions(language: Language) {
  return entries.map(item => ({
    id: `module-14-reviewed-${item.id}`,
    prompt: item.prompt[language],
    explanation: item.explanation[language],
    target: { section: item.target },
  }));
}
