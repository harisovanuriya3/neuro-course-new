import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 11: five physiological takeaways for motor systems and movement control.
// Checked against the user's Library copies: Guyton & Hall 13e, ch. 56,
// PDF pp. 677–679 (printed 709–711); Ganong 23e, ch. 16,
// PDF pp. 253–255 (printed 241–243); C. L. Ghai Practical Physiology 8e,
// PDF pp. 317–319 (printed 295–297). No textbook text reproduced.
// These are learning summaries, not instructions for neurological examination.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];

const takeaways: Record<Language, FiveTakeaways> = {
  RU: [
    {
      title: "Команда движения формируется распределённой сетью",
      explanation: "Ассоциативная, премоторная и моторная кора взаимодействуют с базальными ганглиями, мозжечком и таламусом при подготовке и выполнении движения. Нисходящие пути и спинальные сети воздействуют на α-мотонейроны — конечный общий нервный выход к скелетной мышце. Это не одна обязательная линейная цепочка: несколько параллельных контуров изменяют команду."
    },
    {
      title: "Большинство кортикоспинальных волокон перекрещивается, но не все",
      explanation: "Кортикоспинальные аксоны проходят через внутреннюю капсулу и пирамиды продолговатого мозга. Большинство пересекает среднюю линию в каудальной части продолговатого мозга и образует латеральный тракт, особенно важный для точных движений кисти. Часть волокон спускается по переднему пути и может перекрещиваться на спинальном уровне. Кортикобульбарные проекции к двигательным ядрам черепных нервов имеют собственные, часто двусторонние закономерности."
    },
    {
      title: "Поза и точное движение используют взаимодействующие пути",
      explanation: "Вестибулоспинальные и многие ретикулоспинальные влияния особенно важны для равновесия, осевой и проксимальной мускулатуры; латеральный кортикоспинальный тракт — для дифференцированных движений дистальных отделов. Это преобладающие функции, а не абсолютное разделение. При движении руки постуральные настройки могут начинаться заранее и продолжаться во время действия."
    },
    {
      title: "Предварительная команда и обратная связь дополняют друг друга",
      explanation: "Feedforward подготавливает движение на основе прогноза, а feedback использует проприоцептивные, зрительные и вестибулярные сигналы для коррекции. Если зрительную информацию уменьшить, команда не исчезает: другие входы могут частично компенсировать потерю, а точность зависит от задания и условий. Сравнивать следует измеряемые ошибки и устойчивость, не обещая одинаковый результат всем."
    },
    {
      title: "Клинический признак не равен точной локализации",
      explanation: "Слабость, спастичность, гипорефлексия и дисметрия отражают разные нарушения моторного контроля, но каждый признак имеет несколько возможных механизмов. При сухожильном рефлексе удар по сухожилию растягивает мышцу и её веретёна; Ia-афферент возбуждает α-мотонейрон. Это не прямое возбуждение рецепторов сухожилия. По одному рефлексу нельзя ставить диагноз; необходимы другие данные и контекст."
    }
  ],
  EN: [
    {
      title: "Motor commands emerge from distributed networks",
      explanation: "Association, premotor and motor cortex interact with basal ganglia, cerebellum and thalamus during movement preparation and execution. Descending pathways and spinal circuits influence alpha motor neurons, the final common neural output to skeletal muscle. This is not a mandatory single serial chain: several parallel loops shape motor output."
    },
    {
      title: "Most, but not all, corticospinal fibers cross",
      explanation: "Corticospinal axons pass through the internal capsule and medullary pyramids. Most cross in the caudal medulla to form the lateral tract, particularly important for skilled hand movements. Some fibers descend in the anterior tract and may cross at spinal levels. Corticobulbar projections to cranial motor nuclei follow distinct, often bilateral, patterns."
    },
    {
      title: "Posture and skilled movement depend on interacting pathways",
      explanation: "Vestibulospinal and many reticulospinal influences are especially important for balance and axial or proximal muscles, whereas the lateral corticospinal tract contributes strongly to fractionated distal movements. These are predominant roles, not an absolute division. Reaching may require anticipatory postural adjustments that continue during movement."
    },
    {
      title: "Feedforward and feedback complement one another",
      explanation: "Feedforward control prepares actions using predictions; feedback uses proprioceptive, visual and vestibular signals to correct them. Reducing vision does not abolish motor commands: other inputs may partly compensate, while accuracy depends on the task and conditions. Compare measured errors and stability rather than assuming one outcome for every learner."
    },
    {
      title: "One clinical sign cannot localize a lesion precisely",
      explanation: "Weakness, spasticity, hyporeflexia and dysmetria reflect different aspects of motor dysfunction, but each has several possible mechanisms. A tendon tap stretches the muscle and its muscle spindles; Ia afferents excite alpha motor neurons. The tendon receptors are not the direct trigger of this stretch reflex. A single reflex finding cannot establish a diagnosis without other evidence."
    }
  ],
  KZ: [
    {
      title: "Қозғалыс командасын таралған жүйелер қалыптастырады",
      explanation: "Ассоциативтік, премоторлық және моторлық қыртыс қозғалысты дайындау және орындау кезінде базальды ганглийлермен, мишықпен және таламуспен өзара әрекеттеседі. Төмендеуші жолдар мен жұлын желілері қаңқа бұлшықеттеріне соңғы жалпы жүйкелік шығыс болатын α-мотонейрондарға әсер етеді. Бұл міндетті бірізді тізбек емес: бірнеше параллель контур қозғалыс командасын реттейді."
    },
    {
      title: "Кортикоспиналдық талшықтардың көбі айқасады, бірақ барлығы емес",
      explanation: "Кортикоспиналдық аксондар ішкі капсула мен сопақша ми пирамидалары арқылы өтеді. Олардың көбі сопақша мидың каудалдық бөлігінде айқасып, қолдың дәл қимылдарына маңызды латералдық жолды түзеді. Кейбір талшықтар алдыңғы жолмен төмен түсіп, жұлын деңгейінде айқасуы мүмкін. Бассүйек жүйкелерінің қозғалтқыш ядроларына баратын кортикобульбарлық проекциялардың өзіндік, көбіне екіжақты байланыстары бар."
    },
    {
      title: "Дене қалпы мен дәл қозғалысты өзара байланысты жолдар реттейді",
      explanation: "Вестибулоспиналдық және көптеген ретикулоспиналдық әсерлер тепе-теңдікке, тұлға мен аяқ-қолдың проксималдық бұлшықеттеріне ерекше маңызды; латералдық кортикоспиналдық жол дисталдық дәл қозғалыстарға көбірек қатысады. Бұл қатаң бөліну емес, басым қызметтер. Қолды созғанда дене қалпын алдын ала бейімдеу қозғалыс кезінде де жалғасуы мүмкін."
    },
    {
      title: "Алдын ала басқару мен кері байланыс бірін-бірі толықтырады",
      explanation: "Feedforward қозғалысты болжамға сүйеніп дайындайды, ал feedback проприоцептивтік, көру және вестибулярлық сигналдар арқылы түзетеді. Көру ақпараты азайғанда қозғалыс командасы жоғалмайды: басқа кірістер ішінара өтей алады, ал дәлдік тапсырма мен жағдайға тәуелді. Барлық адамға бір нәтиже телімей, өлшенетін қате мен тұрақтылықты салыстыру қажет."
    },
    {
      title: "Бір клиникалық белгі зақым орнын дәл анықтамайды",
      explanation: "Бұлшықет әлсіздігі, спастикалық тонус, гипорефлексия және дисметрия қозғалыс реттелуінің әртүрлі бұзылыстарын көрсетеді, бірақ әр белгі бірнеше механизммен түсіндірілуі мүмкін. Сіңірге соққы бұлшықет пен оның ұршықтарын созады; Ia-афферент α-мотонейронды қоздырады. Созылу рефлексін сіңір рецепторлары тікелей іске қоспайды. Бір рефлекске сүйеніп диагноз қоюға болмайды; қосымша деректер мен клиникалық жағдай ескеріледі."
    }
  ]
};

export function createModuleElevenSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU"
      ? "Пять кратких физиологических выводов: моторные сети, перекрёст путей, поза, сенсорная коррекция и границы клинического вывода."
      : language === "EN"
        ? "Five concise physiological takeaways: motor networks, tract crossing, posture, sensory correction and clinical limits."
        : "Бес қысқаша физиологиялық қорытынды: қозғалыс желілері, жолдардың айқасуы, дене қалпы, сенсорлық түзету және клиникалық тұжырым шектері.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-11-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "clinical" }],
    })),
  };
}
