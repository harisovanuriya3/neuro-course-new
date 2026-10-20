import type { Language } from "../course";
import type { CasesLesson, CaseExercise } from "../cases";

// Three authored, ungraded experimental cases. The numbers are illustrative.
// Sources checked: Ganong 23e, ch. 6 (PDF pp. 127–134);
// Guyton & Hall 13e, chs. 7 and 46 (PDF pp. 96–100, 556–558);
// C. L. Ghai 8e, expt. 4-9 (PDF pp. 353–354), which describes an
// isolated nerve–muscle preparation, not a direct central-synapse assay.
type Triple = [string, string, string];
type Copy = {
  intro: string;
  titles: Triple;
  situations: Triple;
  stages: Triple;
  questions: [Triple, Triple, Triple];
  explanations: [[string, string], [string, string], [string, string]];
};
const copy: Record<Language, Copy> = {
  RU: {
    intro: "Три экспериментальные задачи о синаптической передаче. Разделите наблюдение, механизм и альтернативу. Числа учебные; выводы не являются клиническим диагнозом. Сверяйте письменный ответ с разбором: автоматической оценки правильности здесь нет.",
    titles: ["1. Импульс есть, медиатора меньше", "2. Пресинаптический или постсинаптический дефект?", "3. Химическая или электрическая связь?"],
    situations: [
      "При парной регистрации нейронов отдельная запись непосредственно в пресинаптическом окончании подтверждает приход потенциала действия. При уменьшении входа Ca²⁺ в окончание средняя амплитуда вызванного постсинаптического ответа падает с 5 до 1 мВ (условные данные, одинаковые условия записи). Исследователь утверждает: «импульс не дошёл до синапса».",
      "В изолированном нервно-мышечном препарате после воздействия A потенциал концевой пластинки при стимуляции нерва уменьшается, а мышца отвечает на прямое электрическое раздражение. Возможны две гипотезы: A1 — снижено пресинаптическое выделение ацетилхолина; A2 — уменьшена чувствительность никотиновых рецепторов концевой пластинки. Доступна внутриклеточная запись миниатюрных потенциалов концевой пластинки при контроле мембранного потенциала.",
      "В парной записи двух нейронов короткая ступень тока, введённая в клетку A, вызывает небольшое почти синхронное изменение потенциала клетки B; при введении тока в B изменение обнаруживается и в A. В опыте блокируют везикулярное выделение медиатора, но быстрая двусторонняя связь сохраняется. Учёный объявляет электрический синапс окончательно доказанным."
    ],
    stages: ["Что показывают данные?", "Какой механизм подходит?", "Какая проверка различит объяснения?"],
    questions: [
      ["Какие данные прямо подтверждают приход импульса в окончание? Как изменилась амплитуда ответа?", "Почему уменьшение входа Ca²⁺ способно снизить средний ответ при сохранном потенциале действия?", "Как измерение пресинаптического Ca²⁺-тока и вызванного выделения медиатора поможет отличить дефект экзоцитоза от блока проведения?"],
      ["Почему сохранный ответ мышцы на прямое раздражение не указывает однозначно на место нарушения нервно-мышечной передачи?", "Как при A1 и A2 ожидается измениться средняя амплитуда миниатюрных потенциалов при прочих равных?", "Какие дополнительные измерения квантового содержания вызванного ответа и амплитуды миниатюрных ответов помогут различить A1 и A2?"],
      ["Какие данные указывают на электрическое сопряжение и почему это пока не абсолютное доказательство?", "Чем перенос ионного тока через щелевые контакты отличается от выделения медиатора?", "Как парная регистрация, оценка коэффициента электрической связи и селективные генетические/молекулярные контроли помогут исключить общую внеклеточную стимуляцию и неспецифические эффекты блокаторов?"]
    ],
    explanations: [
      ["Приход импульса и экзоцитоз — отдельные события. Вход Ca²⁺ в активную зону повышает вероятность слияния везикул; поэтому средний вызванный ответ может уменьшиться без блока проведения по аксону. Спонтанное выделение не обязано исчезать.", "Изменение постсинаптического ответа само по себе не доказывает, что причина исключительно пресинаптическая: нужны контроль рецепторов, ионных градиентов и регистрации. Числа не являются универсальной формулой Ca²⁺-зависимости."],
      ["Прямая стимуляция обходит нерв и нервно-мышечное соединение, но не различает пресинаптическое и постсинаптическое нарушения. При преимущественно пресинаптическом снижении числа высвобождаемых квантов средняя амплитуда отдельных миниатюрных ответов может сохраняться; при уменьшении числа работающих никотиновых рецепторов она обычно снижается.", "Сравнивайте квантовое содержание вызванного ответа с амплитудами миниатюрных ответов при контроле мембранного потенциала и свойств мышцы; учитывайте нелинейное суммирование потенциалов концевой пластинки. Это учебная экспериментальная логика, а не самостоятельный метод постановки диагноза пациенту."],
      ["Быстрые двусторонние изменения напряжения и сохранение связи без везикулярного выделения поддерживают электрическое сопряжение через щелевые контакты; химическая передача обычно требует выделения медиатора и активации рецепторов.", "Одного фармакологического опыта недостаточно: блокаторы могут иметь неспецифические эффекты, а общее электрическое поле способно создавать артефакты. Требуются парная внутриклеточная регистрация, проверка направлений тока и независимые контроли белков щелевых контактов."]
    ]
  },
  EN: {
    intro: "Three experimental cases on synaptic transmission. Separate observations, mechanism and alternative hypotheses. Values are illustrative, not clinical diagnostic criteria. Compare your written reasoning with the explanations; correctness is not automatically graded.",
    titles: ["1. Spike preserved, transmitter response reduced", "2. Presynaptic or postsynaptic failure?", "3. Chemical or electrical coupling?"],
    situations: [
      "In paired neuronal recordings, a direct recording from the presynaptic terminal confirms action-potential arrival. When Ca²⁺ entry into the terminal is reduced, the mean evoked postsynaptic response falls from 5 to 1 mV (illustrative values, matched recording conditions). A researcher concludes that the spike failed to reach the synapse.",
      "In an isolated nerve–muscle preparation, treatment A reduces the nerve-evoked end-plate potential, while the muscle still responds to direct electrical stimulation. Two hypotheses are considered: A1, reduced presynaptic acetylcholine release; A2, reduced sensitivity of end-plate nicotinic receptors. Intracellular miniature end-plate potentials can be recorded with membrane potential controlled.",
      "In paired recordings from two neurons, a brief current step in cell A produces a small, nearly simultaneous voltage change in B; current injection into B also changes A. After vesicular transmitter release is blocked, the rapid bidirectional coupling persists. A researcher claims that an electrical synapse has been conclusively proven."
    ],
    stages: ["What do the observations show?", "Which mechanism fits?", "What control separates the hypotheses?"],
    questions: [
      ["What does the terminal recording establish? How did the mean evoked postsynaptic response change?", "How can reduced Ca²⁺ entry lower the mean response while the action potential is intact?", "How would measuring presynaptic Ca²⁺ current and evoked release distinguish impaired exocytosis from failed axonal propagation?"],
      ["Why does preserved direct muscle excitability not uniquely locate the nerve–muscle transmission defect?", "With other conditions held constant, how should the mean miniature end-plate potential amplitude differ between A1 and A2?", "Which measurements of evoked quantal content and miniature-response amplitude would distinguish A1 from A2?"],
      ["Which observations favor electrical coupling, and why are they not yet definitive?", "How does ionic current through gap junctions differ from vesicular transmitter release?", "How could paired recording, coupling-coefficient measurements and selective genetic or molecular controls rule out common extracellular stimulation and nonspecific drug effects?"]
    ],
    explanations: [
      ["Spike arrival and exocytosis are distinct. Ca²⁺ entry at the active zone increases vesicle-fusion probability, so the mean evoked response can fall without axonal conduction block. Spontaneous release need not disappear.", "A smaller postsynaptic response alone does not prove an exclusively presynaptic cause; receptor function, ionic driving forces and recording conditions require controls. These values do not define a universal Ca²⁺-response law."],
      ["Direct muscle stimulation bypasses the nerve and neuromuscular junction, but does not distinguish presynaptic from postsynaptic transmission defects. Reduced quantal release may leave individual miniature-response amplitudes intact, whereas loss of functional nicotinic receptors typically reduces them.", "Compare evoked quantal content with miniature amplitudes while controlling membrane potential and muscle properties; account for nonlinear summation of end-plate potentials. This is experimental reasoning, not a standalone patient diagnostic test."],
      ["Rapid bidirectional voltage changes persisting without vesicular release support electrical coupling through gap junctions; chemical transmission generally requires transmitter release and receptor activation.", "One pharmacological intervention is insufficient: blockers can have off-target effects and shared electric fields can create artifacts. Paired intracellular recording, current-direction tests and independent gap-junction protein controls are needed."]
    ]
  },
  KZ: {
    intro: "Синапстық берілуге арналған үш эксперименттік жағдай. Бақылауды, тетікті және балама болжамды ажыратыңыз. Сандық мәндер оқу үшін берілген, клиникалық диагноз өлшемдері емес. Жазбаша жауабыңызды түсіндірмемен салыстырыңыз: дұрыстығы автоматты түрде бағаланбайды.",
    titles: ["1. Импульс сақталған, медиаторлық жауап азайған", "2. Пресинапстық па, постсинапстық па?", "3. Химиялық па, электрлік байланыс па?"],
    situations: [
      "Екі нейронды қатар тіркегенде пресинапстық ұштан тікелей жазба әрекет потенциалының сол жерге жеткенін растайды. Ұшқа Ca²⁺ енуі азайғанда шақырылған постсинапстық жауаптың орташа амплитудасы 5-тен 1 мВ-қа төмендейді (шартты сандар, тіркеу жағдайлары бірдей). Зерттеуші «импульс синапсқа жетпеді» деп қорытындылайды.",
      "Оқшауланған жүйке-бұлшықет препаратында A әсерінен жүйкені тітіркендіргенде соңғы пластинка потенциалы азаяды, ал бұлшықет тікелей электрлік тітіркендіруге жауап береді. Екі болжам бар: A1 — ацетилхолиннің пресинапстық бөлінуі азайған; A2 — соңғы пластинкадағы никотиндік рецепторлардың сезімталдығы төмендеген. Мембраналық потенциал бақыланып, соңғы пластинканың миниатюралық потенциалдары жасушаішілік әдіспен тіркеледі.",
      "Екі нейронды қатар тіркегенде A жасушасына берілген қысқа ток импульсі B жасушасының потенциалын да аздап және дерлік бір мезгілде өзгертеді; B жасушасына ток бергенде A-да да өзгеріс байқалады. Медиатордың көпіршіктерден бөлінуін бөгегеннен кейін жылдам екіжақты байланыс сақталады. Зерттеуші электрлік синапс толық дәлелденді дейді."
    ],
    stages: ["Деректер нені көрсетеді?", "Қай тетік сәйкес келеді?", "Болжамдарды қандай бақылау ажыратады?"],
    questions: [
      ["Пресинапстық ұштағы тікелей жазба нені растайды? Шақырылған жауап амплитудасы қалай өзгерді?", "Әрекет потенциалы сақталғанда Ca²⁺ енуінің азаюы орташа жауапты неге төмендетеді?", "Пресинапстық Ca²⁺ тогын және шақырылған медиатор бөлінуін өлшеу экзоцитоз бұзылуын аксондағы өткізу бөгелуінен қалай ажыратады?"],
      ["Бұлшықеттің тікелей тітіркендіруге жауабы сақталуы жүйке-бұлшықет берілісіндегі ақаудың орнын неге бірмәнді анықтамайды?", "Басқа жағдайлар бірдей болса, A1 және A2 кезінде миниатюралық соңғы пластинка потенциалдарының орташа амплитудасы қалай өзгереді?", "A1 мен A2-ні ажырату үшін шақырылған жауаптың кванттық құрамын және миниатюралық жауап амплитудасын қалай салыстырасыз?"],
      ["Қай бақылаулар электрлік байланысқа сәйкес келеді және неліктен бұл әлі түпкілікті дәлел емес?", "Саңылаулы түйіспелер арқылы иондық токтың өтуі медиатордың көпіршіктерден бөлінуінен қалай ерекшеленеді?", "Екі жасушаны қатар тіркеу, электрлік байланыс коэффициентін өлшеу және таңдамалы генетикалық не молекулалық бақылаулар ортақ сыртқы стимул мен дәрінің бейспецификалық әсерін қалай жоққа шығарады?"]
    ],
    explanations: [
      ["Импульстің ұшқа жетуі мен экзоцитоз — бөлек кезеңдер. Белсенді аймаққа Ca²⁺ енуі көпіршіктердің қосылу ықтималдығын арттырады, сондықтан аксонда өткізу бөгелмесе де орташа шақырылған жауап азаюы мүмкін. Медиатордың өздігінен бөлінуі міндетті түрде жойылмайды.", "Постсинапстық жауаптың азаюы себеп тек пресинапстық екенін дәлелдемейді: рецепторларды, иондық қозғаушы күшті және тіркеу жағдайларын бақылау қажет. Бұл сандар Ca²⁺-ке тәуелділіктің әмбебап формуласын бермейді."],
      ["Бұлшықетті тікелей тітіркендіру жүйке мен жүйке-бұлшықет түйіспесін айналып өтеді, бірақ берілістің пресинапстық не постсинапстық бұзылуын ажыратпайды. Бөлінетін кванттар саны азайса, жеке миниатюралық жауап амплитудасы сақталуы мүмкін; ал жұмыс істейтін никотиндік рецепторлар азайса, ол әдетте төмендейді.", "Сызықтық емес қосылуды ескеріп, мембраналық потенциал мен бұлшықет қасиеттерін бақылап, шақырылған жауаптың кванттық құрамын миниатюралық жауап амплитудаларының таралуымен салыстырыңыз. Бұл — эксперименттік талдау, пациентке өздігінен диагноз қою тәсілі емес."],
      ["Медиатордың көпіршіктерден бөлінуі болмаған жағдайда сақталатын жылдам екіжақты кернеу өзгерістері саңылаулы түйіспелер арқылы электрлік байланыс барын қолдайды; химиялық берілу әдетте медиатор бөлінуін және рецепторлардың белсенуін қажет етеді.", "Бір фармакологиялық тәжірибе жеткіліксіз: блокаторлардың қосымша әсерлері, ал ортақ электр өрісінің артефактілері болуы мүмкін. Екі жасушаны қатар жасушаішілік тіркеу, ток бағытын тексеру және саңылаулы түйіспе ақуыздарына тәуелсіз бақылаулар қажет."]
    ]
  }
};

export function createModuleFiveCases(language: Language, base: CasesLesson): CasesLesson {
  const c = copy[language];
  const cases: CaseExercise[] = c.titles.map((title, i) => ({
    id: "m5-authored-case-" + (i + 1),
    title,
    situation: c.situations[i],
    stages: c.stages.map((stageTitle, j) => ({ title: stageTitle, questions: [c.questions[i][j]] })),
    explanation: c.explanations[i],
  }));
  return { ...base, introduction: c.intro, cases };
}
