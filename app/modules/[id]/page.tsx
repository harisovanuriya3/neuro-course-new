import Link from "next/link";
import { notFound } from "next/navigation";
import CourseNavigation from "../../../components/CourseNavigation";
import DocumentLanguage from "../../../components/DocumentLanguage";
import ModuleSidebar from "../../../components/ModuleSidebar";
import CourseVisitTracker from "../../../components/CourseVisitTracker";
import PageVoiceTools from "../../../components/PageVoiceTools";
import ContinueLearning from "../../../components/ContinueLearning";
import { interfaceText } from "../../../lib/interface";
import styles from "../../CourseLayout.module.css";

import { modules as moduleTitles, isModuleId, type Language as Lang } from "../../../content/course";
import { sections } from "../../../content/sections";
import { getLesson } from "../../../content";

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
    authorName: interfaceText.RU.authorName,
    intro:
      "Начните с короткого знакомства с темой, затем разберитесь в механизме, попробуйте применить знания и проверьте себя. Можно двигаться по порядку или открыть нужный раздел.",
    structure: "Структура модуля",
    sectionCount: "17 учебных разделов",
  },

  KZ: {
    back: "← Курс мазмұнына",
    eyebrow: "НЕЙРОФИЗИОЛОГИЯ БОЙЫНША ИНТЕРАКТИВТІ ОҚУЛЫҚ",
    module: "Модуль",
    author: "Автор",
    authorName: interfaceText.KZ.authorName,
    intro:
      "Алдымен тақырыппен қысқаша танысыңыз, кейін механизмді түсініңіз, білімді қолданып көріңіз және өзіңізді тексеріңіз. Бөлімдерді ретімен де, қажетіне қарай да ашуға болады.",
    structure: "Модуль құрылымы",
    sectionCount: "17 оқу бөлімі",
  },

  EN: {
    back: "← Back to Course Contents",
    eyebrow: "INTERACTIVE TEXTBOOK OF NEUROPHYSIOLOGY",
    module: "Module",
    author: "Author",
    authorName: interfaceText.EN.authorName,
    intro:
      "Start with a quick introduction, understand the mechanism, try using the knowledge, and then check yourself. You can follow the order or open the section you need.",
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
  const stageCopy = {
    RU: { orient:"1. С чего начать", learn:"2. Разобраться", apply:"3. Попробовать", assess:"4. Проверить себя", support:"Полезное", path:"Как пройти модуль", pathHint:"Удобный порядок: сначала познакомьтесь с темой, затем разберитесь, попробуйте применить знания и проверьте себя." },
    KZ: { orient:"1. Неден бастау", learn:"2. Түсіну", apply:"3. Қолданып көру", assess:"4. Өзіңді тексеру", support:"Пайдалы", path:"Модульді қалай өтуге болады", pathHint:"Ыңғайлы рет: тақырыппен танысыңыз, түсініңіз, білімді қолданып көріңіз және өзіңізді тексеріңіз." },
    EN: { orient:"1. Start here", learn:"2. Understand", apply:"3. Try it", assess:"4. Check yourself", support:"Useful extras", path:"How to work through this module", pathHint:"A simple path: get oriented, understand the topic, try using the knowledge, then check yourself." },
  }[lang];
  const stageFor = (slug: string) =>
    ["objectives","pretest"].includes(slug) ? stageCopy.orient :
    ["theory","one-minute","clinical","interactive"].includes(slug) ? stageCopy.learn :
    ["practice","cases","virtual-patient"].includes(slug) ? stageCopy.apply :
    ["tests","questions","progress"].includes(slug) ? stageCopy.assess :
    stageCopy.support;

  return (
    <main
      className={`${styles.page} ${styles.cover}`}
      id="top"
      style={{
        minHeight: "100vh",
        padding: "28px 36px 60px",
        backgroundColor: "#f2f7fb",
        color: "#003f73",
      }}
    >
      <DocumentLanguage language={lang} />
      <CourseVisitTracker moduleId={moduleNumber} />
      <div
        className={styles.sectionShell}
        lang={
          lang === "KZ"
            ? "kk"
            : lang.toLowerCase()
        }
        style={{}}
      >
        <ModuleSidebar moduleNumber={moduleNumber} lang={lang} />
        <div style={{minWidth:0}}>
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
            aria-label={interfaceText[lang].language}
            className={styles.languages}
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

        <PageVoiceTools key={`${id}/${lang}`} moduleId={moduleNumber} language={lang} contentId="top" />

        <ContinueLearning moduleId={moduleNumber} language={lang} />

        <section
          aria-label={stageCopy.path}
          style={{
            marginTop:"18px",
            padding:"18px",
            border:"1px solid #d6e3eb",
            borderRadius:"16px",
            background:"#ffffff",
          }}
        >
          <h2 style={{margin:"0 0 6px",fontSize:"18px",color:"#064a73"}}>{stageCopy.path}</h2>
          <p style={{margin:"0 0 14px",color:"#61798b",lineHeight:1.55}}>{stageCopy.pathHint}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"10px"}}>
            {[stageCopy.orient,stageCopy.learn,stageCopy.apply,stageCopy.assess].map((label,index)=>(
              <div key={label} style={{padding:"12px 14px",borderRadius:"12px",background:"#f2f7fb",color:"#175d86",fontWeight:800}}>
                <span aria-hidden="true">{["🎯","🧠","🧪","✅"][index]} </span>{label}
              </div>
            ))}
          </div>
        </section>

        {/* Титульный блок */}

        <section
          className={styles.title}
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
              "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
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
                      display:"flex",
                      alignItems:"center",
                      gap:"8px",
                      flexWrap:"wrap",
                      color: "#7790a4",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    <span>{String(index + 1).padStart(2,"0")}</span>
                    <span style={{padding:"3px 7px",borderRadius:"999px",background:"#eef5f9",color:"#3b6d8a"}}>{stageFor(item.slug)}</span>
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
                  {moduleNumber > 1 && <p style={{ margin: '10px 0 0', fontSize: '13px', fontWeight: 700, color: '#486477' }}>
                    {getLesson(moduleNumber, item.slug, lang)
                      ? ({ RU: 'Материалы доступны', EN: 'Materials available', KZ: 'Материалдар қолжетімді' }[lang])
                      : item.slug === 'virtual-patient'
                        ? ({ RU: 'Виртуальный пациент готов', EN: 'Virtual patient ready', KZ: 'Виртуалды пациент дайын' }[lang])
                        : item.slug === 'progress'
                          ? ({ RU: 'Прогресс и профиль освоения готовы', EN: 'Progress and mastery profile ready', KZ: 'Прогресс пен меңгеру профилі дайын' }[lang])
                          : item.slug === 'voice'
                            ? ({ RU: 'Задание «Механизм своими словами» готово', EN: 'Explain-the-mechanism task ready', KZ: '«Механизмді өз сөзіңізбен» тапсырмасы дайын' }[lang])
                            : item.slug === 'notes'
                              ? ({ RU: 'Заметки и закладки доступны', EN: 'Notes and bookmarks available', KZ: 'Жазбалар мен бетбелгілер қолжетімді' }[lang])
                              : item.slug === 'interactive' && moduleNumber >= 2
                                ? ({ RU: 'Интерактивная лаборатория готова', EN: 'Interactive laboratory ready', KZ: 'Интерактивті зертхана дайын' }[lang])
                                : ({ RU: 'Содержание готовится', EN: 'Content in preparation', KZ: 'Мазмұны дайындалуда' }[lang])}
                  </p>}
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Единая навигация между 25 модулями */}

        <CourseNavigation
          moduleNumber={moduleNumber}
          lang={lang}
        />
        </div>
      </div>
    </main>
  );
}
