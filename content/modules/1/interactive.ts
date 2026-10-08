import type { Language } from "../../course";
import type { DiagramNode, InteractiveLesson } from "../../interactive";
import { getSectionTitle } from "../../sections";

type Copy = [string, string, string]; // RU, EN, KZ
export function createInteractiveLesson(language: Language): InteractiveLesson {
  const t = (copy: Copy) => copy[language === "RU" ? 0 : language === "EN" ? 1 : 2];
  const node = (id: string, label: Copy, explanation: Copy): DiagramNode => ({ id, label: t(label), explanation: t(explanation) });
  return {
    kind: "interactive",
    title: getSectionTitle("interactive", language),
    introduction: t(["Исследуйте организацию нервной системы, путь сигнала и взаимодействие нервных влияний. Схемы связаны с теорией Модуля 1; это учебные модели, а не анатомические изображения или количественные симуляции.", "Explore nervous system organisation, signal pathways and interacting neural inputs. These diagrams follow Module 1 theory: they are teaching models, not anatomical images or quantitative simulations.", "Жүйке жүйесінің ұйымдасуын, сигнал жолын және жүйкелік әсерлердің өзара әрекетін зерттеңіз. Сызбалар Модуль 1 теориясына негізделген: бұлар анатомиялық кескіндер немесе сандық симуляциялар емес, оқу модельдері."]),
    ui: {
      instructions: t(["Как работать со схемой", "How to use the diagram", "Сызбамен жұмыс істеу"]),
      select: t(["Выберите элемент", "Select an element", "Элементті таңдаңыз"]),
      explanation: t(["Пояснение", "Explanation", "Түсіндірме"]),
      previous: t(["Предыдущий этап", "Previous step", "Алдыңғы кезең"]),
      next: t(["Следующий этап", "Next step", "Келесі кезең"]),
      reset: t(["К началу схемы", "Reset diagram", "Сызбаның басына"]),
      step: t(["Этап", "Step", "Кезең"]),
      theory: t(["Открыть соответствующий фрагмент теории", "Open the related theory passage", "Теорияның тиісті бөлігін ашу"]),
      returnToCenter: t(["Вернуть информацию в ЦНС", "Return information to the CNS", "Ақпаратты ОЖЖ-ге қайтару"]),
      keyboard: t(["Клавиатура: Tab и Shift+Tab — переход между кнопками, Enter или пробел — выбор. Выбранный элемент отмечен рамкой и состоянием кнопки; пояснение находится под схемой.", "Keyboard: Tab and Shift+Tab move between buttons; Enter or Space selects. A border and button state identify the selected element; its explanation appears below the diagram.", "Пернетақта: Tab және Shift+Tab батырмалар арасында ауыстырады, Enter немесе бос орын таңдайды. Таңдалған элемент жиекпен және батырма күйімен белгіленеді; түсіндірме сызбаның астында беріледі."]),
      active: t(["Включено", "On", "Қосулы"]), inactive: t(["Выключено", "Off", "Өшірулі"]),
      result: t(["Что меняется в модели", "What changes in the model", "Модельде не өзгереді"]),
    },
    organization: {
      id: "organization", title: t(["1. Организация: ЦНС и ПНС", "1. Organisation: CNS and PNS", "1. Ұйымдасу: ОЖЖ және ШЖЖ"]), anchor: "cns-pns",
      instruction: t(["Выберите структуру в одной из двух ветвей. Сравните её принадлежность и функцию. Обе ветви — части единой нервной системы.", "Select a structure in either branch. Compare its division and function. Both branches belong to one nervous system.", "Екі тармақтың біріндегі құрылымды таңдаңыз. Оның қай бөлімге жататынын және қызметін салыстырыңыз. Екі тармақ та біртұтас жүйке жүйесіне жатады."]),
      root: t(["Нервная система", "Nervous system", "Жүйке жүйесі"]),
      groups: [
        { id: "cns", title: t(["Центральная нервная система (ЦНС)", "Central nervous system (CNS)", "Орталық жүйке жүйесі (ОЖЖ)"]), nodes: [
          node("brain", ["Головной мозг", "Brain", "Ми"], ["Относится к ЦНС. Обрабатывает и интегрирует сигналы, участвует в организации движений, регуляции органов и высших нервных функциях.", "Part of the CNS. Processes and integrates signals and contributes to movement, organ regulation and higher nervous functions.", "ОЖЖ-ге жатады. Сигналдарды өңдеп, біріктіреді; қимылды ұйымдастыруға, мүшелерді реттеуге және жоғары жүйке қызметтеріне қатысады."]),
          node("spinal", ["Спинной мозг", "Spinal cord", "Жұлын"], ["Относится к ЦНС. Проводит информацию и содержит нейронные сети, обеспечивающие ряд рефлексов: это не только проводящий путь.", "Part of the CNS. Conducts information and contains circuits that mediate a range of reflexes: it is more than a conduction pathway.", "ОЖЖ-ге жатады. Ақпаратты өткізеді және бірқатар рефлекстерді іске асыратын нейрондық желілерді қамтиды: ол тек өткізгіш жол емес."]),
        ] },
        { id: "pns", title: t(["Периферическая нервная система (ПНС)", "Peripheral nervous system (PNS)", "Шеткі жүйке жүйесі (ШЖЖ)"]), nodes: [
          node("nerves", ["Нервы", "Nerves", "Жүйкелер"], ["Относятся к ПНС. Это пучки нервных волокон. Афферентные пути несут информацию к ЦНС, эфферентные — команды к мышцам и железам.", "Part of the PNS. Nerves are bundles of nerve fibres. Afferent pathways carry information towards the CNS; efferent pathways carry commands towards muscles and glands.", "ШЖЖ-ге жатады. Жүйкелер — жүйке талшықтарының шоғырлары. Афференттік жолдар ақпаратты ОЖЖ-ге, эфференттік жолдар бұйрықтарды бұлшықеттер мен бездерге жеткізеді."]),
          node("ganglia", ["Ганглии", "Ganglia", "Ганглийлер"], ["Относятся к ПНС. Ганглии — скопления тел нейронов вне центральной нервной системы.", "Part of the PNS. Ganglia are clusters of neuronal cell bodies outside the central nervous system.", "ШЖЖ-ге жатады. Ганглийлер — орталық жүйке жүйесінен тыс орналасқан нейрон денелерінің шоғырлары."]),
          node("endings", ["Нервные окончания", "Nerve endings", "Жүйке ұштары"], ["Относятся к ПНС. Чувствительные и двигательные окончания участвуют в связи нервной системы с органами и тканями.", "Part of the PNS. Sensory and motor endings help connect the nervous system with organs and tissues.", "ШЖЖ-ге жатады. Сезімтал және қозғалтқыш ұштар жүйке жүйесінің мүшелермен және тіндермен байланысына қатысады."]),
        ] },
      ],
    },
    pathway: {
      id: "pathway", title: t(["2. Путь сигнала и обратная связь", "2. Signal pathway and feedback", "2. Сигнал жолы және кері байланыс"]), anchor: "cns-pns",
      instruction: t(["Проследите защитную реакцию на горячий предмет: выбирайте звенья или переходите по этапам. В конце верните информацию о результате в ЦНС кнопкой обратной связи.", "Follow a protective response to a hot object: select nodes or move through the steps. At the end, return outcome information to the CNS using the feedback button.", "Ыстық затқа қорғаныш реакциясын бақылаңыз: буындарды таңдаңыз немесе кезеңдермен өтіңіз. Соңында кері байланыс батырмасы арқылы нәтиже туралы ақпаратты ОЖЖ-ге қайтарыңыз."]),
      nodes: [
        node("receptor", ["Рецептор", "Receptor", "Рецептор"], ["Рецептор воспринимает воздействие горячего предмета и преобразует его в сигнал для нервной системы.", "A receptor detects the hot object's stimulus and converts it into a signal for the nervous system.", "Рецептор ыстық заттың әсерін қабылдап, оны жүйке жүйесіне арналған сигналға түрлендіреді."]),
        node("afferent", ["Афферентный путь", "Afferent pathway", "Афференттік жол"], ["Сенсорная информация идёт от рецептора к ЦНС. Направление к центру отличает афферентный путь от эфферентного.", "Sensory information travels from the receptor towards the CNS. This inward direction distinguishes an afferent pathway from an efferent one.", "Сенсорлық ақпарат рецептордан ОЖЖ-ге бағытталады. Орталыққа бағытталуы афференттік жолды эфференттік жолдан ажыратады."]),
        node("center", ["ЦНС: интеграция", "CNS: integration", "ОЖЖ: интеграция"], ["Сигналы обрабатываются в центральных сетях. Спинальные сети могут организовать отдёргивание руки, а обработка в головном мозге обеспечивает осознанное восприятие боли. Интеграция происходит в ЦНС, а не в отдельном органе после неё.", "Central circuits process the signals. Spinal circuits can organise hand withdrawal, while brain processing supports conscious pain perception. Integration takes place within the CNS, not in a separate organ after it.", "Орталық желілер сигналдарды өңдейді. Жұлын желілері қолды тартып алуды ұйымдастыра алады, ал мидағы өңдеу ауырсынуды саналы сезінуді қамтамасыз етеді. Интеграция ОЖЖ-ден кейінгі бөлек мүшеде емес, ОЖЖ ішінде жүреді."]),
        node("efferent", ["Эфферентный путь", "Efferent pathway", "Эфференттік жол"], ["Команда направляется от ЦНС к исполнительному органу. В этом примере она поступает к мышцам руки.", "A command travels from the CNS towards an effector. In this example it reaches the arm muscles.", "Бұйрық ОЖЖ-ден атқарушы мүшеге бағытталады. Бұл мысалда ол қол бұлшықеттеріне жетеді."]),
        node("effector", ["Эффектор и ответ", "Effector and response", "Эффектор және жауап"], ["Мышцы выполняют ответ: рука отдёргивается. В других реакциях эффекторами могут быть железы. Эффектор — исполнитель, а не сенсорный вход.", "Muscles carry out the response: the hand withdraws. Glands can be effectors in other responses. An effector produces an output rather than a sensory input.", "Бұлшықеттер жауапты орындайды: қол тартып алынады. Басқа реакцияларда бездер эффектор бола алады. Эффектор — сенсорлық кіріс емес, жауапты орындаушы."]),
        node("feedback", ["Обратная связь", "Feedback", "Кері байланыс"], ["Информация о результате действия возвращается к центральным сетям и позволяет корректировать ответ. Это поступление информации, а не повторная двигательная команда.", "Information about the action's outcome returns to central circuits and allows the response to be adjusted. This is incoming information, not another motor command.", "Әрекет нәтижесі туралы ақпарат орталық желілерге қайтып, жауапты түзетуге мүмкіндік береді. Бұл — қайталанған қимыл бұйрығы емес, ақпараттың келуі."]),
      ],
      loop: t(["Обратная связь → ЦНС: интеграция → уточнение ответа. Линейная схема упрощает работу взаимодействующих нервных сетей.", "Feedback → CNS integration → adjustment of the response. This linear diagram simplifies interacting neural networks.", "Кері байланыс → ОЖЖ-дегі интеграция → жауапты нақтылау. Сызықтық сызба өзара әрекеттесетін жүйкелік желілер жұмысын жеңілдетіп көрсетеді."]),
    },
    synapse: {
      id: "synapse", title: t(["3. Проведение и межклеточная передача", "3. Conduction and intercellular transmission", "3. Өткізу және жасушааралық берілу"]), anchor: "principles",
      instruction: t(["Сравните два этапа: проведение сигнала по нервному волокну и передачу влияния следующей клетке. Молекулярные механизмы синапса изучаются позже.", "Compare two stages: conduction along a nerve fibre and transmission of influence to the next cell. Molecular synaptic mechanisms are studied later.", "Екі кезеңді салыстырыңыз: жүйке талшығы бойымен сигнал өткізу және әсерді келесі жасушаға беру. Синапстың молекулалық тетіктері кейін оқытылады."]),
      modes: [{ id: "chemical", title: t(["Функциональная схема", "Functional map", "Функциялық сызба"]), note: t(["Это вводная схема, а не модель молекулярных событий.", "This is an introductory map, not a molecular-event model.", "Бұл молекулалық оқиғалар моделі емес, кіріспе сызба."]), nodes: [
        node("arrival", ["Сигнал по волокну", "Signal along the fibre", "Талшық бойындағы сигнал"], ["Сигнал распространяется по нервному волокну к его окончанию.", "The signal propagates along the nerve fibre towards its terminal.", "Сигнал жүйке талшығы бойымен оның ұшына қарай таралады."]),
        node("transfer", ["Передача следующей клетке", "Transmission to the next cell", "Келесі жасушаға берілу"], ["На контакте между клетками начинается влияние на следующую клетку.", "At the contact between cells, influence on the next cell begins.", "Жасушалар түйіскен жерде келесі жасушаға әсер басталады."]),
        node("response", ["Ответ клетки", "Cell response", "Жасуша жауабы"], ["Ответ зависит от типа контакта и состояния клетки; детали рассматриваются в последующих модулях.", "The response depends on contact type and cell state; details are covered in later modules.", "Жауап түйісу түрі мен жасуша күйіне тәуелді; егжей-тегжейі кейінгі модульдерде қарастырылады."]),
      ] }],
    },
        integration: {
      id: "integration", title: t(["4. Возбуждение, торможение и интеграция", "4. Excitation, inhibition and integration", "4. Қозу, тежелу және интеграция"]), anchor: "principles",
      instruction: t(["Включайте и выключайте два входа в нейрон. Сравните четыре сочетания и прочитайте, что можно заключить об ответе клетки.", "Turn the two inputs to the neuron on and off. Compare all four combinations and read what can be concluded about the cell's response.", "Нейронға келетін екі кірісті қосып, өшіріңіз. Төрт үйлесімді салыстырып, жасуша жауабы туралы қандай қорытынды жасауға болатынын оқыңыз."]),
      excitation: t(["Возбуждающее влияние", "Excitatory input", "Қоздырушы әсер"]),
      inhibition: t(["Тормозное влияние", "Inhibitory input", "Тежеуші әсер"]),
      neuron: t(["Нейрон: интеграция входов", "Neuron: integrating inputs", "Нейрон: кірістерді біріктіру"]),
      note: t(["Качественная модель: здесь нет расчёта потенциала, порога или частоты разрядов. Итог зависит от силы, времени, места действия входов и состояния клетки.", "A qualitative model: membrane potential, threshold and firing frequency are not calculated. The outcome depends on input strength, timing, location and the cell's state.", "Сапалық модель: мұнда потенциал, табалдырық немесе разряд жиілігі есептелмейді. Нәтиже кірістердің күшіне, уақытына, әсер ету орнына және жасуша күйіне тәуелді."]),
      outcomes: [
        t(["Оба показанных входа выключены. Это означает только отсутствие этих двух влияний в модели; заключить, что нейрон полностью неактивен, нельзя.", "Both displayed inputs are off. Only these two influences are absent in the model; this does not establish that the neuron is completely inactive.", "Көрсетілген екі кіріс те өшірулі. Бұл модельде тек осы екі әсердің жоқтығын білдіреді; нейрон мүлде белсенді емес деп қорытынды жасауға болмайды."]),
        t(["Включено возбуждающее влияние: оно повышает вероятность разряда. Возникновение потенциала действия не гарантировано — важны порог и состояние клетки.", "Excitatory input is on: it increases firing probability. An action potential is not guaranteed; threshold and the cell's state matter.", "Қоздырушы әсер қосулы: ол разряд ықтималдығын арттырады. Әрекет потенциалының пайда болуы кепілденбейді — табалдырық пен жасуша күйі маңызды."]),
        t(["Включено тормозное влияние: оно снижает вероятность или частоту разрядов. Торможение — активный процесс, а не просто отсутствие возбуждения.", "Inhibitory input is on: it reduces firing probability or frequency. Inhibition is an active process, not simply the absence of excitation.", "Тежеуші әсер қосулы: ол разряд ықтималдығын немесе жиілігін төмендетеді. Тежелу — қозудың жай болмауы емес, белсенді үдеріс."]),
        t(["Включены оба влияния. Нейрон интегрирует их совместное действие. Они не обязаны взаимно обнуляться; без дополнительных данных нельзя предсказать наличие разряда.", "Both inputs are on. The neuron integrates their combined effects. They do not necessarily cancel each other; firing cannot be predicted without further information.", "Екі әсер де қосулы. Нейрон олардың бірлескен әсерін біріктіреді. Олар міндетті түрде бірін-бірі жоймайды; қосымша дерексіз разрядтың пайда болуын болжауға болмайды."]),
      ],
    },
  };
}
