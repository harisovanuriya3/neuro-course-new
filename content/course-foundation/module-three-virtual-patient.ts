import type { Language } from '../course';

// Module 3 is a computer-model exercise, not a clinical encounter.
// Evidence: Ganong 23e ch. 4 (PDF 92–94) on astrocytic K⁺ buffering;
// Guyton & Hall 13e ch. 5 (PDF 78–79) on membrane excitability;
// C. L. Ghai 8e (PDF 250–251) on the limits of nerve-conduction measurements.
// Distinct distractors avoid recycling correct decisions from other stages.
type Six<T> = [T, T, T, T, T, T];
type StageReview = {
  tasks: Six<string>;
  mentorPrompts: Six<string>;
  distractors: Six<[string, string]>;
};
export const moduleThreePatientReview: Record<Language, StageReview> = {
  RU: {
    tasks: [
      'После одинаковой серии стимулов K⁺ временно накапливается вне клеток. Какой вопрос проверить первым?',
      'В двух моделях стимуляция одинакова, но захват K⁺ астроцитами различается. Что сравнить?',
      'При повышении внеклеточного K⁺ меняется возбудимость. Как объяснить возможную нестабильность разрядов?',
      'Как проверить вклад астроцитарного захвата K⁺, не смешивая его с влиянием температуры и стимула?',
      'Какой вывод допустим, если изменение захвата K⁺ влияет на модель, но другие механизмы не исключены?',
      'Как различить функции астроцитов, олигодендроцитов и микроглии и ограничения этой модели?'
    ],
    mentorPrompts: [
      'Сначала сформулируйте проверяемый вопрос о временном ходе внеклеточного K⁺.',
      'Сопоставьте модели с одинаковым стимулом и различной глиальной поддержкой.',
      'Свяжите K⁺ с мембранным потенциалом; стойкая деполяризация может инактивировать Na⁺-каналы.',
      'Меняйте только один параметр модели и фиксируйте остальные условия.',
      'Результат поддерживает механизм в модели, но не исключает альтернативы в ткани.',
      'Назовите отдельные функции глии; не превращайте учебную симуляцию в диагноз.'
    ],
    distractors: [
      ['Сразу признать любое накопление K⁺ доказательством заболевания.', 'Не сравнивать ответ до и после серии стимулов.'],
      ['Одновременно изменить силу стимуляции и температуру в двух моделях.', 'Оценить только внешний вид нарисованных нейронов без измеряемого ответа.'],
      ['Утверждать, что повышение K⁺ всегда увеличивает частоту разрядов.', 'Считать, что внеклеточный K⁺ не влияет на мембранный потенциал.'],
      ['Одновременно изменить температуру, стимуляцию и захват K⁺.', 'Вывести скорость проведения из одного значения внеклеточного K⁺.'],
      ['Объявить дефект астроцитов единственной причиной любого изменения возбудимости in vivo.', 'Считать изменение модели доказательством разрыва аксона.'],
      ['Приписать микроглии образование миелина ПНС.', 'Считать, что симуляция устанавливает диагноз конкретному пациенту.']
    ]
  },
  EN: {
    tasks: [
      'Extracellular K⁺ rises transiently after the same stimulus train. What should be checked first?',
      'Two models receive matched stimulation but differ in astrocytic K⁺ uptake. What should be compared?',
      'Extracellular K⁺ changes membrane excitability. How might firing become unstable?',
      'How can astrocytic K⁺ uptake be tested without confounding temperature or stimulus intensity?',
      'What conclusion is justified if K⁺ uptake changes the model response but other mechanisms remain possible?',
      'How do astrocytes, oligodendrocytes and microglia differ, and what can this model not establish?'
    ],
    mentorPrompts: [
      'First formulate a testable question about the time course of extracellular K⁺.',
      'Compare matched stimulation with different levels of glial support.',
      'Link K⁺ to membrane voltage; sustained depolarization can inactivate Na⁺ channels.',
      'Vary only one model parameter while keeping the other conditions fixed.',
      'The model supports a mechanism but does not exclude alternatives in living tissue.',
      'Distinguish glial functions and avoid turning a teaching simulation into a diagnosis.'
    ],
    distractors: [
      ['Treat any K⁺ accumulation as proof of a disease.', 'Avoid comparing measurements before and after the stimulus train.'],
      ['Change stimulus intensity and temperature simultaneously between models.', 'Judge only the appearance of drawn neurons without comparing their responses.'],
      ['Claim that higher extracellular K⁺ always increases firing frequency.', 'Assume extracellular K⁺ cannot alter membrane potential.'],
      ['Change temperature, stimulation and K⁺ uptake at the same time.', 'Calculate conduction velocity from one extracellular K⁺ measurement.'],
      ['Declare impaired astrocytes the sole cause of any excitability change in vivo.', 'Treat a model response as proof that the axon was transected.'],
      ['Claim microglia form PNS myelin.', 'Assume the simulation establishes a diagnosis in an individual patient.']
    ]
  },
  KZ: {
    tasks: [
      'Бірдей стимулдар сериясынан кейін жасушадан тыс K⁺ уақытша жоғарылады. Алдымен нені тексеру керек?',
      'Екі модельде стимуляция бірдей, ал астроциттердің K⁺ қармауы әртүрлі. Нені салыстыру керек?',
      'Жасушадан тыс K⁺ мембрананың қозғыштығын өзгертеді. Разрядтар неге тұрақсыздануы мүмкін?',
      'Температура мен стимул әсерін араластырмай, астроциттердің K⁺ қармауының үлесін қалай тексеруге болады?',
      'K⁺ қармауын өзгерту модельге әсер етсе, бірақ басқа механизмдер жоққа шығарылмаса, қандай қорытынды жасауға болады?',
      'Астроциттер, олигодендроциттер және микроглияның қызметтері қалай ерекшеленеді, ал модель нені дәлелдей алмайды?'
    ],
    mentorPrompts: [
      'Алдымен жасушадан тыс K⁺ өзгерісінің уақыттық барысы туралы тексерілетін сұрақ қойыңыз.',
      'Стимуляциясы бірдей, глиялық қолдауы әртүрлі модельдерді салыстырыңыз.',
      'K⁺ деңгейін мембрана потенциалымен байланыстырыңыз; ұзақ деполяризация Na⁺ арналарын инактивациялауы мүмкін.',
      'Басқа жағдайларды тұрақты ұстап, модельдің тек бір параметрін өзгертіңіз.',
      'Модель нәтижесі механизмді қолдайды, бірақ нақты тіндегі балама себептерді жоққа шығармайды.',
      'Глия жасушаларының жеке қызметтерін ажыратыңыз; оқу симуляциясын диагнозға айналдырмаңыз.'
    ],
    distractors: [
      ['K⁺ жиналуын бірден аурудың дәлелі деп санау.', 'Стимулдар сериясына дейінгі және кейінгі жауаптарды салыстырмау.'],
      ['Екі модельде стимул күшін де, температураны да бір мезгілде өзгерту.', 'Жауаптарды салыстырмай, тек салынған нейрондардың сыртқы түрін бағалау.'],
      ['K⁺ жоғарылауы разряд жиілігін әрқашан арттырады деп тұжырымдау.', 'Жасушадан тыс K⁺ мембрана потенциалына әсер етпейді деп санау.'],
      ['Температураны, стимуляцияны және K⁺ қармауын бірге өзгерту.', 'Жасушадан тыс K⁺ бір өлшемінен өткізу жылдамдығын есептеу.'],
      ['Астроцит ақауын in vivo кез келген қозғыштық өзгерісінің жалғыз себебі деп жариялау.', 'Модельдегі өзгерісті аксон үзілгенінің дәлелі деп санау.'],
      ['Микроглия ШЖЖ миелинін түзеді деп айту.', 'Симуляция нақты пациентке диагноз қояды деп санау.']
    ]
  }
};
