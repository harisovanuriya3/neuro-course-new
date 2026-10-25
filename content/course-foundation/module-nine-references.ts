import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Module 9 bibliography, checked against the user's Library copies on 2026-10-26.
// Guyton & Hall 13e, ch. 55: printed pp. 702–703 / PDF pp. 670–671
// (flexor withdrawal, reciprocal inhibition, crossed extension), and
// printed p. 705 / PDF p. 673 (spinal shock).
// Ganong 23e, ch. 9: printed pp. 157–158 / PDF pp. 169–170
// (reflex arc, spindle Ia afferents and alpha motoneurons);
// ch. 16: printed p. 249 / PDF p. 261 (spinal shock).
// C. L. Ghai Practical Physiology 8e: printed pp. 295–297 / PDF pp. 317–319
// (patellar reflex, muscle spindles, examination and reinforcement).
// Publisher/catalogue links are not links to uploaded copyrighted PDFs.
type Guidance = {
  introduction: string; guyton: string; ganong: string;
  ghai: string; cns: string; motor: string;
};
const guidance: Record<Language, Guidance> = {
  RU: {
    introduction: "Читайте последовательно: Ia-афферент мышечного веретена и моносинаптическая ветвь коленного рефлекса → интернейронное реципрокное торможение → полисинаптическое отдёргивание → временная динамика спинального шока. Номера печатных страниц и страниц PDF различаются. Книги открываются как карточки издателя или каталога, а не как свободный полный текст. Иллюстрация и один рефлекторный тест не устанавливают диагноз.",
    guyton: "Глава 55, печатные с. 702–703 (PDF 670–671): защитное отдёргивание включает интернейронные цепи, возбуждение подходящих мышц и торможение антагонистов; перекрёстное разгибание противоположной конечности возможно, но не обязательно при каждом ответе. Печатная с. 705 (PDF 673): после тяжёлого перерыва нисходящих влияний спинальные рефлексы первоначально угнетаются и затем могут возвращаться. Возвращение рефлекса не означает восстановления произвольного движения.",
    ganong: "Глава 9, печатные с. 157–158 (PDF 169–170): рефлекторная дуга, мышечное веретено и прямой возбуждающий Ia→α-мотонейронный синапс, использующий глутамат; ветви с интернейронами не являются моносинаптическими. Глава 16, печатная с. 249 (PDF 261): при спинальном шоке угнетение рефлексов сменяется их постепенным возвращением; скорость и выраженность ответа различаются. Не смешивайте спинальный шок с гемодинамическим нейрогенным шоком.",
    ghai: "Раздел Clinical Examination, печатные с. 295–297 (PDF 317–319): удар по связке надколенника растягивает четырёхглавую мышцу и её мышечные веретёна, а не активирует непосредственно сухожильный орган Гольджи. Описаны сравнение сторон, расслабление и манёвр Ендрассика. Изолированный слабый или сильный ответ не определяет место поражения и не заменяет неврологическое обследование.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: доступный обзор сегментарной организации спинного мозга, задних и передних корешков. Сопоставьте с клиническим разделом модуля 9; общая схема не измеряет рефлекторную латентность.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: открытый обзор соматических рефлексов, реципрокного торможения и нисходящего контроля. Для полисинаптического отдёргивания и спинального шока используйте соответствующие страницы Guyton и Ganong; не трактуйте учебную анимацию как ЭМГ."
  },
  EN: {
    introduction: "Read in sequence: muscle-spindle Ia afferents and the monosynaptic knee-jerk branch → interneuron-mediated reciprocal inhibition → polysynaptic withdrawal → the time course of spinal shock. Printed pages and uploaded-PDF page indices differ. Textbook links lead to publisher or catalogue records, not free full text. Neither a schematic nor a single reflex test establishes a diagnosis.",
    guyton: "Chapter 55, printed pp. 702–703 (PDF 670–671): protective withdrawal recruits interneuronal circuits, appropriate muscle activation and inhibition of antagonists; contralateral crossed extension may occur but is not obligatory with every response. Printed p. 705 (PDF 673): spinal reflexes are initially depressed after severe loss of descending drive and may return later. Reflex recovery does not establish recovery of voluntary movement.",
    ganong: "Chapter 9, printed pp. 157–158 (PDF 169–170): reflex-arc components, muscle spindles and the direct excitatory glutamatergic Ia→alpha-motoneuron synapse; branches with interneurons are not monosynaptic. Chapter 16, printed p. 249 (PDF 261): reflex depression during spinal shock is followed by variable recovery. Distinguish spinal shock from hemodynamic neurogenic shock.",
    ghai: "Clinical Examination, printed pp. 295–297 (PDF 317–319): tapping the patellar ligament stretches quadriceps muscle spindles rather than directly activating Golgi tendon organs. The text discusses side-to-side comparison, relaxation and the Jendrassik maneuver. One weak or brisk response cannot localize a lesion and is not a substitute for neurological examination.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: openly readable overview of spinal segments, dorsal roots and ventral roots. Compare with module 9 clinical content; the diagram does not measure reflex latency.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: open overview of somatic reflexes, reciprocal inhibition and descending control. For polysynaptic withdrawal and spinal shock, consult the targeted Guyton and Ganong pages; an educational animation is not EMG."
  },
  KZ: {
    introduction: "Дереккөздерді ретімен оқыңыз: бұлшықет ұршығының Ia-афференті және тізе рефлексінің моносинапстық тармағы → интернейрон арқылы реципроктық тежелу → полисинапстық қорғаныштық тартып алу → жұлындық шоктың уақыт бойынша өзгеруі. Баспа беттері мен жүктелген PDF беттерінің нөмірлері әртүрлі. Оқулық сілтемелері баспа не каталог жазбасына апарады, тегін толық мәтінге емес. Сызба да, жеке рефлекс сынамасы да диагноз қоймайды.",
    guyton: "55-тарау, баспа 702–703-беттер (PDF 670–671): қорғаныштық тартып алу интернейрондық тізбектерді, тиісті бұлшықеттердің қозуын және антагонистердің тежелуін қамтиды; қарама-қарсы аяқтың айқаспалы жазылуы болуы мүмкін, бірақ әр жауапта міндетті емес. Баспа 705-бет (PDF 673): төмендеуші ықпал күрт үзілгеннен кейін жұлын рефлекстері алдымен бәсеңдеп, кейін қайта пайда болуы мүмкін. Рефлекстің қалпына келуі ерікті қозғалыстың қалпына келгенін дәлелдемейді.",
    ganong: "9-тарау, баспа 157–158-беттер (PDF 169–170): рефлекстік доға, бұлшықет ұршығы және глутамат арқылы қоздыратын тікелей Ia→альфа-мотонейрон синапсы; интернейрон қатысатын тармақтар моносинапстық емес. 16-тарау, баспа 249-бет (PDF 261): жұлындық шок кезінде рефлекстер бәсеңдеп, кейін әртүрлі жылдамдықпен қалпына келеді. Жұлындық шокты қанайналымдық нейрогендік шокпен шатастырмаңыз.",
    ghai: "Clinical Examination бөлімі, баспа 295–297-беттер (PDF 317–319): тізе тобығының байламын соққанда төртбасты бұлшықет пен оның ұршықтары созылады; Гольджидің сіңірлік мүшесі тікелей қоздырылмайды. Екі жақты салыстыру, босаңсу және Ендрассик әдісі түсіндіріледі. Бір ғана әлсіз не күшейген рефлекс зақым орнын анықтамайды және неврологиялық тексеруді алмастырмайды.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: жұлын сегменттері, артқы және алдыңғы түбіршектер туралы ашық шолу. 9-модульдің клиникалық бөлімімен салыстырыңыз; сызба рефлекстің латенттілігін өлшемейді.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: соматикалық рефлекстер, реципроктық тежелу және төмендеуші бақылау туралы ашық материал. Полисинапстық тартып алу мен жұлындық шок үшін Guyton және Ganong-тың көрсетілген беттерін қараңыз; оқу анимациясы ЭМГ емес."
  }
};

export function createModuleNineReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) {
    throw new Error("Module 9 reference base missing");
  }
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 9 bibliography record missing: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...find("Guyton & Hall"), description: copy.guyton, links: [{ section: "theory" }] },
      { ...find("Ganong"), description: copy.ganong, links: [{ section: "clinical" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai, links: [{ section: "practice" }]
      },
      { ...find("OpenStax · The Central Nervous System"), description: copy.cns, links: [{ section: "theory" }] },
      { ...find("OpenStax · Motor Responses"), description: copy.motor, links: [{ section: "interactive" }] }
    ]
  };
}
