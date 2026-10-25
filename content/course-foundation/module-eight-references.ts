import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Checked against the user's Library PDFs (2026-10-25):
// Guyton & Hall 13e: printed pp. 609–610 / PDF pp. 584–585 (ch. 48);
//   printed pp. 709–710 / PDF pp. 677–678 (ch. 56).
// Ganong 23e: printed pp. 173–174 / PDF pp. 185–186 (ch. 11);
//   printed pp. 242–243 / PDF pp. 254–255 (ch. 16).
// C. L. Ghai Practical Physiology 8e: printed pp. 302–305 / PDF pp. 324–327.
// Ghai's printed p. 304 lists Aγ as a fine-touch afferent; this is inconsistent
// with the standard Aγ motor-to-intrafusal-fiber classification. Flag, do not repeat.
const guidance: Record<Language, {
  introduction: string; guyton: string; ganong: string; ghai: string; sensory: string; motor: string;
}> = {
  RU: {
    introduction: "Читайте в порядке: задние столбы и медиальная петля → антеролатеральная система → пирамидный перекрёст → клиническая проверка модальностей. Печатные страницы отличаются от страниц загруженных PDF. Ссылки на учебники ведут к издателю или каталогу, а не к бесплатному полному тексту; OpenStax открыт для чтения. Схема не заменяет обследование пациента.",
    guyton: "Главы 48 и 56: печатные с. 609–610 (PDF 584–585) — точное осязание, вибрация, сознательная проприоцепция по задним столбам с перекрёстом в продолговатом мозге; боль и температура по антеролатеральной системе с перекрёстом в спинном мозге. Печатные с. 709–710 (PDF 677–678) — корково-спинномозговой путь, пирамидный перекрёст и роль интернейронов. Не переносите сторону дефицита с одного пути на другой без учёта уровня перекрёста.",
    ganong: "Главы 11 и 16: печатные с. 173–174 (PDF 185–186) — тела первичных нейронов в спинномозговых узлах, тонкое/клиновидное ядра, медиальная петля, VPL и соматотопия. Печатные с. 242–243 (PDF 254–255) — нисходящие корково-спинномозговые волокна, преимущественный перекрёст в пирамидах, связи с мотонейронами и интернейронами. Сопоставьте разные уровни перекрёста, прежде чем определять сторону поражения.",
    ghai: "Раздел Clinical Examination, печатные с. 302–305 (PDF 324–327): сравнение заднестолбового и антеролатерального путей, проверка осязания, двухточечной дискриминации, положения суставов и вибрации. Внимание: на печатной с. 304 (PDF 326) Aγ ошибочно указан среди афферентов тонкого осязания; Aγ — преимущественно двигательные волокна к интрафузальным мышечным волокнам. Не используйте эту строку для ответа о сенсорных афферентах. Одной пробы недостаточно для диагноза.",
    sensory: "OpenStax, Anatomy & Physiology 2e, §14.1 «Sensory Perception»: открытый вводный материал о модальностях и сенсорной обработке. Для точной локализации заднестолбового и спиноталамического перекрёстов сверяйтесь с главами 48 Guyton и 11 Ganong; иллюстрация не является клиническим измерением.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: открытое объяснение нисходящего контроля движения. Сопоставьте с пирамидным перекрёстом (Guyton, глава 56; Ganong, глава 16) и не приписывайте все двигательные нарушения исключительно одному тракту."
  },
  EN: {
    introduction: "Read in order: dorsal columns and medial lemniscus → anterolateral system → pyramidal decussation → clinical testing of sensory modalities. Printed page numbers differ from uploaded-PDF page indices. Textbook links lead to publisher or catalogue pages, not free full text; OpenStax is openly readable. A diagram cannot replace examination.",
    guyton: "Chapters 48 and 56: printed pp. 609–610 (PDF 584–585) — discriminative touch, vibration and conscious proprioception ascend in dorsal columns and cross in the medulla; pain and temperature use the anterolateral system with spinal crossing. Printed pp. 709–710 (PDF 677–678) — corticospinal pathway, pyramidal decussation and spinal interneurons. Do not infer the side of a deficit without considering where each pathway crosses.",
    ganong: "Chapters 11 and 16: printed pp. 173–174 (PDF 185–186) — dorsal root ganglia, gracile/cuneate nuclei, medial lemniscus, VPL and somatotopy. Printed pp. 242–243 (PDF 254–255) — corticospinal descent, predominant pyramidal crossing, connections to spinal motor neurons and interneurons. Compare the crossing levels before localizing a lesion.",
    ghai: "Clinical Examination, printed pp. 302–305 (PDF 324–327): comparison of dorsal-column and anterolateral pathways, testing touch, two-point discrimination, joint position and vibration. Caution: printed p. 304 (PDF 326) incorrectly lists Aγ among fine-touch afferents; Aγ fibers are predominantly motor efferents to intrafusal muscle fibers. Do not use that line as a sensory-fiber key. No single sensory test establishes a diagnosis.",
    sensory: "OpenStax, Anatomy & Physiology 2e, §14.1 «Sensory Perception»: open introductory reading on sensory modalities and processing. For the specific levels of dorsal-column and spinothalamic crossing, compare Guyton chapter 48 and Ganong chapter 11. A schematic is not a physiological measurement.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: openly accessible introduction to descending motor control. Compare the pyramidal crossing in Guyton chapter 56 and Ganong chapter 16; not every motor deficit can be attributed to one tract alone."
  },
  KZ: {
    introduction: "Дереккөздерді ретімен оқыңыз: артқы бағандар мен медиалдық ілмек → антеролатералдық жүйе → пирамидалық айқасу → сезімталдық түрлерін клиникалық тексеру. Кітаптың баспа беттері жүктелген PDF беттерінен өзгеше. Оқулық сілтемелері баспа немесе каталог бетіне апарады, тегін толық мәтінге емес; OpenStax ашық оқылады. Сызба науқасты тексеруді алмастырмайды.",
    guyton: "48 және 56-тараулар: баспа 609–610-беттер (PDF 584–585) — ажыратушы жанасу, діріл және саналы проприоцепция артқы бағандармен көтеріліп, сопақша мида айқасады; ауырсыну мен температура антеролатералдық жүйемен өтіп, жұлында айқасады. Баспа 709–710-беттер (PDF 677–678) — қыртыс-жұлын жолы, пирамидалық айқасу және жұлын интернейрондары. Әр жолдың айқасу деңгейін ескермей, бұзылыстың жағын анықтамаңыз.",
    ganong: "11 және 16-тараулар: баспа 173–174-беттер (PDF 185–186) — жұлын түйіндері, нәзік және сына тәрізді ядролар, медиалдық ілмек, VPL және соматотопия. Баспа 242–243-беттер (PDF 254–255) — төмендеуші қыртыс-жұлын талшықтары, пирамидалардағы басым айқасу, мотонейрондармен және интернейрондармен байланыстар. Ошақты анықтамас бұрын айқасу деңгейлерін салыстырыңыз.",
    ghai: "Clinical Examination бөлімі, баспа 302–305-беттер (PDF 324–327): артқы бағандар мен антеролатералдық жолдарды салыстыру, жанасуды, екі нүктені ажыратуды, буын қалпын және дірілді тексеру. Ескерту: баспа 304-бетте (PDF 326) Aγ нәзік жанасудың афференті деп қате көрсетілген; Aγ талшықтары негізінен интрафузалдық бұлшықет талшықтарына баратын қозғалтқыш эфференттер. Бұл жолды сенсорлық талшықтар туралы жауаптың кілті ретінде қолданбаңыз. Бір ғана сынама диагноз қоюға жеткіліксіз.",
    sensory: "OpenStax, Anatomy & Physiology 2e, §14.1 «Sensory Perception»: сезімталдық түрлері мен сенсорлық өңдеу туралы ашық кіріспе. Артқы бағандар мен спиноталамустық жолдың нақты айқасу деңгейлерін Guyton 48-тарауымен және Ganong 11-тарауымен салыстырыңыз. Сызба физиологиялық өлшеу емес.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: төмендеуші қозғалыс бақылауы туралы ашық түсіндірме. Пирамидалық айқасуды Guyton 56-тарауымен және Ganong 16-тарауымен салыстырыңыз; барлық қозғалыс бұзылыстарын тек бір жолмен түсіндіруге болмайды."
  }
};

export function createModuleEightReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) {
    throw new Error("Module 8 references base missing");
  }
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 8 missing bibliography record: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...find("Guyton & Hall"), description: copy.guyton, links: [{ section: "theory" }] },
      { ...find("Ganong"), description: copy.ganong, links: [{ section: "theory" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai, links: [{ section: "clinical" }]
      },
      { ...find("OpenStax · Sensory Perception"), description: copy.sensory, links: [{ section: "interactive" }] },
      { ...find("OpenStax · Motor Responses"), description: copy.motor, links: [{ section: "cases" }] }
    ]
  };
}
