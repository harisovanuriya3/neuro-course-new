import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "../../../../content";
import type { Section } from "../../../../content/types";
import LessonContent from "../../../../components/LessonContent";
import PracticeContent from "../../../../components/PracticeContent";
import CasesContent from "../../../../components/CasesContent";

const sections = ["theory", "practice", "cases", "tests", "questions", "media"];
const text = {
  RU: { module: "Модуль", back: "← Назад к модулю", pending: "Материалы раздела готовятся.", sections: ["Теория", "Практика", "Ситуационные задачи", "Тесты", "Вопросы", "Медиаматериалы"] },
  KZ: { module: "Модуль", back: "← Модульге оралу", pending: "Бөлім материалдары дайындалуда.", sections: ["Теория", "Практика", "Ситуациялық тапсырмалар", "Тесттер", "Сұрақтар", "Медиаматериалдар"] },
  EN: { module: "Module", back: "← Back to module", pending: "Section materials are being prepared.", sections: ["Theory", "Practice", "Case studies", "Tests", "Questions", "Media"] },
};

type PageProps = {
  params: Promise<{ id: string; section: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function SectionPage({ params, searchParams }: PageProps) {
  const { id, section } = await params;
  const { lang: requestedLang } = await searchParams;
  const lang = requestedLang === "KZ" || requestedLang === "EN" ? requestedLang : "RU";
  const sectionIndex = sections.indexOf(section);
  if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id) || sectionIndex === -1) notFound();
  const t = text[lang];
  const lesson = getLesson(Number(id), section as Section, lang);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#eef5fa" }}>
      <div lang={lang === "KZ" ? "kk" : lang.toLowerCase()} style={{ maxWidth: "900px", margin: "0 auto", padding: lesson ? "clamp(16px, 4vw, 32px)" : "32px", background: "white", borderRadius: "16px" }}>
        <Link href={`/modules/${id}?lang=${lang}`} style={{ color: "#004b87", fontWeight: "bold" }}>{t.back}</Link>
        <nav aria-label="Language" style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
          {(["RU", "KZ", "EN"] as const).map((code) => (
            <Link key={code} href={`/modules/${id}/${section}?lang=${code}`} aria-current={lang === code ? "page" : undefined}>{code}</Link>
          ))}
        </nav>
        {lesson ? (
          <>
            {"kind" in lesson && <p style={{ color: "#526b80", fontWeight: "bold" }}>{lesson.moduleTitle}</p>}
            <h1 style={{ color: "#004b87", fontSize: "clamp(1.5rem, 4vw, 2rem)", lineHeight: 1.3 }}>{lesson.title}</h1>
            <p style={{ color: "#526b80", fontWeight: "bold" }}>{t.sections[sectionIndex]}</p>
            {"kind" in lesson && lesson.kind === "cases" ? <CasesContent key={`${id}/${section}/${lang}`} lesson={lesson} /> : "kind" in lesson ? (
              <>
                <Link href={`/modules/${id}/theory?lang=${lang}`}>{lesson.ui.theory}</Link>
                <PracticeContent key={`${id}/${section}/${lang}`} lesson={lesson} language={lang} />
              </>
            ) : <LessonContent lesson={lesson} />}
          </>
        ) : (
          <>
            <h1 style={{ color: "#004b87" }}>{t.module} {id}: {t.sections[sectionIndex]}</h1>
            <p>{t.pending}</p>
          </>
        )}
      </div>
    </main>
  );
}
