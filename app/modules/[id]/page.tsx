import Link from "next/link";
import { notFound } from "next/navigation";
import CourseNavigation from "../../../components/CourseNavigation";

type Lang = "RU" | "KZ" | "EN";

type SectionItem = {
  slug: string;
  icon: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
};

const moduleTitles: Record<Lang, string[]> = {
  RU: [
    "Введение в нейрофизиологию",
    "История изучения и методы исследования нервной системы",
    "Нейрон, нейроглия и микросреда нервной ткани",
    "Мембранные процессы и потенциал покоя",
    "Ионные каналы и потенциал действия",
    "Синапсы, нейромедиаторы и нейромодуляция",
    "Возбуждение и торможение",
    "Рефлекторная деятельность и нейронные сети",
    "Проводящие пути нервной системы",
    "Спинной мозг и спинальная регуляция",
    "Ствол мозга и ретикулярная формация",
    "Двигательные системы и контроль движений",
    "Мозжечок",
    "Таламус и таламо-кортикальные системы",
    "Гипоталамус и гомеостаз",
    "Лимбическая система, эмоции и мотивация",
    "Базальные ганглии",
    "Кора больших полушарий и функциональная организация мозга",
    "Сенсорные системы и боль",
    "Вегетативная нервная система",
    "Высшая нервная деятельность",
    "Нейрогуморальная регуляция, сон и биологические ритмы",
    "Пластичность, восстановление и патофизиология нервной системы",
  ],

  KZ: [
    "Нейрофизиологияға кіріспе",
    "Жүйке жүйесін зерттеу тарихы мен әдістері",
    "Нейрон, нейроглия және жүйке тінінің микроортасы",
    "Мембраналық процестер және тыныштық потенциалы",
    "Иондық арналар және әрекет потенциалы",
    "Синапстар, нейромедиаторлар және нейромодуляция",
    "Қозу және тежелу",
    "Рефлекстік қызмет және нейрондық желілер",
    "Жүйке жүйесінің өткізгіш жолдары",
    "Жұлын және жұлындық реттелу",
    "Ми сабауы және ретикулярлық формация",
    "Қозғалыс жүйелері және қозғалысты басқару",
    "Мишық",
    "Таламус және таламо-кортикалық жүйелер",
    "Гипоталамус және гомеостаз",
    "Лимбиялық жүйе, эмоциялар және мотивация",
    "Базальды ганглийлер",
    "Үлкен ми сыңарларының қыртысы және мидың функционалдық ұйымдасуы",
    "Сенсорлық жүйелер және ауырсыну",
    "Вегетативтік жүйке жүйесі",
    "Жоғары жүйке қызметі",
    "Нейрогуморальдық реттелу, ұйқы және биологиялық ырғақтар",
    "Жүйке жүйесінің пластикалығы, қалпына келуі және патофизиологиясы",
  ],

  EN: [
    "Introduction to Neurophysiology",
    "History and Methods of Nervous System Research",
    "Neurons, Neuroglia, and the Neural Microenvironment",
    "Membrane Processes and the Resting Membrane Potential",
    "Ion Channels and the Action Potential",
    "Synapses, Neurotransmitters, and Neuromodulation",
    "Excitation and Inhibition",
    "Reflex Activity and Neural Networks",
    "Neural Pathways",
    "Spinal Cord and Spinal Regulation",
    "Brainstem and Reticular Formation",
    "Motor Systems and Motor Control",
    "Cerebellum",
    "Thalamus and Thalamocortical Systems",
    "Hypothalamus and Homeostasis",
    "Limbic System, Emotion, and Motivation",
    "Basal Ganglia",
    "Cerebral Cortex and Functional Organization of the Brain",
    "Sensory Systems and Pain",
    "Autonomic Nervous System",
    "Higher Nervous Activity",
    "Neurohumoral Regulation, Sleep, and Biological Rhythms",
    "Neural Plasticity, Recovery, and Pathophysiology",
  ],
};

const sections: SectionItem[] = [
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
      RU: "Ключевое за 1 минуту",
      KZ: "1 минуттағы негізгі ойлар",
      EN: "Key Points in 1 Minute",
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
      RU: "Клинический мост",
      KZ: "Клиникалық көпір",
      EN: "Clinical Bridge",
    },
    description: {
      RU: "Связь физиологических механизмов с клинической практикой",
      KZ: "Физиологиялық механизмдердің клиникалық тәжірибемен байланысы",
      EN: "Connecting physiological mechanisms with clinical practice",
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
      RU: "Ветвящиеся тесты",
      KZ: "Тармақталған тесттер",
      EN: "Branching Tests",
    },
    description: {
      RU: "Тесты с разными траекториями в зависимости от ответа",
      KZ: "Жауапқа байланысты әртүрлі бағыттары бар тесттер",
      EN: "Adaptive question paths based on your answers",
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
      RU: "Голосовое сопровождение",
      KZ: "Дауыстық сүйемелдеу",
      EN: "Audio Guide",
    },
    description: {
      RU: "Аудиосопровождение учебных материалов",
      KZ: "Оқу материалдарының аудио сүйемелдеуі",
      EN: "Audio support for the learning materials",
    },
  },
  {
    slug: "progress",
    icon: "⭐",
    title: {
      RU: "Мой прогресс",
      KZ: "Менің прогресім",
      EN: "My Progress",
    },
    description: {
      RU: "Результаты, ошибки и персональные рекомендации",
      KZ: "Нәтижелер, қателер және жеке ұсыныстар",
      EN: "Results, mistakes, and personalized recommendations",
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
];

const ui: Record<
  Lang,
  {
    back: string;
    eyebrow: string;
    module: string;
    author: string;
    authorName: string;
    intro: string;
    structure: string;
    sectionCount: string;
  }
> = {
  RU: {
    back: "← К содержанию курса",
    eyebrow: "ИНТЕРАКТИВНЫЙ УЧЕБНИК ПО НЕЙРОФИЗИОЛОГИИ",
    module: "Модуль",
    author: "Автор",
    authorName: "Нурия",
    intro:
      "Выберите раздел модуля. Материалы организованы от целей обучения и входной диагностики к теории, клиническому применению, практике и контролю знаний.",
    structure: "Структура модуля",
    sectionCount: "17 учебных разделов",
  },

  KZ: {
    back: "← Курс мазмұнына",
    eyebrow: "НЕЙРОФИЗИОЛОГИЯ БОЙЫНША ИНТЕРАКТИВТІ ОҚУЛЫҚ",
    module: "Модуль",
    author: "Автор",
    authorName: "Нурия",
    intro:
      "Модуль бөлімін таңдаңыз. Материалдар оқу мақсаттары мен бастапқы диагностикадан теорияға, клиникалық қолдануға, практикаға және білімді бақылауға дейін ұйымдастырылған.",
    structure: "Модуль құрылымы",
    sectionCount: "17 оқу бөлімі",
  },

  EN: {
    back: "← Back to Course Contents",
    eyebrow: "INTERACTIVE TEXTBOOK OF NEUROPHYSIOLOGY",
    module: "Module",
    author: "Author",
    authorName: "Nuriya",
    intro:
      "Choose a module section. The learning materials progress from objectives and initial diagnostics to theory, clinical application, practice, and knowledge assessment.",
    structure: "Module Structure",
    sectionCount: "17 learning sections",
  },
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export default async function ModulePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { lang: requestedLang } = await searchParams;

  if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id)) {
    notFound();
  }

  const moduleNumber = Number(id);

  const rawLang = Array.isArray(requestedLang)
    ? requestedLang[0]
    : requestedLang;

  const lang: Lang =
    rawLang === "KZ" || rawLang === "EN"
      ? rawLang
      : "RU";

  const moduleTitle = moduleTitles[lang][moduleNumber - 1];

  if (!moduleTitle) {
    notFound();
  }

  const t = ui[lang];

  return (
    <main
      id="top"
      style={{
        minHeight: "100vh",
        padding: "28px 36px 60px",
        background:
          "linear-gradient(180deg, #f2f7fb 0%, #eef5f9 100%)",
        color: "#003f73",
      }}
    >
      <div
        lang={
          lang === "KZ"
            ? "kk"
            : lang.toLowerCase()
        }
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {/* Верхняя строка */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <Link
            href={`/?lang=${lang}#course`}
            style={{
              color: "#005b96",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {t.back}
          </Link>

          <nav
            aria-label="Language"
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {(["RU", "KZ", "EN"] as const).map(
              (code) => (
                <Link
                  key={code}
                  href={`/modules/${moduleNumber}?lang=${code}`}
                  aria-current={
                    lang === code
                      ? "page"
                      : undefined
                  }
                  style={{
                    minWidth: "70px",
                    padding: "9px 18px",
                    borderRadius: "10px",
                    textAlign: "center",
                    textDecoration: "none",
                    fontWeight: 700,
                    border:
                      lang === code
                        ? "1px solid #0067a5"
                        : "1px solid #d4e2eb",
                    background:
                      lang === code
                        ? "#0067a5"
                        : "#ffffff",
                    color:
                      lang === code
                        ? "#ffffff"
                        : "#526b80",
                  }}
                >
                  {code}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Титульный блок */}

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #d5e3ec",
            borderRadius: "24px",
            padding: "48px",
            boxShadow:
              "0 6px 20px rgba(31, 77, 107, 0.04)",
          }}
        >
          <p
            style={{
              margin: "0 0 18px",
              color: "#1373a6",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "1.5px",
            }}
          >
            {t.eyebrow}
          </p>

          <h1
            style={{
              margin: "0 0 14px",
              color: "#064a73",
              fontSize:
                "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
            }}
          >
            {t.module} {moduleNumber}.{" "}
            {moduleTitle}
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              color: "#597185",
              fontWeight: 700,
            }}
          >
            {t.author}: {t.authorName}
          </p>

          <p
            style={{
              maxWidth: "1000px",
              margin: "0 0 28px",
              color: "#526b80",
              lineHeight: 1.8,
            }}
          >
            {t.intro}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "8px 13px",
                borderRadius: "999px",
                background: "#e9f4f9",
                color: "#14739d",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {t.structure}
            </span>

            <span
              style={{
                padding: "8px 13px",
                borderRadius: "999px",
                background: "#edf7f1",
                color: "#367c55",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {t.sectionCount}
            </span>
          </div>
        </section>

        {/* 17 разделов */}

        <section
          aria-label={t.structure}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "18px",
            marginTop: "28px",
          }}
        >
          {sections.map((item, index) => (
            <Link
              key={item.slug}
              href={`/modules/${moduleNumber}/${item.slug}?lang=${lang}`}
              style={{
                display: "block",
                minHeight: "165px",
                padding: "22px",
                background: "#ffffff",
                border: "1px solid #d6e3eb",
                borderRadius: "17px",
                textDecoration: "none",
                boxShadow:
                  "0 4px 12px rgba(0, 60, 100, 0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "46px",
                    height: "46px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "13px",
                    background: "#f0f7fa",
                    fontSize: "23px",
                  }}
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      marginBottom: "7px",
                      color: "#7790a4",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 9px",
                      color: "#004b78",
                      fontSize: "17px",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title[lang]}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#61798b",
                      lineHeight: 1.55,
                      fontSize: "14px",
                    }}
                  >
                    {item.description[lang]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Единая навигация между 23 модулями */}

        <CourseNavigation
          moduleNumber={moduleNumber}
          lang={lang}
        />
      </div>
    </main>
  );
}