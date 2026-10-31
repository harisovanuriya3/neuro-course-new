import type { BranchingTest, QuestionNode } from "../../../tests";

type Language = "RU" | "EN" | "KZ";
type LocalizedQuestion = {
  competency: string;
  title: Record<Language, string>;
  prompt: Record<Language, string>;
  options: Record<Language, [string, string, string, string]>;
  explanation: Record<Language, string>;
  anchor: string;
};

const questions: LocalizedQuestion[] = [
  {
    competency: "signal-direction",
    title: { RU: "Направление передачи сигнала", EN: "Direction of signal transmission", KZ: "Сигналдың берілу бағыты" },
    prompt: {
      RU: "В рефлекторной дуге раздражение кожи должно сначала поступить в ЦНС. Какое волокно выполняет этот этап?",
      EN: "In a reflex arc, a skin stimulus must first reach the CNS. Which fiber carries this step?",
      KZ: "Рефлекстік доғада тері тітіркенуі алдымен ОЖЖ-ге жетуі керек. Бұл кезеңді қай талшық атқарады?"
    },
    options: {
      RU: ["Афферентное чувствительное", "Эфферентное двигательное", "Только внутримозговое", "Вегетативное постганглионарное"],
      EN: ["Afferent sensory", "Efferent motor", "Intracerebral only", "Autonomic postganglionic"],
      KZ: ["Афференттік сезімтал", "Эфференттік қозғалтқыш", "Тек ми ішілік", "Вегетативтік постганглионарлық"]
    },
    explanation: {
      RU: "Афферентные волокна проводят информацию от рецепторов к центральной нервной системе.",
      EN: "Afferent fibers carry information from receptors toward the central nervous system.",
      KZ: "Афференттік талшықтар ақпаратты рецепторлардан орталық жүйке жүйесіне өткізеді."
    },
    anchor: "cns-pns"
  },
  {
    competency: "effector-response",
    title: { RU: "Эффекторный ответ", EN: "Effector response", KZ: "Эффекторлық жауап" },
    prompt: {
      RU: "После обработки сигнала ЦНС должна вызвать сокращение скелетной мышцы. Какой путь непосредственно доставляет команду?",
      EN: "After CNS processing, a skeletal muscle must contract. Which pathway directly delivers the command?",
      KZ: "ОЖЖ сигналды өңдегеннен кейін қаңқа бұлшықеті жиырылуы керек. Команданы тікелей қай жол жеткізеді?"
    },
    options: {
      RU: ["Эфферентный двигательный", "Афферентный чувствительный", "Рецепторный", "Только ассоциативный"],
      EN: ["Efferent motor", "Afferent sensory", "Receptor pathway", "Association pathway only"],
      KZ: ["Эфференттік қозғалтқыш", "Афференттік сезімтал", "Рецепторлық", "Тек ассоциативтік"]
    },
    explanation: {
      RU: "Эфферентный путь проводит управляющий сигнал от ЦНС к мышце-эффектору.",
      EN: "The efferent pathway carries the command from the CNS to the muscle effector.",
      KZ: "Эфференттік жол басқарушы сигналды ОЖЖ-ден бұлшықет-эффекторға жеткізеді."
    },
    anchor: "cns-pns"
  },
  {
    competency: "integration",
    title: { RU: "Интеграция сигналов", EN: "Signal integration", KZ: "Сигналдарды интеграциялау" },
    prompt: {
      RU: "Нейрон одновременно получает возбуждающие и тормозные входы. Что определит его итоговый ответ?",
      EN: "A neuron receives excitatory and inhibitory inputs at the same time. What determines its final response?",
      KZ: "Нейрон бір мезгілде қоздырғыш және тежегіш кірістер алады. Оның соңғы жауабын не анықтайды?"
    },
    options: {
      RU: ["Пространственно-временная суммация входов", "Только первый пришедший сигнал", "Только размер ядра", "Число соседних капилляров"],
      EN: ["Spatial and temporal summation of inputs", "Only the first arriving signal", "Only nuclear size", "Number of nearby capillaries"],
      KZ: ["Кірістердің кеңістіктік-уақыттық қосылуы", "Тек бірінші келген сигнал", "Тек ядро өлшемі", "Жақын капиллярлар саны"]
    },
    explanation: {
      RU: "Итог зависит от совместной пространственной и временной суммации возбуждающих и тормозных влияний.",
      EN: "The outcome depends on spatial and temporal summation of excitatory and inhibitory influences.",
      KZ: "Қорытынды жауап қоздырғыш және тежегіш әсерлердің кеңістіктік әрі уақыттық қосылуына тәуелді."
    },
    anchor: "principles"
  },
  {
    competency: "negative-feedback",
    title: { RU: "Отрицательная обратная связь", EN: "Negative feedback", KZ: "Теріс кері байланыс" },
    prompt: {
      RU: "Система регуляции уменьшает отклонение показателя от заданного уровня. Какой принцип она реализует?",
      EN: "A regulatory system reduces deviation from a set level. Which principle does it implement?",
      KZ: "Реттеу жүйесі көрсеткіштің берілген деңгейден ауытқуын азайтады. Ол қандай қағиданы іске асырады?"
    },
    options: {
      RU: ["Отрицательную обратную связь", "Положительную обратную связь", "Случайное усиление", "Необратимое возбуждение"],
      EN: ["Negative feedback", "Positive feedback", "Random amplification", "Irreversible excitation"],
      KZ: ["Теріс кері байланысты", "Оң кері байланысты", "Кездейсоқ күшейтуді", "Қайтымсыз қозуды"]
    },
    explanation: {
      RU: "Отрицательная обратная связь противодействует отклонению и стабилизирует регулируемую величину.",
      EN: "Negative feedback opposes deviation and stabilizes the regulated variable.",
      KZ: "Теріс кері байланыс ауытқуға қарсы әсер етіп, реттелетін шаманы тұрақтандырады."
    },
    anchor: "functions"
  },
  {
    competency: "positive-feedback",
    title: { RU: "Положительная обратная связь", EN: "Positive feedback", KZ: "Оң кері байланыс" },
    prompt: {
      RU: "Начальное изменение запускает процессы, которые ещё сильнее увеличивают это же изменение. Как называется такой контур?",
      EN: "An initial change triggers processes that further increase that same change. What is this loop called?",
      KZ: "Бастапқы өзгеріс сол өзгерісті одан әрі күшейтетін үдерістерді іске қосады. Мұндай контур қалай аталады?"
    },
    options: {
      RU: ["Положительная обратная связь", "Отрицательная обратная связь", "Пассивная диффузия без регуляции", "Рефрактерность"],
      EN: ["Positive feedback", "Negative feedback", "Unregulated passive diffusion", "Refractoriness"],
      KZ: ["Оң кері байланыс", "Теріс кері байланыс", "Реттелмейтін пассивті диффузия", "Рефрактерлік"]
    },
    explanation: {
      RU: "Положительная обратная связь усиливает исходное изменение до появления ограничивающего события.",
      EN: "Positive feedback amplifies the initial change until a limiting event occurs.",
      KZ: "Оң кері байланыс шектеуші оқиға пайда болғанға дейін бастапқы өзгерісті күшейтеді."
    },
    anchor: "functions"
  },
  {
    competency: "experimental-control",
    title: { RU: "Экспериментальный контроль", EN: "Experimental control", KZ: "Эксперименттік бақылау" },
    prompt: {
      RU: "Чтобы проверить влияние температуры на скорость проведения нерва, что должно различаться между опытной и контрольной группами?",
      EN: "To test the effect of temperature on nerve conduction velocity, what should differ between experimental and control groups?",
      KZ: "Температураның жүйке өткізу жылдамдығына әсерін тексеру үшін тәжірибелік және бақылау топтарында не өзгеше болуы керек?"
    },
    options: {
      RU: ["Только температура при прочих равных", "Температура, тип нерва и расстояние одновременно", "Только имя исследователя", "Все условия случайным образом"],
      EN: ["Only temperature, with other conditions held constant", "Temperature, nerve type, and distance together", "Only the investigator's name", "All conditions at random"],
      KZ: ["Басқа жағдайлар бірдей болып, тек температура", "Температура, жүйке түрі және арақашықтық бірге", "Тек зерттеушінің аты", "Барлық жағдай кездейсоқ"]
    },
    explanation: {
      RU: "Изоляция одной переменной позволяет связать наблюдаемое различие именно с температурой.",
      EN: "Isolating one variable allows the observed difference to be attributed to temperature.",
      KZ: "Бір айнымалыны ғана өзгерту байқалған айырмашылықты температурамен байланыстыруға мүмкіндік береді."
    },
    anchor: "principles"
  },
  {
    competency: "causal-inference",
    title: { RU: "Причинный вывод", EN: "Causal inference", KZ: "Себептік қорытынды" },
    prompt: {
      RU: "После повреждения нерва движение исчезло, но одновременно была повреждена мышца. Какой вывод корректен?",
      EN: "Movement disappeared after a nerve injury, but the muscle was also damaged. Which conclusion is valid?",
      KZ: "Жүйке зақымынан кейін қозғалыс жоғалды, бірақ бұлшықет те зақымданды. Қандай қорытынды дұрыс?"
    },
    options: {
      RU: ["Нельзя приписать эффект только нерву без дополнительного контроля", "Причина доказанно только в нерве", "Мышца не влияет на движение", "Любое повреждение всегда обратимо"],
      EN: ["The effect cannot be attributed only to the nerve without an additional control", "The nerve alone is proven to be the cause", "Muscle cannot affect movement", "Every injury is always reversible"],
      KZ: ["Қосымша бақылаусыз әсерді тек жүйкеге жатқызуға болмайды", "Себеп тек жүйкеде екені дәлелденді", "Бұлшықет қозғалысқа әсер етпейді", "Кез келген зақым әрқашан қайтымды"]
    },
    explanation: {
      RU: "Одновременное повреждение мышцы является смешивающим фактором и ограничивает причинный вывод.",
      EN: "Simultaneous muscle damage is a confounder and limits the causal conclusion.",
      KZ: "Бұлшықеттің қатар зақымдануы — шатастырушы фактор, сондықтан себептік қорытынды шектеледі."
    },
    anchor: "principles"
  },
  {
    competency: "reversibility",
    title: { RU: "Обратимость эффекта", EN: "Effect reversibility", KZ: "Әсердің қайтымдылығы" },
    prompt: {
      RU: "После удаления блокатора проведение по нерву восстановилось. Что сильнее всего поддерживает это наблюдение?",
      EN: "Nerve conduction recovered after a blocker was removed. What does this observation support most strongly?",
      KZ: "Блокаторды алып тастағаннан кейін жүйке өткізгіштігі қалпына келді. Бұл бақылау нені көбірек қолдайды?"
    },
    options: {
      RU: ["Блокатор вызвал обратимое функциональное торможение", "Нерв был необратимо разрушен", "Блокатор не взаимодействовал с нервом", "Температура не может влиять на проведение"],
      EN: ["The blocker caused reversible functional inhibition", "The nerve was irreversibly destroyed", "The blocker did not interact with the nerve", "Temperature cannot affect conduction"],
      KZ: ["Блокатор қайтымды функционалдық тежелу туғызды", "Жүйке қайтымсыз бұзылды", "Блокатор жүйкемен әсерлеспеді", "Температура өткізуге әсер ете алмайды"]
    },
    explanation: {
      RU: "Восстановление после удаления воздействия поддерживает обратимый, а не разрушительный механизм.",
      EN: "Recovery after removal supports a reversible mechanism rather than structural destruction.",
      KZ: "Әсерді тоқтатқаннан кейін қалпына келу құрылымдық бұзылуды емес, қайтымды механизмді қолдайды."
    },
    anchor: "principles"
  },
  {
    competency: "measurement-limit",
    title: { RU: "Границы измерения", EN: "Measurement limits", KZ: "Өлшеу шектері" },
    prompt: {
      RU: "Исследователь измерил только время реакции. Какой вывод выходит за пределы этих данных?",
      EN: "A researcher measured reaction time only. Which conclusion goes beyond the data?",
      KZ: "Зерттеуші тек реакция уақытын өлшеді. Қай қорытынды осы деректердің шегінен шығады?"
    },
    options: {
      RU: ["Точно установлена анатомическая причина изменения", "Реакция стала медленнее", "Время можно сравнить между условиями", "Измерение стоит повторить"],
      EN: ["The anatomical cause of the change has been established precisely", "The response became slower", "Time can be compared across conditions", "The measurement should be repeated"],
      KZ: ["Өзгерістің анатомиялық себебі дәл анықталды", "Реакция баяулады", "Уақытты жағдайлар арасында салыстыруға болады", "Өлшеуді қайталау керек"]
    },
    explanation: {
      RU: "Время реакции описывает функциональный результат, но само по себе не устанавливает конкретную анатомическую причину.",
      EN: "Reaction time describes a functional outcome but does not by itself establish a specific anatomical cause.",
      KZ: "Реакция уақыты функционалдық нәтижені сипаттайды, бірақ нақты анатомиялық себепті өздігінен анықтамайды."
    },
    anchor: "principles"
  },
  {
    competency: "replication",
    title: { RU: "Воспроизводимость", EN: "Replication", KZ: "Қайталанымдылық" },
    prompt: {
      RU: "Неожиданный эффект получен один раз на одном препарате. Какой следующий шаг лучше всего укрепит вывод?",
      EN: "An unexpected effect was observed once in one preparation. Which next step would best strengthen the conclusion?",
      KZ: "Күтпеген әсер бір препаратта бір рет байқалды. Қай келесі қадам қорытындыны жақсырақ нығайтады?"
    },
    options: {
      RU: ["Повторить опыт на независимых препаратах с тем же контролем", "Сразу объявить механизм доказанным", "Удалить контрольную группу", "Изменить одновременно все условия"],
      EN: ["Repeat the experiment in independent preparations with the same controls", "Immediately declare the mechanism proven", "Remove the control group", "Change all conditions at once"],
      KZ: ["Сол бақылаумен тәжірибені тәуелсіз препараттарда қайталау", "Механизм дәлелденді деп бірден жариялау", "Бақылау тобын алып тастау", "Барлық жағдайды бірден өзгерту"]
    },
    explanation: {
      RU: "Независимое повторение с сохранением контроля проверяет воспроизводимость и снижает риск случайного результата.",
      EN: "Independent replication with the same controls tests reproducibility and reduces the risk of a chance finding.",
      KZ: "Бақылауды сақтап, тәуелсіз қайталау нәтижені қайта өндіруді тексеріп, кездейсоқ әсер қаупін азайтады."
    },
    anchor: "principles"
  }
];

export function extendModule1Test(base: BranchingTest, language: Language): BranchingTest {
  const nodes = { ...base.nodes };
  const competencies = { ...base.competencies };
  const ids = questions.map((_, index) => `module1:extended:${index + 1}`);

  questions.forEach((question, index) => {
    const id = ids[index];
    const next = ids[index + 1] ?? base.start;
    competencies[question.competency] = {
      title: question.title[language],
      theoryTarget: { moduleId: 1, anchor: question.anchor }
    };
    nodes[id] = {
      id,
      type: "question",
      level: "main",
      competency: question.competency,
      prompt: question.prompt[language],
      options: question.options[language].map((text, optionIndex) => ({ id: String(optionIndex), text })),
      correctAnswer: "0",
      explanation: question.explanation[language],
      onCorrect: next,
      onIncorrect: next
    } satisfies QuestionNode;
  });

  return {
    ...base,
    start: ids[0],
    mainIds: [...ids, ...base.mainIds],
    competencies,
    nodes
  };
}
