import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 13: cerebellar practice; original teaching exercises, not diagnostic tests.
// Checked against Library: Guyton & Hall 13e ch. 57, PDF pp. 690–692;
// Ganong 23e ch. 16, PDF pp. 267–269; Ghai Practical Physiology 8e, PDF pp. 309–313.
// Responses are self-assessed; text length is NOT evidence of physiological correctness.
type Text = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Text => ({ RU, EN, KZ });
type Task = { id: string; title: Text; prompt: Text; answers: [Text, Text] };

const tasks: readonly Task[] = [
  {
    id: "feedback-and-vision",
    title: t("1. Обратная связь и точность движения", "1. Feedback and movement accuracy", "1. Кері байланыс және қимыл дәлдігі"),
    prompt: t(
      "В учебном опыте участник выполняет одинаковое целенаправленное движение в двух условиях: А — с доступной зрительной и проприоцептивной информацией, Б — без зрительного контроля, но с сохранной проприоцепцией. До опыта укажите, какие показатели будете сравнивать (ошибка попадания, вариабельность траектории, время коррекции). Можно ли заранее утверждать, что каждый участник обязательно станет менее точным в Б? Объясните роль мозжечка и ограничения вывода.",
      "A learner performs the same goal-directed movement under two conditions: A with visual and proprioceptive feedback, B without vision but with proprioception preserved. Before testing, choose measures (endpoint error, trajectory variability, correction time). Can one assert that every participant must become less accurate in B? Explain cerebellar involvement and limits of inference.",
      "Оқушы бір нысаналы қимылды екі жағдайда орындайды: А — көру және проприоцепциялық кері байланыс бар; Б — көру бақылауы жоқ, бірақ проприоцепция сақталған. Алдын ала өлшемдерді таңдаңыз (нысанаға жету қатесі, траектория өзгергіштігі, түзету уақыты). Б жағдайында әр адамның дәлдігі міндетті түрде төмендей ме? Мишықтың рөлін және қорытындының шегін түсіндіріңіз."
    ),
    answers: [
      t(
        "Мозжечок участвует в согласовании двигательного плана с текущими сенсорными сигналами и в коррекции ошибок. Удаление зрительной информации меняет набор доступных сигналов, но проприоцепция и внутренние модели движения остаются; знак и величина изменения точности зависят от задания и обучения.",
        "The cerebellum contributes to comparing intended movement with incoming sensory information and to error correction. Removing vision changes available feedback, but proprioception and learned internal models remain; the direction and size of the effect depend on task and experience.",
        "Мишық жоспарланған қимылды келетін сезімдік ақпаратпен салыстыруға және қатені түзетуге қатысады. Көруді алып тастағанда кері байланыс өзгереді, бірақ проприоцепция мен үйренген ішкі үлгілер сақталады; нәтиже тапсырмаға және тәжірибеге тәуелді."
      ),
      t(
        "Сравните повторные попытки при одинаковых скорости, расстоянии и условиях; не подменяйте измерения словом «ухудшится». Одно изменение точности не локализует поражение: влияют внимание, зрение, периферическая чувствительность, сила и другие сети.",
        "Compare repeated trials with matched speed, distance and task conditions rather than assuming deterioration. One accuracy change cannot localize a lesion: attention, vision, peripheral sensation, strength and other networks also contribute.",
        "Жылдамдықты, қашықтықты және тапсырма шарттарын бірдей ұстап, бірнеше қайталауды салыстырыңыз; нәтижені өлшемей «нашарлайды» деп тұжырымдамаңыз. Бір дәлдік көрсеткіші зақым орнын анықтамайды: зейін, көру, шеткі сезімталдық, күш және өзге желілер әсер етеді."
      )
    ]
  },
  {
    id: "purkinje-nuclei",
    title: t("2. Клетки Пуркинье и глубокие ядра", "2. Purkinje cells and deep nuclei", "2. Пуркинье жасушалары және терең ядролар"),
    prompt: t(
      "В упрощённой схеме активность возбуждающих коллатералей мшистых и лазающих волокон к глубокому ядру фиксирована. В опыте А усиливается ГАМК-ергический выход клеток Пуркинье на это ядро; в Б он ослабляется. Предскажите направление изменения активности ядра относительно исходного состояния. Почему это не позволяет рассчитать силу мышцы или время движения?",
      "In a simplified circuit, excitatory mossy- and climbing-fiber collaterals to a deep cerebellar nucleus are held constant. Condition A increases GABAergic Purkinje output to that nucleus; condition B decreases it. Predict the direction of nuclear activity relative to baseline. Why does this not determine muscle force or movement time?",
      "Қарапайым тізбекте терең мишық ядросына баратын мүк тәрізді және өрмелеуші талшықтардың қоздырушы тармақтары тұрақты. А жағдайында Пуркинье жасушаларының ядроға ГАМҚ-лық тежеуші шығысы күшейеді, Б жағдайында әлсірейді. Ядро белсенділігінің бастапқы күйге қатысты бағытын болжаңыз. Неге бұдан бұлшықет күші мен қимыл уақытын есептеуге болмайды?"
    ),
    answers: [
      t(
        "При неизменном возбуждающем входе усиление торможения клетками Пуркинье обычно уменьшает активность глубокого ядра; ослабление торможения допускает её увеличение. Пуркинье — тормозные выходные нейроны коры мозжечка, но глубокие ядра получают и прямые возбуждающие афферентные коллатерали.",
        "With excitation fixed, stronger Purkinje inhibition generally reduces deep-nuclear activity; weaker inhibition can increase it. Purkinje cells are inhibitory output neurons of cerebellar cortex, while deep nuclei also receive direct excitatory afferent collaterals.",
        "Қоздырушы кіріс өзгермесе, Пуркинье жасушаларының тежеуі күшейгенде терең ядро белсенділігі әдетте азаяды; тежеу әлсіресе, белсенділік артуы мүмкін. Пуркинье жасушалары мишық қыртысының тежеуші шығыс нейрондары, ал терең ядролар тікелей қоздырушы афференттік тармақтарды да қабылдайды."
      ),
      t(
        "Это условный знак влияния в отдельной цепи, а не численная модель двигательного поведения. Реальный выход зависит от временной структуры импульсов, других входов, стволовых и корковых сетей; нельзя приравнивать частоту разрядов ядра к мышечной силе.",
        "This is a conditional sign within one circuit, not a quantitative model of behavior. Actual output depends on spike timing, other inputs and downstream brainstem and cortical networks; deep-nuclear firing rate is not equivalent to muscle force.",
        "Бұл — жеке тізбектегі әсердің шартты бағыты ғана, қимылдың сандық моделі емес. Нәтиже импульстердің уақытына, басқа кірістерге, ми бағаны мен қыртыс желілеріне тәуелді; ядро импульстерінің жиілігін бұлшықет күшімен теңестіруге болмайды."
      )
    ]
  },
  {
    id: "ataxia-differential",
    title: t("3. Координация, сила и проба Ромберга", "3. Coordination, strength and Romberg", "3. Үйлесім, күш және Ромберг сынамасы"),
    prompt: t(
      "Сопоставьте три учебных наблюдения: А — промахивание при пальценосовой пробе при сохранной силе; Б — слабость при сопротивлении без явного промахивания; В — устойчивость с открытыми глазами и резкое ухудшение при их закрытии. Назовите соответствующие признаки, предложите две дополнительные проверки и объясните, почему положительная проба Ромберга не является специфическим тестом мозжечка.",
      "Compare three teaching findings: A overshooting on finger-to-nose testing with preserved strength; B reduced force against resistance without clear dysmetria; C relative stability with eyes open but marked sway after eye closure. Name the signs, propose two further examinations, and explain why a positive Romberg sign is not specific for cerebellar dysfunction.",
      "Үш оқу белгісін салыстырыңыз: А — бұлшықет күші сақталғанымен, саусақ-мұрын сынамасында нысанадан асып кету; Б — айқын дисметриясыз кедергіге қарсы күштің төмендеуі; В — көз ашықта салыстырмалы тұрақтылық, көзді жұмғанда теңселудің күшеюі. Белгілерді атаңыз, тағы екі тексеруді ұсыныңыз және оң Ромберг сынамасы неге мишық зақымына тән емес екенін түсіндіріңіз."
    ),
    answers: [
      t(
        "А соответствует дисметрии и нарушению координации; Б — мышечной слабости, требующей отдельного анализа двигательных путей и мышц. В указывает на зависимость устойчивости от зрения и требует проверки проприоцепции и вестибулярной функции; это не специфический признак поражения мозжечка.",
        "A suggests dysmetria and impaired coordination; B is weakness requiring separate assessment of motor pathways and muscles. C shows visual dependence of balance and calls for proprioceptive and vestibular evaluation; it is not a specific cerebellar sign.",
        "А — дисметрия мен үйлесім бұзылысына, Б — қозғалтқыш жолдар мен бұлшықеттерді бөлек бағалауды қажет ететін әлсіздікке сәйкес. В — тепе-теңдіктің көруге тәуелділігін көрсетеді; проприоцепция мен вестибулярлық қызметті тексеру қажет, бұл мишыққа ғана тән белгі емес."
      ),
      t(
        "Дополнительно сравните силу и сухожильные рефлексы, суставно-мышечное чувство, ходьбу и пяточно-коленную пробу. При мозжечковой атаксии неустойчивость может сохраняться и с открытыми глазами. Ни один тест не подтверждает точную локализацию или диагноз в одиночку.",
        "Also assess power and reflexes, joint-position sense, gait and heel-to-shin coordination. Cerebellar ataxia may cause unsteadiness even with eyes open. No single test confirms a precise lesion site or diagnosis.",
        "Қосымша күш пен сіңір рефлекстерін, буын-қалып сезімін, жүрісті және өкше-тізе сынамасын салыстырыңыз. Мишықтық атаксияда көз ашық кезде де тұрақсыздық болуы мүмкін. Бір сынама зақым орнын не диагнозды жеке өзі дәлелдемейді."
      )
    ]
  },
  {
    id: "motor-adaptation",
    title: t("4. Двигательная адаптация и обучение", "4. Motor adaptation and learning", "4. Қимылға бейімделу және үйрену"),
    prompt: t(
      "В учебном эксперименте визуальная обратная связь о положении курсора систематически смещена. Участник выполняет несколько серий одинаковых движений, затем смещение убирают. Какие измерения позволят обнаружить адаптацию и последействие? Сравните объяснения через коррекцию текущего движения и обучение по ошибке; укажите, почему один результат нельзя считать прямой записью активности клеток Пуркинье.",
      "In a teaching experiment, visual cursor feedback is systematically shifted. A participant makes repeated matched reaches, after which the shift is removed. Which measurements could reveal adaptation and an aftereffect? Distinguish online correction from error-based learning, and explain why behavioral results are not direct recordings of Purkinje-cell activity.",
      "Оқу тәжірибесінде курсор орны туралы көру кері байланысы жүйелі түрде ығысқан. Қатысушы бірдей қимылдарды бірнеше серия орындайды, содан кейін ығысу алынады. Бейімделу мен кейінгі әсерді қандай өлшемдер көрсетеді? Ағымдағы қимылды түзету мен қате арқылы үйренуді ажыратып, мінез-құлық нәтижесі Пуркинье жасушаларының белсенділігін тікелей жазу емес екенін түсіндіріңіз."
    ),
    answers: [
      t(
        "Отслеживайте направление и величину ошибки попадания по попыткам, изменение траектории и начальные ошибки после удаления смещения. Постепенное уменьшение систематической ошибки и противоположно направленное последействие согласуются с адаптацией; отдельная быстрая коррекция может происходить без устойчивого обучения.",
        "Track the direction and magnitude of endpoint errors across trials, trajectory changes and initial errors after removing the shift. A progressive reduction of systematic error and an opposite aftereffect are consistent with adaptation; a single rapid correction need not imply lasting learning.",
        "Әр әрекеттегі нысана қатесінің бағыты мен шамасын, траекторияны және ығысу алынғаннан кейінгі алғашқы қателерді бақылаңыз. Жүйелі қатенің біртіндеп азаюы және қарсы бағыттағы кейінгі әсер бейімделуге сәйкес; бір реттік жылдам түзету тұрақты үйренуді білдірмейді."
      ),
      t(
        "Мозжечковые сети участвуют в настройке движений и обучении по сенсорной ошибке, но адаптация также зависит от контекста, стратегии, внимания и других структур. Поведенческие кривые не определяют разряды конкретных нейронов, не доказывают изолированную локализацию и не дают клинического диагноза.",
        "Cerebellar networks contribute to movement calibration and sensory-error learning, but adaptation also depends on context, strategy, attention and other structures. Behavioral curves do not determine individual neuronal spike trains, prove isolated localization or establish a clinical diagnosis.",
        "Мишық желілері қимылды дәлдеуге және сезімдік қате арқылы үйренуге қатысады, бірақ бейімделу контекстке, стратегияға, зейінге және өзге құрылымдарға да тәуелді. Мінез-құлық қисықтары жеке нейрон импульстерін анықтамайды, зақым орнын немесе клиникалық диагнозды дәлелдемейді."
      )
    ]
  }
];

const response = t("Сначала запишите прогноз, физиологический механизм и границы вывода", "First write your prediction, mechanism and limits", "Алдымен болжамды, механизмді және шектеуді жазыңыз");
const checkTitle = t("Самопроверка без автоматической оценки объяснения", "Self-check without automatic grading of explanations", "Түсіндірмені автоматты бағалаусыз өзін-өзі тексеру");
const criteria: Record<Language, string[]> = {
  RU: [
    "Различаю сенсорную обратную связь, прогноз и фактическое измерение, не предполагая обязательного ухудшения без зрения.",
    "Правильно объясняю тормозное влияние клеток Пуркинье и возбуждающие афферентные коллатерали к глубоким ядрам.",
    "Отделяю дисметрию от мышечной слабости и сенсорной атаксии; не называю Ромберга специфической пробой мозжечка.",
    "Различаю коррекцию текущего движения, обучение по ошибке и последействие.",
    "Не выдаю учебную схему, письменный ответ или отдельный клинический признак за доказанный диагноз или измерение нейронов."
  ],
  EN: [
    "I separate sensory feedback, prediction and actual measurement without assuming vision removal always impairs accuracy.",
    "I explain Purkinje inhibition and excitatory afferent collaterals to the deep nuclei correctly.",
    "I distinguish dysmetria, weakness and sensory ataxia; I do not call Romberg a specific cerebellar test.",
    "I distinguish online correction, error-based learning and aftereffects.",
    "I do not treat a teaching model, written answer or single sign as a confirmed diagnosis or neuronal recording."
  ],
  KZ: [
    "Кері байланысты, болжамды және нақты өлшемді ажыратамын; көрусіз дәлдік міндетті түрде төмендейді демеймін.",
    "Пуркинье жасушаларының тежеуін және терең ядроларға келетін қоздырушы афференттік тармақтарды дұрыс түсіндіремін.",
    "Дисметрияны, әлсіздікті және сенсорлық атаксияны ажыратамын; Ромберг сынамасын мишыққа ғана тән деп санамаймын.",
    "Ағымдағы қимылды түзетуді, қате арқылы үйренуді және кейінгі әсерді ажыратамын.",
    "Оқу моделін, жазбаша жауапты не бір белгіні дәлелденген диагноз немесе нейрон жазбасы деп қабылдамаймын."
  ]
};

export function createModuleThirteenPractice(language: Language, base: PracticeLesson): PracticeLesson {
  return {
    ...base,
    sections: [
      ...tasks.map(task => ({
        title: task.title[language],
        blocks: [
          { type: "paragraph" as const, text: task.prompt[language] },
          { type: "response" as const, label: response[language] },
          { type: "answer" as const, items: task.answers.map(item => item[language]) }
        ]
      })),
      { title: checkTitle[language], blocks: [{ type: "checklist" as const, items: criteria[language] }] }
    ]
  };
}
