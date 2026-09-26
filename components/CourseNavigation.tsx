import Link from "next/link";

import { MODULE_COUNT, type Language as Lang } from "../content/course";
import { sectionOrder as sections, getSectionTitle } from "../content/sections";

type CourseNavigationProps = {
  moduleNumber: number;
  lang: Lang;
  currentSection?: string;
};

const labels = {
  RU: {
    previousSection: "Предыдущий раздел",
    nextSection: "Следующий раздел",

    previousModule: "Предыдущий модуль",
    nextModule: "Следующий модуль",

    moduleHome: "Титул модуля",
    courseHome: "Содержание курса",
    top: "Наверх",

    module: "Модуль",
  },

  KZ: {
    previousSection: "Алдыңғы бөлім",
    nextSection: "Келесі бөлім",

    previousModule: "Алдыңғы модуль",
    nextModule: "Келесі модуль",

    moduleHome: "Модуль беті",
    courseHome: "Курс мазмұны",
    top: "Жоғары",

    module: "Модуль",
  },

  EN: {
    previousSection: "Previous section",
    nextSection: "Next section",

    previousModule: "Previous module",
    nextModule: "Next module",

    moduleHome: "Module home",
    courseHome: "Course contents",
    top: "Back to top",

    module: "Module",
  },
};

export default function CourseNavigation({
  moduleNumber,
  lang,
  currentSection,
}: CourseNavigationProps) {
  const t = labels[lang];

  const hasPreviousModule = moduleNumber > 1;
  const hasNextModule = moduleNumber < MODULE_COUNT;

  /*
    Если currentSection передан,
    значит студент находится внутри одного
    из 17 разделов.
  */

  const sectionIndex = currentSection
    ? sections.indexOf(
        currentSection as (typeof sections)[number]
      )
    : -1;

  const isInsideSection = sectionIndex !== -1;

  const previousSection =
    isInsideSection && sectionIndex > 0
      ? sections[sectionIndex - 1]
      : null;

  const nextSection =
    isInsideSection &&
    sectionIndex < sections.length - 1
      ? sections[sectionIndex + 1]
      : null;

  return (
    <nav
      aria-label="Course navigation"
      style={{
        marginTop: "40px",
        padding: "22px",
        background: "#ffffff",
        border: "1px solid #d7e5ed",
        borderRadius: "20px",
        boxShadow:
          "0 6px 20px rgba(28, 72, 102, 0.07)",
      }}
    >
      {/* =========================================
          НАВИГАЦИЯ МЕЖДУ 17 РАЗДЕЛАМИ
          Показывается только внутри раздела
      ========================================== */}

      {isInsideSection && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
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
                    border:
                      "1px solid #d7e5ed",
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
                    ← {t.previousSection}
                  </span>

                  <strong>
                    {
                      getSectionTitle(previousSection, lang)
                    }
                  </strong>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* ТИТУЛ ТЕКУЩЕГО МОДУЛЯ */}

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
              📚 {t.moduleHome}
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
                    border:
                      "1px solid #d7e5ed",
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
                    {t.nextSection} →
                  </span>

                  <strong>
                    {
                      getSectionTitle(nextSection, lang)
                    }
                  </strong>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          <div
            style={{
              margin: "22px 0",
              borderTop:
                "1px solid #e3edf2",
            }}
          />
        </>
      )}

      {/* =========================================
          НАВИГАЦИЯ МЕЖДУ 23 МОДУЛЯМИ
          Показывается всегда
      ========================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "12px",
        }}
      >
        {/* ПРЕДЫДУЩИЙ МОДУЛЬ */}

        <div>
          {hasPreviousModule ? (
            <Link
              href={`/modules/${
                moduleNumber - 1
              }?lang=${lang}`}
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
                ← {t.previousModule}
              </span>

              <strong>
                {t.module} {moduleNumber - 1}
              </strong>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* СОДЕРЖАНИЕ КУРСА */}

        <Link
          href={`/?lang=${lang}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "15px",
            borderRadius: "13px",
            background: "#eaf5fa",
            border: "1px solid #cfe4ee",
            color: "#005b96",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          🏠 {t.courseHome}
        </Link>

        {/* СЛЕДУЮЩИЙ МОДУЛЬ */}

        <div>
          {hasNextModule ? (
            <Link
              href={`/modules/${
                moduleNumber + 1
              }?lang=${lang}`}
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
                {t.nextModule} →
              </span>

              <strong>
                {t.module} {moduleNumber + 1}
              </strong>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* =========================================
          НИЖНЯЯ СТРОКА
      ========================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "18px",
          paddingTop: "16px",
          borderTop: "1px solid #e3edf2",
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
          🏠 {t.courseHome}
        </Link>

        <Link
          href={`/modules/${moduleNumber}?lang=${lang}`}
          style={{
            color: "#617b8d",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          📚 {t.module} {moduleNumber}
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