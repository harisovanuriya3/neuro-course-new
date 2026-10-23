import Link from "next/link";
import type { Language } from "../content/course";

const localized = {
  RU: {
    title: "Вызванные потенциалы и усреднение сигнала",
    alt: "Инфографика о регистрации вызванных потенциалов, синхронном усреднении, снижении несинхронного шума и сохранении артефакта, синхронного со стимулом.",
    caption: "Усреднение уменьшает несвязанный со стимулом шум приблизительно пропорционально 1/√N, но не позволяет автоматически отличить истинный нервный ответ от повторяющегося синхронного артефакта.",
    theory: "Подробная теория и метод регистрации",
    lab: "Перейти к лаборатории усреднения",
  },
  EN: {
    title: "Evoked potentials and signal averaging",
    alt: "Infographic showing evoked-potential recording, stimulus-locked averaging, reduction of unrelated noise, and persistence of an artifact synchronized with the stimulus.",
    caption: "Averaging reduces noise unrelated to the stimulus approximately in proportion to 1/√N, but it cannot automatically distinguish a true neural response from a repeated stimulus-locked artifact.",
    theory: "Detailed theory and recording method",
    lab: "Open the averaging laboratory",
  },
  KZ: {
    title: "Шақырылған потенциалдар және сигналды орташалау",
    alt: "Шақырылған потенциалдарды тіркеуді, стимулға сәйкестендіріп орташалауды, байланыссыз шудың азаюын және стимулмен синхронды артефактінің сақталуын көрсететін инфографика.",
    caption: "Орташалау стимулға байланыссыз шуды шамамен 1/√N қатынасымен азайтады, бірақ шынайы жүйкелік жауапты қайталанатын синхронды артефактіден автоматты түрде ажыратпайды.",
    theory: "Тіркеу әдісі және толық теория",
    lab: "Орташалау зертханасын ашу",
  },
} as const;

const imageByLanguage: Record<Language, string> = {
  RU: "/images/module2/evoked-averaging-ru.png",
  EN: "/images/module2/evoked-averaging-en.png",
  KZ: "/images/module2/evoked-averaging-kz.png",
};

export default function EvokedPotentialInfographic({ language }: { language: Language }) {
  const text = localized[language];

  return (
    <figure
      id="evoked-potential-infographic"
      aria-labelledby="evoked-potential-infographic-title"
      style={{
        margin: "20px 0",
        padding: "clamp(12px, 2.5vw, 20px)",
        border: "1px solid #b9dce9",
        borderRadius: 16,
        background: "#f5fbfe",
      }}
    >
      <figcaption id="evoked-potential-infographic-title" style={{ marginBottom: 12, fontSize: "1.15rem", fontWeight: 750 }}>
        {text.title}
      </figcaption>
      <img
        src={imageByLanguage[language]}
        alt={text.alt}
        loading="lazy"
        decoding="async"
        style={{ display: "block", width: "100%", height: "auto", borderRadius: 10 }}
      />
      <p style={{ margin: "12px 0", lineHeight: 1.65 }}>{text.caption}</p>
      <nav aria-label={text.title} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Link href={`/modules/2/theory?lang=${language}#evoked-method`}>{text.theory}</Link>
        <Link href={`/modules/2/interactive?lang=${language}#evoked-averaging-lab`}>{text.lab}</Link>
      </nav>
    </figure>
  );
}
