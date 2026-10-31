import Link from "next/link";
import DocumentLanguage from "../../components/DocumentLanguage";
import OrganizationAnimation from "../../components/OrganizationAnimation";
import FoundationMediaAnimation from "../../components/FoundationMediaAnimation";
import AnatomyReference from "../../components/AnatomyReference";
import AdvancedAnatomyReference from "../../components/AdvancedAnatomyReference";
import VirtualPatient from "../../components/VirtualPatient";
import UnifiedVirtualPatient from "../../components/UnifiedVirtualPatient";
import VisualPathwayLocalizer from "../../components/VisualPathwayLocalizer";
import FoundationVisual from "../../components/FoundationVisual";
import SechenovExperiment from "../../components/SechenovExperiment";
import { modules, type Language } from "../../content/course";
import styles from "./resources.module.css";

type PageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

const copy = {
  RU: {
    title: "Библиотека интерактивных ресурсов",
    intro: "Все анимации, анатомические материалы, виртуальные лаборатории и виртуальные пациенты собраны по модулям. Те же материалы остаются внутри соответствующих модулей.",
    back: "← К содержанию курса",
    module: "Модуль",
    openModule: "Открыть модуль",
    media: "Медиаматериалы и анимации",
    theory: "Теория и иллюстрации", practice: "Практика и иллюстрации", walkthrough: "Пошаговый разбор (не видеоанимация)",
    lab: "Виртуальная лаборатория",
    patient: "Виртуальный пациент",
    patientPreview: "Открыть виртуального пациента прямо в медиатеке",
    anatomy: "Анатомическая опора",
    expand: "Показать ресурсы модуля",
    note: "Предварительный раздел: визуальные материалы проходят экспертную проверку до публикации.",
  },
  KZ: {
    title: "Интерактивті ресурстар кітапханасы",
    intro: "Барлық анимациялар, анатомиялық материалдар, виртуалды зертханалар және виртуалды пациенттер модульдер бойынша жинақталған. Сол материалдар тиісті модульдердің ішінде де сақталады.",
    back: "← Курс мазмұнына",
    module: "Модуль",
    openModule: "Модульді ашу",
    media: "Медиа және анимациялар",
    theory: "Теория және иллюстрациялар", practice: "Практика және иллюстрациялар", walkthrough: "Кезеңдік түсіндіру (бейнеанимация емес)",
    lab: "Виртуалды зертхана",
    patient: "Виртуалды пациент",
    patientPreview: "Виртуалды пациентті медиатекада ашу",
    anatomy: "Анатомиялық тірек",
    expand: "Модуль ресурстарын көрсету",
    note: "Алдын ала бөлім: визуалды материалдар жарияланғанға дейін сараптамалық тексеруден өтеді.",
  },
  EN: {
    title: "Interactive Resource Library",
    intro: "Animations, anatomical references, virtual laboratories, and virtual patients are organized by module. The same resources remain available inside their corresponding modules.",
    back: "← Back to course contents",
    module: "Module",
    openModule: "Open module",
    media: "Media and animations",
    theory: "Theory and illustrations", practice: "Practice and illustrations", walkthrough: "Step-by-step walkthrough (not video animation)",
    lab: "Virtual laboratory",
    patient: "Virtual patient",
    patientPreview: "Open the virtual patient within the media library",
    anatomy: "Anatomical reference",
    expand: "Show module resources",
    note: "Preview section: visual materials remain under expert review before publication.",
  },
} satisfies Record<Language, Record<string, string>>;

export default async function ResourcesPage({ searchParams }: PageProps) {
  const { lang: requested } = await searchParams;
  const raw = Array.isArray(requested) ? requested[0] : requested;
  const lang: Language = raw === "KZ" || raw === "EN" ? raw : "RU";
  const t = copy[lang];

  return (
    <main className={styles.page}>
      <DocumentLanguage language={lang} />
      <header className={styles.hero}>
        <div className={styles.topline}>
          <Link href={`/?lang=${lang}#course`}>{t.back}</Link>
          <nav aria-label="Language" className={styles.languages}>
            {(["RU", "KZ", "EN"] as const).map(code => (
              <Link key={code} href={`/resources?lang=${code}`} aria-current={lang === code ? "page" : undefined}>{code}</Link>
            ))}
          </nav>
        </div>
        <p className={styles.kicker}>25 × {t.module}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <p className={styles.reviewNote}>{t.note}</p>
      </header>

      <nav className={styles.jump} aria-label={t.title}>
        {modules[lang].map((_, index) => <a key={index} href={`#module-${index + 1}`}>{index + 1}</a>)}
      </nav>

      <div className={styles.grid}>
        {modules[lang].map((title, index) => {
          const moduleId = index + 1;
          return (
            <article className={styles.card} id={`module-${moduleId}`} key={moduleId}>
              <div className={styles.cardHeader}>
                <div>
                  <span>{t.module} {moduleId}</span>
                  <h2>{title}</h2>
                </div>
                <Link className={styles.moduleLink} href={`/modules/${moduleId}?lang=${lang}`}>{t.openModule}</Link>
              </div>

              <div className={styles.actions}>
                <Link href={`/modules/${moduleId}/theory?lang=${lang}`}>{t.theory}</Link>
                <Link href={`/modules/${moduleId}/practice?lang=${lang}`}>{t.practice}</Link>
                <Link href={`/modules/${moduleId}/media?lang=${lang}`}>{t.media}</Link>
                <Link href={`/modules/${moduleId}/interactive?lang=${lang}`}>{t.lab}</Link>
                <Link href={`/modules/${moduleId}/virtual-patient?lang=${lang}`}>{t.patient}</Link>
              </div>

              <details className={styles.preview}>
                <summary>{t.expand}</summary>
                <div className={styles.previewBody}>
                  {moduleId === 1
                    ? <OrganizationAnimation language={lang} />
                    : <section aria-label={t.walkthrough}><p style={{fontWeight:700}}>{t.walkthrough}</p><FoundationMediaAnimation moduleId={moduleId} language={lang} /></section>}
                  {moduleId > 1 && <section className={styles.labPanel} aria-label={t.lab}>
                    <FoundationVisual moduleId={moduleId} language={lang} />
                    {moduleId === 7 && <SechenovExperiment language={lang} />}
                  </section>}
                  <section className={styles.anatomyPanel} aria-label={t.anatomy}>
                    <AnatomyReference moduleId={moduleId} language={lang} />
                    <AdvancedAnatomyReference moduleId={moduleId} language={lang} />
                  </section>
                  <details className={styles.preview}>
                    <summary>{t.patientPreview}</summary>
                    {moduleId === 1 ? <VirtualPatient language={lang} /> : <>{moduleId === 20 && <VisualPathwayLocalizer language={lang} />}<UnifiedVirtualPatient moduleId={moduleId} language={lang} /></>}
                  </details>
                </div>
              </details>
            </article>
          );
        })}
      </div>
    </main>
  );
}
