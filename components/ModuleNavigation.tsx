import Link from "next/link";

type Lang = "RU" | "KZ" | "EN";

type ModuleNavigationProps = {
  moduleNumber: number;
  lang: Lang;
};

const labels = {
  RU: {
    previous: "Предыдущий модуль",
    next: "Следующий модуль",
    contents: "Содержание курса",
    module: "Модуль",
    top: "Наверх",
  },

  KZ: {
    previous: "Алдыңғы модуль",
    next: "Келесі модуль",
    contents: "Курс мазмұны",
    module: "Модуль",
    top: "Жоғары",
  },

  EN: {
    previous: "Previous module",
    next: "Next module",
    contents: "Course contents",
    module: "Module",
    top: "Back to top",
  },
};

export default function ModuleNavigation({
  moduleNumber,
  lang,
}: ModuleNavigationProps) {
  const t = labels[lang];

  const hasPrevious = moduleNumber > 1;
  const hasNext = moduleNumber < 23;

  return (
    <nav
      aria-label="Module navigation"
      style={{
        marginTop: "36px",
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
          alignItems: "stretch",
        }}
      >
        {/* ПРЕДЫДУЩИЙ МОДУЛЬ */}

        <div>
          {hasPrevious ? (
            <Link
              href={`/modules/${moduleNumber - 1}?lang=${lang}`}
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
                  fontSize: "13px",
                  color: "#71899a",
                  marginBottom: "4px",
                }}
              >
                ← {t.previous}
              </span>

              <strong>
                {t.module} {moduleNumber - 1}
              </strong>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* СОДЕРЖАНИЕ */}

        <Link
          href={`/?lang=${lang}#course`}
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
          🏠 {t.contents}
        </Link>

        {/* СЛЕДУЮЩИЙ МОДУЛЬ */}

        <div>
          {hasNext ? (
            <Link
              href={`/modules/${moduleNumber + 1}?lang=${lang}`}
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
                  fontSize: "13px",
                  color: "#71899a",
                  marginBottom: "4px",
                }}
              >
                {t.next} →
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

      {/* НАВЕРХ */}

      <div
        style={{
          textAlign: "center",
          marginTop: "16px",
        }}
      >
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