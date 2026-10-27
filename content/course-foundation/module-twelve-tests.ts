import type { Language } from "../course";
import type { BranchingTest, TestNode } from "../tests";

// Module 12: authored basal-ganglia branching assessment.
// References: Guyton & Hall 13e ch. 57; Ganong 23e ch. 16;
// C. L. Ghai Practical Physiology 8e pp. 285–287.
// Canonical pathway signs assume other inputs held fixed; clinical signs alone
// never establish a unique lesion or diagnosis.
type L = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): L => ({ RU, EN, KZ });
type Item = { prompts: [L, L, L]; choices: [L, L, L, L]; explanation: L };
const items: Item[] = [
  {
    prompts: [
      t("В учебной схеме базальных ганглиев какой выход преимущественно тормозит таламус?", "In a basal-ganglia diagram, which output primarily inhibits thalamus?", "Базальды ганглийлер сызбасында таламусты негізінен қай шығыс тежейді?"),
      t("Студент нарисовал прямой аксон от путамена к мышце. Как следует исправить схему?", "A student draws a direct axon from putamen to muscle. How should the diagram be corrected?", "Студент путаменнен бұлшықетке тікелей аксон сызды. Сызбаны қалай түзету керек?"),
      t("Какая структура непосредственно иннервирует скелетную мышцу: GPi, таламус или нижний мотонейрон?", "Which directly innervates skeletal muscle: GPi, thalamus, or a lower motor neuron?", "Қаңқа бұлшықетін қайсысы тікелей жүйкелендіреді: GPi, таламус әлде төменгі мотонейрон?")
    ],
    choices: [
      t("GPi/SNr тормозят таламус через ГАМК; мышцу непосредственно иннервирует нижний мотонейрон.", "GPi/SNr inhibit thalamus via GABA; a lower motor neuron directly innervates muscle.", "GPi/SNr таламусты ГАМҚ арқылы тежейді; бұлшықетті төменгі мотонейрон тікелей жүйкелендіреді."),
      t("GPi возбуждает таламус глутаматом, а таламус напрямую иннервирует мышцы.", "GPi excites thalamus with glutamate, which directly innervates muscles.", "GPi таламусты глутаматпен қоздырады, ал таламус бұлшықетті тікелей жүйкелендіреді."),
      t("Путамен отправляет периферические моторные аксоны, минуя спинальные мотонейроны.", "Putamen sends peripheral motor axons that bypass spinal motor neurons.", "Путамен жұлын мотонейрондарын айналып өтіп, шеткі қозғалтқыш аксондар жібереді."),
      t("GPe является единственным выходом базальных ганглиев к таламусу.", "GPe is the only basal-ganglia output to thalamus.", "GPe базальды ганглийлердің таламусқа баратын жалғыз шығысы.")
    ],
    explanation: t("Стриатум получает корковые входы, а GPi/SNr обеспечивают важный тонический тормозный выход. Сокращение мышцы требует нисходящих путей и нижнего мотонейрона.", "Striatum receives cortical inputs and GPi/SNr provide major tonic inhibitory output. Muscle contraction requires descending pathways and a lower motor neuron.", "Стриатум қыртыстан кіріс алады, ал GPi/SNr тұрақты тежеуші шығыс береді. Бұлшықетті жиыру үшін төмендеуші жолдар мен төменгі мотонейрон қажет.")
  },
  {
    prompts: [
      t("При усилении активности прямого пути и неизменных других входах как изменится торможение таламуса?", "With greater direct-pathway activity and other inputs fixed, how does thalamic inhibition change?", "Тікелей жол белсеніп, өзге кірістер тұрақты болса, таламустың тежелуі қалай өзгереді?"),
      t("При торможении GPe стриатумом как изменятся STN и GPi/SNr в каноническом непрямом пути?", "When striatum inhibits GPe, how do STN and GPi/SNr respond in the canonical indirect pathway?", "Стриатум GPe-ні тежегенде жанама жолдағы STN мен GPi/SNr қалай өзгереді?"),
      t("Почему прямой и непрямой пути могут противоположно влиять на таламус в упрощённой модели?", "Why can direct and indirect pathways have opposing effects on thalamus in a simplified model?", "Қарапайым модельде тікелей және жанама жолдар таламусқа неге қарама-қарсы әсер етеді?")
    ],
    choices: [
      t("Прямой путь тормозит GPi/SNr и растормаживает таламус; непрямой через GPe и STN может усилить его торможение.", "The direct route inhibits GPi/SNr and disinhibits thalamus; the indirect route via GPe and STN can increase thalamic inhibition.", "Тікелей жол GPi/SNr-ды тежеп, таламусты тежелуден босатады; жанама жол GPe мен STN арқылы тежелуді күшейтуі мүмкін."),
      t("Оба пути одинаково возбуждают таламус прямыми глутаматергическими проекциями.", "Both pathways excite thalamus equally through direct glutamatergic projections.", "Екі жол да таламусты тікелей глутаматергиялық проекциялармен бірдей қоздырады."),
      t("Непрямой путь минует GPe и STN и обязательно подавляет GPi/SNr.", "The indirect pathway bypasses GPe and STN and necessarily suppresses GPi/SNr.", "Жанама жол GPe мен STN-ды айналып өтіп, GPi/SNr-ды міндетті түрде тежейді."),
      t("Прямой путь возбуждает GPi/SNr и увеличивает их торможение таламуса.", "The direct pathway excites GPi/SNr and increases their inhibition of thalamus.", "Тікелей жол GPi/SNr-ды қоздырып, таламусты тежеуін арттырады.")
    ],
    explanation: t("Прямой путь: ГАМК-ергическое торможение GPi/SNr уменьшает тормозный выход к таламусу. Непрямой путь: торможение GPe растормаживает STN, который возбуждает GPi/SNr.", "Direct-pathway GABAergic inhibition of GPi/SNr reduces inhibitory output to thalamus. In the indirect pathway, GPe inhibition disinhibits STN, which excites GPi/SNr.", "Тікелей жолда ГАМҚ арқылы GPi/SNr тежеліп, таламусқа тежеуші шығыс азаяды. Жанама жолда GPe тежелгенде STN босап, GPi/SNr-ды қоздырады.")
  },
  {
    prompts: [
      t("При снижении дофамина SNc какое изменение вероятно в канонической D1/D2-модели?", "With reduced SNc dopamine, which change is predicted by the canonical D1/D2 model?", "SNc дофамині азайса, канондық D1/D2 моделі қандай өзгерісті болжайды?"),
      t("Студент говорит, что дофамин всегда возбуждает любой стриарный нейрон. Какая поправка нужна?", "A student says dopamine always excites every striatal neuron. What correction is needed?", "Студент дофамин әр стриатум нейронын әрқашан қоздырады дейді. Қандай түзету керек?"),
      t("Почему замедление начала движения при сохранной силе не равнозначно периферическому парезу?", "Why is slow movement initiation with preserved strength not equivalent to peripheral paresis?", "Күш сақталса да қозғалысты баяу бастау неге шеткі парезге тең емес?")
    ],
    choices: [
      t("D1 обычно облегчает прямой путь, D2 подавляет непрямой; потеря дофамина может усилить выход GPi/SNr и затруднить движение.", "D1 generally facilitates the direct route and D2 suppresses the indirect; dopamine loss can increase GPi/SNr output and impede movement.", "D1 тікелей жолды жеңілдетеді, D2 жанама жолды бәсеңдетеді; дофамин азайса, GPi/SNr шығысы артып, қозғалыс қиындауы мүмкін."),
      t("Дофамин одинаково возбуждает D1- и D2-нейроны, поэтому баланс путей не меняется.", "Dopamine excites D1 and D2 neurons identically, so pathway balance cannot change.", "Дофамин D1 және D2 нейрондарын бірдей қоздырады, сондықтан жолдар теңгерімі өзгермейді."),
      t("SNc непосредственно иннервирует мышцы, поэтому снижение дофамина всегда вызывает периферический паралич.", "SNc directly innervates muscles, so dopamine loss always causes peripheral paralysis.", "SNc бұлшықеттерді тікелей жүйкелендіреді, сондықтан дофамин азаюы әрқашан шеткі салдануға әкеледі."),
      t("D2-рецепторы отсутствуют в стриатуме и не участвуют в двигательных петлях.", "D2 receptors are absent from striatum and do not participate in motor loops.", "D2 рецепторлары стриатумда болмайды және қозғалыс контурларына қатыспайды.")
    ],
    explanation: t("Нигростриарный дофамин действует через разные рецепторные популяции. Брадикинезия не тождественна слабости; один симптом не доказывает ни болезнь Паркинсона, ни точную локализацию.", "Nigrostriatal dopamine has receptor-dependent effects. Bradykinesia is not the same as weakness; one sign establishes neither Parkinson disease nor a precise lesion site.", "Нигростриаталдық дофамин рецептор түріне тәуелді әсер етеді. Брадикинезия әлсіздікке тең емес; бір белгі Паркинсон ауруын да, нақты зақым орнын да дәлелдемейді.")
  },
  {
    prompts: [
      t("При конфликте действий усилился корковый вход в STN. Что может сделать гиперпрямой путь?", "Cortical input to STN increases during action conflict. What can the hyperdirect pathway do?", "Әрекеттер қақтығысқанда STN-ға қыртыстық кіріс күшейді. Гипертікелей жол не істей алады?"),
      t("Маршрут кора→STN→GPi/SNr минует какой узел и как влияет на таламус?", "Which node does cortex→STN→GPi/SNr bypass, and how can it affect thalamus?", "Қыртыс→STN→GPi/SNr жолы қай түйінді айналып өтіп, таламусқа қалай әсер етеді?"),
      t("Можно ли по одному индексу активности STN вычислить время остановки движения?", "Can movement-stopping latency be computed from one STN activity index?", "STN белсенділігінің бір индексінен қозғалысты тоқтату кідірісін есептеуге бола ма?")
    ],
    choices: [
      t("Корковый вход минует стриатум; STN возбуждает GPi/SNr и может усилить торможение таламуса, но точную задержку не задаёт.", "Cortical input bypasses striatum; STN excites GPi/SNr and can strengthen thalamic inhibition, but does not fix a latency.", "Қыртыстық кіріс стриатумды айналып өтеді; STN GPi/SNr-ды қоздырып, таламус тежелуін күшейтуі мүмкін, бірақ нақты кідірісті бермейді."),
      t("Гиперпрямой путь обязательно проходит через стриатум и GPe перед STN.", "The hyperdirect pathway necessarily passes through striatum and GPe before STN.", "Гипертікелей жол STN-ға дейін міндетті түрде стриатум мен GPe арқылы өтеді."),
      t("STN тормозит GPi/SNr ГАМК-ергически, поэтому таламус всегда растормаживается.", "STN inhibits GPi/SNr through GABA, so thalamus is always disinhibited.", "STN GPi/SNr-ды ГАМҚ арқылы тежейді, сондықтан таламус әрқашан тежелуден босайды."),
      t("Активность STN однозначно определяет время остановки в миллисекундах без измерений.", "STN activity uniquely determines stopping time in milliseconds without measurements.", "STN белсенділігі өлшеусіз тоқтау уақытын миллисекундпен дәл анықтайды.")
    ],
    explanation: t("Гиперпрямой путь связывает кору с STN, который глутаматергически возбуждает GPi/SNr. Влияние зависит от остальных входов; схема не измеряет нейронную латентность или время реакции.", "The hyperdirect pathway links cortex to STN, which excites GPi/SNr glutamatergically. The effect depends on other inputs; a diagram does not measure neural or reaction latency.", "Гипертікелей жол қыртысты STN-мен байланыстырады, ал STN глутамат арқылы GPi/SNr-ды қоздырады. Әсер өзге кірістерге тәуелді; сызба жүйкелік не реакция кідірісін өлшемейді.")
  },
  {
    prompts: [
      t("Начало движения замедлено, но максимальная сила сохранена. Какое различие важно при осмотре?", "Movement initiation is slow but maximal strength is preserved. Which distinction matters clinically?", "Қозғалысты бастау баяу, бірақ ең жоғары күш сақталған. Тексеруде қандай айырма маңызды?"),
      t("При достижении цели рука промахивается, хотя начало движения сохранено. Что нужно различать?", "A hand overshoots its target despite preserved initiation. Which features must be distinguished?", "Қозғалысты бастау сақталса да қол нысанадан асып кетеді. Қандай белгілерді ажырату керек?"),
      t("Достаточно ли одного признака брадикинезии для постановки диагноза болезни Паркинсона?", "Is one observation of bradykinesia sufficient to diagnose Parkinson disease?", "Брадикинезияның бір белгісі Паркинсон ауруын анықтауға жеткілікті ме?")
    ],
    choices: [
      t("Брадикинезия — замедление, слабость — снижение силы, дисметрия — ошибка амплитуды; ни один признак сам по себе не устанавливает диагноз.", "Bradykinesia is slowness, weakness reduced force, and dysmetria inaccurate amplitude; no single sign establishes a diagnosis.", "Брадикинезия — баяулық, әлсіздік — күш азаюы, дисметрия — амплитуда қатесі; бір белгі жеке өзі диагноз қоймайды."),
      t("Сохранная сила исключает любое нарушение базальных ганглиев и двигательных сетей.", "Preserved strength excludes all basal-ganglia and motor-network dysfunction.", "Күштің сақталуы базальды ганглийлер мен қозғалыс желілерінің барлық бұзылуын жоққа шығарады."),
      t("Дисметрия и брадикинезия означают одно и то же поражение одной структуры.", "Dysmetria and bradykinesia always identify the same single-structure lesion.", "Дисметрия мен брадикинезия әрқашан бір құрылымның бірдей зақымын білдіреді."),
      t("Любое замедление движения без дополнительных данных доказывает болезнь Паркинсона.", "Any slow movement proves Parkinson disease without further information.", "Қозғалыстың кез келген баяулауы қосымша дерексіз Паркинсон ауруын дәлелдейді.")
    ],
    explanation: t("Базальные ганглии влияют на выбор и масштабирование движений, мозжечковые сети — на точность, мотонейроны — на мышечный выход. Для диагноза нужны анамнез, осмотр и альтернативные объяснения.", "Basal ganglia contribute to action selection and scaling, cerebellar networks to accuracy, and motor neurons to muscle output. Diagnosis needs history, examination and alternative explanations.", "Базальды ганглийлер қозғалысты таңдау мен мөлшерлеуге, мишық дәлдікке, мотонейрондар бұлшықет шығысына қатысады. Диагноз үшін анамнез, тексеру және балама түсіндірмелер қажет.")
  }
];
const names = ["concept", "mechanism", "application", "transfer", "justification"] as const;
export function adaptModuleTwelveTest(base: BranchingTest, lang: Language): BranchingTest {
  const nodes: Record<string, TestNode> = { ...base.nodes };
  names.forEach((name, i) => {
    const item = items[i];
    (["main", "corrective", "basic"] as const).forEach((level, j) => {
      const key = name + ":" + level;
      const old = nodes[key];
      if (!old || old.type !== "question") throw new Error("Missing question " + key);
      const choices = item.choices.map((c, n) => ({ id: "abcd"[n], text: c[lang] }));
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
        theoryTarget: { moduleId: 12, anchor: suffix === "review-1" ? "mechanism" : "interpretation" } };
    });
  });
  return { ...base, nodes };
}
