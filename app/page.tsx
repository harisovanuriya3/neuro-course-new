import Link from "next/link";

type Lang = "RU" | "KZ" | "EN";

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