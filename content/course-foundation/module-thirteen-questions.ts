import type { Language } from "../course";

// Evidence-based review questions for cerebellar physiology (module 13).
// Original paraphrases; no copyrighted textbook text or figures are embedded.
const entries = [
  {
    "id": "module-13-reviewed-1",
    "prompt": {
      "RU": "Сравните действие возбуждающих коллатералей мшистых и лазающих волокон на глубокие ядра мозжечка с влиянием клеток Пуркинье. Что можно предсказать при усилении тормозного выхода Пуркинье, если возбуждающие входы постоянны?",
      "EN": "Compare excitatory collaterals from mossy and climbing fibres onto deep cerebellar nuclei with Purkinje-cell output. What direction of change is predicted if Purkinje inhibition increases while excitatory input remains constant?",
      "KZ": "Мишықтың терең ядроларына келетін мүк тәрізді және өрмелеуші талшықтардың қоздырғыш тармақтарын Пуркинье жасушаларының әсерімен салыстырыңыз. Қоздырғыш кіріс тұрақты болса, Пуркинье тежелуі күшейгенде қандай өзгеріс күтіледі?"
    },
    "explanation": {
      "RU": "Мшистые и лазающие афференты дают возбуждающие коллатерали глубоким ядрам, а ГАМК-ергические аксоны клеток Пуркинье тормозят их нейроны. При прочих равных усиление торможения уменьшает активность соответствующего выхода, но не позволяет вычислить силу мышцы или весь двигательный результат.",
      "EN": "Mossy and climbing afferents provide excitatory collaterals to deep nuclei, whereas GABAergic Purkinje axons inhibit nuclear neurons. Stronger inhibition tends to reduce the relevant nuclear output if other inputs remain fixed; it does not directly predict muscle force or the complete movement.",
      "KZ": "Мүк тәрізді және өрмелеуші афференттердің тармақтары терең ядроларды қоздырады, ал Пуркинье жасушаларының ГАМҚ-ергиялық аксондары олардың нейрондарын тежейді. Өзге кірістер өзгермесе, тежелудің күшеюі ядро шығысын азайтуы мүмкін, бірақ бұл бұлшықет күшін немесе бүкіл қозғалысты тікелей болжауға жеткіліксіз."
    },
    "target": {
      "section": "theory"
    }
  },
  {
    "id": "module-13-reviewed-2",
    "prompt": {
      "RU": "Проследите различие между мшистыми и лазающими волокнами мозжечка: откуда они поступают, через какие клетки влияют на кору и почему нельзя считать оба входа одинаковыми сигналами об ошибке?",
      "EN": "Trace the distinct sources and cortical routes of mossy and climbing fibres in the cerebellum. Why is it incorrect to describe both pathways as identical error signals with the same synaptic effect?",
      "KZ": "Мишықтағы мүк тәрізді және өрмелеуші талшықтардың шығу көздерін және қыртысқа әсер ету жолдарын салыстырыңыз. Неліктен бұл екі кірісті синапстық әсері бірдей қате сигналы деп есептеуге болмайды?"
    },
    "explanation": {
      "RU": "Лазающие волокна происходят из нижней оливы и сильно возбуждают дендриты клеток Пуркинье, вызывая комплексные разряды. Мшистые волокна поступают из нескольких систем и действуют через гранулярные клетки и параллельные волокна. Оба входа участвуют в вычислениях мозжечка, но различаются происхождением и способом передачи.",
      "EN": "Climbing fibres arise from the inferior olive and strongly excite Purkinje dendrites, generating complex spikes. Mossy fibres arise from several pathways and influence Purkinje cells through granule cells and parallel fibres. Both participate in cerebellar processing, but their sources and synaptic patterns are different.",
      "KZ": "Өрмелеуші талшықтар төменгі оливадан шығып, Пуркинье дендриттерін күшті қоздырады және күрделі разрядтар туғызады. Мүк тәрізді талшықтар бірнеше жолдан келіп, түйіршікті жасушалар мен параллель талшықтар арқылы әсер етеді. Екі кірістің шығу тегі мен синапстық ұйымдасуы әртүрлі."
    },
    "target": {
      "section": "theory"
    }
  },
  {
    "id": "module-13-reviewed-3",
    "prompt": {
      "RU": "При движении к цели зрение временно закрывают, а проприоцепция сохранена. Какие данные нужны, чтобы оценить изменение конечной ошибки и времени коррекции, и почему нельзя заранее утверждать, что ошибка всегда возрастёт?",
      "EN": "Vision is briefly removed during a target-directed movement while proprioception remains intact. Which observations would test changes in endpoint error and correction time, and why is an inevitable increase in error not justified?",
      "KZ": "Нысанаға бағытталған қимыл кезінде көру уақытша шектеледі, бірақ проприоцепция сақталады. Соңғы нүкте қатесі мен түзету уақытын бағалау үшін қандай деректер керек және неге қате міндетті түрде артады деуге болмайды?"
    },
    "explanation": {
      "RU": "Следует сопоставить траекторию, конечную ошибку, скорость и время коррекции при одинаковой задаче с открытыми и закрытыми глазами. Проприоцептивная обратная связь и опережающие команды сохраняются; направление и величина изменения зависят от задания и опыта. Поведение само по себе не измеряет разряды нейронов мозжечка.",
      "EN": "Compare trajectories, endpoint errors, movement speed and correction latency across matched trials with and without vision. Proprioceptive feedback and feedforward commands remain available; the size and even direction of change depend on the task and training. Behaviour alone does not measure cerebellar neuronal firing.",
      "KZ": "Көру бар және жоқ бірдей тапсырмаларда траекторияны, соңғы нүкте қатесін, қимыл жылдамдығын және түзету кідірісін салыстыру қажет. Проприоцепциялық кері байланыс пен алдын ала басқару сақталады; нәтиже тапсырма мен жаттығуға тәуелді. Мінез-құлық дерегі мишық нейрондарының разрядын тікелей өлшемейді."
    },
    "target": {
      "section": "practice"
    }
  },
  {
    "id": "module-13-reviewed-4",
    "prompt": {
      "RU": "При пальценосовой пробе пациент промахивается и дрожание усиливается при приближении к цели, но сила при сопротивлении сохранена. Какие признаки описаны и какие дополнительные исследования нужны, прежде чем локализовать поражение?",
      "EN": "During finger-to-nose testing a patient overshoots and tremor grows near the target, although resisted muscle strength is preserved. Name the findings and the additional examinations needed before localizing a lesion.",
      "KZ": "«Саусақ — мұрын» сынамасында пациент нысанадан асып кетеді, жақындағанда діріл күшейеді, бірақ қарсылыққа қарсы бұлшықет күші сақталған. Қандай белгілер байқалады және зақымды орнықтыру алдында нені қосымша тексеру керек?"
    },
    "explanation": {
      "RU": "Промахивание соответствует дисметрии, усиление дрожания при приближении к цели — интенционному тремору. Сохранная сила не исключает нарушение координации. Нужно отдельно оценить чувствительность, зрение, другие координационные пробы, походку и остальную неврологическую картину; одна проба не определяет этиологию.",
      "EN": "Overshoot is dysmetria, and tremor that increases as the target is approached is intention tremor. Preserved strength does not rule out impaired coordination. Examine sensation, vision, other coordination tasks, gait and the wider neurological context; a single bedside test cannot establish the cause.",
      "KZ": "Нысанадан асып кету дисметрияға, ал нысанаға жақындағанда күшейетін діріл интенциялық треморға сәйкес келеді. Күштің сақталуы үйлесім бұзылысын жоққа шығармайды. Сезімталдықты, көруді, өзге үйлестіру сынамаларын, жүрісті және неврологиялық жағдайды бөлек бағалау керек; бір сынама себепті анықтамайды."
    },
    "target": {
      "section": "practice"
    }
  },
  {
    "id": "module-13-reviewed-5",
    "prompt": {
      "RU": "Пациент стоит устойчивее с открытыми глазами, но заметно покачивается после их закрытия. Как правильно интерпретировать пробу Ромберга, какие сенсорные пути следует оценить и почему это не специфическое доказательство мозжечкового поражения?",
      "EN": "A patient stands more steadily with eyes open but sways substantially after eye closure. Interpret the Romberg finding, identify sensory pathways to assess, and explain why this is not specific proof of cerebellar damage.",
      "KZ": "Пациент көзі ашық кезде орнықтырақ тұрады, ал көзін жұмғанда айқын теңселеді. Ромберг сынамасын қалай түсіндіреміз, қандай сезімтал жолдарды бағалаймыз және неге бұл мишық зақымының арнайы дәлелі емес?"
    },
    "explanation": {
      "RU": "Выраженное ухудшение устойчивости после закрытия глаз указывает на зависимость равновесия от зрения и заставляет оценить проприоцепцию, задние канатики и вестибулярную систему. При мозжечковой атаксии неустойчивость часто заметна и с открытыми глазами. Нужны безопасное проведение пробы и полный неврологический осмотр.",
      "EN": "Marked worsening on eye closure suggests reliance on vision and warrants testing proprioception, dorsal-column pathways and vestibular function. Cerebellar ataxia often causes instability even with eyes open. Perform the test safely and interpret it within a complete neurological examination rather than as a unique localization.",
      "KZ": "Көзді жұмғанда тұрақтылықтың айқын нашарлауы тепе-теңдіктің көруге тәуелділігін көрсетеді; проприоцепцияны, жұлынның артқы бағандарын және вестибулярлық қызметті бағалау керек. Мишық атаксиясында көз ашық кезде де тұрақсыздық байқалуы мүмкін. Сынаманың қауіпсіздігін сақтап, нәтижені толық неврологиялық тексерумен бірге түсіндіру қажет."
    },
    "target": {
      "section": "cases"
    }
  },
  {
    "id": "module-13-reviewed-6",
    "prompt": {
      "RU": "В эксперименте повторные движения уменьшают ошибку, а после отмены изменённого условия возникает последействие. Какой вывод о сенсомоторной адаптации допустим и почему по одному поведению нельзя определить активность конкретных клеток Пуркинье?",
      "EN": "Repeated trials reduce movement error, and an aftereffect appears when the altered condition is removed. What can be concluded about sensorimotor adaptation, and why cannot a specific Purkinje-cell firing pattern be inferred from behaviour alone?",
      "KZ": "Тәжірибеде қайталанған қимылдар қатені азайтады, ал өзгертілген жағдай жойылғанда кейінгі әсер байқалады. Сенсомоторлық бейімделу туралы қандай қорытынды жасауға болады және неге мінез-құлықтан нақты Пуркинье жасушасының белсенділігін анықтай алмаймыз?"
    },
    "explanation": {
      "RU": "Снижение ошибки вместе с последействием совместимо с адаптивным изменением сенсомоторного управления, но необходимо отделить обучение от сознательной стратегии и простого привыкания. Мозжечковые цепи важны для многих форм адаптации, однако поведенческий результат не является прямой записью активности клеток Пуркинье или локализацией механизма.",
      "EN": "Error reduction plus an aftereffect supports adaptive recalibration of sensorimotor control, but deliberate strategy and other learning effects should be considered. Cerebellar circuits contribute to many forms of adaptation; a behavioural aftereffect is not a direct recording of Purkinje-cell activity or a unique neural localization.",
      "KZ": "Қатенің азаюы мен кейінгі әсер сенсомоторлық басқарудың бейімделіп өзгеруіне сәйкес келеді, бірақ саналы стратегияны және үйренудің өзге әсерлерін ажырату қажет. Мишық тізбектері бейімделудің көптеген түріне қатысады; мінез-құлықтағы кейінгі әсер Пуркинье жасушасының разрядын тікелей тіркемейді және нақты механизмді дара анықтамайды."
    },
    "target": {
      "section": "theory"
    }
  }
] as const;

export function moduleThirteenReviewQuestions(language: Language) {
  return entries.map(item => ({
    id: item.id,
    prompt: item.prompt[language],
    explanation: item.explanation[language],
    target: item.target,
  }));
}
