import type { Language } from "./course";

type SectionItem = {
  slug: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

export const sections = [
  {
    slug: "objectives",
    icon: "🎯",
    title: {
      RU: "Цели обучения",
      KZ: "Оқу мақсаттары",
      EN: "Learning Objectives",
    },
    description: {
      RU: "Что вы будете знать и уметь после изучения модуля",
      KZ: "Модульді оқығаннан кейін нені білу және істей алу керек",
      EN: "What you should know and be able to do after this module",
    },
  },
  {
    slug: "pretest",
    icon: "⚡",
    title: {
      RU: "Входной блиц-тест",
      KZ: "Кіріспе блиц-тест",
      EN: "Pre-module Quick Test",
    },
    description: {
      RU: "Короткая диагностика исходных знаний без оценки",
      KZ: "Бағасыз бастапқы білімді қысқаша диагностикалау",
      EN: "A short diagnostic check of prior knowledge without grading",
    },
  },
  {
    slug: "theory",
    icon: "📖",
    title: {
      RU: "Теория",
      KZ: "Теория",
      EN: "Theory",
    },
    description: {
      RU: "Основной учебный материал модуля",
      KZ: "Модульдің негізгі оқу материалы",
      EN: "Core learning material for the module",
    },
  },
  {
    slug: "one-minute",
    icon: "⏱️",
    title: {
      RU: "Итог за 1 минуту",
      KZ: "1 минуттық қорытынды",
      EN: "One-minute summary",
    },
    description: {
      RU: "Самые важные идеи модуля в краткой форме",
      KZ: "Модульдің ең маңызды идеялары қысқаша түрде",
      EN: "The most important ideas of the module at a glance",
    },
  },
  {
    slug: "clinical",
    icon: "🩺",
    title: {
      RU: "Связь с клиникой",
      KZ: "Клиникамен байланыс",
      EN: "Clinical Connection",
    },
    description: {
      RU: "Как этот механизм проявляется у человека и зачем он нужен врачу",
      KZ: "Бұл механизм адамда қалай көрінеді және дәрігерге не үшін қажет",
      EN: "How the mechanism appears in people and why it matters clinically",
    },
  },
  {
    slug: "interactive",
    icon: "🧠",
    title: {
      RU: "Интерактивные схемы",
      KZ: "Интерактивті сызбалар",
      EN: "Interactive Diagrams",
    },
    description: {
      RU: "Схемы и визуальные модели для понимания процессов",
      KZ: "Процестерді түсінуге арналған сызбалар мен көрнекі модельдер",
      EN: "Diagrams and visual models for understanding key processes",
    },
  },
  {
    slug: "practice",
    icon: "🧪",
    title: {
      RU: "Практика",
      KZ: "Практика",
      EN: "Practice",
    },
    description: {
      RU: "Практические задания для закрепления материала",
      KZ: "Материалды бекітуге арналған практикалық тапсырмалар",
      EN: "Practice activities to reinforce learning",
    },
  },
  {
    slug: "cases",
    icon: "📋",
    title: {
      RU: "Ситуационные задачи",
      KZ: "Ситуациялық тапсырмалар",
      EN: "Case Problems",
    },
    description: {
      RU: "Разбор учебных и клинических ситуаций",
      KZ: "Оқу және клиникалық жағдайларды талдау",
      EN: "Analysis of learning and clinical scenarios",
    },
  },
  {
    slug: "tests",
    icon: "📝",
    title: {
      RU: "Тесты с разбором",
      KZ: "Түсіндірмесі бар тесттер",
      EN: "Tests with Feedback",
    },
    description: {
      RU: "После ответа вы сразу увидите объяснение и сможете исправить ошибку",
      KZ: "Жауаптан кейін түсіндірме көріп, қатені түзете аласыз",
      EN: "Get an explanation after each answer and a chance to correct mistakes",
    },
  },
  {
    slug: "questions",
    icon: "❓",
    title: {
      RU: "Контрольные вопросы",
      KZ: "Бақылау сұрақтары",
      EN: "Review Questions",
    },
    description: {
      RU: "Вопросы для самопроверки и контроля знаний",
      KZ: "Өзін-өзі тексеруге және білімді бақылауға арналған сұрақтар",
      EN: "Questions for self-assessment and knowledge review",
    },
  },
  {
    slug: "virtual-patient",
    icon: "👤",
    title: {
      RU: "Виртуальный пациент",
      KZ: "Виртуалды пациент",
      EN: "Virtual Patient",
    },
    description: {
      RU: "Интерактивный клинический сценарий с принятием решений",
      KZ: "Шешім қабылдауға арналған интерактивті клиникалық сценарий",
      EN: "An interactive clinical scenario with decision-making",
    },
  },
  {
    slug: "media",
    icon: "🎬",
    title: {
      RU: "Медиа",
      KZ: "Медиа",
      EN: "Media",
    },
    description: {
      RU: "Видео, изображения, анимации и дополнительные материалы",
      KZ: "Бейне, суреттер, анимациялар және қосымша материалдар",
      EN: "Video, images, animations, and supplementary materials",
    },
  },
  {
    slug: "glossary",
    icon: "📚",
    title: {
      RU: "Глоссарий",
      KZ: "Глоссарий",
      EN: "Glossary",
    },
    description: {
      RU: "Основные термины и определения модуля",
      KZ: "Модульдің негізгі терминдері мен анықтамалары",
      EN: "Key terms and definitions for the module",
    },
  },
  {
    slug: "voice",
    icon: "🔊",
    title: {
      RU: "Механизм своими словами",
      KZ: "Механизмді өз сөзіңізбен",
      EN: "Explain the Mechanism",
    },
    description: {
      RU: "Кратко объясните ключевой физиологический механизм модуля своими словами",
      KZ: "Модульдің негізгі физиологиялық механизмін өз сөзіңізбен қысқаша түсіндіріңіз",
      EN: "Explain the module’s key physiological mechanism in your own words",
    },
  },
  {
    slug: "progress",
    icon: "⭐",
    title: {
      RU: "Прогресс и оценивание",
      KZ: "Прогресс және бағалау",
      EN: "Progress and Assessment",
    },
    description: {
      RU: "Что уже получается, что стоит повторить и что делать дальше",
      KZ: "Не меңгерілді, нені қайталау керек және әрі қарай не істеу керек",
      EN: "What is going well, what needs review, and what to do next",
    },
  },
  {
    slug: "notes",
    icon: "🔖",
    title: {
      RU: "Закладки и заметки",
      KZ: "Бетбелгілер мен жазбалар",
      EN: "Bookmarks and Notes",
    },
    description: {
      RU: "Сохранение важных фрагментов и собственных заметок",
      KZ: "Маңызды бөліктер мен жеке жазбаларды сақтау",
      EN: "Save important content and your own notes",
    },
  },
  {
    slug: "references",
    icon: "📑",
    title: {
      RU: "Источники и литература",
      KZ: "Дереккөздер мен әдебиеттер",
      EN: "References",
    },
    description: {
      RU: "Научные источники и рекомендуемая литература",
      KZ: "Ғылыми дереккөздер және ұсынылатын әдебиеттер",
      EN: "Scientific sources and recommended reading",
    },
  },
] as const satisfies readonly SectionItem[];

export type Section = (typeof sections)[number]["slug"];
export const sectionOrder = sections.map(section => section.slug);

export function isSection(value: string): value is Section {
  return sections.some(section => section.slug === value);
}

export function getSectionTitle(section: Section, language: Language): string {
  return sections.find(item => item.slug === section)!.title[language];
}
