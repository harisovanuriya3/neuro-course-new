import Link from "next/link";
import { notFound } from "next/navigation";

type Lang = "RU" | "KZ" | "EN";

/*
 * Окончательная структура учебника — 23 модуля.
 * Этот список используется для заголовков динамических страниц /modules/[id].
 */
const modules: Record<Lang, string[]> = {
  RU: [
    "Введение в нейрофизиологию",
    "История изучения и методы исследования нервной системы",
    "Нейрон, нейроглия и микросреда нервной ткани",
    "Мембранные процессы и потенциал покоя",
    "Ионные каналы и потенциал действия",
    "Синапсы, нейромедиаторы и нейромодуляция",
    "Возбуждение и торможение",
    "Рефлекторная деятельность и нейронные сети",
    "Проводящие пути нервной системы",
    "Спинной мозг и спинальная регуляция",
    "Ствол мозга и ретикулярная формация",
    "Двигательные системы и контроль движений",
    "Мозжечок",
    "Таламус и таламо-кортикальные системы",
    "Гипоталамус и гомеостаз",
    "Лимбическая система, эмоции и мотивация",
    "Базальные ганглии",
    "Кора больших полушарий и функциональная организация мозга",
    "Сенсорные системы и боль",
    "Вегетативная нервная система",
    "Высшая нервная деятельность",
    "Нейрогуморальная регуляция, сон и биологические ритмы",
    "Пластичность, восстановление и патофизиология нервной системы",
  ],

  KZ: [
    "Нейрофизиологияға кіріспе",
    "Жүйке жүйесін зерттеу тарихы мен әдістері",
    "Нейрон, нейроглия және жүйке тінінің микроортасы",
    "Мембраналық процестер және тыныштық потенциалы",
    "Иондық арналар және әрекет потенциалы",
    "Синапстар, нейромедиаторлар және нейромодуляция",
    "Қозу және тежелу",
    "Рефлекстік қызмет және нейрондық желілер",
    "Жүйке жүйесінің өткізгіш жолдары",
    "Жұлын және жұлындық реттелу",
    "Ми сабауы және ретикулярлық формация",
    "Қозғалыс жүйелері және қозғалысты басқару",
    "Мишық",
    "Таламус және таламо-кортикалық жүйелер",
    "Гипоталамус және гомеостаз",
    "Лимбиялық жүйе, эмоциялар және мотивация",
    "Базальды ганглийлер",
    "Үлкен ми сыңарларының қыртысы және мидың функционалдық ұйымдасуы",
    "Сенсорлық жүйелер және ауырсыну",
    "Вегетативтік жүйке жүйесі",
    "Жоғары жүйке қызметі",
    "Нейрогуморальдық реттелу, ұйқы және биологиялық ырғақтар",
    "Жүйке жүйесінің пластикалығы, қалпына келуі және патофизиологиясы",
  ],

  EN: [
    "Introduction to Neurophysiology",
    "History and Methods of Nervous System Research",
    "Neurons, Neuroglia, and the Neural Microenvironment",
    "Membrane Processes and the Resting Membrane Potential",
    "Ion Channels and the Action Potential",
    "Synapses, Neurotransmitters, and Neuromodulation",
    "Excitation and Inhibition",
    "Reflex Activity and Neural Networks",
    "Neural Pathways",
    "Spinal Cord and Spinal Regulation",
    "Brainstem and Reticular Formation",
    "Motor Systems and Motor Control",
    "Cerebellum",
    "Thalamus and Thalamocortical Systems",
    "Hypothalamus and Homeostasis",
    "Limbic System, Emotion, and Motivation",
    "Basal Ganglia",
    "Cerebral Cortex and Functional Organization of the Brain",
    "Sensory Systems and Pain",
    "Autonomic Nervous System",
    "Higher Nervous Activity",
    "Neurohumoral Regulation, Sleep, and Biological Rhythms",
    "Neural Plasticity, Recovery, and Pathophysiology",
  ],
};

/*
 * Пока сохраняем существующие рабочие маршруты.
 * Новые функции эталонного модуля 1 будем добавлять следующим этапом,
 * не ломая уже работающие страницы.
 */
const sections = [
  "theory",
  "practice",
  "cases",
  "tests",
  "questions",
  "media",
] as const;

const text: Record<
  Lang,
  {
    module: string;
    back: string;
    sections: string[];
  }
> = {
  RU: {
    module: "Модуль",
    back: "← К содержанию курса",
    sections: [
      "Теория",
      "Практика",
      "Ситуационные задачи",
      "Тесты",
      "Вопросы",
      "Медиаматериалы",
    ],
  },

  KZ: {
    module: "Модуль",
    back: "← Курс мазмұнына",
    sections: [
      "Теория",
      "Практика",
      "Ситуациялық тапсырмалар",
      "Тесттер",
      "Сұрақтар",
      "Медиаматериалдар",
    ],
  },

  EN: {
    module: "Module",
    back: "← Course contents",
    sections: [
      "Theory",
      "Practice",
      "Case Studies",
      "Tests",
      "Questions",
      "Media",
    ],
  },
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function ModulePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { lang: requestedLang } = await searchParams;

  const lang: Lang =
    requestedLang === "KZ" || requestedLang === "EN"
      ? requestedLang
      : "RU";

  /*
   * Разрешены только модули 1–23.
   */
  if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id)) {
    notFound();
  }

  const moduleNumber = Number(id);
  const t = text[lang];
  const title = modules[lang][moduleNumber - 1];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#eef5fa",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "32px",
          background: "white",
          borderRadius: "16px",
        }}
      >
        {/* Возврат к содержанию */}
        <Link
          href={`/?lang=${lang}#course`}
          style={{
            color: "#004b87",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          {t.back}
        </Link>

        {/* Переключение языка */}
        <nav
          aria-label="Language"
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          {(["RU", "KZ", "EN"] as const).map((code) => (
            <Link
              key={code}
              href={`/modules/${id}?lang=${code}`}
              aria-current={lang === code ? "page" : undefined}
              style={{
                fontWeight: lang === code ? "bold" : "normal",
                color: "#004b87",
              }}
            >
              {code}
            </Link>
          ))}
        </nav>

        {/* Название модуля */}
        <h1
          style={{
            color: "#004b87",
            marginTop: "28px",
            lineHeight: 1.25,
          }}
        >
          {t.module} {id}. {title}
        </h1>

        {/* Основные разделы */}
        <nav
          aria-label={`${t.module} ${id}`}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginTop: "28px",
          }}
        >
          {sections.map((section, index) => (
            <Link
              key={section}
              href={`/modules/${id}/${section}?lang=${lang}`}
              style={{
                padding: "24px",
                border: "1px solid #d4e0ea",
                borderRadius: "12px",
                color: "#004b87",
                fontWeight: "bold",
                textDecoration: "none",
                background: "#ffffff",
              }}
            >
              {t.sections[index]}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}