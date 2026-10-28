import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Module 13 cerebellar bibliography, evidence checked in Library on 2026-10-28.
// Guyton & Hall 13e, chapter 57: printed pp. 723–725 / PDF pp. 690–692.
// Ganong 23e, chapter 16: printed pp. 256–258 / PDF pp. 268–270.
// C. L. Ghai Practical Physiology 8e, Clinical Examination:
// printed pp. 287–290 / PDF pp. 309–312.
// External URLs link to edition/catalogue records, never uploaded copyrighted PDFs.
type Guidance = { introduction: string; guyton: string; ganong: string; ghai: string; motor: string };
const guidance: Record<Language, Guidance> = {
  "RU": {
    "introduction": "Маршрут чтения: афференты мозжечка и эфферентная копия → мшистые и лазающие волокна → клетки Пуркинье и глубокие ядра → координация и клинические пробы. Печатные страницы и страницы загруженных PDF указаны отдельно, поскольку нумерация различается. Ссылки на Guyton, Ganong и Ghai ведут к карточкам изданий или каталогам, а не к свободным копиям защищённых авторским правом книг; OpenStax доступен открыто. Сопоставляйте физиологический механизм с наблюдением, но не используйте одну пробу или учебную модель для постановки диагноза.",
    "guyton": "Глава 57, печатные с. 723–725 (PDF 690–692): сравните дорсальный спиноцеребеллярный вход с вентральным путём, передающим сведения о спинальных моторных командах (эфферентную копию). Проследите возбуждающие коллатерали афферентов к глубоким ядрам и тормозное влияние корковых клеток Пуркинье. Выходы мозжечка действуют через стволовые и таламокортикальные сети, а не непосредственно сокращают мышцы. Сверьте с теорией и интерактивом.",
    "ganong": "Глава 16, печатные с. 256–258 (PDF 268–270): мшистые волокна возбуждают зернистые клетки, а лазающие приходят из нижней оливы и мощно возбуждают клетки Пуркинье. Параллельные волокна и тормозные интернейроны изменяют активность цепи; клетки Пуркинье ГАМК-ергически тормозят глубокие ядра, получающие также возбуждающие коллатерали. Функциональные отделы мозжечка участвуют в равновесии, движениях конечностей и планировании. Не приравнивайте частоту разрядов одной клетки к силе мышцы.",
    "ghai": "Clinical Examination, печатные с. 287–290 (PDF 309–312): оценка двигательной функции разделяет мышечную силу, тонус, координацию, рефлексы и походку. Сравните пальце-носовую пробу и быстрые чередующиеся движения с проверкой силы против сопротивления: дисметрия не тождественна парезу. Устойчивость зависит от проприоцепции, зрения и вестибулярной системы; проба Ромберга сама по себе не доказывает поражение мозжечка. Практические пробы выполняйте только безопасно и под наблюдением преподавателя.",
    "motor": "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: открытое введение в двигательные корковые области, нисходящие пути и участие мозжечка и базальных ядер в моторных сетях. Используйте как обзор для сопоставления с клиническими примерами, но не как доказательство детальной микросхемы мшистых и лазающих волокон или точной локализации поражения. Для этих механизмов обращайтесь к Guyton и Ganong, а для разделения силы и координации — к Ghai."
  },
  "EN": {
    "introduction": "Reading route: cerebellar afferents and efference copy → mossy and climbing fibres → Purkinje cells and deep nuclei → coordination and clinical examination. Printed pages and uploaded PDF page numbers are given separately because they differ. The Guyton, Ganong and Ghai links open publisher or catalogue records, not freely accessible copies of copyrighted textbooks; OpenStax is openly readable. Connect each mechanism with an observation, but do not treat a single test or teaching model as a clinical diagnosis.",
    "guyton": "Chapter 57, printed pp. 723–725 (PDF 690–692): compare dorsal spinocerebellar input with ventral pathways carrying information about spinal motor commands (efference copy). Trace excitatory afferent collaterals to deep cerebellar nuclei and inhibitory input from Purkinje cells. Cerebellar output influences brainstem and thalamocortical networks rather than directly contracting skeletal muscle. Compare these circuits with the theory and interactive model; neither provides a direct measure of neuronal firing.",
    "ganong": "Chapter 16, printed pp. 256–258 (PDF 268–270): mossy fibres excite granule cells; climbing fibres arise from the inferior olive and strongly excite Purkinje cells. Parallel fibres and inhibitory interneurons shape the circuit. Purkinje cells inhibit deep nuclei through GABAergic output, while the nuclei also receive excitatory afferent collaterals. Functional cerebellar divisions contribute to balance, limb coordination and movement planning. A single cell's firing rate cannot be equated with muscle force.",
    "ghai": "Clinical Examination, printed pp. 287–290 (PDF 309–312): assess strength, tone, coordination, reflexes and gait as distinct components of motor examination. Compare finger-to-nose and rapid alternating movements with resisted strength testing; dysmetria is not synonymous with paresis. Balance also depends on proprioception, vision and vestibular input, so the Romberg test alone does not identify a cerebellar lesion. Perform physical tests safely and only under appropriate instructor supervision.",
    "motor": "OpenStax, Anatomy & Physiology 2e, §14.3 'Motor Responses': an openly accessible overview of motor cortical areas, descending pathways and contributions of the cerebellum and basal nuclei to motor networks. Use it to connect foundational pathways to clinical observations, not as evidence for a detailed mossy/climbing fibre microcircuit or precise lesion localisation. Consult Guyton and Ganong for cerebellar circuitry and Ghai for the distinction between muscle strength and coordination."
  },
  "KZ": {
    "introduction": "Оқу реті: мишықтың афференттері мен эфференттік көшірме → мүкті және өрмелеуші талшықтар → Пуркинье жасушалары мен терең ядролар → қозғалыс үйлесімі және клиникалық сынамалар. Баспа беттері мен жүктелген PDF беттерінің нөмірлері бөлек көрсетілген, өйткені олар сәйкес келмейді. Guyton, Ganong және Ghai сілтемелері авторлық құқықпен қорғалған кітаптардың тегін толық мәтініне емес, басылым не каталог карточкаларына апарады; OpenStax ашық оқылады. Бір ғана сынамаға немесе оқу үлгісіне сүйеніп диагноз қоймаңыз.",
    "guyton": "57-тарау, баспа 723–725-беттер (PDF 690–692): дорсалдық жұлын-мишық жолының сенсорлық кірісін жұлындағы қозғалтқыш команда туралы ақпаратты (эфференттік көшірмені) жеткізетін вентралдық жолмен салыстырыңыз. Афференттердің терең ядроларға қоздырушы тармақтарын және Пуркинье жасушаларының тежеуші әсерін анықтаңыз. Мишықтың шығыстары бұлшықетті тікелей жиырылтпайды, ми бағаны мен таламус-қыртыс желілеріне ықпал етеді. Теория және интерактивті үлгімен салыстырыңыз.",
    "ganong": "16-тарау, баспа 256–258-беттер (PDF 268–270): мүкті талшықтар түйіршікті жасушаларды қоздырады, ал төменгі оливадан келетін өрмелеуші талшықтар Пуркинье жасушаларын күшті қоздырады. Параллель талшықтар мен тежеуші аралық нейрондар контур белсенділігін реттейді. Пуркинье жасушалары терең ядроларды ГАМҚ арқылы тежейді, ал ядролар афференттердің қоздырушы тармақтарын да қабылдайды. Мишықтың функционалдық бөлімдері тепе-теңдікке, аяқ-қол үйлесіміне және қимылды жоспарлауға қатысады.",
    "ghai": "Clinical Examination бөлімі, баспа 287–290-беттер (PDF 309–312): қозғалтқыш функциясын бағалағанда күш, тонус, үйлесім, рефлекстер мен жүрісті бөлек тексеріңіз. Саусақ-мұрын сынамасын және жылдам кезектесетін қимылдарды қарсылыққа қарсы күшті тексерумен салыстырыңыз: дисметрия парезге тең емес. Тепе-теңдік проприоцепцияға, көруге және вестибулярлық жүйеге де тәуелді; Ромберг сынамасы жеке өзі мишық зақымын дәлелдемейді. Сынамаларды қауіпсіз және оқытушының бақылауымен ғана орындаңыз.",
    "motor": "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: қозғалтқыш қыртыс аймақтары, төмендеуші жолдар және мишық пен базальды ядролардың қозғалыс желілеріне қатысуы туралы ашық кіріспе. Бұл материалды клиникалық бақылаулармен салыстыру үшін пайдаланыңыз, бірақ мүкті және өрмелеуші талшықтардың егжей-тегжейлі микросхемасын немесе зақымның нақты орнын дәлелдейтін дерек деп қабылдамаңыз. Мишық контурларын Guyton және Ganong, ал күш пен үйлесімділікті ажыратуды Ghai бойынша нақтылаңыз."
  }
};

export function createModuleThirteenReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) throw new Error("Module 13 references base missing");
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 13 bibliography record missing: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...find("Guyton & Hall"),
        href: "https://www.vitalsource.com/products/lic-guyton-and-hall-textbook-of-medical-john-e-hall-v9780323389303",
        description: copy.guyton, links: [{ section: "theory" }, { section: "interactive" }] },
      { ...find("Ganong"),
        description: copy.ganong, links: [{ section: "theory" }, { section: "glossary" }] },
      { title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai, links: [{ section: "clinical" }, { section: "practice" }] },
      { ...find("OpenStax · Motor Responses"), description: copy.motor,
        links: [{ section: "media" }] }
    ]
  };
}
