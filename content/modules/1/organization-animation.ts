import type { Language } from "../../course";

type Copy = [string, string, string]; // RU, EN, KZ
export function getOrganizationAnimation(language: Language) {
  const t = (copy: Copy) => copy[language === "RU" ? 0 : language === "EN" ? 1 : 2];
  return {
    title: t(["Учебная анимация", "Learning animation", "Оқу анимациясы"]),
    instruction: t(["Включите воспроизведение или переходите по этапам вручную. Автоматическая смена — каждые 6 секунд. Ручной переход останавливает воспроизведение. Клавиатура: Tab — выбор кнопки, Enter или пробел — действие.", "Play the sequence or move through the steps manually. Automatic steps change every 6 seconds. Manual navigation pauses playback. Keyboard: Tab selects a button; Enter or Space activates it.", "Анимацияны ойнатыңыз немесе кезеңдерді қолмен ауыстырыңыз. Автоматты ауысу — әр 6 секунд сайын. Қолмен ауыстыру ойнатуды тоқтатады. Пернетақта: Tab — батырманы таңдау, Enter немесе бос орын — әрекет."]),
    play: t(["Воспроизвести", "Play", "Ойнату"]), pause: t(["Пауза", "Pause", "Кідірту"]),
    previous: t(["Предыдущий этап", "Previous step", "Алдыңғы кезең"]), next: t(["Следующий этап", "Next step", "Келесі кезең"]),
    restart: t(["Начать сначала", "Start again", "Басынан бастау"]),
    step: t(["Этап", "Step", "Кезең"]), steps: t(["Количество этапов", "Number of steps", "Кезең саны"]),
    progress: t(["Прогресс учебной анимации", "Learning animation progress", "Оқу анимациясының барысы"]),
    playing: t(["Воспроизводится", "Playing", "Ойнатылуда"]), paused: t(["На паузе", "Paused", "Кідіртілген"]),
    last: t(["Последний этап. Можно начать сначала.", "Last step. You can start again.", "Соңғы кезең. Басынан бастауға болады."]),
    cns: t(["ЦНС: головной и спинной мозг", "CNS: brain and spinal cord", "ОЖЖ: ми және жұлын"]),
    pns: t(["ПНС: нервы, ганглии и окончания", "PNS: nerves, ganglia and endings", "ШЖЖ: жүйкелер, ганглийлер және ұштар"]),
    input: t(["Информация → ЦНС", "Information → CNS", "Ақпарат → ОЖЖ"]),
    output: t(["ЦНС → управляющий сигнал", "CNS → command signal", "ОЖЖ → басқарушы сигнал"]),
    model: t(["Условная схема: положения и размеры структур упрощены. Стрелки показывают направление передачи, а не точную анатомию проводящих путей.", "Schematic model: structure positions and sizes are simplified. Arrows show transmission direction, not the exact anatomy of neural pathways.", "Шартты сызба: құрылымдардың орны мен өлшемі жеңілдетілген. Бағдаршалар өткізгіш жолдардың нақты анатомиясын емес, берілу бағытын көрсетеді."]),
    reduced: t(["Уменьшение движения включено: без движущихся эффектов; этапы и управление доступны.", "Reduced motion is enabled: no moving effects; steps and controls remain available.", "Қозғалысты азайту қосулы: қозғалмалы әсерлер жоқ; кезеңдер мен басқару қолжетімді."]),
    stages: [
      { id: "whole", title: t(["Единая нервная система", "One nervous system", "Біртұтас жүйке жүйесі"]), text: t(["Нервная система получает информацию, обрабатывает её и организует ответ. Её центральная и периферическая части работают совместно.", "The nervous system receives information, processes it and organises a response. Its central and peripheral parts work together.", "Жүйке жүйесі ақпаратты қабылдайды, өңдейді және жауапты ұйымдастырады. Оның орталық және шеткі бөліктері бірлесіп жұмыс істейді."]) },
      { id: "cns", title: t(["Центральная нервная система", "Central nervous system", "Орталық жүйке жүйесі"]), text: t(["Выделены головной и спинной мозг — ЦНС. Центральные сети обрабатывают и интегрируют поступающие сигналы, участвуя в организации ответа.", "The highlighted brain and spinal cord form the CNS. Central circuits process and integrate incoming signals and help organise the response.", "Ми мен жұлын — ОЖЖ белгіленген. Орталық желілер келген сигналдарды өңдеп, біріктіреді және жауапты ұйымдастыруға қатысады."]) },
      { id: "pns", title: t(["Периферическая нервная система", "Peripheral nervous system", "Шеткі жүйке жүйесі"]), text: t(["Выделена ПНС: периферические нервы, ганглии и нервные окончания. Эти структуры обеспечивают связь ЦНС с органами и тканями.", "The PNS is highlighted: peripheral nerves, ganglia and nerve endings. These structures connect the CNS with organs and tissues.", "ШЖЖ белгіленген: шеткі жүйкелер, ганглийлер және жүйке ұштары. Бұл құрылымдар ОЖЖ-ні мүшелермен және тіндермен байланыстырады."]) },
      { id: "afferent", title: t(["От периферии к ЦНС", "From the periphery to the CNS", "Шеттен ОЖЖ-ге"]), text: t(["По афферентным путям сенсорная информация от рецепторов поступает к ЦНС. Стрелка направлена к центральным структурам.", "Sensory information travels from receptors along afferent pathways towards the CNS. The arrow points towards central structures.", "Сенсорлық ақпарат рецепторлардан афференттік жолдармен ОЖЖ-ге түседі. Бағдарша орталық құрылымдарға бағытталған."]) },
      { id: "efferent", title: t(["От ЦНС к периферии", "From the CNS to the periphery", "ОЖЖ-ден шетке"]), text: t(["По эфферентным путям управляющие сигналы идут от ЦНС к исполнительным органам — мышцам и железам. Стрелка показывает это направление.", "Command signals travel from the CNS along efferent pathways to effectors: muscles and glands. The arrow shows this direction.", "Басқарушы сигналдар ОЖЖ-ден эфференттік жолдармен атқарушы мүшелерге — бұлшықеттер мен бездерге барады. Бағдарша осы бағытты көрсетеді."]) },
      { id: "together", title: t(["ЦНС и ПНС работают вместе", "CNS and PNS work together", "ОЖЖ мен ШЖЖ бірге жұмыс істейді"]), text: t(["Входящая информация, центральная обработка и передача команд образуют связанную систему. Обратная связь о результате действия помогает ЦНС корректировать ответ.", "Incoming information, central processing and outgoing commands form a connected system. Feedback about the outcome helps the CNS adjust the response.", "Кіріс ақпарат, орталық өңдеу және бұйрықтардың берілуі өзара байланысты жүйе құрайды. Әрекет нәтижесі туралы кері байланыс ОЖЖ-ге жауапты түзетуге көмектеседі."]) },
    ],
  };
}
