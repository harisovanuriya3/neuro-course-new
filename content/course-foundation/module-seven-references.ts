import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Page indices were checked against the user's Library PDFs on 2026-10-24.
// Guyton & Hall 13e, chapter 55: printed pp. 698–699, PDF pp. 666–667.
// Ganong 23e, chapter 9: printed pp. 157–159, PDF pp. 169–171.
// C. L. Ghai 8e, clinical examination: printed pp. 295–297, PDF pp. 317–319.
// External links are catalogue/publisher or open-learning pages, NOT copies of the uploaded books.
const guidance: Record<Language, {
  introduction: string; guyton: string; ganong: string; ghai: string; open: string; exam: string;
}> = {
  RU: {
    introduction: "Читайте источники в порядке: механизм мышечного веретена и Ia-афферента → организация рефлекторной дуги и реципрокного торможения → техника коленного рефлекса. Печатные страницы отличаются от номеров страниц загруженных PDF. Ссылки на учебники ведут к издателю или каталогу и не обещают бесплатный полный текст; OpenStax доступен для чтения.",
    guyton: "Глава 55, печатные с. 698–699 (PDF с. 666–667): динамическая и статическая чувствительность мышечного веретена, гамма-регуляция, Ia-афферент и моносинаптическая ветвь рефлекса растяжения. Сравните первичные Ia и вторичные II окончания; не называйте весь коленный рефлекс исключительно моносинаптическим, поскольку есть интернейронные ветви.",
    ganong: "Глава 9 «Reflexes», печатные с. 157–159 (PDF с. 169–171): компоненты дуги, мышечные веретёна, сухожильные органы Гольджи и реципрокная иннервация. Центральный возбуждающий синапс Ia→α-мотонейрон использует преимущественно глутамат; ацетилхолин выделяется в нервно-мышечном соединении, а не является медиатором этой центральной связи.",
    ghai: "Раздел Clinical Examination, печатные с. 295–297 (PDF с. 317–319): коленный рефлекс вызывают ударом по связке надколенника, который растягивает четырёхглавую мышцу и её веретёна; рассматриваются положение пациента, расслабление и манёвр Ендрассика. Одна проба не устанавливает уровень или причину поражения; оценка требует сравнения сторон и других неврологических признаков.",
    open: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: открытый обзор соматических рефлексов, реципрокного торможения и ответа мышцы на растяжение. Это учебное объяснение, а не запись индивидуального физиологического эксперимента.",
    exam: "OpenStax, Anatomy & Physiology 2e, §16.4 «The Sensory and Motor Exams»: техника и ограничения исследования глубоких сухожильных рефлексов; коленный ответ зависит от растяжения мышечных веретён. Не используйте этот обзор как самостоятельное диагностическое заключение."
  },
  EN: {
    introduction: "Read in sequence: spindle physiology and Ia afferents → reflex-arc organization and reciprocal inhibition → the knee-jerk examination. Printed page numbers differ from page indices in the uploaded PDFs. Textbook links lead to publisher or catalogue records, not necessarily free full text; OpenStax is openly readable.",
    guyton: "Chapter 55, printed pp. 698–699 (PDF pp. 666–667): dynamic and static muscle-spindle sensitivity, gamma regulation, Ia afferents and the monosynaptic branch of the stretch reflex. Compare primary Ia and secondary II endings; do not call the entire knee-jerk circuit exclusively monosynaptic because interneuronal branches also participate.",
    ganong: "Chapter 9, «Reflexes», printed pp. 157–159 (PDF pp. 169–171): reflex-arc components, muscle spindles, Golgi tendon organs and reciprocal innervation. The central excitatory Ia→alpha-motor-neuron synapse is predominantly glutamatergic; acetylcholine is released at the neuromuscular junction, not at this central synapse.",
    ghai: "Clinical Examination, printed pp. 295–297 (PDF pp. 317–319): a patellar ligament tap stretches the quadriceps and its muscle spindles; patient positioning, relaxation and the Jendrassik maneuver are discussed. A single test cannot identify the lesion level or cause; interpretation requires side-to-side comparison and other neurological signs.",
    open: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: an openly readable overview of somatic reflexes, reciprocal inhibition and the stretch response. It is a teaching account, not a recording of an individual's physiological experiment.",
    exam: "OpenStax, Anatomy & Physiology 2e, §16.4 «The Sensory and Motor Exams»: examination and limitations of deep tendon reflexes; the knee jerk depends on stretching muscle spindles. This overview alone does not establish a diagnosis."
  },
  KZ: {
    introduction: "Дереккөздерді ретімен оқыңыз: бұлшықет ұршығы мен Ia-афференттің физиологиясы → рефлекстік доға және реципроктық тежелу → тізе рефлексін тексеру. Кітаптың баспа беттері жүктелген PDF беттерінен өзгеше. Оқулық сілтемелері баспа немесе каталог жазбасына апарады, тегін толық мәтінге кепілдік бермейді; OpenStax ашық оқылады.",
    guyton: "55-тарау, баспа 698–699-беттер (PDF 666–667-беттер): бұлшықет ұршығының динамикалық және статикалық сезімталдығы, гамма-реттелу, Ia-афферент және созылу рефлексінің моносинапстық тармағы. Бастапқы Ia және екіншілік II ұштарын салыстырыңыз; интернейрондық тармақтар да қатысатындықтан, бүкіл тізе рефлексін тек моносинапстық деп сипаттамаңыз.",
    ganong: "9-тарау «Reflexes», баспа 157–159-беттер (PDF 169–171-беттер): рефлекстік доға бөліктері, бұлшықет ұршықтары, Гольджидің сіңірлік мүшелері және реципроктық иннервация. Орталықтағы Ia→альфа-мотонейрон қоздырғыш синапсында негізінен глутамат әсер етеді; ацетилхолин осы орталық синапста емес, жүйке-бұлшықет түйіспесінде бөлінеді.",
    ghai: "Clinical Examination бөлімі, баспа 295–297-беттер (PDF 317–319-беттер): тізе тобығының байламын соққанда төртбасты бұлшықет пен оның ұршықтары созылады; пациенттің қалпы, босаңсуы және Ендрассик әдісі түсіндіріледі. Бір ғана сынама зақымның деңгейін не себебін анықтамайды; екі жақты салыстыру және өзге неврологиялық белгілер қажет.",
    open: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: соматикалық рефлекстер, реципроктық тежелу және созылуға бұлшықеттің жауабы туралы ашық оқу материалы. Бұл жеке адамның физиологиялық тәжірибесін тіркеу емес.",
    exam: "OpenStax, Anatomy & Physiology 2e, §16.4 «The Sensory and Motor Exams»: терең сіңірлік рефлекстерді тексеру және шектеулері; тізе рефлексі бұлшықет ұршықтарының созылуына тәуелді. Бұл шолу өздігінен диагноз қоюға жеткіліксіз."
  }
};

export function createModuleSevenReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) throw new Error("Module 7 reference base missing");
  const find = (prefix: string) => {
    const record = base.sources!.find(source => source.title.startsWith(prefix));
    if (!record) throw new Error("Module 7 source missing: " + prefix);
    return record;
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
        description: copy.ghai,
        links: [{ section: "clinical" }]
      },
      { ...find("OpenStax · Motor Responses"), description: copy.open, links: [{ section: "interactive" }] },
      {
        title: "OpenStax · The Sensory and Motor Exams (Anatomy & Physiology 2e)",
        href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/16-4-the-sensory-and-motor-exams",
        description: copy.exam,
        links: [{ section: "cases" }]
      }
    ]
  };
}
