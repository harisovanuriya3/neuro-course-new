import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// The printed page numbers and the user's uploaded PDF page indices differ.
// Guyton & Hall 13e: ch. 46, printed 583–584; PDF 559–560.
// Ganong 23e: ch. 6, printed 120–122; PDF 132–134.
// C. L. Ghai 8e: expt. 4-9, printed 331–332; PDF 353–354.
// Ghai describes an isolated nerve–muscle preparation, NOT CNS EPSP/IPSP recordings.
const guidance: Record<Language, { introduction: string; guyton: string; ganong: string; ghai: string }> = {
  RU: {
    introduction: "Для изучения возбуждения и торможения сопоставьте два учебника медицинской физиологии. Третий источник — практикум: его опыт на изолированном нервно-мышечном препарате служит примером границ экспериментального вывода, но не является доказательством центральной синаптической суммации. Указаны печатные страницы и отдельно страницы загруженных PDF. Внешние ссылки ведут к издателю или каталогу, а не обязательно к бесплатному полному тексту.",
    guyton: "Глава 46, печатные с. 583–584 (PDF с. 559–560): ионотропные и метаботропные механизмы, увеличение K⁺-проводимости и Cl⁻-проводимости при торможении. Упрощённое описание входа Cl⁻ в учебнике нельзя переносить на любой нейрон: направление тока и изменение Vm зависят от E(Cl), исходного Vm и шунтирования.",
    ganong: "Глава 6, печатные с. 120–122 (PDF с. 132–134): временная и пространственная суммация ВПСП/ТПСП; реверсия ответа при E(Cl); запуск потенциала действия в начальном сегменте аксона; пресинаптическое и постсинаптическое торможение. На с. 122 (PDF 134) описаны GABA_A-зависимая Cl⁻-проводимость и GABA_B-зависимые механизмы пресинаптической регуляции.",
    ghai: "Опыт 4-9, печатные с. 331–332 (PDF с. 353–354): повторная стимуляция нерва и прямая стимуляция мышцы в изолированном нервно-мышечном препарате. Наблюдаемое утомление этого препарата нельзя считать прямой регистрацией ВПСП/ТПСП в ЦНС или универсальным объяснением утомления человека."
  },
  EN: {
    introduction: "Use two medical-physiology textbooks to study excitation and inhibition. The third source is a practical-physiology text: its isolated nerve–muscle experiment illustrates limits of experimental inference but does not demonstrate central synaptic summation. Printed pages and uploaded-PDF pages are given separately. External links lead to a publisher or catalogue, not necessarily free full text.",
    guyton: "Chapter 46, printed pp. 583–584 (PDF pp. 559–560): ionotropic and metabotropic mechanisms, increased K⁺ or Cl⁻ conductance in inhibition. The textbook's simplified account of Cl⁻ influx is not universal: current direction and changes in Vm depend on E(Cl), baseline Vm and shunting.",
    ganong: "Chapter 6, printed pp. 120–122 (PDF pp. 132–134): temporal/spatial summation of EPSPs and IPSPs; response reversal at E(Cl); spike initiation at the axon initial segment; presynaptic versus postsynaptic inhibition. Printed p. 122 (PDF 134) describes GABA_A-mediated Cl⁻ conductance and GABA_B-associated presynaptic mechanisms.",
    ghai: "Experiment 4-9, printed pp. 331–332 (PDF pp. 353–354): repeated nerve stimulation followed by direct muscle stimulation in an isolated nerve–muscle preparation. Fatigue in this preparation is not a direct recording of CNS EPSPs/IPSPs and does not establish a universal cause of human fatigue."
  },
  KZ: {
    introduction: "Қозу мен тежелуді оқу үшін медициналық физиологияның екі оқулығын салыстырыңыз. Үшінші дереккөз — практикалық физиология оқулығы: оқшауланған жүйке-бұлшықет препаратындағы тәжірибе эксперименттік қорытындының шегін көрсетеді, бірақ ОЖЖ-дегі синапстық суммацияны тікелей дәлелдемейді. Баспа және жүктелген PDF беттері бөлек берілген. Сыртқы сілтемелер баспа не каталог бетіне апарады, толық мәтіннің тегін қолжетімділігіне кепілдік бермейді.",
    guyton: "46-тарау, баспа 583–584-беттер (PDF 559–560-беттер): ионотроптық және метаботроптық тетіктер, тежелу кезіндегі K⁺ немесе Cl⁻ өткізгіштігінің артуы. Cl⁻ иондарының ішке өтуі туралы жеңілдетілген сипаттаманы барлық нейронға қолдануға болмайды: ток бағыты мен Vm өзгерісі E(Cl)-ге, бастапқы Vm-ге және шунттауға тәуелді.",
    ganong: "6-тарау, баспа 120–122-беттер (PDF 132–134-беттер): ҚПСП мен ТПСП-ның уақыттық және кеңістіктік суммациясы; E(Cl) кезіндегі жауаптың реверсиясы; аксонның бастапқы сегментінде әрекет потенциалының басталуы; пресинапстық және постсинапстық тежелу. Баспа 122-бетте (PDF 134) GABA_A арқылы Cl⁻ өткізгіштігінің және GABA_B-мен байланысты пресинапстық тетіктердің рөлі берілген.",
    ghai: "4-9-тәжірибе, баспа 331–332-беттер (PDF 353–354-беттер): оқшауланған жүйке-бұлшықет препаратында жүйкені қайталап және бұлшықетті тікелей тітіркендіру. Бұл препараттың қажуы ОЖЖ-дегі ҚПСП/ТПСП-ны тікелей тіркеу емес және адамдағы шаршаудың әмбебап себебін дәлелдемейді."
  }
};

export function createModuleSixReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) {
    throw new Error("Module 6 reference base missing");
  }
  const guyton = base.sources.find(source => source.title.startsWith("Guyton & Hall"));
  const ganong = base.sources.find(source => source.title.startsWith("Ganong"));
  if (!guyton || !ganong) throw new Error("Module 6 textbook records missing");
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...guyton, description: copy.guyton, links: [{ section: "theory" }] },
      { ...ganong, description: copy.ganong, links: [{ section: "theory" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai,
        links: [{ section: "theory" }]
      }
    ]
  };
}
