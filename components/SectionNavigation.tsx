import Link from "next/link";

type Lang = "RU" | "KZ" | "EN";

type SectionNavigationProps = {
  moduleNumber: number;
  currentSection: string;
  lang: Lang;
};

const sectionOrder = [
  "objectives",
  "pretest",
  "theory",
  "one-minute",
  "clinical",
  "interactive",
  "practice",
  "cases",
  "tests",
  "questions",
  "virtual-patient",
  "media",
  "glossary",
  "voice",
  "progress",
  "notes",
  "references",
];

const sectionNames: Record<Lang, Record<string, string>> = {
  RU: {
    objectives: "Цели обучения",
    pretest: "Входной блиц-тест",
    theory: "Теория",
    "one-minute": "Ключевое за 1 минуту",
    clinical: "Клинический мост",
    interactive: "Интерактивные схемы",
    practice: "Практика",
    cases: "Ситуационные задачи",
    tests: "Ветвящиеся тесты",
    questions: "Контрольные вопросы",
    "virtual-patient": "Виртуальный пациент",
    media: "Медиа",
    glossary: "Глоссарий",
    voice: "Голосовое сопровождение",
    progress: "Мой прогресс",
    notes: "Закладки и заметки",
    references: "Источники и литература",
  },

  KZ: {
    objectives: "Оқу мақсаттары",
    pretest: "Кіріспе блиц-тест",
    theory: "Теория",
    "one-minute": "1 минуттағы негізгі ойлар",
    clinical: "Клиникалық көпір",
    interactive: "Интерактивті сызбалар",
    practice: "Практика",
    cases: "Ситуациялық тапсырмалар",
    tests: "Тармақталған тесттер",
    questions: "Бақылау сұрақтары",
    "virtual-patient": "Виртуалды пациент",
    media: "Медиа",
    glossary: "Глоссарий",
    voice: "Дауыстық сүйемелдеу",
    progress: "Менің прогресім",
    notes: "Бетбелгілер мен жазбалар",
    references: "Дереккөздер мен әдебиеттер",
  },

  EN: {
    objectives: "Learning Objectives",
    pretest: "Pre-module Quick Test",
    theory: "Theory",
    "one-minute": "Key Points in 1 Minute",
    clinical: "Clinical Bridge",
    interactive: "Interactive Diagrams",
    practice: "Practice",
    cases: "Case Problems",
    tests: "Branching Tests",
    questions: "Review Questions",
    "virtual-patient": "Virtual Patient",
    media: "Media",
    glossary: "Glossary",
    voice: "Audio Guide",
    progress: "My Progress",
    notes: "Bookmarks and Notes",
    references: "References",
  },
};

const labels = {
  RU: {
    previous: "Предыдущий раздел",
    next: "Следующий раздел",
    module: "Титул модуля",
    contents: "Содержание курса",
    top: "Наверх",
  },

  KZ: {
    previous: "Алдыңғы бөлім",
    next: "Келесі бөлім",
    module: "Модуль беті",
    contents: "Курс мазмұны",
    top: "Жоғары",
  },

  EN: {
    previous: "Previous section",
    next: "Next section",
    module: "Module home",
    contents: "Course contents",
    top: "Back to top",
  },
};

export default function SectionNavigation({
  moduleNumber,
  currentSection,
  lang,
}: SectionNavigationProps) {
  const currentIndex = sectionOrder.indexOf(currentSection);

  if (currentIndex === -1) {
    return null;
  }

  const previousSection =
    currentIndex > 0 ? sectionOrder[currentIndex - 1] : null;

  const nextSection =
    currentIndex < sectionOrder.length - 1
      ? sectionOrder[currentIndex + 1]
      : null;

  const t = labels[lang];
  const names = sectionNames[lang];

  return (
    <nav
      aria-label="Section navigation"
      style={{
        marginTop: "40px",
        padding: "22px",
        background: "#ffffff",
        border: "1px solid #d7e5ed",
        borderRadius: "18px",
        boxShadow: "0 5px 18px rgba(28, 72, 102, 0.06)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "12px",
        }}
      >
        {/* ПРЕДЫДУЩИЙ РАЗДЕЛ */}

        <div>
          {previousSection ? (
            <Link
              href={`/modules/${moduleNumber}/${previousSection}?lang=${lang}`}
              style={{
                display: "flex",
                height: "100%",
                boxSizing: "border-box",
                flexDirection: "column",
                justifyContent: "center",
                padding: "15px",
                borderRadius: "13px",
                background: "#f4f8fb",
                border: "1px solid #d7e5ed",
                color: "#005b96",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#71899a",
                  marginBottom: "5px",
                }}
              >
                ← {t.previous}
              </span>

              <strong>{names[previousSection]}</strong>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* ТИТУЛ МОДУЛЯ */}

        <Link
          href={`/modules/${moduleNumber}?lang=${lang}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "15px",
            borderRadius: "13px",
            background: "#005b96",
            color: "#ffffff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          📚 {t.module}
        </Link>

        {/* СЛЕДУЮЩИЙ РАЗДЕЛ */}

        <div>
          {nextSection ? (
            <Link
              href={`/modules/${moduleNumber}/${nextSection}?lang=${lang}`}
              style={{
                display: "flex",
                height: "100%",
                boxSizing: "border-box",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                textAlign: "right",
                padding: "15px",
                borderRadius: "13px",
                background: "#f4f8fb",
                border: "1px solid #d7e5ed",
                color: "#005b96",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#71899a",
                  marginBottom: "5px",
                }}
              >
                {t.next} →
              </span>

              <strong>{names[nextSection]}</strong>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* ДОПОЛНИТЕЛЬНАЯ НАВИГАЦИЯ */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
          marginTop: "18px",
          paddingTop: "16px",
          borderTop: "1px solid #e5eef3",
        }}
      >
        <Link
          href={`/?lang=${lang}`}
          style={{
            color: "#617b8d",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          🏠 {t.contents}
        </Link>

        <Link
          href={`/modules/${moduleNumber}?lang=${lang}`}
          style={{
            color: "#617b8d",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          📚 {t.module}
        </Link>

        <a
          href="#top"
          style={{
            color: "#617b8d",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          ↑ {t.top}
        </a>
      </div>
    </nav>
  );
}