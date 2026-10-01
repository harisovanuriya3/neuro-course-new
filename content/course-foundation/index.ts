import { modules, type Language } from '../course';
import { getSectionTitle, type Section } from '../sections';
import type { LocalizedLesson, PracticeLesson, SectionLesson } from '../types';
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
            {
              id: 'a',
              text: mechanism,
            },
            {
              id: 'b',
              text: interpretation,
            },
            {
              id: 'c',
              text: c.noMaterials,
            },
          ],

          correctAnswer: 'a',

          explanation: interpretation,

          target: {
            section: 'theory',
          },
        },
      ],
    };
  }

  if (section === 'clinical') {
    return {
      kind: 'clinical',
      title,
      introduction: c.interpretation,

      cards: [
        {
          id: `module-${topic.id}-clinical`,
          title: question,

          paragraphs: [
            topic.task[language],
            mechanism,
            interpretation,
          ],

          links: [
            { section: 'theory' as const },
            { section: 'practice' as const },
            { section: 'cases' as const },
          ],
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
          id: `module-${topic.id}-review`,
          prompt: question,

          explanation:
            `${mechanism} ${interpretation}`,

          target: {
            section: 'theory',
          },
        },
      ],
    };
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