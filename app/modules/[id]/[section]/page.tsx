import Link from "next/link";
import { notFound } from "next/navigation";

import { getLesson } from "../../../../content";
import { isModuleId, type Language as Lang } from "../../../../content/course";
import { isSection, getSectionTitle, sectionOrder } from "../../../../content/sections";

import SectionContent from "../../../../components/SectionContent";
import CourseNavigation from "../../../../components/CourseNavigation";

const text = {
  RU: {
    module: "Модуль",
    back: "← Назад к модулю",
    pending: "Материалы раздела готовятся.",
  },

  KZ: {
    module: "Модуль",
    back: "← Модульге оралу",
    pending: "Бөлім материалдары дайындалуда.",
  },

  EN: {
    module: "Module",
    back: "← Back to module",
    pending: "Section materials are being prepared.",
  },
};

type PageProps = {
  params: Promise<{
    id: string;
    section: string;
  }>;

  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export default async function SectionPage({
  params,
  searchParams,
}: PageProps) {
  const { id, section } = await params;
  const { lang: requestedLang } = await searchParams;

  const rawLang = Array.isArray(requestedLang)
    ? requestedLang[0]
    : requestedLang;

  const lang: Lang =
    rawLang === "KZ" || rawLang === "EN"
      ? rawLang
      : "RU";

  const moduleNumber = Number(id);

  if (!isModuleId(id) || !isSection(section)) {
    notFound();
  }

  const t = text[lang];
  const sectionIndex = sectionOrder.indexOf(section);

  const lesson = getLesson(moduleNumber, section, lang);

  return (
    <main
      id="top"
      style={{
        minHeight: "100vh",
        padding: "40px 20px 60px",
        background:
          "linear-gradient(180deg, #eef5fa 0%, #f8fbfd 100%)",
      }}
    >
      <div
        lang={
          lang === "KZ"
            ? "kk"
            : lang.toLowerCase()
        }
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            padding: "clamp(22px, 4vw, 36px)",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #dce8ef",
            boxShadow:
              "0 8px 25px rgba(28, 72, 102, 0.06)",
          }}
        >
          {/* НАЗАД К ТИТУЛУ МОДУЛЯ */}

          <Link
            href={`/modules/${id}?lang=${lang}`}
            style={{
              color: "#004b87",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {t.back}
          </Link>

          {/* ЯЗЫК */}

          <nav
            aria-label="Language"
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "24px",
              marginBottom: "28px",
              flexWrap: "wrap",
            }}
          >
            {(["RU", "KZ", "EN"] as const).map(
              (code) => (
                <Link
                  key={code}
                  href={`/modules/${id}/${section}?lang=${code}`}
                  aria-current={
                    lang === code
                      ? "page"
                      : undefined
                  }
                  style={{
                    minWidth: "42px",
                    padding: "7px 11px",
                    textAlign: "center",
                    borderRadius: "9px",
                    textDecoration: "none",
                    fontWeight: 700,
                    background:
                      lang === code
                        ? "#005b96"
                        : "#f3f7fa",
                    color:
                      lang === code
                        ? "#ffffff"
                        : "#526b80",
                    border:
                      lang === code
                        ? "1px solid #005b96"
                        : "1px solid #d7e5ed",
                  }}
                >
                  {code}
                </Link>
              )
            )}
          </nav>

          {/* НОМЕР РАЗДЕЛА */}

          <div
            style={{
              display: "inline-block",
              marginBottom: "14px",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "#eaf5fa",
              color: "#236b8e",
              fontSize: "13px",
              fontWeight: 800,
            }}
          >
            {String(sectionIndex + 1).padStart(
              2,
              "0"
            )}{" "}
            / {sectionOrder.length}
          </div>

          {/* СУЩЕСТВУЮЩИЙ КОНТЕНТ */}

          {lesson ? (
            <>
              <SectionContent
                key={`${id}/${section}/${lang}`}
                lesson={lesson}
                moduleId={id}
                language={lang}
              />
            </>
          ) : (
            <>
              <p
                style={{
                  margin: "0 0 8px",
                  color: "#607b8d",
                  fontWeight: 700,
                }}
              >
                {t.module} {moduleNumber}
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  color: "#004b87",
                  fontSize:
                    "clamp(1.6rem, 4vw, 2.2rem)",
                  lineHeight: 1.3,
                }}
              >
                {getSectionTitle(section, lang)}
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#526b80",
                  lineHeight: 1.7,
                }}
              >
                {t.pending}
              </p>
            </>
          )}
        </div>

        {/* ЕДИНАЯ НАВИГАЦИЯ:
            17 РАЗДЕЛОВ + 23 МОДУЛЯ */}

        <CourseNavigation
          moduleNumber={moduleNumber}
          lang={lang}
          currentSection={section}
        />
      </div>
    </main>
  );
}
