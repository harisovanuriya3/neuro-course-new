import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 12: five basal-ganglia takeaways, not an additional assessment.
// Evidence checked in the user's Library: Guyton & Hall 13e, ch. 57,
// printed pp. 730–733 (PDF 697–700); Ganong 23e, ch. 16,
// printed pp. 250–253 (PDF 262–265); C. L. Ghai 8e,
// printed pp. 285–287 (PDF 307–309). Original wording; no textbook excerpts.
// Direct/indirect/hyperdirect diagrams are teaching models, not individual diagnoses.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];

const takeaways: Record<Language, FiveTakeaways> = {
  RU: [
    {
      title: "Базальные ганглии работают в петлях с корой",
      explanation: "Стриатум (хвостатое ядро и путамен), GPe, GPi, субталамическое ядро (STN) и чёрная субстанция участвуют в корково-подкорковых контурах. GPi и SNr обеспечивают преимущественно тормозный ГАМК-ергический выход к таламусу и структурам ствола; это не прямой путь к мышце."
    },
    {
      title: "Прямой и непрямой пути по-разному меняют выход",
      explanation: "В канонической модели прямой стриарный путь тормозит GPi/SNr и уменьшает их торможение таламуса. Непрямой путь через GPe и STN может усилить этот выход; гиперпрямой путь идёт от коры к STN без обязательного прохождения стриатума. Реальные контуры действуют совместно."
    },
    {
      title: "Дофамин модулирует, а не просто включает движение",
      explanation: "Нейроны компактной части чёрной субстанции (SNc) влияют на стриатум. В учебной схеме D1-зависимое влияние обычно способствует прямому пути, а D2-зависимое ослабляет активность непрямого. Эффект зависит от рецепторов и сети: фраза «дофамин всегда возбуждает» неверна."
    },
    {
      title: "Выбор действия не равен мышечной силе",
      explanation: "Базальные ганглии участвуют в выборе, запуске и масштабировании действий вместе с корой, мозжечком и таламусом. Изменение времени начала или амплитуды движения не доказывает слабость мышцы. Нисходящие пути и нижние мотонейроны обеспечивают выполнение команды."
    },
    {
      title: "Симптомы требуют дифференциальной оценки",
      explanation: "Брадикинезия означает замедленность движения, хорея — неритмичные непроизвольные движения, а дисметрия указывает на ошибку масштаба или точности. Эти признаки не дают точной локализации или диагноза по одному наблюдению; модель прямого и непрямого путей не заменяет клиническую оценку."
    }
  ],
  EN: [
    {
      title: "Basal ganglia operate in loops with cortex",
      explanation: "Striatum (caudate and putamen), GPe, GPi, subthalamic nucleus (STN) and substantia nigra participate in cortico-subcortical loops. GPi and SNr provide predominantly inhibitory GABAergic output to thalamus and brainstem targets; they do not form a direct nerve to muscle."
    },
    {
      title: "Direct and indirect pathways alter output differently",
      explanation: "In the canonical model, the direct striatal pathway inhibits GPi/SNr and reduces their inhibition of thalamus. The indirect pathway via GPe and STN can increase that output; the hyperdirect route reaches STN from cortex without requiring striatum. Real pathways operate together."
    },
    {
      title: "Dopamine modulates rather than simply switches movement on",
      explanation: "Substantia nigra pars compacta (SNc) neurons influence striatum. In the teaching model, D1-dependent effects usually favor the direct pathway, whereas D2-dependent effects reduce indirect-pathway activity. Effects depend on receptors and circuits; dopamine is not universally excitatory."
    },
    {
      title: "Selecting an action is different from generating force",
      explanation: "Basal ganglia contribute to action selection, initiation and scaling alongside cortex, cerebellum and thalamus. A change in movement-onset time or amplitude does not itself establish muscle weakness. Descending pathways and lower motor neurons carry commands to skeletal muscle."
    },
    {
      title: "Motor signs require differential interpretation",
      explanation: "Bradykinesia is slowness of movement, chorea consists of irregular involuntary movements, and dysmetria concerns errors in movement range or accuracy. None alone provides a precise lesion location or diagnosis; a direct/indirect pathway diagram is not a substitute for clinical assessment."
    }
  ],
  KZ: [
    {
      title: "Базальды ганглийлер қыртыспен тұйық контурлар түзеді",
      explanation: "Стриатум (құйрықты ядро мен путамен), GPe, GPi, субталамустық ядро (STN) және қара субстанция қыртыс-қыртысасты контурларына қатысады. GPi мен SNr таламусқа және ми бағанына көбіне ГАМҚ-ергиялық тежеуші шығыс береді; олар бұлшықетке тікелей баратын жүйке емес."
    },
    {
      title: "Тікелей және жанама жолдар шығысқа әртүрлі әсер етеді",
      explanation: "Канондық модельде стриатумның тікелей жолы GPi/SNr-ды тежеп, олардың таламусқа тежегіш әсерін азайтады. GPe мен STN арқылы өтетін жанама жол бұл әсерді күшейте алады; гипертікелей жол қыртыстан STN-ға стриатумды міндетті түрде айналып өтеді. Нақты жолдар бірге жұмыс істейді."
    },
    {
      title: "Дофамин қозғалысты жай ғана қосып қоймайды",
      explanation: "Қара субстанцияның ықшам бөлігінің (SNc) нейрондары стриатумға әсер етеді. Оқу моделінде D1-рецепторларына тәуелді әсер тікелей жолды көбіне қолдайды, ал D2-рецепторларына тәуелді әсер жанама жолдың белсенділігін азайтады. Нәтиже рецептор мен контурға байланысты; дофамин барлық жерде қоздырғыш емес."
    },
    {
      title: "Әрекетті таңдау бұлшықет күшінен бөлек",
      explanation: "Базальды ганглийлер қыртыс, мишық және таламуспен бірге әрекетті таңдауға, бастауға және ауқымын реттеуге қатысады. Қозғалыстың басталу уақыты не амплитудасының өзгеруі бұлшықет әлсіздігін өздігінен дәлелдемейді. Төмендеуші жолдар мен төменгі мотонейрондар команданы бұлшықетке жеткізеді."
    },
    {
      title: "Қозғалыс белгілерін салыстырып бағалау қажет",
      explanation: "Брадикинезия — қозғалыстың баяулауы, хорея — ырғақсыз еріксіз қимылдар, ал дисметрия — қозғалыс ауқымы мен дәлдігінің қатесі. Бір ғана белгі зақым орнын немесе диагнозды нақтыламайды; тікелей және жанама жолдардың сызбасы клиникалық бағалауды алмастырмайды."
    }
  ]
};

export function createModuleTwelveSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU"
      ? "Пять выводов за одну минуту: контуры, три пути, дофамин, выбор движения и границы клинического вывода."
      : language === "EN"
        ? "Five one-minute takeaways: loops, three pathways, dopamine, action selection and clinical limits."
        : "Бір минуттағы бес қорытынды: контурлар, үш жол, дофамин, әрекет таңдау және клиникалық тұжырым шектері.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-12-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "clinical" }],
    })),
  };
}
