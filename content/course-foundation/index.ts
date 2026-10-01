import { modules, type Language } from '../course';
import { getSectionTitle, type Section } from '../sections';
import type { LocalizedLesson, PracticeLesson, SectionLesson } from '../types';
import type { MediaLesson } from '../media';
import { topics, termDefinitions, type Topic } from './topics';
import { createFoundationCase, createFoundationTest } from './assessment';

// Shared foundation for modules 2–25.
// Topic-specific content is progressively deepened while keeping one reusable architecture.

export const foundationSections = [
  'objectives',
  'pretest',
  'theory',
  'one-minute',
  'clinical',
  'practice',
  'cases',
  'tests',
  'questions',
  'media',
  'glossary',
  'references',
] as const;

const sources: Record<string, { title: string; href: string }> = {
  cns: {
    title: 'OpenStax · The Central Nervous System',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system',
  },

  cells: {
    title: 'OpenStax · Nervous Tissue',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue',
  },

  potential: {
    title: 'OpenStax · The Action Potential',
    href: 'https://openstax.org/books/anatomy-and-physiology/pages/12-4-the-action-potential',
  },

  synapse: {
    title: 'OpenStax · Communication Between Neurons',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons',
  },

  motor: {
    title: 'OpenStax · Motor Responses',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses',
  },

  sensory: {
    title: 'OpenStax · Sensory Perception',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception',
  },

  taste: {
    title: 'NIDCD · Taste Disorders',
    href: 'https://www.nidcd.nih.gov/health/taste-disorders',
  },

  autonomic: {
    title: 'OpenStax · Divisions of the Autonomic Nervous System',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/15-1-divisions-of-the-autonomic-nervous-system',
  },

  sleep: {
    title: 'NINDS · Understanding Sleep',
    href: 'https://www.ninds.nih.gov/sites/default/files/2025-05/understanding-sleep.pdf',
  },

  plasticity: {
    title: 'NINDS · Traumatic Brain Injury',
    href: 'https://www.ninds.nih.gov/health-information/disorders/traumatic-brain-injury-tbi',
  },

  methods: {
    title: 'NINDS · Neurological Diagnostic Tests and Procedures',
    href: 'https://www.ninds.nih.gov/health-information/disorders/neurological-diagnostic-tests-and-procedures',
  },

  learning: {
    title: 'OpenStax · Classical Conditioning',
    href: 'https://openstax.org/books/psychology-2e/pages/6-2-classical-conditioning',
  },
};

const copy = {
  RU: {
    mechanism: 'Как работает механизм',
    interpretation: 'Как интерпретировать результат',

    goals:
      'После изучения объясните механизм и обоснуйте ответ на вопрос:',

    outcomes: 'Проверка понимания',
    terms: 'Ключевые термины',
    summary: 'Основная идея и границы вывода',

    task: 'Задание для самостоятельного разбора',
    question: 'Объясните своими словами',

    response: 'Ваш прогноз, объяснение и вывод',
    criteria: 'Критерии самопроверки',

    checklist: [
      'Указан механизм и направление причинной связи.',
      'Прогноз обоснован, а наблюдение отделено от интерпретации.',
      'Указано, что нельзя заключить по этим данным.',
    ],

    practiceIntro:
      'Сначала сформулируйте ответ. Затем сопоставьте его с объяснением и источниками. Это самостоятельная работа без автоматической оценки.',

    questionsIntro:
      'Запишите ответ перед открытием объяснения. Сравнивайте причинные связи, а не совпадение слов.',

    referenceIntro:
      'Материалы кафедры использованы для подбора тем и адаптации заданий. Внешние источники помогают уточнить механизмы.',

    materials: 'Учебные материалы кафедры',

    noMaterials:
      'В загруженных материалах нет отдельного занятия по этой теме; стартовый текст подготовлен по литературе.',

    sourceDescription:
      'Дополнительное чтение по теме. Исходный материал на английском языке.',
  },

  EN: {
    mechanism: 'How the mechanism works',
    interpretation: 'Interpreting the result',

    goals:
      'After studying, explain the mechanism and justify your answer to:',

    outcomes: 'Check your understanding',
    terms: 'Key terms',
    summary: 'Main idea and limits of inference',

    task: 'Independent analysis task',
    question: 'Explain in your own words',

    response: 'Your prediction, explanation and conclusion',
    criteria: 'Self-check criteria',

    checklist: [
      'Identify the mechanism and direction of causality.',
      'Justify your prediction; separate observation from interpretation.',
      'State what these data cannot establish.',
    ],

    practiceIntro:
      'Write your answer first, then compare it with the explanation and sources. This is independent work without automated grading.',

    questionsIntro:
      'Write your answer before opening the explanation. Compare causal reasoning rather than matching words.',

    referenceIntro:
      'Department materials guide topic selection and adapted exercises. External readings clarify the mechanisms.',

    materials: 'Department teaching materials',

    noMaterials:
      'The uploaded materials do not contain a separate lesson on this topic; this initial text is based on the reading sources.',

    sourceDescription:
      'Further reading on this topic. Original source in English.',
  },

  KZ: {
    mechanism: 'Тетіктің жұмыс істеуі',
    interpretation: 'Нәтижені түсіндіру',

    goals:
      'Тақырыпты оқығаннан кейін тетікті түсіндіріп, мына сұраққа жауабыңызды негіздеңіз:',

    outcomes: 'Түсінуді тексеру',
    terms: 'Негізгі терминдер',
    summary: 'Негізгі ой және қорытынды шектеулері',

    task: 'Өздігінен талдауға арналған тапсырма',
    question: 'Өз сөзіңізбен түсіндіріңіз',

    response: 'Сіздің болжамыңыз, түсіндірмеңіз және қорытындыңыз',
    criteria: 'Өзін-өзі тексеру өлшемдері',

    checklist: [
      'Тетік пен себеп-салдар байланысының бағыты көрсетілген.',
      'Болжам негізделіп, бақылау түсіндіруден ажыратылған.',
      'Бұл деректерден қандай қорытынды жасауға болмайтыны көрсетілген.',
    ],

    practiceIntro:
      'Алдымен жауап жазыңыз. Содан кейін түсіндірме және дереккөздермен салыстырыңыз. Бұл автоматты бағалаусыз өзіндік жұмыс.',

    questionsIntro:
      'Түсіндірмені ашудан бұрын жауап жазыңыз. Сөздердің ұқсастығын емес, себеп-салдар байланысын салыстырыңыз.',

    referenceIntro:
      'Кафедра материалдары тақырыптарды таңдау және тапсырмаларды бейімдеу үшін қолданылды. Сыртқы дереккөздер тетіктерді нақтылауға көмектеседі.',

    materials: 'Кафедраның оқу материалдары',

    noMaterials:
      'Жүктелген материалдарда бұл тақырыпқа жеке сабақ жоқ; бастапқы мәтін әдебиет бойынша дайындалды.',

    sourceDescription:
      'Тақырып бойынша қосымша оқу. Түпнұсқа ағылшын тілінде.',
  },
};

function create(
  topic: Topic,
  section: typeof foundationSections[number],
  language: Language,
): SectionLesson {
  const c = copy[language];

  const title = getSectionTitle(section, language);

  const moduleTitle =
    `${topic.id}. ${modules[language][topic.id - 1]}`;

  const mechanism = topic.mechanism[language];

  const interpretation = topic.interpretation[language];

  const question = topic.question[language];

  const links = [
    { section: 'theory' as const },
    { section: 'practice' as const },
  ];

  if (section === 'theory') {
    return {
      kind: 'theory',
      title: moduleTitle,

      sections: [
        {
          id: 'mechanism',
          title: c.mechanism,
          blocks: [
            {
              type: 'paragraph',
              text: mechanism,
            },
          ],
        },

        {
          id: 'interpretation',
          title: c.interpretation,
          blocks: [
            {
              type: 'paragraph',
              text: interpretation,
            },
          ],
        },
        ...(topic.id === 2 ? [{
          id: 'method-selection',
          title: language === 'RU' ? 'Как выбирать метод исследования' : language === 'EN' ? 'How to choose a research method' : 'Зерттеу әдісін қалай таңдау керек',
          blocks: [
            { type: 'paragraph' as const, text: language === 'RU'
              ? 'Начинайте не с названия прибора, а с физиологического вопроса. Если важна динамика электрической активности во времени, ЭЭГ даёт высокое временное разрешение, но ограниченную пространственную локализацию. Вызванные потенциалы позволяют связать компонент ответа с повторяемым сенсорным событием. Структурная визуализация отвечает прежде всего на анатомический вопрос и сама по себе не показывает электрическую активность нейронной сети.'
              : language === 'EN'
                ? 'Start with the physiological question, not the instrument name. EEG offers high temporal resolution for electrical dynamics but limited spatial localization. Evoked potentials relate response components to repeated sensory events. Structural imaging primarily answers anatomical questions and does not itself measure electrical activity of a neural network.'
                : 'Алдымен құрал атауынан емес, физиологиялық сұрақтан бастаңыз. ЭЭГ электрлік белсенділіктің уақыттық динамикасын жоғары уақыттық ажыратымдылықпен көрсетеді, бірақ кеңістіктік локализациясы шектеулі. Шақырылған потенциалдар жауап компонентін қайталанатын сенсорлық оқиғамен байланыстырады. Құрылымдық бейнелеу негізінен анатомиялық сұраққа жауап береді және нейрондық желінің электр белсенділігін тікелей өлшемейді.' },
          ],
        }, {
          id: 'eeg-interpretation',
          title: language === 'RU' ? 'ЭЭГ: сигнал, ритм и артефакт' : language === 'EN' ? 'EEG: signal, rhythm and artifact' : 'ЭЭГ: сигнал, ырғақ және артефакт',
          blocks: [
            { type: 'paragraph' as const, text: language === 'RU'
              ? 'Скальповая ЭЭГ отражает суммарные потенциалы больших популяций нейронов, особенно синхронную постсинаптическую активность корковых источников. Амплитуда и частотный состав зависят от состояния, регистрации и монтажа. Движения глаз, мышечная активность и плохой контакт электродов могут создавать сигналы, не происходящие из изучаемого мозгового процесса.'
              : language === 'EN'
                ? 'Scalp EEG reflects summed activity from large neuronal populations, especially synchronized postsynaptic activity of cortical sources. Amplitude and frequency content depend on state, recording conditions and montage. Eye movements, muscle activity and poor electrode contact can generate signals unrelated to the brain process under study.'
                : 'Бас терісінен тіркелетін ЭЭГ үлкен нейрон популяцияларының жиынтық белсенділігін, әсіресе қыртыстық көздердің синхронды постсинапстық белсенділігін көрсетеді. Амплитуда мен жиілік құрамы күйге, тіркеу жағдайына және монтажға тәуелді. Көз қозғалысы, бұлшықет белсенділігі және электродтың нашар жанасуы зерттелетін ми үдерісіне қатысы жоқ сигналдар тудыруы мүмкін.' },
          ],
        }, {
          id: 'limits-of-inference',
          title: language === 'RU' ? 'Границы физиологического вывода' : language === 'EN' ? 'Limits of physiological inference' : 'Физиологиялық қорытындының шектері',
          blocks: [
            { type: 'paragraph' as const, text: language === 'RU'
              ? 'Наблюдаемое изменение сигнала сначала описывают, затем интерпретируют. Корреляция между ритмом и состоянием не доказывает, что этот ритм является единственной причиной состояния. Сравнение методов требует различать, что измерено непосредственно, что вычислено и что только предполагается на основании модели.'
              : language === 'EN'
                ? 'Describe an observed signal change before interpreting it. A correlation between a rhythm and a state does not show that the rhythm is the sole cause of that state. Method comparison requires separating what is directly measured, what is derived, and what is inferred from a model.'
                : 'Алдымен байқалған сигнал өзгерісін сипаттап, содан кейін түсіндіру керек. Ырғақ пен күй арасындағы корреляция сол ырғақ күйдің жалғыз себебі екенін дәлелдемейді. Әдістерді салыстырғанда тікелей өлшенген, есептелген және модель негізінде болжанған шамаларды ажырату қажет.' },
          ],
        }] : []),
      ],

      outcomes: {
        title: c.outcomes,
        introduction: c.goals,
        items: [question],
      },

      terms: {
        title: c.terms,
        items: topic.terms.map((term) => term[language]),
      },
    };
  }

  if (section === 'objectives') {
    const action = language === 'RU'
      ? ['объяснить причинный механизм', 'интерпретировать наблюдаемый результат', 'применить механизм к новой ситуации', 'указать границы вывода']
      : language === 'EN'
        ? ['explain the causal mechanism', 'interpret an observed result', 'apply the mechanism to a new situation', 'state the limits of inference']
        : ['себептік тетікті түсіндіру', 'байқалған нәтижені түсіндіру', 'тетікті жаңа жағдайға қолдану', 'қорытындының шектерін көрсету'];
    return {
      kind: 'objectives',
      title,
      introduction: c.goals,
      cards: action.map((item, index) => ({
        id: `module-${topic.id}-objective-${index + 1}`,
        title: `${index + 1}. ${item}`,
        paragraphs: [index === 0 ? mechanism : index === 1 ? interpretation : index === 2 ? topic.task[language] : question],
        links: index < 2 ? [{ section: 'theory' as const }] : [{ section: 'practice' as const }, { section: 'cases' as const }],
      })),
    };
  }

  if (section === 'pretest') {
    return {
      kind: 'pretest',
      title,
      introduction: c.goals,

      questions: [
        {
          id: `module-${topic.id}-pretest`,
          topic: moduleTitle,
          prompt: question,
          options: [
            { id: 'a', text: mechanism },
            { id: 'b', text: interpretation },
            { id: 'c', text: c.noMaterials },
          ],
          correctAnswer: 'a',
          explanation: interpretation,
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-pretest-transfer`,
          topic: moduleTitle,
          prompt: language === 'RU' ? `Какой следующий шаг лучше всего проверит понимание темы «${modules.RU[topic.id - 1]}»?` : language === 'EN' ? `Which next step best checks understanding of “${modules.EN[topic.id - 1]}”?` : `«${modules.KZ[topic.id - 1]}» тақырыбын түсінуді қай келесі қадам жақсы тексереді?`,
          options: [
            { id: 'a', text: topic.task[language] },
            { id: 'b', text: language === 'RU' ? 'Повторить название темы без объяснения механизма.' : language === 'EN' ? 'Repeat the topic title without explaining the mechanism.' : 'Тетікті түсіндірмей тақырып атауын қайталау.' },
            { id: 'c', text: language === 'RU' ? 'Сделать вывод только по одному термину.' : language === 'EN' ? 'Draw a conclusion from one term alone.' : 'Бір ғана терминге сүйеніп қорытынды жасау.' },
          ],
          correctAnswer: 'a',
          explanation: language === 'RU' ? 'Перенос механизма в задание показывает понимание лучше простого воспроизведения термина.' : language === 'EN' ? 'Applying the mechanism in a task demonstrates understanding better than recalling a term alone.' : 'Тетікті тапсырмада қолдану бір терминді жай қайталаудан гөрі түсінуді жақсы көрсетеді.',
          target: { section: 'practice' },
        },
      ],
    };
  }

  if (section === 'one-minute') {
    return {
      kind: 'one-minute',
      title,
      introduction: language === 'RU' ? 'Сформулируйте механизм за одну минуту: от причины к наблюдаемому результату.' : language === 'EN' ? 'Explain the mechanism in one minute, moving from cause to observable result.' : 'Тетікті бір минутта түсіндіріңіз: себептен байқалатын нәтижеге дейін.',
      cards: [
        {
          id: `module-${topic.id}-one-minute-core`,
          title: language === 'RU' ? 'Механизм' : language === 'EN' ? 'Mechanism' : 'Тетік',
          paragraphs: [mechanism],
          links: [{ section: 'theory' as const }],
        },
        {
          id: `module-${topic.id}-one-minute-interpret`,
          title: language === 'RU' ? 'Что означает результат' : language === 'EN' ? 'What the result means' : 'Нәтиже нені білдіреді',
          paragraphs: [interpretation],
          links: [{ section: 'theory' as const }, { section: 'practice' as const }],
        },
        {
          id: `module-${topic.id}-one-minute-check`,
          title: language === 'RU' ? 'Проверьте себя' : language === 'EN' ? 'Check yourself' : 'Өзіңізді тексеріңіз',
          paragraphs: [question],
          links: [{ section: 'tests' as const }],
        },
      ],
    };
  }

  if (section === 'clinical') {
    const labels = language === 'RU'
      ? { bridge: 'Клинический мост', observe: 'Что наблюдаем', explain: 'Как объяснить', limit: 'Граница вывода' }
      : language === 'EN'
        ? { bridge: 'Clinical bridge', observe: 'What we observe', explain: 'How to explain it', limit: 'Limit of inference' }
        : { bridge: 'Клиникалық көпір', observe: 'Не байқаймыз', explain: 'Қалай түсіндіреміз', limit: 'Қорытынды шегі' };
    return {
      kind: 'clinical',
      title,
      introduction: labels.bridge,
      cards: [
        {
          id: `module-${topic.id}-clinical-observation`,
          title: labels.observe,
          paragraphs: [topic.task[language]],
          links: [{ section: 'practice' as const }],
        },
        {
          id: `module-${topic.id}-clinical-mechanism`,
          title: labels.explain,
          paragraphs: [mechanism],
          links: [{ section: 'theory' as const }, { section: 'cases' as const }],
        },
        {
          id: `module-${topic.id}-clinical-limit`,
          title: labels.limit,
          paragraphs: [interpretation, question],
          links: [{ section: 'cases' as const }, { section: 'tests' as const }],
        },
      ],
    };
  }

  if (section === 'glossary') {
    return {
      kind: 'glossary',
      title,
      introduction: c.terms,

      terms: topic.terms.map((term, index) => ({
        id: `module-${topic.id}-term-${index + 1}`,

        term: term[language],

        definition:
          termDefinitions[topic.id]?.[index]?.[language] ??
          (language === 'RU'
            ? `Ключевое понятие модуля «${modules.RU[topic.id - 1]}». Объясните его роль через механизм модуля.`
            : language === 'EN'
              ? `A key concept in “${modules.EN[topic.id - 1]}”. Explain its role through the module mechanism.`
              : `«${modules.KZ[topic.id - 1]}» модулінің негізгі ұғымы. Оның рөлін модуль тетігі арқылы түсіндіріңіз.`),

        target: {
          section: 'theory' as const,
        },
      })),
    };
  }

  if (section === 'cases') {
    return createFoundationCase(
      topic,
      language,
      moduleTitle,
    );
  }

  if (section === 'tests') {
    return createFoundationTest(
      topic,
      language,
      moduleTitle,
    );
  }

  if (section === 'practice') {
    const ui: PracticeLesson['ui'] = {
      showAnswer:
        language === 'RU'
          ? 'Показать объяснение'
          : language === 'EN'
            ? 'Show explanation'
            : 'Түсіндірмені көрсету',

      check: '',
      reset: '',
      undo: '',
      correct: '',
      incorrect: '',
      incomplete: '',
      available: '',
      selected: '',
      empty: '',

      input: c.response,

      theory: getSectionTitle(
        'theory',
        language,
      ),

      localNote:
        language === 'RU'
          ? 'Ответы и отметки не сохраняются после перезагрузки. Сохраните свой разбор в заметке к странице.'
          : language === 'EN'
            ? 'Responses and ticks reset on reload. Save your analysis in the page note.'
            : 'Жауаптар мен белгілер бет жаңартылғанда сақталмайды. Талдауыңызды бет жазбасына сақтаңыз.',
    };

    return {
      kind: 'practice',
      title,
      moduleTitle,
      ui,

      sections: [
        {
          title: c.task,

          blocks: [
            {
              type: 'paragraph',
              text: c.practiceIntro,
            },
            {
              type: 'paragraph',
              text: topic.task[language],
            },
            {
              type: 'response',
              label: c.response,
            },
          ],
        },

        {
          title: c.question,

          blocks: [
            {
              type: 'paragraph',
              text: question,
            },
            {
              type: 'response',
              label: c.response,
            },
            {
              type: 'answer',
              items: [
                mechanism,
                interpretation,
              ],
            },
          ],
        },

        {
          title: language === 'RU' ? 'Прогноз → наблюдение → объяснение' : language === 'EN' ? 'Prediction → observation → explanation' : 'Болжам → бақылау → түсіндіру',
          blocks: [
            {
              type: 'paragraph',
              text: language === 'RU'
                ? 'До выполнения задания запишите ожидаемый результат и причинный механизм. После выполнения отдельно зафиксируйте наблюдение: не подменяйте его объяснением.'
                : language === 'EN'
                  ? 'Before the task, record the expected result and causal mechanism. After the task, record the observation separately; do not replace observation with explanation.'
                  : 'Тапсырмаға дейін күтілетін нәтижені және себептік тетікті жазыңыз. Орындағаннан кейін бақылауды бөлек тіркеңіз; бақылауды түсіндірумен алмастырмаңыз.',
            },
            { type: 'response', label: language === 'RU' ? 'Мой прогноз' : language === 'EN' ? 'My prediction' : 'Менің болжамым' },
            { type: 'response', label: language === 'RU' ? 'Что я наблюдал(а)' : language === 'EN' ? 'What I observed' : 'Мен не байқадым' },
            { type: 'response', label: language === 'RU' ? 'Моё физиологическое объяснение' : language === 'EN' ? 'My physiological explanation' : 'Менің физиологиялық түсіндірмем' },
          ],
        },
        {
          title: language === 'RU' ? 'Перенос и границы вывода' : language === 'EN' ? 'Transfer and limits of inference' : 'Тасымалдау және қорытынды шектері',
          blocks: [
            { type: 'paragraph', text: question },
            { type: 'response', label: language === 'RU' ? 'Как изменится результат в новой ситуации и почему?' : language === 'EN' ? 'How would the result change in a new situation, and why?' : 'Жаңа жағдайда нәтиже қалай өзгереді және неге?' },
            { type: 'response', label: language === 'RU' ? 'Что по этим данным утверждать нельзя?' : language === 'EN' ? 'What cannot be concluded from these data?' : 'Бұл деректерден қандай қорытынды жасауға болмайды?' },
            { type: 'answer', items: [mechanism, interpretation] },
          ],
        },
        {
          title: c.criteria,

          blocks: [
            {
              type: 'checklist',
              items: c.checklist,
            },
          ],
        },
      ],
    };
  }

  if (section === 'questions') {
    return {
      kind: 'questions',
      title,
      introduction: c.questionsIntro,

      questions: [
        {
          id: `module-${topic.id}-review-concept`,
          prompt: question,
          explanation: `${mechanism} ${interpretation}`,
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-review-mechanism`,
          prompt: language === 'RU' ? 'Опишите причинную цепочку механизма по шагам. Как изменение первого звена повлияет на результат?' : language === 'EN' ? 'Describe the causal mechanism step by step. How would changing the first link affect the result?' : 'Себептік тетікті қадамдап сипаттаңыз. Бірінші буын өзгерсе, нәтиже қалай өзгереді?',
          explanation: mechanism,
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-review-interpretation`,
          prompt: language === 'RU' ? 'Какой наблюдаемый результат согласуется с этим механизмом и что он сам по себе не доказывает?' : language === 'EN' ? 'Which observable result is consistent with this mechanism, and what does that result not prove by itself?' : 'Қандай байқалатын нәтиже осы тетікке сәйкес келеді және ол өздігінен нені дәлелдемейді?',
          explanation: interpretation,
          target: { section: 'practice' },
        },
        {
          id: `module-${topic.id}-review-transfer`,
          prompt: language === 'RU' ? 'Перенесите механизм в новую ситуацию: сначала сделайте прогноз, затем обоснуйте его причинной связью.' : language === 'EN' ? 'Transfer the mechanism to a new situation: make a prediction, then justify it causally.' : 'Тетікті жаңа жағдайға қолданыңыз: алдымен болжам жасаңыз, кейін оны себептік байланыспен негіздеңіз.',
          explanation: topic.task[language],
          target: { section: 'cases' },
        },
        {
          id: `module-${topic.id}-review-justification`,
          prompt: language === 'RU' ? 'Какое дополнительное наблюдение или сравнение усилило бы ваш вывод и почему?' : language === 'EN' ? 'What additional observation or comparison would strengthen your conclusion, and why?' : 'Қандай қосымша бақылау немесе салыстыру қорытындыңызды күшейтер еді және неге?',
          explanation: `${mechanism} ${interpretation}`,
          target: { section: 'tests' },
        },
      ],
    };
  }

  if (section === 'media') {
    const names: Record<number, Record<Language,string>> = {
      2:{RU:'Сигнал или артефакт?',EN:'Signal or artifact?',KZ:'Сигнал ма, әлде артефакт па?'},
      3:{RU:'Нейрон, глия и микроокружение',EN:'Neuron, glia, and microenvironment',KZ:'Нейрон, глия және микроорта'},
      4:{RU:'От порога к потенциалу действия',EN:'From threshold to action potential',KZ:'Табалдырықтан әрекет потенциалына дейін'},
      5:{RU:'Передача через химический синапс',EN:'Transmission across a chemical synapse',KZ:'Химиялық синапс арқылы берілу'},
      6:{RU:'Баланс возбуждения и торможения',EN:'Excitation-inhibition balance',KZ:'Қозу мен тежелу тепе-теңдігі'},
      7:{RU:'От стимула к рефлекторному ответу',EN:'From stimulus to reflex response',KZ:'Стимулдан рефлекстік жауапқа дейін'},
      8:{RU:'Путь сигнала: проведение и перекрёст',EN:'Signal pathway: conduction and decussation',KZ:'Сигнал жолы: өткізу және айқасу'},
      9:{RU:'Сегментарный рефлекс и нисходящий контроль',EN:'Segmental reflex and descending control',KZ:'Сегменттік рефлекс және төмендеуші бақылау'},
      10:{RU:'Ствол мозга и поддержание бодрствования',EN:'Brainstem and maintenance of arousal',KZ:'Ми сабауы және сергектікті сақтау'},
      11:{RU:'Планирование → команда → движение → коррекция',EN:'Plan → command → movement → correction',KZ:'Жоспар → команда → қозғалыс → түзету'},
      12:{RU:'Базальные ганглии: выбор и запуск движения',EN:'Basal ganglia: movement selection and initiation',KZ:'Базальды ганглийлер: қозғалысты таңдау және бастау'},
      13:{RU:'Мозжечок: ошибка и коррекция движения',EN:'Cerebellum: movement error and correction',KZ:'Мишық: қозғалыс қатесі және түзету'},
      14:{RU:'Таламус: переключение и модуляция сигнала',EN:'Thalamus: signal relay and modulation',KZ:'Таламус: сигналды ауыстыру және модуляция'},
      15:{RU:'Гипоталамус: отклонение → компенсация → гомеостаз',EN:'Hypothalamus: deviation → compensation → homeostasis',KZ:'Гипоталамус: ауытқу → компенсация → гомеостаз'},
      16:{RU:'Лимбическая система: контекст → эмоция → мотивация',EN:'Limbic system: context → emotion → motivation',KZ:'Лимбиялық жүйе: контекст → эмоция → мотивация'},
      17:{RU:'Миндалина: сигнал → эмоциональное обучение',EN:'Amygdala: cue → emotional learning',KZ:'Амигдала: сигнал → эмоциялық үйрену'},
      18:{RU:'Кора: распределённая обработка информации',EN:'Cortex: distributed information processing',KZ:'Қыртыс: ақпаратты үлестірілген өңдеу'},
      19:{RU:'Соматосенсорная система: рецептор → путь → восприятие',EN:'Somatosensory system: receptor → pathway → perception',KZ:'Соматосенсорлық жүйе: рецептор → жол → қабылдау'},
      20:{RU:'Зрительная система: сетчатка → путь → поле зрения',EN:'Visual system: retina → pathway → visual field',KZ:'Көру жүйесі: торқабық → жол → көру өрісі'},
      21:{RU:'Слух и равновесие: стимул → рецептор → центральная обработка',EN:'Hearing and balance: stimulus → receptor → central processing',KZ:'Есту және тепе-теңдік: стимул → рецептор → орталық өңдеу'},
      22:{RU:'ВНС: ортостаз → компенсация → восстановление',EN:'ANS: orthostasis → compensation → recovery',KZ:'ВЖЖ: ортостаз → компенсация → қалпына келу'},
      23:{RU:'Обучение и память: кодирование → хранение → воспроизведение',EN:'Learning and memory: encoding → storage → retrieval',KZ:'Үйрену және жад: кодтау → сақтау → қайта жаңғырту'},
      24:{RU:'Сон и циркадный ритм: свет → часы → состояние',EN:'Sleep and circadian rhythm: light → clock → state',KZ:'Ұйқы және циркадтық ырғақ: жарық → сағат → күй'},
      25:{RU:'Нейропластичность: тренировка → изменение сети → перенос',EN:'Neuroplasticity: training → network change → transfer',KZ:'Нейропластика: жаттығу → желі өзгерісі → тасымалдау'},
    };
    const mediaTitle=names[topic.id]?.[language] ?? moduleTitle;
    const ui:MediaLesson['ui']={
      preview:language==='RU'?'Что проследить':language==='EN'?'What to follow':'Нені бақылау',
      pending:'',unavailable:'',alternative:'',
      duration:language==='RU'?'Длительность':language==='EN'?'Duration':'Ұзақтығы',
      durationPending:'—',language:language==='RU'?'Язык':language==='EN'?'Language':'Тіл',
      languageName:language==='RU'?'Русский':language==='EN'?'English':'Қазақша',
      credit:language==='RU'?'Источник':language==='EN'?'Credit':'Дереккөз',
      transcript:language==='RU'?'Текстовое сопровождение':language==='EN'?'Transcript':'Мәтіндік сүйемелдеу',
      theory:language==='RU'?'Вернуться к теории':language==='EN'?'Return to theory':'Теорияға оралу',
      question:language==='RU'?'Самопроверка':language==='EN'?'Self-check':'Өзін-өзі тексеру',
      check:language==='RU'?'Проверить':language==='EN'?'Check':'Тексеру',
      retry:language==='RU'?'Повторить':language==='EN'?'Retry':'Қайталау',
      correct:language==='RU'?'Верно':language==='EN'?'Correct':'Дұрыс',
      incorrect:language==='RU'?'Пересмотрите причинную связь':language==='EN'?'Review the causal link':'Себептік байланысты қайта қараңыз',
      correctAnswer:language==='RU'?'Лучший ответ':language==='EN'?'Best answer':'Ең жақсы жауап',
    };
    const correct=language==='RU'?'Сначала отделить наблюдение от интерпретации и проверить причинный механизм.':language==='EN'?'First separate observation from interpretation and test the causal mechanism.':'Алдымен бақылауды түсіндіруден ажыратып, себептік тетікті тексеру.';
    const wrong=language==='RU'?'Сразу назвать диагноз или структуру по одному изменению.':language==='EN'?'Immediately name a diagnosis or structure from one change.':'Бір өзгеріске қарап бірден диагноз немесе құрылымды атау.';
    const intro=(language==='RU'?'Динамический разбор: ':language==='EN'?'Dynamic walkthrough: ':'Динамикалық талдау: ')+mediaTitle;
    return {kind:'media',title,language,introduction:intro,ui,blocks:[{
      id:'module-'+topic.id+'-dynamic-process',title:mediaTitle,preview:topic.task[language],
      transcript:[topic.mechanism[language],topic.interpretation[language]],theoryAnchor:'mechanism',animation:'foundation',
      question:{prompt:topic.question[language],correctAnswer:'a',explanation:topic.mechanism[language]+' '+topic.interpretation[language],options:[
        {id:'a',text:correct,feedback:topic.mechanism[language]},
        {id:'b',text:wrong,feedback:language==='RU'?'Один результат не локализует механизм без дополнительной проверки.':language==='EN'?'A single result does not localize the mechanism without an additional test.':'Бір нәтиже қосымша тексерусіз тетікті локализацияламайды.'},
      ]}
    }]};
  }

  if (section === 'references') {
    const keys = [
      ...topic.sources,

      ...(topic.id === 2 || topic.id === 18
        ? ['methods']
        : []),

      ...(topic.id === 23
        ? ['learning']
        : []),
    ];

    return {
      kind: 'references',
      title,
      introduction: c.referenceIntro,

      cards: [
        {
          id: 'department-materials',
          title: c.materials,

          paragraphs:
            topic.materials.length
              ? topic.materials
              : [c.noMaterials],

          links,
        },
      ],

      sources: [...new Set(keys)].map((key) => {
        if (!sources[key]) {
          throw new Error(
            `Missing reading source: ${key}`,
          );
        }

        return {
          ...sources[key],
          description: c.sourceDescription,
          links,
        };
      }),
    };
  }

  return {
    kind: section,
    title,

    introduction:
      section === 'objectives'
        ? c.goals
        : moduleTitle,

    cards:
      section === 'objectives'
        ? [
            {
              id: 'learning-goal',
              title: question,

              paragraphs: [
                c.mechanism,
                c.interpretation,
              ],

              links,
            },
          ]
        : [
            {
              id: 'summary',
              title: c.summary,

              paragraphs: [
                mechanism,
                interpretation,
              ],

              links,
            },
          ],
  };
}

export const foundationLessons: Partial<
  Record<
    number,
    Partial<
      Record<
        Section,
        LocalizedLesson
      >
    >
  >
> = Object.fromEntries(
  topics.map((topic) => [
    topic.id,

    Object.fromEntries(
      foundationSections.map((section) => [
        section,

        {
          RU: create(
            topic,
            section,
            'RU',
          ),

          EN: create(
            topic,
            section,
            'EN',
          ),

          KZ: create(
            topic,
            section,
            'KZ',
          ),
        },
      ]),
    ),
  ]),
);