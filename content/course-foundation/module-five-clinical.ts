import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 5 only. Physiological bridge, not an automated diagnostic tool.
// Guyton & Hall 13e, ch. 7 (PDF p. 100): end-plate safety factor and myasthenia.
// Ganong 23e, ch. 6 (PDF p. 138): myasthenia vs Lambert–Eaton.
// Ghai 8e, expt. 4-9 (PDF pp. 353–354): isolated nerve–muscle preparation;
// this artificial preparation cannot establish a clinical diagnosis.
type Link = "theory" | "interactive" | "practice" | "cases" | "questions";
type Card = { title: string; text: string; link: Link };
type Locale = { introduction: string; cards: [Card, Card, Card, Card, Card] };
const copy: Record<Language, Locale> = {
  RU: {
    introduction: "Клинический мост: нарушение нервно-мышечной передачи. Объясните данные через физиологический механизм, не подменяя его диагнозом.",
    cards: [
      { title: "1. Клиническое наблюдение", text: "Пациент сообщает о перемежающемся двоении и опущении века, которые усиливаются к концу продолжительной активности и уменьшаются после отдыха. При низкочастотной повторной стимуляции двигательного нерва зарегистрировано снижение амплитуды последовательных суммарных мышечных ответов (М-ответов). Какие звенья передачи от мотонейрона к мышце необходимо рассмотреть?", link: "theory" },
      { title: "2. Постройте причинную цепь", text: "При обычной передаче потенциал действия достигает нервного окончания → через потенциал-зависимые каналы входит Ca²⁺ → выделяется ацетилхолин → активируются никотиновые рецепторы концевой пластинки → достаточный потенциал концевой пластинки запускает мышечный потенциал действия. При уменьшении числа или функции постсинаптических рецепторов снижается запас надёжности передачи: некоторые импульсы нерва не вызывают мышечного ответа.", link: "interactive" },
      { title: "3. Что показывает уменьшение М-ответа?", text: "Снижение последовательных М-ответов при корректно выполненной повторной стимуляции согласуется с нарушением надёжности нервно-мышечной передачи. Оно не измеряет непосредственно число выделенных везикул и само по себе не доказывает постсинаптический дефект. Проверьте качество стимуляции, положение электродов, температуру и воспроизводимость результата.", link: "practice" },
      { title: "4. Сравните альтернативные механизмы", text: "При миастении часто страдает постсинаптическая функция ацетилхолиновых рецепторов; при синдроме Ламберта—Итона пресинаптическое поступление Ca²⁺ и высвобождение ацетилхолина снижены. Увеличение ответа после краткой нагрузки или высокочастотной стимуляции может поддерживать пресинаптический механизм, но один признак не устанавливает диагноз. Какие дополнительные электрофизиологические и клинические данные помогут различить причины?", link: "cases" },
      { title: "5. Граница вывода и безопасность", text: "Данные учебного случая требуют клинической и электрофизиологической проверки; в зависимости от ситуации учитывают антитела и другие причины слабости. Изолированный нервно-мышечный препарат из практикума не моделирует утомление человека. Нарастающая слабость дыхательных или глотательных мышц требует срочной медицинской оценки. Сформулируйте один подтверждённый механизм и один вывод, который пока делать нельзя.", link: "questions" }
    ]
  },
  EN: {
    introduction: "Clinical bridge: impaired neuromuscular transmission. Explain the physiological mechanism without treating a teaching observation as a diagnosis.",
    cards: [
      { title: "1. Clinical observation", text: "A patient reports intermittent double vision and eyelid drooping that worsen with sustained activity and improve after rest. Low-frequency repetitive motor-nerve stimulation shows a decrement in successive compound muscle action potential (CMAP) amplitudes. Which links from motor neuron to muscle need to be considered?", link: "theory" },
      { title: "2. Trace the causal chain", text: "Normally, a nerve spike reaches the terminal → Ca²⁺ enters through voltage-gated channels → acetylcholine is released → nicotinic end-plate receptors are activated → a sufficient end-plate potential triggers a muscle action potential. Reduced number or function of postsynaptic receptors lowers the safety factor of transmission, so some nerve impulses fail to evoke a muscle response.", link: "interactive" },
      { title: "3. What does a decrement show?", text: "A reproducible CMAP decrement during technically adequate repetitive stimulation is consistent with impaired reliability of neuromuscular transmission. It does not directly measure vesicle release and does not by itself prove a postsynaptic defect. Check stimulation adequacy, electrode position, temperature and reproducibility.", link: "practice" },
      { title: "4. Compare alternative mechanisms", text: "In myasthenia gravis, postsynaptic acetylcholine-receptor function is often impaired; in Lambert–Eaton syndrome, presynaptic Ca²⁺ entry and acetylcholine release are reduced. An increase in response after brief exercise or high-frequency stimulation may support a presynaptic mechanism, but no single feature establishes a diagnosis. What additional electrophysiological and clinical evidence could distinguish the mechanisms?", link: "cases" },
      { title: "5. Limits and safety", text: "This teaching case requires clinical and electrophysiological corroboration; antibody testing and other causes of weakness may need consideration. An isolated nerve–muscle preparation is not a model of human fatigue. Progressive breathing or swallowing weakness warrants urgent medical assessment. State one supported mechanism and one conclusion not yet justified.", link: "questions" }
    ]
  },
  KZ: {
    introduction: "Клиникалық байланыс: жүйке-бұлшықет берілісінің бұзылуы. Оқу бақылауын диагноз деп қабылдамай, физиологиялық тетігін түсіндіріңіз.",
    cards: [
      { title: "1. Клиникалық бақылау", text: "Пациентте ұзақ белсенділіктен кейін күшейіп, тыныққан соң азаятын қосарланып көру мен қабақтың түсуі байқалады. Қозғалтқыш жүйкені төмен жиілікпен қайталап тітіркендіргенде бұлшықеттің жиынтық әрекет потенциалы (М-жауап) амплитудасы біртіндеп төмендейді. Мотонейроннан бұлшықетке дейінгі қандай берілу буындарын қарастыру қажет?", link: "theory" },
      { title: "2. Себеп-салдар тізбегін құрыңыз", text: "Қалыпты жағдайда жүйке импульсі ұшқа жетеді → кернеуге тәуелді арналар арқылы Ca²⁺ енеді → ацетилхолин бөлінеді → соңғы пластинкадағы никотиндік рецепторлар белсенеді → жеткілікті соңғы пластинка потенциалы бұлшықет әрекет потенциалын туғызады. Постсинапстық рецепторлардың саны немесе қызметі азайса, берілістің сенімділік қоры төмендеп, кейбір жүйке импульстері бұлшықет жауабын туғызбайды.", link: "interactive" },
      { title: "3. М-жауаптың азаюы нені көрсетеді?", text: "Дұрыс жүргізілген қайталама тітіркендіруде М-жауап амплитудасының қайта-қайта төмендеуі жүйке-бұлшықет берілісінің сенімділігі бұзылғанымен үйлеседі. Бұл көпіршіктерден бөлінген медиатор мөлшерін тікелей өлшемейді және өздігінен постсинапстық ақауды дәлелдемейді. Тітіркендіру сапасын, электродтардың орнын, температураны және нәтиженің қайталануын тексеріңіз.", link: "practice" },
      { title: "4. Балама тетіктерді салыстырыңыз", text: "Миастенияда көбіне постсинапстық ацетилхолин рецепторларының қызметі бұзылады; Ламберт—Итон синдромында пресинапстық Ca²⁺ енуі және ацетилхолин бөлінуі төмендейді. Қысқа күш түсіруден немесе жоғары жиілікті тітіркендіруден кейін жауаптың күшеюі пресинапстық тетікті қолдауы мүмкін, бірақ жалғыз белгі диагнозды анықтамайды. Бұл тетіктерді ажыратуға қандай қосымша электрофизиологиялық және клиникалық деректер қажет?", link: "cases" },
      { title: "5. Қорытынды шегі және қауіпсіздік", text: "Оқу жағдайындағы деректер клиникалық және электрофизиологиялық растауды қажет етеді; жағдайға қарай антиденелер мен әлсіздіктің басқа себептері зерттеледі. Оқшауланған жүйке-бұлшықет препараты адамдағы шаршауды модельдемейді. Тыныс алу немесе жұтыну бұлшықеттері әлсіздігінің үдеуі шұғыл медициналық бағалауды талап етеді. Дәлелденген бір тетікті және әзірге жасауға болмайтын бір қорытындыны атаңыз.", link: "questions" }
    ]
  }
};
export function createModuleFiveClinical(language: Language): ReadingLesson {
  const selected = copy[language];
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: selected.introduction,
    cards: selected.cards.map((card, index) => ({
      id: "module-5-clinical-" + (index + 1),
      title: card.title,
      paragraphs: [card.text],
      links: [{ section: card.link }]
    }))
  };
}
