import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Module 14 thalamus: independently paraphrased guidance, checked against
// Guyton & Hall 13e PDF 584–586 (printed 609–611), Ganong 23e PDF
// 241–243 (printed 229–231), and Ghai 8e PDF 323–325 (printed 301–303).
// URLs are public catalogue/publisher/open-education records, not copied PDFs.
type Guidance = { introduction: string; guyton: string; ganong: string; ghai: string; cns: string };
const guidance: Record<Language, Guidance> = {
  RU: {
    introduction: "Маршрут чтения: задние канатики и медиальная петля → VPL для тела и VPM для лица → таламокортикальные реле и тормозное ретикулярное ядро таламуса → клиническая интерпретация. Печатные страницы и страницы загруженных PDF указаны раздельно. Ссылки на Guyton, Ganong и Ghai ведут к сведениям об изданиях, а не к свободным копиям книг. OpenStax доступен открыто. Один симптом или результат учебной модели не позволяет установить точную локализацию поражения или диагноз.",
    guyton: "Глава 48, печатные с. 609–611 (PDF 584–586): вибрация, тонкое осязание и осознанная проприоцепция от тела идут по задним канатикам к тонкому и клиновидному ядрам продолговатого мозга. После переключения аксоны второго нейрона перекрещиваются в продолговатом мозге, поднимаются в медиальной петле к вентробазальному комплексу таламуса и далее к постцентральной коре. Для правой кисти проследите правый клиновидный пучок, правое клиновидное ядро, левую медиальную петлю и левый VPL. Не переносите этот уровень перекрёста автоматически на боле-температурный путь.",
    ganong: "Глава 15, печатные с. 229–231 (PDF 241–243): VPL связан преимущественно с соматосенсорной информацией тела, VPM — лица; латеральное и медиальное коленчатые тела — со зрением и слухом соответственно. VA/VL участвуют в моторных контурах с мозжечком и базальными ганглиями. Большинство проекционных таламических реле возбуждающие, глутаматергические. Ретикулярное ядро таламуса содержит ГАМК-ергические тормозные нейроны, регулирующие активность реле; это не ретикулярная формация ствола мозга. Не называйте таламус пассивным переключателем.",
    ghai: "Clinical Examination, печатные с. 301–303 (PDF 323–325): различайте кожные, глубокие и специальные виды чувствительности. При анализе пути сопоставьте рецептор, первичный афферент, уровень перекрёста, таламическое реле и корковую область. Заднеканатиково-медиально-петлевая система и переднебоковой путь имеют разные уровни перекрёста; простая схема не доказывает место поражения. Проверка чувствительности требует согласия, безопасной процедуры и учёта других неврологических данных.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: открытое введение в строение промежуточного мозга и связи таламуса с корой. Используйте его для анатомической ориентации, а не как доказательство деталей нейромедиаторных цепей или локализации по одному симптому. Детали VPL/VPM и ретикулярного ядра сверяйте с Ganong; соматосенсорные пути — с Guyton; практическую оценку — с Ghai."
  },
  EN: {
    introduction: "Reading route: dorsal columns and medial lemniscus → body VPL versus facial VPM → thalamocortical relays and the inhibitory thalamic reticular nucleus → limits of clinical interpretation. Printed textbook pages and uploaded PDF page numbers are listed separately. Guyton, Ganong and Ghai links lead to edition or catalogue records, not free copies of copyrighted books; OpenStax is openly accessible. Neither a single symptom nor a teaching simulation establishes an exact lesion site or diagnosis.",
    guyton: "Chapter 48, printed pp. 609–611 (PDF 584–586): vibration, discriminative touch and conscious proprioception from the body ascend in the dorsal columns to the gracile and cuneate nuclei in the medulla. Second-order axons cross in the medulla and ascend in the medial lemniscus to the thalamic ventrobasal complex, then project mainly to postcentral cortex. For the right hand, trace the right cuneate fasciculus and nucleus, left medial lemniscus and left VPL. Do not apply this medullary crossing to the pain-and-temperature pathway.",
    ganong: "Chapter 15, printed pp. 229–231 (PDF 241–243): VPL predominantly relays body somatosensation, whereas VPM relays facial input; lateral and medial geniculate bodies participate in visual and auditory relays. VA/VL are linked to motor loops involving the cerebellum and basal ganglia. Most thalamic projection relays use excitatory glutamate. The thalamic reticular nucleus contains inhibitory GABAergic neurons that regulate relay activity; it is distinct from the brainstem reticular formation. The thalamus is not merely a passive switch.",
    ghai: "Clinical Examination, printed pp. 301–303 (PDF 323–325): distinguish cutaneous, deep and special sensory modalities. Interpret receptor, first-order afferent, crossing level, thalamic relay and cortical target together. The dorsal column–medial lemniscal and anterolateral pathways cross at different levels; a simplified diagram cannot prove the site of a lesion. Sensory examination requires consent, safe technique and other neurological findings.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 'The Central Nervous System': an openly accessible introduction to diencephalic anatomy and thalamocortical connections. Use it for orientation, not as evidence for neurotransmitter-level circuitry or localisation from a single sign. Consult Ganong for VPL/VPM and the reticular nucleus, Guyton for somatosensory tracts, and Ghai for clinical sensory assessment."
  },
  KZ: {
    introduction: "Оқу реті: артқы бағандар мен медиалдық ілмек → дененің VPL және беттің VPM ядролары → таламус-қыртыс релелері мен таламустың тежеуші ретикулярлық ядросы → клиникалық қорытындының шегі. Баспа және жүктелген PDF беттері бөлек көрсетілген. Guyton, Ganong және Ghai сілтемелері кітаптардың тегін көшірмесіне емес, басылым не каталог жазбасына апарады; OpenStax ашық қолжетімді. Бір белгі немесе оқу симуляциясы зақым орнын не диагнозды дәл анықтамайды.",
    guyton: "48-тарау, баспа 609–611-беттер (PDF 584–586): денеден келетін діріл, нәзік жанасу және саналы проприоцепция артқы бағандар арқылы сопақша мидағы нәзік және сына тәрізді ядроларға жетеді. Екінші нейрон аксондары сопақша мида айқасып, медиалдық ілмек арқылы таламустың вентробазалдық кешеніне, кейін постцентралдық қыртысқа барады. Оң қол үшін оң сына тәрізді буда мен ядроны, сол медиалдық ілмек пен сол VPL-ді көрсетіңіз. Ауырсыну және температура жолының айқасу деңгейі бұдан өзгеше.",
    ganong: "15-тарау, баспа 229–231-беттер (PDF 241–243): VPL көбіне денеден, VPM беттен келетін соматосенсорлық ақпаратты өткізеді; латералдық және медиалдық тізелі денелер тиісінше көру және есту жолдарына қатысады. VA/VL мишық және базалдық ганглийлермен байланысты қозғалтқыш контурларға қатысады. Таламустың көптеген проекциялық нейрондары қоздырушы глутаматты пайдаланады. Таламустың ретикулярлық ядросындағы ГАМҚ-ергиялық нейрондар реле белсенділігін тежейді; оны ми бағанының ретикулярлық формациясымен шатастырмаңыз.",
    ghai: "Clinical Examination бөлімі, баспа 301–303-беттер (PDF 323–325): терілік, терең және арнайы сезімталдықты ажыратыңыз. Рецепторды, бірінші реттік афферентті, айқасу деңгейін, таламустық релені және қыртыстық нысананы бірге талдаңыз. Артқы баған–медиалдық ілмек және алдыңғы-бүйірлік жолдар әртүрлі деңгейде айқасады; қарапайым сызба зақым орнын дәлелдемейді. Сезімталдықты тексеру келісіммен, қауіпсіз тәсілмен және басқа неврологиялық деректерді ескере отырып жүргізіледі.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: аралық ми анатомиясы мен таламус-қыртыс байланыстары туралы ашық кіріспе. Бұл материалды бағдарлау үшін пайдаланыңыз, бірақ нейромедиаторлық тізбектерді немесе бір белгі бойынша зақым орнын дәлелдеу үшін емес. VPL/VPM мен ретикулярлық ядроны Ganong, сезім жолдарын Guyton, ал клиникалық тексеруді Ghai бойынша нақтылаңыз."
  }
};

export function createModuleFourteenReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) throw new Error("Module 14 references base missing");
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 14 bibliography record missing: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...find("Guyton & Hall"), description: copy.guyton, links: [{ section: "theory" }, { section: "interactive" }] },
      { ...find("Ganong"), description: copy.ganong, links: [{ section: "theory" }, { section: "glossary" }] },
      { title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai, links: [{ section: "clinical" }, { section: "practice" }] },
      { ...find("OpenStax · The Central Nervous System"), description: copy.cns,
        links: [{ section: "media" }] }
    ]
  };
}
