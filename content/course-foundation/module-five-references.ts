import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Verified against the user's Library copies. Page numbers refer to the
// printed books and, separately, the uploaded PDFs. URLs are catalogue records.
const copy: Record<Language, { intro: string; descriptions: [string,string,string] }> = {
  RU: {
    intro: "Три проверенных учебника по синаптической передаче. Печатные страницы и страницы загруженных PDF указаны отдельно. Ссылки ведут к библиографическим записям, а не к бесплатному полному тексту. Не переносите результаты изолированного нервно-мышечного препарата на все центральные синапсы.",
    descriptions: [
      "Глава 46, печатные с. 580–583 (PDF с. 556–559): химические и электрические синапсы, щелевые контакты, пресинаптический Ca²⁺, ионотропные и метаботропные рецепторы. Глава 7, с. 90–92 (PDF с. 97–99): нервно-мышечное соединение, ацетилхолин и локальный потенциал концевой пластинки, который не следует путать с распространяющимся потенциалом действия мышцы.",
      "Глава 6, печатные с. 115–118 (PDF с. 127–130): химическая и электрическая передача, активные зоны, синаптические везикулы и Ca²⁺-зависимое выделение медиатора. Различайте наблюдение и вывод о механизме.",
      "Опыт 4-9, печатные с. 331–332 (PDF с. 353–354): повторная стимуляция нерва и прямая стимуляция мышцы в изолированном препарате. Не является прямым измерением центрального синапса и не доказывает единую причину утомления человека."
    ]
  },
  EN: {
    intro: "Three verified synaptic-transmission textbooks. Printed and uploaded-PDF page numbers are given separately. Links lead to bibliographic records, not free full texts. Do not generalize an isolated nerve–muscle preparation to all central synapses.",
    descriptions: [
      "Chapter 46, printed pp. 580–583 (PDF pp. 556–559): chemical/electrical synapses, gap junctions, presynaptic Ca²⁺ and receptor types. Chapter 7, pp. 90–92 (PDF pp. 97–99): acetylcholine at the neuromuscular junction and the local end-plate potential, which is not a propagating muscle action potential.",
      "Chapter 6, printed pp. 115–118 (PDF pp. 127–130): chemical and electrical transmission, active zones, synaptic vesicles and Ca²⁺-dependent transmitter release. Distinguish observations from mechanistic inferences.",
      "Experiment 4-9, printed pp. 331–332 (PDF pp. 353–354): repeated nerve stimulation and direct muscle stimulation in an isolated preparation. This does not directly measure central synapses or prove a universal cause of human fatigue."
    ]
  },
  KZ: {
    intro: "Синапстық берілу туралы тексерілген үш оқулық. Баспа беттері мен жүктелген PDF беттері бөлек көрсетілген. Сілтемелер тегін толық мәтінге емес, библиографиялық жазбаларға апарады. Оқшауланған жүйке-бұлшықет препаратының нәтижелерін барлық орталық синапстарға жалпыламаңыз.",
    descriptions: [
      "46-тарау, баспа 580–583-беттер (PDF 556–559-беттер): химиялық және электрлік синапстар, саңылаулы түйіспелер, пресинапстық Ca²⁺ және рецептор түрлері. 7-тарау, 90–92-беттер (PDF 97–99-беттер): жүйке-бұлшықет түйіспесіндегі ацетилхолин және соңғы пластинканың жергілікті потенциалы; ол бұлшықеттің таралатын әрекет потенциалы емес.",
      "6-тарау, баспа 115–118-беттер (PDF 127–130-беттер): химиялық және электрлік берілу, белсенді аймақтар, синапстық көпіршіктер және Ca²⁺-ке тәуелді медиатор бөлінуі. Бақылау мен механизм туралы қорытындыны ажыратыңыз.",
      "4-9-тәжірибе, баспа 331–332-беттер (PDF 353–354-беттер): оқшауланған препаратта жүйкені қайталап және бұлшықетті тікелей қоздыру. Бұл орталық синапсты тікелей өлшемейді әрі адамдағы шаршаудың жалғыз себебін дәлелдемейді."
    ]
  }
};

export function createModuleFiveReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) throw new Error("Module 5 references base missing");
  const guyton = base.sources.find(source => source.title.startsWith("Guyton & Hall"));
  const ganong = base.sources.find(source => source.title.startsWith("Ganong"));
  if (!guyton || !ganong) throw new Error("Module 5 verified textbook records missing");
  const c = copy[language];
  return {
    ...base,
    introduction: c.intro,
    sources: [
      { ...guyton, description: c.descriptions[0], links: [{ section: "theory" }] },
      { ...ganong, description: c.descriptions[1], links: [{ section: "interactive" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: c.descriptions[2],
        links: [{ section: "cases" }]
      }
    ]
  };
}
