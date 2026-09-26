import Link from "next/link";

import { modules, type Language as Lang } from "../content/course";

const ui: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    module: string;
    open: string;
  }
> = {
  RU: {
    title: "Содержание курса",
    subtitle: "Выберите учебный модуль",
    module: "Модуль",
    open: "Открыть модуль →",
  },

  KZ: {
    title: "Курс мазмұны",
    subtitle: "Оқу модулін таңдаңыз",
    module: "Модуль",
    open: "Модульді ашу →",
  },

  EN: {
    title: "Course Contents",
    subtitle: "Choose a learning module",
    module: "Module",
    open: "Open module →",
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export default async function HomePage({
  searchParams,
}: PageProps) {
  const { lang: requestedLang } = await searchParams;

  const rawLang = Array.isArray(requestedLang)
    ? requestedLang[0]
    : requestedLang;

  const lang: Lang =
    rawLang === "KZ" || rawLang === "EN"
      ? rawLang
      : "RU";

  const t = ui[lang];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 36px 70px",
        background: "#f2f7fb",
        color: "#003f73",
      }}
    >
      <section
        id="course"
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {/* Языки */}
        <nav
          aria-label="Language"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          {(["RU", "KZ", "EN"] as const).map((code) => (
            <Link
              key={code}
              href={`/?lang=${code}#course`}
              aria-current={lang === code ? "page" : undefined}
              style={{
                color: "#005b9f",
                fontWeight: lang === code ? 700 : 500,
              }}
            >
              {code}
            </Link>
          ))}
        </nav>

        {/* Заголовок */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              lineHeight: 1.2,
              color: "#004b87",
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              marginTop: "14px",
              fontSize: "18px",
              color: "#60758a",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* 23 модуля */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "18px",
          }}
        >
          {modules[lang].map((title, index) => {
            const moduleNumber = index + 1;

            return (
              <article
                key={moduleNumber}
                style={{
                  background: "#ffffff",
                  border: "1px solid #d5e1eb",
                  borderRadius: "16px",
                  padding: "26px 20px",
                  minHeight: "170px",
                  boxShadow:
                    "0 4px 12px rgba(0, 60, 100, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#7890a6",
                    marginBottom: "10px",
                  }}
                >
                  {t.module} {moduleNumber}
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    lineHeight: 1.35,
                    color: "#003f73",
                  }}
                >
                  {moduleNumber}. {title}
                </h2>

                <Link
                  href={`/modules/${moduleNumber}?lang=${lang}`}
                  style={{
                    display: "inline-block",
                    marginTop: "auto",
                    paddingTop: "16px",
                    color: "#0067ad",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {t.open}
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}