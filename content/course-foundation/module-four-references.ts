import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Verified in the user's Library copies:
// Guyton & Hall 13e: PDF 69–71, printed pp. 62–64 (chapter 5).
// Ganong 23e: PDF 96–98, printed pp. 84–86 (chapter 4).
// C. L. Ghai 8e: PDF 379–381, printed pp. 357–359 (chart 5-5).
// Links below lead to bibliographic/publisher records, not licensed full text.
const descriptions: Record<Language, [string, string, string]> = {
  RU: [
    "Глава 5, с. 62–64 (PDF с. 69–71): потенциалы Нернста и Гольдмана, избирательная проницаемость, вклад Na⁺/K⁺-АТФазы. Значение около −90 мВ приведено для крупного нервного волокна, а не как единая норма всех нейронов.",
    "Глава 4, с. 84–86 (PDF с. 96–98): потенциал покоя около −70 мВ для типичного нейрона, Na⁺- и K⁺-проводимости при импульсе, закон «всё или ничего». Сравните клеточный тип и условия записи, прежде чем сопоставлять численные значения.",
    "Таблица/схема 5-5, с. 357–359 (PDF с. 379–381): микроэлектродная регистрация, фазы потенциала действия и рефрактерность. Это запись и объяснение физиологического сигнала, а не прогноз ЭКГ при гиперкалиемии."
  ],
  EN: [
    "Chapter 5, pp. 62–64 (PDF pp. 69–71): Nernst and Goldman potentials, selective permeability and the Na⁺/K⁺-ATPase contribution. The approximately −90 mV example concerns a large nerve fibre; it is not a universal value for every neuron.",
    "Chapter 4, pp. 84–86 (PDF pp. 96–98): approximately −70 mV in a typical resting neuron, Na⁺ and K⁺ conductances during a spike, and the all-or-none principle. Consider cell type and recording conditions before comparing values.",
    "Chart 5-5, pp. 357–359 (PDF pp. 379–381): microelectrode recording, action-potential phases and refractoriness. This describes a physiological recording, not an ECG prediction in hyperkalemia."
  ],
  KZ: [
    "5-тарау, 62–64-беттер (PDF 69–71-беттер): Нернст пен Гольдман потенциалдары, таңдамалы өткізгіштік және Na⁺/K⁺-АТФазаның үлесі. Шамамен −90 мВ мәні ірі жүйке талшығына қатысты; ол барлық нейронға ортақ норма емес.",
    "4-тарау, 84–86-беттер (PDF 96–98-беттер): әдеттегі нейронның тыныштық потенциалы шамамен −70 мВ, импульс кезіндегі Na⁺ және K⁺ өткізгіштігі, «бәрі немесе ештеңе» қағидасы. Сандарды салыстырғанда жасуша түрі мен тіркеу жағдайын ескеріңіз.",
    "5-5-схема, 357–359-беттер (PDF 379–381-беттер): микроэлектродпен тіркеу, әрекет потенциалының фазалары және рефрактерлік. Бұл физиологиялық сигналды сипаттайды, гиперкалиемия кезіндегі ЭКГ-ны болжамайды."
  ]
};

const introductions: Record<Language, string> = {
  RU: "Три проверенных источника по мембранным потенциалам. Указаны печатные страницы и страницы загруженных PDF: они различаются. Внешние ссылки ведут к библиографическим записям, а не к бесплатным полным текстам. Числа −70 и −90 мВ относятся к разным клеточным примерам.",
  EN: "Three checked references on membrane potentials. Printed pages and pages in the uploaded PDFs are both given because they differ. External links are bibliographic records, not free full text. Values of −70 and −90 mV describe different cell examples.",
  KZ: "Мембраналық потенциалдар туралы тексерілген үш дереккөз. Кітаптың баспа беттері мен жүктелген PDF беттері бөлек көрсетілген. Сыртқы сілтемелер тегін толық мәтінге емес, библиографиялық жазбаларға апарады. −70 және −90 мВ мәндері әртүрлі жасушалық мысалдарға қатысты."
};

export function createModuleFourReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) {
    throw new Error("Module 4 references base missing");
  }
  const guyton = base.sources.find(source => source.title.startsWith("Guyton & Hall"));
  const ganong = base.sources.find(source => source.title.startsWith("Ganong"));
  if (!guyton || !ganong) throw new Error("Module 4 bibliographic source missing");
  const [guytonDescription, ganongDescription, ghaiDescription] = descriptions[language];
  return {
    ...base,
    introduction: introductions[language],
    sources: [
      { ...guyton, description: guytonDescription, links: [{ section: "theory" }] },
      { ...ganong, description: ganongDescription, links: [{ section: "interactive" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: ghaiDescription,
        links: [{ section: "clinical" }]
      }
    ]
  };
}
