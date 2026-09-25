import Link from "next/link";
import { notFound } from "next/navigation";

type Lang = "RU" | "KZ" | "EN";

const modules: Record<Lang, string[]> = {
  RU: [
    "Введение",
    "История",
    "Клеточная физиология",
    "Мембранные процессы",
    "Ионные каналы",
    "Синапсы",
    "Возбуждение",
    "Рефлексы",
    "Пути",
    "Спинной мозг",
    "Ретикулярная формация",
    "Ствол мозга",
    "Мозжечок",
    "Таламус",
    "Гипоталамус",
    "Лимбическая система",
    "Миндалина",
    "Кора",
    "Сенсорные системы",
    "Вегетативная система",
    "Высшая деятельность",
    "Нейрогуморальная регуляция",
    "Патофизиология",
  ],

  KZ: [
    "Кіріспе",
    "Тарих",
    "Жасушалық физиология",
    "Мембраналық процестер",
    "Иондық арналар",
    "Синапстар",
    "Қозу",
    "Рефлекстер",
    "Жолдар",
    "Жұлын",
    "Ретикулярлық формация",
    "Ми сабауы",
    "Мишық",
    "Таламус",
    "Гипоталамус",
    "Лимбиялық жүйе",
    "Бадамша дене",
    "Ми қыртысы",
    "Сенсорлық жүйелер",
    "Вегетативтік жүйе",
    "Жоғары жүйке қызметі",
    "Нейрогуморальдық реттелу",
    "Патофизиология",
  ],

  EN: [
    "Introduction",
    "History",
    "Cell Physiology",
    "Membrane Processes",
    "Ion Channels",
    "Synapses",
    "Excitation",
    "Reflexes",
    "Pathways",
    "Spinal Cord",
    "Reticular Formation",
    "Brainstem",
    "Cerebellum",
    "Thalamus",
    "Hypothalamus",
    "Limbic System",
    "Amygdala",
    "Cerebral Cortex",
    "Sensory Systems",
    "Autonomic Nervous System",
    "Higher Nervous Activity",
    "Neurohumoral Regulation",
    "Pathophysiology",
  ],
};

const sections = ["theory", "practice", "cases", "tests", "questions", "media"] as const;
const text = {
  RU: { module: "Модуль", back: "← К содержанию курса", sections: ["Теория", "Практика", "Ситуационные задачи", "Тесты", "Вопросы", "Медиаматериалы"] },
  KZ: { module: "Модуль", back: "← Курс мазмұнына", sections: ["Теория", "Практика", "Ситуациялық тапсырмалар", "Тесттер", "Сұрақтар", "Медиаматериалдар"] },
  EN: { module: "Module", back: "← Course contents", sections: ["Theory", "Practice", "Case studies", "Tests", "Questions", "Media"] },
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { lang: requestedLang } = await searchParams;
  const lang: Lang = requestedLang === "KZ" || requestedLang === "EN" ? requestedLang : "RU";
  if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id)) notFound();
  const t = text[lang];
  const title = modules[lang][Number(id) - 1];

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#eef5fa" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px", background: "white", borderRadius: "16px" }}>
        <Link href={`/?lang=${lang}#course`} style={{ color: "#004b87", fontWeight: "bold" }}>{t.back}</Link>
        <nav aria-label="Language" style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
          {(["RU", "KZ", "EN"] as const).map((code) => (
            <Link key={code} href={`/modules/${id}?lang=${code}`} aria-current={lang === code ? "page" : undefined}>{code}</Link>
          ))}
        </nav>
        <h1 style={{ color: "#004b87" }}>{t.module} {id}. {title}</h1>
        <nav aria-label={t.module} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "24px" }}>
          {sections.map((section, index) => (
            <Link key={section} href={`/modules/${id}/${section}?lang=${lang}`} style={{ padding: "24px", border: "1px solid #d4e0ea", borderRadius: "12px", color: "#004b87", fontWeight: "bold", textDecoration: "none" }}>
              {t.sections[index]}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
