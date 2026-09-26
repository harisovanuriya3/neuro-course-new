import Link from "next/link";
import { notFound } from "next/navigation";
import CourseNavigation from "../../../components/CourseNavigation";

import { modules as moduleTitles, isModuleId, type Language as Lang } from "../../../content/course";
import { sections } from "../../../content/sections";

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

  if (!isModuleId(id)) {
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