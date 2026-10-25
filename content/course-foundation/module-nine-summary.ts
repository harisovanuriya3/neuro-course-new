import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 9: spinal segments, reflex circuits, descending regulation and clinical limits.
// Reviewed with Library originals: Ganong 23e, ch. 9 (PDF pp. 169–171);
// Guyton & Hall 13e, ch. 55 (PDF pp. 667–669);
// C. L. Ghai Practical Physiology 8e (PDF pp. 313–315).
// A clinical reflex finding alone is not a diagnosis.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];

const takeaways: Record<Language, FiveTakeaways> = {
  RU: [
    { title: "Корешок, сегмент и позвонок — не одно и то же",
      explanation: "Первичные чувствительные нейроны имеют тела в спинномозговых узлах; их центральные отростки входят через задние корешки. Аксоны соматических мотонейронов выходят через передние корешки. У взрослого уровень сегмента спинного мозга, особенно в нижних отделах, не равен номеру соседнего позвонка; соседние дерматомы перекрываются." },
    { title: "Рефлекс растяжения: веретено → Ia → α-мотонейрон",
      explanation: "Удар по связке надколенника растягивает четырёхглавую мышцу и её веретёна. Ia-афферент непосредственно возбуждает α-мотонейрон этой мышцы: это моносинаптическое центральное звено коленного рефлекса. Торможение антагониста требует интернейрона. γ-мотонейроны регулируют чувствительность веретена; сухожильный орган Гольджи сообщает о напряжении через Ib-афференты." },
    { title: "Защитное отдёргивание — полисинаптическая сеть",
      explanation: "Болевой стимул может активировать межсегментарные цепи сгибательного отдёргивания и торможения соответствующих разгибателей. При определённых условиях в противоположной конечности возникает перекрёстный разгибательный ответ для поддержания опоры. Эта полисинаптическая реакция не обязательна при любом слабом стимуле и отличается от моносинаптического рефлекса растяжения." },
    { title: "Нисходящие влияния и спинальный шок",
      explanation: "Корково-, ретикуло- и вестибулоспинальные влияния изменяют возбудимость сегментарных сетей. После тяжёлого повреждения спинного мозга рефлексы могут первоначально угнетаться, а затем частично восстанавливаться или усиливаться; сроки различаются. Спинальный шок означает угнетение рефлекторной активности и отличается от нейрогенного шока с нарушением симпатической регуляции кровообращения." },
    { title: "Рефлекс помогает локализовать, но не заменяет осмотр",
      explanation: "Коленный рефлекс оценивает преимущественно L2–L4 (особенно L4), ахиллов — S1–S2 (особенно S1). Слабый ответ может зависеть от афферента, центральной связи, эфферента, мышцы или условий исследования; усиление — от нисходящего контроля. Сравнивайте стороны, силу, чувствительность и время после повреждения: по одному рефлексу нельзя установить точный диагноз." }
  ],
  EN: [
    { title: "Root, cord segment and vertebra are distinct",
      explanation: "Primary sensory neuron cell bodies lie in dorsal root ganglia; their central processes enter via dorsal roots. Somatic motor axons leave via ventral roots. In adults, especially caudally, a spinal cord segment does not lie at the same numbered vertebral level, and adjacent dermatomes overlap." },
    { title: "Stretch reflex: spindle → Ia → α-motor neuron",
      explanation: "A patellar-tendon tap stretches quadriceps muscle spindles. The Ia afferent directly excites an α-motor neuron supplying that muscle: this is the monosynaptic central component of the knee jerk. Antagonist inhibition requires an interneuron. γ-motor neurons adjust spindle sensitivity; Golgi tendon organs report tension via Ib afferents." },
    { title: "Protective withdrawal uses polysynaptic circuits",
      explanation: "Noxious input can recruit multisegmental flexor-withdrawal circuits and inhibition of relevant extensors. Under suitable conditions, crossed extension in the opposite limb helps support posture. These polysynaptic responses are not obligatory after every weak stimulus and differ from the monosynaptic stretch-reflex pathway." },
    { title: "Descending modulation and spinal shock",
      explanation: "Corticospinal, reticulospinal and vestibulospinal influences modulate segmental excitability. After severe cord injury, reflexes may initially be depressed and later return or become exaggerated; timing varies. Spinal shock describes depressed spinal reflex activity and is distinct from neurogenic shock, which involves impaired sympathetic cardiovascular regulation." },
    { title: "Reflexes aid localization but cannot diagnose alone",
      explanation: "The patellar reflex mainly assesses L2–L4 (particularly L4), and the Achilles reflex S1–S2 (particularly S1). A reduced response may reflect sensory input, central connections, motor output, muscle function or examination conditions; hyperreflexia may reflect altered descending control. Compare sides, strength, sensation and time since injury; a single reflex is not a diagnosis." }
  ],
  KZ: [
    { title: "Түбіршек, жұлын сегменті және омыртқа — әртүрлі құрылымдар",
      explanation: "Бірінші реттік сезімтал нейрондардың денелері жұлын түйіндерінде орналасады, орталық өсінділері артқы түбіршектер арқылы кіреді. Соматикалық мотонейрондардың аксондары алдыңғы түбіршектер арқылы шығады. Ересектерде, әсіресе төменгі бөлімдерде, жұлын сегментінің деңгейі аттас омыртқаның деңгейімен сәйкес келмейді; көршілес дерматомдар қабаттасады." },
    { title: "Созылу рефлексі: ұршық → Ia → α-мотонейрон",
      explanation: "Тізе тостағаншасының байламын соққанда төртбасты бұлшықет пен оның ұршықтары созылады. Ia-афферент сол бұлшықеттің α-мотонейронын тікелей қоздырады: бұл — тізе рефлексінің орталық моносинапстық бөлігі. Антагонисті тежеу үшін интернейрон қажет. γ-мотонейрондар ұршық сезімталдығын реттейді; Гольджи сіңір органдары кернеуді Ib-афференттер арқылы хабарлайды." },
    { title: "Қорғаныштық тартып алу — полисинапстық тізбек",
      explanation: "Ауырсындыратын әсер бірнеше сегментті қамтитын бүгу және тартып алу тізбектерін белсендіріп, тиісті жазғыш бұлшықеттерді тежей алады. Белгілі жағдайларда қарсы аяқтағы айқаспалы жазылу дене тірегін сақтауға көмектеседі. Бұл полисинапстық жауап әрбір әлсіз тітіркендіргіште міндетті емес және созылудың моносинапстық рефлексінен бөлек." },
    { title: "Төмендеуші реттелу және жұлындық шок",
      explanation: "Қыртыс-жұлын, ретикула-жұлын және вестибуло-жұлын жолдары сегменттік желілердің қозғыштығын өзгертеді. Жұлын ауыр зақымданғаннан кейін рефлекстер алғашында бәсеңдеп, кейін қалпына келуі немесе күшеюі мүмкін; мерзімі әртүрлі. Жұлындық шок — рефлекстік белсенділіктің бәсеңдеуі, ал нейрогендік шок симпатикалық жүрек-қантамыр реттелуінің бұзылуымен ерекшеленеді." },
    { title: "Рефлекс зақым орнын анықтауға көмектеседі, бірақ диагноз емес",
      explanation: "Тізе рефлексі негізінен L2–L4 (әсіресе L4), ахилл рефлексі S1–S2 (әсіресе S1) сегменттерін бағалауға көмектеседі. Әлсіз жауап афферентке, орталық байланыстарға, эфферентке, бұлшықетке не тексеру жағдайына байланысты болуы мүмкін; күшеюі төмендеуші реттелудің өзгерісін көрсетуі мүмкін. Екі жақты, күшті, сезімталдықты және зақымнан кейінгі уақытты салыстырыңыз: жалғыз рефлекс диагноз қоймайды." }
  ]
};

export function createModuleNineSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU"
      ? "Пять физиологических выводов: сегменты, рефлекторные цепи, нисходящий контроль и пределы клинической интерпретации."
      : language === "EN"
        ? "Five physiological takeaways: spinal segments, reflex circuits, descending control and clinical limits."
        : "Бес физиологиялық қорытынды: жұлын сегменттері, рефлекстік тізбектер, төмендеуші реттелу және клиникалық түсіндіру шектері.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-9-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "practice" }],
    })),
  };
}
