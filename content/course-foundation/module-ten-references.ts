import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Module 10: brainstem reference guidance, checked against the user's Library PDFs
// on 2026-10-26. Page numbers are explicitly distinguished:
// Guyton & Hall 13e: PDF 718–719, printed 751–752 (ch. 59).
// Ganong 23e: PDF 249–250, printed 237–238 (ch. 15).
// C. L. Ghai 8e: PDF 301–303, printed 279–281 (clinical cranial-nerve examination);
// PDF 256–257, printed 234–235 (brainstem auditory evoked potentials).
// These external publisher/catalogue links do not expose the uploaded licensed PDFs.
type Guidance = {
  introduction: string;
  guyton: string;
  ganong: string;
  ghai: string;
  cns: string;
};

const guidance: Record<Language, Guidance> = {
  RU: {
    introduction: "Последовательность чтения: строение ствола мозга и ядра черепных нервов → распределённые сети бодрствования → сравнение зрачкового и корнеального рефлексов → ранние слуховые вызванные потенциалы. Номера печатных страниц отличаются от страниц загруженных PDF. Ссылки на книги ведут к издателю или в каталог, а не к бесплатному полному тексту; материал OpenStax доступен открыто. Рефлекс и отдельный вызванный потенциал не устанавливают уровень сознания и не заменяют обследование.",
    guyton: "Глава 59, печатные с. 751–752 (PDF 718–719): ретикулярные сети моста и среднего мозга передают восходящие активирующие влияния через таламические и другие связи к коре; нейромодуляторные системы и обратная связь с корой поддерживают бодрствование. Это распределённая регуляция, а не один анатомический «центр сознания». Сопоставьте с моделью в разделе «Интерактив».",
    ganong: "Глава 15, печатные с. 237–238 (PDF 249–250): в регуляции сна и бодрствования участвуют ретикулярные структуры ствола, гипоталамус, холинергические, моноаминергические, гистаминергические и ГАМК-ергические системы. Не приравнивайте наличие отдельного стволового рефлекса к доказательству сознания. Сопоставьте с разделом «Теория».",
    ghai: "Clinical Examination, печатные с. 279–281 (PDF 301–303): световой рефлекс — II нерв → претектальная область → двусторонние ядра Эдингера—Вестфаля → III нерв → ресничный узел → сфинктер зрачка; корнеальный — афферент V1 и эфферент VII с двусторонним морганием. Brainstem Auditory Evoked Potentials, печатные с. 234–235 (PDF 256–257): ответы усредняют; оценивают латентности и межпиковые интервалы с учётом слуха, температуры, возраста и других факторов. Один ранний КСВП не доказывает сознание. Не выполняйте корнеальные пробы самостоятельно.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: открытое введение в анатомию ствола мозга, черепные нервы и связи с другими отделами. Для дуг рефлексов и ограничений ранних КСВП используйте указанные страницы Ghai; анатомическая схема не является клиническим измерением."
  },
  EN: {
    introduction: "Suggested reading order: brainstem levels and cranial-nerve nuclei → distributed arousal networks → pupillary versus corneal reflex arcs → early brainstem auditory evoked potentials. Printed page numbers differ from the uploaded PDFs' page indices. Textbook links open publisher or catalogue records, not free full text; OpenStax is openly readable. Neither a single reflex nor an evoked potential establishes awareness or replaces clinical assessment.",
    guyton: "Chapter 59, printed pp. 751–752 (PDF 718–719): reticular networks in the pons and midbrain send ascending activating influences to the cortex through thalamic and other connections; neuromodulators and cortical feedback help sustain arousal. This is distributed regulation, not a single anatomical 'consciousness center'. Compare with the interactive model.",
    ganong: "Chapter 15, printed pp. 237–238 (PDF 249–250): brainstem reticular structures, hypothalamus, cholinergic, monoaminergic, histaminergic and GABAergic systems contribute to sleep–wake control. The presence of one brainstem reflex is not proof of conscious awareness. Compare with the theory section.",
    ghai: "Clinical Examination, printed pp. 279–281 (PDF 301–303): light reflex — CN II → pretectal region → bilateral Edinger–Westphal nuclei → CN III → ciliary ganglion → pupillary sphincter; corneal reflex — V1 afferent and CN VII efferent with bilateral blinking. Brainstem Auditory Evoked Potentials, printed pp. 234–235 (PDF 256–257): responses are averaged and absolute/interpeak latencies interpreted with hearing, temperature, age and other factors in mind. One early BAEP does not prove awareness. Do not perform corneal tests yourself.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: an openly accessible anatomical introduction to brainstem levels, cranial nerves and connections. For reflex pathways and BAEP limitations, consult the specified Ghai pages; an anatomical illustration is not a clinical measurement."
  },
  KZ: {
    introduction: "Оқу реті: ми бағанының бөлімдері мен бассүйек жүйкелерінің ядролары → сергектікті реттейтін таралған желілер → қарашықтың жарық және қасаң қабық рефлекстерін салыстыру → ерте есту шақырылған потенциалдары. Баспа беттері мен жүктелген PDF беттерінің нөмірлері әртүрлі. Оқулық сілтемелері баспа не каталог жазбасына апарады, тегін толық мәтінге емес; OpenStax ашық қолжетімді. Жеке рефлекс те, шақырылған потенциал да саналы күйді дәлелдемейді және клиникалық тексеруді алмастырмайды.",
    guyton: "59-тарау, баспа 751–752-беттер (PDF 718–719): көпір мен ортаңғы мидың ретикулярлық желілері таламус және басқа байланыстар арқылы ми қыртысына жоғарылайтын белсендіруші ықпал жібереді; нейромодуляторлық жүйелер мен қыртыстан кері байланыс сергектікті сақтауға қатысады. Бұл — сананың бір ғана анатомиялық «орталығы» емес, таралған реттелу. Интерактивтік үлгімен салыстырыңыз.",
    ganong: "15-тарау, баспа 237–238-беттер (PDF 249–250): ұйқы мен сергектікті реттеуге ми бағанының ретикулярлық құрылымдары, гипоталамус, холинергиялық, моноаминергиялық, гистаминергиялық және ГАМҚ-ергиялық жүйелер қатысады. Бір ғана ми бағаны рефлексінің сақталуы сананың бар екенін дәлелдемейді. Теория бөлімімен салыстырыңыз.",
    ghai: "Clinical Examination, баспа 279–281-беттер (PDF 301–303): жарық рефлексі — II жүйке → претекталдық аймақ → екі жақтағы Эдингер—Вестфаль ядролары → III жүйке → кірпікшелі түйін → қарашық сфинктері; қасаң қабық рефлексі — афферент V1 және эфферент VII, екі көздің жыпылықтауы. Brainstem Auditory Evoked Potentials, баспа 234–235-беттер (PDF 256–257): жауаптар орташаланады; абсолюттік және шыңаралық латенттіліктер есту, температура, жас және басқа факторлар ескеріліп түсіндіріледі. Бір ерте есту шақырылған потенциалы сананың бар екенін дәлелдемейді. Қасаң қабық сынамасын өз бетіңізше жүргізбеңіз.",
    cns: "OpenStax, Anatomy & Physiology 2e, §13.2 «The Central Nervous System»: ми бағанының бөлімдері, бассүйек жүйкелері мен байланыстары туралы ашық анатомиялық кіріспе. Рефлекс доғалары мен ерте есту шақырылған потенциалдарының шектеулерін түсіну үшін Ghai-дің көрсетілген беттерін қараңыз; анатомиялық сурет клиникалық өлшем емес."
  }
};

export function createModuleTenReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) {
    throw new Error("Module 10 reference base missing");
  }
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 10 bibliography record missing: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...find("Guyton & Hall"), description: copy.guyton, links: [{ section: "interactive" }] },
      { ...find("Ganong"), description: copy.ganong, links: [{ section: "theory" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai,
        links: [{ section: "clinical" }, { section: "media" }]
      },
      { ...find("OpenStax · The Central Nervous System"), description: copy.cns, links: [{ section: "theory" }] }
    ]
  };
}
