import type { Language } from "../course";
import type { CasesLesson, CaseExercise } from "../cases";

// Authored module 4 cases. Sources: Guyton & Hall 13e ch. 5,
// Ganong 23e ch. 4 (all-or-none behavior, channel inactivation, ionic gradients),
// Ghai Practical Physiology 8e chart 5-5.
// These are educational observations, not patient-specific diagnostic algorithms.
type Copy = {
  intro: string;
  titles: [string, string];
  situations: [string, string];
  stages: [string, string, string];
  questions: [[string, string, string], [string, string, string]];
  explanations: [[string, string], [string, string]];
};
const copy: Record<Language, Copy> = {
  RU: {
    intro: "Две задачи на физиологическое объяснение результатов. Сначала различите отдельный аксон и суммарный ответ нервного ствола; затем объясните, почему деполяризация не всегда усиливает возбудимость. Ответы проверяются студентом по разбору, а не оцениваются автоматически.",
    titles: ["1. Один аксон и нервный ствол", "2. Калий, деполяризация и доступность Na⁺-каналов"],
    situations: [
      "В эксперименте на одном изолированном аксоне два кратких стимула, немного выше порога и значительно выше порога, вызывают распространяющиеся потенциалы действия приблизительно одинаковой амплитуды. При стимуляции целого нервного ствола более сильный стимул увеличивает амплитуду суммарного внеклеточного ответа. Стимулы одинаковой длительности, условия регистрации не менялись.",
      "В экспериментальном препарате увеличение внеклеточного K⁺ делает мембранный потенциал менее отрицательным. После длительной деполяризации при серии одинаковых пробных стимулов с достаточными интервалами между ними распространяющийся импульс регистрируется в меньшей доле проб, чем до деполяризации. Исследователь заключает: «деполяризация всегда увеличивает возбудимость». Оцените этот вывод, не ставя диагноз пациенту."
    ],
    stages: ["Что действительно наблюдали?", "Объясните механизм", "Как проверить альтернативу?"],
    questions: [
      ["Чем отличается амплитуда импульса одного аксона от амплитуды суммарного ответа нервного ствола?", "Почему увеличение силы надпорогового стимула не делает отдельный импульс пропорционально выше?", "Какие дополнительные данные (число активированных волокон, положение электродов, синхронность ответа) помогут объяснить изменение суммарной амплитуды?"],
      ["Как изменяется калиевый градиент при повышении внеклеточного K⁺?", "Почему длительная деполяризация может уменьшить доступность потенциал-зависимых Na⁺-каналов?", "Как отделить изменение мембранного потенциала от изменения возбудимости? Назовите хотя бы одно измерение состояния Na⁺-каналов и контроль температуры."]
    ],
    explanations: [
      ["Для одного аксона потенциал действия регенеративен и подчиняется принципу «всё или ничего» при сопоставимых исходных условиях. Более сильный надпороговый стимул не увеличивает амплитуду отдельного импульса пропорционально силе стимула.", "Суммарный внеклеточный ответ может возрастать из-за рекрутирования дополнительных волокон; на его величину также влияют синхронность проведения и геометрия регистрации. Он не является амплитудой одного аксона."],
      ["Повышение внешнего K⁺ обычно смещает E(K) и Vm к менее отрицательным значениям. Небольшая деполяризация иногда облегчает достижение порога, но выраженная устойчивая деполяризация способна инактивировать Na⁺-каналы и затруднить генерацию или распространение импульса.", "Для проверки нужны измерения Vm, доступности Na⁺-тока или порога/ответа при контролируемых условиях. Один сдвиг Vm не доказывает ни повышение возбудимости, ни конкретное заболевание. Учебный двухионный расчёт Vm не моделирует кинетику Na⁺-каналов."]
    ]
  },
  EN: {
    intro: "Two cases requiring physiological interpretation. Distinguish a single axon from a compound nerve response, then explain why depolarization does not always increase excitability. Learners compare their responses with the explanations; these cases are not automatically graded.",
    titles: ["1. Single axon versus nerve trunk", "2. Potassium, depolarization and Na⁺-channel availability"],
    situations: [
      "In an isolated single axon, brief stimuli just above threshold and well above threshold evoke propagated action potentials of approximately equal amplitude. In an intact nerve trunk, a stronger stimulus increases the amplitude of the compound extracellular response. Stimulus duration and recording conditions remain fixed.",
      "In an experimental preparation, raising extracellular K⁺ makes membrane potential less negative. After sustained depolarization, repeated identical test stimuli separated by sufficient recovery intervals elicit a propagated spike in a smaller fraction of trials than before depolarization. A student concludes that depolarization always increases excitability. Evaluate this claim without making a clinical diagnosis."
    ],
    stages: ["Identify the observations", "Explain the mechanism", "Test an alternative"],
    questions: [
      ["How does a single-axon spike amplitude differ from the compound response amplitude of a nerve trunk?", "Why does increasing an already suprathreshold stimulus not proportionally enlarge a single spike?", "Which measurements of recruited fibers, electrode placement and response synchrony could explain the compound amplitude change?"],
      ["What happens to the K⁺ gradient as extracellular K⁺ rises?", "How can sustained depolarization reduce the availability of voltage-gated Na⁺ channels?", "How would you distinguish a change in Vm from a change in excitability? Name a Na⁺-channel availability measurement and a temperature control."]
    ],
    explanations: [
      ["For a single axon under comparable initial conditions, a propagated action potential is regenerative and follows the all-or-none principle. A stronger suprathreshold stimulus does not proportionally increase the height of an individual spike.", "A compound extracellular response can grow as additional axons are recruited. Synchrony and electrode geometry also affect its amplitude; it is not the amplitude of a single axon."],
      ["Higher extracellular K⁺ usually shifts E(K) and Vm toward less negative values. Modest depolarization can facilitate reaching threshold, but marked sustained depolarization can inactivate Na⁺ channels and impair spike initiation or propagation.", "Measure Vm and Na⁺-current availability or threshold/response under controlled conditions. A change in Vm alone establishes neither increased excitability nor a disease diagnosis. The two-ion Vm calculation does not simulate Na⁺-channel kinetics."]
    ]
  },
  KZ: {
    intro: "Физиологиялық түсіндіруді қажет ететін екі жағдай. Алдымен жеке аксон мен жүйке бағанының жиынтық жауабын ажыратыңыз; кейін деполяризация неге әрқашан қозғыштықты арттырмайтынын түсіндіріңіз. Жауаптар автоматты бағаланбайды, студент оларды түсіндірмемен салыстырады.",
    titles: ["1. Жеке аксон және жүйке бағаны", "2. Калий, деполяризация және Na⁺ арналарының қолжетімділігі"],
    situations: [
      "Оқшауланған бір аксонға табалдырықтан сәл жоғары және одан едәуір күшті қысқа стимулдар берілгенде, таралатын әрекет потенциалдарының амплитудасы шамамен бірдей болады. Ал тұтас жүйке бағанын тітіркендіргенде күшті стимул жиынтық жасушадан тыс жауап амплитудасын арттырады. Стимул ұзақтығы мен тіркеу жағдайлары өзгермейді.",
      "Эксперименттік препаратта жасушадан тыс K⁺ жоғарылағанда мембраналық потенциал азырақ теріс болады. Ұзақ деполяризациядан кейін қалпына келуге жеткілікті аралықтармен қайталанған бірдей сынақ стимулдарына таралатын импульс бұрынғыға қарағанда сынақтардың аз бөлігінде пайда болады. Студент «деполяризация қозғыштықты әрқашан арттырады» деп қорытынды жасады. Клиникалық диагноз қоймай, осы пікірді бағалаңыз."
    ],
    stages: ["Нені байқадық?", "Тетікті түсіндіріңіз", "Баламаны қалай тексереміз?"],
    questions: [
      ["Жеке аксон импульсінің амплитудасы жүйке бағанының жиынтық жауап амплитудасынан несімен ерекшеленеді?", "Неге табалдырықтан жоғары стимулды күшейту жеке импульс амплитудасын соған сай арттырмайды?", "Қосылған талшықтар саны, электродтардың орны және жауаптардың синхрондылығы туралы қандай өлшемдер жиынтық амплитуданың өзгерісін түсіндіреді?"],
      ["Сыртқы K⁺ артқанда калий градиенті қалай өзгереді?", "Ұзақ деполяризация кернеуге тәуелді Na⁺ арналарының қолжетімділігін қалай азайтуы мүмкін?", "Vm өзгерісін қозғыштық өзгерісінен қалай ажыратасыз? Na⁺ арналарының қолжетімділігін өлшеу тәсілін және температураны бақылауды атаңыз."]
    ],
    explanations: [
      ["Бастапқы жағдайлары бірдей жеке аксонда таралатын әрекет потенциалы регенеративті және «бәрі немесе ештеңе» қағидасына бағынады. Табалдырықтан жоғары стимулдың күшеюі жеке импульстің биіктігін пропорционалды арттырмайды.", "Жиынтық жасушадан тыс жауап қосымша аксондардың іске қосылуынан өсуі мүмкін. Оның амплитудасына жауаптардың синхрондылығы мен электродтардың орналасуы да әсер етеді; бұл жеке аксонның амплитудасы емес."],
      ["Жасушадан тыс K⁺ артқанда E(K) және Vm әдетте азырақ теріс мәндерге ығысады. Орташа деполяризация табалдырыққа жетуді жеңілдетуі мүмкін, ал айқын ұзақ деполяризация Na⁺ арналарының инактивациясын туғызып, импульстің пайда болуын немесе таралуын қиындатады.", "Бақыланатын жағдайда Vm, Na⁺ тогының қолжетімділігі немесе табалдырық пен жауапты өлшеу қажет. Vm өзгерісінің өзі қозғыштықтың артуын да, ауру диагнозын да дәлелдемейді. Екі ионды Vm есебі Na⁺ арналарының кинетикасын модельдемейді."]
    ]
  }
};

export function createModuleFourCases(language: Language, base: CasesLesson): CasesLesson {
  const data = copy[language];
  const cases: CaseExercise[] = data.titles.map((title, index) => ({
    id: "m4-authored-case-" + (index + 1),
    title,
    situation: data.situations[index],
    stages: data.stages.map((stageTitle, stageIndex) => ({
      title: stageTitle,
      questions: [data.questions[index][stageIndex]],
    })),
    explanation: data.explanations[index],
  }));
  return { ...base, introduction: data.intro, cases };
}
