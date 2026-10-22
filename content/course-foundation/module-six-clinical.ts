// AUDIT STATUS 2026-10-22: DRAFT ONLY. Not yet imported by content/index.ts or page route.
// GitHub tool declined writes to those routes; do not claim student-facing delivery.
// Still requires route integration, AST checks, CI build and RU/EN/KZ browser review.
import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 6 clinical bridge: supraspinal modulation of spinal excitation/inhibition.
// Sources consulted: Ganong 23e ch. 6 (PDF pp. 133–134), ch. 9 (p. 175),
// ch. 16 (p. 256); Guyton & Hall 13e ch. 55 (PDF pp. 667–669),
// ch. 56 (PDF pp. 680–682), with stroke-related descending control.
// Ghai 8e expt. 4-9 (PDF pp. 353–354) is an isolated peripheral preparation,
// not a measurement of spinal synaptic inhibition in a living patient.
type Link = "theory" | "practice" | "cases" | "tests" | "questions";
type Card = { title: string; text: string; link: Link };
type Locale = { introduction: string; cards: [Card, Card, Card, Card, Card] };
const copy: Record<Language, Locale> = {
  RU: {
    introduction: "Клинический мост: почему после поражения нисходящих двигательных путей может усилиться рефлекс растяжения? Разделяйте наблюдение, возможный механизм и недоказанный диагноз.",
    cards: [
      { title: "1. Наблюдение", text: "Через несколько месяцев после инсульта у пациента сохраняется слабость ноги на стороне пареза. Коленный рефлекс на этой стороне оживлён, а сопротивление пассивному быстрому растяжению мышцы увеличено. Какие признаки говорят об изменении работы спинальных двигательных цепей, а какие сами по себе не указывают на конкретный повреждённый синапс?", link: "theory" },
      { title: "2. Объясните возбуждение и торможение", text: "Растяжение активирует мышечные веретёна → импульсы по Ia-афферентам достигают спинного мозга → возбуждающие влияния повышают вероятность разряда мотонейронов мышцы. Тормозные интернейроны и нисходящие пути изменяют передачу и суммирование сигналов. После повреждения надсегментарного контроля баланс возбуждающих, тормозных и собственных мембранных механизмов может измениться, усиливая рефлекторный ответ. Это не означает полного исчезновения торможения.", link: "theory" },
      { title: "3. Почему нельзя назвать один виновный медиатор?", text: "Повышенный рефлекс и зависимое от скорости растяжения сопротивление согласуются с изменённой возбудимостью рефлекторных цепей, но не измеряют отдельно ВПСП, ТПСП, пресинаптическое торможение или содержание ГАМК. Даже сохранная проводимость периферического нерва не позволяет по одному рефлексу локализовать конкретный синапс. Объясните, почему суммарный двигательный ответ не равен записи с одного нейрона.", link: "practice" },
      { title: "4. Проверьте альтернативы", text: "Сравните рефлексы обеих ног, мышечный тонус при медленном и быстром движении, силу, чувствительность и подошвенный ответ. Проверьте объём пассивных движений и боль: контрактура и механическая жёсткость также повышают сопротивление, но не доказывают усиление рефлекса. При необходимости клиницист оценивает периферические нервы и другие причины изменения рефлексов. H-рефлекс может дать дополнительные сведения о возбудимости спинальной рефлекторной дуги, но не измеряет изолированно силу одного тормозного синапса.", link: "cases" },
      { title: "5. Граница вывода", text: "Клинические признаки могут поддерживать синдром поражения верхнего мотонейрона и нарушение нисходящей регуляции, однако механизм спастичности многофакторен. Нельзя по этим данным утверждать, что у пациента отсутствует ГАМК или повреждён определённый интернейрон. Практикум на изолированном нервно-мышечном препарате не воспроизводит эту центральную регуляцию. Назовите один обоснованный и один необоснованный вывод.", link: "questions" }
    ]
  },
  EN: {
    introduction: "Clinical bridge: why can a stretch reflex become exaggerated after damage to descending motor pathways? Distinguish observations, plausible mechanisms and unproven diagnoses.",
    cards: [
      { title: "1. Observation", text: "Several months after a stroke, a patient still has leg weakness on the affected side. The knee-jerk reflex on that side is brisk, and resistance to rapid passive muscle stretch is increased. Which findings suggest altered spinal motor-circuit function, and which cannot identify a particular damaged synapse?", link: "theory" },
      { title: "2. Explain excitation and inhibition", text: "Stretch activates muscle spindles → Ia afferent impulses reach the spinal cord → excitatory input increases the probability of firing in motor neurons of the stretched muscle. Inhibitory interneurons and descending pathways modulate transmission and summation. After loss of supraspinal control, the balance of excitatory, inhibitory and intrinsic membrane mechanisms may shift, increasing reflex responses. This does not imply that all inhibition has disappeared.", link: "theory" },
      { title: "3. Why not blame a single transmitter?", text: "A brisk reflex and velocity-dependent resistance are consistent with altered reflex-circuit excitability, but they do not separately measure EPSPs, IPSPs, presynaptic inhibition or GABA concentration. Even normal peripheral nerve conduction cannot localize one synapse from a single reflex. Explain why a compound motor response is not a recording from an individual neuron.", link: "practice" },
      { title: "4. Test alternative explanations", text: "Compare reflexes on both sides, tone during slow and fast passive movement, strength, sensation and plantar responses. Assess passive range of motion and pain: contracture and mechanical stiffness can also increase resistance but do not prove increased stretch-reflex gain. When indicated, a clinician assesses peripheral nerves and other causes of abnormal reflexes. An H-reflex can provide additional information about spinal reflex-arc excitability, but it does not isolate the strength of one inhibitory synapse.", link: "cases" },
      { title: "5. Limits of inference", text: "These findings may support an upper motor neuron syndrome with impaired descending modulation, but spasticity has multiple mechanisms. They do not prove absent GABA or injury to a particular interneuron. An isolated nerve–muscle preparation does not reproduce this central regulation. State one justified and one unjustified conclusion.", link: "questions" }
    ]
  },
  KZ: {
    introduction: "Клиникалық байланыс: төмендеуші қозғалтқыш жолдар зақымданғаннан кейін созылу рефлексі неге күшеюі мүмкін? Бақылауды, ықтимал тетікті және дәлелденбеген диагнозды ажыратыңыз.",
    cards: [
      { title: "1. Клиникалық бақылау", text: "Инсульттен бірнеше ай өткен соң пациенттің зақымданған жағындағы аяғында әлсіздік сақталған. Зақымданған жақтағы тізе рефлексі күшейген, ал бұлшықетті жылдам пассивті созғанда қарсылық артады. Қандай белгілер жұлынның қозғалтқыш тізбектерінің жұмысы өзгергенін көрсетеді және қандай деректер нақты бір синапстың зақымданғанын дәлелдемейді?", link: "theory" },
      { title: "2. Қозу мен тежелуді түсіндіріңіз", text: "Созылу бұлшықет ұршықтарын белсендіреді → Ia-афференттер импульстерді жұлынға жеткізеді → қоздырушы әсер созылған бұлшықеттің мотонейрондарының разряд ықтималдығын арттырады. Тежеуші интернейрондар мен төмендеуші жолдар сигналдардың берілуі мен суммациясын реттейді. Жоғары орталықтардан келетін бақылау бұзылғанда қоздырушы, тежеуші және мембраналық тетіктердің арақатынасы өзгеріп, рефлекс күшеюі мүмкін. Бұл тежелу түгел жоғалды дегенді білдірмейді.", link: "theory" },
      { title: "3. Неліктен бір медиаторды кінәлауға болмайды?", text: "Күшейген рефлекс пен созылу жылдамдығына тәуелді қарсылық рефлекстік тізбектер қозғыштығының өзгеруімен үйлеседі, бірақ ҚПСП, ТПСП, пресинапстық тежелу немесе ГАМҚ мөлшерін жеке өлшемейді. Перифериялық жүйкенің өткізгіштігі сақталса да, бір рефлекс арқылы нақты синапсты анықтау мүмкін емес. Жиынтық қозғалтқыш жауаптың жеке нейрон жазбасынан айырмасын түсіндіріңіз.", link: "practice" },
      { title: "4. Балама түсіндірмелерді тексеріңіз", text: "Екі аяқтың рефлекстерін, баяу және жылдам пассивті қозғалыстағы бұлшықет тонусын, күшін, сезімталдығын және табан рефлексін салыстырыңыз. Пассивті қозғалыс көлемі мен ауырсынуды тексеріңіз: контрактура және механикалық қаттылық та қарсылықты арттыра алады, бірақ рефлекстің күшейгенін дәлелдемейді. Қажет болса, дәрігер перифериялық жүйкелерді және рефлекс өзгерісінің басқа себептерін бағалайды. H-рефлекс жұлын рефлекстік доғасының қозғыштығы туралы қосымша мәлімет береді, бірақ бір тежеуші синапстың күшін жеке өлшемейді.", link: "cases" },
      { title: "5. Қорытындының шегі", text: "Бұл белгілер жоғарғы мотонейрон синдромын және төмендеуші реттелудің бұзылуын қолдауы мүмкін, бірақ спастикалылықтың тетіктері көп. Осы деректер бойынша ГАМҚ мүлде жоқ немесе белгілі бір интернейрон зақымданған деп айтуға болмайды. Оқшауланған жүйке-бұлшықет препараты мұндай орталық реттелуді модельдемейді. Негізделген бір және негізделмеген бір қорытындыны атаңыз.", link: "questions" }
    ]
  }
};

export function createModuleSixClinical(language: Language): ReadingLesson {
  const selected = copy[language];
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: selected.introduction,
    cards: selected.cards.map((card, index) => ({
      id: "module-6-clinical-" + (index + 1),
      title: card.title,
      paragraphs: [card.text],
      links: [{ section: card.link }]
    }))
  };
}
