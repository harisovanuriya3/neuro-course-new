import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 11: motor planning, descending pathways, sensory feedback.
// Sources read from the user's Library:
// Guyton & Hall 13e, ch. 56, printed pp. 709–711 (PDF 677–679);
// Ganong 23e, ch. 16, printed pp. 241–244 (PDF 253–256);
// C. L. Ghai Practical Physiology 8e, printed pp. 295–297 (PDF 317–319).
// Educational objectives are not instructions for unsupervised neurological examination.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Построить функциональную схему двигательной команды",
      "На схеме проследить цель движения → ассоциативную и премоторную кору → моторную кору → нисходящие пути → спинальные мотонейроны → мышцу. Объяснить, как базальные ганглии и мозжечок влияют на планирование и коррекцию через таламо-корковые и стволовые связи; не изображать их единственной последовательной цепью."],
    ["Сравнить кортикоспинальный и кортико-бульбарный выход",
      "Показать ход кортикоспинального пути через внутреннюю капсулу и пирамиды, преимущественный перекрёст в каудальной части продолговатого мозга и роль латерального тракта в тонких движениях пальцев. Отличить кортико-бульбарные проекции к двигательным ядрам черепных нервов; не утверждать, что все волокна или все функции строго перекрещены."],
    ["Объяснить постуральную поддержку движения",
      "Сопоставить преимущественную роль медиальных ретикулоспинальных и вестибулоспинальных влияний в контроле осевой и проксимальной мускулатуры с ролью латерального кортикоспинального пути в точных движениях дистальных отделов. Объяснить, почему поддержание позы необходимо до и во время произвольного движения."],
    ["Предсказать эффект изменения сенсорной обратной связи",
      "На примере шага по неровной поверхности отделить предварительную настройку команды от коррекции по проприоцептивным, вестибулярным и зрительным сигналам. Предсказать, как уменьшение одного входа может изменить точность и устойчивость; указать возможную компенсацию и пределы прогноза."],
    ["Различить силу, тонус и координацию при клиническом анализе",
      "По описанию движений различить слабость, спастичность, гипорефлексию и дисметрию; предложить, какие уровни моторной системы требуют дальнейшей проверки. Не ставить диагноз по одной пробе и не считать изолированное повреждение кортикоспинального пути единственной причиной спастичности."]
  ],
  EN: [
    ["Map the functional sequence of a motor command",
      "Trace movement goal → association and premotor cortex → motor cortex → descending pathways → spinal motor neurons → muscle. Explain how basal ganglia and cerebellum influence planning and correction through thalamocortical and brainstem connections; do not depict these structures as one obligatory serial chain."],
    ["Compare corticospinal and corticobulbar output",
      "Trace the corticospinal tract through the internal capsule and medullary pyramids, its predominantly caudal-medullary decussation, and the lateral tract's contribution to skilled finger movements. Distinguish corticobulbar projections to cranial motor nuclei; do not claim that all fibers or functions are strictly crossed."],
    ["Explain postural support for voluntary movement",
      "Contrast the predominantly axial and proximal control of medial reticulospinal and vestibulospinal pathways with the lateral corticospinal contribution to skilled distal movement. Explain why postural adjustments are needed both before and during a voluntary action."],
    ["Predict consequences of altered sensory feedback",
      "For a step on uneven ground, distinguish feedforward preparation from corrections using proprioceptive, vestibular and visual information. Predict how reducing one input may change accuracy and stability, while acknowledging compensation and uncertainty."],
    ["Differentiate strength, tone and coordination clinically",
      "Distinguish weakness, spasticity, hyporeflexia and dysmetria in a movement description and propose which motor-system levels require further assessment. Avoid diagnosis from a single sign and do not attribute spasticity exclusively to an isolated corticospinal tract lesion."]
  ],
  KZ: [
    ["Қозғалыс командасының функционалдық сызбасын құру",
      "Қозғалыс мақсаты → ассоциативтік және премоторлық қыртыс → моторлық қыртыс → төмендеуші жолдар → жұлын мотонейрондары → бұлшықет тізбегін сызбада көрсету. Базальды ганглийлер мен мишықтың таламо-қыртыстық және ми бағаны байланыстары арқылы жоспарлау мен түзетуге қатысуын түсіндіру; оларды міндетті бірізді тізбек ретінде көрсетпеу."],
    ["Кортикоспиналдық және кортикобульбарлық жолдарды салыстыру",
      "Кортикоспиналдық жолдың ішкі капсула мен сопақша ми пирамидалары арқылы өтуін, талшықтардың көбінің сопақша мидың төменгі бөлігінде қиылысуын және латералдық жолдың саусақтардың дәл қимылындағы рөлін көрсету. Кортикобульбарлық талшықтардың бассүйек жүйкелерінің қозғалтқыш ядроларына проекциясын ажырату; барлық талшықтар толық қиылысады деп тұжырымдамау."],
    ["Ерікті қозғалыстың постуральдық тірегін түсіндіру",
      "Медиалдық ретикулоспиналдық және вестибулоспиналдық жолдардың тұлға мен аяқ-қолдың проксималдық бұлшықеттерін басқарудағы рөлін латералдық кортикоспиналдық жолдың дисталдық дәл қозғалыстардағы рөлімен салыстыру. Дене қалпын алдын ала және қозғалыс барысында реттеу неге қажет екенін түсіндіру."],
    ["Сенсорлық кері байланыс өзгерісінің нәтижесін болжау",
      "Тегіс емес жерде қадам басу мысалында алдын ала дайындалған қозғалыс командасын проприоцептивтік, вестибулярлық және көру сигналдары бойынша түзетуден ажырату. Бір сенсорлық кіріс азайса, дәлдік пен тұрақтылық қалай өзгеруі мүмкін екенін болжау; компенсация мүмкіндігі мен болжам шегін көрсету."],
    ["Клиникалық бағалауда күш, тонус және үйлесімді ажырату",
      "Қозғалыс сипаттамасынан бұлшықет әлсіздігін, спастикалық тонусты, гипорефлексияны және дисметрияны ажыратып, қозғалыс жүйесінің қай деңгейлерін қосымша тексеру керегін ұсыну. Жалғыз белгімен диагноз қоймау және спастикалық тонусты тек оқшауланған кортикоспиналдық жол зақымымен түсіндірмеу."]
  ]
};

export function createModuleElevenObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-11-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [
        { section: "theory" }, { section: "pretest" }, { section: "interactive" },
        { section: "practice" }, { section: "cases" },
      ],
    },
  };
}
