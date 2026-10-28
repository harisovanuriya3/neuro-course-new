import type { Language } from "../course";
import type { BranchingTest } from "../tests";

// Module 14: thalamic relay and regulation. Scientific cross-check:
// Guyton & Hall 13e, ch. 48, printed pp. 609–612 (somatosensory pathways);
// Ganong 23e, ch. 15, printed pp. 229–231 (thalamic nuclei and circuits);
// C. L. Ghai Practical Physiology 8e, printed pp. 301–304 (sensory examination).
// This formative test is not a lesion-localization tool or clinical diagnosis.
type L = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): L => ({ RU, EN, KZ });
type Item = { prompts: [L, L, L]; choices: [L, L, L, L]; explanation: L };
const items: Item[] = [
  {
    prompts: [
      t("Как правильно сопоставить соматосенсорные релейные ядра таламуса и области тела?", "How should the thalamic somatosensory relay nuclei be matched with body regions?", "Таламустың соматосенсорлық релейлік ядролары дене аймақтарымен қалай сәйкестендіріледі?"),
      t("При обсуждении чувствительности лица и туловища студент перепутал VPL и VPM. Как исправить схему?", "A learner reverses VPL and VPM for face and trunk sensation. How should the diagram be corrected?", "Студент бет пен тұлға сезімталдығына қатысты VPL мен VPM-ді шатастырды. Сызбаны қалай түзету керек?"),
      t("Какая схема точнее описывает передачу информации от лица и конечностей в соматосенсорную кору?", "Which pathway diagram best describes information from face and limbs reaching somatosensory cortex?", "Бет пен аяқ-қолдан соматосенсорлық қыртысқа ақпараттың жетуін қай сызба дұрыс көрсетеді?")
    ],
    choices: [
      t("VPL преимущественно принимает соматосенсорные сигналы от тела, VPM — от лица; оба связаны с соматосенсорной корой.", "VPL mainly relays somatic signals from the body, VPM those from the face; both connect with somatosensory cortex.", "VPL көбіне денеден, VPM беттен келетін соматосенсорлық сигналдарды өткізеді; екеуі де соматосенсорлық қыртыспен байланысады."),
      t("VPL проводит только слуховые сигналы, а VPM передаёт исключительно зрительные сигналы в затылочную кору.", "VPL carries only auditory signals, while VPM exclusively sends visual information to occipital cortex.", "VPL тек есту сигналдарын, ал VPM тек көру ақпаратын шүйде қыртысына өткізеді."),
      t("VPL отвечает только за обоняние, а VPM напрямую управляет сокращением мышц конечностей через спинной мозг.", "VPL is exclusively an olfactory relay, while VPM directly drives limb muscle contraction through spinal cord.", "VPL тек иіс сезу релесі, ал VPM жұлын арқылы аяқ-қол бұлшықеттерінің жиырылуын тікелей басқарады."),
      t("VPL и VPM являются одним ядром без соматотопии, поэтому различать входы лица и тела не требуется.", "VPL and VPM form one nucleus without somatotopy, so inputs from face and body cannot be distinguished.", "VPL мен VPM соматотопиясы жоқ бір ядро, сондықтан бет пен денеден келген кірістерді ажырату қажет емес.")
    ],
    explanation: t("Вентральное заднелатеральное ядро (VPL) связано преимущественно с чувствительностью тела, а вентральное заднемедиальное (VPM) — лица, в частности через тройничные пути. Оба реле проецируются к соматосенсорной коре. Сторону дефицита нельзя определить по названию ядра без учёта перекрёстов и полного осмотра.", "The ventral posterolateral nucleus (VPL) mainly relays sensation from the body, whereas the ventral posteromedial nucleus (VPM) relays facial sensation, notably through trigeminal pathways. Both project to somatosensory cortex. Lesion side cannot be inferred from a nucleus label without crossing levels and full examination.", "Вентралдық артқы латералдық ядро (VPL) негізінен дене сезімталдығын, ал вентралдық артқы медиалдық ядро (VPM) үшкіл жүйке жолдары арқылы бет сезімталдығын өткізеді. Екеуі де соматосенсорлық қыртысқа проекцияланады. Айқасу деңгейлері мен толық тексерусіз зақым жағын тек ядро атауынан анықтауға болмайды.")
  },
  {
    prompts: [
      t("Где пересекаются пути вибрации и осознанной проприоцепции тела по сравнению с болью и температурой?", "Where do body vibration and conscious proprioception pathways cross compared with pain and temperature?", "Дененің діріл және саналы проприоцепция жолдары ауырсыну мен температура жолдарымен салыстырғанда қайда айқасады?"),
      t("При одностороннем поражении половины спинного мозга нарушены разные модальности с разных сторон. Почему?", "Different sensory modalities are impaired on different sides after a unilateral spinal cord lesion. Why?", "Жұлынның бір жартысы зақымданғанда сезімталдық түрлері әр жақта бұзылады. Неліктен?"),
      t("Студент утверждает, что все соматосенсорные пути пересекаются в таламусе. Как исправить объяснение?", "A learner says all somatosensory pathways cross within the thalamus. What correction is needed?", "Студент барлық соматосенсорлық жолдар таламуста айқасады дейді. Мұны қалай түзету керек?")
    ],
    choices: [
      t("Задние канатики переходят на противоположную сторону в продолговатом мозге, а болевая и температурная передача — преимущественно в спинном мозге.", "Dorsal-column signals cross in the medulla, while pain and temperature pathways predominantly cross in the spinal cord.", "Артқы баған жолдары сопақша мида, ал ауырсыну мен температура жолдары негізінен жұлында қарама-қарсы жаққа айқасады."),
      t("Оба пути всегда пересекаются только в таламусе, поэтому уровень поражения спинного мозга не влияет на сторону дефицита.", "Both pathways always cross only in the thalamus, so spinal lesion level cannot affect the side of deficit.", "Екі жол да тек таламуста айқасады, сондықтан жұлын зақымының деңгейі сезімталдық бұзылысының жағына әсер етпейді."),
      t("Пути вибрации пересекаются в периферическом нерве, а болевые пути никогда не переходят на противоположную сторону.", "Vibration pathways cross in a peripheral nerve, whereas pain pathways never pass to the opposite side.", "Діріл жолдары шеткі жүйкеде айқасады, ал ауырсыну жолдары ешқашан қарсы жаққа өтпейді."),
      t("Все чувствительные пути остаются на одной стороне до коры, поэтому перекрёсты не нужны для объяснения клинической картины.", "All sensory pathways remain ipsilateral up to cortex, so decussation is irrelevant to clinical interpretation.", "Барлық сезімтал жолдар қыртысқа дейін бір жақта қалады, сондықтан айқасуды клиникалық түсіндіруде ескерудің қажеті жоқ.")
    ],
    explanation: t("Аксоны второго нейрона заднеканатиковой системы переходят на другую сторону в каудальном продолговатом мозге и образуют медиальную петлю. Нейроны переднебоковой системы для боли и температуры обычно пересекаются через переднюю белую спайку спинного мозга на близких сегментарных уровнях. Поэтому сторона выпадения зависит от уровня поражения и модальности; один симптом не устанавливает диагноз.", "Second-order dorsal-column neurons decussate in the caudal medulla to form the medial lemniscus. Pain and temperature pathways usually cross through the anterior white commissure of the spinal cord within nearby segments. Consequently deficit laterality depends on lesion level and modality; a single symptom cannot establish a diagnosis.", "Артқы баған жүйесінің екінші нейрон аксондары сопақша мидың төменгі бөлігінде айқасып, медиалдық ілмек түзеді. Ауырсыну мен температураны өткізетін алдыңғы-бүйірлік жүйе көбіне жұлынның алдыңғы ақ комиссурасы арқылы жақын сегменттерде айқасады. Сондықтан бұзылыстың жағы зақым деңгейі мен модальдылыққа тәуелді; бір белгі диагноз қоймайды.")
  },
  {
    prompts: [
      t("Какое утверждение верно описывает возбуждение и торможение в таламокортикальных цепях?", "Which statement correctly describes excitation and inhibition in thalamocortical circuits?", "Таламокортикалық тізбектердегі қозу мен тежелуді қай тұжырым дұрыс сипаттайды?"),
      t("На рисунке ретикулярное ядро таламуса показано как главный глутаматный выход к коре. Что исправить?", "A diagram shows the thalamic reticular nucleus as the main glutamatergic cortical output. What must change?", "Сызбада таламустың ретикулярлық ядросы қыртысқа негізгі глутаматтық шығыс ретінде берілген. Нені түзету керек?"),
      t("В учебной модели усилили торможение релейного нейрона. Как корректно объяснить роль ретикулярного ядра?", "In a teaching model, inhibition of a relay neuron increases. How should the reticular nucleus be described?", "Оқу моделінде релейлік нейрон тежелуі күшейді. Ретикулярлық ядроның рөлін қалай түсіндіреміз?")
    ],
    choices: [
      t("Многие релейные нейроны возбуждают кору глутаматом; ГАМК-ергическое ретикулярное ядро тормозит таламические реле, а не служит обычным выходом к коре.", "Many relay neurons excite cortex with glutamate; the GABAergic reticular nucleus inhibits thalamic relays rather than serving as a typical cortical output.", "Көптеген релейлік нейрондар қыртысты глутаматпен қоздырады; ГАМҚ-ергиялық ретикулярлық ядро таламустық релелерді тежейді, қыртысқа әдеттегі шығыс болмайды."),
      t("Ретикулярное ядро таламуса является тем же образованием, что ретикулярная формация ствола мозга, и выполняет только дыхательную функцию.", "The thalamic reticular nucleus is identical to the brainstem reticular formation and controls only breathing.", "Таламустың ретикулярлық ядросы ми бағанының ретикулярлық формациясымен бірдей және тек тыныс алуды басқарады."),
      t("Все таламические нейроны исключительно ГАМК-ергические и никогда не передают возбуждающую информацию в кору.", "All thalamic neurons are exclusively GABAergic and never provide excitatory signals to cerebral cortex.", "Таламустың барлық нейрондары тек ГАМҚ-ергиялық және қыртысқа ешқашан қоздырушы ақпарат жібермейді."),
      t("Ретикулярное ядро непосредственно иннервирует скелетные мышцы, поэтому корково-таламическая обратная связь не играет роли.", "The reticular nucleus directly innervates skeletal muscle, so corticothalamic feedback has no role.", "Ретикулярлық ядро қаңқа бұлшықеттерін тікелей жүйкелендіреді, сондықтан қыртыс-таламус кері байланысының рөлі жоқ.")
    ],
    explanation: t("Специфические таламокортикальные релейные нейроны в основном возбуждающие, глутаматергические. Нейроны ретикулярного ядра таламуса преимущественно тормозные, ГАМК-ергические, и модулируют другие таламические ядра. Ретикулярное ядро таламуса не следует путать с ретикулярной формацией ствола; поведенческий результат не позволяет вычислить активность отдельного нейрона.", "Specific thalamocortical relay neurons are predominantly excitatory and glutamatergic. Neurons of the thalamic reticular nucleus are predominantly inhibitory and GABAergic and modulate other thalamic nuclei. The thalamic reticular nucleus differs from brainstem reticular formation; behavior does not reveal the firing of a particular neuron.", "Арнайы таламокортикалық релейлік нейрондар негізінен қоздырушы, глутаматергиялық. Таламустың ретикулярлық ядросының нейрондары көбіне тежегіш, ГАМҚ-ергиялық және басқа таламустық ядроларды реттейді. Бұл ядро ми бағанының ретикулярлық формациясынан бөлек; мінез-құлық нәтижесі жеке нейронның разрядын тікелей көрсетпейді.")
  },
  {
    prompts: [
      t("В опыте изменился процент обнаруженных стимулов. Что нужно проверить до вывода о таламическом механизме?", "Stimulus detection rate changes in an experiment. What should be checked before inferring a thalamic mechanism?", "Тәжірибеде стимулды анықтау үлесі өзгерді. Таламустық механизм туралы қорытындыға дейін нені тексеру керек?"),
      t("При одинаковом стимуле ответы испытуемого различаются между сериями. Как построить контроль?", "Responses vary between blocks despite the same stimulus. How should the control be designed?", "Бірдей стимул кезінде қатысушы жауаптары сериялар арасында өзгерді. Бақылауды қалай құру керек?"),
      t("Студент считает число нажатий кнопки прямой записью VPL. Как оценить такой вывод?", "A student treats the number of button presses as a direct recording from VPL. How should this be assessed?", "Студент түймені басу санын VPL белсенділігінің тікелей жазбасы дейді. Мұны қалай бағалау керек?")
    ],
    choices: [
      t("Сравнить одинаковые стимулы и контрольные пробы без стимула, учитывать внимание и критерий ответа; поведение само по себе не измеряет разряды VPL.", "Compare matched stimuli and catch trials, consider attention and response criterion; behavior alone does not measure VPL firing.", "Бірдей стимулдар мен стимулсыз бақылау сынамаларын салыстырып, зейін мен жауап өлшемін ескеру керек; мінез-құлық VPL разрядын тікелей өлшемейді."),
      t("Одного изменения числа ответов достаточно для точного вывода о частоте разрядов конкретного нейрона VPL без записи активности.", "A change in response count alone determines the firing rate of a specific VPL neuron without neural recording.", "Жауап санының өзгеруі нейрон белсенділігін жазбай-ақ нақты VPL нейронының разряд жиілігін анықтайды."),
      t("В опыте следует исключить все пробы без стимула, потому что ложные тревоги не влияют на оценку обнаружения.", "Catch trials must be excluded because false alarms have no relevance to the measurement of detection.", "Стимулсыз бақылау сынамаларын алып тастау керек, өйткені жалған дабылдар анықтау көрсеткішіне әсер етпейді."),
      t("Внимание и стратегия ответа не могут менять поведенческий результат, поэтому контроль условий эксперимента не требуется.", "Attention and response strategy cannot alter behavior, so experimental controls are unnecessary.", "Зейін мен жауап стратегиясы мінез-құлықты өзгертпейді, сондықтан тәжірибе шарттарын бақылау қажет емес.")
    ],
    explanation: t("Поведенческая доля обнаружений зависит не только от сенсорной передачи, но и от внимания, мотивации и критерия ответа. Пробы без стимула помогают оценить ложные тревоги; одинаковая интенсивность и повторения ограничивают смешивающие факторы. Ни доля ответов, ни время реакции не являются прямой записью VPL или ретикулярного ядра.", "Behavioral hit rate depends on sensory transmission as well as attention, motivation and response criterion. Catch trials estimate false alarms; matched intensity and repeated trials help control confounders. Neither hit rate nor reaction time is a direct recording of VPL or the reticular nucleus.", "Стимулды табу үлесі сенсорлық беріліске ғана емес, зейінге, ынтаға және жауап өлшеміне де тәуелді. Стимулсыз сынамалар жалған дабылдарды бағалайды; бірдей қарқындылық пен қайталау қосымша факторларды бақылайды. Табу үлесі де, реакция уақыты да VPL не ретикулярлық ядроның тікелей жазбасы емес.")
  },
  {
    prompts: [
      t("Почему обоняние считают исключением из правила обязательного таламического реле до первичной коры?", "Why is olfaction an exception to obligatory thalamic relay before primary cortex?", "Неліктен иіс сезу алғашқы қыртысқа дейін міндетті таламустық релеге қатысты ережеден тыс саналады?"),
      t("Студент пишет, что обоняние вообще не связано с таламусом. Как точнее сформулировать?", "A learner writes that olfaction has no thalamic connections whatsoever. How should this be refined?", "Студент иіс сезудің таламуспен мүлде байланысы жоқ дейді. Мұны қалай нақтылау керек?"),
      t("Какая схема отличает первичную обонятельную передачу от зрения и слуха, не упрощая все последующие связи?", "Which diagram distinguishes early olfactory transmission from vision and hearing without oversimplifying later connections?", "Қай сызба бастапқы иіс сезу берілісін көру мен естуден ажыратып, кейінгі байланыстарды тым жеңілдетпейді?")
    ],
    choices: [
      t("Первичная обонятельная кора получает вход без обязательного предварительного таламического реле; последующие обонятельные связи могут включать таламус.", "Primary olfactory cortex receives input without an obligatory prior thalamic relay; later olfactory networks can involve thalamus.", "Алғашқы иіс сезу қыртысына сигнал міндетті алдын ала таламустық релесіз жетеді; кейінгі иіс сезу желілеріне таламус қатысуы мүмкін."),
      t("Обонятельный путь всегда сначала проходит через латеральное коленчатое тело, а затем направляется к первичной зрительной коре.", "Olfactory input always passes first through the lateral geniculate nucleus and then to primary visual cortex.", "Иіс сезу сигналы әрқашан алдымен латералдық тізелі денеден өтіп, кейін алғашқы көру қыртысына барады."),
      t("У обонятельной системы вообще нет никаких связей с таламусом, вниманием или ассоциативными корковыми сетями.", "Olfactory processing has absolutely no connections to thalamus, attention or associative cortical networks.", "Иіс сезу жүйесінің таламуспен, зейінмен не ассоциациялық қыртыстық желілермен ешқандай байланысы жоқ."),
      t("Обонятельные рецепторы передают импульсы непосредственно в мышцы лица, поэтому корковая обработка запаха отсутствует.", "Olfactory receptors transmit directly to facial muscles, so cortical processing of smell does not occur.", "Иіс сезу рецепторлары импульстерді бет бұлшықеттеріне тікелей жібереді, сондықтан иісті қыртыстық өңдеу болмайды.")
    ],
    explanation: t("В отличие от многих сенсорных систем, обонятельная информация достигает первичной обонятельной коры без обязательного реле в таламусе. Это не означает полного отсутствия таламических связей при дальнейшей обработке запахов. Для зрения и слуха важны соответственно латеральное и медиальное коленчатые тела; упрощённая схема не описывает все параллельные проекции.", "Unlike many sensory systems, olfactory input reaches primary olfactory cortex without an obligatory relay in thalamus. This does not mean that later olfactory processing lacks thalamic connections. Lateral and medial geniculate bodies are important for vision and hearing, respectively; a simplified diagram does not show all parallel projections.", "Көптеген сенсорлық жүйелерден өзгеше, иіс сезу ақпараты алғашқы иіс сезу қыртысына міндетті таламустық релесіз жетеді. Бұл иісті кейінгі өңдеуде таламустық байланыстар жоқ деген сөз емес. Көру үшін латералдық, есту үшін медиалдық тізелі денелер маңызды; қарапайым сызба барлық параллель проекцияларды көрсетпейді.")
  }
];

const names = ["concept", "mechanism", "application", "transfer", "justification"] as const;
export function adaptModuleFourteenTest(base: BranchingTest, lang: Language): BranchingTest {
  const nodes = { ...base.nodes };
  names.forEach((name, i) => {
    const item = items[i];
    (["main", "corrective", "basic"] as const).forEach((level, j) => {
      const key = name + ":" + level;
      const old = nodes[key];
      if (!old || old.type !== "question") throw new Error("Missing question " + key);
      const choices = item.choices.map((choice, n) => ({ id: "abcd"[n], text: choice[lang] }));
      const shift = (i + j + 1) % 4;
      nodes[key] = { ...old, prompt: item.prompts[j][lang],
        options: [...choices.slice(shift), ...choices.slice(0, shift)],
        correctAnswer: "a", explanation: item.explanation[lang] };
    });
    (["review-1", "review-2"] as const).forEach(suffix => {
      const key = name + ":" + suffix;
      const old = nodes[key];
      if (!old || old.type !== "remediation") throw new Error("Missing remediation " + key);
      nodes[key] = { ...old, text: item.explanation[lang],
        theoryTarget: { moduleId: 14, anchor: suffix === "review-1" ? "mechanism" : "interpretation" } };
    });
  });
  return { ...base, nodes };
}
