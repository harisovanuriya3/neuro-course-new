import Link from "next/link";
import { notFound } from "next/navigation";
import ModuleNavigation from "../../../components/ModuleNavigation";

type Lang = "RU" | "KZ" | "EN";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    lang?: string | string[];
  }>;
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

const sections = {
  RU: [
    {
      slug: "objectives",
      icon: "🎯",
      title: "Цели обучения",
      description: "Что вы будете знать и уметь после изучения модуля.",
    },
    {
      slug: "pretest",
      icon: "⚡",
      title: "Входной блиц-тест",
      description: "Короткая диагностика исходных знаний без оценки.",
    },
    {
      slug: "theory",
      icon: "📖",
      title: "Теория",
      description: "Основной учебный материал модуля.",
    },
    {
      slug: "one-minute",
      icon: "⏱️",
      title: "Ключевое за 1 минуту",
      description: "Самые важные идеи модуля в краткой форме.",
    },
    {
      slug: "clinical",
      icon: "🩺",
      title: "Клинический мост",
      description: "Связь фундаментальной нейрофизиологии с клинической практикой.",
    },
    {
      slug: "interactive",
      icon: "🧠",
      title: "Интерактивные схемы",
      description: "Интерактивное изучение процессов, структур и связей.",
    },
    {
      slug: "practice",
      icon: "🧪",
      title: "Практика",
      description: "Практические задания для закрепления материала.",
    },
    {
      slug: "cases",
      icon: "📋",
      title: "Ситуационные задачи",
      description: "Разбор учебных и клинических ситуаций.",
    },
    {
      slug: "tests",
      icon: "📝",
      title: "Ветвящиеся тесты",
      description: "Тесты с разными траекториями в зависимости от ответа.",
    },
    {
      slug: "questions",
      icon: "❓",
      title: "Контрольные вопросы",
      description: "Вопросы для самопроверки и повторения.",
    },
    {
      slug: "virtual-patient",
      icon: "👤",
      title: "Виртуальный пациент",
      description: "Интерактивный клинический сценарий принятия решений.",
    },
    {
      slug: "media",
      icon: "🎬",
      title: "Медиа",
      description: "Иллюстрации, анимации, видео и дополнительные материалы.",
    },
    {
      slug: "glossary",
      icon: "📚",
      title: "Глоссарий",
      description: "Ключевые термины и определения модуля.",
    },
    {
      slug: "voice",
      icon: "🔊",
      title: "Голосовое сопровождение",
      description: "Аудиосопровождение учебного материала.",
    },
    {
      slug: "progress",
      icon: "⭐",
      title: "Мой прогресс",
      description: "Результаты, ошибки и персональные рекомендации.",
    },
    {
      slug: "notes",
      icon: "🔖",
      title: "Закладки и заметки",
      description: "Сохранённые материалы и личные заметки.",
    },
    {
      slug: "references",
      icon: "📑",
      title: "Источники и литература",
      description: "Учебная и научная литература по теме модуля.",
    },
  ],

  KZ: [
    {
      slug: "objectives",
      icon: "🎯",
      title: "Оқу мақсаттары",
      description: "Модульді аяқтағаннан кейін нені білу және істей алу қажет.",
    },
    {
      slug: "pretest",
      icon: "⚡",
      title: "Кіріспе блиц-тест",
      description: "Бастапқы білімді бағасыз қысқаша анықтау.",
    },
    {
      slug: "theory",
      icon: "📖",
      title: "Теория",
      description: "Модульдің негізгі оқу материалы.",
    },
    {
      slug: "one-minute",
      icon: "⏱️",
      title: "1 минуттағы негізгі ойлар",
      description: "Модульдің ең маңызды идеяларының қысқаша мазмұны.",
    },
    {
      slug: "clinical",
      icon: "🩺",
      title: "Клиникалық көпір",
      description: "Нейрофизиологияны клиникалық тәжірибемен байланыстыру.",
    },
    {
      slug: "interactive",
      icon: "🧠",
      title: "Интерактивті сызбалар",
      description: "Процестерді, құрылымдарды және байланыстарды интерактивті зерттеу.",
    },
    {
      slug: "practice",
      icon: "🧪",
      title: "Практика",
      description: "Материалды бекітуге арналған практикалық тапсырмалар.",
    },
    {
      slug: "cases",
      icon: "📋",
      title: "Ситуациялық тапсырмалар",
      description: "Оқу және клиникалық жағдайларды талдау.",
    },
    {
      slug: "tests",
      icon: "📝",
      title: "Тармақталған тесттер",
      description: "Жауапқа байланысты әртүрлі оқу жолдары бар тесттер.",
    },
    {
      slug: "questions",
      icon: "❓",
      title: "Бақылау сұрақтары",
      description: "Өзін-өзі тексеру және қайталау сұрақтары.",
    },
    {
      slug: "virtual-patient",
      icon: "👤",
      title: "Виртуалды пациент",
      description: "Клиникалық шешім қабылдаудың интерактивті сценарийі.",
    },
    {
      slug: "media",
      icon: "🎬",
      title: "Медиа",
      description: "Суреттер, анимациялар, бейнелер және қосымша материалдар.",
    },
    {
      slug: "glossary",
      icon: "📚",
      title: "Глоссарий",
      description: "Негізгі терминдер мен анықтамалар.",
    },
    {
      slug: "voice",
      icon: "🔊",
      title: "Дауыстық сүйемелдеу",
      description: "Оқу материалының аудио нұсқасы.",
    },
    {
      slug: "progress",
      icon: "⭐",
      title: "Менің прогресім",
      description: "Нәтижелер, қателер және жеке ұсыныстар.",
    },
    {
      slug: "notes",
      icon: "🔖",
      title: "Бетбелгілер мен жазбалар",
      description: "Сақталған материалдар мен жеке жазбалар.",
    },
    {
      slug: "references",
      icon: "📑",
      title: "Дереккөздер мен әдебиеттер",
      description: "Модуль тақырыбы бойынша оқу және ғылыми әдебиеттер.",
    },
  ],

  EN: [
    {
      slug: "objectives",
      icon: "🎯",
      title: "Learning Objectives",
      description: "What you should know and be able to do after completing the module.",
    },
    {
      slug: "pretest",
      icon: "⚡",
      title: "Pre-module Quick Test",
      description: "A short diagnostic assessment that does not affect the final grade.",
    },
    {
      slug: "theory",
      icon: "📖",
      title: "Theory",
      description: "The main learning material for this module.",
    },
    {
      slug: "one-minute",
      icon: "⏱️",
      title: "Key Points in 1 Minute",
      description: "The most important concepts summarized briefly.",
    },
    {
      slug: "clinical",
      icon: "🩺",
      title: "Clinical Bridge",
      description: "Connecting fundamental neurophysiology with clinical practice.",
    },
    {
      slug: "interactive",
      icon: "🧠",
      title: "Interactive Diagrams",
      description: "Interactive exploration of processes, structures, and connections.",
    },
    {
      slug: "practice",
      icon: "🧪",
      title: "Practice",
      description: "Practical activities for reinforcing learning.",
    },
    {
      slug: "cases",
      icon: "📋",
      title: "Case Problems",
      description: "Analysis of educational and clinical situations.",
    },
    {
      slug: "tests",
      icon: "📝",
      title: "Branching Tests",
      description: "Adaptive tests with different paths depending on your answers.",
    },
    {
      slug: "questions",
      icon: "❓",
      title: "Review Questions",
      description: "Questions for self-assessment and revision.",
    },
    {
      slug: "virtual-patient",
      icon: "👤",
      title: "Virtual Patient",
      description: "An interactive clinical decision-making scenario.",
    },
    {
      slug: "media",
      icon: "🎬",
      title: "Media",
      description: "Illustrations, animations, videos, and additional materials.",
    },
    {
      slug: "glossary",
      icon: "📚",
      title: "Glossary",
      description: "Key terms and definitions for the module.",
    },
    {
      slug: "voice",
      icon: "🔊",
      title: "Audio Guide",
      description: "Audio support for the learning material.",
    },
    {
      slug: "progress",
      icon: "⭐",
      title: "My Progress",
      description: "Results, errors, and personalized recommendations.",
    },
    {
      slug: "notes",
      icon: "🔖",
      title: "Bookmarks and Notes",
      description: "Saved materials and personal notes.",
    },
    {
      slug: "references",
      icon: "📑",
      title: "References",
      description: "Educational and scientific literature for the module.",
    },
  ],
};

const interfaceText = {
  RU: {
    course: "ИНТЕРАКТИВНЫЙ УЧЕБНИК ПО НЕЙРОФИЗИОЛОГИИ",
    module: "Модуль",
    author: "Автор: Нурия",
    instruction:
      "Выберите раздел модуля. Материалы организованы от целей обучения и входной диагностики к теории, клиническому применению, практике и контролю знаний.",
    structure: "Структура модуля",
    sections: "17 учебных разделов",
    back: "← К содержанию курса",
  },

  KZ: {
    course: "НЕЙРОФИЗИОЛОГИЯ БОЙЫНША ИНТЕРАКТИВТІ ОҚУЛЫҚ",
    module: "Модуль",
    author: "Автор: Нурия",
    instruction:
      "Модуль бөлімін таңдаңыз. Материал оқу мақсаттары мен бастапқы диагностикадан теорияға, клиникалық қолдануға, практикаға және білімді бақылауға дейін ұйымдастырылған.",
    structure: "Модуль құрылымы",
    sections: "17 оқу бөлімі",
    back: "← Курс мазмұнына",
  },

  EN: {
    course: "INTERACTIVE TEXTBOOK OF NEUROPHYSIOLOGY",
    module: "Module",
    author: "Author: Nuriya",
    instruction:
      "Choose a module section. The learning pathway progresses from objectives and diagnostic assessment to theory, clinical application, practice, and knowledge assessment.",
    structure: "Module structure",
    sections: "17 learning sections",
    back: "← Back to course contents",
  },
};

function normalizeLanguage(value?: string | string[]): Lang {
  const selected = Array.isArray(value) ? value[0] : value;

  if (selected === "KZ") return "KZ";
  if (selected === "EN") return "EN";

  return "RU";
}

export default async function ModulePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const query = await searchParams;

  if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id)) {
    notFound();
  }

  const moduleNumber = Number(id);
  const lang = normalizeLanguage(query.lang);

  const moduleTitle = moduleTitles[lang][moduleNumber - 1];
  const currentSections = sections[lang];
  const text = interfaceText[lang];

  if (!moduleTitle) {
    notFound();
  }

  return (
    <main
      id="top"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f3f8fb 0%, #f8fbfd 45%, #ffffff 100%)",
        color: "#173042",
        padding: "24px 16px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        {/* Верхняя строка */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <Link
            href={`/?lang=${lang}`}
            style={{
              color: "#005b96",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {text.back}
          </Link>

          {/* Выбор языка */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {(["RU", "KZ", "EN"] as Lang[]).map((item) => (
              <Link
                key={item}
                href={`/modules/${moduleNumber}?lang=${item}`}
                style={{
                  minWidth: "44px",
                  textAlign: "center",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 700,
                  border:
                    lang === item
                      ? "1px solid #005b96"
                      : "1px solid #d7e5ed",
                  background: lang === item ? "#005b96" : "#ffffff",
                  color: lang === item ? "#ffffff" : "#416174",
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Титульный блок */}

        <header
          style={{
            background: "#ffffff",
            border: "1px solid #dce8ef",
            borderRadius: "24px",
            padding: "clamp(24px, 5vw, 48px)",
            boxShadow: "0 12px 35px rgba(35, 73, 99, 0.08)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: "#2b789e",
              marginBottom: "16px",
            }}
          >
            {text.course}
          </div>

          <h1
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(30px, 5vw, 48px)",
              lineHeight: 1.15,
              color: "#173b52",
            }}
          >
            {text.module} {moduleNumber}. {moduleTitle}
          </h1>

          <p
            style={{
              margin: "0 0 22px",
              color: "#5f7888",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {text.author}
          </p>

          <p
            style={{
              margin: 0,
              maxWidth: "900px",
              color: "#4f6878",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            {text.instruction}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            <span
              style={{
                padding: "8px 12px",
                background: "#eaf5fa",
                borderRadius: "999px",
                color: "#236b8e",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {text.structure}
            </span>

            <span
              style={{
                padding: "8px 12px",
                background: "#eef7f2",
                borderRadius: "999px",
                color: "#39755a",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {text.sections}
            </span>
          </div>
        </header>

        {/* 17 разделов */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {currentSections.map((section, index) => (
            <Link
              key={section.slug}
              href={`/modules/${moduleNumber}/${section.slug}?lang=${lang}`}
              style={{
                display: "block",
                background: "#ffffff",
                border: "1px solid #dce8ef",
                borderRadius: "18px",
                padding: "20px",
                textDecoration: "none",
                color: "inherit",
                boxShadow: "0 5px 18px rgba(28, 72, 102, 0.05)",
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
                  style={{
                    width: "44px",
                    height: "44px",
                    flexShrink: 0,
                    borderRadius: "13px",
                    background: "#f0f7fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                  }}
                >
                  {section.icon}
                </div>

                <div>
                  <div
                    style={{
                      color: "#78909d",
                      fontSize: "12px",
                      fontWeight: 800,
                      marginBottom: "5px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontSize: "18px",
                      lineHeight: 1.3,
                      color: "#183d53",
                    }}
                  >
                    {section.title}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#637b89",
                      fontSize: "14px",
                      lineHeight: 1.55,
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* НИЖНЯЯ НАВИГАЦИЯ */}

        <ModuleNavigation
          moduleNumber={moduleNumber}
          lang={lang}
        />
      </div>
    </main>
  );
}