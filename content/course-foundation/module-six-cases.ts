import type { Language } from "../course";
import type { CasesLesson, CaseExercise } from "../cases";

// Three experimentally specified cases on neuronal inhibition and excitation.
// Illustrative values are not patient measurements or universal thresholds.
// Source cross-check: Ganong 23e PDF pp. 130–134; Guyton & Hall 13e PDF
// pp. 559–565. Ghai 8e PDF pp. 353–354 is a peripheral preparation and
// cannot validate central inhibitory synaptic currents.
type Triple = [string, string, string];
type Copy = {
  introduction: string;
  titles: Triple;
  situations: Triple;
  stageTitles: Triple;
  questions: [Triple, Triple, Triple];
  explanations: [[string, string], [string, string], [string, string]];
};
const copy: Record<Language, Copy> = {
  RU: {
    introduction: "Три учебных эксперимента: определите наблюдение, объясните механизм и предложите проверку альтернативы. Значения условные; правильность письменного ответа автоматически не оценивается.",
    titles: ["1. Торможение без гиперполяризации", "2. Время торможения меняет выход нейрона", "3. Где возникло уменьшение ответа?"],
    situations: [
      "В модели нейрона Vm в покое равен −65 мВ, а потенциал реверсии Cl⁻-проводимости E(Cl) = −65 мВ. При включении этой проводимости Vm почти не меняется. Одинаковая возбуждающая стимуляция даёт на соме пик ВПСП 8 мВ до включения проводимости и 3 мВ после (условные данные). Студент утверждает: «торможения нет, ведь гиперполяризации не было».",
      "В серии повторных проб на одном нейроне возбуждающий вход одинаков в опытах А и Б. В опыте А кратковременная тормозная проводимость включается одновременно с возбуждающим входом; в опыте Б — после того, как возбуждающий ответ уже затух. При одинаковом исходном Vm доля проб с ПД в А ниже, чем в Б. Исследователь считает, что одного числа возбуждающих синапсов достаточно для прогноза.",
      "При одинаковой стимуляции пресинаптического аксона средний возбуждающий постсинаптический ток уменьшается после воздействия вещества X. Одновременно в пресинаптическом окончании регистрируют меньший вход Ca²⁺, а ответ постсинаптических рецепторов на локально нанесённый агонист остаётся прежним. Исследователь делает вывод: «вещество X полностью выключило все постсинаптические рецепторы»."
    ],
    stageTitles: ["Выделите наблюдения", "Объясните физиологический механизм", "Предложите различающий контроль"],
    questions: [
      ["Что произошло с исходным Vm и амплитудой ВПСП? Почему отсутствие гиперполяризации не означает отсутствие торможения?", "Как повышение Cl⁻-проводимости меняет входное сопротивление и действие совпадающего возбуждающего тока?", "Как измерить входное сопротивление и проверить зависимость эффекта от E(Cl)? Почему по одному соматическому ВПСП нельзя предсказать ПД с уверенностью?"],
      ["Какие условия одинаковы и что различается между опытами А и Б? Какой вывод нельзя сделать только по числу синапсов?", "Почему совпадение по времени тормозной проводимости с возбуждающим входом может сильнее уменьшить его влияние на начальный сегмент аксона?", "Какие записи Vm и проводимости в разные моменты времени, при одинаковой силе стимулов, проверят временной механизм?"],
      ["Что непосредственно подтверждают записи пресинаптического Ca²⁺ и ответы на агонист?", "Как уменьшение Ca²⁺-входа может снизить вероятность выделения медиатора и средний вызванный ток?", "Какие независимые измерения выделения медиатора и функции постсинаптических рецепторов нужны, чтобы исключить дополнительные механизмы вещества X?"]
    ],
    explanations: [
      ["При E(Cl), равном исходному Vm, открытие Cl⁻-проводимости почти не сдвигает потенциал, но увеличивает суммарную проводимость и снижает входное сопротивление. Совпадающий возбуждающий ток вызывает меньший ВПСП: это шунтирующее торможение.", "8 и 3 мВ — условные результаты заданного опыта, а не универсальные значения. Эффект зависит от E(Cl), расположения и времени синапсов. Соматический ВПСП сам по себе не устанавливает потенциал в начальном сегменте аксона и наличие ПД."],
      ["Число активных возбуждающих синапсов одинаково, но их воздействие зависит от времени относительно тормозной проводимости. В опыте А повышенная проводимость способна уменьшить передачу деполяризации к области запуска ПД.", "В опыте Б позднее торможение может слабее повлиять на уже затухший ответ. Это не доказывает фиксированного порога или универсального окна времени: нужны синхронные записи Vm, проводимости и фактических разрядов."],
      ["Снижение Ca²⁺-входа в окончание при неизменной стимуляции согласуется с уменьшением вероятности экзоцитоза и среднего вызванного тока. Сохранный ответ на агонист противоречит утверждению о полном выключении всех постсинаптических рецепторов.", "Но причинная локализация ещё требует контролей: подтвердите приход ПД в окончание, измерьте выделение медиатора и оцените постсинаптические рецепторы при одинаковом мембранном потенциале. Одного среднего тока недостаточно для доказательства единственного механизма."]
    ]
  },
  EN: {
    introduction: "Three teaching experiments: identify the observations, explain the mechanism and propose a discriminating control. Values are illustrative; written responses are not automatically graded for correctness.",
    titles: ["1. Inhibition without hyperpolarization", "2. Inhibitory timing changes neuronal output", "3. Where did the response decrease?"],
    situations: [
      "In a neuron model, resting Vm is −65 mV and the reversal potential of a Cl⁻ conductance, E(Cl), is −65 mV. Activating this conductance barely changes Vm. The same excitatory stimulus produces an 8 mV somatic EPSP peak before, and a 3 mV peak after, conductance activation (illustrative data). A student argues: 'There is no inhibition because there was no hyperpolarization.'",
      "In repeated trials on the same neuron, the excitatory input is identical in conditions A and B; background activity varies between trials but is statistically matched between conditions. In A, a brief inhibitory conductance occurs at the same time as the excitatory input; in B, it occurs after the excitatory response has already decayed. With matched initial Vm, the proportion of trials with a spike is lower in A than in B. A researcher claims that counting excitatory synapses is sufficient to predict firing.",
      "With matched presynaptic axon stimulation, the mean excitatory postsynaptic current decreases after application of substance X. Presynaptic terminal recordings simultaneously show reduced Ca²⁺ entry, while postsynaptic receptors still respond normally to a locally applied agonist. A researcher concludes: 'Substance X has completely silenced all postsynaptic receptors.'"
    ],
    stageTitles: ["Identify the observations", "Explain the physiological mechanism", "Propose a discriminating control"],
    questions: [
      ["What happened to resting Vm and EPSP amplitude? Why does the absence of hyperpolarization not exclude inhibition?", "How does increased Cl⁻ conductance affect input resistance and the impact of a coincident excitatory current?", "How could input resistance and dependence on E(Cl) be tested? Why can a somatic EPSP alone not predict spiking with certainty?"],
      ["Which conditions are matched and what differs between A and B? What cannot be inferred from synapse counts alone?", "Why can an inhibitory conductance coincident with excitation reduce its impact on the axon initial segment more than a later conductance?", "Which time-resolved recordings of Vm and conductance, with matched stimulus strength, would test this timing mechanism?"],
      ["What do the terminal Ca²⁺ recording and agonist response directly establish?", "How can reduced terminal Ca²⁺ entry lower transmitter-release probability and mean evoked current?", "Which independent measures of release and postsynaptic receptor function would be needed to exclude additional actions of substance X?"]
    ],
    explanations: [
      ["When E(Cl) equals baseline Vm, opening Cl⁻ conductance barely shifts voltage but increases total membrane conductance and lowers input resistance. A coincident excitatory current then produces a smaller EPSP: shunting inhibition.", "The 8 and 3 mV values are illustrative, not universal. The effect depends on E(Cl), synaptic location and timing. A somatic EPSP alone does not establish voltage at the axon initial segment or prove whether a spike occurred."],
      ["The number of active excitatory synapses is unchanged, but their effect depends on timing relative to inhibitory conductance. In A, increased conductance can reduce the depolarization reaching the spike-initiation zone.", "In B, late inhibition may have less effect on a response that has already decayed. This does not establish a fixed threshold or universal time window; synchronized voltage, conductance and spike recordings are needed."],
      ["Reduced terminal Ca²⁺ entry under matched stimulation is consistent with reduced vesicle-fusion probability and mean evoked current. A preserved agonist response contradicts complete loss of postsynaptic receptor function.", "Causal localization still requires controls: confirm action-potential arrival at the terminal, measure release and test postsynaptic receptors at matched membrane voltage. A single mean current does not prove an exclusive mechanism."]
    ]
  },
  KZ: {
    introduction: "Үш оқу тәжірибесі: бақылауды анықтаңыз, тетікті түсіндіріңіз және балама болжамды ажырататын тексеруді ұсыныңыз. Сандық мәндер шартты; жазбаша жауаптың дұрыстығы автоматты түрде бағаланбайды.",
    titles: ["1. Гиперполяризациясыз тежелу", "2. Тежелудің уақыты нейрон жауабын өзгертеді", "3. Жауаптың азаюы қай жерде пайда болды?"],
    situations: [
      "Нейрон моделінде тыныштықтағы Vm = −65 мВ, ал Cl⁻ өткізгіштігінің реверсия потенциалы E(Cl) = −65 мВ. Осы өткізгіштік ашылғанда Vm дерлік өзгермейді. Бірдей қоздырушы стимул өткізгіштік ашылғанға дейін сомада 8 мВ, ашылғаннан кейін 3 мВ шыңдық ҚПСП туғызады (шартты деректер). Студент: «Гиперполяризация болмады, демек тежелу де жоқ», — дейді.",
      "Бір нейронда бірнеше рет қайталанған сынақтарда А және Б жағдайларындағы қоздырушы кіріс бірдей. А жағдайында қысқа тежеуші өткізгіштік қоздырушы кіріспен бір мезгілде, ал Б жағдайында қоздырушы жауап басылғаннан кейін пайда болады. Бастапқы Vm бірдей болса да, А-да әрекет потенциалы тіркелген сынақтардың үлесі Б-дан төмен. Зерттеуші разрядты болжауға қоздырушы синапстар санын білу жеткілікті дейді.",
      "Пресинапстық аксон бірдей тітіркендірілгенде X заты әсерінен орташа қоздырушы постсинапстық ток азаяды. Осы кезде пресинапстық ұшта Ca²⁺ енуі төмендегені тіркеледі, ал жергілікті берілген агонистке постсинапстық рецепторлардың жауабы бұрынғыдай сақталады. Зерттеуші: «X заты барлық постсинапстық рецепторларды толық тоқтатты», — деп тұжырымдайды."
    ],
    stageTitles: ["Бақылауларды анықтаңыз", "Физиологиялық тетікті түсіндіріңіз", "Болжамдарды ажырататын бақылау ұсыныңыз"],
    questions: [
      ["Тыныштықтағы Vm және ҚПСП амплитудасы қалай өзгерді? Неліктен гиперполяризация болмауы тежелуді жоққа шығармайды?", "Cl⁻ өткізгіштігінің артуы кіріс кедергісін және бір мезгілдегі қоздырушы токтың әсерін қалай өзгертеді?", "Кіріс кедергісін және әсердің E(Cl)-ге тәуелділігін қалай тексеруге болады? Неліктен сомадағы бір ҚПСП арқылы әрекет потенциалын нақты болжауға болмайды?"],
      ["А мен Б-да қандай жағдайлар бірдей, қандай жағдай өзгеше? Тек синапстар саны бойынша қандай қорытынды жасауға болмайды?", "Қоздырумен бір мезгілдегі тежеуші өткізгіштік деполяризацияның аксонның бастапқы сегментіне жетуін неліктен күштірек азайта алады?", "Стимул күші бірдей кезде Vm мен өткізгіштіктің уақыттық жазбалары осы тетікті қалай тексереді?"],
      ["Пресинапстық Ca²⁺ жазбасы мен агонистке жауап тікелей нені растайды?", "Ұшқа Ca²⁺ енуінің азаюы медиатор бөліну ықтималдығын және орташа шақырылған токты қалай төмендете алады?", "X затының қосымша әсерлерін жоққа шығару үшін медиатор бөлінуі мен постсинапстық рецептор қызметін қандай тәуелсіз әдістермен тексеру керек?"]
    ],
    explanations: [
      ["E(Cl) бастапқы Vm-ге тең болса, Cl⁻ өткізгіштігінің ашылуы кернеуді айтарлықтай өзгертпейді, бірақ жалпы мембраналық өткізгіштікті арттырып, кіріс кедергісін азайтады. Бір мезгілдегі қоздырушы ток кішірек ҚПСП туғызады: бұл шунттаушы тежелу.", "8 және 3 мВ — әмбебап мәндер емес, осы шартты тәжірибенің нәтижелері. Әсер E(Cl)-ге, синапстардың орны мен уақытына тәуелді. Сомадағы ҚПСП аксонның бастапқы сегментіндегі кернеуді немесе әрекет потенциалы туғанын жеке дәлелдемейді."],
      ["Белсенді қоздырушы синапстар саны өзгермейді, бірақ олардың әсері тежеуші өткізгіштікпен уақыт жағынан қабаттасуына тәуелді. А-да өткізгіштіктің артуы деполяризацияның әрекет потенциалы басталатын аймаққа жетуін азайта алады.", "Б-да кеш пайда болған тежелу басылып қалған жауапқа азырақ әсер етуі мүмкін. Бұл тұрақты табалдырықты немесе әмбебап уақыт аралығын дәлелдемейді: Vm, өткізгіштік және нақты разрядтарды синхронды тіркеу қажет."],
      ["Бірдей стимулда пресинапстық Ca²⁺ енуінің азаюы везикула қосылу ықтималдығының және орташа шақырылған токтың төмендеуімен үйлеседі. Агонистке жауаптың сақталуы барлық постсинапстық рецепторлар толық өшті дегенге қайшы.", "Себепті нақтылау үшін қосымша бақылау керек: әрекет потенциалының ұшқа жеткенін растаңыз, медиатор бөлінуін өлшеңіз және бірдей мембраналық кернеуде постсинапстық рецепторларды тексеріңіз. Бір орташа ток жалғыз тетікті дәлелдемейді."]
    ]
  }
};
export function createModuleSixCases(language: Language, base: CasesLesson): CasesLesson {
  const c = copy[language];
  const cases: CaseExercise[] = c.titles.map((title, i) => ({
    id: "m6-authored-case-" + (i + 1),
    title,
    situation: c.situations[i],
    stages: c.stageTitles.map((stageTitle, j) => ({
      title: stageTitle,
      questions: [c.questions[i][j]]
    })),
    explanation: c.explanations[i]
  }));
  return { ...base, introduction: c.introduction, cases };
}
