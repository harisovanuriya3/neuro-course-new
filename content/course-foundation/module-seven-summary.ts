import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 7, physiology summary: Ganong 23e, ch. 9, Library PDF pp. 169–170;
// Guyton & Hall 13e, ch. 55, Library PDF pp. 666–669;
// C. L. Ghai Practical Physiology 8e, Library PDF pp. 317–319.
// This is a teaching summary, not a patient-specific diagnostic rule.
type Takeaway = { title: string; explanation: string };
const takeaways: Record<Language, [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway]> = {
  RU: [
    { title: "Дуга коленного рефлекса", explanation: "Удар по связке надколенника быстро растягивает четырёхглавую мышцу и её мышечные веретёна. Ia-афферент входит через задний корешок и непосредственно возбуждает альфа-мотонейрон той же мышцы; моторный выход через передний корешок вызывает разгибание колена. Рецептор находится в мышце, не в связке." },
    { title: "Ia, II и гамма-регуляция", explanation: "Окончания Ia кодируют длину мышцы и особенно чувствительны к скорости быстрого растяжения; окончания II преимущественно сигнализируют о сохраняющейся длине. Гамма-мотонейроны изменяют чувствительность интрафузальных волокон, а альфа-гамма-коактивация помогает сохранять чувствительность при сокращении." },
    { title: "Два пути от Ia-афферента", explanation: "Возбуждение альфа-мотонейрона растянутой мышцы по основной ветви Ia — моносинаптическое. Реципрокное торможение мотонейронов антагониста проходит через отдельный тормозный интернейрон и потому не является той же моносинаптической связью." },
    { title: "Не путайте веретено и сухожильный орган", explanation: "Мышечное веретено сообщает об изменениях длины, а сухожильный орган Гольджи через Ib-афференты — о напряжении мышцы. В учебной схеме Ib-вход может тормозить мотонейроны той же мышцы, но при реальных движениях его действие зависит от задачи и состояния сети." },
    { title: "Один рефлекс — не диагноз", explanation: "Слабый коленный рефлекс может зависеть от афферентного звена, спинальных связей, эфферентного пути, нервно-мышечной передачи, мышцы и условий осмотра. Сравните обе стороны, положение и расслабление; при необходимости используйте приём Ендрассика. По одному ответу нельзя точно локализовать поражение." },
  ],
  EN: [
    { title: "The knee-jerk arc", explanation: "A tap on the patellar ligament rapidly stretches the quadriceps and its muscle spindles. A group Ia afferent enters through the dorsal root and directly excites an alpha motor neuron of the same muscle; motor output via the ventral root produces knee extension. The receptor lies in the muscle, not the ligament." },
    { title: "Ia, II and gamma control", explanation: "Group Ia endings encode muscle length and are especially sensitive to the velocity of rapid stretch; group II endings mainly signal sustained length. Gamma motor neurons adjust intrafusal-fiber sensitivity, while alpha–gamma coactivation helps maintain spindle sensitivity during contraction." },
    { title: "Two pathways from Ia", explanation: "Excitation of the stretched muscle's alpha motor neuron through the principal Ia branch is monosynaptic. Reciprocal inhibition of antagonist motor neurons passes through a separate inhibitory interneuron and is therefore not the same monosynaptic connection." },
    { title: "Spindle versus tendon organ", explanation: "The muscle spindle signals changes in muscle length, whereas the Golgi tendon organ signals muscle tension via group Ib afferents. In the textbook circuit, Ib input can inhibit motor neurons of the same muscle, but during movement its effects depend on task and circuit state." },
    { title: "One reflex is not a diagnosis", explanation: "A weak knee jerk may reflect sensory input, spinal connections, motor output, neuromuscular transmission, muscle function or examination conditions. Compare both sides, positioning and relaxation; consider the Jendrassik maneuver. One response cannot precisely localize a lesion." },
  ],
  KZ: [
    { title: "Тізе рефлексінің доғасы", explanation: "Тізе тостағаншасының байламын соғу санның төртбасты бұлшықеті мен оның ұршықтарын тез созады. Ia-афферент артқы түбір арқылы кіріп, сол бұлшықеттің альфа-мотонейронын тікелей қоздырады; алдыңғы түбір арқылы шығатын қозғалтқыш импульс тізені жазады. Рецептор байламда емес, бұлшықетте орналасады." },
    { title: "Ia, II және гамма-реттелу", explanation: "Ia тобының ұштары бұлшықет ұзындығын сезеді және әсіресе тез созылу жылдамдығына сезімтал; II тобының ұштары көбіне тұрақты ұзындық туралы хабарлайды. Гамма-мотонейрондар интрафузалдық талшықтардың сезімталдығын реттейді, ал альфа-гамма-бірлескен белсенуі жиырылу кезінде ұршық сезімталдығын сақтауға көмектеседі." },
    { title: "Ia-афференттен тарайтын екі жол", explanation: "Ia-афференттің негізгі тармағы созылған бұлшықеттің альфа-мотонейронын бір синапс арқылы қоздырады. Антагонист мотонейрондардың реципроктық тежелуі бөлек тежегіш интернейрон арқылы өтеді, сондықтан ол дәл сол моносинапстық байланыс емес." },
    { title: "Ұршық пен сіңір органын ажыратыңыз", explanation: "Бұлшықет ұршығы ұзындықтың өзгеруі туралы, ал Гольджи сіңір органы Ib-афференттер арқылы бұлшықет кернеуі туралы хабарлайды. Оқу сызбасында Ib кірісі сол бұлшықеттің мотонейрондарын тежей алады, бірақ нақты қозғалыста әсері тапсырма мен жүйке тізбегінің күйіне тәуелді." },
    { title: "Бір рефлекс диагноз қоймайды", explanation: "Тізе рефлексінің әлсіздігі афференттік жолға, жұлындағы байланыстарға, эфференттік жолға, жүйке-бұлшықет берілуіне, бұлшықетке немесе тексеру жағдайына байланысты болуы мүмкін. Екі жақты, аяқ қалпын және босаңсуды салыстырыңыз; қажет болса Ендрассик тәсілін қолданыңыз. Бір жауап зақым орнын дәл анықтамайды." },
  ],
};

export function createModuleSevenSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU"
      ? "Пять ключевых физиологических выводов о рефлекторных дугах и их исследовании."
      : language === "EN"
        ? "Five key physiological takeaways about reflex circuits and their examination."
        : "Рефлекстік тізбектер мен оларды тексеру туралы бес негізгі физиологиялық қорытынды.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-7-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "practice" }],
    })),
  };
}
